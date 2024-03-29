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
let DragAndDropEventBusService = class DragAndDropEventBusService {
    constructor() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
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
    get dropped() {
        return this.drop.asObservable();
    }
    broadcast(event) {
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
    }
};
DragAndDropEventBusService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });
DragAndDropEventBusService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], DragAndDropEventBusService);
export { DragAndDropEventBusService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1hbmQtZHJvcC1ldmVudC1idXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2RyYWctYW5kLWRyb3AvcHJvdmlkZXJzL2RyYWctYW5kLWRyb3AtZXZlbnQtYnVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFHdkYsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFEdkM7UUFFVSxjQUFTLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO1FBQ2pGLGFBQVEsR0FBbUMsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFDaEYsWUFBTyxHQUFtQyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUMvRSxTQUFJLEdBQW1DLElBQUksT0FBTyxFQUF5QixDQUFDO0tBb0NyRjtJQWxDQyxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUE0QjtRQUNwQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbEIsS0FBSyxhQUFhLENBQUMsVUFBVTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQyxTQUFTO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTTtZQUNSLEtBQUssYUFBYSxDQUFDLFFBQVE7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1lBQ1IsS0FBSyxhQUFhLENBQUMsSUFBSTtnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7QUF4Q1ksMEJBQTBCO0lBRHRDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUN0QiwwQkFBMEIsQ0F3Q3RDO1NBeENZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRHJhZ0V2ZW50SW50ZXJmYWNlLCBEcmFnRXZlbnRUeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kcmFnLWV2ZW50LmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BFdmVudEJ1c1NlcnZpY2U8VD4ge1xuICBwcml2YXRlIGRyYWdTdGFydDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyYWdNb3ZlOiBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4gPSBuZXcgU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+KCk7XG4gIHByaXZhdGUgZHJhZ0VuZDogU3ViamVjdDxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+ID0gbmV3IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PigpO1xuICBwcml2YXRlIGRyb3A6IFN1YmplY3Q8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiA9IG5ldyBTdWJqZWN0PERyYWdFdmVudEludGVyZmFjZTxUPj4oKTtcblxuICBnZXQgZHJhZ1N0YXJ0ZWQoKTogT2JzZXJ2YWJsZTxEcmFnRXZlbnRJbnRlcmZhY2U8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ01vdmVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ01vdmUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgZHJhZ0VuZGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ0VuZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBkcm9wcGVkKCk6IE9ic2VydmFibGU8RHJhZ0V2ZW50SW50ZXJmYWNlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZHJvcC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGJyb2FkY2FzdChldmVudDogRHJhZ0V2ZW50SW50ZXJmYWNlPFQ+KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19TVEFSVDpcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQubmV4dChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmFnRXZlbnRUeXBlLkRSQUdfTU9WRTpcbiAgICAgICAgdGhpcy5kcmFnTW92ZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJBR19FTkQ6XG4gICAgICAgIHRoaXMuZHJhZ0VuZC5uZXh0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYWdFdmVudFR5cGUuRFJPUDpcbiAgICAgICAgdGhpcy5kcm9wLm5leHQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19