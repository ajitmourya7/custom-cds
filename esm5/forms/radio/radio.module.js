/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrHostWrappingModule } from '../../utils/host-wrapping/host-wrapping.module';
import { ClrCommonFormsModule } from '../common/common.module';
import { ClrRadio } from './radio';
import { ClrRadioContainer } from './radio-container';
import { ClrRadioWrapper } from './radio-wrapper';
var ClrRadioModule = /** @class */ (function () {
    function ClrRadioModule() {
    }
    ClrRadioModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule, ClrIconModule],
            declarations: [ClrRadio, ClrRadioContainer, ClrRadioWrapper],
            exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper],
            entryComponents: [ClrRadioWrapper],
        })
    ], ClrRadioModule);
    return ClrRadioModule;
}());
export { ClrRadioModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvcmFkaW8vcmFkaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBUWxEO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixjQUFjO1FBTjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRSxhQUFhLENBQUM7WUFDbkYsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztZQUM1RCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO1lBQzdFLGVBQWUsRUFBRSxDQUFDLGVBQWUsQ0FBQztTQUNuQyxDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IENsckhvc3RXcmFwcGluZ01vZHVsZSB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvaG9zdC13cmFwcGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uRm9ybXNNb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5cbmltcG9ydCB7IENsclJhZGlvIH0gZnJvbSAnLi9yYWRpbyc7XG5pbXBvcnQgeyBDbHJSYWRpb0NvbnRhaW5lciB9IGZyb20gJy4vcmFkaW8tY29udGFpbmVyJztcbmltcG9ydCB7IENsclJhZGlvV3JhcHBlciB9IGZyb20gJy4vcmFkaW8td3JhcHBlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENsckNvbW1vbkZvcm1zTW9kdWxlLCBDbHJIb3N0V3JhcHBpbmdNb2R1bGUsIENsckljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDbHJSYWRpbywgQ2xyUmFkaW9Db250YWluZXIsIENsclJhZGlvV3JhcHBlcl0sXG4gIGV4cG9ydHM6IFtDbHJDb21tb25Gb3Jtc01vZHVsZSwgQ2xyUmFkaW8sIENsclJhZGlvQ29udGFpbmVyLCBDbHJSYWRpb1dyYXBwZXJdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDbHJSYWRpb1dyYXBwZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJSYWRpb01vZHVsZSB7fVxuIl19