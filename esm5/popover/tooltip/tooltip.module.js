/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrConditionalModule } from '../../utils/conditional/conditional.module';
import { ClrCommonPopoverModule } from '../common/popover.module';
import { ClrTooltip } from './tooltip';
import { ClrTooltipContent } from './tooltip-content';
import { ClrTooltipTrigger } from './tooltip-trigger';
export var CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
var ClrTooltipModule = /** @class */ (function () {
    function ClrTooltipModule() {
    }
    ClrTooltipModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrCommonPopoverModule],
            declarations: [CLR_TOOLTIP_DIRECTIVES],
            exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
        })
    ], ClrTooltipModule);
    return ClrTooltipModule;
}());
export { ClrTooltipModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FBZ0IsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQU90RztJQUFBO0lBQStCLENBQUM7SUFBbkIsZ0JBQWdCO1FBTDVCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQztZQUMvQyxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUN0QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLENBQUM7U0FDdkUsQ0FBQztPQUNXLGdCQUFnQixDQUFHO0lBQUQsdUJBQUM7Q0FBQSxBQUFoQyxJQUFnQztTQUFuQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb25kaXRpb25hbE1vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2NvbmRpdGlvbmFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJDb21tb25Qb3BvdmVyTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgQ2xyVG9vbHRpcCB9IGZyb20gJy4vdG9vbHRpcCc7XG5pbXBvcnQgeyBDbHJUb29sdGlwQ29udGVudCB9IGZyb20gJy4vdG9vbHRpcC1jb250ZW50JztcbmltcG9ydCB7IENsclRvb2x0aXBUcmlnZ2VyIH0gZnJvbSAnLi90b29sdGlwLXRyaWdnZXInO1xuXG5leHBvcnQgY29uc3QgQ0xSX1RPT0xUSVBfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbQ2xyVG9vbHRpcCwgQ2xyVG9vbHRpcFRyaWdnZXIsIENsclRvb2x0aXBDb250ZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xyQ29tbW9uUG9wb3Zlck1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9UT09MVElQX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbQ0xSX1RPT0xUSVBfRElSRUNUSVZFUywgQ2xyQ29uZGl0aW9uYWxNb2R1bGUsIENsckljb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUb29sdGlwTW9kdWxlIHt9XG4iXX0=