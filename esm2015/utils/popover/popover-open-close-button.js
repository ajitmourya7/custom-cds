/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { ClrPopoverToggleService } from './providers/popover-toggle.service';
let ClrPopoverOpenCloseButton = class ClrPopoverOpenCloseButton {
    constructor(smartOpenService) {
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.openCloseChange = new EventEmitter();
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(change => {
            this.openCloseChange.next(change);
        }));
    }
    handleClick(event) {
        this.smartOpenService.toggleWithEvent(event);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    Output('clrPopoverOpenCloseChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrPopoverOpenCloseButton.prototype, "openCloseChange", void 0);
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MouseEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrPopoverOpenCloseButton.prototype, "handleClick", null);
ClrPopoverOpenCloseButton = tslib_1.__decorate([
    Directive({
        selector: '[clrPopoverOpenCloseButton]',
        host: {
            '[class.clr-smart-open-close]': 'true',
        },
    }),
    tslib_1.__metadata("design:paramtypes", [ClrPopoverToggleService])
], ClrPopoverOpenCloseButton);
export { ClrPopoverOpenCloseButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1vcGVuLWNsb3NlLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3BvcG92ZXIvcG9wb3Zlci1vcGVuLWNsb3NlLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUzdFLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBR3BDLFlBQW9CLGdCQUF5QztRQUF6QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FBRnJELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQVVOLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFQeEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBS0QsV0FBVyxDQUFDLEtBQWlCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDRixDQUFBO0FBVnNDO0lBQXBDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztzQ0FBa0IsWUFBWTtrRUFBd0M7QUFHMUc7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNmLFVBQVU7OzREQUU1QjtBQWhCVSx5QkFBeUI7SUFOckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxJQUFJLEVBQUU7WUFDSiw4QkFBOEIsRUFBRSxNQUFNO1NBQ3ZDO0tBQ0YsQ0FBQzs2Q0FJc0MsdUJBQXVCO0dBSGxELHlCQUF5QixDQXFCckM7U0FyQlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci10b2dnbGUuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NsclBvcG92ZXJPcGVuQ2xvc2VCdXR0b25dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLXNtYXJ0LW9wZW4tY2xvc2VdJzogJ3RydWUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJQb3BvdmVyT3BlbkNsb3NlQnV0dG9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc21hcnRPcGVuU2VydmljZTogQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS5vcGVuQ2hhbmdlLnN1YnNjcmliZShjaGFuZ2UgPT4ge1xuICAgICAgICB0aGlzLm9wZW5DbG9zZUNoYW5nZS5uZXh0KGNoYW5nZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBAT3V0cHV0KCdjbHJQb3BvdmVyT3BlbkNsb3NlQ2hhbmdlJykgb3BlbkNsb3NlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuc21hcnRPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19