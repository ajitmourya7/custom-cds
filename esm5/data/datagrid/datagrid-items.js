import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgForOf } from '@angular/common';
import { Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef, } from '@angular/core';
import { Items } from './providers/items';
var ClrDatagridItems = /** @class */ (function () {
    function ClrDatagridItems(template, differs, items, vcr) {
        var _this = this;
        this.template = template;
        this.differs = differs;
        this.items = items;
        this.vcr = vcr;
        this.differ = null;
        this.subscriptions = [];
        items.smartenUp();
        this.iterableProxy = new NgForOf(this.vcr, this.template, this.differs);
        this.subscriptions.push(items.change.subscribe(function (newItems) {
            _this.iterableProxy.ngForOf = newItems;
            _this.iterableProxy.ngDoCheck();
        }));
    }
    Object.defineProperty(ClrDatagridItems.prototype, "rawItems", {
        set: function (items) {
            this._rawItems = items ? items : []; // local copy for ngOnChange diffing
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridItems.prototype, "trackBy", {
        set: function (value) {
            this.iterableProxy.ngForTrackBy = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridItems.prototype.ngDoCheck = function () {
        if (!this.differ) {
            this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
        }
        if (this.differ) {
            var changes = this.differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this.items.all = this._rawItems;
            }
        }
    };
    ClrDatagridItems.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input('clrDgItemsOf'),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], ClrDatagridItems.prototype, "rawItems", null);
    tslib_1.__decorate([
        Input('clrDgItemsTrackBy'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Function])
    ], ClrDatagridItems.prototype, "trackBy", null);
    ClrDatagridItems = tslib_1.__decorate([
        Directive({
            selector: '[clrDgItems][clrDgItemsOf]',
        }),
        tslib_1.__metadata("design:paramtypes", [TemplateRef,
            IterableDiffers,
            Items,
            ViewContainerRef])
    ], ClrDatagridItems);
    return ClrDatagridItems;
}());
export { ClrDatagridItems };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2RhdGFncmlkLWl0ZW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLE9BQU8sRUFBa0IsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFFTCxlQUFlLEVBQ2YsV0FBVyxFQUVYLGdCQUFnQixHQUVqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNMUM7SUFnQkUsMEJBQ1MsUUFBd0MsRUFDdkMsT0FBd0IsRUFDeEIsS0FBWSxFQUNaLEdBQXFCO1FBSi9CLGlCQWNDO1FBYlEsYUFBUSxHQUFSLFFBQVEsQ0FBZ0M7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBakJ2QixXQUFNLEdBQTZCLElBQUksQ0FBQztRQUN4QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFrQnpDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxDQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTtZQUM3QixLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7WUFDdEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQXZCRCxzQkFBVyxzQ0FBUTthQUFuQixVQUFvQixLQUFVO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLG9DQUFvQztRQUMzRSxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHFDQUFPO2FBQVgsVUFBWSxLQUF5QjtZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFrQkQsb0NBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELElBQUksT0FBTyxFQUFFO2dCQUNYLHNDQUFzQztnQkFDdEMsc0RBQXNEO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQXpDRDtRQURDLEtBQUssQ0FBQyxjQUFjLENBQUM7OztvREFHckI7SUFHRDtRQURDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQzs7O21EQUcxQjtJQWRVLGdCQUFnQjtRQUg1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1NBQ3ZDLENBQUM7aURBa0JtQixXQUFXO1lBQ1gsZUFBZTtZQUNqQixLQUFLO1lBQ1AsZ0JBQWdCO09BcEJwQixnQkFBZ0IsQ0FpRDVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpERCxJQWlEQztTQWpEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBOZ0Zvck9mLCBOZ0Zvck9mQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIElucHV0LFxuICBJdGVyYWJsZURpZmZlcixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHJhY2tCeUZ1bmN0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gJy4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRGdJdGVtc11bY2xyRGdJdGVtc09mXScsXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkSXRlbXM8VD4gaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGl0ZXJhYmxlUHJveHk6IE5nRm9yT2Y8VD47XG4gIHByaXZhdGUgX3Jhd0l0ZW1zOiBUW107XG4gIHByaXZhdGUgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgQElucHV0KCdjbHJEZ0l0ZW1zT2YnKVxuICBwdWJsaWMgc2V0IHJhd0l0ZW1zKGl0ZW1zOiBUW10pIHtcbiAgICB0aGlzLl9yYXdJdGVtcyA9IGl0ZW1zID8gaXRlbXMgOiBbXTsgLy8gbG9jYWwgY29weSBmb3IgbmdPbkNoYW5nZSBkaWZmaW5nXG4gIH1cblxuICBASW5wdXQoJ2NsckRnSXRlbXNUcmFja0J5JylcbiAgc2V0IHRyYWNrQnkodmFsdWU6IFRyYWNrQnlGdW5jdGlvbjxUPikge1xuICAgIHRoaXMuaXRlcmFibGVQcm94eS5uZ0ZvclRyYWNrQnkgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8TmdGb3JPZkNvbnRleHQ8VD4+LFxuICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByaXZhdGUgaXRlbXM6IEl0ZW1zLFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIGl0ZW1zLnNtYXJ0ZW5VcCgpO1xuICAgIHRoaXMuaXRlcmFibGVQcm94eSA9IG5ldyBOZ0Zvck9mPFQ+KHRoaXMudmNyLCB0aGlzLnRlbXBsYXRlLCB0aGlzLmRpZmZlcnMpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgaXRlbXMuY2hhbmdlLnN1YnNjcmliZShuZXdJdGVtcyA9PiB7XG4gICAgICAgIHRoaXMuaXRlcmFibGVQcm94eS5uZ0Zvck9mID0gbmV3SXRlbXM7XG4gICAgICAgIHRoaXMuaXRlcmFibGVQcm94eS5uZ0RvQ2hlY2soKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAoIXRoaXMuZGlmZmVyKSB7XG4gICAgICB0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuX3Jhd0l0ZW1zKS5jcmVhdGUodGhpcy5pdGVyYWJsZVByb3h5Lm5nRm9yVHJhY2tCeSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5fcmF3SXRlbXMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgLy8gVE9ETzogbm90IHZlcnkgZWZmaWNpZW50IHJpZ2h0IG5vdyxcbiAgICAgICAgLy8gYnV0IHByZW1hdHVyZSBvcHRpbWl6YXRpb24gaXMgdGhlIHJvb3Qgb2YgYWxsIGV2aWwuXG4gICAgICAgIHRoaXMuaXRlbXMuYWxsID0gdGhpcy5fcmF3SXRlbXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19