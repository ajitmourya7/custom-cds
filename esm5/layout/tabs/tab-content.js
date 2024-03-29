import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { IF_ACTIVE_ID, IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
import { TabsService } from './providers/tabs.service';
var nbTabContentComponents = 0;
var ClrTabContent = /** @class */ (function () {
    function ClrTabContent(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    Object.defineProperty(ClrTabContent.prototype, "templateRef", {
        // The template must be applied on the top-down phase of view-child initialization to prevent
        // components in the content from initializing before a content container exists.
        // Some child components need their container for sizing calculations.
        /* tslint:disable:no-unused-variable */
        set: function (value) {
            this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "ariaLabelledBy", {
        /* tslint:enable:no-unused-variable */
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "tabContentId", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        set: function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabContent.prototype.ngOnDestroy = function () {
        var index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
    };
    tslib_1.__decorate([
        ViewChild('tabContentProjectedRef', { static: true }),
        tslib_1.__metadata("design:type", TemplateRef),
        tslib_1.__metadata("design:paramtypes", [TemplateRef])
    ], ClrTabContent.prototype, "templateRef", null);
    tslib_1.__decorate([
        Input('id'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ClrTabContent.prototype, "tabContentId", null);
    ClrTabContent = tslib_1.__decorate([
        Component({
            selector: 'clr-tab-content',
            template: "\n    <ng-template #tabContentProjectedRef>\n      <section [id]=\"tabContentId\" role=\"tabpanel\" class=\"tab-content\" [class.active]=\"active\"\n               [hidden]=\"!active\"\n               [attr.aria-labelledby]=\"ariaLabelledBy\"\n               [attr.aria-expanded]=\"active\"\n               [attr.aria-hidden]=\"!active\">\n        <ng-content></ng-content>\n      </section>\n    </ng-template>\n    "
        }),
        tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
        tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, AriaService,
            TabsService])
    ], ClrTabContent);
    return ClrTabContent;
}());
export { ClrTabContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQW1CLE1BQU0sRUFBRSxLQUFLLEVBQWEsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsSUFBSSxzQkFBc0IsR0FBVyxDQUFDLENBQUM7QUFnQnZDO0lBQ0UsdUJBQ1MsZUFBZ0MsRUFDVixFQUFVLEVBQy9CLFdBQXdCLEVBQ3hCLFdBQXdCO1FBSHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNWLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztJQVNELHNCQUFZLHNDQUFXO1FBTHZCLDZGQUE2RjtRQUM3RixpRkFBaUY7UUFDakYsc0VBQXNFO1FBQ3RFLHVDQUF1QzthQUV2QyxVQUF3QixLQUFpQztZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEYsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSx5Q0FBYztRQUZsQixzQ0FBc0M7YUFFdEM7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVk7YUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7YUFHRCxVQUFpQixFQUFVO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLGlDQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBM0JEO1FBREMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUN2QixXQUFXO2lEQUFYLFdBQVc7b0RBRXpDO0lBWUQ7UUFEQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7cURBR1g7SUFuQ1UsYUFBYTtRQWR6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSxtYUFVUDtTQUNKLENBQUM7UUFJRyxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7aURBREcsZUFBZSxVQUVsQixXQUFXO1lBQ1gsV0FBVztPQUx2QixhQUFhLENBK0N6QjtJQUFELG9CQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0EvQ1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGX0FDVElWRV9JRCwgSWZBY3RpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uZGl0aW9uYWwvaWYtYWN0aXZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXJpYVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hcmlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJzLnNlcnZpY2UnO1xuXG5sZXQgbmJUYWJDb250ZW50Q29tcG9uZW50czogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYi1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3RhYkNvbnRlbnRQcm9qZWN0ZWRSZWY+XG4gICAgICA8c2VjdGlvbiBbaWRdPVwidGFiQ29udGVudElkXCIgcm9sZT1cInRhYnBhbmVsXCIgY2xhc3M9XCJ0YWItY29udGVudFwiIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiIWFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIWFjdGl2ZVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJUYWJDb250ZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIEBJbmplY3QoSUZfQUNUSVZFX0lEKSBwdWJsaWMgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIGFyaWFTZXJ2aWNlOiBBcmlhU2VydmljZSxcbiAgICBwcml2YXRlIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZVxuICApIHtcbiAgICBpZiAoIXRoaXMudGFiQ29udGVudElkKSB7XG4gICAgICB0aGlzLnRhYkNvbnRlbnRJZCA9ICdjbHItdGFiLWNvbnRlbnQtJyArIG5iVGFiQ29udGVudENvbXBvbmVudHMrKztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxDbHJUYWJDb250ZW50PjtcblxuICAvLyBUaGUgdGVtcGxhdGUgbXVzdCBiZSBhcHBsaWVkIG9uIHRoZSB0b3AtZG93biBwaGFzZSBvZiB2aWV3LWNoaWxkIGluaXRpYWxpemF0aW9uIHRvIHByZXZlbnRcbiAgLy8gY29tcG9uZW50cyBpbiB0aGUgY29udGVudCBmcm9tIGluaXRpYWxpemluZyBiZWZvcmUgYSBjb250ZW50IGNvbnRhaW5lciBleGlzdHMuXG4gIC8vIFNvbWUgY2hpbGQgY29tcG9uZW50cyBuZWVkIHRoZWlyIGNvbnRhaW5lciBmb3Igc2l6aW5nIGNhbGN1bGF0aW9ucy5cbiAgLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnRQcm9qZWN0ZWRSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIHNldCB0ZW1wbGF0ZVJlZih2YWx1ZTogVGVtcGxhdGVSZWY8Q2xyVGFiQ29udGVudD4pIHtcbiAgICB0aGlzLnZpZXdSZWYgPSB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh2YWx1ZSk7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cblxuICBnZXQgYXJpYUxhYmVsbGVkQnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhTGFiZWxsZWRCeTtcbiAgfVxuXG4gIGdldCB0YWJDb250ZW50SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhU2VydmljZS5hcmlhQ29udHJvbHM7XG4gIH1cblxuICBASW5wdXQoJ2lkJylcbiAgc2V0IHRhYkNvbnRlbnRJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hcmlhU2VydmljZS5hcmlhQ29udHJvbHMgPSBpZDtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIuaW5kZXhPZih0aGlzLnZpZXdSZWYpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnRhYnNTZXJ2aWNlLnRhYkNvbnRlbnRWaWV3Q29udGFpbmVyLnJlbW92ZShpbmRleCk7XG4gICAgfVxuICB9XG59XG4iXX0=