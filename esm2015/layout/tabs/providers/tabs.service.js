import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { TabsLayout } from '../enums/tabs-layout.enum';
let TabsService = class TabsService {
    constructor() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    register(tab) {
        this._children.push(tab);
    }
    get children() {
        return this._children;
    }
    get activeTab() {
        return this.children.find((tab) => {
            return tab.active;
        });
    }
    get overflowTabs() {
        if (this.layout === TabsLayout.VERTICAL) {
            return [];
        }
        else {
            return this.children.filter((tab) => tab.tabLink.inOverflow === true);
        }
    }
    unregister(tab) {
        const index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
};
TabsService = tslib_1.__decorate([
    Injectable()
], TabsService);
export { TabsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3RhYnMvcHJvdmlkZXJzL3RhYnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBRHhCO1FBRVUsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUVqQyxXQUFNLEdBQWUsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQWdDN0MsQ0FBQztJQTlCQyxRQUFRLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQy9FO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUdGLENBQUE7QUFuQ1ksV0FBVztJQUR2QixVQUFVLEVBQUU7R0FDQSxXQUFXLENBbUN2QjtTQW5DWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xyVGFiIH0gZnJvbSAnLi4vdGFiJztcbmltcG9ydCB7IFRhYnNMYXlvdXQgfSBmcm9tICcuLi9lbnVtcy90YWJzLWxheW91dC5lbnVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYnNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IENsclRhYltdID0gW107XG5cbiAgbGF5b3V0OiBUYWJzTGF5b3V0ID0gVGFic0xheW91dC5IT1JJWk9OVEFMO1xuXG4gIHJlZ2lzdGVyKHRhYjogQ2xyVGFiKSB7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaCh0YWIpO1xuICB9XG5cbiAgZ2V0IGNoaWxkcmVuKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZCgodGFiOiBDbHJUYWIpID0+IHtcbiAgICAgIHJldHVybiB0YWIuYWN0aXZlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG92ZXJmbG93VGFicygpIHtcbiAgICBpZiAodGhpcy5sYXlvdXQgPT09IFRhYnNMYXlvdXQuVkVSVElDQUwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKCh0YWI6IENsclRhYikgPT4gdGFiLnRhYkxpbmsuaW5PdmVyZmxvdyA9PT0gdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdW5yZWdpc3Rlcih0YWI6IENsclRhYikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKHRhYik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0YWJDb250ZW50Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbn1cbiJdfQ==