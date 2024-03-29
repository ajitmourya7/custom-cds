/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrMainContainer } from './main-container';
export var CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
var ClrMainContainerModule = /** @class */ (function () {
    function ClrMainContainerModule() {
    }
    ClrMainContainerModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule],
            declarations: [CLR_LAYOUT_DIRECTIVES],
            exports: [CLR_LAYOUT_DIRECTIVES],
        })
    ], ClrMainContainerModule);
    return ClrMainContainerModule;
}());
export { ClrMainContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L21haW4tY29udGFpbmVyL21haW4tY29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBT3JFO0lBQUE7SUFBcUMsQ0FBQztJQUF6QixzQkFBc0I7UUFMbEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztZQUN0QyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztTQUNqQyxDQUFDO09BQ1csc0JBQXNCLENBQUc7SUFBRCw2QkFBQztDQUFBLEFBQXRDLElBQXNDO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IENsck1haW5Db250YWluZXIgfSBmcm9tICcuL21haW4tY29udGFpbmVyJztcblxuZXhwb3J0IGNvbnN0IENMUl9MQVlPVVRfRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbQ2xyTWFpbkNvbnRhaW5lcl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDTFJfTEFZT1VUX0RJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbQ0xSX0xBWU9VVF9ESVJFQ1RJVkVTXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTWFpbkNvbnRhaW5lck1vZHVsZSB7fVxuIl19