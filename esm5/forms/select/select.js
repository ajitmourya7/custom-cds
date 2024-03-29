/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, Renderer2, ElementRef, Injector, Optional, Self } from '@angular/core';
import { WrappedFormControl } from '../common/wrapped-control';
import { ClrSelectContainer } from './select-container';
import { NgControl } from '@angular/forms';
var ClrSelect = /** @class */ (function (_super) {
    tslib_1.__extends(ClrSelect, _super);
    function ClrSelect(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrSelectContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
    ClrSelect = tslib_1.__decorate([
        Directive({ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } }),
        tslib_1.__param(2, Self()),
        tslib_1.__param(2, Optional()),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
            Injector,
            NgControl,
            Renderer2,
            ElementRef])
    ], ClrSelect);
    return ClrSelect;
}(WrappedFormControl));
export { ClrSelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0M7SUFBK0IscUNBQXNDO0lBR25FLG1CQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWM7UUFQaEIsWUFTRSxrQkFBTSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFNBQ2hFO1FBWlMsV0FBSyxHQUFHLENBQUMsQ0FBQzs7SUFZcEIsQ0FBQztJQWJVLFNBQVM7UUFEckIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBTzFFLG1CQUFBLElBQUksRUFBRSxDQUFBO1FBQ04sbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBSE4sZ0JBQWdCO1lBQ1gsUUFBUTtZQUdULFNBQVM7WUFDUixTQUFTO1lBQ2YsVUFBVTtPQVZMLFNBQVMsQ0FjckI7SUFBRCxnQkFBQztDQUFBLEFBZEQsQ0FBK0Isa0JBQWtCLEdBY2hEO1NBZFksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBJbmplY3RvciwgT3B0aW9uYWwsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgV3JhcHBlZEZvcm1Db250cm9sIH0gZnJvbSAnLi4vY29tbW9uL3dyYXBwZWQtY29udHJvbCc7XG5pbXBvcnQgeyBDbHJTZWxlY3RDb250YWluZXIgfSBmcm9tICcuL3NlbGVjdC1jb250YWluZXInO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyU2VsZWN0XScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItc2VsZWN0XSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyU2VsZWN0IGV4dGVuZHMgV3JhcHBlZEZvcm1Db250cm9sPENsclNlbGVjdENvbnRhaW5lcj4ge1xuICBwcm90ZWN0ZWQgaW5kZXggPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgY29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJTZWxlY3RDb250YWluZXIsIGluamVjdG9yLCBjb250cm9sLCByZW5kZXJlciwgZWwpO1xuICB9XG59XG4iXX0=