import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, NgZone, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DragEventType } from '../interfaces/drag-event.interface';
import { DragAndDropEventBusService } from './drag-and-drop-event-bus.service';
var DragEventListenerService = /** @class */ (function () {
    function DragEventListenerService(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    Object.defineProperty(DragEventListenerService.prototype, "dragStarted", {
        get: function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragMoved", {
        get: function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragEnded", {
        get: function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DragEventListenerService.prototype.attachDragListeners = function (draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    DragEventListenerService.prototype.detachDragListeners = function () {
        if (this.listeners) {
            this.listeners.map(function (event) { return event(); });
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(function (event) { return event(); });
        }
    };
    DragEventListenerService.prototype.getNativeEventObject = function (event) {
        if (event.hasOwnProperty('changedTouches')) {
            return event.changedTouches[0];
        }
        else {
            return event;
        }
    };
    DragEventListenerService.prototype.customDragEvent = function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        return this.renderer.listen(element, startOnEvent, function (startEvent) {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            _this.initialPosition = {
                pageX: _this.getNativeEventObject(startEvent).pageX,
                pageY: _this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            _this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            _this.nestedListeners.push(_this.renderer.listen('document', 'selectstart', function (selectEvent) {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            _this.nestedListeners.push(_this.ngZone.runOutsideAngular(function () {
                return _this.renderer.listen('document', moveOnEvent, function (moveEvent) {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!_this.hasDragStarted) {
                        _this.hasDragStarted = true;
                        // Fire "dragstart"
                        _this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        _this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            _this.nestedListeners.push(_this.renderer.listen('document', endOnEvent, function (endEvent) {
                if (_this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    _this.hasDragStarted = false;
                    _this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (_this.nestedListeners) {
                    _this.nestedListeners.map(function (event) { return event(); });
                }
            }));
        });
    };
    DragEventListenerService.prototype.broadcast = function (event, eventType) {
        var dragEvent = this.generateDragEvent(event, eventType);
        switch (dragEvent.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(dragEvent);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(dragEvent);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(dragEvent);
                break;
            default:
                break;
        }
        // The following properties are set after they are broadcasted to the DraggableGhost component.
        dragEvent.ghostElement = this.ghostElement;
        dragEvent.dropPointPosition = this.dropPointPosition;
        this.eventBus.broadcast(dragEvent);
    };
    DragEventListenerService.prototype.generateDragEvent = function (event, eventType) {
        var nativeEvent = this.getNativeEventObject(event);
        return {
            type: eventType,
            dragPosition: {
                pageX: nativeEvent.pageX,
                pageY: nativeEvent.pageY,
                moveX: nativeEvent.pageX - this.initialPosition.pageX,
                moveY: nativeEvent.pageY - this.initialPosition.pageY,
            },
            group: this.group,
            dragDataTransfer: this.dragDataTransfer,
            ghostElement: this.ghostElement,
        };
    };
    DragEventListenerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [NgZone, Renderer2, DragAndDropEventBusService])
    ], DragEventListenerService);
    return DragEventListenerService;
}());
export { DragEventListenerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUcvRTtJQTJCRSxrQ0FBb0IsTUFBYyxFQUFVLFFBQW1CLEVBQVUsUUFBdUM7UUFBNUYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUErQjtRQWxCeEcsY0FBUyxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUNqRixhQUFRLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQ2hGLFlBQU8sR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFFL0UsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFjMkUsQ0FBQztJQVpwSCxzQkFBSSxpREFBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0NBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENB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ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSwgRHJhZ0V2ZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BFdmVudEJ1c1NlcnZpY2UgfSBmcm9tICcuL2RyYWctYW5kLWRyb3AtZXZlbnQtYnVzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ0V2ZW50TGlzdGVuZXJTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBkcmFnZ2FibGVFbDogYW55O1xuXG4gIC8vIGNvbnRhaW5zIHRoZSBzdGFydGluZyBldmVudHMgc3VjaCBhcyBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnRcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdO1xuICAvLyBjb250YWlucyB0aGUgbmVzdGVkIGV2ZW50cyB0aGF0IGhhcHBlbnMgYWZ0ZXIvaW5zaWRlIHRoZSBzdGFydGluZyBldmVudHNcbiAgLy8gc3VjaCBhcyBzZWxlY3RzdGFydCwgbW91c2Vtb3ZlL3RvdWNobW92ZSwgbW91c2V1cC90b3VjaGVuZFxuICBwcml2YXRlIG5lc3RlZExpc3RlbmVyczogKCgpID0+IHZvaWQpW107XG5cbiAgcHJpdmF0ZSBkcmFnU3RhcnQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcbiAgcHJpdmF0ZSBkcmFnTW92ZTogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdFbmQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcblxuICBwcml2YXRlIGhhc0RyYWdTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGRyYWdTdGFydGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ1N0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdNb3ZlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdNb3ZlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdFbmRlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdFbmQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZXZlbnRCdXM6IERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlPFQ+KSB7fVxuXG4gIHByaXZhdGUgaW5pdGlhbFBvc2l0aW9uOiB7IHBhZ2VYOiBudW1iZXI7IHBhZ2VZOiBudW1iZXIgfTtcblxuICAvLyBEcmFnZ2FibGUgY29tcG9uZW50IHNldHMgdGhlc2UgcHJvcGVydGllczpcbiAgcHVibGljIGRyYWdEYXRhVHJhbnNmZXI/OiBUO1xuICBwdWJsaWMgZ3JvdXA/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAvLyBEcmFnZ2FibGVHaG9zdCBjb21wb25lbnQgc2V0cyB0aGVzZSBwcm9wZXJ0aWVzOlxuICBwdWJsaWMgZ2hvc3RFbGVtZW50PzogYW55O1xuICBwdWJsaWMgZHJvcFBvaW50UG9zaXRpb24/OiB7IHBhZ2VYOiBudW1iZXI7IHBhZ2VZOiBudW1iZXIgfTtcblxuICBwdWJsaWMgYXR0YWNoRHJhZ0xpc3RlbmVycyhkcmFnZ2FibGVFbDogTm9kZSkge1xuICAgIHRoaXMuZHJhZ2dhYmxlRWwgPSBkcmFnZ2FibGVFbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtcbiAgICAgIHRoaXMuY3VzdG9tRHJhZ0V2ZW50KHRoaXMuZHJhZ2dhYmxlRWwsICdtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnKSxcbiAgICAgIHRoaXMuY3VzdG9tRHJhZ0V2ZW50KHRoaXMuZHJhZ2dhYmxlRWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNobW92ZScsICd0b3VjaGVuZCcpLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgZGV0YWNoRHJhZ0xpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLm1hcChldmVudCA9PiBldmVudCgpKTtcbiAgICB9XG5cbiAgICAvLyBJbiBtb3N0IGNhc2VzLCBvbmNlIHVzZXJzIHN0YXJ0IGRyYWdnaW5nIHdpdGggbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRzLFxuICAgIC8vIHRoZXkgd2lsbCBlbmQgZHJhZ2dpbmcgYXQgb25lIHBvaW50IHdpdGggbW91c2V1cC90b3VjaGVuZC5cbiAgICAvLyBIb3dldmVyLCB0aGVyZSBtaWdodCBiZSBhIGZldyBjYXNlcyB3aGVyZSBtb3VzZWRvd24vdG91Y2hzdGFydCBldmVudHMgZ2V0IHJlZ2lzdGVyZWQsXG4gICAgLy8gYnV0IHRoZSBkcmFnZ2FibGUgZWxlbWVudCBnZXRzIHJlbW92ZWQgYmVmb3JlIHVzZXIgZW5kcyBkcmFnZ2luZy5cbiAgICAvLyBJbiB0aGF0IGNhc2UsIHdlIG5lZWQgdG8gcmVtb3ZlIHRoZSBhdHRhY2hlZCBsaXN0ZW5lcnMgdGhhdCBoYXBwZW5lZCBkdXJpbmcgdGhlIG1vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50cy5cbiAgICBpZiAodGhpcy5uZXN0ZWRMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLm1hcChldmVudCA9PiBldmVudCgpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE5hdGl2ZUV2ZW50T2JqZWN0KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IGFueSB7XG4gICAgaWYgKCg8VG91Y2hFdmVudD5ldmVudCkuaGFzT3duUHJvcGVydHkoJ2NoYW5nZWRUb3VjaGVzJykpIHtcbiAgICAgIHJldHVybiAoPFRvdWNoRXZlbnQ+ZXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjdXN0b21EcmFnRXZlbnQoZWxlbWVudDogTm9kZSwgc3RhcnRPbkV2ZW50OiBzdHJpbmcsIG1vdmVPbkV2ZW50OiBzdHJpbmcsIGVuZE9uRXZlbnQ6IHN0cmluZyk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCBzdGFydE9uRXZlbnQsIChzdGFydEV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgLy8gc2F2ZSB0aGUgaW5pdGlhbCBwb2ludCB0byBpbml0aWFsUG9zaXRpb25cbiAgICAgIC8vIHRoaXMgd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSBob3cgZmFyIHRoZSBkcmFnZ2FibGUgaGFzIGJlZW4gZHJhZ2dlZCBmcm9tIGl0cyBpbml0aWFsIHBvc2l0aW9uXG4gICAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IHtcbiAgICAgICAgcGFnZVg6IHRoaXMuZ2V0TmF0aXZlRXZlbnRPYmplY3Qoc3RhcnRFdmVudCkucGFnZVgsXG4gICAgICAgIHBhZ2VZOiB0aGlzLmdldE5hdGl2ZUV2ZW50T2JqZWN0KHN0YXJ0RXZlbnQpLnBhZ2VZLFxuICAgICAgfTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBuZXN0ZWQgbGlzdGVuZXJzJyBwcm9wZXJ0eSB3aXRoIGEgbmV3IGVtcHR5IGFycmF5O1xuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgLy8gVGhpcyBpcyBuZWVkZWQgdG8gZGlzYWJsZSBzZWxlY3Rpb24gZHVyaW5nIGRyYWdnaW5nIChlc3BlY2lhbGx5IGluIEVER0UvSUUxMSkuXG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnc2VsZWN0c3RhcnQnLCAoc2VsZWN0RXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgc2VsZWN0RXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZWxlY3RFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIC8vIExpc3RlbiB0byBtb3VzZW1vdmUvdG91Y2htb3ZlIGV2ZW50cyBvdXRzaWRlIG9mIGFuZ3VsYXIgem9uZS5cbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLnB1c2goXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgbW92ZU9uRXZlbnQsIChtb3ZlRXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSBpcyBuZWVkZWQgaGVyZSB0byBwcmV2ZW50IG5lc3RlZCBkcmFnZ2FibGVzIGZyb20gZ2V0dGluZyBkcmFnZ2VkXG4gICAgICAgICAgICAvLyBhbHRvZ2V0aGVyLiBXZSBzaG91bGRuJ3QgdXNlIEV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIGhlcmUgYXMgd2UgYXJlIGxpc3RlbmluZyB0byB0aGUgZXZlbnRzXG4gICAgICAgICAgICAvLyBvbiB0aGUgZ2xvYmFsIGVsZW1lbnQgbGV2ZWwuXG5cbiAgICAgICAgICAgIC8vIFdpdGggRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksIGl0IHJlZ2lzdGVycyB0aGUgZXZlbnRzIHNlbnQgZnJvbSB0aGUgaW5uZXIgbW9zdCBkcmFnZ2FibGVcbiAgICAgICAgICAgIC8vIGZpcnN0LiBUaGVuIGltbWVkaWF0ZWx5IGFmdGVyIHRoYXQsIGl0IHN0b3BzIGxpc3RlbmluZyB0byB0aGUgc2FtZSB0eXBlIG9mIGV2ZW50cyBvbiB0aGUgc2FtZVxuICAgICAgICAgICAgLy8gZWxlbWVudC4gU28gdGhpcyB3aWxsIGhlbHAgdXMgdG8gbm90IHJlZ2lzdGVyIHRoZSBzYW1lIGV2ZW50cyB0aGF0IHdvdWxkIGNvbWUgZnJvbSB0aGUgcGFyZW50XG4gICAgICAgICAgICAvLyBsZXZlbCBkcmFnZ2FibGVzIGV2ZW50dWFsbHkuXG5cbiAgICAgICAgICAgIG1vdmVFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuaGFzRHJhZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBGaXJlIFwiZHJhZ3N0YXJ0XCJcbiAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QobW92ZUV2ZW50LCBEcmFnRXZlbnRUeXBlLkRSQUdfU1RBUlQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gRmlyZSBcImRyYWdtb3ZlXCJcbiAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QobW92ZUV2ZW50LCBEcmFnRXZlbnRUeXBlLkRSQUdfTU9WRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBMaXN0ZW4gdG8gbW91c2V1cC90b3VjaGVuZCBldmVudHMuXG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5wdXNoKFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCBlbmRPbkV2ZW50LCAoZW5kRXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGFzRHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgICAgIC8vIEZpcmUgXCJkcmFnZW5kXCIgb25seSBpZiBkcmFnc3RhcnQgaXMgcmVnaXN0ZXJlZFxuICAgICAgICAgICAgdGhpcy5oYXNEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QoZW5kRXZlbnQsIERyYWdFdmVudFR5cGUuRFJBR19FTkQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdlIG11c3QgcmVtb3ZlIHRoZSB0aGUgbmVzdGVkIGxpc3RlbmVycyBldmVyeSB0aW1lIGRyYWcgY29tcGxldGVzLlxuICAgICAgICAgIGlmICh0aGlzLm5lc3RlZExpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMubWFwKGV2ZW50ID0+IGV2ZW50KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGJyb2FkY2FzdChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGV2ZW50VHlwZTogRHJhZ0V2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+ID0gdGhpcy5nZW5lcmF0ZURyYWdFdmVudChldmVudCwgZXZlbnRUeXBlKTtcblxuICAgIHN3aXRjaCAoZHJhZ0V2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX1NUQVJUOlxuICAgICAgICB0aGlzLmRyYWdTdGFydC5uZXh0KGRyYWdFdmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfTU9WRTpcbiAgICAgICAgdGhpcy5kcmFnTW92ZS5uZXh0KGRyYWdFdmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfRU5EOlxuICAgICAgICB0aGlzLmRyYWdFbmQubmV4dChkcmFnRXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgc2V0IGFmdGVyIHRoZXkgYXJlIGJyb2FkY2FzdGVkIHRvIHRoZSBEcmFnZ2FibGVHaG9zdCBjb21wb25lbnQuXG4gICAgZHJhZ0V2ZW50Lmdob3N0RWxlbWVudCA9IHRoaXMuZ2hvc3RFbGVtZW50O1xuICAgIGRyYWdFdmVudC5kcm9wUG9pbnRQb3NpdGlvbiA9IHRoaXMuZHJvcFBvaW50UG9zaXRpb247XG5cbiAgICB0aGlzLmV2ZW50QnVzLmJyb2FkY2FzdChkcmFnRXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZURyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGV2ZW50VHlwZTogRHJhZ0V2ZW50VHlwZSk6IERyYWdFdmVudEludGVyZmFjZTxUPiB7XG4gICAgY29uc3QgbmF0aXZlRXZlbnQ6IGFueSA9IHRoaXMuZ2V0TmF0aXZlRXZlbnRPYmplY3QoZXZlbnQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgIGRyYWdQb3NpdGlvbjoge1xuICAgICAgICBwYWdlWDogbmF0aXZlRXZlbnQucGFnZVgsXG4gICAgICAgIHBhZ2VZOiBuYXRpdmVFdmVudC5wYWdlWSxcbiAgICAgICAgbW92ZVg6IG5hdGl2ZUV2ZW50LnBhZ2VYIC0gdGhpcy5pbml0aWFsUG9zaXRpb24ucGFnZVgsXG4gICAgICAgIG1vdmVZOiBuYXRpdmVFdmVudC5wYWdlWSAtIHRoaXMuaW5pdGlhbFBvc2l0aW9uLnBhZ2VZLFxuICAgICAgfSxcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgZHJhZ0RhdGFUcmFuc2ZlcjogdGhpcy5kcmFnRGF0YVRyYW5zZmVyLFxuICAgICAgZ2hvc3RFbGVtZW50OiB0aGlzLmdob3N0RWxlbWVudCxcbiAgICB9O1xuICB9XG59XG4iXX0=