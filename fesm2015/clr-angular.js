import { __decorate, __metadata, __param } from 'tslib';
import { Directive, NgModule, EventEmitter, Input, Output, TemplateRef, ViewContainerRef, Optional, Injectable, ViewChild, Component, SkipSelf, ɵɵdefineInjectable, ContentChildren, QueryList, HostListener, ElementRef, Renderer2, HostBinding, InjectionToken, ContentChild, Inject, ComponentFactoryResolver, Self, Attribute, Injector, PLATFORM_ID, NgZone, LOCALE_ID, ChangeDetectionStrategy, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser, getLocaleDayNames, FormStyle, TranslationWidth, getLocaleMonthNames, getLocaleFirstDayOfWeek, getLocaleDateFormat, FormatWidth, NgForOf } from '@angular/common';
import { Subject, BehaviorSubject, of, fromEvent, combineLatest, Observable, isObservable, ReplaySubject } from 'rxjs';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';
import { NgControl, FormsModule, SelectMultipleControlValueAccessor, FormControl, FormGroup, FormGroupName, NgModelGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { startWith, filter, distinctUntilChanged, first, switchMap, map, take, tap } from 'rxjs/operators';

let ClrIconCustomTag = class ClrIconCustomTag {
};
ClrIconCustomTag = __decorate([
    Directive({ selector: 'clr-icon' })
], ClrIconCustomTag);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
let ClrIconModule = class ClrIconModule {
};
ClrIconModule = __decorate([
    NgModule({ imports: [CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] })
], ClrIconModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Point;
(function (Point) {
    Point[Point["RIGHT_CENTER"] = 0] = "RIGHT_CENTER";
    Point[Point["RIGHT_TOP"] = 1] = "RIGHT_TOP";
    Point[Point["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
    Point[Point["TOP_CENTER"] = 3] = "TOP_CENTER";
    Point[Point["TOP_RIGHT"] = 4] = "TOP_RIGHT";
    Point[Point["TOP_LEFT"] = 5] = "TOP_LEFT";
    Point[Point["BOTTOM_CENTER"] = 6] = "BOTTOM_CENTER";
    Point[Point["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
    Point[Point["BOTTOM_LEFT"] = 8] = "BOTTOM_LEFT";
    Point[Point["LEFT_CENTER"] = 9] = "LEFT_CENTER";
    Point[Point["LEFT_TOP"] = 10] = "LEFT_TOP";
    Point[Point["LEFT_BOTTOM"] = 11] = "LEFT_BOTTOM";
})(Point || (Point = {}));
const POSITION_RELATIVE = 'relative';
const POSITION_ABSOLUTE = 'absolute';
const POSITION_FIXED = 'fixed';
const OVERFLOW_SCROLL = 'scroll';
const OVERFLOW_AUTO = 'auto';
class Popover {
    constructor(element) {
        this.element = element;
        /*
         * Containers up to the first positioned one will have an event on scroll
         */
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = 'auto';
        element.style.left = 0;
        element.style.right = 'auto';
    }
    // TODO: need a way to account for parameters that change dynamically (positioning).
    anchor(anchor, anchorAlign, popoverAlign, { offsetX = 0, offsetY = 0, useAnchorParent = false } = {}) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        const anchorRect = anchor.getBoundingClientRect();
        const popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        let leftDiff = anchorRect.left - popoverRect.left + offsetX;
        let topDiff = anchorRect.top - popoverRect.top + offsetY;
        // first, adjust positioning based on anchor's align point
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff += anchorRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff += anchorRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff += anchorRect.height / 2;
                leftDiff += anchorRect.width;
                break;
            default:
        }
        // second, adjust positioning based on popover's align point
        switch (popoverAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff -= popoverRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff -= popoverRect.height / 2;
                leftDiff -= popoverRect.width;
                break;
            default:
        }
        // Third, adjust with popover's margins based on the two align points.
        // Here, we make an assumption that popover is primarily positioned outside the
        // anchor with minor offset. Without this assumption, it's impossible to apply
        // the popover's margins in a predictable way. For example, assume that a popover
        // and its anchor are exactly the same size. if a popover is positioned inside the
        // anchor (which is technically possible), then it becomes impossible to know what to do
        // if the popover has a non-zero margin value all around (because applying the margin in
        // all four directions will result in no margin visually, which isn't what we want).
        // Therefore, our logic makes assumptions about margins of interest given the points,
        // and only covers the cases where popover is outside the anchor.
        const popoverComputedStyle = getComputedStyle(this.element);
        const marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        const marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        const marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        const marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
            case Point.TOP_RIGHT:
            case Point.RIGHT_TOP:
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.LEFT_BOTTOM:
            case Point.BOTTOM_LEFT:
            case Point.BOTTOM_RIGHT:
            case Point.RIGHT_BOTTOM:
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.TOP_CENTER:
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += marginTop;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.LEFT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff -= marginRight;
                break;
            case Point.RIGHT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                break;
            default:
        }
        this.element.style.transform = `translateX(${Math.round(leftDiff)}px) translateY(${Math.round(topDiff)}px)`;
        return this._scroll.asObservable();
    }
    release() {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    }
    isPositioned(container) {
        const position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    }
    emitScrollEvent() {
        this._scroll.next();
    }
    addScrollEventListeners(e) {
        this._scroll = new Subject();
        const anchor = e;
        let current = e;
        while (current && current !== document) {
            if (this.scrolls(current)) {
                current.addEventListener('scroll', this.boundOnScrollListener);
                this.scrollableElements.push(current);
            }
            if (current !== anchor && this.isPositioned(current)) {
                break;
            }
            current = current.parentNode;
        }
    }
    removeScrollEventListeners() {
        for (const elem of this.scrollableElements) {
            elem.removeEventListener('scroll', this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    }
    scrolls(container) {
        const computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    }
}

let openCount = 0;
const waiting = []; // pending create functions
let PopoverDirectiveOld = class PopoverDirectiveOld {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    set clrPopoverOld(open) {
        if (open) {
            if (this.popoverOptions.allowMultipleOpen) {
                this.createPopover();
            }
            else {
                if (openCount === 0) {
                    this.createPopover();
                }
                else {
                    waiting.push(() => {
                        this.createPopover();
                    });
                }
            }
        }
        else {
            this.viewContainer.clear();
            this.destroyPopover();
            if (!this.popoverOptions.allowMultipleOpen) {
                if (waiting.length > 0) {
                    const createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    createPopover() {
        const embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        const elementNodes = embeddedViewRef.rootNodes.filter((node) => {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(() => {
            this.clrPopoverOldChange.emit(false);
        });
        openCount++;
    }
    destroyPopover() {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    }
    ngOnDestroy() {
        this.destroyPopover();
    }
};
__decorate([
    Input('clrPopoverOldAnchor'),
    __metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "anchorElem", void 0);
__decorate([
    Input('clrPopoverOldAnchorPoint'),
    __metadata("design:type", Number)
], PopoverDirectiveOld.prototype, "anchorPoint", void 0);
__decorate([
    Input('clrPopoverOldPopoverPoint'),
    __metadata("design:type", Number)
], PopoverDirectiveOld.prototype, "popoverPoint", void 0);
__decorate([
    Input('clrPopoverOldOptions'),
    __metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "popoverOptions", void 0);
__decorate([
    Output('clrPopoverOldChange'),
    __metadata("design:type", Object)
], PopoverDirectiveOld.prototype, "clrPopoverOldChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PopoverDirectiveOld.prototype, "clrPopoverOld", null);
PopoverDirectiveOld = __decorate([
    Directive({ selector: '[clrPopoverOld]' }),
    __metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
], PopoverDirectiveOld);

const POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrCommonPopoverModule = class ClrCommonPopoverModule {
};
ClrCommonPopoverModule = __decorate([
    NgModule({ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] })
], ClrCommonPopoverModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 */
class LoadingListener {
}

var ClrLoadingState;
(function (ClrLoadingState) {
    ClrLoadingState[ClrLoadingState["DEFAULT"] = 0] = "DEFAULT";
    ClrLoadingState[ClrLoadingState["LOADING"] = 1] = "LOADING";
    ClrLoadingState[ClrLoadingState["SUCCESS"] = 2] = "SUCCESS";
    ClrLoadingState[ClrLoadingState["ERROR"] = 3] = "ERROR";
})(ClrLoadingState || (ClrLoadingState = {}));
let ClrLoading = class ClrLoading {
    // We find the first parent that handles something loading
    constructor(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    get loadingState() {
        return this._loadingState;
    }
    set loadingState(value) {
        if (value === true) {
            value = ClrLoadingState.LOADING;
        }
        else if (!value) {
            value = ClrLoadingState.DEFAULT;
        }
        if (value === this._loadingState) {
            return;
        }
        this._loadingState = value;
        if (this.listener) {
            this.listener.loadingStateChange(value);
        }
    }
    ngOnDestroy() {
        this.loadingState = ClrLoadingState.DEFAULT;
    }
};
__decorate([
    Input('clrLoading'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrLoading.prototype, "loadingState", null);
ClrLoading = __decorate([
    Directive({ selector: '[clrLoading]' }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [LoadingListener])
], ClrLoading);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ButtonInGroupService = class ButtonInGroupService {
    constructor() {
        this._changes = new Subject();
    }
    get changes() {
        return this._changes.asObservable();
    }
    updateButtonGroup(button) {
        this._changes.next(button);
    }
};
ButtonInGroupService = __decorate([
    Injectable()
], ButtonInGroupService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButton_1;
let ClrButton = ClrButton_1 = class ClrButton {
    constructor(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = 'btn';
        this._name = null;
        this._type = null;
        this._id = null;
        this._disabled = null;
        this._click = new EventEmitter(false);
    }
    get inMenu() {
        return this._inMenu;
    }
    set inMenu(value) {
        value = !!value;
        if (this._inMenu !== value) {
            this._inMenu = value;
            // We check if the service flag is enabled
            // and if the service exists because the service is optional
            if (this._enableService && this.buttonInGroupService) {
                this.buttonInGroupService.updateButtonGroup(this);
            }
        }
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(value) {
        if (typeof value === 'string') {
            const classNames = value.split(' ');
            if (classNames.indexOf('btn') === -1) {
                classNames.push('btn');
            }
            this._classNames = classNames.join(' ');
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (typeof value === 'string') {
            this._name = value;
        }
    }
    get type() {
        return this._type;
    }
    set type(value) {
        if (typeof value === 'string') {
            this._type = value;
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        if (typeof value === 'string') {
            this._id = value;
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== null && value !== false) {
            this._disabled = '';
        }
        else {
            this._disabled = null;
        }
    }
    loadingStateChange(state) {
        this.loading = state === ClrLoadingState.LOADING;
    }
    emitClick() {
        this._click.emit(true);
    }
    ngAfterViewInit() {
        this._enableService = true;
    }
};
__decorate([
    ViewChild('buttonProjectedRef', { static: true }),
    __metadata("design:type", TemplateRef)
], ClrButton.prototype, "templateRef", void 0);
__decorate([
    Input('clrInMenu'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrButton.prototype, "inMenu", null);
__decorate([
    Input('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrButton.prototype, "classNames", null);
__decorate([
    Input('name'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrButton.prototype, "name", null);
__decorate([
    Input('type'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrButton.prototype, "type", null);
__decorate([
    Input('id'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrButton.prototype, "id", null);
__decorate([
    Input('disabled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrButton.prototype, "disabled", null);
__decorate([
    Output('click'),
    __metadata("design:type", EventEmitter)
], ClrButton.prototype, "_click", void 0);
ClrButton = ClrButton_1 = __decorate([
    Component({
        selector: 'clr-button',
        template: `
        <ng-template #buttonProjectedRef>
            <button 
                [class]="classNames" 
                (click)="emitClick()"
                [attr.type]="type"
                [attr.name]="name"
                [attr.disabled]="disabled"
                [id]="id">
                <span class="spinner spinner-inline" *ngIf="loading"></span>
                <ng-content></ng-content>
            </button>
        </ng-template>
    `,
        providers: [{ provide: LoadingListener, useExisting: ClrButton_1 }]
    }),
    __param(0, SkipSelf()),
    __param(0, Optional()),
    __metadata("design:paramtypes", [ButtonInGroupService])
], ClrButton);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_MENU_POSITIONS = [
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
    'left-bottom',
    'left-top',
    'right-bottom',
    'right-top',
];

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const commonStringsDefault = {
    open: 'Open',
    close: 'Close',
    show: 'Show',
    hide: 'Hide',
    expand: 'Expand',
    collapse: 'Collapse',
    more: 'More',
    select: 'Select',
    selectAll: 'Select All',
    previous: 'Previous',
    next: 'Next',
    current: 'Jump to current',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
    danger: 'Error',
    rowActions: 'Available actions',
    pickColumns: 'Show or hide columns',
    showColumns: 'Show Columns',
    sortColumn: 'Sort Column',
    firstPage: 'First Page',
    lastPage: 'Last Page',
    nextPage: 'Next Page',
    previousPage: 'Previous Page',
    currentPage: 'Current Page',
    totalPages: 'Total Pages',
    minValue: 'Min value',
    maxValue: 'Max value',
    modalContentStart: 'Beginning of Modal Content',
    modalContentEnd: 'End of Modal Content',
    showColumnsMenuDescription: 'Show or hide columns menu',
    allColumnsSelected: 'All columns selected',
    signpostToggle: 'Signpost Toggle',
    signpostClose: 'Signpost Close',
    loading: 'Loading',
    singleSelectionAriaLabel: 'Single selection header',
    singleActionableAriaLabel: 'Single actionable header',
    detailExpandableAriaLabel: 'Toggle more row content',
    // Alert
    alertCloseButtonAriaLabel: 'Close alert',
    // Date Picker
    datepickerToggle: 'Toggle datepicker',
    datepickerPreviousMonth: 'Previous month',
    datepickerCurrentMonth: 'Current month',
    datepickerNextMonth: 'Next month',
    datepickerPreviousDecade: 'Previous decade',
    datepickerNextDecade: 'Next decade',
    datepickerCurrentDecade: 'Current decade',
    datepickerSelectMonthText: 'Select month, the current month is {CALENDAR_MONTH}',
    datepickerSelectYearText: 'Select year, the current year is {CALENDAR_YEAR}',
    daypickerSRCurrentMonthPhrase: 'The current month is {CURRENT_MONTH}',
    daypickerSRCurrentYearPhrase: 'The current year is {CURRENT_YEAR}',
    daypickerSRCurrentDecadePhrase: 'The current decade is {DECADE_RANGE}',
    // Stack View
    stackViewChanged: 'Value changed.',
};

let ClrCommonStringsService = class ClrCommonStringsService {
    constructor() {
        this._strings = commonStringsDefault;
    }
    /**
     * Allows you to pass in new overrides for localization
     */
    localize(overrides) {
        this._strings = Object.assign({}, this._strings, overrides);
    }
    /**
     * Access to all of the keys as strings
     */
    get keys() {
        return this._strings;
    }
    /**
     * Parse a string with a set of tokens to replace
     */
    parse(source, tokens = {}) {
        const names = Object.keys(tokens);
        let output = source;
        if (names.length) {
            names.forEach(name => {
                output = output.replace(`{${name}}`, tokens[name]);
            });
        }
        return output;
    }
};
ClrCommonStringsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ClrCommonStringsService_Factory() { return new ClrCommonStringsService(); }, token: ClrCommonStringsService, providedIn: "root" });
ClrCommonStringsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ClrCommonStringsService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrButtonGroup = class ClrButtonGroup {
    constructor(buttonGroupNewService, elementRef, commonStrings) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.commonStrings = commonStrings;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT; // default if menuPosition isn't set
        this.popoverPoint = Point.LEFT_TOP; // default if menuPosition isn't set
        /**
         * Flag with indicates if the overflow menu toggle was clicked.
         * If true, this can save us traversing the DOM to find
         * whether the click was withing the button group toggle
         * or menu in the onMouseClick method
         */
        this._overflowMenuToggleClicked = false;
    }
    /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     */
    ngAfterContentInit() {
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(button => this.rearrangeButton(button));
        this.buttons.changes.subscribe(() => {
            this.initializeButtons();
        });
    }
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param button
     */
    rearrangeButton(button) {
        let fromView;
        let toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        const index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            const moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    }
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param buttonToMove
     * @returns
     */
    getMoveIndex(buttonToMove) {
        const tempArr = this.buttons.filter(button => button.inMenu === buttonToMove.inMenu);
        return tempArr.indexOf(buttonToMove);
    }
    initializeButtons() {
        const tempInlineButtons = [];
        const tempInMenuButtons = [];
        this.buttons.forEach(button => {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    }
    get menuPosition() {
        return this._menuPosition;
    }
    set menuPosition(pos) {
        if (pos && CLR_MENU_POSITIONS.indexOf(pos) > -1) {
            this._menuPosition = pos;
        }
        else {
            this._menuPosition = 'bottom-left';
        }
        // set the popover values based on menu position
        switch (this._menuPosition) {
            case 'top-right':
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-top':
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-bottom':
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'left-top':
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'left-bottom':
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    get openMenu() {
        return this._openMenu;
    }
    set openMenu(value) {
        this._openMenu = value;
    }
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     */
    toggleMenu() {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    }
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     */
    onMouseClick(target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            let current = target; // Get the element in the DOM on which the mouse was clicked
            const host = this.elementRef.nativeElement; // Current Button Group
            if (current.classList.contains('dropdown-menu')) {
                current = current.parentNode;
                while (current) {
                    if (current === document) {
                        this.openMenu = false;
                        return;
                    }
                    // If clicked on dropdown menu and menu is in host
                    // do nothing
                    if (current === host) {
                        return;
                    }
                    current = current.parentNode;
                }
            }
            this.openMenu = false;
        }
        this._overflowMenuToggleClicked = false; // Reset the overflow menu toggle clicked flag
    }
};
__decorate([
    ContentChildren(ClrButton),
    __metadata("design:type", QueryList)
], ClrButtonGroup.prototype, "buttons", void 0);
__decorate([
    Input('clrMenuPosition'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrButtonGroup.prototype, "menuPosition", null);
__decorate([
    HostListener('document:click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClrButtonGroup.prototype, "onMouseClick", null);
ClrButtonGroup = __decorate([
    Component({
        selector: 'clr-button-group',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-container *ngFor=\"let inlineButton of inlineButtons\">\n    <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n</ng-container>\n<ng-container *ngIf=\"menuButtons.length > 0\">\n    <div\n        class=\"btn-group-overflow open\"\n        [ngClass]=\"menuPosition\"\n        #anchor>\n        <button\n            class=\"btn dropdown-toggle\"\n            (click)=\"toggleMenu()\">\n            <clr-icon shape=\"ellipsis-horizontal\" [attr.title]=\"commonStrings.keys.more\"></clr-icon>\n        </button>\n        <div\n            class=\"dropdown-menu\"\n            *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n            <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n        </div>\n    </div>\n</ng-container>\n<ng-template #ref>\n    <ng-container *ngFor=\"let menuButton of menuButtons\">\n        <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n    </ng-container>\n</ng-template>\n",
        providers: [ButtonInGroupService],
        host: { '[class.btn-group]': 'true' }
    }),
    __metadata("design:paramtypes", [ButtonInGroupService,
        ElementRef,
        ClrCommonStringsService])
], ClrButtonGroup);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
let ClrButtonGroupModule = class ClrButtonGroupModule {
};
ClrButtonGroupModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
        declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
        exports: [CLR_BUTTON_GROUP_DIRECTIVES],
    })
], ClrButtonGroupModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLoadingButton_1;
let ClrLoadingButton = ClrLoadingButton_1 = class ClrLoadingButton {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    loadingStateChange(state) {
        if (state === this.state) {
            return;
        }
        this.state = state;
        switch (state) {
            case ClrLoadingState.DEFAULT:
                this.renderer.removeStyle(this.el.nativeElement, 'width');
                this.renderer.removeStyle(this.el.nativeElement, 'transform'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                if (!this.disabled) {
                    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
                }
                break;
            case ClrLoadingState.LOADING:
                this.setExplicitButtonWidth();
                this.renderer.setStyle(this.el.nativeElement, 'transform', 'translatez(0)'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
                break;
            case ClrLoadingState.SUCCESS:
                this.setExplicitButtonWidth();
                break;
            case ClrLoadingState.ERROR:
                this.loadingStateChange(ClrLoadingState.DEFAULT);
                break;
            default:
                break;
        }
        this.clrLoadingChange.emit(state);
    }
    setExplicitButtonWidth() {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            const boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', `${boundingClientRect.width}px`);
        }
    }
};
__decorate([
    Input('disabled'),
    __metadata("design:type", Boolean)
], ClrLoadingButton.prototype, "disabled", void 0);
__decorate([
    Output('clrLoadingChange'),
    __metadata("design:type", EventEmitter)
], ClrLoadingButton.prototype, "clrLoadingChange", void 0);
ClrLoadingButton = ClrLoadingButton_1 = __decorate([
    Component({
        selector: 'button[clrLoading]',
        template: `
        <ng-container [ngSwitch]="state">
            <span *ngSwitchCase="buttonState.LOADING">
                <span @spinner class="spinner spinner-inline"></span>
            </span>
            <span *ngSwitchCase="buttonState.SUCCESS">
                <span @validated (@validated.done)="this.loadingStateChange(this.buttonState.DEFAULT)" class="spinner spinner-inline spinner-check"></span>
            </span>
            <span *ngSwitchCase="buttonState.DEFAULT" @defaultButton>
                <ng-content></ng-content>
            </span>
        </ng-container>
    `,
        providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton_1 }],
        animations: [
            trigger('defaultButton', [
                transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                // TODO: see if we can get leave animation to work before spinner's enter animation
                transition(':leave', [style({ opacity: 0 })]),
            ]),
            trigger('spinner', [
                transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
                transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
            ]),
            trigger('validated', [
                transition(':enter', [
                    animate('600ms', keyframes([
                        style({ transform: 'scale(0,0)', offset: 0 }),
                        style({ opacity: 1, offset: 0.2 }),
                        style({ transform: 'scale(1.2,1.2)', offset: 0.4 }),
                        style({ transform: 'scale(.9,.9)', offset: 0.6 }),
                        style({ transform: 'scale(1,1)', offset: 1 }),
                    ])),
                ]),
                transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
            ]),
        ],
        host: { '[attr.disabled]': "disabled? '' : null" }
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer2])
], ClrLoadingButton);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
let ClrLoadingButtonModule = class ClrLoadingButtonModule {
};
ClrLoadingButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
        exports: [CLR_LOADING_BUTTON_DIRECTIVES],
    })
], ClrLoadingButtonModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrButtonModule = class ClrButtonModule {
};
ClrButtonModule = __decorate([
    NgModule({
        exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
    })
], ClrButtonModule);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let EmptyAnchor = class EmptyAnchor {
};
EmptyAnchor = __decorate([
    Component({
        template: ''
    })
], EmptyAnchor);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Internal module, please do not export!
 */
let ClrHostWrappingModule = class ClrHostWrappingModule {
};
ClrHostWrappingModule = __decorate([
    NgModule({ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] })
], ClrHostWrappingModule);

let counter = 0;
let ControlIdService = class ControlIdService {
    constructor() {
        this._id = 'clr-form-control-' + ++counter;
        this._idChange = new BehaviorSubject(this._id);
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        this._idChange.next(value);
    }
    get idChange() {
        return this._idChange.asObservable();
    }
};
ControlIdService = __decorate([
    Injectable()
], ControlIdService);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrControlError = class ClrControlError {
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
    }
};
ClrControlError = __decorate([
    Component({
        selector: 'clr-control-error',
        template: `
    <ng-content></ng-content>
    `,
        host: {
            '[class.clr-subtext]': 'true',
            '[attr.aria-live]': '"polite"',
            '[id]': 'controlIdService?.id + "-error"',
        }
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [ControlIdService])
], ClrControlError);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrControlHelper = class ClrControlHelper {
    constructor(controlIdService) {
        this.controlIdService = controlIdService;
    }
};
ClrControlHelper = __decorate([
    Component({
        selector: 'clr-control-helper',
        template: `
    <ng-content></ng-content>
    `,
        host: {
            '[class.clr-subtext]': 'true',
            '[id]': 'controlIdService?.id + "-helper"',
        }
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [ControlIdService])
], ClrControlHelper);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let NgControlService = class NgControlService {
    constructor() {
        // Observable to subscribe to the control, since its not available immediately for projected content
        this._controlChanges = new Subject();
    }
    get controlChanges() {
        return this._controlChanges.asObservable();
    }
    setControl(control) {
        this._controlChanges.next(control);
    }
};
NgControlService = __decorate([
    Injectable()
], NgControlService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let IfErrorService = class IfErrorService {
    constructor(ngControlService) {
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the boolean state instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            if (control) {
                this.control = control;
                this.listenForChanges();
            }
        }));
    }
    get statusChanges() {
        return this._statusChanges.asObservable();
    }
    // Subscribe to the status change events, only after touched and emit the control
    listenForChanges() {
        this.subscriptions.push(this.control.statusChanges.subscribe(() => {
            this.sendValidity();
        }));
    }
    sendValidity() {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    }
    // Allows a control to push a status check upstream, such as on blur
    triggerStatusChange() {
        if (this.control) {
            this.sendValidity();
        }
    }
    // Clean up subscriptions
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
IfErrorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgControlService])
], IfErrorService);

let ClrIfError = class ClrIfError {
    constructor(ifErrorService, ngControlService, template, container) {
        this.ifErrorService = ifErrorService;
        this.ngControlService = ngControlService;
        this.template = template;
        this.container = container;
        this.subscriptions = [];
        this.displayed = false;
        if (!this.ifErrorService) {
            throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
        }
        else {
            this.displayError(false);
        }
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (this.error && this.control) {
                this.displayError(this.control.hasError(this.error));
            }
            else {
                this.displayError(invalid);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    displayError(invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
        }
    }
};
__decorate([
    Input('clrIfError'),
    __metadata("design:type", String)
], ClrIfError.prototype, "error", void 0);
ClrIfError = __decorate([
    Directive({ selector: '[clrIfError]' }),
    __param(0, Optional()),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        NgControlService,
        TemplateRef,
        ViewContainerRef])
], ClrIfError);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Layouts;
(function (Layouts) {
    Layouts["VERTICAL"] = "vertical";
    Layouts["HORIZONTAL"] = "horizontal";
    Layouts["COMPACT"] = "compact";
})(Layouts || (Layouts = {}));
let LayoutService = class LayoutService {
    constructor() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(key => Layouts[key]);
    }
    isVertical() {
        return this.layout === Layouts.VERTICAL;
    }
    isHorizontal() {
        return this.layout === Layouts.HORIZONTAL;
    }
    isCompact() {
        return this.layout === Layouts.COMPACT;
    }
    get layoutClass() {
        return `clr-form-${this.layout}`;
    }
    isValid(layout) {
        return this.layoutValues.indexOf(layout) > -1;
    }
};
LayoutService = __decorate([
    Injectable()
], LayoutService);

let ClrLabel = class ClrLabel {
    constructor(controlIdService, layoutService, ngControlService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.enableGrid = true;
    }
    ngOnInit() {
        // Only add the clr-control-label if it is inside a control container
        if (this.controlIdService || this.ngControlService) {
            this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
        }
        // Only set the grid column classes if we are in the right context and if they aren't already set
        if (this.enableGrid &&
            this.layoutService &&
            !this.layoutService.isVertical() &&
            this.el.nativeElement &&
            this.el.nativeElement.className.indexOf('clr-col') < 0) {
            this.renderer.addClass(this.el.nativeElement, 'clr-col-12');
            this.renderer.addClass(this.el.nativeElement, 'clr-col-md-2');
        }
        if (this.controlIdService && !this.forAttr) {
            this.subscriptions.push(this.controlIdService.idChange.subscribe(id => (this.forAttr = id)));
        }
    }
    disableGrid() {
        this.enableGrid = false;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    HostBinding('attr.for'),
    Input('for'),
    __metadata("design:type", String)
], ClrLabel.prototype, "forAttr", void 0);
ClrLabel = __decorate([
    Directive({ selector: 'label' }),
    __param(0, Optional()),
    __param(1, Optional()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ControlIdService,
        LayoutService,
        NgControlService,
        Renderer2,
        ElementRef])
], ClrLabel);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let MarkControlService = class MarkControlService {
    constructor() {
        this._touched = new Subject();
    }
    get touchedChange() {
        return this._touched.asObservable();
    }
    markAsTouched() {
        this._touched.next();
    }
};
MarkControlService = __decorate([
    Injectable()
], MarkControlService);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrForm = class ClrForm {
    constructor(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    markAsDirty() {
        this.markAsTouched();
    }
    markAsTouched() {
        this.markControlService.markAsTouched();
    }
};
ClrForm = __decorate([
    Directive({
        selector: '[clrForm]',
        providers: [LayoutService, MarkControlService],
        host: {
            '[class.clr-form]': 'true',
            '[class.clr-form-horizontal]': 'layoutService.isHorizontal()',
            '[class.clr-form-compact]': 'layoutService.isCompact()',
        },
    }),
    __metadata("design:paramtypes", [LayoutService, MarkControlService])
], ClrForm);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrLayout = class ClrLayout {
    constructor(layoutService) {
        this.layoutService = layoutService;
    }
    ngOnInit() {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
        }
    }
};
__decorate([
    Input('clrLayout'),
    __metadata("design:type", String)
], ClrLayout.prototype, "layout", void 0);
ClrLayout = __decorate([
    Directive({
        selector: '[clrForm][clrLayout]',
    }),
    __metadata("design:paramtypes", [LayoutService])
], ClrLayout);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrCommonFormsModule = class ClrCommonFormsModule {
};
ClrCommonFormsModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
        exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
    })
], ClrCommonFormsModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const IS_TOGGLE = new InjectionToken('IS_TOGGLE');
function isToggleFactory() {
    return new BehaviorSubject(false);
}
const IS_TOGGLE_PROVIDER = { provide: IS_TOGGLE, useFactory: isToggleFactory };
let ClrCheckboxWrapper = class ClrCheckboxWrapper {
    constructor(toggleService) {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
        this.toggle = false;
        this.subscriptions = [];
        this.subscriptions.push(toggleService.subscribe(state => {
            this.toggle = state;
        }));
    }
    ngOnInit() {
        if (this.label) {
            this.label.disableGrid();
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    ContentChild(ClrLabel, { static: true }),
    __metadata("design:type", ClrLabel)
], ClrCheckboxWrapper.prototype, "label", void 0);
ClrCheckboxWrapper = __decorate([
    Component({
        selector: 'clr-checkbox-wrapper,clr-toggle-wrapper',
        template: `
    <ng-content select="[clrCheckbox],[clrToggle]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
        host: {
            '[class.clr-checkbox-wrapper]': '!toggle',
            '[class.clr-toggle-wrapper]': 'toggle',
        },
        providers: [ControlIdService, IS_TOGGLE_PROVIDER]
    }),
    __param(0, Inject(IS_TOGGLE)),
    __metadata("design:paramtypes", [BehaviorSubject])
], ClrCheckboxWrapper);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * HostWrapper must be called in OnInit to ensure that the Views are ready. If its called in a constructor the view is
 * still undefined.
 * TODO - make sure these comment annotations do not break ng-packgr.
 */
class HostWrapper {
    constructor(containerType, vcr, index = 0) {
        this.injector = vcr.injector;
        // If the host is already wrapped, we don't do anything
        if (!this.injector.get(containerType, null)) {
            const cfr = this.injector.get(ComponentFactoryResolver);
            const el = this.injector.get(ElementRef);
            // We need a new anchor, since we're projecting the current one.
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            const factory = cfr.resolveComponentFactory(containerType);
            // Craft the element array based on what slot to use. Angular only uses the index to determine
            // which ng-content to project into, so if you have more than one ng-content you'll need to set
            // the index in the constructor appropriately
            const element = [];
            element[index] = [el.nativeElement];
            // We're assuming only one projection slot, but in more complex cases we might want to provide
            // a different array of projected elements.
            const containerRef = vcr.createComponent(factory, undefined, undefined, element);
            // We can now remove the useless anchor
            vcr.remove(0);
            // We note that the container was dynamically created
            containerRef.instance._dynamic = true;
            // We keep the wrapper's injector to access the dependencies that weren't available before.
            this.injector = containerRef.injector;
        }
    }
    get(token, notFoundValue) {
        return this.injector.get(token, notFoundValue);
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ControlClassService = class ControlClassService {
    constructor() {
        this.className = '';
    }
    controlClass(invalid = false, grid = false, additional = '') {
        const controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    }
    // We want to remove the column classes from the input up to the container
    initControlClass(renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            const klasses = element.className.split(' ');
            klasses.forEach(klass => {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            });
        }
    }
};
ControlClassService = __decorate([
    Injectable()
], ControlClassService);

class WrappedFormControl {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    constructor(vcr, wrapperType, injector, ngControl, renderer, el) {
        this.vcr = vcr;
        this.wrapperType = wrapperType;
        this.ngControl = ngControl;
        this.subscriptions = [];
        this.index = 0;
        this.renderer = renderer;
        this.el = el;
        try {
            this.ngControlService = injector.get(NgControlService);
            this.ifErrorService = injector.get(IfErrorService);
            this.controlClassService = injector.get(ControlClassService);
            this.markControlService = injector.get(MarkControlService);
        }
        catch (e) { }
        if (this.controlClassService) {
            this.controlClassService.initControlClass(renderer, el.nativeElement);
        }
        if (this.markControlService) {
            this.subscriptions.push(this.markControlService.touchedChange.subscribe(() => {
                this.ngControl.control.markAsTouched();
                this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        if (this.controlIdService) {
            this.controlIdService.id = value;
        }
    }
    triggerValidation() {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    }
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    getProviderFromContainer(token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    }
    ngOnInit() {
        this._containerInjector = new HostWrapper(this.wrapperType, this.vcr, this.index);
        this.controlIdService = this._containerInjector.get(ControlIdService);
        if (this._id) {
            this.controlIdService.id = this._id;
        }
        else {
            this._id = this.controlIdService.id;
        }
        if (this.ngControlService) {
            this.ngControlService.setControl(this.ngControl);
        }
        this.listenForErrorStateChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    listenForErrorStateChanges() {
        if (this.ifErrorService) {
            this.subscriptions.push(this.ifErrorService.statusChanges
                .pipe(startWith(false), filter(() => this.renderer && !!this.el), distinctUntilChanged())
                .subscribe(error => this.setAriaDescribedBy(error)));
        }
    }
    setAriaDescribedBy(error) {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.getAriaDescribedById(error));
    }
    getAriaDescribedById(error) {
        return this.controlIdService.id.concat(error ? '-error' : '-helper');
    }
}
__decorate([
    HostBinding(),
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], WrappedFormControl.prototype, "id", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WrappedFormControl.prototype, "triggerValidation", null);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This implements both the clrCheckbox and clrToggle functionality, since they are both just checkboxes with different
 * visual styling. The challenge is that the container needs to know which selector was used, which the @Attribute
 * decorator gets for us to determine if the toggle is used, and emits a value to the wrapper container to tell it
 * there is a toggle switch instead.
 */
let ClrCheckbox = class ClrCheckbox extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el, toggle) {
        super(vcr, ClrCheckboxWrapper, injector, control, renderer, el);
        this.toggle = toggle;
    }
    ngOnInit() {
        super.ngOnInit();
        const toggleService = this.getProviderFromContainer(IS_TOGGLE, null);
        if (toggleService && this.toggle !== null) {
            toggleService.next(true);
        }
    }
};
ClrCheckbox = __decorate([
    Directive({ selector: '[clrCheckbox],[clrToggle]' }),
    __param(2, Self()),
    __param(2, Optional()),
    __param(5, Attribute('clrToggle')),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef, String])
], ClrCheckbox);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrCheckboxContainer = class ClrCheckboxContainer {
    // @TODO Solve for group validation, which doesn't work now with ngModelGroup
    // Blocked by https://github.com/angular/angular/issues/20268
    // @Input()
    // set clrFormGroup(value: FormGroup) {
    //   this.formGroup = value;
    // }
    // @Input()
    // set clrFormArray(value: FormArray) {
    //   this.formGroup = value;
    // }
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    // private formGroup: AbstractControl;
    /*
     * Here we want to support the following cases
     * clrInline - true by presence
     * clrInline="true|false" - unless it is explicitly false, strings are considered true
     * [clrInline]="true|false" - expect a boolean
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    get clrInline() {
        return this.inline;
    }
    ngOnInit() {
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        // } else {
        //   // Because ngModel does this, we have to delay a tick to get the result
        //   Promise.resolve().then(() => {
        //     this.subscriptions.push(
        //       this.formGroup.statusChanges.subscribe(() => {
        //         this.invalid = this.formGroup.invalid;
        //       })
        //     );
        //   });
        // }
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrCheckboxContainer.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrCheckboxContainer.prototype, "clrInline", null);
ClrCheckboxContainer = __decorate([
    Component({
        selector: 'clr-checkbox-container,clr-toggle-container',
        template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-checkbox-wrapper,clr-toggle-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
  `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [NgControlService, ControlClassService, IfErrorService]
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        NgControlService])
], ClrCheckboxContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrCheckboxModule = class ClrCheckboxModule {
};
ClrCheckboxModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrCommonFormsModule, ClrHostWrappingModule],
        declarations: [ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
        exports: [ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
        entryComponents: [ClrCheckboxWrapper],
    })
], ClrCheckboxModule);

let activeCounter = 0;
const IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
function tokenFactory() {
    return ++activeCounter;
}
const IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
let IfActiveService = 
/*********
 * @class IfActiveService
 *
 * @description
 * An injectable service used by IfActive structural directives and the components that implement IfActive in their
 * templates. It holds the value of the current state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on current value changes.
 *
 */
class IfActiveService {
    constructor() {
        /********
         * @property _currentChange
         *
         * @description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject();
    }
    /*********
     *
     * @description
     * A getter function that provides an observable for the _current Subject.
     *
     */
    get currentChange() {
        return this._currentChange.asObservable();
    }
    /*********
     *
     * @description
     * A setter function that updates the current state of _current for this instance of IfActive structural directive.
     * And, broadcasts the new value to all subscribers.
     *
     * @param value
     */
    set current(value) {
        if (this._current !== value) {
            this._current = value;
            this._currentChange.next(value);
        }
    }
    /*********
     *
     * @description
     * A getter that returns the current value of this IfActive instance.
     * @returns
     */
    get current() {
        return this._current;
    }
};
IfActiveService = __decorate([
    Injectable()
    /*********
     * @class IfActiveService
     *
     * @description
     * An injectable service used by IfActive structural directives and the components that implement IfActive in their
     * templates. It holds the value of the current state and provides an Observable that both the directive and the
     * implementing component can subscribe to in order to take action on current value changes.
     *
     */
], IfActiveService);

let ClrIfActive = 
/**********
 *
 * @class ClrIfActive
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
 * the component using it in the component template.
 *
 */
class ClrIfActive {
    constructor(ifActiveService, id, template, container) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        /**********
         * @property activeChange
         *
         * @description
         * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.activeChange = new EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe(newCurrentId => {
            this.checkAndUpdateView(newCurrentId);
        });
    }
    checkAndUpdateView(currentId) {
        const isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    }
    /*********
     *
     * @description
     * A setter that updates IfActiveService.active with value.
     *
     * @param value
     */
    set active(value) {
        if (value) {
            this.ifActiveService.current = this.id;
        }
    }
    /********
     *
     * @description
     * A getter that returns the current IfActiveService.active value.
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /*********
     *
     * @description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
__decorate([
    Input('clrIfActive'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrIfActive.prototype, "active", null);
__decorate([
    Output('clrIfActiveChange'),
    __metadata("design:type", EventEmitter)
], ClrIfActive.prototype, "activeChange", void 0);
ClrIfActive = __decorate([
    Directive({ selector: '[clrIfActive]' })
    /**********
     *
     * @class ClrIfActive
     *
     * @description
     * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
     * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
     * the component using it in the component template.
     *
     */
    ,
    __param(1, Inject(IF_ACTIVE_ID)),
    __metadata("design:paramtypes", [IfActiveService, Number, TemplateRef,
        ViewContainerRef])
], ClrIfActive);

let IfOpenService = 
/*********
 * @class IfOpenService
 *
 * @description
 * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
 * templates. It holds the value of the open state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on open value changes.
 *
 */
class IfOpenService {
    constructor() {
        /********
         * @property _openChange
         *
         * @description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         */
        this._openChange = new Subject();
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._ignoredElementChange = new Subject();
    }
    /*********
     *
     * @description
     * A getter function that provides an observable for the _opened Subject.
     *
     */
    get openChange() {
        return this._openChange.asObservable();
    }
    /*********
     *
     * @description
     * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
     * broadcasts the new value to all subscribers.
     *
     * @param value
     */
    set open(value) {
        value = !!value;
        if (this._open !== value) {
            this._open = value;
            this._openChange.next(value);
        }
    }
    /*********
     *
     * @description
     * A getter that returns the current value of this IfOpen instance.
     *
     */
    get open() {
        return this._open;
    }
    toggleWithEvent(event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    }
    get ignoredElementChange() {
        return this._ignoredElementChange.asObservable();
    }
    registerIgnoredElement(element) {
        this._ignoredElementChange.next(element);
    }
};
IfOpenService = __decorate([
    Injectable()
    /*********
     * @class IfOpenService
     *
     * @description
     * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
     * templates. It holds the value of the open state and provides an Observable that both the directive and the
     * implementing component can subscribe to in order to take action on open value changes.
     *
     */
], IfOpenService);

let ClrIfOpen = 
/**********
 *
 * @class ClrIfOpen
 *
 * @description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfOpenService to maintain state between itself and the component
 * using it in the component template.
 *
 */
class ClrIfOpen {
    constructor(ifOpenService, template, container) {
        this.ifOpenService = ifOpenService;
        this.template = template;
        this.container = container;
        /**********
         * @property openChange
         *
         * @description
         * An event emitter that emits when the open property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         */
        this.openChange = new EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            this.updateView(change);
            this.openChange.emit(change);
        });
    }
    /*********
     *
     * @description
     * A setter that updates IfOpenService.open with value.
     *
     * @param value
     */
    set open(value) {
        this.ifOpenService.open = value;
    }
    /********
     *
     * @description
     * A getter that returns the current IfOpenService.open value.
     *
     */
    get open() {
        return this.ifOpenService.open;
    }
    /*********
     *
     * @description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
__decorate([
    Input('clrIfOpen'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrIfOpen.prototype, "open", null);
__decorate([
    Output('clrIfOpenChange'),
    __metadata("design:type", EventEmitter)
], ClrIfOpen.prototype, "openChange", void 0);
ClrIfOpen = __decorate([
    Directive({ selector: '[clrIfOpen]' })
    /**********
     *
     * @class ClrIfOpen
     *
     * @description
     * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
     * It makes use of a Component instance level service: IfOpenService to maintain state between itself and the component
     * using it in the component template.
     *
     */
    ,
    __metadata("design:paramtypes", [IfOpenService,
        TemplateRef,
        ViewContainerRef])
], ClrIfOpen);

let IfExpandService = class IfExpandService {
    constructor() {
        this.expandable = 0;
        this._loading = false;
        this._expanded = false;
        this._expandChange = new Subject();
    }
    get loading() {
        return this._loading;
    }
    set loading(value) {
        value = !!value;
        if (value !== this._loading) {
            this._loading = value;
        }
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._expandChange.next(value);
        }
    }
    toggle() {
        this.expanded = !this._expanded;
    }
    get expandChange() {
        return this._expandChange.asObservable();
    }
    loadingStateChange(state) {
        switch (state) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                break;
        }
    }
};
IfExpandService = __decorate([
    Injectable()
], IfExpandService);

let ClrIfExpanded = class ClrIfExpanded {
    constructor(template, container, el, renderer, expand) {
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(() => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        }));
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        if (typeof value === 'boolean') {
            this.expand.expanded = value;
            this._expanded = value;
        }
    }
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    }
    ngOnInit() {
        this.updateView();
    }
    ngOnDestroy() {
        this.expand.expandable--;
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
};
__decorate([
    Input('clrIfExpanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrIfExpanded.prototype, "expanded", null);
__decorate([
    Output('clrIfExpandedChange'),
    __metadata("design:type", EventEmitter)
], ClrIfExpanded.prototype, "expandedChange", void 0);
ClrIfExpanded = __decorate([
    Directive({ selector: '[clrIfExpanded]' }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        ElementRef,
        Renderer2,
        IfExpandService])
], ClrIfExpanded);

const CONDITIONAL_DIRECTIVES = [ClrIfActive, ClrIfOpen, ClrIfExpanded];

let ClrConditionalModule = class ClrConditionalModule {
};
ClrConditionalModule = __decorate([
    NgModule({ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] })
], ClrConditionalModule);

let FocusTrapTracker = class FocusTrapTracker {
    constructor() {
        this._previousFocusTraps = [];
    }
    get current() {
        return this._current;
    }
    set current(value) {
        this._previousFocusTraps.push(this._current);
        this._current = value;
    }
    get nbFocusTrappers() {
        return this._previousFocusTraps.length;
    }
    activatePreviousTrapper() {
        this._current = this._previousFocusTraps.pop();
    }
};
FocusTrapTracker.ngInjectableDef = ɵɵdefineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });
FocusTrapTracker = __decorate([
    Injectable({ providedIn: 'root' })
], FocusTrapTracker);

let FocusTrapDirective = class FocusTrapDirective {
    constructor(el, injector, focusTrapsTracker, renderer, platformId) {
        this.el = el;
        this.injector = injector;
        this.focusTrapsTracker = focusTrapsTracker;
        this.renderer = renderer;
        this.platformId = platformId;
        this.document = this.injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
    onFocusIn(event) {
        const nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    }
    createFocusableOffScreenEl() {
        // Not using Renderer2's createElement method because that leads to DOM leakage.
        // https://github.com/angular/angular/issues/26954
        const offScreenSpan = this.document.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    }
    addReboundEls() {
        // We will add these focus rebounding elements only in the following conditions:
        // 1. It should be running inside browser platform as it accesses document.body element
        // 2. We should NOT add them more than once. Hence, we are counting a number of focus trappers
        //    and only add on the first focus trapper.
        if (isPlatformBrowser(this.platformId) && this.focusTrapsTracker.nbFocusTrappers === 1) {
            this.topReboundEl = this.createFocusableOffScreenEl();
            this.bottomReboundEl = this.createFocusableOffScreenEl();
            // Add reboundBeforeTrapEl to the document body as the first child
            this.renderer.insertBefore(this.document.body, this.topReboundEl, this.document.body.firstChild);
            // Add reboundAfterTrapEl to the document body as the last child
            this.renderer.appendChild(this.document.body, this.bottomReboundEl);
        }
    }
    removeReboundEls() {
        if (isPlatformBrowser(this.platformId) &&
            this.focusTrapsTracker.nbFocusTrappers === 1 &&
            this.topReboundEl &&
            this.bottomReboundEl) {
            // The renderer does not immediately remove the child nodes,
            // which may lead to synchronicity issues.
            this.document.body.removeChild(this.topReboundEl);
            this.document.body.removeChild(this.bottomReboundEl);
            // These are here to to make sure that
            // we completely delete all traces of the removed DOM objects.
            delete this.topReboundEl;
            delete this.bottomReboundEl;
        }
    }
    setPreviousFocus() {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = this.document.activeElement;
        }
        this.addReboundEls();
    }
    ngOnDestroy() {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    }
};
__decorate([
    HostListener('document:focusin', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FocusTrapDirective.prototype, "onFocusIn", null);
FocusTrapDirective = __decorate([
    Directive({ selector: '[clrFocusTrap]' }),
    __param(4, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ElementRef,
        Injector,
        FocusTrapTracker,
        Renderer2,
        Object])
], FocusTrapDirective);

const FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

let ClrFocusTrapModule = class ClrFocusTrapModule {
};
ClrFocusTrapModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [FOCUS_TRAP_DIRECTIVES],
        exports: [FOCUS_TRAP_DIRECTIVES],
    })
], ClrFocusTrapModule);

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is the en-001 short locale date format. Setting as default.
 */
const DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
const LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
const MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
const DELIMITER_REGEX = /d+|m+|y+/i;
const USER_INPUT_REGEX = /\d+/g;
const MOBILE_USERAGENT_REGEX = /Mobi/i;
const RTL_REGEX = /\u200f/g;
const YEAR = 'YYYY';
const MONTH = 'MM';
const DATE = 'DD';
const LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
const MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
const BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
const NO_OF_DAYS_IN_A_WEEK = 7;
const NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
const TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Returns the number of days in a month.
 */
function getNumberOfDaysInTheMonth(year, month) {
    // If we go to the next month, but use a day of 0, it returns the last day from the previous month
    return new Date(year, month + 1, 0).getDate();
}
/**
 * Returns the day for the corresponding date where 0 represents Sunday.
 */
function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}
/**
 * Takes in a year and if it is a 2 digit year, returns the corresponding 4 digit year.
 * Window of 80 years before and 20 years after the present year.
 * Credit: https://github.com/globalizejs/globalize/blob/e1b31cd6a4f1cff75b185b68b7a32220aac5196f/src/date/parse.js
 */
function parseToFourDigitYear(year) {
    if (year > 9999 || (year > 100 && year < 999) || year < 10) {
        return -1;
    }
    if (year > 999) {
        return year;
    }
    const currYear = new Date().getFullYear();
    const century = Math.floor(currYear / 100) * 100;
    let result = year + century;
    if (result > currYear + 20) {
        result = result - 100;
    }
    return result;
}
function datesAreEqual(date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    else {
        return false;
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DayViewModel {
    constructor(dayModel, isTodaysDate = false, isDisabled = false, isSelected = false, isFocusable = false) {
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    /**
     * Gets the tab index based on the isFocusable flag.
     */
    get tabIndex() {
        return this.isFocusable ? 0 : -1;
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DayModel {
    constructor(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    isEqual(day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    }
    toDate() {
        return new Date(this.year, this.month, this.date);
    }
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    incrementBy(value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        const date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * Clones the current day model.
     */
    clone() {
        return new DayModel(this.year, this.month, this.date);
    }
    toDateString() {
        return this.toDate().toLocaleDateString();
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class CalendarViewModel {
    constructor(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    /**
     * DayViewModel matrix. Size 6x7
     */
    get calendarView() {
        return this._calendarView;
    }
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     */
    initializeCalendarView() {
        // Generate prev and next month calendar models.
        const prevMonthCalendar = this.calendar.previousMonth();
        const nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        const daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        const daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        let prevMonthDayViews = [];
        let nextMonthDayViews = [];
        if (daysFromPrevMonthInCalView > 0) {
            prevMonthDayViews = this.generateDayViewModels(prevMonthCalendar.days.slice(-1 * daysFromPrevMonthInCalView), true, false);
        }
        this.currMonthDayViews = this.generateDayViewModels(this.calendar.days, false, true);
        if (daysFromNextMonthInCalView > 0) {
            nextMonthDayViews = this.generateDayViewModels(nextMonthCalendar.days.slice(0, daysFromNextMonthInCalView), true, false);
        }
        // Generate calendar view and initialize flags
        this._calendarView = this.generateCalendarView(prevMonthDayViews, this.currMonthDayViews, nextMonthDayViews);
        this.initializeSelectedDay();
        this.initializeFocusableDay();
    }
    /**
     * Generates a DayViewModel array based on the DayModel passed
     */
    generateDayViewModels(days, isDisabled, isCurrentCalendar) {
        const dayViews = days.map(day => {
            return new DayViewModel(day, false, isDisabled, false, false);
        });
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    }
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     */
    numDaysFromPrevMonthInCalView(currentYear, currentMonth) {
        const firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    }
    /**
     * Checks if the Day passed is in the CalendarView.
     */
    isDayInCalendarView(day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    }
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     */
    generateCalendarView(prev, curr, next) {
        const combinationArr = [...prev, ...curr, ...next];
        const calendarView = [];
        for (let i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    }
    /**
     * Initialize the selected day if the day is in the calendar.
     */
    initializeSelectedDay() {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    }
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     */
    initializeFocusableDay() {
        if (this.focusableDay && this.isDayInCalendarView(this.focusableDay)) {
            this.setFocusableFlag(this.focusableDay, true);
        }
        else if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.setFocusableFlag(this.selectedDay, true);
            this.focusableDay = this.selectedDay.clone();
        }
        else if (this.isDayInCalendarView(this.today)) {
            this.setFocusableFlag(this.today, true);
            this.focusableDay = this.today.clone();
        }
        else {
            this.focusableDay = new DayModel(this.calendar.year, this.calendar.month, 15);
            this.setFocusableFlag(this.focusableDay, true);
        }
    }
    setFocusableFlag(day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    }
    /**
     * Updates the focusable day in the calendar.
     */
    updateFocusableDay(day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class CalendarModel {
    constructor(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    /**
     * Populates the days array with the DayModels in the current Calendar.
     */
    initializeDaysInCalendar() {
        const noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map((date, index) => {
            return new DayModel(this.year, this.month, index + 1);
        });
    }
    /**
     * Checks if the calendar passed is equal to the current calendar.
     */
    isEqual(calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    }
    /**
     * Checks if a DayModel is in the Calendar
     */
    isDayInCalendar(day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    }
    /**
     * Returns CalendarModel of the previous month.
     */
    previousMonth() {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    }
    /**
     * Returns CalendarModel of the next month.
     */
    nextMonth() {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service is responsible for:
 * 1. Initializing the displayed calendar.
 * 2. Moving the calendar to the next, previous or current months
 * 3. Managing the focused and selected day models.
 */
let DateNavigationService = class DateNavigationService {
    /**
     * This service is responsible for:
     * 1. Initializing the displayed calendar.
     * 2. Moving the calendar to the next, previous or current months
     * 3. Managing the focused and selected day models.
     */
    constructor() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    get displayedCalendar() {
        return this._displayedCalendar;
    }
    // not a setter because i want this to remain private
    setDisplayedCalendar(value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    }
    initializeTodaysDate() {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    }
    get today() {
        return this._today;
    }
    get selectedDayChange() {
        return this._selectedDayChange.asObservable();
    }
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    notifySelectedDayChanged(dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    }
    /**
     * Initializes the calendar based on the selected day.
     */
    initializeCalendar() {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    }
    changeMonth(month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    }
    changeYear(year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    }
    /**
     * Moves the displayed calendar to the next month.
     */
    moveToNextMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    }
    /**
     * Moves the displayed calendar to the previous month.
     */
    moveToPreviousMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    }
    /**
     * Moves the displayed calendar to the current month and year.
     */
    moveToCurrentMonth() {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    }
    incrementFocusDay(value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(new CalendarModel(this.focusedDay.year, this.focusedDay.month));
        }
        this._focusOnCalendarChange.next();
    }
    /**
     * This observable lets the subscriber know that the displayed calendar has changed.
     */
    get displayedCalendarChange() {
        return this._displayedCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focus should be applied on the calendar.
     */
    get focusOnCalendarChange() {
        return this._focusOnCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
     */
    get focusedDayChange() {
        return this._focusedDayChange.asObservable();
    }
};
DateNavigationService = __decorate([
    Injectable()
], DateNavigationService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service focuses the day that is focusable in the calendar.
 */
let DatepickerFocusService = class DatepickerFocusService {
    constructor(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    focusCell(elRef) {
        this._ngZone.runOutsideAngular(() => {
            this.ngZoneIsStableInBrowser().subscribe(() => {
                const focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            });
        });
    }
    focusInput(element) {
        this._ngZone.runOutsideAngular(() => this.ngZoneIsStableInBrowser().subscribe(() => element.focus()));
    }
    elementIsFocused(element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    }
    ngZoneIsStableInBrowser() {
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter(() => isPlatformBrowser(this.platformId)));
    }
};
DatepickerFocusService = __decorate([
    Injectable(),
    __param(1, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [NgZone, Object])
], DatepickerFocusService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service extracts the Angular CLDR data needed by the datepicker.
 */
let LocaleHelperService = class LocaleHelperService {
    constructor(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    get localeDaysNarrow() {
        return this._localeDaysNarrow;
    }
    get localeMonthsAbbreviated() {
        return this._localeMonthsAbbreviated;
    }
    get localeMonthsWide() {
        return this._localeMonthsWide;
    }
    get localeDateFormat() {
        return this._localeDateFormat;
    }
    /**
     * Initializes the locale data.
     */
    initializeLocaleData() {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    }
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     */
    initializeLocaleDaysNarrow() {
        // Get locale day names starting with Sunday
        const tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        const firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            const prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push(...prevDays);
        }
        this._localeDaysNarrow = tempArr;
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     */
    initializeLocaleMonthsAbbreviated() {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    }
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     */
    initializeLocaleMonthsWide() {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    }
    /**
     * Initializes the first day of the week based on the locale.
     */
    initializeFirstDayOfWeek() {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    }
    initializeLocaleDateFormat() {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    }
};
LocaleHelperService = __decorate([
    Injectable(),
    __param(0, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [String])
], LocaleHelperService);

let ClrCalendar = class ClrCalendar {
    constructor(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    /**
     * Gets the locale days according to the TranslationWidth.Narrow format.
     */
    get localeDaysNarrow() {
        return this._localeHelperService.localeDaysNarrow;
    }
    get calendar() {
        return this._dateNavigationService.displayedCalendar;
    }
    get selectedDay() {
        return this._dateNavigationService.selectedDay;
    }
    get focusedDay() {
        return this._dateNavigationService.focusedDay;
    }
    get today() {
        return this._dateNavigationService.today;
    }
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     */
    initializeSubscriptions() {
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(() => {
            this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe((focusedDay) => {
            this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(() => {
            this._datepickerFocusService.focusCell(this._elRef);
        }));
    }
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    generateCalendarView() {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    }
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     */
    onKeyDown(event) {
        if (event && this.focusedDay) {
            switch (event.keyCode) {
                case UP_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1 * NO_OF_DAYS_IN_A_WEEK);
                    break;
                case DOWN_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(NO_OF_DAYS_IN_A_WEEK);
                    break;
                case LEFT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(-1);
                    break;
                case RIGHT_ARROW:
                    event.preventDefault();
                    this._dateNavigationService.incrementFocusDay(1);
                    break;
                default:
                    break; // No default case. TSLint x-(
            }
        }
    }
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy() {
        this._subs.forEach((sub) => sub.unsubscribe());
    }
};
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ClrCalendar.prototype, "onKeyDown", null);
ClrCalendar = __decorate([
    Component({ selector: 'clr-calendar', template: "<table class=\"calendar-table weekdays\">\n    <tr class=\"calendar-row\">\n        <td *ngFor=\"let day of localeDaysNarrow\" class=\"calendar-cell weekday\">\n            {{day}}\n        </td>\n    </tr>\n</table>\n<table\n    class=\"calendar-table calendar-dates\">\n    <tr class=\"calendar-row\" *ngFor=\"let row of calendarViewModel.calendarView\">\n        <td *ngFor=\"let dayView of row\" class=\"calendar-cell\">\n            <clr-day [clrDayView]=\"dayView\"></clr-day>\n        </td>\n    </tr>\n</table>\n" }),
    __metadata("design:paramtypes", [LocaleHelperService,
        DateNavigationService,
        DatepickerFocusService,
        ElementRef])
], ClrCalendar);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let FocusService = class FocusService {
    constructor() {
        this._focused = new BehaviorSubject(false);
    }
    get focusChange() {
        return this._focused.asObservable();
    }
    set focused(state) {
        this._focused.next(state);
    }
};
FocusService = __decorate([
    Injectable()
], FocusService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DateFormControlService = class DateFormControlService {
    constructor() {
        this._touchedChange = new Subject();
        this._dirtyChange = new Subject();
    }
    get touchedChange() {
        return this._touchedChange.asObservable();
    }
    get dirtyChange() {
        return this._dirtyChange.asObservable();
    }
    markAsTouched() {
        this._touchedChange.next();
    }
    markAsDirty() {
        this._dirtyChange.next();
    }
};
DateFormControlService = __decorate([
    Injectable()
], DateFormControlService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DateIOService = class DateIOService {
    constructor(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    initializeLocaleDisplayFormat() {
        const format = this.cldrLocaleDateFormat.toLocaleLowerCase();
        if (LITTLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = LITTLE_ENDIAN;
        }
        else if (MIDDLE_ENDIAN_REGEX.test(format)) {
            this.localeDisplayFormat = MIDDLE_ENDIAN;
        }
        else {
            // everything else is set to BIG-ENDIAN FORMAT
            this.localeDisplayFormat = BIG_ENDIAN;
        }
        this.extractDelimiters();
    }
    extractDelimiters() {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            const localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            const delimiters = localeFormat.split(DELIMITER_REGEX);
            // NOTE: The split from the CLDR date format should always result
            // in an arary with 4 elements. The 1st and the 2nd values are the delimiters
            // we will use in order.
            // Eg: "dd/MM/y".split(/d+|m+|y+/i) results in ["", "/", "/", ""]
            if (delimiters && delimiters.length === 4) {
                this.delimiters = [delimiters[1], delimiters[2]];
            }
            else {
                console.error('Unexpected date format received. Delimiters extracted: ', delimiters);
            }
        }
    }
    toLocaleDisplayFormatString(date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            const dateNo = date.getDate();
            const monthNo = date.getMonth() + 1;
            const dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            const monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
            if (this.localeDisplayFormat === LITTLE_ENDIAN) {
                return dateStr + this.delimiters[0] + monthStr + this.delimiters[1] + date.getFullYear();
            }
            else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
                return monthStr + this.delimiters[0] + dateStr + this.delimiters[1] + date.getFullYear();
            }
            else {
                return date.getFullYear() + this.delimiters[0] + monthStr + this.delimiters[1] + dateStr;
            }
        }
        return '';
    }
    get placeholderText() {
        const format = this.localeDisplayFormat.format;
        return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
    }
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     */
    isValidMonth(month) {
        return month > -1 && month < 12;
    }
    /**
     * Checks if the date is valid depending on the year and month provided.
     */
    isValidDate(year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    }
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     */
    validateAndGetDate(year, month, date) {
        // I don't know whats wrong with the TS compiler. It throws an error if I write
        // the below if statement. The error is:
        // Operator '!==' cannot be applied to types '2' and '4'
        // More info here: https://github.com/Microsoft/TypeScript/issues/12794#issuecomment-270342936
        /*
            if (year.length !== 2 || year.length !== 4) {
                return null;
            }
            */
        // Instead I have to write the logic like this x-(
        const y = +year;
        const m = +month - 1; // month is 0 based
        const d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        const result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    }
    getDateValueFromDateString(date) {
        if (!date) {
            return null;
        }
        const dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        const [firstPart, secondPart, thirdPart] = dateParts;
        if (this.localeDisplayFormat === LITTLE_ENDIAN) {
            // secondPart is month && firstPart is date
            return this.validateAndGetDate(thirdPart, secondPart, firstPart);
        }
        else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
            // firstPart is month && secondPart is date
            return this.validateAndGetDate(thirdPart, firstPart, secondPart);
        }
        else {
            // secondPart is month && thirdPart is date
            return this.validateAndGetDate(firstPart, secondPart, thirdPart);
        }
    }
};
DateIOService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LocaleHelperService])
], DateIOService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// iPad mini screen width
// http://stephen.io/mediaqueries/#iPadMini
const DATEPICKER_ENABLE_BREAKPOINT = 768;

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DatepickerEnabledService = class DatepickerEnabledService {
    constructor(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    /**
     * Returns if the calendar should be active or not.
     * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
     * then the calendar is inactive.
     */
    get isEnabled() {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        // What they recommend is:
        //"In summary, we recommend looking for the string 'Mobi'
        // anywhere in the User Agent to detect a mobile device."
        if (this._document) {
            if (this._innerWidth < DATEPICKER_ENABLE_BREAKPOINT && this._isUserAgentMobile) {
                return false;
            }
        }
        return true;
    }
};
DatepickerEnabledService = __decorate([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], DatepickerEnabledService);

let ClrDateContainer = class ClrDateContainer {
    constructor(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        this._ifOpenService = _ifOpenService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerEnabledService = _datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.commonStrings = commonStrings;
        this.ifErrorService = ifErrorService;
        this.focusService = focusService;
        this.controlClassService = controlClassService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this._dynamic = false;
        this.invalid = false;
        this.focus = false;
        this.subscriptions = [];
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(open => {
            if (open) {
                this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    set actionButton(button) {
        this.toggleButton = button;
    }
    close() {
        this.toggleButton.nativeElement.focus();
    }
    ngOnInit() {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
    }
    /**
     * Returns the classes to apply to the control
     */
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    /**
     * Determines if the control needs to add grid classes
     */
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     */
    get isEnabled() {
        return this._datepickerEnabledService.isEnabled;
    }
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    initializeCalendar() {
        this._dateNavigationService.initializeCalendar();
    }
    /**
     * Toggles the Datepicker Popover.
     */
    toggleDatepicker(event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    }
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrDateContainer.prototype, "label", void 0);
__decorate([
    ViewChild('actionButton', { static: false }),
    __metadata("design:type", ElementRef),
    __metadata("design:paramtypes", [ElementRef])
], ClrDateContainer.prototype, "actionButton", null);
__decorate([
    HostListener('body:keyup.escape'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrDateContainer.prototype, "close", null);
ClrDateContainer = __decorate([
    Component({
        selector: 'clr-date-container',
        template: `
      <ng-content select="label"></ng-content>
      <label *ngIf="!label && addGrid()"></label>
      <div class="clr-control-container" [ngClass]="controlClass()">
        <div class="clr-input-wrapper">
          <div class="clr-input-group" [class.clr-focus]="focus">
            <ng-content select="[clrDate]"></ng-content>
            <button #actionButton 
                    type="button" 
                    class="clr-input-group-icon-action"
                    [attr.title]="commonStrings.keys.datepickerToggle"
                    [attr.aria-label]="commonStrings.keys.datepickerToggle"
                    [disabled]="control?.disabled"
                    (click)="toggleDatepicker($event)"
                    *ngIf="isEnabled">
              <clr-icon shape="calendar"></clr-icon>
            </button>
            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>
          </div>
          <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
        </div>
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    `,
        providers: [
            ControlIdService,
            IfOpenService,
            LocaleHelperService,
            IfErrorService,
            ControlClassService,
            FocusService,
            NgControlService,
            DateIOService,
            DateNavigationService,
            DatepickerEnabledService,
            DateFormControlService,
            ClrCommonStringsService,
        ],
        host: {
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-form-control]': 'true',
            '[class.clr-row]': 'addGrid()',
        }
    }),
    __param(8, Optional()),
    __metadata("design:paramtypes", [IfOpenService,
        DateNavigationService,
        DatepickerEnabledService,
        DateFormControlService,
        ClrCommonStringsService,
        IfErrorService,
        FocusService,
        ControlClassService,
        LayoutService,
        NgControlService])
], ClrDateContainer);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// There are four ways the datepicker value is set
// 1. Value set by user typing into text input as a string ex: '01/28/2015'
// 2. Value set explicitly by Angular Forms APIs as a string ex: '01/28/2015'
// 3. Value set by user via datepicker UI as a Date Object
// 4. Value set via `clrDate` input as a Date Object
let ClrDateInput = class ClrDateInput extends WrappedFormControl {
    constructor(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        super(viewContainerRef, ClrDateContainer, injector, control, renderer, el);
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.container = container;
        this.dateIOService = dateIOService;
        this.dateNavigationService = dateNavigationService;
        this.datepickerEnabledService = datepickerEnabledService;
        this.dateFormControlService = dateFormControlService;
        this.platformId = platformId;
        this.focusService = focusService;
        this.datepickerFocusService = datepickerFocusService;
        this.dateChange = new EventEmitter(false);
        this.index = 1;
    }
    set date(date) {
        if (this.previousDateChange !== date) {
            this.updateDate(this.getValidDateValueFromDate(date));
        }
        if (!this.initialClrDateInputValue) {
            this.initialClrDateInputValue = date;
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    }
    ngAfterViewInit() {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    }
    setFocusStates() {
        this.setFocus(true);
    }
    triggerValidation() {
        super.triggerValidation();
        this.setFocus(false);
    }
    get placeholderText() {
        return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
    }
    get inputType() {
        return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
    }
    onValueChange(target) {
        const validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            const [year, month, day] = target.value.split('-');
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    }
    usingClarityDatepicker() {
        return this.datepickerEnabledService.isEnabled;
    }
    usingNativeDatepicker() {
        return !this.datepickerEnabledService.isEnabled;
    }
    setFocus(focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    }
    populateServicesFromContainerComponent() {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    }
    processInitialInputs() {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    }
    updateDate(value, setByUserInteraction = false) {
        const date = this.getValidDateValueFromDate(value);
        if (setByUserInteraction) {
            this.emitDateOutput(date);
        }
        else {
            this.previousDateChange = date;
        }
        if (this.dateNavigationService) {
            this.dateNavigationService.selectedDay = date
                ? new DayModel(date.getFullYear(), date.getMonth(), date.getDate())
                : null;
        }
        this.updateInput(date);
    }
    updateInput(date) {
        if (date) {
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            if (this.datepickerHasFormControl() && dateString !== this.control.value) {
                this.control.control.setValue(dateString);
            }
            else if (this.usingNativeDatepicker()) {
                this.renderer.setProperty(this.el.nativeElement, 'valueAsDate', date);
            }
            else {
                this.renderer.setProperty(this.el.nativeElement, 'value', dateString);
            }
        }
        else {
            this.renderer.setProperty(this.el.nativeElement, 'value', '');
        }
    }
    getValidDateValueFromDate(date) {
        if (this.dateIOService) {
            const dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    }
    emitDateOutput(date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    }
    datepickerHasFormControl() {
        return !!this.control;
    }
    listenForControlValueChanges() {
        return of(this.datepickerHasFormControl())
            .pipe(filter(hasControl => hasControl), switchMap(() => this.control.valueChanges), 
        // only update date value if not being set by user
        filter(() => !this.datepickerFocusService.elementIsFocused(this.el.nativeElement)))
            .subscribe((value) => this.updateDate(this.dateIOService.getDateValueFromDateString(value)));
    }
    listenForUserSelectedDayChanges() {
        return this.dateNavigationService.selectedDayChange.subscribe(dayModel => this.updateDate(dayModel.toDate(), true));
    }
    listenForTouchChanges() {
        return this.dateFormControlService.touchedChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsTouched());
    }
    listenForDirtyChanges() {
        return this.dateFormControlService.dirtyChange
            .pipe(filter(() => this.datepickerHasFormControl()))
            .subscribe(() => this.control.control.markAsDirty());
    }
    listenForInputRefocus() {
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(date => !!date))
            .subscribe(v => this.datepickerFocusService.focusInput(this.el.nativeElement));
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ClrDateInput.prototype, "placeholder", void 0);
__decorate([
    Output('clrDateChange'),
    __metadata("design:type", EventEmitter)
], ClrDateInput.prototype, "dateChange", void 0);
__decorate([
    Input('clrDate'),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], ClrDateInput.prototype, "date", null);
__decorate([
    HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrDateInput.prototype, "setFocusStates", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrDateInput.prototype, "triggerValidation", null);
__decorate([
    HostBinding('attr.placeholder'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ClrDateInput.prototype, "placeholderText", null);
__decorate([
    HostBinding('attr.type'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ClrDateInput.prototype, "inputType", null);
__decorate([
    HostListener('change', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLInputElement]),
    __metadata("design:returntype", void 0)
], ClrDateInput.prototype, "onValueChange", null);
ClrDateInput = __decorate([
    Directive({
        selector: '[clrDate]',
        host: {
            '[class.clr-input]': 'true',
        },
        providers: [DatepickerFocusService],
    }),
    __param(4, Self()),
    __param(4, Optional()),
    __param(5, Optional()),
    __param(6, Optional()),
    __param(7, Optional()),
    __param(8, Optional()),
    __param(9, Optional()),
    __param(10, Inject(PLATFORM_ID)),
    __param(11, Optional()),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        ElementRef,
        Renderer2,
        NgControl,
        ClrDateContainer,
        DateIOService,
        DateNavigationService,
        DatepickerEnabledService,
        DateFormControlService,
        Object,
        FocusService,
        DatepickerFocusService])
], ClrDateInput);

// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
let AbstractPopover = class AbstractPopover {
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        /*
           * Until https://github.com/angular/angular/issues/8785 is supported, we don't have any way to instantiate
           * a separate directive on the host. So let's do dirty but performant for now.
           */
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(change => {
            if (change) {
                this.anchor();
                this.attachESCListener();
            }
            else {
                this.release();
                this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(() => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    }
    ngOnDestroy() {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    }
    /*
       * Fallback to hide when *clrIfOpen is not being used
       */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    attachESCListener() {
        if (!this.popoverOptions.ignoreGlobalESCListener) {
            this.documentESCListener = this.renderer.listen('document', 'keydown', event => {
                if (event && event.key) {
                    if (event.key === 'Escape' || event.key === 'Esc') {
                        this.ifOpenService.open = false;
                    }
                }
            });
        }
    }
    detachESCListener() {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    }
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', event => (this.ignore = event));
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', event => (this.ignore = event));
            }
            this.documentClickListener = this.renderer.listen('document', 'click', event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            });
        }
    }
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostClickListener) {
                this.hostClickListener();
                delete this.hostClickListener;
            }
            if (this.ignoredElementClickListener) {
                this.ignoredElementClickListener();
                delete this.ignoredElementClickListener;
            }
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
};
__decorate([
    HostBinding('class.is-off-screen'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AbstractPopover.prototype, "isOffScreen", null);
AbstractPopover = __decorate([
    Injectable(),
    __param(1, SkipSelf()),
    __metadata("design:paramtypes", [Injector, ElementRef])
], AbstractPopover);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service manages which view is visible in the datepicker popover.
 */
let ViewManagerService = class ViewManagerService {
    /**
     * This service manages which view is visible in the datepicker popover.
     */
    constructor() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
    get isDayView() {
        return this._currentView === "DAYVIEW" /* DAYVIEW */;
    }
    get isYearView() {
        return this._currentView === "YEARVIEW" /* YEARVIEW */;
    }
    get isMonthView() {
        return this._currentView === "MONTHVIEW" /* MONTHVIEW */;
    }
    changeToMonthView() {
        this._currentView = "MONTHVIEW" /* MONTHVIEW */;
    }
    changeToYearView() {
        this._currentView = "YEARVIEW" /* YEARVIEW */;
    }
    changeToDayView() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
};
ViewManagerService = __decorate([
    Injectable()
], ViewManagerService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrDatepickerViewManager = class ClrDatepickerViewManager extends AbstractPopover {
    constructor(parent, _injector, _viewManagerService) {
        super(_injector, parent);
        this._viewManagerService = _viewManagerService;
        this.configurePopover();
    }
    /**
     * Configure Popover Direction and Close indicators
     */
    configurePopover() {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    }
    /**
     * Returns if the current view is the monthpicker.
     */
    get isMonthView() {
        return this._viewManagerService.isMonthView;
    }
    /**
     * Returns if the current view is the yearpicker.
     */
    get isYearView() {
        return this._viewManagerService.isYearView;
    }
    /**
     * Returns if the current view is the daypicker.
     */
    get isDayView() {
        return this._viewManagerService.isDayView;
    }
};
ClrDatepickerViewManager = __decorate([
    Component({
        selector: 'clr-datepicker-view-manager',
        template: "<!--\n* Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n* This software is released under MIT license.\n* The full license information can be found in LICENSE in the root directory of this project.\n-->\n\n<clr-monthpicker *ngIf=\"isMonthView\"></clr-monthpicker>\n<clr-yearpicker *ngIf=\"isYearView\"></clr-yearpicker>\n<clr-daypicker *ngIf=\"isDayView\"></clr-daypicker>\n",
        providers: [ViewManagerService, DatepickerFocusService],
        host: { '[class.datepicker]': 'true' }
    }),
    __param(0, SkipSelf()),
    __metadata("design:paramtypes", [ElementRef, Injector, ViewManagerService])
], ClrDatepickerViewManager);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrDay = class ClrDay {
    constructor(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    /**
     * DayViewModel input which is used to build the Day View.
     */
    set dayView(day) {
        this._dayView = day;
        this.dayString = this._dayView.dayModel.toDateString();
    }
    get dayView() {
        return this._dayView;
    }
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    onDayViewFocus() {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    }
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    selectDay() {
        const day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    }
};
__decorate([
    Input('clrDayView'),
    __metadata("design:type", DayViewModel),
    __metadata("design:paramtypes", [DayViewModel])
], ClrDay.prototype, "dayView", null);
ClrDay = __decorate([
    Component({
        selector: 'clr-day',
        template: `
        <button
            class="day-btn"
            type="button"
            [class.is-today]="dayView.isTodaysDate"
            [class.is-disabled]="dayView.isDisabled"
            [class.is-selected]="dayView.isSelected"
            [attr.tabindex]="dayView.tabIndex"
            (click)="selectDay()"
            (focus)="onDayViewFocus()"
            [attr.aria-label]="dayString">
            {{dayView.dayModel.date}}
        </button>
    `,
        host: { '[class.day]': 'true' }
    }),
    __metadata("design:paramtypes", [DateNavigationService,
        IfOpenService,
        DateFormControlService])
], ClrDay);

let ClrDaypicker = class ClrDaypicker {
    constructor(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    get monthAttrString() {
        return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectMonthText, {
            CALENDAR_MONTH: this.calendarMonth,
        });
    }
    get yearAttrString() {
        return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectYearText, {
            CALENDAR_YEAR: this.calendarYear.toString(),
        });
    }
    get ariaLiveMonth() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentMonthPhrase, {
            CURRENT_MONTH: this.calendarMonth,
        });
    }
    get updateAriaLiveYear() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentYearPhrase, {
            CURRENT_YEAR: this.calendarYear.toString(),
        });
    }
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    changeToMonthView() {
        this._viewManagerService.changeToMonthView();
    }
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    changeToYearView() {
        this._viewManagerService.changeToYearView();
    }
    /**
     * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
     */
    get calendarMonth() {
        return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
    }
    /**
     * Returns the year value of the calendar.
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    nextMonth() {
        this._dateNavigationService.moveToNextMonth();
    }
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    previousMonth() {
        this._dateNavigationService.moveToPreviousMonth();
    }
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    currentMonth() {
        this._dateNavigationService.moveToCurrentMonth();
    }
};
ClrDaypicker = __decorate([
    Component({ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div aria-live=\"polite\" class=\"clr-sr-only\">\n      {{ ariaLiveMonth }}.  {{updateAriaLiveYear}}.\n    </div>\n    <div class=\"calendar-pickers\">\n        <button\n                class=\"calendar-btn monthpicker-trigger\"\n                type=\"button\" (click)=\"changeToMonthView()\"\n                [attr.aria-label]=\"monthAttrString\"\n                [attr.title]=\"monthAttrString\">\n                {{calendarMonth}}\n        </button>\n        <button\n                class=\"calendar-btn yearpicker-trigger\"\n                type=\"button\"\n                (click)=\"changeToYearView()\"\n                [attr.aria-label]=\"yearAttrString\"\n                [attr.title]=\"yearAttrString\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"previousMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerPreviousMonth\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"currentMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerCurrentMonth\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"nextMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerNextMonth\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextMonth\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }),
    __metadata("design:paramtypes", [ViewManagerService,
        DateNavigationService,
        LocaleHelperService,
        ClrCommonStringsService])
], ClrDaypicker);

let ClrMonthpicker = class ClrMonthpicker {
    constructor(_viewManagerService, _localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._viewManagerService = _viewManagerService;
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._focusedMonthIndex = this.calendarMonthIndex;
    }
    /**
     * Gets the months array which is used to rendered the monthpicker view.
     * Months are in the TranslationWidth.Wide format.
     */
    get monthNames() {
        return this._localeHelperService.localeMonthsWide;
    }
    /**
     * Gets the month value of the Calendar.
     */
    get calendarMonthIndex() {
        return this._dateNavigationService.displayedCalendar.month;
    }
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     */
    changeMonth(monthIndex) {
        this._dateNavigationService.changeMonth(monthIndex);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Compares the month passed to the focused month and returns the tab index.
     */
    getTabIndex(monthIndex) {
        return monthIndex === this._focusedMonthIndex ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            const keyCode = event.keyCode;
            if (keyCode === UP_ARROW && this._focusedMonthIndex > 0) {
                event.preventDefault();
                this._focusedMonthIndex--;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === DOWN_ARROW && this._focusedMonthIndex < 11) {
                event.preventDefault();
                this._focusedMonthIndex++;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === RIGHT_ARROW && this._focusedMonthIndex < 6) {
                event.preventDefault();
                this._focusedMonthIndex = this._focusedMonthIndex + 6;
                this._datepickerFocusService.focusCell(this._elRef);
            }
            else if (keyCode === LEFT_ARROW && this._focusedMonthIndex > 5) {
                event.preventDefault();
                this._focusedMonthIndex = this._focusedMonthIndex - 6;
                this._datepickerFocusService.focusCell(this._elRef);
            }
        }
    }
    /**
     * Focuses on the current calendar month when the View is initialized.
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
    }
};
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ClrMonthpicker.prototype, "onKeyDown", null);
ClrMonthpicker = __decorate([
    Component({
        selector: 'clr-monthpicker',
        template: `
        <button
            type="button"
            class="calendar-btn month"
            *ngFor="let month of monthNames; let monthIndex = index"
            (click)="changeMonth(monthIndex)"
            [class.is-selected]="monthIndex === calendarMonthIndex"
            [attr.tabindex]="getTabIndex(monthIndex)">
            {{month}}
        </button>
    `,
        host: {
            '[class.monthpicker]': 'true',
        }
    }),
    __metadata("design:paramtypes", [ViewManagerService,
        LocaleHelperService,
        DateNavigationService,
        DatepickerFocusService,
        ElementRef])
], ClrMonthpicker);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const YEARS_TO_DISPLAY = 10;
class YearRangeModel {
    constructor(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    /**
     * Gets the number in the middle of the range.
     */
    get middleYear() {
        return this.yearRange[Math.floor(this.yearRange.length / 2)];
    }
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     */
    generateYearRange() {
        const remainder = this.year % YEARS_TO_DISPLAY;
        const floor = this.year - remainder;
        const ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    }
    /**
     * Function which generate a range of numbers from floor to ceil.
     */
    generateRange(floor, ceil) {
        return Array.from({ length: ceil - floor }, (v, k) => k + floor);
    }
    /**
     * Generates the YearRangeModel for the next decade.
     */
    nextDecade() {
        return new YearRangeModel(this.year + 10);
    }
    /**
     * Generates the YearRangeModel for the previous decade.
     */
    previousDecade() {
        return new YearRangeModel(this.year - 10);
    }
    /**
     * Generates the YearRangeModel for the current decade.
     */
    currentDecade() {
        return new YearRangeModel(new Date().getFullYear());
    }
    /**
     * Checks if the value is in the YearRangeModel.
     */
    inRange(value) {
        return this.yearRange.indexOf(value) > -1;
    }
}

let ClrYearpicker = class ClrYearpicker {
    constructor(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
        this.updateRange(this.yearRangeModel);
    }
    get ariaLiveDecadeText() {
        return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentDecadePhrase, {
            DECADE_RANGE: this.decadeRange,
        });
    }
    /**
     * Gets the year which the user is currently on.
     */
    get calendarYear() {
        return this._dateNavigationService.displayedCalendar.year;
    }
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    incrementFocusYearBy(value) {
        this._focusedYear = this._focusedYear + value;
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (value > 0) {
                this.yearRangeModel = this.yearRangeModel.nextDecade();
            }
            else {
                this.yearRangeModel = this.yearRangeModel.previousDecade();
            }
        }
        this._datepickerFocusService.focusCell(this._elRef);
    }
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    changeYear(year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    }
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    previousDecade() {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Updates the YearRangeModel to the current decade.
     */
    currentDecade() {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
        this.updateRange(this.yearRangeModel);
    }
    /**
     * Updates the YearRangeModel to the next decade.
     */
    nextDecade() {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    }
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    getTabIndex(year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    }
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    onKeyDown(event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            const keyCode = event.keyCode;
            if (keyCode === UP_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-1);
            }
            else if (keyCode === DOWN_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(1);
            }
            else if (keyCode === RIGHT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(5);
            }
            else if (keyCode === LEFT_ARROW) {
                event.preventDefault();
                this.incrementFocusYearBy(-5);
            }
        }
    }
    updateRange(yrm) {
        const floor = yrm.yearRange[0];
        const ceil = yrm.yearRange[yrm.yearRange.length - 1];
        this.decadeRange = `${floor} to ${ceil}`;
    }
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    ngAfterViewInit() {
        this._datepickerFocusService.focusCell(this._elRef);
        // update the value for  decade range
    }
};
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ClrYearpicker.prototype, "onKeyDown", null);
ClrYearpicker = __decorate([
    Component({
        selector: 'clr-yearpicker',
        template: `
        <div class="year-switchers">
          <div aria-live="polite" class="clr-sr-only">
            {{ ariaLiveDecadeText  }}.
          </div>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="previousDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerPreviousDecade">
              <clr-icon shape="angle" dir="left" [attr.title]="commonStrings.keys.datepickerPreviousDecade"></clr-icon>
          </button>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="currentDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerCurrentDecade">
              <clr-icon shape="event" [attr.title]="commonStrings.keys.datepickerCurrentDecade"></clr-icon>
          </button>
          <button 
              class="calendar-btn switcher" 
              type="button" 
              (click)="nextDecade()"
              [attr.aria-label]="commonStrings.keys.datepickerNextDecade">
              <clr-icon shape="angle" dir="right" [attr.title]="commonStrings.keys.datepickerNextDecade"></clr-icon>
          </button>
        </div>
        <div class="years">
            <button
                *ngFor="let year of yearRangeModel.yearRange"
                type="button"
                class="calendar-btn year"
                [attr.tabindex]="getTabIndex(year)"
                [class.is-selected]="year === calendarYear"
                (click)="changeYear(year)">
                {{year}}
            </button>
        </div>
    `,
        host: {
            '[class.yearpicker]': 'true',
        }
    }),
    __metadata("design:paramtypes", [DateNavigationService,
        ViewManagerService,
        DatepickerFocusService,
        ElementRef,
        ClrCommonStringsService])
], ClrYearpicker);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
let ClrDatepickerModule = class ClrDatepickerModule {
};
ClrDatepickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ClrHostWrappingModule,
            ClrConditionalModule,
            ClrIconModule,
            ClrFocusTrapModule,
            ClrCommonFormsModule,
        ],
        declarations: [CLR_DATEPICKER_DIRECTIVES],
        exports: [CLR_DATEPICKER_DIRECTIVES],
        entryComponents: [ClrDateContainer],
    })
], ClrDatepickerModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrInputContainer = class ClrInputContainer {
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrInputContainer.prototype, "label", void 0);
ClrInputContainer = __decorate([
    Component({
        selector: 'clr-input-container',
        template: `
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div class="clr-input-wrapper">
                <ng-content select="[clrInput]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        NgControlService])
], ClrInputContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrInput = class ClrInput extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrInputContainer, injector, control, renderer, el);
        this.index = 1;
    }
};
ClrInput = __decorate([
    Directive({ selector: '[clrInput]', host: { '[class.clr-input]': 'true' } }),
    __param(2, Self()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef])
], ClrInput);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrInputModule = class ClrInputModule {
};
ClrInputModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
        declarations: [ClrInput, ClrInputContainer],
        exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
        entryComponents: [ClrInputContainer],
    })
], ClrInputModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const TOGGLE_SERVICE = new InjectionToken(undefined);
function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
const TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
let ClrPasswordContainer = class ClrPasswordContainer {
    constructor(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.focusService = focusService;
        this.ngControlService = ngControlService;
        this.toggleService = toggleService;
        this.commonStrings = commonStrings;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.show = false;
        this.focus = false;
        this._toggle = true;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(state => {
            this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    set clrToggle(state) {
        this._toggle = state;
        if (!state) {
            this.show = false;
        }
    }
    get clrToggle() {
        return this._toggle;
    }
    toggle() {
        this.show = !this.show;
        this.toggleService.next(this.show);
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
__decorate([
    Input('clrToggle'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrPasswordContainer.prototype, "clrToggle", null);
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrPasswordContainer.prototype, "label", void 0);
ClrPasswordContainer = __decorate([
    Component({
        selector: 'clr-password-container',
        template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [ngClass]="controlClass()">
      <div class="clr-input-wrapper">
        <div class="clr-input-group" [class.clr-focus]="focus">
          <ng-content select="[clrPassword]"></ng-content>
          <button
            *ngIf="clrToggle"
            (click)="toggle()"
            [disabled]="control?.disabled"
            class="clr-input-group-icon-action"
            type="button">
            <clr-icon
            [attr.shape]="show ? 'eye-hide' : 'eye'"
            [attr.title]="show ? commonStrings.keys.hide : commonStrings.keys.show"></clr-icon>
          </button>
        </div>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
      </div>
      <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
      <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
    </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [
            IfErrorService,
            NgControlService,
            ControlIdService,
            ControlClassService,
            FocusService,
            TOGGLE_SERVICE_PROVIDER,
        ]
    }),
    __param(1, Optional()),
    __param(5, Inject(TOGGLE_SERVICE)),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        FocusService,
        NgControlService,
        BehaviorSubject,
        ClrCommonStringsService])
], ClrPasswordContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrPassword = class ClrPassword extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el, focusService, toggleService) {
        super(vcr, ClrPasswordContainer, injector, control, renderer, el);
        this.focusService = focusService;
        this.toggleService = toggleService;
        this.index = 1;
        if (!this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        this.subscriptions.push(this.toggleService.subscribe(toggle => {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        }));
    }
    triggerFocus() {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    }
    triggerValidation() {
        super.triggerValidation();
        if (this.focusService) {
            this.focusService.focused = false;
        }
    }
};
__decorate([
    HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrPassword.prototype, "triggerFocus", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrPassword.prototype, "triggerValidation", null);
ClrPassword = __decorate([
    Directive({ selector: '[clrPassword]', host: { '[class.clr-input]': 'true' } }),
    __param(2, Self()),
    __param(2, Optional()),
    __param(5, Optional()),
    __param(6, Optional()),
    __param(6, Inject(TOGGLE_SERVICE)),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef,
        FocusService,
        BehaviorSubject])
], ClrPassword);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrPasswordModule = class ClrPasswordModule {
};
ClrPasswordModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
        declarations: [ClrPassword, ClrPasswordContainer],
        exports: [ClrCommonFormsModule, ClrPassword, ClrPasswordContainer],
        entryComponents: [ClrPasswordContainer],
    })
], ClrPasswordModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrRadioWrapper = class ClrRadioWrapper {
    constructor() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
    ngOnInit() {
        if (this.label) {
            this.label.disableGrid();
        }
    }
};
__decorate([
    ContentChild(ClrLabel, { static: true }),
    __metadata("design:type", ClrLabel)
], ClrRadioWrapper.prototype, "label", void 0);
ClrRadioWrapper = __decorate([
    Component({
        selector: 'clr-radio-wrapper',
        template: `
    <ng-content select="[clrRadio]"></ng-content>
    <ng-content select="label"></ng-content>
    <label *ngIf="!label"></label>
  `,
        host: {
            '[class.clr-radio-wrapper]': 'true',
        },
        providers: [ControlIdService]
    })
], ClrRadioWrapper);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrRadio = class ClrRadio extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrRadioWrapper, injector, control, renderer, el);
    }
};
ClrRadio = __decorate([
    Directive({ selector: '[clrRadio]' }),
    __param(2, Self()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef])
], ClrRadio);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrRadioContainer = class ClrRadioContainer {
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    /*
     * Here we want to support the following cases
     * clrInline - true by presence
     * clrInline="true|false" - unless it is explicitly false, strings are considered true
     * [clrInline]="true|false" - expect a boolean
     */
    set clrInline(value) {
        if (typeof value === 'string') {
            this.inline = value === 'false' ? false : true;
        }
        else {
            this.inline = !!value;
        }
    }
    get clrInline() {
        return this.inline;
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe());
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrRadioContainer.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrRadioContainer.prototype, "clrInline", null);
ClrRadioContainer = __decorate([
    Component({
        selector: 'clr-radio-container',
        template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [class.clr-control-inline]="clrInline" [ngClass]="controlClass()">
      <ng-content select="clr-radio-wrapper"></ng-content>
      <div class="clr-subtext-wrapper">
        <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      </div>
    </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [NgControlService, ControlClassService, IfErrorService]
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        NgControlService])
], ClrRadioContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrRadioModule = class ClrRadioModule {
};
ClrRadioModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule, ClrIconModule],
        declarations: [ClrRadio, ClrRadioContainer, ClrRadioWrapper],
        exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper],
        entryComponents: [ClrRadioWrapper],
    })
], ClrRadioModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrSelectContainer = class ClrSelectContainer {
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.multi = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            if (control) {
                this.multi = control.valueAccessor instanceof SelectMultipleControlValueAccessor;
                this.control = control;
            }
        }));
    }
    wrapperClass() {
        return this.multi ? 'clr-multiselect-wrapper' : 'clr-select-wrapper';
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrSelectContainer.prototype, "label", void 0);
__decorate([
    ContentChild(SelectMultipleControlValueAccessor, { static: false }),
    __metadata("design:type", SelectMultipleControlValueAccessor)
], ClrSelectContainer.prototype, "multiple", void 0);
ClrSelectContainer = __decorate([
    Component({
        selector: 'clr-select-container',
        template: `    
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div [ngClass]="wrapperClass()">
                <ng-content select="[clrSelect]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        NgControlService])
], ClrSelectContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrSelect = class ClrSelect extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrSelectContainer, injector, control, renderer, el);
        this.index = 1;
    }
};
ClrSelect = __decorate([
    Directive({ selector: '[clrSelect]', host: { '[class.clr-select]': 'true' } }),
    __param(2, Self()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef])
], ClrSelect);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrSelectModule = class ClrSelectModule {
};
ClrSelectModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
        declarations: [ClrSelect, ClrSelectContainer],
        exports: [ClrCommonFormsModule, ClrSelect, ClrSelectContainer],
        entryComponents: [ClrSelectContainer],
    })
], ClrSelectModule);

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTextareaContainer = class ClrTextareaContainer {
    constructor(ifErrorService, layoutService, controlClassService, ngControlService) {
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(invalid => {
            this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(control => {
            this.control = control;
        }));
    }
    controlClass() {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    }
    addGrid() {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.map(sub => sub.unsubscribe());
        }
    }
};
__decorate([
    ContentChild(ClrLabel, { static: false }),
    __metadata("design:type", ClrLabel)
], ClrTextareaContainer.prototype, "label", void 0);
ClrTextareaContainer = __decorate([
    Component({
        selector: 'clr-textarea-container',
        template: `
        <ng-content select="label"></ng-content>
        <label *ngIf="!label && addGrid()"></label>
        <div class="clr-control-container" [ngClass]="controlClass()">
            <div class="clr-textarea-wrapper">
                <ng-content select="[clrTextarea]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
        host: {
            '[class.clr-form-control]': 'true',
            '[class.clr-form-control-disabled]': 'control?.disabled',
            '[class.clr-row]': 'addGrid()',
        },
        providers: [IfErrorService, NgControlService, ControlIdService, ControlClassService]
    }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [IfErrorService,
        LayoutService,
        ControlClassService,
        NgControlService])
], ClrTextareaContainer);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTextarea = class ClrTextarea extends WrappedFormControl {
    constructor(vcr, injector, control, renderer, el) {
        super(vcr, ClrTextareaContainer, injector, control, renderer, el);
        this.index = 1;
    }
};
ClrTextarea = __decorate([
    Directive({ selector: '[clrTextarea]', host: { '[class.clr-textarea]': 'true' } }),
    __param(2, Self()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ViewContainerRef,
        Injector,
        NgControl,
        Renderer2,
        ElementRef])
], ClrTextarea);

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTextareaModule = class ClrTextareaModule {
};
ClrTextareaModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
        declarations: [ClrTextarea, ClrTextareaContainer],
        exports: [ClrCommonFormsModule, ClrTextarea, ClrTextareaContainer],
        entryComponents: [ClrTextareaContainer],
    })
], ClrTextareaModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrFormsModule = class ClrFormsModule {
};
ClrFormsModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [
            ClrCommonFormsModule,
            ClrCheckboxModule,
            ClrDatepickerModule,
            ClrInputModule,
            ClrPasswordModule,
            ClrRadioModule,
            ClrSelectModule,
            ClrTextareaModule,
        ],
    })
], ClrFormsModule);

const CLR_LOADING_DIRECTIVES = [ClrLoading];
let ClrLoadingModule = class ClrLoadingModule {
};
ClrLoadingModule = __decorate([
    NgModule({ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] })
], ClrLoadingModule);

let OutsideClick = class OutsideClick {
    constructor(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    documentClick(event) {
        const target = event.target; // Get the element in the DOM on which the mouse was clicked
        const host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    }
};
__decorate([
    Input('clrStrict'),
    __metadata("design:type", Object)
], OutsideClick.prototype, "strict", void 0);
__decorate([
    Output('clrOutsideClick'),
    __metadata("design:type", Object)
], OutsideClick.prototype, "outsideClick", void 0);
__decorate([
    HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], OutsideClick.prototype, "documentClick", null);
OutsideClick = __decorate([
    Directive({ selector: '[clrOutsideClick]' }),
    __metadata("design:paramtypes", [ElementRef])
], OutsideClick);

const OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

let ClrOutsideClickModule = class ClrOutsideClickModule {
};
ClrOutsideClickModule = __decorate([
    NgModule({ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] })
], ClrOutsideClickModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DomAdapter = class DomAdapter {
    userDefinedWidth(element) {
        element.classList.add('datagrid-cell-width-zero');
        const userDefinedWidth = this.clientRect(element).width;
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    }
    scrollBarWidth(element) {
        return element.offsetWidth - element.clientWidth;
    }
    scrollWidth(element) {
        return element.scrollWidth || 0;
    }
    computedHeight(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    }
    clientRect(element) {
        const elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    }
    minWidth(element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    }
    focus(element) {
        element.focus();
    }
};
DomAdapter = __decorate([
    Injectable()
], DomAdapter);

// This class is used to convert an internal event
// to an external event to be emitted.
class ClrDragEvent {
    constructor(dragEvent) {
        this.dragPosition = dragEvent.dragPosition;
        this.group = dragEvent.group;
        this.dragDataTransfer = dragEvent.dragDataTransfer;
        this.dropPointPosition = dragEvent.dropPointPosition;
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DragEventType;
(function (DragEventType) {
    DragEventType[DragEventType["DRAG_START"] = 0] = "DRAG_START";
    DragEventType[DragEventType["DRAG_MOVE"] = 1] = "DRAG_MOVE";
    DragEventType[DragEventType["DRAG_END"] = 2] = "DRAG_END";
    DragEventType[DragEventType["DRAG_ENTER"] = 3] = "DRAG_ENTER";
    DragEventType[DragEventType["DRAG_LEAVE"] = 4] = "DRAG_LEAVE";
    DragEventType[DragEventType["DROP"] = 5] = "DROP";
})(DragEventType || (DragEventType = {}));

let DragAndDropEventBusService = class DragAndDropEventBusService {
    constructor() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
    }
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    get dropped() {
        return this.drop.asObservable();
    }
    broadcast(event) {
        switch (event.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(event);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(event);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(event);
                break;
            case DragEventType.DROP:
                this.drop.next(event);
                break;
            default:
                break;
        }
    }
};
DragAndDropEventBusService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });
DragAndDropEventBusService = __decorate([
    Injectable({ providedIn: 'root' })
], DragAndDropEventBusService);

let DragEventListenerService = class DragEventListenerService {
    constructor(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    get dragStarted() {
        return this.dragStart.asObservable();
    }
    get dragMoved() {
        return this.dragMove.asObservable();
    }
    get dragEnded() {
        return this.dragEnd.asObservable();
    }
    attachDragListeners(draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    }
    detachDragListeners() {
        if (this.listeners) {
            this.listeners.map(event => event());
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(event => event());
        }
    }
    getNativeEventObject(event) {
        if (event.hasOwnProperty('changedTouches')) {
            return event.changedTouches[0];
        }
        else {
            return event;
        }
    }
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        return this.renderer.listen(element, startOnEvent, (startEvent) => {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            this.initialPosition = {
                pageX: this.getNativeEventObject(startEvent).pageX,
                pageY: this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            this.nestedListeners.push(this.renderer.listen('document', 'selectstart', (selectEvent) => {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            this.nestedListeners.push(this.ngZone.runOutsideAngular(() => {
                return this.renderer.listen('document', moveOnEvent, (moveEvent) => {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!this.hasDragStarted) {
                        this.hasDragStarted = true;
                        // Fire "dragstart"
                        this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            this.nestedListeners.push(this.renderer.listen('document', endOnEvent, (endEvent) => {
                if (this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    this.hasDragStarted = false;
                    this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (this.nestedListeners) {
                    this.nestedListeners.map(event => event());
                }
            }));
        });
    }
    broadcast(event, eventType) {
        const dragEvent = this.generateDragEvent(event, eventType);
        switch (dragEvent.type) {
            case DragEventType.DRAG_START:
                this.dragStart.next(dragEvent);
                break;
            case DragEventType.DRAG_MOVE:
                this.dragMove.next(dragEvent);
                break;
            case DragEventType.DRAG_END:
                this.dragEnd.next(dragEvent);
                break;
            default:
                break;
        }
        // The following properties are set after they are broadcasted to the DraggableGhost component.
        dragEvent.ghostElement = this.ghostElement;
        dragEvent.dropPointPosition = this.dropPointPosition;
        this.eventBus.broadcast(dragEvent);
    }
    generateDragEvent(event, eventType) {
        const nativeEvent = this.getNativeEventObject(event);
        return {
            type: eventType,
            dragPosition: {
                pageX: nativeEvent.pageX,
                pageY: nativeEvent.pageY,
                moveX: nativeEvent.pageX - this.initialPosition.pageX,
                moveY: nativeEvent.pageY - this.initialPosition.pageY,
            },
            group: this.group,
            dragDataTransfer: this.dragDataTransfer,
            ghostElement: this.ghostElement,
        };
    }
};
DragEventListenerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone, Renderer2, DragAndDropEventBusService])
], DragEventListenerService);

// This service is used to capture the state of clrDraggable element
// at a certain event and passes it to clrDraggableGhost component.
let DraggableSnapshotService = class DraggableSnapshotService {
    constructor(domAdapter) {
        this.domAdapter = domAdapter;
    }
    capture(el, event) {
        this.draggableElClientRect = this.domAdapter.clientRect(el);
        this.snapshotDragEvent = event;
    }
    discard() {
        delete this.draggableElClientRect;
        delete this.snapshotDragEvent;
    }
    get hasDraggableState() {
        return !!this.snapshotDragEvent && !!this.draggableElClientRect;
    }
    get clientRect() {
        return this.draggableElClientRect;
    }
    get dragEvent() {
        return this.snapshotDragEvent;
    }
};
DraggableSnapshotService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DomAdapter])
], DraggableSnapshotService);

let ClrDraggableGhost = class ClrDraggableGhost {
    constructor(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.draggableSnapshot = draggableSnapshot;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.subscriptions = [];
        this.leaveAnimConfig = { value: 0, params: { top: '0px', left: '0px' } };
        if (!this.dragEventListener || !this.draggableSnapshot) {
            throw new Error('The clr-draggable-ghost component can only be used inside of a clrDraggable directive.');
        }
        this.draggableGhostEl = this.el.nativeElement;
        // Need to use Renderer2 as it runs outside of NgZone
        this.renderer.addClass(this.draggableGhostEl, 'draggable-ghost');
        // Register the ghost element in DragEventListener to pass in a ClrDragEvent.
        this.dragEventListener.ghostElement = this.draggableGhostEl;
        // Default ghost size gets the size of ClrDraggable element.
        this.setDefaultGhostSize(this.draggableGhostEl);
        const offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        let isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((event) => {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (this.draggableSnapshot.hasDraggableState) {
                    this.animateToOnLeave(`${this.draggableSnapshot.clientRect.top}px`, `${this.draggableSnapshot.clientRect.left}px`);
                }
                else {
                    this.animateToOnLeave(`${event.dragPosition.pageY}px`, `${event.dragPosition.pageX}px`);
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            const topLeftPosition = this.findTopLeftPosition(event.dragPosition, offset);
            this.setPositionStyle(this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            this.dragEventListener.dropPointPosition = this.findDropPointPosition(topLeftPosition);
        }));
    }
    setDefaultGhostSize(el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    }
    animateToOnLeave(top, left) {
        this.ngZone.run(() => {
            this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        });
    }
    findTopLeftPosition(dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    }
    findDropPointPosition(topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    }
    setSizeStyle(el, width, height) {
        this.renderer.setStyle(el, 'width', `${width}px`);
        this.renderer.setStyle(el, 'height', `${height}px`);
    }
    setPositionStyle(el, left, top) {
        this.renderer.setStyle(el, 'left', `${left}px`);
        this.renderer.setStyle(el, 'top', `${top}px`);
        this.renderer.setStyle(el, 'visibility', 'visible');
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
};
__decorate([
    HostBinding('@leaveAnimation'),
    __metadata("design:type", Object)
], ClrDraggableGhost.prototype, "leaveAnimConfig", void 0);
ClrDraggableGhost = __decorate([
    Component({
        selector: 'clr-draggable-ghost',
        template: `<ng-content></ng-content>`,
        animations: [
            trigger('leaveAnimation', [
                transition(':leave', [
                    style({ left: '*', top: '*' }),
                    animate('0.2s ease-in-out', style({ top: '{{top}}', left: '{{left}}' })),
                ]),
            ]),
        ]
    }),
    __param(1, Optional()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        DragEventListenerService,
        DraggableSnapshotService,
        Renderer2,
        NgZone])
], ClrDraggableGhost);

// This structural directive will be used mainly together with `clr-draggable-ghost` directive inside of clrDraggable
// directive. The directive is responsible for instantiating `clr-draggable-ghost` directive only during dragging so
// that Angular Change Detection is prevented from running if a component or directive is placed inside of the
// `clr-draggable-ghost` directive.
let ClrIfDragged = class ClrIfDragged {
    constructor(template, container, dragEventListener) {
        this.template = template;
        this.container = container;
        this.dragEventListener = dragEventListener;
        this.subscriptions = [];
        if (!this.dragEventListener || !this.container) {
            throw new Error('The *clrIfDragged directive can only be used inside of a clrDraggable directive.');
        }
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((event) => {
            this.container.createEmbeddedView(this.template);
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((event) => {
            this.container.clear();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
};
ClrIfDragged = __decorate([
    Directive({ selector: '[clrIfDragged]' }),
    __param(1, Optional()),
    __param(1, SkipSelf()),
    __param(2, Optional()),
    __metadata("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        DragEventListenerService])
], ClrIfDragged);

// This provider registers the drag handle element.
// When it registers a element as a drag handle, it attaches that element to the listeners from ClrDragEventListener.
// Also, it adds the "drag-handle" css class to the registered element through Renderer.
let DragHandleRegistrarService = class DragHandleRegistrarService {
    constructor(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    get defaultHandleEl() {
        return this._defaultHandleEl;
    }
    set defaultHandleEl(el) {
        this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
        // If the customHandleEl has been registered,
        // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
        if (!this._customHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    }
    makeElementHandle(el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    }
    get customHandleEl() {
        return this._customHandleEl;
    }
    registerCustomHandle(el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    }
    unregisterCustomHandle() {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    }
};
DragHandleRegistrarService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DragEventListenerService, Renderer2])
], DragHandleRegistrarService);

// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
let GlobalDragModeService = class GlobalDragModeService {
    constructor(renderer) {
        this.renderer = renderer;
    }
    enter() {
        this.renderer.addClass(document.body, 'in-drag');
    }
    exit() {
        this.renderer.removeClass(document.body, 'in-drag');
    }
};
GlobalDragModeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Renderer2])
], GlobalDragModeService);

let ClrDraggable = class ClrDraggable {
    constructor(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
        this.el = el;
        this.dragEventListener = dragEventListener;
        this.dragHandleRegistrar = dragHandleRegistrar;
        this.viewContainerRef = viewContainerRef;
        this.cfr = cfr;
        this.injector = injector;
        this.draggableSnapshot = draggableSnapshot;
        this.globalDragMode = globalDragMode;
        this.subscriptions = [];
        this.dragOn = false;
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.draggableEl = this.el.nativeElement;
        this.componentFactory = this.cfr.resolveComponentFactory(ClrDraggableGhost);
    }
    set dataTransfer(value) {
        this.dragEventListener.dragDataTransfer = value;
    }
    set group(value) {
        this.dragEventListener.group = value;
    }
    createDefaultGhost(event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    }
    destroyDefaultGhost() {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    }
    ngAfterContentInit() {
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe((event) => {
            this.globalDragMode.enter();
            this.dragOn = true;
            if (!this.customGhost) {
                this.createDefaultGhost(event);
            }
            this.dragStartEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe((event) => {
            this.dragMoveEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe((event) => {
            this.globalDragMode.exit();
            this.dragOn = false;
            if (!this.customGhost) {
                this.destroyDefaultGhost();
            }
            this.dragEndEmitter.emit(new ClrDragEvent(event));
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.dragEventListener.detachDragListeners();
    }
};
__decorate([
    ContentChild(ClrIfDragged, { static: false }),
    __metadata("design:type", ClrIfDragged)
], ClrDraggable.prototype, "customGhost", void 0);
__decorate([
    Input('clrDraggable'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDraggable.prototype, "dataTransfer", null);
__decorate([
    Input('clrGroup'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDraggable.prototype, "group", null);
__decorate([
    Output('clrDragStart'),
    __metadata("design:type", EventEmitter)
], ClrDraggable.prototype, "dragStartEmitter", void 0);
__decorate([
    Output('clrDragMove'),
    __metadata("design:type", EventEmitter)
], ClrDraggable.prototype, "dragMoveEmitter", void 0);
__decorate([
    Output('clrDragEnd'),
    __metadata("design:type", EventEmitter)
], ClrDraggable.prototype, "dragEndEmitter", void 0);
ClrDraggable = __decorate([
    Directive({
        selector: '[clrDraggable]',
        providers: [
            DragEventListenerService,
            DragHandleRegistrarService,
            DraggableSnapshotService,
            GlobalDragModeService,
            DomAdapter,
        ],
        host: { '[class.draggable]': 'true', '[class.being-dragged]': 'dragOn' },
    }),
    __metadata("design:paramtypes", [ElementRef,
        DragEventListenerService,
        DragHandleRegistrarService,
        ViewContainerRef,
        ComponentFactoryResolver,
        Injector,
        DraggableSnapshotService,
        GlobalDragModeService])
], ClrDraggable);

let ClrDroppable = class ClrDroppable {
    constructor(el, eventBus, domAdapter, renderer) {
        this.el = el;
        this.eventBus = eventBus;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.isDraggableMatch = false;
        this._isDraggableOver = false;
        this._dropTolerance = { top: 0, right: 0, bottom: 0, left: 0 };
        this.dragStartEmitter = new EventEmitter();
        this.dragMoveEmitter = new EventEmitter();
        this.dragEndEmitter = new EventEmitter();
        this.dragLeaveEmitter = new EventEmitter();
        this.dragEnterEmitter = new EventEmitter();
        this.dropEmitter = new EventEmitter();
        this.droppableEl = this.el.nativeElement;
    }
    set isDraggableOver(value) {
        // We need to add/remove this draggable-over class via Renderer2
        // because isDraggableOver is set outside of NgZone.
        if (value) {
            this.renderer.addClass(this.droppableEl, 'draggable-over');
        }
        else {
            this.renderer.removeClass(this.droppableEl, 'draggable-over');
        }
        this._isDraggableOver = value;
    }
    set group(value) {
        this._group = value;
    }
    dropToleranceGenerator(top = 0, right = top, bottom = top, left = right) {
        return { top, right, bottom, left };
    }
    set dropTolerance(value) {
        // If user provides an object here and wants to manipulate/update properties individually,
        // the object must be immutable as we generate new object based user's given object.
        if (typeof value === 'number') {
            this._dropTolerance = this.dropToleranceGenerator(value);
        }
        else if (typeof value === 'string') {
            const toleranceValues = value
                .trim()
                .split(/\s+/)
                .map(tolerance => parseInt(tolerance, 10));
            this._dropTolerance = this.dropToleranceGenerator(...toleranceValues);
        }
        else if (value) {
            // The value could be passed in as {left: 20, top: 30 }
            // In this case, the rest of the direction properties should be 0.
            // That's why we initialize properties with 0 first, then override with user's given value.
            this._dropTolerance = Object.assign({}, this.dropToleranceGenerator(0), value);
        }
    }
    unsubscribeFrom(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    checkGroupMatch(draggableGroup) {
        // Both Draggable and Droppable have clrGroup input.
        // The clrGroup input can be both a string key or array of string keys in Draggable and Droppable.
        // It's not match if Draggable has no defined value assigned to clrGroup, but Droppable has a defined clrGroup.
        if (!draggableGroup && this._group) {
            return false;
        }
        // The same is true the other way round.
        if (!this._group && draggableGroup) {
            return false;
        }
        // It's match if both Draggable and Droppable have no assigned value for clrGroup.
        if (!this._group && !draggableGroup) {
            return true;
        }
        // It's match if both Draggable and Droppable have simple string keys that are matching.
        // It's match if Draggable's simple clrGroup key is matching with one of the clrGroup keys of Droppable. The
        // same is true the other way round.
        // it's match if one of the clrGroup keys of Droppable is matching with one of the clrGroup keys of Draggable.
        if (typeof draggableGroup === 'string') {
            if (typeof this._group === 'string') {
                return this._group === draggableGroup;
            }
            else {
                return this._group.indexOf(draggableGroup) > -1;
            }
        }
        else {
            if (typeof this._group === 'string') {
                return draggableGroup.indexOf(this._group) > -1;
            }
            else {
                return this._group.some(groupKey => draggableGroup.indexOf(groupKey) > -1);
            }
        }
    }
    isInDropArea(point) {
        if (!point) {
            return false;
        }
        if (!this.clientRect) {
            this.clientRect = this.domAdapter.clientRect(this.droppableEl);
        }
        if (point.pageX >= this.clientRect.left - this._dropTolerance.left &&
            point.pageX <= this.clientRect.right + this._dropTolerance.right &&
            point.pageY >= this.clientRect.top - this._dropTolerance.top &&
            point.pageY <= this.clientRect.bottom + this._dropTolerance.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    onDragStart(dragStartEvent) {
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe((dragMoveEvent) => {
                this.onDragMove(dragMoveEvent);
            });
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe((dragEndEvent) => {
                this.onDragEnd(dragEndEvent);
            });
        }
    }
    onDragMove(dragMoveEvent) {
        const isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            const dragEnterEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            const dragLeaveEvent = Object.assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    }
    onDragEnd(dragEndEvent) {
        if (this._isDraggableOver) {
            if (dragEndEvent.ghostElement) {
                // By this point, the draggable ghost component is destroyed,
                // but the element would be active until its animation completes.
                // As such, once the ghost is dropped over, we will give it "dropped" class.
                // This process cannot be done in the ghost component
                // because any subscription to the drop event is ineffective or invalid
                // as the component had been already destroyed.
                this.renderer.addClass(dragEndEvent.ghostElement, 'dropped');
            }
            const dropEvent = Object.assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    }
    ngOnInit() {
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe((dragStartEvent) => {
            this.onDragStart(dragStartEvent);
        });
    }
    ngOnDestroy() {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
    }
};
__decorate([
    Input('clrGroup'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDroppable.prototype, "group", null);
__decorate([
    Input('clrDropTolerance'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDroppable.prototype, "dropTolerance", null);
__decorate([
    Output('clrDragStart'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragStartEmitter", void 0);
__decorate([
    Output('clrDragMove'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragMoveEmitter", void 0);
__decorate([
    Output('clrDragEnd'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragEndEmitter", void 0);
__decorate([
    Output('clrDragLeave'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragLeaveEmitter", void 0);
__decorate([
    Output('clrDragEnter'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dragEnterEmitter", void 0);
__decorate([
    Output('clrDrop'),
    __metadata("design:type", EventEmitter)
], ClrDroppable.prototype, "dropEmitter", void 0);
ClrDroppable = __decorate([
    Directive({
        selector: '[clrDroppable]',
        providers: [DomAdapter],
        host: { '[class.droppable]': 'true', '[class.draggable-match]': 'isDraggableMatch' },
    }),
    __metadata("design:paramtypes", [ElementRef,
        DragAndDropEventBusService,
        DomAdapter,
        Renderer2])
], ClrDroppable);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrDragHandle = class ClrDragHandle {
    constructor(el, dragHandleRegistrar) {
        this.el = el;
        this.dragHandleRegistrar = dragHandleRegistrar;
        if (!this.dragHandleRegistrar) {
            // ClrDragHandleRegistrar is provided in ClrDraggable so we expect it to be present here
            // as clrDragHandle is required to be used only inside of a clrDraggable directive.
            throw new Error('The clrDragHandle directive can only be used inside of a clrDraggable directive.');
        }
        this.dragHandleRegistrar.registerCustomHandle(this.el.nativeElement);
    }
    ngOnDestroy() {
        this.dragHandleRegistrar.unregisterCustomHandle();
    }
};
ClrDragHandle = __decorate([
    Directive({ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ElementRef, DragHandleRegistrarService])
], ClrDragHandle);

const CLR_DRAG_AND_DROP_DIRECTIVES = [
    ClrDraggable,
    ClrDroppable,
    ClrIfDragged,
    ClrDragHandle,
    ClrDraggableGhost,
];
let ClrDragAndDropModule = class ClrDragAndDropModule {
};
ClrDragAndDropModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [CLR_DRAG_AND_DROP_DIRECTIVES],
        entryComponents: [ClrDraggableGhost],
        exports: [CLR_DRAG_AND_DROP_DIRECTIVES],
    })
], ClrDragAndDropModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrExpandableAnimation = class ClrExpandableAnimation {
    constructor(element, domAdapter) {
        this.element = element;
        this.domAdapter = domAdapter;
        this.startHeight = 0;
    }
    get expandAnimation() {
        return { value: this.clrExpandTrigger, params: { startHeight: this.startHeight } };
    }
    animationDone() {
        // A "safe" auto-update of the height ensuring basic OOTB user experience .
        // Prone to small jumps in initial animation height if data was changed in the meantime, window was resized, etc.
        // For optimal behavior call manually updateStartHeight() from the parent component before initiating the update.
        this.updateStartHeight();
    }
    updateStartHeight() {
        this.startHeight = this.domAdapter.computedHeight(this.element.nativeElement) || 0;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ClrExpandableAnimation.prototype, "clrExpandTrigger", void 0);
__decorate([
    HostBinding('@expandAnimation'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrExpandableAnimation.prototype, "expandAnimation", null);
__decorate([
    HostListener('@expandAnimation.done'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrExpandableAnimation.prototype, "animationDone", null);
ClrExpandableAnimation = __decorate([
    Component({
        selector: 'clr-expandable-animation',
        template: `
    <ng-content></ng-content>
  `,
        animations: [
            trigger('expandAnimation', [
                transition('void => *', []),
                transition('* => *', [
                    style({ height: '{{startHeight}}px', overflow: 'hidden' }),
                    animate('0.2s ease-in-out', style({ height: '*' })),
                ]),
            ]),
        ],
        providers: [DomAdapter],
        styles: [`
    :host {
      display: block;
    }
  `]
    }),
    __metadata("design:paramtypes", [ElementRef, DomAdapter])
], ClrExpandableAnimation);

const EXPANDABLE_ANIMATION_DIRECTIVES = [ClrExpandableAnimation];

let ClrExpandableAnimationModule = class ClrExpandableAnimationModule {
};
ClrExpandableAnimationModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [EXPANDABLE_ANIMATION_DIRECTIVES],
        exports: [EXPANDABLE_ANIMATION_DIRECTIVES],
    })
], ClrExpandableAnimationModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function isBooleanAttributeSet(value) {
    // for null just return false no need to check anything
    if (value === null) {
        return false;
    }
    if (typeof value === 'string') {
        // Empty string is valid, 'true' as string is also valid
        return value.length >= 0;
    }
    // Boolean value will be read as it is, everything else is false
    return typeof value === 'boolean' ? value : false;
}

let ClrSpinner = class ClrSpinner {
    /**
     * Default class for all spinners. This class is always true
     */
    get spinnerClass() {
        return true;
    }
    get inlineClass() {
        return this._inline;
    }
    set clrInline(value) {
        this._inline = isBooleanAttributeSet(value);
    }
    get inverseClass() {
        return this._inverse;
    }
    set clrInverse(value) {
        this._inverse = isBooleanAttributeSet(value);
    }
    get smallClass() {
        return this._small;
    }
    set clrSmall(value) {
        this._small = isBooleanAttributeSet(value);
    }
    get mediumClass() {
        if (this._small) {
            return false;
        }
        return this._medium;
    }
    set clrMedium(value) {
        this._medium = isBooleanAttributeSet(value);
    }
    get setAriaLive() {
        if (isBooleanAttributeSet(this.assertive)) {
            return 'assertive';
        }
        if (isBooleanAttributeSet(this.off)) {
            return 'off';
        }
        return 'polite';
    }
};
__decorate([
    HostBinding('class.spinner'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrSpinner.prototype, "spinnerClass", null);
__decorate([
    HostBinding('class.spinner-inline'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrSpinner.prototype, "inlineClass", null);
__decorate([
    Input('clrInline'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrSpinner.prototype, "clrInline", null);
__decorate([
    HostBinding('class.spinner-inverse'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrSpinner.prototype, "inverseClass", null);
__decorate([
    Input('clrInverse'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrSpinner.prototype, "clrInverse", null);
__decorate([
    HostBinding('class.spinner-sm'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrSpinner.prototype, "smallClass", null);
__decorate([
    Input('clrSmall'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrSpinner.prototype, "clrSmall", null);
__decorate([
    HostBinding('class.spinner-md'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrSpinner.prototype, "mediumClass", null);
__decorate([
    Input('clrMedium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrSpinner.prototype, "clrMedium", null);
__decorate([
    Input('clrAssertive'),
    __metadata("design:type", Boolean)
], ClrSpinner.prototype, "assertive", void 0);
__decorate([
    Input('clrOff'),
    __metadata("design:type", Boolean)
], ClrSpinner.prototype, "off", void 0);
ClrSpinner = __decorate([
    Component({
        selector: 'clr-spinner',
        template: `
    <ng-content></ng-content>
  `,
        host: {
            '[attr.aria-live]': 'setAriaLive',
            '[attr.aria-busy]': 'true',
        }
    })
], ClrSpinner);

const CLR_SPINNER_DIRECTIVES = [ClrSpinner];
let ClrSpinnerModule = class ClrSpinnerModule {
};
ClrSpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [CLR_SPINNER_DIRECTIVES],
        exports: [CLR_SPINNER_DIRECTIVES],
    })
], ClrSpinnerModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class CustomFilter {
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
let StateDebouncer = class StateDebouncer {
    /*
     * This provider implements some form of synchronous debouncing through a lock pattern
     * to avoid emitting multiple state changes for a single user action.
     */
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
           * This is the lock, to only emit once all the changes have finished processing
           */
        this.nbChanges = 0;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    changeStart() {
        this.nbChanges++;
    }
    changeDone() {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    }
};
StateDebouncer = __decorate([
    Injectable()
], StateDebouncer);

let Page = class Page {
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        this.activated = false;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * The Observable that lets other classes subscribe to page changes
         */
        this._change = new Subject();
        this._sizeChange = new Subject();
        /**
         * Current page
         */
        this._current = 1;
    }
    get size() {
        return this._size;
    }
    set size(size) {
        const oldSize = this._size;
        if (size !== oldSize) {
            this.stateDebouncer.changeStart();
            this._size = size;
            if (size === 0) {
                this._current = 1;
            }
            else {
                // Yeap. That's the formula to keep the first item from the old page still
                // displayed in the new one.
                this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
            }
            // We always emit an event even if the current page index didn't change, because
            // the size changing means the items inside the page are different
            this._change.next(this._current);
            this._sizeChange.next(this._size);
            this.stateDebouncer.changeDone();
        }
    }
    get totalItems() {
        return this._totalItems || 0; // remains 0 if not set to avoid breaking change
    }
    set totalItems(total) {
        this._totalItems = total;
        // If we have less items than before, we might need to change the current page
        if (this.current > this.last) {
            this.current = this.last;
        }
    }
    get last() {
        if (this._last) {
            return this._last;
        }
        // If the last page isn't known, we compute it from the last item's index
        if (this.size > 0 && this.totalItems) {
            return Math.ceil(this.totalItems / this.size);
        }
        return 1;
    }
    set last(page) {
        this._last = page;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    get sizeChange() {
        return this._sizeChange.asObservable();
    }
    get current() {
        return this._current;
    }
    set current(page) {
        if (page !== this._current) {
            this.stateDebouncer.changeStart();
            this._current = page;
            this._change.next(page);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * Moves to the previous page if it exists
     */
    previous() {
        if (this.current > 1) {
            this.current--;
        }
    }
    /**
     * Moves to the next page if it exists
     */
    next() {
        if (this.current < this.last) {
            this.current++;
        }
    }
    /**
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     */
    get firstItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
     */
    get lastItem() {
        if (this._totalItems === 0) {
            return -1;
        }
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        let lastInPage = this.current * this.size - 1;
        if (this.totalItems) {
            lastInPage = Math.min(lastInPage, this.totalItems - 1);
        }
        return lastInPage;
    }
    /**
     * Resets the page size to 0
     */
    resetPageSize() {
        this.size = 0;
    }
};
Page = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [StateDebouncer])
], Page);

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
FiltersProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Page, StateDebouncer])
], FiltersProvider);
class RegisteredFilter {
    constructor(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
}

class DatagridFilterRegistrar {
    constructor(filters) {
        this.filters = filters;
    }
    get filter() {
        return this.registered && this.registered.filter;
    }
    setFilter(filter) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter instanceof RegisteredFilter) {
            this.registered = filter;
        }
        else if (filter) {
            this.registered = this.filters.add(filter);
        }
    }
    deleteFilter() {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    }
    ngOnDestroy() {
        this.deleteFilter();
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrAxis;
(function (ClrAxis) {
    ClrAxis[ClrAxis["VERTICAL"] = 0] = "VERTICAL";
    ClrAxis[ClrAxis["HORIZONTAL"] = 1] = "HORIZONTAL";
})(ClrAxis || (ClrAxis = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrSide;
(function (ClrSide) {
    ClrSide[ClrSide["BEFORE"] = -1] = "BEFORE";
    ClrSide[ClrSide["AFTER"] = 1] = "AFTER";
})(ClrSide || (ClrSide = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrAlignment;
(function (ClrAlignment) {
    ClrAlignment[ClrAlignment["START"] = 0] = "START";
    ClrAlignment[ClrAlignment["CENTER"] = 0.5] = "CENTER";
    ClrAlignment[ClrAlignment["END"] = 1] = "END";
})(ClrAlignment || (ClrAlignment = {}));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let NB_INSTANCES = 0;
const UNIQUE_ID = new InjectionToken('UNIQUE_ID');
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
const UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};

let ClrPopoverToggleService = class ClrPopoverToggleService {
    constructor() {
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._open = false;
        this._openChange = new Subject();
        this._openEventChange = new Subject();
    }
    get openChange() {
        return this._openChange.asObservable();
    }
    set openEvent(event) {
        this._openEvent = event;
        this._openEventChange.next(event);
    }
    get openEvent() {
        return this._openEvent;
    }
    getEventChange() {
        return this._openEventChange.asObservable();
    }
    set open(value) {
        value = !!value;
        if (this._open !== value) {
            this._open = value;
            this._openChange.next(value);
        }
    }
    get open() {
        return this._open;
    }
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     */
    toggleWithEvent(event) {
        this.openEvent = event;
        this.open = !this.open;
    }
};
ClrPopoverToggleService = __decorate([
    Injectable()
], ClrPopoverToggleService);

var ClrDatagridFilter_1;
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
let ClrDatagridFilter = ClrDatagridFilter_1 = class ClrDatagridFilter extends DatagridFilterRegistrar {
    constructor(_filters, commonStrings, smartToggleService, platformId, popoverId) {
        super(_filters);
        this.commonStrings = commonStrings;
        this.smartToggleService = smartToggleService;
        this.platformId = platformId;
        this.popoverId = popoverId;
        this.subs = [];
        // Smart Popover
        this.smartPosition = {
            axis: ClrAxis.VERTICAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.END,
            content: ClrAlignment.END,
        };
        this.openChange = new EventEmitter(false);
        this.subs.push(smartToggleService.openChange.subscribe(change => {
            this.open = change;
        }));
    }
    get open() {
        return this.smartToggleService.open;
    }
    set open(open) {
        const boolOpen = !!open;
        if (boolOpen !== this.open) {
            this.smartToggleService.open = !!open;
            this.openChange.emit(!!open);
            if (!boolOpen && isPlatformBrowser(this.platformId)) {
                this.anchor.nativeElement.focus();
            }
        }
    }
    set customFilter(filter) {
        this.setFilter(filter);
    }
    /**
     * Indicates if the filter is currently active
     */
    get active() {
        return !!this.filter && this.filter.isActive();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    ViewChild('anchor', { static: false, read: ElementRef }),
    __metadata("design:type", ElementRef)
], ClrDatagridFilter.prototype, "anchor", void 0);
__decorate([
    Input('clrDgFilterOpen'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridFilter.prototype, "open", null);
__decorate([
    Output('clrDgFilterOpenChange'),
    __metadata("design:type", Object)
], ClrDatagridFilter.prototype, "openChange", void 0);
__decorate([
    Input('clrDgFilter'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagridFilter.prototype, "customFilter", null);
ClrDatagridFilter = ClrDatagridFilter_1 = __decorate([
    Component({
        selector: 'clr-dg-filter',
        // We register this component as a CustomFilter, for the parent column to detect it.
        providers: [{ provide: CustomFilter, useExisting: ClrDatagridFilter_1 }, UNIQUE_ID_PROVIDER],
        template: `
      <button class="datagrid-filter-toggle"
              type="button"
              #anchor
              clrPopoverAnchor
              clrPopoverOpenCloseButton
              [class.datagrid-filter-open]="open" 
              [class.datagrid-filtered]="active">
          <clr-icon [attr.shape]="active ? 'filter-grid-circle': 'filter-grid'" class="is-solid"></clr-icon>
      </button>

      <div class="datagrid-filter"
           [id]="popoverId"
           clrFocusTrap
           *clrPopoverContent="open at smartPosition; outsideClickToClose: true; scrollToClose: true">
          <div class="datagrid-filter-close-wrapper">
              <button type="button" class="close" clrPopoverCloseButton>
                  <clr-icon shape="close" [attr.title]="commonStrings.keys.close"></clr-icon>
              </button>
          </div>

          <ng-content></ng-content>
      </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(3, Inject(PLATFORM_ID)),
    __param(4, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [FiltersProvider,
        ClrCommonStringsService,
        ClrPopoverToggleService,
        Object, String])
], ClrDatagridFilter);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 */
class NestedProperty {
    constructor(prop) {
        this.prop = prop;
        if (prop.indexOf('.') >= 0) {
            this.splitProp = prop.split('.');
        }
    }
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    getPropValue(item) {
        if (this.splitProp) {
            let value = item;
            for (const nestedProp of this.splitProp) {
                if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                    return undefined;
                }
                value = value[nestedProp];
            }
            return value;
        }
        else {
            return item[this.prop];
        }
    }
}

class DatagridPropertyStringFilter {
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    accepts(item, search) {
        const propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === 'undefined') {
            return false;
        }
        else if (this.exact) {
            return ('' + propValue).toLowerCase() === search;
        }
        else {
            return ('' + propValue).toLowerCase().indexOf(search) >= 0;
        }
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridStringFilterImpl {
    constructor(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject();
        /**
         * Raw input value
         */
        this._rawValue = '';
        /**
         * Input value converted to lowercase
         */
        this._lowerCaseValue = '';
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get changes() {
        return this._changes.asObservable();
    }
    get value() {
        return this._rawValue;
    }
    get lowerCaseValue() {
        return this._lowerCaseValue;
    }
    /**
     * Common setter for the input value
     */
    set value(value) {
        if (!value) {
            value = '';
        }
        if (value !== this._rawValue) {
            this._rawValue = value;
            this._lowerCaseValue = value.toLowerCase().trim();
            this._changes.next(value);
        }
    }
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     */
    isActive() {
        return !!this.value;
    }
    /**
     * Tests if an item matches a search text
     */
    accepts(item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    }
    get state() {
        if (this.filterFn instanceof DatagridPropertyStringFilter) {
            return {
                property: this.filterFn.prop,
                value: this.value,
            };
        }
        return this;
    }
    equals(other) {
        if (other instanceof DatagridStringFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyStringFilter) {
                return (this.filterFn instanceof DatagridPropertyStringFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.value === this.value);
            }
            return other === this;
        }
        return false;
    }
}

var DatagridStringFilter_1;
let DatagridStringFilter = DatagridStringFilter_1 = class DatagridStringFilter extends DatagridFilterRegistrar {
    constructor(filters, domAdapter, smartToggleService) {
        super(filters);
        this.domAdapter = domAdapter;
        this.smartToggleService = smartToggleService;
        this.subs = [];
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on a search text
     */
    set customStringFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridStringFilterImpl(value));
        }
    }
    ngAfterViewInit() {
        this.subs.push(this.smartToggleService.openChange.subscribe(openChange => {
            this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(() => {
                this.domAdapter.focus(this.input.nativeElement);
            });
        }));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach(sub => sub.unsubscribe());
    }
    /**
     * Common setter for the input value
     */
    get value() {
        return this.filter.value;
    }
    set value(value) {
        if (!this.filter) {
            return;
        }
        if (!value) {
            value = '';
        }
        if (value !== this.filter.value) {
            this.filter.value = value;
            this.filterValueChange.emit(value);
        }
    }
};
__decorate([
    Input('clrDgStringFilter'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatagridStringFilter.prototype, "customStringFilter", null);
__decorate([
    ViewChild('input', { static: false }),
    __metadata("design:type", ElementRef)
], DatagridStringFilter.prototype, "input", void 0);
__decorate([
    ViewChild(ClrDatagridFilter, { static: false }),
    __metadata("design:type", ClrDatagridFilter)
], DatagridStringFilter.prototype, "filterContainer", void 0);
__decorate([
    Input('clrFilterValue'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DatagridStringFilter.prototype, "value", null);
__decorate([
    Output('clrFilterValueChange'),
    __metadata("design:type", Object)
], DatagridStringFilter.prototype, "filterValueChange", void 0);
DatagridStringFilter = DatagridStringFilter_1 = __decorate([
    Component({
        selector: 'clr-dg-string-filter',
        providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter_1 }],
        template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <input #input type="text" name="search" [(ngModel)]="value" class="clr-input" />
        </clr-dg-filter>
    `
    }),
    __metadata("design:paramtypes", [FiltersProvider,
        DomAdapter,
        ClrPopoverToggleService])
], DatagridStringFilter);

class DatagridPropertyNumericFilter {
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    accepts(item, low, high) {
        const propValue = this.nestedProp.getPropValue(item);
        if (low !== null && propValue < low) {
            return false;
        }
        if (high !== null && propValue > high) {
            return false;
        }
        return true;
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridNumericFilterImpl {
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

var DatagridNumericFilter_1;
let DatagridNumericFilter = DatagridNumericFilter_1 = class DatagridNumericFilter extends DatagridFilterRegistrar {
    constructor(filters, domAdapter, commonStrings, popoverToggleService) {
        super(filters);
        this.domAdapter = domAdapter;
        this.commonStrings = commonStrings;
        this.popoverToggleService = popoverToggleService;
        this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
    /**
     * Customizable filter logic based on high and low values
     */
    set customNumericFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridNumericFilterImpl(value));
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.popoverToggleService.openChange.subscribe(openChange => {
            this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(() => {
                this.domAdapter.focus(this.input.nativeElement);
            });
        }));
    }
    /**
     * Common setter for the input values
     */
    get value() {
        return [this.filter.low, this.filter.high];
    }
    set value(values) {
        if (!this.filter) {
            return;
        }
        if (values && (values[0] !== this.filter.low || values[1] !== this.filter.high)) {
            if (typeof values[0] === 'number') {
                this.filter.low = values[0];
            }
            else {
                this.filter.low = null;
            }
            if (typeof values[1] === 'number') {
                this.filter.high = values[1];
            }
            else {
                this.filter.high = null;
            }
            this.filterValueChange.emit(values);
        }
    }
    get low() {
        if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
            return this.filter.low;
        }
        else {
            // There's not a low limit
            return null;
        }
    }
    get high() {
        if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
            return this.filter.high;
        }
        else {
            // There's not a high limit
            return null;
        }
    }
    set low(low) {
        if (typeof low === 'number' && low !== this.filter.low) {
            this.filter.low = low;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof low !== 'number') {
            this.filter.low = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    set high(high) {
        if (typeof high === 'number' && high !== this.filter.high) {
            this.filter.high = high;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof high !== 'number') {
            this.filter.high = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
};
__decorate([
    Input('clrDgNumericFilter'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatagridNumericFilter.prototype, "customNumericFilter", null);
__decorate([
    ViewChild('input_low', { static: false }),
    __metadata("design:type", ElementRef)
], DatagridNumericFilter.prototype, "input", void 0);
__decorate([
    ViewChild(ClrDatagridFilter, { static: false }),
    __metadata("design:type", ClrDatagridFilter)
], DatagridNumericFilter.prototype, "filterContainer", void 0);
__decorate([
    Input('clrFilterValue'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DatagridNumericFilter.prototype, "value", null);
__decorate([
    Output('clrFilterValueChange'),
    __metadata("design:type", Object)
], DatagridNumericFilter.prototype, "filterValueChange", void 0);
DatagridNumericFilter = DatagridNumericFilter_1 = __decorate([
    Component({
        selector: 'clr-dg-numeric-filter',
        providers: [{ provide: CustomFilter, useExisting: DatagridNumericFilter_1 }],
        template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <input class="datagrid-numeric-filter-input" #input_low type="number" name="low" [(ngModel)]="low" 
                   [placeholder]="commonStrings.keys.minValue" [attr.aria-label]="commonStrings.keys.minValue" />
                <span class="datagrid-filter-input-spacer"></span>
            <input class="datagrid-numeric-filter-input" #input_high type="number" name="high" [(ngModel)]="high" 
                   [placeholder]="commonStrings.keys.maxValue" [attr.aria-label]="commonStrings.keys.maxValue" />
        </clr-dg-filter>
    `
    }),
    __metadata("design:paramtypes", [FiltersProvider,
        DomAdapter,
        ClrCommonStringsService,
        ClrPopoverToggleService])
], DatagridNumericFilter);

class OompaLoompa {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    constructor(cdr, willyWonka) {
        this.subscription = willyWonka.chocolate.subscribe(() => {
            if (this.latestFlavor !== this.flavor) {
                cdr.detectChanges();
            }
        });
    }
    ngAfterContentChecked() {
        this.latestFlavor = this.flavor;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let RowActionService = class RowActionService {
    constructor() {
        this.actionableCount = 0;
    }
    register() {
        this.actionableCount++;
    }
    unregister() {
        this.actionableCount--;
    }
    /**
     * false means no rows with action
     */
    get hasActionableRow() {
        return this.actionableCount > 0;
    }
};
RowActionService = __decorate([
    Injectable()
], RowActionService);

/*
 * After a conversation with the Angular core team, it turns out we don't have much of a choice for our
 * declarative API, we need to fight against change detection and its one-way flow. This is
 * currently the least dirty solution to do what we want.
 *
 * Do not modify or even use this class unless you know exactly what you're doing.
 * It has the potential to trigger change detection loops or kill app performances.
 */
class WillyWonka {
    constructor() {
        this._chocolate = new Subject();
    }
    get chocolate() {
        return this._chocolate.asObservable();
    }
    ngAfterViewChecked() {
        this._chocolate.next();
    }
}

let DatagridWillyWonka = class DatagridWillyWonka extends WillyWonka {
};
DatagridWillyWonka = __decorate([
    Directive({ selector: 'clr-datagrid' })
], DatagridWillyWonka);

let ActionableOompaLoompa = class ActionableOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, rowActions) {
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        super(cdr, willyWonka);
        this.rowActions = rowActions;
    }
    get flavor() {
        return this.rowActions.hasActionableRow;
    }
};
ActionableOompaLoompa = __decorate([
    Directive({ selector: 'clr-datagrid, clr-dg-row' }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ChangeDetectorRef, DatagridWillyWonka, RowActionService])
], ActionableOompaLoompa);

let ExpandableRowsCount = class ExpandableRowsCount {
    constructor() {
        this.expandableCount = 0;
    }
    register() {
        this.expandableCount++;
    }
    unregister() {
        this.expandableCount--;
    }
    /**
     * false means no rows with action
     */
    get hasExpandableRow() {
        return this.expandableCount > 0;
    }
};
ExpandableRowsCount = __decorate([
    Injectable()
], ExpandableRowsCount);

let ExpandableOompaLoompa = class ExpandableOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, expandableCount) {
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        super(cdr, willyWonka);
        this.expandableCount = expandableCount;
    }
    get flavor() {
        return this.expandableCount.hasExpandableRow;
    }
};
ExpandableOompaLoompa = __decorate([
    Directive({ selector: 'clr-datagrid, clr-dg-row' }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        DatagridWillyWonka,
        ExpandableRowsCount])
], ExpandableOompaLoompa);

class DatagridPropertyComparator {
    constructor(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    compare(a, b) {
        let propA = this.nestedProp.getPropValue(a);
        let propB = this.nestedProp.getPropValue(b);
        if (typeof propA === 'string') {
            propA = propA.toLowerCase();
        }
        if (typeof propB === 'string') {
            propB = propB.toLowerCase();
        }
        if (typeof propA === 'undefined' || propA === null) {
            if (typeof propB === 'undefined' || propB === null) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            if (typeof propB === 'undefined' || propB === null) {
                return -1;
            }
            else if (propA < propB) {
                return -1;
            }
            else if (propA > propB) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Enumeration representing the sorting order of a datagrid column. It is a constant Enum,
 * i.e. each value needs to be treated as a `number`, starting at index 0.
 *
 * @export
 * @enum {number}
 */
var ClrDatagridSortOrder;
(function (ClrDatagridSortOrder) {
    ClrDatagridSortOrder[ClrDatagridSortOrder["UNSORTED"] = 0] = "UNSORTED";
    ClrDatagridSortOrder[ClrDatagridSortOrder["ASC"] = 1] = "ASC";
    ClrDatagridSortOrder[ClrDatagridSortOrder["DESC"] = -1] = "DESC";
})(ClrDatagridSortOrder || (ClrDatagridSortOrder = {}));

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
Sort = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [StateDebouncer])
], Sort);

let WrappedColumn = class WrappedColumn {
    constructor() {
        this._dynamic = false;
    }
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    }
};
__decorate([
    ViewChild('columnPortal', { static: false }),
    __metadata("design:type", TemplateRef)
], WrappedColumn.prototype, "templateRef", void 0);
WrappedColumn = __decorate([
    Component({
        selector: 'dg-wrapped-column',
        template: `        
        <ng-template #columnPortal>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], WrappedColumn);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
let ClrPopoverEventsService = class ClrPopoverEventsService {
    constructor(renderer, smartOpenService, document) {
        this.renderer = renderer;
        this.smartOpenService = smartOpenService;
        this.document = document;
        this.outsideClickClose = true;
        this.scrollToClose = true;
        this.subscriptions = [];
        this.subscriptions.push(smartOpenService.openChange.subscribe(open => {
            if (open) {
                this.addEscapeListener();
                this.addClickListener();
                this.addScrollListener();
            }
            else {
                this.removeAllEventListeners();
            }
        }), smartOpenService.getEventChange().subscribe(event => {
            // Remember the event that was used to open the content
            this.ignoredEvent = event;
        }));
    }
    addScrollListener() {
        if (this.scrollToClose) {
            this.documentScroller = fromEvent(this.document, 'scroll', { capture: true });
            this.scrollSubscription = this.documentScroller
                .pipe(filter(this.testForSmartPopoverContentContainer))
                .subscribe(() => {
                this.smartOpenService.open = false;
                this.setAnchorFocus();
            });
        }
        else {
            // I think this is where dynamic re-positioning will be added
            // Instead of testing like we do in the close pipe below
            // we need to switch positioning to use an observable and then
            // debounce the scroll events to recalculate content position in a performant way
            // For now, ignore scrolling events.
            return;
        }
    }
    removeScrollListener() {
        if (this.documentScroller) {
            this.scrollSubscription.unsubscribe();
            delete this.documentScroller;
        }
    }
    testForSmartPopoverContentContainer(event) {
        // Filter for the documentScroller observable event targets
        let target = event.target;
        // Walk up the DOM tree until we get to the element that is a direct child of the body.
        while (target.classList && target.parentElement.localName !== 'body') {
            target = target.parentElement;
        }
        // Target is the child element of body where the scroll events originated.
        // Return false and prevent the popover content container from closing for any scroll events inside a popover
        // content container.
        if (target.classList) {
            // check scroll events to see if they are happening in popover content or elsewhere
            return target.classList.contains('clr-popover-content') ? false : true;
        }
        else {
            // prevents it from closing right after first opening
            return false;
        }
    }
    addClickListener() {
        if (this.outsideClickClose) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (event === this.ignoredEvent) {
                    // Here we ignore the opening click event (w/o this content opens and immediately closes.
                    delete this.ignoredEvent;
                }
                else {
                    this.smartOpenService.open = false;
                    // Rather than a complex change to the focus trap I put focus on the element that was clicked
                    const clickedElement = event.target;
                    clickedElement.focus();
                }
            });
        }
    }
    removeClickListener() {
        if (this.outsideClickClose) {
            delete this.ignoredEvent;
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    }
    addEscapeListener() {
        this.escapeListener = this.renderer.listen(this.document, 'keydown.escape', event => {
            this.smartOpenService.open = false;
            this.setAnchorFocus();
        });
    }
    removeEscapeListener() {
        if (this.escapeListener) {
            this.escapeListener();
            delete this.escapeListener;
        }
    }
    set anchorButtonRef(ref) {
        this._anchorButtonRef = ref;
    }
    get anchorButtonRef() {
        return this._anchorButtonRef;
    }
    set closeButtonRef(ref) {
        this._closeButtonRef = ref;
    }
    get closeButtonRef() {
        return this._closeButtonRef;
    }
    setCloseFocus() {
        this._closeButtonRef.nativeElement.focus();
    }
    setAnchorFocus() {
        this.anchorButtonRef.nativeElement.focus();
    }
    set contentRef(host) {
        this._contentRef = host;
    }
    get contentRef() {
        return this._contentRef;
    }
    removeAllEventListeners() {
        this.removeScrollListener();
        this.removeClickListener();
        this.removeEscapeListener();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.removeAllEventListeners();
    }
};
ClrPopoverEventsService = __decorate([
    Injectable(),
    __param(2, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Renderer2,
        ClrPopoverToggleService,
        HTMLDocument])
], ClrPopoverEventsService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrViewportViolation;
(function (ClrViewportViolation) {
    ClrViewportViolation[ClrViewportViolation["BOTTOM"] = 0] = "BOTTOM";
    ClrViewportViolation[ClrViewportViolation["LEFT"] = 1] = "LEFT";
    ClrViewportViolation[ClrViewportViolation["RIGHT"] = 2] = "RIGHT";
    ClrViewportViolation[ClrViewportViolation["TOP"] = 3] = "TOP";
})(ClrViewportViolation || (ClrViewportViolation = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
const flipSides = position => {
    return Object.assign({}, position, { side: -1 * position.side });
};
const nudgeContent = (position, forward) => {
    const nextAlignment = position.content + (forward ? 0.5 : -0.5);
    if (nextAlignment < 0 || nextAlignment > 1) {
        return position;
    }
    else {
        return Object.assign({}, position, { content: nextAlignment });
    }
};
function flipSidesAndNudgeContent(flip, nudge, nudgeBack) {
    return (position) => nudge(flip(position), nudgeBack);
}
function align(position, anchor, content) {
    let xDiff = anchor.left;
    let yDiff = anchor.top;
    // When ClrAxis is VERTICAL BEFORE = left, AFTER = right
    // When ClrAxis is HORIZONTAL BEFORE is top, AFTER is bottom
    switch (position.axis + position.side) {
        case -1: {
            // ClrAxis.VERTICAL + ClrSide.BEFORE
            xDiff += alignHorizontal(position, anchor, content);
            yDiff -= content.height; // pull content up to the top of the anchor
            break;
        }
        case 1: {
            // ClrAxis.VERTICAL + ClrSide.AFTER
            xDiff += alignHorizontal(position, anchor, content);
            yDiff += anchor.height; // push the content down to below the anchor
            break;
        }
        case 0: {
            // ClrAxis.HORIZONTAL + ClrSide.BEFORE
            xDiff -= content.width; // pull the content left of the anchor
            yDiff += alignVertical(position, anchor, content);
            break;
        }
        case 2: {
            // ClrAxis.HORIZONTAL + ClrSide.AFTER
            xDiff += anchor.width; // push the content right of of the anchor
            yDiff += alignVertical(position, anchor, content);
            break;
        }
        default: {
            break;
        }
    }
    return { xOffset: xDiff, yOffset: yDiff };
}
function alignHorizontal(position, anchor, content) {
    let horizontalOffset = 0;
    // horizontal offset for the anchor position
    switch (position.anchor /*calculate for the anchor alignment*/) {
        case ClrAlignment.START: {
            // nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            horizontalOffset += anchor.width / 2; // push content over 1/2 anchor width
            break;
        }
        case ClrAlignment.END: {
            horizontalOffset += anchor.width; //  push content over width of the anchor
            break;
        }
        default: {
            break;
        }
    }
    // horizontal offsets for anchor alignment
    switch (position.content // calculate for the content alignment
    ) {
        case ClrAlignment.START: {
            // Nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            horizontalOffset -= content.width / 2; // pull content left by a value of 1/2 content width
            break;
        }
        case ClrAlignment.END: {
            // subtract the width of currentContent from horizontalOffset to pull it back
            horizontalOffset -= content.width;
            break;
        }
        default: {
            break;
        }
    }
    return horizontalOffset;
}
function alignVertical(position, anchor, content) {
    // y axis offsets for anchor alignment
    let verticalOffset = 0;
    // Calculate y offset for anchor position
    switch (position.anchor) {
        case ClrAlignment.START: {
            // nothing to calculate here
            break;
        }
        case ClrAlignment.CENTER: {
            verticalOffset += anchor.height / 2; // push content down to the middle of the anchor rect
            break;
        }
        case ClrAlignment.END: {
            verticalOffset += anchor.height; // push content down to the bottom of the anchor
            break;
        }
        default: {
            break;
        }
    }
    // Calculate y offsets for content alignment
    switch (position.content) {
        case ClrAlignment.START: {
            // aligned to the top of the content rect
            break;
        }
        case ClrAlignment.CENTER: {
            verticalOffset -= content.height / 2; // pull content back up to the middle of the content rect
            break;
        }
        case ClrAlignment.END: {
            verticalOffset -= content.height; // pull content back up to the bottom of the content rect
            break;
        }
        default: {
            break;
        }
    }
    return verticalOffset;
}
function testVisibility(offset, content) {
    const violations = [];
    const mockCoords = {
        bottom: offset.yOffset + content.height,
        left: offset.xOffset,
        right: offset.xOffset + content.width,
        top: offset.yOffset,
    };
    if (!(mockCoords.top >= 0)) {
        violations.push(ClrViewportViolation.TOP);
    }
    if (!(mockCoords.left >= 0)) {
        violations.push(ClrViewportViolation.LEFT);
    }
    if (!(mockCoords.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
        violations.push(ClrViewportViolation.BOTTOM);
    }
    if (!(mockCoords.right <= (window.innerWidth || document.documentElement.clientWidth))) {
        violations.push(ClrViewportViolation.RIGHT);
    }
    return violations;
}

let ClrPopoverPositionService = class ClrPopoverPositionService {
    constructor(eventService, platformId) {
        this.eventService = eventService;
        this.platformId = platformId;
    }
    set position(position) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
    alignContent(content) {
        if (!isPlatformBrowser(this.platformId)) {
            // Only position when in a browser.
            // Default to the browser origin and prevent getBoundingClientRect from running.
            return {
                xOffset: 0,
                yOffset: 0,
            };
        }
        this.currentAnchorCoords = this.eventService.anchorButtonRef.nativeElement.getBoundingClientRect();
        this.currentContentCoords = content.getBoundingClientRect();
        this.contentOffsets = align(this.position, this.currentAnchorCoords, this.currentContentCoords);
        const visibilityViolations = testVisibility(this.contentOffsets, this.currentContentCoords);
        /**
         * Calculate the sum of viewport errors. This calculation is used below with the provided Axis in the given
         * ClrPopoverPosition. Its worth putting the ClrViewportViolation enum values here:
         *
         *   BOTTOM = 0,
         *   LEFT = 1,
         *   RIGHT = 2,
         *   TOP = 3,
         *
         *   So, this.visibilityViolations.length tells us how many sides of the viewport that the popover content was
         *   clipped on. We can only help when the content has an issue on one or two sides.
         *   errorSum is calculated to determine _how_ to change the position. Looking at both the axis and the number
         *   of violations I can use the errorSum to determine how to transform the position (on the fly) and adjust
         *   where it can be improved.
         *
         *   Note, more than 3 viewport violations and there isn't anything we can do to help. Also when there are two
         *   violations, we can't help if the violations are TOP+BOTTOM || LEFT+RIGHT => There is no transformation we
         *   can make to the postion that will help.
         *
         *   Some examples:
         *   There is only one error and Primary axis is VERTICAL
         *   - this.handleVerticalAxisOneViolation has a switch that will use the error sum to apply the correct
         *   transform to the postion based on the reduction of visibilityViolations.
         *
         *   There are two errors and Primary axis is HORIZONTAL
         *   - handleHorizontalAxisTwoViolations has a switch that uses the error sum to apply both transforms needed to
         *   improve the content position based on the reduction of visibilityViolations.
         */
        const errorSum = visibilityViolations.reduce((count, current) => {
            return count + current;
        }, 0);
        if (visibilityViolations.length === 1 && this.position.axis === ClrAxis.VERTICAL) {
            // When primary axis is VERTICAL and there is one viewport violation
            this.handleVerticalAxisOneViolation(errorSum);
        }
        else if (visibilityViolations.length === 1 && this.position.axis === ClrAxis.HORIZONTAL) {
            // When primary axis is HORIZONTAL and there is one viewport violation
            this.handleHorizontalAxisOneViolation(errorSum);
        }
        else if (visibilityViolations.length === 2 && this.position.axis === ClrAxis.VERTICAL) {
            // When primary axis is VERTICAL and there are two viewport violations
            this.handleVerticalAxisTwoViolations(errorSum);
        }
        else if (visibilityViolations.length === 2 && this.position.axis === ClrAxis.HORIZONTAL) {
            // When primary axis is HORIZONTAL and there are two viewport violations
            this.handleHorizontalAxisTwoViolations(errorSum);
        }
        return this.contentOffsets;
    }
    handleVerticalAxisOneViolation(errorSum) {
        switch (errorSum) {
            case 0:
            case 3: {
                // BOTTOM(0) or TOP(3) are primary violations and we can just flip sides
                this.contentOffsets = align(flipSides(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 1: {
                // LEFT(1) is secondary and needs to nudge content right
                this.contentOffsets = align(nudgeContent(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 2: {
                // RIGHT(2) is secondary and  needs to nudge content left
                this.contentOffsets = align(nudgeContent(this.position, true), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleVerticalAxisTwoViolations(errorSum) {
        switch (errorSum) {
            // We know there are two violations. We can use the errorSum to determine which combination of sides were
            // violated and handle appropriately.
            case 5: {
                // TOP(3)+RIGHT(2) is case 5. We need to flip sides and nudge the content to the left
                const flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 4: {
                //TOP(3)+LEFT(1) is case 4, we need to flip sides and nudge content to the right
                const flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeRight(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3)+BOTTOM(0) || left(1)+RIGHT(2) is case 3. There is nothing we can do position wise to improve the
                // placement for this content.
                break;
            }
            case 2: {
                // BOTTOM(0)+RIGHT(2) is case 2. We need to flip sides and nudge the content to the left
                const flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 1: {
                // BOTTOM(0)+LEFT(1) is case 1. We need to flip sides and nudge to the right
                const flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeRight(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleHorizontalAxisOneViolation(errorSum) {
        switch (errorSum) {
            case 1:
            case 2: {
                // LEFT(1) and RIGHT(2) are primary violations so we can flip sides
                this.contentOffsets = align(flipSides(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 0: {
                // BOTTOM(0) is a secondary violation and we need to nudge content up
                this.contentOffsets = align(nudgeContent(this.position, true), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3) is a secondary violation and we need to nudge content down
                this.contentOffsets = align(nudgeContent(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
    handleHorizontalAxisTwoViolations(errorSum) {
        switch (errorSum) {
            case 5:
            case 4: {
                // TOP(3)+LEFT(1) is case 4.
                // TOP(3)+RIGHT(2) is case 5.
                // In both of these cases we need to flip sides and nudge content down
                const flipAndNudgeDown = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeDown(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 3: {
                // TOP(3)+BOTTOM(0) || left(1)+RIGHT(2) is case 3. There is nothing we can do position wise to improve the
                // placement for this content.
                break;
            }
            case 2:
            case 1: {
                // BOTTOM(0)+RIGHT(2) is case 2.
                // BOTTOM(0)+LEFT(1) is case 1.
                // In both cases we  need to flip sides and nudge content up
                const flipAndNudgeUp = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeUp(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    }
};
ClrPopoverPositionService = __decorate([
    Injectable(),
    __param(1, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ClrPopoverEventsService, Object])
], ClrPopoverPositionService);

let ClrDatagridColumn = class ClrDatagridColumn extends DatagridFilterRegistrar {
    constructor(_sort, filters, vcr, commonStrings) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        this.commonStrings = commonStrings;
        /*
          * What type is this column?  This defaults to STRING, but can also be
          * set to NUMBER.  Unsupported types default to STRING. Users can set it
          * via the [clrDgColType] input by setting it to 'string' or 'number'.
          */
        // TODO: We might want to make this an enum in the future
        this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
    }
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    get field() {
        return this._field;
    }
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                if (this.colType === 'number') {
                    this.setFilter(new DatagridNumericFilterImpl(new DatagridPropertyNumericFilter(field)));
                }
                else {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    get sortBy() {
        return this._sortBy;
    }
    set sortBy(comparator) {
        if (typeof comparator === 'string') {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     */
    get sortable() {
        return !!this._sortBy;
    }
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(value) {
        if (typeof value === 'undefined') {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case ClrDatagridSortOrder.UNSORTED:
                this._sort.clear();
                break;
            case ClrDatagridSortOrder.ASC:
                this.sort(false);
                break;
            case ClrDatagridSortOrder.DESC:
                this.sort(true);
                break;
        }
    }
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        // Sets the correct icon for current sort order
        this.sortIcon = this._sortOrder === ClrDatagridSortOrder.DESC ? 'arrow down' : 'arrow';
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    get filterValue() {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            return this.filter.value;
        }
    }
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (this.filter instanceof DatagridStringFilterImpl) {
            if (!newValue || typeof newValue !== 'string') {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        }
        else if (this.filter instanceof DatagridNumericFilterImpl) {
            if (!newValue || !(newValue instanceof Array)) {
                newValue = [null, null];
            }
            if (newValue.length === 2 && (newValue[0] !== this.filter.value[0] || newValue[1] !== this.filter.value[1])) {
                this.filter.value = newValue;
            }
        }
    }
    set filterValue(newValue) {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        }
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
};
__decorate([
    Input('clrDgField'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrDatagridColumn.prototype, "field", null);
__decorate([
    Input('clrDgSortBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "sortBy", null);
__decorate([
    Input('clrDgColType'),
    __metadata("design:type", String)
], ClrDatagridColumn.prototype, "colType", void 0);
__decorate([
    Input('clrDgSorted'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridColumn.prototype, "sorted", null);
__decorate([
    Output('clrDgSortedChange'),
    __metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortedChange", void 0);
__decorate([
    Input('clrDgSortOrder'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrDatagridColumn.prototype, "sortOrder", null);
__decorate([
    Output('clrDgSortOrderChange'),
    __metadata("design:type", Object)
], ClrDatagridColumn.prototype, "sortOrderChange", void 0);
__decorate([
    ContentChild(CustomFilter, { static: false }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "projectedFilter", null);
__decorate([
    Input('clrFilterValue'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagridColumn.prototype, "updateFilterValue", null);
__decorate([
    Output('clrFilterValueChange'),
    __metadata("design:type", Object)
], ClrDatagridColumn.prototype, "filterValueChange", void 0);
ClrDatagridColumn = __decorate([
    Component({
        selector: 'clr-dg-column',
        template: `
      <div class="datagrid-column-flex">
          <!-- I'm really not happy with that select since it's not very scalable -->
          <ng-content select="clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter"></ng-content>

          <clr-dg-string-filter
                  *ngIf="field && !customFilter && (colType=='string')"
                  [clrDgStringFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-string-filter>
          
          <clr-dg-numeric-filter
                  *ngIf="field && !customFilter && (colType=='number')"
                  [clrDgNumericFilter]="registered"
                  [(clrFilterValue)]="filterValue"></clr-dg-numeric-filter>

          <ng-template #columnTitle>
              <ng-content></ng-content>
          </ng-template>

          <button 
            class="datagrid-column-title" 
            [attr.aria-label]="commonStrings.keys.sortColumn"
            *ngIf="sortable" 
            (click)="sort()" 
            type="button">
              <ng-container  *ngTemplateOutlet="columnTitle"></ng-container>
              <clr-icon
                      *ngIf="sortIcon"
                      [attr.shape]="sortIcon"
                      class="sort-icon"></clr-icon>
          </button>

          <span class="datagrid-column-title" *ngIf="!sortable">
              <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
          </span>

            <clr-dg-column-separator></clr-dg-column-separator>
        </div>
    `,
        providers: [ClrPopoverPositionService, ClrPopoverEventsService, ClrPopoverToggleService],
        host: {
            '[class.datagrid-column]': 'true',
            '[attr.aria-sort]': 'ariaSort',
            role: 'columnheader',
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [Sort,
        FiltersProvider,
        ViewContainerRef,
        ClrCommonStringsService])
], ClrDatagridColumn);

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
Items = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FiltersProvider, Sort, Page])
], Items);

let ClrDatagridItems = class ClrDatagridItems {
    constructor(template, differs, items, vcr) {
        this.template = template;
        this.differs = differs;
        this.items = items;
        this.vcr = vcr;
        this.differ = null;
        this.subscriptions = [];
        items.smartenUp();
        this.iterableProxy = new NgForOf(this.vcr, this.template, this.differs);
        this.subscriptions.push(items.change.subscribe(newItems => {
            this.iterableProxy.ngForOf = newItems;
            this.iterableProxy.ngDoCheck();
        }));
    }
    set rawItems(items) {
        this._rawItems = items ? items : []; // local copy for ngOnChange diffing
    }
    set trackBy(value) {
        this.iterableProxy.ngForTrackBy = value;
    }
    ngDoCheck() {
        if (!this.differ) {
            this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
        }
        if (this.differ) {
            const changes = this.differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this.items.all = this._rawItems;
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Input('clrDgItemsOf'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], ClrDatagridItems.prototype, "rawItems", null);
__decorate([
    Input('clrDgItemsTrackBy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function])
], ClrDatagridItems.prototype, "trackBy", null);
ClrDatagridItems = __decorate([
    Directive({
        selector: '[clrDgItems][clrDgItemsOf]',
    }),
    __metadata("design:paramtypes", [TemplateRef,
        IterableDiffers,
        Items,
        ViewContainerRef])
], ClrDatagridItems);

let ClrDatagridPlaceholder = class ClrDatagridPlaceholder {
    constructor(items) {
        this.items = items;
    }
    /**
     * Tests if the datagrid is empty, meaning it doesn't contain any items
     */
    get emptyDatagrid() {
        return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
    }
};
ClrDatagridPlaceholder = __decorate([
    Component({
        selector: 'clr-dg-placeholder',
        template: `
        <div
            class="datagrid-placeholder"
            [class.datagrid-empty]="emptyDatagrid">
                <div class="datagrid-placeholder-image" *ngIf="emptyDatagrid"></div>
                <ng-content *ngIf="emptyDatagrid"></ng-content>
        </div>
    `,
        host: { '[class.datagrid-placeholder-container]': 'true' }
    }),
    __metadata("design:paramtypes", [Items])
], ClrDatagridPlaceholder);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const POPOVER_HOST_ANCHOR = new InjectionToken('POPOVER_HOST_ANCHOR');

/*
 *  Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
let SignpostIdService = class SignpostIdService {
    constructor() {
        this._id = new Subject();
    }
    setId(id) {
        this._id.next(id);
    }
    get id() {
        return this._id.asObservable();
    }
};
SignpostIdService = __decorate([
    Injectable()
], SignpostIdService);

let ClrSignpostTrigger = 
/*********
 *
 * @description
 * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
 * ClrSignpostContent.
 *
 */
class ClrSignpostTrigger {
    constructor(ifOpenService, renderer, el, commonStrings, signpostIdService, platformId) {
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        this.signpostIdService = signpostIdService;
        this.platformId = platformId;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, 'active');
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, 'active');
                if (isPlatformBrowser(this.platformId)) {
                    this.el.nativeElement.focus();
                }
            }
            this.ariaExpanded = isOpen;
        }), this.signpostIdService.id.subscribe(idChange => (this.ariaControl = idChange)));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    onSignpostTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
};
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ClrSignpostTrigger.prototype, "onSignpostTriggerClick", null);
ClrSignpostTrigger = __decorate([
    Directive({
        selector: '[clrSignpostTrigger]',
        host: {
            class: 'signpost-trigger',
            '[attr.aria-label]': 'commonStrings.keys.signpostToggle',
            '[attr.aria-expanded]': 'ariaExpanded',
            '[attr.aria-controls]': 'ariaControl',
        },
    })
    /*********
     *
     * @description
     * A Directive added to the ClrSignpost Trigger button that will call the ClrSignpost.toggle() function to hide/show the
     * ClrSignpostContent.
     *
     */
    ,
    __param(5, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [IfOpenService,
        Renderer2,
        ElementRef,
        ClrCommonStringsService,
        SignpostIdService,
        Object])
], ClrSignpostTrigger);

let ClrSignpost = 
/*********
 *
 * @class ClrSignpost
 *
 * @description
 * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
 * It supports the clrPosition with a 'right-middle' default.
 *
 */
class ClrSignpost {
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        /**********
         * @property useCustomTrigger
         *
         * @description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    /**********
     * @property signPostTrigger
     *
     * @description
     * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
     *
     */
    set customTrigger(trigger) {
        this.useCustomTrigger = !!trigger;
    }
};
__decorate([
    ContentChild(ClrSignpostTrigger, { static: false }),
    __metadata("design:type", ClrSignpostTrigger),
    __metadata("design:paramtypes", [ClrSignpostTrigger])
], ClrSignpost.prototype, "customTrigger", null);
ClrSignpost = __decorate([
    Component({
        selector: 'clr-signpost',
        template: `
        <ng-container *ngIf="!useCustomTrigger">
            <button
                type="button"
                class="signpost-action btn btn-small btn-link"
                clrSignpostTrigger>
                <clr-icon shape="info" [attr.title]="commonStrings.keys.info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
        host: { '[class.signpost]': 'true' },
        providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }, SignpostIdService]
    })
    /*********
     *
     * @class ClrSignpost
     *
     * @description
     * Class used to configure and control the state of a ClrSignpost and its associated ClrSignpostContent.
     * It supports the clrPosition with a 'right-middle' default.
     *
     */
    ,
    __metadata("design:paramtypes", [ClrCommonStringsService])
], ClrSignpost);

let WrappedCell = class WrappedCell {
    constructor() {
        this._dynamic = false;
    }
    ngAfterViewInit() {
        this.cellView = this.templateRef.createEmbeddedView(null);
    }
};
__decorate([
    ViewChild('cellPortal', { static: false }),
    __metadata("design:type", TemplateRef)
], WrappedCell.prototype, "templateRef", void 0);
WrappedCell = __decorate([
    Component({
        selector: 'dg-wrapped-cell',
        template: `        
        <ng-template #cellPortal>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], WrappedCell);

let ClrDatagridCell = class ClrDatagridCell {
    constructor(vcr) {
        this.vcr = vcr;
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
    }
};
__decorate([
    ContentChildren(ClrSignpost),
    __metadata("design:type", QueryList)
], ClrDatagridCell.prototype, "signpost", void 0);
ClrDatagridCell = __decorate([
    Component({
        selector: 'clr-dg-cell',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.datagrid-cell]': 'true',
            '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
            role: 'gridcell',
        }
    }),
    __metadata("design:paramtypes", [ViewContainerRef])
], ClrDatagridCell);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridDisplayMode;
(function (DatagridDisplayMode) {
    DatagridDisplayMode[DatagridDisplayMode["DISPLAY"] = 0] = "DISPLAY";
    DatagridDisplayMode[DatagridDisplayMode["CALCULATE"] = 1] = "CALCULATE";
})(DatagridDisplayMode || (DatagridDisplayMode = {}));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridRenderStep;
(function (DatagridRenderStep) {
    DatagridRenderStep[DatagridRenderStep["ALIGN_COLUMNS"] = 0] = "ALIGN_COLUMNS";
    DatagridRenderStep[DatagridRenderStep["CALCULATE_MODE_ON"] = 1] = "CALCULATE_MODE_ON";
    DatagridRenderStep[DatagridRenderStep["CALCULATE_MODE_OFF"] = 2] = "CALCULATE_MODE_OFF";
    DatagridRenderStep[DatagridRenderStep["CLEAR_WIDTHS"] = 3] = "CLEAR_WIDTHS";
    DatagridRenderStep[DatagridRenderStep["COMPUTE_COLUMN_WIDTHS"] = 4] = "COMPUTE_COLUMN_WIDTHS";
})(DatagridRenderStep || (DatagridRenderStep = {}));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DatagridRenderOrganizer = class DatagridRenderOrganizer {
    constructor() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    get renderStep() {
        return this._renderStep.asObservable();
    }
    filterRenderSteps(step) {
        return this.renderStep.pipe(filter(testStep => step === testStep));
    }
    resize() {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    }
};
DatagridRenderOrganizer = __decorate([
    Injectable()
], DatagridRenderOrganizer);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DisplayModeService = class DisplayModeService {
    constructor(renderOrganizer) {
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe(() => this._view.next(DatagridDisplayMode.CALCULATE)));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe(() => this._view.next(DatagridDisplayMode.DISPLAY)));
    }
    get view() {
        return this._view.asObservable();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
DisplayModeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DatagridRenderOrganizer])
], DisplayModeService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var SelectionType;
(function (SelectionType) {
    SelectionType[SelectionType["None"] = 0] = "None";
    SelectionType[SelectionType["Single"] = 1] = "Single";
    SelectionType[SelectionType["Multi"] = 2] = "Multi";
})(SelectionType || (SelectionType = {}));

let nbSelection = 0;
let Selection = class Selection {
    constructor(_items, _filters) {
        this._items = _items;
        this._filters = _filters;
        this.prevSelectionRefs = []; // Refs of selected items
        this._selectionType = SelectionType.None;
        /** @deprecated since 2.0, remove in 3.0 */
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
        // tslint:disable-next-line
        this.debounce = false;
        /**
         * Subscriptions to the other providers changes.
         */
        this.subscriptions = [];
        /**
         * The Observable that lets other classes subscribe to selection changes
         */
        this._change = new Subject();
        this.id = 'clr-dg-selection' + nbSelection++;
        this.subscriptions.push(this._filters.change.subscribe(() => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(updatedItems => {
            switch (this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    let newSingle;
                    const trackBy = this._items.trackBy;
                    let selectionUpdated = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (this.currentSingle && !this.prevSingleSelectionRef) {
                        if (this._items.all && this._items.trackBy) {
                            const lookup = this._items.all.findIndex(maybe => maybe === this.currentSingle);
                            this.prevSingleSelectionRef = this._items.trackBy(lookup, this.currentSingle);
                        }
                    }
                    updatedItems.forEach((item, index) => {
                        const ref = trackBy(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (this.prevSingleSelectionRef === ref) {
                            newSingle = item;
                            selectionUpdated = true;
                        }
                    });
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (this._items.smart && !newSingle) {
                        selectionUpdated = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(() => {
                        if (selectionUpdated) {
                            this.currentSingle = newSingle;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    let leftOver = this.current.slice();
                    const trackBy = this._items.trackBy;
                    let selectionUpdated = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (this.current.length > 0 && this.prevSelectionRefs.length !== this.current.length) {
                        if (this._items.all && this._items.trackBy) {
                            this.prevSelectionRefs = [];
                            this.current.forEach(item => {
                                const lookup = this._items.all.findIndex(maybe => maybe === item);
                                this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
                            });
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver.length > 0) {
                        updatedItems.forEach((item, index) => {
                            const ref = trackBy(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            const selectedIndex = this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver[selectedIndex] = item;
                                selectionUpdated = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (this._items.smart) {
                            leftOver = leftOver.filter(selected => updatedItems.indexOf(selected) > -1);
                            if (this.current.length !== leftOver.length) {
                                selectionUpdated = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(() => {
                            if (selectionUpdated) {
                                this.current = leftOver;
                            }
                        }, 0);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }));
    }
    clearSelection() {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    }
    get selectionType() {
        return this._selectionType;
    }
    set selectionType(value) {
        if (value === this.selectionType) {
            return;
        }
        this._selectionType = value;
        if (value === SelectionType.None) {
            delete this.current;
        }
        else {
            this.updateCurrent([], false);
        }
    }
    get _selectable() {
        return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
    }
    /**
     * Cleans up our subscriptions to other providers
     */
    destroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    get currentSingle() {
        return this._currentSingle;
    }
    set currentSingle(value) {
        if (value === this._currentSingle) {
            return;
        }
        this._currentSingle = value;
        if (this._items.all && this._items.trackBy && value) {
            const lookup = this._items.all.findIndex(maybe => maybe === value);
            this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
        }
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        // @TODO This can likely be removed!
        this.debounce = true;
        setTimeout(() => (this.debounce = false));
    }
    get current() {
        return this._current;
    }
    set current(value) {
        this.updateCurrent(value, true);
    }
    updateCurrent(value, emit) {
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(() => (this.debounce = false));
        }
    }
    emitChange() {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    /**
     * Checks if an item is currently selected
     */
    isSelected(item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    }
    /**
     * Selects an item
     */
    selectItem(item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            const lookup = this._items.all.findIndex(maybe => maybe === item);
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    }
    /**
     * Deselects an item
     */
    deselectItem(indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    }
    /**
     * Selects or deselects an item
     */
    setSelected(item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                const index = this.current.indexOf(item);
                if (index >= 0 && !selected) {
                    this.deselectItem(index);
                    this.emitChange();
                }
                else if (index < 0 && selected) {
                    this.selectItem(item);
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    }
    /**
     * Checks if all currently displayed items are selected
     */
    isAllSelected() {
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        const displayedItems = this._items.displayed;
        const nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        const temp = displayedItems.filter(item => this.current.indexOf(item) > -1);
        return temp.length === displayedItems.length;
    }
    /**
     * Selects or deselects all currently displayed items
     */
    toggleAll() {
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach(item => {
                const currentIndex = this.current.indexOf(item);
                if (currentIndex > -1) {
                    this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(item => {
                if (this.current.indexOf(item) < 0) {
                    this.selectItem(item);
                }
            });
        }
        this.emitChange();
    }
};
Selection = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Items, FiltersProvider])
], Selection);

let WrappedRow = class WrappedRow {
    constructor() {
        this._dynamic = false;
    }
    ngAfterViewInit() {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    }
};
__decorate([
    ViewChild('rowPortal', { static: false }),
    __metadata("design:type", TemplateRef)
], WrappedRow.prototype, "templateRef", void 0);
WrappedRow = __decorate([
    Component({
        selector: 'dg-wrapped-row',
        template: `        
        <ng-template #rowPortal>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], WrappedRow);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DatagridIfExpandService = class DatagridIfExpandService extends IfExpandService {
    constructor() {
        super(...arguments);
        this._replace = new BehaviorSubject(false);
        this._animate = new Subject();
    }
    // due to the es5 spec if the set is overridden on base class the getter must also be overridden
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    loadingStateChange(state) {
        super.loadingStateChange(state);
        if (state !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    }
    get replace() {
        return this._replace.asObservable();
    }
    setReplace(replaceValue) {
        this._replace.next(replaceValue);
    }
    get animate() {
        return this._animate.asObservable();
    }
};
DatagridIfExpandService = __decorate([
    Injectable()
], DatagridIfExpandService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbRow = 0;
let ClrDatagridRow = class ClrDatagridRow {
    constructor(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.displayMode = displayMode;
        this.vcr = vcr;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        this.expandAnimationTrigger = false;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.subscriptions = [];
        this.displayCells = false;
        nbRow++;
        this.id = 'clr-dg-row' + nbRow;
        this.radioId = 'clr-dg-row-rd' + nbRow;
        this.checkboxId = 'clr-dg-row-cb' + nbRow;
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(([expandReplaceValue, expandChangeValue]) => {
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                this.replaced = true;
                this.renderer.addClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    /**
     * Indicates if the row is selected
     */
    get selected() {
        if (this.selection.selectionType === SelectionType.None) {
            return this._selected;
        }
        else {
            return this.selection.isSelected(this.item);
        }
    }
    set selected(value) {
        if (this.selection.selectionType === SelectionType.None) {
            this._selected = value;
        }
        else {
            this.selection.setSelected(this.item, value);
        }
    }
    toggle(selected = !this.selected) {
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    }
    get expanded() {
        return this.expand.expanded;
    }
    set expanded(value) {
        this.expand.expanded = value;
    }
    toggleExpand() {
        if (this.expand.expandable) {
            this.expandAnimation.updateStartHeight();
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    ngAfterContentInit() {
        this.dgCells.changes.subscribe(() => {
            this.dgCells.forEach(cell => {
                this._scrollableCells.insert(cell._view);
            });
        });
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.displayMode.view.subscribe(viewChange => {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (let i = this._scrollableCells.length; i > 0; i--) {
                this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (let i = this._calculatedCells.length; i > 0; i--) {
                this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                this.displayCells = false;
                this.dgCells.forEach(cell => {
                    this._calculatedCells.insert(cell._view);
                });
            }
            else {
                this.displayCells = true;
                this.dgCells.forEach(cell => {
                    this._scrollableCells.insert(cell._view);
                });
            }
        }), this.expand.animate.subscribe(() => {
            this.expandAnimationTrigger = !this.expandAnimationTrigger;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    }
    get _view() {
        return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
    }
};
__decorate([
    ViewChild(ClrExpandableAnimation, { static: false }),
    __metadata("design:type", ClrExpandableAnimation)
], ClrDatagridRow.prototype, "expandAnimation", void 0);
__decorate([
    Input('clrDgItem'),
    __metadata("design:type", Object)
], ClrDatagridRow.prototype, "item", void 0);
__decorate([
    Input('clrDgSelected'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridRow.prototype, "selected", null);
__decorate([
    Output('clrDgSelectedChange'),
    __metadata("design:type", Object)
], ClrDatagridRow.prototype, "selectedChanged", void 0);
__decorate([
    Input('clrDgExpanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridRow.prototype, "expanded", null);
__decorate([
    Output('clrDgExpandedChange'),
    __metadata("design:type", Object)
], ClrDatagridRow.prototype, "expandedChange", void 0);
__decorate([
    ContentChildren(ClrDatagridCell),
    __metadata("design:type", QueryList)
], ClrDatagridRow.prototype, "dgCells", void 0);
__decorate([
    ViewChild('stickyCells', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_stickyCells", void 0);
__decorate([
    ViewChild('scrollableCells', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_scrollableCells", void 0);
__decorate([
    ViewChild('calculatedCells', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagridRow.prototype, "_calculatedCells", void 0);
ClrDatagridRow = __decorate([
    Component({
        selector: 'clr-dg-row',
        template: "<!--\n  We need to wrap the #rowContent in label element if we are in rowSelectionMode.\n  Clicking of that wrapper label will equate to clicking on the whole row, which triggers the checkbox to toggle.\n-->\n<label class=\"datagrid-row-clickable\" *ngIf=\"selection.rowSelectionMode\">\n  <clr-expandable-animation [clrExpandTrigger]=\"expandAnimationTrigger\" *ngIf=\"expand.expandable\">\n    <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n  </clr-expandable-animation>\n  <ng-template [ngTemplateOutlet]=\"rowContent\" *ngIf=\"!expand.expandable\"></ng-template>\n</label>\n\n<clr-expandable-animation *ngIf=\"!selection.rowSelectionMode && expand.expandable\" [clrExpandTrigger]=\"expandAnimationTrigger\">\n  <ng-template [ngTemplateOutlet]=\"rowContent\"></ng-template>\n</clr-expandable-animation>\n\n<ng-template *ngIf=\"!selection.rowSelectionMode && !expand.expandable\" [ngTemplateOutlet]=\"rowContent\"></ng-template>\n\n<!--\n    We need the \"project into template\" hacks because we need this in 2 different places\n    depending on whether the details replace the row or not.\n-->\n<ng-template #detail>\n  <ng-content select=\"clr-dg-row-detail\"></ng-content>\n</ng-template>\n\n<ng-template #rowContent>\n  <div role=\"row\" [id]=\"id\" class=\"datagrid-row-master datagrid-row-flex\">\n    <div class=\"datagrid-row-sticky\">\n      <!-- Sticky elements here -->\n      <ng-container #stickyCells></ng-container> <!-- placeholder for projecting other sticky cells as pinned-->\n    </div>\n    <div class=\"datagrid-row-scrollable\" [ngClass]=\"{'is-replaced': replaced && expanded}\">\n      <div class=\"datagrid-scrolling-cells\">\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <input clrCheckbox type=\"checkbox\" [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\" [id]=\"checkboxId\"\n                 [attr.aria-label]=\"commonStrings.keys.select\">\n        </div>\n        <div *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n             class=\"datagrid-select datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n            <!-- TODO: it would be better if in addition to the generic \"Select\" label, we could add aria-labelledby\n            to label the radio by the first cell in the row (typically an id or name).\n            It's pretty easy to label it with the whole row since we already have an id for it, but in most\n            cases the row is far too long to serve as a label, the screenreader reads every single cell content. -->\n            <input type=\"radio\" clrRadio [id]=\"radioId\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                   [(ngModel)]=\"selection.currentSingle\" [checked]=\"selection.currentSingle === item\"\n                   [attr.aria-label]=\"commonStrings.keys.select\">\n        </div>\n        <div *ngIf=\"rowActionService.hasActionableRow\"\n             class=\"datagrid-row-actions datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n        </div>\n        <div *ngIf=\"globalExpandable.hasExpandableRow\"\n             class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\" role=\"gridcell\">\n          <ng-container *ngIf=\"expand.expandable\">\n            <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\" class=\"datagrid-expandable-caret-button\">\n              <clr-icon shape=\"caret\"\n                        class=\"datagrid-expandable-caret-icon\"\n                        [attr.dir]=\"expand.expanded ? 'down' : 'right'\"\n                        [attr.title]=\"expand.expanded ? commonStrings.keys.collapse : commonStrings.keys.expand\"></clr-icon>\n            </button>\n            <clr-spinner *ngIf=\"expand.loading\" clrSmall>{{ commonStrings.keys.loading }}</clr-spinner>\n          </ng-container>\n        </div>\n        <ng-container #scrollableCells></ng-container>\n      </div>\n      <!-- details here when replace, re-visit when sticky container is used for pinned cells -->\n      <ng-template *ngIf=\"replaced && !expand.loading\"\n                   [ngTemplateOutlet]=\"detail\"></ng-template>\n    </div>\n    <ng-template *ngIf=\"!replaced && !expand.loading\"\n                 [ngTemplateOutlet]=\"detail\"></ng-template>\n  </div>\n</ng-template>\n\n<ng-container #calculatedCells></ng-container>\n",
        host: {
            '[class.datagrid-row]': 'true',
            '[class.datagrid-selected]': 'selected',
            '[attr.aria-owns]': 'id',
            role: 'rowgroup',
        },
        providers: [
            DatagridIfExpandService,
            { provide: IfExpandService, useExisting: DatagridIfExpandService },
            { provide: LoadingListener, useExisting: DatagridIfExpandService },
        ]
    }),
    __metadata("design:paramtypes", [Selection,
        RowActionService,
        ExpandableRowsCount,
        DatagridIfExpandService,
        DisplayModeService,
        ViewContainerRef,
        Renderer2,
        ElementRef,
        ClrCommonStringsService])
], ClrDatagridRow);

/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
let StateProvider = class StateProvider {
    constructor(filters, sort, page, debouncer) {
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map(() => this.state));
    }
    /*
       * By making this a getter, we open the possibility for a setter in the future.
       * It's been requested a couple times.
       */
    get state() {
        const state = {};
        if (this.page.size > 0) {
            state.page = {
                from: this.page.firstItem,
                to: this.page.lastItem,
                size: this.page.size,
                current: this.page.current,
            };
        }
        if (this.sort.comparator) {
            if (this.sort.comparator instanceof DatagridPropertyComparator) {
                /*
                         * Special case for the default object property comparator,
                         * we give the property name instead of the actual comparator.
                         */
                state.sort = { by: this.sort.comparator.prop, reverse: this.sort.reverse };
            }
            else {
                state.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
            }
        }
        const activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state.filters = [];
            for (const filter of activeFilters) {
                if (filter.state) {
                    state.filters.push(filter.state);
                }
                else {
                    state.filters.push(filter);
                }
            }
        }
        return state;
    }
};
StateProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FiltersProvider,
        Sort,
        Page,
        StateDebouncer])
], StateProvider);

/**
 * @description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
let TableSizeService = class TableSizeService {
    constructor(platformId) {
        this.platformId = platformId;
    }
    get tableRef() {
        return this._tableRef;
    }
    set tableRef(element) {
        this._tableRef = element;
    }
    set table(table) {
        if (isPlatformBrowser(this.platformId) && table.nativeElement) {
            this.tableRef = table.nativeElement.querySelector('.datagrid-table');
        }
    }
    // Used when resizing columns to show the column border being dragged.
    getColumnDragHeight() {
        if (!this.tableRef) {
            return;
        }
        return `${this.tableRef.clientHeight}px`;
    }
};
TableSizeService = __decorate([
    Injectable(),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object])
], TableSizeService);

let ColumnsService = class ColumnsService {
    constructor() {
        this.columns = [];
    }
    get columnStates() {
        return this.columns.map(column => column.value);
    }
    get hasHideableColumns() {
        return this.columnStates.filter(state => state.hideable).length > 0;
    }
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    emitStateChangeAt(columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        this.emitStateChange(this.columns[columnIndex], diff);
    }
    emitStateChange(column, diff) {
        const current = column.value;
        column.next(Object.assign({}, current, diff));
    }
};
ColumnsService = __decorate([
    Injectable()
], ColumnsService);

let ClrDatagrid = class ClrDatagrid {
    constructor(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, page, commonStrings) {
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.displayMode = displayMode;
        this.renderer = renderer;
        this.el = el;
        this.page = page;
        this.commonStrings = commonStrings;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        this.clrDgSingleSelectionAriaLabel = this.commonStrings.keys.singleSelectionAriaLabel;
        this.clrDgSingleActionableAriaLabel = this.commonStrings.keys.singleActionableAriaLabel;
        this.clrDetailExpandableAriaLabel = this.commonStrings.keys.detailExpandableAriaLabel;
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    /**
     * Freezes the datagrid while data is loading
     */
    get loading() {
        return this.items.loading;
    }
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.updateCurrent(value, false);
    }
    /**
     * Selected item in single-select mode
     */
    set singleSelected(value) {
        this.selection.selectionType = SelectionType.Single;
        // the clrDgSingleSelected is updated in one of two cases:
        // 1. an explicit value is passed
        // 2. is being set to null or undefined, where previously it had a value
        if (value) {
            this.selection.currentSingle = value;
        }
        else if (this.selection.currentSingle) {
            this.selection.currentSingle = null;
        }
    }
    /**
     * @deprecated since 2.0, remove in 3.0
     *
     * Selection/Deselection on row click mode
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param value
     */
    set allSelected(value) {
        /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
        this.selection.toggleAll();
    }
    ngAfterContentInit() {
        if (!this.items.smart) {
            this.items.all = this.rows.map((row) => row.item);
        }
        this._subscriptions.push(this.rows.changes.subscribe(() => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((row) => row.item);
            }
            this.rows.forEach(row => {
                this._displayedRows.insert(row._view);
            });
        }));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(state => this.refresh.emit(state)), this.selection.change.subscribe(s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit(s);
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit(s);
            }
        }), this.page.change.subscribe(() => {
            this.datagridTable.nativeElement.focus();
        }), 
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe(viewChange => {
            // Remove any projected columns from the projectedDisplayColumns container
            for (let i = this._projectedDisplayColumns.length; i > 0; i--) {
                this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (let i = this._projectedCalculationColumns.length; i > 0; i--) {
                this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (let i = this._calculationRows.length; i > 0; i--) {
                this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (let i = this._displayedRows.length; i > 0; i--) {
                this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                this.renderer.removeClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedDisplayColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._displayedRows.insert(row._view);
                });
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                this.renderer.addClass(this.el.nativeElement, 'datagrid-calculate-mode');
                this.columns.forEach(column => {
                    this._projectedCalculationColumns.insert(column._view);
                });
                this.rows.forEach(row => {
                    this._calculationRows.insert(row._view);
                });
            }
        }));
    }
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
    resize() {
        this.organizer.resize();
    }
};
__decorate([
    Input('clrDgLoading'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "loading", null);
__decorate([
    Output('clrDgRefresh'),
    __metadata("design:type", Object)
], ClrDatagrid.prototype, "refresh", void 0);
__decorate([
    ContentChild(ClrDatagridItems, { static: false }),
    __metadata("design:type", ClrDatagridItems)
], ClrDatagrid.prototype, "iterator", void 0);
__decorate([
    Input('clrDgSelected'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], ClrDatagrid.prototype, "selected", null);
__decorate([
    Output('clrDgSelectedChange'),
    __metadata("design:type", Object)
], ClrDatagrid.prototype, "selectedChanged", void 0);
__decorate([
    Input('clrDgSingleSelected'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagrid.prototype, "singleSelected", null);
__decorate([
    Output('clrDgSingleSelectedChange'),
    __metadata("design:type", Object)
], ClrDatagrid.prototype, "singleSelectedChanged", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ClrDatagrid.prototype, "clrDgSingleSelectionAriaLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ClrDatagrid.prototype, "clrDgSingleActionableAriaLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ClrDatagrid.prototype, "clrDetailExpandableAriaLabel", void 0);
__decorate([
    Input('clrDgRowSelection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagrid.prototype, "rowSelectionMode", null);
__decorate([
    ContentChild(ClrDatagridPlaceholder, { static: false }),
    __metadata("design:type", ClrDatagridPlaceholder)
], ClrDatagrid.prototype, "placeholder", void 0);
__decorate([
    ContentChildren(ClrDatagridColumn),
    __metadata("design:type", QueryList)
], ClrDatagrid.prototype, "columns", void 0);
__decorate([
    ContentChildren(ClrDatagridRow),
    __metadata("design:type", QueryList)
], ClrDatagrid.prototype, "rows", void 0);
__decorate([
    ViewChild('scrollableColumns', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "scrollableColumns", void 0);
__decorate([
    ViewChild('datagridTable', { static: false, read: ElementRef }),
    __metadata("design:type", ElementRef)
], ClrDatagrid.prototype, "datagridTable", void 0);
__decorate([
    ViewChild('projectedDisplayColumns', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedDisplayColumns", void 0);
__decorate([
    ViewChild('projectedCalculationColumns', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_projectedCalculationColumns", void 0);
__decorate([
    ViewChild('displayedRows', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_displayedRows", void 0);
__decorate([
    ViewChild('calculationRows', { static: false, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], ClrDatagrid.prototype, "_calculationRows", void 0);
ClrDatagrid = __decorate([
    Component({
        selector: 'clr-datagrid',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<ng-content select=\"clr-dg-action-bar\"></ng-content>\n<div class=\"datagrid\" #datagrid>\n    <div class=\"datagrid-table-wrapper\">\n      <div role=\"grid\" class=\"datagrid-table\" tabindex=\"-1\" #datagridTable>\n        <div role=\"rowgroup\" class=\"datagrid-header\">\n          <div role=\"row\" class=\"datagrid-row\">\n            <div class=\"datagrid-row-master datagrid-row-flex\">\n              <div class=\"datagrid-row-sticky\">\n                <!-- Sticky elements here -->\n              </div>\n              <div class=\"datagrid-row-scrollable\">\n                <!--header for datagrid where you can select multiple rows -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                            <span class=\"datagrid-column-title\">\n                                <input clrCheckbox type=\"checkbox\" [(ngModel)]=\"allSelected\"\n                                       [attr.aria-label]=\"commonStrings.keys.selectAll\">\n                            </span>\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for datagrid where you can select one row only -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                     *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\" [attr.aria-label]=\"clrDgSingleSelectionAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for single row action; only displayType if we have at least one actionable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                     *ngIf=\"rowActionService.hasActionableRow\" [attr.aria-label]=\"clrDgSingleActionableAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <!-- header for carets; only displayType if we have at least one expandable row in datagrid -->\n                <div role=\"columnheader\" class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                     *ngIf=\"expandableRows.hasExpandableRow\" [attr.aria-label]=\"clrDetailExpandableAriaLabel\">\n                  <div class=\"datagrid-column-separator\"></div>\n                </div>\n                <ng-container #projectedDisplayColumns></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n        <ng-container #displayedRows></ng-container>\n        <!-- Custom placeholder overrides the default empty one -->\n        <ng-content select=\"clr-dg-placeholder\"></ng-content>\n        <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n      </div>\n    </div>\n</div>\n<ng-content select=\"clr-dg-footer\"></ng-content>\n<div class=\"datagrid-spinner\" *ngIf=\"loading\">\n    <clr-spinner clrMedium>Loading</clr-spinner>\n</div>\n\n<div class=\"datagrid-calculation-table\">\n    <div class=\"datagrid-calculation-header\">\n        <ng-container #projectedCalculationColumns></ng-container>\n    </div>\n    <ng-container #calculationRows></ng-container>\n</div>\n",
        providers: [
            Selection,
            Sort,
            FiltersProvider,
            Page,
            Items,
            DatagridRenderOrganizer,
            RowActionService,
            ExpandableRowsCount,
            StateDebouncer,
            StateProvider,
            TableSizeService,
            ColumnsService,
            DisplayModeService,
        ],
        host: { '[class.datagrid-host]': 'true' }
    }),
    __metadata("design:paramtypes", [DatagridRenderOrganizer,
        Items,
        ExpandableRowsCount,
        Selection,
        RowActionService,
        StateProvider,
        DisplayModeService,
        Renderer2,
        ElementRef,
        Page,
        ClrCommonStringsService])
], ClrDatagrid);

let ClrDatagridActionBar = class ClrDatagridActionBar {
};
ClrDatagridActionBar = __decorate([
    Component({
        selector: 'clr-dg-action-bar',
        template: `
        <ng-content></ng-content>
    `,
        host: { '[class.datagrid-action-bar]': 'true' }
    })
], ClrDatagridActionBar);

let clrDgActionId = 0;
let ClrDatagridActionOverflow = class ClrDatagridActionOverflow {
    constructor(rowActionService, commonStrings, platformId, zone, smartToggleService, popoverId) {
        this.rowActionService = rowActionService;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.zone = zone;
        this.smartToggleService = smartToggleService;
        this.popoverId = popoverId;
        this.subscriptions = [];
        this.smartPosition = {
            axis: ClrAxis.HORIZONTAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.CENTER,
            content: ClrAlignment.CENTER,
        };
        this.openChange = new EventEmitter(false);
        this.rowActionService.register();
        this.subscriptions.push(this.smartToggleService.openChange.subscribe(openState => {
            this.open = openState;
            if (openState) {
                this.focusFirstButton();
            }
        }));
        this.popoverId = 'clr-action-menu' + clrDgActionId++;
    }
    ngOnDestroy() {
        this.rowActionService.unregister();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    get open() {
        return this.smartToggleService.open;
    }
    focusFirstButton() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    const firstButton = document.querySelector('button.action-item');
                    if (firstButton) {
                        firstButton.focus();
                    }
                });
            });
        }
    }
    set open(open) {
        if (!!open !== this.smartToggleService.open) {
            // prevents chocolate mess
            this.smartToggleService.open = !!open;
            this.openChange.emit(!!open);
        }
    }
};
__decorate([
    Input('clrDgActionOverflowOpen'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridActionOverflow.prototype, "open", null);
__decorate([
    Output('clrDgActionOverflowOpenChange'),
    __metadata("design:type", Object)
], ClrDatagridActionOverflow.prototype, "openChange", void 0);
ClrDatagridActionOverflow = __decorate([
    Component({
        selector: 'clr-dg-action-overflow',
        providers: [UNIQUE_ID_PROVIDER, ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
        template: `
      <button class="datagrid-action-toggle"
              type="button"
              role="button"
              aria-haspopup="true"
              #anchor
              [attr.aria-controls]="popoverId"
              [attr.aria-expanded]="open"
              [attr.aria-label]="commonStrings.keys.rowActions"
              clrPopoverAnchor
              clrPopoverOpenCloseButton>
          <clr-icon shape="ellipsis-vertical" [attr.title]="commonStrings.keys.rowActions"></clr-icon>
      </button>

      <div class="datagrid-action-overflow"
           role="menu" 
           [id]="popoverId"
           [attr.aria-hidden]="!open"
           [attr.id]="popoverId" 
           clrFocusTrap
           *clrPopoverContent="open at smartPosition; outsideClickToClose: true; scrollToClose: true">
          <ng-content></ng-content>
      </div>
  `
    }),
    __param(2, Inject(PLATFORM_ID)),
    __param(5, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [RowActionService,
        ClrCommonStringsService,
        Object,
        NgZone,
        ClrPopoverToggleService, String])
], ClrDatagridActionOverflow);

const MIN_COLUMN_WIDTH = 96;
// This service allows DatagridHeaderRenderer and ClrDatagridColumnSeparator
// to share column resize data with each other.
let ColumnResizerService = class ColumnResizerService {
    constructor(el, domAdapter, organizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.organizer = organizer;
        this._resizedBy = 0;
    }
    get resizedBy() {
        return this._resizedBy;
    }
    get minColumnWidth() {
        return this.domAdapter.minWidth(this.el.nativeElement) || MIN_COLUMN_WIDTH;
    }
    get maxResizeRange() {
        return this.widthBeforeResize - this.minColumnWidth;
    }
    startResize() {
        this._resizedBy = 0;
        this.isWithinMaxResizeRange = true;
        this.widthBeforeResize = this.domAdapter.clientRect(this.el.nativeElement).width;
    }
    endResize() {
        this.organizer.resize();
    }
    get widthAfterResize() {
        return this.widthBeforeResize + this._resizedBy;
    }
    calculateResize(event) {
        const moveX = event.dragPosition.moveX;
        // returns the resize amount within the allowed range
        if (moveX < -this.maxResizeRange) {
            this._resizedBy = -this.maxResizeRange;
            this.isWithinMaxResizeRange = false;
        }
        else {
            this._resizedBy = moveX;
            this.isWithinMaxResizeRange = true;
        }
    }
};
ColumnResizerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ElementRef, DomAdapter, DatagridRenderOrganizer])
], ColumnResizerService);

let ClrDatagridColumnSeparator = class ClrDatagridColumnSeparator {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    constructor(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
        this.columnResizerService = columnResizerService;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.document = document;
        this.columnSeparatorId = columnSeparatorId;
    }
    showTracker(resizeTrackerEl) {
        this.columnResizerService.startResize();
        const tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    }
    moveTracker(event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(${this.columnResizerService.resizedBy}px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    }
    hideTracker(resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', `translateX(0px)`);
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    }
    redFlagTracker(resizeTrackerEl) {
        let isWithinMaxResizeRange;
        // @TODO(JEREMY) Review this, it will always be true because above is always null
        if (isWithinMaxResizeRange !== this.columnResizerService.isWithinMaxResizeRange) {
            isWithinMaxResizeRange = this.columnResizerService.isWithinMaxResizeRange;
            if (!isWithinMaxResizeRange) {
                this.renderer.addClass(resizeTrackerEl, 'exceeded-max');
            }
            else {
                this.renderer.removeClass(resizeTrackerEl, 'exceeded-max');
            }
        }
    }
};
ClrDatagridColumnSeparator = __decorate([
    Component({
        selector: 'clr-dg-column-separator',
        template: `
    <div class="datagrid-column-handle" aria-hidden="true"
      clrDraggable 
      [clrGroup]="columnSeparatorId" 
      (clrDragStart)="showTracker(resizeTrackerEl)" 
      (clrDragMove)="moveTracker($event, resizeTrackerEl)" 
      (clrDragEnd)="hideTracker(resizeTrackerEl)"></div>
    <div class="datagrid-column-resize-tracker" #resizeTrackerEl></div>
    `,
        host: {
            '[class.datagrid-column-separator]': 'true',
        },
        providers: [UNIQUE_ID_PROVIDER]
    }),
    __param(3, Inject(DOCUMENT)),
    __param(4, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [ColumnResizerService,
        Renderer2,
        TableSizeService, Object, String])
], ClrDatagridColumnSeparator);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridColumnChanges;
(function (DatagridColumnChanges) {
    DatagridColumnChanges[DatagridColumnChanges["WIDTH"] = 0] = "WIDTH";
    DatagridColumnChanges[DatagridColumnChanges["HIDDEN"] = 1] = "HIDDEN";
})(DatagridColumnChanges || (DatagridColumnChanges = {}));
const ɵ1 = key => DatagridColumnChanges[key], ɵ0 = key => key === parseInt(key, 10);
const ALL_COLUMN_CHANGES = Object.keys(DatagridColumnChanges)
    .map(ɵ1)
    .filter(ɵ0); // extracts only integer keys

let ClrDatagridColumnToggleTitle = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggleTitle {
};
ClrDatagridColumnToggleTitle = __decorate([
    Component({
        selector: 'clr-dg-column-toggle-title',
        template: `<ng-content></ng-content>`
    })
    /** @deprecated since 2.0, remove in 3.0 */
], ClrDatagridColumnToggleTitle);

let ClrDatagridColumnToggleButton = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggleButton {
    constructor(columnsService) {
        this.columnsService = columnsService;
        this.allSelected = new EventEmitter();
    }
    get clrAllSelected() {
        return this.allSelected.asObservable();
    }
    hideableColumns() {
        return this.columnsService.columns.filter(column => column.value.hideable);
    }
    get allHideablesVisible() {
        return this.hideableColumns().filter(column => column.value.hidden).length === 0;
    }
    selectAll() {
        this.hideableColumns().forEach(hideableColumn => this.columnsService.emitStateChange(hideableColumn, {
            hidden: false,
            changes: [DatagridColumnChanges.HIDDEN],
        }));
        this.allSelected.next(true);
    }
};
__decorate([
    Output('clrAllSelected'),
    __metadata("design:type", Observable),
    __metadata("design:paramtypes", [])
], ClrDatagridColumnToggleButton.prototype, "clrAllSelected", null);
ClrDatagridColumnToggleButton = __decorate([
    Component({
        selector: 'clr-dg-column-toggle-button',
        template: `
    <button class="btn btn-sm btn-link switch-button"
            (click)="selectAll()"
            [disabled]="allHideablesVisible"
            type="button">
      <ng-content></ng-content>
    </button>
  `
    })
    /** @deprecated since 2.0, remove in 3.0 */
    ,
    __metadata("design:paramtypes", [ColumnsService])
], ClrDatagridColumnToggleButton);

let ClrDatagridColumnToggle = 
/** @deprecated since 2.0, remove in 3.0 */
class ClrDatagridColumnToggle {
    constructor(commonStrings, columnsService, columnSwitchId, platformId, zone, popoverId) {
        this.commonStrings = commonStrings;
        this.columnsService = columnsService;
        this.columnSwitchId = columnSwitchId;
        this.platformId = platformId;
        this.zone = zone;
        this.popoverId = popoverId;
        // Smart Popover
        this.smartPosition = {
            axis: ClrAxis.VERTICAL,
            side: ClrSide.BEFORE,
            anchor: ClrAlignment.START,
            content: ClrAlignment.START,
        };
    }
    get allColumnsVisible() {
        return this._allColumnsVisible;
    }
    set allColumnsVisible(value) {
        this._allColumnsVisible = value;
    }
    get hideableColumnStates() {
        const hideables = this.columnsService.columns.filter(column => column.value.hideable);
        return hideables.map(column => column.value);
    }
    get hasOnlyOneVisibleColumn() {
        const nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
        // this should only return true when there is no non-hideable columns.
        return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter(columnState => !columnState.hidden).length === 1);
    }
    toggleColumnState(columnState, event) {
        const columnToToggle = this.columnsService.columns.filter(column => column.value === columnState)[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    toggleSwitchPanel() {
        this.openState = !this.openState;
        if (this.openState && isPlatformBrowser(this.platformId) && this.menuDescriptionElement) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.menuDescriptionElement.nativeElement.focus();
                });
            });
        }
    }
    allColumnsSelected() {
        this.allSelectedElement.nativeElement.focus();
    }
    // Without tracking the checkboxes get rerendered on model update, which leads
    // to loss of focus after checkbox toggle.
    trackByFn(index) {
        return index;
    }
};
__decorate([
    ContentChild(ClrDatagridColumnToggleTitle, { static: false }),
    __metadata("design:type", ClrDatagridColumnToggleTitle)
], ClrDatagridColumnToggle.prototype, "customToggleTitle", void 0);
__decorate([
    ContentChild(ClrDatagridColumnToggleButton, { static: false }),
    __metadata("design:type", ClrDatagridColumnToggleButton)
], ClrDatagridColumnToggle.prototype, "customToggleButton", void 0);
__decorate([
    ViewChild('menuDescription', { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], ClrDatagridColumnToggle.prototype, "menuDescriptionElement", void 0);
__decorate([
    ViewChild('allSelected', { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], ClrDatagridColumnToggle.prototype, "allSelectedElement", void 0);
ClrDatagridColumnToggle = __decorate([
    Component({
        selector: 'clr-dg-column-toggle',
        template: `    
      <button
              role="button"
              type="button"
              class="btn btn-sm btn-link column-toggle--action"
              clrPopoverAnchor
              clrPopoverOpenCloseButton
              [attr.aria-controls]="popoverId"
              [attr.aria-owns]="popoverId">
          <clr-icon shape="view-columns" [attr.title]="commonStrings.keys.pickColumns"></clr-icon>
      </button>
      <div class="column-switch"
           role="dialog"
           [id]="popoverId"
           clrFocusTrap
           *clrPopoverContent="openState at smartPosition; outsideClickToClose: true; scrollToClose: true">
          <div class="switch-header">
              <div class="clr-sr-only" tabindex="-1" #menuDescription>{{commonStrings.keys.showColumnsMenuDescription}}</div>
              <div class="clr-sr-only" tabindex="-1" #allSelected>{{commonStrings.keys.allColumnsSelected}}</div>
              <ng-container *ngIf="!customToggleTitle">{{commonStrings.keys.showColumns}}</ng-container>
              <ng-content select="clr-dg-column-toggle-title"></ng-content>
              <button class="btn btn-sm btn-link toggle-switch-close-button"
                      clrPopoverCloseButton
                      type="button"
                      [attr.aria-label]="commonStrings.keys.close">
                  <clr-icon shape="close" 
                            [attr.title]="commonStrings.keys.close"></clr-icon>
              </button>
          </div>
          <ul class="switch-content list-unstyled">
              <li *ngFor="let columnState of hideableColumnStates;trackBy: trackByFn">
                  <clr-checkbox-wrapper>
                      <input clrCheckbox type="checkbox"
                             [disabled]="hasOnlyOneVisibleColumn && !columnState.hidden"
                             [ngModel]="!columnState.hidden"
                             (ngModelChange)="toggleColumnState(columnState, !$event)">
                      <label>
                          <ng-template [ngTemplateOutlet]="columnState.titleTemplateRef"></ng-template>
                      </label>
                  </clr-checkbox-wrapper>
              </li>
          </ul>
          <div class="switch-footer">
              <ng-content select="clr-dg-column-toggle-button"></ng-content>
              <clr-dg-column-toggle-button *ngIf="!customToggleButton" (clrAllSelected)="allColumnsSelected()">
                  {{commonStrings.keys.selectAll}}
              </clr-dg-column-toggle-button>
          </div>
      </div>
  `,
        host: { '[class.column-switch-wrapper]': 'true', '[class.active]': 'openState' },
        providers: [UNIQUE_ID_PROVIDER, ClrPopoverEventsService, ClrPopoverPositionService, ClrPopoverToggleService]
    })
    /** @deprecated since 2.0, remove in 3.0 */
    ,
    __param(2, Inject(UNIQUE_ID)),
    __param(3, Inject(PLATFORM_ID)),
    __param(5, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [ClrCommonStringsService,
        ColumnsService, String, Object,
        NgZone, String])
], ClrDatagridColumnToggle);

/*
 * I don't think this deserves to be in IfExpanded itself,
 * so I'm adding a second directive on the same selector for now just for the datagrid
 */
let DatagridDetailRegisterer = class DatagridDetailRegisterer {
    constructor(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    ngOnDestroy() {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    }
};
DatagridDetailRegisterer = __decorate([
    Directive({ selector: '[clrIfExpanded]' }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [ExpandableRowsCount])
], DatagridDetailRegisterer);

let ClrDatagridFooter = class ClrDatagridFooter {
    constructor(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    get hasHideableColumns() {
        return this.columnsService.hasHideableColumns;
    }
};
__decorate([
    ContentChild(ClrDatagridColumnToggle, { static: false }),
    __metadata("design:type", ClrDatagridColumnToggle)
], ClrDatagridFooter.prototype, "toggle", void 0);
ClrDatagridFooter = __decorate([
    Component({
        selector: 'clr-dg-footer',
        template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
          <div class="clr-form-control-disabled">
              <clr-checkbox-wrapper class="datagrid-footer-select">
                <input clrCheckbox type="checkbox" checked="checked" disabled>
                <label>{{selection.current.length}}</label>
            </clr-checkbox-wrapper>
          </div>
        </ng-container>
        <ng-content select="clr-dg-column-toggle"></ng-content>
        <clr-dg-column-toggle *ngIf="hasHideableColumns && !toggle"></clr-dg-column-toggle>
        <div class="datagrid-footer-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
        host: {
            '[class.datagrid-footer]': 'true',
        }
    }),
    __metadata("design:paramtypes", [Selection, ColumnsService])
], ClrDatagridFooter);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const COLUMN_STATE = new InjectionToken('COLUMN_STATE');
function columnStateFactory() {
    return new BehaviorSubject({
        changes: [],
    });
}
const COLUMN_STATE_PROVIDER = {
    provide: COLUMN_STATE,
    useFactory: columnStateFactory,
};

let ClrDatagridHideableColumn = 
/**
 *
 * @description
 * A structural directive meant to be used inside a clr-dg-column component.
 *
 * <clr-dg-column>
 *       <ng-container *clrDgHideableColumn="{ hidden: true }">
 *           User ID
 *       </ng-container>
 *   </clr-dg-column>
 *
 * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
 * datagrid toggle component.
 *
 */
class ClrDatagridHideableColumn {
    constructor(titleTemplateRef, viewContainerRef, columnsService, columnState) {
        this.titleTemplateRef = titleTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.hiddenChange = new EventEmitter();
        this.subscriptions = [];
        this.viewContainerRef.createEmbeddedView(this.titleTemplateRef);
        if (!this.columnState) {
            throw new Error('The *clrDgHideableColumn directive can only be used inside of a clr-dg-column component.');
        }
    }
    /**
     *
     * @description
     * Setter fn for the @Input with the same name as this structural directive.
     * It allows the user to pre-configure the column's hide/show state. { hidden: true }
     * It's more verbose but has more Clarity.
     *
     *
     * @example
     * *clrDgHideableColumn
     * *clrDgHideableColumn={hidden: false}
     * *clrDgHideableColumn={hidden: true}
     *
     */
    set clrDgHideableColumn(value) {
        this.clrDgHidden = value && value.hidden ? value.hidden : false;
    }
    set clrDgHidden(hidden) {
        this._hidden = hidden ? hidden : false;
        this.columnsService.emitStateChange(this.columnState, {
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    }
    ngOnInit() {
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe((state) => {
            if (state.changes && state.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                this.hiddenChange.emit(state.hidden); // Can emit through @Output when desugared syntax is used
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Input('clrDgHideableColumn'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", null);
__decorate([
    Input('clrDgHidden'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridHideableColumn.prototype, "clrDgHidden", null);
__decorate([
    Output('clrDgHiddenChange'),
    __metadata("design:type", Object)
], ClrDatagridHideableColumn.prototype, "hiddenChange", void 0);
ClrDatagridHideableColumn = __decorate([
    Directive({ selector: '[clrDgHideableColumn]' })
    /**
     *
     * @description
     * A structural directive meant to be used inside a clr-dg-column component.
     *
     * <clr-dg-column>
     *       <ng-container *clrDgHideableColumn="{ hidden: true }">
     *           User ID
     *       </ng-container>
     *   </clr-dg-column>
     *
     * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
     * datagrid toggle component.
     *
     */
    ,
    __param(3, Optional()),
    __param(3, Inject(COLUMN_STATE)),
    __metadata("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        ColumnsService,
        BehaviorSubject])
], ClrDatagridHideableColumn);

let ClrDatagridItemsTrackBy = class ClrDatagridItemsTrackBy {
    constructor(_items) {
        this._items = _items;
    }
    set trackBy(value) {
        if (this._items) {
            this._items.trackBy = value;
        }
    }
};
__decorate([
    Input('ngForTrackBy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function])
], ClrDatagridItemsTrackBy.prototype, "trackBy", null);
ClrDatagridItemsTrackBy = __decorate([
    Directive({
        selector: '[ngForTrackBy]',
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [Items])
], ClrDatagridItemsTrackBy);

let ClrDatagridPageSize = class ClrDatagridPageSize {
    constructor(page) {
        this.page = page;
    }
    ngOnInit() {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    }
};
__decorate([
    Input('clrPageSizeOptions'),
    __metadata("design:type", Array)
], ClrDatagridPageSize.prototype, "pageSizeOptions", void 0);
ClrDatagridPageSize = __decorate([
    Component({
        selector: 'clr-dg-page-size',
        template: `
    <ng-content></ng-content>
    <div class="clr-select-wrapper">
      <select [class.clr-page-size-select]="true" [(ngModel)]="page.size">
        <option *ngFor="let option of pageSizeOptions" [ngValue]="option">{{option}}</option>
      </select>
    </div>
  `
    }),
    __metadata("design:paramtypes", [Page])
], ClrDatagridPageSize);

let ClrDatagridPagination = class ClrDatagridPagination {
    constructor(page, commonStrings) {
        this.page = page;
        this.commonStrings = commonStrings;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    ngOnInit() {
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe(current => this.currentChanged.emit(current));
    }
    ngOnDestroy() {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    }
    /**
     * Page size
     */
    get pageSize() {
        return this.page.size;
    }
    set pageSize(size) {
        if (typeof size === 'number') {
            this.page.size = size;
        }
    }
    /**
     * Total items (needed to guess the last page)
     */
    get totalItems() {
        return this.page.totalItems;
    }
    set totalItems(total) {
        if (typeof total === 'number') {
            this.page.totalItems = total;
        }
    }
    /**
     * Last page
     */
    get lastPage() {
        return this.page.last;
    }
    set lastPage(last) {
        if (typeof last === 'number') {
            this.page.last = last;
        }
    }
    /**
     * Current page
     */
    get currentPage() {
        return this.page.current;
    }
    set currentPage(page) {
        if (typeof page === 'number') {
            this.page.current = page;
        }
    }
    /**
     * Moves to the previous page if it exists
     */
    previous() {
        this.page.previous();
    }
    /**
     * Moves to the next page if it exists
     */
    next() {
        this.page.next();
    }
    /**
     * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
     */
    get firstItem() {
        return this.page.firstItem;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
     */
    get lastItem() {
        return this.page.lastItem;
    }
    /**
     * Conditionally adds page numbers before and after the current page
     */
    get middlePages() {
        const middlePages = [];
        if (this.page.current > 1) {
            middlePages.push(this.page.current - 1);
        }
        middlePages.push(this.page.current);
        if (this.page.current < this.page.last) {
            middlePages.push(this.page.current + 1);
        }
        return middlePages;
    }
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    updateCurrentPage(event) {
        const parsed = parseInt(event.target.value, 10);
        // if the input value, is not a number, we don't update the page
        if (!isNaN(parsed)) {
            if (parsed < 1) {
                this.page.current = 1;
            }
            else if (parsed > this.page.last) {
                this.page.current = this.page.last;
            }
            else {
                this.page.current = parsed;
            }
        }
        /**
         * Set the input's value to the new current page. This is needed because the code
         * above may have changed the value from what the user entered in.
         */
        this.currentPageInputRef.nativeElement.value = this.page.current;
    }
};
__decorate([
    ContentChild(ClrDatagridPageSize, { static: false }),
    __metadata("design:type", ClrDatagridPageSize)
], ClrDatagridPagination.prototype, "_pageSizeComponent", void 0);
__decorate([
    ViewChild('currentPageInput', { static: false }),
    __metadata("design:type", ElementRef)
], ClrDatagridPagination.prototype, "currentPageInputRef", void 0);
__decorate([
    Input('clrDgPageSize'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrDatagridPagination.prototype, "pageSize", null);
__decorate([
    Input('clrDgTotalItems'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrDatagridPagination.prototype, "totalItems", null);
__decorate([
    Input('clrDgLastPage'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrDatagridPagination.prototype, "lastPage", null);
__decorate([
    Input('clrDgPage'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrDatagridPagination.prototype, "currentPage", null);
__decorate([
    Output('clrDgPageChange'),
    __metadata("design:type", Object)
], ClrDatagridPagination.prototype, "currentChanged", void 0);
ClrDatagridPagination = __decorate([
    Component({
        selector: 'clr-dg-pagination',
        template: `
    <div class="pagination-size" *ngIf="_pageSizeComponent">
      <ng-content select="clr-dg-page-size"></ng-content>
    </div>
    <div class="pagination-description">
      <ng-content></ng-content>
    </div>
    <div class="pagination-list" *ngIf="page.last > 1">
      <button
        type="button" 
        class="pagination-first" 
        [disabled]="page.current <= 1" 
        (click)="page.current = 1"
        [attr.aria-label]="commonStrings.keys.firstPage"
        >
        <clr-icon shape="step-forward-2 down"></clr-icon>
      </button>
      <button 
        type="button"
        class="pagination-previous" 
        [disabled]="page.current <= 1" 
        (click)="page.current = page.current - 1"
        [attr.aria-label]="commonStrings.keys.previousPage"
        >
        <clr-icon shape="angle left"></clr-icon>
      </button>
      <input 
        #currentPageInput 
        type="text" 
        class="pagination-current" 
        [size]="page.last.toString().length" 
        [value]="page.current"
        (keydown.enter)="updateCurrentPage($event)" 
        (blur)="updateCurrentPage($event)"
        [attr.aria-label]="commonStrings.keys.currentPage"
        />
        &nbsp;/&nbsp;<span [attr.aria-label]="commonStrings.keys.totalPages">{{page.last}}</span>
      <button 
        type="button"
        class="pagination-next" 
        [disabled]="page.current >= page.last" 
        (click)="page.current = page.current + 1"
        [attr.aria-label]="commonStrings.keys.nextPage"
        >
        <clr-icon shape="angle right"></clr-icon>
      </button>
      <button 
        type="button" 
        class="pagination-last" 
        [disabled]="page.current >= page.last" 
        (click)="page.current = page.last"
        [attr.aria-label]="commonStrings.keys.lastPage"
        >
        <clr-icon shape="step-forward-2 up"></clr-icon>
      </button>
    </div>
    `,
        host: { '[class.pagination]': 'true' }
    }),
    __metadata("design:paramtypes", [Page, ClrCommonStringsService])
], ClrDatagridPagination);

/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
let ClrDatagridRowDetail = class ClrDatagridRowDetail {
    constructor(selection, rowActionService, expand, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    set replace(value) {
        this.expand.setReplace(!!value);
    }
    ngAfterContentInit() {
        this.subscriptions.push(this.expand.replace.subscribe(replaceChange => {
            this.replacedRow = replaceChange;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    ContentChildren(ClrDatagridCell),
    __metadata("design:type", QueryList)
], ClrDatagridRowDetail.prototype, "cells", void 0);
__decorate([
    Input('clrDgReplace'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrDatagridRowDetail.prototype, "replace", null);
ClrDatagridRowDetail = __decorate([
    Component({
        selector: 'clr-dg-row-detail',
        template: `
        <ng-container *ngIf="!replacedRow">
            <!-- space for multiselection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Multi">
            </div>
            <!-- space for single selection state -->
            <div class="datagrid-cell datagrid-select datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Single">
            </div>
            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->
            <div class="datagrid-cell datagrid-row-actions datagrid-fixed-column"
                *ngIf="rowActionService.hasActionableRow">
            </div>
            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->
            <div *ngIf="expandableRows.hasExpandableRow"
                        class="datagrid-expandable-caret datagrid-fixed-column datagrid-cell">
            </div>
        </ng-container>
        <ng-content></ng-content>
    `,
        host: {
            '[class.datagrid-row-flex]': 'true',
            '[class.datagrid-row-detail]': 'true',
            '[class.datagrid-container]': 'cells.length === 0',
        }
    }),
    __metadata("design:paramtypes", [Selection,
        RowActionService,
        DatagridIfExpandService,
        ExpandableRowsCount])
], ClrDatagridRowDetail);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const STRICT_WIDTH_CLASS = 'datagrid-fixed-width';
const HIDDEN_COLUMN_CLASS = 'datagrid-hidden-column';

let DatagridCellRenderer = class DatagridCellRenderer {
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth()));
    }
    // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
    set columnState(columnState) {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
        this.runAllChanges = ALL_COLUMN_CHANGES;
        this.stateSubscription = columnState.subscribe(state => this.stateChanges(state));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }
    stateChanges(state) {
        if (this.runAllChanges) {
            state.changes = this.runAllChanges;
            delete this.runAllChanges;
        }
        if (state.changes && state.changes.length) {
            state.changes.forEach(change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    clearWidth() {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    }
    setWidth(state) {
        if (state.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
    }
    setHidden(state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
};
DatagridCellRenderer = __decorate([
    Directive({ selector: 'clr-dg-cell' }),
    __metadata("design:paramtypes", [ElementRef, Renderer2, DatagridRenderOrganizer])
], DatagridCellRenderer);

let DatagridHeaderRenderer = class DatagridHeaderRenderer {
    constructor(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizerService = columnResizerService;
        this.columnsService = columnsService;
        this.columnState = columnState;
        this.resizeEmitter = new EventEmitter();
        /**
         * Indicates if the column has a strict width, so it doesn't shrink or expand based on the content.
         */
        this.widthSet = false;
        this.autoSet = false;
        this.subscriptions = [];
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(() => this.clearWidth()));
        this.subscriptions.push(columnState.subscribe(state => this.stateChanges(state)));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    stateChanges(state) {
        if (state.changes && state.changes.length) {
            state.changes.forEach(change => {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        this.setHidden(state);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    }
    detectStrictWidth() {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    computeWidth(strictWidth) {
        let width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    getColumnWidthState() {
        const strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    }
    setColumnState(index) {
        this.columnsService.columns[index] = this.columnState;
    }
    setWidth(state) {
        if (state.strictWidth) {
            if (this.columnResizerService.resizedBy) {
                this.resizeEmitter.emit(state.width);
                this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
                this.widthSet = false;
            }
            // Don't set width if there is a user-defined one. Just add the strict width class.
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.autoSet = false;
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
            this.widthSet = true;
            this.autoSet = true;
        }
    }
    setHidden(state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    }
};
__decorate([
    Output('clrDgColumnResize'),
    __metadata("design:type", EventEmitter)
], DatagridHeaderRenderer.prototype, "resizeEmitter", void 0);
DatagridHeaderRenderer = __decorate([
    Directive({ selector: 'clr-dg-column', providers: [ColumnResizerService, COLUMN_STATE_PROVIDER] }),
    __param(6, Inject(COLUMN_STATE)),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2,
        DatagridRenderOrganizer,
        DomAdapter,
        ColumnResizerService,
        ColumnsService,
        BehaviorSubject])
], DatagridHeaderRenderer);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let NoopDomAdapter = class NoopDomAdapter {
    userDefinedWidth(element) {
        return 0;
    }
    scrollBarWidth(element) {
        return 0;
    }
    scrollWidth(element) {
        return 0;
    }
    computedHeight(element) {
        return 0;
    }
    clientRect(element) {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
    }
    minWidth(element) {
        return 0;
    }
    focus(element) { }
};
NoopDomAdapter = __decorate([
    Injectable()
], NoopDomAdapter);

let DatagridRowRenderer = class DatagridRowRenderer {
    constructor(columnsService) {
        this.columnsService = columnsService;
        this.subscriptions = [];
    }
    ngAfterContentInit() {
        this.setColumnState(); // case #3 and #4
        this.subscriptions.push(this.cells.changes.subscribe(() => {
            this.setColumnState(); // case #2
            // Note on case #2: In the case of dynamic columns, when one column (header/cell together) gets deleted,
            // this.cells.changes emits before this.columnsService.columns gets updated in MainRenderer
            // when this.headers.changes emits as well. So that means there will be n+1 column state providers
            // when this.cells.changes emits. Hence, we should quit earlier there. But this method will be called
            // right after again when this.headers.changes emits. By then, there will be the same number of column state
            // providers as column headers.
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    setColumnState() {
        // This method runs in four cases:
        // 1. When the initial rows appear on the first page.
        //    In this case, the method will be called in DatagridMainRenderer.
        // 2. When columns (corresponding header/cells) get added and deleted.
        //    In this case, the method will be called in DatagridMainRenderer. (Read the note on this case above).
        // 3. When rows load asynchronously.
        //    In this case, the method will be called in this class.
        // 4. When rows load after switching pages.
        //    In this case, the method will be called in this class (Basically, same as the case 3).
        if (this.cells.length === this.columnsService.columns.length) {
            this.cells.forEach((cell, index) => {
                if (this.columnsService.columns[index]) {
                    cell.columnState = this.columnsService.columns[index];
                }
            });
        }
    }
};
__decorate([
    ContentChildren(DatagridCellRenderer),
    __metadata("design:type", QueryList)
], DatagridRowRenderer.prototype, "cells", void 0);
DatagridRowRenderer = __decorate([
    Directive({ selector: 'clr-dg-row, clr-dg-row-detail' }),
    __metadata("design:paramtypes", [ColumnsService])
], DatagridRowRenderer);

// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
const domAdapterFactory = (platformId) => {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
let DatagridMainRenderer = class DatagridMainRenderer {
    constructor(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe(() => this.computeHeadersWidth()));
        this.subscriptions.push(this.page.sizeChange.subscribe(() => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(() => (this.shouldStabilizeColumns = true)));
    }
    ngAfterContentInit() {
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe(() => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            this.setupColumns();
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        }));
    }
    // Initialize and set Table width for horizontal scrolling here.
    ngAfterViewInit() {
        this.tableSizeService.table = this.el;
    }
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(() => {
                this.computeDatagridHeight();
            });
        }
    }
    setupColumns() {
        this.headers.forEach((header, index) => header.setColumnState(index));
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(row => row.setColumnState());
    }
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     */
    computeDatagridHeight() {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        const value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    }
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * Makes each header compute its width.
     */
    computeHeadersWidth() {
        const nbColumns = this.headers.length;
        let allStrict = true;
        this.headers.forEach((header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            const state = Object.assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            this.columnsService.emitStateChangeAt(index, state);
        });
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
};
__decorate([
    ContentChildren(DatagridHeaderRenderer),
    __metadata("design:type", QueryList)
], DatagridMainRenderer.prototype, "headers", void 0);
__decorate([
    ContentChildren(DatagridRowRenderer, { descendants: true }),
    __metadata("design:type", QueryList)
], DatagridMainRenderer.prototype, "rows", void 0);
DatagridMainRenderer = __decorate([
    Directive({
        selector: 'clr-datagrid',
        providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
    }),
    __metadata("design:paramtypes", [DatagridRenderOrganizer,
        Items,
        Page,
        DomAdapter,
        ElementRef,
        Renderer2,
        TableSizeService,
        ColumnsService])
], DatagridMainRenderer);

// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
let ClrPopoverContent = class ClrPopoverContent {
    constructor(document, container, template, renderer, smartPositionService, smartEventsService, smartOpenService) {
        this.document = document;
        this.container = container;
        this.template = template;
        this.renderer = renderer;
        this.smartPositionService = smartPositionService;
        this.smartEventsService = smartEventsService;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.hasPositionCoords = false;
    }
    set open(value) {
        this.smartOpenService.open = !!value;
    }
    set contentAt(position) {
        this.smartPositionService.position = position;
    }
    set outsideClickClose(clickToClose) {
        this.smartEventsService.outsideClickClose = !!clickToClose;
    }
    set scrollToClose(scrollToClose) {
        this.smartEventsService.scrollToClose = !!scrollToClose;
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(change => {
            if (change) {
                this.addContent();
            }
            else {
                this.removeContent();
            }
        }));
    }
    ngOnDestroy() {
        this.removeContent();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    removeContent() {
        if (!this.view) {
            return;
        }
        this.view.rootNodes.forEach(node => this.renderer.removeChild(this.document.body, node));
        this.container.clear();
        delete this.view;
        this.hasPositionCoords = false;
    }
    /**
     * TODO(matt): investigate why DebugElement retains a reference to the nodes and causes a memory leak.
     * A note about the use of appendChild/removeChild
     * The DebugElement is keeping a reference to the detached node and its unclear why.
     * This does warrant further investigation. But, since it doesn't happen in production mode
     * it is a low priority issue for now.
     */
    addContent() {
        // Create the view container
        this.view = this.container.createEmbeddedView(this.template);
        this.smartEventsService.contentRef = this.view.rootNodes[0]; // So we know where/what to set close focus on
        // Position the content and add a click listener
        this.renderer.addClass(this.view.rootNodes[0], 'clr-popover-content');
        this.renderer.listen(this.view.rootNodes[0], 'click', event => {
            this.smartOpenService.openEvent = event;
        });
        this.view.rootNodes.forEach(node => {
            this.renderer.appendChild(this.document.body, node);
        });
    }
    ngAfterContentChecked() {
        // In order to get accurate content height/width values, we cannot calculate alignment offsets until after the
        // projected content has stabilized.
        if (this.smartOpenService.open && this.view && !this.hasPositionCoords) {
            const positionCoords = this.smartPositionService.alignContent(this.view.rootNodes[0]);
            this.renderer.setStyle(this.view.rootNodes[0], 'top', `${positionCoords.yOffset}px`);
            this.renderer.setStyle(this.view.rootNodes[0], 'left', `${positionCoords.xOffset}px`);
            this.hasPositionCoords = true;
        }
    }
};
__decorate([
    Input('clrPopoverContent'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrPopoverContent.prototype, "open", null);
__decorate([
    Input('clrPopoverContentAt'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrPopoverContent.prototype, "contentAt", null);
__decorate([
    Input('clrPopoverContentOutsideClickToClose'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrPopoverContent.prototype, "outsideClickClose", null);
__decorate([
    Input('clrPopoverContentScrollToClose'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrPopoverContent.prototype, "scrollToClose", null);
ClrPopoverContent = __decorate([
    Directive({ selector: '[clrPopoverContent]' }),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [HTMLDocument,
        ViewContainerRef,
        TemplateRef,
        Renderer2,
        ClrPopoverPositionService,
        ClrPopoverEventsService,
        ClrPopoverToggleService])
], ClrPopoverContent);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
let ClrPopoverOpenCloseButton = class ClrPopoverOpenCloseButton {
    constructor(smartOpenService) {
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.openCloseChange = new EventEmitter();
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(change => {
            this.openCloseChange.next(change);
        }));
    }
    handleClick(event) {
        this.smartOpenService.toggleWithEvent(event);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Output('clrPopoverOpenCloseChange'),
    __metadata("design:type", EventEmitter)
], ClrPopoverOpenCloseButton.prototype, "openCloseChange", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ClrPopoverOpenCloseButton.prototype, "handleClick", null);
ClrPopoverOpenCloseButton = __decorate([
    Directive({
        selector: '[clrPopoverOpenCloseButton]',
        host: {
            '[class.clr-smart-open-close]': 'true',
        },
    }),
    __metadata("design:paramtypes", [ClrPopoverToggleService])
], ClrPopoverOpenCloseButton);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
let ClrPopoverCloseButton = class ClrPopoverCloseButton {
    constructor(elementRef, smartEventsService, smartOpenService) {
        this.elementRef = elementRef;
        this.smartEventsService = smartEventsService;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.closeChange = new EventEmitter();
        this.subscriptions.push(smartOpenService.openChange.pipe(filter(value => !value)).subscribe(() => {
            this.closeChange.next();
        }));
    }
    handleClick(event) {
        this.smartOpenService.toggleWithEvent(event);
        this.smartEventsService.setAnchorFocus();
    }
    ngAfterViewInit() {
        this.smartEventsService.closeButtonRef = this.elementRef;
        this.smartEventsService.setCloseFocus();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Output('clrPopoverOnCloseChange'),
    __metadata("design:type", EventEmitter)
], ClrPopoverCloseButton.prototype, "closeChange", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ClrPopoverCloseButton.prototype, "handleClick", null);
ClrPopoverCloseButton = __decorate([
    Directive({
        selector: '[clrPopoverCloseButton]',
        host: {
            '[class.clr-smart-close-button]': 'true',
        },
    }),
    __metadata("design:paramtypes", [ElementRef,
        ClrPopoverEventsService,
        ClrPopoverToggleService])
], ClrPopoverCloseButton);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
let ClrPopoverAnchor = class ClrPopoverAnchor {
    constructor(smartEventService, element) {
        smartEventService.anchorButtonRef = element;
    }
};
ClrPopoverAnchor = __decorate([
    Directive({
        selector: '[clrPopoverAnchor]',
        host: {
            '[class.clr-anchor]': 'true',
        },
    }),
    __metadata("design:paramtypes", [ClrPopoverEventsService, ElementRef])
], ClrPopoverAnchor);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
let ClrPopoverModuleNext = class ClrPopoverModuleNext {
};
ClrPopoverModuleNext = __decorate([
    NgModule({
        imports: [],
        declarations: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
        exports: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
    })
], ClrPopoverModuleNext);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_DATAGRID_DIRECTIVES = [
    // Core
    ClrDatagrid,
    ClrDatagridActionBar,
    ClrDatagridActionOverflow,
    ClrDatagridColumn,
    ClrDatagridColumnSeparator,
    ClrDatagridColumnToggle,
    ClrDatagridHideableColumn,
    ClrDatagridFilter,
    ClrDatagridItems,
    ClrDatagridItemsTrackBy,
    ClrDatagridRow,
    ClrDatagridRowDetail,
    DatagridDetailRegisterer,
    ClrDatagridCell,
    ClrDatagridFooter,
    ClrDatagridPagination,
    ClrDatagridPageSize,
    ClrDatagridPlaceholder,
    ClrDatagridColumnToggleButton,
    ClrDatagridColumnToggleTitle,
    WrappedCell,
    WrappedColumn,
    WrappedRow,
    // Renderers
    DatagridMainRenderer,
    DatagridHeaderRenderer,
    DatagridRowRenderer,
    DatagridCellRenderer,
    // Chocolate
    DatagridWillyWonka,
    ActionableOompaLoompa,
    ExpandableOompaLoompa,
    // Built-in shortcuts
    DatagridStringFilter,
    DatagridNumericFilter,
];
let ClrDatagridModule = class ClrDatagridModule {
};
ClrDatagridModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ClrIconModule,
            ClrFormsModule,
            FormsModule,
            ClrLoadingModule,
            ClrOutsideClickModule,
            ClrExpandableAnimationModule,
            ClrDragAndDropModule,
            ClrSpinnerModule,
            ClrCommonPopoverModule,
            ClrPopoverModuleNext,
            ClrFocusTrapModule,
        ],
        declarations: [CLR_DATAGRID_DIRECTIVES],
        exports: [CLR_DATAGRID_DIRECTIVES],
        entryComponents: [WrappedCell, WrappedColumn, WrappedRow],
    })
], ClrDatagridModule);

let ClrStackBlock = class ClrStackBlock {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    constructor(parent, uniqueId, commonStrings) {
        this.parent = parent;
        this.uniqueId = uniqueId;
        this.commonStrings = commonStrings;
        this.expanded = false;
        this.expandedChange = new EventEmitter(false);
        this.expandable = false;
        this.focused = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    get getChangedValue() {
        return this._changed || (this._changedChildren > 0 && !this.expanded);
    }
    set setChangedValue(value) {
        this._changed = value;
        if (this.parent && this._fullyInitialized) {
            if (value) {
                this.parent._changedChildren++;
            }
            else {
                this.parent._changedChildren--;
            }
        }
    }
    ngOnInit() {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock has to be fully initialized at first.
        this._fullyInitialized = true;
    }
    addChild() {
        this.expandable = true;
    }
    toggleExpand() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    get caretDirection() {
        return this.expanded ? 'down' : 'right';
    }
    get caretTitle() {
        return this.expanded ? this.commonStrings.keys.collapse : this.commonStrings.keys.expand;
    }
    get role() {
        return this.expandable ? 'button' : null;
    }
    get tabIndex() {
        return this.expandable ? '0' : null;
    }
    get onStackLabelFocus() {
        return this.expandable && !this.expanded && this.focused;
    }
    get ariaExpanded() {
        if (!this.expandable) {
            return null;
        }
        else {
            return this.expanded ? 'true' : 'false';
        }
    }
};
__decorate([
    HostBinding('class.stack-block-expanded'),
    Input('clrSbExpanded'),
    __metadata("design:type", Boolean)
], ClrStackBlock.prototype, "expanded", void 0);
__decorate([
    Output('clrSbExpandedChange'),
    __metadata("design:type", EventEmitter)
], ClrStackBlock.prototype, "expandedChange", void 0);
__decorate([
    HostBinding('class.stack-block-expandable'),
    Input('clrSbExpandable'),
    __metadata("design:type", Boolean)
], ClrStackBlock.prototype, "expandable", void 0);
__decorate([
    HostBinding('class.stack-block-changed'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ClrStackBlock.prototype, "getChangedValue", null);
__decorate([
    Input('clrSbNotifyChange'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrStackBlock.prototype, "setChangedValue", null);
__decorate([
    HostBinding('class.on-focus'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ClrStackBlock.prototype, "onStackLabelFocus", null);
ClrStackBlock = __decorate([
    Component({
        selector: 'clr-stack-block',
        template: `
    <dt class="stack-block-label"
        (click)="toggleExpand()"
        (keyup.enter)="toggleExpand()"
        (keyup.space)="toggleExpand()"
        (focus)="focused = true"
        (blur)="focused = false"
        [id]="uniqueId"
        [attr.role]="role"
        [attr.tabindex]="tabIndex"
        [attr.aria-expanded]="ariaExpanded">
      <clr-icon shape="caret"
                class="stack-block-caret"
                *ngIf="expandable"
                [attr.dir]="caretDirection"
                [attr.title]="caretTitle"></clr-icon>
      <span class="clr-sr-only" *ngIf="getChangedValue">{{commonStrings.keys.stackViewChanged}}</span>
      <ng-content select="clr-stack-label"></ng-content>
    </dt>
    <dd class="stack-block-content">
      <ng-content></ng-content>
    </dd>
    <clr-expandable-animation [@clrExpandTrigger]="expanded" class="stack-children">
      <div [style.height]="expanded ? 'auto' : 0">
        <ng-content select="clr-stack-block"></ng-content>
      </div>
    </clr-expandable-animation>
  `,
        // Make sure the host has the proper class for styling purposes
        host: { '[class.stack-block]': 'true' },
        providers: [UNIQUE_ID_PROVIDER],
        styles: [`
        :host { display: block; }
    `]
    }),
    __param(0, SkipSelf()),
    __param(0, Optional()),
    __param(1, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [ClrStackBlock, String, ClrCommonStringsService])
], ClrStackBlock);

let ClrStackView = class ClrStackView {
    constructor() {
        /**
         * Undocumented experimental feature: inline editing.
         */
        this.editable = false;
        this.save = new EventEmitter(false);
        this._editMode = false;
        this.editingChange = new EventEmitter(false);
        /**
         * End of undocumented experimental feature.
         */
    }
    get editing() {
        return this.editable && this._editMode;
    }
    set editing(value) {
        if (this.editable) {
            this._editMode = value;
            this.editingChange.emit(value);
            if (!value) {
                this.save.emit(null);
            }
        }
    }
};
__decorate([
    Output('clrStackSave'),
    __metadata("design:type", EventEmitter)
], ClrStackView.prototype, "save", void 0);
ClrStackView = __decorate([
    Component({
        selector: 'clr-stack-view',
        template: `
        <ng-content select="clr-stack-header"></ng-content>
        <dl class="stack-view"><ng-content></ng-content></dl>
    `,
        styles: [`
        :host { display: block; }
    `]
    })
], ClrStackView);

let ClrStackHeader = class ClrStackHeader {
    constructor(stackView) {
        this.stackView = stackView;
    }
};
ClrStackHeader = __decorate([
    Component({
        selector: 'clr-stack-header',
        template: `
        <h4 class="stack-header">
            <span class="stack-title"><ng-content></ng-content></span>
            
            <span class="stack-actions">
                <ng-content select=".stack-action"></ng-content>
                <!-- Undocumented experimental feature: inline editing. -->
                <button *ngIf="stackView.editable" class="stack-action btn btn-sm btn-link" 
                        (click)="stackView.editing = !stackView.editing" type="button">
                        Edit
                </button>
                <!-- End of undocumented experimental feature. -->
            </span>
        </h4>
    `,
        styles: [`
        :host { display: block; }
    `]
    }),
    __metadata("design:paramtypes", [ClrStackView])
], ClrStackHeader);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StackControl {
    constructor(stackView) {
        this.stackView = stackView;
        this.modelChange = new EventEmitter(false);
        // Make the ClrStackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe((editing) => {
            // Edit mode was closed
            if (!editing) {
                this.modelChange.emit(this.model);
            }
        });
    }
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrStackInput = class ClrStackInput extends StackControl {
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
        this.type = 'text';
    }
};
ClrStackInput = __decorate([
    Component({
        selector: 'clr-stack-input',
        inputs: ['model: clrModel', 'type'],
        outputs: ['modelChange: clrModelChange'],
        template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <input [type]="type" *ngIf="stackView.editing" [(ngModel)]="model"/>
    `
    }),
    __metadata("design:paramtypes", [ClrStackView])
], ClrStackInput);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrStackSelect = class ClrStackSelect extends StackControl {
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
    }
};
ClrStackSelect = __decorate([
    Component({
        selector: 'clr-stack-select',
        inputs: ['model: clrModel'],
        outputs: ['modelChange: clrModelChange'],
        template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <div class="select" *ngIf="stackView.editing" >
            <select [(ngModel)]="model">
                <ng-content></ng-content>
            </select>
        </div>
    `
    }),
    __metadata("design:paramtypes", [ClrStackView])
], ClrStackSelect);

let ClrStackViewCustomTags = class ClrStackViewCustomTags {
};
ClrStackViewCustomTags = __decorate([
    Directive({ selector: 'clr-stack-label, clr-stack-content' })
], ClrStackViewCustomTags);

let ClrStackContentInput = class ClrStackContentInput {
    constructor(uniqueId) {
        this.uniqueId = uniqueId;
    }
};
ClrStackContentInput = __decorate([
    Directive({
        selector: '[clrStackInput]',
        host: {
            '[class.clr-input]': 'true',
            '[attr.aria-labelledby]': 'uniqueId',
        },
    }),
    __param(0, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [String])
], ClrStackContentInput);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_STACK_VIEW_DIRECTIVES = [
    ClrStackView,
    ClrStackHeader,
    ClrStackBlock,
    ClrStackContentInput,
    ClrStackViewCustomTags,
    /**
     * Undocumented experimental feature: inline editing.
     */
    ClrStackInput,
    ClrStackSelect,
];
let ClrStackViewModule = class ClrStackViewModule {
};
ClrStackViewModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ClrIconModule, ClrExpandableAnimationModule],
        declarations: [CLR_STACK_VIEW_DIRECTIVES],
        exports: [CLR_STACK_VIEW_DIRECTIVES],
    })
], ClrStackViewModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// TODO: I'd like this to be a CheckedState enum for the checkboxes in the future.
var ClrSelectedState;
(function (ClrSelectedState) {
    // WARNING! Unselected has the value 0,
    // so it's actually the only one that will evaluate to false if cast to a boolean.
    // Don't mess with the order!
    ClrSelectedState[ClrSelectedState["UNSELECTED"] = 0] = "UNSELECTED";
    ClrSelectedState[ClrSelectedState["SELECTED"] = 1] = "SELECTED";
    ClrSelectedState[ClrSelectedState["INDETERMINATE"] = 2] = "INDETERMINATE";
})(ClrSelectedState || (ClrSelectedState = {}));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TreeNodeModel {
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

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
class DeclarativeTreeNodeModel extends TreeNodeModel {
    constructor(parent) {
        super();
        this.parent = parent;
        if (parent) {
            parent._addChild(this);
        }
        this.children = [];
    }
    _addChild(child) {
        this.children.push(child);
    }
    _removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    destroy() {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        super.destroy();
    }
}

let TreeFeaturesService = class TreeFeaturesService {
    constructor() {
        this.selectable = false;
        this.eager = true;
        this.childrenFetched = new Subject();
    }
};
TreeFeaturesService = __decorate([
    Injectable()
], TreeFeaturesService);
function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
const TREE_FEATURES_PROVIDER = {
    provide: TreeFeaturesService,
    useFactory: treeFeaturesFactory,
    /*
     * The Optional + SkipSelf pattern ensures that in case of nested components, only the root one will
     * instantiate a new service and all its children will reuse the root's instance.
     * If there are several roots (in this case, several independent trees on a page), each root will instantiate
     * its own service so they won't interfere with one another.
     *
     * TL;DR - Optional + SkipSelf = 1 instance of TreeFeaturesService per tree.
     */
    deps: [[new Optional(), new SkipSelf(), TreeFeaturesService]],
};

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTreeNode = class ClrTreeNode {
    constructor(nodeId, parent, featuresService, expandService, commonStrings, injector) {
        this.nodeId = nodeId;
        this.featuresService = featuresService;
        this.expandService = expandService;
        this.commonStrings = commonStrings;
        this.STATES = ClrSelectedState;
        this.skipEmitChange = false;
        this.selectedChange = new EventEmitter(false);
        this.expandedChange = new EventEmitter();
        this.subscriptions = [];
        if (this.featuresService.recursion) {
            // I'm completely stuck, we have to hack into private properties until either
            // https://github.com/angular/angular/issues/14935 or https://github.com/angular/angular/issues/15998
            // are fixed
            this._model = injector.view.context.clrModel;
        }
        else {
            // Force cast for now, not sure how to tie the correct type here to featuresService.recursion
            this._model = new DeclarativeTreeNodeModel(parent ? parent._model : null);
        }
    }
    isExpandable() {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || (this._model.children && this._model.children.length > 0);
    }
    get selected() {
        return this._model.selected.value;
    }
    set selected(value) {
        this.featuresService.selectable = true;
        // Gracefully handle falsy states like null or undefined because it's just easier than answering questions.
        // This shouldn't happen with strict typing on the app's side, but it's not up to us.
        if (value === null || typeof value === 'undefined') {
            value = ClrSelectedState.UNSELECTED;
        }
        // We match booleans to the corresponding ClrSelectedState
        if (typeof value === 'boolean') {
            value = value ? ClrSelectedState.SELECTED : ClrSelectedState.UNSELECTED;
        }
        // We propagate only if the tree is in smart mode, and skip emitting the output when we set the input
        // See https://github.com/vmware/clarity/issues/3073
        this.skipEmitChange = true;
        this._model.setSelected(value, this.featuresService.eager, this.featuresService.eager);
        this.skipEmitChange = false;
    }
    get treeNodeRole() {
        return this._model.parent ? 'treeitem' : 'tree';
    }
    get rootAriaMultiSelectable() {
        if (this._model.parent || !this.featuresService.selectable) {
            return null;
        }
        else {
            return true;
        }
    }
    get ariaSelected() {
        return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
    }
    // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
    // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
    // case, you can't use a structural directive, it would need to go on an ng-container.
    get expanded() {
        return this.expandService.expanded;
    }
    set expanded(value) {
        this.expandService.expanded = value;
    }
    ngOnInit() {
        this.subscriptions.push(this._model.selected.pipe(filter(() => !this.skipEmitChange)).subscribe(value => this.selectedChange.emit(value)));
        this.subscriptions.push(this.expandService.expandChange.subscribe(value => this.expandedChange.emit(value)));
    }
    ngOnDestroy() {
        this._model.destroy();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Input('clrSelected'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrTreeNode.prototype, "selected", null);
__decorate([
    Output('clrSelectedChange'),
    __metadata("design:type", Object)
], ClrTreeNode.prototype, "selectedChange", void 0);
__decorate([
    HostBinding('attr.role'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "treeNodeRole", null);
__decorate([
    HostBinding('attr.aria-multiselectable'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "rootAriaMultiSelectable", null);
__decorate([
    HostBinding('attr.aria-selected'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ClrTreeNode.prototype, "ariaSelected", null);
__decorate([
    Input('clrExpandable'),
    __metadata("design:type", Boolean)
], ClrTreeNode.prototype, "expandable", void 0);
__decorate([
    Input('clrExpanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrTreeNode.prototype, "expanded", null);
__decorate([
    Output('clrExpandedChange'),
    __metadata("design:type", Object)
], ClrTreeNode.prototype, "expandedChange", void 0);
ClrTreeNode = __decorate([
    Component({
        selector: 'clr-tree-node',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"clr-tree-node-content-container\">\n  <button\n    *ngIf=\"isExpandable() && !_model.loading && !expandService.loading\"\n    type=\"button\"\n    class=\"clr-treenode-caret\"\n    (click)=\"expandService.toggle()\"\n    [attr.aria-expanded]=\"expandService.expanded\">\n    <clr-icon\n      class=\"clr-treenode-caret-icon\"\n      shape=\"caret\"\n      [attr.dir]=\"expandService.expanded ? 'down' : 'right'\"\n      [attr.title]=\"expandService.expanded ? commonStrings.keys.collapse : commonStrings.keys.expand\"></clr-icon>\n  </button>\n  <div class=\"clr-treenode-spinner-container\" *ngIf=\"expandService.loading || _model.loading\">\n        <span class=\"clr-treenode-spinner spinner\"></span>\n  </div>\n  <div class=\"clr-checkbox-wrapper clr-treenode-checkbox\" *ngIf=\"featuresService.selectable\">\n    <input type=\"checkbox\" id=\"{{nodeId}}-check\" class=\"clr-checkbox\" [attr.aria-labelledby]=\"nodeId\"\n           [checked]=\"_model.selected.value === STATES.SELECTED\"\n           [indeterminate]=\"_model.selected.value === STATES.INDETERMINATE\"\n           (change)=\"_model.toggleSelection(featuresService.eager)\">\n    <label for=\"{{nodeId}}-check\" class=\"clr-control-label\"></label>\n  </div>\n  <div class=\"clr-treenode-content\" [id]=\"nodeId\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<div class=\"clr-treenode-children\"\n     [@childNodesState]=\"expandService.expanded ? 'expanded' : 'collapsed'\"\n     [attr.role]=\"isExpandable() ? 'group' : null\">\n  <ng-content select=\"clr-tree-node\"></ng-content>\n  <ng-content select=\"[clrIfExpanded]\"></ng-content>\n  <clr-recursive-children [parent]=\"_model\"></clr-recursive-children>\n</div>\n",
        providers: [
            UNIQUE_ID_PROVIDER,
            TREE_FEATURES_PROVIDER,
            IfExpandService,
            { provide: LoadingListener, useExisting: IfExpandService },
        ],
        animations: [
            trigger('childNodesState', [
                state('expanded', style({ height: '*', 'overflow-y': 'hidden' })),
                state('collapsed', style({ height: 0, 'overflow-y': 'hidden' })),
                transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
            ]),
        ],
        host: { '[class.clr-tree-node]': 'true' }
    }),
    __param(0, Inject(UNIQUE_ID)),
    __param(1, Optional()),
    __param(1, SkipSelf()),
    __metadata("design:paramtypes", [String, ClrTreeNode,
        TreeFeaturesService,
        IfExpandService,
        ClrCommonStringsService,
        Injector])
], ClrTreeNode);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTree = class ClrTree {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    set lazy(value) {
        this.featuresService.eager = !value;
    }
};
__decorate([
    Input('clrLazy'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrTree.prototype, "lazy", null);
ClrTree = __decorate([
    Component({
        selector: 'clr-tree',
        template: `
    <ng-content></ng-content>
    <clr-recursive-children *ngIf="featuresService.recursion"
                            [children]="featuresService.recursion.root"></clr-recursive-children>
  `,
        providers: [TREE_FEATURES_PROVIDER]
    }),
    __metadata("design:paramtypes", [TreeFeaturesService])
], ClrTree);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function isPromise(o) {
    // Shamelessly copied from every open-source project out there.
    return o && typeof o.then === 'function';
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
class RecursiveTreeNodeModel extends TreeNodeModel {
    constructor(model, parent, getChildren, featuresService) {
        super();
        this.getChildren = getChildren;
        this.featuresService = featuresService;
        this.childrenFetched = false;
        this._children = [];
        this.model = model;
        this.parent = parent;
    }
    clearChildren() {
        this._children.forEach(child => child.destroy());
        delete this._children;
        this.childrenFetched = false;
    }
    fetchChildren() {
        if (this.childrenFetched) {
            return;
        }
        const asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then(raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            });
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe(raw => {
                this._children = this.wrapChildren(raw);
                this.loading = false;
            });
        }
        else if (asyncChildren) {
            // Synchronous case
            this._children = this.wrapChildren(asyncChildren);
        }
        else {
            this._children = [];
        }
        this.childrenFetched = true;
        if (this.featuresService) {
            this.featuresService.childrenFetched.next();
        }
    }
    wrapChildren(rawModels) {
        return rawModels.map(m => new RecursiveTreeNodeModel(m, this, this.getChildren, this.featuresService));
    }
    get children() {
        this.fetchChildren();
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.destroy();
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrRecursiveForOf = class ClrRecursiveForOf {
    constructor(template, featuresService, cdr) {
        this.template = template;
        this.featuresService = featuresService;
        this.cdr = cdr;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    ngOnChanges() {
        let wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map(node => new RecursiveTreeNodeModel(node, null, this.getChildren, this.featuresService));
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren, this.featuresService)];
        }
        if (!this.childrenFetchSubscription) {
            this.childrenFetchSubscription = this.featuresService.childrenFetched.subscribe(() => {
                this.cdr.detectChanges();
            });
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    }
    ngOnDestroy() {
        if (this.childrenFetchSubscription) {
            this.childrenFetchSubscription.unsubscribe();
        }
    }
};
__decorate([
    Input('clrRecursiveForOf'),
    __metadata("design:type", Object)
], ClrRecursiveForOf.prototype, "nodes", void 0);
__decorate([
    Input('clrRecursiveForGetChildren'),
    __metadata("design:type", Function)
], ClrRecursiveForOf.prototype, "getChildren", void 0);
ClrRecursiveForOf = __decorate([
    Directive({ selector: '[clrRecursiveFor][clrRecursiveForOf]' }),
    __metadata("design:paramtypes", [TemplateRef,
        TreeFeaturesService,
        ChangeDetectorRef])
], ClrRecursiveForOf);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let RecursiveChildren = 
/**
 * Internal component, do not export!
 * This is part of the hack to get around https://github.com/angular/angular/issues/15998
 */
class RecursiveChildren {
    constructor(featuresService, expandService) {
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe(value => {
                if (!value && this.parent && !this.featuresService.eager && this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    this.parent.clearChildren();
                }
            });
        }
    }
    shouldRender() {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    }
    getContext(node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
__decorate([
    Input('parent'),
    __metadata("design:type", TreeNodeModel)
], RecursiveChildren.prototype, "parent", void 0);
__decorate([
    Input('children'),
    __metadata("design:type", Array)
], RecursiveChildren.prototype, "children", void 0);
RecursiveChildren = __decorate([
    Component({
        selector: 'clr-recursive-children',
        template: `
    <ng-container *ngIf="shouldRender()">
      <ng-container *ngFor="let child of parent?.children || children">
        <ng-container *ngTemplateOutlet="featuresService.recursion.template; context: getContext(child)"></ng-container>
      </ng-container>
    </ng-container>
  `
    })
    /**
     * Internal component, do not export!
     * This is part of the hack to get around https://github.com/angular/angular/issues/15998
     */
    ,
    __param(1, Optional()),
    __metadata("design:paramtypes", [TreeFeaturesService, IfExpandService])
], RecursiveChildren);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
let ClrTreeViewModule = class ClrTreeViewModule {
};
ClrTreeViewModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrLoadingModule],
        declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
        exports: [CLR_TREE_VIEW_DIRECTIVES],
    })
], ClrTreeViewModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrDataModule = class ClrDataModule {
};
ClrDataModule = __decorate([
    NgModule({ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] })
], ClrDataModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class FocusableItem {
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function customFocusableItemProvider(implementation) {
    return [
        UNIQUE_ID_PROVIDER,
        implementation,
        {
            provide: FocusableItem,
            useExisting: implementation,
        },
    ];
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ArrowKeyDirection;
(function (ArrowKeyDirection) {
    ArrowKeyDirection["UP"] = "up";
    ArrowKeyDirection["DOWN"] = "down";
    ArrowKeyDirection["LEFT"] = "left";
    ArrowKeyDirection["RIGHT"] = "right";
})(ArrowKeyDirection || (ArrowKeyDirection = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let FocusService$1 = class FocusService {
    constructor(renderer) {
        this.renderer = renderer;
        this._unlistenFuncs = [];
    }
    get current() {
        return this._current;
    }
    reset(first) {
        this._current = first;
    }
    listenToArrowKeys(el) {
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', event => !this.move(ArrowKeyDirection.UP, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', event => !this.move(ArrowKeyDirection.DOWN, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowleft', event => !this.move(ArrowKeyDirection.LEFT, event)));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', event => !this.move(ArrowKeyDirection.RIGHT, event)));
    }
    registerContainer(el) {
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.space', () => !this.activateCurrent()));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.enter', () => !this.activateCurrent()));
    }
    moveTo(item) {
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    }
    move(direction, event = undefined) {
        if (this.current) {
            // We want to prevent default behavior that results from the keydown,
            // which may undesirably move the cursor around when using a screen reader
            if (event) {
                event.preventDefault();
            }
            const next = this.current[direction];
            if (next) {
                // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
                // If performance ever matters for this, we can refactor using additional private methods.
                const nextObs = isObservable(next) ? next : of(next);
                nextObs.subscribe(item => {
                    this.moveTo(item);
                    return true;
                });
            }
        }
        return false;
    }
    activateCurrent() {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    }
    detachListeners() {
        this._unlistenFuncs.forEach((unlisten) => unlisten());
    }
};
FocusService$1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Renderer2])
], FocusService$1);
function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService$1(renderer);
}
const FOCUS_SERVICE_PROVIDER = {
    provide: FocusService$1,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService$1], Renderer2],
};

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Links a set of focusable items to a parent along one direction
 */
function linkParent(items, parent, direction) {
    items.forEach(item => (item[direction] = parent));
}
/**
 * Double-links a set of focusable items vertically, possibly looping
 */
function linkVertical(items, loop = true) {
    items.forEach((item, index) => {
        if (index > 0) {
            item.up = items[index - 1];
        }
        if (index < items.length - 1) {
            item.down = items[index + 1];
        }
    });
    if (loop && items.length > 1) {
        items[0].up = items[items.length - 1];
        items[items.length - 1].down = items[0];
    }
}
// Right now I only need the two linkers above, but we can easily add more linkers. A couple examples:
// export function linkHorizontal(items: FocusableItem[], loop = true);
// export function linkTable(items: FocusableItem[][]);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function wrapObservable(observable, onSubscribe, onUnsubscribe) {
    return Observable.create((observer) => {
        onSubscribe(observer);
        const subscription = observable.subscribe(observer);
        return () => {
            subscription.unsubscribe();
            if (onUnsubscribe) {
                onUnsubscribe(observer);
            }
        };
    });
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let DropdownFocusHandler = class DropdownFocusHandler {
    constructor(id, renderer, parent, ifOpenService, focusService, platformId) {
        this.id = id;
        this.renderer = renderer;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.focusService = focusService;
        this.platformId = platformId;
        this._unlistenFuncs = [];
        this.focusBackOnTrigger = false;
        this.resetChildren();
        this.moveToFirstItemWhenOpen();
        if (!this.parent) {
            this.handleRootFocus();
        }
    }
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     */
    moveToFirstItemWhenOpen() {
        this.ifOpenService.openChange.subscribe(open => {
            if (open && this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout(() => {
                    this.focusService.moveTo(this);
                    if (this.parent) {
                        this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                });
            }
        });
    }
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    handleRootFocus() {
        this.ifOpenService.openChange.subscribe(open => {
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                this.focusService.reset(this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (this.focusBackOnTrigger) {
                    this.focus();
                }
            }
            this.focusBackOnTrigger = open;
        });
    }
    get trigger() {
        return this._trigger;
    }
    set trigger(el) {
        this._trigger = el;
        this.renderer.setAttribute(el, 'id', this.id);
        if (this.parent) {
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', event => this.ifOpenService.toggleWithEvent(event)));
        }
        else {
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', event => this.ifOpenService.toggleWithEvent(event)));
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', event => this.ifOpenService.toggleWithEvent(event)));
            this.focusService.listenToArrowKeys(el);
        }
    }
    get container() {
        return this._container;
    }
    set container(el) {
        this._container = el;
        // whether root container or not, tab key should always toggle (i.e. close) the container
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.tab', event => this.ifOpenService.toggleWithEvent(event)));
        if (this.parent) {
            // if it's a nested container, pressing esc has the same effect as pressing left key, which closes the current
            // popup and moves up to its parent. Here, we stop propagation so that the parent container
            // doesn't receive the esc keydown
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', event => {
                this.focusService.move(ArrowKeyDirection.LEFT, event);
                event.stopPropagation();
            }));
        }
        else {
            // The root container is the only one we register to the focus service, others do not need focus
            this.focusService.registerContainer(el);
            // The root container will simply close the container when esc key is pressed
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', event => this.ifOpenService.toggleWithEvent(event)));
            // When the user moves focus outside of the menu, we close the dropdown
            this._unlistenFuncs.push(this.renderer.listen(el, 'blur', event => {
                // we clear out any existing focus on the items
                this.children.pipe(take(1)).subscribe(items => items.forEach(item => item.blur()));
                // event.relatedTarget is null in IE11. In that case we use document.activeElement which correctly points
                // to the element we want to check. Note that other browsers might point document.activeElement to the
                // wrong element. This is ok, because all the other browsers we support relies on event.relatedTarget.
                const target = event.relatedTarget || document.activeElement;
                // If the user clicks on an item which triggers the blur, we don't want to close it since it may open a submenu.
                // In the case of needing to close it (i.e. user selected an item and the dropdown menu is set to close on
                // selection), dropdown-item.ts handles it.
                if (target && isPlatformBrowser(this.platformId)) {
                    if (el.contains(target) || target === this.trigger) {
                        return;
                    }
                }
                // We let the user move focus to where the want, we don't force the focus back on the trigger
                this.focusBackOnTrigger = false;
                this.ifOpenService.open = false;
            }));
        }
    }
    focus() {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.focus();
        }
    }
    blur() {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.blur();
        }
    }
    activate() {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    }
    openAndGetChildren() {
        return wrapObservable(this.children, () => (this.ifOpenService.open = true));
    }
    closeAndGetThis() {
        return wrapObservable(of(this), () => (this.ifOpenService.open = false));
    }
    resetChildren() {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map(all => all[0]));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map(all => all[0]));
            this.up = this.openAndGetChildren().pipe(map(all => all[all.length - 1]));
        }
    }
    addChildren(children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    }
    ngOnDestroy() {
        this._unlistenFuncs.forEach((unlisten) => unlisten());
        this.focusService.detachListeners();
    }
};
DropdownFocusHandler = __decorate([
    Injectable(),
    __param(0, Inject(UNIQUE_ID)),
    __param(2, SkipSelf()),
    __param(2, Optional()),
    __param(5, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [String, Renderer2,
        DropdownFocusHandler,
        IfOpenService,
        FocusService$1,
        Object])
], DropdownFocusHandler);
const DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);

let RootDropdownService = class RootDropdownService {
    constructor() {
        this._changes = new Subject();
    }
    get changes() {
        return this._changes.asObservable();
    }
    closeMenus() {
        this._changes.next(false);
    }
};
RootDropdownService = __decorate([
    Injectable()
], RootDropdownService);
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
const ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};

let ClrDropdown = class ClrDropdown {
    constructor(parent, ifOpenService, cdr, dropdownService) {
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe(value => (this.ifOpenService.open = value)));
        this.subscriptions.push(ifOpenService.openChange.subscribe(value => this.cdr.markForCheck()));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    Input('clrCloseMenuOnItemClick'),
    __metadata("design:type", Boolean)
], ClrDropdown.prototype, "isMenuClosable", void 0);
ClrDropdown = __decorate([
    Component({
        selector: 'clr-dropdown',
        template: '<ng-content></ng-content>',
        host: {
            '[class.dropdown]': 'true',
            // the open class, also used in static version, is always present in the Angular version
            // Angular takes care of hiding it, regardless of whether you use *clrIfOpen or not
            '[class.open]': 'true',
        },
        providers: [
            IfOpenService,
            ROOT_DROPDOWN_PROVIDER,
            { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
            FOCUS_SERVICE_PROVIDER,
            DROPDOWN_FOCUS_HANDLER_PROVIDER,
        ]
    }),
    __param(0, SkipSelf()),
    __param(0, Optional()),
    __metadata("design:paramtypes", [ClrDropdown,
        IfOpenService,
        ChangeDetectorRef,
        RootDropdownService])
], ClrDropdown);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let BasicFocusableItem = class BasicFocusableItem {
    constructor(id, el, renderer, platformId) {
        this.id = id;
        this.el = el;
        this.renderer = renderer;
        this.platformId = platformId;
        this.disabled = false;
        renderer.setAttribute(el.nativeElement, 'id', id);
        renderer.setAttribute(el.nativeElement, 'tabindex', '-1');
    }
    focus() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
            this.el.nativeElement.focus();
        }
    }
    blur() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
            this.el.nativeElement.blur();
        }
    }
    activate() {
        if (isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.click();
        }
    }
};
BasicFocusableItem = __decorate([
    Injectable(),
    __param(0, Inject(UNIQUE_ID)),
    __param(3, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [String, ElementRef,
        Renderer2,
        Object])
], BasicFocusableItem);
const BASIC_FOCUSABLE_ITEM_PROVIDER = [
    UNIQUE_ID_PROVIDER,
    {
        provide: FocusableItem,
        useClass: BasicFocusableItem,
    },
];

let ClrDropdownItem = class ClrDropdownItem {
    constructor(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
        this.setByDeprecatedDisabled = false;
    }
    set disabled(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
    }
    get disabled() {
        return this.focusableItem.disabled;
    }
    /*
     * @deprecated since 3.0, remove in 4.0. the presence of this attribute makes it not-focusable in IE11. Use [clrDisabled] input instead.
     */
    set disabledDeprecated(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
        this.setByDeprecatedDisabled = true;
    }
    get disabledDeprecated() {
        return this.focusableItem.disabled;
    }
    ngAfterViewInit() {
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', () => this.onDropdownItemClick());
    }
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    }
    ngOnDestroy() {
        this.unlisten();
    }
};
__decorate([
    Input('clrDisabled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDropdownItem.prototype, "disabled", null);
__decorate([
    Input('disabled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrDropdownItem.prototype, "disabledDeprecated", null);
ClrDropdownItem = __decorate([
    Directive({
        selector: '[clrDropdownItem]',
        host: {
            '[class.disabled]': 'disabled',
            '[class.dropdown-item]': 'true',
            '[attr.role]': '"menuitem"',
            '[attr.aria-disabled]': 'disabled',
            '[attr.disabled]': "(disabled && setByDeprecatedDisabled)? '' : null",
        },
        providers: [BASIC_FOCUSABLE_ITEM_PROVIDER],
    }),
    __metadata("design:paramtypes", [ClrDropdown,
        ElementRef,
        RootDropdownService,
        Renderer2,
        FocusableItem])
], ClrDropdownItem);

let ClrDropdownMenu = class ClrDropdownMenu extends AbstractPopover {
    constructor(injector, parentHost, nested, focusHandler) {
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        super(injector, parentHost);
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            this.anchorPoint = Point.BOTTOM_LEFT;
            this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            this.anchorPoint = Point.RIGHT_TOP;
            this.popoverPoint = Point.LEFT_TOP;
        }
        this.popoverOptions.allowMultipleOpen = true;
        this.popoverOptions.ignoreGlobalESCListener = true;
        this.closeOnOutsideClick = true;
        this.focusHandler = focusHandler;
    }
    set position(position) {
        // set the popover values based on menu position
        switch (position) {
            case 'top-right':
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-top':
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'right-bottom':
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'left-top':
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'left-bottom':
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    ngAfterContentInit() {
        this.focusHandler.container = this.el.nativeElement;
        this.items.changes.subscribe(() => this.focusHandler.addChildren(this.items.toArray()));
        // I saw this on GitHub as a solution to avoid code duplication because of missed QueryList changes
        this.items.notifyOnChanges();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.focusHandler.resetChildren();
    }
};
__decorate([
    Input('clrPosition'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrDropdownMenu.prototype, "position", null);
__decorate([
    ContentChildren(FocusableItem),
    __metadata("design:type", QueryList)
], ClrDropdownMenu.prototype, "items", void 0);
ClrDropdownMenu = __decorate([
    Component({
        selector: 'clr-dropdown-menu',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.dropdown-menu]': 'true',
            '[attr.role]': '"menu"',
        }
    }),
    __param(1, Optional()),
    __param(1, Inject(POPOVER_HOST_ANCHOR)),
    __param(2, Optional()),
    __param(2, SkipSelf()),
    __metadata("design:paramtypes", [Injector,
        ElementRef,
        ClrDropdownMenu,
        DropdownFocusHandler])
], ClrDropdownMenu);

let ClrDropdownTrigger = class ClrDropdownTrigger {
    constructor(dropdown, ifOpenService, el, focusHandler) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
        focusHandler.trigger = el.nativeElement;
    }
    get active() {
        return this.ifOpenService.open;
    }
    onDropdownTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
};
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClrDropdownTrigger.prototype, "onDropdownTriggerClick", null);
ClrDropdownTrigger = __decorate([
    Directive({
        // We support both selectors for legacy reasons
        selector: '[clrDropdownTrigger],[clrDropdownToggle]',
        host: {
            '[class.dropdown-toggle]': 'isRootLevelToggle',
            '[class.dropdown-item]': '!isRootLevelToggle',
            '[class.expandable]': '!isRootLevelToggle',
            '[class.active]': 'active',
            '[attr.aria-haspopup]': '"menu"',
            '[attr.aria-expanded]': 'active',
        },
    }),
    __metadata("design:paramtypes", [ClrDropdown,
        IfOpenService,
        ElementRef,
        DropdownFocusHandler])
], ClrDropdownTrigger);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
let ClrDropdownModule = class ClrDropdownModule {
};
ClrDropdownModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrCommonPopoverModule],
        declarations: [CLR_DROPDOWN_DIRECTIVES],
        exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
    })
], ClrDropdownModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// @TODO Make this an enum
const ALERT_TYPES = ['info', 'warning', 'danger', 'success'];

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let AlertIconAndTypesService = class AlertIconAndTypesService {
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    get alertType() {
        return this._alertType;
    }
    set alertType(val) {
        if (ALERT_TYPES.indexOf(val) > -1) {
            this._alertType = val;
        }
    }
    get alertIconShape() {
        if ('' === this._alertIconShape) {
            return this.iconInfoFromType(this._alertType).shape;
        }
        return this._alertIconShape;
    }
    set alertIconShape(val) {
        if (!val) {
            this._alertIconShape = '';
        }
        else if (val !== this._alertIconShape) {
            this._alertIconShape = val;
        }
    }
    get alertIconTitle() {
        return this.iconInfoFromType(this._alertType).title;
    }
    iconInfoFromType(type) {
        const returnObj = { shape: '', cssClass: '', title: '' };
        switch (type) {
            case 'warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                returnObj.title = this.commonStrings.keys.warning;
                break;
            case 'danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                returnObj.title = this.commonStrings.keys.danger;
                break;
            case 'success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                returnObj.title = this.commonStrings.keys.success;
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                returnObj.title = this.commonStrings.keys.info;
                break;
        }
        return returnObj;
    }
};
AlertIconAndTypesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ClrCommonStringsService])
], AlertIconAndTypesService);

let MultiAlertService = class MultiAlertService {
    constructor() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    get changes() {
        return this._change.asObservable();
    }
    get current() {
        return this._current;
    }
    set current(index) {
        if (index !== this._current) {
            this._current = index;
            this._change.next(index);
        }
    }
    get activeAlerts() {
        return this.allAlerts.filter(alert => !alert._closed);
    }
    get currentAlert() {
        return this.activeAlerts[this.current];
    }
    set currentAlert(alert) {
        this.current = this.activeAlerts.indexOf(alert);
    }
    get count() {
        return this.activeAlerts.length;
    }
    manage(alerts) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.allAlerts = alerts;
        this.subscription = this.allAlerts.changes.subscribe(() => {
            if (this.current >= this.allAlerts.length) {
                this.current = Math.max(0, this.allAlerts.length - 1);
            }
        });
    }
    next() {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    }
    previous() {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    }
    close() {
        this.previous();
    }
    destroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
MultiAlertService = __decorate([
    Injectable()
], MultiAlertService);

let ClrAlert = class ClrAlert {
    constructor(iconService, cdr, multiAlertService, commonStrings) {
        this.iconService = iconService;
        this.cdr = cdr;
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        // Aria
        this.clrCloseButtonAriaLabel = this.commonStrings.keys.alertCloseButtonAriaLabel;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
        /**
         * clrPolite is not used in the code. Is here just to provide
         * code complition and also mark component what type AriaLive
         * will be used.
         */
        this.polite = true;
        this.previouslyHidden = false;
        this.hidden = false;
    }
    set alertType(val) {
        this.iconService.alertType = val;
    }
    get alertType() {
        return this.iconService.alertType;
    }
    /**
     * There is an order on how the attributes will take effect.
     * Assertive, Off, Polite.
     *
     * Polite is default if non is passed.
     *
     * In the case of setting all of them to true. Assertive will be used.
     *
     */
    get setAriaLive() {
        if (isBooleanAttributeSet(this.assertive)) {
            return 'assertive';
        }
        if (isBooleanAttributeSet(this.off)) {
            return 'off';
        }
        return 'polite';
    }
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    detectChangesIfNeeded() {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    }
    get isHidden() {
        if (this.multiAlertService) {
            // change detection issue in production mode causes currentAlert to be undefined when only the first alert exists
            // https://github.com/vmware/clarity/issues/2430
            if (this.multiAlertService.currentAlert === this || this.multiAlertService.count === 0) {
                if (this.hidden === true) {
                    this.previouslyHidden = true;
                    this.hidden = false;
                }
            }
            else if (this.hidden === false) {
                this.previouslyHidden = false;
                this.hidden = true;
            }
            this.detectChangesIfNeeded();
        }
        return this.hidden;
    }
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    }
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
};
__decorate([
    Input('clrAlertSizeSmall'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "isSmall", void 0);
__decorate([
    Input('clrAlertClosable'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "closable", void 0);
__decorate([
    Input('clrAlertAppLevel'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "isAppLevel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ClrAlert.prototype, "clrCloseButtonAriaLabel", void 0);
__decorate([
    Input('clrAlertClosed'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "_closed", void 0);
__decorate([
    Output('clrAlertClosedChange'),
    __metadata("design:type", EventEmitter)
], ClrAlert.prototype, "_closedChanged", void 0);
__decorate([
    Input('clrAlertType'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrAlert.prototype, "alertType", null);
__decorate([
    Input('clrPolite'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "polite", void 0);
__decorate([
    Input('clrAssertive'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "assertive", void 0);
__decorate([
    Input('clrOff'),
    __metadata("design:type", Boolean)
], ClrAlert.prototype, "off", void 0);
__decorate([
    Input('clrAlertIcon'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrAlert.prototype, "alertIconShape", null);
ClrAlert = __decorate([
    Component({
        selector: 'clr-alert',
        providers: [AlertIconAndTypesService],
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div\n    *ngIf=\"!_closed\"\n    class=\"alert\"\n    [ngClass]=\"alertClass\"\n    [class.alert-hidden]=\"isHidden\"\n    [class.alert-sm]=\"isSmall\"\n    [class.alert-app-level]=\"isAppLevel\"\n    [attr.aria-live]=\"setAriaLive\">\n    <div class=\"alert-items\">\n        <ng-content></ng-content>\n    </div>\n    <button \n        type=\"button\" \n        class=\"close\" \n        *ngIf=\"closable\" \n        (click)=\"close()\" \n        [attr.aria-label]=\"clrCloseButtonAriaLabel\"\n        >\n        <clr-icon shape=\"close\"></clr-icon>\n    </button>\n</div>\n",
        styles: [':host { display: block; }']
    }),
    __param(2, Optional()),
    __metadata("design:paramtypes", [AlertIconAndTypesService,
        ChangeDetectorRef,
        MultiAlertService,
        ClrCommonStringsService])
], ClrAlert);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAlertItem = class ClrAlertItem {
    constructor(iconService) {
        this.iconService = iconService;
    }
};
ClrAlertItem = __decorate([
    Component({
        selector: 'clr-alert-item',
        template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" 
              [attr.shape]="iconService.alertIconShape" 
              [attr.title]="iconService.alertIconTitle"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
        host: { class: 'alert-item' }
    }),
    __metadata("design:paramtypes", [AlertIconAndTypesService])
], ClrAlertItem);

let ClrAlerts = class ClrAlerts {
    constructor(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    /**
     * Input/Output to support two way binding on current alert index
     */
    set _inputCurrentIndex(index) {
        if (Number.isInteger(index) && index >= 0) {
            this.multiAlertService.current = index;
        }
    }
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    /**
     * Input/Output to support two way binding on current alert instance
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Ensure we are only dealing with alerts that have not been closed yet
     */
    get alerts() {
        return this.allAlerts.filter(alert => {
            return alert.isHidden === false;
        });
    }
    get currentAlertType() {
        if (this.multiAlertService.currentAlert) {
            return this.multiAlertService.currentAlert.alertType;
        }
        return '';
    }
    ngAfterContentInit() {
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.next(index);
            this.currentAlertChange.next(this.multiAlertService.currentAlert);
        });
    }
    ngOnDestroy() {
        this.multiAlertService.destroy();
    }
};
__decorate([
    ContentChildren(ClrAlert),
    __metadata("design:type", QueryList)
], ClrAlerts.prototype, "allAlerts", void 0);
__decorate([
    Input('clrCurrentAlertIndex'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrAlerts.prototype, "_inputCurrentIndex", null);
__decorate([
    Output('clrCurrentAlertIndexChange'),
    __metadata("design:type", Object)
], ClrAlerts.prototype, "currentAlertIndexChange", void 0);
__decorate([
    Input('clrCurrentAlert'),
    __metadata("design:type", ClrAlert),
    __metadata("design:paramtypes", [ClrAlert])
], ClrAlerts.prototype, "currentAlert", null);
__decorate([
    Output('clrCurrentAlertChange'),
    __metadata("design:type", Object)
], ClrAlerts.prototype, "currentAlertChange", void 0);
ClrAlerts = __decorate([
    Component({
        selector: 'clr-alerts',
        template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-alerts-pager\n        *ngIf=\"multiAlertService.count > 1\"\n        [clrCurrentAlertIndex]=\"currentAlertIndex\">\n</clr-alerts-pager>\n<ng-content select=\"clr-alert\"></ng-content>\n",
        providers: [MultiAlertService],
        host: {
            '[class.alerts]': 'true',
            '[class.alert-danger]': "this.currentAlertType == 'danger'",
            '[class.alert-info]': "this.currentAlertType == 'info'",
            '[class.alert-success]': "this.currentAlertType == 'success'",
            '[class.alert-warning]': "this.currentAlertType == 'warning'",
        },
        styles: [':host { display: block }']
    }),
    __metadata("design:paramtypes", [MultiAlertService])
], ClrAlerts);

let ClrAlertsPager = class ClrAlertsPager {
    constructor(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    /**
     * Input/Output to support two way binding on current alert instance
     */
    set currentAlert(alert) {
        if (alert) {
            this.multiAlertService.currentAlert = alert;
        }
    }
    get currentAlert() {
        return this.multiAlertService.currentAlert;
    }
    /**
     * Input/Output to support two way binding on current alert index
     */
    set currentAlertIndex(index) {
        this.multiAlertService.current = index;
    }
    get currentAlertIndex() {
        return this.multiAlertService.current;
    }
    ngOnInit() {
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(index => {
            this.currentAlertIndexChange.emit(index);
            this.currentAlertChange.emit(this.multiAlertService.activeAlerts[index]);
        });
    }
    pageUp() {
        this.multiAlertService.next();
    }
    pageDown() {
        this.multiAlertService.previous();
    }
    ngOnDestroy() {
        this.multiAlertServiceChanges.unsubscribe();
    }
};
__decorate([
    Input('clrCurrentAlert'),
    __metadata("design:type", ClrAlert),
    __metadata("design:paramtypes", [ClrAlert])
], ClrAlertsPager.prototype, "currentAlert", null);
__decorate([
    Output('clrCurrentAlertChange'),
    __metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertChange", void 0);
__decorate([
    Input('clrCurrentAlertIndex'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ClrAlertsPager.prototype, "currentAlertIndex", null);
__decorate([
    Output('clrCurrentAlertIndexChange'),
    __metadata("design:type", Object)
], ClrAlertsPager.prototype, "currentAlertIndexChange", void 0);
ClrAlertsPager = __decorate([
    Component({
        selector: 'clr-alerts-pager',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"alerts-pager-control\">\n    <div class=\"alerts-page-down\">\n        <button class=\"alerts-pager-button\" (click)=\"pageDown()\">\n            <clr-icon shape=\"caret left\" [attr.title]=\"commonStrings.keys.previous\"></clr-icon>\n        </button>\n    </div>\n    <div class=\"alerts-pager-text\">\n        {{this.multiAlertService.current+1}} / {{this.multiAlertService.count}}\n    </div>\n    <div class=\"alerts-page-up\">\n        <button class=\"alerts-pager-button\" (click)=\"pageUp()\">\n            <clr-icon shape=\"caret right\" [attr.title]=\"commonStrings.keys.next\"></clr-icon>\n        </button>\n    </div>\n</div>\n",
        host: { '[class.alerts-pager]': 'true' }
    }),
    __metadata("design:paramtypes", [MultiAlertService, ClrCommonStringsService])
], ClrAlertsPager);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
let ClrAlertModule = class ClrAlertModule {
};
ClrAlertModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrDropdownModule],
        declarations: [CLR_ALERT_DIRECTIVES],
        exports: [CLR_ALERT_DIRECTIVES],
    })
], ClrAlertModule);

let ClrEmphasisModule = class ClrEmphasisModule {
};
ClrEmphasisModule = __decorate([
    NgModule({ exports: [ClrAlertModule] })
], ClrEmphasisModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ResponsiveNavCodes {
}
ResponsiveNavCodes.NAV_LEVEL_1 = 1;
ResponsiveNavCodes.NAV_LEVEL_2 = 2;
ResponsiveNavCodes.NAV_CLOSE_ALL = 'NAV_CLOSE_ALL';
ResponsiveNavCodes.NAV_OPEN = 'NAV_OPEN';
ResponsiveNavCodes.NAV_CLOSE = 'NAV_CLOSE';
ResponsiveNavCodes.NAV_TOGGLE = 'NAV_TOGGLE';
ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU = 'open-hamburger-menu';
ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU = 'open-overflow-menu';
ResponsiveNavCodes.NAV_CLASS_TRIGGER_1 = 'header-hamburger-trigger';
ResponsiveNavCodes.NAV_CLASS_TRIGGER_2 = 'header-overflow-trigger';
ResponsiveNavCodes.NAV_CLASS_LEVEL_1 = 'clr-nav-level-1';
ResponsiveNavCodes.NAV_CLASS_LEVEL_2 = 'clr-nav-level-2';

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ResponsiveNavControlMessage {
    constructor(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    get controlCode() {
        return this._controlCode;
    }
    get navLevel() {
        return this._navLevel;
    }
}

let ResponsiveNavigationService = class ResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    get registeredNavs() {
        return this.registerNavSubject.asObservable();
    }
    get navControl() {
        return this.controlNavSubject.asObservable();
    }
    registerNav(navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    }
    isNavRegistered(navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    }
    unregisterNav(navLevel) {
        const index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    }
    sendControlMessage(controlCode, navLevel) {
        const message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    closeAllNavs() {
        const message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
};
ResponsiveNavigationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
ResponsiveNavigationService = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [])
], ResponsiveNavigationService);

let ClrMainContainer = class ClrMainContainer {
    constructor(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    ngOnInit() {
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: (message) => {
                this.processMessage(message);
            },
        });
    }
    processMessage(message) {
        let navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    }
    controlNav(controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    }
    ngOnDestroy() {
        try {
            this._subscription.unsubscribe();
        }
        catch (error) {
        }
    }
};
ClrMainContainer = __decorate([
    Directive({ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } }),
    __metadata("design:paramtypes", [ElementRef, ResponsiveNavigationService])
], ClrMainContainer);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
let ClrMainContainerModule = class ClrMainContainerModule {
};
ClrMainContainerModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule],
        declarations: [CLR_LAYOUT_DIRECTIVES],
        exports: [CLR_LAYOUT_DIRECTIVES],
    })
], ClrMainContainerModule);

let MainContainerWillyWonka = class MainContainerWillyWonka extends WillyWonka {
};
MainContainerWillyWonka = __decorate([
    Directive({ selector: 'clr-main-container' })
], MainContainerWillyWonka);

let NavDetectionOompaLoompa = class NavDetectionOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, responsiveNavService) {
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        super(cdr, willyWonka);
        this.responsiveNavService = responsiveNavService;
    }
    // NavDetectionOompaLoompa is the addition of the nav levels
    // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
    get flavor() {
        return this.responsiveNavService.responsiveNavList.reduce((sum, navLevel) => sum + navLevel, 0);
    }
};
NavDetectionOompaLoompa = __decorate([
    Directive({ selector: 'clr-header' }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        MainContainerWillyWonka,
        ResponsiveNavigationService])
], NavDetectionOompaLoompa);

let ClrHeader = class ClrHeader {
    constructor(responsiveNavService, commonStrings) {
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
    // decides which triggers to show on the header
    initializeNavTriggers(navList) {
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(navLevel => {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        });
    }
    // closes the nav that is open
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    // toggles the nav that is open
    toggleNav(navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
};
ClrHeader = __decorate([
    Component({
        selector: 'clr-header',
        template: `
        <button
            type="button"
            *ngIf="isNavLevel1OnPage"
            class="header-hamburger-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.keys.open : commonStrings.keys.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            [attr.aria-label]="(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.keys.open : commonStrings.keys.close"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
        host: { '[class.header]': 'true' }
    }),
    __metadata("design:paramtypes", [ResponsiveNavigationService,
        ClrCommonStringsService])
], ClrHeader);

let ClrNavLevel = class ClrNavLevel {
    constructor(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    }
    addNavClass(level) {
        const navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    }
    get level() {
        return this._level;
    }
    // getter to access the responsive navigation codes from the template
    get responsiveNavCodes() {
        return ResponsiveNavCodes;
    }
    open() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    }
    close() {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    }
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    onMouseClick(target) {
        let current = target; // Get the element in the DOM on which the mouse was clicked
        const navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
        // Start checking if current and navHost are equal.
        // If not traverse to the parentNode and check again.
        while (current) {
            if (current === navHost) {
                return;
            }
            else if (current.classList.contains('nav-link')) {
                this.close();
                return;
            }
            current = current.parentNode;
        }
    }
    ngOnDestroy() {
        this.responsiveNavService.unregisterNav(this.level);
    }
};
__decorate([
    Input('clr-nav-level'),
    __metadata("design:type", Number)
], ClrNavLevel.prototype, "_level", void 0);
__decorate([
    HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClrNavLevel.prototype, "onMouseClick", null);
ClrNavLevel = __decorate([
    Directive({ selector: '[clr-nav-level]' }),
    __metadata("design:paramtypes", [ResponsiveNavigationService, ElementRef])
], ClrNavLevel);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
let ClrNavigationModule = class ClrNavigationModule {
};
ClrNavigationModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrDropdownModule],
        declarations: [CLR_NAVIGATION_DIRECTIVES],
        exports: [CLR_NAVIGATION_DIRECTIVES],
    })
], ClrNavigationModule);

let TemplateRefContainer = class TemplateRefContainer {
};
__decorate([
    ViewChild(TemplateRef, { static: false }),
    __metadata("design:type", TemplateRef)
], TemplateRefContainer.prototype, "template", void 0);
TemplateRefContainer = __decorate([
    Component({
        template: `
      <ng-template>
        <ng-content></ng-content>
      </ng-template>
    `
    })
], TemplateRefContainer);

const TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

let ClrTemplateRefModule = class ClrTemplateRefModule {
};
ClrTemplateRefModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [TEMPLATE_REF_DIRECTIVES],
        entryComponents: [TEMPLATE_REF_DIRECTIVES],
        exports: [TEMPLATE_REF_DIRECTIVES],
    })
], ClrTemplateRefModule);

let TabsWillyWonka = class TabsWillyWonka extends WillyWonka {
};
TabsWillyWonka = __decorate([
    Directive({ selector: 'clr-tabs' })
], TabsWillyWonka);

let ActiveOompaLoompa = class ActiveOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, id, ifActive) {
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        super(cdr, willyWonka);
        this.ifActive = ifActive;
        this.id = id;
    }
    get flavor() {
        return this.ifActive.current === this.id;
    }
};
ActiveOompaLoompa = __decorate([
    Directive({ selector: '[clrTabLink], clr-tab-content' }),
    __param(1, Optional()),
    __param(2, Inject(IF_ACTIVE_ID)),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        TabsWillyWonka, Number, IfActiveService])
], ActiveOompaLoompa);

// TODO: if we find more components that could use this, consider moving this to utils
let AriaService = class AriaService {
};
AriaService = __decorate([
    Injectable()
], AriaService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TabsLayout;
(function (TabsLayout) {
    TabsLayout["HORIZONTAL"] = "horizontal";
    TabsLayout["VERTICAL"] = "vertical";
})(TabsLayout || (TabsLayout = {}));

let TabsService = class TabsService {
    constructor() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    register(tab) {
        this._children.push(tab);
    }
    get children() {
        return this._children;
    }
    get activeTab() {
        return this.children.find((tab) => {
            return tab.active;
        });
    }
    get overflowTabs() {
        if (this.layout === TabsLayout.VERTICAL) {
            return [];
        }
        else {
            return this.children.filter((tab) => tab.tabLink.inOverflow === true);
        }
    }
    unregister(tab) {
        const index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
};
TabsService = __decorate([
    Injectable()
], TabsService);

let nbTabContentComponents = 0;
let ClrTabContent = class ClrTabContent {
    constructor(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    // The template must be applied on the top-down phase of view-child initialization to prevent
    // components in the content from initializing before a content container exists.
    // Some child components need their container for sizing calculations.
    /* tslint:disable:no-unused-variable */
    set templateRef(value) {
        this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
    }
    /* tslint:enable:no-unused-variable */
    get ariaLabelledBy() {
        return this.ariaService.ariaLabelledBy;
    }
    get tabContentId() {
        return this.ariaService.ariaControls;
    }
    set tabContentId(id) {
        this.ariaService.ariaControls = id;
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
    ngOnDestroy() {
        const index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
        }
    }
};
__decorate([
    ViewChild('tabContentProjectedRef', { static: true }),
    __metadata("design:type", TemplateRef),
    __metadata("design:paramtypes", [TemplateRef])
], ClrTabContent.prototype, "templateRef", null);
__decorate([
    Input('id'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTabContent.prototype, "tabContentId", null);
ClrTabContent = __decorate([
    Component({
        selector: 'clr-tab-content',
        template: `
    <ng-template #tabContentProjectedRef>
      <section [id]="tabContentId" role="tabpanel" class="tab-content" [class.active]="active"
               [hidden]="!active"
               [attr.aria-labelledby]="ariaLabelledBy"
               [attr.aria-expanded]="active"
               [attr.aria-hidden]="!active">
        <ng-content></ng-content>
      </section>
    </ng-template>
    `
    }),
    __param(1, Inject(IF_ACTIVE_ID)),
    __metadata("design:paramtypes", [IfActiveService, Number, AriaService,
        TabsService])
], ClrTabContent);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbTabsComponent = 0;
const TABS_ID = new InjectionToken('TABS_ID');
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
const TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};

let nbTabLinkComponents = 0;
let ClrTabLink = class ClrTabLink {
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        if (!this.tabLinkId) {
            this.tabLinkId = 'clr-tab-link-' + nbTabLinkComponents++;
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    set inOverflow(inOverflow) {
        this._inOverflow = inOverflow;
    }
    get inOverflow() {
        return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
    }
    get addLinkClasses() {
        return !this.inOverflow;
    }
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    activate() {
        this.ifActiveService.current = this.id;
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
};
__decorate([
    Input('clrTabLinkInOverflow'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], ClrTabLink.prototype, "inOverflow", null);
__decorate([
    HostBinding('class.btn-link'),
    HostBinding('class.nav-link'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrTabLink.prototype, "addLinkClasses", null);
__decorate([
    HostBinding('attr.aria-controls'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ClrTabLink.prototype, "ariaControls", null);
__decorate([
    HostBinding('id'),
    Input('id'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTabLink.prototype, "tabLinkId", null);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrTabLink.prototype, "activate", null);
__decorate([
    HostBinding('class.active'),
    HostBinding('attr.aria-selected'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrTabLink.prototype, "active", null);
ClrTabLink = __decorate([
    Directive({
        selector: '[clrTabLink]',
        host: {
            '[attr.aria-hidden]': 'false',
            '[class.btn]': 'true',
            role: 'tab',
            type: 'button',
        },
    }),
    __param(1, Inject(IF_ACTIVE_ID)),
    __param(7, Inject(TABS_ID)),
    __metadata("design:paramtypes", [IfActiveService, Number, AriaService,
        ElementRef,
        ComponentFactoryResolver,
        ViewContainerRef,
        TabsService, Number])
], ClrTabLink);

let ClrTab = class ClrTab {
    constructor(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    ngOnDestroy() {
        this.tabsService.unregister(this);
    }
    get active() {
        return this.ifActiveService.current === this.id;
    }
};
__decorate([
    ContentChild(ClrTabLink, { static: true }),
    __metadata("design:type", ClrTabLink)
], ClrTab.prototype, "tabLink", void 0);
__decorate([
    ContentChild(ClrTabContent, { static: true }),
    __metadata("design:type", ClrTabContent)
], ClrTab.prototype, "tabContent", void 0);
ClrTab = __decorate([
    Component({
        selector: 'clr-tab',
        template: `
        <ng-content></ng-content>
    `,
        providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
    }),
    __param(1, Inject(IF_ACTIVE_ID)),
    __metadata("design:paramtypes", [IfActiveService, Number, TabsService])
], ClrTab);

let ClrTabOverflowContent = class ClrTabOverflowContent extends AbstractPopover {
    constructor(injector, parentHost) {
        super(injector, parentHost);
        this.anchorPoint = Point.BOTTOM_RIGHT;
        this.popoverPoint = Point.RIGHT_TOP;
        this.closeOnOutsideClick = true;
    }
};
ClrTabOverflowContent = __decorate([
    Component({
        selector: 'clr-tab-overflow-content',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.dropdown-menu]': 'true',
        }
    }),
    __param(1, SkipSelf()),
    __metadata("design:paramtypes", [Injector, ElementRef])
], ClrTabOverflowContent);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrKeyFocusItem = class ClrKeyFocusItem {
    constructor(elementRef, platformId) {
        this.elementRef = elementRef;
        this.platformId = platformId;
        this.tabIndex = -1;
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    focus() {
        if (isPlatformBrowser(this.platformId)) {
            this.elementRef.nativeElement.focus();
        }
    }
};
__decorate([
    HostBinding('attr.tabindex'),
    __metadata("design:type", Object)
], ClrKeyFocusItem.prototype, "tabIndex", void 0);
ClrKeyFocusItem = __decorate([
    Directive({
        selector: '[clrKeyFocusItem]',
    }),
    __param(1, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ElementRef, Object])
], ClrKeyFocusItem);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrFocusDirection;
(function (ClrFocusDirection) {
    ClrFocusDirection["VERTICAL"] = "vertical";
    ClrFocusDirection["HORIZONTAL"] = "horizontal";
    ClrFocusDirection["BOTH"] = "both";
})(ClrFocusDirection || (ClrFocusDirection = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// Event.key key codes for standard browsers and IE/Edge
var KeyCodes;
(function (KeyCodes) {
    KeyCodes["ArrowUp"] = "ArrowUp";
    KeyCodes["ArrowDown"] = "ArrowDown";
    KeyCodes["ArrowRight"] = "ArrowRight";
    KeyCodes["ArrowLeft"] = "ArrowLeft";
    KeyCodes["Space"] = " ";
    KeyCodes["Escape"] = "Escape";
    KeyCodes["Home"] = "Home";
    KeyCodes["End"] = "End";
    KeyCodes["Enter"] = "Enter";
    KeyCodes["Tab"] = "Tab";
})(KeyCodes || (KeyCodes = {}));
var IEKeyCodes;
(function (IEKeyCodes) {
    IEKeyCodes["ArrowUp"] = "Up";
    IEKeyCodes["ArrowDown"] = "Down";
    IEKeyCodes["ArrowRight"] = "Right";
    IEKeyCodes["ArrowLeft"] = "Left";
    IEKeyCodes["Space"] = "Spacebar";
    IEKeyCodes["Escape"] = "Esc";
    IEKeyCodes["Home"] = "Home";
    IEKeyCodes["End"] = "End";
    IEKeyCodes["Enter"] = "Enter";
    IEKeyCodes["Tab"] = "Tab";
})(IEKeyCodes || (IEKeyCodes = {}));

/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
function preventArrowKeyScroll(event) {
    const keyCodes = getKeyCodes(event);
    if (event.key === keyCodes.ArrowUp ||
        event.key === keyCodes.ArrowDown ||
        event.key === keyCodes.ArrowLeft ||
        event.key === keyCodes.ArrowRight) {
        // prevent element container scroll
        // MDN references this is really the only way to prevent native browser interactions
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
        event.preventDefault();
    }
}
function getKeyCodes(event) {
    // IE does not properly follow the spec for `event.key` so we need to return a different enum for the key events
    // We use `event.key` for optimal browser support, to detect IE/Edge check if `event.code` is undefined
    const isIEKeyboardEvent = event.code === undefined;
    return isIEKeyboardEvent ? IEKeyCodes : KeyCodes;
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrKeyFocus = class ClrKeyFocus {
    constructor() {
        this.direction = ClrFocusDirection.VERTICAL;
        this.focusOnLoad = false;
        this.focusChange = new EventEmitter();
        this._current = 0;
        this.subscriptions = [];
    }
    set focusableItems(elements) {
        // We accept a list of focusable elements (HTMLElements or existing Directives) or auto query for clrKeyFocusItem
        // We accept a list reference in the cases where we cannot use ContentChildren to query
        // ContentChildren can be unavailable if content is projected outside the scope of the component (see tabs).
        if (elements && elements.length) {
            this._focusableItems = elements;
            this.initializeFocus();
        }
    }
    get focusableItems() {
        if (this._focusableItems) {
            return this._focusableItems;
        }
        else {
            return this.clrKeyFocusItems.toArray();
        }
    }
    get current() {
        return this._current;
    }
    ngAfterContentInit() {
        this.subscriptions.push(this.listenForItemUpdates());
        this.initializeFocus();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    handleKeyboardEvent(event) {
        if (this.prevKeyPressed(event) && this.currentFocusIsNotFirstItem()) {
            this.keyAction(() => this._current--);
        }
        else if (this.nextKeyPressed(event) && this.currentFocusIsNotLastItem()) {
            this.keyAction(() => this._current++);
        }
        else if (event.code === KeyCodes.Home) {
            this.keyAction(() => (this._current = 0));
        }
        else if (event.code === KeyCodes.End) {
            this.keyAction(() => (this._current = this.focusableItems.length - 1));
        }
        preventArrowKeyScroll(event);
    }
    setClickedItemCurrent(event) {
        let position;
        if (this.focusableItems[0].nativeElement) {
            position = this.focusableItems.map(item => item.nativeElement).indexOf(event.target);
        }
        else {
            position = this.focusableItems.indexOf(event.target);
        }
        if (position > -1) {
            this._current = position;
        }
    }
    resetTabFocus() {
        this.currentItem.tabIndex = -1;
        this._current = 0;
        this.currentItem.tabIndex = 0;
    }
    moveTo(position) {
        if (this.positionInRange(position) && position !== this._current) {
            this.keyAction(() => (this._current = position));
        }
    }
    positionInRange(position) {
        return position >= 0 && position < this.focusableItems.length;
    }
    get currentItem() {
        if (this._current >= this.focusableItems.length) {
            return null;
        }
        return this.focusableItems[this._current];
    }
    currentFocusIsNotFirstItem() {
        return this._current - 1 >= 0;
    }
    currentFocusIsNotLastItem() {
        return this._current + 1 < this.focusableItems.length;
    }
    initializeFocus() {
        if (this.focusableItems && this.focusableItems.length) {
            this.focusableItems.forEach(i => (i.tabIndex = -1));
            this.currentItem.tabIndex = 0;
        }
        if (this.focusOnLoad) {
            this.currentItem.focus();
            this.focusChange.next();
        }
    }
    listenForItemUpdates() {
        return this.clrKeyFocusItems.changes.subscribe(() => {
            this.focusableItems.forEach(item => (item.tabIndex = -1));
            this._current = 0;
            this.currentItem.tabIndex = 0;
        });
    }
    keyAction(action) {
        this.currentItem.tabIndex = -1;
        action.call(this);
        this.currentItem.tabIndex = 0;
        this.currentItem.focus();
        this.focusChange.next();
    }
    nextKeyPressed(event) {
        const keyCodes = getKeyCodes(event);
        switch (this.direction) {
            case ClrFocusDirection.VERTICAL:
                return event.key === keyCodes.ArrowDown;
            case ClrFocusDirection.HORIZONTAL:
                return event.key === keyCodes.ArrowRight;
            case ClrFocusDirection.BOTH:
                return event.key === keyCodes.ArrowDown || event.key === keyCodes.ArrowRight;
            default:
                return false;
        }
    }
    prevKeyPressed(event) {
        const keyCodes = getKeyCodes(event);
        switch (this.direction) {
            case ClrFocusDirection.VERTICAL:
                return event.key === keyCodes.ArrowUp;
            case ClrFocusDirection.HORIZONTAL:
                return event.key === keyCodes.ArrowLeft;
            case ClrFocusDirection.BOTH:
                return event.key === keyCodes.ArrowUp || event.key === keyCodes.ArrowLeft;
            default:
                return false;
        }
    }
};
__decorate([
    Input('clrDirection'),
    __metadata("design:type", Object)
], ClrKeyFocus.prototype, "direction", void 0);
__decorate([
    Input('clrFocusOnLoad'),
    __metadata("design:type", Object)
], ClrKeyFocus.prototype, "focusOnLoad", void 0);
__decorate([
    Output('clrFocusChange'),
    __metadata("design:type", EventEmitter)
], ClrKeyFocus.prototype, "focusChange", void 0);
__decorate([
    ContentChildren(ClrKeyFocusItem, { descendants: true }),
    __metadata("design:type", QueryList)
], ClrKeyFocus.prototype, "clrKeyFocusItems", void 0);
__decorate([
    Input('clrKeyFocus'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], ClrKeyFocus.prototype, "focusableItems", null);
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], ClrKeyFocus.prototype, "handleKeyboardEvent", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClrKeyFocus.prototype, "setClickedItemCurrent", null);
ClrKeyFocus = __decorate([
    Component({
        selector: '[clrKeyFocus]',
        template: '<ng-content></ng-content>'
    })
], ClrKeyFocus);

let ClrTabs = class ClrTabs {
    constructor(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings, platformId) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
        this.tabsId = tabsId;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.subscriptions = [];
        this._tabLinkDirectives = [];
        this.tabLinkElements = [];
    }
    get overflowPosition() {
        return this._tabLinkDirectives.filter(link => !link.inOverflow).length;
    }
    /* tslint:disable:no-unused-variable */
    set tabContentViewContainer(value) {
        this.tabsService.tabContentViewContainer = value;
    }
    /* tslint:enable:no-unused-variable */
    set layout(layout) {
        if (Object.keys(TabsLayout)
            .map(key => {
            return TabsLayout[key];
        })
            .indexOf(layout) >= 0) {
            this.tabsService.layout = layout;
        }
    }
    get layout() {
        return this.tabsService.layout;
    }
    get tabLinkDirectives() {
        return this._tabLinkDirectives;
    }
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    get tabIds() {
        return this.tabsService.children.map(tab => tab.tabLink.tabLinkId).join(' ');
    }
    ngAfterContentInit() {
        this.subscriptions.push(this.listenForTabLinkChanges(), this.listenForOverflowMenuFocusChanges());
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    }
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
    checkFocusVisible() {
        if (!this.ifOpenService.open && this.inOverflow()) {
            this.ifOpenService.open = true;
        }
        else if (this.ifOpenService.open && !this.inOverflow()) {
            this.ifOpenService.open = false;
        }
    }
    inOverflow() {
        return (this.tabLinkElements.indexOf(document.activeElement) > -1 &&
            this.keyFocus.current >= this.overflowPosition);
    }
    get isVertical() {
        return this.layout === TabsLayout.VERTICAL;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
    listenForTabLinkChanges() {
        return this.tabs.changes.pipe(startWith(this.tabs.map(tab => tab.tabLink))).subscribe(() => {
            this._tabLinkDirectives = this.tabs.map(tab => tab.tabLink);
            this.tabLinkElements = this._tabLinkDirectives.map(tab => tab.el.nativeElement);
        });
    }
    listenForOverflowMenuFocusChanges() {
        return this.ifOpenService.openChange.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(open => {
            if (open && !this.inOverflow()) {
                this.focusToFirstItemInOverflow();
            }
            else if (!open && this.nextFocusedItemIsNotInOverflow()) {
                this.keyFocus.resetTabFocus();
            }
        });
    }
    focusToFirstItemInOverflow() {
        this.keyFocus.moveTo(this.overflowPosition);
    }
    nextFocusedItemIsNotInOverflow() {
        return this.tabLinkElements.find(e => e === document.activeElement) === undefined;
    }
};
__decorate([
    ViewChild('tabContentViewContainer', { static: true, read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef),
    __metadata("design:paramtypes", [ViewContainerRef])
], ClrTabs.prototype, "tabContentViewContainer", null);
__decorate([
    Input('clrLayout'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTabs.prototype, "layout", null);
__decorate([
    ContentChildren(ClrTab),
    __metadata("design:type", QueryList)
], ClrTabs.prototype, "tabs", void 0);
__decorate([
    ViewChild(ClrKeyFocus, { static: true }),
    __metadata("design:type", ClrKeyFocus)
], ClrTabs.prototype, "keyFocus", void 0);
__decorate([
    HostBinding('class.tabs-vertical'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrTabs.prototype, "isVertical", null);
ClrTabs = __decorate([
    Component({
        selector: 'clr-tabs',
        template: `
        <ul class="nav" role="tablist" [attr.aria-owns]="tabIds" [clrKeyFocus]="tabLinkElements" clrDirection="both"
            (clrFocusChange)="checkFocusVisible()">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="link.tabsId === tabsId && !link.inOverflow">
                    <li role="presentation" class="nav-item">
                        <ng-container [ngTemplateOutlet]="link.templateRefContainer.template"></ng-container>
                    </li>
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open" role="presentation">
                    <li role="application" class="nav-item" (click)="toggleOverflow($event)">
                        <button class="btn btn-link nav-link dropdown-toggle" type="button" aria-hidden="true"
                                [class.active]="activeTabInOverflow" [class.open]="inOverflow()" tabIndex="-1">
                            <clr-icon shape="ellipsis-horizontal"
                              [class.is-info]="ifOpenService.open"
                              [attr.title]="commonStrings.keys.more"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.tabsId === tabsId && link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <ng-container #tabContentViewContainer></ng-container>
    `,
        providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
    }),
    __param(3, Inject(TABS_ID)),
    __param(5, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [IfActiveService,
        IfOpenService,
        TabsService, Number, ClrCommonStringsService,
        Object])
], ClrTabs);

const KEY_FOCUS_DIRECTIVES = [ClrKeyFocus, ClrKeyFocusItem];
let ClrKeyFocusModule = class ClrKeyFocusModule {
};
ClrKeyFocusModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [KEY_FOCUS_DIRECTIVES],
        exports: [KEY_FOCUS_DIRECTIVES],
    })
], ClrKeyFocusModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_TABS_DIRECTIVES = [
    ClrTabContent,
    ClrTab,
    ClrTabs,
    ClrTabOverflowContent,
    ClrTabLink,
    TabsWillyWonka,
    ActiveOompaLoompa,
];
let ClrTabsModule = class ClrTabsModule {
};
ClrTabsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ClrCommonPopoverModule,
            ClrConditionalModule,
            ClrIconModule,
            ClrTemplateRefModule,
            ClrKeyFocusModule,
        ],
        declarations: [CLR_TABS_DIRECTIVES],
        exports: [CLR_TABS_DIRECTIVES, ClrConditionalModule],
    })
], ClrTabsModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*  This directive is for guiding the document focus to the newly added content when its view is initialized
    so that assistive technologies can read its content. */
let ClrFocusOnViewInit = class ClrFocusOnViewInit {
    constructor(el, platformId, injector, renderer) {
        this.el = el;
        this.platformId = platformId;
        this.injector = injector;
        this.renderer = renderer;
        this.directFocus = true; // true if the element gets focused without need to set tabindex;
        this.document = this.injector.get(DOCUMENT);
    }
    onFocusout() {
        if (!this.directFocus) {
            // manually set attributes and styles should be removed
            this.renderer.removeAttribute(this.el.nativeElement, 'tabindex');
            this.renderer.setStyle(this.el.nativeElement, 'outline', null);
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.document.activeElement === this.el.nativeElement) {
                return;
            }
            if (this.el.nativeElement) {
                this.el.nativeElement.focus();
                if (this.document.activeElement !== this.el.nativeElement) {
                    // if it's not directly focused now, it means it was a non-interactive element
                    // so we need to give it a tabindex.
                    this.directFocus = false;
                    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
                    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
                    this.el.nativeElement.focus();
                }
            }
        }
    }
};
__decorate([
    HostListener('focusout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrFocusOnViewInit.prototype, "onFocusout", null);
ClrFocusOnViewInit = __decorate([
    Directive({
        selector: '[clrFocusOnViewInit]',
    }),
    __param(1, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [ElementRef,
        Object,
        Injector,
        Renderer2])
], ClrFocusOnViewInit);

const FOCUS_ON_VIEW_INIT_DIRECTIVES = [ClrFocusOnViewInit];

let ClrFocusOnViewInitModule = class ClrFocusOnViewInitModule {
};
ClrFocusOnViewInitModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [FOCUS_ON_VIEW_INIT_DIRECTIVES],
        exports: [FOCUS_ON_VIEW_INIT_DIRECTIVES],
    })
], ClrFocusOnViewInitModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let VerticalNavGroupRegistrationService = class VerticalNavGroupRegistrationService {
    constructor() {
        this.navGroupCount = 0;
    }
    registerNavGroup() {
        this.navGroupCount++;
    }
    unregisterNavGroup() {
        this.navGroupCount--;
    }
};
VerticalNavGroupRegistrationService = __decorate([
    Injectable()
], VerticalNavGroupRegistrationService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let VerticalNavIconService = class VerticalNavIconService {
    constructor() {
        this._icons = 0;
    }
    get hasIcons() {
        return this._icons > 0;
    }
    registerIcon() {
        this._icons++;
    }
    unregisterIcon() {
        this._icons--;
    }
};
VerticalNavIconService = __decorate([
    Injectable()
], VerticalNavIconService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let VerticalNavService = class VerticalNavService {
    constructor() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    get animateOnCollapsed() {
        return this._animateOnCollapsed.asObservable();
    }
    get collapsedChanged() {
        return this._collapsedChanged.asObservable();
    }
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(value) {
        value = !!value;
        if (this.collapsible && this._collapsed !== value) {
            this.updateCollapseBehavior(value);
        }
    }
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        value = !!value;
        if (this._collapsible !== value) {
            if (!value && this.collapsed) {
                this.updateCollapseBehavior(false);
            }
            this._collapsible = value;
        }
    }
    updateCollapseBehavior(value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    }
};
VerticalNavService = __decorate([
    Injectable()
], VerticalNavService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrVerticalNav = class ClrVerticalNav {
    constructor(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(value => {
            this._collapsedChanged.emit(value);
        });
    }
    get collapsible() {
        return this._navService.collapsible;
    }
    set collapsible(value) {
        this._navService.collapsible = value;
    }
    get collapsed() {
        return this._navService.collapsed;
    }
    set collapsed(value) {
        this._navService.collapsed = value;
    }
    get hasNavGroups() {
        return this._navGroupRegistrationService.navGroupCount > 0;
    }
    get hasIcons() {
        return this._navIconService.hasIcons;
    }
    toggleByButton() {
        this.collapsed = !this.collapsed;
    }
    ngOnDestroy() {
        this._sub.unsubscribe();
    }
};
__decorate([
    Input('clrVerticalNavCollapsible'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsible", null);
__decorate([
    Input('clrVerticalNavCollapsed'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrVerticalNav.prototype, "collapsed", null);
__decorate([
    Output('clrVerticalNavCollapsedChange'),
    __metadata("design:type", EventEmitter)
], ClrVerticalNav.prototype, "_collapsedChanged", void 0);
ClrVerticalNav = __decorate([
    Component({
        selector: 'clr-vertical-nav',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<button type=\"button\" class=\"nav-trigger\"\n        [class.on-collapse]=\"collapsed\"\n        (click)=\"toggleByButton()\"\n        *ngIf=\"collapsible\">\n    <clr-icon shape=\"angle-double\"\n              class=\"nav-trigger-icon\"\n              [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"\n              [attr.title]=\"(this.collapsed) ? commonStrings.keys.expand : commonStrings.keys.collapse\"></clr-icon>\n</button>\n<!-- Click handler on .nav-content is bad but required :-( -->\n<div class=\"nav-content\">\n    <ng-content></ng-content>\n    <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n</div>\n",
        providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
        host: {
            class: 'clr-vertical-nav',
            '[class.is-collapsed]': 'collapsed',
            '[class.has-nav-groups]': 'hasNavGroups',
            '[class.has-icons]': 'hasIcons',
        }
    }),
    __metadata("design:paramtypes", [VerticalNavService,
        VerticalNavIconService,
        VerticalNavGroupRegistrationService,
        ClrCommonStringsService])
], ClrVerticalNav);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let VerticalNavGroupService = class VerticalNavGroupService {
    constructor() {
        this._expandChange = new Subject();
    }
    get expandChange() {
        return this._expandChange.asObservable();
    }
    expand() {
        this._expandChange.next(true);
    }
};
VerticalNavGroupService = __decorate([
    Injectable()
], VerticalNavGroupService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const EXPANDED_STATE = 'expanded';
const COLLAPSED_STATE = 'collapsed';
let ClrVerticalNavGroup = class ClrVerticalNavGroup {
    constructor(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.commonStrings = commonStrings;
        this.wasExpanded = false;
        this.expandedChange = new EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(value => {
            if (value && this.expandAnimationState === COLLAPSED_STATE) {
                if (this._navService.collapsed) {
                    this._navService.collapsed = false;
                }
                this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && this.expandAnimationState === EXPANDED_STATE) {
                this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((goingToCollapse) => {
            if (goingToCollapse && this.expanded) {
                this.wasExpanded = true;
                this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && this.wasExpanded) {
                this.expandGroup();
                this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((expand) => {
            if (expand && !this.expanded) {
                this.expandGroup();
            }
        }));
    }
    get expanded() {
        return this._itemExpand.expanded;
    }
    set expanded(value) {
        if (this._itemExpand.expanded !== value) {
            this._itemExpand.expanded = value;
            this.expandedChange.emit(value);
        }
    }
    set userExpandedInput(value) {
        value = !!value;
        if (this.expanded !== value) {
            // We have to call toggleExpand because some cases require animations to occur first
            // Directly setting the Expand service value skips the animation and can result in
            // nodes in the DOM but the nav group still being collapsed
            this.toggleExpand();
        }
    }
    expandGroup() {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    }
    collapseGroup() {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    }
    // closes a group after the collapse animation
    expandAnimationDone($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    }
    get expandAnimationState() {
        return this._expandAnimationState;
    }
    set expandAnimationState(value) {
        if (value !== this._expandAnimationState) {
            this._expandAnimationState = value;
        }
    }
    toggleExpand() {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            // If nav is collasped, first open the nav
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            // then expand the nav group
            this.expandGroup();
        }
    }
    ngAfterContentInit() {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    }
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._navGroupRegistrationService.unregisterNavGroup();
    }
};
__decorate([
    HostBinding('class.is-expanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrVerticalNavGroup.prototype, "expanded", null);
__decorate([
    Input('clrVerticalNavGroupExpanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrVerticalNavGroup.prototype, "userExpandedInput", null);
__decorate([
    Output('clrVerticalNavGroupExpandedChange'),
    __metadata("design:type", EventEmitter)
], ClrVerticalNavGroup.prototype, "expandedChange", void 0);
ClrVerticalNavGroup = __decorate([
    Component({
        selector: 'clr-vertical-nav-group',
        template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\"\n                  [attr.title]=\"(this.expanded) ? commonStrings.keys.collapse : commonStrings.keys.expand\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
        providers: [IfExpandService, VerticalNavGroupService],
        animations: [
            trigger('clrExpand', [
                state(EXPANDED_STATE, style({ height: '*' })),
                state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                transition(`${EXPANDED_STATE} <=> ${COLLAPSED_STATE}`, animate('0.2s ease-in-out')),
            ]),
        ],
        host: { class: 'nav-group' }
    }),
    __metadata("design:paramtypes", [IfExpandService,
        VerticalNavGroupRegistrationService,
        VerticalNavGroupService,
        VerticalNavService,
        ClrCommonStringsService])
], ClrVerticalNavGroup);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrVerticalNavGroupChildren = class ClrVerticalNavGroupChildren {
};
ClrVerticalNavGroupChildren = __decorate([
    Component({
        selector: 'clr-vertical-nav-group-children',
        template: `
        <ng-content></ng-content>
    `
    })
], ClrVerticalNavGroupChildren);

let ClrVerticalNavIcon = class ClrVerticalNavIcon {
    constructor(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    ngOnDestroy() {
        this._verticalNavIconService.unregisterIcon();
    }
};
ClrVerticalNavIcon = __decorate([
    Directive({ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } }),
    __metadata("design:paramtypes", [VerticalNavIconService])
], ClrVerticalNavIcon);

let ClrVerticalNavLink = class ClrVerticalNavLink {
    constructor(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    expandParentNavGroup() {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    }
};
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrVerticalNavLink.prototype, "expandParentNavGroup", null);
ClrVerticalNavLink = __decorate([
    Component({
        selector: '[clrVerticalNavLink]',
        template: `
        <ng-content select="[clrVerticalNavIcon]"></ng-content>
        <span class="nav-text">
            <ng-content></ng-content>    
        </span>
    `,
        host: { class: 'nav-link' }
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [VerticalNavGroupService])
], ClrVerticalNavLink);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_VERTICAL_NAV_DIRECTIVES = [
    ClrVerticalNav,
    ClrVerticalNavLink,
    ClrVerticalNavGroup,
    ClrVerticalNavGroupChildren,
    ClrVerticalNavIcon,
];
let ClrVerticalNavModule = class ClrVerticalNavModule {
};
ClrVerticalNavModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrConditionalModule, ClrFocusOnViewInitModule],
        declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
        exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrConditionalModule, ClrIconModule, ClrFocusOnViewInitModule],
    })
], ClrVerticalNavModule);

let ClrLayoutModule = class ClrLayoutModule {
};
ClrLayoutModule = __decorate([
    NgModule({ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] })
], ClrLayoutModule);

let ScrollingService = class ScrollingService {
    constructor(_document) {
        this._document = _document;
    }
    stopScrolling() {
        this._document.body.classList.add('no-scrolling');
    }
    resumeScrolling() {
        if (this._document.body.classList.contains('no-scrolling')) {
            this._document.body.classList.remove('no-scrolling');
        }
    }
};
ScrollingService = __decorate([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], ScrollingService);

let ClrModal = class ClrModal {
    constructor(_scrollingService, commonStrings, platformId, modalId) {
        this._scrollingService = _scrollingService;
        this.commonStrings = commonStrings;
        this.platformId = platformId;
        this.modalId = modalId;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = true;
        this.skipAnimation = 'false';
        // presently this is only used by wizards
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    // Detect when _open is set to true and set no-scrolling to true
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    }
    ngOnDestroy() {
        this._scrollingService.resumeScrolling();
    }
    open() {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    }
    close() {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || !this._open) {
            return;
        }
        this._open = false;
        // SPECME
        this.focusTrap.setPreviousFocus(); // Handles moving focus back to the element that had it before.
    }
    // TODO Investigate if we can decouple from animation events
    fadeDone(e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
        else if (e.toState === 'false' && isPlatformBrowser(this.platformId) && this.modalTitle) {
            this.modalTitle.nativeElement.focus();
        }
    }
};
__decorate([
    ViewChild(FocusTrapDirective, { static: false }),
    __metadata("design:type", FocusTrapDirective)
], ClrModal.prototype, "focusTrap", void 0);
__decorate([
    ViewChild('modalTitle', { static: false }),
    __metadata("design:type", ElementRef)
], ClrModal.prototype, "modalTitle", void 0);
__decorate([
    HostBinding('class.open'),
    Input('clrModalOpen'),
    __metadata("design:type", Boolean)
], ClrModal.prototype, "_open", void 0);
__decorate([
    Output('clrModalOpenChange'),
    __metadata("design:type", EventEmitter)
], ClrModal.prototype, "_openChanged", void 0);
__decorate([
    Input('clrModalClosable'),
    __metadata("design:type", Boolean)
], ClrModal.prototype, "closable", void 0);
__decorate([
    Input('clrModalSize'),
    __metadata("design:type", String)
], ClrModal.prototype, "size", void 0);
__decorate([
    Input('clrModalStaticBackdrop'),
    __metadata("design:type", Boolean)
], ClrModal.prototype, "staticBackdrop", void 0);
__decorate([
    Input('clrModalSkipAnimation'),
    __metadata("design:type", String)
], ClrModal.prototype, "skipAnimation", void 0);
__decorate([
    Input('clrModalOverrideScrollService'),
    __metadata("design:type", Boolean)
], ClrModal.prototype, "bypassScrollService", void 0);
__decorate([
    Input('clrModalPreventClose'),
    __metadata("design:type", Boolean)
], ClrModal.prototype, "stopClose", void 0);
__decorate([
    Output('clrModalAlternateClose'),
    __metadata("design:type", EventEmitter)
], ClrModal.prototype, "altClose", void 0);
__decorate([
    HostListener('body:keyup.escape'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrModal.prototype, "close", null);
ClrModal = __decorate([
    Component({
        selector: 'clr-modal',
        viewProviders: [ScrollingService],
        template: "\n<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n    <!--fixme: revisit when ngClass works with exit animation-->\n    <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n         class=\"modal-dialog\"\n         [class.modal-sm]=\"size == 'sm'\"\n         [class.modal-lg]=\"size == 'lg'\"\n         [class.modal-xl]=\"size == 'xl'\"\n         role=\"dialog\"\n         aria-modal=\"true\"\n         [attr.aria-hidden]=\"!_open\"\n         [attr.aria-labelledby]=\"modalId\">\n      <div class=\"clr-sr-only\">{{commonStrings.keys.modalContentStart}}</div>\n      <div class=\"modal-content-wrapper\">\n        <!-- only used in wizards -->\n        <ng-content select=\".modal-nav\"></ng-content>\n\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" [attr.aria-label]=\"commonStrings.keys.close\" class=\"close\" *ngIf=\"closable\" (click)=\"close()\">\n              <clr-icon shape=\"close\"></clr-icon>\n            </button>\n            <div class=\"modal-title-wrapper\" tabindex=\"0\" id=\"{{modalId}}\" #modalTitle>\n              <ng-content select=\".modal-title\"></ng-content>\n            </div>\n          </div>\n          <ng-content select=\".modal-body\"></ng-content>\n          <ng-content select=\".modal-footer\"></ng-content>\n        </div>\n      </div>\n      <div class=\"clr-sr-only\">{{commonStrings.keys.modalContentEnd}}</div>\n    </div>\n\n    <div [@fade] class=\"modal-backdrop\"\n         aria-hidden=\"true\"\n         (click)=\"staticBackdrop || close()\"></div>\n</div>\n\n",
        animations: [
            trigger('fadeDown', [
                transition('* => false', [style({ opacity: 0, transform: 'translate(0, -25%)' }), animate('0.2s ease-in-out')]),
                transition('false => *', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(0, -25%)' }))]),
            ]),
            trigger('fade', [
                transition('void => *', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
                transition('* => void', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
            ]),
        ],
        providers: [UNIQUE_ID_PROVIDER],
        styles: [`
        :host { display: none; }
        :host.open { display: inline; }
    `]
    }),
    __param(2, Inject(PLATFORM_ID)),
    __param(3, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [ScrollingService,
        ClrCommonStringsService,
        Object, String])
], ClrModal);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Allows modal overflow area to be scrollable via keyboard.
 * The modal body will focus with keyboard navigation only.
 * This allows inner focusable items to be focused without
 * the overflow scroll being focused.
 */
let ClrModalBody = class ClrModalBody {
    /**
     * Allows modal overflow area to be scrollable via keyboard.
     * The modal body will focus with keyboard navigation only.
     * This allows inner focusable items to be focused without
     * the overflow scroll being focused.
     */
    constructor() {
        this._mouseDown = false;
    }
    focus(event) {
        if (this._mouseDown) {
            event.target.blur();
        }
    }
    mouseDown() {
        this._mouseDown = true;
    }
    mouseUp() {
        this._mouseDown = false;
    }
};
__decorate([
    HostListener('focus', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClrModalBody.prototype, "focus", null);
__decorate([
    HostListener('mousedown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrModalBody.prototype, "mouseDown", null);
__decorate([
    HostListener('mouseup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrModalBody.prototype, "mouseUp", null);
ClrModalBody = __decorate([
    Directive({
        selector: '.modal-body',
        host: {
            '[attr.tabindex]': '"0"',
        },
    })
], ClrModalBody);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_MODAL_DIRECTIVES = [ClrModal, ClrModalBody];
let ClrModalModule = class ClrModalModule {
};
ClrModalModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
        declarations: [CLR_MODAL_DIRECTIVES],
        exports: [CLR_MODAL_DIRECTIVES],
    })
], ClrModalModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const SIGNPOST_POSITIONS = {
    'top-left': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_RIGHT, offsetY: -10, offsetX: 0 },
    'top-middle': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_CENTER, offsetY: -10, offsetX: 0 },
    'top-right': { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_LEFT, offsetY: -10, offsetX: 0 },
    'right-top': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_BOTTOM, offsetY: 2, offsetX: 14 },
    'right-middle': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
    'right-bottom': { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_TOP, offsetY: -1, offsetX: 14 },
    'bottom-right': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_LEFT, offsetY: 9, offsetX: -1 },
    'bottom-middle': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_CENTER, offsetY: 9, offsetX: 12 },
    'bottom-left': { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_RIGHT, offsetY: 9, offsetX: 0 },
    'left-bottom': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_TOP, offsetY: 0, offsetX: -14 },
    'left-middle': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_CENTER, offsetY: 4, offsetX: -14 },
    'left-top': { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_BOTTOM, offsetY: 0, offsetX: -14 },
    default: { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
};

// aka where the arrow / pointer is at in relation to the anchor
const POSITIONS = [
    'top-left',
    'top-middle',
    'top-right',
    'right-top',
    'right-middle',
    'right-bottom',
    'bottom-right',
    'bottom-middle',
    'bottom-left',
    'left-bottom',
    'left-middle',
    'left-top',
];
let ClrSignpostContent = class ClrSignpostContent extends AbstractPopover {
    constructor(injector, parentHost, commonStrings, signpostContentId, signpostIdService) {
        super(injector, parentHost);
        this.signpostContentId = signpostContentId;
        this.signpostIdService = signpostIdService;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        this.commonStrings = commonStrings;
        // Defaults
        this.position = 'right-middle';
        this.closeOnOutsideClick = true;
        this.signpostIdService.setId(signpostContentId);
    }
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    close() {
        this.ifOpenService.open = false;
    }
    get position() {
        return this._position;
    }
    /*********
     *
     * @description
     * A setter for the position of the ClrSignpostContent popover. This is a combination of the following:
     * - anchorPoint - where on the trigger to anchor the ClrSignpostContent
     * - popoverPoint - where on the ClrSignpostContent container to align with the anchorPoint
     * - offsetY - where on the Y axis to align the ClrSignpostContent so it meets specs
     * - offsetX - where on the X axis to align the ClrSignpostContent so it meets specs
     * There are 12 possible positions to place a ClrSignpostContent container:
     * - top-left
     * - top-middle
     * - top-right
     * - right-top
     * - right-middle
     * - right-bottom
     * - bottom-right
     * - bottom-middle
     * - bottom-left
     * - left-bottom
     * - left-middle
     * - left-top
     *
     * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
     * meaning the top of the trigger icon (above the icon that hides/shows) the ClrSignpostContent. And, SIDE_POSITION
     * is 'left' meaning two things: 1) the ClrSignpostContent container extends to the left and 2) the 'arrow/pointer'
     * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
     *
     * @param newPosition
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, this.position);
        if (position && POSITIONS.indexOf(position) > -1) {
            this._position = position;
        }
        else {
            this._position = 'right-middle';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, this.position);
        const setPosition = SIGNPOST_POSITIONS[this.position];
        this.anchorPoint = setPosition.anchorPoint;
        this.popoverPoint = setPosition.popoverPoint;
        this.popoverOptions.offsetY = setPosition.offsetY;
        this.popoverOptions.offsetX = setPosition.offsetX;
    }
};
__decorate([
    Input('clrPosition'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrSignpostContent.prototype, "position", null);
ClrSignpostContent = __decorate([
    Component({
        selector: 'clr-signpost-content',
        template: `
      <div class="signpost-wrap">
          <div class="popover-pointer"></div>
          <div class="signpost-content-body">
              <ng-content></ng-content>
          </div>
          <div class="signpost-content-header">
              <button type="button" [attr.aria-label]="commonStrings.keys.signpostClose" class="signpost-action close"
                      (click)="close()" [attr.aria-controls]="signpostContentId">
                  <clr-icon shape="close" [attr.title]="commonStrings.keys.close"></clr-icon>
              </button>
          </div>
      </div>
  `,
        host: { '[class.signpost-content]': 'true', '[id]': 'signpostContentId' },
        providers: [UNIQUE_ID_PROVIDER]
    }),
    __param(1, Optional()),
    __param(1, Inject(POPOVER_HOST_ANCHOR)),
    __param(3, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [Injector,
        ElementRef,
        ClrCommonStringsService, String, SignpostIdService])
], ClrSignpostContent);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
let ClrSignpostModule = class ClrSignpostModule {
};
ClrSignpostModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
        declarations: [CLR_SIGNPOST_DIRECTIVES],
        exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
    })
], ClrSignpostModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let TooltipIdService = class TooltipIdService {
    constructor() {
        this._id = new Subject();
    }
    updateId(id) {
        this._id.next(id);
    }
    get id() {
        return this._id.asObservable();
    }
};
TooltipIdService = __decorate([
    Injectable()
], TooltipIdService);

let ClrTooltip = class ClrTooltip {
};
ClrTooltip = __decorate([
    Component({
        selector: 'clr-tooltip',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.tooltip]': 'true',
        },
        providers: [
            IfOpenService,
            { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
            // TODO: consider centralizing the unique id string on a service that provides ariaAttributes that need it
            // AriaService in layout/tabs/providers might be a good starting point.
            UNIQUE_ID_PROVIDER,
            TooltipIdService,
        ]
    })
], ClrTooltip);

const POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
const SIZES = ['xs', 'sm', 'md', 'lg'];
let ClrTooltipContent = class ClrTooltipContent extends AbstractPopover {
    constructor(injector, parentHost, uniqueId, tooltipIdService) {
        super(injector, parentHost);
        this.uniqueId = uniqueId;
        this.tooltipIdService = tooltipIdService;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        // Defaults
        this.position = 'right';
        this.size = 'sm';
        // Set the default id in case consumer does not supply a custom id.
        this.updateId(uniqueId);
    }
    get position() {
        return this._position;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        value ? this.updateId(value) : this.updateId('');
    }
    updateId(id) {
        this._id = id;
        this.tooltipIdService.updateId(id);
    }
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
        if (position && POSITIONS$1.indexOf(position) > -1) {
            this._position = position;
        }
        else {
            this._position = 'right';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
        // set the popover values based on direction
        switch (position) {
            case 'top-right':
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case 'top-left':
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case 'bottom-right':
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'bottom-left':
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case 'right':
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case 'left':
                this.anchorPoint = Point.LEFT_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            default:
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    get size() {
        return this._size;
    }
    set size(size) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
        if (size && SIZES.indexOf(size) > -1) {
            this._size = size;
        }
        else {
            this._size = 'sm';
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTooltipContent.prototype, "id", null);
__decorate([
    Input('clrPosition'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTooltipContent.prototype, "position", null);
__decorate([
    Input('clrSize'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrTooltipContent.prototype, "size", null);
ClrTooltipContent = __decorate([
    Component({
        selector: 'clr-tooltip-content',
        template: `
        <ng-content></ng-content>
    `,
        host: {
            '[class.tooltip-content]': 'true',
            '[style.opacity]': '1',
            '[attr.role]': '"tooltip"',
            '[id]': 'id',
        }
    }),
    __param(1, Optional()),
    __param(1, Inject(POPOVER_HOST_ANCHOR)),
    __param(2, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [Injector,
        ElementRef, String, TooltipIdService])
], ClrTooltipContent);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrTooltipTrigger = class ClrTooltipTrigger {
    constructor(ifOpenService, tooltipIdService) {
        this.ifOpenService = ifOpenService;
        this.tooltipIdService = tooltipIdService;
        this.subs = [];
        // The aria-described by comes from the id of content. It
        this.subs.push(this.tooltipIdService.id.subscribe(tooltipId => (this.ariaDescribedBy = tooltipId)));
    }
    showTooltip() {
        this.ifOpenService.open = true;
    }
    hideTooltip() {
        this.ifOpenService.open = false;
    }
    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }
};
__decorate([
    HostListener('mouseenter'),
    HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrTooltipTrigger.prototype, "showTooltip", null);
__decorate([
    HostListener('mouseleave'),
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrTooltipTrigger.prototype, "hideTooltip", null);
ClrTooltipTrigger = __decorate([
    Directive({
        selector: '[clrTooltipTrigger]',
        host: {
            tabindex: '0',
            '[class.tooltip-trigger]': 'true',
            '[attr.aria-describedby]': 'ariaDescribedBy',
            '[attr.role]': '"button"',
        },
    }),
    __metadata("design:paramtypes", [IfOpenService, TooltipIdService])
], ClrTooltipTrigger);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
let ClrTooltipModule = class ClrTooltipModule {
};
ClrTooltipModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrCommonPopoverModule],
        declarations: [CLR_TOOLTIP_DIRECTIVES],
        exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
    })
], ClrTooltipModule);

let ClrPopoverModule = class ClrPopoverModule {
};
ClrPopoverModule = __decorate([
    NgModule({ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] })
], ClrPopoverModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ButtonHubService = class ButtonHubService {
    constructor() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject();
        this._nextBtnClicked = new Subject();
        this._dangerBtnClicked = new Subject();
        this._cancelBtnClicked = new Subject();
        this._finishBtnClicked = new Subject();
        this._customBtnClicked = new Subject();
    }
    get previousBtnClicked() {
        return this._previousBtnClicked.asObservable();
    }
    get nextBtnClicked() {
        return this._nextBtnClicked.asObservable();
    }
    get dangerBtnClicked() {
        return this._dangerBtnClicked.asObservable();
    }
    get cancelBtnClicked() {
        return this._cancelBtnClicked.asObservable();
    }
    get finishBtnClicked() {
        return this._finishBtnClicked.asObservable();
    }
    get customBtnClicked() {
        return this._customBtnClicked.asObservable();
    }
    buttonClicked(buttonType) {
        if ('previous' === buttonType) {
            this._previousBtnClicked.next();
        }
        else if ('next' === buttonType) {
            this._nextBtnClicked.next();
        }
        else if ('finish' === buttonType) {
            this._finishBtnClicked.next();
        }
        else if ('danger' === buttonType) {
            this._dangerBtnClicked.next();
        }
        else if ('cancel' === buttonType) {
            this._cancelBtnClicked.next();
        }
        else {
            this._customBtnClicked.next(buttonType);
        }
    }
};
ButtonHubService = __decorate([
    Injectable()
], ButtonHubService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
PageCollectionService = __decorate([
    Injectable()
], PageCollectionService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
WizardNavigationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PageCollectionService, ButtonHubService])
], WizardNavigationService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let HeaderActionService = class HeaderActionService {
    // this service communicates information about the presence/display of header actions
    // across the wizard
    constructor(navService) {
        this.navService = navService;
    }
    get wizardHasHeaderActions() {
        const wizardHdrActions = this.wizardHeaderActions;
        if (!wizardHdrActions) {
            return false;
        }
        return wizardHdrActions.toArray().length > 0;
    }
    get currentPageHasHeaderActions() {
        return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
    }
    get showWizardHeaderActions() {
        return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
    }
    get displayHeaderActionsWrapper() {
        return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
    }
};
HeaderActionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WizardNavigationService])
], HeaderActionService);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let wizardHeaderActionIndex = 0;
let ClrWizardHeaderAction = class ClrWizardHeaderAction {
    constructor() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    get id() {
        return `clr-wizard-header-action-${this._id}`;
    }
    click() {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    }
};
__decorate([
    Input('title'),
    __metadata("design:type", String)
], ClrWizardHeaderAction.prototype, "title", void 0);
__decorate([
    Input('id'),
    __metadata("design:type", String)
], ClrWizardHeaderAction.prototype, "_id", void 0);
__decorate([
    Input('clrWizardHeaderActionDisabled'),
    __metadata("design:type", Boolean)
], ClrWizardHeaderAction.prototype, "disabled", void 0);
__decorate([
    Output('actionClicked'),
    __metadata("design:type", EventEmitter)
], ClrWizardHeaderAction.prototype, "headerActionClicked", void 0);
ClrWizardHeaderAction = __decorate([
    Component({
        selector: 'clr-wizard-header-action',
        template: `
        <button 
            type="button"
            class="btn clr-wizard-header-action btn-link"
            [id]="id"
            [class.disabled]="disabled"
            (click)="click()"
            [title]="title">
            <ng-content></ng-content>
        </button>
    `,
        host: { class: 'clr-wizard-header-action-wrapper' }
    })
], ClrWizardHeaderAction);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardPageButtons = class ClrWizardPageButtons {
    constructor(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
};
ClrWizardPageButtons = __decorate([
    Directive({ selector: '[clrPageButtons]' }),
    __metadata("design:paramtypes", [TemplateRef])
], ClrWizardPageButtons);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardPageHeaderActions = class ClrWizardPageHeaderActions {
    constructor(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
};
ClrWizardPageHeaderActions = __decorate([
    Directive({ selector: '[clrPageHeaderActions]' }),
    __metadata("design:paramtypes", [TemplateRef])
], ClrWizardPageHeaderActions);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardPageNavTitle = class ClrWizardPageNavTitle {
    constructor(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
};
ClrWizardPageNavTitle = __decorate([
    Directive({ selector: '[clrPageNavTitle]' }),
    __metadata("design:paramtypes", [TemplateRef])
], ClrWizardPageNavTitle);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardPageTitle = class ClrWizardPageTitle {
    constructor(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
};
ClrWizardPageTitle = __decorate([
    Directive({ selector: '[clrPageTitle]' }),
    __metadata("design:paramtypes", [TemplateRef])
], ClrWizardPageTitle);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let wizardPageIndex = 0;
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
let ClrWizardPage = class ClrWizardPage {
    /**
     * Creates an instance of ClrWizardPage.
     *
     * @memberof WizardPage
     */
    constructor(navService, pageCollection, buttonService) {
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
    get nextStepDisabled() {
        return this._nextStepDisabled;
    }
    /**
     * Sets whether the page should allow forward navigation.
     *
     * @memberof WizardPage
     *
     */
    set nextStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            this.nextStepDisabledChange.emit(valBool);
        }
    }
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
    get previousStepDisabled() {
        return this._previousStepDisabled;
    }
    /**
     * Sets whether the page should allow backward navigation.
     *
     * @memberof WizardPage
     *
     */
    set previousStepDisabled(val) {
        const valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * @memberof WizardPage
     *
     */
    get stopCancel() {
        return this._stopCancel;
    }
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
    set stopCancel(val) {
        const valBool = !!val;
        if (valBool !== this._stopCancel) {
            this._stopCancel = valBool;
            this.stopCancelChange.emit(valBool);
        }
    }
    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * @memberof WizardPage
     *
     */
    get stopNext() {
        return this._stopNext;
    }
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
    set stopNext(val) {
        const valBool = !!val;
        if (valBool !== this._stopNext) {
            this._stopNext = valBool;
        }
    }
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
    get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        const idIsNonZeroFalsy = !this._id && this._id !== 0;
        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `clr-wizard-page-${this._id}`;
    }
    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !ClrWizardPage.nextStepDisabled. For some use cases,
     * ClrWizardPage.readyToComplete is more logical and declarative.
     *
     * @memberof WizardPage
     *
     */
    get readyToComplete() {
        return !this.nextStepDisabled;
    }
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
    get completed() {
        return this._complete && this.readyToComplete;
        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }
    /**
     * A ClrWizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * @memberof ClrWizardPage
     */
    set completed(value) {
        this._complete = value;
    }
    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * @memberof WizardPage
     *
     */
    get current() {
        return this.navService.currentPage === this;
    }
    get disabled() {
        return !this.enabled;
    }
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
    get enabled() {
        return this.current || this.completed || this.previousCompleted;
    }
    /**
     * A read-only getter that returns whether or not the page before this
     * ClrWizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * @memberof WizardPage
     *
     */
    get previousCompleted() {
        const previousPage = this.pageCollection.getPreviousPage(this);
        if (!previousPage) {
            return true;
        }
        return previousPage.completed;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get title() {
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get navTitle() {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get headerActions() {
        if (!this._headerActions) {
            return;
        }
        return this._headerActions.pageHeaderActionsTemplateRef;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get hasHeaderActions() {
        return !!this._headerActions;
    }
    /**
     *
     * @memberof WizardPage
     *
     */
    get buttons() {
        if (!this._buttons) {
            return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }
    /**
     * A read-only getter that returns a boolean that says whether or
     * not the ClrWizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * @memberof WizardPage
     *
     */
    get hasButtons() {
        return !!this._buttons;
    }
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
    makeCurrent() {
        this.navService.currentPage = this;
    }
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * @memberof WizardPage
     *
     */
    ngOnInit() {
        const navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    }
    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * ClrWizardPage needs this ID string for aria information.
     *
     * @memberof WizardPage
     *
     */
    get stepItemId() {
        return this.pageCollection.getStepItemIdForPage(this);
    }
};
__decorate([
    ContentChild(ClrWizardPageTitle, { static: true }),
    __metadata("design:type", ClrWizardPageTitle)
], ClrWizardPage.prototype, "pageTitle", void 0);
__decorate([
    ContentChild(ClrWizardPageNavTitle, { static: true }),
    __metadata("design:type", ClrWizardPageNavTitle)
], ClrWizardPage.prototype, "pageNavTitle", void 0);
__decorate([
    ContentChild(ClrWizardPageButtons, { static: true }),
    __metadata("design:type", ClrWizardPageButtons)
], ClrWizardPage.prototype, "_buttons", void 0);
__decorate([
    ContentChild(ClrWizardPageHeaderActions, { static: true }),
    __metadata("design:type", ClrWizardPageHeaderActions)
], ClrWizardPage.prototype, "_headerActions", void 0);
__decorate([
    Input('clrWizardPageNextDisabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "nextStepDisabled", null);
__decorate([
    Output('clrWizardPageNextDisabledChange'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextStepDisabledChange", void 0);
__decorate([
    Input('clrWizardPagePreviousDisabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "previousStepDisabled", null);
__decorate([
    Output('clrWizardPagePreviousDisabledChange'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousStepDisabledChange", void 0);
__decorate([
    Input('clrWizardPagePreventDefault'),
    __metadata("design:type", Boolean)
], ClrWizardPage.prototype, "preventDefault", void 0);
__decorate([
    Input('clrWizardPagePreventDefaultCancel'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopCancel", null);
__decorate([
    Output('clrWizardPagePreventDefaultCancelChange'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "stopCancelChange", void 0);
__decorate([
    Input('clrWizardPagePreventDefaultNext'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizardPage.prototype, "stopNext", null);
__decorate([
    Output('clrWizardPageOnCommit'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onCommit", void 0);
__decorate([
    Output('clrWizardPageOnLoad'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "onLoad", void 0);
__decorate([
    Output('clrWizardPageOnCancel'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "pageOnCancel", void 0);
__decorate([
    Output('clrWizardPageFinish'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "finishButtonClicked", void 0);
__decorate([
    Output('clrWizardPagePrevious'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "previousButtonClicked", void 0);
__decorate([
    Output('clrWizardPageNext'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "nextButtonClicked", void 0);
__decorate([
    Output('clrWizardPageDanger'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "dangerButtonClicked", void 0);
__decorate([
    Output('clrWizardPagePrimary'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "primaryButtonClicked", void 0);
__decorate([
    Output('clrWizardPageCustomButton'),
    __metadata("design:type", EventEmitter)
], ClrWizardPage.prototype, "customButtonClicked", void 0);
__decorate([
    Input('id'),
    __metadata("design:type", Object)
], ClrWizardPage.prototype, "_id", void 0);
ClrWizardPage = __decorate([
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
    __metadata("design:paramtypes", [WizardNavigationService,
        PageCollectionService,
        ButtonHubService])
], ClrWizardPage);

/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
let ClrWizard = class ClrWizard {
    constructor(platformId, navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        this.platformId = platformId;
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        /**
         * Set the modal size of the wizard. Set using `[clrWizardSize]` input.
         */
        this.size = 'xl';
        /**
         * Tells the modal part of the wizard whether it should have a close "X"
         * in the top right corner. Set using `[clrWizardClosable]` input.
         */
        this.closable = true;
        this._forceForward = false;
        this._open = false;
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        /**
         * Used to communicate to the underlying modal that animations are not
         * wanted. Primary use is for the display of static/inline wizards.
         * Set using `[clrWizardPreventModalAnimation]` input.
         */
        this._stopModalAnimations = false;
        /**
         * Emits when the wizard is opened or closed.
         * Listen via `(clrWizardOpenChange)` event.
         */
        this._openChanged = new EventEmitter(false);
        /**
         * Emits when the wizard is canceled. Listen via `(clrWizardOnCancel)` event.
         * Can be combined with the `[clrWizardPreventDefaultCancel]` input to create
         * wizard-level custom cancel routines.
         */
        this.onCancel = new EventEmitter(false);
        /**
         * Emits when the wizard is completed. Listen via `(clrWizardOnFinish)` event.
         * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
         * wizard-level custom completion routines.
         */
        this.wizardFinished = new EventEmitter(false);
        /**
         * Emits when the wizard is reset. Listen via `(clrWizardOnReset)` event.
         */
        this.onReset = new EventEmitter(false);
        /**
         * Emits when the current page has changed. Listen via `(clrWizardCurrentPageChanged)` event.
         * output. Useful for non-blocking validation.
         */
        this.currentPageChanged = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the next page. Listen via `(clrWizardOnNext)` event.
         * Can be combined with the `[clrWizardPreventDefaultNext]` input to create
         * wizard-level custom navigation routines, which are useful for validation.
         */
        this.onMoveNext = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be useful for validation.
         * Listen via `(clrWizardOnPrevious)` event.
         */
        this.onMovePrevious = new EventEmitter(false);
        this.subscriptions = [];
        this.subscriptions.push(this.listenForNextPageChanges(), this.listenForPreviousPageChanges(), this.listenForCancelChanges(), this.listenForFinishedChanges(), this.listenForPageChanges());
        this.differ = differs.find([]).create(null);
    }
    /**
     * Resets page completed states when navigating backwards.
     * Set using `[clrWizardForceForwardNavigation]` input.
     */
    set forceForward(value) {
        this._forceForward = !!value;
        this.navService.forceForwardNavigation = value;
    }
    get forceForward() {
        return this._forceForward;
    }
    /**
     * Toggles open/close of the wizard component.
     * Set using the `[clrWizardOpen]` input.
     */
    set clrWizardOpen(open) {
        if (open) {
            this.buttonService.buttonsReady = true;
        }
        this._open = open;
    }
    /**
     * Prevents ClrWizard from moving to the next page or closing itself on finishing.
     * Set using the `[clrWizardPreventDefaultNext]` input. Note that using stopNext
     * will require you to create your own calls to .next() and .finish() in your
     * host component to make the ClrWizard work as expected.
     */
    set stopNext(value) {
        this._stopNext = !!value;
        this.navService.wizardHasAltNext = value;
    }
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
     * Set using the `[clrWizardPreventDefaultCancel]` input.
     *
     * Note that using stopCancel will require you to create your own calls to `close()` in your host compone`nt
     * to make the ClrWizard work as expected. Useful for doing checks or prompts
     * before closing a ClrWizard.
     */
    set stopCancel(value) {
        this._stopCancel = !!value;
        this.navService.wizardHasAltCancel = value;
    }
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Prevents ClrWizard from performing any form of navigation away from the current
     * page. Set using the `[clrWizardPreventNavigation]` input.
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     */
    set stopNavigation(value) {
        this._stopNavigation = !!value;
        this.navService.wizardStopNavigation = value;
    }
    get stopNavigation() {
        return this._stopNavigation;
    }
    /**
     * Prevents clicks on the links in the stepnav from working.
     * Set using `[clrWizardDisableStepnav]` input.
     * A more granular bypassing of navigation which can be useful when your
     * ClrWizard is in a state of completion and you don't want users to be
     * able to jump backwards and change things.
     */
    set disableStepnav(value) {
        this._disableStepnav = !!value;
        this.navService.wizardDisableStepnav = value;
    }
    get disableStepnav() {
        return this._disableStepnav;
    }
    get stopModalAnimations() {
        return this._stopModalAnimations ? 'true' : 'false';
    }
    get currentPage() {
        return this.navService.currentPage;
    }
    set currentPage(page) {
        this.navService.goTo(page, true);
    }
    get isLast() {
        return this.navService.currentPageIsLast;
    }
    get isFirst() {
        return this.navService.currentPageIsFirst;
    }
    get isStatic() {
        return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
    }
    ngAfterContentInit() {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        this.initializeButtons();
    }
    ngDoCheck() {
        this.updateNavOnPageChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
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
    finish(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    }
    /**
     * Marks the wizard as finished but does run checks and emissions.
     * Good for a last step in an alternate workflow. Does the same thing as
     * calling `ClrWizard.finish(true)` or `ClrWizard.finish()` without a parameter.
     */
    forceFinish() {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    }
    /**
     * Opens the wizard. If there is no current page defined, sets the first page in the wizard to be current.
     */
    open() {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    }
    /**
     * Closes the wizard. Call this directly instead of `cancel()` to implement alternative cancel functionality.
     */
    close() {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    }
    /**
     * Used to open and close the wizard. By default the wizard will
     * close if invoked with no parameter. If parameter is true wizard will open
     * else if false will close.
     */
    toggle(open) {
        if (open) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * Moves the wizard to the previous page.
     */
    previous() {
        this.navService.previous();
    }
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
    next(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    }
    /**
     * Moves the wizard to the next page without the checks and emissions.
     * Good for a last step in an alternate workflow.
     * Alias for `ClrWizard.next(true)` or `ClrWizard.next()`
     */
    forceNext() {
        this.navService.forceNext();
    }
    /**
     * Cancels and closes the wizard. Do not use this for an override of the cancel
     * the functionality with `[clrWizardPreventDefaultCancel]`, `[clrWizardPreventPageDefaultCancel]`,
     * or `[clrWizardPagePreventDefault]` because it will initiate the same checks
     * and event emissions that invoked your event handler. Use `ClrWizard.close()` instead.
     */
    cancel() {
        this.navService.cancel();
    }
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality. In most cases, use `ClrWizard.cancel()` instead.
     */
    modalCancel() {
        if (this.closable) {
            this.checkAndCancel();
        }
    }
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs `(clrWizardPageOnCancel)` and `(clrWizardOnCancel)`.
     */
    checkAndCancel() {
        const currentPage = this.currentPage;
        const currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
        if (this.stopNavigation) {
            return;
        }
        currentPage.pageOnCancel.emit();
        if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
        if (!this.stopCancel && !currentPageHasOverrides) {
            this.close();
        }
    }
    /**
     * Navigates to a given page in the Wizard. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with `clr-wizard-page-` and then either a
     * numeric ID or the ID specified for the `ClrWizardPage` component’s `id` input.
     */
    goTo(pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    }
    /**
     * Reset sets all WizardPages to incomplete and sets the first page in the `ClrWizard` to
     * be the current page, resetting the wizard navigation.
     * Use `(clrWizardOnReset)` event to reset the data or model of your wizard.
     */
    reset() {
        this.pageCollection.reset();
        this.onReset.next();
    }
    listenForNextPageChanges() {
        return this.navService.movedToNextPage.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(() => {
            this.onMoveNext.emit();
            this.wizardTitle.nativeElement.focus();
        });
    }
    listenForPreviousPageChanges() {
        return this.navService.movedToPreviousPage.pipe(filter(() => isPlatformBrowser(this.platformId))).subscribe(() => {
            this.onMovePrevious.emit();
            this.wizardTitle.nativeElement.focus();
        });
    }
    listenForCancelChanges() {
        return this.navService.notifyWizardCancel.subscribe(() => this.checkAndCancel());
    }
    listenForFinishedChanges() {
        return this.navService.wizardFinished.subscribe(() => this.emitWizardFinished());
    }
    listenForPageChanges() {
        return this.navService.currentPageChanged.subscribe(() => this.currentPageChanged.emit());
    }
    updateNavOnPageChanges() {
        const changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(() => this.navService.updateNavigation());
            changes.forEachRemovedItem(() => this.navService.updateNavigation());
        }
    }
    initializeButtons() {
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    }
    emitWizardFinished() {
        if (!this.stopNext) {
            this.forceFinish();
        }
        this.wizardFinished.emit();
    }
};
__decorate([
    Input('clrWizardSize'),
    __metadata("design:type", Object)
], ClrWizard.prototype, "size", void 0);
__decorate([
    Input('clrWizardClosable'),
    __metadata("design:type", Object)
], ClrWizard.prototype, "closable", void 0);
__decorate([
    Input('clrWizardForceForwardNavigation'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "forceForward", null);
__decorate([
    Input('clrWizardOpen'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "clrWizardOpen", null);
__decorate([
    Input('clrWizardPreventDefaultNext'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopNext", null);
__decorate([
    Input('clrWizardPreventDefaultCancel'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopCancel", null);
__decorate([
    Input('clrWizardPreventNavigation'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "stopNavigation", null);
__decorate([
    Input('clrWizardDisableStepnav'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ClrWizard.prototype, "disableStepnav", null);
__decorate([
    Input('clrWizardPreventModalAnimation'),
    __metadata("design:type", Boolean)
], ClrWizard.prototype, "_stopModalAnimations", void 0);
__decorate([
    Output('clrWizardOpenChange'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "_openChanged", void 0);
__decorate([
    Output('clrWizardOnCancel'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onCancel", void 0);
__decorate([
    Output('clrWizardOnFinish'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "wizardFinished", void 0);
__decorate([
    Output('clrWizardOnReset'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onReset", void 0);
__decorate([
    Output('clrWizardCurrentPageChanged'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "currentPageChanged", void 0);
__decorate([
    Output('clrWizardOnNext'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onMoveNext", void 0);
__decorate([
    Output('clrWizardOnPrevious'),
    __metadata("design:type", EventEmitter)
], ClrWizard.prototype, "onMovePrevious", void 0);
__decorate([
    ContentChildren(ClrWizardPage),
    __metadata("design:type", QueryList)
], ClrWizard.prototype, "pages", void 0);
__decorate([
    ContentChildren(ClrWizardHeaderAction),
    __metadata("design:type", QueryList)
], ClrWizard.prototype, "headerActions", void 0);
__decorate([
    ViewChild('wizardTitle', { static: false }),
    __metadata("design:type", ElementRef)
], ClrWizard.prototype, "wizardTitle", void 0);
ClrWizard = __decorate([
    Component({
        selector: 'clr-wizard',
        providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
        template: "<!--\n  ~ Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<clr-modal\n    [clrModalOpen]=\"_open\"\n    [clrModalSize]=\"size\"\n    [clrModalClosable]=\"closable\"\n    [clrModalStaticBackdrop]=\"true\"\n    [clrModalSkipAnimation]=\"stopModalAnimations\"\n    [clrModalOverrideScrollService]=\"isStatic\"\n    [clrModalPreventClose]=\"true\"\n    (clrModalAlternateClose)=\"modalCancel()\">\n\n    <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n        <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n        <clr-wizard-stepnav></clr-wizard-stepnav>\n    </nav>\n\n    <h3 class=\"modal-title\">\n        <span tabindex=\"0\" #wizardTitle class=\"modal-title-text\">\n            <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n        </span>\n\n        <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n            <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                <ng-content select=\"clr-wizard-header-action\"></ng-content>\n            </div>\n            <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n            </div>\n        </div>\n    </h3>\n\n    <div class=\"modal-body\">\n        <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n            <ng-content></ng-content>\n        </main>\n    </div>\n    <div class=\"modal-footer clr-wizard-footer\">\n        <div class=\"clr-wizard-footer-buttons\">\n            <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-content select=\"clr-wizard-button\"></ng-content>\n            </div>\n            <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                class=\"clr-wizard-footer-buttons-wrapper\">\n                <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n            </div>\n        </div>\n    </div>\n</clr-modal>\n",
        host: {
            '[class.clr-wizard]': 'true',
            '[class.wizard-md]': "size == 'md'",
            '[class.wizard-lg]': "size == 'lg'",
            '[class.wizard-xl]': "size == 'xl'",
            '[class.lastPage]': 'navService.currentPageIsLast',
        }
    }),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object,
        WizardNavigationService,
        PageCollectionService,
        ButtonHubService,
        HeaderActionService,
        ElementRef,
        IterableDiffers])
], ClrWizard);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
const CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
let ClrWizardButton = class ClrWizardButton {
    constructor(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    checkDefaultAndCustomType(valueToCheck = '', typeToLookUp) {
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    }
    get isCancel() {
        return this.checkDefaultAndCustomType(this.type, 'cancel');
    }
    get isNext() {
        return this.checkDefaultAndCustomType(this.type, 'next');
    }
    get isPrevious() {
        return this.checkDefaultAndCustomType(this.type, 'previous');
    }
    get isFinish() {
        return this.checkDefaultAndCustomType(this.type, 'finish');
    }
    get isDanger() {
        return this.checkDefaultAndCustomType(this.type, 'danger');
    }
    get isPrimaryAction() {
        return this.isNext || this.isDanger || this.isFinish;
    }
    get _disabledAttribute() {
        if (this.isDisabled) {
            return '';
        }
        return null;
    }
    get isDisabled() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const disabled = true;
        const nav = this.navService;
        const page = this.navService.currentPage;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !disabled;
        }
        if (this.disabled || nav.wizardStopNavigation || !page) {
            return true;
        }
        if (this.isCancel) {
            return !disabled;
        }
        if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
            return disabled;
        }
        if (this.isDanger && !page.readyToComplete) {
            return disabled;
        }
        if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        return !disabled;
    }
    get isHidden() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const hidden = true;
        const nav = this.navService;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !hidden;
        }
        if (this.hidden) {
            return true;
        }
        if (this.isCancel) {
            return !hidden;
        }
        if (this.isPrevious && nav.currentPageIsFirst) {
            return hidden;
        }
        if (this.isNext && nav.currentPageIsLast) {
            return hidden;
        }
        if (this.isFinish && !nav.currentPageIsLast) {
            return hidden;
        }
        return !hidden;
    }
    click() {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    }
};
__decorate([
    Input('type'),
    __metadata("design:type", String)
], ClrWizardButton.prototype, "type", void 0);
__decorate([
    Input('clrWizardButtonDisabled'),
    __metadata("design:type", Boolean)
], ClrWizardButton.prototype, "disabled", void 0);
__decorate([
    Input('clrWizardButtonHidden'),
    __metadata("design:type", Boolean)
], ClrWizardButton.prototype, "hidden", void 0);
__decorate([
    Output('clrWizardButtonClicked'),
    __metadata("design:type", EventEmitter)
], ClrWizardButton.prototype, "wasClicked", void 0);
ClrWizardButton = __decorate([
    Component({
        selector: 'clr-wizard-button',
        template: `
        <button
            type="button"
            class="btn clr-wizard-btn"
            [class.btn-link]="isCancel"
            [class.clr-wizard-btn--tertiary]="isCancel"
            [class.btn-outline]="isPrevious"
            [class.clr-wizard-btn--secondary]="isPrevious"
            [class.btn-primary]="isPrimaryAction"
            [class.clr-wizard-btn--primary]="isPrimaryAction"
            [class.btn-success]="isFinish"
            [class.btn-danger]="isDanger"
            [class.disabled]="isDisabled"
            [attr.disabled]="_disabledAttribute"
            (click)="click()">
            <ng-content></ng-content>
        </button>
    `,
        host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
        styles: ['[aria-hidden="true"] { display: none; }']
    }),
    __metadata("design:paramtypes", [WizardNavigationService, ButtonHubService])
], ClrWizardButton);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardCustomTags = class ClrWizardCustomTags {
};
ClrWizardCustomTags = __decorate([
    Directive({ selector: 'clr-wizard-title, clr-wizard-pagetitle' })
], ClrWizardCustomTags);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardStepnav = class ClrWizardStepnav {
    constructor(pageService) {
        this.pageService = pageService;
    }
};
ClrWizardStepnav = __decorate([
    Component({
        selector: 'clr-wizard-stepnav',
        template: `
    <div class="clr-wizard-stepnav-list">
      <div *ngFor="let page of pageService.pages" clr-wizard-stepnav-item [page]="page" class="clr-wizard-stepnav-item"></div>
    </div>
  `,
        host: { class: 'clr-wizard-stepnav' }
    }),
    __metadata("design:paramtypes", [PageCollectionService])
], ClrWizardStepnav);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrWizardStepnavItem = class ClrWizardStepnavItem {
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    pageGuard() {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    }
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
};
__decorate([
    Input('page'),
    __metadata("design:type", ClrWizardPage)
], ClrWizardStepnavItem.prototype, "page", void 0);
ClrWizardStepnavItem = __decorate([
    Component({
        selector: '[clr-wizard-stepnav-item]',
        template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()" [attr.disabled]="isDisabled ? '' : null">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
        host: {
            '[id]': 'id',
            '[attr.aria-selected]': 'isCurrent',
            '[attr.aria-controls]': 'id',
            '[class.clr-nav-link]': 'true',
            '[class.nav-item]': 'true',
            '[class.active]': 'isCurrent',
            '[class.disabled]': 'isDisabled',
            '[class.no-click]': '!canNavigate',
            '[class.complete]': 'isComplete',
        }
    }),
    __metadata("design:paramtypes", [WizardNavigationService, PageCollectionService])
], ClrWizardStepnavItem);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CLR_WIZARD_DIRECTIVES = [
    ClrWizard,
    ClrWizardPage,
    ClrWizardStepnav,
    ClrWizardStepnavItem,
    ClrWizardButton,
    ClrWizardHeaderAction,
    ClrWizardCustomTags,
    ClrWizardPageTitle,
    ClrWizardPageNavTitle,
    ClrWizardPageButtons,
    ClrWizardPageHeaderActions,
];
let ClrWizardModule = class ClrWizardModule {
};
ClrWizardModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrModalModule, ClrAlertModule],
        declarations: [CLR_WIZARD_DIRECTIVES],
        exports: [CLR_WIZARD_DIRECTIVES],
    })
], ClrWizardModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AccordionStrategy;
(function (AccordionStrategy) {
    AccordionStrategy["Default"] = "default";
    AccordionStrategy["Multi"] = "multi";
})(AccordionStrategy || (AccordionStrategy = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AccordionStatus;
(function (AccordionStatus) {
    AccordionStatus["Inactive"] = "inactive";
    AccordionStatus["Error"] = "error";
    AccordionStatus["Complete"] = "complete";
})(AccordionStatus || (AccordionStatus = {}));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let accordionCount = 0;
class AccordionPanelModel {
    constructor(id, accordionId) {
        this.id = id;
        this.accordionId = accordionId;
        this.status = AccordionStatus.Inactive;
        this.index = null;
        this.disabled = false;
        this.open = false;
        this.templateId = `${this.id}-${this.accordionId}`;
    }
}
class AccordionModel {
    constructor() {
        this.strategy = AccordionStrategy.Default;
        this.accordionCount = accordionCount++;
        this._panels = {};
    }
    get panels() {
        return Object.keys(this._panels).map(id => this._panels[id]);
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    updatePanelOrder(ids) {
        ids.forEach((id, index) => (this._panels[id].index = index));
        this.removeOldPanels(ids);
    }
    addPanel(id, open = false) {
        this._panels[id] = new AccordionPanelModel(id, this.accordionCount);
        this._panels[id].open = open;
    }
    togglePanel(panelId, open) {
        const panelIsOpen = this._panels[panelId].open;
        if (this.strategy === AccordionStrategy.Default) {
            this.closeAllPanels();
        }
        this._panels[panelId].open = open !== undefined ? open : !panelIsOpen;
    }
    disablePanel(panelId, disabled) {
        this._panels[panelId].disabled = disabled;
    }
    closeAllPanels() {
        this.panels.forEach(panel => (this._panels[panel.id].open = false));
    }
    removeOldPanels(ids) {
        this.panels
            .filter(panel => ids.find(id => id === panel.id) === undefined)
            .forEach(panel => delete this._panels[panel.id]);
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let AccordionService = class AccordionService {
    constructor() {
        this.accordion = new AccordionModel();
        this._panelsChanges = new BehaviorSubject(this.accordion.panels);
    }
    getPanelChanges(panelId) {
        return this._panelsChanges.pipe(map(panels => panels.find(s => s.id === panelId)));
    }
    setStrategy(strategy) {
        this.accordion.setStrategy(strategy);
    }
    addPanel(panelId, open = false) {
        this.accordion.addPanel(panelId, open);
        this.emitUpdatedPanels();
    }
    togglePanel(panelId, open) {
        this.accordion.togglePanel(panelId, open);
        this.emitUpdatedPanels();
    }
    disablePanel(panelId, disabled) {
        this.accordion.disablePanel(panelId, disabled);
        this.emitUpdatedPanels();
    }
    updatePanelOrder(ids) {
        this.accordion.updatePanelOrder(ids);
        this.emitUpdatedPanels();
    }
    emitUpdatedPanels() {
        this._panelsChanges.next(this.accordion.panels);
    }
};
AccordionService = __decorate([
    Injectable()
], AccordionService);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const defaultAnimationTiming = '0.2s ease-in-out';

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const panelAnimation = [
    trigger('skipInitialRender', [transition(':enter', [])]),
    trigger('toggle', [
        transition('void => *', [
            style({ display: 'block', height: 0 }),
            animate(defaultAnimationTiming, style({ height: '*' })),
        ]),
    ]),
];
const stepAnimation = [
    trigger('skipInitialRender', [transition(':enter', [])]),
    trigger('toggle', [
        transition('void => *', [
            style({ display: 'block', height: 0 }),
            animate(defaultAnimationTiming, style({ height: '*' })),
        ]),
        transition('* => void', [
            style({ display: 'block' }),
            animate(defaultAnimationTiming, style({ height: 0, display: 'none' })),
        ]),
    ]),
];

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAccordionDescription = class ClrAccordionDescription {
};
ClrAccordionDescription = __decorate([
    Component({
        selector: 'clr-accordion-description, clr-step-description',
        template: `<ng-content></ng-content>`,
        host: { '[class.clr-accordion-description]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ClrAccordionDescription);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAccordionPanel = class ClrAccordionPanel {
    constructor(commonStrings, accordionService, ifExpandService, id) {
        this.commonStrings = commonStrings;
        this.accordionService = accordionService;
        this.ifExpandService = ifExpandService;
        this.id = id;
        this.disabled = false;
        this.panelOpen = false;
        this.panelOpenChange = new EventEmitter();
        this.AccordionStatus = AccordionStatus;
        this.isAccordion = true;
    }
    ngOnInit() {
        this.panel = this.accordionService.getPanelChanges(this.id).pipe(tap(panel => this.emitPanelChange(panel)));
        this.accordionService.addPanel(this.id, this.panelOpen);
        this.accordionService.togglePanel(this.id, this.panelOpen);
        this.accordionService.disablePanel(this.id, this.disabled);
    }
    ngOnChanges(changes) {
        if (this.panel && changes.panelOpen && changes.panelOpen.currentValue !== changes.panelOpen.previousValue) {
            this.accordionService.togglePanel(this.id, changes.panelOpen.currentValue);
        }
        if (this.panel && changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
            this.accordionService.disablePanel(this.id, changes.disabled.currentValue);
        }
    }
    togglePanel() {
        this.accordionService.togglePanel(this.id);
    }
    collapsePanelOnAnimationDone(panel) {
        if (!panel.open) {
            this.ifExpandService.expanded = false;
        }
    }
    getPanelStateClasses(panel) {
        return `clr-accordion-panel-${panel.status} ${panel.open ? 'clr-accordion-panel-open' : ''}`;
    }
    getAccordionContentId(id) {
        return `clr-accordion-content-${id}'`;
    }
    getAccordionHeaderId(id) {
        return `clr-accordion-header-${id}`;
    }
    emitPanelChange(panel) {
        this.panelOpenChange.emit(panel.open);
        if (panel.open) {
            this.ifExpandService.expanded = true;
        }
    }
};
__decorate([
    Input('clrAccordionPanelDisabled'),
    __metadata("design:type", Object)
], ClrAccordionPanel.prototype, "disabled", void 0);
__decorate([
    Input('clrAccordionPanelOpen'),
    __metadata("design:type", Object)
], ClrAccordionPanel.prototype, "panelOpen", void 0);
__decorate([
    Output('clrAccordionPanelOpenChange'),
    __metadata("design:type", Object)
], ClrAccordionPanel.prototype, "panelOpenChange", void 0);
__decorate([
    ContentChildren(ClrAccordionDescription),
    __metadata("design:type", QueryList)
], ClrAccordionPanel.prototype, "accordionDescription", void 0);
ClrAccordionPanel = __decorate([
    Component({
        selector: 'clr-accordion-panel',
        template: "<ng-container *ngIf=\"panel | async; let panel\">\n  <div *ngIf=\"panel.status !== AccordionStatus.Inactive\" aria-live=\"assertive\" class=\"clr-sr-only\">\n    <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n  </div>\n\n  <div role=\"group\" [ngClass]=\"getPanelStateClasses(panel)\">\n    <div class=\"clr-accordion-header\">\n      <button\n        type=\"button\"\n        class=\"clr-accordion-header-button\"\n        (click)=\"togglePanel()\"\n        [id]=\"getAccordionHeaderId(panel.templateId)\"\n        [disabled]=\"isAccordion && panel.disabled\"\n        [attr.aria-disabled]=\"!isAccordion && panel.disabled\"\n        [attr.aria-controls]=\"getAccordionContentId(panel.templateId)\"\n        [attr.aria-expanded]=\"panel.open\"\n        [class.clr-accordion-header-has-description]=\"(accordionDescription.changes | async)?.length || accordionDescription.length\"\n        #headerButton\n      >\n        <span class=\"clr-sr-only\">\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Complete\">{{commonStrings.keys.success}}</ng-container>\n        </span>\n        <span class=\"clr-accordion-status\">\n          <clr-icon shape=\"angle\" dir=\"right\" class=\"clr-accordion-angle\"></clr-icon>\n          <span class=\"clr-accordion-number\"></span>\n          <clr-icon shape=\"exclamation-circle\" class=\"clr-accordion-error-icon\"></clr-icon>\n          <clr-icon shape=\"check-circle\" class=\"clr-accordion-complete-icon\"></clr-icon>\n        </span>\n        <ng-content select=\"clr-accordion-title, clr-step-title\"></ng-content>\n        <ng-content select=\"clr-accordion-description, clr-step-description\"></ng-content>\n      </button>\n    </div>\n    <div\n      @skipInitialRender\n      role=\"region\"\n      [id]=\"getAccordionContentId(panel.templateId)\"\n      [attr.aria-hidden]=\"!panel.open\"\n      [attr.aria-labelledby]=\"getAccordionHeaderId(panel.templateId)\"\n    >\n      <div\n        *ngIf=\"panel.open\"\n        @toggle\n        (@toggle.done)=\"collapsePanelOnAnimationDone(panel)\"\n        class=\"clr-accordion-content\">\n        <div class=\"clr-accordion-inner-content\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
        host: { '[class.clr-accordion-panel]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: panelAnimation,
        providers: [IfExpandService, UNIQUE_ID_PROVIDER]
    }),
    __param(3, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [ClrCommonStringsService,
        AccordionService,
        IfExpandService, String])
], ClrAccordionPanel);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAccordionTitle = class ClrAccordionTitle {
};
ClrAccordionTitle = __decorate([
    Component({
        selector: 'clr-accordion-title, clr-step-title',
        template: `<ng-content></ng-content>`,
        host: { '[class.clr-accordion-title]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ClrAccordionTitle);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAccordion = class ClrAccordion {
    constructor(accordionService) {
        this.accordionService = accordionService;
        this.multiPanel = false;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.setAccordionStrategy();
    }
    ngOnChanges(changes) {
        if (changes.multiPanel.currentValue !== changes.multiPanel.previousValue) {
            this.setAccordionStrategy();
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.listenForDOMChanges());
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    setAccordionStrategy() {
        const strategy = this.multiPanel ? AccordionStrategy.Multi : AccordionStrategy.Default;
        this.accordionService.setStrategy(strategy);
    }
    listenForDOMChanges() {
        return this.panels.changes
            .pipe(startWith(this.panels))
            .subscribe(panels => this.accordionService.updatePanelOrder(panels.toArray().map(p => p.id)));
    }
};
__decorate([
    Input('clrAccordionMultiPanel'),
    __metadata("design:type", Object)
], ClrAccordion.prototype, "multiPanel", void 0);
__decorate([
    ContentChildren(ClrAccordionPanel, { descendants: true }),
    __metadata("design:type", QueryList)
], ClrAccordion.prototype, "panels", void 0);
ClrAccordion = __decorate([
    Component({
        selector: 'clr-accordion',
        template: `<ng-content></ng-content>`,
        host: { '[class.clr-accordion]': 'true' },
        providers: [AccordionService],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [AccordionService])
], ClrAccordion);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrAccordionContent = class ClrAccordionContent {
};
ClrAccordionContent = __decorate([
    Component({
        selector: 'clr-accordion-content, clr-step-content',
        template: `<ng-content></ng-content>`,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ClrAccordionContent);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let AccordionWillyWonka = class AccordionWillyWonka extends WillyWonka {
};
AccordionWillyWonka = __decorate([
    Directive({ selector: 'clr-accordion' })
], AccordionWillyWonka);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let AccordionOompaLoompa = class AccordionOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, ifExpandService) {
        if (!willyWonka) {
            throw new Error('clr-accordion-panel should only be used inside of clr-accordion');
        }
        super(cdr, willyWonka);
        this.expand = ifExpandService;
    }
    get flavor() {
        return this.expand.expanded;
    }
};
AccordionOompaLoompa = __decorate([
    Directive({ selector: 'clr-accordion-panel' }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ChangeDetectorRef, AccordionWillyWonka, IfExpandService])
], AccordionOompaLoompa);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const declarations = [
    ClrAccordion,
    ClrAccordionPanel,
    ClrAccordionTitle,
    ClrAccordionDescription,
    ClrAccordionContent,
    AccordionOompaLoompa,
    AccordionWillyWonka,
];
let ClrAccordionModule = class ClrAccordionModule {
};
ClrAccordionModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule],
        declarations: [...declarations],
        exports: [...declarations],
    })
], ClrAccordionModule);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StepperModel extends AccordionModel {
    get allPanelsCompleted() {
        return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
    }
    addPanel(id, open = false) {
        super.addPanel(id, open);
        this._panels[id].disabled = true;
    }
    updatePanelOrder(ids) {
        super.updatePanelOrder(ids);
        this.openFirstPanel();
    }
    togglePanel(panelId) {
        if (this._panels[panelId].status === AccordionStatus.Complete) {
            this._panels[panelId].open = !this._panels[panelId].open;
        }
    }
    navigateToNextPanel(currentPanelId, currentPanelValid = true) {
        if (currentPanelValid) {
            this.completePanel(currentPanelId);
            this.openNextPanel(this._panels[currentPanelId].id);
        }
        else {
            this.setPanelError(currentPanelId);
        }
    }
    overrideInitialPanel(panelId) {
        this.panels.filter(() => this._panels[panelId] !== undefined).forEach(panel => {
            if (panel.index < this._panels[panelId].index) {
                this.completePanel(panel.id);
            }
            else if (panel.id === panelId) {
                this._panels[panel.id].open = true;
            }
            else {
                this._panels[panel.id].open = false;
            }
        });
    }
    setPanelsWithErrors(ids) {
        ids.forEach(id => this.setPanelError(id));
    }
    resetPanels() {
        this.panels.forEach(p => this.resetPanel(p.id));
        this.openFirstPanel();
    }
    getNextPanel(currentPanelId) {
        return this.panels.find(s => s.index === this._panels[currentPanelId].index + 1);
    }
    resetAllFuturePanels(panelId) {
        this.panels.filter(panel => panel.index >= this._panels[panelId].index).forEach(panel => this.resetPanel(panel.id));
    }
    resetPanel(panelId) {
        this._panels[panelId].status = AccordionStatus.Inactive;
        this._panels[panelId].open = false;
        this._panels[panelId].disabled = true;
    }
    openFirstPanel() {
        const firstPanel = this.getFirstPanel();
        this._panels[firstPanel.id].open = true;
        this._panels[firstPanel.id].disabled = true;
    }
    completePanel(panelId) {
        this._panels[panelId].status = AccordionStatus.Complete;
        this._panels[panelId].disabled = false;
        this._panels[panelId].open = false;
    }
    openNextPanel(currentPanelId) {
        const nextPanel = this.getNextPanel(currentPanelId);
        if (nextPanel) {
            this.resetAllFuturePanels(nextPanel.id);
            this._panels[nextPanel.id].open = true;
            this._panels[nextPanel.id].disabled = true;
        }
    }
    setPanelError(panelId) {
        this.resetAllFuturePanels(panelId);
        this._panels[panelId].open = true;
        this._panels[panelId].status = AccordionStatus.Error;
    }
    getFirstPanel() {
        return this.panels.find(panel => panel.index === 0);
    }
    getNumberOfIncompletePanels() {
        return this.panels.reduce((prev, next) => (next.status !== AccordionStatus.Complete ? prev + 1 : prev), 0);
    }
    getNumberOfOpenPanels() {
        return this.panels.reduce((prev, next) => (next.open !== false ? prev + 1 : prev), 0);
    }
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let StepperService = class StepperService extends AccordionService {
    constructor() {
        super(...arguments);
        this.panelsCompleted = this.getAllCompletedPanelChanges();
        this.accordion = new StepperModel();
        this._activeStepChanges = new Subject();
        this.activeStep = this._activeStepChanges.asObservable();
    }
    resetPanels() {
        this.accordion.resetPanels();
        this.emitUpdatedPanels();
    }
    setPanelsWithErrors(ids) {
        this.accordion.setPanelsWithErrors(ids);
        this.emitUpdatedPanels();
    }
    navigateToNextPanel(currentPanelId, currentPanelValid = true) {
        this.accordion.navigateToNextPanel(currentPanelId, currentPanelValid);
        this.updateNextStep(currentPanelId, currentPanelValid);
        this.emitUpdatedPanels();
    }
    overrideInitialPanel(panelId) {
        this.accordion.overrideInitialPanel(panelId);
        this.emitUpdatedPanels();
    }
    updateNextStep(currentPanelId, currentPanelValid) {
        const nextPanel = this.accordion.getNextPanel(currentPanelId);
        if (currentPanelValid && nextPanel) {
            this._activeStepChanges.next(nextPanel.id);
        }
        else if (currentPanelValid) {
            this._activeStepChanges.next(currentPanelId);
        }
    }
    getAllCompletedPanelChanges() {
        return this._panelsChanges.pipe(map(() => this.accordion.allPanelsCompleted), distinctUntilChanged());
    }
};
StepperService = __decorate([
    Injectable()
], StepperService);

/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
function triggerAllFormControlValidation(formGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched();
            control.markAsDirty();
            control.updateValueAndValidity();
        }
        else if (control instanceof FormGroup) {
            triggerAllFormControlValidation(control);
        }
    });
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrStepperPanel = class ClrStepperPanel extends ClrAccordionPanel {
    constructor(platformId, commonStrings, formGroupName, ngModelGroup, stepperService, ifExpandService, id) {
        super(commonStrings, stepperService, ifExpandService, id);
        this.platformId = platformId;
        this.commonStrings = commonStrings;
        this.formGroupName = formGroupName;
        this.ngModelGroup = ngModelGroup;
        this.stepperService = stepperService;
        this.isAccordion = false;
        this.subscriptions = [];
    }
    get formGroup() {
        return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
    }
    get id() {
        return this.formGroupName ? this.formGroupName.name : this.ngModelGroup.name;
    }
    set id(_value) { } // overriding parent id required empty setter
    ngOnInit() {
        super.ngOnInit();
        this.panel = this.panel.pipe(tap(panel => this.triggerAllFormControlValidationIfError(panel)));
        this.stepperService.disablePanel(this.id, true);
        this.listenToFocusChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    listenToFocusChanges() {
        this.subscriptions.push(this.stepperService.activeStep
            .pipe(filter(panelId => isPlatformBrowser(this.platformId) && panelId === this.id))
            .subscribe(() => this.headerButton.nativeElement.focus()));
    }
    triggerAllFormControlValidationIfError(panel) {
        if (panel.status === AccordionStatus.Error) {
            triggerAllFormControlValidation(this.formGroup);
        }
    }
};
__decorate([
    ViewChild('headerButton', { static: false }),
    __metadata("design:type", ElementRef)
], ClrStepperPanel.prototype, "headerButton", void 0);
ClrStepperPanel = __decorate([
    Component({
        selector: 'clr-stepper-panel',
        template: "<ng-container *ngIf=\"panel | async; let panel\">\n  <div *ngIf=\"panel.status !== AccordionStatus.Inactive\" aria-live=\"assertive\" class=\"clr-sr-only\">\n    <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n  </div>\n\n  <div role=\"group\" [ngClass]=\"getPanelStateClasses(panel)\">\n    <div class=\"clr-accordion-header\">\n      <button\n        type=\"button\"\n        class=\"clr-accordion-header-button\"\n        (click)=\"togglePanel()\"\n        [id]=\"getAccordionHeaderId(panel.templateId)\"\n        [disabled]=\"isAccordion && panel.disabled\"\n        [attr.aria-disabled]=\"!isAccordion && panel.disabled\"\n        [attr.aria-controls]=\"getAccordionContentId(panel.templateId)\"\n        [attr.aria-expanded]=\"panel.open\"\n        [class.clr-accordion-header-has-description]=\"(accordionDescription.changes | async)?.length || accordionDescription.length\"\n        #headerButton\n      >\n        <span class=\"clr-sr-only\">\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Error\">{{commonStrings.keys.danger}}</ng-container>\n          <ng-container *ngIf=\"panel.status === AccordionStatus.Complete\">{{commonStrings.keys.success}}</ng-container>\n        </span>\n        <span class=\"clr-accordion-status\">\n          <clr-icon shape=\"angle\" dir=\"right\" class=\"clr-accordion-angle\"></clr-icon>\n          <span class=\"clr-accordion-number\"></span>\n          <clr-icon shape=\"exclamation-circle\" class=\"clr-accordion-error-icon\"></clr-icon>\n          <clr-icon shape=\"check-circle\" class=\"clr-accordion-complete-icon\"></clr-icon>\n        </span>\n        <ng-content select=\"clr-accordion-title, clr-step-title\"></ng-content>\n        <ng-content select=\"clr-accordion-description, clr-step-description\"></ng-content>\n      </button>\n    </div>\n    <div\n      @skipInitialRender\n      role=\"region\"\n      [id]=\"getAccordionContentId(panel.templateId)\"\n      [attr.aria-hidden]=\"!panel.open\"\n      [attr.aria-labelledby]=\"getAccordionHeaderId(panel.templateId)\"\n    >\n      <div\n        *ngIf=\"panel.open\"\n        @toggle\n        (@toggle.done)=\"collapsePanelOnAnimationDone(panel)\"\n        class=\"clr-accordion-content\">\n        <div class=\"clr-accordion-inner-content\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
        host: { '[class.clr-accordion-panel]': 'true' },
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: stepAnimation,
        providers: [IfExpandService, UNIQUE_ID_PROVIDER]
    }),
    __param(0, Inject(PLATFORM_ID)),
    __param(2, Optional()),
    __param(3, Optional()),
    __param(6, Inject(UNIQUE_ID)),
    __metadata("design:paramtypes", [Object,
        ClrCommonStringsService,
        FormGroupName,
        NgModelGroup,
        StepperService,
        IfExpandService, String])
], ClrStepperPanel);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrStepButtonType;
(function (ClrStepButtonType) {
    ClrStepButtonType["Next"] = "next";
    ClrStepButtonType["Submit"] = "submit";
})(ClrStepButtonType || (ClrStepButtonType = {}));
let ClrStepButton = class ClrStepButton {
    constructor(clrStep, stepperService) {
        this.clrStep = clrStep;
        this.stepperService = stepperService;
        this.type = ClrStepButtonType.Next;
        this.submitButton = false;
    }
    ngOnInit() {
        this.submitButton = this.type === ClrStepButtonType.Submit;
    }
    navigateToNextPanel() {
        this.stepperService.navigateToNextPanel(this.clrStep.id, this.clrStep.formGroup.valid);
    }
};
__decorate([
    Input('clrStepButton'),
    __metadata("design:type", String)
], ClrStepButton.prototype, "type", void 0);
__decorate([
    HostBinding('class.btn-primary'),
    __metadata("design:type", Object)
], ClrStepButton.prototype, "submitButton", void 0);
__decorate([
    HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClrStepButton.prototype, "navigateToNextPanel", null);
ClrStepButton = __decorate([
    Directive({
        selector: '[clrStepButton]',
        host: {
            '[class.clr-step-button]': 'true',
            '[class.btn]': 'true',
            '[type]': "'button'",
        },
    }),
    __metadata("design:paramtypes", [ClrStepperPanel, StepperService])
], ClrStepButton);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let ClrStepper = class ClrStepper {
    constructor(formGroup, ngForm, stepperService) {
        this.formGroup = formGroup;
        this.ngForm = ngForm;
        this.stepperService = stepperService;
        this.subscriptions = [];
    }
    ngOnInit() {
        if (!this.formGroup && !this.ngForm) {
            throw new Error('To use stepper a Reactive or Template Form is required.');
        }
        this.form = this.formGroup ? this.formGroup : this.ngForm;
        this.subscriptions.push(this.listenForPanelsCompleted());
        this.subscriptions.push(this.listenForFormResetChanges());
    }
    ngOnChanges(changes) {
        if (changes.initialPanel.currentValue !== changes.initialPanel.previousValue) {
            this.stepperService.overrideInitialPanel(this.initialPanel);
        }
    }
    ngAfterViewInit() {
        this.subscriptions.push(this.listenForDOMChanges());
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    listenForFormResetChanges() {
        return this.form.statusChanges
            .pipe(filter(() => this.form.pristine)) // https://github.com/angular/angular/issues/10887
            .subscribe(() => this.stepperService.resetPanels());
    }
    listenForPanelsCompleted() {
        return this.stepperService.panelsCompleted.subscribe(panelsCompleted => {
            if (panelsCompleted && this.form.valid) {
                this.form.ngSubmit.emit();
            }
            else if (!this.form.valid && this.form.touched) {
                this.setPanelsWithFormErrors();
            }
        });
    }
    setPanelsWithFormErrors() {
        const panelsWithErrors = this.panels.reduce((panels, p) => (p.formGroup.invalid ? [...panels, p.id] : panels), []);
        this.stepperService.setPanelsWithErrors(panelsWithErrors);
    }
    listenForDOMChanges() {
        return this.panels.changes.pipe(startWith(this.panels)).subscribe(panels => {
            this.stepperService.updatePanelOrder(panels.toArray().map(p => p.id));
            if (this.initialPanel) {
                this.stepperService.overrideInitialPanel(this.initialPanel);
            }
        });
    }
};
__decorate([
    Input('clrInitialStep'),
    __metadata("design:type", String)
], ClrStepper.prototype, "initialPanel", void 0);
__decorate([
    ContentChildren(ClrStepperPanel, { descendants: true }),
    __metadata("design:type", QueryList)
], ClrStepper.prototype, "panels", void 0);
ClrStepper = __decorate([
    Component({
        selector: 'form[clrStepper]',
        template: `<ng-content></ng-content>`,
        host: {
            '[class.clr-accordion]': 'true',
            '[class.clr-stepper-forms]': 'true',
        },
        providers: [StepperService, { provide: AccordionService, useExisting: StepperService }],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(0, Optional()),
    __param(1, Optional()),
    __metadata("design:paramtypes", [FormGroupDirective,
        NgForm,
        StepperService])
], ClrStepper);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let StepperWillyWonka = class StepperWillyWonka extends WillyWonka {
};
StepperWillyWonka = __decorate([
    Directive({ selector: 'form[clrStepper]' })
], StepperWillyWonka);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let StepperOompaLoompa = class StepperOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, ifExpandService) {
        if (!willyWonka) {
            throw new Error('clr-stepper-panel should only be used inside of clrStepper');
        }
        super(cdr, willyWonka);
        this.expand = ifExpandService;
    }
    get flavor() {
        return this.expand.expanded;
    }
};
StepperOompaLoompa = __decorate([
    Directive({ selector: 'clr-stepper-panel, [clrStepButton]' }),
    __param(1, Optional()),
    __metadata("design:paramtypes", [ChangeDetectorRef, StepperWillyWonka, IfExpandService])
], StepperOompaLoompa);

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const declarations$1 = [ClrStepper, ClrStepButton, ClrStepperPanel, StepperOompaLoompa, StepperWillyWonka];
let ClrStepperModule = class ClrStepperModule {
};
ClrStepperModule = __decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule, ClrAccordionModule],
        declarations: [...declarations$1],
        exports: [...declarations$1, ClrAccordionModule],
    })
], ClrStepperModule);

let ClrProgressBar = class ClrProgressBar {
    constructor() {
        this.externalId = '';
        // Progress
        this.max = 100;
        this.value = 0;
    }
    set id(value) {
        this._ID = value;
        this.externalId = null;
    }
    get id() {
        return this._ID;
    }
    // Styles
    get progressClass() {
        return true;
    }
    get labeledClass() {
        return this._labeled;
    }
    set clrLabeled(value) {
        this._labeled = isBooleanAttributeSet(value);
    }
    get fadeClass() {
        return this._fade;
    }
    set clrFade(value) {
        this._fade = isBooleanAttributeSet(value);
    }
    get loopClass() {
        return this._loop;
    }
    set clrLoop(value) {
        this._loop = isBooleanAttributeSet(value);
    }
    get successClass() {
        return this._success;
    }
    set clrSuccess(value) {
        this._success = isBooleanAttributeSet(value);
    }
    get dangerClass() {
        return this._danger;
    }
    set clrDanger(value) {
        this._danger = isBooleanAttributeSet(value);
    }
    get flashClass() {
        return this._flash;
    }
    set clrFlash(value) {
        this._flash = isBooleanAttributeSet(value);
    }
    get flashDangerClass() {
        return this._flashDanger;
    }
    set clrFlashDanger(value) {
        this._flashDanger = isBooleanAttributeSet(value);
    }
    /**
     * Make sure that we always will have something that is readable
     * for the screen reader
     */
    get displayValue() {
        if (this.displayval) {
            return this.displayval;
        }
        return `${this.value}%`;
    }
    /**
     * Display aria-live only when there is value and it's not 0 or equal to the max value
     */
    displayAriaLive() {
        return (this.value !== undefined || this.value !== 0) && this.value !== this.max;
    }
    get ariaLive() {
        if (isBooleanAttributeSet(this.assertive)) {
            return 'assertive';
        }
        if (isBooleanAttributeSet(this.off)) {
            return 'off';
        }
        return 'polite';
    }
};
__decorate([
    HostBinding('attr.id'),
    __metadata("design:type", String)
], ClrProgressBar.prototype, "externalId", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ClrProgressBar.prototype, "id", null);
__decorate([
    Input('clrMax'),
    __metadata("design:type", Number)
], ClrProgressBar.prototype, "max", void 0);
__decorate([
    Input('clrValue'),
    __metadata("design:type", Number)
], ClrProgressBar.prototype, "value", void 0);
__decorate([
    Input('clrDisplayval'),
    __metadata("design:type", String)
], ClrProgressBar.prototype, "displayval", void 0);
__decorate([
    HostBinding('class.progress'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "progressClass", null);
__decorate([
    HostBinding('class.labeled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "labeledClass", null);
__decorate([
    Input('clrLabeled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrLabeled", null);
__decorate([
    HostBinding('class.progress-fade'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "fadeClass", null);
__decorate([
    Input('clrFade'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrFade", null);
__decorate([
    HostBinding('class.loop'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "loopClass", null);
__decorate([
    Input('clrLoop'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrLoop", null);
__decorate([
    HostBinding('class.success'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "successClass", null);
__decorate([
    Input('clrSuccess'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrSuccess", null);
__decorate([
    HostBinding('class.danger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "dangerClass", null);
__decorate([
    Input('clrDanger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrDanger", null);
__decorate([
    HostBinding('class.flash'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "flashClass", null);
__decorate([
    Input('clrFlash'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrFlash", null);
__decorate([
    HostBinding('class.flash-danger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClrProgressBar.prototype, "flashDangerClass", null);
__decorate([
    Input('clrFlashDanger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ClrProgressBar.prototype, "clrFlashDanger", null);
__decorate([
    Input('clrAssertive'),
    __metadata("design:type", Boolean)
], ClrProgressBar.prototype, "assertive", void 0);
__decorate([
    Input('clrOff'),
    __metadata("design:type", Boolean)
], ClrProgressBar.prototype, "off", void 0);
ClrProgressBar = __decorate([
    Component({
        selector: 'clr-progress-bar',
        template: `
    <progress [id]="id" [attr.max]="max" [attr.value]="value" [attr.data-displayval]="displayValue"></progress>
    <span *ngIf="displayAriaLive()" [attr.aria-live]="ariaLive">{{ displayValue }}</span>
  `
    })
], ClrProgressBar);

const CLR_PROGRESS_BAR_DIRECTIVES = [ClrProgressBar];
let ClrProgressBarModule = class ClrProgressBarModule {
};
ClrProgressBarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [CLR_PROGRESS_BAR_DIRECTIVES],
        exports: [CLR_PROGRESS_BAR_DIRECTIVES],
    })
], ClrProgressBarModule);

let ClarityModule = class ClarityModule {
};
ClarityModule = __decorate([
    NgModule({
        exports: [
            ClrEmphasisModule,
            ClrDataModule,
            ClrIconModule,
            ClrModalModule,
            ClrLoadingModule,
            ClrConditionalModule,
            ClrFocusTrapModule,
            ClrFocusOnViewInitModule,
            ClrButtonModule,
            ClrFormsModule,
            ClrLayoutModule,
            ClrPopoverModule,
            ClrWizardModule,
            ClrDragAndDropModule,
            ClrStepperModule,
            ClrSpinnerModule,
            ClrProgressBarModule,
            ClrPopoverModuleNext,
        ],
    })
], ClarityModule);

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function collapse() {
    return [
        state('true', style({ height: 0, 'overflow-y': 'hidden' })),
        transition('true => false', [animate(defaultAnimationTiming, style({ height: '*', 'overflow-y': 'hidden' }))]),
        transition('false => true', [style({ height: '*', 'overflow-y': 'hidden' }), animate(defaultAnimationTiming)]),
    ];
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function fade(opacity = 1) {
    return [
        transition('void => *', [style({ opacity: 0 }), animate(defaultAnimationTiming, style({ opacity: opacity }))]),
        transition('* => void', [animate(defaultAnimationTiming, style({ opacity: 0 }))]),
    ];
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function fadeSlide(direction) {
    let transform = null;
    if (direction === 'up') {
        transform = 'translate(0, 25%)';
    }
    else if (direction === 'down') {
        transform = 'translate(0, -25%)';
    }
    else if (direction === 'left') {
        transform = 'translate(25%, 0)';
    }
    else if (direction === 'right') {
        transform = 'translate(-25%, 0)';
    }
    else {
        throw new Error('Unknown direction ' + direction + ' for slide animation.');
    }
    return [
        transition('void => *', [style({ opacity: 0, transform: transform }), animate(defaultAnimationTiming)]),
        transition('* => void', [animate(defaultAnimationTiming, style({ opacity: 0, transform: transform }))]),
    ];
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
function slide(direction) {
    let transform = null;
    if (direction === 'up') {
        transform = 'translate(0, 25%)';
    }
    else if (direction === 'down') {
        transform = 'translate(0, -25%)';
    }
    else if (direction === 'left') {
        transform = 'translate(25%, 0)';
    }
    else if (direction === 'right') {
        transform = 'translate(-25%, 0)';
    }
    else {
        throw new Error('Unknown direction ' + direction + ' for slide animation.');
    }
    return [
        transition('void => *', [style({ transform: transform }), animate(defaultAnimationTiming)]),
        transition('* => void', [animate(defaultAnimationTiming, style({ transform: transform }))]),
    ];
}

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CLR_ALERT_DIRECTIVES, CLR_BUTTON_GROUP_DIRECTIVES, CLR_DATAGRID_DIRECTIVES, CLR_DATEPICKER_DIRECTIVES, CLR_DRAG_AND_DROP_DIRECTIVES, CLR_DROPDOWN_DIRECTIVES, CLR_ICON_DIRECTIVES, CLR_LAYOUT_DIRECTIVES, CLR_LOADING_BUTTON_DIRECTIVES, CLR_LOADING_DIRECTIVES, CLR_MENU_POSITIONS, CLR_MODAL_DIRECTIVES, CLR_NAVIGATION_DIRECTIVES, CLR_PROGRESS_BAR_DIRECTIVES, CLR_SIGNPOST_DIRECTIVES, CLR_SPINNER_DIRECTIVES, CLR_STACK_VIEW_DIRECTIVES, CLR_TABS_DIRECTIVES, CLR_TOOLTIP_DIRECTIVES, CLR_TREE_VIEW_DIRECTIVES, CLR_VERTICAL_NAV_DIRECTIVES, CLR_WIZARD_DIRECTIVES, CONDITIONAL_DIRECTIVES, CUSTOM_BUTTON_TYPES, ClarityModule, ClrAccordion, ClrAccordionContent, ClrAccordionDescription, ClrAccordionModule, ClrAccordionPanel, ClrAccordionTitle, ClrAlert, ClrAlertItem, ClrAlertModule, ClrAlerts, ClrAlertsPager, ClrAlignment, ClrAxis, ClrButton, ClrButtonGroup, ClrButtonGroupModule, ClrButtonModule, ClrCalendar, ClrCheckbox, ClrCheckboxContainer, ClrCheckboxModule, ClrCheckboxWrapper, ClrCommonFormsModule, ClrCommonStringsService, ClrControlError, ClrControlHelper, ClrDataModule, ClrDatagrid, ClrDatagridActionBar, ClrDatagridActionOverflow, ClrDatagridCell, ClrDatagridColumn, ClrDatagridColumnToggle, ClrDatagridFilter, ClrDatagridFooter, ClrDatagridHideableColumn, ClrDatagridItems, ClrDatagridModule, ClrDatagridPagination, ClrDatagridPlaceholder, ClrDatagridRow, ClrDatagridRowDetail, ClrDatagridSortOrder, ClrDateContainer, ClrDateInput, ClrDatepickerModule, ClrDatepickerViewManager, ClrDay, ClrDaypicker, ClrDragAndDropModule, ClrDragEvent, ClrDragHandle, ClrDraggable, ClrDraggableGhost, ClrDropdown, ClrDropdownItem, ClrDropdownMenu, ClrDropdownModule, ClrDropdownTrigger, ClrDroppable, ClrEmphasisModule, ClrExpandableAnimation, ClrForm, ClrFormsModule, ClrHeader, ClrIconCustomTag, ClrIconModule, ClrIfActive, ClrIfDragged, ClrIfError, ClrIfExpanded, ClrIfOpen, ClrInput, ClrInputContainer, ClrInputModule, ClrLabel, ClrLayout, ClrLayoutModule, ClrLoading, ClrLoadingButton, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrMainContainer, ClrMainContainerModule, ClrModal, ClrModalModule, ClrMonthpicker, ClrNavLevel, ClrNavigationModule, ClrPassword, ClrPasswordContainer, ClrPasswordModule, ClrPopoverAnchor, ClrPopoverContent, ClrPopoverEventsService, ClrPopoverModule, ClrPopoverPositionService, ClrPopoverToggleService, ClrProgressBar, ClrProgressBarModule, ClrRadio, ClrRadioContainer, ClrRadioModule, ClrRadioWrapper, ClrRecursiveForOf, ClrSelect, ClrSelectContainer, ClrSelectModule, ClrSelectedState, ClrSide, ClrSignpost, ClrSignpostContent, ClrSignpostModule, ClrSignpostTrigger, ClrSpinner, ClrSpinnerModule, ClrStackBlock, ClrStackHeader, ClrStackInput, ClrStackSelect, ClrStackView, ClrStackViewCustomTags, ClrStackViewModule, ClrStepButton, ClrStepButtonType, ClrStepper, ClrStepperModule, ClrStepperPanel, ClrTab, ClrTabContent, ClrTabLink, ClrTabOverflowContent, ClrTabs, ClrTabsModule, ClrTextarea, ClrTextareaContainer, ClrTextareaModule, ClrTooltip, ClrTooltipContent, ClrTooltipModule, ClrTooltipTrigger, ClrTree, ClrTreeNode, ClrTreeViewModule, ClrVerticalNav, ClrVerticalNavGroup, ClrVerticalNavGroupChildren, ClrVerticalNavIcon, ClrVerticalNavLink, ClrVerticalNavModule, ClrWizard, ClrWizardButton, ClrWizardCustomTags, ClrWizardHeaderAction, ClrWizardModule, ClrWizardPage, ClrWizardPageButtons, ClrWizardPageHeaderActions, ClrWizardPageNavTitle, ClrWizardPageTitle, ClrWizardStepnav, ClrWizardStepnavItem, ClrYearpicker, DEFAULT_BUTTON_TYPES, DatagridNumericFilter, DatagridPropertyComparator, DatagridPropertyNumericFilter, DatagridPropertyStringFilter, DatagridStringFilter, EXPANDABLE_ANIMATION_DIRECTIVES, IS_TOGGLE, IS_TOGGLE_PROVIDER, LoadingListener, MainContainerWillyWonka, NavDetectionOompaLoompa, TOGGLE_SERVICE, TOGGLE_SERVICE_PROVIDER, ToggleServiceFactory, collapse, fade, fadeSlide, isToggleFactory, slide, FocusTrapTracker as ÇlrFocusTrapTracker, ClrCommonPopoverModule as ɵa, POPOVER_DIRECTIVES as ɵb, IfExpandService as ɵba, AlertIconAndTypesService as ɵbb, MultiAlertService as ɵbc, ControlIdService as ɵbd, LayoutService as ɵbe, NgControlService as ɵbf, IfErrorService as ɵbg, MarkControlService as ɵbh, ClrHostWrappingModule as ɵbi, EmptyAnchor as ɵbj, WrappedFormControl as ɵbk, ControlClassService as ɵbl, ClrFocusTrapModule as ɵbm, FOCUS_TRAP_DIRECTIVES as ɵbn, FocusTrapDirective as ɵbo, DateNavigationService as ɵbp, DateFormControlService as ɵbq, LocaleHelperService as ɵbr, FocusService as ɵbs, DateIOService as ɵbt, DatepickerEnabledService as ɵbu, DatepickerFocusService as ɵbv, ViewManagerService as ɵbw, ClrOutsideClickModule as ɵbx, OUSTIDE_CLICK_DIRECTIVES as ɵby, OutsideClick as ɵbz, PopoverDirectiveOld as ɵc, ClrExpandableAnimationModule as ɵca, DomAdapter as ɵcb, DragEventListenerService as ɵcc, DragAndDropEventBusService as ɵcd, DragHandleRegistrarService as ɵce, DraggableSnapshotService as ɵcf, GlobalDragModeService as ɵcg, ClrPopoverModuleNext as ɵch, ClrPopoverCloseButton as ɵci, ClrPopoverOpenCloseButton as ɵcj, Selection as ɵck, Items as ɵcl, FiltersProvider as ɵcm, Page as ɵcn, StateDebouncer as ɵco, Sort as ɵcp, DatagridRenderOrganizer as ɵcq, RowActionService as ɵcr, ExpandableRowsCount as ɵcs, StateProvider as ɵct, TableSizeService as ɵcu, ColumnsService as ɵcv, DisplayModeService as ɵcw, DatagridFilterRegistrar as ɵcx, CustomFilter as ɵcy, DatagridIfExpandService as ɵcz, IfOpenService as ɵd, SignpostIdService as ɵda, ClrDatagridColumnSeparator as ɵdb, ColumnResizerService as ɵdc, ClrDatagridColumnToggleTitle as ɵdd, ClrDatagridColumnToggleButton as ɵde, COLUMN_STATE as ɵdf, columnStateFactory as ɵdg, COLUMN_STATE_PROVIDER as ɵdh, ClrDatagridItemsTrackBy as ɵdj, DatagridDetailRegisterer as ɵdk, ClrDatagridPageSize as ɵdl, WrappedCell as ɵdm, WrappedColumn as ɵdn, WrappedRow as ɵdo, domAdapterFactory as ɵdp, DatagridMainRenderer as ɵdq, DatagridHeaderRenderer as ɵdr, DatagridRowRenderer as ɵds, DatagridCellRenderer as ɵdt, DatagridWillyWonka as ɵdu, WillyWonka as ɵdv, ActionableOompaLoompa as ɵdw, OompaLoompa as ɵdx, ExpandableOompaLoompa as ɵdy, ClrStackContentInput as ɵdz, RootDropdownService as ɵe, StackControl as ɵea, TreeFeaturesService as ɵeb, treeFeaturesFactory as ɵec, TREE_FEATURES_PROVIDER as ɵed, RecursiveChildren as ɵee, ScrollingService as ɵef, ClrModalBody as ɵeg, ClrFocusOnViewInitModule as ɵeh, FOCUS_ON_VIEW_INIT_DIRECTIVES as ɵei, ClrFocusOnViewInit as ɵej, ButtonInGroupService as ɵek, ResponsiveNavigationService as ɵel, ClrTemplateRefModule as ɵem, TEMPLATE_REF_DIRECTIVES as ɵen, TemplateRefContainer as ɵeo, ClrKeyFocusModule as ɵep, ClrKeyFocus as ɵeq, ClrKeyFocusItem as ɵer, AriaService as ɵes, TabsService as ɵet, TABS_ID as ɵeu, tokenFactory$1 as ɵev, TABS_ID_PROVIDER as ɵew, TabsWillyWonka as ɵex, ActiveOompaLoompa as ɵey, VerticalNavService as ɵez, clrRootDropdownFactory as ɵf, VerticalNavIconService as ɵfa, VerticalNavGroupRegistrationService as ɵfb, VerticalNavGroupService as ɵfc, TooltipIdService as ɵfd, WizardNavigationService as ɵfe, PageCollectionService as ɵff, ButtonHubService as ɵfg, HeaderActionService as ɵfh, AccordionService as ɵfi, panelAnimation as ɵfj, stepAnimation as ɵfk, defaultAnimationTiming as ɵfl, AccordionOompaLoompa as ɵfm, AccordionWillyWonka as ɵfn, StepperService as ɵfo, StepperOompaLoompa as ɵfp, StepperWillyWonka as ɵfq, ROOT_DROPDOWN_PROVIDER as ɵg, POPOVER_HOST_ANCHOR as ɵh, FocusService$1 as ɵi, clrFocusServiceFactory as ɵj, FOCUS_SERVICE_PROVIDER as ɵk, DropdownFocusHandler as ɵl, DROPDOWN_FOCUS_HANDLER_PROVIDER as ɵm, customFocusableItemProvider as ɵn, UNIQUE_ID as ɵo, uniqueIdFactory as ɵp, UNIQUE_ID_PROVIDER as ɵq, FocusableItem as ɵr, AbstractPopover as ɵs, BasicFocusableItem as ɵt, BASIC_FOCUSABLE_ITEM_PROVIDER as ɵu, ClrConditionalModule as ɵv, IF_ACTIVE_ID as ɵw, tokenFactory as ɵx, IF_ACTIVE_ID_PROVIDER as ɵy, IfActiveService as ɵz };
//# sourceMappingURL=clr-angular.js.map
