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
var PageCollectionService = /** @class */ (function () {
    function PageCollectionService() {
        // used by the navService to navigate back to first possible step after
        // pages are reset
        /**
         *
         * @memberof PageCollectionService
         */
        this._pagesReset = new Subject();
    }
    Object.defineProperty(PageCollectionService.prototype, "pagesAsArray", {
        /**
         * Converts the PageCollectionService.pages QueryList to an array and returns it.
         *
         * Useful for many instances when you would prefer a QueryList to act like an array.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            return this.pages ? this.pages.toArray() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "pagesCount", {
        /**
         * Returns the length of the pages query list.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            return this.pages ? this.pages.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "penultimatePage", {
        /**
         * Returns the next-to-last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            var pageCount = this.pagesCount;
            if (pageCount < 2) {
                return;
            }
            return this.pagesAsArray[pageCount - 2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "lastPage", {
        /**
         * Returns the last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            var pageCount = this.pagesCount;
            if (pageCount < 1) {
                return;
            }
            return this.pagesAsArray[pageCount - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "firstPage", {
        /**
         * Returns the first page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            if (!this.pagesCount) {
                return;
            }
            return this.pagesAsArray[0];
        },
        enumerable: true,
        configurable: true
    });
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
    PageCollectionService.prototype.getPageById = function (id) {
        var foundPages = this.pages.filter(function (page) { return id === page.id; });
        return this.checkResults(foundPages, id);
    };
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getPageByIndex = function (index) {
        var pageCount = this.pagesCount;
        var pagesLastIndex = pageCount > 1 ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error('Cannot retrieve page with index of ' + index);
        }
        if (index > pagesLastIndex) {
            throw new Error('Page index is greater than length of pages array.');
        }
        return this.pagesAsArray[index];
    };
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getPageIndex = function (page) {
        var index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error('Requested page cannot be found in collection of pages.');
        }
        return index;
    };
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.checkResults = function (results, requestedPageId) {
        var foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error('More than one page has the requested id ' + requestedPageId + '.');
        }
        else if (foundPagesCount < 1) {
            throw new Error('No page can be found with the id ' + requestedPageId + '.');
        }
        else {
            return results[0];
        }
    };
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.pageRange = function (start, end) {
        var pages = [];
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
    };
    /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getPageRangeFromPages = function (page, otherPage) {
        var pageIndex = this.getPageIndex(page);
        var otherPageIndex = this.getPageIndex(otherPage);
        var startIndex;
        var endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    };
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getPreviousPage = function (page) {
        var myPageIndex = this.getPageIndex(page);
        var previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    };
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.previousPageIsCompleted = function (page) {
        var previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    };
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getNextPage = function (page) {
        var myPageIndex = this.getPageIndex(page);
        var nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    };
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.getStepItemIdForPage = function (page) {
        var pageId = page.id;
        var pageIdParts = pageId.split('-').reverse();
        pageIdParts[1] = 'step';
        return pageIdParts.reverse().join('-');
    };
    /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the ClrWizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.commitPage = function (page) {
        var pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    };
    Object.defineProperty(PageCollectionService.prototype, "pagesReset", {
        /**
         * An observable that the navigation service listens to in order to know when
         * the page collection completed states have been reset to false so that way it
         * can also reset the navigation to make the first page in the page collection
         * current/active.
         *
         * @memberof PageCollectionService
         */
        get: function () {
            return this._pagesReset.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.reset = function () {
        this.pagesAsArray.forEach(function (page) {
            page.completed = false;
        });
        this._pagesReset.next(true);
    };
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.updateCompletedStates = function () {
        var firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach(function (page, index) {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    };
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     * @memberof PageCollectionService
     */
    PageCollectionService.prototype.findFirstIncompletePageIndex = function () {
        var returnIndex = null;
        this.pagesAsArray.forEach(function (page, index) {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    };
    PageCollectionService.prototype.findFirstIncompletePage = function () {
        var myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    };
    PageCollectionService = tslib_1.__decorate([
        Injectable()
    ], PageCollectionService);
    return PageCollectionService;
}());
export { PageCollectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvcHJvdmlkZXJzL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSDtJQURBO1FBNlNFLHVFQUF1RTtRQUN2RSxrQkFBa0I7UUFFbEI7OztXQUdHO1FBQ0ssZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBMkUvQyxDQUFDO0lBN1dDLHNCQUFXLCtDQUFZO1FBUHZCOzs7Ozs7V0FNRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyw2Q0FBVTtRQUxyQjs7OztXQUlHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFRRCxzQkFBVyxrREFBZTtRQU4xQjs7Ozs7V0FLRzthQUNIO1lBQ0UsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVsQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFRRCxzQkFBVywyQ0FBUTtR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QUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekQsc0NBQXNDO1lBQ3RDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBbUIsRUFBRSxLQUFhO1lBQzNELElBQUksS0FBSyxHQUFHLG9CQUFvQixFQUFFO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw0REFBNEIsR0FBbkM7UUFDRSxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFtQixFQUFFLEtBQWE7WUFDM0QsSUFBSSxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNwRCxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCwrQ0FBK0M7UUFDL0MsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3hCLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTSx1REFBdUIsR0FBOUI7UUFDRSxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUE3WFUscUJBQXFCO1FBRGpDLFVBQVUsRUFBRTtPQUNBLHFCQUFxQixDQThYakM7SUFBRCw0QkFBQztDQUFBLEFBOVhELElBOFhDO1NBOVhZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuLi93aXphcmQtcGFnZSc7XG5cbi8qKlxuICogUGFnZUNvbGxlY3Rpb25TZXJ2aWNlIG1hbmFnZXMgdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMgYXNzaWduZWQgdG8gdGhlIHdpemFyZCBhbmQgb2ZmZXJzXG4gKiBhIG51bWJlciBvZiBmdW5jdGlvbnMgdXNlZnVsIGFjcm9zcyB0aGUgd2l6YXJkcyBwcm92aWRlcnMgYW5kIHN1YmNvbXBvbmVudHMgLS0gYWxsIHJlbGF0ZWRcbiAqIHRvIGVzc2VudGlhbGx5IGxvb2t1cHMgb24gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gKlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIGFjY2VzcyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgaXMgdmlhIHRoZSB3aXphcmQuIFRoZVxuICogZm9sbG93aW5nIGV4YW1wbGUgd291bGQgYWxsb3cgeW91IHRvIGFjY2VzcyB5b3VyIGluc3RhbmNlIG9mIHRoZSB3aXphcmQgZnJvbSB5b3VyIGhvc3RcbiAqIGNvbXBvbmVudCBhbmQgdGhlcmVieSBhY2Nlc3MgdGhlIHBhZ2UgY29sbGVjdGlvbiB2aWEgWW91ckhvc3RDb21wb25lbnQud2l6YXJkLnBhZ2VDb2xsZWN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8Y2xyLXdpemFyZCAjd2l6YXJkIC4uLj5cbiAqXG4gKiBAZXhhbXBsZVxuICogZXhwb3J0IGNsYXNzIFlvdXJIb3N0Q29tcG9uZW50IHtcbiAqICAgQFZpZXdDaGlsZChcIndpemFyZFwiKSB3aXphcmQ6IFdpemFyZDtcbiAqICAgLi4uXG4gKiB9XG4gKlxuICogVGhlIGhlYXJ0IG9mIHRoZSBwYWdlIGNvbGxlY3Rpb24gaXMgdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMsIHdoaWNoIGl0IGlzIGFzc2lnbmVkIGFzIGFcbiAqIHJlZmVyZW5jZSB0byB0aGUgV2l6YXJkLnBhZ2VzIFF1ZXJ5TGlzdCB3aGVuIHRoZSB3aXphcmQgaXMgY3JlYXRlZC5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlQ29sbGVjdGlvblNlcnZpY2Uge1xuICAvKipcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIFdpemFyZC5wYWdlcyBRdWVyeUxpc3QuXG4gICAqXG4gICAqIFBvcHVsYXRlZCB3aGVuIHRoZSB3aXphcmQgaXMgY3JlYXRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBhZ2VzOiBRdWVyeUxpc3Q8Q2xyV2l6YXJkUGFnZT47XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBQYWdlQ29sbGVjdGlvblNlcnZpY2UucGFnZXMgUXVlcnlMaXN0IHRvIGFuIGFycmF5IGFuZCByZXR1cm5zIGl0LlxuICAgKlxuICAgKiBVc2VmdWwgZm9yIG1hbnkgaW5zdGFuY2VzIHdoZW4geW91IHdvdWxkIHByZWZlciBhIFF1ZXJ5TGlzdCB0byBhY3QgbGlrZSBhbiBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwYWdlc0FzQXJyYXkoKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA/IHRoaXMucGFnZXMudG9BcnJheSgpIDogW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoZSBwYWdlcyBxdWVyeSBsaXN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcyA/IHRoaXMucGFnZXMubGVuZ3RoIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0LXRvLWxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldCBwZW51bHRpbWF0ZVBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgY29uc3QgcGFnZUNvdW50ID0gdGhpcy5wYWdlc0NvdW50O1xuXG4gICAgaWYgKHBhZ2VDb3VudCA8IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlc0FzQXJyYXlbcGFnZUNvdW50IC0gMl07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGFzdCBwYWdlIGluIHRoZSBxdWVyeSBsaXN0IG9mIHBhZ2VzLiBPcGVyYXRlcyBhcyBhIGdldHRlclxuICAgKiBzbyB0aGF0IGl0IGlzbid0IHdvcmtpbmcgd2l0aCBzdGFsZSBkYXRhLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxhc3RQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcblxuICAgIGlmIChwYWdlQ291bnQgPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5W3BhZ2VDb3VudCAtIDFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IHBhZ2UgaW4gdGhlIHF1ZXJ5IGxpc3Qgb2YgcGFnZXMuIE9wZXJhdGVzIGFzIGEgZ2V0dGVyXG4gICAqIHNvIHRoYXQgaXQgaXNuJ3Qgd29ya2luZyB3aXRoIHN0YWxlIGRhdGEuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQYWdlKCk6IENscldpemFyZFBhZ2Uge1xuICAgIGlmICghdGhpcy5wYWdlc0NvdW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFnZXNBc0FycmF5WzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgbW9zdGx5IGludGVybmFsbHksIGJ1dCBhY2NlcHRzIGEgc3RyaW5nIElEIGFuZCByZXR1cm5zIGEgQ2xyV2l6YXJkUGFnZVxuICAgKiBvYmplY3QgdGhhdCBtYXRjaGVzIHRoZSBJRCBwYXNzZWQuIE5vdGUgdGhhdCBJRHMgaGVyZSBzaG91bGQgaW5jbHVkZSB0aGUgcHJlZml4XG4gICAqIFwiY2xyLXdpemFyZC1wYWdlLVwiLlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0LXRvLWxhc3QgcGFnZSBpbiB0aGUgcXVlcnkgbGlzdCBvZiBwYWdlcy4gT3BlcmF0ZXMgYXMgYSBnZXR0ZXJcbiAgICogc28gdGhhdCBpdCBpc24ndCB3b3JraW5nIHdpdGggc3RhbGUgZGF0YS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldFBhZ2VCeUlkKGlkOiBzdHJpbmcpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBmb3VuZFBhZ2VzOiBDbHJXaXphcmRQYWdlW10gPSB0aGlzLnBhZ2VzLmZpbHRlcigocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4gaWQgPT09IHBhZ2UuaWQpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrUmVzdWx0cyhmb3VuZFBhZ2VzLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBzIG51bWJlciBhcyBhIHBhcmFtZXRlciBhbmQgdHJlYXRzIHRoYXQgbnVtYmVyIGFzIHRoZSBpbmRleCBvZiB0aGUgcGFnZVxuICAgKiB5b3UncmUgbG9va2luZyBmb3IgaW4gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuIFJldHVybnMgYSAgd2l6YXJkIHBhZ2Ugb2JqZWN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IENscldpemFyZFBhZ2Uge1xuICAgIGNvbnN0IHBhZ2VDb3VudCA9IHRoaXMucGFnZXNDb3VudDtcbiAgICBjb25zdCBwYWdlc0xhc3RJbmRleDogbnVtYmVyID0gcGFnZUNvdW50ID4gMSA/IHBhZ2VDb3VudCAtIDEgOiAwO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmV0cmlldmUgcGFnZSB3aXRoIGluZGV4IG9mICcgKyBpbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID4gcGFnZXNMYXN0SW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFnZSBpbmRleCBpcyBncmVhdGVyIHRoYW4gbGVuZ3RoIG9mIHBhZ2VzIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtpbmRleF07XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB3aXphcmQgcGFnZSBvYmplY3QgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgaXRzIGluZGV4IGluIHRoZVxuICAgKiBjb2xsZWN0aW9uIG9mIHBhZ2VzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFnZUluZGV4KHBhZ2U6IENscldpemFyZFBhZ2UpOiBudW1iZXIge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYWdlc0FzQXJyYXkuaW5kZXhPZihwYWdlKTtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdGVkIHBhZ2UgY2Fubm90IGJlIGZvdW5kIGluIGNvbGxlY3Rpb24gb2YgcGFnZXMuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnNvbGlkYXRlcyBndWFyZCBsb2dpYyB0aGF0IHByZXZlbnRzIGEgY291cGxlIG9mIHVuZm9ydHVuYXRlIGVkZ2UgY2FzZXMgd2l0aFxuICAgKiBsb29rIHVwcyBvbiB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBjaGVja1Jlc3VsdHMocmVzdWx0czogQ2xyV2l6YXJkUGFnZVtdLCByZXF1ZXN0ZWRQYWdlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGZvdW5kUGFnZXNDb3VudDogbnVtYmVyID0gcmVzdWx0cy5sZW5ndGggfHwgMDtcblxuICAgIGlmIChmb3VuZFBhZ2VzQ291bnQgPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vcmUgdGhhbiBvbmUgcGFnZSBoYXMgdGhlIHJlcXVlc3RlZCBpZCAnICsgcmVxdWVzdGVkUGFnZUlkICsgJy4nKTtcbiAgICB9IGVsc2UgaWYgKGZvdW5kUGFnZXNDb3VudCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFnZSBjYW4gYmUgZm91bmQgd2l0aCB0aGUgaWQgJyArIHJlcXVlc3RlZFBhZ2VJZCArICcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHR3byBudW1lcmljIGluZGV4ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygd2l6YXJkIHBhZ2Ugb2JqZWN0cyB0aGF0IGluY2x1ZGVcbiAgICogYWxsIHdpemFyZCBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIGZyb20gdGhlIGZpcnN0IGluZGV4IHRvIHRoZSBzZWNvbmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBwYWdlUmFuZ2Uoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBDbHJXaXphcmRQYWdlW10ge1xuICAgIGxldCBwYWdlczogQ2xyV2l6YXJkUGFnZVtdID0gW107XG5cbiAgICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA8IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPT09IG51bGwgfHwgdHlwZW9mIHN0YXJ0ID09PSAndW5kZWZpbmVkJyB8fCBpc05hTihzdGFydCkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoZW5kID09PSBudWxsIHx8IHR5cGVvZiBlbmQgPT09ICd1bmRlZmluZWQnIHx8IGlzTmFOKGVuZCkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoZW5kID4gdGhpcy5wYWdlc0NvdW50KSB7XG4gICAgICBlbmQgPSB0aGlzLnBhZ2VzQ291bnQ7XG4gICAgfVxuXG4gICAgcGFnZXMgPSB0aGlzLnBhZ2VzQXNBcnJheTtcblxuICAgIGlmIChlbmQgLSBzdGFydCA9PT0gMCkge1xuICAgICAgLy8ganVzdCByZXR1cm4gdGhlIG9uZSBwYWdlIHRoZXkgd2FudFxuICAgICAgcmV0dXJuIFt0aGlzLmdldFBhZ2VCeUluZGV4KHN0YXJ0KV07XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgZW5kIGRvZXMgbm90IGluY2x1ZGUgaXRlbSByZWZlcmVuY2VkIGJ5IGVuZCBpbmRleCwgd2hpY2ggaXMgd2VpcmQgZm9yIHVzZXJzXG4gICAgLy8gaW5jcmVtZW50aW5nIGVuZCBpbmRleCBoZXJlIHRvIGNvcnJlY3QgdGhhdCBzbyB1c2VycyBhbmQgb3RoZXIgbWV0aG9kc1xuICAgIC8vIGRvbid0IGhhdmUgdG8gdGhpbmsgYWJvdXQgaXRcbiAgICBlbmQgPSBlbmQgKyAxO1xuXG4gICAgLy8gc2xpY2UgZG9lcyBub3QgcmV0dXJuIHRoZSBsYXN0IG9uZSBpbiB0aGUgcmFuZ2UgYnV0IGl0IGRvZXMgaW5jbHVkZSB0aGUgZmlyc3Qgb25lXG4gICAgLy8gZG9lcyBub3QgbW9kaWZ5IG9yaWdpbmFsIGFycmF5XG4gICAgcmV0dXJuIHBhZ2VzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgdHdvIHdpemFyZCBwYWdlIG9iamVjdHMgYW5kIHJldHVybnMgdGhvc2UgcGFnZSBvYmplY3RzIHdpdGggYWxsIG90aGVyIHBhZ2VcbiAgICogb2JqZWN0cyBiZXR3ZWVuIHRoZW0gaW4gdGhlIHBhZ2UgY29sbGVjdGlvbi4gSXQgZG9lc24ndCBjYXJlIHdoaWNoIHBhZ2UgaXMgYWhlYWQgb2YgdGhlXG4gICAqIG90aGVyIGluIHRoZSBwYXJhbWV0ZXJzLiBJdCB3aWxsIGJlIHNtYXJ0IGVub3VnaCB0byBmaWd1cmUgdGhhdCBvdXQgIG9uIGl0cyBvd24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlUmFuZ2VGcm9tUGFnZXMocGFnZTogQ2xyV2l6YXJkUGFnZSwgb3RoZXJQYWdlOiBDbHJXaXphcmRQYWdlKTogQ2xyV2l6YXJkUGFnZVtdIHtcbiAgICBjb25zdCBwYWdlSW5kZXggPSB0aGlzLmdldFBhZ2VJbmRleChwYWdlKTtcbiAgICBjb25zdCBvdGhlclBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KG90aGVyUGFnZSk7XG4gICAgbGV0IHN0YXJ0SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgZW5kSW5kZXg6IG51bWJlcjtcblxuICAgIGlmIChwYWdlSW5kZXggPD0gb3RoZXJQYWdlSW5kZXgpIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBwYWdlSW5kZXg7XG4gICAgICBlbmRJbmRleCA9IG90aGVyUGFnZUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydEluZGV4ID0gb3RoZXJQYWdlSW5kZXg7XG4gICAgICBlbmRJbmRleCA9IHBhZ2VJbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZVJhbmdlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IG9mXG4gICAqIHRoZSBwYWdlIGltbWVkaWF0ZWx5IGJlZm9yZSBpdCBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLiBSZXR1cm5zIG51bGwgaWYgdGhlcmUgaXNcbiAgICogbm8gcGFnZSBiZWZvcmUgdGhlIHBhZ2UgaXQgaXMgcGFzc2VkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0UHJldmlvdXNQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBteVBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gbXlQYWdlSW5kZXggLSAxO1xuICAgIGlmIChwcmV2aW91c1BhZ2VJbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRQYWdlQnlJbmRleChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBhIEJvb2xlYW4gdGhhdCBzYXlzIGlmXG4gICAqIHRoZSBwYWdlIHlvdSBzZW50IGl0IGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXNQYWdlSXNDb21wbGV0ZWQocGFnZTogQ2xyV2l6YXJkUGFnZSkge1xuICAgIGxldCBwcmV2aW91c1BhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgICBpZiAoIXBhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UgPSB0aGlzLmdldFByZXZpb3VzUGFnZShwYWdlKTtcblxuICAgIGlmIChudWxsID09PSBwcmV2aW91c1BhZ2UpIHtcbiAgICAgIC8vIHBhZ2UgaXMgdGhlIGZpcnN0IHBhZ2UuIG5vIHByZXZpb3VzIHBhZ2UuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNQYWdlLmNvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyB0aGUgd2l6YXJkIHBhZ2Ugb2JqZWN0IG9mXG4gICAqIHRoZSBwYWdlIGltbWVkaWF0ZWx5IGFmdGVyIGl0IGluIHRoZSBwYWdlIGNvbGxlY3Rpb24uIFJldHVybnMgbnVsbCBpZiB0aGVyZSBpc1xuICAgKiBubyBwYWdlIGFmdGVyIHRoZSBwYWdlIGl0IGlzIHBhc3NlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdldE5leHRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBteVBhZ2VJbmRleCA9IHRoaXMuZ2V0UGFnZUluZGV4KHBhZ2UpO1xuICAgIGNvbnN0IG5leHRQYWdlSW5kZXggPSBteVBhZ2VJbmRleCArIDE7XG5cbiAgICBpZiAobmV4dFBhZ2VJbmRleCA+PSB0aGlzLnBhZ2VzQXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRQYWdlQnlJbmRleChuZXh0UGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHdpemFyZCBwYWdlIG9iamVjdCBhcyBhIHBhcmFtZXRlciBhbmQgZ2VuZXJhdGVzIGEgc3RlcCBpdGVtIGlkIGZyb20gdGhlXG4gICAqIHBhZ2UgSUQuIFJldHVybnMgdGhlIGdlbmVyYXRlZCBzdGVwIGl0ZW0gSUQgYXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXRTdGVwSXRlbUlkRm9yUGFnZShwYWdlOiBDbHJXaXphcmRQYWdlKSB7XG4gICAgY29uc3QgcGFnZUlkID0gcGFnZS5pZDtcbiAgICBjb25zdCBwYWdlSWRQYXJ0cyA9IHBhZ2VJZC5zcGxpdCgnLScpLnJldmVyc2UoKTtcblxuICAgIHBhZ2VJZFBhcnRzWzFdID0gJ3N0ZXAnO1xuICAgIHJldHVybiBwYWdlSWRQYXJ0cy5yZXZlcnNlKCkuam9pbignLScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWxseSBvbmx5IHVzZWQgaW50ZXJuYWxseSB0byBtYXJrIHRoYXQgYSBzcGVjaWZpYyBwYWdlIGhhcyBiZWVuIFwiY29tbWl0dGVkXCIuXG4gICAqIFRoaXMgaW52b2x2ZXMgbWFya2luZyB0aGUgcGFnZSBjb21wbGV0ZSBhbmQgZmlyaW5nIHRoZSBDbHJXaXphcmRQYWdlLm9uQ29tbWl0XG4gICAqIChjbHJXaXphcmRQYWdlT25Db21taXQpIG91dHB1dC4gVGFrZXMgdGhlIHdpemFyZCBwYWdlIG9iamVjdCB0aGF0IHlvdSBpbnRlbmQgdG9cbiAgICogbWFyayBjb21wbGV0ZWQgYXMgYSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjb21taXRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBjb25zdCBwYWdlSGFzT3ZlcnJpZGVzID0gcGFnZS5zdG9wTmV4dCB8fCBwYWdlLnByZXZlbnREZWZhdWx0O1xuICAgIHBhZ2UuY29tcGxldGVkID0gdHJ1ZTtcblxuICAgIGlmICghcGFnZUhhc092ZXJyaWRlcykge1xuICAgICAgLy8gcHJldmVudCBsb29wIG9mIGV2ZW50IGVtaXNzaW9uOyBhbHRlcm5hdGUgZmxvd3Mgd29yayBvZmZcbiAgICAgIC8vIG9mIGV2ZW50IGVtaXR0ZXJzIHRoaXMgaXMgaG93IHRoZXkgYnJlYWsgdGhhdCBjeWNsZS5cbiAgICAgIHBhZ2Uub25Db21taXQuZW1pdChwYWdlLmlkKTtcbiAgICB9XG4gIH1cblxuICAvLyB1c2VkIGJ5IHRoZSBuYXZTZXJ2aWNlIHRvIG5hdmlnYXRlIGJhY2sgdG8gZmlyc3QgcG9zc2libGUgc3RlcCBhZnRlclxuICAvLyBwYWdlcyBhcmUgcmVzZXRcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcGFnZXNSZXNldCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGxpc3RlbnMgdG8gaW4gb3JkZXIgdG8ga25vdyB3aGVuXG4gICAqIHRoZSBwYWdlIGNvbGxlY3Rpb24gY29tcGxldGVkIHN0YXRlcyBoYXZlIGJlZW4gcmVzZXQgdG8gZmFsc2Ugc28gdGhhdCB3YXkgaXRcbiAgICogY2FuIGFsc28gcmVzZXQgdGhlIG5hdmlnYXRpb24gdG8gbWFrZSB0aGUgZmlyc3QgcGFnZSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uXG4gICAqIGN1cnJlbnQvYWN0aXZlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhZ2VzUmVzZXQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VzUmVzZXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbGwgY29tcGxldGVkIHN0YXRlcyBvZiB0aGUgcGFnZXMgaW4gdGhlIHBhZ2UgY29sbGVjdGlvbiB0byBmYWxzZSBhbmRcbiAgICogbm90aWZpZXMgdGhlIG5hdmlnYXRpb24gc2VydmljZSB0byBsaWtld2lzZSByZXNldCB0aGUgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBhZ2VDb2xsZWN0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMucGFnZXNBc0FycmF5LmZvckVhY2goKHBhZ2U6IENscldpemFyZFBhZ2UpID0+IHtcbiAgICAgIHBhZ2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdGhpcy5fcGFnZXNSZXNldC5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxzIHRocm91Z2ggYWxsIHRoZSBwYWdlcyBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uIHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm9cbiAgICogaW5jb21wbGV0ZSBwYWdlcyBzYW5kd2ljaGVkIGJldHdlZW4gY29tcGxldGVkIHBhZ2VzIGluIHRoZSB3b3JrZmxvdy4gSWRlbnRpZmllc1xuICAgKiB0aGUgZmlyc3QgaW5jb21wbGV0ZSBwYWdlIGluZGV4IGFuZCBzZXRzIGFsbCBwYWdlcyBiZWhpbmQgaXQgdG8gYSBjb21wbGV0ZWRcbiAgICogc3RhdGUgb2YgZmFsc2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQYWdlQ29sbGVjdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDb21wbGV0ZWRTdGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3RJbmNvbXBsZXRlSW5kZXggPSB0aGlzLmZpbmRGaXJzdEluY29tcGxldGVQYWdlSW5kZXgoKTtcblxuICAgIGlmIChmaXJzdEluY29tcGxldGVJbmRleCA9PT0gdGhpcy5wYWdlc0FzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gYWxsIGNvbXBsZXRlIG5vIG5lZWQgdG8gZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2VzQXNBcnJheS5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAoaW5kZXggPiBmaXJzdEluY29tcGxldGVJbmRleCkge1xuICAgICAgICBwYWdlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGluY29tcGxldGUgcGFnZSBpbiB0aGUgcGFnZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUGFnZUNvbGxlY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpOiBudW1iZXIge1xuICAgIGxldCByZXR1cm5JbmRleDogbnVtYmVyID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VzQXNBcnJheS5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAobnVsbCA9PT0gcmV0dXJuSW5kZXggJiYgZmFsc2UgPT09IHBhZ2UuY29tcGxldGVkKSB7XG4gICAgICAgIHJldHVybkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmYWxsdGhyb3VnaCwgYWxsIGNvbXBsZXRlZCwgcmV0dXJuIGxhc3QgcGFnZVxuICAgIGlmIChudWxsID09PSByZXR1cm5JbmRleCkge1xuICAgICAgcmV0dXJuSW5kZXggPSB0aGlzLnBhZ2VzQ291bnQgLSAxO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5JbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kRmlyc3RJbmNvbXBsZXRlUGFnZSgpOiBDbHJXaXphcmRQYWdlIHtcbiAgICBjb25zdCBteUluY29tcGxldGVJbmRleCA9IHRoaXMuZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2VJbmRleCgpO1xuICAgIHJldHVybiB0aGlzLnBhZ2VzQXNBcnJheVtteUluY29tcGxldGVJbmRleF07XG4gIH1cbn1cbiJdfQ==