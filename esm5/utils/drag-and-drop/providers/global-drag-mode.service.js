import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Renderer2 } from '@angular/core';
// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
var GlobalDragModeService = /** @class */ (function () {
    function GlobalDragModeService(renderer) {
        this.renderer = renderer;
    }
    GlobalDragModeService.prototype.enter = function () {
        this.renderer.addClass(document.body, 'in-drag');
    };
    GlobalDragModeService.prototype.exit = function () {
        this.renderer.removeClass(document.body, 'in-drag');
    };
    GlobalDragModeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Renderer2])
    ], GlobalDragModeService);
    return GlobalDragModeService;
}());
export { GlobalDragModeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWRyYWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvZHJhZy1hbmQtZHJvcC9wcm92aWRlcnMvZ2xvYmFsLWRyYWctbW9kZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsdUZBQXVGO0FBQ3ZGLGlEQUFpRDtBQUVqRDtJQUNFLCtCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztJQUUzQyxxQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVRVLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7aURBRW1CLFNBQVM7T0FENUIscUJBQXFCLENBVWpDO0lBQUQsNEJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gVGhpcyBzZXJ2aWNlIGNsYXNzIGFkZHMgYW5kIHJlbW92ZXMgdGhlIFwiaW4tZHJhZ1wiIGNsYXNzIHRvIHRoZSBkb2N1bWVudCBib2R5IGVsZW1lbnRcbi8vIHRocm91Z2ggaXRzIHB1YmxpYyBlbnRlcigpIGFuZCBleGl0KCkgbWV0aG9kcy5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxEcmFnTW9kZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgZW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnaW4tZHJhZycpO1xuICB9XG5cbiAgZXhpdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdpbi1kcmFnJyk7XG4gIH1cbn1cbiJdfQ==