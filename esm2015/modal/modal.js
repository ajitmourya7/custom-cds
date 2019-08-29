import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild, Inject, ElementRef, PLATFORM_ID, } from '@angular/core';
import { FocusTrapDirective } from '../utils/focus-trap/focus-trap.directive';
import { ScrollingService } from '../utils/scrolling/scrolling-service';
import { ClrCommonStringsService } from '../utils/i18n/common-strings.service';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../utils/id-generator/id-generator.service';
import { isPlatformBrowser } from '@angular/common';
let ClrModal = class ClrModal {
    constructor(_scrollingService, commonStrings, platformId, modalId) {
        this._scrollingService = _scrollingService;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.modalId = modalId;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = true;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    // Detect when _open is set to true and set no-scrolling to true
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    }
    ngOnDestroy() {
        this._scrollingService.resumeScrolling();
    }
    open() {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    }
    close() {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || !this._open) {
            return;
        }
        this._open = false;
        // SPECME
        this.focusTrap.setPreviousFocus(); // Handles moving focus back to the element that had it before.
    }
    // TODO Investigate if we can decouple from animation events
    fadeDone(e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
        else if (e.toState === 'false' && isPlatformBrowser(this.platformId) && this.modalTitle) {
            this.modalTitle.nativeElement.focus();
        }
    }
};
tslib_1.__decorate([
    ViewChild(FocusTrapDirective, { static: false }),
    tslib_1.__metadata("design:type", FocusTrapDirective)
], ClrModal.prototype, "focusTrap", void 0);
tslib_1.__decorate([
    ViewChild('modalTitle', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ClrModal.prototype, "modalTitle", void 0);
tslib_1.__decorate([
    HostBinding('class.open'),
    Input('clrModalOpen'),
    tslib_1.__metadata("design:type", Boolean)
], ClrModal.prototype, "_open", void 0);
tslib_1.__decorate([
    Output('clrModalOpenChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrModal.prototype, "_openChanged", void 0);
tslib_1.__decorate([
    Input('clrModalClosable'),
    tslib_1.__metadata("design:type", Boolean)
], ClrModal.prototype, "closable", void 0);
tslib_1.__decorate([
    Input('clrModalSize'),
    tslib_1.__metadata("design:type", String)
], ClrModal.prototype, "size", void 0);
tslib_1.__decorate([
    Input('clrModalStaticBackdrop'),
    tslib_1.__metadata("design:type", Boolean)
], ClrModal.prototype, "staticBackdrop", void 0);
tslib_1.__decorate([
    Input('clrModalSkipAnimation'),
    tslib_1.__metadata("design:type", String)
], ClrModal.prototype, "skipAnimation", void 0);
tslib_1.__decorate([
    Input('clrModalOverrideScrollService'),
    tslib_1.__metadata("design:type", Boolean)
], ClrModal.prototype, "bypassScrollService", void 0);
tslib_1.__decorate([
    Input('clrModalPreventClose'),
    tslib_1.__metadata("design:type", Boolean)
], ClrModal.prototype, "stopClose", void 0);
tslib_1.__decorate([
    Output('clrModalAlternateClose'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrModal.prototype, "altClose", void 0);
tslib_1.__decorate([
    HostListener('body:keyup.escape'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ClrModal.prototype, "close", null);
ClrModal = tslib_1.__decorate([
    Component({
        selector: 'clr-modal',
        viewProviders: [ScrollingService],
        template: "\n<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\"\n         aria-modal=\"true\"\n         [attr.aria-hidden]=\"!_open\"\n         [attr.aria-labelledby]=\"modalId\">\n      <div class=\"clr-sr-only\">{{commonStrings.keys.modalContentStart}}</div>\n      <div class=\"modal-content-wrapper\">\n        <!-- only used in wizards -->\n        <ng-content select=\".modal-nav\"></ng-content>\n\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" [attr.aria-label]=\"commonStrings.keys.close\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n              <clr-icon shape=\"close\"></clr-icon>\n            </button>\n            <div class=\"modal-title-wrapper\" tabindex=\"0\" id=\"{{modalId}}\" #modalTitle>\n              <ng-content select=\".modal-title\"></ng-content>\n            </div>\n          </div>\n          <ng-content select=\".modal-body\"></ng-content>\n          <ng-content select=\".modal-footer\"></ng-content>\n        </div>\n      </div>\n      <div class=\"clr-sr-only\">{{commonStrings.keys.modalContentEnd}}</div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
        animations: [
            trigger('fadeDown', [
                transition('* => false', [style({ opacity: 0, transform: 'translate(0, -25%)' }), animate('0.2s ease-in-out')]),
                transition('false => *', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
            ]),
            trigger('fade', [
                transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
                transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
            ]),
        ],
        providers: [UNIQUE_ID_PROVIDER],
        styles: [`
        :host { display: none; }
        :host.open { display: inline; }
    `]
    }),
    tslib_1.__param(2, Inject(PLATFORM_ID)),
    tslib_1.__param(3, Inject(UNIQUE_ID)),
    tslib_1.__metadata("design:paramtypes", [ScrollingService,
        ClrCommonStringsService,
        Object, String])
], ClrModal);
export { ClrModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF3QnBELElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFxQm5CLFlBQ1UsaUJBQW1DLEVBQ3BDLGFBQXNDLEVBQ2hCLFVBQWtCLEVBQ3JCLE9BQWU7UUFIakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNyQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBakIzQyxVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ08saUJBQVksR0FBMEIsSUFBSSxZQUFZLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFMUUsYUFBUSxHQUFZLElBQUksQ0FBQztRQUVuQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUNoQyxrQkFBYSxHQUFXLE9BQU8sQ0FBQztRQUVoRSx5Q0FBeUM7UUFDRCx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDOUMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUN4QixhQUFRLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBT2xHLENBQUM7SUFFSixnRUFBZ0U7SUFDaEUsV0FBVyxDQUFDLE9BQTZDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0UsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUMxQztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBR0QsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBUztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtJQUNwRyxDQUFDO0lBRUQsNERBQTREO0lBQzVELFFBQVEsQ0FBQyxDQUFpQjtRQUN4QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN6RixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7Q0FDRixDQUFBO0FBdkVDO0lBREMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUN0QyxrQkFBa0I7MkNBQUM7QUFFOUI7SUFEQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUMvQixVQUFVOzRDQUFpQjtBQUl2QztJQUZDLFdBQVcsQ0FBQyxZQUFZLENBQUM7SUFDekIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7dUNBQ0M7QUFDTztJQUE3QixNQUFNLENBQUMsb0JBQW9CLENBQUM7c0NBQWUsWUFBWTs4Q0FBNkM7QUFFMUU7SUFBMUIsS0FBSyxDQUFDLGtCQUFrQixDQUFDOzswQ0FBMEI7QUFDN0I7SUFBdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7c0NBQWM7QUFDSDtJQUFoQyxLQUFLLENBQUMsd0JBQXdCLENBQUM7O2dEQUFnQztBQUNoQztJQUEvQixLQUFLLENBQUMsdUJBQXVCLENBQUM7OytDQUFpQztBQUd4QjtJQUF2QyxLQUFLLENBQUMsK0JBQStCLENBQUM7O3FEQUFzQztBQUM5QztJQUE5QixLQUFLLENBQUMsc0JBQXNCLENBQUM7OzJDQUE0QjtBQUN4QjtJQUFqQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7c0NBQVcsWUFBWTswQ0FBNkM7QUFpQ3JHO0lBREMsWUFBWSxDQUFDLG1CQUFtQixDQUFDOzs7O3FDQVlqQztBQS9EVSxRQUFRO0lBdEJwQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixhQUFhLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxtekRBQTJCO1FBTzNCLFVBQVUsRUFBRTtZQUNWLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDL0csVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hILENBQUM7WUFDRixPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNkLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5RSxDQUFDO1NBQ0g7UUFDRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFmN0I7OztLQUdDO0tBYUosQ0FBQztJQXlCRyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbkIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZDQUhTLGdCQUFnQjtRQUNyQix1QkFBdUI7UUFDSixNQUFNO0dBeEJ0QyxRQUFRLENBeUVwQjtTQXpFWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmlld0NoaWxkLFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9jdXNUcmFwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsaW5nL3Njcm9sbGluZy1zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLW1vZGFsJyxcbiAgdmlld1Byb3ZpZGVyczogW1Njcm9sbGluZ1NlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuaHRtbCcsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIDpob3N0Lm9wZW4geyBkaXNwbGF5OiBpbmxpbmU7IH1cbiAgICBgLFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZURvd24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGZhbHNlJywgW3N0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0yNSUpJyB9KSwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpXSksXG4gICAgICB0cmFuc2l0aW9uKCdmYWxzZSA9PiAqJywgW2FuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtMjUlKScgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAuODUgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoRm9jdXNUcmFwRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZm9jdXNUcmFwOiBGb2N1c1RyYXBEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsVGl0bGUnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbW9kYWxUaXRsZTogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgQElucHV0KCdjbHJNb2RhbE9wZW4nKVxuICBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJNb2RhbE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyTW9kYWxDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNpemUnKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgnY2xyTW9kYWxTdGF0aWNCYWNrZHJvcCcpIHN0YXRpY0JhY2tkcm9wOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNraXBBbmltYXRpb24nKSBza2lwQW5pbWF0aW9uOiBzdHJpbmcgPSAnZmFsc2UnO1xuXG4gIC8vIHByZXNlbnRseSB0aGlzIGlzIG9ubHkgdXNlZCBieSB3aXphcmRzXG4gIEBJbnB1dCgnY2xyTW9kYWxPdmVycmlkZVNjcm9sbFNlcnZpY2UnKSBieXBhc3NTY3JvbGxTZXJ2aWNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyTW9kYWxQcmV2ZW50Q2xvc2UnKSBzdG9wQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyTW9kYWxBbHRlcm5hdGVDbG9zZScpIGFsdENsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zY3JvbGxpbmdTZXJ2aWNlOiBTY3JvbGxpbmdTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG1vZGFsSWQ6IHN0cmluZ1xuICApIHt9XG5cbiAgLy8gRGV0ZWN0IHdoZW4gX29wZW4gaXMgc2V0IHRvIHRydWUgYW5kIHNldCBuby1zY3JvbGxpbmcgdG8gdHJ1ZVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnlwYXNzU2Nyb2xsU2VydmljZSAmJiBjaGFuZ2VzICYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ19vcGVuJykpIHtcbiAgICAgIGlmIChjaGFuZ2VzLl9vcGVuLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5yZXN1bWVTY3JvbGxpbmcoKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6a2V5dXAuZXNjYXBlJylcbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RvcENsb3NlKSB7XG4gICAgICB0aGlzLmFsdENsb3NlLmVtaXQoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY2xvc2FibGUgfHwgIXRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIC8vIFNQRUNNRVxuICAgIHRoaXMuZm9jdXNUcmFwLnNldFByZXZpb3VzRm9jdXMoKTsgLy8gSGFuZGxlcyBtb3ZpbmcgZm9jdXMgYmFjayB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBpdCBiZWZvcmUuXG4gIH1cblxuICAvLyBUT0RPIEludmVzdGlnYXRlIGlmIHdlIGNhbiBkZWNvdXBsZSBmcm9tIGFuaW1hdGlvbiBldmVudHNcbiAgZmFkZURvbmUoZTogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZS50b1N0YXRlID09PSAndm9pZCcpIHtcbiAgICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoZS50b1N0YXRlID09PSAnZmFsc2UnICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5tb2RhbFRpdGxlKSB7XG4gICAgICB0aGlzLm1vZGFsVGl0bGUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuIl19