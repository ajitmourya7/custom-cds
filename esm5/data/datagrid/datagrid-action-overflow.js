import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Inject, Input, Output, NgZone, PLATFORM_ID } from '@angular/core';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { isPlatformBrowser } from '@angular/common';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
var clrDgActionId = 0;
var ClrDatagridActionOverflow = /** @class */ (function () {
    function ClrDatagridActionOverflow(rowActionService, commonStrings, platformId, zone, smartToggleService, popoverId) {
        var _this = this;
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.zone = zone;
        this.smartToggleService = smartToggleService;
        this.popoverId = popoverId;
        this.subscriptions = [];
        this.smartPosition = {
            axis: ClrAxis.HORIZONTAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.CENTER,
            content: ClrAlignment.CENTER,
        };
        this.openChange = new EventEmitter(false);
        this.rowActionService.register();
        this.subscriptions.push(this.smartToggleService.openChange.subscribe(function (openState) {
            _this.open = openState;
            if (openState) {
                _this.focusFirstButton();
            }
        }));
        this.popoverId = 'clr-action-menu' + clrDgActionId++;
    }
    ClrDatagridActionOverflow.prototype.ngOnDestroy = function () {
        this.rowActionService.unregister();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(ClrDatagridActionOverflow.prototype, "open", {
        get: function () {
            return this.smartToggleService.open;
        },
        set: function (open) {
            if (!!open !== this.smartToggleService.open) {
                // prevents chocolate mess
                this.smartToggleService.open = !!open;
                this.openChange.emit(!!open);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridActionOverflow.prototype.focusFirstButton = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var firstButton = document.querySelector('button.action-item');
                    if (firstButton) {
                        firstButton.focus();
                    }
                });
            });
        }
    };
    tslib_1.__decorate([
        Input('clrDgActionOverflowOpen'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrDatagridActionOverflow.prototype, "open", null);
    tslib_1.__decorate([
        Output('clrDgActionOverflowOpenChange'),
        tslib_1.__metadata("design:type", Object)
    ], ClrDatagridActionOverflow.prototype, "openChange", void 0);
    ClrDatagridActionOverflow = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-action-overflow',
            providers: [UNIQUE_ID_PROVIDER, ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
            template: "\n      <button class=\"datagrid-action-toggle\"\n              type=\"button\"\n              role=\"button\"\n              aria-haspopup=\"true\"\n              #anchor\n              [attr.aria-controls]=\"popoverId\"\n              [attr.aria-expanded]=\"open\"\n              [attr.aria-label]=\"commonStrings.keys.rowActions\"\n              clrPopoverAnchor\n              clrPopoverOpenCloseButton>\n          <clr-icon shape=\"ellipsis-vertical\" [attr.title]=\"commonStrings.keys.rowActions\"></clr-icon>\n      </button>\n\n      <div class=\"datagrid-action-overflow\"\n           role=\"menu\" \n           [id]=\"popoverId\"\n           [attr.aria-hidden]=\"!open\"\n           [attr.id]=\"popoverId\" \n           clrFocusTrap\n           *clrPopoverContent=\"open at smartPosition; outsideClickToClose: true; scrollToClose: true\">\n          <ng-content></ng-content>\n      </div>\n  "
        }),
        tslib_1.__param(2, Inject(PLATFORM_ID)),
        tslib_1.__param(5, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [RowActionService,
            ClrCommonStringsService,
            Object,
            NgZone,
            ClrPopoverToggleService, String])
    ], ClrDatagridActionOverflow);
    return ClrDatagridActionOverflow;
}());
export { ClrDatagridActionOverflow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtYWN0aW9uLW92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1hY3Rpb24tb3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUU5RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUduRyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUE4QnRCO0lBU0UsbUNBQ1UsZ0JBQWtDLEVBQ25DLGFBQXNDLEVBQ2hCLFVBQWtCLEVBQ3ZDLElBQVksRUFDWixrQkFBMkMsRUFDekIsU0FBaUI7UUFON0MsaUJBa0JDO1FBakJTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbkMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBeUI7UUFDekIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQWRyQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDcEMsa0JBQWEsR0FBdUI7WUFDekMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07WUFDM0IsT0FBTyxFQUFFLFlBQVksQ0FBQyxNQUFNO1NBQzdCLENBQUM7UUFxRDhDLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztRQTNDNUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFNBQVM7WUFDcEQsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsK0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxzQkFBVywyQ0FBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQ3RDLENBQUM7YUFnQkQsVUFBZ0IsSUFBYTtZQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRTtnQkFDM0MsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUM7OztPQXRCQTtJQUVPLG9EQUFnQixHQUF4QjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQzFCLFVBQVUsQ0FBQztvQkFDVCxJQUFNLFdBQVcsR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNwRixJQUFJLFdBQVcsRUFBRTt3QkFDZixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ3JCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFHRDtRQURDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzs7O3lEQU9oQztJQUV3QztRQUF4QyxNQUFNLENBQUMsK0JBQStCLENBQUM7O2lFQUFzRDtJQTVEbkYseUJBQXlCO1FBNUJyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDO1lBQzVHLFFBQVEsRUFBRSx5NEJBdUJUO1NBQ0YsQ0FBQztRQWFHLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUduQixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7aURBTFEsZ0JBQWdCO1lBQ3BCLHVCQUF1QjtZQUNKLE1BQU07WUFDakMsTUFBTTtZQUNRLHVCQUF1QjtPQWQxQyx5QkFBeUIsQ0E2RHJDO0lBQUQsZ0NBQUM7Q0FBQSxBQTdERCxJQTZEQztTQTdEWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIE5nWm9uZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUm93QWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3Jvdy1hY3Rpb24tc2VydmljZSc7XG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBVTklRVUVfSUQsIFVOSVFVRV9JRF9QUk9WSURFUiB9IGZyb20gJy4uLy4uL3V0aWxzL2lkLWdlbmVyYXRvci9pZC1nZW5lcmF0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyUG9zaXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9wb3BvdmVyL2ludGVyZmFjZXMvcG9wb3Zlci1wb3NpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyQWxpZ25tZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9lbnVtcy9hbGlnbm1lbnQuZW51bSc7XG5pbXBvcnQgeyBDbHJTaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9lbnVtcy9zaWRlLmVudW0nO1xuaW1wb3J0IHsgQ2xyQXhpcyB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvZW51bXMvYXhpcy5lbnVtJztcbmltcG9ydCB7IENsclBvcG92ZXJUb2dnbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcG9wb3Zlci9wcm92aWRlcnMvcG9wb3Zlci10b2dnbGUuc2VydmljZSc7XG5pbXBvcnQgeyBDbHJQb3BvdmVyRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyUG9wb3ZlclBvc2l0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL3BvcG92ZXIvcHJvdmlkZXJzL3BvcG92ZXItcG9zaXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxubGV0IGNsckRnQWN0aW9uSWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItZGctYWN0aW9uLW92ZXJmbG93JyxcbiAgcHJvdmlkZXJzOiBbVU5JUVVFX0lEX1BST1ZJREVSLCBDbHJQb3BvdmVyVG9nZ2xlU2VydmljZSwgQ2xyUG9wb3ZlckV2ZW50c1NlcnZpY2UsIENsclBvcG92ZXJQb3NpdGlvblNlcnZpY2VdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImRhdGFncmlkLWFjdGlvbi10b2dnbGVcIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgI2FuY2hvclxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInBvcG92ZXJJZFwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3BlblwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tbW9uU3RyaW5ncy5rZXlzLnJvd0FjdGlvbnNcIlxuICAgICAgICAgICAgICBjbHJQb3BvdmVyQW5jaG9yXG4gICAgICAgICAgICAgIGNsclBvcG92ZXJPcGVuQ2xvc2VCdXR0b24+XG4gICAgICAgICAgPGNsci1pY29uIHNoYXBlPVwiZWxsaXBzaXMtdmVydGljYWxcIiBbYXR0ci50aXRsZV09XCJjb21tb25TdHJpbmdzLmtleXMucm93QWN0aW9uc1wiPjwvY2xyLWljb24+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWFjdGlvbi1vdmVyZmxvd1wiXG4gICAgICAgICAgIHJvbGU9XCJtZW51XCIgXG4gICAgICAgICAgIFtpZF09XCJwb3BvdmVySWRcIlxuICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhb3BlblwiXG4gICAgICAgICAgIFthdHRyLmlkXT1cInBvcG92ZXJJZFwiIFxuICAgICAgICAgICBjbHJGb2N1c1RyYXBcbiAgICAgICAgICAgKmNsclBvcG92ZXJDb250ZW50PVwib3BlbiBhdCBzbWFydFBvc2l0aW9uOyBvdXRzaWRlQ2xpY2tUb0Nsb3NlOiB0cnVlOyBzY3JvbGxUb0Nsb3NlOiB0cnVlXCI+XG4gICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQWN0aW9uT3ZlcmZsb3cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHB1YmxpYyBzbWFydFBvc2l0aW9uOiBDbHJQb3BvdmVyUG9zaXRpb24gPSB7XG4gICAgYXhpczogQ2xyQXhpcy5IT1JJWk9OVEFMLFxuICAgIHNpZGU6IENsclNpZGUuQUZURVIsXG4gICAgYW5jaG9yOiBDbHJBbGlnbm1lbnQuQ0VOVEVSLFxuICAgIGNvbnRlbnQ6IENsckFsaWdubWVudC5DRU5URVIsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3dBY3Rpb25TZXJ2aWNlOiBSb3dBY3Rpb25TZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHNtYXJ0VG9nZ2xlU2VydmljZTogQ2xyUG9wb3ZlclRvZ2dsZVNlcnZpY2UsXG4gICAgQEluamVjdChVTklRVUVfSUQpIHB1YmxpYyBwb3BvdmVySWQ6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnJvd0FjdGlvblNlcnZpY2UucmVnaXN0ZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc21hcnRUb2dnbGVTZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW5TdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMub3BlbiA9IG9wZW5TdGF0ZTtcbiAgICAgICAgaWYgKG9wZW5TdGF0ZSkge1xuICAgICAgICAgIHRoaXMuZm9jdXNGaXJzdEJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5wb3BvdmVySWQgPSAnY2xyLWFjdGlvbi1tZW51JyArIGNsckRnQWN0aW9uSWQrKztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucm93QWN0aW9uU2VydmljZS51bnJlZ2lzdGVyKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5zbWFydFRvZ2dsZVNlcnZpY2Uub3BlbjtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNGaXJzdEJ1dHRvbigpOiB2b2lkIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlyc3RCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmFjdGlvbi1pdGVtJyk7XG4gICAgICAgICAgaWYgKGZpcnN0QnV0dG9uKSB7XG4gICAgICAgICAgICBmaXJzdEJ1dHRvbi5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NsckRnQWN0aW9uT3ZlcmZsb3dPcGVuJylcbiAgcHVibGljIHNldCBvcGVuKG9wZW46IGJvb2xlYW4pIHtcbiAgICBpZiAoISFvcGVuICE9PSB0aGlzLnNtYXJ0VG9nZ2xlU2VydmljZS5vcGVuKSB7XG4gICAgICAvLyBwcmV2ZW50cyBjaG9jb2xhdGUgbWVzc1xuICAgICAgdGhpcy5zbWFydFRvZ2dsZVNlcnZpY2Uub3BlbiA9ICEhb3BlbjtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KCEhb3Blbik7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgnY2xyRGdBY3Rpb25PdmVyZmxvd09wZW5DaGFuZ2UnKSBwdWJsaWMgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oZmFsc2UpO1xufVxuIl19