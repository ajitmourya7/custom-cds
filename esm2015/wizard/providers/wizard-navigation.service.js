/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonHubService } from './button-hub.service';
import { PageCollectionService } from './page-collection.service';
/**
 * Performs navigation functions for a wizard and manages the current page. Presented as a
 * separate service to encapsulate the behavior of navigating and completing the wizard so
 * that it can be shared across the wizard and its sub-components.
 *
 * The easiest way to access the navigation service is there a reference on your wizard. The
 * Following example would allow you to access your instance of the wizard from your host
 * component and thereby access the navigation service via YourHostComponent.wizard.navService.
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
 */
let WizardNavigationService = class WizardNavigationService {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * @memberof WizardNavigationService
     */
    constructor(pageCollection, buttonService) {
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardNavigationService
         */
        this._currentChanged = new Subject();
        /**
         * A Boolean flag used by the ClrWizardPage to avoid a race condition when pages are
         * loading and there is no current page defined.
         *
         * @memberof WizardNavigationService
         */
        this.navServiceLoaded = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
         * navigating backwards in the stepnav menu will reset any skipped pages' completed
         * state to false.
         *
         * This is useful when a wizard executes validation on a page-by-page basis when
         * the next button is clicked.
         *
         * @memberof WizardNavigationService
         */
        this.forceForwardNavigation = false;
        /**
         * @memberof WizardNavigationService
         */
        this._movedToNextPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._wizardFinished = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject();
        /**
         * @memberof WizardNavigationService
         */
        this._cancelWizard = new Subject();
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
         * routine is subverted and must be reinstated in the host component calling Wizard.close()
         * at some point.
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltCancel = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
         * routines are subverted and must be reinstated in the host component calling Wizard.next(),
         * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
         *
         * @memberof WizardNavigationService
         */
        this.wizardHasAltNext = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
         * navigational elements in the wizard are disabled.
         *
         * This is intended to freeze the wizard in place. Events are not fired so this is
         * not a way to implement alternate functionality for navigation.
         *
         * @memberof WizardNavigationService
         */
        this.wizardStopNavigation = false;
        /**
         * A boolean flag shared with the stepnav items that prevents user clicks on
         * stepnav items from navigating the wizard.
         *
         * @memberof WizardNavigationService
         */
        this.wizardDisableStepnav = false;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(() => {
            const currentPage = this.currentPage;
            if (this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((type) => {
            if (!this.wizardStopNavigation) {
                this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(() => {
            if (this.wizardStopNavigation) {
                return;
            }
            if (this.currentPage.preventDefault) {
                this.currentPage.pageOnCancel.emit(this.currentPage);
            }
            else {
                this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(() => {
            this.setFirstPageCurrent();
        });
    }
    /**
     *
     * @memberof WizardNavigationService
     */
    ngOnDestroy() {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    }
    /**
     * An Observable that is predominantly used amongst the subcomponents and services
     * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output instead of this Observable.
     *
     * @memberof WizardNavigationService
     */
    get currentPageChanged() {
        // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
        // A BREAKING CHANGE SO AWAITING MINOR RELEASE
        return this._currentChanged.asObservable();
    }
    /**
     * @memberof WizardNavigationService
     */
    get currentPageTitle() {
        // when the querylist of pages is empty. this is the first place it fails...
        if (!this.currentPage) {
            return null;
        }
        return this.currentPage.title;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the first
     * page in the Wizard.
     *
     * This is helpful for determining whether a page is navigable.
     *
     * @memberof WizardNavigationService
     */
    get currentPageIsFirst() {
        return this.pageCollection.firstPage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * last page in the Wizard.
     *
     * This is used to determine which buttons should display in the wizard footer.
     *
     * @memberof WizardNavigationService
     */
    get currentPageIsLast() {
        return this.pageCollection.lastPage === this.currentPage;
    }
    /**
     * Returns the ClrWizardPage object of the current page or null.
     *
     * @memberof WizardNavigationService
     */
    get currentPage() {
        if (!this._currentPage) {
            return null;
        }
        return this._currentPage;
    }
    /**
     * Accepts a ClrWizardPage object, since that object to be the current/active
     * page in the wizard, and emits the ClrWizardPage.onLoad (clrWizardPageOnLoad)
     * event for that page.
     *
     * Note that all of this work is bypassed if the ClrWizardPage object is already
     * the current page.
     *
     * @memberof WizardNavigationService
     */
    set currentPage(page) {
        if (this._currentPage !== page && !this.wizardStopNavigation) {
            this._currentPage = page;
            page.onLoad.emit(page.id);
            this._currentChanged.next(page);
        }
    }
    /**
     * An observable used internally to alert the wizard that forward navigation
     * has occurred. It is recommended that you use the Wizard.onMoveNext
     * (clrWizardOnNext) output instead of this one.
     *
     * @memberof WizardNavigationService
     */
    get movedToNextPage() {
        return this._movedToNextPage.asObservable();
    }
    /**
     * An observable used internally to alert the wizard that the nav service
     * has approved completion of the wizard.
     *
     * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
     * output instead of this one.
     *
     * @memberof WizardNavigationService
     */
    get wizardFinished() {
        return this._wizardFinished.asObservable();
    }
    /**
     * This is a public function that can be used to programmatically advance
     * the user to the next page.
     *
     * When invoked, this method will move the wizard to the next page after
     * successful validation. Note that this method goes through all checks
     * and event emissions as if Wizard.next(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.next(false).
     *
     * @memberof WizardNavigationService
     */
    next() {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
        }
        else {
            this.checkAndCommitCurrentPage('next');
        }
    }
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * @memberof WizardNavigationService
     */
    forceNext() {
        const currentPage = this.currentPage;
        const nextPage = this.pageCollection.getNextPage(currentPage);
        // catch errant null or undefineds that creep in
        if (!nextPage) {
            throw new Error('The wizard has no next page to go to.');
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            // this is a state that alt next flows can get themselves in...
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    }
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * @memberof WizardNavigationService
     */
    checkAndCommitCurrentPage(buttonType) {
        const currentPage = this.currentPage;
        let iAmTheLastPage;
        let isNext;
        let isDanger;
        let isDangerNext;
        let isDangerFinish;
        let isFinish;
        if (!currentPage.readyToComplete || this.wizardStopNavigation) {
            return;
        }
        iAmTheLastPage = this.currentPageIsLast;
        isNext = buttonType === 'next';
        isDanger = buttonType === 'danger';
        isDangerNext = isDanger && !iAmTheLastPage;
        isDangerFinish = isDanger && iAmTheLastPage;
        isFinish = buttonType === 'finish' || isDangerFinish;
        if (isFinish && !iAmTheLastPage) {
            return;
        }
        currentPage.primaryButtonClicked.emit(buttonType);
        if (isFinish) {
            currentPage.finishButtonClicked.emit(currentPage);
        }
        else if (isDanger) {
            currentPage.dangerButtonClicked.emit();
        }
        else if (isNext) {
            currentPage.nextButtonClicked.emit();
        }
        if (currentPage.stopNext || currentPage.preventDefault) {
            currentPage.onCommit.emit(currentPage.id);
            return;
        }
        // order is very important with these emitters!
        if (isFinish) {
            // mark page as complete
            if (!this.wizardHasAltNext) {
                this.pageCollection.commitPage(currentPage);
            }
            this._wizardFinished.next();
        }
        if (this.wizardHasAltNext) {
            this.pageCollection.commitPage(currentPage);
            if (isNext || isDangerNext) {
                this._movedToNextPage.next(true);
            }
            // jump out here, no matter what type we're looking at
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    }
    /**
     * This is a public function that can be used to programmatically conclude
     * the wizard.
     *
     * When invoked, this method will  initiate the work involved with finalizing
     * and finishing the wizard workflow. Note that this method goes through all
     * checks and event emissions as if Wizard.finish(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.finish(false).
     *
     * @memberof WizardNavigationService
     */
    finish() {
        this.checkAndCommitCurrentPage('finish');
    }
    /**
     * Notifies the wizard when backwards navigation has occurred via the
     * previous button.
     *
     * @memberof WizardNavigationService
     */
    get movedToPreviousPage() {
        return this._movedToPreviousPage.asObservable();
    }
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * @memberof WizardNavigationService
     */
    previous() {
        let previousPage;
        if (this.currentPageIsFirst || this.wizardStopNavigation) {
            return;
        }
        previousPage = this.pageCollection.getPreviousPage(this.currentPage);
        if (!previousPage) {
            return;
        }
        this._movedToPreviousPage.next(true);
        if (this.forceForwardNavigation) {
            this.currentPage.completed = false;
        }
        this.currentPage = previousPage;
    }
    /**
     * Notifies the wizard that a user is trying to cancel it.
     *
     * @memberof WizardNavigationService
     */
    get notifyWizardCancel() {
        return this._cancelWizard.asObservable();
    }
    /**
     * Allows a hook into the cancel workflow of the wizard from the nav service. Note that
     * this route goes through all checks and event emissions as if a cancel button had
     * been clicked.
     *
     * In most cases, users looking for a hook into the cancel routine are actually looking
     * for a way to close the wizard from their host component because they have prevented
     * the default cancel action.
     *
     * In this instance, it is recommended that you use Wizard.close() to avoid any event
     * emission loop resulting from an event handler calling back into routine that will
     * again evoke the events it handles.
     *
     * @memberof WizardNavigationService
     */
    cancel() {
        this._cancelWizard.next();
    }
    /**
     * Performs all required checks to determine if a user can navigate to a page. Checking at each
     * point if a page is navigable -- completed where the page immediately after the last completed
     * page.
     *
     * Takes two parameters. The first one must be either the ClrWizardPage object or the ID of the
     * ClrWizardPage object that you want to make the current page.
     *
     * The second parameter is optional and is a Boolean flag for "lazy completion". What this means
     * is the Wizard will mark all pages between the current page and the page you want to navigate
     * to as completed. This is useful for informational wizards that do not require user action,
     * allowing an easy means for users to jump ahead.
     *
     * To avoid checks on navigation, use ClrWizardPage.makeCurrent() instead.
     *
     * @memberof WizardNavigationService
     */
    goTo(pageToGoToOrId, lazyComplete = false) {
        let pageToGoTo;
        let currentPage;
        let myPages;
        let pagesToCheck;
        let okayToMove;
        let goingForward;
        let currentPageIndex;
        let goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = typeof pageToGoToOrId === 'string' ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
        // no point in going to the current page. you're there already!
        // also hard block on any navigation when stopNavigation is true
        if (pageToGoTo === currentPage || this.wizardStopNavigation) {
            return;
        }
        currentPageIndex = myPages.getPageIndex(currentPage);
        goToPageIndex = myPages.getPageIndex(pageToGoTo);
        goingForward = goToPageIndex > currentPageIndex;
        pagesToCheck = myPages.getPageRangeFromPages(this.currentPage, pageToGoTo);
        okayToMove = lazyComplete || this.canGoTo(pagesToCheck);
        if (!okayToMove) {
            return;
        }
        if (goingForward && lazyComplete) {
            pagesToCheck.forEach((page) => {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach((page) => {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    }
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * @memberof WizardNavigationService
     */
    canGoTo(pagesToCheck) {
        let okayToMove = true;
        const myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        let previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((page) => {
            let previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                // default is true. just jump out instead of complicating it.
                return;
            }
            // so we know our page is not completed...
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = previousPage === null || previousPage.completed === true;
            // we are false if not the current page AND previous page is not completed
            // (but must have a previous page)
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
            // falls through to true as default
        });
        return okayToMove;
    }
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * @memberof WizardNavigationService
     */
    setLastEnabledPageCurrent() {
        const allPages = this.pageCollection.pagesAsArray;
        let lastCompletedPageIndex = null;
        allPages.forEach((page, index) => {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
        if (lastCompletedPageIndex === null) {
            // always is at least the first item...
            lastCompletedPageIndex = 0;
        }
        else if (lastCompletedPageIndex + 1 < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    }
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * @memberof WizardNavigationService
     */
    setFirstPageCurrent() {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    }
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * @memberof WizardNavigationService
     */
    updateNavigation() {
        let toSetCurrent;
        let currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    }
};
WizardNavigationService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [PageCollectionService, ButtonHubService])
], WizardNavigationService);
export { WizardNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbIndpemFyZC9wcm92aWRlcnMvd2l6YXJkLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBd0RsQzs7Ozs7OztPQU9HO0lBQ0gsWUFBbUIsY0FBcUMsRUFBUyxhQUErQjtRQUE3RSxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUE2RGhHOzs7V0FHRztRQUNLLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFldkQ7Ozs7O1dBS0c7UUFDSSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFaEM7Ozs7Ozs7Ozs7V0FVRztRQUNJLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQXdFdEM7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBYWxEOztXQUVHO1FBQ0ssb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBMkpqRDs7V0FFRztRQUNLLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUEwQ3REOztXQUVHO1FBQ0ssa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBOEIzQzs7Ozs7OztXQU9HO1FBQ0ksdUJBQWtCLEdBQVksS0FBSyxDQUFD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QUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxzQkFBc0IsS0FBSyxJQUFJLEVBQUU7WUFDbkMsdUNBQXVDO1lBQ3ZDLHNCQUFzQixHQUFHLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdkQsc0JBQXNCLEdBQUcsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxnQkFBZ0I7UUFDckIsSUFBSSxZQUEyQixDQUFDO1FBQ2hDLElBQUksa0JBQTJCLENBQUM7UUFFaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTVDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLElBQUksa0JBQWtCLEVBQUU7WUFDdEIsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztTQUNqQztJQUNILENBQUM7Q0FDRixDQUFBO0FBanJCWSx1QkFBdUI7SUFEbkMsVUFBVSxFQUFFOzZDQWlFd0IscUJBQXFCLEVBQXdCLGdCQUFnQjtHQWhFckYsdUJBQXVCLENBaXJCbkM7U0FqckJZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENscldpemFyZFBhZ2UgfSBmcm9tICcuLi93aXphcmQtcGFnZSc7XG5cbmltcG9ydCB7IEJ1dHRvbkh1YlNlcnZpY2UgfSBmcm9tICcuL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtY29sbGVjdGlvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBQZXJmb3JtcyBuYXZpZ2F0aW9uIGZ1bmN0aW9ucyBmb3IgYSB3aXphcmQgYW5kIG1hbmFnZXMgdGhlIGN1cnJlbnQgcGFnZS4gUHJlc2VudGVkIGFzIGFcbiAqIHNlcGFyYXRlIHNlcnZpY2UgdG8gZW5jYXBzdWxhdGUgdGhlIGJlaGF2aW9yIG9mIG5hdmlnYXRpbmcgYW5kIGNvbXBsZXRpbmcgdGhlIHdpemFyZCBzb1xuICogdGhhdCBpdCBjYW4gYmUgc2hhcmVkIGFjcm9zcyB0aGUgd2l6YXJkIGFuZCBpdHMgc3ViLWNvbXBvbmVudHMuXG4gKlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIGFjY2VzcyB0aGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGlzIHRoZXJlIGEgcmVmZXJlbmNlIG9uIHlvdXIgd2l6YXJkLiBUaGVcbiAqIEZvbGxvd2luZyBleGFtcGxlIHdvdWxkIGFsbG93IHlvdSB0byBhY2Nlc3MgeW91ciBpbnN0YW5jZSBvZiB0aGUgd2l6YXJkIGZyb20geW91ciBob3N0XG4gKiBjb21wb25lbnQgYW5kIHRoZXJlYnkgYWNjZXNzIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgdmlhIFlvdXJIb3N0Q29tcG9uZW50LndpemFyZC5uYXZTZXJ2aWNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8Y2xyLXdpemFyZCAjd2l6YXJkIC4uLj5cbiAqXG4gKiBAZXhhbXBsZVxuICogZXhwb3J0IGNsYXNzIFlvdXJIb3N0Q29tcG9uZW50IHtcbiAqICAgQFZpZXdDaGlsZChcIndpemFyZFwiKSB3aXphcmQ6IFdpemFyZDtcbiAqICAgLi4uXG4gKiB9XG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuIFBlcmZvcm1zIGNoZWNrc1xuICAgKiBiZWZvcmUgYWxlcnRpbmcgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGUgYnV0dG9uIGNsaWNrLiBFbmFjdHMgbmF2aWdhdGlvbiB0b1xuICAgKiB0aGUgcHJldmlvdXMgcGFnZSBpZiBub3Qgb3ZlcnJpZGRlbiBhdCB0aGUgcGFnZSBsZXZlbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXNCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIE5leHQgYnV0dG9uIGlzIGNsaWNrZWQgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmV4dEJ1dHRvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJcyBub3RpZmllZCB3aGVuIGEgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGRhbmdlckJ1dHRvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBJcyBub3RpZmllZCB3aGVuIGEgIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBmaW5pc2hCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIEN1c3RvbSBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjdXN0b21CdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSXMgbm90aWZpZWQgd2hlbiBhIENhbmNlbCBidXR0b24gaXMgY2xpY2tlZCBpbiB0aGUgd2l6YXJkLiBOb3RpZmllcyB0aGUgd2l6YXJkLFxuICAgKiB3aGljaCBoYW5kbGVzIGFsbCBjYW5jZWwgZnVuY3Rpb25hbGl0eSwgaWYgY2FuY2VsIGlzIG5vdCBvdmVycmlkZGVuIGF0IHRoZSBwYWdlXG4gICAqIGxldmVsLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjYW5jZWxCdXR0b25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogUmVzZXRzIG5hdmlnYXRpb24gdG8gbWFrZSB0aGUgZmlyc3QgcGFnZSBjdXJyZW50IHdoZW4gdGhlIHBhZ2UgY29sbGVjdGlvbiBzZXJ2aWNlXG4gICAqIGVtaXRzIGFuIGV2ZW50IG5vdGlmeWluZyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB0aGF0IGl0IGhhcyByZXNldCBhbGwgcGFnZXNcbiAgICogdG8gdGhlaXIgcHJpc3RpbmUsIGluY29tcGxldGUgc3RhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHBhZ2VzUmVzZXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZS4gQWxzbyBzZXRzIHVwIHN1YnNjcmlwdGlvbnNcbiAgICogdGhhdCBsaXN0ZW4gdG8gdGhlIGJ1dHRvbiBzZXJ2aWNlIHRvIGRldGVybWluZSB3aGVuIGEgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWRcbiAgICogaW4gdGhlIHdpemFyZC4gSXMgYWxzbyByZXNwb25zaWJsZSBmb3IgdGFraW5nIGFjdGlvbiB3aGVuIHRoZSBwYWdlIGNvbGxlY3Rpb25cbiAgICogcmVxdWVzdHMgdGhhdCBuYXZpZ2F0aW9uIGJlIHJlc2V0IHRvIGl0cyBwcmlzdGluZSBzdGF0ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSwgcHVibGljIGJ1dHRvblNlcnZpY2U6IEJ1dHRvbkh1YlNlcnZpY2UpIHtcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLnByZXZpb3VzQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VJc0ZpcnN0IHx8IGN1cnJlbnRQYWdlLnByZXZpb3VzU3RlcERpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQYWdlLnByZXZpb3VzQnV0dG9uQ2xpY2tlZC5lbWl0KGN1cnJlbnRQYWdlKTtcbiAgICAgIGlmICghY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0QnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLm5leHRCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ25leHQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGFuZ2VyQnV0dG9uU3Vic2NyaXB0aW9uID0gdGhpcy5idXR0b25TZXJ2aWNlLmRhbmdlckJ0bkNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnZGFuZ2VyJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpbmlzaEJ1dHRvblN1YnNjcmlwdGlvbiA9IHRoaXMuYnV0dG9uU2VydmljZS5maW5pc2hCdG5DbGlja2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoJ2ZpbmlzaCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jdXN0b21CdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuY3VzdG9tQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKHR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UuY3VzdG9tQnV0dG9uQ2xpY2tlZC5lbWl0KHR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jYW5jZWxCdXR0b25TdWJzY3JpcHRpb24gPSB0aGlzLmJ1dHRvblNlcnZpY2UuY2FuY2VsQnRuQ2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50UGFnZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLnBhZ2VPbkNhbmNlbC5lbWl0KHRoaXMuY3VycmVudFBhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucGFnZXNSZXNldFN1YnNjcmlwdGlvbiA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNSZXNldC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRGaXJzdFBhZ2VDdXJyZW50KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5uZXh0QnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5kYW5nZXJCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmZpbmlzaEJ1dHRvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY3VzdG9tQnV0dG9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jYW5jZWxCdXR0b25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnBhZ2VzUmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q2xyV2l6YXJkUGFnZT4oKTtcblxuICAvKipcbiAgICogQW4gT2JzZXJ2YWJsZSB0aGF0IGlzIHByZWRvbWluYW50bHkgdXNlZCBhbW9uZ3N0IHRoZSBzdWJjb21wb25lbnRzIGFuZCBzZXJ2aWNlc1xuICAgKiBvZiB0aGUgd2l6YXJkLiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHVzZXJzIGxpc3RlbiB0byB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWRcbiAgICogKGNscldpemFyZFBhZ2VPbkxvYWQpIG91dHB1dCBpbnN0ZWFkIG9mIHRoaXMgT2JzZXJ2YWJsZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPENscldpemFyZFBhZ2U+IHtcbiAgICAvLyBUT0RPOiBNQUtFIFNVUkUgRVhURVJOQUwgT1VUUFVUUyBTQVkgJ0NIQU5HRScgTk9UICdDSEFOR0VEJ1xuICAgIC8vIEEgQlJFQUtJTkcgQ0hBTkdFIFNPIEFXQUlUSU5HIE1JTk9SIFJFTEVBU0VcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudENoYW5nZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBCb29sZWFuIGZsYWcgdXNlZCBieSB0aGUgQ2xyV2l6YXJkUGFnZSB0byBhdm9pZCBhIHJhY2UgY29uZGl0aW9uIHdoZW4gcGFnZXMgYXJlXG4gICAqIGxvYWRpbmcgYW5kIHRoZXJlIGlzIG5vIGN1cnJlbnQgcGFnZSBkZWZpbmVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBuYXZTZXJ2aWNlTG9hZGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5mb3JjZUZvcndhcmQgKGNscldpemFyZEZvcmNlRm9yd2FyZE5hdmlnYXRpb24pIGlucHV0LiBXaGVuIHRydWUsXG4gICAqIG5hdmlnYXRpbmcgYmFja3dhcmRzIGluIHRoZSBzdGVwbmF2IG1lbnUgd2lsbCByZXNldCBhbnkgc2tpcHBlZCBwYWdlcycgY29tcGxldGVkXG4gICAqIHN0YXRlIHRvIGZhbHNlLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgd2l6YXJkIGV4ZWN1dGVzIHZhbGlkYXRpb24gb24gYSBwYWdlLWJ5LXBhZ2UgYmFzaXMgd2hlblxuICAgKiB0aGUgbmV4dCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZm9yY2VGb3J3YXJkTmF2aWdhdGlvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgY3VycmVudFBhZ2VUaXRsZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAvLyB3aGVuIHRoZSBxdWVyeWxpc3Qgb2YgcGFnZXMgaXMgZW1wdHkuIHRoaXMgaXMgdGhlIGZpcnN0IHBsYWNlIGl0IGZhaWxzLi4uXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEJvb2xlYW4gdGhhdCB0ZWxscyB5b3Ugd2hldGhlciBvciBub3QgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGUgZmlyc3RcbiAgICogcGFnZSBpbiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBUaGlzIGlzIGhlbHBmdWwgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgYSBwYWdlIGlzIG5hdmlnYWJsZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlSXNGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlQ29sbGVjdGlvbi5maXJzdFBhZ2UgPT09IHRoaXMuY3VycmVudFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIEJvb2xlYW4gdGhhdCB0ZWxscyB5b3Ugd2hldGhlciBvciBub3QgdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGVcbiAgICogbGFzdCBwYWdlIGluIHRoZSBXaXphcmQuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggYnV0dG9ucyBzaG91bGQgZGlzcGxheSBpbiB0aGUgd2l6YXJkIGZvb3Rlci5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlSXNMYXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VDb2xsZWN0aW9uLmxhc3RQYWdlID09PSB0aGlzLmN1cnJlbnRQYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIENscldpemFyZFBhZ2Ugb2JqZWN0IG9mIHRoZSBjdXJyZW50IHBhZ2Ugb3IgbnVsbC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFBhZ2UoKTogQ2xyV2l6YXJkUGFnZSB7XG4gICAgaWYgKCF0aGlzLl9jdXJyZW50UGFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgQ2xyV2l6YXJkUGFnZSBvYmplY3QsIHNpbmNlIHRoYXQgb2JqZWN0IHRvIGJlIHRoZSBjdXJyZW50L2FjdGl2ZVxuICAgKiBwYWdlIGluIHRoZSB3aXphcmQsIGFuZCBlbWl0cyB0aGUgQ2xyV2l6YXJkUGFnZS5vbkxvYWQgKGNscldpemFyZFBhZ2VPbkxvYWQpXG4gICAqIGV2ZW50IGZvciB0aGF0IHBhZ2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBhbGwgb2YgdGhpcyB3b3JrIGlzIGJ5cGFzc2VkIGlmIHRoZSBDbHJXaXphcmRQYWdlIG9iamVjdCBpcyBhbHJlYWR5XG4gICAqIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgc2V0IGN1cnJlbnRQYWdlKHBhZ2U6IENscldpemFyZFBhZ2UpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgIT09IHBhZ2UgJiYgIXRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gcGFnZTtcbiAgICAgIHBhZ2Uub25Mb2FkLmVtaXQocGFnZS5pZCk7XG4gICAgICB0aGlzLl9jdXJyZW50Q2hhbmdlZC5uZXh0KHBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX21vdmVkVG9OZXh0UGFnZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdXNlZCBpbnRlcm5hbGx5IHRvIGFsZXJ0IHRoZSB3aXphcmQgdGhhdCBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICogaGFzIG9jY3VycmVkLiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgdGhlIFdpemFyZC5vbk1vdmVOZXh0XG4gICAqIChjbHJXaXphcmRPbk5leHQpIG91dHB1dCBpbnN0ZWFkIG9mIHRoaXMgb25lLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBnZXQgbW92ZWRUb05leHRQYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9tb3ZlZFRvTmV4dFBhZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF93aXphcmRGaW5pc2hlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdXNlZCBpbnRlcm5hbGx5IHRvIGFsZXJ0IHRoZSB3aXphcmQgdGhhdCB0aGUgbmF2IHNlcnZpY2VcbiAgICogaGFzIGFwcHJvdmVkIGNvbXBsZXRpb24gb2YgdGhlIHdpemFyZC5cbiAgICpcbiAgICogSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIHRoZSBXaXphcmQud2l6YXJkRmluaXNoZWQgKGNscldpemFyZE9uRmluaXNoKVxuICAgKiBvdXRwdXQgaW5zdGVhZCBvZiB0aGlzIG9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpemFyZEZpbmlzaGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl93aXphcmRGaW5pc2hlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgcHVibGljIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBhZHZhbmNlXG4gICAqIHRoZSB1c2VyIHRvIHRoZSBuZXh0IHBhZ2UuXG4gICAqXG4gICAqIFdoZW4gaW52b2tlZCwgdGhpcyBtZXRob2Qgd2lsbCBtb3ZlIHRoZSB3aXphcmQgdG8gdGhlIG5leHQgcGFnZSBhZnRlclxuICAgKiBzdWNjZXNzZnVsIHZhbGlkYXRpb24uIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBnb2VzIHRocm91Z2ggYWxsIGNoZWNrc1xuICAgKiBhbmQgZXZlbnQgZW1pc3Npb25zIGFzIGlmIFdpemFyZC5uZXh0KGZhbHNlKSBoYWQgYmVlbiBjYWxsZWQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIGl0IG1ha2VzIG1vcmUgc2Vuc2UgdG8gdXNlIFdpemFyZC5uZXh0KGZhbHNlKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZUlzTGFzdCkge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCdmaW5pc2gnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGVja0FuZENvbW1pdEN1cnJlbnRQYWdlKCduZXh0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ5cGFzc2VzIGNoZWNrcyBhbmQgbW9zdCBldmVudCBlbWlzc2lvbnMgdG8gZm9yY2UgYSBwYWdlIHRvIG5hdmlnYXRlIGZvcndhcmQuXG4gICAqXG4gICAqIENvbXBhcmFibGUgdG8gY2FsbGluZyBXaXphcmQubmV4dCgpIG9yIFdpemFyZC5mb3JjZU5leHQoKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZm9yY2VOZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlOiBDbHJXaXphcmRQYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBuZXh0UGFnZTogQ2xyV2l6YXJkUGFnZSA9IHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoY3VycmVudFBhZ2UpO1xuXG4gICAgLy8gY2F0Y2ggZXJyYW50IG51bGwgb3IgdW5kZWZpbmVkcyB0aGF0IGNyZWVwIGluXG4gICAgaWYgKCFuZXh0UGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgd2l6YXJkIGhhcyBubyBuZXh0IHBhZ2UgdG8gZ28gdG8uJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWN1cnJlbnRQYWdlLmNvbXBsZXRlZCkge1xuICAgICAgLy8gdGhpcyBpcyBhIHN0YXRlIHRoYXQgYWx0IG5leHQgZmxvd3MgY2FuIGdldCB0aGVtc2VsdmVzIGluLi4uXG4gICAgICB0aGlzLnBhZ2VDb2xsZWN0aW9uLmNvbW1pdFBhZ2UoY3VycmVudFBhZ2UpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV4dFBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIGJ1dHRvbi9hY3Rpb24gdHlwZSBhcyBhIHBhcmFtZXRlci4gRW5jYXBzdWxhdGVzIGFsbCBsb2dpYyBmb3JcbiAgICogZXZlbnQgZW1pc3Npb25zLCBzdGF0ZSBvZiB0aGUgY3VycmVudCBwYWdlLCBhbmQgd2l6YXJkIGFuZCBwYWdlIGxldmVsIG92ZXJyaWRlcy5cbiAgICpcbiAgICogQXZvaWQgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIGRpcmVjdGx5IHVubGVzcyB5b3UgcmVhbGx5IGtub3cgd2hhdCB5b3UncmUgZG9pbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGNoZWNrQW5kQ29tbWl0Q3VycmVudFBhZ2UoYnV0dG9uVHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgIGxldCBpQW1UaGVMYXN0UGFnZTogYm9vbGVhbjtcblxuICAgIGxldCBpc05leHQ6IGJvb2xlYW47XG4gICAgbGV0IGlzRGFuZ2VyOiBib29sZWFuO1xuICAgIGxldCBpc0Rhbmdlck5leHQ6IGJvb2xlYW47XG4gICAgbGV0IGlzRGFuZ2VyRmluaXNoOiBib29sZWFuO1xuICAgIGxldCBpc0ZpbmlzaDogYm9vbGVhbjtcblxuICAgIGlmICghY3VycmVudFBhZ2UucmVhZHlUb0NvbXBsZXRlIHx8IHRoaXMud2l6YXJkU3RvcE5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpQW1UaGVMYXN0UGFnZSA9IHRoaXMuY3VycmVudFBhZ2VJc0xhc3Q7XG5cbiAgICBpc05leHQgPSBidXR0b25UeXBlID09PSAnbmV4dCc7XG4gICAgaXNEYW5nZXIgPSBidXR0b25UeXBlID09PSAnZGFuZ2VyJztcbiAgICBpc0Rhbmdlck5leHQgPSBpc0RhbmdlciAmJiAhaUFtVGhlTGFzdFBhZ2U7XG4gICAgaXNEYW5nZXJGaW5pc2ggPSBpc0RhbmdlciAmJiBpQW1UaGVMYXN0UGFnZTtcbiAgICBpc0ZpbmlzaCA9IGJ1dHRvblR5cGUgPT09ICdmaW5pc2gnIHx8IGlzRGFuZ2VyRmluaXNoO1xuXG4gICAgaWYgKGlzRmluaXNoICYmICFpQW1UaGVMYXN0UGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlLnByaW1hcnlCdXR0b25DbGlja2VkLmVtaXQoYnV0dG9uVHlwZSk7XG5cbiAgICBpZiAoaXNGaW5pc2gpIHtcbiAgICAgIGN1cnJlbnRQYWdlLmZpbmlzaEJ1dHRvbkNsaWNrZWQuZW1pdChjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChpc0Rhbmdlcikge1xuICAgICAgY3VycmVudFBhZ2UuZGFuZ2VyQnV0dG9uQ2xpY2tlZC5lbWl0KCk7XG4gICAgfSBlbHNlIGlmIChpc05leHQpIHtcbiAgICAgIGN1cnJlbnRQYWdlLm5leHRCdXR0b25DbGlja2VkLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFBhZ2Uuc3RvcE5leHQgfHwgY3VycmVudFBhZ2UucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGN1cnJlbnRQYWdlLm9uQ29tbWl0LmVtaXQoY3VycmVudFBhZ2UuaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG9yZGVyIGlzIHZlcnkgaW1wb3J0YW50IHdpdGggdGhlc2UgZW1pdHRlcnMhXG4gICAgaWYgKGlzRmluaXNoKSB7XG4gICAgICAvLyBtYXJrIHBhZ2UgYXMgY29tcGxldGVcbiAgICAgIGlmICghdGhpcy53aXphcmRIYXNBbHROZXh0KSB7XG4gICAgICAgIHRoaXMucGFnZUNvbGxlY3Rpb24uY29tbWl0UGFnZShjdXJyZW50UGFnZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl93aXphcmRGaW5pc2hlZC5uZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud2l6YXJkSGFzQWx0TmV4dCkge1xuICAgICAgdGhpcy5wYWdlQ29sbGVjdGlvbi5jb21taXRQYWdlKGN1cnJlbnRQYWdlKTtcblxuICAgICAgaWYgKGlzTmV4dCB8fCBpc0Rhbmdlck5leHQpIHtcbiAgICAgICAgdGhpcy5fbW92ZWRUb05leHRQYWdlLm5leHQodHJ1ZSk7XG4gICAgICB9XG4gICAgICAvLyBqdW1wIG91dCBoZXJlLCBubyBtYXR0ZXIgd2hhdCB0eXBlIHdlJ3JlIGxvb2tpbmcgYXRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNOZXh0IHx8IGlzRGFuZ2VyTmV4dCkge1xuICAgICAgdGhpcy5mb3JjZU5leHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud2l6YXJkSGFzQWx0TmV4dCAmJiAhdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5fbW92ZWRUb05leHRQYWdlLm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBwdWJsaWMgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9ncmFtbWF0aWNhbGx5IGNvbmNsdWRlXG4gICAqIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIFdoZW4gaW52b2tlZCwgdGhpcyBtZXRob2Qgd2lsbCAgaW5pdGlhdGUgdGhlIHdvcmsgaW52b2x2ZWQgd2l0aCBmaW5hbGl6aW5nXG4gICAqIGFuZCBmaW5pc2hpbmcgdGhlIHdpemFyZCB3b3JrZmxvdy4gTm90ZSB0aGF0IHRoaXMgbWV0aG9kIGdvZXMgdGhyb3VnaCBhbGxcbiAgICogY2hlY2tzIGFuZCBldmVudCBlbWlzc2lvbnMgYXMgaWYgV2l6YXJkLmZpbmlzaChmYWxzZSkgaGFkIGJlZW4gY2FsbGVkLlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCBpdCBtYWtlcyBtb3JlIHNlbnNlIHRvIHVzZSBXaXphcmQuZmluaXNoKGZhbHNlKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZmluaXNoKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tBbmRDb21taXRDdXJyZW50UGFnZSgnZmluaXNoJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlZFRvUHJldmlvdXNQYWdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogTm90aWZpZXMgdGhlIHdpemFyZCB3aGVuIGJhY2t3YXJkcyBuYXZpZ2F0aW9uIGhhcyBvY2N1cnJlZCB2aWEgdGhlXG4gICAqIHByZXZpb3VzIGJ1dHRvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1vdmVkVG9QcmV2aW91c1BhZ2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vdmVkVG9QcmV2aW91c1BhZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvZ3JhbW1hdGljYWxseSBtb3ZlcyB0aGUgd2l6YXJkIHRvIHRoZSBwYWdlIGJlZm9yZSB0aGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBJbiBtb3N0IGluc3RhbmNlcywgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byBjYWxsIFdpemFyZC5wcmV2aW91cygpXG4gICAqIHdoaWNoIGRvZXMgdGhlIHNhbWUgdGhpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIGxldCBwcmV2aW91c1BhZ2U6IENscldpemFyZFBhZ2U7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50UGFnZUlzRmlyc3QgfHwgdGhpcy53aXphcmRTdG9wTmF2aWdhdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSA9IHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKHRoaXMuY3VycmVudFBhZ2UpO1xuXG4gICAgaWYgKCFwcmV2aW91c1BhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9tb3ZlZFRvUHJldmlvdXNQYWdlLm5leHQodHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5mb3JjZUZvcndhcmROYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwcmV2aW91c1BhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jYW5jZWxXaXphcmQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSB3aXphcmQgdGhhdCBhIHVzZXIgaXMgdHJ5aW5nIHRvIGNhbmNlbCBpdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vdGlmeVdpemFyZENhbmNlbCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5jZWxXaXphcmQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGEgaG9vayBpbnRvIHRoZSBjYW5jZWwgd29ya2Zsb3cgb2YgdGhlIHdpemFyZCBmcm9tIHRoZSBuYXYgc2VydmljZS4gTm90ZSB0aGF0XG4gICAqIHRoaXMgcm91dGUgZ29lcyB0aHJvdWdoIGFsbCBjaGVja3MgYW5kIGV2ZW50IGVtaXNzaW9ucyBhcyBpZiBhIGNhbmNlbCBidXR0b24gaGFkXG4gICAqIGJlZW4gY2xpY2tlZC5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgdXNlcnMgbG9va2luZyBmb3IgYSBob29rIGludG8gdGhlIGNhbmNlbCByb3V0aW5lIGFyZSBhY3R1YWxseSBsb29raW5nXG4gICAqIGZvciBhIHdheSB0byBjbG9zZSB0aGUgd2l6YXJkIGZyb20gdGhlaXIgaG9zdCBjb21wb25lbnQgYmVjYXVzZSB0aGV5IGhhdmUgcHJldmVudGVkXG4gICAqIHRoZSBkZWZhdWx0IGNhbmNlbCBhY3Rpb24uXG4gICAqXG4gICAqIEluIHRoaXMgaW5zdGFuY2UsIGl0IGlzIHJlY29tbWVuZGVkIHRoYXQgeW91IHVzZSBXaXphcmQuY2xvc2UoKSB0byBhdm9pZCBhbnkgZXZlbnRcbiAgICogZW1pc3Npb24gbG9vcCByZXN1bHRpbmcgZnJvbSBhbiBldmVudCBoYW5kbGVyIGNhbGxpbmcgYmFjayBpbnRvIHJvdXRpbmUgdGhhdCB3aWxsXG4gICAqIGFnYWluIGV2b2tlIHRoZSBldmVudHMgaXQgaGFuZGxlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbmNlbFdpemFyZC5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBib29sZWFuIGZsYWcgc2hhcmVkIGFjcm9zcyB0aGUgV2l6YXJkIHN1YmNvbXBvbmVudHMgdGhhdCBmb2xsb3dzIHRoZSB2YWx1ZVxuICAgKiBvZiB0aGUgV2l6YXJkLnN0b3BDYW5jZWwgKGNscldpemFyZFByZXZlbnREZWZhdWx0Q2FuY2VsKSBpbnB1dC4gV2hlbiB0cnVlLCB0aGUgY2FuY2VsXG4gICAqIHJvdXRpbmUgaXMgc3VidmVydGVkIGFuZCBtdXN0IGJlIHJlaW5zdGF0ZWQgaW4gdGhlIGhvc3QgY29tcG9uZW50IGNhbGxpbmcgV2l6YXJkLmNsb3NlKClcbiAgICogYXQgc29tZSBwb2ludC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgd2l6YXJkSGFzQWx0Q2FuY2VsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIHNoYXJlZCBhY3Jvc3MgdGhlIFdpemFyZCBzdWJjb21wb25lbnRzIHRoYXQgZm9sbG93cyB0aGUgdmFsdWVcbiAgICogb2YgdGhlIFdpemFyZC5zdG9wTmV4dCAoY2xyV2l6YXJkUHJldmVudERlZmF1bHROZXh0KSBpbnB1dC4gV2hlbiB0cnVlLCB0aGUgbmV4dCBhbmQgZmluaXNoXG4gICAqIHJvdXRpbmVzIGFyZSBzdWJ2ZXJ0ZWQgYW5kIG11c3QgYmUgcmVpbnN0YXRlZCBpbiB0aGUgaG9zdCBjb21wb25lbnQgY2FsbGluZyBXaXphcmQubmV4dCgpLFxuICAgKiBXaXphcmQuZm9yY2VOZXh0KCksIFdpemFyZC5maW5pc2goKSwgb3IgV2l6YXJkLmZvcmNlRmluaXNoKCkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHdpemFyZEhhc0FsdE5leHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBib29sZWFuIGZsYWcgc2hhcmVkIGFjcm9zcyB0aGUgV2l6YXJkIHN1YmNvbXBvbmVudHMgdGhhdCBmb2xsb3dzIHRoZSB2YWx1ZVxuICAgKiBvZiB0aGUgV2l6YXJkLnN0b3BOYXZpZ2F0aW9uIChjbHJXaXphcmRQcmV2ZW50TmF2aWdhdGlvbikgaW5wdXQuIFdoZW4gdHJ1ZSwgYWxsXG4gICAqIG5hdmlnYXRpb25hbCBlbGVtZW50cyBpbiB0aGUgd2l6YXJkIGFyZSBkaXNhYmxlZC5cbiAgICpcbiAgICogVGhpcyBpcyBpbnRlbmRlZCB0byBmcmVlemUgdGhlIHdpemFyZCBpbiBwbGFjZS4gRXZlbnRzIGFyZSBub3QgZmlyZWQgc28gdGhpcyBpc1xuICAgKiBub3QgYSB3YXkgdG8gaW1wbGVtZW50IGFsdGVybmF0ZSBmdW5jdGlvbmFsaXR5IGZvciBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyB3aXphcmRTdG9wTmF2aWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGJvb2xlYW4gZmxhZyBzaGFyZWQgd2l0aCB0aGUgc3RlcG5hdiBpdGVtcyB0aGF0IHByZXZlbnRzIHVzZXIgY2xpY2tzIG9uXG4gICAqIHN0ZXBuYXYgaXRlbXMgZnJvbSBuYXZpZ2F0aW5nIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHdpemFyZERpc2FibGVTdGVwbmF2OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGFsbCByZXF1aXJlZCBjaGVja3MgdG8gZGV0ZXJtaW5lIGlmIGEgdXNlciBjYW4gbmF2aWdhdGUgdG8gYSBwYWdlLiBDaGVja2luZyBhdCBlYWNoXG4gICAqIHBvaW50IGlmIGEgcGFnZSBpcyBuYXZpZ2FibGUgLS0gY29tcGxldGVkIHdoZXJlIHRoZSBwYWdlIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBsYXN0IGNvbXBsZXRlZFxuICAgKiBwYWdlLlxuICAgKlxuICAgKiBUYWtlcyB0d28gcGFyYW1ldGVycy4gVGhlIGZpcnN0IG9uZSBtdXN0IGJlIGVpdGhlciB0aGUgQ2xyV2l6YXJkUGFnZSBvYmplY3Qgb3IgdGhlIElEIG9mIHRoZVxuICAgKiBDbHJXaXphcmRQYWdlIG9iamVjdCB0aGF0IHlvdSB3YW50IHRvIG1ha2UgdGhlIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogVGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgb3B0aW9uYWwgYW5kIGlzIGEgQm9vbGVhbiBmbGFnIGZvciBcImxhenkgY29tcGxldGlvblwiLiBXaGF0IHRoaXMgbWVhbnNcbiAgICogaXMgdGhlIFdpemFyZCB3aWxsIG1hcmsgYWxsIHBhZ2VzIGJldHdlZW4gdGhlIGN1cnJlbnQgcGFnZSBhbmQgdGhlIHBhZ2UgeW91IHdhbnQgdG8gbmF2aWdhdGVcbiAgICogdG8gYXMgY29tcGxldGVkLiBUaGlzIGlzIHVzZWZ1bCBmb3IgaW5mb3JtYXRpb25hbCB3aXphcmRzIHRoYXQgZG8gbm90IHJlcXVpcmUgdXNlciBhY3Rpb24sXG4gICAqIGFsbG93aW5nIGFuIGVhc3kgbWVhbnMgZm9yIHVzZXJzIHRvIGp1bXAgYWhlYWQuXG4gICAqXG4gICAqIFRvIGF2b2lkIGNoZWNrcyBvbiBuYXZpZ2F0aW9uLCB1c2UgQ2xyV2l6YXJkUGFnZS5tYWtlQ3VycmVudCgpIGluc3RlYWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGdvVG8ocGFnZVRvR29Ub09ySWQ6IGFueSwgbGF6eUNvbXBsZXRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBsZXQgcGFnZVRvR29UbzogQ2xyV2l6YXJkUGFnZTtcbiAgICBsZXQgY3VycmVudFBhZ2U6IENscldpemFyZFBhZ2U7XG4gICAgbGV0IG15UGFnZXM6IFBhZ2VDb2xsZWN0aW9uU2VydmljZTtcbiAgICBsZXQgcGFnZXNUb0NoZWNrOiBDbHJXaXphcmRQYWdlW107XG4gICAgbGV0IG9rYXlUb01vdmU6IGJvb2xlYW47XG4gICAgbGV0IGdvaW5nRm9yd2FyZDogYm9vbGVhbjtcbiAgICBsZXQgY3VycmVudFBhZ2VJbmRleDogbnVtYmVyO1xuICAgIGxldCBnb1RvUGFnZUluZGV4OiBudW1iZXI7XG5cbiAgICBteVBhZ2VzID0gdGhpcy5wYWdlQ29sbGVjdGlvbjtcbiAgICBwYWdlVG9Hb1RvID0gdHlwZW9mIHBhZ2VUb0dvVG9PcklkID09PSAnc3RyaW5nJyA/IG15UGFnZXMuZ2V0UGFnZUJ5SWQocGFnZVRvR29Ub09ySWQpIDogcGFnZVRvR29Ub09ySWQ7XG4gICAgY3VycmVudFBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuXG4gICAgLy8gbm8gcG9pbnQgaW4gZ29pbmcgdG8gdGhlIGN1cnJlbnQgcGFnZS4geW91J3JlIHRoZXJlIGFscmVhZHkhXG4gICAgLy8gYWxzbyBoYXJkIGJsb2NrIG9uIGFueSBuYXZpZ2F0aW9uIHdoZW4gc3RvcE5hdmlnYXRpb24gaXMgdHJ1ZVxuICAgIGlmIChwYWdlVG9Hb1RvID09PSBjdXJyZW50UGFnZSB8fCB0aGlzLndpemFyZFN0b3BOYXZpZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudFBhZ2VJbmRleCA9IG15UGFnZXMuZ2V0UGFnZUluZGV4KGN1cnJlbnRQYWdlKTtcbiAgICBnb1RvUGFnZUluZGV4ID0gbXlQYWdlcy5nZXRQYWdlSW5kZXgocGFnZVRvR29Ubyk7XG4gICAgZ29pbmdGb3J3YXJkID0gZ29Ub1BhZ2VJbmRleCA+IGN1cnJlbnRQYWdlSW5kZXg7XG4gICAgcGFnZXNUb0NoZWNrID0gbXlQYWdlcy5nZXRQYWdlUmFuZ2VGcm9tUGFnZXModGhpcy5jdXJyZW50UGFnZSwgcGFnZVRvR29Ubyk7XG5cbiAgICBva2F5VG9Nb3ZlID0gbGF6eUNvbXBsZXRlIHx8IHRoaXMuY2FuR29UbyhwYWdlc1RvQ2hlY2spO1xuXG4gICAgaWYgKCFva2F5VG9Nb3ZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGdvaW5nRm9yd2FyZCAmJiBsYXp5Q29tcGxldGUpIHtcbiAgICAgIHBhZ2VzVG9DaGVjay5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiB7XG4gICAgICAgIGlmIChwYWdlICE9PSBwYWdlVG9Hb1RvKSB7XG4gICAgICAgICAgcGFnZS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFnb2luZ0ZvcndhcmQgJiYgdGhpcy5mb3JjZUZvcndhcmROYXZpZ2F0aW9uKSB7XG4gICAgICBwYWdlc1RvQ2hlY2suZm9yRWFjaCgocGFnZTogQ2xyV2l6YXJkUGFnZSkgPT4ge1xuICAgICAgICBwYWdlLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VUb0dvVG87XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0cyBhIHJhbmdlIG9mIENscldpemFyZFBhZ2Ugb2JqZWN0cyBhcyBhIHBhcmFtZXRlci4gUGVyZm9ybXMgdGhlIHdvcmsgb2YgY2hlY2tpbmdcbiAgICogdGhvc2Ugb2JqZWN0cyB0byBkZXRlcm1pbmUgaWYgbmF2aWdhdGlvbiBjYW4gYmUgYWNjb21wbGlzaGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBjYW5Hb1RvKHBhZ2VzVG9DaGVjazogQ2xyV2l6YXJkUGFnZVtdKTogYm9vbGVhbiB7XG4gICAgbGV0IG9rYXlUb01vdmUgPSB0cnVlO1xuICAgIGNvbnN0IG15UGFnZXMgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uO1xuXG4gICAgLy8gcHJldmlvdXMgcGFnZSBjYW4gYmUgaW1wb3J0YW50IHdoZW4gbW92aW5nIGJlY2F1c2UgaWYgaXQncyBjb21wbGV0ZWQgaXRcbiAgICAvLyBhbGxvd3MgdXMgdG8gbW92ZSB0byB0aGUgcGFnZSBldmVuIGlmIGl0J3MgaW5jb21wbGV0ZS4uLlxuICAgIGxldCBwcmV2aW91c1BhZ2VQYXNzZXM6IGJvb2xlYW47XG5cbiAgICBpZiAoIXBhZ2VzVG9DaGVjayB8fCBwYWdlc1RvQ2hlY2subGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHBhZ2VzVG9DaGVjay5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlKSA9PiB7XG4gICAgICBsZXQgcHJldmlvdXNQYWdlOiBDbHJXaXphcmRQYWdlO1xuXG4gICAgICBpZiAoIW9rYXlUb01vdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFnZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgLy8gZGVmYXVsdCBpcyB0cnVlLiBqdXN0IGp1bXAgb3V0IGluc3RlYWQgb2YgY29tcGxpY2F0aW5nIGl0LlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHNvIHdlIGtub3cgb3VyIHBhZ2UgaXMgbm90IGNvbXBsZXRlZC4uLlxuICAgICAgcHJldmlvdXNQYWdlID0gbXlQYWdlcy5nZXRQYWdlSW5kZXgocGFnZSkgPiAwID8gbXlQYWdlcy5nZXRQcmV2aW91c1BhZ2UocGFnZSkgOiBudWxsO1xuICAgICAgcHJldmlvdXNQYWdlUGFzc2VzID0gcHJldmlvdXNQYWdlID09PSBudWxsIHx8IHByZXZpb3VzUGFnZS5jb21wbGV0ZWQgPT09IHRydWU7XG5cbiAgICAgIC8vIHdlIGFyZSBmYWxzZSBpZiBub3QgdGhlIGN1cnJlbnQgcGFnZSBBTkQgcHJldmlvdXMgcGFnZSBpcyBub3QgY29tcGxldGVkXG4gICAgICAvLyAoYnV0IG11c3QgaGF2ZSBhIHByZXZpb3VzIHBhZ2UpXG4gICAgICBpZiAoIXBhZ2UuY3VycmVudCAmJiAhcHJldmlvdXNQYWdlUGFzc2VzKSB7XG4gICAgICAgIG9rYXlUb01vdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIGZhbGxzIHRocm91Z2ggdG8gdHJ1ZSBhcyBkZWZhdWx0XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2theVRvTW92ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb29rcyB0aHJvdWdoIHRoZSBjb2xsZWN0aW9uIG9mIHBhZ2VzIHRvIGZpbmQgdGhlIGZpcnN0IG9uZSB0aGF0IGlzIGluY29tcGxldGVcbiAgICogYW5kIG1ha2VzIHRoYXQgcGFnZSB0aGUgY3VycmVudC9hY3RpdmUgcGFnZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZE5hdmlnYXRpb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgc2V0TGFzdEVuYWJsZWRQYWdlQ3VycmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBhbGxQYWdlczogQ2xyV2l6YXJkUGFnZVtdID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5wYWdlc0FzQXJyYXk7XG4gICAgbGV0IGxhc3RDb21wbGV0ZWRQYWdlSW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICBhbGxQYWdlcy5mb3JFYWNoKChwYWdlOiBDbHJXaXphcmRQYWdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAocGFnZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgbGFzdENvbXBsZXRlZFBhZ2VJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggPT09IG51bGwpIHtcbiAgICAgIC8vIGFsd2F5cyBpcyBhdCBsZWFzdCB0aGUgZmlyc3QgaXRlbS4uLlxuICAgICAgbGFzdENvbXBsZXRlZFBhZ2VJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChsYXN0Q29tcGxldGVkUGFnZUluZGV4ICsgMSA8IGFsbFBhZ2VzLmxlbmd0aCkge1xuICAgICAgbGFzdENvbXBsZXRlZFBhZ2VJbmRleCA9IGxhc3RDb21wbGV0ZWRQYWdlSW5kZXggKyAxO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBhbGxQYWdlc1tsYXN0Q29tcGxldGVkUGFnZUluZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgZmlyc3QgcGFnZSBpbiB0aGUgY29sbGVjdGlvbiBvZiBwYWdlcyBhbmQgbWFrZXMgdGhhdCBwYWdlIHRoZVxuICAgKiBjdXJyZW50L2FjdGl2ZSBwYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkTmF2aWdhdGlvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBzZXRGaXJzdFBhZ2VDdXJyZW50KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnBhZ2VDb2xsZWN0aW9uLnBhZ2VzQXNBcnJheVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBzdGVwbmF2IG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHdpemFyZCB3aGVuIHBhZ2VzIGFyZSBkeW5hbWljYWxseVxuICAgKiBhZGRlZCBvciByZW1vdmVkIGZyb20gdGhlIGNvbGxlY3Rpb24gb2YgcGFnZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmROYXZpZ2F0aW9uU2VydmljZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZU5hdmlnYXRpb24oKTogdm9pZCB7XG4gICAgbGV0IHRvU2V0Q3VycmVudDogQ2xyV2l6YXJkUGFnZTtcbiAgICBsZXQgY3VycmVudFBhZ2VSZW1vdmVkOiBib29sZWFuO1xuXG4gICAgdGhpcy5wYWdlQ29sbGVjdGlvbi51cGRhdGVDb21wbGV0ZWRTdGF0ZXMoKTtcblxuICAgIGN1cnJlbnRQYWdlUmVtb3ZlZCA9IHRoaXMucGFnZUNvbGxlY3Rpb24ucGFnZXNBc0FycmF5LmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgPCAwO1xuICAgIGlmIChjdXJyZW50UGFnZVJlbW92ZWQpIHtcbiAgICAgIHRvU2V0Q3VycmVudCA9IHRoaXMucGFnZUNvbGxlY3Rpb24uZmluZEZpcnN0SW5jb21wbGV0ZVBhZ2UoKTtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0b1NldEN1cnJlbnQ7XG4gICAgfVxuICB9XG59XG4iXX0=