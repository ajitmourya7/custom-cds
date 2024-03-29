/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
let ClrVerticalNav = class ClrVerticalNav {
    constructor(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(value => {
            this._collapsedChanged.emit(value);
        });
    }
    get collapsible() {
        return this._navService.collapsible;
    }
    set collapsible(value) {
        this._navService.collapsible = value;
    }
    get collapsed() {
        return this._navService.collapsed;
    }
    set collapsed(value) {
        this._navService.collapsed = value;
    }
    get hasNavGroups() {
        return this._navGroupRegistrationService.navGroupCount > 0;
    }
    get hasIcons() {
        return this._navIconService.hasIcons;
    }
    toggleByButton() {
        this.collapsed = !this.collapsed;
    }
    ngOnDestroy() {
        this._sub.unsubscribe();
    }
};
tslib_1.__decorate([
    Input('clrVerticalNavCollapsible'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsible", null);
tslib_1.__decorate([
    Input('clrVerticalNavCollapsed'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsed", null);
tslib_1.__decorate([
    Output('clrVerticalNavCollapsedChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrVerticalNav.prototype, "_collapsedChanged", void 0);
ClrVerticalNav = tslib_1.__decorate([
    Component({
        selector: 'clr-vertical-nav',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\"\n              class=\"nav-trigger-icon\"\n              [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"\n              [attr.title]=\"(this.collapsed) ? commonStrings.keys.expand : commonStrings.keys.collapse\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
        providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
        host: {
            class: 'clr-vertical-nav',
            '[class.is-collapsed]': 'collapsed',
            '[class.has-nav-groups]': 'hasNavGroups',
            '[class.has-icons]': 'hasIcons',
        }
    }),
    tslib_1.__metadata("design:paramtypes", [VerticalNavService,
        VerticalNavIconService,
        VerticalNavGroupRegistrationService,
        ClrCommonStringsService])
], ClrVerticalNav);
export { ClrVerticalNav };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBYWxGLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFnQ3pCLFlBQ1UsV0FBK0IsRUFDL0IsZUFBdUMsRUFDdkMsNEJBQWlFLEVBQ2xFLGFBQXNDO1FBSHJDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFxQztRQUNsRSxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFoQnZDLHNCQUFpQixHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQWtCakYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFHRCxJQUFJLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBR0QsSUFBSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUtELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQWVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUE1Q0M7SUFEQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7OztpREFHbEM7QUFPRDtJQURDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7OytDQUdoQztBQUdEO0lBREMsTUFBTSxDQUFDLCtCQUErQixDQUFDO3NDQUNiLFlBQVk7eURBQTRDO0FBcEJ4RSxjQUFjO0lBWDFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsKzRCQUFrQztRQUNsQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsRUFBRSxtQ0FBbUMsQ0FBQztRQUM1RixJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLHNCQUFzQixFQUFFLFdBQVc7WUFDbkMsd0JBQXdCLEVBQUUsY0FBYztZQUN4QyxtQkFBbUIsRUFBRSxVQUFVO1NBQ2hDO0tBQ0YsQ0FBQzs2Q0FrQ3VCLGtCQUFrQjtRQUNkLHNCQUFzQjtRQUNULG1DQUFtQztRQUNuRCx1QkFBdUI7R0FwQ3BDLGNBQWMsQ0FrRDFCO1NBbERZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1ncm91cC1yZWdpc3RyYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWljb24uc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdlNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci12ZXJ0aWNhbC1uYXYnLFxuICB0ZW1wbGF0ZVVybDogJy4vdmVydGljYWwtbmF2Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtWZXJ0aWNhbE5hdlNlcnZpY2UsIFZlcnRpY2FsTmF2SWNvblNlcnZpY2UsIFZlcnRpY2FsTmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2xyLXZlcnRpY2FsLW5hdicsXG4gICAgJ1tjbGFzcy5pcy1jb2xsYXBzZWRdJzogJ2NvbGxhcHNlZCcsXG4gICAgJ1tjbGFzcy5oYXMtbmF2LWdyb3Vwc10nOiAnaGFzTmF2R3JvdXBzJyxcbiAgICAnW2NsYXNzLmhhcy1pY29uc10nOiAnaGFzSWNvbnMnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJWZXJ0aWNhbE5hdiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGdldCBjb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzaWJsZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyVmVydGljYWxOYXZDb2xsYXBzaWJsZScpXG4gIHNldCBjb2xsYXBzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2libGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkO1xuICB9XG5cbiAgQElucHV0KCdjbHJWZXJ0aWNhbE5hdkNvbGxhcHNlZCcpXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgnY2xyVmVydGljYWxOYXZDb2xsYXBzZWRDaGFuZ2UnKVxuICBwcml2YXRlIF9jb2xsYXBzZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KHRydWUpO1xuXG4gIGdldCBoYXNOYXZHcm91cHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZS5uYXZHcm91cENvdW50ID4gMDtcbiAgfVxuXG4gIGdldCBoYXNJY29ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2SWNvblNlcnZpY2UuaGFzSWNvbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9uYXZTZXJ2aWNlOiBWZXJ0aWNhbE5hdlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbmF2SWNvblNlcnZpY2U6IFZlcnRpY2FsTmF2SWNvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlOiBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fc3ViID0gdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWRDaGFuZ2VkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLl9jb2xsYXBzZWRDaGFuZ2VkLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlQnlCdXR0b24oKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19