import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, NgZone, Optional, Renderer2 } from '@angular/core';
import { DragEventListenerService } from './providers/drag-event-listener.service';
import { DraggableSnapshotService } from './providers/draggable-snapshot.service';
let ClrDraggableGhost = class ClrDraggableGhost {
    constructor(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.draggableSnapshot = draggableSnapshot;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.subscriptions = [];
        this.leaveAnimConfig = { value: 0, params: { top: '0px', left: '0px' } };
        if (!this.dragEventListener || !this.draggableSnapshot) {
            throw new Error('The clr-draggable-ghost component can only be used inside of a clrDraggable directive.');
        }
        this.draggableGhostEl = this.el.nativeElement;
        // Need to use Renderer2 as it runs outside of NgZone
        this.renderer.addClass(this.draggableGhostEl, 'draggable-ghost');
        // Register the ghost element in DragEventListener to pass in a ClrDragEvent.
        this.dragEventListener.ghostElement = this.draggableGhostEl;
        // Default ghost size gets the size of ClrDraggable element.
        this.setDefaultGhostSize(this.draggableGhostEl);
        const offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        let isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((event) => {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (this.draggableSnapshot.hasDraggableState) {
                    this.animateToOnLeave(`${this.draggableSnapshot.clientRect.top}px`, `${this.draggableSnapshot.clientRect.left}px`);
                }
                else {
                    this.animateToOnLeave(`${event.dragPosition.pageY}px`, `${event.dragPosition.pageX}px`);
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            const topLeftPosition = this.findTopLeftPosition(event.dragPosition, offset);
            this.setPositionStyle(this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            this.dragEventListener.dropPointPosition = this.findDropPointPosition(topLeftPosition);
        }));
    }
    setDefaultGhostSize(el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    }
    animateToOnLeave(top, left) {
        this.ngZone.run(() => {
            this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        });
    }
    findTopLeftPosition(dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    }
    findDropPointPosition(topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    }
    setSizeStyle(el, width, height) {
        this.renderer.setStyle(el, 'width', `${width}px`);
        this.renderer.setStyle(el, 'height', `${height}px`);
    }
    setPositionStyle(el, left, top) {
        this.renderer.setStyle(el, 'left', `${left}px`);
        this.renderer.setStyle(el, 'top', `${top}px`);
        this.renderer.setStyle(el, 'visibility', 'visible');
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    HostBinding('@leaveAnimation'),
    tslib_1.__metadata("design:type", Object)
], ClrDraggableGhost.prototype, "leaveAnimConfig", void 0);
ClrDraggableGhost = tslib_1.__decorate([
    Component({
        selector: 'clr-draggable-ghost',
        template: `<ng-content></ng-content>`,
        animations: [
            trigger('leaveAnimation', [
                transition(':leave', [
                    style({ left: '*', top: '*' }),
                    animate('0.2s ease-in-out', style({ top: '{{top}}', left: '{{left}}' })),
                ]),
            ]),
        ]
    }),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(2, Optional()),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        DragEventListenerService,
        DraggableSnapshotService,
        Renderer2,
        NgZone])
], ClrDraggableGhost);
export { ClrDraggableGhost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWdob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnZ2FibGUtZ2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBdUJsRixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQU81QixZQUNVLEVBQWMsRUFDRixpQkFBOEMsRUFDOUMsaUJBQThDLEVBQzFELFFBQW1CLEVBQ25CLE1BQWM7UUFKZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ0Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUM5QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzFELGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVRoQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFFWCxvQkFBZSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBU2xHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RkFBd0YsQ0FBQyxDQUFD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cmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBOZ1pvbmUsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9kcmFnLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBEcmFnRXZlbnRMaXN0ZW5lclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kcmFnLWV2ZW50LWxpc3RlbmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlU25hcHNob3RTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJhZ2dhYmxlLXNuYXBzaG90LnNlcnZpY2UnO1xuXG50eXBlIFBhZ2VQb3NpdGlvbiA9IHtcbiAgcGFnZVg6IG51bWJlcjtcbiAgcGFnZVk6IG51bWJlcjtcbn07XG50eXBlIE9mZnNldFBvc2l0aW9uID0ge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRyYWdnYWJsZS1naG9zdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdsZWF2ZUFuaW1hdGlvbicsIFtcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyBsZWZ0OiAnKicsIHRvcDogJyonIH0pLFxuICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2UtaW4tb3V0Jywgc3R5bGUoeyB0b3A6ICd7e3RvcH19JywgbGVmdDogJ3t7bGVmdH19JyB9KSksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJhZ2dhYmxlR2hvc3Q8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRyYWdnYWJsZUdob3N0RWw6IGFueTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgQEhvc3RCaW5kaW5nKCdAbGVhdmVBbmltYXRpb24nKSBsZWF2ZUFuaW1Db25maWcgPSB7IHZhbHVlOiAwLCBwYXJhbXM6IHsgdG9wOiAnMHB4JywgbGVmdDogJzBweCcgfSB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkcmFnRXZlbnRMaXN0ZW5lcjogRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZHJhZ2dhYmxlU25hcHNob3Q6IERyYWdnYWJsZVNuYXBzaG90U2VydmljZTxUPixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICBpZiAoIXRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIgfHwgIXRoaXMuZHJhZ2dhYmxlU25hcHNob3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsci1kcmFnZ2FibGUtZ2hvc3QgY29tcG9uZW50IGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyRHJhZ2dhYmxlIGRpcmVjdGl2ZS4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYWdnYWJsZUdob3N0RWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBOZWVkIHRvIHVzZSBSZW5kZXJlcjIgYXMgaXQgcnVucyBvdXRzaWRlIG9mIE5nWm9uZVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kcmFnZ2FibGVHaG9zdEVsLCAnZHJhZ2dhYmxlLWdob3N0Jyk7XG5cbiAgICAvLyBSZWdpc3RlciB0aGUgZ2hvc3QgZWxlbWVudCBpbiBEcmFnRXZlbnRMaXN0ZW5lciB0byBwYXNzIGluIGEgQ2xyRHJhZ0V2ZW50LlxuICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZ2hvc3RFbGVtZW50ID0gdGhpcy5kcmFnZ2FibGVHaG9zdEVsO1xuXG4gICAgLy8gRGVmYXVsdCBnaG9zdCBzaXplIGdldHMgdGhlIHNpemUgb2YgQ2xyRHJhZ2dhYmxlIGVsZW1lbnQuXG4gICAgdGhpcy5zZXREZWZhdWx0R2hvc3RTaXplKHRoaXMuZHJhZ2dhYmxlR2hvc3RFbCk7XG5cbiAgICBjb25zdCBvZmZzZXQ6IE9mZnNldFBvc2l0aW9uID0ge1xuICAgICAgdG9wOiB0aGlzLmRyYWdnYWJsZVNuYXBzaG90Lmhhc0RyYWdnYWJsZVN0YXRlXG4gICAgICAgID8gdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5kcmFnRXZlbnQuZHJhZ1Bvc2l0aW9uLnBhZ2VZIC0gdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LnRvcFxuICAgICAgICA6IDAsXG4gICAgICBsZWZ0OiB0aGlzLmRyYWdnYWJsZVNuYXBzaG90Lmhhc0RyYWdnYWJsZVN0YXRlXG4gICAgICAgID8gdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5kcmFnRXZlbnQuZHJhZ1Bvc2l0aW9uLnBhZ2VYIC0gdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LmxlZnRcbiAgICAgICAgOiAwLFxuICAgIH07XG5cbiAgICBsZXQgaXNBbmltYXRpb25Db25maWd1cmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0V2ZW50TGlzdGVuZXIuZHJhZ01vdmVkLnN1YnNjcmliZSgoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICAvLyBPbiB0aGUgZmlyc3QgZHJhZyBtb3ZlIGV2ZW50LCB3ZSBjb25maWd1cmUgdGhlIGFuaW1hdGlvbiBhcyBpdCdzIGRlcGVuZGVudCBvbiB0aGUgZmlyc3QgZHJhZyBldmVudC5cbiAgICAgICAgaWYgKCFpc0FuaW1hdGlvbkNvbmZpZ3VyZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5oYXNEcmFnZ2FibGVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlVG9PbkxlYXZlKFxuICAgICAgICAgICAgICBgJHt0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3QudG9wfXB4YCxcbiAgICAgICAgICAgICAgYCR7dGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LmxlZnR9cHhgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVUb09uTGVhdmUoYCR7ZXZlbnQuZHJhZ1Bvc2l0aW9uLnBhZ2VZfXB4YCwgYCR7ZXZlbnQuZHJhZ1Bvc2l0aW9uLnBhZ2VYfXB4YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzQW5pbWF0aW9uQ29uZmlndXJlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3NpdGlvbiB0aGUgZHJhZ2dhYmxlIGdob3N0LlxuICAgICAgICBjb25zdCB0b3BMZWZ0UG9zaXRpb246IFBhZ2VQb3NpdGlvbiA9IHRoaXMuZmluZFRvcExlZnRQb3NpdGlvbihldmVudC5kcmFnUG9zaXRpb24sIG9mZnNldCk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25TdHlsZSh0aGlzLmRyYWdnYWJsZUdob3N0RWwsIHRvcExlZnRQb3NpdGlvbi5wYWdlWCwgdG9wTGVmdFBvc2l0aW9uLnBhZ2VZKTtcbiAgICAgICAgdGhpcy5kcmFnRXZlbnRMaXN0ZW5lci5kcm9wUG9pbnRQb3NpdGlvbiA9IHRoaXMuZmluZERyb3BQb2ludFBvc2l0aW9uKHRvcExlZnRQb3NpdGlvbik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldERlZmF1bHRHaG9zdFNpemUoZWw6IE5vZGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5oYXNEcmFnZ2FibGVTdGF0ZSkge1xuICAgICAgdGhpcy5zZXRTaXplU3R5bGUoZWwsIHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuY2xpZW50UmVjdC53aWR0aCwgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LmhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlVG9PbkxlYXZlKHRvcDogc3RyaW5nLCBsZWZ0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5sZWF2ZUFuaW1Db25maWcgPSB7IHZhbHVlOiAwLCBwYXJhbXM6IHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfSB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kVG9wTGVmdFBvc2l0aW9uKGRyYWdQb3NpdGlvbjogUGFnZVBvc2l0aW9uLCBvZmZzZXQ6IE9mZnNldFBvc2l0aW9uKTogUGFnZVBvc2l0aW9uIHtcbiAgICByZXR1cm4geyBwYWdlWDogZHJhZ1Bvc2l0aW9uLnBhZ2VYIC0gb2Zmc2V0LmxlZnQsIHBhZ2VZOiBkcmFnUG9zaXRpb24ucGFnZVkgLSBvZmZzZXQudG9wIH07XG4gIH1cblxuICBwcml2YXRlIGZpbmREcm9wUG9pbnRQb3NpdGlvbih0b3BMZWZ0UG9zaXRpb246IFBhZ2VQb3NpdGlvbik6IFBhZ2VQb3NpdGlvbiB7XG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlU25hcHNob3QuaGFzRHJhZ2dhYmxlU3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2VYOiB0b3BMZWZ0UG9zaXRpb24ucGFnZVggKyB0aGlzLmRyYWdnYWJsZVNuYXBzaG90LmNsaWVudFJlY3Qud2lkdGggLyAyLFxuICAgICAgICBwYWdlWTogdG9wTGVmdFBvc2l0aW9uLnBhZ2VZICsgdGhpcy5kcmFnZ2FibGVTbmFwc2hvdC5jbGllbnRSZWN0LmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdG9wTGVmdFBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2l6ZVN0eWxlKGVsOiBOb2RlLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsIGAke3dpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQb3NpdGlvblN0eWxlKGVsOiBOb2RlLCBsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWwsICd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=