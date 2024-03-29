import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
var RootDropdownService = /** @class */ (function () {
    function RootDropdownService() {
        this._changes = new Subject();
    }
    Object.defineProperty(RootDropdownService.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RootDropdownService.prototype.closeMenus = function () {
        this._changes.next(false);
    };
    RootDropdownService = tslib_1.__decorate([
        Injectable()
    ], RootDropdownService);
    return RootDropdownService;
}());
export { RootDropdownService };
export function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
export var ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vcHJvdmlkZXJzL2Ryb3Bkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQjtJQURBO1FBRVUsYUFBUSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO0lBUzlELENBQUM7SUFQQyxzQkFBSSx3Q0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsd0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFUVSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO09BQ0EsbUJBQW1CLENBVS9CO0lBQUQsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxtQkFBbUI7QUFZaEMsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFFBQTZCO0lBQ2xFLE9BQU8sUUFBUSxJQUFJLElBQUksbUJBQW1CLEVBQUUsQ0FBQztBQUMvQyxDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLG1CQUFtQjtJQUM1QixVQUFVLEVBQUUsc0JBQXNCO0lBQ2xDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Q0FDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm9vdERyb3Bkb3duU2VydmljZSB7XG4gIHByaXZhdGUgX2NoYW5nZXM6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY2xvc2VNZW51cygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VzLm5leHQoZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbHJSb290RHJvcGRvd25GYWN0b3J5KGV4aXN0aW5nOiBSb290RHJvcGRvd25TZXJ2aWNlKSB7XG4gIHJldHVybiBleGlzdGluZyB8fCBuZXcgUm9vdERyb3Bkb3duU2VydmljZSgpO1xufVxuXG5leHBvcnQgY29uc3QgUk9PVF9EUk9QRE9XTl9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogUm9vdERyb3Bkb3duU2VydmljZSxcbiAgdXNlRmFjdG9yeTogY2xyUm9vdERyb3Bkb3duRmFjdG9yeSxcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIFJvb3REcm9wZG93blNlcnZpY2VdXSxcbn07XG4iXX0=