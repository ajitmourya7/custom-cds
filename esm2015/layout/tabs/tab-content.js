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
let nbTabContentComponents = 0;
let ClrTabContent = class ClrTabContent {
    constructor(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    // The template must be applied on the top-down phase of view-child initialization to prevent
    // components in the content from initializing before a content container exists.
    // Some child components need their container for sizing calculations.
    /* tslint:disable:no-unused-variable */
    set templateRef(value) {
        this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
    }
    /* tslint:enable:no-unused-variable */
    get ariaLabelledBy() {
        return this.ariaService.ariaLabelledBy;
    }
    get tabContentId() {
        return this.ariaService.ariaControls;
    }
    set tabContentId(id) {
        this.ariaService.ariaControls = id;
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
    ngOnDestroy() {
        const index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
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
        template: `
    <ng-template #tabContentProjectedRef>
      <section [id]="tabContentId" role="tabpanel" class="tab-content" [class.active]="active"
               [hidden]="!active"
               [attr.aria-labelledby]="ariaLabelledBy"
               [attr.aria-expanded]="active"
               [attr.aria-hidden]="!active">
        <ng-content></ng-content>
      </section>
    </ng-template>
    `
    }),
    tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
    tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, AriaService,
        TabsService])
], ClrTabContent);
export { ClrTabContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxTQUFTLEVBQW1CLE1BQU0sRUFBRSxLQUFLLEVBQWEsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkQsSUFBSSxzQkFBc0IsR0FBVyxDQUFDLENBQUM7QUFnQnZDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDeEIsWUFDUyxlQUFnQyxFQUNWLEVBQVUsRUFDL0IsV0FBd0IsRUFDeEIsV0FBd0I7UUFIekIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1YsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixHQUFHLHNCQUFzQixFQUFFLENBQUM7U0FDbkU7SUFDSCxDQUFDO0lBSUQsNkZBQTZGO0lBQzdGLGlGQUFpRjtJQUNqRixzRUFBc0U7SUFDdEUsdUNBQXVDO0lBRXZDLElBQVksV0FBVyxDQUFDLEtBQWlDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ0Qsc0NBQXNDO0lBRXRDLElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxJQUFJLFlBQVksQ0FBQyxFQUFVO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTVCQztJQURDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDdkIsV0FBVzs2Q0FBWCxXQUFXO2dEQUV6QztBQVlEO0lBREMsS0FBSyxDQUFDLElBQUksQ0FBQzs7O2lEQUdYO0FBbkNVLGFBQWE7SUFkekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7S0FVUDtLQUNKLENBQUM7SUFJRyxtQkFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7NkNBREcsZUFBZSxVQUVsQixXQUFXO1FBQ1gsV0FBVztHQUx2QixhQUFhLENBK0N6QjtTQS9DWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5pbXBvcnQgeyBBcmlhU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2FyaWEuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3RhYnMuc2VydmljZSc7XG5cbmxldCBuYlRhYkNvbnRlbnRDb21wb25lbnRzOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdGFiLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdGFiQ29udGVudFByb2plY3RlZFJlZj5cbiAgICAgIDxzZWN0aW9uIFtpZF09XCJ0YWJDb250ZW50SWRcIiByb2xlPVwidGFicGFuZWxcIiBjbGFzcz1cInRhYi1jb250ZW50XCIgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhYWN0aXZlXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsclRhYkNvbnRlbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaWZBY3RpdmVTZXJ2aWNlOiBJZkFjdGl2ZVNlcnZpY2UsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIHB1YmxpYyBpZDogbnVtYmVyLFxuICAgIHByaXZhdGUgYXJpYVNlcnZpY2U6IEFyaWFTZXJ2aWNlLFxuICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlXG4gICkge1xuICAgIGlmICghdGhpcy50YWJDb250ZW50SWQpIHtcbiAgICAgIHRoaXMudGFiQ29udGVudElkID0gJ2Nsci10YWItY29udGVudC0nICsgbmJUYWJDb250ZW50Q29tcG9uZW50cysrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPENsclRhYkNvbnRlbnQ+O1xuXG4gIC8vIFRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGFwcGxpZWQgb24gdGhlIHRvcC1kb3duIHBoYXNlIG9mIHZpZXctY2hpbGQgaW5pdGlhbGl6YXRpb24gdG8gcHJldmVudFxuICAvLyBjb21wb25lbnRzIGluIHRoZSBjb250ZW50IGZyb20gaW5pdGlhbGl6aW5nIGJlZm9yZSBhIGNvbnRlbnQgY29udGFpbmVyIGV4aXN0cy5cbiAgLy8gU29tZSBjaGlsZCBjb21wb25lbnRzIG5lZWQgdGhlaXIgY29udGFpbmVyIGZvciBzaXppbmcgY2FsY3VsYXRpb25zLlxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgKi9cbiAgQFZpZXdDaGlsZCgndGFiQ29udGVudFByb2plY3RlZFJlZicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgc2V0IHRlbXBsYXRlUmVmKHZhbHVlOiBUZW1wbGF0ZVJlZjxDbHJUYWJDb250ZW50Pikge1xuICAgIHRoaXMudmlld1JlZiA9IHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHZhbHVlKTtcbiAgfVxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuXG4gIGdldCBhcmlhTGFiZWxsZWRCeSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFMYWJlbGxlZEJ5O1xuICB9XG5cbiAgZ2V0IHRhYkNvbnRlbnRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scztcbiAgfVxuXG4gIEBJbnB1dCgnaWQnKVxuICBzZXQgdGFiQ29udGVudElkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFyaWFTZXJ2aWNlLmFyaWFDb250cm9scyA9IGlkO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZVNlcnZpY2UuY3VycmVudCA9PT0gdGhpcy5pZDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzU2VydmljZS50YWJDb250ZW50Vmlld0NvbnRhaW5lci5pbmRleE9mKHRoaXMudmlld1JlZik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiQ29udGVudFZpZXdDb250YWluZXIucmVtb3ZlKGluZGV4KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==