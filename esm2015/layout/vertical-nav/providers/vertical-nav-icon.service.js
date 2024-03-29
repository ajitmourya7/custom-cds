/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let VerticalNavIconService = class VerticalNavIconService {
    constructor() {
        this._icons = 0;
    }
    get hasIcons() {
        return this._icons > 0;
    }
    registerIcon() {
        this._icons++;
    }
    unregisterIcon() {
        this._icons--;
    }
};
VerticalNavIconService = tslib_1.__decorate([
    Injectable()
], VerticalNavIconService);
export { VerticalNavIconService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWljb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC92ZXJ0aWNhbC1uYXYvcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1pY29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBRG5DO1FBRVUsV0FBTSxHQUFXLENBQUMsQ0FBQztJQWE3QixDQUFDO0lBWEMsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQWRZLHNCQUFzQjtJQURsQyxVQUFVLEVBQUU7R0FDQSxzQkFBc0IsQ0FjbEM7U0FkWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTmF2SWNvblNlcnZpY2Uge1xuICBwcml2YXRlIF9pY29uczogbnVtYmVyID0gMDtcblxuICBnZXQgaGFzSWNvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25zID4gMDtcbiAgfVxuXG4gIHJlZ2lzdGVySWNvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9pY29ucysrO1xuICB9XG5cbiAgdW5yZWdpc3Rlckljb24oKTogdm9pZCB7XG4gICAgdGhpcy5faWNvbnMtLTtcbiAgfVxufVxuIl19