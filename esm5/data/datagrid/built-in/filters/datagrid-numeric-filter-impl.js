/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Subject } from 'rxjs';
import { DatagridPropertyNumericFilter } from './datagrid-property-numeric-filter';
var DatagridNumericFilterImpl = /** @class */ (function () {
    function DatagridNumericFilterImpl(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject();
        /**
         * Internal values and accessor
         */
        this._low = null;
        this._high = null;
    }
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "value", {
        /**
         * Common setters for the input values, including individual limits and
         * both at the same time.  Value is singular to make the interface similar
         * to the built-in string filter.
         */
        get: function () {
            return [this._low, this._high];
        },
        set: function (vals) {
            var low = vals[0];
            var high = vals[1];
            if (low !== this._low || high !== this._high) {
                this._low = low;
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "low", {
        get: function () {
            return this._low;
        },
        set: function (low) {
            if (low !== this._low) {
                this._low = low;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "high", {
        get: function () {
            return this._high;
        },
        set: function (high) {
            if (high !== this._high) {
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     */
    DatagridNumericFilterImpl.prototype.isActive = function () {
        return this._low !== null || this.high !== null;
    };
    /**
     * Tests if an item matches a search text
     */
    DatagridNumericFilterImpl.prototype.accepts = function (item) {
        // We have a filter function in case someone wants to implement a numeric
        // filter that always passes nulls or similar
        return this.filterFn.accepts(item, this._low, this._high);
    };
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "state", {
        get: function () {
            if (this.filterFn instanceof DatagridPropertyNumericFilter) {
                return {
                    property: this.filterFn.prop,
                    low: this._low,
                    high: this._high,
                };
            }
            return this;
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilterImpl.prototype.equals = function (other) {
        if (other instanceof DatagridNumericFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyNumericFilter) {
                return (this.filterFn instanceof DatagridPropertyNumericFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.low === this._low &&
                    other.high === this._high);
            }
        }
    };
    return DatagridNumericFilterImpl;
}());
export { DatagridNumericFilterImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5GO0lBQ0UsbUNBQW1CLFFBQThDO1FBQTlDLGFBQVEsR0FBUixRQUFRLENBQXNDO1FBRWpFOztXQUVHO1FBQ0ssYUFBUSxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBTW5EOztXQUVHO1FBQ0ssU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQVcsSUFBSSxDQUFDO0lBZnVDLENBQUM7SUFPckUsc0JBQVcsOENBQU87UUFEbEIscUZBQXFGO2FBQ3JGO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBY0Qsc0JBQVcsNENBQUs7UUFOaEI7Ozs7V0FJRzthQUVIO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7YUFFRCxVQUFpQixJQUFzQjtZQUNyQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BVkE7SUFZRCxzQkFBVywwQ0FBRzthQWNkO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFoQkQsVUFBZSxHQUFXO1lBQ3hCLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDN0M7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDJDQUFJO2FBV2Y7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQWJELFVBQWdCLElBQVk7WUFDMUIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM3QztRQUNILENBQUM7OztPQUFBO0lBVUQ7O09BRUc7SUFDSSw0Q0FBUSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQ0FBTyxHQUFkLFVBQWUsSUFBTztRQUNwQix5RUFBeUU7UUFDekUsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBVyw0Q0FBSzthQUFoQjtZQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSw2QkFBNkIsRUFBRTtnQkFDMUQsT0FBTztvQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO29CQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNqQixDQUFDO2FBQ0g7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRU0sMENBQU0sR0FBYixVQUFjLEtBQXlDO1FBQ3JELElBQUksS0FBSyxZQUFZLHlCQUF5QixFQUFFO1lBQzlDLElBQUksS0FBSyxDQUFDLFFBQVEsWUFBWSw2QkFBNkIsRUFBRTtnQkFDM0QsT0FBTyxDQUNMLElBQUksQ0FBQyxRQUFRLFlBQVksNkJBQTZCO29CQUN0RCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBQzFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FDMUIsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBbkdELElBbUdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9udW1lcmljLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgfSBmcm9tICcuL2RhdGFncmlkLXByb3BlcnR5LW51bWVyaWMtZmlsdGVyJztcblxuZXhwb3J0IGNsYXNzIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VCA9IGFueT4gaW1wbGVtZW50cyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXJGbjogQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlPFQ+KSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSByZXF1aXJlZCBhcyBwYXJ0IG9mIHRoZSBGaWx0ZXIgaW50ZXJmYWNlXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VzID0gbmV3IFN1YmplY3Q8W251bWJlciwgbnVtYmVyXT4oKTtcbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZXMoKTogT2JzZXJ2YWJsZTxbbnVtYmVyLCBudW1iZXJdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuYWwgdmFsdWVzIGFuZCBhY2Nlc3NvclxuICAgKi9cbiAgcHJpdmF0ZSBfbG93OiBudW1iZXIgPSBudWxsO1xuICBwcml2YXRlIF9oaWdoOiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb21tb24gc2V0dGVycyBmb3IgdGhlIGlucHV0IHZhbHVlcywgaW5jbHVkaW5nIGluZGl2aWR1YWwgbGltaXRzIGFuZFxuICAgKiBib3RoIGF0IHRoZSBzYW1lIHRpbWUuICBWYWx1ZSBpcyBzaW5ndWxhciB0byBtYWtlIHRoZSBpbnRlcmZhY2Ugc2ltaWxhclxuICAgKiB0byB0aGUgYnVpbHQtaW4gc3RyaW5nIGZpbHRlci5cbiAgICovXG5cbiAgcHVibGljIGdldCB2YWx1ZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICByZXR1cm4gW3RoaXMuX2xvdywgdGhpcy5faGlnaF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHM6IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBjb25zdCBsb3cgPSB2YWxzWzBdO1xuICAgIGNvbnN0IGhpZ2ggPSB2YWxzWzFdO1xuICAgIGlmIChsb3cgIT09IHRoaXMuX2xvdyB8fCBoaWdoICE9PSB0aGlzLl9oaWdoKSB7XG4gICAgICB0aGlzLl9sb3cgPSBsb3c7XG4gICAgICB0aGlzLl9oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBsb3cobG93OiBudW1iZXIpIHtcbiAgICBpZiAobG93ICE9PSB0aGlzLl9sb3cpIHtcbiAgICAgIHRoaXMuX2xvdyA9IGxvdztcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBoaWdoKGhpZ2g6IG51bWJlcikge1xuICAgIGlmIChoaWdoICE9PSB0aGlzLl9oaWdoKSB7XG4gICAgICB0aGlzLl9oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvdztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlnaCgpIHtcbiAgICByZXR1cm4gdGhpcy5faGlnaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlLCAoYXQgbGVhc3Qgb25lIGlucHV0IGlzIHNldClcbiAgICovXG4gIHB1YmxpYyBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG93ICE9PSBudWxsIHx8IHRoaXMuaGlnaCAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhbiBpdGVtIG1hdGNoZXMgYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGhhdmUgYSBmaWx0ZXIgZnVuY3Rpb24gaW4gY2FzZSBzb21lb25lIHdhbnRzIHRvIGltcGxlbWVudCBhIG51bWVyaWNcbiAgICAvLyBmaWx0ZXIgdGhhdCBhbHdheXMgcGFzc2VzIG51bGxzIG9yIHNpbWlsYXJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJGbi5hY2NlcHRzKGl0ZW0sIHRoaXMuX2xvdywgdGhpcy5faGlnaCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb3BlcnR5OiB0aGlzLmZpbHRlckZuLnByb3AsXG4gICAgICAgIGxvdzogdGhpcy5fbG93LFxuICAgICAgICBoaWdoOiB0aGlzLl9oaWdoLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKG90aGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxULCBhbnk+KTogYm9vbGVhbiB7XG4gICAgaWYgKG90aGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgaWYgKG90aGVyLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgJiZcbiAgICAgICAgICBvdGhlci5maWx0ZXJGbi5wcm9wID09PSB0aGlzLmZpbHRlckZuLnByb3AgJiZcbiAgICAgICAgICBvdGhlci5sb3cgPT09IHRoaXMuX2xvdyAmJlxuICAgICAgICAgIG90aGVyLmhpZ2ggPT09IHRoaXMuX2hpZ2hcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==