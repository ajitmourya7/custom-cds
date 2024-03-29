/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrDropdownModule } from '../../popover/dropdown/dropdown.module';
import { MainContainerWillyWonka } from './chocolate/main-container-willy-wonka';
import { NavDetectionOompaLoompa } from './chocolate/nav-detection-oompa-loompa';
import { ClrHeader } from './header';
import { ClrNavLevel } from './nav-level';
export var CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
var ClrNavigationModule = /** @class */ (function () {
    function ClrNavigationModule() {
    }
    ClrNavigationModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrDropdownModule],
            declarations: [CLR_NAVIGATION_DIRECTIVES],
            exports: [CLR_NAVIGATION_DIRECTIVES],
        })
    ], ClrNavigationModule);
    return ClrNavigationModule;
}());
export { ClrNavigationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L25hdmlnYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxNQUFNLENBQUMsSUFBTSx5QkFBeUIsR0FBZ0I7SUFDcEQsU0FBUztJQUNULFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsdUJBQXVCO0NBQ3hCLENBQUM7QUFPRjtJQUFBO0lBQWtDLENBQUM7SUFBdEIsbUJBQW1CO1FBTC9CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQUM7WUFDekQsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDckMsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJEcm9wZG93bk1vZHVsZSB9IGZyb20gJy4uLy4uL3BvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcblxuaW1wb3J0IHsgTWFpbkNvbnRhaW5lcldpbGx5V29ua2EgfSBmcm9tICcuL2Nob2NvbGF0ZS9tYWluLWNvbnRhaW5lci13aWxseS13b25rYSc7XG5pbXBvcnQgeyBOYXZEZXRlY3Rpb25Pb21wYUxvb21wYSB9IGZyb20gJy4vY2hvY29sYXRlL25hdi1kZXRlY3Rpb24tb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IENsckhlYWRlciB9IGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCB7IENsck5hdkxldmVsIH0gZnJvbSAnLi9uYXYtbGV2ZWwnO1xuXG5leHBvcnQgY29uc3QgQ0xSX05BVklHQVRJT05fRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbXG4gIENsckhlYWRlcixcbiAgQ2xyTmF2TGV2ZWwsXG4gIE5hdkRldGVjdGlvbk9vbXBhTG9vbXBhLFxuICBNYWluQ29udGFpbmVyV2lsbHlXb25rYSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGUsIENsckRyb3Bkb3duTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ0xSX05BVklHQVRJT05fRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfTkFWSUdBVElPTl9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTmF2aWdhdGlvbk1vZHVsZSB7fVxuIl19