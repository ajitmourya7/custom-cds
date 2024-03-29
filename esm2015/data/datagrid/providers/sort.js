import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateDebouncer } from './state-debouncer.provider';
let Sort = class Sort {
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Ascending order if false, descending if true
         */
        this._reverse = false;
        /**
         * The Observable that lets other classes subscribe to sort changes
         */
        this._change = new Subject();
    }
    get comparator() {
        return this._comparator;
    }
    set comparator(value) {
        this.stateDebouncer.changeStart();
        this._comparator = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    get reverse() {
        return this._reverse;
    }
    set reverse(value) {
        this.stateDebouncer.changeStart();
        this._reverse = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    emitChange() {
        this._change.next(this);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * @memberof Sort
     */
    toggle(sortBy, forceReverse) {
        this.stateDebouncer.changeStart();
        // We modify private properties directly, to batch the change event
        if (this.comparator === sortBy) {
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse || !this._reverse : !this._reverse;
        }
        else {
            this._comparator = sortBy;
            this._reverse = typeof forceReverse !== 'undefined' ? forceReverse : false;
        }
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * Clears the current sorting order
     */
    clear() {
        this.comparator = null;
    }
    /**
     * Compares two objects according to the current comparator
     */
    compare(a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    }
};
Sort = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [StateDebouncer])
], Sort);
export { Sort };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVELElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFDZixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFnQmxEOztXQUVHO1FBQ0ssYUFBUSxHQUFZLEtBQUssQ0FBQztRQVdsQzs7V0FFRztRQUNLLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBakNZLENBQUM7SUFNdEQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsS0FBd0M7UUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBTUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBVyxPQUFPLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFNTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRCxxRkFBcUY7SUFDckYsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsTUFBeUMsRUFBRSxZQUFzQjtRQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLG1FQUFtRTtRQUNuRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkc7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPLENBQUMsQ0FBSSxFQUFFLENBQUk7UUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNGLENBQUE7QUE1RVksSUFBSTtJQURoQixVQUFVLEVBQUU7NkNBRXlCLGNBQWM7R0FEdkMsSUFBSSxDQTRFaEI7U0E1RVksSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21wYXJhdG9yLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0ZURlYm91bmNlciB9IGZyb20gJy4vc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvcnQ8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cblxuICAvKipcbiAgICogQ3VycmVudGx5IGFjdGl2ZSBjb21wYXJhdG9yXG4gICAqL1xuICBwcml2YXRlIF9jb21wYXJhdG9yOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD47XG4gIHB1YmxpYyBnZXQgY29tcGFyYXRvcigpOiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4ge1xuICAgIHJldHVybiB0aGlzLl9jb21wYXJhdG9yO1xuICB9XG4gIHB1YmxpYyBzZXQgY29tcGFyYXRvcih2YWx1ZTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+KSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIHRoaXMuX2NvbXBhcmF0b3IgPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc2NlbmRpbmcgb3JkZXIgaWYgZmFsc2UsIGRlc2NlbmRpbmcgaWYgdHJ1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHJldmVyc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JldmVyc2U7XG4gIH1cbiAgcHVibGljIHNldCByZXZlcnNlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIHRoaXMuX3JldmVyc2UgPSB2YWx1ZTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gc29ydCBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxTb3J0PFQ+PigpO1xuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQodGhpcyk7XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFNvcnQ8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBjb21wYXJhdG9yIGFzIHRoZSBjdXJyZW50IG9uZSwgb3IgdG9nZ2xlcyByZXZlcnNlIGlmIHRoZSBjb21wYXJhdG9yIGlzIGFscmVhZHkgdXNlZC4gVGhlXG4gICAqIG9wdGlvbmFsIGZvcmNlUmV2ZXJzZSBpbnB1dCBwYXJhbWV0ZXIgYWxsb3dzIHRvIG92ZXJyaWRlIHRoYXQgdG9nZ2xpbmcgYmVoYXZpb3IgYnkgc29ydGluZyBpblxuICAgKiByZXZlcnNlIG9yZGVyIGlmIGB0cnVlYC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFNvcnRcbiAgICovXG4gIHB1YmxpYyB0b2dnbGUoc29ydEJ5OiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2U8VD4sIGZvcmNlUmV2ZXJzZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZVN0YXJ0KCk7XG4gICAgLy8gV2UgbW9kaWZ5IHByaXZhdGUgcHJvcGVydGllcyBkaXJlY3RseSwgdG8gYmF0Y2ggdGhlIGNoYW5nZSBldmVudFxuICAgIGlmICh0aGlzLmNvbXBhcmF0b3IgPT09IHNvcnRCeSkge1xuICAgICAgdGhpcy5fcmV2ZXJzZSA9IHR5cGVvZiBmb3JjZVJldmVyc2UgIT09ICd1bmRlZmluZWQnID8gZm9yY2VSZXZlcnNlIHx8ICF0aGlzLl9yZXZlcnNlIDogIXRoaXMuX3JldmVyc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbXBhcmF0b3IgPSBzb3J0Qnk7XG4gICAgICB0aGlzLl9yZXZlcnNlID0gdHlwZW9mIGZvcmNlUmV2ZXJzZSAhPT0gJ3VuZGVmaW5lZCcgPyBmb3JjZVJldmVyc2UgOiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VEb25lKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjdXJyZW50IHNvcnRpbmcgb3JkZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLmNvbXBhcmF0b3IgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHR3byBvYmplY3RzIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBjb21wYXJhdG9yXG4gICAqL1xuICBwdWJsaWMgY29tcGFyZShhOiBULCBiOiBUKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMucmV2ZXJzZSA/IC0xIDogMSkgKiB0aGlzLmNvbXBhcmF0b3IuY29tcGFyZShhLCBiKTtcbiAgfVxufVxuIl19