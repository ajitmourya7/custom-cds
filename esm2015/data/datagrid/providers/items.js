import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FiltersProvider } from './filters';
import { Page } from './page';
import { Sort } from './sort';
let Items = class Items {
    constructor(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        /**
         * Indicates if the data is currently loading
         */
        this.loading = false;
        // TODO: Verify that trackBy is registered for the *ngFor case too
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = (index, item) => item;
        /**
         * Whether we should use smart items for this datagrid or let the user handle
         * everything.
         */
        this._smart = false;
        /**
         * List of items currently displayed
         */
        this._displayed = [];
        /**
         * The Observable that lets other classes subscribe to items changes
         */
        this._change = new Subject();
        this._allChanges = new Subject();
    }
    /**
     * Cleans up our subscriptions to other providers
     */
    destroy() {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    }
    get smart() {
        return this._smart;
    }
    smartenUp() {
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe(() => this._filterItems());
        this._sortSub = this._sort.change.subscribe(() => {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!this._sort.comparator) {
                this._filterItems();
            }
            else {
                this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(() => this._changePage());
    }
    get all() {
        return this._all;
    }
    set all(items) {
        this._all = items;
        this.emitAllChanges(items);
        if (this.smart) {
            this._filterItems();
        }
        else {
            this._displayed = items;
            this.emitChange();
        }
    }
    /**
     * Manually recompute the list of displayed items
     */
    refresh() {
        if (this.smart) {
            this._filterItems();
        }
    }
    get displayed() {
        // Ideally we could return an immutable array, but we don't have it in Clarity yet.
        return this._displayed;
    }
    emitChange() {
        this._change.next(this.displayed);
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    emitAllChanges(items) {
        this._allChanges.next(items);
    }
    get allChanges() {
        return this._allChanges.asObservable();
    }
    /**
     * Checks if we don't have data to process yet, to abort early operations
     */
    get uninitialized() {
        return !this._all;
    }
    /**
     * FiltersProvider items from the raw list
     */
    _filterItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(item => this._filters.accepts(item));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    }
    /**
     * Sorts items in the filtered list
     */
    _sortItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((a, b) => this._sort.compare(a, b));
        }
        this._changePage();
    }
    /**
     * Extracts the current page from the sorted list
     */
    _changePage() {
        // If we know we have pagination but the page size hasn't been set yet, we wait for it.
        if (this.uninitialized || (this._page.activated && this._page.size === 0)) {
            return;
        }
        if (this._page.size > 0) {
            this._displayed = this._filtered.slice(this._page.firstItem, this._page.lastItem + 1);
        }
        else {
            this._displayed = this._filtered;
        }
        this.emitChange();
    }
};
Items = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [FiltersProvider, Sort, Page])
], Items);
export { Items };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL3Byb3ZpZGVycy9pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHOUIsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQUNoQixZQUFvQixRQUE0QixFQUFVLEtBQWMsRUFBVSxLQUFXO1FBQXpFLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFFN0Y7O1dBRUc7UUFDSSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGtFQUFrRTtRQUNsRTs7V0FFRztRQUNJLFlBQU8sR0FBdUIsQ0FBQyxLQUFhLEVBQUUsSUFBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUF1QnRFOzs7V0FHRztRQUNLLFdBQU0sR0FBRyxLQUFLLENBQUM7UUF1RHZCOztXQUVHO1FBQ0ssZUFBVSxHQUFRLEVBQUUsQ0FBQztRQU03Qjs7V0FFRztRQUNLLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBUzdCLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQWxIdUQsQ0FBQztJQW1Cakc7O09BRUc7SUFDSSxPQUFPO1FBQ1osSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7UUFD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QUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFBO0FBaExZLEtBQUs7SUFEakIsVUFBVSxFQUFFOzZDQUVtQixlQUFlLEVBQW9CLElBQUksRUFBb0IsSUFBSTtHQURsRixLQUFLLENBZ0xqQjtTQWhMWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVHJhY2tCeUZ1bmN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9maWx0ZXJzJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gJy4vc29ydCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJdGVtczxUID0gYW55PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpbHRlcnM6IEZpbHRlcnNQcm92aWRlcjxUPiwgcHJpdmF0ZSBfc29ydDogU29ydDxUPiwgcHJpdmF0ZSBfcGFnZTogUGFnZSkge31cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBkYXRhIGlzIGN1cnJlbnRseSBsb2FkaW5nXG4gICAqL1xuICBwdWJsaWMgbG9hZGluZyA9IGZhbHNlO1xuXG4gIC8vIFRPRE86IFZlcmlmeSB0aGF0IHRyYWNrQnkgaXMgcmVnaXN0ZXJlZCBmb3IgdGhlICpuZ0ZvciBjYXNlIHRvb1xuICAvKipcbiAgICogVHJhY2tpbmcgZnVuY3Rpb24gdG8gaWRlbnRpZnkgb2JqZWN0cy4gRGVmYXVsdCBpcyByZWZlcmVuY2UgZXF1YWxpdHkuXG4gICAqL1xuICBwdWJsaWMgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+ID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IFQpID0+IGl0ZW07XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gdGhlIG90aGVyIHByb3ZpZGVycyBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyc1N1YjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9zb3J0U3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX3BhZ2VTdWI6IFN1YnNjcmlwdGlvbjtcbiAgLyoqXG4gICAqIENsZWFucyB1cCBvdXIgc3Vic2NyaXB0aW9ucyB0byBvdGhlciBwcm92aWRlcnNcbiAgICovXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9maWx0ZXJzU3ViKSB7XG4gICAgICB0aGlzLl9maWx0ZXJzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zb3J0U3ViKSB7XG4gICAgICB0aGlzLl9zb3J0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYWdlU3ViKSB7XG4gICAgICB0aGlzLl9wYWdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgd2Ugc2hvdWxkIHVzZSBzbWFydCBpdGVtcyBmb3IgdGhpcyBkYXRhZ3JpZCBvciBsZXQgdGhlIHVzZXIgaGFuZGxlXG4gICAqIGV2ZXJ5dGhpbmcuXG4gICAqL1xuICBwcml2YXRlIF9zbWFydCA9IGZhbHNlO1xuICBwdWJsaWMgZ2V0IHNtYXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zbWFydDtcbiAgfVxuICBwdWJsaWMgc21hcnRlblVwKCkge1xuICAgIHRoaXMuX3NtYXJ0ID0gdHJ1ZTtcbiAgICAvKlxuICAgICAgICAgKiBUaGVzZSBvYnNlcnZlcnMgdHJpZ2dlciBhIGNoYWluIG9mIGZ1bmN0aW9uOiBmaWx0ZXIgLT4gc29ydCAtPiBwYWdpbmF0ZVxuICAgICAgICAgKiBBbiBvYnNlcnZlciB1cCB0aGUgY2hhaW4gcmUtdHJpZ2dlcnMgYWxsIHRoZSBvcGVyYXRpb25zIHRoYXQgZm9sbG93IGl0LlxuICAgICAgICAgKi9cbiAgICB0aGlzLl9maWx0ZXJzU3ViID0gdGhpcy5fZmlsdGVycy5jaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2ZpbHRlckl0ZW1zKCkpO1xuICAgIHRoaXMuX3NvcnRTdWIgPSB0aGlzLl9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlLCBpZiB0aGUgZGF0YWdyaWQgd2VudCBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZCwgd2UgaGF2ZSB0byByZS1maWx0ZXJcbiAgICAgIC8vIHRvIGdldCB0aGUgb3JpZ2luYWwgb3JkZXIgYmFja1xuICAgICAgaWYgKCF0aGlzLl9zb3J0LmNvbXBhcmF0b3IpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVySXRlbXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NvcnRJdGVtcygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3BhZ2VTdWIgPSB0aGlzLl9wYWdlLmNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlUGFnZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGFsbCBpdGVtcyBpbiB0aGUgZGF0YWdyaWRcbiAgICovXG4gIHByaXZhdGUgX2FsbDogVFtdO1xuICBwdWJsaWMgZ2V0IGFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsO1xuICB9XG4gIHB1YmxpYyBzZXQgYWxsKGl0ZW1zOiBUW10pIHtcbiAgICB0aGlzLl9hbGwgPSBpdGVtcztcbiAgICB0aGlzLmVtaXRBbGxDaGFuZ2VzKGl0ZW1zKTtcbiAgICBpZiAodGhpcy5zbWFydCkge1xuICAgICAgdGhpcy5fZmlsdGVySXRlbXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlzcGxheWVkID0gaXRlbXM7XG4gICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgcmVjb21wdXRlIHRoZSBsaXN0IG9mIGRpc3BsYXllZCBpdGVtc1xuICAgKi9cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgaWYgKHRoaXMuc21hcnQpIHtcbiAgICAgIHRoaXMuX2ZpbHRlckl0ZW1zKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHRlbXBvcmFyeSBzdGVwLCB3aGljaCB3ZSBwcmVzZXJ2ZSB0byBhdm9pZCByZS1maWx0ZXJpbmcgb3IgcmUtc29ydGluZyBpZiBub3QgbmVjZXNzYXJ5XG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXJlZDogVFtdO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGl0ZW1zIGN1cnJlbnRseSBkaXNwbGF5ZWRcbiAgICovXG4gIHByaXZhdGUgX2Rpc3BsYXllZDogVFtdID0gW107XG4gIHB1YmxpYyBnZXQgZGlzcGxheWVkKCk6IFRbXSB7XG4gICAgLy8gSWRlYWxseSB3ZSBjb3VsZCByZXR1cm4gYW4gaW1tdXRhYmxlIGFycmF5LCBidXQgd2UgZG9uJ3QgaGF2ZSBpdCBpbiBDbGFyaXR5IHlldC5cbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBpdGVtcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgU3ViamVjdDxUW10+KCk7XG4gIHByaXZhdGUgZW1pdENoYW5nZSgpIHtcbiAgICB0aGlzLl9jaGFuZ2UubmV4dCh0aGlzLmRpc3BsYXllZCk7XG4gIH1cbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9hbGxDaGFuZ2VzID0gbmV3IFN1YmplY3Q8VFtdPigpO1xuICBwcml2YXRlIGVtaXRBbGxDaGFuZ2VzKGl0ZW1zOiBUW10pOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxDaGFuZ2VzLm5leHQoaXRlbXMpO1xuICB9XG5cbiAgcHVibGljIGdldCBhbGxDaGFuZ2VzKCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbENoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHdlIGRvbid0IGhhdmUgZGF0YSB0byBwcm9jZXNzIHlldCwgdG8gYWJvcnQgZWFybHkgb3BlcmF0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXQgdW5pbml0aWFsaXplZCgpIHtcbiAgICByZXR1cm4gIXRoaXMuX2FsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzUHJvdmlkZXIgaXRlbXMgZnJvbSB0aGUgcmF3IGxpc3RcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlckl0ZW1zKCkge1xuICAgIGlmICh0aGlzLnVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMuaGFzQWN0aXZlRmlsdGVycygpKSB7XG4gICAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuX2FsbC5maWx0ZXIoaXRlbSA9PiB0aGlzLl9maWx0ZXJzLmFjY2VwdHMoaXRlbSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXb3JrIG9uIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBhcnJheSwgdG8gbm90IG1vZGlmeSB0aGUgdXNlcidzIG1vZGVsXG4gICAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuX2FsbC5zbGljZSgpO1xuICAgIH1cbiAgICB0aGlzLl9wYWdlLnRvdGFsSXRlbXMgPSB0aGlzLl9maWx0ZXJlZC5sZW5ndGg7XG4gICAgdGhpcy5fc29ydEl0ZW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgaXRlbXMgaW4gdGhlIGZpbHRlcmVkIGxpc3RcbiAgICovXG4gIHByaXZhdGUgX3NvcnRJdGVtcygpIHtcbiAgICBpZiAodGhpcy51bmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zb3J0LmNvbXBhcmF0b3IpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcmVkLnNvcnQoKGEsIGIpID0+IHRoaXMuX3NvcnQuY29tcGFyZShhLCBiKSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZVBhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyB0aGUgY3VycmVudCBwYWdlIGZyb20gdGhlIHNvcnRlZCBsaXN0XG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VQYWdlKCkge1xuICAgIC8vIElmIHdlIGtub3cgd2UgaGF2ZSBwYWdpbmF0aW9uIGJ1dCB0aGUgcGFnZSBzaXplIGhhc24ndCBiZWVuIHNldCB5ZXQsIHdlIHdhaXQgZm9yIGl0LlxuICAgIGlmICh0aGlzLnVuaW5pdGlhbGl6ZWQgfHwgKHRoaXMuX3BhZ2UuYWN0aXZhdGVkICYmIHRoaXMuX3BhZ2Uuc2l6ZSA9PT0gMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZCA9IHRoaXMuX2ZpbHRlcmVkLnNsaWNlKHRoaXMuX3BhZ2UuZmlyc3RJdGVtLCB0aGlzLl9wYWdlLmxhc3RJdGVtICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZCA9IHRoaXMuX2ZpbHRlcmVkO1xuICAgIH1cbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxufVxuIl19