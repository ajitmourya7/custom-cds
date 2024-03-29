/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
/*
 * If we someday want to be able to render the datagrid in a webworker,
 * this is where we would test if we're in headless mode. Right now it's not testing anything, but any access
 * to native DOM elements' methods and properties in the Datagrid happens here.
 */
import { Injectable } from '@angular/core';
var DomAdapter = /** @class */ (function () {
    function DomAdapter() {
    }
    DomAdapter.prototype.userDefinedWidth = function (element) {
        element.classList.add('datagrid-cell-width-zero');
        var userDefinedWidth = this.clientRect(element).width;
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    };
    DomAdapter.prototype.scrollBarWidth = function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    DomAdapter.prototype.scrollWidth = function (element) {
        return element.scrollWidth || 0;
    };
    DomAdapter.prototype.computedHeight = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    };
    DomAdapter.prototype.clientRect = function (element) {
        var elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    };
    DomAdapter.prototype.minWidth = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    };
    DomAdapter.prototype.focus = function (element) {
        element.focus();
    };
    DomAdapter = tslib_1.__decorate([
        Injectable()
    ], DomAdapter);
    return DomAdapter;
}());
export { DomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVIOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBQUE7SUF1Q0EsQ0FBQztJQXRDQyxxQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBb0I7UUFDbkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNsRCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDckQsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQsbUNBQWMsR0FBZCxVQUFlLE9BQVk7UUFDekIsT0FBTyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxPQUFZO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELG1DQUFjLEdBQWQsVUFBZSxPQUFZO1FBQ3pCLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsT0FBWTtRQUNyQixJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzFELE9BQU87WUFDTCxHQUFHLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDeEMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQzlDLElBQUksRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUMxQyxLQUFLLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDNUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQzVDLE1BQU0sRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztTQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVELDZCQUFRLEdBQVIsVUFBUyxPQUFZO1FBQ25CLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCwwQkFBSyxHQUFMLFVBQU0sT0FBWTtRQUNoQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQXRDVSxVQUFVO1FBRHRCLFVBQVUsRUFBRTtPQUNBLFVBQVUsQ0F1Q3RCO0lBQUQsaUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXZDWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG4vKlxuICogSWYgd2Ugc29tZWRheSB3YW50IHRvIGJlIGFibGUgdG8gcmVuZGVyIHRoZSBkYXRhZ3JpZCBpbiBhIHdlYndvcmtlcixcbiAqIHRoaXMgaXMgd2hlcmUgd2Ugd291bGQgdGVzdCBpZiB3ZSdyZSBpbiBoZWFkbGVzcyBtb2RlLiBSaWdodCBub3cgaXQncyBub3QgdGVzdGluZyBhbnl0aGluZywgYnV0IGFueSBhY2Nlc3NcbiAqIHRvIG5hdGl2ZSBET00gZWxlbWVudHMnIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgaW4gdGhlIERhdGFncmlkIGhhcHBlbnMgaGVyZS5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21BZGFwdGVyIHtcbiAgdXNlckRlZmluZWRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXRhZ3JpZC1jZWxsLXdpZHRoLXplcm8nKTtcbiAgICBjb25zdCB1c2VyRGVmaW5lZFdpZHRoID0gdGhpcy5jbGllbnRSZWN0KGVsZW1lbnQpLndpZHRoO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGF0YWdyaWQtY2VsbC13aWR0aC16ZXJvJyk7XG4gICAgcmV0dXJuIHVzZXJEZWZpbmVkV2lkdGg7XG4gIH1cblxuICBzY3JvbGxCYXJXaWR0aChlbGVtZW50OiBhbnkpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIH1cblxuICBzY3JvbGxXaWR0aChlbGVtZW50OiBhbnkpIHtcbiAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxXaWR0aCB8fCAwO1xuICB9XG5cbiAgY29tcHV0ZWRIZWlnaHQoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSwgMTApO1xuICB9XG5cbiAgY2xpZW50UmVjdChlbGVtZW50OiBhbnkpOiBDbGllbnRSZWN0IHtcbiAgICBjb25zdCBlbGVtZW50Q2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QudG9wLCAxMCksXG4gICAgICBib3R0b206IHBhcnNlSW50KGVsZW1lbnRDbGllbnRSZWN0LmJvdHRvbSwgMTApLFxuICAgICAgbGVmdDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QubGVmdCwgMTApLFxuICAgICAgcmlnaHQ6IHBhcnNlSW50KGVsZW1lbnRDbGllbnRSZWN0LnJpZ2h0LCAxMCksXG4gICAgICB3aWR0aDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3Qud2lkdGgsIDEwKSxcbiAgICAgIGhlaWdodDogcGFyc2VJbnQoZWxlbWVudENsaWVudFJlY3QuaGVpZ2h0LCAxMCksXG4gICAgfTtcbiAgfVxuXG4gIG1pbldpZHRoKGVsZW1lbnQ6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWluLXdpZHRoJyksIDEwKTtcbiAgfVxuXG4gIGZvY3VzKGVsZW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufVxuIl19