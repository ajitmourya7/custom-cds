import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
let ColumnsService = class ColumnsService {
    constructor() {
        this.columns = [];
    }
    get columnStates() {
        return this.columns.map(column => column.value);
    }
    get hasHideableColumns() {
        return this.columnStates.filter(state => state.hideable).length > 0;
    }
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    emitStateChangeAt(columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        this.emitStateChange(this.columns[columnIndex], diff);
    }
    emitStateChange(column, diff) {
        const current = column.value;
        column.next(Object.assign({}, current, diff));
    }
};
ColumnsService = tslib_1.__decorate([
    Injectable()
], ColumnsService);
export { ColumnsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBRDNCO1FBRUUsWUFBTyxHQUFtQyxFQUFFLENBQUM7SUFzQi9DLENBQUM7SUFwQkMsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCwwR0FBMEc7SUFDMUcsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxJQUFxQjtRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFvQyxFQUFFLElBQXFCO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksbUJBQU0sT0FBTyxFQUFLLElBQUksRUFBRyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRixDQUFBO0FBdkJZLGNBQWM7SUFEMUIsVUFBVSxFQUFFO0dBQ0EsY0FBYyxDQXVCMUI7U0F2QlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGVEaWZmLCBDb2x1bW5TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2x1bW5zU2VydmljZSB7XG4gIGNvbHVtbnM6IEJlaGF2aW9yU3ViamVjdDxDb2x1bW5TdGF0ZT5bXSA9IFtdO1xuXG4gIGdldCBjb2x1bW5TdGF0ZXMoKTogQ29sdW1uU3RhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucy5tYXAoY29sdW1uID0+IGNvbHVtbi52YWx1ZSk7XG4gIH1cblxuICBnZXQgaGFzSGlkZWFibGVDb2x1bW5zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtblN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuaGlkZWFibGUpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvLyBIZWxwZXIgbWV0aG9kIHRvIGVtaXQgYSBjaGFuZ2UgdG8gYSBjb2x1bW4gb25seSB3aGVuIHRoZXJlIGlzIGFuIGFjdHVhbCBkaWZmIHRvIHByb2Nlc3MgZm9yIHRoYXQgY29sdW1uXG4gIGVtaXRTdGF0ZUNoYW5nZUF0KGNvbHVtbkluZGV4OiBudW1iZXIsIGRpZmY6IENvbHVtblN0YXRlRGlmZikge1xuICAgIGlmICghdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtaXRTdGF0ZUNoYW5nZSh0aGlzLmNvbHVtbnNbY29sdW1uSW5kZXhdLCBkaWZmKTtcbiAgfVxuXG4gIGVtaXRTdGF0ZUNoYW5nZShjb2x1bW46IEJlaGF2aW9yU3ViamVjdDxDb2x1bW5TdGF0ZT4sIGRpZmY6IENvbHVtblN0YXRlRGlmZikge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBjb2x1bW4udmFsdWU7XG4gICAgY29sdW1uLm5leHQoeyAuLi5jdXJyZW50LCAuLi5kaWZmIH0pO1xuICB9XG59XG4iXX0=