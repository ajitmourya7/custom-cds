/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Optional } from '@angular/core';
import { DragHandleRegistrarService } from './providers/drag-handle-registrar.service';
var ClrDragHandle = /** @class */ (function () {
    function ClrDragHandle(el, dragHandleRegistrar) {
        this.el = el;
        this.dragHandleRegistrar = dragHandleRegistrar;
        if (!this.dragHandleRegistrar) {
            // ClrDragHandleRegistrar is provided in ClrDraggable so we expect it to be present here
            // as clrDragHandle is required to be used only inside of a clrDraggable directive.
            throw new Error('The clrDragHandle directive can only be used inside of a clrDraggable directive.');
        }
        this.dragHandleRegistrar.registerCustomHandle(this.el.nativeElement);
    }
    ClrDragHandle.prototype.ngOnDestroy = function () {
        this.dragHandleRegistrar.unregisterCustomHandle();
    };
    ClrDragHandle = tslib_1.__decorate([
        Directive({ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [ElementRef, DragHandleRegistrarService])
    ], ClrDragHandle);
    return ClrDragHandle;
}());
export { ClrDragHandle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9kcmFnLWFuZC1kcm9wL2RyYWctaGFuZGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBR3ZGO0lBQ0UsdUJBQW9CLEVBQWMsRUFBc0IsbUJBQWtEO1FBQXRGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBc0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUErQjtRQUN4RyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLHdGQUF3RjtZQUN4RixtRkFBbUY7WUFDbkYsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1NBQ3JHO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBWlUsYUFBYTtRQUR6QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUU3QyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBdkIsVUFBVSxFQUEyQywwQkFBMEI7T0FENUYsYUFBYSxDQWF6QjtJQUFELG9CQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFnSGFuZGxlUmVnaXN0cmFyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RyYWctaGFuZGxlLXJlZ2lzdHJhci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsckRyYWdIYW5kbGVdJywgaG9zdDogeyAnW2NsYXNzLmRyYWctaGFuZGxlXSc6ICd0cnVlJyB9IH0pXG5leHBvcnQgY2xhc3MgQ2xyRHJhZ0hhbmRsZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHByaXZhdGUgZHJhZ0hhbmRsZVJlZ2lzdHJhcjogRHJhZ0hhbmRsZVJlZ2lzdHJhclNlcnZpY2U8VD4pIHtcbiAgICBpZiAoIXRoaXMuZHJhZ0hhbmRsZVJlZ2lzdHJhcikge1xuICAgICAgLy8gQ2xyRHJhZ0hhbmRsZVJlZ2lzdHJhciBpcyBwcm92aWRlZCBpbiBDbHJEcmFnZ2FibGUgc28gd2UgZXhwZWN0IGl0IHRvIGJlIHByZXNlbnQgaGVyZVxuICAgICAgLy8gYXMgY2xyRHJhZ0hhbmRsZSBpcyByZXF1aXJlZCB0byBiZSB1c2VkIG9ubHkgaW5zaWRlIG9mIGEgY2xyRHJhZ2dhYmxlIGRpcmVjdGl2ZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsckRyYWdIYW5kbGUgZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyRHJhZ2dhYmxlIGRpcmVjdGl2ZS4nKTtcbiAgICB9XG4gICAgdGhpcy5kcmFnSGFuZGxlUmVnaXN0cmFyLnJlZ2lzdGVyQ3VzdG9tSGFuZGxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRyYWdIYW5kbGVSZWdpc3RyYXIudW5yZWdpc3RlckN1c3RvbUhhbmRsZSgpO1xuICB9XG59XG4iXX0=