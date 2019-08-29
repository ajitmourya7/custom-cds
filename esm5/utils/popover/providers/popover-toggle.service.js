import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ClrPopoverToggleService = /** @class */ (function () {
    function ClrPopoverToggleService() {
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._open = false;
        this._openChange = new Subject();
        this._openEventChange = new Subject();
    }
    Object.defineProperty(ClrPopoverToggleService.prototype, "openChange", {
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverToggleService.prototype, "openEvent", {
        get: function () {
            return this._openEvent;
        },
        set: function (event) {
            this._openEvent = event;
            this._openEventChange.next(event);
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverToggleService.prototype.getEventChange = function () {
        return this._openEventChange.asObservable();
    };
    Object.defineProperty(ClrPopoverToggleService.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     */
    ClrPopoverToggleService.prototype.toggleWithEvent = function (event) {
        this.openEvent = event;
        this.open = !this.open;
    };
    ClrPopoverToggleService = tslib_1.__decorate([
        Injectable()
    ], ClrPopoverToggleService);
    return ClrPopoverToggleService;
}());
export { ClrPopoverToggleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci10b2dnbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItdG9nZ2xlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDO0lBREE7UUFFRTs7O1dBR0c7UUFDSyxVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQXFCLElBQUksT0FBTyxFQUFXLENBQUM7UUFFdkQscUJBQWdCLEdBQW1CLElBQUksT0FBTyxFQUFTLENBQUM7SUF1Q2xFLENBQUM7SUFyQ0Msc0JBQVcsK0NBQVU7YUFBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4Q0FBUzthQUtwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO2FBUEQsVUFBcUIsS0FBWTtZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBTU0sZ0RBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsc0JBQVcseUNBQUk7YUFRZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBVkQsVUFBZ0IsS0FBYztZQUM1QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDOzs7T0FBQTtJQU1EOzs7T0FHRztJQUNJLGlEQUFlLEdBQXRCLFVBQXVCLEtBQVU7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQTlDVSx1QkFBdUI7UUFEbkMsVUFBVSxFQUFFO09BQ0EsdUJBQXVCLENBK0NuQztJQUFELDhCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0EvQ1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIHtcbiAgLyoqXG4gICAqICBQb3BvdmVycyBtaWdodCBuZWVkIHRvIGlnbm9yZSBjbGljayBldmVudHMgb24gYW4gZWxlbWVudFxuICAgKiAgKGVnOiBwb3BvdmVyIG9wZW5zIG9uIGZvY3VzIG9uIGFuIGlucHV0IGZpZWxkLiBDbGlja3Mgc2hvdWxkIGJlIGlnbm9yZWQgaW4gdGhpcyBjYXNlKVxuICAgKi9cbiAgcHJpdmF0ZSBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9vcGVuQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBfb3BlbkV2ZW50OiBFdmVudDtcbiAgcHJpdmF0ZSBfb3BlbkV2ZW50Q2hhbmdlOiBTdWJqZWN0PEV2ZW50PiA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuXG4gIHB1YmxpYyBnZXQgb3BlbkNoYW5nZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbkNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgb3BlbkV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuX29wZW5FdmVudCA9IGV2ZW50O1xuICAgIHRoaXMuX29wZW5FdmVudENoYW5nZS5uZXh0KGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3BlbkV2ZW50KCk6IEV2ZW50IHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbkV2ZW50O1xuICB9XG5cbiAgcHVibGljIGdldEV2ZW50Q2hhbmdlKCk6IE9ic2VydmFibGU8RXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbkV2ZW50Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh0aGlzLl9vcGVuICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fb3BlbiA9IHZhbHVlO1xuICAgICAgdGhpcy5fb3BlbkNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW47XG4gIH1cblxuICAvKipcbiAgICogU29tZXRpbWVzLCB3ZSBuZWVkIHRvIHJlbWVtYmVyIHRoZSBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgdG9nZ2xpbmcgdG8gYXZvaWQgbG9vcHMuXG4gICAqIFRoaXMgaXMgZm9yIGluc3RhbmNlIHRoZSBjYXNlIG9mIGNvbXBvbmVudHMgdGhhdCBvcGVuIG9uIGEgY2xpY2ssIGJ1dCBjbG9zZSBvbiBhIGNsaWNrIG91dHNpZGUuXG4gICAqL1xuICBwdWJsaWMgdG9nZ2xlV2l0aEV2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9wZW5FdmVudCA9IGV2ZW50O1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==