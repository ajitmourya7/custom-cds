import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Page } from './page';
import { StateDebouncer } from './state-debouncer.provider';
let FiltersProvider = class FiltersProvider {
    constructor(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    /**
     * Tests if at least one filter is currently active
     */
    hasActiveFilters() {
        // We do not use getActiveFilters() because this function will be called much more often
        // and stopping the loop early might be relevant.
        for (const { filter } of this._all) {
            if (filter && filter.isActive()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns a list of all currently active filters
     */
    getActiveFilters() {
        const ret = [];
        for (const { filter } of this._all) {
            if (filter && filter.isActive()) {
                ret.push(filter);
            }
        }
        return ret;
    }
    /**
     * Registers a filter, and returns a deregistration function
     */
    add(filter) {
        const index = this._all.length;
        const subscription = filter.changes.subscribe(() => this.resetPageAndEmitFilterChange([filter]));
        let hasUnregistered = false;
        const registered = new RegisteredFilter(filter, () => {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            this._all.splice(index, 1);
            if (filter.isActive()) {
                this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    }
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    accepts(item) {
        for (const { filter } of this._all) {
            if (filter && filter.isActive() && !filter.accepts(item)) {
                return false;
            }
        }
        return true;
    }
    resetPageAndEmitFilterChange(filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    }
};
FiltersProvider = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Page, StateDebouncer])
], FiltersProvider);
export { FiltersProvider };
export class RegisteredFilter {
    constructor(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcHJvdmlkZXJzL2ZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHNUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUMxQixZQUFvQixLQUFXLEVBQVUsY0FBOEI7UUFBbkQsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN2RTs7O1dBR0c7UUFDSyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQW1DLENBQUM7UUFNakU7O1dBRUc7UUFDSyxTQUFJLEdBQXlELEVBQUUsQ0FBQztJQWRFLENBQUM7SUFNM0UscUZBQXFGO0lBQ3JGLElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBT0Q7O09BRUc7SUFDSSxnQkFBZ0I7UUFDckIsd0ZBQXdGO1FBQ3hGLGlEQUFpRDtRQUNqRCxLQUFLLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSSxnQkFBZ0I7UUFDckIsTUFBTSxHQUFHLEdBQW9DLEVBQUUsQ0FBQztRQUNoRCxLQUFLLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQjtTQUNGO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSSxHQUFHLENBQTBDLE1BQVM7UUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDbkQsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLE9BQU87YUFDUjtZQUNELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QztZQUNELGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTyxDQUFDLElBQU87UUFDcEIsS0FBSyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyw0QkFBNEIsQ0FBQyxPQUF3QztRQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLDRHQUE0RztRQUM1RywyR0FBMkc7UUFDM0csSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUF6RlksZUFBZTtJQUQzQixVQUFVLEVBQUU7NkNBRWdCLElBQUksRUFBMEIsY0FBYztHQUQ1RCxlQUFlLENBeUYzQjtTQXpGWSxlQUFlO0FBMkY1QixNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQW1CLE1BQVMsRUFBUyxVQUFzQjtRQUF4QyxXQUFNLEdBQU4sTUFBTSxDQUFHO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Q0FDaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHsgU3RhdGVEZWJvdW5jZXIgfSBmcm9tICcuL3N0YXRlLWRlYm91bmNlci5wcm92aWRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWx0ZXJzUHJvdmlkZXI8VCA9IGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHN0YXRlRGVib3VuY2VyOiBTdGF0ZURlYm91bmNlcikge31cbiAgLyoqXG4gICAqIFRoaXMgc3ViamVjdCBpcyB0aGUgbGlzdCBvZiBmaWx0ZXJzIHRoYXQgY2hhbmdlZCBsYXN0LCBub3QgdGhlIHdob2xlIGxpc3QuXG4gICAqIFdlIGVtaXQgYSBsaXN0IHJhdGhlciB0aGFuIGp1c3Qgb25lIGZpbHRlciB0byBhbGxvdyBiYXRjaCBjaGFuZ2VzIHRvIHNldmVyYWwgYXQgb25jZS5cbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+W10+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGFsbCBmaWx0ZXJzLCB3aGV0aGVyIHRoZXkncmUgYWN0aXZlIG9yIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBfYWxsOiBSZWdpc3RlcmVkRmlsdGVyPFQsIENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQ+PltdID0gW107XG5cbiAgLyoqXG4gICAqIFRlc3RzIGlmIGF0IGxlYXN0IG9uZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZVxuICAgKi9cbiAgcHVibGljIGhhc0FjdGl2ZUZpbHRlcnMoKTogYm9vbGVhbiB7XG4gICAgLy8gV2UgZG8gbm90IHVzZSBnZXRBY3RpdmVGaWx0ZXJzKCkgYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG11Y2ggbW9yZSBvZnRlblxuICAgIC8vIGFuZCBzdG9wcGluZyB0aGUgbG9vcCBlYXJseSBtaWdodCBiZSByZWxldmFudC5cbiAgICBmb3IgKGNvbnN0IHsgZmlsdGVyIH0gb2YgdGhpcy5fYWxsKSB7XG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGN1cnJlbnRseSBhY3RpdmUgZmlsdGVyc1xuICAgKi9cbiAgcHVibGljIGdldEFjdGl2ZUZpbHRlcnMoKTogQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD5bXSB7XG4gICAgY29uc3QgcmV0OiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPltdID0gW107XG4gICAgZm9yIChjb25zdCB7IGZpbHRlciB9IG9mIHRoaXMuX2FsbCkge1xuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXQucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGZpbHRlciwgYW5kIHJldHVybnMgYSBkZXJlZ2lzdHJhdGlvbiBmdW5jdGlvblxuICAgKi9cbiAgcHVibGljIGFkZDxGIGV4dGVuZHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+KGZpbHRlcjogRik6IFJlZ2lzdGVyZWRGaWx0ZXI8VCwgRj4ge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYWxsLmxlbmd0aDtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBmaWx0ZXIuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNldFBhZ2VBbmRFbWl0RmlsdGVyQ2hhbmdlKFtmaWx0ZXJdKSk7XG4gICAgbGV0IGhhc1VucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHJlZ2lzdGVyZWQgPSBuZXcgUmVnaXN0ZXJlZEZpbHRlcihmaWx0ZXIsICgpID0+IHtcbiAgICAgIGlmIChoYXNVbnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGlmIChmaWx0ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICB0aGlzLnJlc2V0UGFnZUFuZEVtaXRGaWx0ZXJDaGFuZ2UoW10pO1xuICAgICAgfVxuICAgICAgaGFzVW5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLl9hbGwucHVzaChyZWdpc3RlcmVkKTtcbiAgICBpZiAoZmlsdGVyLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMucmVzZXRQYWdlQW5kRW1pdEZpbHRlckNoYW5nZShbZmlsdGVyXSk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3RlcmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgYW4gaXRlbSBpZiBpdCBpcyBhY2NlcHRlZCBieSBhbGwgY3VycmVudGx5IGFjdGl2ZSBmaWx0ZXJzXG4gICAqL1xuICBwdWJsaWMgYWNjZXB0cyhpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCB7IGZpbHRlciB9IG9mIHRoaXMuX2FsbCkge1xuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuaXNBY3RpdmUoKSAmJiAhZmlsdGVyLmFjY2VwdHMoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRQYWdlQW5kRW1pdEZpbHRlckNoYW5nZShmaWx0ZXJzOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPltdKSB7XG4gICAgdGhpcy5zdGF0ZURlYm91bmNlci5jaGFuZ2VTdGFydCgpO1xuICAgIC8vIGZpbHRlcmluZyBtYXkgY2hhbmdlIHRoZSBwYWdlIG51bWJlciBzdWNoIHRoYXQgY3VycmVudCBwYWdlIG51bWJlciBkb2Vzbid0IGV4aXN0IGluIHRoZSBmaWx0ZXJlZCBkYXRhc2V0LlxuICAgIC8vIFNvIGhlcmUgd2UgYWx3YXlzIHNldCB0aGUgY3VycmVudCBwYWdlIHRvIDEgc28gdGhhdCBpdCdsbCBmZXRjaCBmaXJzdCBwYWdlJ3MgZGF0YSB3aXRoIHRoZSBnaXZlbiBmaWx0ZXIuXG4gICAgdGhpcy5fcGFnZS5jdXJyZW50ID0gMTtcbiAgICB0aGlzLl9jaGFuZ2UubmV4dChmaWx0ZXJzKTtcbiAgICB0aGlzLnN0YXRlRGVib3VuY2VyLmNoYW5nZURvbmUoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJlZEZpbHRlcjxULCBGIGV4dGVuZHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGZpbHRlcjogRiwgcHVibGljIHVucmVnaXN0ZXI6ICgpID0+IHZvaWQpIHt9XG59XG4iXX0=