import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
import { ClrDragEvent } from '../drag-event';
import { DragEventType } from '../interfaces/drag-event.interface';
import { DragAndDropEventBusService } from '../providers/drag-and-drop-event-bus.service';
var ClrDroppable = /** @class */ (function () {
    function ClrDroppable(el, eventBus, domAdapter, renderer) {
        this.el = el;
        this.eventBus = eventBus;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.isDraggableMatch = false;
        this._isDraggableOver = false;
        this._dropTolerance = { top: 0, right: 0, bottom: 0, left: 0 };
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.dragLeaveEmitter = new EventEmitter();
        this.dragEnterEmitter = new EventEmitter();
        this.dropEmitter = new EventEmitter();
        this.droppableEl = this.el.nativeElement;
    }
    Object.defineProperty(ClrDroppable.prototype, "isDraggableOver", {
        set: function (value) {
            // We need to add/remove this draggable-over class via Renderer2
            // because isDraggableOver is set outside of NgZone.
            if (value) {
                this.renderer.addClass(this.droppableEl, 'draggable-over');
            }
            else {
                this.renderer.removeClass(this.droppableEl, 'draggable-over');
            }
            this._isDraggableOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDroppable.prototype, "group", {
        set: function (value) {
            this._group = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDroppable.prototype.dropToleranceGenerator = function (top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = top; }
        if (bottom === void 0) { bottom = top; }
        if (left === void 0) { left = right; }
        return { top: top, right: right, bottom: bottom, left: left };
    };
    Object.defineProperty(ClrDroppable.prototype, "dropTolerance", {
        set: function (value) {
            // If user provides an object here and wants to manipulate/update properties individually,
            // the object must be immutable as we generate new object based user's given object.
            if (typeof value === 'number') {
                this._dropTolerance = this.dropToleranceGenerator(value);
            }
            else if (typeof value === 'string') {
                var toleranceValues = value
                    .trim()
                    .split(/\s+/)
                    .map(function (tolerance) { return parseInt(tolerance, 10); });
                this._dropTolerance = this.dropToleranceGenerator.apply(this, tslib_1.__spread(toleranceValues));
            }
            else if (value) {
                // The value could be passed in as {left: 20, top: 30 }
                // In this case, the rest of the direction properties should be 0.
                // That's why we initialize properties with 0 first, then override with user's given value.
                this._dropTolerance = tslib_1.__assign({}, this.dropToleranceGenerator(0), value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDroppable.prototype.unsubscribeFrom = function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    ClrDroppable.prototype.checkGroupMatch = function (draggableGroup) {
        // Both Draggable and Droppable have clrGroup input.
        // The clrGroup input can be both a string key or array of string keys in Draggable and Droppable.
        // It's not match if Draggable has no defined value assigned to clrGroup, but Droppable has a defined clrGroup.
        if (!draggableGroup && this._group) {
            return false;
        }
        // The same is true the other way round.
        if (!this._group && draggableGroup) {
            return false;
        }
        // It's match if both Draggable and Droppable have no assigned value for clrGroup.
        if (!this._group && !draggableGroup) {
            return true;
        }
        // It's match if both Draggable and Droppable have simple string keys that are matching.
        // It's match if Draggable's simple clrGroup key is matching with one of the clrGroup keys of Droppable. The
        // same is true the other way round.
        // it's match if one of the clrGroup keys of Droppable is matching with one of the clrGroup keys of Draggable.
        if (typeof draggableGroup === 'string') {
            if (typeof this._group === 'string') {
                return this._group === draggableGroup;
            }
            else {
                return this._group.indexOf(draggableGroup) > -1;
            }
        }
        else {
            if (typeof this._group === 'string') {
                return draggableGroup.indexOf(this._group) > -1;
            }
            else {
                return this._group.some(function (groupKey) { return draggableGroup.indexOf(groupKey) > -1; });
            }
        }
    };
    ClrDroppable.prototype.isInDropArea = function (point) {
        if (!point) {
            return false;
        }
        if (!this.clientRect) {
            this.clientRect = this.domAdapter.clientRect(this.droppableEl);
        }
        if (point.pageX >= this.clientRect.left - this._dropTolerance.left &&
            point.pageX <= this.clientRect.right + this._dropTolerance.right &&
            point.pageY >= this.clientRect.top - this._dropTolerance.top &&
            point.pageY <= this.clientRect.bottom + this._dropTolerance.bottom) {
            return true;
        }
        else {
            return false;
        }
    };
    ClrDroppable.prototype.onDragStart = function (dragStartEvent) {
        var _this = this;
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe(function (dragMoveEvent) {
                _this.onDragMove(dragMoveEvent);
            });
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe(function (dragEndEvent) {
                _this.onDragEnd(dragEndEvent);
            });
        }
    };
    ClrDroppable.prototype.onDragMove = function (dragMoveEvent) {
        var isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            var dragEnterEvent = tslib_1.__assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            var dragLeaveEvent = tslib_1.__assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    };
    ClrDroppable.prototype.onDragEnd = function (dragEndEvent) {
        if (this._isDraggableOver) {
            if (dragEndEvent.ghostElement) {
                // By this point, the draggable ghost component is destroyed,
                // but the element would be active until its animation completes.
                // As such, once the ghost is dropped over, we will give it "dropped" class.
                // This process cannot be done in the ghost component
                // because any subscription to the drop event is ineffective or invalid
                // as the component had been already destroyed.
                this.renderer.addClass(dragEndEvent.ghostElement, 'dropped');
            }
            var dropEvent = tslib_1.__assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    };
    ClrDroppable.prototype.ngOnInit = function () {
        var _this = this;
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe(function (dragStartEvent) {
            _this.onDragStart(dragStartEvent);
        });
    };
    ClrDroppable.prototype.ngOnDestroy = function () {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
    };
    tslib_1.__decorate([
        Input('clrGroup'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDroppable.prototype, "group", null);
    tslib_1.__decorate([
        Input('clrDropTolerance'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ClrDroppable.prototype, "dropTolerance", null);
    tslib_1.__decorate([
        Output('clrDragStart'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dragStartEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragMove'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dragMoveEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragEnd'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dragEndEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragLeave'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dragLeaveEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDragEnter'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dragEnterEmitter", void 0);
    tslib_1.__decorate([
        Output('clrDrop'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrDroppable.prototype, "dropEmitter", void 0);
    ClrDroppable = tslib_1.__decorate([
        Directive({
            selector: '[clrDroppable]',
            providers: [DomAdapter],
            host: { '[class.droppable]': 'true', '[class.draggable-match]': 'isDraggableMatch' },
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            DragAndDropEventBusService,
            DomAdapter,
            Renderer2])
    ], ClrDroppable);
    return ClrDroppable;
}());
export { ClrDroppable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcHBhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9kcm9wcGFibGUvZHJvcHBhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdqSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQXNCLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXZGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBTzFGO0lBUUUsc0JBQ1UsRUFBYyxFQUNkLFFBQXVDLEVBQ3ZDLFVBQXNCLEVBQ3RCLFFBQW1CO1FBSG5CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUErQjtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFLckIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQW9CbEMsbUJBQWMsR0FBOEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUEwQnJFLHFCQUFnQixHQUFrQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RFLG9CQUFlLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckUsbUJBQWMsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRSxxQkFBZ0IsR0FBa0MsSUFBSSxZQUFZLEVB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QixDQUFDOzs7cURBa0J6QjtJQUV1QjtRQUF2QixNQUFNLENBQUMsY0FBYyxDQUFDOzBDQUFtQixZQUFZOzBEQUF1QztJQUN0RTtRQUF0QixNQUFNLENBQUMsYUFBYSxDQUFDOzBDQUFrQixZQUFZO3lEQUF1QztJQUNyRTtRQUFyQixNQUFNLENBQUMsWUFBWSxDQUFDOzBDQUFpQixZQUFZO3dEQUF1QztJQUNqRTtRQUF2QixNQUFNLENBQUMsY0FBYyxDQUFDOzBDQUFtQixZQUFZOzBEQUF1QztJQUNyRTtRQUF2QixNQUFNLENBQUMsY0FBYyxDQUFDOzBDQUFtQixZQUFZOzBEQUF1QztJQUMxRTtRQUFsQixNQUFNLENBQUMsU0FBUyxDQUFDOzBDQUFjLFlBQVk7cURBQXVDO0lBckV4RSxZQUFZO1FBTHhCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxrQkFBa0IsRUFBRTtTQUNyRixDQUFDO2lEQVVjLFVBQVU7WUFDSiwwQkFBMEI7WUFDeEIsVUFBVTtZQUNaLFNBQVM7T0FabEIsWUFBWSxDQTRNeEI7SUFBRCxtQkFBQztDQUFBLEFBNU1ELElBNE1DO1NBNU1ZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBDbHJEcmFnRXZlbnQgfSBmcm9tICcuLi9kcmFnLWV2ZW50JztcbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSwgRHJhZ0V2ZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyRHJvcFRvbGVyYW5jZUludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJvcC10b2xlcmFuY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2RyYWctYW5kLWRyb3AtZXZlbnQtYnVzLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRHJvcHBhYmxlXScsXG4gIHByb3ZpZGVyczogW0RvbUFkYXB0ZXJdLFxuICBob3N0OiB7ICdbY2xhc3MuZHJvcHBhYmxlXSc6ICd0cnVlJywgJ1tjbGFzcy5kcmFnZ2FibGUtbWF0Y2hdJzogJ2lzRHJhZ2dhYmxlTWF0Y2gnIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRyb3BwYWJsZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkcmFnU3RhcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkcmFnTW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRyYWdFbmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGRyb3BwYWJsZUVsOiBhbnk7XG4gIHByaXZhdGUgY2xpZW50UmVjdDogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgZXZlbnRCdXM6IERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlPFQ+LFxuICAgIHByaXZhdGUgZG9tQWRhcHRlcjogRG9tQWRhcHRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5kcm9wcGFibGVFbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgaXNEcmFnZ2FibGVNYXRjaDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9pc0RyYWdnYWJsZU92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzZXQgaXNEcmFnZ2FibGVPdmVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgLy8gV2UgbmVlZCB0byBhZGQvcmVtb3ZlIHRoaXMgZHJhZ2dhYmxlLW92ZXIgY2xhc3MgdmlhIFJlbmRlcmVyMlxuICAgIC8vIGJlY2F1c2UgaXNEcmFnZ2FibGVPdmVyIGlzIHNldCBvdXRzaWRlIG9mIE5nWm9uZS5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kcm9wcGFibGVFbCwgJ2RyYWdnYWJsZS1vdmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kcm9wcGFibGVFbCwgJ2RyYWdnYWJsZS1vdmVyJyk7XG4gICAgfVxuICAgIHRoaXMuX2lzRHJhZ2dhYmxlT3ZlciA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3JvdXA6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgnY2xyR3JvdXAnKVxuICBzZXQgZ3JvdXAodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fZ3JvdXAgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Ryb3BUb2xlcmFuY2U6IENsckRyb3BUb2xlcmFuY2VJbnRlcmZhY2UgPSB7IHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCB9O1xuXG4gIHByaXZhdGUgZHJvcFRvbGVyYW5jZUdlbmVyYXRvcih0b3AgPSAwLCByaWdodCA9IHRvcCwgYm90dG9tID0gdG9wLCBsZWZ0ID0gcmlnaHQpOiBDbHJEcm9wVG9sZXJhbmNlSW50ZXJmYWNlIHtcbiAgICByZXR1cm4geyB0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQgfTtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRHJvcFRvbGVyYW5jZScpXG4gIHNldCBkcm9wVG9sZXJhbmNlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcgfCBDbHJEcm9wVG9sZXJhbmNlSW50ZXJmYWNlKSB7XG4gICAgLy8gSWYgdXNlciBwcm92aWRlcyBhbiBvYmplY3QgaGVyZSBhbmQgd2FudHMgdG8gbWFuaXB1bGF0ZS91cGRhdGUgcHJvcGVydGllcyBpbmRpdmlkdWFsbHksXG4gICAgLy8gdGhlIG9iamVjdCBtdXN0IGJlIGltbXV0YWJsZSBhcyB3ZSBnZW5lcmF0ZSBuZXcgb2JqZWN0IGJhc2VkIHVzZXIncyBnaXZlbiBvYmplY3QuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2Ryb3BUb2xlcmFuY2UgPSB0aGlzLmRyb3BUb2xlcmFuY2VHZW5lcmF0b3IodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdG9sZXJhbmNlVmFsdWVzID0gdmFsdWVcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgICAubWFwKHRvbGVyYW5jZSA9PiBwYXJzZUludCh0b2xlcmFuY2UsIDEwKSk7XG4gICAgICB0aGlzLl9kcm9wVG9sZXJhbmNlID0gdGhpcy5kcm9wVG9sZXJhbmNlR2VuZXJhdG9yKC4uLnRvbGVyYW5jZVZhbHVlcyk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgLy8gVGhlIHZhbHVlIGNvdWxkIGJlIHBhc3NlZCBpbiBhcyB7bGVmdDogMjAsIHRvcDogMzAgfVxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCB0aGUgcmVzdCBvZiB0aGUgZGlyZWN0aW9uIHByb3BlcnRpZXMgc2hvdWxkIGJlIDAuXG4gICAgICAvLyBUaGF0J3Mgd2h5IHdlIGluaXRpYWxpemUgcHJvcGVydGllcyB3aXRoIDAgZmlyc3QsIHRoZW4gb3ZlcnJpZGUgd2l0aCB1c2VyJ3MgZ2l2ZW4gdmFsdWUuXG4gICAgICB0aGlzLl9kcm9wVG9sZXJhbmNlID0geyAuLi50aGlzLmRyb3BUb2xlcmFuY2VHZW5lcmF0b3IoMCksIC4uLnZhbHVlIH07XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRHJhZ1N0YXJ0JykgZHJhZ1N0YXJ0RW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdNb3ZlJykgZHJhZ01vdmVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnY2xyRHJhZ0VuZCcpIGRyYWdFbmRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2xyRHJhZ0V2ZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnY2xyRHJhZ0xlYXZlJykgZHJhZ0xlYXZlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENsckRyYWdFdmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ2NsckRyYWdFbnRlcicpIGRyYWdFbnRlckVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdjbHJEcm9wJykgZHJvcEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxDbHJEcmFnRXZlbnQ8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVGcm9tKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKTogdm9pZCB7XG4gICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0dyb3VwTWF0Y2goZHJhZ2dhYmxlR3JvdXA6IHN0cmluZyB8IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgLy8gQm90aCBEcmFnZ2FibGUgYW5kIERyb3BwYWJsZSBoYXZlIGNsckdyb3VwIGlucHV0LlxuICAgIC8vIFRoZSBjbHJHcm91cCBpbnB1dCBjYW4gYmUgYm90aCBhIHN0cmluZyBrZXkgb3IgYXJyYXkgb2Ygc3RyaW5nIGtleXMgaW4gRHJhZ2dhYmxlIGFuZCBEcm9wcGFibGUuXG5cbiAgICAvLyBJdCdzIG5vdCBtYXRjaCBpZiBEcmFnZ2FibGUgaGFzIG5vIGRlZmluZWQgdmFsdWUgYXNzaWduZWQgdG8gY2xyR3JvdXAsIGJ1dCBEcm9wcGFibGUgaGFzIGEgZGVmaW5lZCBjbHJHcm91cC5cbiAgICBpZiAoIWRyYWdnYWJsZUdyb3VwICYmIHRoaXMuX2dyb3VwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFRoZSBzYW1lIGlzIHRydWUgdGhlIG90aGVyIHdheSByb3VuZC5cbiAgICBpZiAoIXRoaXMuX2dyb3VwICYmIGRyYWdnYWJsZUdyb3VwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSXQncyBtYXRjaCBpZiBib3RoIERyYWdnYWJsZSBhbmQgRHJvcHBhYmxlIGhhdmUgbm8gYXNzaWduZWQgdmFsdWUgZm9yIGNsckdyb3VwLlxuICAgIGlmICghdGhpcy5fZ3JvdXAgJiYgIWRyYWdnYWJsZUdyb3VwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBJdCdzIG1hdGNoIGlmIGJvdGggRHJhZ2dhYmxlIGFuZCBEcm9wcGFibGUgaGF2ZSBzaW1wbGUgc3RyaW5nIGtleXMgdGhhdCBhcmUgbWF0Y2hpbmcuXG4gICAgLy8gSXQncyBtYXRjaCBpZiBEcmFnZ2FibGUncyBzaW1wbGUgY2xyR3JvdXAga2V5IGlzIG1hdGNoaW5nIHdpdGggb25lIG9mIHRoZSBjbHJHcm91cCBrZXlzIG9mIERyb3BwYWJsZS4gVGhlXG4gICAgLy8gc2FtZSBpcyB0cnVlIHRoZSBvdGhlciB3YXkgcm91bmQuXG4gICAgLy8gaXQncyBtYXRjaCBpZiBvbmUgb2YgdGhlIGNsckdyb3VwIGtleXMgb2YgRHJvcHBhYmxlIGlzIG1hdGNoaW5nIHdpdGggb25lIG9mIHRoZSBjbHJHcm91cCBrZXlzIG9mIERyYWdnYWJsZS5cbiAgICBpZiAodHlwZW9mIGRyYWdnYWJsZUdyb3VwID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ncm91cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VwID09PSBkcmFnZ2FibGVHcm91cDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cC5pbmRleE9mKGRyYWdnYWJsZUdyb3VwKSA+IC0xO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX2dyb3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlR3JvdXAuaW5kZXhPZih0aGlzLl9ncm91cCkgPiAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fZ3JvdXAgYXMgc3RyaW5nW10pLnNvbWUoZ3JvdXBLZXkgPT4gZHJhZ2dhYmxlR3JvdXAuaW5kZXhPZihncm91cEtleSkgPiAtMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0luRHJvcEFyZWEocG9pbnQ6IHsgcGFnZVg6IG51bWJlcjsgcGFnZVk6IG51bWJlciB9KTogYm9vbGVhbiB7XG4gICAgaWYgKCFwb2ludCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jbGllbnRSZWN0KSB7XG4gICAgICB0aGlzLmNsaWVudFJlY3QgPSB0aGlzLmRvbUFkYXB0ZXIuY2xpZW50UmVjdCh0aGlzLmRyb3BwYWJsZUVsKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBwb2ludC5wYWdlWCA+PSB0aGlzLmNsaWVudFJlY3QubGVmdCAtIHRoaXMuX2Ryb3BUb2xlcmFuY2UubGVmdCAmJlxuICAgICAgcG9pbnQucGFnZVggPD0gdGhpcy5jbGllbnRSZWN0LnJpZ2h0ICsgdGhpcy5fZHJvcFRvbGVyYW5jZS5yaWdodCAmJlxuICAgICAgcG9pbnQucGFnZVkgPj0gdGhpcy5jbGllbnRSZWN0LnRvcCAtIHRoaXMuX2Ryb3BUb2xlcmFuY2UudG9wICYmXG4gICAgICBwb2ludC5wYWdlWSA8PSB0aGlzLmNsaWVudFJlY3QuYm90dG9tICsgdGhpcy5fZHJvcFRvbGVyYW5jZS5ib3R0b21cbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkRyYWdTdGFydChkcmFnU3RhcnRFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgZHJhZ2dhYmxlIGFuZCBkcm9wcGFibGUgaGF2ZSBhIG1hdGNoaW5nIGdyb3VwIGtleS5cbiAgICB0aGlzLmlzRHJhZ2dhYmxlTWF0Y2ggPSB0aGlzLmNoZWNrR3JvdXBNYXRjaChkcmFnU3RhcnRFdmVudC5ncm91cCk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gZHJhZ01vdmVkIGFuZCBkcmFnRW5kZWQgb25seSBpZiBkcmFnZ2FibGUgYW5kIGRyb3BwYWJsZSBoYXZlIGEgbWF0Y2hpbmcgZ3JvdXAga2V5LlxuICAgIGlmICh0aGlzLmlzRHJhZ2dhYmxlTWF0Y2gpIHtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0RW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJhZ1N0YXJ0RXZlbnQpKTtcbiAgICAgIHRoaXMuZHJhZ01vdmVTdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50QnVzLmRyYWdNb3ZlZC5zdWJzY3JpYmUoKGRyYWdNb3ZlRXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPikgPT4ge1xuICAgICAgICB0aGlzLm9uRHJhZ01vdmUoZHJhZ01vdmVFdmVudCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZHJhZ0VuZFN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRCdXMuZHJhZ0VuZGVkLnN1YnNjcmliZSgoZHJhZ0VuZEV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pID0+IHtcbiAgICAgICAgdGhpcy5vbkRyYWdFbmQoZHJhZ0VuZEV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EcmFnTW92ZShkcmFnTW92ZUV2ZW50OiBEcmFnRXZlbnRJbnRlcmZhY2U8VD4pOiB2b2lkIHtcbiAgICBjb25zdCBpc0luRHJvcEFyZWEgPSB0aGlzLmlzSW5Ecm9wQXJlYShkcmFnTW92ZUV2ZW50LmRyb3BQb2ludFBvc2l0aW9uKTtcbiAgICBpZiAoIXRoaXMuX2lzRHJhZ2dhYmxlT3ZlciAmJiBpc0luRHJvcEFyZWEpIHtcbiAgICAgIHRoaXMuaXNEcmFnZ2FibGVPdmVyID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGRyYWdFbnRlckV2ZW50ID0geyAuLi5kcmFnTW92ZUV2ZW50LCB0eXBlOiBEcmFnRXZlbnRUeXBlLkRSQUdfRU5URVIgfTtcbiAgICAgIHRoaXMuZXZlbnRCdXMuYnJvYWRjYXN0KGRyYWdFbnRlckV2ZW50KTtcbiAgICAgIHRoaXMuZHJhZ0VudGVyRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJhZ0VudGVyRXZlbnQpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2lzRHJhZ2dhYmxlT3ZlciAmJiAhaXNJbkRyb3BBcmVhKSB7XG4gICAgICB0aGlzLmlzRHJhZ2dhYmxlT3ZlciA9IGZhbHNlO1xuICAgICAgY29uc3QgZHJhZ0xlYXZlRXZlbnQgPSB7IC4uLmRyYWdNb3ZlRXZlbnQsIHR5cGU6IERyYWdFdmVudFR5cGUuRFJBR19MRUFWRSB9O1xuICAgICAgdGhpcy5ldmVudEJ1cy5icm9hZGNhc3QoZHJhZ0xlYXZlRXZlbnQpO1xuICAgICAgdGhpcy5kcmFnTGVhdmVFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChkcmFnTGVhdmVFdmVudCkpO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ01vdmVFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChkcmFnTW92ZUV2ZW50KSk7XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ0VuZChkcmFnRW5kRXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc0RyYWdnYWJsZU92ZXIpIHtcbiAgICAgIGlmIChkcmFnRW5kRXZlbnQuZ2hvc3RFbGVtZW50KSB7XG4gICAgICAgIC8vIEJ5IHRoaXMgcG9pbnQsIHRoZSBkcmFnZ2FibGUgZ2hvc3QgY29tcG9uZW50IGlzIGRlc3Ryb3llZCxcbiAgICAgICAgLy8gYnV0IHRoZSBlbGVtZW50IHdvdWxkIGJlIGFjdGl2ZSB1bnRpbCBpdHMgYW5pbWF0aW9uIGNvbXBsZXRlcy5cbiAgICAgICAgLy8gQXMgc3VjaCwgb25jZSB0aGUgZ2hvc3QgaXMgZHJvcHBlZCBvdmVyLCB3ZSB3aWxsIGdpdmUgaXQgXCJkcm9wcGVkXCIgY2xhc3MuXG5cbiAgICAgICAgLy8gVGhpcyBwcm9jZXNzIGNhbm5vdCBiZSBkb25lIGluIHRoZSBnaG9zdCBjb21wb25lbnRcbiAgICAgICAgLy8gYmVjYXVzZSBhbnkgc3Vic2NyaXB0aW9uIHRvIHRoZSBkcm9wIGV2ZW50IGlzIGluZWZmZWN0aXZlIG9yIGludmFsaWRcbiAgICAgICAgLy8gYXMgdGhlIGNvbXBvbmVudCBoYWQgYmVlbiBhbHJlYWR5IGRlc3Ryb3llZC5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkcmFnRW5kRXZlbnQuZ2hvc3RFbGVtZW50LCAnZHJvcHBlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkcm9wRXZlbnQgPSB7IC4uLmRyYWdFbmRFdmVudCwgdHlwZTogRHJhZ0V2ZW50VHlwZS5EUk9QIH07XG4gICAgICB0aGlzLmV2ZW50QnVzLmJyb2FkY2FzdChkcm9wRXZlbnQpO1xuICAgICAgdGhpcy5kcm9wRW1pdHRlci5lbWl0KG5ldyBDbHJEcmFnRXZlbnQoZHJvcEV2ZW50KSk7XG4gICAgICB0aGlzLmlzRHJhZ2dhYmxlT3ZlciA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmRyYWdFbmRFbWl0dGVyLmVtaXQobmV3IENsckRyYWdFdmVudChkcmFnRW5kRXZlbnQpKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbSh0aGlzLmRyYWdNb3ZlU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbSh0aGlzLmRyYWdFbmRTdWJzY3JpcHRpb24pO1xuICAgIHRoaXMuaXNEcmFnZ2FibGVNYXRjaCA9IGZhbHNlO1xuICAgIGRlbGV0ZSB0aGlzLmNsaWVudFJlY3Q7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRCdXMuZHJhZ1N0YXJ0ZWQuc3Vic2NyaWJlKChkcmFnU3RhcnRFdmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KSA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ1N0YXJ0KGRyYWdTdGFydEV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tKHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbSh0aGlzLmRyYWdNb3ZlU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbSh0aGlzLmRyYWdFbmRTdWJzY3JpcHRpb24pO1xuICB9XG59XG4iXX0=