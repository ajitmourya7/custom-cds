/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, PLATFORM_ID, HostBinding } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
let ClrKeyFocusItem = class ClrKeyFocusItem {
    constructor(elementRef, platformId) {
        this.elementRef = elementRef;
        this.platformId = platformId;
        this.tabIndex = -1;
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    focus() {
        if (isPlatformBrowser(this.platformId)) {
            this.elementRef.nativeElement.focus();
        }
    }
};
tslib_1.__decorate([
    HostBinding('attr.tabindex'),
    tslib_1.__metadata("design:type", Object)
], ClrKeyFocusItem.prototype, "tabIndex", void 0);
ClrKeyFocusItem = tslib_1.__decorate([
    Directive({
        selector: '[clrKeyFocusItem]',
    }),
    tslib_1.__param(1, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [ElementRef, Object])
], ClrKeyFocusItem);
export { ClrKeyFocusItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWZvY3VzLWl0ZW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy9rZXktZm9jdXMva2V5LWZvY3VzLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtwRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBTzFCLFlBQW9CLFVBQXNCLEVBQStCLFVBQWtCO1FBQXZFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQU43RCxhQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFNa0QsQ0FBQztJQUovRixJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFJRCxLQUFLO1FBQ0gsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWIrQjtJQUE3QixXQUFXLENBQUMsZUFBZSxDQUFDOztpREFBZTtBQURqQyxlQUFlO0lBSDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQVE2QyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBQWhDLFVBQVUsRUFBMkMsTUFBTTtHQVBoRixlQUFlLENBYzNCO1NBZFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIFBMQVRGT1JNX0lELCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyS2V5Rm9jdXNJdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIENscktleUZvY3VzSXRlbSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpIHRhYkluZGV4ID0gLTE7XG5cbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cblxuICBmb2N1cygpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==