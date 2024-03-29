import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
var ClrVerticalNavIcon = /** @class */ (function () {
    function ClrVerticalNavIcon(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    ClrVerticalNavIcon.prototype.ngOnDestroy = function () {
        this._verticalNavIconService.unregisterIcon();
    };
    ClrVerticalNavIcon = tslib_1.__decorate([
        Directive({ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } }),
        tslib_1.__metadata("design:paramtypes", [VerticalNavIconService])
    ], ClrVerticalNavIcon);
    return ClrVerticalNavIcon;
}());
export { ClrVerticalNavIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWljb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdmVydGljYWwtbmF2L3ZlcnRpY2FsLW5hdi1pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUcvRTtJQUNFLDRCQUFvQix1QkFBK0M7UUFBL0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUNqRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQVBVLGtCQUFrQjtRQUQ5QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUM7aURBRTlCLHNCQUFzQjtPQUR4RCxrQkFBa0IsQ0FROUI7SUFBRCx5QkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWljb24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJWZXJ0aWNhbE5hdkljb25dJywgaG9zdDogeyBjbGFzczogJ25hdi1pY29uJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyVmVydGljYWxOYXZJY29uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmVydGljYWxOYXZJY29uU2VydmljZTogVmVydGljYWxOYXZJY29uU2VydmljZSkge1xuICAgIHRoaXMuX3ZlcnRpY2FsTmF2SWNvblNlcnZpY2UucmVnaXN0ZXJJY29uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl92ZXJ0aWNhbE5hdkljb25TZXJ2aWNlLnVucmVnaXN0ZXJJY29uKCk7XG4gIH1cbn1cbiJdfQ==