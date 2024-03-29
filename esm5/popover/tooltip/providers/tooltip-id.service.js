/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var TooltipIdService = /** @class */ (function () {
    function TooltipIdService() {
        this._id = new Subject();
    }
    TooltipIdService.prototype.updateId = function (id) {
        this._id.next(id);
    };
    Object.defineProperty(TooltipIdService.prototype, "id", {
        get: function () {
            return this._id.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    TooltipIdService = tslib_1.__decorate([
        Injectable()
    ], TooltipIdService);
    return TooltipIdService;
}());
export { TooltipIdService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1pZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci90b29sdGlwL3Byb3ZpZGVycy90b29sdGlwLWlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0M7SUFEQTtRQUVVLFFBQUcsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQVN2RCxDQUFDO0lBUEMsbUNBQVEsR0FBUixVQUFTLEVBQVU7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELHNCQUFJLGdDQUFFO2FBQU47WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFUVSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBVTVCO0lBQUQsdUJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBJZFNlcnZpY2Uge1xuICBwcml2YXRlIF9pZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIHVwZGF0ZUlkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZC5uZXh0KGlkKTtcbiAgfVxuXG4gIGdldCBpZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9pZC5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19