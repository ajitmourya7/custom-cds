import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef } from '@angular/core';
import { ResponsiveNavigationService } from '../nav/providers/responsive-navigation.service';
import { ResponsiveNavCodes } from '../nav/responsive-nav-codes';
var ClrMainContainer = /** @class */ (function () {
    function ClrMainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    ClrMainContainer.prototype.ngOnInit = function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: function (message) {
                _this.processMessage(message);
            },
        });
    };
    ClrMainContainer.prototype.processMessage = function (message) {
        var navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    };
    ClrMainContainer.prototype.controlNav = function (controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    };
    ClrMainContainer.prototype.ngOnDestroy = function () {
        try {
            this._subscription.unsubscribe();
        }
        catch (error) {
        }
    };
    ClrMainContainer = tslib_1.__decorate([
        Directive({ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, ResponsiveNavigationService])
    ], ClrMainContainer);
    return ClrMainContainer;
}());
export { ClrMainContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbWFpbi1jb250YWluZXIvbWFpbi1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHekUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDN0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJakU7SUFJRSwwQkFBb0IsS0FBaUIsRUFBVSxvQkFBaUQ7UUFBNUUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7SUFBRyxDQUFDO0lBRXBHLG1DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxFQUFFLFVBQUMsT0FBb0M7Z0JBQ3pDLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsT0FBb0M7UUFDakQsSUFBSSxRQUFRLEdBQVcsa0JBQWtCLENBQUMsd0JBQXdCLENBQUM7UUFDbkUsSUFBSSxPQUFPLENBQUMsV0FBVyxLQUFLLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDOUQsUUFBUSxHQUFHLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsV0FBbUIsRUFBRSxRQUFnQjtRQUM5QyxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7YUFBTSxJQUFJLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUk7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO1FBQUMsT0FBTyxLQUFLLEVBQUU7U0FFZjtJQUNILENBQUM7SUE1Q1UsZ0JBQWdCO1FBRDVCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2lEQUs3RCxVQUFVLEVBQWdDLDJCQUEyQjtPQUpyRixnQkFBZ0IsQ0E2QzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQTdDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbmF2L3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zaXZlTmF2Q29kZXMgfSBmcm9tICcuLi9uYXYvcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlIH0gZnJvbSAnLi4vbmF2L3Jlc3BvbnNpdmUtbmF2LWNvbnRyb2wtbWVzc2FnZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Nsci1tYWluLWNvbnRhaW5lcicsIGhvc3Q6IHsgJ1tjbGFzcy5tYWluLWNvbnRhaW5lcl0nOiAndHJ1ZScgfSB9KVxuZXhwb3J0IGNsYXNzIENsck1haW5Db250YWluZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9jbGFzc0xpc3Q6IERPTVRva2VuTGlzdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlc3BvbnNpdmVOYXZTZXJ2aWNlOiBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY2xhc3NMaXN0ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLm5hdkNvbnRyb2wuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6IChtZXNzYWdlOiBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5wcm9jZXNzTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzTWVzc2FnZShtZXNzYWdlOiBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBsZXQgbmF2Q2xhc3M6IHN0cmluZyA9IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xBU1NfSEFNQlVSR0VSX01FTlU7XG4gICAgaWYgKG1lc3NhZ2UuY29udHJvbENvZGUgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xPU0VfQUxMKSB7XG4gICAgICB0aGlzLl9jbGFzc0xpc3QucmVtb3ZlKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xBU1NfSEFNQlVSR0VSX01FTlUpO1xuICAgICAgdGhpcy5fY2xhc3NMaXN0LnJlbW92ZShSZXNwb25zaXZlTmF2Q29kZXMuTkFWX0NMQVNTX09WRVJGTE9XX01FTlUpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5uYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSB7XG4gICAgICB0aGlzLmNvbnRyb2xOYXYobWVzc2FnZS5jb250cm9sQ29kZSwgbmF2Q2xhc3MpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5uYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKSB7XG4gICAgICBuYXZDbGFzcyA9IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xBU1NfT1ZFUkZMT1dfTUVOVTtcbiAgICAgIHRoaXMuY29udHJvbE5hdihtZXNzYWdlLmNvbnRyb2xDb2RlLCBuYXZDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgY29udHJvbE5hdihjb250cm9sQ29kZTogc3RyaW5nLCBuYXZDbGFzczogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGNvbnRyb2xDb2RlID09PSBSZXNwb25zaXZlTmF2Q29kZXMuTkFWX09QRU4pIHtcbiAgICAgIHRoaXMuX2NsYXNzTGlzdC5hZGQobmF2Q2xhc3MpO1xuICAgIH0gZWxzZSBpZiAoY29udHJvbENvZGUgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfQ0xPU0UpIHtcbiAgICAgIHRoaXMuX2NsYXNzTGlzdC5yZW1vdmUobmF2Q2xhc3MpO1xuICAgIH0gZWxzZSBpZiAoY29udHJvbENvZGUgPT09IFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfVE9HR0xFKSB7XG4gICAgICB0aGlzLl9jbGFzc0xpc3QudG9nZ2xlKG5hdkNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBcbiAgICB9XG4gIH1cbn1cbiJdfQ==