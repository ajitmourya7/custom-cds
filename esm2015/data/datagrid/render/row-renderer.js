import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ContentChildren, Directive, QueryList } from '@angular/core';
import { DatagridCellRenderer } from './cell-renderer';
import { ColumnsService } from '../providers/columns.service';
let DatagridRowRenderer = class DatagridRowRenderer {
    constructor(columnsService) {
        this.columnsService = columnsService;
        this.subscriptions = [];
    }
    ngAfterContentInit() {
        this.setColumnState(); // case #3 and #4
        this.subscriptions.push(this.cells.changes.subscribe(() => {
            this.setColumnState(); // case #2
            // Note on case #2: In the case of dynamic columns, when one column (header/cell together) gets deleted,
            // this.cells.changes emits before this.columnsService.columns gets updated in MainRenderer
            // when this.headers.changes emits as well. So that means there will be n+1 column state providers
            // when this.cells.changes emits. Hence, we should quit earlier there. But this method will be called
            // right after again when this.headers.changes emits. By then, there will be the same number of column state
            // providers as column headers.
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    setColumnState() {
        // This method runs in four cases:
        // 1. When the initial rows appear on the first page.
        //    In this case, the method will be called in DatagridMainRenderer.
        // 2. When columns (corresponding header/cells) get added and deleted.
        //    In this case, the method will be called in DatagridMainRenderer. (Read the note on this case above).
        // 3. When rows load asynchronously.
        //    In this case, the method will be called in this class.
        // 4. When rows load after switching pages.
        //    In this case, the method will be called in this class (Basically, same as the case 3).
        if (this.cells.length === this.columnsService.columns.length) {
            this.cells.forEach((cell, index) => {
                if (this.columnsService.columns[index]) {
                    cell.columnState = this.columnsService.columns[index];
                }
            });
        }
    }
};
tslib_1.__decorate([
    ContentChildren(DatagridCellRenderer),
    tslib_1.__metadata("design:type", QueryList)
], DatagridRowRenderer.prototype, "cells", void 0);
DatagridRowRenderer = tslib_1.__decorate([
    Directive({ selector: 'clr-dg-row, clr-dg-row-detail' }),
    tslib_1.__metadata("design:paramtypes", [ColumnsService])
], DatagridRowRenderer);
export { DatagridRowRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9yZW5kZXIvcm93LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJOUQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFHOUIsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBaUIxQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFqQlUsQ0FBQztJQUV0RCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsaUJBQWlCO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLFVBQVU7WUFDakMsd0dBQXdHO1lBQ3hHLDJGQUEyRjtZQUMzRixrR0FBa0c7WUFDbEcscUdBQXFHO1lBQ3JHLDRHQUE0RztZQUM1RywrQkFBK0I7UUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFJRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sY0FBYztRQUNuQixrQ0FBa0M7UUFDbEMscURBQXFEO1FBQ3JELHNFQUFzRTtRQUN0RSxzRUFBc0U7UUFDdEUsMEdBQTBHO1FBQzFHLG9DQUFvQztRQUNwQyw0REFBNEQ7UUFDNUQsMkNBQTJDO1FBQzNDLDRGQUE0RjtRQUM1RixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUEzQ3dDO0lBQXRDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQztzQ0FBZ0IsU0FBUztrREFBdUI7QUFEM0UsbUJBQW1CO0lBRC9CLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxDQUFDOzZDQUluQixjQUFjO0dBSHZDLG1CQUFtQixDQTRDL0I7U0E1Q1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFncmlkQ2VsbFJlbmRlcmVyIH0gZnJvbSAnLi9jZWxsLXJlbmRlcmVyJztcbmltcG9ydCB7IENvbHVtbnNTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbHVtbnMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnY2xyLWRnLXJvdywgY2xyLWRnLXJvdy1kZXRhaWwnIH0pXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRSb3dSZW5kZXJlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRDZWxsUmVuZGVyZXIpIHByaXZhdGUgY2VsbHM6IFF1ZXJ5TGlzdDxEYXRhZ3JpZENlbGxSZW5kZXJlcj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5zU2VydmljZTogQ29sdW1uc1NlcnZpY2UpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2V0Q29sdW1uU3RhdGUoKTsgLy8gY2FzZSAjMyBhbmQgIzRcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuY2VsbHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldENvbHVtblN0YXRlKCk7IC8vIGNhc2UgIzJcbiAgICAgICAgLy8gTm90ZSBvbiBjYXNlICMyOiBJbiB0aGUgY2FzZSBvZiBkeW5hbWljIGNvbHVtbnMsIHdoZW4gb25lIGNvbHVtbiAoaGVhZGVyL2NlbGwgdG9nZXRoZXIpIGdldHMgZGVsZXRlZCxcbiAgICAgICAgLy8gdGhpcy5jZWxscy5jaGFuZ2VzIGVtaXRzIGJlZm9yZSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMgZ2V0cyB1cGRhdGVkIGluIE1haW5SZW5kZXJlclxuICAgICAgICAvLyB3aGVuIHRoaXMuaGVhZGVycy5jaGFuZ2VzIGVtaXRzIGFzIHdlbGwuIFNvIHRoYXQgbWVhbnMgdGhlcmUgd2lsbCBiZSBuKzEgY29sdW1uIHN0YXRlIHByb3ZpZGVyc1xuICAgICAgICAvLyB3aGVuIHRoaXMuY2VsbHMuY2hhbmdlcyBlbWl0cy4gSGVuY2UsIHdlIHNob3VsZCBxdWl0IGVhcmxpZXIgdGhlcmUuIEJ1dCB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZFxuICAgICAgICAvLyByaWdodCBhZnRlciBhZ2FpbiB3aGVuIHRoaXMuaGVhZGVycy5jaGFuZ2VzIGVtaXRzLiBCeSB0aGVuLCB0aGVyZSB3aWxsIGJlIHRoZSBzYW1lIG51bWJlciBvZiBjb2x1bW4gc3RhdGVcbiAgICAgICAgLy8gcHJvdmlkZXJzIGFzIGNvbHVtbiBoZWFkZXJzLlxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sdW1uU3RhdGUoKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgcnVucyBpbiBmb3VyIGNhc2VzOlxuICAgIC8vIDEuIFdoZW4gdGhlIGluaXRpYWwgcm93cyBhcHBlYXIgb24gdGhlIGZpcnN0IHBhZ2UuXG4gICAgLy8gICAgSW4gdGhpcyBjYXNlLCB0aGUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGluIERhdGFncmlkTWFpblJlbmRlcmVyLlxuICAgIC8vIDIuIFdoZW4gY29sdW1ucyAoY29ycmVzcG9uZGluZyBoZWFkZXIvY2VsbHMpIGdldCBhZGRlZCBhbmQgZGVsZXRlZC5cbiAgICAvLyAgICBJbiB0aGlzIGNhc2UsIHRoZSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgaW4gRGF0YWdyaWRNYWluUmVuZGVyZXIuIChSZWFkIHRoZSBub3RlIG9uIHRoaXMgY2FzZSBhYm92ZSkuXG4gICAgLy8gMy4gV2hlbiByb3dzIGxvYWQgYXN5bmNocm9ub3VzbHkuXG4gICAgLy8gICAgSW4gdGhpcyBjYXNlLCB0aGUgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGluIHRoaXMgY2xhc3MuXG4gICAgLy8gNC4gV2hlbiByb3dzIGxvYWQgYWZ0ZXIgc3dpdGNoaW5nIHBhZ2VzLlxuICAgIC8vICAgIEluIHRoaXMgY2FzZSwgdGhlIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBpbiB0aGlzIGNsYXNzIChCYXNpY2FsbHksIHNhbWUgYXMgdGhlIGNhc2UgMykuXG4gICAgaWYgKHRoaXMuY2VsbHMubGVuZ3RoID09PSB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnNbaW5kZXhdKSB7XG4gICAgICAgICAgY2VsbC5jb2x1bW5TdGF0ZSA9IHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1uc1tpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19