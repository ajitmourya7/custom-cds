/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Injector, PLATFORM_ID, Renderer2, } from '@angular/core';
/*  This directive is for guiding the document focus to the newly added content when its view is initialized
    so that assistive technologies can read its content. */
var ClrFocusOnViewInit = /** @class */ (function () {
    function ClrFocusOnViewInit(el, platformId, injector, renderer) {
        this.el = el;
        this.platformId = platformId;
        this.injector = injector;
        this.renderer = renderer;
        this.directFocus = true; // true if the element gets focused without need to set tabindex;
        this.document = this.injector.get(DOCUMENT);
    }
    ClrFocusOnViewInit.prototype.onFocusout = function () {
        if (!this.directFocus) {
            // manually set attributes and styles should be removed
            this.renderer.removeAttribute(this.el.nativeElement, 'tabindex');
            this.renderer.setStyle(this.el.nativeElement, 'outline', null);
        }
    };
    ClrFocusOnViewInit.prototype.ngAfterViewInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            if (this.document.activeElement === this.el.nativeElement) {
                return;
            }
            if (this.el.nativeElement) {
                this.el.nativeElement.focus();
                if (this.document.activeElement !== this.el.nativeElement) {
                    // if it's not directly focused now, it means it was a non-interactive element
                    // so we need to give it a tabindex.
                    this.directFocus = false;
                    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
                    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
                    this.el.nativeElement.focus();
                }
            }
        }
    };
    tslib_1.__decorate([
        HostListener('focusout'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ClrFocusOnViewInit.prototype, "onFocusout", null);
    ClrFocusOnViewInit = tslib_1.__decorate([
        Directive({
            selector: '[clrFocusOnViewInit]',
        }),
        tslib_1.__param(1, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Object,
            Injector,
            Renderer2])
    ], ClrFocusOnViewInit);
    return ClrFocusOnViewInit;
}());
export { ClrFocusOnViewInit };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtb24tdmlldy1pbml0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZm9jdXMvZm9jdXMtb24tdmlldy1pbml0L2ZvY3VzLW9uLXZpZXctaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCOzJEQUMyRDtBQUkzRDtJQUNFLDRCQUNVLEVBQWMsRUFDTyxVQUFrQixFQUN2QyxRQUFrQixFQUNsQixRQUFtQjtRQUhuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ08sZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFNckIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxpRUFBaUU7UUFKM0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBTUQsdUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLHVEQUF1RDtZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRUQsNENBQWUsR0FBZjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pELE9BQU87YUFDUjtZQUNELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO29CQUN6RCw4RUFBOEU7b0JBQzlFLG9DQUFvQztvQkFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDL0I7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQXpCRDtRQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7Ozs7d0RBT3hCO0lBcEJVLGtCQUFrQjtRQUg5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1NBQ2pDLENBQUM7UUFJRyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBRFIsVUFBVTtZQUNtQixNQUFNO1lBQzdCLFFBQVE7WUFDUixTQUFTO09BTGxCLGtCQUFrQixDQXdDOUI7SUFBRCx5QkFBQztDQUFBLEFBeENELElBd0NDO1NBeENZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyogIFRoaXMgZGlyZWN0aXZlIGlzIGZvciBndWlkaW5nIHRoZSBkb2N1bWVudCBmb2N1cyB0byB0aGUgbmV3bHkgYWRkZWQgY29udGVudCB3aGVuIGl0cyB2aWV3IGlzIGluaXRpYWxpemVkIFxuICAgIHNvIHRoYXQgYXNzaXN0aXZlIHRlY2hub2xvZ2llcyBjYW4gcmVhZCBpdHMgY29udGVudC4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJGb2N1c09uVmlld0luaXRdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRm9jdXNPblZpZXdJbml0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSB0aGlzLmluamVjdG9yLmdldChET0NVTUVOVCk7XG4gIH1cblxuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHJpdmF0ZSBkaXJlY3RGb2N1cyA9IHRydWU7IC8vIHRydWUgaWYgdGhlIGVsZW1lbnQgZ2V0cyBmb2N1c2VkIHdpdGhvdXQgbmVlZCB0byBzZXQgdGFiaW5kZXg7XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnKVxuICBvbkZvY3Vzb3V0KCkge1xuICAgIGlmICghdGhpcy5kaXJlY3RGb2N1cykge1xuICAgICAgLy8gbWFudWFsbHkgc2V0IGF0dHJpYnV0ZXMgYW5kIHN0eWxlcyBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3V0bGluZScsIG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIC8vIGlmIGl0J3Mgbm90IGRpcmVjdGx5IGZvY3VzZWQgbm93LCBpdCBtZWFucyBpdCB3YXMgYSBub24taW50ZXJhY3RpdmUgZWxlbWVudFxuICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gZ2l2ZSBpdCBhIHRhYmluZGV4LlxuICAgICAgICAgIHRoaXMuZGlyZWN0Rm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnb3V0bGluZScsICdub25lJyk7XG4gICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==