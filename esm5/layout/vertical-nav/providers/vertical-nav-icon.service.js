/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var VerticalNavIconService = /** @class */ (function () {
    function VerticalNavIconService() {
        this._icons = 0;
    }
    Object.defineProperty(VerticalNavIconService.prototype, "hasIcons", {
        get: function () {
            return this._icons > 0;
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavIconService.prototype.registerIcon = function () {
        this._icons++;
    };
    VerticalNavIconService.prototype.unregisterIcon = function () {
        this._icons--;
    };
    VerticalNavIconService = tslib_1.__decorate([
        Injectable()
    ], VerticalNavIconService);
    return VerticalNavIconService;
}());
export { VerticalNavIconService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWljb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC92ZXJ0aWNhbC1uYXYvcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1pY29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBREE7UUFFVSxXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBYTdCLENBQUM7SUFYQyxzQkFBSSw0Q0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELDZDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELCtDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQWJVLHNCQUFzQjtRQURsQyxVQUFVLEVBQUU7T0FDQSxzQkFBc0IsQ0FjbEM7SUFBRCw2QkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVydGljYWxOYXZJY29uU2VydmljZSB7XG4gIHByaXZhdGUgX2ljb25zOiBudW1iZXIgPSAwO1xuXG4gIGdldCBoYXNJY29ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbnMgPiAwO1xuICB9XG5cbiAgcmVnaXN0ZXJJY29uKCk6IHZvaWQge1xuICAgIHRoaXMuX2ljb25zKys7XG4gIH1cblxuICB1bnJlZ2lzdGVySWNvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9pY29ucy0tO1xuICB9XG59XG4iXX0=