/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
var ClrLoadingButton = /** @class */ (function () {
    function ClrLoadingButton(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    ClrLoadingButton_1 = ClrLoadingButton;
    ClrLoadingButton.prototype.loadingStateChange = function (state) {
        if (state === this.state) {
            return;
        }
        this.state = state;
        switch (state) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                this.renderer.removeStyle(this.el.nativeElement, 'transform'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                if (!this.disabled) {
                    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                }
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
                this.renderer.setStyle(this.el.nativeElement, 'transform', 'translatez(0)'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
                break;
            case ClrLoadingState.SUCCESS:
                this.setExplicitButtonWidth();
                break;
            case ClrLoadingState.ERROR:
                this.loadingStateChange(ClrLoadingState.DEFAULT);
                break;
            default:
                break;
        }
        this.clrLoadingChange.emit(state);
    };
    ClrLoadingButton.prototype.setExplicitButtonWidth = function () {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            var boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', boundingClientRect.width + "px");
        }
    };
    var ClrLoadingButton_1;
    tslib_1.__decorate([
        Input('disabled'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrLoadingButton.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Output('clrLoadingChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrLoadingButton.prototype, "clrLoadingChange", void 0);
    ClrLoadingButton = ClrLoadingButton_1 = tslib_1.__decorate([
        Component({
            selector: 'button[clrLoading]',
            template: "\n        <ng-container [ngSwitch]=\"state\">\n            <span *ngSwitchCase=\"buttonState.LOADING\">\n                <span @spinner class=\"spinner spinner-inline\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.SUCCESS\">\n                <span @validated (@validated.done)=\"this.loadingStateChange(this.buttonState.DEFAULT)\" class=\"spinner spinner-inline spinner-check\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.DEFAULT\" @defaultButton>\n                <ng-content></ng-content>\n            </span>\n        </ng-container>\n    ",
            providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton_1 }],
            animations: [
                trigger('defaultButton', [
                    transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                    // TODO: see if we can get leave animation to work before spinner's enter animation
                    transition(':leave', [style({ opacity: 0 })]),
                ]),
                trigger('spinner', [
                    transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                    transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                ]),
                trigger('validated', [
                    transition(':enter', [
                        animate('600ms', keyframes([
                            style({ transform: 'scale(0,0)', offset: 0 }),
                            style({ opacity: 1, offset: 0.2 }),
                            style({ transform: 'scale(1.2,1.2)', offset: 0.4 }),
                            style({ transform: 'scale(.9,.9)', offset: 0.6 }),
                            style({ transform: 'scale(1,1)', offset: 1 }),
                        ])),
                    ]),
                    transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
                ]),
            ],
            host: { '[attr.disabled]': "disabled? '' : null" }
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer2])
    ], ClrLoadingButton);
    return ClrLoadingButton;
}());
export { ClrLoadingButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJidXR0b24vYnV0dG9uLWxvYWRpbmcvbG9hZGluZy1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBOEN2RTtJQVNFLDBCQUFtQixFQUFjLEVBQVUsUUFBbUI7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFSdkQsZ0JBQVcsR0FBRyxlQUFlLENBQUM7UUFDOUIsVUFBSyxHQUFvQixlQUFlLENBQUMsT0FBTyxDQUFDO1FBS2pELHFCQUFnQixHQUFrQyxJQUFJLFlBQVksQ0FBa0IsS0FBSyxDQUFDLENBQUM7SUFFakMsQ0FBQzt5QkFUdkQsZ0JBQWdCO0lBVzNCLDZDQUFrQixHQUFsQixVQUFtQixLQUFzQjtRQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxlQUFlLENBQUMsT0FBTztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7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Q29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIGtleWZyYW1lcywgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsckxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2xvYWRpbmcvbG9hZGluZyc7XG5pbXBvcnQgeyBMb2FkaW5nTGlzdGVuZXIgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmctbGlzdGVuZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b25bY2xyTG9hZGluZ10nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzdGF0ZVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImJ1dHRvblN0YXRlLkxPQURJTkdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBAc3Bpbm5lciBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lci1pbmxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiYnV0dG9uU3RhdGUuU1VDQ0VTU1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIEB2YWxpZGF0ZWQgKEB2YWxpZGF0ZWQuZG9uZSk9XCJ0aGlzLmxvYWRpbmdTdGF0ZUNoYW5nZSh0aGlzLmJ1dHRvblN0YXRlLkRFRkFVTFQpXCIgY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItaW5saW5lIHNwaW5uZXItY2hlY2tcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiYnV0dG9uU3RhdGUuREVGQVVMVFwiIEBkZWZhdWx0QnV0dG9uPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBMb2FkaW5nTGlzdGVuZXIsIHVzZUV4aXN0aW5nOiBDbHJMb2FkaW5nQnV0dG9uIH1dLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGVmYXVsdEJ1dHRvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzIwMG1zIDEwMG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXSksXG4gICAgICAvLyBUT0RPOiBzZWUgaWYgd2UgY2FuIGdldCBsZWF2ZSBhbmltYXRpb24gdG8gd29yayBiZWZvcmUgc3Bpbm5lcidzIGVudGVyIGFuaW1hdGlvblxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KV0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3NwaW5uZXInLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCcyMDBtcyAxMDBtcyBlYXNlLWluJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW3N0eWxlKHsgb3BhY2l0eTogMSB9KSwgYW5pbWF0ZSgnMTAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcigndmFsaWRhdGVkJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICc2MDBtcycsXG4gICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMCwwKScsIG9mZnNldDogMCB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgb2Zmc2V0OiAwLjIgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEuMiwxLjIpJywgb2Zmc2V0OiAwLjQgfSksXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKC45LC45KScsIG9mZnNldDogMC42IH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxLDEpJywgb2Zmc2V0OiAxIH0pLFxuICAgICAgICAgIF0pXG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtzdHlsZSh7IG9wYWNpdHk6IDEgfSksIGFuaW1hdGUoJzEwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pLFxuICAgIF0pLFxuICBdLFxuICBob3N0OiB7ICdbYXR0ci5kaXNhYmxlZF0nOiBcImRpc2FibGVkPyAnJyA6IG51bGxcIiB9LFxufSlcbmV4cG9ydCBjbGFzcyBDbHJMb2FkaW5nQnV0dG9uIGltcGxlbWVudHMgTG9hZGluZ0xpc3RlbmVyIHtcbiAgcHVibGljIGJ1dHRvblN0YXRlID0gQ2xyTG9hZGluZ1N0YXRlO1xuICBwdWJsaWMgc3RhdGU6IENsckxvYWRpbmdTdGF0ZSA9IENsckxvYWRpbmdTdGF0ZS5ERUZBVUxUO1xuXG4gIEBJbnB1dCgnZGlzYWJsZWQnKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgnY2xyTG9hZGluZ0NoYW5nZScpXG4gIHB1YmxpYyBjbHJMb2FkaW5nQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2xyTG9hZGluZ1N0YXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xyTG9hZGluZ1N0YXRlPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbG9hZGluZ1N0YXRlQ2hhbmdlKHN0YXRlOiBDbHJMb2FkaW5nU3RhdGUpOiB2b2lkIHtcbiAgICBpZiAoc3RhdGUgPT09IHRoaXMuc3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDpcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScpOyAvLyBmb3IgY2hyb21pdW0gcmVuZGVyIGJ1ZyBzZWUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNzAwXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckxvYWRpbmdTdGF0ZS5MT0FESU5HOlxuICAgICAgICB0aGlzLnNldEV4cGxpY2l0QnV0dG9uV2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRleigwKScpOyAvLyBmb3IgY2hyb21pdW0gcmVuZGVyIGJ1ZyBzZWUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL3Ztd2FyZS9jbGFyaXR5L2lzc3Vlcy8yNzAwXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLlNVQ0NFU1M6XG4gICAgICAgIHRoaXMuc2V0RXhwbGljaXRCdXR0b25XaWR0aCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLkVSUk9SOlxuICAgICAgICB0aGlzLmxvYWRpbmdTdGF0ZUNoYW5nZShDbHJMb2FkaW5nU3RhdGUuREVGQVVMVCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY2xyTG9hZGluZ0NoYW5nZS5lbWl0KHN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXhwbGljaXRCdXR0b25XaWR0aCgpIHtcbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtib3VuZGluZ0NsaWVudFJlY3Qud2lkdGh9cHhgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==