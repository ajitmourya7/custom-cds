import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
var OutsideClick = /** @class */ (function () {
    function OutsideClick(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    OutsideClick.prototype.documentClick = function (event) {
        var target = event.target; // Get the element in the DOM on which the mouse was clicked
        var host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    };
    tslib_1.__decorate([
        Input('clrStrict'),
        tslib_1.__metadata("design:type", Object)
    ], OutsideClick.prototype, "strict", void 0);
    tslib_1.__decorate([
        Output('clrOutsideClick'),
        tslib_1.__metadata("design:type", Object)
    ], OutsideClick.prototype, "outsideClick", void 0);
    tslib_1.__decorate([
        HostListener('document:click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [MouseEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], OutsideClick.prototype, "documentClick", null);
    OutsideClick = tslib_1.__decorate([
        Directive({ selector: '[clrOutsideClick]' }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], OutsideClick);
    return OutsideClick;
}());
export { OutsideClick };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0c2lkZS1jbGljay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL291dHNpZGUtY2xpY2svb3V0c2lkZS1jbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdqRztJQUNFLHNCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUVkLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFUixpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFNLEtBQUssQ0FBQyxDQUFDO0lBSmxDLENBQUM7SUFPdEMsb0NBQWEsR0FBYixVQUFjLEtBQWlCO1FBQzdCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyw0REFBNEQ7UUFDekYsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxpREFBaUQ7UUFFckYsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQWhCbUI7UUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7Z0RBQWdCO0lBRVI7UUFBMUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDOztzREFBNkM7SUFHdkU7UUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7aURBQ3RCLFVBQVU7O3FEQVc5QjtJQW5CVSxZQUFZO1FBRHhCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2lEQUVuQixVQUFVO09BRHZCLFlBQVksQ0FvQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xyT3V0c2lkZUNsaWNrXScgfSlcbmV4cG9ydCBjbGFzcyBPdXRzaWRlQ2xpY2sge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIEBJbnB1dCgnY2xyU3RyaWN0Jykgc3RyaWN0ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgnY2xyT3V0c2lkZUNsaWNrJykgb3V0c2lkZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7IC8vIEdldCB0aGUgZWxlbWVudCBpbiB0aGUgRE9NIG9uIHdoaWNoIHRoZSBtb3VzZSB3YXMgY2xpY2tlZFxuICAgIGNvbnN0IGhvc3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7IC8vIEdldCB0aGUgY3VycmVudCBhY3Rpb25NZW51IG5hdGl2ZSBIVE1MIGVsZW1lbnRcblxuICAgIGlmICh0YXJnZXQgPT09IGhvc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN0cmljdCAmJiBob3N0LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vdXRzaWRlQ2xpY2suZW1pdChldmVudCk7XG4gIH1cbn1cbiJdfQ==