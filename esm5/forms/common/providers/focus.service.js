/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var FocusService = /** @class */ (function () {
    function FocusService() {
        this._focused = new BehaviorSubject(false);
    }
    Object.defineProperty(FocusService.prototype, "focusChange", {
        get: function () {
            return this._focused.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusService.prototype, "focused", {
        set: function (state) {
            this._focused.next(state);
        },
        enumerable: true,
        configurable: true
    });
    FocusService = tslib_1.__decorate([
        Injectable()
    ], FocusService);
    return FocusService;
}());
export { FocusService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NvbW1vbi9wcm92aWRlcnMvZm9jdXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUduRDtJQURBO1FBRVUsYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQU8xRSxDQUFDO0lBTkMsc0JBQUkscUNBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLGlDQUFPO2FBQVgsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBUFUsWUFBWTtRQUR4QixVQUFVLEVBQUU7T0FDQSxZQUFZLENBUXhCO0lBQUQsbUJBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvY3VzU2VydmljZSB7XG4gIHByaXZhdGUgX2ZvY3VzZWQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBnZXQgZm9jdXNDaGFuZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgc2V0IGZvY3VzZWQoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb2N1c2VkLm5leHQoc3RhdGUpO1xuICB9XG59XG4iXX0=