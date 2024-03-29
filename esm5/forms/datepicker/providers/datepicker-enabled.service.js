/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DATEPICKER_ENABLE_BREAKPOINT } from '../../../utils/breakpoints/breakpoints';
import { MOBILE_USERAGENT_REGEX } from '../utils/constants';
var DatepickerEnabledService = /** @class */ (function () {
    function DatepickerEnabledService(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    Object.defineProperty(DatepickerEnabledService.prototype, "isEnabled", {
        /**
         * Returns if the calendar should be active or not.
         * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
         * then the calendar is inactive.
         */
        get: function () {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
            // What they recommend is:
            //"In summary, we recommend looking for the string 'Mobi'
            // anywhere in the User Agent to detect a mobile device."
            if (this._document) {
                if (this._innerWidth < DATEPICKER_ENABLE_BREAKPOINT && this._isUserAgentMobile) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DatepickerEnabledService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DatepickerEnabledService);
    return DatepickerEnabledService;
}());
export { DatepickerEnabledService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1lbmFibGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlcGlja2VyLWVuYWJsZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc1RDtJQUNFLGtDQUFzQyxTQUFjO1FBQWQsY0FBUyxHQUFULFNBQVMsQ0FBSztRQU81Qyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFOMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztTQUNyRDtJQUNILENBQUM7SUFVRCxzQkFBSSwrQ0FBUztRQUxiOzs7O1dBSUc7YUFDSDtZQUNFLDJGQUEyRjtZQUMzRiwwQkFBMEI7WUFDMUIseURBQXlEO1lBQ3pELHlEQUF5RDtZQUN6RCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyw0QkFBNEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7b0JBQzlFLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBM0JVLHdCQUF3QjtRQURwQyxVQUFVLEVBQUU7UUFFRSxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O09BRGxCLHdCQUF3QixDQTRCcEM7SUFBRCwrQkFBQztDQUFBLEFBNUJELElBNEJDO1NBNUJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERBVEVQSUNLRVJfRU5BQkxFX0JSRUFLUE9JTlQgfSBmcm9tICcuLi8uLi8uLi91dGlscy9icmVha3BvaW50cy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBNT0JJTEVfVVNFUkFHRU5UX1JFR0VYIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVwaWNrZXJFbmFibGVkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZG9jdW1lbnQpIHtcbiAgICAgIHRoaXMuX2lzVXNlckFnZW50TW9iaWxlID0gTU9CSUxFX1VTRVJBR0VOVF9SRUdFWC50ZXN0KF9kb2N1bWVudC5kZWZhdWx0Vmlldy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHRoaXMuX2lubmVyV2lkdGggPSBfZG9jdW1lbnQuZGVmYXVsdFZpZXcuaW5uZXJXaWR0aDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc1VzZXJBZ2VudE1vYmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9pbm5lcldpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIGNhbGVuZGFyIHNob3VsZCBiZSBhY3RpdmUgb3Igbm90LlxuICAgKiBJZiB0aGUgdXNlciBhZ2VudCBpcyBtb2JpbGUgYW5kIHRoZSBzY3JlZW4gd2lkdGggaXMgbGVzcyB0aGFuIERBVEVQSUNLRVJfQUNUSVZFX0JSRUFLUE9JTlRcbiAgICogdGhlbiB0aGUgY2FsZW5kYXIgaXMgaW5hY3RpdmUuXG4gICAqL1xuICBnZXQgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnRcbiAgICAvLyBXaGF0IHRoZXkgcmVjb21tZW5kIGlzOlxuICAgIC8vXCJJbiBzdW1tYXJ5LCB3ZSByZWNvbW1lbmQgbG9va2luZyBmb3IgdGhlIHN0cmluZyAnTW9iaSdcbiAgICAvLyBhbnl3aGVyZSBpbiB0aGUgVXNlciBBZ2VudCB0byBkZXRlY3QgYSBtb2JpbGUgZGV2aWNlLlwiXG4gICAgaWYgKHRoaXMuX2RvY3VtZW50KSB7XG4gICAgICBpZiAodGhpcy5faW5uZXJXaWR0aCA8IERBVEVQSUNLRVJfRU5BQkxFX0JSRUFLUE9JTlQgJiYgdGhpcy5faXNVc2VyQWdlbnRNb2JpbGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19