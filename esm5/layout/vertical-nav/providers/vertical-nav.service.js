/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var VerticalNavService = /** @class */ (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        get: function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        get: function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        set: function (value) {
            value = !!value;
            if (this.collapsible && this._collapsed !== value) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        get: function () {
            return this._collapsible;
        },
        set: function (value) {
            value = !!value;
            if (this._collapsible !== value) {
                if (!value && this.collapsed) {
                    this.updateCollapseBehavior(false);
                }
                this._collapsible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavService.prototype.updateCollapseBehavior = function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    VerticalNavService = tslib_1.__decorate([
        Injectable()
    ], VerticalNavService);
    return VerticalNavService;
}());
export { VerticalNavService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdmVydGljYWwtbmF2L3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQjtJQURBO1FBRVUsd0JBQW1CLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7UUFNL0Qsc0JBQWlCLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7UUFNN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztRQWE1QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQXFCeEMsQ0FBQztJQTVDQyxzQkFBSSxrREFBa0I7YUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLGdEQUFnQjthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBSUQsc0JBQUkseUNBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBYyxLQUFjO1lBQzFCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtnQkFDakQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQzs7O09BUEE7SUFXRCxzQkFBSSwyQ0FBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFnQixLQUFjO1lBQzVCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUMzQjtRQUNILENBQUM7OztPQVZBO0lBWU8sbURBQXNCLEdBQTlCLFVBQStCLEtBQWM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUE5Q1Usa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTtPQUNBLGtCQUFrQixDQStDOUI7SUFBRCx5QkFBQztDQUFBLEFBL0NELElBK0NDO1NBL0NZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVydGljYWxOYXZTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYW5pbWF0ZU9uQ29sbGFwc2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgYW5pbWF0ZU9uQ29sbGFwc2VkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzZWRDaGFuZ2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgY29sbGFwc2VkQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcbiAgfVxuXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUgJiYgdGhpcy5fY29sbGFwc2VkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZUJlaGF2aW9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cblxuICBzZXQgY29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NvbGxhcHNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29sbGFwc2libGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gdmFsdWU7XG4gICAgdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgfVxufVxuIl19