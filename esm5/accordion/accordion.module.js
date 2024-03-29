/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../icon/icon.module';
import { ClrAccordionPanel } from './accordion-panel';
import { ClrAccordionTitle } from './accordion-title';
import { ClrAccordionDescription } from './accordion-description';
import { ClrAccordion } from './accordion';
import { ClrAccordionContent } from './accordion-content';
import { AccordionOompaLoompa } from './chocolate/accordion-oompa-loompa';
import { AccordionWillyWonka } from './chocolate/accordion-willy-wonka';
var declarations = [
    ClrAccordion,
    ClrAccordionPanel,
    ClrAccordionTitle,
    ClrAccordionDescription,
    ClrAccordionContent,
    AccordionOompaLoompa,
    AccordionWillyWonka,
];
var ClrAccordionModule = /** @class */ (function () {
    function ClrAccordionModule() {
    }
    ClrAccordionModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule],
            declarations: tslib_1.__spread(declarations),
            exports: tslib_1.__spread(declarations),
        })
    ], ClrAccordionModule);
    return ClrAccordionModule;
}());
export { ClrAccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEUsSUFBTSxZQUFZLEdBQUc7SUFDbkIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsbUJBQW1CO0NBQ3BCLENBQUM7QUFPRjtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBTDlCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7WUFDdEMsWUFBWSxtQkFBTSxZQUFZLENBQUM7WUFDL0IsT0FBTyxtQkFBTSxZQUFZLENBQUM7U0FDM0IsQ0FBQztPQUNXLGtCQUFrQixDQUFHO0lBQUQseUJBQUM7Q0FBQSxBQUFsQyxJQUFrQztTQUFyQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJBY2NvcmRpb25QYW5lbCB9IGZyb20gJy4vYWNjb3JkaW9uLXBhbmVsJztcbmltcG9ydCB7IENsckFjY29yZGlvblRpdGxlIH0gZnJvbSAnLi9hY2NvcmRpb24tdGl0bGUnO1xuaW1wb3J0IHsgQ2xyQWNjb3JkaW9uRGVzY3JpcHRpb24gfSBmcm9tICcuL2FjY29yZGlvbi1kZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBDbHJBY2NvcmRpb24gfSBmcm9tICcuL2FjY29yZGlvbic7XG5pbXBvcnQgeyBDbHJBY2NvcmRpb25Db250ZW50IH0gZnJvbSAnLi9hY2NvcmRpb24tY29udGVudCc7XG5pbXBvcnQgeyBBY2NvcmRpb25Pb21wYUxvb21wYSB9IGZyb20gJy4vY2hvY29sYXRlL2FjY29yZGlvbi1vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgQWNjb3JkaW9uV2lsbHlXb25rYSB9IGZyb20gJy4vY2hvY29sYXRlL2FjY29yZGlvbi13aWxseS13b25rYSc7XG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtcbiAgQ2xyQWNjb3JkaW9uLFxuICBDbHJBY2NvcmRpb25QYW5lbCxcbiAgQ2xyQWNjb3JkaW9uVGl0bGUsXG4gIENsckFjY29yZGlvbkRlc2NyaXB0aW9uLFxuICBDbHJBY2NvcmRpb25Db250ZW50LFxuICBBY2NvcmRpb25Pb21wYUxvb21wYSxcbiAgQWNjb3JkaW9uV2lsbHlXb25rYSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5kZWNsYXJhdGlvbnNdLFxuICBleHBvcnRzOiBbLi4uZGVjbGFyYXRpb25zXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQWNjb3JkaW9uTW9kdWxlIHt9XG4iXX0=