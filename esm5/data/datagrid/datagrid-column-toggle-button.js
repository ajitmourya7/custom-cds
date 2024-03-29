import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Output } from '@angular/core';
import { ColumnsService } from './providers/columns.service';
import { Observable } from 'rxjs';
import { DatagridColumnChanges } from './enums/column-changes.enum';
var ClrDatagridColumnToggleButton = /** @class */ (function () {
    function ClrDatagridColumnToggleButton(columnsService) {
        this.columnsService = columnsService;
        this.allSelected = new EventEmitter();
    }
    Object.defineProperty(ClrDatagridColumnToggleButton.prototype, "clrAllSelected", {
        get: function () {
            return this.allSelected.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggleButton.prototype.hideableColumns = function () {
        return this.columnsService.columns.filter(function (column) { return column.value.hideable; });
    };
    Object.defineProperty(ClrDatagridColumnToggleButton.prototype, "allHideablesVisible", {
        get: function () {
            return this.hideableColumns().filter(function (column) { return column.value.hidden; }).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggleButton.prototype.selectAll = function () {
        var _this = this;
        this.hideableColumns().forEach(function (hideableColumn) {
            return _this.columnsService.emitStateChange(hideableColumn, {
                hidden: false,
                changes: [DatagridColumnChanges.HIDDEN],
            });
        });
        this.allSelected.next(true);
    };
    tslib_1.__decorate([
        Output('clrAllSelected'),
        tslib_1.__metadata("design:type", Observable),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClrDatagridColumnToggleButton.prototype, "clrAllSelected", null);
    ClrDatagridColumnToggleButton = tslib_1.__decorate([
        Component({
            selector: 'clr-dg-column-toggle-button',
            template: "\n    <button class=\"btn btn-sm btn-link switch-button\"\n            (click)=\"selectAll()\"\n            [disabled]=\"allHideablesVisible\"\n            type=\"button\">\n      <ng-content></ng-content>\n    </button>\n  "
        })
        /** @deprecated since 2.0, remove in 3.0 */
        ,
        tslib_1.__metadata("design:paramtypes", [ColumnsService])
    ], ClrDatagridColumnToggleButton);
    return ClrDatagridColumnToggleButton;
}());
export { ClrDatagridColumnToggleButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLXRvZ2dsZS1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLWNvbHVtbi10b2dnbGUtYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxPQUFPLEVBQW1CLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQWNwRTtJQUNFLHVDQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFMUMsZ0JBQVcsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUZOLENBQUM7SUFLdEQsc0JBQUkseURBQWM7YUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFTyx1REFBZSxHQUF2QjtRQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsc0JBQUksOERBQW1CO2FBQXZCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ25GLENBQUM7OztPQUFBO0lBRUQsaURBQVMsR0FBVDtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWM7WUFDM0MsT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUU7Z0JBQ2xELE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQzthQUN4QyxDQUFDO1FBSEYsQ0FHRSxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBcEJEO1FBREMsTUFBTSxDQUFDLGdCQUFnQixDQUFDOzBDQUNILFVBQVU7O3VFQUUvQjtJQVJVLDZCQUE2QjtRQVp6QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFFBQVEsRUFBRSxrT0FPVDtTQUNGLENBQUM7UUFDRiwyQ0FBMkM7O2lEQUVMLGNBQWM7T0FEdkMsNkJBQTZCLENBMkJ6QztJQUFELG9DQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0EzQlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9jb2x1bW5zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sdW1uU3RhdGUgfSBmcm9tICcuL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4vZW51bXMvY29sdW1uLWNoYW5nZXMuZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4tdG9nZ2xlLWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmsgc3dpdGNoLWJ1dHRvblwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0QWxsKClcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImFsbEhpZGVhYmxlc1Zpc2libGVcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvYnV0dG9uPlxuICBgLFxufSlcbi8qKiBAZGVwcmVjYXRlZCBzaW5jZSAyLjAsIHJlbW92ZSBpbiAzLjAgKi9cbmV4cG9ydCBjbGFzcyBDbHJEYXRhZ3JpZENvbHVtblRvZ2dsZUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sdW1uc1NlcnZpY2U6IENvbHVtbnNTZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgYWxsU2VsZWN0ZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgnY2xyQWxsU2VsZWN0ZWQnKVxuICBnZXQgY2xyQWxsU2VsZWN0ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuYWxsU2VsZWN0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVhYmxlQ29sdW1ucygpOiBCZWhhdmlvclN1YmplY3Q8Q29sdW1uU3RhdGU+W10ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnNTZXJ2aWNlLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUuaGlkZWFibGUpO1xuICB9XG5cbiAgZ2V0IGFsbEhpZGVhYmxlc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZWFibGVDb2x1bW5zKCkuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4udmFsdWUuaGlkZGVuKS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5oaWRlYWJsZUNvbHVtbnMoKS5mb3JFYWNoKGhpZGVhYmxlQ29sdW1uID0+XG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZShoaWRlYWJsZUNvbHVtbiwge1xuICAgICAgICBoaWRkZW46IGZhbHNlLFxuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLkhJRERFTl0sXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZC5uZXh0KHRydWUpO1xuICB9XG59XG4iXX0=