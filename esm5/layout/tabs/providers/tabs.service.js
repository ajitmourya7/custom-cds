import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { TabsLayout } from '../enums/tabs-layout.enum';
var TabsService = /** @class */ (function () {
    function TabsService() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    TabsService.prototype.register = function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        get: function () {
            return this.children.find(function (tab) {
                return tab.active;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        get: function () {
            if (this.layout === TabsLayout.VERTICAL) {
                return [];
            }
            else {
                return this.children.filter(function (tab) { return tab.tabLink.inOverflow === true; });
            }
        },
        enumerable: true,
        configurable: true
    });
    TabsService.prototype.unregister = function (tab) {
        var index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    TabsService = tslib_1.__decorate([
        Injectable()
    ], TabsService);
    return TabsService;
}());
export { TabsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RDtJQURBO1FBRVUsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUVqQyxXQUFNLEdBQWUsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQWdDN0MsQ0FBQztJQTlCQyw4QkFBUSxHQUFSLFVBQVMsR0FBVztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQUksaUNBQVE7YUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBVztnQkFDcEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBWTthQUFoQjtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUN2QyxPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFXLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQS9CLENBQStCLENBQUMsQ0FBQzthQUMvRTtRQUNILENBQUM7OztPQUFBO0lBRUQsZ0NBQVUsR0FBVixVQUFXLEdBQVc7UUFDcEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBaENVLFdBQVc7UUFEdkIsVUFBVSxFQUFFO09BQ0EsV0FBVyxDQW1DdkI7SUFBRCxrQkFBQztDQUFBLEFBbkNELElBbUNDO1NBbkNZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbHJUYWIgfSBmcm9tICcuLi90YWInO1xuaW1wb3J0IHsgVGFic0xheW91dCB9IGZyb20gJy4uL2VudW1zL3RhYnMtbGF5b3V0LmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFic1NlcnZpY2Uge1xuICBwcml2YXRlIF9jaGlsZHJlbjogQ2xyVGFiW10gPSBbXTtcblxuICBsYXlvdXQ6IFRhYnNMYXlvdXQgPSBUYWJzTGF5b3V0LkhPUklaT05UQUw7XG5cbiAgcmVnaXN0ZXIodGFiOiBDbHJUYWIpIHtcbiAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHRhYik7XG4gIH1cblxuICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maW5kKCh0YWI6IENsclRhYikgPT4ge1xuICAgICAgcmV0dXJuIHRhYi5hY3RpdmU7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3ZlcmZsb3dUYWJzKCkge1xuICAgIGlmICh0aGlzLmxheW91dCA9PT0gVGFic0xheW91dC5WRVJUSUNBTCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoKHRhYjogQ2xyVGFiKSA9PiB0YWIudGFiTGluay5pbk92ZXJmbG93ID09PSB0cnVlKTtcbiAgICB9XG4gIH1cblxuICB1bnJlZ2lzdGVyKHRhYjogQ2xyVGFiKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YodGFiKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRhYkNvbnRlbnRWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19