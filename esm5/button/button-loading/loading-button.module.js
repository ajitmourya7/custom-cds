/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrLoadingButton } from './loading-button';
export var CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
var ClrLoadingButtonModule = /** @class */ (function () {
    function ClrLoadingButtonModule() {
    }
    ClrLoadingButtonModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
            exports: [CLR_LOADING_BUTTON_DIRECTIVES],
        })
    ], ClrLoadingButtonModule);
    return ClrLoadingButtonModule;
}());
export { ClrLoadingButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1idXR0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYnV0dG9uL2J1dHRvbi1sb2FkaW5nL2xvYWRpbmctYnV0dG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE1BQU0sQ0FBQyxJQUFNLDZCQUE2QixHQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFPN0U7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHNCQUFzQjtRQUxsQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDN0MsT0FBTyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDekMsQ0FBQztPQUNXLHNCQUFzQixDQUFHO0lBQUQsNkJBQUM7Q0FBQSxBQUF0QyxJQUFzQztTQUF6QixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJMb2FkaW5nQnV0dG9uIH0gZnJvbSAnLi9sb2FkaW5nLWJ1dHRvbic7XG5cbmV4cG9ydCBjb25zdCBDTFJfTE9BRElOR19CVVRUT05fRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbQ2xyTG9hZGluZ0J1dHRvbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfTE9BRElOR19CVVRUT05fRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfTE9BRElOR19CVVRUT05fRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIENsckxvYWRpbmdCdXR0b25Nb2R1bGUge31cbiJdfQ==