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
var ClrStackSelect = /** @class */ (function (_super) {
    tslib_1.__extends(ClrStackSelect, _super);
    function ClrStackSelect(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        return _this;
    }
    ClrStackSelect = tslib_1.__decorate([
        Component({
            selector: 'clr-stack-select',
            inputs: ['model: clrModel'],
            outputs: ['modelChange: clrModelChange'],
            template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <div class=\"select\" *ngIf=\"stackView.editing\" >\n            <select [(ngModel)]=\"model\">\n                <ng-content></ng-content>\n            </select>\n        </div>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [ClrStackView])
    ], ClrStackSelect);
    return ClrStackSelect;
}(StackControl));
export { ClrStackSelect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2stc2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9zdGFjay12aWV3L3N0YWNrLXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0g7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBZTVDO0lBQW9DLDBDQUFZO0lBQzlDLHdCQUFtQixTQUF1QjtRQUExQyxZQUNFLGtCQUFNLFNBQVMsQ0FBQyxTQUNqQjtRQUZrQixlQUFTLEdBQVQsU0FBUyxDQUFjOztJQUUxQyxDQUFDO0lBSFUsY0FBYztRQWIxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzNCLE9BQU8sRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxnUUFPUDtTQUNKLENBQUM7aURBRThCLFlBQVk7T0FEL0IsY0FBYyxDQUkxQjtJQUFELHFCQUFDO0NBQUEsQUFKRCxDQUFvQyxZQUFZLEdBSS9DO1NBSlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbi8qKlxuICogVW5kb2N1bWVudGVkIGV4cGVyaW1lbnRhbCBmZWF0dXJlOiBpbmxpbmUgZWRpdGluZy5cbiAqXG4gKiBUT0RPOiBPZmZlciBhIGEgd2F5IHRvIGN1c3RvbWl6ZSB0aGUgdmFsdWUgZGlzcGxheWVkLCBwbGFpbiB2YWx1ZSBtYXkgYmUgdW5yZWFkYWJsZS5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0YWNrQ29udHJvbCB9IGZyb20gJy4vc3RhY2stY29udHJvbCc7XG5pbXBvcnQgeyBDbHJTdGFja1ZpZXcgfSBmcm9tICcuL3N0YWNrLXZpZXcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItc3RhY2stc2VsZWN0JyxcbiAgaW5wdXRzOiBbJ21vZGVsOiBjbHJNb2RlbCddLFxuICBvdXRwdXRzOiBbJ21vZGVsQ2hhbmdlOiBjbHJNb2RlbENoYW5nZSddLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFzdGFja1ZpZXcuZWRpdGluZ1wiPnt7bW9kZWx9fTwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdFwiICpuZ0lmPVwic3RhY2tWaWV3LmVkaXRpbmdcIiA+XG4gICAgICAgICAgICA8c2VsZWN0IFsobmdNb2RlbCldPVwibW9kZWxcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyU3RhY2tTZWxlY3QgZXh0ZW5kcyBTdGFja0NvbnRyb2wge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhY2tWaWV3OiBDbHJTdGFja1ZpZXcpIHtcbiAgICBzdXBlcihzdGFja1ZpZXcpO1xuICB9XG59XG4iXX0=