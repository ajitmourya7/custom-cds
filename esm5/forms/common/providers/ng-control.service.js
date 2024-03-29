/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var NgControlService = /** @class */ (function () {
    function NgControlService() {
        // Observable to subscribe to the control, since its not available immediately for projected content
        this._controlChanges = new Subject();
    }
    Object.defineProperty(NgControlService.prototype, "controlChanges", {
        get: function () {
            return this._controlChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgControlService.prototype.setControl = function (control) {
        this._controlChanges.next(control);
    };
    NgControlService = tslib_1.__decorate([
        Injectable()
    ], NgControlService);
    return NgControlService;
}());
export { NgControlService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY29udHJvbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvY29tbW9uL3Byb3ZpZGVycy9uZy1jb250cm9sLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0M7SUFEQTtRQUVFLG9HQUFvRztRQUM1RixvQkFBZSxHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO0lBUXpFLENBQUM7SUFQQyxzQkFBSSw0Q0FBYzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHFDQUFVLEdBQVYsVUFBVyxPQUFrQjtRQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBVFUsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQVU1QjtJQUFELHVCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ0NvbnRyb2xTZXJ2aWNlIHtcbiAgLy8gT2JzZXJ2YWJsZSB0byBzdWJzY3JpYmUgdG8gdGhlIGNvbnRyb2wsIHNpbmNlIGl0cyBub3QgYXZhaWxhYmxlIGltbWVkaWF0ZWx5IGZvciBwcm9qZWN0ZWQgY29udGVudFxuICBwcml2YXRlIF9jb250cm9sQ2hhbmdlczogU3ViamVjdDxOZ0NvbnRyb2w+ID0gbmV3IFN1YmplY3Q8TmdDb250cm9sPigpO1xuICBnZXQgY29udHJvbENoYW5nZXMoKTogT2JzZXJ2YWJsZTxOZ0NvbnRyb2w+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbENoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRDb250cm9sKGNvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIHRoaXMuX2NvbnRyb2xDaGFuZ2VzLm5leHQoY29udHJvbCk7XG4gIH1cbn1cbiJdfQ==