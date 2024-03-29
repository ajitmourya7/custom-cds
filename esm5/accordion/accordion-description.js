/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
var ClrAccordionDescription = /** @class */ (function () {
    function ClrAccordionDescription() {
    }
    ClrAccordionDescription = tslib_1.__decorate([
        Component({
            selector: 'clr-accordion-description, clr-step-description',
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion-description]': 'true' },
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ClrAccordionDescription);
    return ClrAccordionDescription;
}());
export { ClrAccordionDescription };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWRlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL2FjY29yZGlvbi1kZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkU7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHVCQUF1QjtRQU5uQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaURBQWlEO1lBQzNELFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxFQUFFO1lBQ3JELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyx1QkFBdUIsQ0FBRztJQUFELDhCQUFDO0NBQUEsQUFBdkMsSUFBdUM7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1hY2NvcmRpb24tZGVzY3JpcHRpb24sIGNsci1zdGVwLWRlc2NyaXB0aW9uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgaG9zdDogeyAnW2NsYXNzLmNsci1hY2NvcmRpb24tZGVzY3JpcHRpb25dJzogJ3RydWUnIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJBY2NvcmRpb25EZXNjcmlwdGlvbiB7fVxuIl19