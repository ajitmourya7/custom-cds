/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { ClrPopoverEventsService } from './providers/popover-events.service';
var ClrPopoverAnchor = /** @class */ (function () {
    function ClrPopoverAnchor(smartEventService, element) {
        smartEventService.anchorButtonRef = element;
    }
    ClrPopoverAnchor = tslib_1.__decorate([
        Directive({
            selector: '[clrPopoverAnchor]',
            host: {
                '[class.clr-anchor]': 'true',
            },
        }),
        tslib_1.__metadata("design:paramtypes", [ClrPopoverEventsService, ElementRef])
    ], ClrPopoverAnchor);
    return ClrPopoverAnchor;
}());
export { ClrPopoverAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1hbmNob3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9wb3BvdmVyL3BvcG92ZXItYW5jaG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUTdFO0lBQ0UsMEJBQVksaUJBQTBDLEVBQUUsT0FBbUI7UUFDekUsaUJBQWlCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztJQUM5QyxDQUFDO0lBSFUsZ0JBQWdCO1FBTjVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsSUFBSSxFQUFFO2dCQUNKLG9CQUFvQixFQUFFLE1BQU07YUFDN0I7U0FDRixDQUFDO2lEQUUrQix1QkFBdUIsRUFBVyxVQUFVO09BRGhFLGdCQUFnQixDQUk1QjtJQUFELHVCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3BvcG92ZXItZXZlbnRzLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyUG9wb3ZlckFuY2hvcl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jbHItYW5jaG9yXSc6ICd0cnVlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyUG9wb3ZlckFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKHNtYXJ0RXZlbnRTZXJ2aWNlOiBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSwgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHNtYXJ0RXZlbnRTZXJ2aWNlLmFuY2hvckJ1dHRvblJlZiA9IGVsZW1lbnQ7XG4gIH1cbn1cbiJdfQ==