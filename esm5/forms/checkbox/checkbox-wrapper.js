/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlIdService } from '../common/providers/control-id.service';
import { ClrLabel } from '../common/label';
export var IS_TOGGLE = new InjectionToken('IS_TOGGLE');
export function isToggleFactory() {
    return new BehaviorSubject(false);
}
export var IS_TOGGLE_PROVIDER = { provide: IS_TOGGLE, useFactory: isToggleFactory };
var ClrCheckboxWrapper = /** @class */ (function () {
    function ClrCheckboxWrapper(toggleService) {
        var _this = this;
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
        this.toggle = false;
        this.subscriptions = [];
        this.subscriptions.push(toggleService.subscribe(function (state) {
            _this.toggle = state;
        }));
    }
    ClrCheckboxWrapper.prototype.ngOnInit = function () {
        if (this.label) {
            this.label.disableGrid();
        }
    };
    ClrCheckboxWrapper.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        ContentChild(ClrLabel, { static: true }),
        tslib_1.__metadata("design:type", ClrLabel)
    ], ClrCheckboxWrapper.prototype, "label", void 0);
    ClrCheckboxWrapper = tslib_1.__decorate([
        Component({
            selector: 'clr-checkbox-wrapper,clr-toggle-wrapper',
            template: "\n    <ng-content select=\"[clrCheckbox],[clrToggle]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
            host: {
                '[class.clr-checkbox-wrapper]': '!toggle',
                '[class.clr-toggle-wrapper]': 'toggle',
            },
            providers: [ControlIdService, IS_TOGGLE_PROVIDER]
        }),
        tslib_1.__param(0, Inject(IS_TOGGLE)),
        tslib_1.__metadata("design:paramtypes", [BehaviorSubject])
    ], ClrCheckboxWrapper);
    return ClrCheckboxWrapper;
}());
export { ClrCheckboxWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2NoZWNrYm94L2NoZWNrYm94LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQTJCLFdBQVcsQ0FBQyxDQUFDO0FBQ25GLE1BQU0sVUFBVSxlQUFlO0lBQzdCLE9BQU8sSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUNELE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFldEY7SUFVRSw0QkFBK0IsYUFBdUM7UUFBdEUsaUJBTUM7UUFmRCxrRkFBa0Y7UUFDbEYsc0ZBQXNGO1FBQ3RGLHdDQUF3QztRQUN4QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDUCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzNCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQXBCRDtRQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7MENBQ2xDLFFBQVE7cURBQUM7SUFOTCxrQkFBa0I7UUFiOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlDQUF5QztZQUNuRCxRQUFRLEVBQUUsZ0tBSVQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osOEJBQThCLEVBQUUsU0FBUztnQkFDekMsNEJBQTRCLEVBQUUsUUFBUTthQUN2QztZQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO1NBQ2xELENBQUM7UUFXYSxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7aURBQWdCLGVBQWU7T0FWbEQsa0JBQWtCLENBMkI5QjtJQUFELHlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEeW5hbWljV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2hvc3Qtd3JhcHBpbmcvZHluYW1pYy13cmFwcGVyJztcbmltcG9ydCB7IENvbnRyb2xJZFNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vcHJvdmlkZXJzL2NvbnRyb2wtaWQuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbCc7XG5cbmV4cG9ydCBjb25zdCBJU19UT0dHTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+PignSVNfVE9HR0xFJyk7XG5leHBvcnQgZnVuY3Rpb24gaXNUb2dnbGVGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG59XG5leHBvcnQgY29uc3QgSVNfVE9HR0xFX1BST1ZJREVSID0geyBwcm92aWRlOiBJU19UT0dHTEUsIHVzZUZhY3Rvcnk6IGlzVG9nZ2xlRmFjdG9yeSB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItY2hlY2tib3gtd3JhcHBlcixjbHItdG9nZ2xlLXdyYXBwZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjbHJDaGVja2JveF0sW2NsclRvZ2dsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibGFiZWxcIj48L25nLWNvbnRlbnQ+XG4gICAgPGxhYmVsICpuZ0lmPVwiIWxhYmVsXCI+PC9sYWJlbD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuY2xyLWNoZWNrYm94LXdyYXBwZXJdJzogJyF0b2dnbGUnLFxuICAgICdbY2xhc3MuY2xyLXRvZ2dsZS13cmFwcGVyXSc6ICd0b2dnbGUnLFxuICB9LFxuICBwcm92aWRlcnM6IFtDb250cm9sSWRTZXJ2aWNlLCBJU19UT0dHTEVfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDaGVja2JveFdyYXBwZXIgaW1wbGVtZW50cyBEeW5hbWljV3JhcHBlciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyBXZSBuZWVkIGJvdGggX2R5bmFtaWMgZm9yIEhvc3RXcmFwcGVyIGFuZCBDb250ZW50Q2hpbGQoQ2xyTGFiZWwpIGluIGNhc2VzIHdoZXJlXG4gIC8vIHRoZSB1c2VyIHB1dHMgYSByYWRpbyBpbnNpZGUgYSB3cmFwcGVyIHdpdGhvdXQgYSBsYWJlbCwgaG9zdCB3cmFwcGluZyBkb2Vzbid0IGFwcGx5XG4gIC8vIGJ1dCB3ZSdkIHN0aWxsIG5lZWQgdG8gaW5zZXJ0IGEgbGFiZWxcbiAgX2R5bmFtaWMgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZChDbHJMYWJlbCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgbGFiZWw6IENsckxhYmVsO1xuICB0b2dnbGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSVNfVE9HR0xFKSB0b2dnbGVTZXJ2aWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4pIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRvZ2dsZVNlcnZpY2Uuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGUgPSBzdGF0ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICB0aGlzLmxhYmVsLmRpc2FibGVHcmlkKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19