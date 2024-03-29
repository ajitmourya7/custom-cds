import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrKeyFocus } from './key-focus';
import { ClrKeyFocusItem } from './key-focus-item';
var KEY_FOCUS_DIRECTIVES = [ClrKeyFocus, ClrKeyFocusItem];
var ClrKeyFocusModule = /** @class */ (function () {
    function ClrKeyFocusModule() {
    }
    ClrKeyFocusModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [KEY_FOCUS_DIRECTIVES],
            exports: [KEY_FOCUS_DIRECTIVES],
        })
    ], ClrKeyFocusModule);
    return ClrKeyFocusModule;
}());
export { ClrKeyFocusModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWZvY3VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2tleS1mb2N1cy9rZXktZm9jdXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQsSUFBTSxvQkFBb0IsR0FBZ0IsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFPekU7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGlCQUFpQjtRQUw3QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDaEMsQ0FBQztPQUNXLGlCQUFpQixDQUFHO0lBQUQsd0JBQUM7Q0FBQSxBQUFqQyxJQUFpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyS2V5Rm9jdXMgfSBmcm9tICcuL2tleS1mb2N1cyc7XG5pbXBvcnQgeyBDbHJLZXlGb2N1c0l0ZW0gfSBmcm9tICcuL2tleS1mb2N1cy1pdGVtJztcblxuY29uc3QgS0VZX0ZPQ1VTX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NscktleUZvY3VzLCBDbHJLZXlGb2N1c0l0ZW1dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbS0VZX0ZPQ1VTX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbS0VZX0ZPQ1VTX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJLZXlGb2N1c01vZHVsZSB7fVxuIl19