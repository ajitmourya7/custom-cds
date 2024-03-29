import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrProgressBar } from './progress-bar';
export var CLR_PROGRESS_BAR_DIRECTIVES = [ClrProgressBar];
var ClrProgressBarModule = /** @class */ (function () {
    function ClrProgressBarModule() {
    }
    ClrProgressBarModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_PROGRESS_BAR_DIRECTIVES],
            exports: [CLR_PROGRESS_BAR_DIRECTIVES],
        })
    ], ClrProgressBarModule);
    return ClrProgressBarModule;
}());
export { ClrProgressBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInByb2dyZXNzL3Byb2dyZXNzLWJhcnMvcHJvZ3Jlc3MtYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxNQUFNLENBQUMsSUFBTSwyQkFBMkIsR0FBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQU96RTtJQUFBO0lBQW1DLENBQUM7SUFBdkIsb0JBQW9CO1FBTGhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUMzQyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN2QyxDQUFDO09BQ1csb0JBQW9CLENBQUc7SUFBRCwyQkFBQztDQUFBLEFBQXBDLElBQW9DO1NBQXZCLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyUHJvZ3Jlc3NCYXIgfSBmcm9tICcuL3Byb2dyZXNzLWJhcic7XG5cbmV4cG9ydCBjb25zdCBDTFJfUFJPR1JFU1NfQkFSX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsclByb2dyZXNzQmFyXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9QUk9HUkVTU19CQVJfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfUFJPR1JFU1NfQkFSX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJQcm9ncmVzc0Jhck1vZHVsZSB7fVxuIl19