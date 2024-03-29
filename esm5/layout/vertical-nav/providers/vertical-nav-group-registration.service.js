/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var VerticalNavGroupRegistrationService = /** @class */ (function () {
    function VerticalNavGroupRegistrationService() {
        this.navGroupCount = 0;
    }
    VerticalNavGroupRegistrationService.prototype.registerNavGroup = function () {
        this.navGroupCount++;
    };
    VerticalNavGroupRegistrationService.prototype.unregisterNavGroup = function () {
        this.navGroupCount--;
    };
    VerticalNavGroupRegistrationService = tslib_1.__decorate([
        Injectable()
    ], VerticalNavGroupRegistrationService);
    return VerticalNavGroupRegistrationService;
}());
export { VerticalNavGroupRegistrationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWdyb3VwLXJlZ2lzdHJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi9wcm92aWRlcnMvdmVydGljYWwtbmF2LWdyb3VwLXJlZ2lzdHJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQURBO1FBRVMsa0JBQWEsR0FBVyxDQUFDLENBQUM7SUFTbkMsQ0FBQztJQVBDLDhEQUFnQixHQUFoQjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0VBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFUVSxtQ0FBbUM7UUFEL0MsVUFBVSxFQUFFO09BQ0EsbUNBQW1DLENBVS9DO0lBQUQsMENBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsTmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIG5hdkdyb3VwQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgcmVnaXN0ZXJOYXZHcm91cCgpIHtcbiAgICB0aGlzLm5hdkdyb3VwQ291bnQrKztcbiAgfVxuXG4gIHVucmVnaXN0ZXJOYXZHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLm5hdkdyb3VwQ291bnQtLTtcbiAgfVxufVxuIl19