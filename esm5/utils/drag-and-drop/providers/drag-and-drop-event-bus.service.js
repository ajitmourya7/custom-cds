import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DragEventType } from '../interfaces/drag-event.interface';
import * as i0 from "@angular/core";
var DragAndDropEventBusService = /** @class */ (function () {
    function DragAndDropEventBusService() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
    }
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragStarted", {
        get: function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragMoved", {
        get: function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragEnded", {
        get: function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dropped", {
        get: function () {
            return this.drop.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DragAndDropEventBusService.prototype.broadcast = function (event) {
        switch (event.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(event);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(event);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(event);
                break;
            case DragEventType.DROP:
                this.drop.next(event);
                break;
            default:
                break;
        }
    };
    DragAndDropEventBusService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });
    DragAndDropEventBusService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], DragAndDropEventBusService);
    return DragAndDropEventBusService;
}());
export { DragAndDropEventBusService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC1ldmVudC1idXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2RyYWctYW5kLWRyb3AvcHJvdmlkZXJzL2RyYWctYW5kLWRyb3AtZXZlbnQtYnVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFHdkY7SUFEQTtRQUVVLGNBQVMsR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFDakYsYUFBUSxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUNoRixZQUFPLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQy9FLFNBQUksR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7S0FvQ3JGO0lBbENDLHNCQUFJLG1EQUFXO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksaURBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCw4Q0FBUyxHQUFULFVBQVUsS0FBNEI7UUFDcEMsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssYUFBYSxDQUFDLFVBQVU7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1lBQ1IsS0FBSyxhQUFhLENBQUMsU0FBUztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQyxRQUFRO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsTUFBTTtZQUNSLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQzs7SUF2Q1UsMEJBQTBCO1FBRHRDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUN0QiwwQkFBMEIsQ0F3Q3RDO3FDQW5ERDtDQW1EQyxBQXhDRCxJQXdDQztTQXhDWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IERyYWdFdmVudEludGVyZmFjZSwgRHJhZ0V2ZW50VHlwZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZHJhZy1ldmVudC5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wRXZlbnRCdXNTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBkcmFnU3RhcnQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcbiAgcHJpdmF0ZSBkcmFnTW92ZTogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdFbmQ6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcbiAgcHJpdmF0ZSBkcm9wOiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG5cbiAgZ2V0IGRyYWdTdGFydGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ1N0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdNb3ZlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdNb3ZlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyYWdFbmRlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdFbmQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJvcHBlZCgpOiBPYnNlcnZhYmxlPERyYWdFdmVudEludGVyZmFjZTxUPj4ge1xuICAgIHJldHVybiB0aGlzLmRyb3AuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBicm9hZGNhc3QoZXZlbnQ6IERyYWdFdmVudEludGVyZmFjZTxUPik6IHZvaWQge1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfU1RBUlQ6XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0Lm5leHQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhZ0V2ZW50VHlwZS5EUkFHX01PVkU6XG4gICAgICAgIHRoaXMuZHJhZ01vdmUubmV4dChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfRU5EOlxuICAgICAgICB0aGlzLmRyYWdFbmQubmV4dChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRST1A6XG4gICAgICAgIHRoaXMuZHJvcC5uZXh0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiJdfQ==