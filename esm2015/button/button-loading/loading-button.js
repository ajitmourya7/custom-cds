/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
var ClrLoadingButton_1;
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ClrLoadingState } from '../../utils/loading/loading';
import { LoadingListener } from '../../utils/loading/loading-listener';
let ClrLoadingButton = ClrLoadingButton_1 = class ClrLoadingButton {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    loadingStateChange(state) {
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
    }
    setExplicitButtonWidth() {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            const boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', `${boundingClientRect.width}px`);
        }
    }
};
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
        template: `
        <ng-container [ngSwitch]="state">
            <span *ngSwitchCase="buttonState.LOADING">
                <span @spinner class="spinner spinner-inline"></span>
            </span>
            <span *ngSwitchCase="buttonState.SUCCESS">
                <span @validated (@validated.done)="this.loadingStateChange(this.buttonState.DEFAULT)" class="spinner spinner-inline spinner-check"></span>
            </span>
            <span *ngSwitchCase="buttonState.DEFAULT" @defaultButton>
                <ng-content></ng-content>
            </span>
        </ng-container>
    `,
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
export { ClrLoadingButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJidXR0b24vYnV0dG9uLWxvYWRpbmcvbG9hZGluZy1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7O0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQThDdkUsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBUzNCLFlBQW1CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVJ2RCxnQkFBVyxHQUFHLGVBQWUsQ0FBQztRQUM5QixVQUFLLEdBQW9CLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFLakQscUJBQWdCLEdBQWtDLElBQUksWUFBWSxDQUFrQixLQUFLLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBRWxFLGtCQUFrQixDQUFDLEtBQXNCO1FBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLGVBQWUsQ0FBQyxPQUFPO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFP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bnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBrZXlmcmFtZXMsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJMb2FkaW5nU3RhdGUgfSBmcm9tICcuLi8uLi91dGlscy9sb2FkaW5nL2xvYWRpbmcnO1xuaW1wb3J0IHsgTG9hZGluZ0xpc3RlbmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nLWxpc3RlbmVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW2NsckxvYWRpbmddJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwic3RhdGVcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJidXR0b25TdGF0ZS5MT0FESU5HXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gQHNwaW5uZXIgY2xhc3M9XCJzcGlubmVyIHNwaW5uZXItaW5saW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImJ1dHRvblN0YXRlLlNVQ0NFU1NcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBAdmFsaWRhdGVkIChAdmFsaWRhdGVkLmRvbmUpPVwidGhpcy5sb2FkaW5nU3RhdGVDaGFuZ2UodGhpcy5idXR0b25TdGF0ZS5ERUZBVUxUKVwiIGNsYXNzPVwic3Bpbm5lciBzcGlubmVyLWlubGluZSBzcGlubmVyLWNoZWNrXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImJ1dHRvblN0YXRlLkRFRkFVTFRcIiBAZGVmYXVsdEJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTG9hZGluZ0xpc3RlbmVyLCB1c2VFeGlzdGluZzogQ2xyTG9hZGluZ0J1dHRvbiB9XSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RlZmF1bHRCdXR0b24nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCcyMDBtcyAxMDBtcyBlYXNlLWluJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pLFxuICAgICAgLy8gVE9ETzogc2VlIGlmIHdlIGNhbiBnZXQgbGVhdmUgYW5pbWF0aW9uIHRvIHdvcmsgYmVmb3JlIHNwaW5uZXIncyBlbnRlciBhbmltYXRpb25cbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSldKSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCdzcGlubmVyJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgnMjAwbXMgMTAwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSldKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtzdHlsZSh7IG9wYWNpdHk6IDEgfSksIGFuaW1hdGUoJzEwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3ZhbGlkYXRlZCcsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAnNjAwbXMnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAsMCknLCBvZmZzZXQ6IDAgfSksXG4gICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEsIG9mZnNldDogMC4yIH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxLjIsMS4yKScsIG9mZnNldDogMC40IH0pLFxuICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSguOSwuOSknLCBvZmZzZXQ6IDAuNiB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSwxKScsIG9mZnNldDogMSB9KSxcbiAgICAgICAgICBdKVxuICAgICAgICApLFxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbc3R5bGUoeyBvcGFjaXR5OiAxIH0pLCBhbmltYXRlKCcxMDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKSxcbiAgICBdKSxcbiAgXSxcbiAgaG9zdDogeyAnW2F0dHIuZGlzYWJsZWRdJzogXCJkaXNhYmxlZD8gJycgOiBudWxsXCIgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyTG9hZGluZ0J1dHRvbiBpbXBsZW1lbnRzIExvYWRpbmdMaXN0ZW5lciB7XG4gIHB1YmxpYyBidXR0b25TdGF0ZSA9IENsckxvYWRpbmdTdGF0ZTtcbiAgcHVibGljIHN0YXRlOiBDbHJMb2FkaW5nU3RhdGUgPSBDbHJMb2FkaW5nU3RhdGUuREVGQVVMVDtcblxuICBASW5wdXQoJ2Rpc2FibGVkJykgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoJ2NsckxvYWRpbmdDaGFuZ2UnKVxuICBwdWJsaWMgY2xyTG9hZGluZ0NoYW5nZTogRXZlbnRFbWl0dGVyPENsckxvYWRpbmdTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENsckxvYWRpbmdTdGF0ZT4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIGxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlKTogdm9pZCB7XG4gICAgaWYgKHN0YXRlID09PSB0aGlzLnN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgIGNhc2UgQ2xyTG9hZGluZ1N0YXRlLkRFRkFVTFQ6XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nKTsgLy8gZm9yIGNocm9taXVtIHJlbmRlciBidWcgc2VlIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjcwMFxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJMb2FkaW5nU3RhdGUuTE9BRElORzpcbiAgICAgICAgdGhpcy5zZXRFeHBsaWNpdEJ1dHRvbldpZHRoKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZXooMCknKTsgLy8gZm9yIGNocm9taXVtIHJlbmRlciBidWcgc2VlIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS92bXdhcmUvY2xhcml0eS9pc3N1ZXMvMjcwMFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsICcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckxvYWRpbmdTdGF0ZS5TVUNDRVNTOlxuICAgICAgICB0aGlzLnNldEV4cGxpY2l0QnV0dG9uV2lkdGgoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENsckxvYWRpbmdTdGF0ZS5FUlJPUjpcbiAgICAgICAgdGhpcy5sb2FkaW5nU3RhdGVDaGFuZ2UoQ2xyTG9hZGluZ1N0YXRlLkRFRkFVTFQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNsckxvYWRpbmdDaGFuZ2UuZW1pdChzdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldEV4cGxpY2l0QnV0dG9uV2lkdGgoKSB7XG4gICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7Ym91bmRpbmdDbGllbnRSZWN0LndpZHRofXB4YCk7XG4gICAgfVxuICB9XG59XG4iXX0=