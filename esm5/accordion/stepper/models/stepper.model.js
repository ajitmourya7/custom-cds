/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { AccordionModel } from '../../models/accordion.model';
import { AccordionStatus } from '../../enums/accordion-status.enum';
var StepperModel = /** @class */ (function (_super) {
    tslib_1.__extends(StepperModel, _super);
    function StepperModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StepperModel.prototype, "allPanelsCompleted", {
        get: function () {
            return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
        },
        enumerable: true,
        configurable: true
    });
    StepperModel.prototype.addPanel = function (id, open) {
        if (open === void 0) { open = false; }
        _super.prototype.addPanel.call(this, id, open);
        this._panels[id].disabled = true;
    };
    StepperModel.prototype.updatePanelOrder = function (ids) {
        _super.prototype.updatePanelOrder.call(this, ids);
        this.openFirstPanel();
    };
    StepperModel.prototype.togglePanel = function (panelId) {
        if (this._panels[panelId].status === AccordionStatus.Complete) {
            this._panels[panelId].open = !this._panels[panelId].open;
        }
    };
    StepperModel.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        if (currentPanelValid) {
            this.completePanel(currentPanelId);
            this.openNextPanel(this._panels[currentPanelId].id);
        }
        else {
            this.setPanelError(currentPanelId);
        }
    };
    StepperModel.prototype.overrideInitialPanel = function (panelId) {
        var _this = this;
        this.panels.filter(function () { return _this._panels[panelId] !== undefined; }).forEach(function (panel) {
            if (panel.index < _this._panels[panelId].index) {
                _this.completePanel(panel.id);
            }
            else if (panel.id === panelId) {
                _this._panels[panel.id].open = true;
            }
            else {
                _this._panels[panel.id].open = false;
            }
        });
    };
    StepperModel.prototype.setPanelsWithErrors = function (ids) {
        var _this = this;
        ids.forEach(function (id) { return _this.setPanelError(id); });
    };
    StepperModel.prototype.resetPanels = function () {
        var _this = this;
        this.panels.forEach(function (p) { return _this.resetPanel(p.id); });
        this.openFirstPanel();
    };
    StepperModel.prototype.getNextPanel = function (currentPanelId) {
        var _this = this;
        return this.panels.find(function (s) { return s.index === _this._panels[currentPanelId].index + 1; });
    };
    StepperModel.prototype.resetAllFuturePanels = function (panelId) {
        var _this = this;
        this.panels.filter(function (panel) { return panel.index >= _this._panels[panelId].index; }).forEach(function (panel) { return _this.resetPanel(panel.id); });
    };
    StepperModel.prototype.resetPanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Inactive;
        this._panels[panelId].open = false;
        this._panels[panelId].disabled = true;
    };
    StepperModel.prototype.openFirstPanel = function () {
        var firstPanel = this.getFirstPanel();
        this._panels[firstPanel.id].open = true;
        this._panels[firstPanel.id].disabled = true;
    };
    StepperModel.prototype.completePanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Complete;
        this._panels[panelId].disabled = false;
        this._panels[panelId].open = false;
    };
    StepperModel.prototype.openNextPanel = function (currentPanelId) {
        var nextPanel = this.getNextPanel(currentPanelId);
        if (nextPanel) {
            this.resetAllFuturePanels(nextPanel.id);
            this._panels[nextPanel.id].open = true;
            this._panels[nextPanel.id].disabled = true;
        }
    };
    StepperModel.prototype.setPanelError = function (panelId) {
        this.resetAllFuturePanels(panelId);
        this._panels[panelId].open = true;
        this._panels[panelId].status = AccordionStatus.Error;
    };
    StepperModel.prototype.getFirstPanel = function () {
        return this.panels.find(function (panel) { return panel.index === 0; });
    };
    StepperModel.prototype.getNumberOfIncompletePanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.status !== AccordionStatus.Complete ? prev + 1 : prev); }, 0);
    };
    StepperModel.prototype.getNumberOfOpenPanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.open !== false ? prev + 1 : prev); }, 0);
    };
    return StepperModel;
}(AccordionModel));
export { StepperModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9zdGVwcGVyL21vZGVscy9zdGVwcGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRTtJQUFrQyx3Q0FBYztJQUFoRDs7SUF3R0EsQ0FBQztJQXZHQyxzQkFBSSw0Q0FBa0I7YUFBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUcsQ0FBQzs7O09BQUE7SUFFRCwrQkFBUSxHQUFSLFVBQVMsRUFBVSxFQUFFLElBQVk7UUFBWixxQkFBQSxFQUFBLFlBQVk7UUFDL0IsaUJBQU0sUUFBUSxZQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixHQUFhO1FBQzVCLGlCQUFNLGdCQUFnQixZQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLE9BQWU7UUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9B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bkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQ3ZELENBQUM7SUFFTyxvQ0FBYSxHQUFyQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyxrREFBMkIsR0FBbkM7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUksSUFBSyxPQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBNUQsQ0FBNEQsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBRU8sNENBQXFCLEdBQTdCO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBdkMsQ0FBdUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBeEdELENBQWtDLGNBQWMsR0F3Ry9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBBY2NvcmRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9hY2NvcmRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQWNjb3JkaW9uU3RhdHVzIH0gZnJvbSAnLi4vLi4vZW51bXMvYWNjb3JkaW9uLXN0YXR1cy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIFN0ZXBwZXJNb2RlbCBleHRlbmRzIEFjY29yZGlvbk1vZGVsIHtcbiAgZ2V0IGFsbFBhbmVsc0NvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMubGVuZ3RoICYmIHRoaXMuZ2V0TnVtYmVyT2ZJbmNvbXBsZXRlUGFuZWxzKCkgPT09IDAgJiYgdGhpcy5nZXROdW1iZXJPZk9wZW5QYW5lbHMoKSA9PT0gMDtcbiAgfVxuXG4gIGFkZFBhbmVsKGlkOiBzdHJpbmcsIG9wZW4gPSBmYWxzZSkge1xuICAgIHN1cGVyLmFkZFBhbmVsKGlkLCBvcGVuKTtcbiAgICB0aGlzLl9wYW5lbHNbaWRdLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZVBhbmVsT3JkZXIoaWRzOiBzdHJpbmdbXSkge1xuICAgIHN1cGVyLnVwZGF0ZVBhbmVsT3JkZXIoaWRzKTtcbiAgICB0aGlzLm9wZW5GaXJzdFBhbmVsKCk7XG4gIH1cblxuICB0b2dnbGVQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcGFuZWxzW3BhbmVsSWRdLnN0YXR1cyA9PT0gQWNjb3JkaW9uU3RhdHVzLkNvbXBsZXRlKSB7XG4gICAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbiA9ICF0aGlzLl9wYW5lbHNbcGFuZWxJZF0ub3BlbjtcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvTmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcsIGN1cnJlbnRQYW5lbFZhbGlkID0gdHJ1ZSkge1xuICAgIGlmIChjdXJyZW50UGFuZWxWYWxpZCkge1xuICAgICAgdGhpcy5jb21wbGV0ZVBhbmVsKGN1cnJlbnRQYW5lbElkKTtcbiAgICAgIHRoaXMub3Blbk5leHRQYW5lbCh0aGlzLl9wYW5lbHNbY3VycmVudFBhbmVsSWRdLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRQYW5lbEVycm9yKGN1cnJlbnRQYW5lbElkKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZUluaXRpYWxQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhbmVscy5maWx0ZXIoKCkgPT4gdGhpcy5fcGFuZWxzW3BhbmVsSWRdICE9PSB1bmRlZmluZWQpLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmluZGV4IDwgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLmluZGV4KSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVQYW5lbChwYW5lbC5pZCk7XG4gICAgICB9IGVsc2UgaWYgKHBhbmVsLmlkID09PSBwYW5lbElkKSB7XG4gICAgICAgIHRoaXMuX3BhbmVsc1twYW5lbC5pZF0ub3BlbiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wYW5lbHNbcGFuZWwuaWRdLm9wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBhbmVsc1dpdGhFcnJvcnMoaWRzOiBzdHJpbmdbXSkge1xuICAgIGlkcy5mb3JFYWNoKGlkID0+IHRoaXMuc2V0UGFuZWxFcnJvcihpZCkpO1xuICB9XG5cbiAgcmVzZXRQYW5lbHMoKSB7XG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwID0+IHRoaXMucmVzZXRQYW5lbChwLmlkKSk7XG4gICAgdGhpcy5vcGVuRmlyc3RQYW5lbCgpO1xuICB9XG5cbiAgZ2V0TmV4dFBhbmVsKGN1cnJlbnRQYW5lbElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMuZmluZChzID0+IHMuaW5kZXggPT09IHRoaXMuX3BhbmVsc1tjdXJyZW50UGFuZWxJZF0uaW5kZXggKyAxKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRBbGxGdXR1cmVQYW5lbHMocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5wYW5lbHMuZmlsdGVyKHBhbmVsID0+IHBhbmVsLmluZGV4ID49IHRoaXMuX3BhbmVsc1twYW5lbElkXS5pbmRleCkuZm9yRWFjaChwYW5lbCA9PiB0aGlzLnJlc2V0UGFuZWwocGFuZWwuaWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRQYW5lbChwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wYW5lbHNbcGFuZWxJZF0uc3RhdHVzID0gQWNjb3JkaW9uU3RhdHVzLkluYWN0aXZlO1xuICAgIHRoaXMuX3BhbmVsc1twYW5lbElkXS5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpcnN0UGFuZWwoKSB7XG4gICAgY29uc3QgZmlyc3RQYW5lbCA9IHRoaXMuZ2V0Rmlyc3RQYW5lbCgpO1xuICAgIHRoaXMuX3BhbmVsc1tmaXJzdFBhbmVsLmlkXS5vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9wYW5lbHNbZmlyc3RQYW5lbC5pZF0uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZVBhbmVsKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMuX3BhbmVsc1twYW5lbElkXS5zdGF0dXMgPSBBY2NvcmRpb25TdGF0dXMuQ29tcGxldGU7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLm9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgb3Blbk5leHRQYW5lbChjdXJyZW50UGFuZWxJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgbmV4dFBhbmVsID0gdGhpcy5nZXROZXh0UGFuZWwoY3VycmVudFBhbmVsSWQpO1xuXG4gICAgaWYgKG5leHRQYW5lbCkge1xuICAgICAgdGhpcy5yZXNldEFsbEZ1dHVyZVBhbmVscyhuZXh0UGFuZWwuaWQpO1xuICAgICAgdGhpcy5fcGFuZWxzW25leHRQYW5lbC5pZF0ub3BlbiA9IHRydWU7XG4gICAgICB0aGlzLl9wYW5lbHNbbmV4dFBhbmVsLmlkXS5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYW5lbEVycm9yKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucmVzZXRBbGxGdXR1cmVQYW5lbHMocGFuZWxJZCk7XG4gICAgdGhpcy5fcGFuZWxzW3BhbmVsSWRdLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuX3BhbmVsc1twYW5lbElkXS5zdGF0dXMgPSBBY2NvcmRpb25TdGF0dXMuRXJyb3I7XG4gIH1cblxuICBwcml2YXRlIGdldEZpcnN0UGFuZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQocGFuZWwgPT4gcGFuZWwuaW5kZXggPT09IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROdW1iZXJPZkluY29tcGxldGVQYW5lbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLnJlZHVjZSgocHJldiwgbmV4dCkgPT4gKG5leHQuc3RhdHVzICE9PSBBY2NvcmRpb25TdGF0dXMuQ29tcGxldGUgPyBwcmV2ICsgMSA6IHByZXYpLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TnVtYmVyT2ZPcGVuUGFuZWxzKCkge1xuICAgIHJldHVybiB0aGlzLnBhbmVscy5yZWR1Y2UoKHByZXYsIG5leHQpID0+IChuZXh0Lm9wZW4gIT09IGZhbHNlID8gcHJldiArIDEgOiBwcmV2KSwgMCk7XG4gIH1cbn1cbiJdfQ==