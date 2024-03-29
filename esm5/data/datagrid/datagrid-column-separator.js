import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ColumnResizerService } from './providers/column-resizer.service';
import { TableSizeService } from './providers/table-size.service';
import { UNIQUE_ID_PROVIDER, UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
var ClrDatagridColumnSeparator = /** @class */ (function () {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    function ClrDatagridColumnSeparator(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
        this.columnResizerService = columnResizerService;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.document = document;
        this.columnSeparatorId = columnSeparatorId;
    }
    ClrDatagridColumnSeparator.prototype.showTracker = function (resizeTrackerEl) {
        this.columnResizerService.startResize();
        var tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    };
    ClrDatagridColumnSeparator.prototype.moveTracker = function (event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(" + this.columnResizerService.resizedBy + "px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    };
    ClrDatagridColumnSeparator.prototype.hideTracker = function (resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(0px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    };
    ClrDatagridColumnSeparator.prototype.redFlagTracker = function (resizeTrackerEl) {
        var isWithinMaxResizeRange;
        // @TODO(JEREMY) Review this, it will always be true because above is always null
        if (isWithinMaxResizeRange !== this.columnResizerService.isWithinMaxResizeRange) {
            isWithinMaxResizeRange = this.columnResizerService.isWithinMaxResizeRange;
            if (!isWithinMaxResizeRange) {
                this.renderer.addClass(resizeTrackerEl, 'exceeded-max');
            }
            else {
                this.renderer.removeClass(resizeTrackerEl, 'exceeded-max');
            }
        }
    };
    ClrDatagridColumnSeparator = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-column-separator',
            template: "\n    <div class=\"datagrid-column-handle\" aria-hidden=\"true\"\n      clrDraggable \n      [clrGroup]=\"columnSeparatorId\" \n      (clrDragStart)=\"showTracker(resizeTrackerEl)\" \n      (clrDragMove)=\"moveTracker($event, resizeTrackerEl)\" \n      (clrDragEnd)=\"hideTracker(resizeTrackerEl)\"></div>\n    <div class=\"datagrid-column-resize-tracker\" #resizeTrackerEl></div>\n    ",
            host: {
                '[class.datagrid-column-separator]': 'true',
            },
            providers: [UNIQUE_ID_PROVIDER]
        }),
        tslib_1.__param(3, Inject(DOCUMENT)),
        tslib_1.__param(4, Inject(UNIQUE_ID)),
        tslib_1.__metadata("design:paramtypes", [ColumnResizerService,
            Renderer2,
            TableSizeService, Object, String])
    ], ClrDatagridColumnSeparator);
    return ClrDatagridColumnSeparator;
}());
export { ClrDatagridColumnSeparator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBa0I5RjtJQUNFLGlFQUFpRTtJQUNqRSw2REFBNkQ7SUFDN0Qsb0NBQ1Usb0JBQTBDLEVBQzFDLFFBQW1CLEVBQ25CLGdCQUFrQyxFQUNoQixRQUFhLEVBQ2IsaUJBQXlCO1FBSjNDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDYixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7SUFDbEQsQ0FBQztJQUVHLGdEQUFXLEdBQWxCLFVBQW1CLGVBQTRCO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLGdEQUFXLEdBQWxCLFVBQW1CLEtBQXdCLEVBQUUsZUFBNEI7UUFDdkUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFjLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLFFBQUssQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxnREFBVyxHQUFsQixVQUFtQixlQUE0QjtRQUM3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxtREFBYyxHQUF0QixVQUF1QixlQUE0QjtRQUNqRCxJQUFJLHNCQUErQixDQUFDO1FBQ3BDLGlGQUFpRjtRQUNqRixJQUFJLHNCQUFzQixLQUFLLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvRSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7WUFDMUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDekQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0Y7SUFDSCxDQUFDO0lBM0NVLDBCQUEwQjtRQWhCdEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsb1lBUVA7WUFDSCxJQUFJLEVBQUU7Z0JBQ0osbUNBQW1DLEVBQUUsTUFBTTthQUM1QztZQUNELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2hDLENBQUM7UUFRRyxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lEQUpZLG9CQUFvQjtZQUNoQyxTQUFTO1lBQ0QsZ0JBQWdCO09BTmpDLDBCQUEwQixDQTRDdEM7SUFBRCxpQ0FBQztDQUFBLEFBNUNELElBNENDO1NBNUNZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRHJhZ0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZHJhZy1hbmQtZHJvcC9kcmFnLWV2ZW50JztcbmltcG9ydCB7IENvbHVtblJlc2l6ZXJTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvY29sdW1uLXJlc2l6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvdGFibGUtc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVOSVFVRV9JRF9QUk9WSURFUiwgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xyLWRnLWNvbHVtbi1zZXBhcmF0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4taGFuZGxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgIGNsckRyYWdnYWJsZSBcbiAgICAgIFtjbHJHcm91cF09XCJjb2x1bW5TZXBhcmF0b3JJZFwiIFxuICAgICAgKGNsckRyYWdTdGFydCk9XCJzaG93VHJhY2tlcihyZXNpemVUcmFja2VyRWwpXCIgXG4gICAgICAoY2xyRHJhZ01vdmUpPVwibW92ZVRyYWNrZXIoJGV2ZW50LCByZXNpemVUcmFja2VyRWwpXCIgXG4gICAgICAoY2xyRHJhZ0VuZCk9XCJoaWRlVHJhY2tlcihyZXNpemVUcmFja2VyRWwpXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi1yZXNpemUtdHJhY2tlclwiICNyZXNpemVUcmFja2VyRWw+PC9kaXY+XG4gICAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZGF0YWdyaWQtY29sdW1uLXNlcGFyYXRvcl0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1VOSVFVRV9JRF9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uU2VwYXJhdG9yIHtcbiAgLy8gRXZlcnkgY29sdW1uIGRyYWdnYWJsZSBzZXBhcmF0b3Igc2hvdWxkIGhhdmUgaXRzIG93biB1bmlxdWUgSURcbiAgLy8gaW4gb3JkZXIgdG8gbm90IGNvbmZsaWN0IHdpdGggb3RoZXIgZHJhZ2dhYmxlcy9kcm9wcGFibGVzLlxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbHVtblJlc2l6ZXJTZXJ2aWNlOiBDb2x1bW5SZXNpemVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSB0YWJsZVNpemVTZXJ2aWNlOiBUYWJsZVNpemVTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KFVOSVFVRV9JRCkgcHVibGljIGNvbHVtblNlcGFyYXRvcklkOiBzdHJpbmdcbiAgKSB7fVxuXG4gIHB1YmxpYyBzaG93VHJhY2tlcihyZXNpemVUcmFja2VyRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5zdGFydFJlc2l6ZSgpO1xuICAgIGNvbnN0IHRhYmxlSGVpZ2h0ID0gdGhpcy50YWJsZVNpemVTZXJ2aWNlLmdldENvbHVtbkRyYWdIZWlnaHQoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ2hlaWdodCcsIHRhYmxlSGVpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVHJhY2tlcihldmVudDogQ2xyRHJhZ0V2ZW50PGFueT4sIHJlc2l6ZVRyYWNrZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbHVtblJlc2l6ZXJTZXJ2aWNlLmNhbGN1bGF0ZVJlc2l6ZShldmVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlWCgke3RoaXMuY29sdW1uUmVzaXplclNlcnZpY2UucmVzaXplZEJ5fXB4KWApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgJ2NvbC1yZXNpemUnKTtcbiAgICB0aGlzLnJlZEZsYWdUcmFja2VyKHJlc2l6ZVRyYWNrZXJFbCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZVRyYWNrZXIocmVzaXplVHJhY2tlckVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuY29sdW1uUmVzaXplclNlcnZpY2UuZW5kUmVzaXplKCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShyZXNpemVUcmFja2VyRWwsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHJlc2l6ZVRyYWNrZXJFbCwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGVYKDBweClgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdhdXRvJyk7XG4gIH1cblxuICBwcml2YXRlIHJlZEZsYWdUcmFja2VyKHJlc2l6ZVRyYWNrZXJFbDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgaXNXaXRoaW5NYXhSZXNpemVSYW5nZTogYm9vbGVhbjtcbiAgICAvLyBAVE9ETyhKRVJFTVkpIFJldmlldyB0aGlzLCBpdCB3aWxsIGFsd2F5cyBiZSB0cnVlIGJlY2F1c2UgYWJvdmUgaXMgYWx3YXlzIG51bGxcbiAgICBpZiAoaXNXaXRoaW5NYXhSZXNpemVSYW5nZSAhPT0gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5pc1dpdGhpbk1heFJlc2l6ZVJhbmdlKSB7XG4gICAgICBpc1dpdGhpbk1heFJlc2l6ZVJhbmdlID0gdGhpcy5jb2x1bW5SZXNpemVyU2VydmljZS5pc1dpdGhpbk1heFJlc2l6ZVJhbmdlO1xuICAgICAgaWYgKCFpc1dpdGhpbk1heFJlc2l6ZVJhbmdlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmVzaXplVHJhY2tlckVsLCAnZXhjZWVkZWQtbWF4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHJlc2l6ZVRyYWNrZXJFbCwgJ2V4Y2VlZGVkLW1heCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19