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
var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService, commonStrings, platformId, modalId) {
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
    ClrModal.prototype.ngOnChanges = function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    ClrModal.prototype.ngOnDestroy = function () {
        this._scrollingService.resumeScrolling();
    };
    ClrModal.prototype.open = function () {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    ClrModal.prototype.close = function () {
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
    };
    // TODO Investigate if we can decouple from animation events
    ClrModal.prototype.fadeDone = function (e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
        else if (e.toState === 'false' && isPlatformBrowser(this.platformId) && this.modalTitle) {
            this.modalTitle.nativeElement.focus();
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
            styles: ["\n        :host { display: none; }\n        :host.open { display: inline; }\n    "]
        }),
        tslib_1.__param(2, Inject(PLATFORM_ID)),
        tslib_1.__param(3, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [ScrollingService,
            ClrCommonStringsService,
            Object, String])
    ], ClrModal);
    return ClrModal;
}());
export { ClrModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF3QnBEO0lBcUJFLGtCQUNVLGlCQUFtQyxFQUNwQyxhQUFzQyxFQUNoQixVQUFrQixFQUNyQixPQUFlO1FBSGpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWpCM0MsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRTFFLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFbkIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBVyxPQUFPLENBQUM7UUFF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O2lEQUhTLGdCQUFnQjtZQUNyQix1QkFBdUI7WUFDSixNQUFNO09BeEJ0QyxRQUFRLENBeUVwQjtJQUFELGVBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXpFWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmlld0NoaWxkLFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9jdXNUcmFwRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsaW5nL3Njcm9sbGluZy1zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLW1vZGFsJyxcbiAgdmlld1Byb3ZpZGVyczogW1Njcm9sbGluZ1NlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuaHRtbCcsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgOmhvc3QgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIDpob3N0Lm9wZW4geyBkaXNwbGF5OiBpbmxpbmU7IH1cbiAgICBgLFxuICBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZURvd24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGZhbHNlJywgW3N0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsIC0yNSUpJyB9KSwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpXSksXG4gICAgICB0cmFuc2l0aW9uKCdmYWxzZSA9PiAqJywgW2FuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAtMjUlKScgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzAuMnMgZWFzZS1pbi1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAuODUgfSkpXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbVU5JUVVFX0lEX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoRm9jdXNUcmFwRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgZm9jdXNUcmFwOiBGb2N1c1RyYXBEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsVGl0bGUnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgbW9kYWxUaXRsZTogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgQElucHV0KCdjbHJNb2RhbE9wZW4nKVxuICBfb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCdjbHJNb2RhbE9wZW5DaGFuZ2UnKSBfb3BlbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY2xyTW9kYWxDbG9zYWJsZScpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNpemUnKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgnY2xyTW9kYWxTdGF0aWNCYWNrZHJvcCcpIHN0YXRpY0JhY2tkcm9wOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbHJNb2RhbFNraXBBbmltYXRpb24nKSBza2lwQW5pbWF0aW9uOiBzdHJpbmcgPSAnZmFsc2UnO1xuXG4gIC8vIHByZXNlbnRseSB0aGlzIGlzIG9ubHkgdXNlZCBieSB3aXphcmRzXG4gIEBJbnB1dCgnY2xyTW9kYWxPdmVycmlkZVNjcm9sbFNlcnZpY2UnKSBieXBhc3NTY3JvbGxTZXJ2aWNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xyTW9kYWxQcmV2ZW50Q2xvc2UnKSBzdG9wQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgnY2xyTW9kYWxBbHRlcm5hdGVDbG9zZScpIGFsdENsb3NlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zY3JvbGxpbmdTZXJ2aWNlOiBTY3JvbGxpbmdTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIG1vZGFsSWQ6IHN0cmluZ1xuICApIHt9XG5cbiAgLy8gRGV0ZWN0IHdoZW4gX29wZW4gaXMgc2V0IHRvIHRydWUgYW5kIHNldCBuby1zY3JvbGxpbmcgdG8gdHJ1ZVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYnlwYXNzU2Nyb2xsU2VydmljZSAmJiBjaGFuZ2VzICYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ19vcGVuJykpIHtcbiAgICAgIGlmIChjaGFuZ2VzLl9vcGVuLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxpbmdTZXJ2aWNlLnN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGluZ1NlcnZpY2UucmVzdW1lU2Nyb2xsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc2Nyb2xsaW5nU2VydmljZS5yZXN1bWVTY3JvbGxpbmcoKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgdGhpcy5fb3BlbkNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6a2V5dXAuZXNjYXBlJylcbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RvcENsb3NlKSB7XG4gICAgICB0aGlzLmFsdENsb3NlLmVtaXQoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY2xvc2FibGUgfHwgIXRoaXMuX29wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgIC8vIFNQRUNNRVxuICAgIHRoaXMuZm9jdXNUcmFwLnNldFByZXZpb3VzRm9jdXMoKTsgLy8gSGFuZGxlcyBtb3ZpbmcgZm9jdXMgYmFjayB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBpdCBiZWZvcmUuXG4gIH1cblxuICAvLyBUT0RPIEludmVzdGlnYXRlIGlmIHdlIGNhbiBkZWNvdXBsZSBmcm9tIGFuaW1hdGlvbiBldmVudHNcbiAgZmFkZURvbmUoZTogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZS50b1N0YXRlID09PSAndm9pZCcpIHtcbiAgICAgIHRoaXMuX29wZW5DaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoZS50b1N0YXRlID09PSAnZmFsc2UnICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5tb2RhbFRpdGxlKSB7XG4gICAgICB0aGlzLm1vZGFsVGl0bGUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuIl19