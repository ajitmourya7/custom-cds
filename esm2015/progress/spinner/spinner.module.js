import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrSpinner } from './spinner';
export const CLR_SPINNER_DIRECTIVES = [ClrSpinner];
let ClrSpinnerModule = class ClrSpinnerModule {
};
ClrSpinnerModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [CLR_SPINNER_DIRECTIVES],
        exports: [CLR_SPINNER_DIRECTIVES],
    })
], ClrSpinnerModule);
export { ClrSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwcm9ncmVzcy9zcGlubmVyL3NwaW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV2QyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQU9oRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUFHLENBQUE7QUFBbkIsZ0JBQWdCO0lBTDVCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUN0QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUNsQyxDQUFDO0dBQ1csZ0JBQWdCLENBQUc7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJTcGlubmVyIH0gZnJvbSAnLi9zcGlubmVyJztcblxuZXhwb3J0IGNvbnN0IENMUl9TUElOTkVSX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsclNwaW5uZXJdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX1NQSU5ORVJfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfU1BJTk5FUl9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3Bpbm5lck1vZHVsZSB7fVxuIl19