/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import { ClrViewportViolation } from './enums/viewport-violation.enum';
import { ClrAlignment } from './enums/alignment.enum';
export const flipSides = position => {
    return Object.assign({}, position, { side: -1 * position.side });
};
// This could be used in more advanced positioning algorithms.
// flipAxisFlipSideAndNudgeContent(flipAxis, flipSide, nudge, nudgeForward?): ClrTransform {...}
// I would like to keep it for now.
export const flipAxis = position => {
    return Object.assign({}, position, { axis: position.axis === 0 ? 1 : 0 });
};
export const nudgeContent = (position, forward) => {
    const nextAlignment = position.content + (forward ? 0.5 : -0.5);
    if (nextAlignment < 0 || nextAlignment > 1) {
        return position;
    }
    else {
        return Object.assign({}, position, { content: nextAlignment });
    }
};
export function flipSidesAndNudgeContent(flip, nudge, nudgeBack) {
    return (position) => nudge(flip(position), nudgeBack);
}
export function align(position, anchor, content) {
    let xDiff = anchor.left;
    let yDiff = anchor.top;
    // When ClrAxis is VERTICAL BEFORE = left, AFTER = right
    // When ClrAxis is HORIZONTAL BEFORE is top, AFTER is bottom
    switch (position.axis + position.side) {
        case -1: {
            // ClrAxis.VERTICAL + ClrSide.BEFORE
            xDiff += alignHorizontal(position, anchor, content);
            yDiff -= content.height; // pull content up to the top of the anchor
            break;
        }
        case 1: {
            // ClrAxis.VERTICAL + ClrSide.AFTER
            xDiff += alignHorizontal(position, anchor, content);
            yDiff += anchor.height; // push the content down to below the anchor
            break;
        }
        case 0: {
            // ClrAxis.HORIZONTAL + ClrSide.BEFORE
            xDiff -= content.width; // pull the content left of the anchor
            yDiff += alignVertical(position, anchor, content);
            break;
        }
        case 2: {
            // ClrAxis.HORIZONTAL + ClrSide.AFTER
            xDiff += anchor.width; // push the content right of of the anchor
            yDiff += alignVertical(position, anchor, content);
            break;
        }
        default: {
            break;
        }
    }
    return { xOffset: xDiff, yOffset: yDiff };
}
function alignHorizontal(position, anchor, content) {
    let horizontalOffset = 0;
    // horizontal offset for the anchor position
    switch (position.anchor /*calculate for the anchor alignment*/) {
        case ClrAlignment.START: {
            // nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            horizontalOffset += anchor.width / 2; // push content over 1/2 anchor width
            break;
        }
        case ClrAlignment.END: {
            horizontalOffset += anchor.width; //  push content over width of the anchor
            break;
        }
        default: {
            break;
        }
    }
    // horizontal offsets for anchor alignment
    switch (position.content // calculate for the content alignment
    ) {
        case ClrAlignment.START: {
            // Nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            horizontalOffset -= content.width / 2; // pull content left by a value of 1/2 content width
            break;
        }
        case ClrAlignment.END: {
            // subtract the width of currentContent from horizontalOffset to pull it back
            horizontalOffset -= content.width;
            break;
        }
        default: {
            break;
        }
    }
    return horizontalOffset;
}
function alignVertical(position, anchor, content) {
    // y axis offsets for anchor alignment
    let verticalOffset = 0;
    // Calculate y offset for anchor position
    switch (position.anchor) {
        case ClrAlignment.START: {
            // nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            verticalOffset += anchor.height / 2; // push content down to the middle of the anchor rect
            break;
        }
        case ClrAlignment.END: {
            verticalOffset += anchor.height; // push content down to the bottom of the anchor
            break;
        }
        default: {
            break;
        }
    }
    // Calculate y offsets for content alignment
    switch (position.content) {
        case ClrAlignment.START: {
            // aligned to the top of the content rect
            break;
        }
        case ClrAlignment.CENTER: {
            verticalOffset -= content.height / 2; // pull content back up to the middle of the content rect
            break;
        }
        case ClrAlignment.END: {
            verticalOffset -= content.height; // pull content back up to the bottom of the content rect
            break;
        }
        default: {
            break;
        }
    }
    return verticalOffset;
}
export function testVisibility(offset, content) {
    const violations = [];
    const mockCoords = {
        bottom: offset.yOffset + content.height,
        left: offset.xOffset,
        right: offset.xOffset + content.width,
        top: offset.yOffset,
    };
    if (!(mockCoords.top >= 0)) {
        violations.push(ClrViewportViolation.TOP);
    }
    if (!(mockCoords.left >= 0)) {
        violations.push(ClrViewportViolation.LEFT);
    }
    if (!(mockCoords.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
        violations.push(ClrViewportViolation.BOTTOM);
    }
    if (!(mockCoords.right <= (window.innerWidth || document.documentElement.clientWidth))) {
        violations.push(ClrViewportViolation.RIGHT);
    }
    return violations;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24tb3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvcG9wb3Zlci9wb3NpdGlvbi1vcGVyYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFJSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFLdEQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFpQixRQUFRLENBQUMsRUFBRTtJQUNoRCx5QkFDSyxRQUFRLElBQ1gsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQ3hCO0FBQ0osQ0FBQyxDQUFDO0FBRUYsOERBQThEO0FBQzlELGdHQUFnRztBQUNoRyxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFpQixRQUFRLENBQUMsRUFBRTtJQUMvQyx5QkFDSyxRQUFRLElBQ1gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFDakM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzlELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRSxJQUFJLGFBQWEsR0FBRyxDQUFDLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtRQUMxQyxPQUFPLFFBQVEsQ0FBQztLQUNqQjtTQUFNO1FBQ0wseUJBQ0ssUUFBUSxJQUNYLE9BQU8sRUFBRSxhQUFhLElBQ3RCO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFBa0IsRUFBRSxLQUFtQixFQUFFLFNBQW1CO0lBQ25HLE9BQU8sQ0FBQyxRQUE0QixFQUFzQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNoRyxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUssQ0FBQyxRQUE0QixFQUFFLE1BQWtCLEVBQUUsT0FBbUI7SUFDekYsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUN4QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBRXZCLHdEQUF3RDtJQUN4RCw0REFBNEQ7SUFDNUQsUUFBUSxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDckMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1Asb0NBQW9DO1lBQ3BDLEtBQUssSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLDJDQUEyQztZQUNwRSxNQUFNO1NBQ1A7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ04sbUNBQW1DO1lBQ25DLEtBQUssSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDRDQUE0QztZQUNwRSxNQUFNO1NBQ1A7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ04sc0NBQXNDO1lBQ3RDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsc0NBQXNDO1lBQzlELEtBQUssSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsRCxNQUFNO1NBQ1A7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ04scUNBQXFDO1lBQ3JDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsMENBQTBDO1lBQ2pFLEtBQUssSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsRCxNQUFNO1NBQ1A7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU07U0FDUDtLQUNGO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxRQUE0QixFQUFFLE1BQWtCLEVBQUUsT0FBbUI7SUFDNUYsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDekIsNENBQTRDO0lBQzVDLFFBQVEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsRUFBRTtRQUM5RCxLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2Qiw0QkFBNEI7WUFDNUIsTUFBTTtTQUNQO1FBQ0QsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsZ0JBQWdCLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7WUFDM0UsTUFBTTtTQUNQO1FBQ0QsS0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsZ0JBQWdCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLHlDQUF5QztZQUMzRSxNQUFNO1NBQ1A7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU07U0FDUDtLQUNGO0lBRUQsMENBQTBDO0lBQzFDLFFBQ0UsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0M7TUFDdkQ7UUFDQSxLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2Qiw0QkFBNEI7WUFDNUIsTUFBTTtTQUNQO1FBQ0QsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsZ0JBQWdCLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxvREFBb0Q7WUFDM0YsTUFBTTtTQUNQO1FBQ0QsS0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsNkVBQTZFO1lBQzdFLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbEMsTUFBTTtTQUNQO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxNQUFNO1NBQ1A7S0FDRjtJQUVELE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLFFBQTRCLEVBQUUsTUFBa0IsRUFBRSxPQUFtQjtJQUMxRixzQ0FBc0M7SUFDdEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBRXZCLHlDQUF5QztJQUN6QyxRQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDdkIsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsNEJBQTRCO1lBQzVCLE1BQU07U0FDUDtRQUNELEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLGNBQWMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLHFEQUFxRDtZQUMxRixNQUFNO1NBQ1A7UUFDRCxLQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixjQUFjLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdEQUFnRDtZQUNqRixNQUFNO1NBQ1A7UUFDRCxPQUFPLENBQUMsQ0FBQztZQUNQLE1BQU07U0FDUDtLQUNGO0lBRUQsNENBQTRDO0lBQzVDLFFBQVEsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUN4QixLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2Qix5Q0FBeUM7WUFDekMsTUFBTTtTQUNQO1FBQ0QsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsY0FBYyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMseURBQXlEO1lBQy9GLE1BQU07U0FDUDtRQUNELEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLGNBQWMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMseURBQXlEO1lBQzNGLE1BQU07U0FDUDtRQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsTUFBTTtTQUNQO0tBQ0Y7SUFDRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUErQixFQUFFLE9BQW1CO0lBQ2pGLE1BQU0sVUFBVSxHQUEyQixFQUFFLENBQUM7SUFDOUMsTUFBTSxVQUFVLEdBQXdCO1FBQ3RDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNO1FBQ3ZDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztRQUNwQixLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSztRQUNyQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU87S0FDcEIsQ0FBQztJQUVGLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDMUIsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQztJQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QztJQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtRQUN6RixVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO1FBQ3RGLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0M7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cblxuaW1wb3J0IHsgQ2xyUG9wb3ZlclBvc2l0aW9uIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3BvcG92ZXItcG9zaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENsclBvcG92ZXJDb250ZW50T2Zmc2V0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3BvcG92ZXItY29udGVudC1vZmZzZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENsclZpZXdwb3J0VmlvbGF0aW9uIH0gZnJvbSAnLi9lbnVtcy92aWV3cG9ydC12aW9sYXRpb24uZW51bSc7XG5pbXBvcnQgeyBDbHJWaXNpYmlsaXR5Q29vcmRzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Zpc2liaWxpdHktY29vcmRzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDbHJBbGlnbm1lbnQgfSBmcm9tICcuL2VudW1zL2FsaWdubWVudC5lbnVtJztcblxuLy8gUHV0IHRoZSBmb3J3YXJkIGFyZyBoZXJlIGJ1dCBpdCBpcyBvbmx5IG5lZWRlZCB3aGVuIG51ZGdpbmcgY29udGVudCBvciBhbmNob3JzLlxuZXhwb3J0IHR5cGUgQ2xyVHJhbnNmb3JtID0gKHBvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb24sIGJhY2s/OiBib29sZWFuKSA9PiBDbHJQb3BvdmVyUG9zaXRpb247XG5cbmV4cG9ydCBjb25zdCBmbGlwU2lkZXM6IENsclRyYW5zZm9ybSA9IHBvc2l0aW9uID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wb3NpdGlvbixcbiAgICBzaWRlOiAtMSAqIHBvc2l0aW9uLnNpZGUsXG4gIH07XG59O1xuXG4vLyBUaGlzIGNvdWxkIGJlIHVzZWQgaW4gbW9yZSBhZHZhbmNlZCBwb3NpdGlvbmluZyBhbGdvcml0aG1zLlxuLy8gZmxpcEF4aXNGbGlwU2lkZUFuZE51ZGdlQ29udGVudChmbGlwQXhpcywgZmxpcFNpZGUsIG51ZGdlLCBudWRnZUZvcndhcmQ/KTogQ2xyVHJhbnNmb3JtIHsuLi59XG4vLyBJIHdvdWxkIGxpa2UgdG8ga2VlcCBpdCBmb3Igbm93LlxuZXhwb3J0IGNvbnN0IGZsaXBBeGlzOiBDbHJUcmFuc2Zvcm0gPSBwb3NpdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucG9zaXRpb24sXG4gICAgYXhpczogcG9zaXRpb24uYXhpcyA9PT0gMCA/IDEgOiAwLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG51ZGdlQ29udGVudDogQ2xyVHJhbnNmb3JtID0gKHBvc2l0aW9uLCBmb3J3YXJkKSA9PiB7XG4gIGNvbnN0IG5leHRBbGlnbm1lbnQgPSBwb3NpdGlvbi5jb250ZW50ICsgKGZvcndhcmQgPyAwLjUgOiAtMC41KTtcbiAgaWYgKG5leHRBbGlnbm1lbnQgPCAwIHx8IG5leHRBbGlnbm1lbnQgPiAxKSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5wb3NpdGlvbixcbiAgICAgIGNvbnRlbnQ6IG5leHRBbGlnbm1lbnQsXG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZsaXBTaWRlc0FuZE51ZGdlQ29udGVudChmbGlwOiBDbHJUcmFuc2Zvcm0sIG51ZGdlOiBDbHJUcmFuc2Zvcm0sIG51ZGdlQmFjaz86IGJvb2xlYW4pOiBDbHJUcmFuc2Zvcm0ge1xuICByZXR1cm4gKHBvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb24pOiBDbHJQb3BvdmVyUG9zaXRpb24gPT4gbnVkZ2UoZmxpcChwb3NpdGlvbiksIG51ZGdlQmFjayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbihwb3NpdGlvbjogQ2xyUG9wb3ZlclBvc2l0aW9uLCBhbmNob3I6IENsaWVudFJlY3QsIGNvbnRlbnQ6IENsaWVudFJlY3QpOiBDbHJQb3BvdmVyQ29udGVudE9mZnNldCB7XG4gIGxldCB4RGlmZiA9IGFuY2hvci5sZWZ0O1xuICBsZXQgeURpZmYgPSBhbmNob3IudG9wO1xuXG4gIC8vIFdoZW4gQ2xyQXhpcyBpcyBWRVJUSUNBTCBCRUZPUkUgPSBsZWZ0LCBBRlRFUiA9IHJpZ2h0XG4gIC8vIFdoZW4gQ2xyQXhpcyBpcyBIT1JJWk9OVEFMIEJFRk9SRSBpcyB0b3AsIEFGVEVSIGlzIGJvdHRvbVxuICBzd2l0Y2ggKHBvc2l0aW9uLmF4aXMgKyBwb3NpdGlvbi5zaWRlKSB7XG4gICAgY2FzZSAtMToge1xuICAgICAgLy8gQ2xyQXhpcy5WRVJUSUNBTCArIENsclNpZGUuQkVGT1JFXG4gICAgICB4RGlmZiArPSBhbGlnbkhvcml6b250YWwocG9zaXRpb24sIGFuY2hvciwgY29udGVudCk7XG4gICAgICB5RGlmZiAtPSBjb250ZW50LmhlaWdodDsgLy8gcHVsbCBjb250ZW50IHVwIHRvIHRoZSB0b3Agb2YgdGhlIGFuY2hvclxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgMToge1xuICAgICAgLy8gQ2xyQXhpcy5WRVJUSUNBTCArIENsclNpZGUuQUZURVJcbiAgICAgIHhEaWZmICs9IGFsaWduSG9yaXpvbnRhbChwb3NpdGlvbiwgYW5jaG9yLCBjb250ZW50KTtcbiAgICAgIHlEaWZmICs9IGFuY2hvci5oZWlnaHQ7IC8vIHB1c2ggdGhlIGNvbnRlbnQgZG93biB0byBiZWxvdyB0aGUgYW5jaG9yXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAwOiB7XG4gICAgICAvLyBDbHJBeGlzLkhPUklaT05UQUwgKyBDbHJTaWRlLkJFRk9SRVxuICAgICAgeERpZmYgLT0gY29udGVudC53aWR0aDsgLy8gcHVsbCB0aGUgY29udGVudCBsZWZ0IG9mIHRoZSBhbmNob3JcbiAgICAgIHlEaWZmICs9IGFsaWduVmVydGljYWwocG9zaXRpb24sIGFuY2hvciwgY29udGVudCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAyOiB7XG4gICAgICAvLyBDbHJBeGlzLkhPUklaT05UQUwgKyBDbHJTaWRlLkFGVEVSXG4gICAgICB4RGlmZiArPSBhbmNob3Iud2lkdGg7IC8vIHB1c2ggdGhlIGNvbnRlbnQgcmlnaHQgb2Ygb2YgdGhlIGFuY2hvclxuICAgICAgeURpZmYgKz0gYWxpZ25WZXJ0aWNhbChwb3NpdGlvbiwgYW5jaG9yLCBjb250ZW50KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgeE9mZnNldDogeERpZmYsIHlPZmZzZXQ6IHlEaWZmIH07XG59XG5cbmZ1bmN0aW9uIGFsaWduSG9yaXpvbnRhbChwb3NpdGlvbjogQ2xyUG9wb3ZlclBvc2l0aW9uLCBhbmNob3I6IENsaWVudFJlY3QsIGNvbnRlbnQ6IENsaWVudFJlY3QpOiBudW1iZXIge1xuICBsZXQgaG9yaXpvbnRhbE9mZnNldCA9IDA7XG4gIC8vIGhvcml6b250YWwgb2Zmc2V0IGZvciB0aGUgYW5jaG9yIHBvc2l0aW9uXG4gIHN3aXRjaCAocG9zaXRpb24uYW5jaG9yIC8qY2FsY3VsYXRlIGZvciB0aGUgYW5jaG9yIGFsaWdubWVudCovKSB7XG4gICAgY2FzZSBDbHJBbGlnbm1lbnQuU1RBUlQ6IHtcbiAgICAgIC8vIG5vdGhpbmcgdG8gY2FsY3VsYXRlIGhlcmVcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIENsckFsaWdubWVudC5DRU5URVI6IHtcbiAgICAgIGhvcml6b250YWxPZmZzZXQgKz0gYW5jaG9yLndpZHRoIC8gMjsgLy8gcHVzaCBjb250ZW50IG92ZXIgMS8yIGFuY2hvciB3aWR0aFxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2xyQWxpZ25tZW50LkVORDoge1xuICAgICAgaG9yaXpvbnRhbE9mZnNldCArPSBhbmNob3Iud2lkdGg7IC8vICBwdXNoIGNvbnRlbnQgb3ZlciB3aWR0aCBvZiB0aGUgYW5jaG9yXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gaG9yaXpvbnRhbCBvZmZzZXRzIGZvciBhbmNob3IgYWxpZ25tZW50XG4gIHN3aXRjaCAoXG4gICAgcG9zaXRpb24uY29udGVudCAvLyBjYWxjdWxhdGUgZm9yIHRoZSBjb250ZW50IGFsaWdubWVudFxuICApIHtcbiAgICBjYXNlIENsckFsaWdubWVudC5TVEFSVDoge1xuICAgICAgLy8gTm90aGluZyB0byBjYWxjdWxhdGUgaGVyZVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2xyQWxpZ25tZW50LkNFTlRFUjoge1xuICAgICAgaG9yaXpvbnRhbE9mZnNldCAtPSBjb250ZW50LndpZHRoIC8gMjsgLy8gcHVsbCBjb250ZW50IGxlZnQgYnkgYSB2YWx1ZSBvZiAxLzIgY29udGVudCB3aWR0aFxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2xyQWxpZ25tZW50LkVORDoge1xuICAgICAgLy8gc3VidHJhY3QgdGhlIHdpZHRoIG9mIGN1cnJlbnRDb250ZW50IGZyb20gaG9yaXpvbnRhbE9mZnNldCB0byBwdWxsIGl0IGJhY2tcbiAgICAgIGhvcml6b250YWxPZmZzZXQgLT0gY29udGVudC53aWR0aDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG9yaXpvbnRhbE9mZnNldDtcbn1cblxuZnVuY3Rpb24gYWxpZ25WZXJ0aWNhbChwb3NpdGlvbjogQ2xyUG9wb3ZlclBvc2l0aW9uLCBhbmNob3I6IENsaWVudFJlY3QsIGNvbnRlbnQ6IENsaWVudFJlY3QpOiBudW1iZXIge1xuICAvLyB5IGF4aXMgb2Zmc2V0cyBmb3IgYW5jaG9yIGFsaWdubWVudFxuICBsZXQgdmVydGljYWxPZmZzZXQgPSAwO1xuXG4gIC8vIENhbGN1bGF0ZSB5IG9mZnNldCBmb3IgYW5jaG9yIHBvc2l0aW9uXG4gIHN3aXRjaCAocG9zaXRpb24uYW5jaG9yKSB7XG4gICAgY2FzZSBDbHJBbGlnbm1lbnQuU1RBUlQ6IHtcbiAgICAgIC8vIG5vdGhpbmcgdG8gY2FsY3VsYXRlIGhlcmVcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIENsckFsaWdubWVudC5DRU5URVI6IHtcbiAgICAgIHZlcnRpY2FsT2Zmc2V0ICs9IGFuY2hvci5oZWlnaHQgLyAyOyAvLyBwdXNoIGNvbnRlbnQgZG93biB0byB0aGUgbWlkZGxlIG9mIHRoZSBhbmNob3IgcmVjdFxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2xyQWxpZ25tZW50LkVORDoge1xuICAgICAgdmVydGljYWxPZmZzZXQgKz0gYW5jaG9yLmhlaWdodDsgLy8gcHVzaCBjb250ZW50IGRvd24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgYW5jaG9yXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIHkgb2Zmc2V0cyBmb3IgY29udGVudCBhbGlnbm1lbnRcbiAgc3dpdGNoIChwb3NpdGlvbi5jb250ZW50KSB7XG4gICAgY2FzZSBDbHJBbGlnbm1lbnQuU1RBUlQ6IHtcbiAgICAgIC8vIGFsaWduZWQgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCByZWN0XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBDbHJBbGlnbm1lbnQuQ0VOVEVSOiB7XG4gICAgICB2ZXJ0aWNhbE9mZnNldCAtPSBjb250ZW50LmhlaWdodCAvIDI7IC8vIHB1bGwgY29udGVudCBiYWNrIHVwIHRvIHRoZSBtaWRkbGUgb2YgdGhlIGNvbnRlbnQgcmVjdFxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2xyQWxpZ25tZW50LkVORDoge1xuICAgICAgdmVydGljYWxPZmZzZXQgLT0gY29udGVudC5oZWlnaHQ7IC8vIHB1bGwgY29udGVudCBiYWNrIHVwIHRvIHRoZSBib3R0b20gb2YgdGhlIGNvbnRlbnQgcmVjdFxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmVydGljYWxPZmZzZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0VmlzaWJpbGl0eShvZmZzZXQ6IENsclBvcG92ZXJDb250ZW50T2Zmc2V0LCBjb250ZW50OiBDbGllbnRSZWN0KTogQ2xyVmlld3BvcnRWaW9sYXRpb25bXSB7XG4gIGNvbnN0IHZpb2xhdGlvbnM6IENsclZpZXdwb3J0VmlvbGF0aW9uW10gPSBbXTtcbiAgY29uc3QgbW9ja0Nvb3JkczogQ2xyVmlzaWJpbGl0eUNvb3JkcyA9IHtcbiAgICBib3R0b206IG9mZnNldC55T2Zmc2V0ICsgY29udGVudC5oZWlnaHQsXG4gICAgbGVmdDogb2Zmc2V0LnhPZmZzZXQsXG4gICAgcmlnaHQ6IG9mZnNldC54T2Zmc2V0ICsgY29udGVudC53aWR0aCxcbiAgICB0b3A6IG9mZnNldC55T2Zmc2V0LFxuICB9O1xuXG4gIGlmICghKG1vY2tDb29yZHMudG9wID49IDApKSB7XG4gICAgdmlvbGF0aW9ucy5wdXNoKENsclZpZXdwb3J0VmlvbGF0aW9uLlRPUCk7XG4gIH1cbiAgaWYgKCEobW9ja0Nvb3Jkcy5sZWZ0ID49IDApKSB7XG4gICAgdmlvbGF0aW9ucy5wdXNoKENsclZpZXdwb3J0VmlvbGF0aW9uLkxFRlQpO1xuICB9XG4gIGlmICghKG1vY2tDb29yZHMuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpKSB7XG4gICAgdmlvbGF0aW9ucy5wdXNoKENsclZpZXdwb3J0VmlvbGF0aW9uLkJPVFRPTSk7XG4gIH1cbiAgaWYgKCEobW9ja0Nvb3Jkcy5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSkpIHtcbiAgICB2aW9sYXRpb25zLnB1c2goQ2xyVmlld3BvcnRWaW9sYXRpb24uUklHSFQpO1xuICB9XG5cbiAgcmV0dXJuIHZpb2xhdGlvbnM7XG59XG4iXX0=