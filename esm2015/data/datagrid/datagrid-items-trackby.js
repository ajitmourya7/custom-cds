import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional } from '@angular/core';
import { Items } from './providers/items';
let ClrDatagridItemsTrackBy = class ClrDatagridItemsTrackBy {
    constructor(_items) {
        this._items = _items;
    }
    set trackBy(value) {
        if (this._items) {
            this._items.trackBy = value;
        }
    }
};
tslib_1.__decorate([
    Input('ngForTrackBy'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function])
], ClrDatagridItemsTrackBy.prototype, "trackBy", null);
ClrDatagridItemsTrackBy = tslib_1.__decorate([
    Directive({
        selector: '[ngForTrackBy]',
    }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [Items])
], ClrDatagridItemsTrackBy);
export { ClrDatagridItemsTrackBy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaXRlbXMtdHJhY2tieS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtaXRlbXMtdHJhY2tieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSzFDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBQ2xDLFlBQWdDLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBR3BELElBQUksT0FBTyxDQUFDLEtBQXlCO1FBQ25DLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNILENBQUM7Q0FDRixDQUFBO0FBTEM7SUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDOzs7c0RBS3JCO0FBUlUsdUJBQXVCO0lBSG5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztJQUVhLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQUFpQixLQUFLO0dBRGxDLHVCQUF1QixDQVNuQztTQVRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9wdGlvbmFsLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSXRlbXMgfSBmcm9tICcuL3Byb3ZpZGVycy9pdGVtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0ZvclRyYWNrQnldJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRJdGVtc1RyYWNrQnk8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIF9pdGVtczogSXRlbXM8VD4pIHt9XG5cbiAgQElucHV0KCduZ0ZvclRyYWNrQnknKVxuICBzZXQgdHJhY2tCeSh2YWx1ZTogVHJhY2tCeUZ1bmN0aW9uPFQ+KSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1zKSB7XG4gICAgICB0aGlzLl9pdGVtcy50cmFja0J5ID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=