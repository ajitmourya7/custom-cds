/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { StepperService } from './providers/stepper.service';
import { ClrStepperPanel } from './stepper-panel';
export var ClrStepButtonType;
(function (ClrStepButtonType) {
    ClrStepButtonType["Next"] = "next";
    ClrStepButtonType["Submit"] = "submit";
})(ClrStepButtonType || (ClrStepButtonType = {}));
var ClrStepButton = /** @class */ (function () {
    function ClrStepButton(clrStep, stepperService) {
        this.clrStep = clrStep;
        this.stepperService = stepperService;
        this.type = ClrStepButtonType.Next;
        this.submitButton = false;
    }
    ClrStepButton.prototype.ngOnInit = function () {
        this.submitButton = this.type === ClrStepButtonType.Submit;
    };
    ClrStepButton.prototype.navigateToNextPanel = function () {
        this.stepperService.navigateToNextPanel(this.clrStep.id, this.clrStep.formGroup.valid);
    };
    tslib_1.__decorate([
        Input('clrStepButton'),
        tslib_1.__metadata("design:type", String)
    ], ClrStepButton.prototype, "type", void 0);
    tslib_1.__decorate([
        HostBinding('class.btn-primary'),
        tslib_1.__metadata("design:type", Object)
    ], ClrStepButton.prototype, "submitButton", void 0);
    tslib_1.__decorate([
        HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrStepButton.prototype, "navigateToNextPanel", null);
    ClrStepButton = tslib_1.__decorate([
        Directive({
            selector: '[clrStepButton]',
            host: {
                '[class.clr-step-button]': 'true',
                '[class.btn]': 'true',
                '[type]': "'button'",
            },
        }),
        tslib_1.__metadata("design:paramtypes", [ClrStepperPanel, StepperService])
    ], ClrStepButton);
    return ClrStepButton;
}());
export { ClrStepButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vc3RlcHBlci9zdGVwLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVsRCxNQUFNLENBQU4sSUFBWSxpQkFHWDtBQUhELFdBQVksaUJBQWlCO0lBQzNCLGtDQUFhLENBQUE7SUFDYixzQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQUc1QjtBQVVEO0lBSUUsdUJBQW9CLE9BQXdCLEVBQVUsY0FBOEI7UUFBaEUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFINUQsU0FBSSxHQUErQixpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDaEQsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFFZ0MsQ0FBQztJQUV4RixnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztJQUM3RCxDQUFDO0lBR0QsMkNBQW1CLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBWnVCO1FBQXZCLEtBQUssQ0FBQyxlQUFlLENBQUM7OytDQUEyRDtJQUNoRDtRQUFqQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7O3VEQUFzQjtJQVN2RDtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7NERBR3JCO0lBYlUsYUFBYTtRQVJ6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRTtnQkFDSix5QkFBeUIsRUFBRSxNQUFNO2dCQUNqQyxhQUFhLEVBQUUsTUFBTTtnQkFDckIsUUFBUSxFQUFFLFVBQVU7YUFDckI7U0FDRixDQUFDO2lEQUs2QixlQUFlLEVBQTBCLGNBQWM7T0FKekUsYUFBYSxDQWN6QjtJQUFELG9CQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0ZXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvc3RlcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENsclN0ZXBwZXJQYW5lbCB9IGZyb20gJy4vc3RlcHBlci1wYW5lbCc7XG5cbmV4cG9ydCBlbnVtIENsclN0ZXBCdXR0b25UeXBlIHtcbiAgTmV4dCA9ICduZXh0JyxcbiAgU3VibWl0ID0gJ3N1Ym1pdCcsXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJTdGVwQnV0dG9uXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmNsci1zdGVwLWJ1dHRvbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5idG5dJzogJ3RydWUnLFxuICAgICdbdHlwZV0nOiBcIididXR0b24nXCIsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsclN0ZXBCdXR0b24gaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2NsclN0ZXBCdXR0b24nKSB0eXBlOiBDbHJTdGVwQnV0dG9uVHlwZSB8IHN0cmluZyA9IENsclN0ZXBCdXR0b25UeXBlLk5leHQ7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuYnRuLXByaW1hcnknKSBzdWJtaXRCdXR0b24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsclN0ZXA6IENsclN0ZXBwZXJQYW5lbCwgcHJpdmF0ZSBzdGVwcGVyU2VydmljZTogU3RlcHBlclNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJtaXRCdXR0b24gPSB0aGlzLnR5cGUgPT09IENsclN0ZXBCdXR0b25UeXBlLlN1Ym1pdDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgbmF2aWdhdGVUb05leHRQYW5lbCgpIHtcbiAgICB0aGlzLnN0ZXBwZXJTZXJ2aWNlLm5hdmlnYXRlVG9OZXh0UGFuZWwodGhpcy5jbHJTdGVwLmlkLCB0aGlzLmNsclN0ZXAuZm9ybUdyb3VwLnZhbGlkKTtcbiAgfVxufVxuIl19