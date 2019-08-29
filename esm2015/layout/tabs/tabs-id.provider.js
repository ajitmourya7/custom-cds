/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { InjectionToken } from '@angular/core';
let nbTabsComponent = 0;
export const TABS_ID = new InjectionToken('TABS_ID');
export function tokenFactory() {
    return 'clr-tabs-' + nbTabsComponent++;
}
export const TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1pZC5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL3RhYnMtaWQucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0MsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBUyxTQUFTLENBQUMsQ0FBQztBQUU3RCxNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPLFdBQVcsR0FBRyxlQUFlLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLE9BQU87SUFDaEIsVUFBVSxFQUFFLFlBQVk7Q0FDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBuYlRhYnNDb21wb25lbnQgPSAwO1xuXG5leHBvcnQgY29uc3QgVEFCU19JRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxudW1iZXI+KCdUQUJTX0lEJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbkZhY3RvcnkoKSB7XG4gIHJldHVybiAnY2xyLXRhYnMtJyArIG5iVGFic0NvbXBvbmVudCsrO1xufVxuXG5leHBvcnQgY29uc3QgVEFCU19JRF9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogVEFCU19JRCxcbiAgdXNlRmFjdG9yeTogdG9rZW5GYWN0b3J5LFxufTtcbiJdfQ==