import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var FocusTrapTracker = /** @class */ (function () {
    function FocusTrapTracker() {
        this._previousFocusTraps = [];
    }
    Object.defineProperty(FocusTrapTracker.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this._previousFocusTraps.push(this._current);
            this._current = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTrapTracker.prototype, "nbFocusTrappers", {
        get: function () {
            return this._previousFocusTraps.length;
        },
        enumerable: true,
        configurable: true
    });
    FocusTrapTracker.prototype.activatePreviousTrapper = function () {
        this._current = this._previousFocusTraps.pop();
    };
    FocusTrapTracker.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });
    FocusTrapTracker = tslib_1.__decorate([
        Injectable({ providedIn: 'root' })
    ], FocusTrapTracker);
    return FocusTrapTracker;
}());
export { FocusTrapTracker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC10cmFja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAtdHJhY2tlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0M7SUFEQTtRQUVVLHdCQUFtQixHQUF5QixFQUFFLENBQUM7S0FtQnhEO0lBaEJDLHNCQUFJLHFDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVksS0FBeUI7WUFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BTEE7SUFPRCxzQkFBSSw2Q0FBZTthQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVELGtEQUF1QixHQUF2QjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pELENBQUM7O0lBbkJVLGdCQUFnQjtRQUQ1QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDdEIsZ0JBQWdCLENBb0I1QjsyQkE3QkQ7Q0E2QkMsQUFwQkQsSUFvQkM7U0FwQlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNUcmFwRGlyZWN0aXZlIH0gZnJvbSAnLi9mb2N1cy10cmFwLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwVHJhY2tlciB7XG4gIHByaXZhdGUgX3ByZXZpb3VzRm9jdXNUcmFwczogRm9jdXNUcmFwRGlyZWN0aXZlW10gPSBbXTtcbiAgcHJpdmF0ZSBfY3VycmVudDogRm9jdXNUcmFwRGlyZWN0aXZlO1xuXG4gIGdldCBjdXJyZW50KCk6IEZvY3VzVHJhcERpcmVjdGl2ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICBzZXQgY3VycmVudCh2YWx1ZTogRm9jdXNUcmFwRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5fcHJldmlvdXNGb2N1c1RyYXBzLnB1c2godGhpcy5fY3VycmVudCk7XG4gICAgdGhpcy5fY3VycmVudCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG5iRm9jdXNUcmFwcGVycygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wcmV2aW91c0ZvY3VzVHJhcHMubGVuZ3RoO1xuICB9XG5cbiAgYWN0aXZhdGVQcmV2aW91c1RyYXBwZXIoKSB7XG4gICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX3ByZXZpb3VzRm9jdXNUcmFwcy5wb3AoKTtcbiAgfVxufVxuIl19