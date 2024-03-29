import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ResponsiveNavigationService } from './providers/responsive-navigation.service';
import { ResponsiveNavCodes } from './responsive-nav-codes';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService, commonStrings) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    ClrHeader.prototype.resetNavTriggers = function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    // decides which triggers to show on the header
    ClrHeader.prototype.initializeNavTriggers = function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    // closes the nav that is open
    ClrHeader.prototype.closeOpenNav = function () {
        this.responsiveNavService.closeAllNavs();
    };
    // toggles the nav that is open
    ClrHeader.prototype.toggleNav = function (navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    ClrHeader.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ClrHeader = tslib_1.__decorate([
        Component({
            selector: 'clr-header',
            template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.keys.open : commonStrings.keys.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.keys.open : commonStrings.keys.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
            host: { '[class.header]': 'true' }
        }),
        tslib_1.__metadata("design:paramtypes", [ResponsiveNavigationService,
            ClrCommonStringsService])
    ], ClrHeader);
    return ClrHeader;
}());
export { ClrHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L25hdi9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBMEJsRjtJQU9FLG1CQUNVLG9CQUFpRCxFQUNsRCxhQUFzQztRQUYvQyxpQkFTQztRQVJTLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7UUFDbEQsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBUi9DLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBVyxJQUFJLENBQUM7UUFDNUIsdUJBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFPdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUN0RSxJQUFJLEVBQUUsVUFBQyxZQUFzQjtnQkFDM0IsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUdBQWlHO0lBQ2pHLG9DQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLHlDQUFxQixHQUFyQixVQUFzQixPQUFpQjtRQUF2QyxpQkFhQztRQVpDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQ3RCLElBQUksUUFBUSxLQUFLLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7YUFDL0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBOEI7SUFDOUIsZ0NBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLDZCQUFTLEdBQVQsVUFBVSxRQUFnQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBckRVLFNBQVM7UUF4QnJCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwwM0JBbUJQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFO1NBQ25DLENBQUM7aURBU2dDLDJCQUEyQjtZQUNuQyx1QkFBdUI7T0FUcEMsU0FBUyxDQXNEckI7SUFBRCxnQkFBQztDQUFBLEFBdERELElBc0RDO1NBdERZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jlc3BvbnNpdmUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3BvbnNpdmVOYXZDb2RlcyB9IGZyb20gJy4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAqbmdJZj1cImlzTmF2TGV2ZWwxT25QYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGVhZGVyLWhhbWJ1cmdlci10cmlnZ2VyXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiKG9wZW5OYXZMZXZlbCAhPT0gcmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSA/IGNvbW1vblN0cmluZ3Mua2V5cy5vcGVuIDogY29tbW9uU3RyaW5ncy5rZXlzLmNsb3NlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVOYXYocmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKVwiPlxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNOYXZMZXZlbDJPblBhZ2VcIlxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkZXItb3ZlcmZsb3ctdHJpZ2dlclwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihvcGVuTmF2TGV2ZWwgIT09IHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMikgPyBjb21tb25TdHJpbmdzLmtleXMub3BlbiA6IGNvbW1vblN0cmluZ3Mua2V5cy5jbG9zZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlTmF2KHJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfTEVWRUxfMilcIj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYmFja2Ryb3BcIiAoY2xpY2spPVwiY2xvc2VPcGVuTmF2KClcIj48L2Rpdj5cbiAgICBgLFxuICBob3N0OiB7ICdbY2xhc3MuaGVhZGVyXSc6ICd0cnVlJyB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJIZWFkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBpc05hdkxldmVsMU9uUGFnZSA9IGZhbHNlO1xuICBpc05hdkxldmVsMk9uUGFnZSA9IGZhbHNlO1xuICBvcGVuTmF2TGV2ZWw6IG51bWJlciA9IG51bGw7XG4gIHJlc3BvbnNpdmVOYXZDb2RlcyA9IFJlc3BvbnNpdmVOYXZDb2RlcztcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNwb25zaXZlTmF2U2VydmljZTogUmVzcG9uc2l2ZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLnJlZ2lzdGVyZWROYXZzLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAobmF2TGV2ZWxMaXN0OiBudW1iZXJbXSkgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVOYXZUcmlnZ2VycyhuYXZMZXZlbExpc3QpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlc2V0IHRyaWdnZXJzLiBoYW5kbGVzIGNhc2VzIHdoZW4gYW4gYXBwbGljYXRpb24gaGFzIGRpZmZlcmVudCBuYXYgbGV2ZWxzIG9uIGRpZmZlcmVudCBwYWdlcy5cbiAgcmVzZXROYXZUcmlnZ2VycygpIHtcbiAgICB0aGlzLmlzTmF2TGV2ZWwxT25QYWdlID0gZmFsc2U7XG4gICAgdGhpcy5pc05hdkxldmVsMk9uUGFnZSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gZGVjaWRlcyB3aGljaCB0cmlnZ2VycyB0byBzaG93IG9uIHRoZSBoZWFkZXJcbiAgaW5pdGlhbGl6ZU5hdlRyaWdnZXJzKG5hdkxpc3Q6IG51bWJlcltdKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldE5hdlRyaWdnZXJzKCk7XG4gICAgaWYgKG5hdkxpc3QubGVuZ3RoID4gMikge1xuICAgICAgY29uc29sZS5lcnJvcignTW9yZSB0aGFuIDIgTmF2IExldmVscyBkZXRlY3RlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmF2TGlzdC5mb3JFYWNoKG5hdkxldmVsID0+IHtcbiAgICAgIGlmIChuYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8xKSB7XG4gICAgICAgIHRoaXMuaXNOYXZMZXZlbDFPblBhZ2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuYXZMZXZlbCA9PT0gUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9MRVZFTF8yKSB7XG4gICAgICAgIHRoaXMuaXNOYXZMZXZlbDJPblBhZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY2xvc2VzIHRoZSBuYXYgdGhhdCBpcyBvcGVuXG4gIGNsb3NlT3Blbk5hdigpIHtcbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZTZXJ2aWNlLmNsb3NlQWxsTmF2cygpO1xuICB9XG5cbiAgLy8gdG9nZ2xlcyB0aGUgbmF2IHRoYXQgaXMgb3BlblxuICB0b2dnbGVOYXYobmF2TGV2ZWw6IG51bWJlcikge1xuICAgIHRoaXMub3Blbk5hdkxldmVsID0gdGhpcy5vcGVuTmF2TGV2ZWwgPT09IG5hdkxldmVsID8gbnVsbCA6IG5hdkxldmVsO1xuICAgIHRoaXMucmVzcG9uc2l2ZU5hdlNlcnZpY2Uuc2VuZENvbnRyb2xNZXNzYWdlKFJlc3BvbnNpdmVOYXZDb2Rlcy5OQVZfVE9HR0xFLCBuYXZMZXZlbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19