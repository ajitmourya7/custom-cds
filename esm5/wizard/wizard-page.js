/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ButtonHubService } from './providers/button-hub.service';
import { PageCollectionService } from './providers/page-collection.service';
import { WizardNavigationService } from './providers/wizard-navigation.service';
import { ClrWizardPageButtons } from './wizard-page-buttons';
import { ClrWizardPageHeaderActions } from './wizard-page-header-actions';
import { ClrWizardPageNavTitle } from './wizard-page-navtitle';
import { ClrWizardPageTitle } from './wizard-page-title';
var wizardPageIndex = 0;
/**
 * The ClrWizardPage component is responsible for displaying the content of each step
 * in the wizard workflow.
 *
 * ClrWizardPage component has hooks into the navigation service (ClrWizardPage.navService),
 * page collection (ClrWizardPage.pageCollection), and button service
 * (ClrWizardPage.buttonService). These three providers are shared across the components
 * within each instance of a Wizard.
 *
 */
var ClrWizardPage = /** @class */ (function () {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * @memberof WizardPage
     */
    function ClrWizardPage(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._nextStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.nextStepDisabled changes.
         * Should emit the new value of nextStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.nextStepDisabledChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._previousStepDisabled = false;
        /**
         * Emits when the value of ClrWizardPage.previousStepDisabled changes.
         * Should emit the new value of previousStepDisabled.
         *
         * @memberof WizardPage
         *
         */
        this.previousStepDisabledChange = new EventEmitter();
        /**
         * Overrides all actions from the page level, so you can use an alternate function for
         * validation or data-munging with a ClrWizardPage.onCommit (clrWizardPageOnCommit output),
         * ClrWizardPage.onCancel (clrWizardPageOnCancel output), or one
         * of the granular page-level button click event emitters.
         *
         * @memberof WizardPage
         *
         */
        this.preventDefault = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopCancel = false;
        /**
         *
         * @memberof WizardPage
         *
         */
        this.stopCancelChange = new EventEmitter();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._stopNext = false;
        /**
         * An event emitter carried over from a legacy version of ClrWizardPage.
         * Fires an event on ClrWizardPage whenever the next or finish buttons
         * are clicked and the page is the current page of the Wizard.
         *
         * Note that this does not automatically emit an event when a custom
         * button is used in place of a next or finish button.
         *
         * @memberof WizardPage
         *
         */
        this.onCommit = new EventEmitter(false);
        /**
         * Emits an event when ClrWizardPage becomes the current page of the
         * Wizard.
         *
         * @memberof WizardPage
         *
         */
        this.onLoad = new EventEmitter();
        /**
         * Emits an event when the ClrWizardPage invokes the cancel routine for the wizard.
         *
         * Can be used in conjunction with the ClrWizardPage.stopCancel
         * (clrWizardPagePreventDefaultCancel) or ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before cancelling the wizard.
         *
         * Note that this requires you to call Wizard.close() from the host component.
         * This constitues a full replacement of the cancel functionality.
         *
         * @memberof WizardPage
         *
         */
        this.pageOnCancel = new EventEmitter();
        /**
         * Emits an event when the finish button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom finish
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to complete
         * the wizard.
         *
         * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
         * from the host component. This combination creates a full replacement of
         * the finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.finishButtonClicked = new EventEmitter();
        /**
         * Emits an event when the previous button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom backwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * backwards in the wizard.
         *
         * Note that this requires you to call Wizard.previous()
         * from the host component. This combination creates a full replacement of
         * the backwards navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.previousButtonClicked = new EventEmitter();
        /**
         * Emits an event when the next button is clicked and the ClrWizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * to the next page in the wizard.
         *
         * Note that this requires you to call Wizard.forceNext() or Wizard.next()
         * from the host component. This combination creates a full replacement of
         * the forward navigation functionality.
         *
         * @memberof WizardPage
         *
         */
        this.nextButtonClicked = new EventEmitter();
        /**
         * Emits an event when a danger button is clicked and the ClrWizardPage is
         * the wizard's current page. By default, a danger button will act as
         * either a "next" or "finish" button depending on if the ClrWizardPage is the
         * last page or not.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level when the danger button is clicked.
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.dangerButtonClicked = new EventEmitter();
        /**
         * Emits an event when a next, finish, or danger button is clicked and the
         * ClrWizardPage is the wizard's current page.
         *
         * Can be used in conjunction with the ClrWizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level, regardless of the type of
         * primary button.
         *
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * @memberof WizardPage
         *
         */
        this.primaryButtonClicked = new EventEmitter();
        this.customButtonClicked = new EventEmitter();
        /**
         * An input value that is used internally to generate the ClrWizardPage ID as
         * well as the step nav item ID.
         *
         * Typed as any because it should be able to accept numbers as well as
         * strings. Passing an index for wizard whose pages are created with an
         * ngFor loop is a common use case.
         *
         * @memberof WizardPage
         *
         */
        this._id = (wizardPageIndex++).toString();
        /**
         *
         * @memberof WizardPage
         *
         */
        this._complete = false;
    }
    Object.defineProperty(ClrWizardPage.prototype, "nextStepDisabled", {
        /**
         * A getter that tells whether or not the wizard should be allowed
         * to move to the next page.
         *
         * Useful for in-page validation because it prevents forward navigation
         * and visibly disables the next button.
         *
         * Does not require that you re-implement navigation routines like you
         * would if you were using ClrWizardPage.preventDefault or
         * Wizard.preventDefault.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this._nextStepDisabled;
        },
        /**
         * Sets whether the page should allow forward navigation.
         *
         * @memberof WizardPage
         *
         */
        set: function (val) {
            var valBool = !!val;
            if (valBool !== this._nextStepDisabled) {
                this._nextStepDisabled = valBool;
                this.nextStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "previousStepDisabled", {
        /**
         * A getter that tells whether or not the wizard should be allowed
         * to move to the previous page.
         *
         * Useful for in-page validation because it prevents backward navigation
         * and visibly disables the previous button.
         *
         * Does not require that you re-implement navigation routines like you
         * would if you were using ClrWizardPage.preventDefault or
         * Wizard.preventDefault.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this._previousStepDisabled;
        },
        /**
         * Sets whether the page should allow backward navigation.
         *
         * @memberof WizardPage
         *
         */
        set: function (val) {
            var valBool = !!val;
            if (valBool !== this._previousStepDisabled) {
                this._previousStepDisabled = valBool;
                this.previousStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "stopCancel", {
        /**
         * A getter that retrieves whether the page is preventing the cancel action.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this._stopCancel;
        },
        /**
         * Overrides the cancel action from the page level. Allows you to use an
         * alternate function for validation or data-munging before cancelling the
         * wizard when combined with the ClrWizardPage.onCancel
         * (the clrWizardPageOnCancel output).
         *
         * Requires that you manually close the wizard from your host component,
         * usually with a call to Wizard.forceNext() or wizard.next();
         *
         * @memberof ClrWizardPage
         */
        set: function (val) {
            var valBool = !!val;
            if (valBool !== this._stopCancel) {
                this._stopCancel = valBool;
                this.stopCancelChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "stopNext", {
        /**
         * A getter that tells you whether the page is preventing the next action.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this._stopNext;
        },
        /**
         * Overrides forward navigation from the page level. Allows you to use an
         * alternate function for validation or data-munging before moving the
         * wizard to the next pagewhen combined with the ClrWizardPage.onCommit
         * (clrWizardPageOnCommit) or ClrWizardPage.nextButtonClicked
         * (clrWizardPageNext) outputs.
         *
         * Requires that you manually tell the wizard to navigate forward from
         * the hostComponent, usually with a call to Wizard.forceNext() or
         * wizard.next();
         *
         * @memberof ClrWizardPage
         */
        set: function (val) {
            var valBool = !!val;
            if (valBool !== this._stopNext) {
                this._stopNext = valBool;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "id", {
        /**
         * A read-only getter that generates an ID string for the wizard page from
         * either the value passed to the ClrWizardPage "id" input or a wizard page
         * counter shared across all wizard pages in the application.
         *
         * Note that the value passed into the ID input Will be prefixed with
         * "clr-wizard-page-".
         *
         * @readonly
         *
         * @memberof ClrWizardPage
         */
        get: function () {
            // covers things like null, undefined, false, and empty string
            // while allowing zero to pass
            var idIsNonZeroFalsy = !this._id && this._id !== 0;
            // in addition to non-zero falsy we also want to make sure _id is not a negative
            // number.
            if (idIsNonZeroFalsy || this._id < 0) {
                // guard here in the event that input becomes undefined or null by accident
                this._id = (wizardPageIndex++).toString();
            }
            return "clr-wizard-page-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "readyToComplete", {
        /**
         * A read-only getter that serves as a convenience for those who would rather
         * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
         * ClrWizardPage.readyToComplete is more logical and declarative.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return !this.nextStepDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "completed", {
        /**
         * A page is marked as completed if it is both readyToComplete and completed,
         * as in the next or finish action has been executed while this page was current.
         *
         * Note there is and open question about how to handle pages that are marked
         * complete but who are no longer readyToComplete. This might indicate an error
         * state for the ClrWizardPage. Currently, the wizard does not acknowledge this state
         * and only returns that the page is incomplete.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this._complete && this.readyToComplete;
            // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
            // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
            // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
            // FIRST QUESTION: AM I GREY OR COLORED?
            // SECOND QUESTION: AM I GREEN OR RED?
        },
        /**
         * A ClrWizardPage can be manually set to completed using this boolean setter.
         * It is recommended that users rely on the convenience functions in the wizard
         * and navigation service instead of manually setting pages’ completion state.
         *
         * @memberof ClrWizardPage
         */
        set: function (value) {
            this._complete = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "current", {
        /**
         * Checks with the navigation service to see if it is the current page.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this.navService.currentPage === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "disabled", {
        get: function () {
            return !this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "enabled", {
        /**
         * A read-only getter that returns whether or not the page is navigable
         * in the wizard. A wizard page can be navigated to if it is completed
         * or the page before it is completed.
         *
         * This getter handles the logic for enabling or disabling the links in
         * the step nav on the left Side of the wizard.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this.current || this.completed || this.previousCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "previousCompleted", {
        /**
         * A read-only getter that returns whether or not the page before this
         * ClrWizardPage is completed. This is useful for determining whether or not
         * a page is navigable if it is not current or already completed.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            var previousPage = this.pageCollection.getPreviousPage(this);
            if (!previousPage) {
                return true;
            }
            return previousPage.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "title", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "navTitle", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            if (this.pageNavTitle) {
                return this.pageNavTitle.pageNavTitleTemplateRef;
            }
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "headerActions", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            if (!this._headerActions) {
                return;
            }
            return this._headerActions.pageHeaderActionsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasHeaderActions", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return !!this._headerActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "buttons", {
        /**
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            if (!this._buttons) {
                return;
            }
            return this._buttons.pageButtonsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardPage.prototype, "hasButtons", {
        /**
         * A read-only getter that returns a boolean that says whether or
         * not the ClrWizardPage includes buttons. Used to determine if the
         * Wizard should override the default button set defined as
         * its direct children.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return !!this._buttons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Uses the nav service to make the ClrWizardPage the current page in the
     * wizard. Bypasses all checks but still emits the ClrWizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * @memberof WizardPage
     *
     */
    ClrWizardPage.prototype.makeCurrent = function () {
        this.navService.currentPage = this;
    };
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    ClrWizardPage.prototype.ngOnInit = function () {
        var navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    };
    Object.defineProperty(ClrWizardPage.prototype, "stepItemId", {
        /**
         * A read-only getter that returns the id used by the step nav item associated with the page.
         *
         * ClrWizardPage needs this ID string for aria information.
         *
         * @memberof WizardPage
         *
         */
        get: function () {
            return this.pageCollection.getStepItemIdForPage(this);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        ContentChild(ClrWizardPageTitle, { static: true }),
        tslib_1.__metadata("design:type", ClrWizardPageTitle)
    ], ClrWizardPage.prototype, "pageTitle", void 0);
    tslib_1.__decorate([
        ContentChild(ClrWizardPageNavTitle, { static: true }),
        tslib_1.__metadata("design:type", ClrWizardPageNavTitle)
    ], ClrWizardPage.prototype, "pageNavTitle", void 0);
    tslib_1.__decorate([
        ContentChild(ClrWizardPageButtons, { static: true }),
        tslib_1.__metadata("design:type", ClrWizardPageButtons)
    ], ClrWizardPage.prototype, "_buttons", void 0);
    tslib_1.__decorate([
        ContentChild(ClrWizardPageHeaderActions, { static: true }),
        tslib_1.__metadata("design:type", ClrWizardPageHeaderActions)
    ], ClrWizardPage.prototype, "_headerActions", void 0);
    tslib_1.__decorate([
        Input('clrWizardPageNextDisabled'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizardPage.prototype, "nextStepDisabled", null);
    tslib_1.__decorate([
        Output('clrWizardPageNextDisabledChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "nextStepDisabledChange", void 0);
    tslib_1.__decorate([
        Input('clrWizardPagePreviousDisabled'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizardPage.prototype, "previousStepDisabled", null);
    tslib_1.__decorate([
        Output('clrWizardPagePreviousDisabledChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "previousStepDisabledChange", void 0);
    tslib_1.__decorate([
        Input('clrWizardPagePreventDefault'),
        tslib_1.__metadata("design:type", Boolean)
    ], ClrWizardPage.prototype, "preventDefault", void 0);
    tslib_1.__decorate([
        Input('clrWizardPagePreventDefaultCancel'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizardPage.prototype, "stopCancel", null);
    tslib_1.__decorate([
        Output('clrWizardPagePreventDefaultCancelChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "stopCancelChange", void 0);
    tslib_1.__decorate([
        Input('clrWizardPagePreventDefaultNext'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrWizardPage.prototype, "stopNext", null);
    tslib_1.__decorate([
        Output('clrWizardPageOnCommit'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "onCommit", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageOnLoad'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "onLoad", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageOnCancel'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "pageOnCancel", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageFinish'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "finishButtonClicked", void 0);
    tslib_1.__decorate([
        Output('clrWizardPagePrevious'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "previousButtonClicked", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageNext'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "nextButtonClicked", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageDanger'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "dangerButtonClicked", void 0);
    tslib_1.__decorate([
        Output('clrWizardPagePrimary'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "primaryButtonClicked", void 0);
    tslib_1.__decorate([
        Output('clrWizardPageCustomButton'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrWizardPage.prototype, "customButtonClicked", void 0);
    tslib_1.__decorate([
        Input('id'),
        tslib_1.__metadata("design:type", Object)
    ], ClrWizardPage.prototype, "_id", void 0);
    ClrWizardPage = tslib_1.__decorate([
        Component({
            selector: 'clr-wizard-page',
            template: '<ng-content></ng-content>',
            host: {
                '[id]': 'id',
                '[attr.aria-hidden]': '!current',
                '[attr.aria-labelledby]': 'stepItemId',
                '[class.active]': 'current',
                '[class.clr-wizard-page]': 'true',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [WizardNavigationService,
            PageCollectionService,
            ButtonHubService])
    ], ClrWizardPage);
    return ClrWizardPage;
}());
export { ClrWizardPage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ3aXphcmQvd2l6YXJkLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUUxRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV6RCxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFFeEI7Ozs7Ozs7OztHQVNHO0FBWUg7SUFDRTs7OztPQUlHO0lBQ0gsdUJBQ1UsVUFBbUMsRUFDcEMsY0FBcUMsRUFDckMsYUFBK0I7UUFGOUIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQWdEeEM7Ozs7V0FJRztRQUNLLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQW1DbEM7Ozs7OztXQU1HO1FBQ3dDLDJCQUFzQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlHOzs7O1dBSUc7UUFDSywwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFtQ3RDOzs7Ozs7V0FNRztRQUVJLCtCQUEwQixH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LE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzswQ0FBc0IsWUFBWTs4REFBcUM7SUFtQnBFO1FBQWhDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzswQ0FBd0IsWUFBWTtnRUFBcUM7SUFtQjVFO1FBQTVCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzswQ0FBb0IsWUFBWTs0REFBcUM7SUF1QmxFO1FBQTlCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzswQ0FBc0IsWUFBWTs4REFBcUM7SUF1QnJFO1FBQS9CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzswQ0FBdUIsWUFBWTsrREFBOEI7SUFFM0Q7UUFBcEMsTUFBTSxDQUFDLDJCQUEyQixDQUFDOzBDQUFzQixZQUFZOzhEQUE4QjtJQWF2RjtRQUFaLEtBQUssQ0FBQyxJQUFJLENBQUM7OzhDQUEyQztJQXBaNUMsYUFBYTtRQVh6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxJQUFJO2dCQUNaLG9CQUFvQixFQUFFLFVBQVU7Z0JBQ2hDLHdCQUF3QixFQUFFLFlBQVk7Z0JBQ3RDLGdCQUFnQixFQUFFLFNBQVM7Z0JBQzNCLHlCQUF5QixFQUFFLE1BQU07YUFDbEM7U0FDRixDQUFDO2lEQVFzQix1QkFBdUI7WUFDcEIscUJBQXFCO1lBQ3RCLGdCQUFnQjtPQVQ3QixhQUFhLENBOG5CekI7SUFBRCxvQkFBQztDQUFBLEFBOW5CRCxJQThuQkM7U0E5bkJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uSHViU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2J1dHRvbi1odWIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9wYWdlLWNvbGxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBXaXphcmROYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3dpemFyZC1uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZUJ1dHRvbnMgfSBmcm9tICcuL3dpemFyZC1wYWdlLWJ1dHRvbnMnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnMgfSBmcm9tICcuL3dpemFyZC1wYWdlLWhlYWRlci1hY3Rpb25zJztcbmltcG9ydCB7IENscldpemFyZFBhZ2VOYXZUaXRsZSB9IGZyb20gJy4vd2l6YXJkLXBhZ2UtbmF2dGl0bGUnO1xuaW1wb3J0IHsgQ2xyV2l6YXJkUGFnZVRpdGxlIH0gZnJvbSAnLi93aXphcmQtcGFnZS10aXRsZSc7XG5cbmxldCB3aXphcmRQYWdlSW5kZXggPSAwO1xuXG4vKipcbiAqIFRoZSBDbHJXaXphcmRQYWdlIGNvbXBvbmVudCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgY29udGVudCBvZiBlYWNoIHN0ZXBcbiAqIGluIHRoZSB3aXphcmQgd29ya2Zsb3cuXG4gKlxuICogQ2xyV2l6YXJkUGFnZSBjb21wb25lbnQgaGFzIGhvb2tzIGludG8gdGhlIG5hdmlnYXRpb24gc2VydmljZSAoQ2xyV2l6YXJkUGFnZS5uYXZTZXJ2aWNlKSxcbiAqIHBhZ2UgY29sbGVjdGlvbiAoQ2xyV2l6YXJkUGFnZS5wYWdlQ29sbGVjdGlvbiksIGFuZCBidXR0b24gc2VydmljZVxuICogKENscldpemFyZFBhZ2UuYnV0dG9uU2VydmljZSkuIFRoZXNlIHRocmVlIHByb3ZpZGVycyBhcmUgc2hhcmVkIGFjcm9zcyB0aGUgY29tcG9uZW50c1xuICogd2l0aGluIGVhY2ggaW5zdGFuY2Ugb2YgYSBXaXphcmQuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItd2l6YXJkLXBhZ2UnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIWN1cnJlbnQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ3N0ZXBJdGVtSWQnLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdjdXJyZW50JyxcbiAgICAnW2NsYXNzLmNsci13aXphcmQtcGFnZV0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENscldpemFyZFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDbHJXaXphcmRQYWdlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuYXZTZXJ2aWNlOiBXaXphcmROYXZpZ2F0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgcGFnZUNvbGxlY3Rpb246IFBhZ2VDb2xsZWN0aW9uU2VydmljZSxcbiAgICBwdWJsaWMgYnV0dG9uU2VydmljZTogQnV0dG9uSHViU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBwYWdlIHRpdGxlIHdoaWNoIGlzIHVzZWQgZm9yIGEgbnVtYmVyXG4gICAqIG9mIGRpZmZlcmVudCB0YXNrcyBmb3IgZGlzcGxheSBpbiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlVGl0bGUsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBwYWdlVGl0bGU6IENscldpemFyZFBhZ2VUaXRsZTtcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGRlc2lyZWQgdGl0bGUgZm9yIHRoZSBwYWdlJ3Mgc3RlcCBpbiB0aGVcbiAgICogbmF2aWdhdGlvbiBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aXphcmQuIENhbiBiZSBwcm9qZWN0ZWQgdG8gY2hhbmdlIHRoZVxuICAgKiBuYXZpZ2F0aW9uIGxpbmsncyB0ZXh0LlxuICAgKlxuICAgKiBJZiBub3QgZGVmaW5lZCwgdGhlbiBDbHJXaXphcmRQYWdlLnBhZ2VUaXRsZSB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgc3RlcG5hdi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZU5hdlRpdGxlLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwdWJsaWMgcGFnZU5hdlRpdGxlOiBDbHJXaXphcmRQYWdlTmF2VGl0bGU7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBidXR0b25zIGRlZmluZWQgd2l0aGluIHRoZSBwYWdlLiBJZiBub3QgZGVmaW5lZCxcbiAgICogdGhlIHdpemFyZCBkZWZhdWx0cyB0byB0aGUgc2V0IG9mIGJ1dHRvbnMgZGVmaW5lZCBhcyBhIGRpcmVjdCBjaGlsZCBvZiB0aGVcbiAgICogd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChDbHJXaXphcmRQYWdlQnV0dG9ucywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHVibGljIF9idXR0b25zOiBDbHJXaXphcmRQYWdlQnV0dG9ucztcblxuICAvKipcbiAgICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgd2l0aGluIHRoZSBwYWdlLiBJZiBub3QgZGVmaW5lZCxcbiAgICogdGhlIHdpemFyZCBkZWZhdWx0cyB0byB0aGUgc2V0IG9mIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgYXMgYSBkaXJlY3QgY2hpbGQgb2YgdGhlXG4gICAqIHdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnMsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHB1YmxpYyBfaGVhZGVyQWN0aW9uczogQ2xyV2l6YXJkUGFnZUhlYWRlckFjdGlvbnM7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uZXh0U3RlcERpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZ2V0dGVyIHRoYXQgdGVsbHMgd2hldGhlciBvciBub3QgdGhlIHdpemFyZCBzaG91bGQgYmUgYWxsb3dlZFxuICAgKiB0byBtb3ZlIHRvIHRoZSBuZXh0IHBhZ2UuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgaW4tcGFnZSB2YWxpZGF0aW9uIGJlY2F1c2UgaXQgcHJldmVudHMgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAqIGFuZCB2aXNpYmx5IGRpc2FibGVzIHRoZSBuZXh0IGJ1dHRvbi5cbiAgICpcbiAgICogRG9lcyBub3QgcmVxdWlyZSB0aGF0IHlvdSByZS1pbXBsZW1lbnQgbmF2aWdhdGlvbiByb3V0aW5lcyBsaWtlIHlvdVxuICAgKiB3b3VsZCBpZiB5b3Ugd2VyZSB1c2luZyBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0IG9yXG4gICAqIFdpemFyZC5wcmV2ZW50RGVmYXVsdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgbmV4dFN0ZXBEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFN0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBhZ2Ugc2hvdWxkIGFsbG93IGZvcndhcmQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZU5leHREaXNhYmxlZCcpXG4gIHB1YmxpYyBzZXQgbmV4dFN0ZXBEaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICBjb25zdCB2YWxCb29sID0gISF2YWw7XG4gICAgaWYgKHZhbEJvb2wgIT09IHRoaXMuX25leHRTdGVwRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGVwRGlzYWJsZWQgPSB2YWxCb29sO1xuICAgICAgdGhpcy5uZXh0U3RlcERpc2FibGVkQ2hhbmdlLmVtaXQodmFsQm9vbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIG9mIENscldpemFyZFBhZ2UubmV4dFN0ZXBEaXNhYmxlZCBjaGFuZ2VzLlxuICAgKiBTaG91bGQgZW1pdCB0aGUgbmV3IHZhbHVlIG9mIG5leHRTdGVwRGlzYWJsZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlTmV4dERpc2FibGVkQ2hhbmdlJykgbmV4dFN0ZXBEaXNhYmxlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJldmlvdXNTdGVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB3aGV0aGVyIG9yIG5vdCB0aGUgd2l6YXJkIHNob3VsZCBiZSBhbGxvd2VkXG4gICAqIHRvIG1vdmUgdG8gdGhlIHByZXZpb3VzIHBhZ2UuXG4gICAqXG4gICAqIFVzZWZ1bCBmb3IgaW4tcGFnZSB2YWxpZGF0aW9uIGJlY2F1c2UgaXQgcHJldmVudHMgYmFja3dhcmQgbmF2aWdhdGlvblxuICAgKiBhbmQgdmlzaWJseSBkaXNhYmxlcyB0aGUgcHJldmlvdXMgYnV0dG9uLlxuICAgKlxuICAgKiBEb2VzIG5vdCByZXF1aXJlIHRoYXQgeW91IHJlLWltcGxlbWVudCBuYXZpZ2F0aW9uIHJvdXRpbmVzIGxpa2UgeW91XG4gICAqIHdvdWxkIGlmIHlvdSB3ZXJlIHVzaW5nIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHQgb3JcbiAgICogV2l6YXJkLnByZXZlbnREZWZhdWx0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBwcmV2aW91c1N0ZXBEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNTdGVwRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIHRoZSBwYWdlIHNob3VsZCBhbGxvdyBiYWNrd2FyZCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXNEaXNhYmxlZCcpXG4gIHB1YmxpYyBzZXQgcHJldmlvdXNTdGVwRGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9wcmV2aW91c1N0ZXBEaXNhYmxlZCkge1xuICAgICAgdGhpcy5fcHJldmlvdXNTdGVwRGlzYWJsZWQgPSB2YWxCb29sO1xuICAgICAgdGhpcy5wcmV2aW91c1N0ZXBEaXNhYmxlZENoYW5nZS5lbWl0KHZhbEJvb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBvZiBDbHJXaXphcmRQYWdlLnByZXZpb3VzU3RlcERpc2FibGVkIGNoYW5nZXMuXG4gICAqIFNob3VsZCBlbWl0IHRoZSBuZXcgdmFsdWUgb2YgcHJldmlvdXNTdGVwRGlzYWJsZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlUHJldmlvdXNEaXNhYmxlZENoYW5nZScpXG4gIHB1YmxpYyBwcmV2aW91c1N0ZXBEaXNhYmxlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgYWxsIGFjdGlvbnMgZnJvbSB0aGUgcGFnZSBsZXZlbCwgc28geW91IGNhbiB1c2UgYW4gYWx0ZXJuYXRlIGZ1bmN0aW9uIGZvclxuICAgKiB2YWxpZGF0aW9uIG9yIGRhdGEtbXVuZ2luZyB3aXRoIGEgQ2xyV2l6YXJkUGFnZS5vbkNvbW1pdCAoY2xyV2l6YXJkUGFnZU9uQ29tbWl0IG91dHB1dCksXG4gICAqIENscldpemFyZFBhZ2Uub25DYW5jZWwgKGNscldpemFyZFBhZ2VPbkNhbmNlbCBvdXRwdXQpLCBvciBvbmVcbiAgICogb2YgdGhlIGdyYW51bGFyIHBhZ2UtbGV2ZWwgYnV0dG9uIGNsaWNrIGV2ZW50IGVtaXR0ZXJzLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHQnKSBwdWJsaWMgcHJldmVudERlZmF1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX3N0b3BDYW5jZWwgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCByZXRyaWV2ZXMgd2hldGhlciB0aGUgcGFnZSBpcyBwcmV2ZW50aW5nIHRoZSBjYW5jZWwgYWN0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdG9wQ2FuY2VsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdG9wQ2FuY2VsO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgY2FuY2VsIGFjdGlvbiBmcm9tIHRoZSBwYWdlIGxldmVsLiBBbGxvd3MgeW91IHRvIHVzZSBhblxuICAgKiBhbHRlcm5hdGUgZnVuY3Rpb24gZm9yIHZhbGlkYXRpb24gb3IgZGF0YS1tdW5naW5nIGJlZm9yZSBjYW5jZWxsaW5nIHRoZVxuICAgKiB3aXphcmQgd2hlbiBjb21iaW5lZCB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLm9uQ2FuY2VsXG4gICAqICh0aGUgY2xyV2l6YXJkUGFnZU9uQ2FuY2VsIG91dHB1dCkuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoYXQgeW91IG1hbnVhbGx5IGNsb3NlIHRoZSB3aXphcmQgZnJvbSB5b3VyIGhvc3QgY29tcG9uZW50LFxuICAgKiB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIFdpemFyZC5mb3JjZU5leHQoKSBvciB3aXphcmQubmV4dCgpO1xuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgQElucHV0KCdjbHJXaXphcmRQYWdlUHJldmVudERlZmF1bHRDYW5jZWwnKVxuICBwdWJsaWMgc2V0IHN0b3BDYW5jZWwodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9zdG9wQ2FuY2VsKSB7XG4gICAgICB0aGlzLl9zdG9wQ2FuY2VsID0gdmFsQm9vbDtcbiAgICAgIHRoaXMuc3RvcENhbmNlbENoYW5nZS5lbWl0KHZhbEJvb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0Q2FuY2VsQ2hhbmdlJykgc3RvcENhbmNlbENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RvcE5leHQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBnZXR0ZXIgdGhhdCB0ZWxscyB5b3Ugd2hldGhlciB0aGUgcGFnZSBpcyBwcmV2ZW50aW5nIHRoZSBuZXh0IGFjdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgc3RvcE5leHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3BOZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyBmb3J3YXJkIG5hdmlnYXRpb24gZnJvbSB0aGUgcGFnZSBsZXZlbC4gQWxsb3dzIHlvdSB0byB1c2UgYW5cbiAgICogYWx0ZXJuYXRlIGZ1bmN0aW9uIGZvciB2YWxpZGF0aW9uIG9yIGRhdGEtbXVuZ2luZyBiZWZvcmUgbW92aW5nIHRoZVxuICAgKiB3aXphcmQgdG8gdGhlIG5leHQgcGFnZXdoZW4gY29tYmluZWQgd2l0aCB0aGUgQ2xyV2l6YXJkUGFnZS5vbkNvbW1pdFxuICAgKiAoY2xyV2l6YXJkUGFnZU9uQ29tbWl0KSBvciBDbHJXaXphcmRQYWdlLm5leHRCdXR0b25DbGlja2VkXG4gICAqIChjbHJXaXphcmRQYWdlTmV4dCkgb3V0cHV0cy5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhhdCB5b3UgbWFudWFsbHkgdGVsbCB0aGUgd2l6YXJkIHRvIG5hdmlnYXRlIGZvcndhcmQgZnJvbVxuICAgKiB0aGUgaG9zdENvbXBvbmVudCwgdXN1YWxseSB3aXRoIGEgY2FsbCB0byBXaXphcmQuZm9yY2VOZXh0KCkgb3JcbiAgICogd2l6YXJkLm5leHQoKTtcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIEBJbnB1dCgnY2xyV2l6YXJkUGFnZVByZXZlbnREZWZhdWx0TmV4dCcpXG4gIHB1YmxpYyBzZXQgc3RvcE5leHQodmFsOiBib29sZWFuKSB7XG4gICAgY29uc3QgdmFsQm9vbCA9ICEhdmFsO1xuICAgIGlmICh2YWxCb29sICE9PSB0aGlzLl9zdG9wTmV4dCkge1xuICAgICAgdGhpcy5fc3RvcE5leHQgPSB2YWxCb29sO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVyIGNhcnJpZWQgb3ZlciBmcm9tIGEgbGVnYWN5IHZlcnNpb24gb2YgQ2xyV2l6YXJkUGFnZS5cbiAgICogRmlyZXMgYW4gZXZlbnQgb24gQ2xyV2l6YXJkUGFnZSB3aGVuZXZlciB0aGUgbmV4dCBvciBmaW5pc2ggYnV0dG9uc1xuICAgKiBhcmUgY2xpY2tlZCBhbmQgdGhlIHBhZ2UgaXMgdGhlIGN1cnJlbnQgcGFnZSBvZiB0aGUgV2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCBhdXRvbWF0aWNhbGx5IGVtaXQgYW4gZXZlbnQgd2hlbiBhIGN1c3RvbVxuICAgKiBidXR0b24gaXMgdXNlZCBpbiBwbGFjZSBvZiBhIG5leHQgb3IgZmluaXNoIGJ1dHRvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkNvbW1pdCcpIG9uQ29tbWl0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gQ2xyV2l6YXJkUGFnZSBiZWNvbWVzIHRoZSBjdXJyZW50IHBhZ2Ugb2YgdGhlXG4gICAqIFdpemFyZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VPbkxvYWQnKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBDbHJXaXphcmRQYWdlIGludm9rZXMgdGhlIGNhbmNlbCByb3V0aW5lIGZvciB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnN0b3BDYW5jZWxcbiAgICogKGNscldpemFyZFBhZ2VQcmV2ZW50RGVmYXVsdENhbmNlbCkgb3IgQ2xyV2l6YXJkUGFnZS5wcmV2ZW50RGVmYXVsdFxuICAgKiAoY2xyV2l6YXJkUGFnZVBhZ2VQcmV2ZW50RGVmYXVsdCkgaW5wdXRzIHRvIGltcGxlbWVudCBjdXN0b20gY2FuY2VsXG4gICAqIGZ1bmN0aW9uYWxpdHkgYXQgdGhlIHBhZ2UgbGV2ZWwuIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvXG4gICAqIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FybiB1c2VycyBiZWZvcmUgY2FuY2VsbGluZyB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyByZXF1aXJlcyB5b3UgdG8gY2FsbCBXaXphcmQuY2xvc2UoKSBmcm9tIHRoZSBob3N0IGNvbXBvbmVudC5cbiAgICogVGhpcyBjb25zdGl0dWVzIGEgZnVsbCByZXBsYWNlbWVudCBvZiB0aGUgY2FuY2VsIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlT25DYW5jZWwnKSBwYWdlT25DYW5jZWw6IEV2ZW50RW1pdHRlcjxDbHJXaXphcmRQYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZpbmlzaFxuICAgKiBmdW5jdGlvbmFsaXR5IGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gY29tcGxldGVcbiAgICogdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpIG9yIFdpemFyZC5mb3JjZUZpbmlzaCgpXG4gICAqIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mXG4gICAqIHRoZSBmaW5pc2ggZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIEBPdXRwdXQoJ2NscldpemFyZFBhZ2VGaW5pc2gnKSBmaW5pc2hCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHByZXZpb3VzIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGJhY2t3YXJkc1xuICAgKiBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd291bGQgbGlrZSB0byBkb1xuICAgKiB2YWxpZGF0aW9uLCBzYXZlIGRhdGEsIG9yIHdhcm4gdXNlcnMgYmVmb3JlIGFsbG93aW5nIHRoZW0gdG8gZ29cbiAgICogYmFja3dhcmRzIGluIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5wcmV2aW91cygpXG4gICAqIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mXG4gICAqIHRoZSBiYWNrd2FyZHMgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByZXZpb3VzJykgcHJldmlvdXNCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q2xyV2l6YXJkUGFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBDbHJXaXphcmRQYWdlIGlzXG4gICAqIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogbmF2aWdhdGlvbiBhdCB0aGUgcGFnZSBsZXZlbC4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG9cbiAgICogdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvXG4gICAqIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KClcbiAgICogZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXMgY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2ZcbiAgICogdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZU5leHQnKSBuZXh0QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgZGFuZ2VyIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgQ2xyV2l6YXJkUGFnZSBpc1xuICAgKiB0aGUgd2l6YXJkJ3MgY3VycmVudCBwYWdlLiBCeSBkZWZhdWx0LCBhIGRhbmdlciBidXR0b24gd2lsbCBhY3QgYXNcbiAgICogZWl0aGVyIGEgXCJuZXh0XCIgb3IgXCJmaW5pc2hcIiBidXR0b24gZGVwZW5kaW5nIG9uIGlmIHRoZSBDbHJXaXphcmRQYWdlIGlzIHRoZVxuICAgKiBsYXN0IHBhZ2Ugb3Igbm90LlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBDbHJXaXphcmRQYWdlLnByZXZlbnREZWZhdWx0XG4gICAqIChjbHJXaXphcmRQYWdlUGFnZVByZXZlbnREZWZhdWx0KSBpbnB1dCB0byBpbXBsZW1lbnQgY3VzdG9tIGZvcndhcmRzXG4gICAqIG9yIGZpbmlzaCBuYXZpZ2F0aW9uIGF0IHRoZSBwYWdlIGxldmVsIHdoZW4gdGhlIGRhbmdlciBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdvdWxkIGxpa2UgdG8gZG8gdmFsaWRhdGlvbiwgc2F2ZSBkYXRhLCBvciB3YXJuXG4gICAqIHVzZXJzIGJlZm9yZSBhbGxvd2luZyB0aGVtIHRvIGdvIHRvIHRoZSBuZXh0IHBhZ2UgaW4gdGhlIHdpemFyZCBvclxuICAgKiBmaW5pc2ggdGhlIHdpemFyZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgcmVxdWlyZXMgeW91IHRvIGNhbGwgV2l6YXJkLmZpbmlzaCgpLCBXaXphcmQuZm9yY2VGaW5pc2goKSxcbiAgICogV2l6YXJkLmZvcmNlTmV4dCgpIG9yIFdpemFyZC5uZXh0KCkgZnJvbSB0aGUgaG9zdCBjb21wb25lbnQuIFRoaXNcbiAgICogY29tYmluYXRpb24gY3JlYXRlcyBhIGZ1bGwgcmVwbGFjZW1lbnQgb2YgdGhlIGZvcndhcmQgbmF2aWdhdGlvbiBhbmRcbiAgICogZmluaXNoIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBAT3V0cHV0KCdjbHJXaXphcmRQYWdlRGFuZ2VyJykgZGFuZ2VyQnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENscldpemFyZFBhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgbmV4dCwgZmluaXNoLCBvciBkYW5nZXIgYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZVxuICAgKiBDbHJXaXphcmRQYWdlIGlzIHRoZSB3aXphcmQncyBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIENscldpemFyZFBhZ2UucHJldmVudERlZmF1bHRcbiAgICogKGNscldpemFyZFBhZ2VQYWdlUHJldmVudERlZmF1bHQpIGlucHV0IHRvIGltcGxlbWVudCBjdXN0b20gZm9yd2FyZHNcbiAgICogb3IgZmluaXNoIG5hdmlnYXRpb24gYXQgdGhlIHBhZ2UgbGV2ZWwsIHJlZ2FyZGxlc3Mgb2YgdGhlIHR5cGUgb2ZcbiAgICogcHJpbWFyeSBidXR0b24uXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGRvIHZhbGlkYXRpb24sIHNhdmUgZGF0YSwgb3Igd2FyblxuICAgKiB1c2VycyBiZWZvcmUgYWxsb3dpbmcgdGhlbSB0byBnbyB0byB0aGUgbmV4dCBwYWdlIGluIHRoZSB3aXphcmQgb3JcbiAgICogZmluaXNoIHRoZSB3aXphcmQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHJlcXVpcmVzIHlvdSB0byBjYWxsIFdpemFyZC5maW5pc2goKSwgV2l6YXJkLmZvcmNlRmluaXNoKCksXG4gICAqIFdpemFyZC5mb3JjZU5leHQoKSBvciBXaXphcmQubmV4dCgpIGZyb20gdGhlIGhvc3QgY29tcG9uZW50LiBUaGlzXG4gICAqIGNvbWJpbmF0aW9uIGNyZWF0ZXMgYSBmdWxsIHJlcGxhY2VtZW50IG9mIHRoZSBmb3J3YXJkIG5hdmlnYXRpb24gYW5kXG4gICAqIGZpbmlzaCBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZVByaW1hcnknKSBwcmltYXJ5QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgnY2xyV2l6YXJkUGFnZUN1c3RvbUJ1dHRvbicpIGN1c3RvbUJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBBbiBpbnB1dCB2YWx1ZSB0aGF0IGlzIHVzZWQgaW50ZXJuYWxseSB0byBnZW5lcmF0ZSB0aGUgQ2xyV2l6YXJkUGFnZSBJRCBhc1xuICAgKiB3ZWxsIGFzIHRoZSBzdGVwIG5hdiBpdGVtIElELlxuICAgKlxuICAgKiBUeXBlZCBhcyBhbnkgYmVjYXVzZSBpdCBzaG91bGQgYmUgYWJsZSB0byBhY2NlcHQgbnVtYmVycyBhcyB3ZWxsIGFzXG4gICAqIHN0cmluZ3MuIFBhc3NpbmcgYW4gaW5kZXggZm9yIHdpemFyZCB3aG9zZSBwYWdlcyBhcmUgY3JlYXRlZCB3aXRoIGFuXG4gICAqIG5nRm9yIGxvb3AgaXMgYSBjb21tb24gdXNlIGNhc2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ2lkJykgX2lkOiBhbnkgPSAod2l6YXJkUGFnZUluZGV4KyspLnRvU3RyaW5nKCk7XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IGdlbmVyYXRlcyBhbiBJRCBzdHJpbmcgZm9yIHRoZSB3aXphcmQgcGFnZSBmcm9tXG4gICAqIGVpdGhlciB0aGUgdmFsdWUgcGFzc2VkIHRvIHRoZSBDbHJXaXphcmRQYWdlIFwiaWRcIiBpbnB1dCBvciBhIHdpemFyZCBwYWdlXG4gICAqIGNvdW50ZXIgc2hhcmVkIGFjcm9zcyBhbGwgd2l6YXJkIHBhZ2VzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSB2YWx1ZSBwYXNzZWQgaW50byB0aGUgSUQgaW5wdXQgV2lsbCBiZSBwcmVmaXhlZCB3aXRoXG4gICAqIFwiY2xyLXdpemFyZC1wYWdlLVwiLlxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlcm9mIENscldpemFyZFBhZ2VcbiAgICovXG4gIHB1YmxpYyBnZXQgaWQoKSB7XG4gICAgLy8gY292ZXJzIHRoaW5ncyBsaWtlIG51bGwsIHVuZGVmaW5lZCwgZmFsc2UsIGFuZCBlbXB0eSBzdHJpbmdcbiAgICAvLyB3aGlsZSBhbGxvd2luZyB6ZXJvIHRvIHBhc3NcbiAgICBjb25zdCBpZElzTm9uWmVyb0ZhbHN5ID0gIXRoaXMuX2lkICYmIHRoaXMuX2lkICE9PSAwO1xuXG4gICAgLy8gaW4gYWRkaXRpb24gdG8gbm9uLXplcm8gZmFsc3kgd2UgYWxzbyB3YW50IHRvIG1ha2Ugc3VyZSBfaWQgaXMgbm90IGEgbmVnYXRpdmVcbiAgICAvLyBudW1iZXIuXG4gICAgaWYgKGlkSXNOb25aZXJvRmFsc3kgfHwgdGhpcy5faWQgPCAwKSB7XG4gICAgICAvLyBndWFyZCBoZXJlIGluIHRoZSBldmVudCB0aGF0IGlucHV0IGJlY29tZXMgdW5kZWZpbmVkIG9yIG51bGwgYnkgYWNjaWRlbnRcbiAgICAgIHRoaXMuX2lkID0gKHdpemFyZFBhZ2VJbmRleCsrKS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gYGNsci13aXphcmQtcGFnZS0ke3RoaXMuX2lkfWA7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgc2VydmVzIGFzIGEgY29udmVuaWVuY2UgZm9yIHRob3NlIHdobyB3b3VsZCByYXRoZXJcbiAgICogbm90IHRoaW5rIGluIHRoZSB0ZXJtcyBvZiAhQ2xyV2l6YXJkUGFnZS5uZXh0U3RlcERpc2FibGVkLiBGb3Igc29tZSB1c2UgY2FzZXMsXG4gICAqIENscldpemFyZFBhZ2UucmVhZHlUb0NvbXBsZXRlIGlzIG1vcmUgbG9naWNhbCBhbmQgZGVjbGFyYXRpdmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlYWR5VG9Db21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubmV4dFN0ZXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfY29tcGxldGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBwYWdlIGlzIG1hcmtlZCBhcyBjb21wbGV0ZWQgaWYgaXQgaXMgYm90aCByZWFkeVRvQ29tcGxldGUgYW5kIGNvbXBsZXRlZCxcbiAgICogYXMgaW4gdGhlIG5leHQgb3IgZmluaXNoIGFjdGlvbiBoYXMgYmVlbiBleGVjdXRlZCB3aGlsZSB0aGlzIHBhZ2Ugd2FzIGN1cnJlbnQuXG4gICAqXG4gICAqIE5vdGUgdGhlcmUgaXMgYW5kIG9wZW4gcXVlc3Rpb24gYWJvdXQgaG93IHRvIGhhbmRsZSBwYWdlcyB0aGF0IGFyZSBtYXJrZWRcbiAgICogY29tcGxldGUgYnV0IHdobyBhcmUgbm8gbG9uZ2VyIHJlYWR5VG9Db21wbGV0ZS4gVGhpcyBtaWdodCBpbmRpY2F0ZSBhbiBlcnJvclxuICAgKiBzdGF0ZSBmb3IgdGhlIENscldpemFyZFBhZ2UuIEN1cnJlbnRseSwgdGhlIHdpemFyZCBkb2VzIG5vdCBhY2tub3dsZWRnZSB0aGlzIHN0YXRlXG4gICAqIGFuZCBvbmx5IHJldHVybnMgdGhhdCB0aGUgcGFnZSBpcyBpbmNvbXBsZXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBjb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlICYmIHRoaXMucmVhZHlUb0NvbXBsZXRlO1xuXG4gICAgLy8gRk9SIFYyOiBVTldJTkQgQ09NUExFVEVELCBSRUFEWVRPQ09NUExFVEUsIEFORCBFUlJPUlNcbiAgICAvLyBTVUNIIFRIQVQgRVJST1JTIElTIElUUyBPV04gSU5QVVQuIElGIEEgU1RFUCBJU1xuICAgIC8vIElOQ09NUExFVEUgQU5EIEVSUk9SRUQsIEVSUk9SRUQgV0lMTCBOT1QgU0hPVy5cbiAgICAvLyBGSVJTVCBRVUVTVElPTjogQU0gSSBHUkVZIE9SIENPTE9SRUQ/XG4gICAgLy8gU0VDT05EIFFVRVNUSU9OOiBBTSBJIEdSRUVOIE9SIFJFRD9cbiAgfVxuXG4gIC8qKlxuICAgKiBBIENscldpemFyZFBhZ2UgY2FuIGJlIG1hbnVhbGx5IHNldCB0byBjb21wbGV0ZWQgdXNpbmcgdGhpcyBib29sZWFuIHNldHRlci5cbiAgICogSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB1c2VycyByZWx5IG9uIHRoZSBjb252ZW5pZW5jZSBmdW5jdGlvbnMgaW4gdGhlIHdpemFyZFxuICAgKiBhbmQgbmF2aWdhdGlvbiBzZXJ2aWNlIGluc3RlYWQgb2YgbWFudWFsbHkgc2V0dGluZyBwYWdlc+KAmSBjb21wbGV0aW9uIHN0YXRlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2xyV2l6YXJkUGFnZVxuICAgKi9cbiAgcHVibGljIHNldCBjb21wbGV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb21wbGV0ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aXRoIHRoZSBuYXZpZ2F0aW9uIHNlcnZpY2UgdG8gc2VlIGlmIGl0IGlzIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZSA9PT0gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmVuYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSByZWFkLW9ubHkgZ2V0dGVyIHRoYXQgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcGFnZSBpcyBuYXZpZ2FibGVcbiAgICogaW4gdGhlIHdpemFyZC4gQSB3aXphcmQgcGFnZSBjYW4gYmUgbmF2aWdhdGVkIHRvIGlmIGl0IGlzIGNvbXBsZXRlZFxuICAgKiBvciB0aGUgcGFnZSBiZWZvcmUgaXQgaXMgY29tcGxldGVkLlxuICAgKlxuICAgKiBUaGlzIGdldHRlciBoYW5kbGVzIHRoZSBsb2dpYyBmb3IgZW5hYmxpbmcgb3IgZGlzYWJsaW5nIHRoZSBsaW5rcyBpblxuICAgKiB0aGUgc3RlcCBuYXYgb24gdGhlIGxlZnQgU2lkZSBvZiB0aGUgd2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQgfHwgdGhpcy5jb21wbGV0ZWQgfHwgdGhpcy5wcmV2aW91c0NvbXBsZXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwYWdlIGJlZm9yZSB0aGlzXG4gICAqIENscldpemFyZFBhZ2UgaXMgY29tcGxldGVkLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciBvciBub3RcbiAgICogYSBwYWdlIGlzIG5hdmlnYWJsZSBpZiBpdCBpcyBub3QgY3VycmVudCBvciBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgcHJldmlvdXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldmlvdXNQYWdlID0gdGhpcy5wYWdlQ29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UodGhpcyk7XG5cbiAgICBpZiAoIXByZXZpb3VzUGFnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzUGFnZS5jb21wbGV0ZWQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgdGl0bGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZVRpdGxlLnBhZ2VUaXRsZVRlbXBsYXRlUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5hdlRpdGxlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLnBhZ2VOYXZUaXRsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFnZU5hdlRpdGxlLnBhZ2VOYXZUaXRsZVRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlVGl0bGUucGFnZVRpdGxlVGVtcGxhdGVSZWY7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGVhZGVyQWN0aW9ucygpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAoIXRoaXMuX2hlYWRlckFjdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckFjdGlvbnMucGFnZUhlYWRlckFjdGlvbnNUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBoYXNIZWFkZXJBY3Rpb25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX2hlYWRlckFjdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgYnV0dG9ucygpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAoIXRoaXMuX2J1dHRvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2J1dHRvbnMucGFnZUJ1dHRvbnNUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHJlYWQtb25seSBnZXR0ZXIgdGhhdCByZXR1cm5zIGEgYm9vbGVhbiB0aGF0IHNheXMgd2hldGhlciBvclxuICAgKiBub3QgdGhlIENscldpemFyZFBhZ2UgaW5jbHVkZXMgYnV0dG9ucy4gVXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlXG4gICAqIFdpemFyZCBzaG91bGQgb3ZlcnJpZGUgdGhlIGRlZmF1bHQgYnV0dG9uIHNldCBkZWZpbmVkIGFzXG4gICAqIGl0cyBkaXJlY3QgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBXaXphcmRQYWdlXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhhc0J1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fYnV0dG9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIHRoZSBuYXYgc2VydmljZSB0byBtYWtlIHRoZSBDbHJXaXphcmRQYWdlIHRoZSBjdXJyZW50IHBhZ2UgaW4gdGhlXG4gICAqIHdpemFyZC4gQnlwYXNzZXMgYWxsIGNoZWNrcyBidXQgc3RpbGwgZW1pdHMgdGhlIENscldpemFyZFBhZ2Uub25Mb2FkXG4gICAqIChjbHJXaXphcmRQYWdlT25Mb2FkKSBvdXRwdXQuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIGl0IGlzIGJldHRlciB0byB1c2UgdGhlIGRlZmF1bHQgbmF2aWdhdGlvbiBmdW5jdGlvbnNcbiAgICogaW4gV2l6YXJkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIG1ha2VDdXJyZW50KCk6IHZvaWQge1xuICAgIHRoaXMubmF2U2VydmljZS5jdXJyZW50UGFnZSA9IHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTGlua3MgdGhlIG5hdiBzZXJ2aWNlIGFuZCBlc3RhYmxpc2hlcyB0aGUgY3VycmVudCBwYWdlIGlmIG9uZSBpcyBub3QgZGVmaW5lZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFdpemFyZFBhZ2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBuYXZTZXJ2aWNlID0gdGhpcy5uYXZTZXJ2aWNlO1xuICAgIGlmICghbmF2U2VydmljZS5jdXJyZW50UGFnZSAmJiAhbmF2U2VydmljZS5uYXZTZXJ2aWNlTG9hZGVkKSB7XG4gICAgICB0aGlzLm1ha2VDdXJyZW50KCk7XG4gICAgICB0aGlzLm5hdlNlcnZpY2UubmF2U2VydmljZUxvYWRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVhZC1vbmx5IGdldHRlciB0aGF0IHJldHVybnMgdGhlIGlkIHVzZWQgYnkgdGhlIHN0ZXAgbmF2IGl0ZW0gYXNzb2NpYXRlZCB3aXRoIHRoZSBwYWdlLlxuICAgKlxuICAgKiBDbHJXaXphcmRQYWdlIG5lZWRzIHRoaXMgSUQgc3RyaW5nIGZvciBhcmlhIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgV2l6YXJkUGFnZVxuICAgKlxuICAgKi9cbiAgcHVibGljIGdldCBzdGVwSXRlbUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGFnZUNvbGxlY3Rpb24uZ2V0U3RlcEl0ZW1JZEZvclBhZ2UodGhpcyk7XG4gIH1cbn1cbiJdfQ==