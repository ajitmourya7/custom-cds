import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { Items } from './providers/items';
var ClrDatagridPlaceholder = /** @class */ (function () {
    function ClrDatagridPlaceholder(items) {
        this.items = items;
    }
    Object.defineProperty(ClrDatagridPlaceholder.prototype, "emptyDatagrid", {
        /**
         * Tests if the datagrid is empty, meaning it doesn't contain any items
         */
        get: function () {
            return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridPlaceholder = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-placeholder',
            template: "\n        <div\n            class=\"datagrid-placeholder\"\n            [class.datagrid-empty]=\"emptyDatagrid\">\n                <div class=\"datagrid-placeholder-image\" *ngIf=\"emptyDatagrid\"></div>\n                <ng-content *ngIf=\"emptyDatagrid\"></ng-content>\n        </div>\n    ",
            host: { '[class.datagrid-placeholder-container]': 'true' }
        }),
        tslib_1.__metadata("design:paramtypes", [Items])
    ], ClrDatagridPlaceholder);
    return ClrDatagridPlaceholder;
}());
export { ClrDatagridPlaceholder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLXBsYWNlaG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFjMUM7SUFDRSxnQ0FBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBRyxDQUFDO0lBS3ZDLHNCQUFXLGlEQUFhO1FBSHhCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDOzs7T0FBQTtJQVJVLHNCQUFzQjtRQVpsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSxzU0FPUDtZQUNILElBQUksRUFBRSxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sRUFBRTtTQUMzRCxDQUFDO2lEQUUyQixLQUFLO09BRHJCLHNCQUFzQixDQVNsQztJQUFELDZCQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vcHJvdmlkZXJzL2l0ZW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLXBsYWNlaG9sZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJkYXRhZ3JpZC1wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICBbY2xhc3MuZGF0YWdyaWQtZW1wdHldPVwiZW1wdHlEYXRhZ3JpZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1wbGFjZWhvbGRlci1pbWFnZVwiICpuZ0lmPVwiZW1wdHlEYXRhZ3JpZFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiZW1wdHlEYXRhZ3JpZFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLmRhdGFncmlkLXBsYWNlaG9sZGVyLWNvbnRhaW5lcl0nOiAndHJ1ZScgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRGF0YWdyaWRQbGFjZWhvbGRlcjxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbXM6IEl0ZW1zPFQ+KSB7fVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiB0aGUgZGF0YWdyaWQgaXMgZW1wdHksIG1lYW5pbmcgaXQgZG9lc24ndCBjb250YWluIGFueSBpdGVtc1xuICAgKi9cbiAgcHVibGljIGdldCBlbXB0eURhdGFncmlkKCkge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcy5sb2FkaW5nICYmICghdGhpcy5pdGVtcy5kaXNwbGF5ZWQgfHwgdGhpcy5pdGVtcy5kaXNwbGF5ZWQubGVuZ3RoID09PSAwKTtcbiAgfVxufVxuIl19