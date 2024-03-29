import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let FocusTrapTracker = class FocusTrapTracker {
    constructor() {
        this._previousFocusTraps = [];
    }
    get current() {
        return this._current;
    }
    set current(value) {
        this._previousFocusTraps.push(this._current);
        this._current = value;
    }
    get nbFocusTrappers() {
        return this._previousFocusTraps.length;
    }
    activatePreviousTrapper() {
        this._current = this._previousFocusTraps.pop();
    }
};
FocusTrapTracker.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });
FocusTrapTracker = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], FocusTrapTracker);
export { FocusTrapTracker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC10cmFja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAtdHJhY2tlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFEN0I7UUFFVSx3QkFBbUIsR0FBeUIsRUFBRSxDQUFDO0tBbUJ4RDtJQWhCQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQXlCO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakQsQ0FBQztDQUNGLENBQUE7O0FBcEJZLGdCQUFnQjtJQUQ1QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsZ0JBQWdCLENBb0I1QjtTQXBCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c1RyYXBEaXJlY3RpdmUgfSBmcm9tICcuL2ZvY3VzLXRyYXAuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGb2N1c1RyYXBUcmFja2VyIHtcbiAgcHJpdmF0ZSBfcHJldmlvdXNGb2N1c1RyYXBzOiBGb2N1c1RyYXBEaXJlY3RpdmVbXSA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50OiBGb2N1c1RyYXBEaXJlY3RpdmU7XG5cbiAgZ2V0IGN1cnJlbnQoKTogRm9jdXNUcmFwRGlyZWN0aXZlIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuXG4gIHNldCBjdXJyZW50KHZhbHVlOiBGb2N1c1RyYXBEaXJlY3RpdmUpIHtcbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzVHJhcHMucHVzaCh0aGlzLl9jdXJyZW50KTtcbiAgICB0aGlzLl9jdXJyZW50ID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbmJGb2N1c1RyYXBwZXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzRm9jdXNUcmFwcy5sZW5ndGg7XG4gIH1cblxuICBhY3RpdmF0ZVByZXZpb3VzVHJhcHBlcigpIHtcbiAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fcHJldmlvdXNGb2N1c1RyYXBzLnBvcCgpO1xuICB9XG59XG4iXX0=