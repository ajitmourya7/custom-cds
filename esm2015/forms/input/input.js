/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, Optional, ViewContainerRef, Renderer2, ElementRef, Injector, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ClrInputContainer } from './input-container';
import { WrappedFormControl } from '../common/wrapped-control';
let ClrInput = class ClrInput extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrInputContainer, injector, control, renderer, el);
        this.index = 1;
    }
};
ClrInput = tslib_1.__decorate([
    Directive({ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } }),
    tslib_1.__param(2, Self()),
    tslib_1.__param(2, Optional()),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef])
], ClrInput);
export { ClrInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9pbnB1dC9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHL0QsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLGtCQUFxQztJQUdqRSxZQUNFLEdBQXFCLEVBQ3JCLFFBQWtCLEVBR2xCLE9BQWtCLEVBQ2xCLFFBQW1CLEVBQ25CLEVBQWM7UUFFZCxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBWHZELFVBQUssR0FBRyxDQUFDLENBQUM7SUFZcEIsQ0FBQztDQUNGLENBQUE7QUFkWSxRQUFRO0lBRHBCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQU94RSxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtJQUNOLG1CQUFBLFFBQVEsRUFBRSxDQUFBOzZDQUhOLGdCQUFnQjtRQUNYLFFBQVE7UUFHVCxTQUFTO1FBQ1IsU0FBUztRQUNmLFVBQVU7R0FWTCxRQUFRLENBY3BCO1NBZFksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgT3B0aW9uYWwsIFZpZXdDb250YWluZXJSZWYsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2xySW5wdXRDb250YWluZXIgfSBmcm9tICcuL2lucHV0LWNvbnRhaW5lcic7XG5pbXBvcnQgeyBXcmFwcGVkRm9ybUNvbnRyb2wgfSBmcm9tICcuLi9jb21tb24vd3JhcHBlZC1jb250cm9sJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NscklucHV0XScsIGhvc3Q6IHsgJ1tjbGFzcy5jbHItaW5wdXRdJzogJ3RydWUnIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJJbnB1dCBleHRlbmRzIFdyYXBwZWRGb3JtQ29udHJvbDxDbHJJbnB1dENvbnRhaW5lcj4ge1xuICBwcm90ZWN0ZWQgaW5kZXggPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgQFNlbGYoKVxuICAgIEBPcHRpb25hbCgpXG4gICAgY29udHJvbDogTmdDb250cm9sLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgc3VwZXIodmNyLCBDbHJJbnB1dENvbnRhaW5lciwgaW5qZWN0b3IsIGNvbnRyb2wsIHJlbmRlcmVyLCBlbCk7XG4gIH1cbn1cbiJdfQ==