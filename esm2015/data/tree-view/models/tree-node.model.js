/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ClrSelectedState } from './selected-state.enum';
import { BehaviorSubject } from 'rxjs';
export class TreeNodeModel {
    constructor() {
        this.selected = new BehaviorSubject(ClrSelectedState.UNSELECTED);
        /*
         * Being able to push this down to the RecursiveTreeNodeModel would require too much work on the angular components
         * right now for them to know which kind of model they are using. So I'm lifting the public properties to this
         * abstract parent class for now and we can revisit it later, when we're not facing such a close deadline.
         */
        this.loading = false;
    }
    destroy() {
        // Just to be safe
        this.selected.complete();
    }
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    setSelected(state, propagateUp, propagateDown) {
        if (state === this.selected.value) {
            return;
        }
        this.selected.next(state);
        if (propagateDown && state !== ClrSelectedState.INDETERMINATE && this.children) {
            this.children.forEach(child => child.setSelected(state, false, true));
        }
        if (propagateUp && this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    }
    toggleSelection(propagate) {
        // Both unselected and indeterminate toggle to selected
        const newState = this.selected.value === ClrSelectedState.SELECTED ? ClrSelectedState.UNSELECTED : ClrSelectedState.SELECTED;
        // NOTE: we always propagate selection up in this method because it is only called when the user takes an action.
        // It should never be called from lifecycle hooks or app-provided inputs.
        this.setSelected(newState, true, propagate);
    }
    computeSelectionStateFromChildren() {
        let oneSelected = false;
        let oneUnselected = false;
        // Using a good old for loop to exit as soon as we can tell, for better performance on large trees.
        for (const child of this.children) {
            switch (child.selected.value) {
                case ClrSelectedState.INDETERMINATE:
                    return ClrSelectedState.INDETERMINATE;
                case ClrSelectedState.SELECTED:
                    oneSelected = true;
                    if (oneUnselected) {
                        return ClrSelectedState.INDETERMINATE;
                    }
                    break;
                case ClrSelectedState.UNSELECTED:
                default:
                    // Default is the same as unselected, in case an undefined somehow made it all the way here.
                    oneUnselected = true;
                    if (oneSelected) {
                        return ClrSelectedState.INDETERMINATE;
                    }
                    break;
            }
        }
        if (!oneSelected) {
            return ClrSelectedState.UNSELECTED;
        }
        else if (!oneUnselected) {
            return ClrSelectedState.SELECTED;
        }
    }
    /*
     * Internal, but needs to be called by other nodes
     */
    _updateSelectionFromChildren() {
        const newState = this.computeSelectionStateFromChildren();
        if (newState === this.selected.value) {
            return;
        }
        this.selected.next(newState);
        if (this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvbW9kZWxzL3RyZWUtbm9kZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFDRSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQW1CLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBWTlFOzs7O1dBSUc7UUFDSCxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBMEVsQixDQUFDO0lBeEVDLE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLFdBQVcsQ0FBQyxLQUF1QixFQUFFLFdBQW9CLEVBQUUsYUFBc0I7UUFDL0UsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxhQUFhLElBQUksS0FBSyxLQUFLLGdCQUFnQixDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFDRCxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsU0FBa0I7UUFDaEMsdURBQXVEO1FBQ3ZELE1BQU0sUUFBUSxHQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7UUFDOUcsaUhBQWlIO1FBQ2pILHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLGlDQUFpQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLG1HQUFtRztRQUNuRyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsUUFBUSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDNUIsS0FBSyxnQkFBZ0IsQ0FBQyxhQUFhO29CQUNqQyxPQUFPLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztnQkFDeEMsS0FBSyxnQkFBZ0IsQ0FBQyxRQUFRO29CQUM1QixXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixJQUFJLGFBQWEsRUFBRTt3QkFDakIsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7cUJBQ3ZDO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pDO29CQUNFLDRGQUE0RjtvQkFDNUYsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxXQUFXLEVBQUU7d0JBQ2YsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7cUJBQ3ZDO29CQUNELE1BQU07YUFDVDtTQUNGO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztTQUNwQzthQUFNLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDekIsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw0QkFBNEI7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDMUQsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDbHJTZWxlY3RlZFN0YXRlIH0gZnJvbSAnLi9zZWxlY3RlZC1zdGF0ZS5lbnVtJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHJlZU5vZGVNb2RlbDxUPiB7XG4gIHNlbGVjdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDbHJTZWxlY3RlZFN0YXRlPihDbHJTZWxlY3RlZFN0YXRlLlVOU0VMRUNURUQpO1xuICBtb2RlbDogVCB8IG51bGw7XG4gIC8qXG4gICAqIElkZWFsbHksIEkgd291bGQgbGlrZSB0byB1c2UgYSBwb2x5bW9ycGhpYyB0aGlzIHR5cGUgaGVyZSB0byBlbnN1cmUgaG9tb2dlbmVpdHkgb2YgdGhlIHRyZWUsIHNvbWV0aGluZyBsaWtlOlxuICAgKiBhYnN0cmFjdCBwYXJlbnQ6IHRoaXM8VD4gfCBudWxsO1xuICAgKiBhYnN0cmFjdCBjaGlsZHJlbjogdGhpczxUPltdO1xuICAgKiBCdXQgSSdtIGhpdHRpbmcgbGltaXRhdGlvbnMgb24gdHlwZXNjcmlwdCBub3QgYWxsb3dpbmcgdGhhdCB0eXBlIGluIGNvbnN0cnVjdG9ycyBvciBzdGF0aWMgbWV0aG9kcy5cbiAgICogU28gSSdtIHJlc29ydGluZyB0byBmb3JjaW5nIG92ZXJyaWRlIHdpdGggbW9yZSBwcmVjaXNlIHR5cGVzIGJ5IG1hcmtpbmcgdGhlc2UgYWJzdHJhY3QuXG4gICAqL1xuICBhYnN0cmFjdCBwYXJlbnQ6IFRyZWVOb2RlTW9kZWw8VD4gfCBudWxsO1xuICBhYnN0cmFjdCBjaGlsZHJlbjogVHJlZU5vZGVNb2RlbDxUPltdO1xuXG4gIC8qXG4gICAqIEJlaW5nIGFibGUgdG8gcHVzaCB0aGlzIGRvd24gdG8gdGhlIFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwgd291bGQgcmVxdWlyZSB0b28gbXVjaCB3b3JrIG9uIHRoZSBhbmd1bGFyIGNvbXBvbmVudHNcbiAgICogcmlnaHQgbm93IGZvciB0aGVtIHRvIGtub3cgd2hpY2gga2luZCBvZiBtb2RlbCB0aGV5IGFyZSB1c2luZy4gU28gSSdtIGxpZnRpbmcgdGhlIHB1YmxpYyBwcm9wZXJ0aWVzIHRvIHRoaXNcbiAgICogYWJzdHJhY3QgcGFyZW50IGNsYXNzIGZvciBub3cgYW5kIHdlIGNhbiByZXZpc2l0IGl0IGxhdGVyLCB3aGVuIHdlJ3JlIG5vdCBmYWNpbmcgc3VjaCBhIGNsb3NlIGRlYWRsaW5lLlxuICAgKi9cbiAgbG9hZGluZyA9IGZhbHNlO1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gSnVzdCB0byBiZSBzYWZlXG4gICAgdGhpcy5zZWxlY3RlZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLy8gUHJvcGFnYXRlIGJ5IGRlZmF1bHQgd2hlbiBlYWdlciwgZG9uJ3QgcHJvcGFnYXRlIGluIHRoZSBsYXp5LWxvYWRlZCB0cmVlLlxuICBzZXRTZWxlY3RlZChzdGF0ZTogQ2xyU2VsZWN0ZWRTdGF0ZSwgcHJvcGFnYXRlVXA6IGJvb2xlYW4sIHByb3BhZ2F0ZURvd246IGJvb2xlYW4pIHtcbiAgICBpZiAoc3RhdGUgPT09IHRoaXMuc2VsZWN0ZWQudmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZC5uZXh0KHN0YXRlKTtcbiAgICBpZiAocHJvcGFnYXRlRG93biAmJiBzdGF0ZSAhPT0gQ2xyU2VsZWN0ZWRTdGF0ZS5JTkRFVEVSTUlOQVRFICYmIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5zZXRTZWxlY3RlZChzdGF0ZSwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG4gICAgaWYgKHByb3BhZ2F0ZVVwICYmIHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5fdXBkYXRlU2VsZWN0aW9uRnJvbUNoaWxkcmVuKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlU2VsZWN0aW9uKHByb3BhZ2F0ZTogYm9vbGVhbikge1xuICAgIC8vIEJvdGggdW5zZWxlY3RlZCBhbmQgaW5kZXRlcm1pbmF0ZSB0b2dnbGUgdG8gc2VsZWN0ZWRcbiAgICBjb25zdCBuZXdTdGF0ZSA9XG4gICAgICB0aGlzLnNlbGVjdGVkLnZhbHVlID09PSBDbHJTZWxlY3RlZFN0YXRlLlNFTEVDVEVEID8gQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEIDogQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRDtcbiAgICAvLyBOT1RFOiB3ZSBhbHdheXMgcHJvcGFnYXRlIHNlbGVjdGlvbiB1cCBpbiB0aGlzIG1ldGhvZCBiZWNhdXNlIGl0IGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIHVzZXIgdGFrZXMgYW4gYWN0aW9uLlxuICAgIC8vIEl0IHNob3VsZCBuZXZlciBiZSBjYWxsZWQgZnJvbSBsaWZlY3ljbGUgaG9va3Mgb3IgYXBwLXByb3ZpZGVkIGlucHV0cy5cbiAgICB0aGlzLnNldFNlbGVjdGVkKG5ld1N0YXRlLCB0cnVlLCBwcm9wYWdhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wdXRlU2VsZWN0aW9uU3RhdGVGcm9tQ2hpbGRyZW4oKSB7XG4gICAgbGV0IG9uZVNlbGVjdGVkID0gZmFsc2U7XG4gICAgbGV0IG9uZVVuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAvLyBVc2luZyBhIGdvb2Qgb2xkIGZvciBsb29wIHRvIGV4aXQgYXMgc29vbiBhcyB3ZSBjYW4gdGVsbCwgZm9yIGJldHRlciBwZXJmb3JtYW5jZSBvbiBsYXJnZSB0cmVlcy5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIHN3aXRjaCAoY2hpbGQuc2VsZWN0ZWQudmFsdWUpIHtcbiAgICAgICAgY2FzZSBDbHJTZWxlY3RlZFN0YXRlLklOREVURVJNSU5BVEU6XG4gICAgICAgICAgcmV0dXJuIENsclNlbGVjdGVkU3RhdGUuSU5ERVRFUk1JTkFURTtcbiAgICAgICAgY2FzZSBDbHJTZWxlY3RlZFN0YXRlLlNFTEVDVEVEOlxuICAgICAgICAgIG9uZVNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAob25lVW5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIENsclNlbGVjdGVkU3RhdGUuSU5ERVRFUk1JTkFURTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2xyU2VsZWN0ZWRTdGF0ZS5VTlNFTEVDVEVEOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIERlZmF1bHQgaXMgdGhlIHNhbWUgYXMgdW5zZWxlY3RlZCwgaW4gY2FzZSBhbiB1bmRlZmluZWQgc29tZWhvdyBtYWRlIGl0IGFsbCB0aGUgd2F5IGhlcmUuXG4gICAgICAgICAgb25lVW5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKG9uZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gQ2xyU2VsZWN0ZWRTdGF0ZS5JTkRFVEVSTUlOQVRFO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvbmVTZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIENsclNlbGVjdGVkU3RhdGUuVU5TRUxFQ1RFRDtcbiAgICB9IGVsc2UgaWYgKCFvbmVVbnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gQ2xyU2VsZWN0ZWRTdGF0ZS5TRUxFQ1RFRDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBJbnRlcm5hbCwgYnV0IG5lZWRzIHRvIGJlIGNhbGxlZCBieSBvdGhlciBub2Rlc1xuICAgKi9cbiAgX3VwZGF0ZVNlbGVjdGlvbkZyb21DaGlsZHJlbigpIHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuY29tcHV0ZVNlbGVjdGlvblN0YXRlRnJvbUNoaWxkcmVuKCk7XG4gICAgaWYgKG5ld1N0YXRlID09PSB0aGlzLnNlbGVjdGVkLnZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQubmV4dChuZXdTdGF0ZSk7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5fdXBkYXRlU2VsZWN0aW9uRnJvbUNoaWxkcmVuKCk7XG4gICAgfVxuICB9XG59XG4iXX0=