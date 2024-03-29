/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccordionModel } from '../models/accordion.model';
var AccordionService = /** @class */ (function () {
    function AccordionService() {
        this.accordion = new AccordionModel();
        this._panelsChanges = new BehaviorSubject(this.accordion.panels);
    }
    AccordionService.prototype.getPanelChanges = function (panelId) {
        return this._panelsChanges.pipe(map(function (panels) { return panels.find(function (s) { return s.id === panelId; }); }));
    };
    AccordionService.prototype.setStrategy = function (strategy) {
        this.accordion.setStrategy(strategy);
    };
    AccordionService.prototype.addPanel = function (panelId, open) {
        if (open === void 0) { open = false; }
        this.accordion.addPanel(panelId, open);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.togglePanel = function (panelId, open) {
        this.accordion.togglePanel(panelId, open);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.disablePanel = function (panelId, disabled) {
        this.accordion.disablePanel(panelId, disabled);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.updatePanelOrder = function (ids) {
        this.accordion.updatePanelOrder(ids);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.emitUpdatedPanels = function () {
        this._panelsChanges.next(this.accordion.panels);
    };
    AccordionService = tslib_1.__decorate([
        Injectable()
    ], AccordionService);
    return AccordionService;
}());
export { AccordionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vcHJvdmlkZXJzL2FjY29yZGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsY0FBYyxFQUF1QixNQUFNLDJCQUEyQixDQUFDO0FBSWhGO0lBREE7UUFFWSxjQUFTLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN4QixtQkFBYyxHQUFHLElBQUksZUFBZSxDQUF3QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBaUN4RyxDQUFDO0lBL0JDLDBDQUFlLEdBQWYsVUFBZ0IsT0FBZTtRQUM3QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLFFBQTJCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVMsT0FBZSxFQUFFLElBQVk7UUFBWixxQkFBQSxFQUFBLFlBQVk7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQ0FBVyxHQUFYLFVBQVksT0FBZSxFQUFFLElBQWM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsT0FBZSxFQUFFLFFBQWtCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQWdCLEdBQWhCLFVBQWlCLEdBQWE7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVMsNENBQWlCLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBbENVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0FtQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQW5DWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY2NvcmRpb25Nb2RlbCwgQWNjb3JkaW9uUGFuZWxNb2RlbCB9IGZyb20gJy4uL21vZGVscy9hY2NvcmRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQWNjb3JkaW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9lbnVtcy9hY2NvcmRpb24tc3RyYXRlZ3kuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGFjY29yZGlvbiA9IG5ldyBBY2NvcmRpb25Nb2RlbCgpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhbmVsc0NoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFjY29yZGlvblBhbmVsTW9kZWxbXT4odGhpcy5hY2NvcmRpb24ucGFuZWxzKTtcblxuICBnZXRQYW5lbENoYW5nZXMocGFuZWxJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBY2NvcmRpb25QYW5lbE1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhbmVsc0NoYW5nZXMucGlwZShtYXAocGFuZWxzID0+IHBhbmVscy5maW5kKHMgPT4gcy5pZCA9PT0gcGFuZWxJZCkpKTtcbiAgfVxuXG4gIHNldFN0cmF0ZWd5KHN0cmF0ZWd5OiBBY2NvcmRpb25TdHJhdGVneSkge1xuICAgIHRoaXMuYWNjb3JkaW9uLnNldFN0cmF0ZWd5KHN0cmF0ZWd5KTtcbiAgfVxuXG4gIGFkZFBhbmVsKHBhbmVsSWQ6IHN0cmluZywgb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5hY2NvcmRpb24uYWRkUGFuZWwocGFuZWxJZCwgb3Blbik7XG4gICAgdGhpcy5lbWl0VXBkYXRlZFBhbmVscygpO1xuICB9XG5cbiAgdG9nZ2xlUGFuZWwocGFuZWxJZDogc3RyaW5nLCBvcGVuPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWNjb3JkaW9uLnRvZ2dsZVBhbmVsKHBhbmVsSWQsIG9wZW4pO1xuICAgIHRoaXMuZW1pdFVwZGF0ZWRQYW5lbHMoKTtcbiAgfVxuXG4gIGRpc2FibGVQYW5lbChwYW5lbElkOiBzdHJpbmcsIGRpc2FibGVkPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWNjb3JkaW9uLmRpc2FibGVQYW5lbChwYW5lbElkLCBkaXNhYmxlZCk7XG4gICAgdGhpcy5lbWl0VXBkYXRlZFBhbmVscygpO1xuICB9XG5cbiAgdXBkYXRlUGFuZWxPcmRlcihpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5hY2NvcmRpb24udXBkYXRlUGFuZWxPcmRlcihpZHMpO1xuICAgIHRoaXMuZW1pdFVwZGF0ZWRQYW5lbHMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0VXBkYXRlZFBhbmVscygpIHtcbiAgICB0aGlzLl9wYW5lbHNDaGFuZ2VzLm5leHQodGhpcy5hY2NvcmRpb24ucGFuZWxzKTtcbiAgfVxufVxuIl19