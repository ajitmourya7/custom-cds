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
let DragEventListenerService = class DragEventListenerService {
    constructor(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    attachDragListeners(draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    detachDragListeners() {
        if (this.listeners) {
            this.listeners.map(event => event());
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(event => event());
        }
    }
    getNativeEventObject(event) {
        if (event.hasOwnProperty('changedTouches')) {
            return event.changedTouches[0];
        }
        else {
            return event;
        }
    }
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        return this.renderer.listen(element, startOnEvent, (startEvent) => {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            this.initialPosition = {
                pageX: this.getNativeEventObject(startEvent).pageX,
                pageY: this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            this.nestedListeners.push(this.renderer.listen('document', 'selectstart', (selectEvent) => {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            this.nestedListeners.push(this.ngZone.runOutsideAngular(() => {
                return this.renderer.listen('document', moveOnEvent, (moveEvent) => {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!this.hasDragStarted) {
                        this.hasDragStarted = true;
                        // Fire "dragstart"
                        this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            this.nestedListeners.push(this.renderer.listen('document', endOnEvent, (endEvent) => {
                if (this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    this.hasDragStarted = false;
                    this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (this.nestedListeners) {
                    this.nestedListeners.map(event => event());
                }
            }));
        });
    }
    broadcast(event, eventType) {
        const dragEvent = this.generateDragEvent(event, eventType);
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
    }
    generateDragEvent(event, eventType) {
        const nativeEvent = this.getNativeEventObject(event);
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
    }
};
DragEventListenerService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [NgZone, Renderer2, DragAndDropEventBusService])
], DragEventListenerService);
export { DragEventListenerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZHJhZy1ldmVudC1saXN0ZW5lci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUcvRSxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQTJCbkMsWUFBb0IsTUFBYyxFQUFVLFFBQW1CLEVBQVUsUUFBdUM7UUFBNUYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUErQjtRQWxCeEcsY0FBUyxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUNqRixhQUFRLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQ2hGLFlBQU8sR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFFL0UsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFjMkUsQ0FBQztJQVpwSCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lB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QUFDLFFBQVE7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO1FBRUQsK0ZBQStGO1FBQy9GLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRXJELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUE4QixFQUFFLFNBQXdCO1FBQ2hGLE1BQU0sV0FBVyxHQUFRLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixZQUFZLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN4QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3hCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztnQkFDckQsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLO2FBQ3REO1lBQ0QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2hDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQS9LWSx3QkFBd0I7SUFEcEMsVUFBVSxFQUFFOzZDQTRCaUIsTUFBTSxFQUFvQixTQUFTLEVBQW9CLDBCQUEwQjtHQTNCbEcsd0JBQXdCLENBK0twQztTQS9LWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnRJbnRlcmZhY2UsIERyYWdFdmVudFR5cGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RyYWctZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wLWV2ZW50LWJ1cy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWdFdmVudExpc3RlbmVyU2VydmljZTxUPiB7XG4gIHByaXZhdGUgZHJhZ2dhYmxlRWw6IGFueTtcblxuICAvLyBjb250YWlucyB0aGUgc3RhcnRpbmcgZXZlbnRzIHN1Y2ggYXMgbW91c2Vkb3duIGFuZCB0b3VjaHN0YXJ0XG4gIHByaXZhdGUgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXTtcbiAgLy8gY29udGFpbnMgdGhlIG5lc3RlZCBldmVudHMgdGhhdCBoYXBwZW5zIGFmdGVyL2luc2lkZSB0aGUgc3RhcnRpbmcgZXZlbnRzXG4gIC8vIHN1Y2ggYXMgc2VsZWN0c3RhcnQsIG1vdXNlbW92ZS90b3VjaG1vdmUsIG1vdXNldXAvdG91Y2hlbmRcbiAgcHJpdmF0ZSBuZXN0ZWRMaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdO1xuXG4gIHByaXZhdGUgZHJhZ1N0YXJ0OiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG4gIHByaXZhdGUgZHJhZ01vdmU6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcbiAgcHJpdmF0ZSBkcmFnRW5kOiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG5cbiAgcHJpdmF0ZSBoYXNEcmFnU3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBkcmFnU3RhcnRlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdTdGFydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBkcmFnTW92ZWQoKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFnTW92ZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBkcmFnRW5kZWQoKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFnRW5kLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGV2ZW50QnVzOiBEcmFnQW5kRHJvcEV2ZW50QnVzU2VydmljZTxUPikge31cblxuICBwcml2YXRlIGluaXRpYWxQb3NpdGlvbjogeyBwYWdlWDogbnVtYmVyOyBwYWdlWTogbnVtYmVyIH07XG5cbiAgLy8gRHJhZ2dhYmxlIGNvbXBvbmVudCBzZXRzIHRoZXNlIHByb3BlcnRpZXM6XG4gIHB1YmxpYyBkcmFnRGF0YVRyYW5zZmVyPzogVDtcbiAgcHVibGljIGdyb3VwPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLy8gRHJhZ2dhYmxlR2hvc3QgY29tcG9uZW50IHNldHMgdGhlc2UgcHJvcGVydGllczpcbiAgcHVibGljIGdob3N0RWxlbWVudD86IGFueTtcbiAgcHVibGljIGRyb3BQb2ludFBvc2l0aW9uPzogeyBwYWdlWDogbnVtYmVyOyBwYWdlWTogbnVtYmVyIH07XG5cbiAgcHVibGljIGF0dGFjaERyYWdMaXN0ZW5lcnMoZHJhZ2dhYmxlRWw6IE5vZGUpIHtcbiAgICB0aGlzLmRyYWdnYWJsZUVsID0gZHJhZ2dhYmxlRWw7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudCh0aGlzLmRyYWdnYWJsZUVsLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJyksXG4gICAgICB0aGlzLmN1c3RvbURyYWdFdmVudCh0aGlzLmRyYWdnYWJsZUVsLCAndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnKSxcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIGRldGFjaERyYWdMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgfVxuXG4gICAgLy8gSW4gbW9zdCBjYXNlcywgb25jZSB1c2VycyBzdGFydCBkcmFnZ2luZyB3aXRoIG1vdXNlZG93bi90b3VjaHN0YXJ0IGV2ZW50cyxcbiAgICAvLyB0aGV5IHdpbGwgZW5kIGRyYWdnaW5nIGF0IG9uZSBwb2ludCB3aXRoIG1vdXNldXAvdG91Y2hlbmQuXG4gICAgLy8gSG93ZXZlciwgdGhlcmUgbWlnaHQgYmUgYSBmZXcgY2FzZXMgd2hlcmUgbW91c2Vkb3duL3RvdWNoc3RhcnQgZXZlbnRzIGdldCByZWdpc3RlcmVkLFxuICAgIC8vIGJ1dCB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgZ2V0cyByZW1vdmVkIGJlZm9yZSB1c2VyIGVuZHMgZHJhZ2dpbmcuXG4gICAgLy8gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgYXR0YWNoZWQgbGlzdGVuZXJzIHRoYXQgaGFwcGVuZWQgZHVyaW5nIHRoZSBtb3VzZWRvd24vdG91Y2hzdGFydCBldmVudHMuXG4gICAgaWYgKHRoaXMubmVzdGVkTGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5tYXAoZXZlbnQgPT4gZXZlbnQoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXROYXRpdmVFdmVudE9iamVjdChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBhbnkge1xuICAgIGlmICgoPFRvdWNoRXZlbnQ+ZXZlbnQpLmhhc093blByb3BlcnR5KCdjaGFuZ2VkVG91Y2hlcycpKSB7XG4gICAgICByZXR1cm4gKDxUb3VjaEV2ZW50PmV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3VzdG9tRHJhZ0V2ZW50KGVsZW1lbnQ6IE5vZGUsIHN0YXJ0T25FdmVudDogc3RyaW5nLCBtb3ZlT25FdmVudDogc3RyaW5nLCBlbmRPbkV2ZW50OiBzdHJpbmcpOiAoKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgc3RhcnRPbkV2ZW50LCAoc3RhcnRFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIC8vIHNhdmUgdGhlIGluaXRpYWwgcG9pbnQgdG8gaW5pdGlhbFBvc2l0aW9uXG4gICAgICAvLyB0aGlzIHdpbGwgYmUgdXNlZCB0byBjYWxjdWxhdGUgaG93IGZhciB0aGUgZHJhZ2dhYmxlIGhhcyBiZWVuIGRyYWdnZWQgZnJvbSBpdHMgaW5pdGlhbCBwb3NpdGlvblxuICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSB7XG4gICAgICAgIHBhZ2VYOiB0aGlzLmdldE5hdGl2ZUV2ZW50T2JqZWN0KHN0YXJ0RXZlbnQpLnBhZ2VYLFxuICAgICAgICBwYWdlWTogdGhpcy5nZXROYXRpdmVFdmVudE9iamVjdChzdGFydEV2ZW50KS5wYWdlWSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluaXRpYWxpemUgbmVzdGVkIGxpc3RlbmVycycgcHJvcGVydHkgd2l0aCBhIG5ldyBlbXB0eSBhcnJheTtcbiAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzID0gW107XG5cbiAgICAgIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGRpc2FibGUgc2VsZWN0aW9uIGR1cmluZyBkcmFnZ2luZyAoZXNwZWNpYWxseSBpbiBFREdFL0lFMTEpLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3NlbGVjdHN0YXJ0JywgKHNlbGVjdEV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgIHNlbGVjdEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2VsZWN0RXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBMaXN0ZW4gdG8gbW91c2Vtb3ZlL3RvdWNobW92ZSBldmVudHMgb3V0c2lkZSBvZiBhbmd1bGFyIHpvbmUuXG4gICAgICB0aGlzLm5lc3RlZExpc3RlbmVycy5wdXNoKFxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsIG1vdmVPbkV2ZW50LCAobW92ZUV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgaXMgbmVlZGVkIGhlcmUgdG8gcHJldmVudCBuZXN0ZWQgZHJhZ2dhYmxlcyBmcm9tIGdldHRpbmcgZHJhZ2dlZFxuICAgICAgICAgICAgLy8gYWx0b2dldGhlci4gV2Ugc2hvdWxkbid0IHVzZSBFdmVudC5zdG9wUHJvcGFnYXRpb24oKSBoZXJlIGFzIHdlIGFyZSBsaXN0ZW5pbmcgdG8gdGhlIGV2ZW50c1xuICAgICAgICAgICAgLy8gb24gdGhlIGdsb2JhbCBlbGVtZW50IGxldmVsLlxuXG4gICAgICAgICAgICAvLyBXaXRoIEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpLCBpdCByZWdpc3RlcnMgdGhlIGV2ZW50cyBzZW50IGZyb20gdGhlIGlubmVyIG1vc3QgZHJhZ2dhYmxlXG4gICAgICAgICAgICAvLyBmaXJzdC4gVGhlbiBpbW1lZGlhdGVseSBhZnRlciB0aGF0LCBpdCBzdG9wcyBsaXN0ZW5pbmcgdG8gdGhlIHNhbWUgdHlwZSBvZiBldmVudHMgb24gdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIGVsZW1lbnQuIFNvIHRoaXMgd2lsbCBoZWxwIHVzIHRvIG5vdCByZWdpc3RlciB0aGUgc2FtZSBldmVudHMgdGhhdCB3b3VsZCBjb21lIGZyb20gdGhlIHBhcmVudFxuICAgICAgICAgICAgLy8gbGV2ZWwgZHJhZ2dhYmxlcyBldmVudHVhbGx5LlxuXG4gICAgICAgICAgICBtb3ZlRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNEcmFnU3RhcnRlZCkge1xuICAgICAgICAgICAgICB0aGlzLmhhc0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgLy8gRmlyZSBcImRyYWdzdGFydFwiXG4gICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KG1vdmVFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX1NUQVJUKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEZpcmUgXCJkcmFnbW92ZVwiXG4gICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KG1vdmVFdmVudCwgRHJhZ0V2ZW50VHlwZS5EUkFHX01PVkUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gTGlzdGVuIHRvIG1vdXNldXAvdG91Y2hlbmQgZXZlbnRzLlxuICAgICAgdGhpcy5uZXN0ZWRMaXN0ZW5lcnMucHVzaChcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgZW5kT25FdmVudCwgKGVuZEV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhhc0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgICAvLyBGaXJlIFwiZHJhZ2VuZFwiIG9ubHkgaWYgZHJhZ3N0YXJ0IGlzIHJlZ2lzdGVyZWRcbiAgICAgICAgICAgIHRoaXMuaGFzRHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGVuZEV2ZW50LCBEcmFnRXZlbnRUeXBlLkRSQUdfRU5EKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXZSBtdXN0IHJlbW92ZSB0aGUgdGhlIG5lc3RlZCBsaXN0ZW5lcnMgZXZlcnkgdGltZSBkcmFnIGNvbXBsZXRlcy5cbiAgICAgICAgICBpZiAodGhpcy5uZXN0ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMubmVzdGVkTGlzdGVuZXJzLm1hcChldmVudCA9PiBldmVudCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBicm9hZGNhc3QoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBldmVudFR5cGU6IERyYWdFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPiA9IHRoaXMuZ2VuZXJhdGVEcmFnRXZlbnQoZXZlbnQsIGV2ZW50VHlwZSk7XG5cbiAgICBzd2l0Y2ggKGRyYWdFdmVudC50eXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19TVEFSVDpcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQubmV4dChkcmFnRXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX01PVkU6XG4gICAgICAgIHRoaXMuZHJhZ01vdmUubmV4dChkcmFnRXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX0VORDpcbiAgICAgICAgdGhpcy5kcmFnRW5kLm5leHQoZHJhZ0V2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIHNldCBhZnRlciB0aGV5IGFyZSBicm9hZGNhc3RlZCB0byB0aGUgRHJhZ2dhYmxlR2hvc3QgY29tcG9uZW50LlxuICAgIGRyYWdFdmVudC5naG9zdEVsZW1lbnQgPSB0aGlzLmdob3N0RWxlbWVudDtcbiAgICBkcmFnRXZlbnQuZHJvcFBvaW50UG9zaXRpb24gPSB0aGlzLmRyb3BQb2ludFBvc2l0aW9uO1xuXG4gICAgdGhpcy5ldmVudEJ1cy5icm9hZGNhc3QoZHJhZ0V2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVEcmFnRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBldmVudFR5cGU6IERyYWdFdmVudFR5cGUpOiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4ge1xuICAgIGNvbnN0IG5hdGl2ZUV2ZW50OiBhbnkgPSB0aGlzLmdldE5hdGl2ZUV2ZW50T2JqZWN0KGV2ZW50KTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICBkcmFnUG9zaXRpb246IHtcbiAgICAgICAgcGFnZVg6IG5hdGl2ZUV2ZW50LnBhZ2VYLFxuICAgICAgICBwYWdlWTogbmF0aXZlRXZlbnQucGFnZVksXG4gICAgICAgIG1vdmVYOiBuYXRpdmVFdmVudC5wYWdlWCAtIHRoaXMuaW5pdGlhbFBvc2l0aW9uLnBhZ2VYLFxuICAgICAgICBtb3ZlWTogbmF0aXZlRXZlbnQucGFnZVkgLSB0aGlzLmluaXRpYWxQb3NpdGlvbi5wYWdlWSxcbiAgICAgIH0sXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcbiAgICAgIGRyYWdEYXRhVHJhbnNmZXI6IHRoaXMuZHJhZ0RhdGFUcmFuc2ZlcixcbiAgICAgIGdob3N0RWxlbWVudDogdGhpcy5naG9zdEVsZW1lbnQsXG4gICAgfTtcbiAgfVxufVxuIl19