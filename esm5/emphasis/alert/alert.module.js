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
import { ClrAlert } from './alert';
import { ClrAlertItem } from './alert-item';
import { ClrAlerts } from './alerts';
import { ClrAlertsPager } from './alerts-pager';
export var CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
var ClrAlertModule = /** @class */ (function () {
    function ClrAlertModule() {
    }
    ClrAlertModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrDropdownModule],
            declarations: [CLR_ALERT_DIRECTIVES],
            exports: [CLR_ALERT_DIRECTIVES],
        })
    ], ClrAlertModule);
    return ClrAlertModule;
}());
export { ClrAlertModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZW1waGFzaXMvYWxlcnQvYWxlcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQU9yRztJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUwxQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUFDO1lBQ3pELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQ2hDLENBQUM7T0FDVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDbHJEcm9wZG93bk1vZHVsZSB9IGZyb20gJy4uLy4uL3BvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcblxuaW1wb3J0IHsgQ2xyQWxlcnQgfSBmcm9tICcuL2FsZXJ0JztcbmltcG9ydCB7IENsckFsZXJ0SXRlbSB9IGZyb20gJy4vYWxlcnQtaXRlbSc7XG5pbXBvcnQgeyBDbHJBbGVydHMgfSBmcm9tICcuL2FsZXJ0cyc7XG5pbXBvcnQgeyBDbHJBbGVydHNQYWdlciB9IGZyb20gJy4vYWxlcnRzLXBhZ2VyJztcblxuZXhwb3J0IGNvbnN0IENMUl9BTEVSVF9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtDbHJBbGVydCwgQ2xyQWxlcnRJdGVtLCBDbHJBbGVydHMsIENsckFsZXJ0c1BhZ2VyXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xySWNvbk1vZHVsZSwgQ2xyRHJvcGRvd25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfQUxFUlRfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfQUxFUlRfRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIENsckFsZXJ0TW9kdWxlIHt9XG4iXX0=