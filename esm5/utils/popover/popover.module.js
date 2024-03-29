/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ClrPopoverContent } from './popover-content';
import { ClrPopoverOpenCloseButton } from './popover-open-close-button';
import { ClrPopoverCloseButton } from './popover-close-button';
import { ClrPopoverAnchor } from './popover-anchor';
var ClrPopoverModuleNext = /** @class */ (function () {
    function ClrPopoverModuleNext() {
    }
    ClrPopoverModuleNext = tslib_1.__decorate([
        NgModule({
            imports: [],
            declarations: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
            exports: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
        })
    ], ClrPopoverModuleNext);
    return ClrPopoverModuleNext;
}());
export { ClrPopoverModuleNext };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFPcEQ7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG9CQUFvQjtRQUxoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFLGlCQUFpQixDQUFDO1lBQ3JHLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFLGlCQUFpQixDQUFDO1NBQ2pHLENBQUM7T0FDVyxvQkFBb0IsQ0FBRztJQUFELDJCQUFDO0NBQUEsQUFBcEMsSUFBb0M7U0FBdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsclBvcG92ZXJDb250ZW50IH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRlbnQnO1xuaW1wb3J0IHsgQ2xyUG9wb3Zlck9wZW5DbG9zZUJ1dHRvbiB9IGZyb20gJy4vcG9wb3Zlci1vcGVuLWNsb3NlLWJ1dHRvbic7XG5pbXBvcnQgeyBDbHJQb3BvdmVyQ2xvc2VCdXR0b24gfSBmcm9tICcuL3BvcG92ZXItY2xvc2UtYnV0dG9uJztcbmltcG9ydCB7IENsclBvcG92ZXJBbmNob3IgfSBmcm9tICcuL3BvcG92ZXItYW5jaG9yJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW0NsclBvcG92ZXJBbmNob3IsIENsclBvcG92ZXJDbG9zZUJ1dHRvbiwgQ2xyUG9wb3Zlck9wZW5DbG9zZUJ1dHRvbiwgQ2xyUG9wb3ZlckNvbnRlbnRdLFxuICBleHBvcnRzOiBbQ2xyUG9wb3ZlckFuY2hvciwgQ2xyUG9wb3ZlckNsb3NlQnV0dG9uLCBDbHJQb3BvdmVyT3BlbkNsb3NlQnV0dG9uLCBDbHJQb3BvdmVyQ29udGVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENsclBvcG92ZXJNb2R1bGVOZXh0IHt9XG4iXX0=