/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let VerticalNavService = class VerticalNavService {
    constructor() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    get animateOnCollapsed() {
        return this._animateOnCollapsed.asObservable();
    }
    get collapsedChanged() {
        return this._collapsedChanged.asObservable();
    }
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(value) {
        value = !!value;
        if (this.collapsible && this._collapsed !== value) {
            this.updateCollapseBehavior(value);
        }
    }
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        value = !!value;
        if (this._collapsible !== value) {
            if (!value && this.collapsed) {
                this.updateCollapseBehavior(false);
            }
            this._collapsible = value;
        }
    }
    updateCollapseBehavior(value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    }
};
VerticalNavService = tslib_1.__decorate([
    Injectable()
], VerticalNavService);
export { VerticalNavService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdmVydGljYWwtbmF2L3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUQvQjtRQUVVLHdCQUFtQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBTS9ELHNCQUFpQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBTTdELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFhNUIsaUJBQVksR0FBWSxLQUFLLENBQUM7SUFxQnhDLENBQUM7SUE1Q0MsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUlELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFJRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFJRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEtBQWM7UUFDNUIsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQixDQUFDLEtBQWM7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRixDQUFBO0FBL0NZLGtCQUFrQjtJQUQ5QixVQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0ErQzlCO1NBL0NZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVydGljYWxOYXZTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYW5pbWF0ZU9uQ29sbGFwc2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgYW5pbWF0ZU9uQ29sbGFwc2VkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzZWRDaGFuZ2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBnZXQgY29sbGFwc2VkQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcbiAgfVxuXG4gIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUgJiYgdGhpcy5fY29sbGFwc2VkICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZUJlaGF2aW9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb2xsYXBzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBjb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cblxuICBzZXQgY29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NvbGxhcHNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29sbGFwc2libGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbGxhcHNlQmVoYXZpb3IodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9hbmltYXRlT25Db2xsYXBzZWQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gdmFsdWU7XG4gICAgdGhpcy5fY29sbGFwc2VkQ2hhbmdlZC5uZXh0KHZhbHVlKTtcbiAgfVxufVxuIl19