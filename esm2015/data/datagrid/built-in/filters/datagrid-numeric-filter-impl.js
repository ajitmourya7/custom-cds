/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Subject } from 'rxjs';
import { DatagridPropertyNumericFilter } from './datagrid-property-numeric-filter';
export class DatagridNumericFilterImpl {
    constructor(filterFn) {
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
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * Common setters for the input values, including individual limits and
     * both at the same time.  Value is singular to make the interface similar
     * to the built-in string filter.
     */
    get value() {
        return [this._low, this._high];
    }
    set value(vals) {
        const low = vals[0];
        const high = vals[1];
        if (low !== this._low || high !== this._high) {
            this._low = low;
            this._high = high;
            this._changes.next([this._low, this._high]);
        }
    }
    set low(low) {
        if (low !== this._low) {
            this._low = low;
            this._changes.next([this._low, this._high]);
        }
    }
    set high(high) {
        if (high !== this._high) {
            this._high = high;
            this._changes.next([this._low, this._high]);
        }
    }
    get low() {
        return this._low;
    }
    get high() {
        return this._high;
    }
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     */
    isActive() {
        return this._low !== null || this.high !== null;
    }
    /**
     * Tests if an item matches a search text
     */
    accepts(item) {
        // We have a filter function in case someone wants to implement a numeric
        // filter that always passes nulls or similar
        return this.filterFn.accepts(item, this._low, this._high);
    }
    get state() {
        if (this.filterFn instanceof DatagridPropertyNumericFilter) {
            return {
                property: this.filterFn.prop,
                low: this._low,
                high: this._high,
            };
        }
        return this;
    }
    equals(other) {
        if (other instanceof DatagridNumericFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyNumericFilter) {
                return (this.filterFn instanceof DatagridPropertyNumericFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.low === this._low &&
                    other.high === this._high);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRW5GLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFBbUIsUUFBOEM7UUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBc0M7UUFFakU7O1dBRUc7UUFDSyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFNbkQ7O1dBRUc7UUFDSyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFVBQUssR0FBVyxJQUFJLENBQUM7SUFmdUMsQ0FBQztJQU1yRSxxRkFBcUY7SUFDckYsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBUUQ7Ozs7T0FJRztJQUVILElBQVcsS0FBSztRQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsSUFBc0I7UUFDckMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRCxJQUFXLEdBQUcsQ0FBQyxHQUFXO1FBQ3hCLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLElBQVk7UUFDMUIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsSUFBVyxHQUFHO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTyxDQUFDLElBQU87UUFDcEIseUVBQXlFO1FBQ3pFLDZDQUE2QztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLDZCQUE2QixFQUFFO1lBQzFELE9BQU87Z0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtnQkFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSzthQUNqQixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBeUM7UUFDckQsSUFBSSxLQUFLLFlBQVkseUJBQXlCLEVBQUU7WUFDOUMsSUFBSSxLQUFLLENBQUMsUUFBUSxZQUFZLDZCQUE2QixFQUFFO2dCQUMzRCxPQUFPLENBQ0wsSUFBSSxDQUFDLFFBQVEsWUFBWSw2QkFBNkI7b0JBQ3RELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtvQkFDMUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSTtvQkFDdkIsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUMxQixDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbnVtZXJpYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1wcm9wZXJ0eS1udW1lcmljLWZpbHRlcic7XG5cbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsPFQgPSBhbnk+IGltcGxlbWVudHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyRm46IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZTxUPikge31cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgcmVxdWlyZWQgYXMgcGFydCBvZiB0aGUgRmlsdGVyIGludGVyZmFjZVxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlcyA9IG5ldyBTdWJqZWN0PFtudW1iZXIsIG51bWJlcl0+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8W251bWJlciwgbnVtYmVyXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHZhbHVlcyBhbmQgYWNjZXNzb3JcbiAgICovXG4gIHByaXZhdGUgX2xvdzogbnVtYmVyID0gbnVsbDtcbiAgcHJpdmF0ZSBfaGlnaDogbnVtYmVyID0gbnVsbDtcblxuICAvKipcbiAgICogQ29tbW9uIHNldHRlcnMgZm9yIHRoZSBpbnB1dCB2YWx1ZXMsIGluY2x1ZGluZyBpbmRpdmlkdWFsIGxpbWl0cyBhbmRcbiAgICogYm90aCBhdCB0aGUgc2FtZSB0aW1lLiAgVmFsdWUgaXMgc2luZ3VsYXIgdG8gbWFrZSB0aGUgaW50ZXJmYWNlIHNpbWlsYXJcbiAgICogdG8gdGhlIGJ1aWx0LWluIHN0cmluZyBmaWx0ZXIuXG4gICAqL1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9sb3csIHRoaXMuX2hpZ2hdO1xuICB9XG5cbiAgcHVibGljIHNldCB2YWx1ZSh2YWxzOiBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgY29uc3QgbG93ID0gdmFsc1swXTtcbiAgICBjb25zdCBoaWdoID0gdmFsc1sxXTtcbiAgICBpZiAobG93ICE9PSB0aGlzLl9sb3cgfHwgaGlnaCAhPT0gdGhpcy5faGlnaCkge1xuICAgICAgdGhpcy5fbG93ID0gbG93O1xuICAgICAgdGhpcy5faGlnaCA9IGhpZ2g7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgbG93KGxvdzogbnVtYmVyKSB7XG4gICAgaWYgKGxvdyAhPT0gdGhpcy5fbG93KSB7XG4gICAgICB0aGlzLl9sb3cgPSBsb3c7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGlnaChoaWdoOiBudW1iZXIpIHtcbiAgICBpZiAoaGlnaCAhPT0gdGhpcy5faGlnaCkge1xuICAgICAgdGhpcy5faGlnaCA9IGhpZ2g7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9sb3c7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhpZ2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2g7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZSwgKGF0IGxlYXN0IG9uZSBpbnB1dCBpcyBzZXQpXG4gICAqL1xuICBwdWJsaWMgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvdyAhPT0gbnVsbCB8fCB0aGlzLmhpZ2ggIT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVGVzdHMgaWYgYW4gaXRlbSBtYXRjaGVzIGEgc2VhcmNoIHRleHRcbiAgICovXG4gIHB1YmxpYyBhY2NlcHRzKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICAvLyBXZSBoYXZlIGEgZmlsdGVyIGZ1bmN0aW9uIGluIGNhc2Ugc29tZW9uZSB3YW50cyB0byBpbXBsZW1lbnQgYSBudW1lcmljXG4gICAgLy8gZmlsdGVyIHRoYXQgYWx3YXlzIHBhc3NlcyBudWxscyBvciBzaW1pbGFyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRm4uYWNjZXB0cyhpdGVtLCB0aGlzLl9sb3csIHRoaXMuX2hpZ2gpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJGbiBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5maWx0ZXJGbi5wcm9wLFxuICAgICAgICBsb3c6IHRoaXMuX2xvdyxcbiAgICAgICAgaGlnaDogdGhpcy5faGlnaCxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGVxdWFscyhvdGhlcjogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VCwgYW55Pik6IGJvb2xlYW4ge1xuICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwpIHtcbiAgICAgIGlmIChvdGhlci5maWx0ZXJGbiBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdGhpcy5maWx0ZXJGbiBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyICYmXG4gICAgICAgICAgb3RoZXIuZmlsdGVyRm4ucHJvcCA9PT0gdGhpcy5maWx0ZXJGbi5wcm9wICYmXG4gICAgICAgICAgb3RoZXIubG93ID09PSB0aGlzLl9sb3cgJiZcbiAgICAgICAgICBvdGhlci5oaWdoID09PSB0aGlzLl9oaWdoXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=