/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { ElementRef, Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../id-generator/id-generator.service';
import { FocusableItem } from './focusable-item';
var BasicFocusableItem = /** @class */ (function () {
    function BasicFocusableItem(id, el, renderer, platformId) {
        this.id = id;
        this.el = el;
        this.renderer = renderer;
        this.platformId = platformId;
        this.disabled = false;
        renderer.setAttribute(el.nativeElement, 'id', id);
        renderer.setAttribute(el.nativeElement, 'tabindex', '-1');
    }
    BasicFocusableItem.prototype.focus = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
            this.el.nativeElement.focus();
        }
    };
    BasicFocusableItem.prototype.blur = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
            this.el.nativeElement.blur();
        }
    };
    BasicFocusableItem.prototype.activate = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.click();
        }
    };
    BasicFocusableItem = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(UNIQUE_ID)),
        tslib_1.__param(3, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [String, ElementRef,
            Renderer2,
            Object])
    ], BasicFocusableItem);
    return BasicFocusableItem;
}());
export { BasicFocusableItem };
export var BASIC_FOCUSABLE_ITEM_PROVIDER = [
    UNIQUE_ID_PROVIDER,
    {
        provide: FocusableItem,
        useClass: BasicFocusableItem,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtZm9jdXNhYmxlLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2Jhc2ljLWZvY3VzYWJsZS1pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pEO0lBQ0UsNEJBQzRCLEVBQVUsRUFDNUIsRUFBMkIsRUFDM0IsUUFBbUIsRUFDRSxVQUFrQjtRQUhyQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQzVCLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDRSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBTWpELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFKZixRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUlELGtDQUFLLEdBQUw7UUFDRSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBQ0QsaUNBQUksR0FBSjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBOUJVLGtCQUFrQjtRQUQ5QixVQUFVLEVBQUU7UUFHUixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFHakIsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3lEQUZSLFVBQVU7WUFDSixTQUFTO1lBQ2MsTUFBTTtPQUx0QyxrQkFBa0IsQ0ErQjlCO0lBQUQseUJBQUM7Q0FBQSxBQS9CRCxJQStCQztTQS9CWSxrQkFBa0I7QUFpQy9CLE1BQU0sQ0FBQyxJQUFNLDZCQUE2QixHQUFHO0lBQzNDLGtCQUFrQjtJQUNsQjtRQUNFLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7S0FDN0I7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVOSVFVRV9JRCwgVU5JUVVFX0lEX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuL2ZvY3VzYWJsZS1pdGVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2ljRm9jdXNhYmxlSXRlbSBpbXBsZW1lbnRzIEZvY3VzYWJsZUl0ZW0ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbC5uYXRpdmVFbGVtZW50LCAnaWQnLCBpZCk7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICctMScpO1xuICB9XG5cbiAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBmb2N1cygpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG4gIGJsdXIoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEJBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSID0gW1xuICBVTklRVUVfSURfUFJPVklERVIsXG4gIHtcbiAgICBwcm92aWRlOiBGb2N1c2FibGVJdGVtLFxuICAgIHVzZUNsYXNzOiBCYXNpY0ZvY3VzYWJsZUl0ZW0sXG4gIH0sXG5dO1xuIl19