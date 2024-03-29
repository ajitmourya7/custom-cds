import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDraggable } from './draggable/draggable';
import { ClrDroppable } from './droppable/droppable';
import { ClrIfDragged } from './if-dragged';
import { ClrDragHandle } from './drag-handle';
import { ClrDraggableGhost } from './draggable-ghost';
export var CLR_DRAG_AND_DROP_DIRECTIVES = [
    ClrDraggable,
    ClrDroppable,
    ClrIfDragged,
    ClrDragHandle,
    ClrDraggableGhost,
];
var ClrDragAndDropModule = /** @class */ (function () {
    function ClrDragAndDropModule() {
    }
    ClrDragAndDropModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_DRAG_AND_DROP_DIRECTIVES],
            entryComponents: [ClrDraggableGhost],
            exports: [CLR_DRAG_AND_DROP_DIRECTIVES],
        })
    ], ClrDragAndDropModule);
    return ClrDragAndDropModule;
}());
export { ClrDragAndDropModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kcmFnLWFuZC1kcm9wL2RyYWctYW5kLWRyb3AubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsTUFBTSxDQUFDLElBQU0sNEJBQTRCLEdBQWdCO0lBQ3ZELFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixpQkFBaUI7Q0FDbEIsQ0FBQztBQVFGO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixvQkFBb0I7UUFOaEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQzVDLGVBQWUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3hDLENBQUM7T0FDVyxvQkFBb0IsQ0FBRztJQUFELDJCQUFDO0NBQUEsQUFBcEMsSUFBb0M7U0FBdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckRyYWdnYWJsZSB9IGZyb20gJy4vZHJhZ2dhYmxlL2RyYWdnYWJsZSc7XG5pbXBvcnQgeyBDbHJEcm9wcGFibGUgfSBmcm9tICcuL2Ryb3BwYWJsZS9kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2xySWZEcmFnZ2VkIH0gZnJvbSAnLi9pZi1kcmFnZ2VkJztcbmltcG9ydCB7IENsckRyYWdIYW5kbGUgfSBmcm9tICcuL2RyYWctaGFuZGxlJztcbmltcG9ydCB7IENsckRyYWdnYWJsZUdob3N0IH0gZnJvbSAnLi9kcmFnZ2FibGUtZ2hvc3QnO1xuXG5leHBvcnQgY29uc3QgQ0xSX0RSQUdfQU5EX0RST1BfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbXG4gIENsckRyYWdnYWJsZSxcbiAgQ2xyRHJvcHBhYmxlLFxuICBDbHJJZkRyYWdnZWQsXG4gIENsckRyYWdIYW5kbGUsXG4gIENsckRyYWdnYWJsZUdob3N0LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9EUkFHX0FORF9EUk9QX0RJUkVDVElWRVNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDbHJEcmFnZ2FibGVHaG9zdF0sXG4gIGV4cG9ydHM6IFtDTFJfRFJBR19BTkRfRFJPUF9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJhZ0FuZERyb3BNb2R1bGUge31cbiJdfQ==