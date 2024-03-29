/*
 *  Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var SignpostIdService = /** @class */ (function () {
    function SignpostIdService() {
        this._id = new Subject();
    }
    SignpostIdService.prototype.setId = function (id) {
        this._id.next(id);
    };
    Object.defineProperty(SignpostIdService.prototype, "id", {
        get: function () {
            return this._id.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    SignpostIdService = tslib_1.__decorate([
        Injectable()
    ], SignpostIdService);
    return SignpostIdService;
}());
export { SignpostIdService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtaWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3QvcHJvdmlkZXJzL3NpZ25wb3N0LWlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CO0lBREE7UUFFVSxRQUFHLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7SUFTdkQsQ0FBQztJQVBDLGlDQUFLLEdBQUwsVUFBTSxFQUFVO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELHNCQUFJLGlDQUFFO2FBQU47WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFUVSxpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCLENBVTdCO0lBQUQsd0JBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2lnbnBvc3RJZFNlcnZpY2Uge1xuICBwcml2YXRlIF9pZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIHNldElkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZC5uZXh0KGlkKTtcbiAgfVxuXG4gIGdldCBpZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9pZC5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19