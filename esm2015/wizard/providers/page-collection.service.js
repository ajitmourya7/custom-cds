/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * PageCollectionService manages the collection of pages assigned to the wizard and offers
 * a number of functions useful across the wizards providers and subcomponents -- all related
 * to essentially lookups on the collection of pages.
 *
 * The easiest way to access PageCollectionService is via the wizard. The
 * following example would allow you to access your instance of the wizard from your host
 * component and thereby access the page collection via YourHostComponent.wizard.pageCollection.
 *
 * @example
 * <clr-wizard #wizard ...>
 *
 * @example
 * export class YourHostComponent {
 *   @ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 * The heart of the page collection is the query list of pages, which it is assigned as a
 * reference to the Wizard.pages QueryList when the wizard is created.
 *
 */
let PageCollectionService = class PageCollectionService {
    /**
     * PageCollectionService manages the collection of pages assigned to the wizard and offers
     * a number of functions useful across the wizards providers and subcomponents -- all related
     * to essentially lookups on the collection of pages.
     *
     * The easiest way to access PageCollectionService is via the wizard. The
     * following example would allow you to access your instance of the wizard from your host
     * component and thereby access the page collection via YourHostComponent.wizard.pageCollection.
     *
     * @example
     * <clr-wizard #wizard ...>
     *
     * @example
     * export class YourHostComponent {
     *   @ViewChild("wizard") wizard: Wizard;
     *   ...
     * }
     *
     * The heart of the page collection is the query list of pages, which it is assigned as a
     * reference to the Wizard.pages QueryList when the wizard is created.
     *
     */
    constructor() {
        // used by the navService to navigate back to first possible step after
        // pages are reset
        /**
         *
         * @memberof PageCollectionService
         */
        this._pagesReset = new Subject();
    }
    /**
     * Converts the PageCollectionService.pages QueryList to an array and returns it.
     *
     * Useful for many instances when you would prefer a QueryList to act like an array.
     *
     * @memberof PageCollectionService
     */
    get pagesAsArray() {
        return this.pages ? this.pages.toArray() : [];
    }
    /**
     * Returns the length of the pages query list.
     *
     * @memberof PageCollectionService
     */
    get pagesCount() {
        return this.pages ? this.pages.length : 0;
    }
    /**
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * @memberof PageCollectionService
     */
    get penultimatePage() {
        const pageCount = this.pagesCount;
        if (pageCount < 2) {
            return;
        }
        return this.pagesAsArray[pageCount - 2];
    }
    /**
     * Returns the last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * @memberof PageCollectionService
     */
    get lastPage() {
        const pageCount = this.pagesCount;
        if (pageCount < 1) {
            return;
        }
        return this.pagesAsArray[pageCount - 1];
    }
    /**
     * Returns the first page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * @memberof PageCollectionService
     */
    get firstPage() {
        if (!this.pagesCount) {
            return;
        }
        return this.pagesAsArray[0];
    }
    /**
     * Used mostly internally, but accepts a string ID and returns a ClrWizardPage
     * object that matches the ID passed. Note that IDs here should include the prefix
     * "clr-wizard-page-".
     *
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * @memberof PageCollectionService
     */
    getPageById(id) {
        const foundPages = this.pages.filter((page) => id === page.id);
        return this.checkResults(foundPages, id);
    }
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * @memberof PageCollectionService
     */
    getPageByIndex(index) {
        const pageCount = this.pagesCount;
        const pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error('Cannot retrieve page with index of ' + index);
        }
        if (index > pagesLastIndex) {
            throw new Error('Page index is greater than length of pages array.');
        }
        return this.pagesAsArray[index];
    }
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * @memberof PageCollectionService
     */
    getPageIndex(page) {
        const index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error('Requested page cannot be found in collection of pages.');
        }
        return index;
    }
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * @memberof PageCollectionService
     */
    checkResults(results, requestedPageId) {
        const foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error('More than one page has the requested id ' + requestedPageId + '.');
        }
        else if (foundPagesCount < 1) {
            throw new Error('No page can be found with the id ' + requestedPageId + '.');
        }
        else {
            return results[0];
        }
    }
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * @memberof PageCollectionService
     */
    pageRange(start, end) {
        let pages = [];
        if (start < 0 || end < 0) {
            return [];
        }
        if (start === null || typeof start === 'undefined' || isNaN(start)) {
            return [];
        }
        if (end === null || typeof end === 'undefined' || isNaN(end)) {
            return [];
        }
        if (end > this.pagesCount) {
            end = this.pagesCount;
        }
        pages = this.pagesAsArray;
        if (end - start === 0) {
            // just return the one page they want
            return [this.getPageByIndex(start)];
        }
        // slice end does not include item referenced by end index, which is weird for users
        // incrementing end index here to correct that so users and other methods
        // don't have to think about it
        end = end + 1;
        // slice does not return the last one in the range but it does include the first one
        // does not modify original array
        return pages.slice(start, end);
    }
    /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     * @memberof PageCollectionService
     */
    getPageRangeFromPages(page, otherPage) {
        const pageIndex = this.getPageIndex(page);
        const otherPageIndex = this.getPageIndex(otherPage);
        let startIndex;
        let endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * @memberof PageCollectionService
     */
    getPreviousPage(page) {
        const myPageIndex = this.getPageIndex(page);
        const previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    }
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * @memberof PageCollectionService
     */
    previousPageIsCompleted(page) {
        let previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * @memberof PageCollectionService
     */
    getNextPage(page) {
        const myPageIndex = this.getPageIndex(page);
        const nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    }
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * @memberof PageCollectionService
     */
    getStepItemIdForPage(page) {
        const pageId = page.id;
        const pageIdParts = pageId.split('-').reverse();
        pageIdParts[1] = 'step';
        return pageIdParts.reverse().join('-');
    }
    /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     * @memberof PageCollectionService
     */
    commitPage(page) {
        const pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    }
    /**
     * An observable that the navigation service listens to in order to know when
     * the page collection completed states have been reset to false so that way it
     * can also reset the navigation to make the first page in the page collection
     * current/active.
     *
     * @memberof PageCollectionService
     */
    get pagesReset() {
        return this._pagesReset.asObservable();
    }
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * @memberof PageCollectionService
     */
    reset() {
        this.pagesAsArray.forEach((page) => {
            page.completed = false;
        });
        this._pagesReset.next(true);
    }
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * @memberof PageCollectionService
     */
    updateCompletedStates() {
        const firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach((page, index) => {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    }
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * @memberof PageCollectionService
     */
    findFirstIncompletePageIndex() {
        let returnIndex = null;
        this.pagesAsArray.forEach((page, index) => {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    }
    findFirstIncompletePage() {
        const myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    }
};
PageCollectionService = tslib_1.__decorate([
    Injectable()
], PageCollectionService);
export { PageCollectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQXZCbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNIO1FBNlNFLHVFQUF1RTtRQUN2RSxrQkFBa0I7UUFFbEI7OztXQUdHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBMkUvQyxDQUFDO0lBcFhDOzs7Ozs7T0FNRztJQUNILElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBVyxlQUFlO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFbEMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FB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QUUsS0FBYSxFQUFFLEVBQUU7WUFDL0QsSUFBSSxLQUFLLEdBQUcsb0JBQW9CLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDRCQUE0QjtRQUNqQyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFtQixFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQy9ELElBQUksSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDcEQsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsK0NBQStDO1FBQy9DLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU0sdUJBQXVCO1FBQzVCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNGLENBQUE7QUE5WFkscUJBQXFCO0lBRGpDLFVBQVUsRUFBRTtHQUNBLHFCQUFxQixDQThYakM7U0E5WFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZSB9IGZyb20gJy4uL3dpemFyZC1wYWdlJztcblxuLyoqXG4gKiBQYWdlQ29sbGVjdGlvblNlcnZpY2UgbWFuYWdlcyB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcyBhc3NpZ25lZCB0byB0aGUgd2l6YXJkIGFuZCBvZmZlcnNcbiAqIGEgbnVtYmVyIG9mIGZ1bmN0aW9ucyB1c2VmdWwgYWNyb3NzIHRoZSB3aXphcmRzIHByb3ZpZGVycyBhbmQgc3ViY29tcG9uZW50cyAtLSBhbGwgcmVsYXRlZFxuICogdG8gZXNzZW50aWFsbHkgbG9va3VwcyBvbiB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAqXG4gKiBUaGUgZWFzaWVzdCB3YXkgdG8gYWNjZXNzIFBhZ2VDb2xsZWN0aW9uU2VydmljZSBpcyB2aWEgdGhlIHdpemFyZC4gVGhlXG4gKiBmb2xsb3dpbmcgZXhhbXBsZSB3b3VsZCBhbGxvdyB5b3UgdG8gYWNjZXNzIHlvdXIgaW5zdGFuY2Ugb2YgdGhlIHdpemFyZCBmcm9tIHlvdXIgaG9zdFxuICogY29tcG9uZW50IGFuZCB0aGVyZWJ5IGFjY2VzcyB0aGUgcGFnZSBjb2xsZWN0aW9uIHZpYSBZb3VySG9zdENvbXBvbmVudC53aXphcmQucGFnZUNvbGxlY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIDxjbHItd2l6YXJkICN3aXphcmQgLi4uPlxuICpcbiAqIEBleGFtcGxlXG4gKiBleHBvcnQgY2xhc3MgWW91ckhvc3RDb21wb25lbnQge1xuICogICBAVmlld0NoaWxkKFwid2l6YXJkXCIpIHdpemFyZDogV2l6YXJkO1xuICogICAuLi5cbiAqIH1cbiAqXG4gKiBUaGUgaGVhcnQgb2YgdGhlIHBhZ2UgY29sbGVjdGlvbiBpcyB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcywgd2hpY2ggaXQgaXMgYXNzaWduZWQgYXMgYVxuICogcmVmZXJlbmNlIHRvIHRoZSBXaXphcmQucGFnZXMgUXVlcnlMaXN0IHdoZW4gdGhlIHdpemFyZCBpcyBjcmVhdGVkLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2VDb2xsZWN0aW9uU2VydmljZSB7XG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgV2l6YXJkLnBhZ2VzIFF1ZXJ5TGlzdC5cbiAgICpcbiAgICogUG9wdWxhdGVkIHdoZW4gdGhlIHdpemFyZCBpcyBjcmVhdGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcGFnZXM6IFF1ZXJ5TGlzdDxDbHJXaXphcmRQYWdlPjtcblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIFBhZ2VDb2xsZWN0aW9uU2VydmljZS5wYWdlcyBRdWVyeUxpc3QgdG8gYW4gYXJyYXkgYW5kIHJldHVybnMgaXQuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgbWFueSBpbnN0YW5jZXMgd2hlbiB5b3Ugd291bGQgcHJlZmVyIGEgUXVlcnlMaXN0IHRvIGFjdCBsaWtlIGFuIGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VzQXNBcnJheSgpOiBDbHJXaXphcmRQYWdlW10ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VzID8gdGhpcy5wYWdlcy50b0FycmF5KCkgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhlIHBhZ2VzIHF1ZXJ5IGxpc3QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZXNDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2VzID8gdGhpcy5wYWdlcy5sZW5ndGggOiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5leHQtdG8tbGFzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBlbnVsdGltYXRlUGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBwYWdlQ291bnQgPSB0aGlzLnBhZ2VzQ291bnQ7XG5cbiAgICBpZiAocGFnZUNvdW50IDwgMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtwYWdlQ291bnQgLSAyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsYXN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbGFzdFBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgcGFnZUNvdW50ID0gdGhpcy5wYWdlc0NvdW50O1xuXG4gICAgaWYgKHBhZ2VDb3VudCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbcGFnZUNvdW50IC0gMV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgaWYgKCF0aGlzLnBhZ2VzQ291bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbMF07XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBtb3N0bHkgaW50ZXJuYWxseSwgYnV0IGFjY2VwdHMgYSBzdHJpbmcgSUQgYW5kIHJldHVybnMgYSBDbHJXaXphcmRQYWdlXG4gICAqIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIElEIHBhc3NlZC4gTm90ZSB0aGF0IElEcyBoZXJlIHNob3VsZCBpbmNsdWRlIHRoZSBwcmVmaXhcbiAgICogXCJjbHItd2l6YXJkLXBhZ2UtXCIuXG4gICAqXG4gICAqIFJldHVybnMgdGhlIG5leHQtdG8tbGFzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZUJ5SWQoaWQ6IHN0cmluZyk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IGZvdW5kUGFnZXM6IENscldpemFyZFBhZ2VbXSA9IHRoaXMucGFnZXMuZmlsdGVyKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiBpZCA9PT0gcGFnZS5pZCk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tSZXN1bHRzKGZvdW5kUGFnZXMsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHMgbnVtYmVyIGFzIGEgcGFyYW1ldGVyIGFuZCB0cmVhdHMgdGhhdCBudW1iZXIgYXMgdGhlIGluZGV4IG9mIHRoZSBwYWdlXG4gICAqIHlvdSdyZSBsb29raW5nIGZvciBpbiB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcy4gUmV0dXJucyBhICB3aXphcmQgcGFnZSBvYmplY3QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlQnlJbmRleChpbmRleDogbnVtYmVyKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgcGFnZUNvdW50ID0gdGhpcy5wYWdlc0NvdW50O1xuICAgIGNvbnN0IHBhZ2VzTGFzdEluZGV4OiBudW1iZXIgPSBwYWdlQ291bnQgPiAxID8gcGFnZUNvdW50IC0gMSA6IDA7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXRyaWV2ZSBwYWdlIHdpdGggaW5kZXggb2YgJyArIGluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPiBwYWdlc0xhc3RJbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYWdlIGluZGV4IGlzIGdyZWF0ZXIgdGhhbiBsZW5ndGggb2YgcGFnZXMgYXJyYXkuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W2luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBpdHMgaW5kZXggaW4gdGhlXG4gICAqIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlSW5kZXgocGFnZTogQ2xyV2l6YXJkUGFnZSk6IG51bWJlciB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhZ2VzQXNBcnJheS5pbmRleE9mKHBhZ2UpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1ZXN0ZWQgcGFnZSBjYW5ub3QgYmUgZm91bmQgaW4gY29sbGVjdGlvbiBvZiBwYWdlcy4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ29uc29saWRhdGVzIGd1YXJkIGxvZ2ljIHRoYXQgcHJldmVudHMgYSBjb3VwbGUgb2YgdW5mb3J0dW5hdGUgZWRnZSBjYXNlcyB3aXRoXG4gICAqIGxvb2sgdXBzIG9uIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIGNoZWNrUmVzdWx0cyhyZXN1bHRzOiBDbHJXaXphcmRQYWdlW10sIHJlcXVlc3RlZFBhZ2VJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZm91bmRQYWdlc0NvdW50OiBudW1iZXIgPSByZXN1bHRzLmxlbmd0aCB8fCAwO1xuXG4gICAgaWYgKGZvdW5kUGFnZXNDb3VudCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTW9yZSB0aGFuIG9uZSBwYWdlIGhhcyB0aGUgcmVxdWVzdGVkIGlkICcgKyByZXF1ZXN0ZWRQYWdlSWQgKyAnLicpO1xuICAgIH0gZWxzZSBpZiAoZm91bmRQYWdlc0NvdW50IDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYWdlIGNhbiBiZSBmb3VuZCB3aXRoIHRoZSBpZCAnICsgcmVxdWVzdGVkUGFnZUlkICsgJy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdHdvIG51bWVyaWMgaW5kZXhlcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB3aXphcmQgcGFnZSBvYmplY3RzIHRoYXQgaW5jbHVkZVxuICAgKiBhbGwgd2l6YXJkIHBhZ2VzIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24gZnJvbSB0aGUgZmlyc3QgaW5kZXggdG8gdGhlIHNlY29uZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBhZ2VSYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IENscldpemFyZFBhZ2VbXSB7XG4gICAgbGV0IHBhZ2VzOiBDbHJXaXphcmRQYWdlW10gPSBbXTtcblxuICAgIGlmIChzdGFydCA8IDAgfHwgZW5kIDwgMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnIHx8IGlzTmFOKHN0YXJ0KSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChlbmQgPT09IG51bGwgfHwgdHlwZW9mIGVuZCA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4oZW5kKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChlbmQgPiB0aGlzLnBhZ2VzQ291bnQpIHtcbiAgICAgIGVuZCA9IHRoaXMucGFnZXNDb3VudDtcbiAgICB9XG5cbiAgICBwYWdlcyA9IHRoaXMucGFnZXNBc0FycmF5O1xuXG4gICAgaWYgKGVuZCAtIHN0YXJ0ID09PSAwKSB7XG4gICAgICAvLyBqdXN0IHJldHVybiB0aGUgb25lIHBhZ2UgdGhleSB3YW50XG4gICAgICByZXR1cm4gW3RoaXMuZ2V0UGFnZUJ5SW5kZXgoc3RhcnQpXTtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBlbmQgZG9lcyBub3QgaW5jbHVkZSBpdGVtIHJlZmVyZW5jZWQgYnkgZW5kIGluZGV4LCB3aGljaCBpcyB3ZWlyZCBmb3IgdXNlcnNcbiAgICAvLyBpbmNyZW1lbnRpbmcgZW5kIGluZGV4IGhlcmUgdG8gY29ycmVjdCB0aGF0IHNvIHVzZXJzIGFuZCBvdGhlciBtZXRob2RzXG4gICAgLy8gZG9uJ3QgaGF2ZSB0byB0aGluayBhYm91dCBpdFxuICAgIGVuZCA9IGVuZCArIDE7XG5cbiAgICAvLyBzbGljZSBkb2VzIG5vdCByZXR1cm4gdGhlIGxhc3Qgb25lIGluIHRoZSByYW5nZSBidXQgaXQgZG9lcyBpbmNsdWRlIHRoZSBmaXJzdCBvbmVcbiAgICAvLyBkb2VzIG5vdCBtb2RpZnkgb3JpZ2luYWwgYXJyYXlcbiAgICByZXR1cm4gcGFnZXMuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyB0d28gd2l6YXJkIHBhZ2Ugb2JqZWN0cyBhbmQgcmV0dXJucyB0aG9zZSBwYWdlIG9iamVjdHMgd2l0aCBhbGwgb3RoZXIgcGFnZVxuICAgKiBvYmplY3RzIGJldHdlZW4gdGhlbSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLiBJdCBkb2Vzbid0IGNhcmUgd2hpY2ggcGFnZSBpcyBhaGVhZCBvZiB0aGVcbiAgICogb3RoZXIgaW4gdGhlIHBhcmFtZXRlcnMuIEl0IHdpbGwgYmUgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSB0aGF0IG91dCAgb24gaXRzIG93bi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VSYW5nZUZyb21QYWdlcyhwYWdlOiBDbHJXaXphcmRQYWdlLCBvdGhlclBhZ2U6IENscldpemFyZFBhZ2UpOiBDbHJXaXphcmRQYWdlW10ge1xuICAgIGNvbnN0IHBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IG90aGVyUGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgob3RoZXJQYWdlKTtcbiAgICBsZXQgc3RhcnRJbmRleDogbnVtYmVyO1xuICAgIGxldCBlbmRJbmRleDogbnVtYmVyO1xuXG4gICAgaWYgKHBhZ2VJbmRleCA8PSBvdGhlclBhZ2VJbmRleCkge1xuICAgICAgc3RhcnRJbmRleCA9IHBhZ2VJbmRleDtcbiAgICAgIGVuZEluZGV4ID0gb3RoZXJQYWdlSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBvdGhlclBhZ2VJbmRleDtcbiAgICAgIGVuZEluZGV4ID0gcGFnZUluZGV4O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlUmFuZ2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIHRoZSB3aXphcmQgcGFnZSBvYmplY3Qgb2ZcbiAgICogdGhlIHBhZ2UgaW1tZWRpYXRlbHkgYmVmb3JlIGl0IGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uIFJldHVybnMgbnVsbCBpZiB0aGVyZSBpc1xuICAgKiBubyBwYWdlIGJlZm9yZSB0aGUgcGFnZSBpdCBpcyBwYXNzZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQcmV2aW91c1BhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IG15UGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSBteVBhZ2VJbmRleCAtIDE7XG4gICAgaWYgKHByZXZpb3VzUGFnZUluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFBhZ2VCeUluZGV4KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGEgQm9vbGVhbiB0aGF0IHNheXMgaWZcbiAgICogdGhlIHBhZ2UgeW91IHNlbnQgaXQgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwcmV2aW91c1BhZ2VJc0NvbXBsZXRlZChwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgbGV0IHByZXZpb3VzUGFnZTogQ2xyV2l6YXJkUGFnZTtcblxuICAgIGlmICghcGFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSA9IHRoaXMuZ2V0UHJldmlvdXNQYWdlKHBhZ2UpO1xuXG4gICAgaWYgKG51bGwgPT09IHByZXZpb3VzUGFnZSkge1xuICAgICAgLy8gcGFnZSBpcyB0aGUgZmlyc3QgcGFnZS4gbm8gcHJldmlvdXMgcGFnZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2aW91c1BhZ2UuY29tcGxldGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIHRoZSB3aXphcmQgcGFnZSBvYmplY3Qgb2ZcbiAgICogdGhlIHBhZ2UgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi4gUmV0dXJucyBudWxsIGlmIHRoZXJlIGlzXG4gICAqIG5vIHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgaXQgaXMgcGFzc2VkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0TmV4dFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IG15UGFnZUluZGV4ID0gdGhpcy5nZXRQYWdlSW5kZXgocGFnZSk7XG4gICAgY29uc3QgbmV4dFBhZ2VJbmRleCA9IG15UGFnZUluZGV4ICsgMTtcblxuICAgIGlmIChuZXh0UGFnZUluZGV4ID49IHRoaXMucGFnZXNBc0FycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFBhZ2VCeUluZGV4KG5leHRQYWdlSW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgd2l6YXJkIHBhZ2Ugb2JqZWN0IGFzIGEgcGFyYW1ldGVyIGFuZCBnZW5lcmF0ZXMgYSBzdGVwIGl0ZW0gaWQgZnJvbSB0aGVcbiAgICogcGFnZSBJRC4gUmV0dXJucyB0aGUgZ2VuZXJhdGVkIHN0ZXAgaXRlbSBJRCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFN0ZXBJdGVtSWRGb3JQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBwYWdlSWQgPSBwYWdlLmlkO1xuICAgIGNvbnN0IHBhZ2VJZFBhcnRzID0gcGFnZUlkLnNwbGl0KCctJykucmV2ZXJzZSgpO1xuXG4gICAgcGFnZUlkUGFydHNbMV0gPSAnc3RlcCc7XG4gICAgcmV0dXJuIHBhZ2VJZFBhcnRzLnJldmVyc2UoKS5qb2luKCctJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhbGx5IG9ubHkgdXNlZCBpbnRlcm5hbGx5IHRvIG1hcmsgdGhhdCBhIHNwZWNpZmljIHBhZ2UgaGFzIGJlZW4gXCJjb21taXR0ZWRcIi5cbiAgICogVGhpcyBpbnZvbHZlcyBtYXJraW5nIHRoZSBwYWdlIGNvbXBsZXRlIGFuZCBmaXJpbmcgdGhlIENscldpemFyZFBhZ2Uub25Db21taXRcbiAgICogKGNscldpemFyZFBhZ2VPbkNvbW1pdCkgb3V0cHV0LiBUYWtlcyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IHRoYXQgeW91IGludGVuZCB0b1xuICAgKiBtYXJrIGNvbXBsZXRlZCBhcyBhIHBhcmFtZXRlci5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNvbW1pdFBhZ2UocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGNvbnN0IHBhZ2VIYXNPdmVycmlkZXMgPSBwYWdlLnN0b3BOZXh0IHx8IHBhZ2UucHJldmVudERlZmF1bHQ7XG4gICAgcGFnZS5jb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKCFwYWdlSGFzT3ZlcnJpZGVzKSB7XG4gICAgICAvLyBwcmV2ZW50IGxvb3Agb2YgZXZlbnQgZW1pc3Npb247IGFsdGVybmF0ZSBmbG93cyB3b3JrIG9mZlxuICAgICAgLy8gb2YgZXZlbnQgZW1pdHRlcnMgdGhpcyBpcyBob3cgdGhleSBicmVhayB0aGF0IGN5Y2xlLlxuICAgICAgcGFnZS5vbkNvbW1pdC5lbWl0KHBhZ2UuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHVzZWQgYnkgdGhlIG5hdlNlcnZpY2UgdG8gbmF2aWdhdGUgYmFjayB0byBmaXJzdCBwb3NzaWJsZSBzdGVwIGFmdGVyXG4gIC8vIHBhZ2VzIGFyZSByZXNldFxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9wYWdlc1Jlc2V0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgbGlzdGVucyB0byBpbiBvcmRlciB0byBrbm93IHdoZW5cbiAgICogdGhlIHBhZ2UgY29sbGVjdGlvbiBjb21wbGV0ZWQgc3RhdGVzIGhhdmUgYmVlbiByZXNldCB0byBmYWxzZSBzbyB0aGF0IHdheSBpdFxuICAgKiBjYW4gYWxzbyByZXNldCB0aGUgbmF2aWdhdGlvbiB0byBtYWtlIHRoZSBmaXJzdCBwYWdlIGluIHRoZSBwYWdlIGNvbGxlY3Rpb25cbiAgICogY3VycmVudC9hY3RpdmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgcGFnZXNSZXNldCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZXNSZXNldC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFsbCBjb21wbGV0ZWQgc3RhdGVzIG9mIHRoZSBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIHRvIGZhbHNlIGFuZFxuICAgKiBub3RpZmllcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIHRvIGxpa2V3aXNlIHJlc2V0IHRoZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5wYWdlc0FzQXJyYXkuZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgcGFnZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLl9wYWdlc1Jlc2V0Lm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbHMgdGhyb3VnaCBhbGwgdGhlIHBhZ2VzIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24gdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBub1xuICAgKiBpbmNvbXBsZXRlIHBhZ2VzIHNhbmR3aWNoZWQgYmV0d2VlbiBjb21wbGV0ZWQgcGFnZXMgaW4gdGhlIHdvcmtmbG93LiBJZGVudGlmaWVzXG4gICAqIHRoZSBmaXJzdCBpbmNvbXBsZXRlIHBhZ2UgaW5kZXggYW5kIHNldHMgYWxsIHBhZ2VzIGJlaGluZCBpdCB0byBhIGNvbXBsZXRlZFxuICAgKiBzdGF0ZSBvZiBmYWxzZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbXBsZXRlZFN0YXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdEluY29tcGxldGVJbmRleCA9IHRoaXMuZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpO1xuXG4gICAgaWYgKGZpcnN0SW5jb21wbGV0ZUluZGV4ID09PSB0aGlzLnBhZ2VzQXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBhbGwgY29tcGxldGUgbm8gbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChpbmRleCA+IGZpcnN0SW5jb21wbGV0ZUluZGV4KSB7XG4gICAgICAgIHBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgaW5jb21wbGV0ZSBwYWdlIGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmaW5kRmlyc3RJbmNvbXBsZXRlUGFnZUluZGV4KCk6IG51bWJlciB7XG4gICAgbGV0IHJldHVybkluZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChudWxsID09PSByZXR1cm5JbmRleCAmJiBmYWxzZSA9PT0gcGFnZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGZhbGx0aHJvdWdoLCBhbGwgY29tcGxldGVkLCByZXR1cm4gbGFzdCBwYWdlXG4gICAgaWYgKG51bGwgPT09IHJldHVybkluZGV4KSB7XG4gICAgICByZXR1cm5JbmRleCA9IHRoaXMucGFnZXNDb3VudCAtIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVybkluZGV4O1xuICB9XG5cbiAgcHVibGljIGZpbmRGaXJzdEluY29tcGxldGVQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IG15SW5jb21wbGV0ZUluZGV4ID0gdGhpcy5maW5kRmlyc3RJbmNvbXBsZXRlUGFnZUluZGV4KCk7XG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W215SW5jb21wbGV0ZUluZGV4XTtcbiAgfVxufVxuIl19