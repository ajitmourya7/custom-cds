/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DatagridRenderStep } from '../enums/render-step.enum';
var DatagridRenderOrganizer = /** @class */ (function () {
    function DatagridRenderOrganizer() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "renderStep", {
        get: function () {
            return this._renderStep.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridRenderOrganizer.prototype.filterRenderSteps = function (step) {
        return this.renderStep.pipe(filter(function (testStep) { return step === testStep; }));
    };
    DatagridRenderOrganizer.prototype.resize = function () {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    };
    DatagridRenderOrganizer = tslib_1.__decorate([
        Injectable()
    ], DatagridRenderOrganizer);
    return DatagridRenderOrganizer;
}());
export { DatagridRenderOrganizer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW9yZ2FuaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL3JlbmRlci1vcmdhbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRy9EO0lBREE7UUFFWSxnQkFBVyxHQUFnQyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQVMvRSxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQVkvQixDQUFDO0lBcEJDLHNCQUFXLCtDQUFVO2FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRU0sbURBQWlCLEdBQXhCLFVBQXlCLElBQXdCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsSUFBSSxLQUFLLFFBQVEsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUlNLHdDQUFNLEdBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBckJVLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7T0FDQSx1QkFBdUIsQ0FzQm5DO0lBQUQsOEJBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQXRCWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJTdGVwIH0gZnJvbSAnLi4vZW51bXMvcmVuZGVyLXN0ZXAuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplciB7XG4gIHByb3RlY3RlZCBfcmVuZGVyU3RlcDogU3ViamVjdDxEYXRhZ3JpZFJlbmRlclN0ZXA+ID0gbmV3IFN1YmplY3Q8RGF0YWdyaWRSZW5kZXJTdGVwPigpO1xuICBwdWJsaWMgZ2V0IHJlbmRlclN0ZXAoKTogT2JzZXJ2YWJsZTxEYXRhZ3JpZFJlbmRlclN0ZXA+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RlcC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXJSZW5kZXJTdGVwcyhzdGVwOiBEYXRhZ3JpZFJlbmRlclN0ZXApIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJTdGVwLnBpcGUoZmlsdGVyKHRlc3RTdGVwID0+IHN0ZXAgPT09IHRlc3RTdGVwKSk7XG4gIH1cblxuICBwcml2YXRlIGFscmVhZHlTaXplZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyByZXNpemUoKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DQUxDVUxBVEVfTU9ERV9PTik7XG4gICAgaWYgKHRoaXMuYWxyZWFkeVNpemVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNMRUFSX1dJRFRIUyk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkFMSUdOX0NPTFVNTlMpO1xuICAgIHRoaXMuYWxyZWFkeVNpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNBTENVTEFURV9NT0RFX09GRik7XG4gIH1cbn1cbiJdfQ==