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
var StepperService = /** @class */ (function (_super) {
    tslib_1.__extends(StepperService, _super);
    function StepperService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelsCompleted = _this.getAllCompletedPanelChanges();
        _this.accordion = new StepperModel();
        _this._activeStepChanges = new Subject();
        _this.activeStep = _this._activeStepChanges.asObservable();
        return _this;
    }
    StepperService.prototype.resetPanels = function () {
        this.accordion.resetPanels();
        this.emitUpdatedPanels();
    };
    StepperService.prototype.setPanelsWithErrors = function (ids) {
        this.accordion.setPanelsWithErrors(ids);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        this.accordion.navigateToNextPanel(currentPanelId, currentPanelValid);
        this.updateNextStep(currentPanelId, currentPanelValid);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.overrideInitialPanel = function (panelId) {
        this.accordion.overrideInitialPanel(panelId);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.updateNextStep = function (currentPanelId, currentPanelValid) {
        var nextPanel = this.accordion.getNextPanel(currentPanelId);
        if (currentPanelValid && nextPanel) {
            this._activeStepChanges.next(nextPanel.id);
        }
        else if (currentPanelValid) {
            this._activeStepChanges.next(currentPanelId);
        }
    };
    StepperService.prototype.getAllCompletedPanelChanges = function () {
        var _this = this;
        return this._panelsChanges.pipe(map(function () { return _this.accordion.allPanelsCompleted; }), distinctUntilChanged());
    };
    StepperService = tslib_1.__decorate([
        Injectable()
    ], StepperService);
    return StepperService;
}(AccordionService));
export { StepperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL3N0ZXBwZXIvcHJvdmlkZXJzL3N0ZXBwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3ZEO0lBQW9DLDBDQUFnQjtJQURwRDtRQUFBLHFFQTBDQztRQXhDVSxxQkFBZSxHQUFHLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3BELGVBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpDLHdCQUFrQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDMUMsZ0JBQVUsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7O0lBb0MvRCxDQUFDO0lBbENDLG9DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw0Q0FBbUIsR0FBbkIsVUFBb0IsR0FBYTtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw0Q0FBbUIsR0FBbkIsVUFBb0IsY0FBc0IsRUFBRSxpQkFBd0I7UUFBeEIsa0NBQUEsRUFBQSx3QkFBd0I7UUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsT0FBZTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixjQUFzQixFQUFFLGlCQUEwQjtRQUN2RSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU5RCxJQUFJLGlCQUFpQixJQUFJLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksaUJBQWlCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFTyxvREFBMkIsR0FBbkM7UUFBQSxpQkFFQztRQURDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFqQyxDQUFpQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUF4Q1UsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBeUMxQjtJQUFELHFCQUFDO0NBQUEsQUF6Q0QsQ0FBb0MsZ0JBQWdCLEdBeUNuRDtTQXpDWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9wcm92aWRlcnMvYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RlcHBlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3N0ZXBwZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RlcHBlclNlcnZpY2UgZXh0ZW5kcyBBY2NvcmRpb25TZXJ2aWNlIHtcbiAgcmVhZG9ubHkgcGFuZWxzQ29tcGxldGVkID0gdGhpcy5nZXRBbGxDb21wbGV0ZWRQYW5lbENoYW5nZXMoKTtcbiAgcHJvdGVjdGVkIGFjY29yZGlvbiA9IG5ldyBTdGVwcGVyTW9kZWwoKTtcblxuICBwcml2YXRlIF9hY3RpdmVTdGVwQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcmVhZG9ubHkgYWN0aXZlU3RlcCA9IHRoaXMuX2FjdGl2ZVN0ZXBDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHJlc2V0UGFuZWxzKCkge1xuICAgIHRoaXMuYWNjb3JkaW9uLnJlc2V0UGFuZWxzKCk7XG4gICAgdGhpcy5lbWl0VXBkYXRlZFBhbmVscygpO1xuICB9XG5cbiAgc2V0UGFuZWxzV2l0aEVycm9ycyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5hY2NvcmRpb24uc2V0UGFuZWxzV2l0aEVycm9ycyhpZHMpO1xuICAgIHRoaXMuZW1pdFVwZGF0ZWRQYW5lbHMoKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG9OZXh0UGFuZWwoY3VycmVudFBhbmVsSWQ6IHN0cmluZywgY3VycmVudFBhbmVsVmFsaWQgPSB0cnVlKSB7XG4gICAgdGhpcy5hY2NvcmRpb24ubmF2aWdhdGVUb05leHRQYW5lbChjdXJyZW50UGFuZWxJZCwgY3VycmVudFBhbmVsVmFsaWQpO1xuICAgIHRoaXMudXBkYXRlTmV4dFN0ZXAoY3VycmVudFBhbmVsSWQsIGN1cnJlbnRQYW5lbFZhbGlkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBvdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjY29yZGlvbi5vdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkKTtcbiAgICB0aGlzLmVtaXRVcGRhdGVkUGFuZWxzKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU5leHRTdGVwKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcsIGN1cnJlbnRQYW5lbFZhbGlkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV4dFBhbmVsID0gdGhpcy5hY2NvcmRpb24uZ2V0TmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkKTtcblxuICAgIGlmIChjdXJyZW50UGFuZWxWYWxpZCAmJiBuZXh0UGFuZWwpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVN0ZXBDaGFuZ2VzLm5leHQobmV4dFBhbmVsLmlkKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYW5lbFZhbGlkKSB7XG4gICAgICB0aGlzLl9hY3RpdmVTdGVwQ2hhbmdlcy5uZXh0KGN1cnJlbnRQYW5lbElkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFsbENvbXBsZXRlZFBhbmVsQ2hhbmdlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcGFuZWxzQ2hhbmdlcy5waXBlKG1hcCgoKSA9PiB0aGlzLmFjY29yZGlvbi5hbGxQYW5lbHNDb21wbGV0ZWQpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxufVxuIl19