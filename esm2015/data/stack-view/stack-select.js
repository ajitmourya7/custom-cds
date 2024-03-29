/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: Offer a a way to customize the value displayed, plain value may be unreadable.
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { StackControl } from './stack-control';
import { ClrStackView } from './stack-view';
let ClrStackSelect = class ClrStackSelect extends StackControl {
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
    }
};
ClrStackSelect = tslib_1.__decorate([
    Component({
        selector: 'clr-stack-select',
        inputs: ['model: clrModel'],
        outputs: ['modelChange: clrModelChange'],
        template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <div class="select" *ngIf="stackView.editing" >
            <select [(ngModel)]="model">
                <ng-content></ng-content>
            </select>
        </div>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [ClrStackView])
], ClrStackSelect);
export { ClrStackSelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stc2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9zdGFjay12aWV3L3N0YWNrLXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0g7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBZTVDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxZQUFZO0lBQzlDLFlBQW1CLFNBQXVCO1FBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQURBLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFFMUMsQ0FBQztDQUNGLENBQUE7QUFKWSxjQUFjO0lBYjFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsTUFBTSxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDM0IsT0FBTyxFQUFFLENBQUMsNkJBQTZCLENBQUM7UUFDeEMsUUFBUSxFQUFFOzs7Ozs7O0tBT1A7S0FDSixDQUFDOzZDQUU4QixZQUFZO0dBRC9CLGNBQWMsQ0FJMUI7U0FKWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuLyoqXG4gKiBVbmRvY3VtZW50ZWQgZXhwZXJpbWVudGFsIGZlYXR1cmU6IGlubGluZSBlZGl0aW5nLlxuICpcbiAqIFRPRE86IE9mZmVyIGEgYSB3YXkgdG8gY3VzdG9taXplIHRoZSB2YWx1ZSBkaXNwbGF5ZWQsIHBsYWluIHZhbHVlIG1heSBiZSB1bnJlYWRhYmxlLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RhY2tDb250cm9sIH0gZnJvbSAnLi9zdGFjay1jb250cm9sJztcbmltcG9ydCB7IENsclN0YWNrVmlldyB9IGZyb20gJy4vc3RhY2stdmlldyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1zdGFjay1zZWxlY3QnLFxuICBpbnB1dHM6IFsnbW9kZWw6IGNsck1vZGVsJ10sXG4gIG91dHB1dHM6IFsnbW9kZWxDaGFuZ2U6IGNsck1vZGVsQ2hhbmdlJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXN0YWNrVmlldy5lZGl0aW5nXCI+e3ttb2RlbH19PC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0XCIgKm5nSWY9XCJzdGFja1ZpZXcuZWRpdGluZ1wiID5cbiAgICAgICAgICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJTdGFja1NlbGVjdCBleHRlbmRzIFN0YWNrQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGFja1ZpZXc6IENsclN0YWNrVmlldykge1xuICAgIHN1cGVyKHN0YWNrVmlldyk7XG4gIH1cbn1cbiJdfQ==