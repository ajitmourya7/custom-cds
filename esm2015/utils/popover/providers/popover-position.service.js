import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ClrPopoverEventsService } from './popover-events.service';
import { align, flipSidesAndNudgeContent, flipSides, nudgeContent, testVisibility } from '../position-operators';
import { ClrAxis } from '../enums/axis.enum';
let ClrPopoverPositionService = class ClrPopoverPositionService {
    constructor(eventService, platformId) {
        this.eventService = eventService;
        this.platformId = platformId;
    }
    set position(position) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
    alignContent(content) {
        if (!isPlatformBrowser(this.platformId)) {
            // Only position when in a browser.
            // Default to the browser origin and prevent getBoundingClientRect from running.
            return {
                xOffset: 0,
                yOffset: 0,
            };
        }
        this.currentAnchorCoords = this.eventService.anchorButtonRef.nativeElement.getBoundingClientRect();
        this.currentContentCoords = content.getBoundingClientRect();
        this.contentOffsets = align(this.position, this.currentAnchorCoords, this.currentContentCoords);
        const visibilityViolations = testVisibility(this.contentOffsets, this.currentContentCoords);
        /**
         * Calculate the sum of viewport errors. This calculation is used below with the provided Axis in the given
         * ClrPopoverPosition. Its worth putting the ClrViewportViolation enum values here:
         *
         *   BOTTOM = 0,
         *   LEFT = 1,
         *   RIGHT = 2,
         *   TOP = 3,
         *
         *   So, this.visibilityViolations.length tells us how many sides of the viewport that the popover content was
         *   clipped on. We can only help when the content has an issue on one or two sides.
         *   errorSum is calculated to determine _how_ to change the position. Looking at both the axis and the number
         *   of violations I can use the errorSum to determine how to transform the position (on the fly) and adjust
         *   where it can be improved.
         *
         *   Note, more than 3 viewport violations and there isn't anything we can do to help. Also when there are two
         *   violations, we can't help if the violations are TOP+BOTTOM || LEFT+RIGHT => There is no transformation we
         *   can make to the postion that will help.
         *
         *   Some examples:
         *   There is only one error and Primary axis is VERTICAL
         *   - this.handleVerticalAxisOneViolation has a switch that will use the error sum to apply the correct
         *   transform to the postion based on the reduction of visibilityViolations.
         *
         *   There are two errors and Primary axis is HORIZONTAL
         *   - handleHorizontalAxisTwoViolations has a switch that uses the error sum to apply both transforms needed to
         *   improve the content position based on the reduction of visibilityViolations.
         */
        const errorSum = visibilityViolations.reduce((count, current) => {
            return count + current;
        }, 0);
        if (visibilityViolations.length === 1 && this.position.axis === ClrAxis.VERTICAL) {
            // When primary axis is VERTICAL and there is one viewport violation
            this.handleVerticalAxisOneViolation(errorSum);
        }
        else if (visibilityViolations.length === 1 && this.position.axis === ClrAxis.HORIZONTAL) {
            // When primary axis is HORIZONTAL and there is one viewport violation
            this.handleHorizontalAxisOneViolation(errorSum);
        }
        else if (visibilityViolations.length === 2 && this.position.axis === ClrAxis.VERTICAL) {
            // When primary axis is VERTICAL and there are two viewport violations
            this.handleVerticalAxisTwoViolations(errorSum);
        }
        else if (visibilityViolations.length === 2 && this.position.axis === ClrAxis.HORIZONTAL) {
            // When primary axis is HORIZONTAL and there are two viewport violations
            this.handleHorizontalAxisTwoViolations(errorSum);
        }
        return this.contentOffsets;
    }
    handleVerticalAxisOneViolation(errorSum) {
        switch (errorSum) {
            case 0:
            case 3: {
                // BOTTOM(0) or TOP(3) are primary violations and we can just flip sides
                this.contentOffsets = align(flipSides(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 1: {
                // LEFT(1) is secondary and needs to nudge content right
                this.contentOffsets = align(nudgeContent(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 2: {
                // RIGHT(2) is secondary and  needs to nudge content left
                this.contentOffsets = align(nudgeContent(this.position, true), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleVerticalAxisTwoViolations(errorSum) {
        switch (errorSum) {
            // We know there are two violations. We can use the errorSum to determine which combination of sides were
            // violated and handle appropriately.
            case 5: {
                // TOP(3)+RIGHT(2) is case 5. We need to flip sides and nudge the content to the left
                const flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 4: {
                //TOP(3)+LEFT(1) is case 4, we need to flip sides and nudge content to the right
                const flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeRight(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3)+BOTTOM(0) || left(1)+RIGHT(2) is case 3. There is nothing we can do position wise to improve the
                // placement for this content.
                break;
            }
            case 2: {
                // BOTTOM(0)+RIGHT(2) is case 2. We need to flip sides and nudge the content to the left
                const flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 1: {
                // BOTTOM(0)+LEFT(1) is case 1. We need to flip sides and nudge to the right
                const flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeRight(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleHorizontalAxisOneViolation(errorSum) {
        switch (errorSum) {
            case 1:
            case 2: {
                // LEFT(1) and RIGHT(2) are primary violations so we can flip sides
                this.contentOffsets = align(flipSides(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 0: {
                // BOTTOM(0) is a secondary violation and we need to nudge content up
                this.contentOffsets = align(nudgeContent(this.position, true), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3) is a secondary violation and we need to nudge content down
                this.contentOffsets = align(nudgeContent(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleHorizontalAxisTwoViolations(errorSum) {
        switch (errorSum) {
            case 5:
            case 4: {
                // TOP(3)+LEFT(1) is case 4.
                // TOP(3)+RIGHT(2) is case 5.
                // In both of these cases we need to flip sides and nudge content down
                const flipAndNudgeDown = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeDown(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3)+BOTTOM(0) || left(1)+RIGHT(2) is case 3. There is nothing we can do position wise to improve the
                // placement for this content.
                break;
            }
            case 2:
            case 1: {
                // BOTTOM(0)+RIGHT(2) is case 2.
                // BOTTOM(0)+LEFT(1) is case 1.
                // In both cases we  need to flip sides and nudge content up
                const flipAndNudgeUp = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeUp(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
};
ClrPopoverPositionService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [ClrPopoverEventsService, Object])
], ClrPopoverPositionService);
export { ClrPopoverPositionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci1wb3NpdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRztBQUNILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUluRSxPQUFPLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzdDLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBYXBDLFlBQW9CLFlBQXFDLEVBQThCLFVBQWtCO1FBQXJGLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUE4QixlQUFVLEdBQVYsVUFBVSxDQUFRO0lBQUcsQ0FBQztJQVA3RyxJQUFJLFFBQVEsQ0FBQyxRQUE0QjtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFJTSxZQUFZLENBQUMsT0FBb0I7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QyxtQ0FBbUM7WUFDbkMsZ0ZBQWdGO1lBQ2hGLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDO1NBQ0g7UUFFRCxJ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Qyx1QkFBdUIsRUFBMEMsTUFBTTtHQWI5Rix5QkFBeUIsQ0FnT3JDO1NBaE9ZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKlxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsclBvcG92ZXJFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9wb3BvdmVyLWV2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJQb3NpdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wb3Zlci1wb3NpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlckNvbnRlbnRPZmZzZXQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcG92ZXItY29udGVudC1vZmZzZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENsclZpZXdwb3J0VmlvbGF0aW9uIH0gZnJvbSAnLi4vZW51bXMvdmlld3BvcnQtdmlvbGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgYWxpZ24sIGZsaXBTaWRlc0FuZE51ZGdlQ29udGVudCwgZmxpcFNpZGVzLCBudWRnZUNvbnRlbnQsIHRlc3RWaXNpYmlsaXR5IH0gZnJvbSAnLi4vcG9zaXRpb24tb3BlcmF0b3JzJztcbmltcG9ydCB7IENsckF4aXMgfSBmcm9tICcuLi9lbnVtcy9heGlzLmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xyUG9wb3ZlclBvc2l0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudEFuY2hvckNvb3JkczogQ2xpZW50UmVjdDtcbiAgcHJpdmF0ZSBjdXJyZW50Q29udGVudENvb3JkczogQ2xpZW50UmVjdDtcbiAgcHJpdmF0ZSBjb250ZW50T2Zmc2V0czogQ2xyUG9wb3ZlckNvbnRlbnRPZmZzZXQ7XG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb247XG5cbiAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb24pIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG4gIGdldCBwb3NpdGlvbigpOiBDbHJQb3BvdmVyUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRTZXJ2aWNlOiBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSwgQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cblxuICBwdWJsaWMgYWxpZ25Db250ZW50KGNvbnRlbnQ6IEhUTUxFbGVtZW50KTogQ2xyUG9wb3ZlckNvbnRlbnRPZmZzZXQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgLy8gT25seSBwb3NpdGlvbiB3aGVuIGluIGEgYnJvd3Nlci5cbiAgICAgIC8vIERlZmF1bHQgdG8gdGhlIGJyb3dzZXIgb3JpZ2luIGFuZCBwcmV2ZW50IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIHJ1bm5pbmcuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB4T2Zmc2V0OiAwLFxuICAgICAgICB5T2Zmc2V0OiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMgPSB0aGlzLmV2ZW50U2VydmljZS5hbmNob3JCdXR0b25SZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmN1cnJlbnRDb250ZW50Q29vcmRzID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24odGhpcy5wb3NpdGlvbiwgdGhpcy5jdXJyZW50QW5jaG9yQ29vcmRzLCB0aGlzLmN1cnJlbnRDb250ZW50Q29vcmRzKTtcblxuICAgIGNvbnN0IHZpc2liaWxpdHlWaW9sYXRpb25zOiBDbHJWaWV3cG9ydFZpb2xhdGlvbltdID0gdGVzdFZpc2liaWxpdHkodGhpcy5jb250ZW50T2Zmc2V0cywgdGhpcy5jdXJyZW50Q29udGVudENvb3Jkcyk7XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBzdW0gb2Ygdmlld3BvcnQgZXJyb3JzLiBUaGlzIGNhbGN1bGF0aW9uIGlzIHVzZWQgYmVsb3cgd2l0aCB0aGUgcHJvdmlkZWQgQXhpcyBpbiB0aGUgZ2l2ZW5cbiAgICAgKiBDbHJQb3BvdmVyUG9zaXRpb24uIEl0cyB3b3J0aCBwdXR0aW5nIHRoZSBDbHJWaWV3cG9ydFZpb2xhdGlvbiBlbnVtIHZhbHVlcyBoZXJlOlxuICAgICAqXG4gICAgICogICBCT1RUT00gPSAwLFxuICAgICAqICAgTEVGVCA9IDEsXG4gICAgICogICBSSUdIVCA9IDIsXG4gICAgICogICBUT1AgPSAzLFxuICAgICAqXG4gICAgICogICBTbywgdGhpcy52aXNpYmlsaXR5VmlvbGF0aW9ucy5sZW5ndGggdGVsbHMgdXMgaG93IG1hbnkgc2lkZXMgb2YgdGhlIHZpZXdwb3J0IHRoYXQgdGhlIHBvcG92ZXIgY29udGVudCB3YXNcbiAgICAgKiAgIGNsaXBwZWQgb24uIFdlIGNhbiBvbmx5IGhlbHAgd2hlbiB0aGUgY29udGVudCBoYXMgYW4gaXNzdWUgb24gb25lIG9yIHR3byBzaWRlcy5cbiAgICAgKiAgIGVycm9yU3VtIGlzIGNhbGN1bGF0ZWQgdG8gZGV0ZXJtaW5lIF9ob3dfIHRvIGNoYW5nZSB0aGUgcG9zaXRpb24uIExvb2tpbmcgYXQgYm90aCB0aGUgYXhpcyBhbmQgdGhlIG51bWJlclxuICAgICAqICAgb2YgdmlvbGF0aW9ucyBJIGNhbiB1c2UgdGhlIGVycm9yU3VtIHRvIGRldGVybWluZSBob3cgdG8gdHJhbnNmb3JtIHRoZSBwb3NpdGlvbiAob24gdGhlIGZseSkgYW5kIGFkanVzdFxuICAgICAqICAgd2hlcmUgaXQgY2FuIGJlIGltcHJvdmVkLlxuICAgICAqXG4gICAgICogICBOb3RlLCBtb3JlIHRoYW4gMyB2aWV3cG9ydCB2aW9sYXRpb25zIGFuZCB0aGVyZSBpc24ndCBhbnl0aGluZyB3ZSBjYW4gZG8gdG8gaGVscC4gQWxzbyB3aGVuIHRoZXJlIGFyZSB0d29cbiAgICAgKiAgIHZpb2xhdGlvbnMsIHdlIGNhbid0IGhlbHAgaWYgdGhlIHZpb2xhdGlvbnMgYXJlIFRPUCtCT1RUT00gfHwgTEVGVCtSSUdIVCA9PiBUaGVyZSBpcyBubyB0cmFuc2Zvcm1hdGlvbiB3ZVxuICAgICAqICAgY2FuIG1ha2UgdG8gdGhlIHBvc3Rpb24gdGhhdCB3aWxsIGhlbHAuXG4gICAgICpcbiAgICAgKiAgIFNvbWUgZXhhbXBsZXM6XG4gICAgICogICBUaGVyZSBpcyBvbmx5IG9uZSBlcnJvciBhbmQgUHJpbWFyeSBheGlzIGlzIFZFUlRJQ0FMXG4gICAgICogICAtIHRoaXMuaGFuZGxlVmVydGljYWxBeGlzT25lVmlvbGF0aW9uIGhhcyBhIHN3aXRjaCB0aGF0IHdpbGwgdXNlIHRoZSBlcnJvciBzdW0gdG8gYXBwbHkgdGhlIGNvcnJlY3RcbiAgICAgKiAgIHRyYW5zZm9ybSB0byB0aGUgcG9zdGlvbiBiYXNlZCBvbiB0aGUgcmVkdWN0aW9uIG9mIHZpc2liaWxpdHlWaW9sYXRpb25zLlxuICAgICAqXG4gICAgICogICBUaGVyZSBhcmUgdHdvIGVycm9ycyBhbmQgUHJpbWFyeSBheGlzIGlzIEhPUklaT05UQUxcbiAgICAgKiAgIC0gaGFuZGxlSG9yaXpvbnRhbEF4aXNUd29WaW9sYXRpb25zIGhhcyBhIHN3aXRjaCB0aGF0IHVzZXMgdGhlIGVycm9yIHN1bSB0byBhcHBseSBib3RoIHRyYW5zZm9ybXMgbmVlZGVkIHRvXG4gICAgICogICBpbXByb3ZlIHRoZSBjb250ZW50IHBvc2l0aW9uIGJhc2VkIG9uIHRoZSByZWR1Y3Rpb24gb2YgdmlzaWJpbGl0eVZpb2xhdGlvbnMuXG4gICAgICovXG5cbiAgICBjb25zdCBlcnJvclN1bSA9IHZpc2liaWxpdHlWaW9sYXRpb25zLnJlZHVjZSgoY291bnQsIGN1cnJlbnQpID0+IHtcbiAgICAgIHJldHVybiBjb3VudCArIGN1cnJlbnQ7XG4gICAgfSwgMCk7XG5cbiAgICBpZiAodmlzaWJpbGl0eVZpb2xhdGlvbnMubGVuZ3RoID09PSAxICYmIHRoaXMucG9zaXRpb24uYXhpcyA9PT0gQ2xyQXhpcy5WRVJUSUNBTCkge1xuICAgICAgLy8gV2hlbiBwcmltYXJ5IGF4aXMgaXMgVkVSVElDQUwgYW5kIHRoZXJlIGlzIG9uZSB2aWV3cG9ydCB2aW9sYXRpb25cbiAgICAgIHRoaXMuaGFuZGxlVmVydGljYWxBeGlzT25lVmlvbGF0aW9uKGVycm9yU3VtKTtcbiAgICB9IGVsc2UgaWYgKHZpc2liaWxpdHlWaW9sYXRpb25zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLnBvc2l0aW9uLmF4aXMgPT09IENsckF4aXMuSE9SSVpPTlRBTCkge1xuICAgICAgLy8gV2hlbiBwcmltYXJ5IGF4aXMgaXMgSE9SSVpPTlRBTCBhbmQgdGhlcmUgaXMgb25lIHZpZXdwb3J0IHZpb2xhdGlvblxuICAgICAgdGhpcy5oYW5kbGVIb3Jpem9udGFsQXhpc09uZVZpb2xhdGlvbihlcnJvclN1bSk7XG4gICAgfSBlbHNlIGlmICh2aXNpYmlsaXR5VmlvbGF0aW9ucy5sZW5ndGggPT09IDIgJiYgdGhpcy5wb3NpdGlvbi5heGlzID09PSBDbHJBeGlzLlZFUlRJQ0FMKSB7XG4gICAgICAvLyBXaGVuIHByaW1hcnkgYXhpcyBpcyBWRVJUSUNBTCBhbmQgdGhlcmUgYXJlIHR3byB2aWV3cG9ydCB2aW9sYXRpb25zXG4gICAgICB0aGlzLmhhbmRsZVZlcnRpY2FsQXhpc1R3b1Zpb2xhdGlvbnMoZXJyb3JTdW0pO1xuICAgIH0gZWxzZSBpZiAodmlzaWJpbGl0eVZpb2xhdGlvbnMubGVuZ3RoID09PSAyICYmIHRoaXMucG9zaXRpb24uYXhpcyA9PT0gQ2xyQXhpcy5IT1JJWk9OVEFMKSB7XG4gICAgICAvLyBXaGVuIHByaW1hcnkgYXhpcyBpcyBIT1JJWk9OVEFMIGFuZCB0aGVyZSBhcmUgdHdvIHZpZXdwb3J0IHZpb2xhdGlvbnNcbiAgICAgIHRoaXMuaGFuZGxlSG9yaXpvbnRhbEF4aXNUd29WaW9sYXRpb25zKGVycm9yU3VtKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udGVudE9mZnNldHM7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVZlcnRpY2FsQXhpc09uZVZpb2xhdGlvbihlcnJvclN1bTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3dpdGNoIChlcnJvclN1bSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIC8vIEJPVFRPTSgwKSBvciBUT1AoMykgYXJlIHByaW1hcnkgdmlvbGF0aW9ucyBhbmQgd2UgY2FuIGp1c3QgZmxpcCBzaWRlc1xuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24oZmxpcFNpZGVzKHRoaXMucG9zaXRpb24pLCB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMsIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMToge1xuICAgICAgICAvLyBMRUZUKDEpIGlzIHNlY29uZGFyeSBhbmQgbmVlZHMgdG8gbnVkZ2UgY29udGVudCByaWdodFxuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24obnVkZ2VDb250ZW50KHRoaXMucG9zaXRpb24pLCB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMsIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICAvLyBSSUdIVCgyKSBpcyBzZWNvbmRhcnkgYW5kICBuZWVkcyB0byBudWRnZSBjb250ZW50IGxlZnRcbiAgICAgICAgdGhpcy5jb250ZW50T2Zmc2V0cyA9IGFsaWduKFxuICAgICAgICAgIG51ZGdlQ29udGVudCh0aGlzLnBvc2l0aW9uLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMsXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29udGVudENvb3Jkc1xuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVWZXJ0aWNhbEF4aXNUd29WaW9sYXRpb25zKGVycm9yU3VtOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGVycm9yU3VtKSB7XG4gICAgICAvLyBXZSBrbm93IHRoZXJlIGFyZSB0d28gdmlvbGF0aW9ucy4gV2UgY2FuIHVzZSB0aGUgZXJyb3JTdW0gdG8gZGV0ZXJtaW5lIHdoaWNoIGNvbWJpbmF0aW9uIG9mIHNpZGVzIHdlcmVcbiAgICAgIC8vIHZpb2xhdGVkIGFuZCBoYW5kbGUgYXBwcm9wcmlhdGVseS5cbiAgICAgIGNhc2UgNToge1xuICAgICAgICAvLyBUT1AoMykrUklHSFQoMikgaXMgY2FzZSA1LiBXZSBuZWVkIHRvIGZsaXAgc2lkZXMgYW5kIG51ZGdlIHRoZSBjb250ZW50IHRvIHRoZSBsZWZ0XG4gICAgICAgIGNvbnN0IGZsaXBBbmROdWRnZUxlZnQgPSBmbGlwU2lkZXNBbmROdWRnZUNvbnRlbnQoZmxpcFNpZGVzLCBudWRnZUNvbnRlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24oXG4gICAgICAgICAgZmxpcEFuZE51ZGdlTGVmdCh0aGlzLnBvc2l0aW9uKSxcbiAgICAgICAgICB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMsXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29udGVudENvb3Jkc1xuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgNDoge1xuICAgICAgICAvL1RPUCgzKStMRUZUKDEpIGlzIGNhc2UgNCwgd2UgbmVlZCB0byBmbGlwIHNpZGVzIGFuZCBudWRnZSBjb250ZW50IHRvIHRoZSByaWdodFxuICAgICAgICBjb25zdCBmbGlwQW5kTnVkZ2VSaWdodCA9IGZsaXBTaWRlc0FuZE51ZGdlQ29udGVudChmbGlwU2lkZXMsIG51ZGdlQ29udGVudCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24oXG4gICAgICAgICAgZmxpcEFuZE51ZGdlUmlnaHQodGhpcy5wb3NpdGlvbiksXG4gICAgICAgICAgdGhpcy5jdXJyZW50QW5jaG9yQ29vcmRzLFxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHNcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM6IHtcbiAgICAgICAgLy8gVE9QKDMpK0JPVFRPTSgwKSB8fCBsZWZ0KDEpK1JJR0hUKDIpIGlzIGNhc2UgMy4gVGhlcmUgaXMgbm90aGluZyB3ZSBjYW4gZG8gcG9zaXRpb24gd2lzZSB0byBpbXByb3ZlIHRoZVxuICAgICAgICAvLyBwbGFjZW1lbnQgZm9yIHRoaXMgY29udGVudC5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDI6IHtcbiAgICAgICAgLy8gQk9UVE9NKDApK1JJR0hUKDIpIGlzIGNhc2UgMi4gV2UgbmVlZCB0byBmbGlwIHNpZGVzIGFuZCBudWRnZSB0aGUgY29udGVudCB0byB0aGUgbGVmdFxuICAgICAgICBjb25zdCBmbGlwQW5kTnVkZ2VMZWZ0ID0gZmxpcFNpZGVzQW5kTnVkZ2VDb250ZW50KGZsaXBTaWRlcywgbnVkZ2VDb250ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5jb250ZW50T2Zmc2V0cyA9IGFsaWduKFxuICAgICAgICAgIGZsaXBBbmROdWRnZUxlZnQodGhpcy5wb3NpdGlvbiksXG4gICAgICAgICAgdGhpcy5jdXJyZW50QW5jaG9yQ29vcmRzLFxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHNcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDE6IHtcbiAgICAgICAgLy8gQk9UVE9NKDApK0xFRlQoMSkgaXMgY2FzZSAxLiBXZSBuZWVkIHRvIGZsaXAgc2lkZXMgYW5kIG51ZGdlIHRvIHRoZSByaWdodFxuICAgICAgICBjb25zdCBmbGlwQW5kTnVkZ2VSaWdodCA9IGZsaXBTaWRlc0FuZE51ZGdlQ29udGVudChmbGlwU2lkZXMsIG51ZGdlQ29udGVudCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24oXG4gICAgICAgICAgZmxpcEFuZE51ZGdlUmlnaHQodGhpcy5wb3NpdGlvbiksXG4gICAgICAgICAgdGhpcy5jdXJyZW50QW5jaG9yQ29vcmRzLFxuICAgICAgICAgIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHNcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlSG9yaXpvbnRhbEF4aXNPbmVWaW9sYXRpb24oZXJyb3JTdW06IG51bWJlcik6IHZvaWQge1xuICAgIHN3aXRjaCAoZXJyb3JTdW0pIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgIGNhc2UgMjoge1xuICAgICAgICAvLyBMRUZUKDEpIGFuZCBSSUdIVCgyKSBhcmUgcHJpbWFyeSB2aW9sYXRpb25zIHNvIHdlIGNhbiBmbGlwIHNpZGVzXG4gICAgICAgIHRoaXMuY29udGVudE9mZnNldHMgPSBhbGlnbihmbGlwU2lkZXModGhpcy5wb3NpdGlvbiksIHRoaXMuY3VycmVudEFuY2hvckNvb3JkcywgdGhpcy5jdXJyZW50Q29udGVudENvb3Jkcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAwOiB7XG4gICAgICAgIC8vIEJPVFRPTSgwKSBpcyBhIHNlY29uZGFyeSB2aW9sYXRpb24gYW5kIHdlIG5lZWQgdG8gbnVkZ2UgY29udGVudCB1cFxuICAgICAgICB0aGlzLmNvbnRlbnRPZmZzZXRzID0gYWxpZ24oXG4gICAgICAgICAgbnVkZ2VDb250ZW50KHRoaXMucG9zaXRpb24sIHRydWUpLFxuICAgICAgICAgIHRoaXMuY3VycmVudEFuY2hvckNvb3JkcyxcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZW50Q29vcmRzXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIC8vIFRPUCgzKSBpcyBhIHNlY29uZGFyeSB2aW9sYXRpb24gYW5kIHdlIG5lZWQgdG8gbnVkZ2UgY29udGVudCBkb3duXG4gICAgICAgIHRoaXMuY29udGVudE9mZnNldHMgPSBhbGlnbihudWRnZUNvbnRlbnQodGhpcy5wb3NpdGlvbiksIHRoaXMuY3VycmVudEFuY2hvckNvb3JkcywgdGhpcy5jdXJyZW50Q29udGVudENvb3Jkcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUhvcml6b250YWxBeGlzVHdvVmlvbGF0aW9ucyhlcnJvclN1bTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3dpdGNoIChlcnJvclN1bSkge1xuICAgICAgY2FzZSA1OlxuICAgICAgY2FzZSA0OiB7XG4gICAgICAgIC8vIFRPUCgzKStMRUZUKDEpIGlzIGNhc2UgNC5cbiAgICAgICAgLy8gVE9QKDMpK1JJR0hUKDIpIGlzIGNhc2UgNS5cbiAgICAgICAgLy8gSW4gYm90aCBvZiB0aGVzZSBjYXNlcyB3ZSBuZWVkIHRvIGZsaXAgc2lkZXMgYW5kIG51ZGdlIGNvbnRlbnQgZG93blxuICAgICAgICBjb25zdCBmbGlwQW5kTnVkZ2VEb3duID0gZmxpcFNpZGVzQW5kTnVkZ2VDb250ZW50KGZsaXBTaWRlcywgbnVkZ2VDb250ZW50LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29udGVudE9mZnNldHMgPSBhbGlnbihcbiAgICAgICAgICBmbGlwQW5kTnVkZ2VEb3duKHRoaXMucG9zaXRpb24pLFxuICAgICAgICAgIHRoaXMuY3VycmVudEFuY2hvckNvb3JkcyxcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb250ZW50Q29vcmRzXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIC8vIFRPUCgzKStCT1RUT00oMCkgfHwgbGVmdCgxKStSSUdIVCgyKSBpcyBjYXNlIDMuIFRoZXJlIGlzIG5vdGhpbmcgd2UgY2FuIGRvIHBvc2l0aW9uIHdpc2UgdG8gaW1wcm92ZSB0aGVcbiAgICAgICAgLy8gcGxhY2VtZW50IGZvciB0aGlzIGNvbnRlbnQuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAyOlxuICAgICAgY2FzZSAxOiB7XG4gICAgICAgIC8vIEJPVFRPTSgwKStSSUdIVCgyKSBpcyBjYXNlIDIuXG4gICAgICAgIC8vIEJPVFRPTSgwKStMRUZUKDEpIGlzIGNhc2UgMS5cbiAgICAgICAgLy8gSW4gYm90aCBjYXNlcyB3ZSAgbmVlZCB0byBmbGlwIHNpZGVzIGFuZCBudWRnZSBjb250ZW50IHVwXG4gICAgICAgIGNvbnN0IGZsaXBBbmROdWRnZVVwID0gZmxpcFNpZGVzQW5kTnVkZ2VDb250ZW50KGZsaXBTaWRlcywgbnVkZ2VDb250ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5jb250ZW50T2Zmc2V0cyA9IGFsaWduKGZsaXBBbmROdWRnZVVwKHRoaXMucG9zaXRpb24pLCB0aGlzLmN1cnJlbnRBbmNob3JDb29yZHMsIHRoaXMuY3VycmVudENvbnRlbnRDb29yZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=