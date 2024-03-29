/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
/*
 * This version of the DomAdapter is for use on non-browser platforms, where there are no
 * nativeElements to use for calculations.
 */
import { Injectable } from '@angular/core';
let NoopDomAdapter = class NoopDomAdapter {
    userDefinedWidth(element) {
        return 0;
    }
    scrollBarWidth(element) {
        return 0;
    }
    scrollWidth(element) {
        return 0;
    }
    computedHeight(element) {
        return 0;
    }
    clientRect(element) {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
    }
    minWidth(element) {
        return 0;
    }
    focus(element) { }
};
NoopDomAdapter = tslib_1.__decorate([
    Injectable()
], NoopDomAdapter);
export { NoopDomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9vcC1kb20tYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL25vb3AtZG9tLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSDs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsZ0JBQWdCLENBQUMsT0FBWTtRQUMzQixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxjQUFjLENBQUMsT0FBWTtRQUN6QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxjQUFjLENBQUMsT0FBWTtRQUN6QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWTtRQUNyQixPQUFPO1lBQ0wsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBWTtRQUNuQixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBWSxJQUFTLENBQUM7Q0FDN0IsQ0FBQTtBQWpDWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0FpQzFCO1NBakNZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbi8qXG4gKiBUaGlzIHZlcnNpb24gb2YgdGhlIERvbUFkYXB0ZXIgaXMgZm9yIHVzZSBvbiBub24tYnJvd3NlciBwbGF0Zm9ybXMsIHdoZXJlIHRoZXJlIGFyZSBub1xuICogbmF0aXZlRWxlbWVudHMgdG8gdXNlIGZvciBjYWxjdWxhdGlvbnMuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vb3BEb21BZGFwdGVyIGltcGxlbWVudHMgRG9tQWRhcHRlciB7XG4gIHVzZXJEZWZpbmVkV2lkdGgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHNjcm9sbEJhcldpZHRoKGVsZW1lbnQ6IGFueSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgc2Nyb2xsV2lkdGgoZWxlbWVudDogYW55KSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBjb21wdXRlZEhlaWdodChlbGVtZW50OiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgY2xpZW50UmVjdChlbGVtZW50OiBhbnkpOiBDbGllbnRSZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgfTtcbiAgfVxuXG4gIG1pbldpZHRoKGVsZW1lbnQ6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmb2N1cyhlbGVtZW50OiBhbnkpOiB2b2lkIHt9XG59XG4iXX0=