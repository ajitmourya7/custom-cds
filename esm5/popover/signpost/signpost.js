import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, ElementRef } from '@angular/core';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { ClrSignpostTrigger } from './signpost-trigger';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SignpostIdService } from './providers/signpost-id.service';
var ClrSignpost = /** @class */ (function () {
    function ClrSignpost(commonStrings) {
        this.commonStrings = commonStrings;
        /**********
         * @property useCustomTrigger
         *
         * @description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    Object.defineProperty(ClrSignpost.prototype, "customTrigger", {
        /**********
         * @property signPostTrigger
         *
         * @description
         * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
         *
         */
        set: function (trigger) {
            this.useCustomTrigger = !!trigger;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChild(ClrSignpostTrigger, { static: false }),
        tslib_1.__metadata("design:type", ClrSignpostTrigger),
        tslib_1.__metadata("design:paramtypes", [ClrSignpostTrigger])
    ], ClrSignpost.prototype, "customTrigger", null);
    ClrSignpost = tslib_1.__decorate([
        Component({
            selector: 'clr-signpost',
            template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\" [attr.title]=\"commonStrings.keys.info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
            host: { '[class.signpost]': 'true' },
            providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }, SignpostIdService]
        })
        /*********
         *
         * @class ClrSignpost
         *
         * @description
         * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
         * It supports the clrPosition with a 'right-middle' default.
         *
         */
        ,
        tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService])
    ], ClrSignpost);
    return ClrSignpost;
}());
export { ClrSignpost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJwb3BvdmVyL3NpZ25wb3N0L3NpZ25wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQTZCcEU7SUFDRSxxQkFBbUIsYUFBc0M7UUFBdEMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRXpEOzs7Ozs7V0FNRztRQUNJLHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQVRtQixDQUFDO0lBbUI3RCxzQkFBSSxzQ0FBYTtRQVJqQjs7Ozs7O1dBTUc7YUFFSCxVQUFrQixPQUEyQjtZQUMzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUZEO1FBREMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUN6QixrQkFBa0I7aURBQWxCLGtCQUFrQjtvREFFNUM7SUF0QlUsV0FBVztRQTNCdkIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLHFaQVdQO1lBQ0gsSUFBSSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsaUJBQWlCLENBQUM7U0FDekcsQ0FBQztRQUVGOzs7Ozs7OztXQVFHOztpREFFaUMsdUJBQXVCO09BRDlDLFdBQVcsQ0F1QnZCO0lBQUQsa0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBQT1BPVkVSX0hPU1RfQU5DSE9SIH0gZnJvbSAnLi4vY29tbW9uL3BvcG92ZXItaG9zdC1hbmNob3IudG9rZW4nO1xuXG5pbXBvcnQgeyBDbHJTaWducG9zdFRyaWdnZXIgfSBmcm9tICcuL3NpZ25wb3N0LXRyaWdnZXInO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2lnbnBvc3RJZFNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9zaWducG9zdC1pZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXNpZ25wb3N0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF1c2VDdXN0b21UcmlnZ2VyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzaWducG9zdC1hY3Rpb24gYnRuIGJ0bi1zbWFsbCBidG4tbGlua1wiXG4gICAgICAgICAgICAgICAgY2xyU2lnbnBvc3RUcmlnZ2VyPlxuICAgICAgICAgICAgICAgIDxjbHItaWNvbiBzaGFwZT1cImluZm9cIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMuaW5mb1wiPjwvY2xyLWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgaG9zdDogeyAnW2NsYXNzLnNpZ25wb3N0XSc6ICd0cnVlJyB9LFxuICBwcm92aWRlcnM6IFtJZk9wZW5TZXJ2aWNlLCB7IHByb3ZpZGU6IFBPUE9WRVJfSE9TVF9BTkNIT1IsIHVzZUV4aXN0aW5nOiBFbGVtZW50UmVmIH0sIFNpZ25wb3N0SWRTZXJ2aWNlXSxcbn0pXG5cbi8qKioqKioqKipcbiAqXG4gKiBAY2xhc3MgQ2xyU2lnbnBvc3RcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENsYXNzIHVzZWQgdG8gY29uZmlndXJlIGFuZCBjb250cm9sIHRoZSBzdGF0ZSBvZiBhIENsclNpZ25wb3N0IGFuZCBpdHMgYXNzb2NpYXRlZCBDbHJTaWducG9zdENvbnRlbnQuXG4gKiBJdCBzdXBwb3J0cyB0aGUgY2xyUG9zaXRpb24gd2l0aCBhICdyaWdodC1taWRkbGUnIGRlZmF1bHQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2xyU2lnbnBvc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UpIHt9XG5cbiAgLyoqKioqKioqKipcbiAgICogQHByb3BlcnR5IHVzZUN1c3RvbVRyaWdnZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEZsYWcgdXNlZCB0byBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byB1c2UgdGhlIGRlZmF1bHQgdHJpZ2dlciBvciBhIHVzZXIgc3VwcGxpZWQgdHJpZ2dlciBlbGVtZW50LlxuICAgKlxuICAgKi9cbiAgcHVibGljIHVzZUN1c3RvbVRyaWdnZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKioqKioqKioqKlxuICAgKiBAcHJvcGVydHkgc2lnblBvc3RUcmlnZ2VyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBVc2VzIENvbnRlbnRDaGlsZCB0byBjaGVjayBmb3IgYSB1c2VyIHN1cHBsaWVkIGVsZW1lbnQgd2l0aCB0aGUgQ2xyU2lnbnBvc3RUcmlnZ2VyIG9uIGl0LlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJTaWducG9zdFRyaWdnZXIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgY3VzdG9tVHJpZ2dlcih0cmlnZ2VyOiBDbHJTaWducG9zdFRyaWdnZXIpIHtcbiAgICB0aGlzLnVzZUN1c3RvbVRyaWdnZXIgPSAhIXRyaWdnZXI7XG4gIH1cbn1cbiJdfQ==