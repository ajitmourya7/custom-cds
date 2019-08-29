/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrStackBlock } from './stack-block';
import { ClrStackHeader } from './stack-header';
import { ClrStackInput } from './stack-input';
import { ClrStackSelect } from './stack-select';
import { ClrStackView } from './stack-view';
import { ClrStackViewCustomTags } from './stack-view-custom-tags';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrExpandableAnimationModule } from '../../utils/animations/expandable-animation/expandable-animation.module';
import { ClrStackContentInput } from './stack-content-input';
export var CLR_STACK_VIEW_DIRECTIVES = [
    ClrStackView,
    ClrStackHeader,
    ClrStackBlock,
    ClrStackContentInput,
    ClrStackViewCustomTags,
    /**
     * Undocumented experimental feature: inline editing.
     */
    ClrStackInput,
    ClrStackSelect,
];
var ClrStackViewModule = /** @class */ (function () {
    function ClrStackViewModule() {
    }
    ClrStackViewModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrExpandableAnimationModule],
            declarations: [CLR_STACK_VIEW_DIRECTIVES],
            exports: [CLR_STACK_VIEW_DIRECTIVES],
        })
    ], ClrStackViewModule);
    return ClrStackViewModule;
}());
export { ClrStackViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stdmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL3N0YWNrLXZpZXcvc3RhY2stdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFDdkgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0QsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQWdCO0lBQ3BELFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEI7O09BRUc7SUFDSCxhQUFhO0lBQ2IsY0FBYztDQUlmLENBQUM7QUFPRjtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBTDlCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLDRCQUE0QixDQUFDO1lBQ2pGLFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3JDLENBQUM7T0FDVyxrQkFBa0IsQ0FBRztJQUFELHlCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDbHJTdGFja0Jsb2NrIH0gZnJvbSAnLi9zdGFjay1ibG9jayc7XG5pbXBvcnQgeyBDbHJTdGFja0hlYWRlciB9IGZyb20gJy4vc3RhY2staGVhZGVyJztcbmltcG9ydCB7IENsclN0YWNrSW5wdXQgfSBmcm9tICcuL3N0YWNrLWlucHV0JztcbmltcG9ydCB7IENsclN0YWNrU2VsZWN0IH0gZnJvbSAnLi9zdGFjay1zZWxlY3QnO1xuaW1wb3J0IHsgQ2xyU3RhY2tWaWV3IH0gZnJvbSAnLi9zdGFjay12aWV3JztcbmltcG9ydCB7IENsclN0YWNrVmlld0N1c3RvbVRhZ3MgfSBmcm9tICcuL3N0YWNrLXZpZXctY3VzdG9tLXRhZ3MnO1xuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyRXhwYW5kYWJsZUFuaW1hdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2FuaW1hdGlvbnMvZXhwYW5kYWJsZS1hbmltYXRpb24vZXhwYW5kYWJsZS1hbmltYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENsclN0YWNrQ29udGVudElucHV0IH0gZnJvbSAnLi9zdGFjay1jb250ZW50LWlucHV0JztcblxuZXhwb3J0IGNvbnN0IENMUl9TVEFDS19WSUVXX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW1xuICBDbHJTdGFja1ZpZXcsXG4gIENsclN0YWNrSGVhZGVyLFxuICBDbHJTdGFja0Jsb2NrLFxuICBDbHJTdGFja0NvbnRlbnRJbnB1dCxcbiAgQ2xyU3RhY2tWaWV3Q3VzdG9tVGFncyxcbiAgLyoqXG4gICAqIFVuZG9jdW1lbnRlZCBleHBlcmltZW50YWwgZmVhdHVyZTogaW5saW5lIGVkaXRpbmcuXG4gICAqL1xuICBDbHJTdGFja0lucHV0LFxuICBDbHJTdGFja1NlbGVjdCxcbiAgLyoqXG4gICAqIEVuZCBvZiB1bmRvY3VtZW50ZWQgZXhwZXJpbWVudGFsIGZlYXR1cmUuXG4gICAqL1xuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIENsckljb25Nb2R1bGUsIENsckV4cGFuZGFibGVBbmltYXRpb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfU1RBQ0tfVklFV19ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0NMUl9TVEFDS19WSUVXX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTdGFja1ZpZXdNb2R1bGUge31cbiJdfQ==