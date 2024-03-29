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
let DatagridRenderOrganizer = class DatagridRenderOrganizer {
    constructor() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    get renderStep() {
        return this._renderStep.asObservable();
    }
    filterRenderSteps(step) {
        return this.renderStep.pipe(filter(testStep => step === testStep));
    }
    resize() {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    }
};
DatagridRenderOrganizer = tslib_1.__decorate([
    Injectable()
], DatagridRenderOrganizer);
export { DatagridRenderOrganizer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW9yZ2FuaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL3JlbmRlci1vcmdhbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRy9ELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBRHBDO1FBRVksZ0JBQVcsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFTL0UsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFZL0IsQ0FBQztJQXBCQyxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxJQUF3QjtRQUMvQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFJTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGLENBQUE7QUF0QlksdUJBQXVCO0lBRG5DLFVBQVUsRUFBRTtHQUNBLHVCQUF1QixDQXNCbkM7U0F0QlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFncmlkUmVuZGVyU3RlcCB9IGZyb20gJy4uL2VudW1zL3JlbmRlci1zdGVwLmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIge1xuICBwcm90ZWN0ZWQgX3JlbmRlclN0ZXA6IFN1YmplY3Q8RGF0YWdyaWRSZW5kZXJTdGVwPiA9IG5ldyBTdWJqZWN0PERhdGFncmlkUmVuZGVyU3RlcD4oKTtcbiAgcHVibGljIGdldCByZW5kZXJTdGVwKCk6IE9ic2VydmFibGU8RGF0YWdyaWRSZW5kZXJTdGVwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0ZXAuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyUmVuZGVyU3RlcHMoc3RlcDogRGF0YWdyaWRSZW5kZXJTdGVwKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyU3RlcC5waXBlKGZpbHRlcih0ZXN0U3RlcCA9PiBzdGVwID09PSB0ZXN0U3RlcCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbHJlYWR5U2l6ZWQgPSBmYWxzZTtcblxuICBwdWJsaWMgcmVzaXplKCkge1xuICAgIHRoaXMuX3JlbmRlclN0ZXAubmV4dChEYXRhZ3JpZFJlbmRlclN0ZXAuQ0FMQ1VMQVRFX01PREVfT04pO1xuICAgIGlmICh0aGlzLmFscmVhZHlTaXplZCkge1xuICAgICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DTEVBUl9XSURUSFMpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJTdGVwLm5leHQoRGF0YWdyaWRSZW5kZXJTdGVwLkNPTVBVVEVfQ09MVU1OX1dJRFRIUyk7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5BTElHTl9DT0xVTU5TKTtcbiAgICB0aGlzLmFscmVhZHlTaXplZCA9IHRydWU7XG4gICAgdGhpcy5fcmVuZGVyU3RlcC5uZXh0KERhdGFncmlkUmVuZGVyU3RlcC5DQUxDVUxBVEVfTU9ERV9PRkYpO1xuICB9XG59XG4iXX0=