/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var RowActionService = /** @class */ (function () {
    function RowActionService() {
        this.actionableCount = 0;
    }
    RowActionService.prototype.register = function () {
        this.actionableCount++;
    };
    RowActionService.prototype.unregister = function () {
        this.actionableCount--;
    };
    Object.defineProperty(RowActionService.prototype, "hasActionableRow", {
        /**
         * false means no rows with action
         */
        get: function () {
            return this.actionableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    RowActionService = tslib_1.__decorate([
        Injectable()
    ], RowActionService);
    return RowActionService;
}());
export { RowActionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWFjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQURBO1FBRVUsb0JBQWUsR0FBRyxDQUFDLENBQUM7SUFnQjlCLENBQUM7SUFkUSxtQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxxQ0FBVSxHQUFqQjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBS0Qsc0JBQVcsOENBQWdCO1FBSDNCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBaEJVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0FpQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvd0FjdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIGFjdGlvbmFibGVDb3VudCA9IDA7XG5cbiAgcHVibGljIHJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYWN0aW9uYWJsZUNvdW50Kys7XG4gIH1cblxuICBwdWJsaWMgdW5yZWdpc3RlcigpIHtcbiAgICB0aGlzLmFjdGlvbmFibGVDb3VudC0tO1xuICB9XG5cbiAgLyoqXG4gICAqIGZhbHNlIG1lYW5zIG5vIHJvd3Mgd2l0aCBhY3Rpb25cbiAgICovXG4gIHB1YmxpYyBnZXQgaGFzQWN0aW9uYWJsZVJvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25hYmxlQ291bnQgPiAwO1xuICB9XG59XG4iXX0=