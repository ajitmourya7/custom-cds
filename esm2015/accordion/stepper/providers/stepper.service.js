/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccordionService } from './../../providers/accordion.service';
import { StepperModel } from '../models/stepper.model';
let StepperService = class StepperService extends AccordionService {
    constructor() {
        super(...arguments);
        this.panelsCompleted = this.getAllCompletedPanelChanges();
        this.accordion = new StepperModel();
        this._activeStepChanges = new Subject();
        this.activeStep = this._activeStepChanges.asObservable();
    }
    resetPanels() {
        this.accordion.resetPanels();
        this.emitUpdatedPanels();
    }
    setPanelsWithErrors(ids) {
        this.accordion.setPanelsWithErrors(ids);
        this.emitUpdatedPanels();
    }
    navigateToNextPanel(currentPanelId, currentPanelValid = true) {
        this.accordion.navigateToNextPanel(currentPanelId, currentPanelValid);
        this.updateNextStep(currentPanelId, currentPanelValid);
        this.emitUpdatedPanels();
    }
    overrideInitialPanel(panelId) {
        this.accordion.overrideInitialPanel(panelId);
        this.emitUpdatedPanels();
    }
    updateNextStep(currentPanelId, currentPanelValid) {
        const nextPanel = this.accordion.getNextPanel(currentPanelId);
        if (currentPanelValid && nextPanel) {
            this._activeStepChanges.next(nextPanel.id);
        }
        else if (currentPanelValid) {
            this._activeStepChanges.next(currentPanelId);
        }
    }
    getAllCompletedPanelChanges() {
        return this._panelsChanges.pipe(map(() => this.accordion.allPanelsCompleted), distinctUntilChanged());
    }
};
StepperService = tslib_1.__decorate([
    Injectable()
], StepperService);
export { StepperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL3N0ZXBwZXIvcHJvdmlkZXJzL3N0ZXBwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3ZELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxnQkFBZ0I7SUFEcEQ7O1FBRVcsb0JBQWUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNwRCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQzFDLGVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFvQy9ELENBQUM7SUFsQ0MsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELG1CQUFtQixDQUFDLEdBQWE7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsY0FBc0IsRUFBRSxpQkFBaUIsR0FBRyxJQUFJO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsT0FBZTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxjQUFjLENBQUMsY0FBc0IsRUFBRSxpQkFBMEI7UUFDdkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFOUQsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLGlCQUFpQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRU8sMkJBQTJCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDeEcsQ0FBQztDQUNGLENBQUE7QUF6Q1ksY0FBYztJQUQxQixVQUFVLEVBQUU7R0FDQSxjQUFjLENBeUMxQjtTQXpDWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9wcm92aWRlcnMvYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RlcHBlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3N0ZXBwZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RlcHBlclNlcnZpY2UgZXh0ZW5kcyBBY2NvcmRpb25TZXJ2aWNlIHtcbiAgcmVhZG9ubHkgcGFuZWxzQ29tcGxldGVkID0gdGhpcy5nZXRBbGxDb21wbGV0ZWRQYW5lbENoYW5nZXMoKTtcbiAgcHJvdGVjdGVkIGFjY29yZGlvbiA9IG5ldyBTdGVwcGVyTW9kZWwoKTtcblxuICBwcml2YXRlIF9hY3RpdmVTdGVwQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcmVhZG9ubHkgYWN0aXZlU3RlcCA9IHRoaXMuX2FjdGl2ZVN0ZXBDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHJlc2V0UGFuZWxzKCkge1xuICAgIHRoaXMuYWNjb3JkaW9uLnJlc2V0UGFuZWxzKCk7XG4gICAgdGhpcy5lbWl0VXBkYXRlZFBhbmVscygpO1xuICB9XG5cbiAgc2V0UGFuZWxzV2l0aEVycm9ycyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5hY2NvcmRpb24uc2V0UGFuZWxzV2l0aEVycm9ycyhpZHMpO1xuICAgIHRoaXMuZW1pdFVwZGF0ZWRQYW5lbHMoKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG9OZXh0UGFuZWwoY3VycmVudFBhbmVsSWQ6IHN0cmluZywgY3VycmVudFBhbmVsVmFsaWQgPSB0cnVlKSB7XG4gICAgdGhpcy5hY2NvcmRpb24ubmF2aWdhdGVUb05leHRQYW5lbChjdXJyZW50UGFuZWxJZCwgY3VycmVudFBhbmVsVmFsaWQpO1xuICAgIHRoaXMudXBkYXRlTmV4dFN0ZXAoY3VycmVudFBhbmVsSWQsIGN1cnJlbnRQYW5lbFZhbGlkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBvdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjY29yZGlvbi5vdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5leHRTdGVwKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcsIGN1cnJlbnRQYW5lbFZhbGlkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV4dFBhbmVsID0gdGhpcy5hY2NvcmRpb24uZ2V0TmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkKTtcblxuICAgIGlmIChjdXJyZW50UGFuZWxWYWxpZCAmJiBuZXh0UGFuZWwpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVN0ZXBDaGFuZ2VzLm5leHQobmV4dFBhbmVsLmlkKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYW5lbFZhbGlkKSB7XG4gICAgICB0aGlzLl9hY3RpdmVTdGVwQ2hhbmdlcy5uZXh0KGN1cnJlbnRQYW5lbElkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFsbENvbXBsZXRlZFBhbmVsQ2hhbmdlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcGFuZWxzQ2hhbmdlcy5waXBlKG1hcCgoKSA9PiB0aGlzLmFjY29yZGlvbi5hbGxQYW5lbHNDb21wbGV0ZWQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxufVxuIl19