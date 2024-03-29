import { AfterContentInit, DoCheck, ElementRef, EventEmitter, IterableDiffers, OnDestroy, QueryList } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { HeaderActionService } from './providers/header-actions.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardHeaderAction } from './wizard-header-action';
import { ClrWizardPage } from './wizard-page';
export declare class ClrWizard implements OnDestroy, AfterContentInit, DoCheck {
    private platformId;
    navService: WizardNavigationService;
    pageCollection: PageCollectionService;
    buttonService: ButtonHubService;
    headerActionService: HeaderActionService;
    private elementRef;
    /**
     * Set the modal size of the wizard. Set using `[clrWizardSize]` input.
     */
    size: string;
    /**
     * Tells the modal part of the wizard whether it should have a close "X"
     * in the top right corner. Set using `[clrWizardClosable]` input.
     */
    closable: boolean;
    /**
     * Resets page completed states when navigating backwards.
     * Set using `[clrWizardForceForwardNavigation]` input.
     */
    forceForward: boolean;
    private _forceForward;
    _open: boolean;
    /**
     * Toggles open/close of the wizard component.
     * Set using the `[clrWizardOpen]` input.
     */
    clrWizardOpen: boolean;
    /**
     * Prevents ClrWizard from moving to the next page or closing itself on finishing.
     * Set using the `[clrWizardPreventDefaultNext]` input. Note that using stopNext
     * will require you to create your own calls to .next() and .finish() in your
     * host component to make the ClrWizard work as expected.
     */
    stopNext: boolean;
    private _stopNext;
    /**
     * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
     * Set using the `[clrWizardPreventDefaultCancel]` input.
     *
     * Note that using stopCancel will require you to create your own calls to `close()` in your host compone`nt
     * to make the ClrWizard work as expected. Useful for doing checks or prompts
     * before closing a ClrWizard.
     */
    stopCancel: boolean;
    private _stopCancel;
    /**
     * Prevents ClrWizard from performing any form of navigation away from the current
     * page. Set using the `[clrWizardPreventNavigation]` input.
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     */
    stopNavigation: boolean;
    private _stopNavigation;
    /**
     * Prevents clicks on the links in the stepnav from working.
     * Set using `[clrWizardDisableStepnav]` input.
     * A more granular bypassing of navigation which can be useful when your
     * ClrWizard is in a state of completion and you don't want users to be
     * able to jump backwards and change things.
     */
    disableStepnav: boolean;
    private _disableStepnav;
    /**
     * Used to communicate to the underlying modal that animations are not
     * wanted. Primary use is for the display of static/inline wizards.
     * Set using `[clrWizardPreventModalAnimation]` input.
     */
    _stopModalAnimations: boolean;
    readonly stopModalAnimations: string;
    /**
     * Emits when the wizard is opened or closed.
     * Listen via `(clrWizardOpenChange)` event.
     */
    _openChanged: EventEmitter<boolean>;
    /**
     * Emits when the wizard is canceled. Listen via `(clrWizardOnCancel)` event.
     * Can be combined with the `[clrWizardPreventDefaultCancel]` input to create
     * wizard-level custom cancel routines.
     */
    onCancel: EventEmitter<any>;
    /**
     * Emits when the wizard is completed. Listen via `(clrWizardOnFinish)` event.
     * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
     * wizard-level custom completion routines.
     */
    wizardFinished: EventEmitter<any>;
    /**
     * Emits when the wizard is reset. Listen via `(clrWizardOnReset)` event.
     */
    onReset: EventEmitter<any>;
    /**
     * Emits when the current page has changed. Listen via `(clrWizardCurrentPageChanged)` event.
     * output. Useful for non-blocking validation.
     */
    currentPageChanged: EventEmitter<any>;
    /**
     * Emits when the wizard moves to the next page. Listen via `(clrWizardOnNext)` event.
     * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
     * wizard-level custom navigation routines, which are useful for validation.
     */
    onMoveNext: EventEmitter<any>;
    /**
     * Emits when the wizard moves to the previous page. Can be useful for validation.
     * Listen via `(clrWizardOnPrevious)` event.
     */
    onMovePrevious: EventEmitter<any>;
    pages: QueryList<ClrWizardPage>;
    headerActions: QueryList<ClrWizardHeaderAction>;
    wizardTitle: ElementRef;
    currentPage: ClrWizardPage;
    readonly isLast: boolean;
    readonly isFirst: boolean;
    readonly isStatic: boolean;
    private differ;
    private subscriptions;
    constructor(platformId: Object, navService: WizardNavigationService, pageCollection: PageCollectionService, buttonService: ButtonHubService, headerActionService: HeaderActionService, elementRef: ElementRef, differs: IterableDiffers);
    ngAfterContentInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    /**
     * Marks Wizard as finished. By default it does not execute event
     * emissions or checks before completing and closing. This method is commonly
     * used as part of an alternative navigation with `[clrWizardPreventDefaultNext]`.
     *
     * If `skipChecksAndEmits` is true, the wizard will complete and close
     * regardless of the state of its current page. This is useful for alternative
     * navigation where event emissions have already been done and firing them again
     * may cause an event loop.
     */
    finish(skipChecksAndEmits?: boolean): void;
    /**
     * Marks the wizard as finished but does run checks and emissions.
     * Good for a last step in an alternate workflow. Does the same thing as
     * calling `ClrWizard.finish(true)` or `ClrWizard.finish()` without a parameter.
     */
    forceFinish(): void;
    /**
     * Opens the wizard. If there is no current page defined, sets the first page in the wizard to be current.
     */
    open(): void;
    /**
     * Closes the wizard. Call this directly instead of `cancel()` to implement alternative cancel functionality.
     */
    close(): void;
    /**
     * Used to open and close the wizard. By default the wizard will
     * close if invoked with no parameter. If parameter is true wizard will open
     * else if false will close.
     */
    toggle(open: boolean): void;
    /**
     * Moves the wizard to the previous page.
     */
    previous(): void;
    /**
     * By default, `next()` does not execute event emissions.
     * This method is commonly called as part of an alternative navigation
     * with `[clrWizardPreventDefaultNext]`. The wizard will move to the next page
     * regardless of the state of its current page. This is useful for alternative
     * navigation where event emissions have already been done and firing them again
     * may cause an event loop.
     *
     * If `skipChecksAndEmits` is false, the wizard will execute default checks
     * and emit events as normal. This is useful for custom buttons or programmatic
     * workflows that are not executing the wizards default checks and emissions.
     * It is another way to navigate without having to rewrite the wizard’s default
     * functionality from scratch.
     */
    next(skipChecksAndEmits?: boolean): void;
    /**
     * Moves the wizard to the next page without the checks and emissions.
     * Good for a last step in an alternate workflow.
     * Alias for `ClrWizard.next(true)` or `ClrWizard.next()`
     */
    forceNext(): void;
    /**
     * Cancels and closes the wizard. Do not use this for an override of the cancel
     * the functionality with `[clrWizardPreventDefaultCancel]`, `[clrWizardPreventPageDefaultCancel]`,
     * or `[clrWizardPagePreventDefault]` because it will initiate the same checks
     * and event emissions that invoked your event handler. Use `ClrWizard.close()` instead.
     */
    cancel(): void;
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality. In most cases, use `ClrWizard.cancel()` instead.
     */
    modalCancel(): void;
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs `(clrWizardPageOnCancel)` and `(clrWizardOnCancel)`.
     */
    checkAndCancel(): void;
    /**
     * Navigates to a given page in the Wizard. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with `clr-wizard-page-` and then either a
     * numeric ID or the ID specified for the `ClrWizardPage` component’s `id` input.
     */
    goTo(pageId: string): void;
    /**
     * Reset sets all WizardPages to incomplete and sets the first page in the `ClrWizard` to
     * be the current page, resetting the wizard navigation.
     * Use `(clrWizardOnReset)` event to reset the data or model of your wizard.
     */
    reset(): void;
    private listenForNextPageChanges;
    private listenForPreviousPageChanges;
    private listenForCancelChanges;
    private listenForFinishedChanges;
    private listenForPageChanges;
    private updateNavOnPageChanges;
    private initializeButtons;
    private emitWizardFinished;
}
