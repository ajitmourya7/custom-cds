/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
export class DayViewModel {
    constructor(dayModel, isTodaysDate = false, isDisabled = false, isSelected = false, isFocusable = false) {
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    /**
     * Gets the tab index based on the isFocusable flag.
     */
    get tabIndex() {
        return this.isFocusable ? 0 : -1;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXZpZXcubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vZGVsL2RheS12aWV3Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUNTLFFBQWtCLEVBQ2xCLGVBQXdCLEtBQUssRUFDN0IsYUFBc0IsS0FBSyxFQUMzQixhQUFzQixLQUFLLEVBQzNCLGNBQXVCLEtBQUs7UUFKNUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO0lBQ2xDLENBQUM7SUFFSjs7T0FFRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi9kYXkubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgRGF5Vmlld01vZGVsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRheU1vZGVsOiBEYXlNb2RlbCxcbiAgICBwdWJsaWMgaXNUb2RheXNEYXRlOiBib29sZWFuID0gZmFsc2UsXG4gICAgcHVibGljIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBwdWJsaWMgaXNTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHB1YmxpYyBpc0ZvY3VzYWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge31cblxuICAvKipcbiAgICogR2V0cyB0aGUgdGFiIGluZGV4IGJhc2VkIG9uIHRoZSBpc0ZvY3VzYWJsZSBmbGFnLlxuICAgKi9cbiAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaXNGb2N1c2FibGUgPyAwIDogLTE7XG4gIH1cbn1cbiJdfQ==