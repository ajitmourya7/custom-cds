/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
var ClrAccordionTitle = /** @class */ (function () {
    function ClrAccordionTitle() {
    }
    ClrAccordionTitle = tslib_1.__decorate([
        Component({
            selector: 'clr-accordion-title, clr-step-title',
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion-title]': 'true' },
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ClrAccordionTitle);
    return ClrAccordionTitle;
}());
export { ClrAccordionTitle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXRpdGxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL2FjY29yZGlvbi10aXRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkU7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGlCQUFpQjtRQU43QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUNBQXFDO1lBQy9DLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFO1lBQy9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxpQkFBaUIsQ0FBRztJQUFELHdCQUFDO0NBQUEsQUFBakMsSUFBaUM7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hY2NvcmRpb24tdGl0bGUsIGNsci1zdGVwLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci1hY2NvcmRpb24tdGl0bGVdJzogJ3RydWUnIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBY2NvcmRpb25UaXRsZSB7fVxuIl19