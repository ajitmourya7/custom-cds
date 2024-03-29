import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, Inject } from '@angular/core';
import { IF_ACTIVE_ID, IF_ACTIVE_ID_PROVIDER, IfActiveService } from '../../utils/conditional/if-active.service';
import { AriaService } from './providers/aria.service';
import { TabsService } from './providers/tabs.service';
import { ClrTabContent } from './tab-content';
import { ClrTabLink } from './tab-link.directive';
var ClrTab = /** @class */ (function () {
    function ClrTab(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    ClrTab.prototype.ngOnDestroy = function () {
        this.tabsService.unregister(this);
    };
    Object.defineProperty(ClrTab.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChild(ClrTabLink, { static: true }),
        tslib_1.__metadata("design:type", ClrTabLink)
    ], ClrTab.prototype, "tabLink", void 0);
    tslib_1.__decorate([
        ContentChild(ClrTabContent, { static: true }),
        tslib_1.__metadata("design:type", ClrTabContent)
    ], ClrTab.prototype, "tabContent", void 0);
    ClrTab = tslib_1.__decorate([
        Component({
            selector: 'clr-tab',
            template: "\n        <ng-content></ng-content>\n    ",
            providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
        }),
        tslib_1.__param(1, Inject(IF_ACTIVE_ID)),
        tslib_1.__metadata("design:paramtypes", [IfActiveService, Number, TabsService])
    ], ClrTab);
    return ClrTab;
}());
export { ClrTab };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFakgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVNsRDtJQU1FLGdCQUNTLGVBQWdDLEVBQ1YsRUFBVSxFQUMvQixXQUF3QjtRQUZ6QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDVixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRWhDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsc0JBQUksMEJBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQWxCRDtRQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7MENBQ2xDLFVBQVU7MkNBQUM7SUFFcEI7UUFEQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUNsQyxhQUFhOzhDQUFDO0lBSmYsTUFBTTtRQVBsQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsMkNBRVA7WUFDSCxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLENBQUM7U0FDaEQsQ0FBQztRQVNHLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtpREFERyxlQUFlLFVBRWxCLFdBQVc7T0FUdkIsTUFBTSxDQXFCbEI7SUFBRCxhQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJRl9BQ1RJVkVfSURfUFJPVklERVIsIElmQWN0aXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWFjdGl2ZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQXJpYVNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9hcmlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFic1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy90YWJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyVGFiQ29udGVudCB9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuaW1wb3J0IHsgQ2xyVGFiTGluayB9IGZyb20gJy4vdGFiLWxpbmsuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLXRhYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBwcm92aWRlcnM6IFtJRl9BQ1RJVkVfSURfUFJPVklERVIsIEFyaWFTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVGFiIHtcbiAgQENvbnRlbnRDaGlsZChDbHJUYWJMaW5rLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICB0YWJMaW5rOiBDbHJUYWJMaW5rO1xuICBAQ29udGVudENoaWxkKENsclRhYkNvbnRlbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHRhYkNvbnRlbnQ6IENsclRhYkNvbnRlbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlmQWN0aXZlU2VydmljZTogSWZBY3RpdmVTZXJ2aWNlLFxuICAgIEBJbmplY3QoSUZfQUNUSVZFX0lEKSBwdWJsaWMgaWQ6IG51bWJlcixcbiAgICBwcml2YXRlIHRhYnNTZXJ2aWNlOiBUYWJzU2VydmljZVxuICApIHtcbiAgICB0YWJzU2VydmljZS5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudGFic1NlcnZpY2UudW5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWZBY3RpdmVTZXJ2aWNlLmN1cnJlbnQgPT09IHRoaXMuaWQ7XG4gIH1cbn1cbiJdfQ==