/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrCheckboxModule } from './checkbox/checkbox.module';
import { ClrCommonFormsModule } from './common/common.module';
import { ClrDatepickerModule } from './datepicker/datepicker.module';
import { ClrInputModule } from './input/input.module';
import { ClrPasswordModule } from './password/password.module';
import { ClrRadioModule } from './radio/radio.module';
import { ClrSelectModule } from './select/select.module';
import { ClrTextareaModule } from './textarea/textarea.module';
var ClrFormsModule = /** @class */ (function () {
    function ClrFormsModule() {
    }
    ClrFormsModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            exports: [
                ClrCommonFormsModule,
                ClrCheckboxModule,
                ClrDatepickerModule,
                ClrInputModule,
                ClrPasswordModule,
                ClrRadioModule,
                ClrSelectModule,
                ClrTextareaModule,
            ],
        })
    ], ClrFormsModule);
    return ClrFormsModule;
}());
export { ClrFormsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZm9ybXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFlL0Q7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUFiMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDUCxvQkFBb0I7Z0JBQ3BCLGlCQUFpQjtnQkFDakIsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGlCQUFpQjthQUNsQjtTQUNGLENBQUM7T0FDVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJDaGVja2JveE1vZHVsZSB9IGZyb20gJy4vY2hlY2tib3gvY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IENsckNvbW1vbkZvcm1zTW9kdWxlIH0gZnJvbSAnLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJEYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IENscklucHV0TW9kdWxlIH0gZnJvbSAnLi9pbnB1dC9pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyUGFzc3dvcmRNb2R1bGUgfSBmcm9tICcuL3Bhc3N3b3JkL3Bhc3N3b3JkLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJSYWRpb01vZHVsZSB9IGZyb20gJy4vcmFkaW8vcmFkaW8ubW9kdWxlJztcbmltcG9ydCB7IENsclNlbGVjdE1vZHVsZSB9IGZyb20gJy4vc2VsZWN0L3NlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyVGV4dGFyZWFNb2R1bGUgfSBmcm9tICcuL3RleHRhcmVhL3RleHRhcmVhLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgQ2xyQ29tbW9uRm9ybXNNb2R1bGUsXG4gICAgQ2xyQ2hlY2tib3hNb2R1bGUsXG4gICAgQ2xyRGF0ZXBpY2tlck1vZHVsZSxcbiAgICBDbHJJbnB1dE1vZHVsZSxcbiAgICBDbHJQYXNzd29yZE1vZHVsZSxcbiAgICBDbHJSYWRpb01vZHVsZSxcbiAgICBDbHJTZWxlY3RNb2R1bGUsXG4gICAgQ2xyVGV4dGFyZWFNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENsckZvcm1zTW9kdWxlIHt9XG4iXX0=