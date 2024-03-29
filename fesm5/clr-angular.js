import { __decorate, __values, __metadata, __param, __assign, __extends, __spread, __read } from 'tslib';
import { Directive, NgModule, Input, Output, TemplateRef, ViewContainerRef, EventEmitter, Optional, Injectable, ViewChild, Component, SkipSelf, ɵɵdefineInjectable, ContentChildren, QueryList, HostListener, ElementRef, Renderer2, HostBinding, InjectionToken, ContentChild, Inject, ComponentFactoryResolver, Self, Attribute, Injector, PLATFORM_ID, NgZone, LOCALE_ID, ChangeDetectionStrategy, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT, getLocaleDayNames, FormStyle, TranslationWidth, getLocaleMonthNames, getLocaleFirstDayOfWeek, getLocaleDateFormat, FormatWidth, NgForOf } from '@angular/common';
import { Subject, BehaviorSubject, of, fromEvent, combineLatest, Observable, isObservable, ReplaySubject } from 'rxjs';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';
import { NgControl, FormsModule, SelectMultipleControlValueAccessor, FormControl, FormGroup, FormGroupName, NgModelGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { startWith, filter, distinctUntilChanged, first, switchMap, map, take, tap } from 'rxjs/operators';

var ClrIconCustomTag = /** @class */ (function () {
    function ClrIconCustomTag() {
    }
    ClrIconCustomTag = __decorate([
        Directive({ selector: 'clr-icon' })
    ], ClrIconCustomTag);
    return ClrIconCustomTag;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_ICON_DIRECTIVES = [ClrIconCustomTag];
var ClrIconModule = /** @class */ (function () {
    function ClrIconModule() {
    }
    ClrIconModule = __decorate([
        NgModule({ imports: [CommonModule], declarations: [CLR_ICON_DIRECTIVES], exports: [CLR_ICON_DIRECTIVES] })
    ], ClrIconModule);
    return ClrIconModule;
}());

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
var POSITION_RELATIVE = 'relative';
var POSITION_ABSOLUTE = 'absolute';
var POSITION_FIXED = 'fixed';
var OVERFLOW_SCROLL = 'scroll';
var OVERFLOW_AUTO = 'auto';
var Popover = /** @class */ (function () {
    function Popover(element) {
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
    Popover.prototype.anchor = function (anchor, anchorAlign, popoverAlign, _a) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = 'static';
        var anchorRect = anchor.getBoundingClientRect();
        var popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        var leftDiff = anchorRect.left - popoverRect.left + offsetX;
        var topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        var popoverComputedStyle = getComputedStyle(this.element);
        var marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        var marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        var marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        var marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
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
        this.element.style.transform = "translateX(" + Math.round(leftDiff) + "px) translateY(" + Math.round(topDiff) + "px)";
        return this._scroll.asObservable();
    };
    Popover.prototype.release = function () {
        this.element.style.transform = '';
        this.removeScrollEventListeners();
    };
    Popover.prototype.isPositioned = function (container) {
        var position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    Popover.prototype.emitScrollEvent = function () {
        this._scroll.next();
    };
    Popover.prototype.addScrollEventListeners = function (e) {
        this._scroll = new Subject();
        var anchor = e;
        var current = e;
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
    };
    Popover.prototype.removeScrollEventListeners = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.scrollableElements), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                elem.removeEventListener('scroll', this.boundOnScrollListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    };
    Popover.prototype.scrolls = function (container) {
        var computedStyles = getComputedStyle(container);
        return (computedStyles.overflowX === OVERFLOW_SCROLL ||
            computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL ||
            computedStyles.overflowY === OVERFLOW_AUTO);
    };
    return Popover;
}());

var openCount = 0;
var waiting = []; // pending create functions
var PopoverDirectiveOld = /** @class */ (function () {
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        set: function (open) {
            var _this = this;
            if (open) {
                if (this.popoverOptions.allowMultipleOpen) {
                    this.createPopover();
                }
                else {
                    if (openCount === 0) {
                        this.createPopover();
                    }
                    else {
                        waiting.push(function () {
                            _this.createPopover();
                        });
                    }
                }
            }
            else {
                this.viewContainer.clear();
                this.destroyPopover();
                if (!this.popoverOptions.allowMultipleOpen) {
                    if (waiting.length > 0) {
                        var createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    PopoverDirectiveOld.prototype.createPopover = function () {
        var _this = this;
        var embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        var elementNodes = embeddedViewRef.rootNodes.filter(function (node) {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription = this._popoverInstance
            .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
            .subscribe(function () {
            _this.clrPopoverOldChange.emit(false);
        });
        openCount++;
    };
    PopoverDirectiveOld.prototype.destroyPopover = function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    PopoverDirectiveOld.prototype.ngOnDestroy = function () {
        this.destroyPopover();
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
    return PopoverDirectiveOld;
}());

var POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCommonPopoverModule = /** @class */ (function () {
    function ClrCommonPopoverModule() {
    }
    ClrCommonPopoverModule = __decorate([
        NgModule({ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] })
    ], ClrCommonPopoverModule);
    return ClrCommonPopoverModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 */
var LoadingListener = /** @class */ (function () {
    function LoadingListener() {
    }
    return LoadingListener;
}());

var ClrLoadingState;
(function (ClrLoadingState) {
    ClrLoadingState[ClrLoadingState["DEFAULT"] = 0] = "DEFAULT";
    ClrLoadingState[ClrLoadingState["LOADING"] = 1] = "LOADING";
    ClrLoadingState[ClrLoadingState["SUCCESS"] = 2] = "SUCCESS";
    ClrLoadingState[ClrLoadingState["ERROR"] = 3] = "ERROR";
})(ClrLoadingState || (ClrLoadingState = {}));
var ClrLoading = /** @class */ (function () {
    // We find the first parent that handles something loading
    function ClrLoading(listener) {
        this.listener = listener;
        this._loadingState = ClrLoadingState.DEFAULT;
    }
    Object.defineProperty(ClrLoading.prototype, "loadingState", {
        get: function () {
            return this._loadingState;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrLoading.prototype.ngOnDestroy = function () {
        this.loadingState = ClrLoadingState.DEFAULT;
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
    return ClrLoading;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ButtonInGroupService = /** @class */ (function () {
    function ButtonInGroupService() {
        this._changes = new Subject();
    }
    Object.defineProperty(ButtonInGroupService.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ButtonInGroupService.prototype.updateButtonGroup = function (button) {
        this._changes.next(button);
    };
    ButtonInGroupService = __decorate([
        Injectable()
    ], ButtonInGroupService);
    return ButtonInGroupService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButton = /** @class */ (function () {
    function ClrButton(buttonInGroupService) {
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
    ClrButton_1 = ClrButton;
    Object.defineProperty(ClrButton.prototype, "inMenu", {
        get: function () {
            return this._inMenu;
        },
        set: function (value) {
            value = !!value;
            if (this._inMenu !== value) {
                this._inMenu = value;
                // We check if the service flag is enabled
                // and if the service exists because the service is optional
                if (this._enableService && this.buttonInGroupService) {
                    this.buttonInGroupService.updateButtonGroup(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "classNames", {
        get: function () {
            return this._classNames;
        },
        set: function (value) {
            if (typeof value === 'string') {
                var classNames = value.split(' ');
                if (classNames.indexOf('btn') === -1) {
                    classNames.push('btn');
                }
                this._classNames = classNames.join(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._name = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButton.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value !== null && value !== false) {
                this._disabled = '';
            }
            else {
                this._disabled = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrButton.prototype.loadingStateChange = function (state) {
        this.loading = state === ClrLoadingState.LOADING;
    };
    ClrButton.prototype.emitClick = function () {
        this._click.emit(true);
    };
    ClrButton.prototype.ngAfterViewInit = function () {
        this._enableService = true;
    };
    var ClrButton_1;
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
            template: "\n        <ng-template #buttonProjectedRef>\n            <button \n                [class]=\"classNames\" \n                (click)=\"emitClick()\"\n                [attr.type]=\"type\"\n                [attr.name]=\"name\"\n                [attr.disabled]=\"disabled\"\n                [id]=\"id\">\n                <span class=\"spinner spinner-inline\" *ngIf=\"loading\"></span>\n                <ng-content></ng-content>\n            </button>\n        </ng-template>\n    ",
            providers: [{ provide: LoadingListener, useExisting: ClrButton_1 }]
        }),
        __param(0, SkipSelf()),
        __param(0, Optional()),
        __metadata("design:paramtypes", [ButtonInGroupService])
    ], ClrButton);
    return ClrButton;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_MENU_POSITIONS = [
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
var commonStringsDefault = {
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

var ClrCommonStringsService = /** @class */ (function () {
    function ClrCommonStringsService() {
        this._strings = commonStringsDefault;
    }
    /**
     * Allows you to pass in new overrides for localization
     */
    ClrCommonStringsService.prototype.localize = function (overrides) {
        this._strings = __assign({}, this._strings, overrides);
    };
    Object.defineProperty(ClrCommonStringsService.prototype, "keys", {
        /**
         * Access to all of the keys as strings
         */
        get: function () {
            return this._strings;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Parse a string with a set of tokens to replace
     */
    ClrCommonStringsService.prototype.parse = function (source, tokens) {
        if (tokens === void 0) { tokens = {}; }
        var names = Object.keys(tokens);
        var output = source;
        if (names.length) {
            names.forEach(function (name) {
                output = output.replace("{" + name + "}", tokens[name]);
            });
        }
        return output;
    };
    ClrCommonStringsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ClrCommonStringsService_Factory() { return new ClrCommonStringsService(); }, token: ClrCommonStringsService, providedIn: "root" });
    ClrCommonStringsService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], ClrCommonStringsService);
    return ClrCommonStringsService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButtonGroup = /** @class */ (function () {
    function ClrButtonGroup(buttonGroupNewService, elementRef, commonStrings) {
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
    ClrButtonGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(function (button) { return _this.rearrangeButton(button); });
        this.buttons.changes.subscribe(function () {
            _this.initializeButtons();
        });
    };
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param button
     */
    ClrButtonGroup.prototype.rearrangeButton = function (button) {
        var fromView;
        var toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        var index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            var moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    };
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param buttonToMove
     * @returns
     */
    ClrButtonGroup.prototype.getMoveIndex = function (buttonToMove) {
        var tempArr = this.buttons.filter(function (button) { return button.inMenu === buttonToMove.inMenu; });
        return tempArr.indexOf(buttonToMove);
    };
    ClrButtonGroup.prototype.initializeButtons = function () {
        var tempInlineButtons = [];
        var tempInMenuButtons = [];
        this.buttons.forEach(function (button) {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    };
    Object.defineProperty(ClrButtonGroup.prototype, "menuPosition", {
        get: function () {
            return this._menuPosition;
        },
        set: function (pos) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrButtonGroup.prototype, "openMenu", {
        get: function () {
            return this._openMenu;
        },
        set: function (value) {
            this._openMenu = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the ClrDropdown Menu when the ClrDropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     */
    ClrButtonGroup.prototype.toggleMenu = function () {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    };
    // TODO: Generic Directive to handle this
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     */
    ClrButtonGroup.prototype.onMouseClick = function (target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            var current = target; // Get the element in the DOM on which the mouse was clicked
            var host = this.elementRef.nativeElement; // Current Button Group
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
    return ClrButtonGroup;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_BUTTON_GROUP_DIRECTIVES = [ClrButton, ClrButtonGroup];
var ClrButtonGroupModule = /** @class */ (function () {
    function ClrButtonGroupModule() {
    }
    ClrButtonGroupModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
            declarations: [CLR_BUTTON_GROUP_DIRECTIVES],
            exports: [CLR_BUTTON_GROUP_DIRECTIVES],
        })
    ], ClrButtonGroupModule);
    return ClrButtonGroupModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLoadingButton = /** @class */ (function () {
    function ClrLoadingButton(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonState = ClrLoadingState;
        this.state = ClrLoadingState.DEFAULT;
        this.clrLoadingChange = new EventEmitter(false);
    }
    ClrLoadingButton_1 = ClrLoadingButton;
    ClrLoadingButton.prototype.loadingStateChange = function (state) {
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
    };
    ClrLoadingButton.prototype.setExplicitButtonWidth = function () {
        if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            var boundingClientRect = this.el.nativeElement.getBoundingClientRect();
            this.renderer.setStyle(this.el.nativeElement, 'width', boundingClientRect.width + "px");
        }
    };
    var ClrLoadingButton_1;
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
            template: "\n        <ng-container [ngSwitch]=\"state\">\n            <span *ngSwitchCase=\"buttonState.LOADING\">\n                <span @spinner class=\"spinner spinner-inline\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.SUCCESS\">\n                <span @validated (@validated.done)=\"this.loadingStateChange(this.buttonState.DEFAULT)\" class=\"spinner spinner-inline spinner-check\"></span>\n            </span>\n            <span *ngSwitchCase=\"buttonState.DEFAULT\" @defaultButton>\n                <ng-content></ng-content>\n            </span>\n        </ng-container>\n    ",
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
    return ClrLoadingButton;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_LOADING_BUTTON_DIRECTIVES = [ClrLoadingButton];
var ClrLoadingButtonModule = /** @class */ (function () {
    function ClrLoadingButtonModule() {
    }
    ClrLoadingButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_LOADING_BUTTON_DIRECTIVES],
            exports: [CLR_LOADING_BUTTON_DIRECTIVES],
        })
    ], ClrLoadingButtonModule);
    return ClrLoadingButtonModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButtonModule = /** @class */ (function () {
    function ClrButtonModule() {
    }
    ClrButtonModule = __decorate([
        NgModule({
            exports: [ClrLoadingButtonModule, ClrButtonGroupModule],
        })
    ], ClrButtonModule);
    return ClrButtonModule;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var EmptyAnchor = /** @class */ (function () {
    function EmptyAnchor() {
    }
    EmptyAnchor = __decorate([
        Component({
            template: ''
        })
    ], EmptyAnchor);
    return EmptyAnchor;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Internal module, please do not export!
 */
var ClrHostWrappingModule = /** @class */ (function () {
    function ClrHostWrappingModule() {
    }
    ClrHostWrappingModule = __decorate([
        NgModule({ declarations: [EmptyAnchor], exports: [EmptyAnchor], entryComponents: [EmptyAnchor] })
    ], ClrHostWrappingModule);
    return ClrHostWrappingModule;
}());

var counter = 0;
var ControlIdService = /** @class */ (function () {
    function ControlIdService() {
        this._id = 'clr-form-control-' + ++counter;
        this._idChange = new BehaviorSubject(this._id);
    }
    Object.defineProperty(ControlIdService.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._idChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlIdService.prototype, "idChange", {
        get: function () {
            return this._idChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ControlIdService = __decorate([
        Injectable()
    ], ControlIdService);
    return ControlIdService;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrControlError = /** @class */ (function () {
    function ClrControlError(controlIdService) {
        this.controlIdService = controlIdService;
    }
    ClrControlError = __decorate([
        Component({
            selector: 'clr-control-error',
            template: "\n    <ng-content></ng-content>\n    ",
            host: {
                '[class.clr-subtext]': 'true',
                '[attr.aria-live]': '"polite"',
                '[id]': 'controlIdService?.id + "-error"',
            }
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [ControlIdService])
    ], ClrControlError);
    return ClrControlError;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrControlHelper = /** @class */ (function () {
    function ClrControlHelper(controlIdService) {
        this.controlIdService = controlIdService;
    }
    ClrControlHelper = __decorate([
        Component({
            selector: 'clr-control-helper',
            template: "\n    <ng-content></ng-content>\n    ",
            host: {
                '[class.clr-subtext]': 'true',
                '[id]': 'controlIdService?.id + "-helper"',
            }
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [ControlIdService])
    ], ClrControlHelper);
    return ClrControlHelper;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NgControlService = /** @class */ (function () {
    function NgControlService() {
        // Observable to subscribe to the control, since its not available immediately for projected content
        this._controlChanges = new Subject();
    }
    Object.defineProperty(NgControlService.prototype, "controlChanges", {
        get: function () {
            return this._controlChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgControlService.prototype.setControl = function (control) {
        this._controlChanges.next(control);
    };
    NgControlService = __decorate([
        Injectable()
    ], NgControlService);
    return NgControlService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var IfErrorService = /** @class */ (function () {
    function IfErrorService(ngControlService) {
        var _this = this;
        this.ngControlService = ngControlService;
        // Implement our own status changes observable, since Angular controls don't
        // fire on events like blur, and we want to return the boolean state instead of a string
        this._statusChanges = new Subject();
        this.subscriptions = [];
        // Wait for the control to be available
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            if (control) {
                _this.control = control;
                _this.listenForChanges();
            }
        }));
    }
    Object.defineProperty(IfErrorService.prototype, "statusChanges", {
        get: function () {
            return this._statusChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Subscribe to the status change events, only after touched and emit the control
    IfErrorService.prototype.listenForChanges = function () {
        var _this = this;
        this.subscriptions.push(this.control.statusChanges.subscribe(function () {
            _this.sendValidity();
        }));
    };
    IfErrorService.prototype.sendValidity = function () {
        if (this.control.touched && this.control.invalid) {
            this._statusChanges.next(true);
        }
        else {
            this._statusChanges.next(false);
        }
    };
    // Allows a control to push a status check upstream, such as on blur
    IfErrorService.prototype.triggerStatusChange = function () {
        if (this.control) {
            this.sendValidity();
        }
    };
    // Clean up subscriptions
    IfErrorService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    IfErrorService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NgControlService])
    ], IfErrorService);
    return IfErrorService;
}());

var ClrIfError = /** @class */ (function () {
    function ClrIfError(ifErrorService, ngControlService, template, container) {
        var _this = this;
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
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            // If there is a specific error to track, check it, otherwise check overall validity
            if (_this.error && _this.control) {
                _this.displayError(_this.control.hasError(_this.error));
            }
            else {
                _this.displayError(invalid);
            }
        }));
    }
    ClrIfError.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrIfError.prototype.displayError = function (invalid) {
        if (invalid && !this.displayed) {
            this.container.createEmbeddedView(this.template);
            this.displayed = true;
        }
        else if (!invalid) {
            this.container.clear();
            this.displayed = false;
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
    return ClrIfError;
}());

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
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this.layout = Layouts.HORIZONTAL;
        // This is basically a replacement for Object.values(), which IE11 and Node <9 don't support :(
        // String enums cannot be reverse-mapped, meaning Layouts['COMPACT'] does not return 'compact' so
        // this exists to deal with this little caveat to get the list of the values as an array.
        this.layoutValues = Object.keys(Layouts).map(function (key) { return Layouts[key]; });
    }
    LayoutService.prototype.isVertical = function () {
        return this.layout === Layouts.VERTICAL;
    };
    LayoutService.prototype.isHorizontal = function () {
        return this.layout === Layouts.HORIZONTAL;
    };
    LayoutService.prototype.isCompact = function () {
        return this.layout === Layouts.COMPACT;
    };
    Object.defineProperty(LayoutService.prototype, "layoutClass", {
        get: function () {
            return "clr-form-" + this.layout;
        },
        enumerable: true,
        configurable: true
    });
    LayoutService.prototype.isValid = function (layout) {
        return this.layoutValues.indexOf(layout) > -1;
    };
    LayoutService = __decorate([
        Injectable()
    ], LayoutService);
    return LayoutService;
}());

var ClrLabel = /** @class */ (function () {
    function ClrLabel(controlIdService, layoutService, ngControlService, renderer, el) {
        this.controlIdService = controlIdService;
        this.layoutService = layoutService;
        this.ngControlService = ngControlService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.enableGrid = true;
    }
    ClrLabel.prototype.ngOnInit = function () {
        var _this = this;
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
            this.subscriptions.push(this.controlIdService.idChange.subscribe(function (id) { return (_this.forAttr = id); }));
        }
    };
    ClrLabel.prototype.disableGrid = function () {
        this.enableGrid = false;
    };
    ClrLabel.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrLabel;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var MarkControlService = /** @class */ (function () {
    function MarkControlService() {
        this._touched = new Subject();
    }
    Object.defineProperty(MarkControlService.prototype, "touchedChange", {
        get: function () {
            return this._touched.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    MarkControlService.prototype.markAsTouched = function () {
        this._touched.next();
    };
    MarkControlService = __decorate([
        Injectable()
    ], MarkControlService);
    return MarkControlService;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrForm = /** @class */ (function () {
    function ClrForm(layoutService, markControlService) {
        this.layoutService = layoutService;
        this.markControlService = markControlService;
    }
    /** @deprecated since 2.0 */
    ClrForm.prototype.markAsDirty = function () {
        this.markAsTouched();
    };
    ClrForm.prototype.markAsTouched = function () {
        this.markControlService.markAsTouched();
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
    return ClrForm;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLayout = /** @class */ (function () {
    function ClrLayout(layoutService) {
        this.layoutService = layoutService;
    }
    ClrLayout.prototype.ngOnInit = function () {
        // Only set the layout if it is a valid option
        if (this.layout && this.layoutService.isValid(this.layout)) {
            this.layoutService.layout = this.layout;
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
    return ClrLayout;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCommonFormsModule = /** @class */ (function () {
    function ClrCommonFormsModule() {
    }
    ClrCommonFormsModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
            exports: [ClrLabel, ClrControlError, ClrControlHelper, ClrIfError, ClrForm, ClrLayout],
        })
    ], ClrCommonFormsModule);
    return ClrCommonFormsModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var IS_TOGGLE = new InjectionToken('IS_TOGGLE');
function isToggleFactory() {
    return new BehaviorSubject(false);
}
var IS_TOGGLE_PROVIDER = { provide: IS_TOGGLE, useFactory: isToggleFactory };
var ClrCheckboxWrapper = /** @class */ (function () {
    function ClrCheckboxWrapper(toggleService) {
        var _this = this;
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
        this.toggle = false;
        this.subscriptions = [];
        this.subscriptions.push(toggleService.subscribe(function (state) {
            _this.toggle = state;
        }));
    }
    ClrCheckboxWrapper.prototype.ngOnInit = function () {
        if (this.label) {
            this.label.disableGrid();
        }
    };
    ClrCheckboxWrapper.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        ContentChild(ClrLabel, { static: true }),
        __metadata("design:type", ClrLabel)
    ], ClrCheckboxWrapper.prototype, "label", void 0);
    ClrCheckboxWrapper = __decorate([
        Component({
            selector: 'clr-checkbox-wrapper,clr-toggle-wrapper',
            template: "\n    <ng-content select=\"[clrCheckbox],[clrToggle]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
            host: {
                '[class.clr-checkbox-wrapper]': '!toggle',
                '[class.clr-toggle-wrapper]': 'toggle',
            },
            providers: [ControlIdService, IS_TOGGLE_PROVIDER]
        }),
        __param(0, Inject(IS_TOGGLE)),
        __metadata("design:paramtypes", [BehaviorSubject])
    ], ClrCheckboxWrapper);
    return ClrCheckboxWrapper;
}());

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
var HostWrapper = /** @class */ (function () {
    function HostWrapper(containerType, vcr, index) {
        if (index === void 0) { index = 0; }
        this.injector = vcr.injector;
        // If the host is already wrapped, we don't do anything
        if (!this.injector.get(containerType, null)) {
            var cfr = this.injector.get(ComponentFactoryResolver);
            var el = this.injector.get(ElementRef);
            // We need a new anchor, since we're projecting the current one.
            vcr.createComponent(cfr.resolveComponentFactory(EmptyAnchor));
            var factory = cfr.resolveComponentFactory(containerType);
            // Craft the element array based on what slot to use. Angular only uses the index to determine
            // which ng-content to project into, so if you have more than one ng-content you'll need to set
            // the index in the constructor appropriately
            var element = [];
            element[index] = [el.nativeElement];
            // We're assuming only one projection slot, but in more complex cases we might want to provide
            // a different array of projected elements.
            var containerRef = vcr.createComponent(factory, undefined, undefined, element);
            // We can now remove the useless anchor
            vcr.remove(0);
            // We note that the container was dynamically created
            containerRef.instance._dynamic = true;
            // We keep the wrapper's injector to access the dependencies that weren't available before.
            this.injector = containerRef.injector;
        }
    }
    HostWrapper.prototype.get = function (token, notFoundValue) {
        return this.injector.get(token, notFoundValue);
    };
    return HostWrapper;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ControlClassService = /** @class */ (function () {
    function ControlClassService() {
        this.className = '';
    }
    ControlClassService.prototype.controlClass = function (invalid, grid, additional) {
        if (invalid === void 0) { invalid = false; }
        if (grid === void 0) { grid = false; }
        if (additional === void 0) { additional = ''; }
        var controlClasses = [this.className, additional];
        if (invalid) {
            controlClasses.push('clr-error');
        }
        if (grid && this.className.indexOf('clr-col') === -1) {
            controlClasses.push('clr-col-md-10 clr-col-12');
        }
        return controlClasses.join(' ').trim();
    };
    // We want to remove the column classes from the input up to the container
    ControlClassService.prototype.initControlClass = function (renderer, element) {
        if (element && element.className) {
            this.className = element.className;
            var klasses = element.className.split(' ');
            klasses.forEach(function (klass) {
                if (klass.startsWith('clr-col')) {
                    renderer.removeClass(element, klass);
                }
            });
        }
    };
    ControlClassService = __decorate([
        Injectable()
    ], ControlClassService);
    return ControlClassService;
}());

var WrappedFormControl = /** @class */ (function () {
    // I lost way too much time trying to make this work without injecting the ViewContainerRef and the Injector,
    // I'm giving up. So we have to inject these two manually for now.
    function WrappedFormControl(vcr, wrapperType, injector, ngControl, renderer, el) {
        var _this = this;
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
            this.subscriptions.push(this.markControlService.touchedChange.subscribe(function () {
                _this.ngControl.control.markAsTouched();
                _this.ngControl.control.updateValueAndValidity();
            }));
        }
    }
    Object.defineProperty(WrappedFormControl.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            if (this.controlIdService) {
                this.controlIdService.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    WrappedFormControl.prototype.triggerValidation = function () {
        if (this.ifErrorService) {
            this.ifErrorService.triggerStatusChange();
        }
    };
    // @TODO This method has a try/catch due to an unknown issue that came when building the clrToggle feature
    // We need to figure out why this fails for the ClrToggle scenario but works for Date picker...
    // To see the error, remove the try/catch here and run the ClrToggle suite to see issues getting the container
    // injector in time, and this ONLY HAPPENS in tests and not in dev/prod mode.
    WrappedFormControl.prototype.getProviderFromContainer = function (token, notFoundValue) {
        try {
            return this._containerInjector.get(token, notFoundValue);
        }
        catch (e) {
            return notFoundValue;
        }
    };
    WrappedFormControl.prototype.ngOnInit = function () {
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
    };
    WrappedFormControl.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    WrappedFormControl.prototype.listenForErrorStateChanges = function () {
        var _this = this;
        if (this.ifErrorService) {
            this.subscriptions.push(this.ifErrorService.statusChanges
                .pipe(startWith(false), filter(function () { return _this.renderer && !!_this.el; }), distinctUntilChanged())
                .subscribe(function (error) { return _this.setAriaDescribedBy(error); }));
        }
    };
    WrappedFormControl.prototype.setAriaDescribedBy = function (error) {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.getAriaDescribedById(error));
    };
    WrappedFormControl.prototype.getAriaDescribedById = function (error) {
        return this.controlIdService.id.concat(error ? '-error' : '-helper');
    };
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
    return WrappedFormControl;
}());

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
var ClrCheckbox = /** @class */ (function (_super) {
    __extends(ClrCheckbox, _super);
    function ClrCheckbox(vcr, injector, control, renderer, el, toggle) {
        var _this = _super.call(this, vcr, ClrCheckboxWrapper, injector, control, renderer, el) || this;
        _this.toggle = toggle;
        return _this;
    }
    ClrCheckbox.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var toggleService = this.getProviderFromContainer(IS_TOGGLE, null);
        if (toggleService && this.toggle !== null) {
            toggleService.next(true);
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
    return ClrCheckbox;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCheckboxContainer = /** @class */ (function () {
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
    function ClrCheckboxContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrCheckboxContainer.prototype, "clrInline", {
        get: function () {
            return this.inline;
        },
        // private formGroup: AbstractControl;
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrCheckboxContainer.prototype.ngOnInit = function () {
        var _this = this;
        // @TODO put a solution in for form group validation
        // if (!this.formGroup) {
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
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
    };
    ClrCheckboxContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    ClrCheckboxContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrCheckboxContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
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
            template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-checkbox-wrapper,clr-toggle-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n  ",
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
    return ClrCheckboxContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCheckboxModule = /** @class */ (function () {
    function ClrCheckboxModule() {
    }
    ClrCheckboxModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrCommonFormsModule, ClrHostWrappingModule],
            declarations: [ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
            exports: [ClrCommonFormsModule, ClrCheckbox, ClrCheckboxContainer, ClrCheckboxWrapper],
            entryComponents: [ClrCheckboxWrapper],
        })
    ], ClrCheckboxModule);
    return ClrCheckboxModule;
}());

var activeCounter = 0;
var IF_ACTIVE_ID = new InjectionToken('IF_ACTIVE_ID');
function tokenFactory() {
    return ++activeCounter;
}
var IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory,
};
var IfActiveService = /** @class */ (function () {
    function IfActiveService() {
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
    Object.defineProperty(IfActiveService.prototype, "currentChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _current Subject.
         *
         */
        get: function () {
            return this._currentChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfActiveService.prototype, "current", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfActive instance.
         * @returns
         */
        get: function () {
            return this._current;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _current for this instance of IfActive structural directive.
         * And, broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: function (value) {
            if (this._current !== value) {
                this._current = value;
                this._currentChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    return IfActiveService;
}());

var ClrIfActive = /** @class */ (function () {
    function ClrIfActive(ifActiveService, id, template, container) {
        var _this = this;
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
        this.subscription = this.ifActiveService.currentChange.subscribe(function (newCurrentId) {
            _this.checkAndUpdateView(newCurrentId);
        });
    }
    ClrIfActive.prototype.checkAndUpdateView = function (currentId) {
        var isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    };
    Object.defineProperty(ClrIfActive.prototype, "active", {
        /********
         *
         * @description
         * A getter that returns the current IfActiveService.active value.
         */
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        /*********
         *
         * @description
         * A setter that updates IfActiveService.active with value.
         *
         * @param value
         */
        set: function (value) {
            if (value) {
                this.ifActiveService.current = this.id;
            }
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    ClrIfActive.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    ClrIfActive.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
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
    return ClrIfActive;
}());

var IfOpenService = /** @class */ (function () {
    function IfOpenService() {
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
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        /*********
         *
         * @description
         * A getter function that provides an observable for the _opened Subject.
         *
         */
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        /*********
         *
         * @description
         * A getter that returns the current value of this IfOpen instance.
         *
         */
        get: function () {
            return this._open;
        },
        /*********
         *
         * @description
         * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
         * broadcasts the new value to all subscribers.
         *
         * @param value
         */
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfOpenService.prototype.toggleWithEvent = function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    Object.defineProperty(IfOpenService.prototype, "ignoredElementChange", {
        get: function () {
            return this._ignoredElementChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    IfOpenService.prototype.registerIgnoredElement = function (element) {
        this._ignoredElementChange.next(element);
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
    return IfOpenService;
}());

var ClrIfOpen = /** @class */ (function () {
    function ClrIfOpen(ifOpenService, template, container) {
        var _this = this;
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
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            _this.updateView(change);
            _this.openChange.emit(change);
        });
    }
    Object.defineProperty(ClrIfOpen.prototype, "open", {
        /********
         *
         * @description
         * A getter that returns the current IfOpenService.open value.
         *
         */
        get: function () {
            return this.ifOpenService.open;
        },
        /*********
         *
         * @description
         * A setter that updates IfOpenService.open with value.
         *
         * @param value
         */
        set: function (value) {
            this.ifOpenService.open = value;
        },
        enumerable: true,
        configurable: true
    });
    /*********
     *
     * @description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param value
     */
    ClrIfOpen.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    ClrIfOpen.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
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
    return ClrIfOpen;
}());

var IfExpandService = /** @class */ (function () {
    function IfExpandService() {
        this.expandable = 0;
        this._loading = false;
        this._expanded = false;
        this._expandChange = new Subject();
    }
    Object.defineProperty(IfExpandService.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            value = !!value;
            if (value !== this._loading) {
                this._loading = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfExpandService.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            value = !!value;
            if (value !== this._expanded) {
                this._expanded = value;
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    IfExpandService.prototype.toggle = function () {
        this.expanded = !this._expanded;
    };
    Object.defineProperty(IfExpandService.prototype, "expandChange", {
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    IfExpandService.prototype.loadingStateChange = function (state) {
        switch (state) {
            case ClrLoadingState.LOADING:
                this.loading = true;
                break;
            default:
                this.loading = false;
                break;
        }
    };
    IfExpandService = __decorate([
        Injectable()
    ], IfExpandService);
    return IfExpandService;
}());

var ClrIfExpanded = /** @class */ (function () {
    function ClrIfExpanded(template, container, el, renderer, expand) {
        var _this = this;
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
        this._subscriptions.push(expand.expandChange.subscribe(function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        }));
    }
    Object.defineProperty(ClrIfExpanded.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            if (typeof value === 'boolean') {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrIfExpanded.prototype.updateView = function () {
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
    };
    ClrIfExpanded.prototype.ngOnInit = function () {
        this.updateView();
    };
    ClrIfExpanded.prototype.ngOnDestroy = function () {
        this.expand.expandable--;
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrIfExpanded;
}());

var CONDITIONAL_DIRECTIVES = [ClrIfActive, ClrIfOpen, ClrIfExpanded];

var ClrConditionalModule = /** @class */ (function () {
    function ClrConditionalModule() {
    }
    ClrConditionalModule = __decorate([
        NgModule({ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] })
    ], ClrConditionalModule);
    return ClrConditionalModule;
}());

var FocusTrapTracker = /** @class */ (function () {
    function FocusTrapTracker() {
        this._previousFocusTraps = [];
    }
    Object.defineProperty(FocusTrapTracker.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this._previousFocusTraps.push(this._current);
            this._current = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTrapTracker.prototype, "nbFocusTrappers", {
        get: function () {
            return this._previousFocusTraps.length;
        },
        enumerable: true,
        configurable: true
    });
    FocusTrapTracker.prototype.activatePreviousTrapper = function () {
        this._current = this._previousFocusTraps.pop();
    };
    FocusTrapTracker.ngInjectableDef = ɵɵdefineInjectable({ factory: function FocusTrapTracker_Factory() { return new FocusTrapTracker(); }, token: FocusTrapTracker, providedIn: "root" });
    FocusTrapTracker = __decorate([
        Injectable({ providedIn: 'root' })
    ], FocusTrapTracker);
    return FocusTrapTracker;
}());

var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(el, injector, focusTrapsTracker, renderer, platformId) {
        this.el = el;
        this.injector = injector;
        this.focusTrapsTracker = focusTrapsTracker;
        this.renderer = renderer;
        this.platformId = platformId;
        this.document = this.injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }
    FocusTrapDirective.prototype.onFocusIn = function (event) {
        var nativeElement = this.el.nativeElement;
        if (this.focusTrapsTracker.current === this && event.target && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    FocusTrapDirective.prototype.createFocusableOffScreenEl = function () {
        // Not using Renderer2's createElement method because that leads to DOM leakage.
        // https://github.com/angular/angular/issues/26954
        var offScreenSpan = this.document.createElement('span');
        this.renderer.setAttribute(offScreenSpan, 'tabindex', '0');
        this.renderer.addClass(offScreenSpan, 'offscreen-focus-rebounder');
        return offScreenSpan;
    };
    FocusTrapDirective.prototype.addReboundEls = function () {
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
    };
    FocusTrapDirective.prototype.removeReboundEls = function () {
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
    };
    FocusTrapDirective.prototype.setPreviousFocus = function () {
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    };
    FocusTrapDirective.prototype.ngAfterViewInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.previousActiveElement = this.document.activeElement;
        }
        this.addReboundEls();
    };
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.removeReboundEls();
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
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
    return FocusTrapDirective;
}());

var FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

var ClrFocusTrapModule = /** @class */ (function () {
    function ClrFocusTrapModule() {
    }
    ClrFocusTrapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [FOCUS_TRAP_DIRECTIVES],
            exports: [FOCUS_TRAP_DIRECTIVES],
        })
    ], ClrFocusTrapModule);
    return ClrFocusTrapModule;
}());

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This is the en-001 short locale date format. Setting as default.
 */
var DEFAULT_LOCALE_FORMAT = 'dd/MM/y';
// https://en.wikipedia.org/wiki/Date_format_by_country
var LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
var MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;
// No need for BIG_ENDIAN_REGEX because anything that doesn't satisfy the above 2
// is automatically BIG_ENDIAN
var DELIMITER_REGEX = /d+|m+|y+/i;
var USER_INPUT_REGEX = /\d+/g;
var MOBILE_USERAGENT_REGEX = /Mobi/i;
var RTL_REGEX = /\u200f/g;
var YEAR = 'YYYY';
var MONTH = 'MM';
var DATE = 'DD';
var LITTLE_ENDIAN = {
    name: 'LITTLE_ENDIAN',
    format: [DATE, MONTH, YEAR],
};
var MIDDLE_ENDIAN = {
    name: 'MIDDLE_ENDIAN',
    format: [MONTH, DATE, YEAR],
};
var BIG_ENDIAN = {
    name: 'BIG_ENDIAN',
    format: [YEAR, MONTH, DATE],
};
var NO_OF_DAYS_IN_A_WEEK = 7;
var NO_OF_ROWS_IN_CALENDAR_VIEW = 6;
var TOTAL_DAYS_IN_DAYS_VIEW = NO_OF_DAYS_IN_A_WEEK * NO_OF_ROWS_IN_CALENDAR_VIEW;

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
    var currYear = new Date().getFullYear();
    var century = Math.floor(currYear / 100) * 100;
    var result = year + century;
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
var DayViewModel = /** @class */ (function () {
    function DayViewModel(dayModel, isTodaysDate, isDisabled, isSelected, isFocusable) {
        if (isTodaysDate === void 0) { isTodaysDate = false; }
        if (isDisabled === void 0) { isDisabled = false; }
        if (isSelected === void 0) { isSelected = false; }
        if (isFocusable === void 0) { isFocusable = false; }
        this.dayModel = dayModel;
        this.isTodaysDate = isTodaysDate;
        this.isDisabled = isDisabled;
        this.isSelected = isSelected;
        this.isFocusable = isFocusable;
    }
    Object.defineProperty(DayViewModel.prototype, "tabIndex", {
        /**
         * Gets the tab index based on the isFocusable flag.
         */
        get: function () {
            return this.isFocusable ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    return DayViewModel;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DayModel = /** @class */ (function () {
    function DayModel(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
    }
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    DayModel.prototype.isEqual = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month && this.date === day.date;
        }
        return false;
    };
    DayModel.prototype.toDate = function () {
        return new Date(this.year, this.month, this.date);
    };
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    DayModel.prototype.incrementBy = function (value) {
        // Creating new Javascript Date object to increment because
        // it will automatically take care of switching to next or previous
        // months & years without we having to worry about it.
        var date = new Date(this.year, this.month, this.date + value);
        return new DayModel(date.getFullYear(), date.getMonth(), date.getDate());
    };
    /**
     * Clones the current day model.
     */
    DayModel.prototype.clone = function () {
        return new DayModel(this.year, this.month, this.date);
    };
    DayModel.prototype.toDateString = function () {
        return this.toDate().toLocaleDateString();
    };
    return DayModel;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CalendarViewModel = /** @class */ (function () {
    function CalendarViewModel(calendar, selectedDay, focusableDay, today, firstDayOfWeek) {
        this.calendar = calendar;
        this.selectedDay = selectedDay;
        this.focusableDay = focusableDay;
        this.today = today;
        this.firstDayOfWeek = firstDayOfWeek;
        this.currMonthDayViews = [];
        this.initializeCalendarView();
    }
    Object.defineProperty(CalendarViewModel.prototype, "calendarView", {
        /**
         * DayViewModel matrix. Size 6x7
         */
        get: function () {
            return this._calendarView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a 6x7 matrix of DayViewModel based on the Calendar.
     * The 6x7 matrix is structured according to the first day of the week.
     * 6 rows to accommodate months which might have dates spanning over 6 weeks.
     * 7 columns because there are 7 days in a week :P :D
     */
    CalendarViewModel.prototype.initializeCalendarView = function () {
        // Generate prev and next month calendar models.
        var prevMonthCalendar = this.calendar.previousMonth();
        var nextMonthCalendar = this.calendar.nextMonth();
        // Get no of days from prev and next months.
        var daysFromPrevMonthInCalView = this.numDaysFromPrevMonthInCalView(this.calendar.year, this.calendar.month);
        var daysFromNextMonthInCalView = TOTAL_DAYS_IN_DAYS_VIEW - (this.calendar.days.length + daysFromPrevMonthInCalView);
        // Generate prev, curr and next day view models
        var prevMonthDayViews = [];
        var nextMonthDayViews = [];
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
    };
    /**
     * Generates a DayViewModel array based on the DayModel passed
     */
    CalendarViewModel.prototype.generateDayViewModels = function (days, isDisabled, isCurrentCalendar) {
        var dayViews = days.map(function (day) {
            return new DayViewModel(day, false, isDisabled, false, false);
        });
        if (isCurrentCalendar && this.calendar.isDayInCalendar(this.today)) {
            dayViews[this.today.date - 1].isTodaysDate = true;
        }
        return dayViews;
    };
    /**
     * Gets the first day of the current month to figure out how many dates of previous month
     * are needed to complete the Calendar View based on the first day of the week.
     * eg: Assuming locale en-US, the first day of the week is Sunday,
     * if first day of the current month lands on Wednesday, then
     * (this.getDay function would return 3 since
     * first day of the week is 0), we need the 3 days from the previous month.
     */
    CalendarViewModel.prototype.numDaysFromPrevMonthInCalView = function (currentYear, currentMonth) {
        var firstDayOfCurrMonth = getDay(currentYear, currentMonth, 1);
        if (firstDayOfCurrMonth >= this.firstDayOfWeek) {
            return firstDayOfCurrMonth - this.firstDayOfWeek;
        }
        else {
            return NO_OF_DAYS_IN_A_WEEK + firstDayOfCurrMonth - this.firstDayOfWeek;
        }
    };
    /**
     * Checks if the Day passed is in the CalendarView.
     */
    CalendarViewModel.prototype.isDayInCalendarView = function (day) {
        if (!this.calendar.isDayInCalendar(day)) {
            return false;
        }
        return true;
    };
    /**
     * Using the DayViewModels from the previous, current and next month, this function
     * generates the CalendarView.
     */
    CalendarViewModel.prototype.generateCalendarView = function (prev, curr, next) {
        var combinationArr = __spread(prev, curr, next);
        var calendarView = [];
        for (var i = 0; i < NO_OF_ROWS_IN_CALENDAR_VIEW; i++) {
            calendarView[i] = combinationArr.slice(i * NO_OF_DAYS_IN_A_WEEK, (i + 1) * NO_OF_DAYS_IN_A_WEEK);
        }
        return calendarView;
    };
    /**
     * Initialize the selected day if the day is in the calendar.
     */
    CalendarViewModel.prototype.initializeSelectedDay = function () {
        if (this.selectedDay && this.isDayInCalendarView(this.selectedDay)) {
            this.currMonthDayViews[this.selectedDay.date - 1].isSelected = true;
        }
    };
    /**
     * Initializes the focusable day if the day is in the calendar. If focusable day is not set, then
     * we check for the selected day. If selected day is not set then check if today is in the current
     * calendar. If not then just set the 15th of the current calendar month.
     */
    CalendarViewModel.prototype.initializeFocusableDay = function () {
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
    };
    CalendarViewModel.prototype.setFocusableFlag = function (day, flag) {
        if (day) {
            this.currMonthDayViews[day.date - 1].isFocusable = flag;
        }
    };
    /**
     * Updates the focusable day in the calendar.
     */
    CalendarViewModel.prototype.updateFocusableDay = function (day) {
        this.setFocusableFlag(this.focusableDay, false);
        this.setFocusableFlag(day, true);
        this.focusableDay = day;
    };
    return CalendarViewModel;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CalendarModel = /** @class */ (function () {
    function CalendarModel(year, month) {
        this.year = year;
        this.month = month;
        this.initializeDaysInCalendar();
    }
    /**
     * Populates the days array with the DayModels in the current Calendar.
     */
    CalendarModel.prototype.initializeDaysInCalendar = function () {
        var _this = this;
        var noOfDaysInCalendar = getNumberOfDaysInTheMonth(this.year, this.month);
        this.days = Array(noOfDaysInCalendar)
            .fill(null)
            .map(function (date, index) {
            return new DayModel(_this.year, _this.month, index + 1);
        });
    };
    /**
     * Checks if the calendar passed is equal to the current calendar.
     */
    CalendarModel.prototype.isEqual = function (calendar) {
        if (calendar) {
            return this.year === calendar.year && this.month === calendar.month;
        }
        return false;
    };
    /**
     * Checks if a DayModel is in the Calendar
     */
    CalendarModel.prototype.isDayInCalendar = function (day) {
        if (day) {
            return this.year === day.year && this.month === day.month;
        }
        return false;
    };
    /**
     * Returns CalendarModel of the previous month.
     */
    CalendarModel.prototype.previousMonth = function () {
        if (this.month === 0) {
            return new CalendarModel(this.year - 1, 11);
        }
        else {
            return new CalendarModel(this.year, this.month - 1);
        }
    };
    /**
     * Returns CalendarModel of the next month.
     */
    CalendarModel.prototype.nextMonth = function () {
        if (this.month === 11) {
            return new CalendarModel(this.year + 1, 0);
        }
        else {
            return new CalendarModel(this.year, this.month + 1);
        }
    };
    return CalendarModel;
}());

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
var DateNavigationService = /** @class */ (function () {
    function DateNavigationService() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendar", {
        get: function () {
            return this._displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    // not a setter because i want this to remain private
    DateNavigationService.prototype.setDisplayedCalendar = function (value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    };
    DateNavigationService.prototype.initializeTodaysDate = function () {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    };
    Object.defineProperty(DateNavigationService.prototype, "today", {
        get: function () {
            return this._today;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "selectedDayChange", {
        get: function () {
            return this._selectedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    DateNavigationService.prototype.notifySelectedDayChanged = function (dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    };
    /**
     * Initializes the calendar based on the selected day.
     */
    DateNavigationService.prototype.initializeCalendar = function () {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    };
    DateNavigationService.prototype.changeMonth = function (month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    };
    DateNavigationService.prototype.changeYear = function (year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    };
    /**
     * Moves the displayed calendar to the next month.
     */
    DateNavigationService.prototype.moveToNextMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    };
    /**
     * Moves the displayed calendar to the previous month.
     */
    DateNavigationService.prototype.moveToPreviousMonth = function () {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    };
    /**
     * Moves the displayed calendar to the current month and year.
     */
    DateNavigationService.prototype.moveToCurrentMonth = function () {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    };
    DateNavigationService.prototype.incrementFocusDay = function (value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(new CalendarModel(this.focusedDay.year, this.focusedDay.month));
        }
        this._focusOnCalendarChange.next();
    };
    Object.defineProperty(DateNavigationService.prototype, "displayedCalendarChange", {
        /**
         * This observable lets the subscriber know that the displayed calendar has changed.
         */
        get: function () {
            return this._displayedCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusOnCalendarChange", {
        /**
         * This observable lets the subscriber know that the focus should be applied on the calendar.
         */
        get: function () {
            return this._focusOnCalendarChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateNavigationService.prototype, "focusedDayChange", {
        /**
         * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
         */
        get: function () {
            return this._focusedDayChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateNavigationService = __decorate([
        Injectable()
    ], DateNavigationService);
    return DateNavigationService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service focuses the day that is focusable in the calendar.
 */
var DatepickerFocusService = /** @class */ (function () {
    function DatepickerFocusService(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this.platformId = platformId;
    }
    DatepickerFocusService.prototype.focusCell = function (elRef) {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this.ngZoneIsStableInBrowser().subscribe(function () {
                var focusEl = elRef.nativeElement.querySelector('[tabindex="0"]');
                if (focusEl) {
                    focusEl.focus();
                }
            });
        });
    };
    DatepickerFocusService.prototype.focusInput = function (element) {
        var _this = this;
        this._ngZone.runOutsideAngular(function () { return _this.ngZoneIsStableInBrowser().subscribe(function () { return element.focus(); }); });
    };
    DatepickerFocusService.prototype.elementIsFocused = function (element) {
        return isPlatformBrowser(this.platformId) && document.activeElement === element;
    };
    DatepickerFocusService.prototype.ngZoneIsStableInBrowser = function () {
        var _this = this;
        // Credit: Material: https://github.com/angular/material2/blob/master/src/lib/datepicker/calendar.ts
        return this._ngZone.onStable.asObservable().pipe(first(), filter(function () { return isPlatformBrowser(_this.platformId); }));
    };
    DatepickerFocusService = __decorate([
        Injectable(),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [NgZone, Object])
    ], DatepickerFocusService);
    return DatepickerFocusService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service extracts the Angular CLDR data needed by the datepicker.
 */
var LocaleHelperService = /** @class */ (function () {
    function LocaleHelperService(locale) {
        this.locale = locale;
        this._firstDayOfWeek = 0;
        this.initializeLocaleData();
    }
    Object.defineProperty(LocaleHelperService.prototype, "firstDayOfWeek", {
        get: function () {
            return this._firstDayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDaysNarrow", {
        get: function () {
            return this._localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsAbbreviated", {
        get: function () {
            return this._localeMonthsAbbreviated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeMonthsWide", {
        get: function () {
            return this._localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleHelperService.prototype, "localeDateFormat", {
        get: function () {
            return this._localeDateFormat;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the locale data.
     */
    LocaleHelperService.prototype.initializeLocaleData = function () {
        // Order in which these functions is called is very important.
        this.initializeFirstDayOfWeek();
        this.initializeLocaleDateFormat();
        this.initializeLocaleMonthsAbbreviated();
        this.initializeLocaleMonthsWide();
        this.initializeLocaleDaysNarrow();
    };
    /**
     * Initialize day names in the TranslationWidth.Narrow format based on the locale.
     * eg: [S, M, T...] for en-US.
     */
    LocaleHelperService.prototype.initializeLocaleDaysNarrow = function () {
        // Get locale day names starting with Sunday
        var tempArr = getLocaleDayNames(this.locale, FormStyle.Standalone, TranslationWidth.Narrow).slice();
        // Get first day of the week based on the locale
        var firstDayOfWeek = this.firstDayOfWeek;
        // Rearrange the tempArr to start with the first day of the week based on the locale.
        if (firstDayOfWeek > 0) {
            var prevDays = tempArr.splice(0, firstDayOfWeek);
            tempArr.push.apply(tempArr, __spread(prevDays));
        }
        this._localeDaysNarrow = tempArr;
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Abbreviated format.
     * e.g. `[Jan, Feb, ...]` for en-US
     */
    LocaleHelperService.prototype.initializeLocaleMonthsAbbreviated = function () {
        this._localeMonthsAbbreviated = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Abbreviated).slice();
    };
    /**
     * Initializes the array of month names in the TranslationWidth.Wide format.
     * e.g. `[January, February, ...]` for en-US
     */
    LocaleHelperService.prototype.initializeLocaleMonthsWide = function () {
        this._localeMonthsWide = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide).slice();
    };
    /**
     * Initializes the first day of the week based on the locale.
     */
    LocaleHelperService.prototype.initializeFirstDayOfWeek = function () {
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.locale);
    };
    LocaleHelperService.prototype.initializeLocaleDateFormat = function () {
        this._localeDateFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    };
    LocaleHelperService = __decorate([
        Injectable(),
        __param(0, Inject(LOCALE_ID)),
        __metadata("design:paramtypes", [String])
    ], LocaleHelperService);
    return LocaleHelperService;
}());

var ClrCalendar = /** @class */ (function () {
    function ClrCalendar(_localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._subs = [];
        this.generateCalendarView();
        this.initializeSubscriptions();
    }
    Object.defineProperty(ClrCalendar.prototype, "localeDaysNarrow", {
        /**
         * Gets the locale days according to the TranslationWidth.Narrow format.
         */
        get: function () {
            return this._localeHelperService.localeDaysNarrow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "calendar", {
        get: function () {
            return this._dateNavigationService.displayedCalendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "selectedDay", {
        get: function () {
            return this._dateNavigationService.selectedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "focusedDay", {
        get: function () {
            return this._dateNavigationService.focusedDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrCalendar.prototype, "today", {
        get: function () {
            return this._dateNavigationService.today;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize subscriptions to:
     * 1. update the calendar view model.
     * 2. update the focusable day in the calendar view model.
     * 3. focus on the focusable day in the calendar.
     */
    ClrCalendar.prototype.initializeSubscriptions = function () {
        var _this = this;
        this._subs.push(this._dateNavigationService.displayedCalendarChange.subscribe(function () {
            _this.generateCalendarView();
        }));
        this._subs.push(this._dateNavigationService.focusedDayChange.subscribe(function (focusedDay) {
            _this.calendarViewModel.updateFocusableDay(focusedDay);
        }));
        this._subs.push(this._dateNavigationService.focusOnCalendarChange.subscribe(function () {
            _this._datepickerFocusService.focusCell(_this._elRef);
        }));
    };
    /**
     * Generates the Calendar View based on the calendar retrieved from the DateNavigationService.
     */
    ClrCalendar.prototype.generateCalendarView = function () {
        this.calendarViewModel = new CalendarViewModel(this.calendar, this.selectedDay, this.focusedDay, this.today, this._localeHelperService.firstDayOfWeek);
    };
    /**
     * Delegates Keyboard arrow navigation to the DateNavigationService.
     */
    ClrCalendar.prototype.onKeyDown = function (event) {
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
    };
    /**
     * Focuses on the focusable day when the Calendar View is initialized.
     */
    ClrCalendar.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
    };
    /**
     * Unsubscribe from subscriptions.
     */
    ClrCalendar.prototype.ngOnDestroy = function () {
        this._subs.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrCalendar;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FocusService = /** @class */ (function () {
    function FocusService() {
        this._focused = new BehaviorSubject(false);
    }
    Object.defineProperty(FocusService.prototype, "focusChange", {
        get: function () {
            return this._focused.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusService.prototype, "focused", {
        set: function (state) {
            this._focused.next(state);
        },
        enumerable: true,
        configurable: true
    });
    FocusService = __decorate([
        Injectable()
    ], FocusService);
    return FocusService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DateFormControlService = /** @class */ (function () {
    function DateFormControlService() {
        this._touchedChange = new Subject();
        this._dirtyChange = new Subject();
    }
    Object.defineProperty(DateFormControlService.prototype, "touchedChange", {
        get: function () {
            return this._touchedChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFormControlService.prototype, "dirtyChange", {
        get: function () {
            return this._dirtyChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DateFormControlService.prototype.markAsTouched = function () {
        this._touchedChange.next();
    };
    DateFormControlService.prototype.markAsDirty = function () {
        this._dirtyChange.next();
    };
    DateFormControlService = __decorate([
        Injectable()
    ], DateFormControlService);
    return DateFormControlService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DateIOService = /** @class */ (function () {
    function DateIOService(_localeHelperService) {
        this._localeHelperService = _localeHelperService;
        this.cldrLocaleDateFormat = DEFAULT_LOCALE_FORMAT;
        this.localeDisplayFormat = LITTLE_ENDIAN;
        this.delimiters = ['/', '/'];
        this.cldrLocaleDateFormat = this._localeHelperService.localeDateFormat;
        this.initializeLocaleDisplayFormat();
    }
    DateIOService.prototype.initializeLocaleDisplayFormat = function () {
        var format = this.cldrLocaleDateFormat.toLocaleLowerCase();
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
    };
    DateIOService.prototype.extractDelimiters = function () {
        if (this.cldrLocaleDateFormat) {
            // Sanitize Date Format. Remove RTL characters.
            // FIXME: When we support RTL, remove this and handle it correctly.
            var localeFormat = this.cldrLocaleDateFormat.replace(RTL_REGEX, '');
            var delimiters = localeFormat.split(DELIMITER_REGEX);
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
    };
    DateIOService.prototype.toLocaleDisplayFormatString = function (date) {
        if (date) {
            if (isNaN(date.getTime())) {
                return '';
            }
            var dateNo = date.getDate();
            var monthNo = date.getMonth() + 1;
            var dateStr = dateNo > 9 ? dateNo.toString() : '0' + dateNo;
            var monthStr = monthNo > 9 ? monthNo.toString() : '0' + monthNo;
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
    };
    Object.defineProperty(DateIOService.prototype, "placeholderText", {
        get: function () {
            var format = this.localeDisplayFormat.format;
            return format[0] + this.delimiters[0] + format[1] + this.delimiters[1] + format[2];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the month entered by the user is valid or not.
     * Note: Month is 0 based.
     */
    DateIOService.prototype.isValidMonth = function (month) {
        return month > -1 && month < 12;
    };
    /**
     * Checks if the date is valid depending on the year and month provided.
     */
    DateIOService.prototype.isValidDate = function (year, month, date) {
        return date > 0 && date <= getNumberOfDaysInTheMonth(year, month);
    };
    /**
     * Validates the parameters provided and returns the date.
     * If the parameters are not
     * valid then return null.
     * NOTE: (Month here is 1 based since the user has provided that as an input)
     */
    DateIOService.prototype.validateAndGetDate = function (year, month, date) {
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
        var y = +year;
        var m = +month - 1; // month is 0 based
        var d = +date;
        if (!this.isValidMonth(m) || !this.isValidDate(y, m, d)) {
            return null;
        }
        var result = parseToFourDigitYear(y);
        return result !== -1 ? new Date(result, m, d) : null;
    };
    DateIOService.prototype.getDateValueFromDateString = function (date) {
        if (!date) {
            return null;
        }
        var dateParts = date.match(USER_INPUT_REGEX);
        if (!dateParts || dateParts.length !== 3) {
            return null;
        }
        var _a = __read(dateParts, 3), firstPart = _a[0], secondPart = _a[1], thirdPart = _a[2];
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
    };
    DateIOService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LocaleHelperService])
    ], DateIOService);
    return DateIOService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// iPad mini screen width
// http://stephen.io/mediaqueries/#iPadMini
var DATEPICKER_ENABLE_BREAKPOINT = 768;

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatepickerEnabledService = /** @class */ (function () {
    function DatepickerEnabledService(_document) {
        this._document = _document;
        this._isUserAgentMobile = false;
        if (this._document) {
            this._isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(_document.defaultView.navigator.userAgent);
            this._innerWidth = _document.defaultView.innerWidth;
        }
    }
    Object.defineProperty(DatepickerEnabledService.prototype, "isEnabled", {
        /**
         * Returns if the calendar should be active or not.
         * If the user agent is mobile and the screen width is less than DATEPICKER_ACTIVE_BREAKPOINT
         * then the calendar is inactive.
         */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    DatepickerEnabledService = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], DatepickerEnabledService);
    return DatepickerEnabledService;
}());

var ClrDateContainer = /** @class */ (function () {
    function ClrDateContainer(_ifOpenService, _dateNavigationService, _datepickerEnabledService, dateFormControlService, commonStrings, ifErrorService, focusService, controlClassService, layoutService, ngControlService) {
        var _this = this;
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
        this.subscriptions.push(this._ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.initializeCalendar();
            }
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrDateContainer.prototype, "actionButton", {
        set: function (button) {
            this.toggleButton = button;
        },
        enumerable: true,
        configurable: true
    });
    ClrDateContainer.prototype.close = function () {
        this.toggleButton.nativeElement.focus();
    };
    ClrDateContainer.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
    };
    /**
     * Returns the classes to apply to the control
     */
    ClrDateContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    /**
     * Determines if the control needs to add grid classes
     */
    ClrDateContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrDateContainer.prototype, "isEnabled", {
        /**
         * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
         */
        get: function () {
            return this._datepickerEnabledService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    ClrDateContainer.prototype.initializeCalendar = function () {
        this._dateNavigationService.initializeCalendar();
    };
    /**
     * Toggles the Datepicker Popover.
     */
    ClrDateContainer.prototype.toggleDatepicker = function (event) {
        this._ifOpenService.toggleWithEvent(event);
        this.dateFormControlService.markAsTouched();
    };
    /**
     * Unsubscribe from subscriptions.
     */
    ClrDateContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
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
            template: "\n      <ng-content select=\"label\"></ng-content>\n      <label *ngIf=\"!label && addGrid()\"></label>\n      <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n        <div class=\"clr-input-wrapper\">\n          <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n            <ng-content select=\"[clrDate]\"></ng-content>\n            <button #actionButton \n                    type=\"button\" \n                    class=\"clr-input-group-icon-action\"\n                    [attr.title]=\"commonStrings.keys.datepickerToggle\"\n                    [attr.aria-label]=\"commonStrings.keys.datepickerToggle\"\n                    [disabled]=\"control?.disabled\"\n                    (click)=\"toggleDatepicker($event)\"\n                    *ngIf=\"isEnabled\">\n              <clr-icon shape=\"calendar\"></clr-icon>\n            </button>\n            <clr-datepicker-view-manager *clrIfOpen clrFocusTrap></clr-datepicker-view-manager>\n          </div>\n          <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n        </div>\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    ",
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
    return ClrDateContainer;
}());

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
var ClrDateInput = /** @class */ (function (_super) {
    __extends(ClrDateInput, _super);
    function ClrDateInput(viewContainerRef, injector, el, renderer, control, container, dateIOService, dateNavigationService, datepickerEnabledService, dateFormControlService, platformId, focusService, datepickerFocusService) {
        var _this = _super.call(this, viewContainerRef, ClrDateContainer, injector, control, renderer, el) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.control = control;
        _this.container = container;
        _this.dateIOService = dateIOService;
        _this.dateNavigationService = dateNavigationService;
        _this.datepickerEnabledService = datepickerEnabledService;
        _this.dateFormControlService = dateFormControlService;
        _this.platformId = platformId;
        _this.focusService = focusService;
        _this.datepickerFocusService = datepickerFocusService;
        _this.dateChange = new EventEmitter(false);
        _this.index = 1;
        return _this;
    }
    Object.defineProperty(ClrDateInput.prototype, "date", {
        set: function (date) {
            if (this.previousDateChange !== date) {
                this.updateDate(this.getValidDateValueFromDate(date));
            }
            if (!this.initialClrDateInputValue) {
                this.initialClrDateInputValue = date;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.populateServicesFromContainerComponent();
        this.subscriptions.push(this.listenForUserSelectedDayChanges(), this.listenForControlValueChanges(), this.listenForTouchChanges(), this.listenForDirtyChanges(), this.listenForInputRefocus());
    };
    ClrDateInput.prototype.ngAfterViewInit = function () {
        // I don't know why I have to do this but after using the new HostWrapping Module I have to delay the processing
        // of the initial Input set by the user to here. If I do not 2 issues occur:
        // 1. The Input setter is called before ngOnInit. ngOnInit initializes the services without which the setter fails.
        // 2. The Renderer doesn't work before ngAfterViewInit (It used to before the new HostWrapping Module for some reason).
        // I need the renderer to set the value property on the input to make sure that if the user has supplied a Date
        // input object, we reflect it with the right date on the input field using the IO service. I am not sure if
        // these are major issues or not but just noting them down here.
        this.processInitialInputs();
    };
    ClrDateInput.prototype.setFocusStates = function () {
        this.setFocus(true);
    };
    ClrDateInput.prototype.triggerValidation = function () {
        _super.prototype.triggerValidation.call(this);
        this.setFocus(false);
    };
    Object.defineProperty(ClrDateInput.prototype, "placeholderText", {
        get: function () {
            return this.placeholder ? this.placeholder : this.dateIOService.placeholderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDateInput.prototype, "inputType", {
        get: function () {
            return isPlatformBrowser(this.platformId) && this.usingNativeDatepicker() ? 'date' : 'text';
        },
        enumerable: true,
        configurable: true
    });
    ClrDateInput.prototype.onValueChange = function (target) {
        var validDateValue = this.dateIOService.getDateValueFromDateString(target.value);
        if (this.usingClarityDatepicker() && validDateValue) {
            this.updateDate(validDateValue, true);
        }
        else if (this.usingNativeDatepicker()) {
            var _a = __read(target.value.split('-'), 3), year = _a[0], month = _a[1], day = _a[2];
            this.updateDate(new Date(+year, +month - 1, +day), true);
        }
        else {
            this.emitDateOutput(null);
        }
    };
    ClrDateInput.prototype.usingClarityDatepicker = function () {
        return this.datepickerEnabledService.isEnabled;
    };
    ClrDateInput.prototype.usingNativeDatepicker = function () {
        return !this.datepickerEnabledService.isEnabled;
    };
    ClrDateInput.prototype.setFocus = function (focus) {
        if (this.focusService) {
            this.focusService.focused = focus;
        }
    };
    ClrDateInput.prototype.populateServicesFromContainerComponent = function () {
        if (!this.container) {
            this.dateIOService = this.getProviderFromContainer(DateIOService);
            this.dateNavigationService = this.getProviderFromContainer(DateNavigationService);
            this.datepickerEnabledService = this.getProviderFromContainer(DatepickerEnabledService);
            this.dateFormControlService = this.getProviderFromContainer(DateFormControlService);
        }
    };
    ClrDateInput.prototype.processInitialInputs = function () {
        if (this.datepickerHasFormControl()) {
            this.updateDate(this.dateIOService.getDateValueFromDateString(this.control.value));
        }
        else {
            this.updateDate(this.initialClrDateInputValue);
        }
    };
    ClrDateInput.prototype.updateDate = function (value, setByUserInteraction) {
        if (setByUserInteraction === void 0) { setByUserInteraction = false; }
        var date = this.getValidDateValueFromDate(value);
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
    };
    ClrDateInput.prototype.updateInput = function (date) {
        if (date) {
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
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
    };
    ClrDateInput.prototype.getValidDateValueFromDate = function (date) {
        if (this.dateIOService) {
            var dateString = this.dateIOService.toLocaleDisplayFormatString(date);
            return this.dateIOService.getDateValueFromDateString(dateString);
        }
        else {
            return null;
        }
    };
    ClrDateInput.prototype.emitDateOutput = function (date) {
        if (!datesAreEqual(date, this.previousDateChange)) {
            this.dateChange.emit(date);
            this.previousDateChange = date;
        }
        else if (!date && this.previousDateChange) {
            this.dateChange.emit(null);
            this.previousDateChange = null;
        }
    };
    ClrDateInput.prototype.datepickerHasFormControl = function () {
        return !!this.control;
    };
    ClrDateInput.prototype.listenForControlValueChanges = function () {
        var _this = this;
        return of(this.datepickerHasFormControl())
            .pipe(filter(function (hasControl) { return hasControl; }), switchMap(function () { return _this.control.valueChanges; }), 
        // only update date value if not being set by user
        filter(function () { return !_this.datepickerFocusService.elementIsFocused(_this.el.nativeElement); }))
            .subscribe(function (value) { return _this.updateDate(_this.dateIOService.getDateValueFromDateString(value)); });
    };
    ClrDateInput.prototype.listenForUserSelectedDayChanges = function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange.subscribe(function (dayModel) { return _this.updateDate(dayModel.toDate(), true); });
    };
    ClrDateInput.prototype.listenForTouchChanges = function () {
        var _this = this;
        return this.dateFormControlService.touchedChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsTouched(); });
    };
    ClrDateInput.prototype.listenForDirtyChanges = function () {
        var _this = this;
        return this.dateFormControlService.dirtyChange
            .pipe(filter(function () { return _this.datepickerHasFormControl(); }))
            .subscribe(function () { return _this.control.control.markAsDirty(); });
    };
    ClrDateInput.prototype.listenForInputRefocus = function () {
        var _this = this;
        return this.dateNavigationService.selectedDayChange
            .pipe(filter(function (date) { return !!date; }))
            .subscribe(function (v) { return _this.datepickerFocusService.focusInput(_this.el.nativeElement); });
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
    return ClrDateInput;
}(WrappedFormControl));

// Literally any annotation would work here, but writing our own @HoneyBadger annotation feels overkill.
var AbstractPopover = /** @class */ (function () {
    function AbstractPopover(injector, parentHost) {
        var _this = this;
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
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            if (change) {
                _this.anchor();
                _this.attachESCListener();
            }
            else {
                _this.release();
                _this.detachESCListener();
            }
        });
        if (this.ifOpenService.open) {
            this.anchor();
            this.attachESCListener();
        }
    }
    AbstractPopover.prototype.anchor = function () {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    };
    AbstractPopover.prototype.release = function () {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    };
    AbstractPopover.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance
                .anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(function () {
                // if a scroll event is detected, close the popover
                _this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    };
    AbstractPopover.prototype.ngOnDestroy = function () {
        this.release();
        this.detachESCListener();
        this.subscription.unsubscribe();
    };
    Object.defineProperty(AbstractPopover.prototype, "isOffScreen", {
        /*
           * Fallback to hide when *clrIfOpen is not being used
           */
        get: function () {
            return this.ifOpenService.open ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    AbstractPopover.prototype.attachESCListener = function () {
        var _this = this;
        if (!this.popoverOptions.ignoreGlobalESCListener) {
            this.documentESCListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event && event.key) {
                    if (event.key === 'Escape' || event.key === 'Esc') {
                        _this.ifOpenService.open = false;
                    }
                }
            });
        }
    };
    AbstractPopover.prototype.detachESCListener = function () {
        if (this.documentESCListener) {
            this.documentESCListener();
            delete this.documentESCListener;
        }
    };
    AbstractPopover.prototype.attachOutsideClickListener = function () {
        var _this = this;
        if (this.closeOnOutsideClick) {
            this.hostClickListener = this.renderer.listen(this.el.nativeElement, 'click', function (event) { return (_this.ignore = event); });
            if (this.ignoredElement) {
                this.ignoredElementClickListener = this.renderer.listen(this.ignoredElement, 'click', function (event) { return (_this.ignore = event); });
            }
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (event === _this.ignore) {
                    delete _this.ignore;
                }
                else {
                    _this.ifOpenService.open = false;
                }
            });
        }
    };
    AbstractPopover.prototype.detachOutsideClickListener = function () {
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
    return AbstractPopover;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This service manages which view is visible in the datepicker popover.
 */
var ViewManagerService = /** @class */ (function () {
    function ViewManagerService() {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    }
    Object.defineProperty(ViewManagerService.prototype, "isDayView", {
        get: function () {
            return this._currentView === "DAYVIEW" /* DAYVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isYearView", {
        get: function () {
            return this._currentView === "YEARVIEW" /* YEARVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewManagerService.prototype, "isMonthView", {
        get: function () {
            return this._currentView === "MONTHVIEW" /* MONTHVIEW */;
        },
        enumerable: true,
        configurable: true
    });
    ViewManagerService.prototype.changeToMonthView = function () {
        this._currentView = "MONTHVIEW" /* MONTHVIEW */;
    };
    ViewManagerService.prototype.changeToYearView = function () {
        this._currentView = "YEARVIEW" /* YEARVIEW */;
    };
    ViewManagerService.prototype.changeToDayView = function () {
        this._currentView = "DAYVIEW" /* DAYVIEW */;
    };
    ViewManagerService = __decorate([
        Injectable()
    ], ViewManagerService);
    return ViewManagerService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDatepickerViewManager = /** @class */ (function (_super) {
    __extends(ClrDatepickerViewManager, _super);
    function ClrDatepickerViewManager(parent, _injector, _viewManagerService) {
        var _this = _super.call(this, _injector, parent) || this;
        _this._viewManagerService = _viewManagerService;
        _this.configurePopover();
        return _this;
    }
    /**
     * Configure Popover Direction and Close indicators
     */
    ClrDatepickerViewManager.prototype.configurePopover = function () {
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        this.closeOnOutsideClick = true;
    };
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isMonthView", {
        /**
         * Returns if the current view is the monthpicker.
         */
        get: function () {
            return this._viewManagerService.isMonthView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isYearView", {
        /**
         * Returns if the current view is the yearpicker.
         */
        get: function () {
            return this._viewManagerService.isYearView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatepickerViewManager.prototype, "isDayView", {
        /**
         * Returns if the current view is the daypicker.
         */
        get: function () {
            return this._viewManagerService.isDayView;
        },
        enumerable: true,
        configurable: true
    });
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
    return ClrDatepickerViewManager;
}(AbstractPopover));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDay = /** @class */ (function () {
    function ClrDay(_dateNavigationService, _ifOpenService, dateFormControlService) {
        this._dateNavigationService = _dateNavigationService;
        this._ifOpenService = _ifOpenService;
        this.dateFormControlService = dateFormControlService;
    }
    Object.defineProperty(ClrDay.prototype, "dayView", {
        get: function () {
            return this._dayView;
        },
        /**
         * DayViewModel input which is used to build the Day View.
         */
        set: function (day) {
            this._dayView = day;
            this.dayString = this._dayView.dayModel.toDateString();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the focusedDay in the DateNavigationService when the ClrDay is focused.
     */
    ClrDay.prototype.onDayViewFocus = function () {
        this._dateNavigationService.focusedDay = this.dayView.dayModel;
    };
    /**
     * Updates the selectedDay when the ClrDay is selected and closes the datepicker popover.
     */
    ClrDay.prototype.selectDay = function () {
        var day = this.dayView.dayModel;
        this._dateNavigationService.notifySelectedDayChanged(day);
        this.dateFormControlService.markAsDirty();
        this._ifOpenService.open = false;
    };
    __decorate([
        Input('clrDayView'),
        __metadata("design:type", DayViewModel),
        __metadata("design:paramtypes", [DayViewModel])
    ], ClrDay.prototype, "dayView", null);
    ClrDay = __decorate([
        Component({
            selector: 'clr-day',
            template: "\n        <button\n            class=\"day-btn\"\n            type=\"button\"\n            [class.is-today]=\"dayView.isTodaysDate\"\n            [class.is-disabled]=\"dayView.isDisabled\"\n            [class.is-selected]=\"dayView.isSelected\"\n            [attr.tabindex]=\"dayView.tabIndex\"\n            (click)=\"selectDay()\"\n            (focus)=\"onDayViewFocus()\"\n            [attr.aria-label]=\"dayString\">\n            {{dayView.dayModel.date}}\n        </button>\n    ",
            host: { '[class.day]': 'true' }
        }),
        __metadata("design:paramtypes", [DateNavigationService,
            IfOpenService,
            DateFormControlService])
    ], ClrDay);
    return ClrDay;
}());

var ClrDaypicker = /** @class */ (function () {
    function ClrDaypicker(_viewManagerService, _dateNavigationService, _localeHelperService, commonStrings) {
        this._viewManagerService = _viewManagerService;
        this._dateNavigationService = _dateNavigationService;
        this._localeHelperService = _localeHelperService;
        this.commonStrings = commonStrings;
    }
    Object.defineProperty(ClrDaypicker.prototype, "monthAttrString", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectMonthText, {
                CALENDAR_MONTH: this.calendarMonth,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "yearAttrString", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.datepickerSelectYearText, {
                CALENDAR_YEAR: this.calendarYear.toString(),
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "ariaLiveMonth", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentMonthPhrase, {
                CURRENT_MONTH: this.calendarMonth,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "updateAriaLiveYear", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentYearPhrase, {
                CURRENT_YEAR: this.calendarYear.toString(),
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    ClrDaypicker.prototype.changeToMonthView = function () {
        this._viewManagerService.changeToMonthView();
    };
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    ClrDaypicker.prototype.changeToYearView = function () {
        this._viewManagerService.changeToYearView();
    };
    Object.defineProperty(ClrDaypicker.prototype, "calendarMonth", {
        /**
         * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
         */
        get: function () {
            return this._localeHelperService.localeMonthsAbbreviated[this._dateNavigationService.displayedCalendar.month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDaypicker.prototype, "calendarYear", {
        /**
         * Returns the year value of the calendar.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    ClrDaypicker.prototype.nextMonth = function () {
        this._dateNavigationService.moveToNextMonth();
    };
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    ClrDaypicker.prototype.previousMonth = function () {
        this._dateNavigationService.moveToPreviousMonth();
    };
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    ClrDaypicker.prototype.currentMonth = function () {
        this._dateNavigationService.moveToCurrentMonth();
    };
    ClrDaypicker = __decorate([
        Component({ selector: 'clr-daypicker', template: "<div class=\"calendar-header\">\n    <div aria-live=\"polite\" class=\"clr-sr-only\">\n      {{ ariaLiveMonth }}.  {{updateAriaLiveYear}}.\n    </div>\n    <div class=\"calendar-pickers\">\n        <button\n                class=\"calendar-btn monthpicker-trigger\"\n                type=\"button\" (click)=\"changeToMonthView()\"\n                [attr.aria-label]=\"monthAttrString\"\n                [attr.title]=\"monthAttrString\">\n                {{calendarMonth}}\n        </button>\n        <button\n                class=\"calendar-btn yearpicker-trigger\"\n                type=\"button\"\n                (click)=\"changeToYearView()\"\n                [attr.aria-label]=\"yearAttrString\"\n                [attr.title]=\"yearAttrString\">\n            {{calendarYear}}\n        </button>\n    </div>\n    <div class=\"calendar-switchers\">\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"previousMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerPreviousMonth\">\n            <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"currentMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerCurrentMonth\">\n            <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentMonth\"></clr-icon>\n        </button>\n        <button\n            class=\"calendar-btn switcher\"\n            type=\"button\"\n            (click)=\"nextMonth()\"\n            [attr.aria-label]=\"commonStrings.keys.datepickerNextMonth\">\n            <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextMonth\"></clr-icon>\n        </button>\n    </div>\n</div>\n<clr-calendar></clr-calendar>\n", host: { '[class.daypicker]': 'true' } }),
        __metadata("design:paramtypes", [ViewManagerService,
            DateNavigationService,
            LocaleHelperService,
            ClrCommonStringsService])
    ], ClrDaypicker);
    return ClrDaypicker;
}());

var ClrMonthpicker = /** @class */ (function () {
    function ClrMonthpicker(_viewManagerService, _localeHelperService, _dateNavigationService, _datepickerFocusService, _elRef) {
        this._viewManagerService = _viewManagerService;
        this._localeHelperService = _localeHelperService;
        this._dateNavigationService = _dateNavigationService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this._focusedMonthIndex = this.calendarMonthIndex;
    }
    Object.defineProperty(ClrMonthpicker.prototype, "monthNames", {
        /**
         * Gets the months array which is used to rendered the monthpicker view.
         * Months are in the TranslationWidth.Wide format.
         */
        get: function () {
            return this._localeHelperService.localeMonthsWide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrMonthpicker.prototype, "calendarMonthIndex", {
        /**
         * Gets the month value of the Calendar.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.month;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the DateNavigationService to update the month value of the calendar.
     * Also changes the view to the daypicker.
     */
    ClrMonthpicker.prototype.changeMonth = function (monthIndex) {
        this._dateNavigationService.changeMonth(monthIndex);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Compares the month passed to the focused month and returns the tab index.
     */
    ClrMonthpicker.prototype.getTabIndex = function (monthIndex) {
        return monthIndex === this._focusedMonthIndex ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the monthpicker.
     */
    ClrMonthpicker.prototype.onKeyDown = function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            var keyCode = event.keyCode;
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
    };
    /**
     * Focuses on the current calendar month when the View is initialized.
     */
    ClrMonthpicker.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
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
            template: "\n        <button\n            type=\"button\"\n            class=\"calendar-btn month\"\n            *ngFor=\"let month of monthNames; let monthIndex = index\"\n            (click)=\"changeMonth(monthIndex)\"\n            [class.is-selected]=\"monthIndex === calendarMonthIndex\"\n            [attr.tabindex]=\"getTabIndex(monthIndex)\">\n            {{month}}\n        </button>\n    ",
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
    return ClrMonthpicker;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var YEARS_TO_DISPLAY = 10;
var YearRangeModel = /** @class */ (function () {
    function YearRangeModel(year) {
        this.year = year;
        this.yearRange = [];
        this.generateYearRange();
    }
    Object.defineProperty(YearRangeModel.prototype, "middleYear", {
        /**
         * Gets the number in the middle of the range.
         */
        get: function () {
            return this.yearRange[Math.floor(this.yearRange.length / 2)];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates the year range based on the year parameter.
     * eg: If 2018 is passed the output will be [2010, 2011, ..., 2019]
     */
    YearRangeModel.prototype.generateYearRange = function () {
        var remainder = this.year % YEARS_TO_DISPLAY;
        var floor = this.year - remainder;
        var ceil = floor + YEARS_TO_DISPLAY;
        this.yearRange = this.generateRange(floor, ceil);
    };
    /**
     * Function which generate a range of numbers from floor to ceil.
     */
    YearRangeModel.prototype.generateRange = function (floor, ceil) {
        return Array.from({ length: ceil - floor }, function (v, k) { return k + floor; });
    };
    /**
     * Generates the YearRangeModel for the next decade.
     */
    YearRangeModel.prototype.nextDecade = function () {
        return new YearRangeModel(this.year + 10);
    };
    /**
     * Generates the YearRangeModel for the previous decade.
     */
    YearRangeModel.prototype.previousDecade = function () {
        return new YearRangeModel(this.year - 10);
    };
    /**
     * Generates the YearRangeModel for the current decade.
     */
    YearRangeModel.prototype.currentDecade = function () {
        return new YearRangeModel(new Date().getFullYear());
    };
    /**
     * Checks if the value is in the YearRangeModel.
     */
    YearRangeModel.prototype.inRange = function (value) {
        return this.yearRange.indexOf(value) > -1;
    };
    return YearRangeModel;
}());

var ClrYearpicker = /** @class */ (function () {
    function ClrYearpicker(_dateNavigationService, _viewManagerService, _datepickerFocusService, _elRef, commonStrings) {
        this._dateNavigationService = _dateNavigationService;
        this._viewManagerService = _viewManagerService;
        this._datepickerFocusService = _datepickerFocusService;
        this._elRef = _elRef;
        this.commonStrings = commonStrings;
        this.yearRangeModel = new YearRangeModel(this.calendarYear);
        this._focusedYear = this.calendarYear;
        this.updateRange(this.yearRangeModel);
    }
    Object.defineProperty(ClrYearpicker.prototype, "ariaLiveDecadeText", {
        get: function () {
            return this.commonStrings.parse(this.commonStrings.keys.daypickerSRCurrentDecadePhrase, {
                DECADE_RANGE: this.decadeRange,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrYearpicker.prototype, "calendarYear", {
        /**
         * Gets the year which the user is currently on.
         */
        get: function () {
            return this._dateNavigationService.displayedCalendar.year;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Increments the focus year by the value passed. Updates the YearRangeModel if the
     * new value is not in the current decade.
     */
    ClrYearpicker.prototype.incrementFocusYearBy = function (value) {
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
    };
    /**
     * Calls the DateNavigationService to update the year value of the calendar.
     * Also changes the view to the daypicker.
     */
    ClrYearpicker.prototype.changeYear = function (year) {
        this._dateNavigationService.changeYear(year);
        this._viewManagerService.changeToDayView();
    };
    /**
     * Updates the YearRangeModel to the previous decade.
     */
    ClrYearpicker.prototype.previousDecade = function () {
        this.yearRangeModel = this.yearRangeModel.previousDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Updates the YearRangeModel to the current decade.
     */
    ClrYearpicker.prototype.currentDecade = function () {
        if (!this.yearRangeModel.inRange(this._dateNavigationService.today.year)) {
            this.yearRangeModel = this.yearRangeModel.currentDecade();
        }
        this._datepickerFocusService.focusCell(this._elRef);
        this.updateRange(this.yearRangeModel);
    };
    /**
     * Updates the YearRangeModel to the next decade.
     */
    ClrYearpicker.prototype.nextDecade = function () {
        this.yearRangeModel = this.yearRangeModel.nextDecade();
        this.updateRange(this.yearRangeModel);
        // Year in the yearpicker is not focused because while navigating to a different decade,
        // you want the focus to remain on the decade switcher arrows.
    };
    /**
     * Compares the year passed to the focused year and returns the tab index.
     */
    ClrYearpicker.prototype.getTabIndex = function (year) {
        if (!this.yearRangeModel.inRange(this._focusedYear)) {
            if (this.yearRangeModel.inRange(this.calendarYear)) {
                this._focusedYear = this.calendarYear;
            }
            else {
                this._focusedYear = this.yearRangeModel.middleYear;
            }
        }
        return this._focusedYear === year ? 0 : -1;
    };
    /**
     * Handles the Keyboard arrow navigation for the yearpicker.
     */
    ClrYearpicker.prototype.onKeyDown = function (event) {
        // NOTE: Didn't move this to the date navigation service because
        // the logic is fairly simple and it didn't make sense for me
        // to create extra observables just to move this logic to the service.
        if (event) {
            var keyCode = event.keyCode;
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
    };
    ClrYearpicker.prototype.updateRange = function (yrm) {
        var floor = yrm.yearRange[0];
        var ceil = yrm.yearRange[yrm.yearRange.length - 1];
        this.decadeRange = floor + " to " + ceil;
    };
    /**
     * Focuses on the current calendar year when the View is initialized.
     */
    ClrYearpicker.prototype.ngAfterViewInit = function () {
        this._datepickerFocusService.focusCell(this._elRef);
        // update the value for  decade range
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
            template: "\n        <div class=\"year-switchers\">\n          <div aria-live=\"polite\" class=\"clr-sr-only\">\n            {{ ariaLiveDecadeText  }}.\n          </div>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"previousDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerPreviousDecade\">\n              <clr-icon shape=\"angle\" dir=\"left\" [attr.title]=\"commonStrings.keys.datepickerPreviousDecade\"></clr-icon>\n          </button>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"currentDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerCurrentDecade\">\n              <clr-icon shape=\"event\" [attr.title]=\"commonStrings.keys.datepickerCurrentDecade\"></clr-icon>\n          </button>\n          <button \n              class=\"calendar-btn switcher\" \n              type=\"button\" \n              (click)=\"nextDecade()\"\n              [attr.aria-label]=\"commonStrings.keys.datepickerNextDecade\">\n              <clr-icon shape=\"angle\" dir=\"right\" [attr.title]=\"commonStrings.keys.datepickerNextDecade\"></clr-icon>\n          </button>\n        </div>\n        <div class=\"years\">\n            <button\n                *ngFor=\"let year of yearRangeModel.yearRange\"\n                type=\"button\"\n                class=\"calendar-btn year\"\n                [attr.tabindex]=\"getTabIndex(year)\"\n                [class.is-selected]=\"year === calendarYear\"\n                (click)=\"changeYear(year)\">\n                {{year}}\n            </button>\n        </div>\n    ",
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
    return ClrYearpicker;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_DATEPICKER_DIRECTIVES = [
    ClrDay,
    ClrDateContainer,
    ClrDateInput,
    ClrDatepickerViewManager,
    ClrMonthpicker,
    ClrYearpicker,
    ClrDaypicker,
    ClrCalendar,
];
var ClrDatepickerModule = /** @class */ (function () {
    function ClrDatepickerModule() {
    }
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
    return ClrDatepickerModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrInputContainer = /** @class */ (function () {
    function ClrInputContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    ClrInputContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrInputContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrInputContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
        }
    };
    __decorate([
        ContentChild(ClrLabel, { static: false }),
        __metadata("design:type", ClrLabel)
    ], ClrInputContainer.prototype, "label", void 0);
    ClrInputContainer = __decorate([
        Component({
            selector: 'clr-input-container',
            template: "\n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div class=\"clr-input-wrapper\">\n                <ng-content select=\"[clrInput]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
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
    return ClrInputContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrInput = /** @class */ (function (_super) {
    __extends(ClrInput, _super);
    function ClrInput(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrInputContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
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
    return ClrInput;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrInputModule = /** @class */ (function () {
    function ClrInputModule() {
    }
    ClrInputModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
            declarations: [ClrInput, ClrInputContainer],
            exports: [ClrCommonFormsModule, ClrInput, ClrInputContainer],
            entryComponents: [ClrInputContainer],
        })
    ], ClrInputModule);
    return ClrInputModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TOGGLE_SERVICE = new InjectionToken(undefined);
function ToggleServiceFactory() {
    return new BehaviorSubject(false);
}
var TOGGLE_SERVICE_PROVIDER = { provide: TOGGLE_SERVICE, useFactory: ToggleServiceFactory };
var ClrPasswordContainer = /** @class */ (function () {
    function ClrPasswordContainer(ifErrorService, layoutService, controlClassService, focusService, ngControlService, toggleService, commonStrings) {
        var _this = this;
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
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.focusService.focusChange.subscribe(function (state) {
            _this.focus = state;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrPasswordContainer.prototype, "clrToggle", {
        get: function () {
            return this._toggle;
        },
        set: function (state) {
            this._toggle = state;
            if (!state) {
                this.show = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrPasswordContainer.prototype.toggle = function () {
        this.show = !this.show;
        this.toggleService.next(this.show);
    };
    ClrPasswordContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrPasswordContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrPasswordContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
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
            template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n      <div class=\"clr-input-wrapper\">\n        <div class=\"clr-input-group\" [class.clr-focus]=\"focus\">\n          <ng-content select=\"[clrPassword]\"></ng-content>\n          <button\n            *ngIf=\"clrToggle\"\n            (click)=\"toggle()\"\n            [disabled]=\"control?.disabled\"\n            class=\"clr-input-group-icon-action\"\n            type=\"button\">\n            <clr-icon\n            [attr.shape]=\"show ? 'eye-hide' : 'eye'\"\n            [attr.title]=\"show ? commonStrings.keys.hide : commonStrings.keys.show\"></clr-icon>\n          </button>\n        </div>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n      </div>\n      <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n      <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n    </div>\n    ",
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
    return ClrPasswordContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrPassword = /** @class */ (function (_super) {
    __extends(ClrPassword, _super);
    function ClrPassword(vcr, injector, control, renderer, el, focusService, toggleService) {
        var _this = _super.call(this, vcr, ClrPasswordContainer, injector, control, renderer, el) || this;
        _this.focusService = focusService;
        _this.toggleService = toggleService;
        _this.index = 1;
        if (!_this.focusService) {
            throw new Error('clrPassword requires being wrapped in <clr-password-container>');
        }
        _this.subscriptions.push(_this.toggleService.subscribe(function (toggle) {
            renderer.setProperty(el.nativeElement, 'type', toggle ? 'text' : 'password');
        }));
        return _this;
    }
    ClrPassword.prototype.triggerFocus = function () {
        if (this.focusService) {
            this.focusService.focused = true;
        }
    };
    ClrPassword.prototype.triggerValidation = function () {
        _super.prototype.triggerValidation.call(this);
        if (this.focusService) {
            this.focusService.focused = false;
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
    return ClrPassword;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrPasswordModule = /** @class */ (function () {
    function ClrPasswordModule() {
    }
    ClrPasswordModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
            declarations: [ClrPassword, ClrPasswordContainer],
            exports: [ClrCommonFormsModule, ClrPassword, ClrPasswordContainer],
            entryComponents: [ClrPasswordContainer],
        })
    ], ClrPasswordModule);
    return ClrPasswordModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrRadioWrapper = /** @class */ (function () {
    function ClrRadioWrapper() {
        // We need both _dynamic for HostWrapper and ContentChild(ClrLabel) in cases where
        // the user puts a radio inside a wrapper without a label, host wrapping doesn't apply
        // but we'd still need to insert a label
        this._dynamic = false;
    }
    ClrRadioWrapper.prototype.ngOnInit = function () {
        if (this.label) {
            this.label.disableGrid();
        }
    };
    __decorate([
        ContentChild(ClrLabel, { static: true }),
        __metadata("design:type", ClrLabel)
    ], ClrRadioWrapper.prototype, "label", void 0);
    ClrRadioWrapper = __decorate([
        Component({
            selector: 'clr-radio-wrapper',
            template: "\n    <ng-content select=\"[clrRadio]\"></ng-content>\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label\"></label>\n  ",
            host: {
                '[class.clr-radio-wrapper]': 'true',
            },
            providers: [ControlIdService]
        })
    ], ClrRadioWrapper);
    return ClrRadioWrapper;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrRadio = /** @class */ (function (_super) {
    __extends(ClrRadio, _super);
    function ClrRadio(vcr, injector, control, renderer, el) {
        return _super.call(this, vcr, ClrRadioWrapper, injector, control, renderer, el) || this;
    }
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
    return ClrRadio;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrRadioContainer = /** @class */ (function () {
    function ClrRadioContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this.inline = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    Object.defineProperty(ClrRadioContainer.prototype, "clrInline", {
        get: function () {
            return this.inline;
        },
        /*
         * Here we want to support the following cases
         * clrInline - true by presence
         * clrInline="true|false" - unless it is explicitly false, strings are considered true
         * [clrInline]="true|false" - expect a boolean
         */
        set: function (value) {
            if (typeof value === 'string') {
                this.inline = value === 'false' ? false : true;
            }
            else {
                this.inline = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrRadioContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid(), this.inline ? 'clr-control-inline' : '');
    };
    ClrRadioContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrRadioContainer.prototype.ngOnDestroy = function () {
        this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
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
            template: "\n    <ng-content select=\"label\"></ng-content>\n    <label *ngIf=\"!label && addGrid()\"></label>\n    <div class=\"clr-control-container\" [class.clr-control-inline]=\"clrInline\" [ngClass]=\"controlClass()\">\n      <ng-content select=\"clr-radio-wrapper\"></ng-content>\n      <div class=\"clr-subtext-wrapper\">\n        <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n        <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n        <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n      </div>\n    </div>\n    ",
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
    return ClrRadioContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrRadioModule = /** @class */ (function () {
    function ClrRadioModule() {
    }
    ClrRadioModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrCommonFormsModule, ClrHostWrappingModule, ClrIconModule],
            declarations: [ClrRadio, ClrRadioContainer, ClrRadioWrapper],
            exports: [ClrCommonFormsModule, ClrRadio, ClrRadioContainer, ClrRadioWrapper],
            entryComponents: [ClrRadioWrapper],
        })
    ], ClrRadioModule);
    return ClrRadioModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrSelectContainer = /** @class */ (function () {
    function ClrSelectContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.multi = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            if (control) {
                _this.multi = control.valueAccessor instanceof SelectMultipleControlValueAccessor;
                _this.control = control;
            }
        }));
    }
    ClrSelectContainer.prototype.wrapperClass = function () {
        return this.multi ? 'clr-multiselect-wrapper' : 'clr-select-wrapper';
    };
    ClrSelectContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrSelectContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrSelectContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
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
            template: "    \n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div [ngClass]=\"wrapperClass()\">\n                <ng-content select=\"[clrSelect]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
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
    return ClrSelectContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrSelect = /** @class */ (function (_super) {
    __extends(ClrSelect, _super);
    function ClrSelect(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrSelectContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
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
    return ClrSelect;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrSelectModule = /** @class */ (function () {
    function ClrSelectModule() {
    }
    ClrSelectModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
            declarations: [ClrSelect, ClrSelectContainer],
            exports: [ClrCommonFormsModule, ClrSelect, ClrSelectContainer],
            entryComponents: [ClrSelectContainer],
        })
    ], ClrSelectModule);
    return ClrSelectModule;
}());

/**
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTextareaContainer = /** @class */ (function () {
    function ClrTextareaContainer(ifErrorService, layoutService, controlClassService, ngControlService) {
        var _this = this;
        this.ifErrorService = ifErrorService;
        this.layoutService = layoutService;
        this.controlClassService = controlClassService;
        this.ngControlService = ngControlService;
        this.subscriptions = [];
        this.invalid = false;
        this._dynamic = false;
        this.subscriptions.push(this.ifErrorService.statusChanges.subscribe(function (invalid) {
            _this.invalid = invalid;
        }));
        this.subscriptions.push(this.ngControlService.controlChanges.subscribe(function (control) {
            _this.control = control;
        }));
    }
    ClrTextareaContainer.prototype.controlClass = function () {
        return this.controlClassService.controlClass(this.invalid, this.addGrid());
    };
    ClrTextareaContainer.prototype.addGrid = function () {
        if (this.layoutService && !this.layoutService.isVertical()) {
            return true;
        }
        return false;
    };
    ClrTextareaContainer.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.map(function (sub) { return sub.unsubscribe(); });
        }
    };
    __decorate([
        ContentChild(ClrLabel, { static: false }),
        __metadata("design:type", ClrLabel)
    ], ClrTextareaContainer.prototype, "label", void 0);
    ClrTextareaContainer = __decorate([
        Component({
            selector: 'clr-textarea-container',
            template: "\n        <ng-content select=\"label\"></ng-content>\n        <label *ngIf=\"!label && addGrid()\"></label>\n        <div class=\"clr-control-container\" [ngClass]=\"controlClass()\">\n            <div class=\"clr-textarea-wrapper\">\n                <ng-content select=\"[clrTextarea]\"></ng-content>\n                <clr-icon *ngIf=\"invalid\" class=\"clr-validate-icon\" shape=\"exclamation-circle\" aria-hidden=\"true\"></clr-icon>\n            </div>\n            <ng-content select=\"clr-control-helper\" *ngIf=\"!invalid\"></ng-content>\n            <ng-content select=\"clr-control-error\" *ngIf=\"invalid\"></ng-content>\n        </div>\n    ",
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
    return ClrTextareaContainer;
}());

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTextarea = /** @class */ (function (_super) {
    __extends(ClrTextarea, _super);
    function ClrTextarea(vcr, injector, control, renderer, el) {
        var _this = _super.call(this, vcr, ClrTextareaContainer, injector, control, renderer, el) || this;
        _this.index = 1;
        return _this;
    }
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
    return ClrTextarea;
}(WrappedFormControl));

/**
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTextareaModule = /** @class */ (function () {
    function ClrTextareaModule() {
    }
    ClrTextareaModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrCommonFormsModule],
            declarations: [ClrTextarea, ClrTextareaContainer],
            exports: [ClrCommonFormsModule, ClrTextarea, ClrTextareaContainer],
            entryComponents: [ClrTextareaContainer],
        })
    ], ClrTextareaModule);
    return ClrTextareaModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrFormsModule = /** @class */ (function () {
    function ClrFormsModule() {
    }
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
    return ClrFormsModule;
}());

var CLR_LOADING_DIRECTIVES = [ClrLoading];
var ClrLoadingModule = /** @class */ (function () {
    function ClrLoadingModule() {
    }
    ClrLoadingModule = __decorate([
        NgModule({ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] })
    ], ClrLoadingModule);
    return ClrLoadingModule;
}());

var OutsideClick = /** @class */ (function () {
    function OutsideClick(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    OutsideClick.prototype.documentClick = function (event) {
        var target = event.target; // Get the element in the DOM on which the mouse was clicked
        var host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
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
    return OutsideClick;
}());

var OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

var ClrOutsideClickModule = /** @class */ (function () {
    function ClrOutsideClickModule() {
    }
    ClrOutsideClickModule = __decorate([
        NgModule({ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] })
    ], ClrOutsideClickModule);
    return ClrOutsideClickModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DomAdapter = /** @class */ (function () {
    function DomAdapter() {
    }
    DomAdapter.prototype.userDefinedWidth = function (element) {
        element.classList.add('datagrid-cell-width-zero');
        var userDefinedWidth = this.clientRect(element).width;
        element.classList.remove('datagrid-cell-width-zero');
        return userDefinedWidth;
    };
    DomAdapter.prototype.scrollBarWidth = function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    DomAdapter.prototype.scrollWidth = function (element) {
        return element.scrollWidth || 0;
    };
    DomAdapter.prototype.computedHeight = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('height'), 10);
    };
    DomAdapter.prototype.clientRect = function (element) {
        var elementClientRect = element.getBoundingClientRect();
        return {
            top: parseInt(elementClientRect.top, 10),
            bottom: parseInt(elementClientRect.bottom, 10),
            left: parseInt(elementClientRect.left, 10),
            right: parseInt(elementClientRect.right, 10),
            width: parseInt(elementClientRect.width, 10),
            height: parseInt(elementClientRect.height, 10),
        };
    };
    DomAdapter.prototype.minWidth = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue('min-width'), 10);
    };
    DomAdapter.prototype.focus = function (element) {
        element.focus();
    };
    DomAdapter = __decorate([
        Injectable()
    ], DomAdapter);
    return DomAdapter;
}());

// This class is used to convert an internal event
// to an external event to be emitted.
var ClrDragEvent = /** @class */ (function () {
    function ClrDragEvent(dragEvent) {
        this.dragPosition = dragEvent.dragPosition;
        this.group = dragEvent.group;
        this.dragDataTransfer = dragEvent.dragDataTransfer;
        this.dropPointPosition = dragEvent.dropPointPosition;
    }
    return ClrDragEvent;
}());

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

var DragAndDropEventBusService = /** @class */ (function () {
    function DragAndDropEventBusService() {
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.drop = new Subject();
    }
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragStarted", {
        get: function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragMoved", {
        get: function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dragEnded", {
        get: function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragAndDropEventBusService.prototype, "dropped", {
        get: function () {
            return this.drop.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DragAndDropEventBusService.prototype.broadcast = function (event) {
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
    };
    DragAndDropEventBusService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DragAndDropEventBusService_Factory() { return new DragAndDropEventBusService(); }, token: DragAndDropEventBusService, providedIn: "root" });
    DragAndDropEventBusService = __decorate([
        Injectable({ providedIn: 'root' })
    ], DragAndDropEventBusService);
    return DragAndDropEventBusService;
}());

var DragEventListenerService = /** @class */ (function () {
    function DragEventListenerService(ngZone, renderer, eventBus) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.eventBus = eventBus;
        this.dragStart = new Subject();
        this.dragMove = new Subject();
        this.dragEnd = new Subject();
        this.hasDragStarted = false;
    }
    Object.defineProperty(DragEventListenerService.prototype, "dragStarted", {
        get: function () {
            return this.dragStart.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragMoved", {
        get: function () {
            return this.dragMove.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragEventListenerService.prototype, "dragEnded", {
        get: function () {
            return this.dragEnd.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DragEventListenerService.prototype.attachDragListeners = function (draggableEl) {
        this.draggableEl = draggableEl;
        this.listeners = [
            this.customDragEvent(this.draggableEl, 'mousedown', 'mousemove', 'mouseup'),
            this.customDragEvent(this.draggableEl, 'touchstart', 'touchmove', 'touchend'),
        ];
    };
    DragEventListenerService.prototype.detachDragListeners = function () {
        if (this.listeners) {
            this.listeners.map(function (event) { return event(); });
        }
        // In most cases, once users start dragging with mousedown/touchstart events,
        // they will end dragging at one point with mouseup/touchend.
        // However, there might be a few cases where mousedown/touchstart events get registered,
        // but the draggable element gets removed before user ends dragging.
        // In that case, we need to remove the attached listeners that happened during the mousedown/touchstart events.
        if (this.nestedListeners) {
            this.nestedListeners.map(function (event) { return event(); });
        }
    };
    DragEventListenerService.prototype.getNativeEventObject = function (event) {
        if (event.hasOwnProperty('changedTouches')) {
            return event.changedTouches[0];
        }
        else {
            return event;
        }
    };
    DragEventListenerService.prototype.customDragEvent = function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        return this.renderer.listen(element, startOnEvent, function (startEvent) {
            // save the initial point to initialPosition
            // this will be used to calculate how far the draggable has been dragged from its initial position
            _this.initialPosition = {
                pageX: _this.getNativeEventObject(startEvent).pageX,
                pageY: _this.getNativeEventObject(startEvent).pageY,
            };
            // Initialize nested listeners' property with a new empty array;
            _this.nestedListeners = [];
            // This is needed to disable selection during dragging (especially in EDGE/IE11).
            _this.nestedListeners.push(_this.renderer.listen('document', 'selectstart', function (selectEvent) {
                selectEvent.preventDefault();
                selectEvent.stopImmediatePropagation();
            }));
            // Listen to mousemove/touchmove events outside of angular zone.
            _this.nestedListeners.push(_this.ngZone.runOutsideAngular(function () {
                return _this.renderer.listen('document', moveOnEvent, function (moveEvent) {
                    // Event.stopImmediatePropagation() is needed here to prevent nested draggables from getting dragged
                    // altogether. We shouldn't use Event.stopPropagation() here as we are listening to the events
                    // on the global element level.
                    // With Event.stopImmediatePropagation(), it registers the events sent from the inner most draggable
                    // first. Then immediately after that, it stops listening to the same type of events on the same
                    // element. So this will help us to not register the same events that would come from the parent
                    // level draggables eventually.
                    moveEvent.stopImmediatePropagation();
                    if (!_this.hasDragStarted) {
                        _this.hasDragStarted = true;
                        // Fire "dragstart"
                        _this.broadcast(moveEvent, DragEventType.DRAG_START);
                    }
                    else {
                        // Fire "dragmove"
                        _this.broadcast(moveEvent, DragEventType.DRAG_MOVE);
                    }
                });
            }));
            // Listen to mouseup/touchend events.
            _this.nestedListeners.push(_this.renderer.listen('document', endOnEvent, function (endEvent) {
                if (_this.hasDragStarted) {
                    // Fire "dragend" only if dragstart is registered
                    _this.hasDragStarted = false;
                    _this.broadcast(endEvent, DragEventType.DRAG_END);
                }
                // We must remove the the nested listeners every time drag completes.
                if (_this.nestedListeners) {
                    _this.nestedListeners.map(function (event) { return event(); });
                }
            }));
        });
    };
    DragEventListenerService.prototype.broadcast = function (event, eventType) {
        var dragEvent = this.generateDragEvent(event, eventType);
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
    };
    DragEventListenerService.prototype.generateDragEvent = function (event, eventType) {
        var nativeEvent = this.getNativeEventObject(event);
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
    };
    DragEventListenerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NgZone, Renderer2, DragAndDropEventBusService])
    ], DragEventListenerService);
    return DragEventListenerService;
}());

// This service is used to capture the state of clrDraggable element
// at a certain event and passes it to clrDraggableGhost component.
var DraggableSnapshotService = /** @class */ (function () {
    function DraggableSnapshotService(domAdapter) {
        this.domAdapter = domAdapter;
    }
    DraggableSnapshotService.prototype.capture = function (el, event) {
        this.draggableElClientRect = this.domAdapter.clientRect(el);
        this.snapshotDragEvent = event;
    };
    DraggableSnapshotService.prototype.discard = function () {
        delete this.draggableElClientRect;
        delete this.snapshotDragEvent;
    };
    Object.defineProperty(DraggableSnapshotService.prototype, "hasDraggableState", {
        get: function () {
            return !!this.snapshotDragEvent && !!this.draggableElClientRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableSnapshotService.prototype, "clientRect", {
        get: function () {
            return this.draggableElClientRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableSnapshotService.prototype, "dragEvent", {
        get: function () {
            return this.snapshotDragEvent;
        },
        enumerable: true,
        configurable: true
    });
    DraggableSnapshotService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DomAdapter])
    ], DraggableSnapshotService);
    return DraggableSnapshotService;
}());

var ClrDraggableGhost = /** @class */ (function () {
    function ClrDraggableGhost(el, dragEventListener, draggableSnapshot, renderer, ngZone) {
        var _this = this;
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
        var offset = {
            top: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageY - this.draggableSnapshot.clientRect.top
                : 0,
            left: this.draggableSnapshot.hasDraggableState
                ? this.draggableSnapshot.dragEvent.dragPosition.pageX - this.draggableSnapshot.clientRect.left
                : 0,
        };
        var isAnimationConfigured = false;
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe(function (event) {
            // On the first drag move event, we configure the animation as it's dependent on the first drag event.
            if (!isAnimationConfigured) {
                if (_this.draggableSnapshot.hasDraggableState) {
                    _this.animateToOnLeave(_this.draggableSnapshot.clientRect.top + "px", _this.draggableSnapshot.clientRect.left + "px");
                }
                else {
                    _this.animateToOnLeave(event.dragPosition.pageY + "px", event.dragPosition.pageX + "px");
                }
                isAnimationConfigured = true;
            }
            // Position the draggable ghost.
            var topLeftPosition = _this.findTopLeftPosition(event.dragPosition, offset);
            _this.setPositionStyle(_this.draggableGhostEl, topLeftPosition.pageX, topLeftPosition.pageY);
            _this.dragEventListener.dropPointPosition = _this.findDropPointPosition(topLeftPosition);
        }));
    }
    ClrDraggableGhost.prototype.setDefaultGhostSize = function (el) {
        if (this.draggableSnapshot.hasDraggableState) {
            this.setSizeStyle(el, this.draggableSnapshot.clientRect.width, this.draggableSnapshot.clientRect.height);
        }
    };
    ClrDraggableGhost.prototype.animateToOnLeave = function (top, left) {
        var _this = this;
        this.ngZone.run(function () {
            _this.leaveAnimConfig = { value: 0, params: { top: top, left: left } };
        });
    };
    ClrDraggableGhost.prototype.findTopLeftPosition = function (dragPosition, offset) {
        return { pageX: dragPosition.pageX - offset.left, pageY: dragPosition.pageY - offset.top };
    };
    ClrDraggableGhost.prototype.findDropPointPosition = function (topLeftPosition) {
        if (this.draggableSnapshot.hasDraggableState) {
            return {
                pageX: topLeftPosition.pageX + this.draggableSnapshot.clientRect.width / 2,
                pageY: topLeftPosition.pageY + this.draggableSnapshot.clientRect.height / 2,
            };
        }
        else {
            return topLeftPosition;
        }
    };
    ClrDraggableGhost.prototype.setSizeStyle = function (el, width, height) {
        this.renderer.setStyle(el, 'width', width + "px");
        this.renderer.setStyle(el, 'height', height + "px");
    };
    ClrDraggableGhost.prototype.setPositionStyle = function (el, left, top) {
        this.renderer.setStyle(el, 'left', left + "px");
        this.renderer.setStyle(el, 'top', top + "px");
        this.renderer.setStyle(el, 'visibility', 'visible');
    };
    ClrDraggableGhost.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        HostBinding('@leaveAnimation'),
        __metadata("design:type", Object)
    ], ClrDraggableGhost.prototype, "leaveAnimConfig", void 0);
    ClrDraggableGhost = __decorate([
        Component({
            selector: 'clr-draggable-ghost',
            template: "<ng-content></ng-content>",
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
    return ClrDraggableGhost;
}());

// This structural directive will be used mainly together with `clr-draggable-ghost` directive inside of clrDraggable
// directive. The directive is responsible for instantiating `clr-draggable-ghost` directive only during dragging so
// that Angular Change Detection is prevented from running if a component or directive is placed inside of the
// `clr-draggable-ghost` directive.
var ClrIfDragged = /** @class */ (function () {
    function ClrIfDragged(template, container, dragEventListener) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.dragEventListener = dragEventListener;
        this.subscriptions = [];
        if (!this.dragEventListener || !this.container) {
            throw new Error('The *clrIfDragged directive can only be used inside of a clrDraggable directive.');
        }
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe(function (event) {
            _this.container.createEmbeddedView(_this.template);
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe(function (event) {
            _this.container.clear();
        }));
    }
    ClrIfDragged.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrIfDragged;
}());

// This provider registers the drag handle element.
// When it registers a element as a drag handle, it attaches that element to the listeners from ClrDragEventListener.
// Also, it adds the "drag-handle" css class to the registered element through Renderer.
var DragHandleRegistrarService = /** @class */ (function () {
    function DragHandleRegistrarService(dragEventListener, renderer) {
        this.dragEventListener = dragEventListener;
        this.renderer = renderer;
    }
    Object.defineProperty(DragHandleRegistrarService.prototype, "defaultHandleEl", {
        get: function () {
            return this._defaultHandleEl;
        },
        set: function (el) {
            this._defaultHandleEl = el; // defaultHandleEl will be usually the clrDraggable element.
            // If the customHandleEl has been registered,
            // don't make the defaultHandleEl the drag handle yet until the customHandleEl is unregistered.
            if (!this._customHandleEl) {
                this.makeElementHandle(this._defaultHandleEl);
            }
        },
        enumerable: true,
        configurable: true
    });
    DragHandleRegistrarService.prototype.makeElementHandle = function (el) {
        if (this._defaultHandleEl && this._defaultHandleEl !== el) {
            // Before making an element the custom handle element,
            // we should remove the existing drag-handle class from the draggable element.
            this.renderer.removeClass(this._defaultHandleEl, 'drag-handle');
        }
        this.dragEventListener.attachDragListeners(el);
        this.renderer.addClass(el, 'drag-handle');
    };
    Object.defineProperty(DragHandleRegistrarService.prototype, "customHandleEl", {
        get: function () {
            return this._customHandleEl;
        },
        enumerable: true,
        configurable: true
    });
    DragHandleRegistrarService.prototype.registerCustomHandle = function (el) {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this._customHandleEl = el;
        this.makeElementHandle(this._customHandleEl);
    };
    DragHandleRegistrarService.prototype.unregisterCustomHandle = function () {
        this.dragEventListener.detachDragListeners(); // removes the existing listeners
        this.renderer.removeClass(this._customHandleEl, 'drag-handle');
        delete this._customHandleEl;
        // if default handle is set, make that handle
        if (this._defaultHandleEl) {
            this.makeElementHandle(this._defaultHandleEl);
        }
    };
    DragHandleRegistrarService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DragEventListenerService, Renderer2])
    ], DragHandleRegistrarService);
    return DragHandleRegistrarService;
}());

// This service class adds and removes the "in-drag" class to the document body element
// through its public enter() and exit() methods.
var GlobalDragModeService = /** @class */ (function () {
    function GlobalDragModeService(renderer) {
        this.renderer = renderer;
    }
    GlobalDragModeService.prototype.enter = function () {
        this.renderer.addClass(document.body, 'in-drag');
    };
    GlobalDragModeService.prototype.exit = function () {
        this.renderer.removeClass(document.body, 'in-drag');
    };
    GlobalDragModeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Renderer2])
    ], GlobalDragModeService);
    return GlobalDragModeService;
}());

var ClrDraggable = /** @class */ (function () {
    function ClrDraggable(el, dragEventListener, dragHandleRegistrar, viewContainerRef, cfr, injector, draggableSnapshot, globalDragMode) {
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
    Object.defineProperty(ClrDraggable.prototype, "dataTransfer", {
        set: function (value) {
            this.dragEventListener.dragDataTransfer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDraggable.prototype, "group", {
        set: function (value) {
            this.dragEventListener.group = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDraggable.prototype.createDefaultGhost = function (event) {
        this.draggableSnapshot.capture(this.draggableEl, event);
        // NOTE: The default ghost element will appear
        // next to the clrDraggable in the DOM as a sibling element.
        this.viewContainerRef.createComponent(this.componentFactory, 0, this.injector, [
            [this.draggableEl.cloneNode(true)],
        ]);
    };
    ClrDraggable.prototype.destroyDefaultGhost = function () {
        this.viewContainerRef.clear();
        this.draggableSnapshot.discard();
    };
    ClrDraggable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.dragHandleRegistrar.defaultHandleEl = this.draggableEl;
        this.subscriptions.push(this.dragEventListener.dragStarted.subscribe(function (event) {
            _this.globalDragMode.enter();
            _this.dragOn = true;
            if (!_this.customGhost) {
                _this.createDefaultGhost(event);
            }
            _this.dragStartEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragMoved.subscribe(function (event) {
            _this.dragMoveEmitter.emit(new ClrDragEvent(event));
        }));
        this.subscriptions.push(this.dragEventListener.dragEnded.subscribe(function (event) {
            _this.globalDragMode.exit();
            _this.dragOn = false;
            if (!_this.customGhost) {
                _this.destroyDefaultGhost();
            }
            _this.dragEndEmitter.emit(new ClrDragEvent(event));
        }));
    };
    ClrDraggable.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.dragEventListener.detachDragListeners();
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
    return ClrDraggable;
}());

var ClrDroppable = /** @class */ (function () {
    function ClrDroppable(el, eventBus, domAdapter, renderer) {
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
    Object.defineProperty(ClrDroppable.prototype, "isDraggableOver", {
        set: function (value) {
            // We need to add/remove this draggable-over class via Renderer2
            // because isDraggableOver is set outside of NgZone.
            if (value) {
                this.renderer.addClass(this.droppableEl, 'draggable-over');
            }
            else {
                this.renderer.removeClass(this.droppableEl, 'draggable-over');
            }
            this._isDraggableOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDroppable.prototype, "group", {
        set: function (value) {
            this._group = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDroppable.prototype.dropToleranceGenerator = function (top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = top; }
        if (bottom === void 0) { bottom = top; }
        if (left === void 0) { left = right; }
        return { top: top, right: right, bottom: bottom, left: left };
    };
    Object.defineProperty(ClrDroppable.prototype, "dropTolerance", {
        set: function (value) {
            // If user provides an object here and wants to manipulate/update properties individually,
            // the object must be immutable as we generate new object based user's given object.
            if (typeof value === 'number') {
                this._dropTolerance = this.dropToleranceGenerator(value);
            }
            else if (typeof value === 'string') {
                var toleranceValues = value
                    .trim()
                    .split(/\s+/)
                    .map(function (tolerance) { return parseInt(tolerance, 10); });
                this._dropTolerance = this.dropToleranceGenerator.apply(this, __spread(toleranceValues));
            }
            else if (value) {
                // The value could be passed in as {left: 20, top: 30 }
                // In this case, the rest of the direction properties should be 0.
                // That's why we initialize properties with 0 first, then override with user's given value.
                this._dropTolerance = __assign({}, this.dropToleranceGenerator(0), value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDroppable.prototype.unsubscribeFrom = function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    ClrDroppable.prototype.checkGroupMatch = function (draggableGroup) {
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
                return this._group.some(function (groupKey) { return draggableGroup.indexOf(groupKey) > -1; });
            }
        }
    };
    ClrDroppable.prototype.isInDropArea = function (point) {
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
    };
    ClrDroppable.prototype.onDragStart = function (dragStartEvent) {
        var _this = this;
        // Check draggable and droppable have a matching group key.
        this.isDraggableMatch = this.checkGroupMatch(dragStartEvent.group);
        // Subscribe to dragMoved and dragEnded only if draggable and droppable have a matching group key.
        if (this.isDraggableMatch) {
            this.dragStartEmitter.emit(new ClrDragEvent(dragStartEvent));
            this.dragMoveSubscription = this.eventBus.dragMoved.subscribe(function (dragMoveEvent) {
                _this.onDragMove(dragMoveEvent);
            });
            this.dragEndSubscription = this.eventBus.dragEnded.subscribe(function (dragEndEvent) {
                _this.onDragEnd(dragEndEvent);
            });
        }
    };
    ClrDroppable.prototype.onDragMove = function (dragMoveEvent) {
        var isInDropArea = this.isInDropArea(dragMoveEvent.dropPointPosition);
        if (!this._isDraggableOver && isInDropArea) {
            this.isDraggableOver = true;
            var dragEnterEvent = __assign({}, dragMoveEvent, { type: DragEventType.DRAG_ENTER });
            this.eventBus.broadcast(dragEnterEvent);
            this.dragEnterEmitter.emit(new ClrDragEvent(dragEnterEvent));
        }
        else if (this._isDraggableOver && !isInDropArea) {
            this.isDraggableOver = false;
            var dragLeaveEvent = __assign({}, dragMoveEvent, { type: DragEventType.DRAG_LEAVE });
            this.eventBus.broadcast(dragLeaveEvent);
            this.dragLeaveEmitter.emit(new ClrDragEvent(dragLeaveEvent));
        }
        this.dragMoveEmitter.emit(new ClrDragEvent(dragMoveEvent));
    };
    ClrDroppable.prototype.onDragEnd = function (dragEndEvent) {
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
            var dropEvent = __assign({}, dragEndEvent, { type: DragEventType.DROP });
            this.eventBus.broadcast(dropEvent);
            this.dropEmitter.emit(new ClrDragEvent(dropEvent));
            this.isDraggableOver = false;
        }
        this.dragEndEmitter.emit(new ClrDragEvent(dragEndEvent));
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
        this.isDraggableMatch = false;
        delete this.clientRect;
    };
    ClrDroppable.prototype.ngOnInit = function () {
        var _this = this;
        this.dragStartSubscription = this.eventBus.dragStarted.subscribe(function (dragStartEvent) {
            _this.onDragStart(dragStartEvent);
        });
    };
    ClrDroppable.prototype.ngOnDestroy = function () {
        this.unsubscribeFrom(this.dragStartSubscription);
        this.unsubscribeFrom(this.dragMoveSubscription);
        this.unsubscribeFrom(this.dragEndSubscription);
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
    return ClrDroppable;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDragHandle = /** @class */ (function () {
    function ClrDragHandle(el, dragHandleRegistrar) {
        this.el = el;
        this.dragHandleRegistrar = dragHandleRegistrar;
        if (!this.dragHandleRegistrar) {
            // ClrDragHandleRegistrar is provided in ClrDraggable so we expect it to be present here
            // as clrDragHandle is required to be used only inside of a clrDraggable directive.
            throw new Error('The clrDragHandle directive can only be used inside of a clrDraggable directive.');
        }
        this.dragHandleRegistrar.registerCustomHandle(this.el.nativeElement);
    }
    ClrDragHandle.prototype.ngOnDestroy = function () {
        this.dragHandleRegistrar.unregisterCustomHandle();
    };
    ClrDragHandle = __decorate([
        Directive({ selector: '[clrDragHandle]', host: { '[class.drag-handle]': 'true' } }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ElementRef, DragHandleRegistrarService])
    ], ClrDragHandle);
    return ClrDragHandle;
}());

var CLR_DRAG_AND_DROP_DIRECTIVES = [
    ClrDraggable,
    ClrDroppable,
    ClrIfDragged,
    ClrDragHandle,
    ClrDraggableGhost,
];
var ClrDragAndDropModule = /** @class */ (function () {
    function ClrDragAndDropModule() {
    }
    ClrDragAndDropModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_DRAG_AND_DROP_DIRECTIVES],
            entryComponents: [ClrDraggableGhost],
            exports: [CLR_DRAG_AND_DROP_DIRECTIVES],
        })
    ], ClrDragAndDropModule);
    return ClrDragAndDropModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrExpandableAnimation = /** @class */ (function () {
    function ClrExpandableAnimation(element, domAdapter) {
        this.element = element;
        this.domAdapter = domAdapter;
        this.startHeight = 0;
    }
    Object.defineProperty(ClrExpandableAnimation.prototype, "expandAnimation", {
        get: function () {
            return { value: this.clrExpandTrigger, params: { startHeight: this.startHeight } };
        },
        enumerable: true,
        configurable: true
    });
    ClrExpandableAnimation.prototype.animationDone = function () {
        // A "safe" auto-update of the height ensuring basic OOTB user experience .
        // Prone to small jumps in initial animation height if data was changed in the meantime, window was resized, etc.
        // For optimal behavior call manually updateStartHeight() from the parent component before initiating the update.
        this.updateStartHeight();
    };
    ClrExpandableAnimation.prototype.updateStartHeight = function () {
        this.startHeight = this.domAdapter.computedHeight(this.element.nativeElement) || 0;
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
            template: "\n    <ng-content></ng-content>\n  ",
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
            styles: ["\n    :host {\n      display: block;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [ElementRef, DomAdapter])
    ], ClrExpandableAnimation);
    return ClrExpandableAnimation;
}());

var EXPANDABLE_ANIMATION_DIRECTIVES = [ClrExpandableAnimation];

var ClrExpandableAnimationModule = /** @class */ (function () {
    function ClrExpandableAnimationModule() {
    }
    ClrExpandableAnimationModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [EXPANDABLE_ANIMATION_DIRECTIVES],
            exports: [EXPANDABLE_ANIMATION_DIRECTIVES],
        })
    ], ClrExpandableAnimationModule);
    return ClrExpandableAnimationModule;
}());

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

var ClrSpinner = /** @class */ (function () {
    function ClrSpinner() {
    }
    Object.defineProperty(ClrSpinner.prototype, "spinnerClass", {
        /**
         * Default class for all spinners. This class is always true
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "inlineClass", {
        get: function () {
            return this._inline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrInline", {
        set: function (value) {
            this._inline = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "inverseClass", {
        get: function () {
            return this._inverse;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrInverse", {
        set: function (value) {
            this._inverse = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "smallClass", {
        get: function () {
            return this._small;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrSmall", {
        set: function (value) {
            this._small = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "mediumClass", {
        get: function () {
            if (this._small) {
                return false;
            }
            return this._medium;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "clrMedium", {
        set: function (value) {
            this._medium = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrSpinner.prototype, "setAriaLive", {
        get: function () {
            if (isBooleanAttributeSet(this.assertive)) {
                return 'assertive';
            }
            if (isBooleanAttributeSet(this.off)) {
                return 'off';
            }
            return 'polite';
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <ng-content></ng-content>\n  ",
            host: {
                '[attr.aria-live]': 'setAriaLive',
                '[attr.aria-busy]': 'true',
            }
        })
    ], ClrSpinner);
    return ClrSpinner;
}());

var CLR_SPINNER_DIRECTIVES = [ClrSpinner];
var ClrSpinnerModule = /** @class */ (function () {
    function ClrSpinnerModule() {
    }
    ClrSpinnerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_SPINNER_DIRECTIVES],
            exports: [CLR_SPINNER_DIRECTIVES],
        })
    ], ClrSpinnerModule);
    return ClrSpinnerModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CustomFilter = /** @class */ (function () {
    function CustomFilter() {
    }
    return CustomFilter;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
var StateDebouncer = /** @class */ (function () {
    function StateDebouncer() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
           * This is the lock, to only emit once all the changes have finished processing
           */
        this.nbChanges = 0;
    }
    Object.defineProperty(StateDebouncer.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    StateDebouncer.prototype.changeStart = function () {
        this.nbChanges++;
    };
    StateDebouncer.prototype.changeDone = function () {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    };
    StateDebouncer = __decorate([
        Injectable()
    ], StateDebouncer);
    return StateDebouncer;
}());

var Page = /** @class */ (function () {
    function Page(stateDebouncer) {
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
    Object.defineProperty(Page.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            var oldSize = this._size;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        get: function () {
            return this._totalItems || 0; // remains 0 if not set to avoid breaking change
        },
        set: function (total) {
            this._totalItems = total;
            // If we have less items than before, we might need to change the current page
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        get: function () {
            if (this._last) {
                return this._last;
            }
            // If the last page isn't known, we compute it from the last item's index
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        set: function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        get: function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (page) {
            if (page !== this._current) {
                this.stateDebouncer.changeStart();
                this._current = page;
                this._change.next(page);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    Page.prototype.previous = function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    /**
     * Moves to the next page if it exists
     */
    Page.prototype.next = function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            if (this._totalItems === 0) {
                return -1;
            }
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            var lastInPage = this.current * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the page size to 0
     */
    Page.prototype.resetPageSize = function () {
        this.size = 0;
    };
    Page = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StateDebouncer])
    ], Page);
    return Page;
}());

var FiltersProvider = /** @class */ (function () {
    function FiltersProvider(_page, stateDebouncer) {
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
    Object.defineProperty(FiltersProvider.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if at least one filter is currently active
     */
    FiltersProvider.prototype.hasActiveFilters = function () {
        var e_1, _a;
        try {
            // We do not use getActiveFilters() because this function will be called much more often
            // and stopping the loop early might be relevant.
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Returns a list of all currently active filters
     */
    FiltersProvider.prototype.getActiveFilters = function () {
        var e_2, _a;
        var ret = [];
        try {
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive()) {
                    ret.push(filter);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return ret;
    };
    /**
     * Registers a filter, and returns a deregistration function
     */
    FiltersProvider.prototype.add = function (filter) {
        var _this = this;
        var index = this._all.length;
        var subscription = filter.changes.subscribe(function () { return _this.resetPageAndEmitFilterChange([filter]); });
        var hasUnregistered = false;
        var registered = new RegisteredFilter(filter, function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    };
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    FiltersProvider.prototype.accepts = function (item) {
        var e_3, _a;
        try {
            for (var _b = __values(this._all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var filter = _c.value.filter;
                if (filter && filter.isActive() && !filter.accepts(item)) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return true;
    };
    FiltersProvider.prototype.resetPageAndEmitFilterChange = function (filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    FiltersProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Page, StateDebouncer])
    ], FiltersProvider);
    return FiltersProvider;
}());
var RegisteredFilter = /** @class */ (function () {
    function RegisteredFilter(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());

var DatagridFilterRegistrar = /** @class */ (function () {
    function DatagridFilterRegistrar(filters) {
        this.filters = filters;
    }
    Object.defineProperty(DatagridFilterRegistrar.prototype, "filter", {
        get: function () {
            return this.registered && this.registered.filter;
        },
        enumerable: true,
        configurable: true
    });
    DatagridFilterRegistrar.prototype.setFilter = function (filter) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter instanceof RegisteredFilter) {
            this.registered = filter;
        }
        else if (filter) {
            this.registered = this.filters.add(filter);
        }
    };
    DatagridFilterRegistrar.prototype.deleteFilter = function () {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    };
    DatagridFilterRegistrar.prototype.ngOnDestroy = function () {
        this.deleteFilter();
    };
    return DatagridFilterRegistrar;
}());

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
var NB_INSTANCES = 0;
var UNIQUE_ID = new InjectionToken('UNIQUE_ID');
function uniqueIdFactory() {
    return 'clr-id-' + NB_INSTANCES++;
}
var UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: uniqueIdFactory,
};

var ClrPopoverToggleService = /** @class */ (function () {
    function ClrPopoverToggleService() {
        /**
         *  Popovers might need to ignore click events on an element
         *  (eg: popover opens on focus on an input field. Clicks should be ignored in this case)
         */
        this._open = false;
        this._openChange = new Subject();
        this._openEventChange = new Subject();
    }
    Object.defineProperty(ClrPopoverToggleService.prototype, "openChange", {
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverToggleService.prototype, "openEvent", {
        get: function () {
            return this._openEvent;
        },
        set: function (event) {
            this._openEvent = event;
            this._openEventChange.next(event);
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverToggleService.prototype.getEventChange = function () {
        return this._openEventChange.asObservable();
    };
    Object.defineProperty(ClrPopoverToggleService.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sometimes, we need to remember the event that triggered the toggling to avoid loops.
     * This is for instance the case of components that open on a click, but close on a click outside.
     */
    ClrPopoverToggleService.prototype.toggleWithEvent = function (event) {
        this.openEvent = event;
        this.open = !this.open;
    };
    ClrPopoverToggleService = __decorate([
        Injectable()
    ], ClrPopoverToggleService);
    return ClrPopoverToggleService;
}());

/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
var ClrDatagridFilter = /** @class */ (function (_super) {
    __extends(ClrDatagridFilter, _super);
    function ClrDatagridFilter(_filters, commonStrings, smartToggleService, platformId, popoverId) {
        var _this = _super.call(this, _filters) || this;
        _this.commonStrings = commonStrings;
        _this.smartToggleService = smartToggleService;
        _this.platformId = platformId;
        _this.popoverId = popoverId;
        _this.subs = [];
        // Smart Popover
        _this.smartPosition = {
            axis: ClrAxis.VERTICAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.END,
            content: ClrAlignment.END,
        };
        _this.openChange = new EventEmitter(false);
        _this.subs.push(smartToggleService.openChange.subscribe(function (change) {
            _this.open = change;
        }));
        return _this;
    }
    ClrDatagridFilter_1 = ClrDatagridFilter;
    Object.defineProperty(ClrDatagridFilter.prototype, "open", {
        get: function () {
            return this.smartToggleService.open;
        },
        set: function (open) {
            var boolOpen = !!open;
            if (boolOpen !== this.open) {
                this.smartToggleService.open = !!open;
                this.openChange.emit(!!open);
                if (!boolOpen && isPlatformBrowser(this.platformId)) {
                    this.anchor.nativeElement.focus();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "customFilter", {
        set: function (filter) {
            this.setFilter(filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         */
        get: function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridFilter.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    var ClrDatagridFilter_1;
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
            template: "\n      <button class=\"datagrid-filter-toggle\"\n              type=\"button\"\n              #anchor\n              clrPopoverAnchor\n              clrPopoverOpenCloseButton\n              [class.datagrid-filter-open]=\"open\" \n              [class.datagrid-filtered]=\"active\">\n          <clr-icon [attr.shape]=\"active ? 'filter-grid-circle': 'filter-grid'\" class=\"is-solid\"></clr-icon>\n      </button>\n\n      <div class=\"datagrid-filter\"\n           [id]=\"popoverId\"\n           clrFocusTrap\n           *clrPopoverContent=\"open at smartPosition; outsideClickToClose: true; scrollToClose: true\">\n          <div class=\"datagrid-filter-close-wrapper\">\n              <button type=\"button\" class=\"close\" clrPopoverCloseButton>\n                  <clr-icon shape=\"close\" [attr.title]=\"commonStrings.keys.close\"></clr-icon>\n              </button>\n          </div>\n\n          <ng-content></ng-content>\n      </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(3, Inject(PLATFORM_ID)),
        __param(4, Inject(UNIQUE_ID)),
        __metadata("design:paramtypes", [FiltersProvider,
            ClrCommonStringsService,
            ClrPopoverToggleService,
            Object, String])
    ], ClrDatagridFilter);
    return ClrDatagridFilter;
}(DatagridFilterRegistrar));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 */
var NestedProperty = /** @class */ (function () {
    function NestedProperty(prop) {
        this.prop = prop;
        if (prop.indexOf('.') >= 0) {
            this.splitProp = prop.split('.');
        }
    }
    // Safe getter for a deep object property, will not throw an error but return
    // undefined if one of the intermediate properties is null or undefined.
    NestedProperty.prototype.getPropValue = function (item) {
        var e_1, _a;
        if (this.splitProp) {
            var value = item;
            try {
                for (var _b = __values(this.splitProp), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var nestedProp = _c.value;
                    if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                        return undefined;
                    }
                    value = value[nestedProp];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return value;
        }
        else {
            return item[this.prop];
        }
    };
    return NestedProperty;
}());

var DatagridPropertyStringFilter = /** @class */ (function () {
    function DatagridPropertyStringFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    DatagridPropertyStringFilter.prototype.accepts = function (item, search) {
        var propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === 'undefined') {
            return false;
        }
        else if (this.exact) {
            return ('' + propValue).toLowerCase() === search;
        }
        else {
            return ('' + propValue).toLowerCase().indexOf(search) >= 0;
        }
    };
    return DatagridPropertyStringFilter;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridStringFilterImpl = /** @class */ (function () {
    function DatagridStringFilterImpl(filterFn) {
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
    Object.defineProperty(DatagridStringFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "value", {
        get: function () {
            return this._rawValue;
        },
        /**
         * Common setter for the input value
         */
        set: function (value) {
            if (!value) {
                value = '';
            }
            if (value !== this._rawValue) {
                this._rawValue = value;
                this._lowerCaseValue = value.toLowerCase().trim();
                this._changes.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "lowerCaseValue", {
        get: function () {
            return this._lowerCaseValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     */
    DatagridStringFilterImpl.prototype.isActive = function () {
        return !!this.value;
    };
    /**
     * Tests if an item matches a search text
     */
    DatagridStringFilterImpl.prototype.accepts = function (item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    };
    Object.defineProperty(DatagridStringFilterImpl.prototype, "state", {
        get: function () {
            if (this.filterFn instanceof DatagridPropertyStringFilter) {
                return {
                    property: this.filterFn.prop,
                    value: this.value,
                };
            }
            return this;
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilterImpl.prototype.equals = function (other) {
        if (other instanceof DatagridStringFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyStringFilter) {
                return (this.filterFn instanceof DatagridPropertyStringFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.value === this.value);
            }
            return other === this;
        }
        return false;
    };
    return DatagridStringFilterImpl;
}());

var DatagridStringFilter = /** @class */ (function (_super) {
    __extends(DatagridStringFilter, _super);
    function DatagridStringFilter(filters, domAdapter, smartToggleService) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        _this.smartToggleService = smartToggleService;
        _this.subs = [];
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    DatagridStringFilter_1 = DatagridStringFilter;
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        /**
         * Customizable filter logic based on a search text
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridStringFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subs.push(this.smartToggleService.openChange.subscribe(function (openChange) {
            _this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(function () {
                _this.domAdapter.focus(_this.input.nativeElement);
            });
        }));
    };
    DatagridStringFilter.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        /**
         * Common setter for the input value
         */
        get: function () {
            return this.filter.value;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    var DatagridStringFilter_1;
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
            template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" class=\"clr-input\" />\n        </clr-dg-filter>\n    "
        }),
        __metadata("design:paramtypes", [FiltersProvider,
            DomAdapter,
            ClrPopoverToggleService])
    ], DatagridStringFilter);
    return DatagridStringFilter;
}(DatagridFilterRegistrar));

var DatagridPropertyNumericFilter = /** @class */ (function () {
    function DatagridPropertyNumericFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    DatagridPropertyNumericFilter.prototype.accepts = function (item, low, high) {
        var propValue = this.nestedProp.getPropValue(item);
        if (low !== null && propValue < low) {
            return false;
        }
        if (high !== null && propValue > high) {
            return false;
        }
        return true;
    };
    return DatagridPropertyNumericFilter;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridNumericFilterImpl = /** @class */ (function () {
    function DatagridNumericFilterImpl(filterFn) {
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
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "value", {
        /**
         * Common setters for the input values, including individual limits and
         * both at the same time.  Value is singular to make the interface similar
         * to the built-in string filter.
         */
        get: function () {
            return [this._low, this._high];
        },
        set: function (vals) {
            var low = vals[0];
            var high = vals[1];
            if (low !== this._low || high !== this._high) {
                this._low = low;
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "low", {
        get: function () {
            return this._low;
        },
        set: function (low) {
            if (low !== this._low) {
                this._low = low;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "high", {
        get: function () {
            return this._high;
        },
        set: function (high) {
            if (high !== this._high) {
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     */
    DatagridNumericFilterImpl.prototype.isActive = function () {
        return this._low !== null || this.high !== null;
    };
    /**
     * Tests if an item matches a search text
     */
    DatagridNumericFilterImpl.prototype.accepts = function (item) {
        // We have a filter function in case someone wants to implement a numeric
        // filter that always passes nulls or similar
        return this.filterFn.accepts(item, this._low, this._high);
    };
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "state", {
        get: function () {
            if (this.filterFn instanceof DatagridPropertyNumericFilter) {
                return {
                    property: this.filterFn.prop,
                    low: this._low,
                    high: this._high,
                };
            }
            return this;
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilterImpl.prototype.equals = function (other) {
        if (other instanceof DatagridNumericFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyNumericFilter) {
                return (this.filterFn instanceof DatagridPropertyNumericFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.low === this._low &&
                    other.high === this._high);
            }
        }
    };
    return DatagridNumericFilterImpl;
}());

var DatagridNumericFilter = /** @class */ (function (_super) {
    __extends(DatagridNumericFilter, _super);
    function DatagridNumericFilter(filters, domAdapter, commonStrings, popoverToggleService) {
        var _this = _super.call(this, filters) || this;
        _this.domAdapter = domAdapter;
        _this.commonStrings = commonStrings;
        _this.popoverToggleService = popoverToggleService;
        _this.subscriptions = [];
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new EventEmitter();
        return _this;
    }
    DatagridNumericFilter_1 = DatagridNumericFilter;
    DatagridNumericFilter.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "customNumericFilter", {
        /**
         * Customizable filter logic based on high and low values
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridNumericFilterImpl(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridNumericFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.popoverToggleService.openChange.subscribe(function (openChange) {
            _this.open = openChange;
            // The timeout in used because when this executes, the input isn't displayed.
            setTimeout(function () {
                _this.domAdapter.focus(_this.input.nativeElement);
            });
        }));
    };
    Object.defineProperty(DatagridNumericFilter.prototype, "value", {
        /**
         * Common setter for the input values
         */
        get: function () {
            return [this.filter.low, this.filter.high];
        },
        set: function (values) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "low", {
        get: function () {
            if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
                return this.filter.low;
            }
            else {
                // There's not a low limit
                return null;
            }
        },
        set: function (low) {
            if (typeof low === 'number' && low !== this.filter.low) {
                this.filter.low = low;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof low !== 'number') {
                this.filter.low = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilter.prototype, "high", {
        get: function () {
            if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
                return this.filter.high;
            }
            else {
                // There's not a high limit
                return null;
            }
        },
        set: function (high) {
            if (typeof high === 'number' && high !== this.filter.high) {
                this.filter.high = high;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
            else if (typeof high !== 'number') {
                this.filter.high = null;
                this.filterValueChange.emit([this.filter.low, this.filter.high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    var DatagridNumericFilter_1;
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
            template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <input class=\"datagrid-numeric-filter-input\" #input_low type=\"number\" name=\"low\" [(ngModel)]=\"low\" \n                   [placeholder]=\"commonStrings.keys.minValue\" [attr.aria-label]=\"commonStrings.keys.minValue\" />\n                <span class=\"datagrid-filter-input-spacer\"></span>\n            <input class=\"datagrid-numeric-filter-input\" #input_high type=\"number\" name=\"high\" [(ngModel)]=\"high\" \n                   [placeholder]=\"commonStrings.keys.maxValue\" [attr.aria-label]=\"commonStrings.keys.maxValue\" />\n        </clr-dg-filter>\n    "
        }),
        __metadata("design:paramtypes", [FiltersProvider,
            DomAdapter,
            ClrCommonStringsService,
            ClrPopoverToggleService])
    ], DatagridNumericFilter);
    return DatagridNumericFilter;
}(DatagridFilterRegistrar));

var OompaLoompa = /** @class */ (function () {
    // FIXME: Request Injector once we move to Angular 4.2+, it'll allow easier refactors
    function OompaLoompa(cdr, willyWonka) {
        var _this = this;
        this.subscription = willyWonka.chocolate.subscribe(function () {
            if (_this.latestFlavor !== _this.flavor) {
                cdr.detectChanges();
            }
        });
    }
    OompaLoompa.prototype.ngAfterContentChecked = function () {
        this.latestFlavor = this.flavor;
    };
    OompaLoompa.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return OompaLoompa;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var RowActionService = /** @class */ (function () {
    function RowActionService() {
        this.actionableCount = 0;
    }
    RowActionService.prototype.register = function () {
        this.actionableCount++;
    };
    RowActionService.prototype.unregister = function () {
        this.actionableCount--;
    };
    Object.defineProperty(RowActionService.prototype, "hasActionableRow", {
        /**
         * false means no rows with action
         */
        get: function () {
            return this.actionableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    RowActionService = __decorate([
        Injectable()
    ], RowActionService);
    return RowActionService;
}());

/*
 * After a conversation with the Angular core team, it turns out we don't have much of a choice for our
 * declarative API, we need to fight against change detection and its one-way flow. This is
 * currently the least dirty solution to do what we want.
 *
 * Do not modify or even use this class unless you know exactly what you're doing.
 * It has the potential to trigger change detection loops or kill app performances.
 */
var WillyWonka = /** @class */ (function () {
    function WillyWonka() {
        this._chocolate = new Subject();
    }
    Object.defineProperty(WillyWonka.prototype, "chocolate", {
        get: function () {
            return this._chocolate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    WillyWonka.prototype.ngAfterViewChecked = function () {
        this._chocolate.next();
    };
    return WillyWonka;
}());

var DatagridWillyWonka = /** @class */ (function (_super) {
    __extends(DatagridWillyWonka, _super);
    function DatagridWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatagridWillyWonka = __decorate([
        Directive({ selector: 'clr-datagrid' })
    ], DatagridWillyWonka);
    return DatagridWillyWonka;
}(WillyWonka));

var ActionableOompaLoompa = /** @class */ (function (_super) {
    __extends(ActionableOompaLoompa, _super);
    function ActionableOompaLoompa(cdr, willyWonka, rowActions) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.rowActions = rowActions;
        return _this;
    }
    Object.defineProperty(ActionableOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.rowActions.hasActionableRow;
        },
        enumerable: true,
        configurable: true
    });
    ActionableOompaLoompa = __decorate([
        Directive({ selector: 'clr-datagrid, clr-dg-row' }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef, DatagridWillyWonka, RowActionService])
    ], ActionableOompaLoompa);
    return ActionableOompaLoompa;
}(OompaLoompa));

var ExpandableRowsCount = /** @class */ (function () {
    function ExpandableRowsCount() {
        this.expandableCount = 0;
    }
    ExpandableRowsCount.prototype.register = function () {
        this.expandableCount++;
    };
    ExpandableRowsCount.prototype.unregister = function () {
        this.expandableCount--;
    };
    Object.defineProperty(ExpandableRowsCount.prototype, "hasExpandableRow", {
        /**
         * false means no rows with action
         */
        get: function () {
            return this.expandableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    ExpandableRowsCount = __decorate([
        Injectable()
    ], ExpandableRowsCount);
    return ExpandableRowsCount;
}());

var ExpandableOompaLoompa = /** @class */ (function (_super) {
    __extends(ExpandableOompaLoompa, _super);
    function ExpandableOompaLoompa(cdr, willyWonka, expandableCount) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-dg-row should only be used inside of a clr-datagrid');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expandableCount = expandableCount;
        return _this;
    }
    Object.defineProperty(ExpandableOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expandableCount.hasExpandableRow;
        },
        enumerable: true,
        configurable: true
    });
    ExpandableOompaLoompa = __decorate([
        Directive({ selector: 'clr-datagrid, clr-dg-row' }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            DatagridWillyWonka,
            ExpandableRowsCount])
    ], ExpandableOompaLoompa);
    return ExpandableOompaLoompa;
}(OompaLoompa));

var DatagridPropertyComparator = /** @class */ (function () {
    function DatagridPropertyComparator(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    DatagridPropertyComparator.prototype.compare = function (a, b) {
        var propA = this.nestedProp.getPropValue(a);
        var propB = this.nestedProp.getPropValue(b);
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
    };
    return DatagridPropertyComparator;
}());

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

var Sort = /** @class */ (function () {
    function Sort(stateDebouncer) {
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
    Object.defineProperty(Sort.prototype, "comparator", {
        get: function () {
            return this._comparator;
        },
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._comparator = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sort.prototype, "reverse", {
        get: function () {
            return this._reverse;
        },
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._reverse = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Sort.prototype.emitChange = function () {
        this._change.next(this);
    };
    Object.defineProperty(Sort.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     * @memberof Sort
     */
    Sort.prototype.toggle = function (sortBy, forceReverse) {
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
    };
    /**
     * Clears the current sorting order
     */
    Sort.prototype.clear = function () {
        this.comparator = null;
    };
    /**
     * Compares two objects according to the current comparator
     */
    Sort.prototype.compare = function (a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    };
    Sort = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StateDebouncer])
    ], Sort);
    return Sort;
}());

var WrappedColumn = /** @class */ (function () {
    function WrappedColumn() {
        this._dynamic = false;
    }
    WrappedColumn.prototype.ngAfterViewInit = function () {
        // Create the cells view in memory, not the DOM.
        this.columnView = this.templateRef.createEmbeddedView(null);
    };
    __decorate([
        ViewChild('columnPortal', { static: false }),
        __metadata("design:type", TemplateRef)
    ], WrappedColumn.prototype, "templateRef", void 0);
    WrappedColumn = __decorate([
        Component({
            selector: 'dg-wrapped-column',
            template: "        \n        <ng-template #columnPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedColumn);
    return WrappedColumn;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
var ClrPopoverEventsService = /** @class */ (function () {
    function ClrPopoverEventsService(renderer, smartOpenService, document) {
        var _this = this;
        this.renderer = renderer;
        this.smartOpenService = smartOpenService;
        this.document = document;
        this.outsideClickClose = true;
        this.scrollToClose = true;
        this.subscriptions = [];
        this.subscriptions.push(smartOpenService.openChange.subscribe(function (open) {
            if (open) {
                _this.addEscapeListener();
                _this.addClickListener();
                _this.addScrollListener();
            }
            else {
                _this.removeAllEventListeners();
            }
        }), smartOpenService.getEventChange().subscribe(function (event) {
            // Remember the event that was used to open the content
            _this.ignoredEvent = event;
        }));
    }
    ClrPopoverEventsService.prototype.addScrollListener = function () {
        var _this = this;
        if (this.scrollToClose) {
            this.documentScroller = fromEvent(this.document, 'scroll', { capture: true });
            this.scrollSubscription = this.documentScroller
                .pipe(filter(this.testForSmartPopoverContentContainer))
                .subscribe(function () {
                _this.smartOpenService.open = false;
                _this.setAnchorFocus();
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
    };
    ClrPopoverEventsService.prototype.removeScrollListener = function () {
        if (this.documentScroller) {
            this.scrollSubscription.unsubscribe();
            delete this.documentScroller;
        }
    };
    ClrPopoverEventsService.prototype.testForSmartPopoverContentContainer = function (event) {
        // Filter for the documentScroller observable event targets
        var target = event.target;
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
    };
    ClrPopoverEventsService.prototype.addClickListener = function () {
        var _this = this;
        if (this.outsideClickClose) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', function (event) {
                if (event === _this.ignoredEvent) {
                    // Here we ignore the opening click event (w/o this content opens and immediately closes.
                    delete _this.ignoredEvent;
                }
                else {
                    _this.smartOpenService.open = false;
                    // Rather than a complex change to the focus trap I put focus on the element that was clicked
                    var clickedElement = event.target;
                    clickedElement.focus();
                }
            });
        }
    };
    ClrPopoverEventsService.prototype.removeClickListener = function () {
        if (this.outsideClickClose) {
            delete this.ignoredEvent;
            if (this.documentClickListener) {
                this.documentClickListener();
                delete this.documentClickListener;
            }
        }
    };
    ClrPopoverEventsService.prototype.addEscapeListener = function () {
        var _this = this;
        this.escapeListener = this.renderer.listen(this.document, 'keydown.escape', function (event) {
            _this.smartOpenService.open = false;
            _this.setAnchorFocus();
        });
    };
    ClrPopoverEventsService.prototype.removeEscapeListener = function () {
        if (this.escapeListener) {
            this.escapeListener();
            delete this.escapeListener;
        }
    };
    Object.defineProperty(ClrPopoverEventsService.prototype, "anchorButtonRef", {
        get: function () {
            return this._anchorButtonRef;
        },
        set: function (ref) {
            this._anchorButtonRef = ref;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverEventsService.prototype, "closeButtonRef", {
        get: function () {
            return this._closeButtonRef;
        },
        set: function (ref) {
            this._closeButtonRef = ref;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverEventsService.prototype.setCloseFocus = function () {
        this._closeButtonRef.nativeElement.focus();
    };
    ClrPopoverEventsService.prototype.setAnchorFocus = function () {
        this.anchorButtonRef.nativeElement.focus();
    };
    Object.defineProperty(ClrPopoverEventsService.prototype, "contentRef", {
        get: function () {
            return this._contentRef;
        },
        set: function (host) {
            this._contentRef = host;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverEventsService.prototype.removeAllEventListeners = function () {
        this.removeScrollListener();
        this.removeClickListener();
        this.removeEscapeListener();
    };
    ClrPopoverEventsService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.removeAllEventListeners();
    };
    ClrPopoverEventsService = __decorate([
        Injectable(),
        __param(2, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Renderer2,
            ClrPopoverToggleService,
            HTMLDocument])
    ], ClrPopoverEventsService);
    return ClrPopoverEventsService;
}());

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
var flipSides = function (position) {
    return __assign({}, position, { side: -1 * position.side });
};
var nudgeContent = function (position, forward) {
    var nextAlignment = position.content + (forward ? 0.5 : -0.5);
    if (nextAlignment < 0 || nextAlignment > 1) {
        return position;
    }
    else {
        return __assign({}, position, { content: nextAlignment });
    }
};
function flipSidesAndNudgeContent(flip, nudge, nudgeBack) {
    return function (position) { return nudge(flip(position), nudgeBack); };
}
function align(position, anchor, content) {
    var xDiff = anchor.left;
    var yDiff = anchor.top;
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
    var horizontalOffset = 0;
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
    var verticalOffset = 0;
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
    var violations = [];
    var mockCoords = {
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

var ClrPopoverPositionService = /** @class */ (function () {
    function ClrPopoverPositionService(eventService, platformId) {
        this.eventService = eventService;
        this.platformId = platformId;
    }
    Object.defineProperty(ClrPopoverPositionService.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position = position;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverPositionService.prototype.alignContent = function (content) {
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
        var visibilityViolations = testVisibility(this.contentOffsets, this.currentContentCoords);
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
        var errorSum = visibilityViolations.reduce(function (count, current) {
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
    };
    ClrPopoverPositionService.prototype.handleVerticalAxisOneViolation = function (errorSum) {
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
    };
    ClrPopoverPositionService.prototype.handleVerticalAxisTwoViolations = function (errorSum) {
        switch (errorSum) {
            // We know there are two violations. We can use the errorSum to determine which combination of sides were
            // violated and handle appropriately.
            case 5: {
                // TOP(3)+RIGHT(2) is case 5. We need to flip sides and nudge the content to the left
                var flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 4: {
                //TOP(3)+LEFT(1) is case 4, we need to flip sides and nudge content to the right
                var flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
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
                var flipAndNudgeLeft = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeLeft(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            case 1: {
                // BOTTOM(0)+LEFT(1) is case 1. We need to flip sides and nudge to the right
                var flipAndNudgeRight = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
                this.contentOffsets = align(flipAndNudgeRight(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    };
    ClrPopoverPositionService.prototype.handleHorizontalAxisOneViolation = function (errorSum) {
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
    };
    ClrPopoverPositionService.prototype.handleHorizontalAxisTwoViolations = function (errorSum) {
        switch (errorSum) {
            case 5:
            case 4: {
                // TOP(3)+LEFT(1) is case 4.
                // TOP(3)+RIGHT(2) is case 5.
                // In both of these cases we need to flip sides and nudge content down
                var flipAndNudgeDown = flipSidesAndNudgeContent(flipSides, nudgeContent, false);
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
                var flipAndNudgeUp = flipSidesAndNudgeContent(flipSides, nudgeContent, true);
                this.contentOffsets = align(flipAndNudgeUp(this.position), this.currentAnchorCoords, this.currentContentCoords);
                break;
            }
            default: {
                break;
            }
        }
    };
    ClrPopoverPositionService = __decorate([
        Injectable(),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ClrPopoverEventsService, Object])
    ], ClrPopoverPositionService);
    return ClrPopoverPositionService;
}());

var ClrDatagridColumn = /** @class */ (function (_super) {
    __extends(ClrDatagridColumn, _super);
    function ClrDatagridColumn(_sort, filters, vcr, commonStrings) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this.vcr = vcr;
        _this.commonStrings = commonStrings;
        /*
          * What type is this column?  This defaults to STRING, but can also be
          * set to NUMBER.  Unsupported types default to STRING. Users can set it
          * via the [clrDgColType] input by setting it to 'string' or 'number'.
          */
        // TODO: We might want to make this an enum in the future
        _this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        _this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        _this.customFilter = false;
        _this.filterValueChange = new EventEmitter();
        _this._sortSubscription = _sort.change.subscribe(function (sort) {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (_this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== _this._sortBy) {
                _this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                _this.sortOrderChange.emit(_this._sortOrder);
                // removes the sortIcon when column becomes unsorted
                _this.sortIcon = null;
            }
            // deprecated: to be removed - START
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        return _this;
    }
    ClrDatagridColumn.prototype.ngOnDestroy = function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "field", {
        get: function () {
            return this._field;
        },
        set: function (field) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (comparator) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortable", {
        /**
         * Indicates if the column is sortable
         */
        get: function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sorted", {
        get: function () {
            return this._sorted;
        },
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        set: function (value) {
            if (!value && this.sorted) {
                this._sorted = false;
                this._sort.clear();
            }
            else if (value && !this.sorted) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "ariaSort", {
        get: function () {
            switch (this._sortOrder) {
                default:
                case ClrDatagridSortOrder.UNSORTED:
                    return 'none';
                case ClrDatagridSortOrder.ASC:
                    return 'ascending';
                case ClrDatagridSortOrder.DESC:
                    return 'descending';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the datagrid based on this column
     */
    ClrDatagridColumn.prototype.sort = function (reverse) {
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
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "projectedFilter", {
        set: function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "filterValue", {
        get: function () {
            if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
                return this.filter.value;
            }
        },
        set: function (newValue) {
            if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
                this.updateFilterValue = newValue;
                this.filterValueChange.emit(this.filter.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumn.prototype, "updateFilterValue", {
        set: function (newValue) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumn.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    };
    Object.defineProperty(ClrDatagridColumn.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n      <div class=\"datagrid-column-flex\">\n          <!-- I'm really not happy with that select since it's not very scalable -->\n          <ng-content select=\"clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter\"></ng-content>\n\n          <clr-dg-string-filter\n                  *ngIf=\"field && !customFilter && (colType=='string')\"\n                  [clrDgStringFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n          \n          <clr-dg-numeric-filter\n                  *ngIf=\"field && !customFilter && (colType=='number')\"\n                  [clrDgNumericFilter]=\"registered\"\n                  [(clrFilterValue)]=\"filterValue\"></clr-dg-numeric-filter>\n\n          <ng-template #columnTitle>\n              <ng-content></ng-content>\n          </ng-template>\n\n          <button \n            class=\"datagrid-column-title\" \n            [attr.aria-label]=\"commonStrings.keys.sortColumn\"\n            *ngIf=\"sortable\" \n            (click)=\"sort()\" \n            type=\"button\">\n              <ng-container  *ngTemplateOutlet=\"columnTitle\"></ng-container>\n              <clr-icon\n                      *ngIf=\"sortIcon\"\n                      [attr.shape]=\"sortIcon\"\n                      class=\"sort-icon\"></clr-icon>\n          </button>\n\n          <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n              <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n          </span>\n\n            <clr-dg-column-separator></clr-dg-column-separator>\n        </div>\n    ",
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
    return ClrDatagridColumn;
}(DatagridFilterRegistrar));

var Items = /** @class */ (function () {
    function Items(_filters, _sort, _page) {
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
        this.trackBy = function (index, item) { return item; };
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
    Items.prototype.destroy = function () {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    };
    Object.defineProperty(Items.prototype, "smart", {
        get: function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.smartenUp = function () {
        var _this = this;
        this._smart = true;
        /*
             * These observers trigger a chain of function: filter -> sort -> paginate
             * An observer up the chain re-triggers all the operations that follow it.
             */
        this._filtersSub = this._filters.change.subscribe(function () { return _this._filterItems(); });
        this._sortSub = this._sort.change.subscribe(function () {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(function () { return _this._changePage(); });
    };
    Object.defineProperty(Items.prototype, "all", {
        get: function () {
            return this._all;
        },
        set: function (items) {
            this._all = items;
            this.emitAllChanges(items);
            if (this.smart) {
                this._filterItems();
            }
            else {
                this._displayed = items;
                this.emitChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Manually recompute the list of displayed items
     */
    Items.prototype.refresh = function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        get: function () {
            // Ideally we could return an immutable array, but we don't have it in Clarity yet.
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitChange = function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Items.prototype.emitAllChanges = function (items) {
        this._allChanges.next(items);
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        get: function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        /**
         * Checks if we don't have data to process yet, to abort early operations
         */
        get: function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * FiltersProvider items from the raw list
     */
    Items.prototype._filterItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(function (item) { return _this._filters.accepts(item); });
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    /**
     * Sorts items in the filtered list
     */
    Items.prototype._sortItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort(function (a, b) { return _this._sort.compare(a, b); });
        }
        this._changePage();
    };
    /**
     * Extracts the current page from the sorted list
     */
    Items.prototype._changePage = function () {
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
    };
    Items = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FiltersProvider, Sort, Page])
    ], Items);
    return Items;
}());

var ClrDatagridItems = /** @class */ (function () {
    function ClrDatagridItems(template, differs, items, vcr) {
        var _this = this;
        this.template = template;
        this.differs = differs;
        this.items = items;
        this.vcr = vcr;
        this.differ = null;
        this.subscriptions = [];
        items.smartenUp();
        this.iterableProxy = new NgForOf(this.vcr, this.template, this.differs);
        this.subscriptions.push(items.change.subscribe(function (newItems) {
            _this.iterableProxy.ngForOf = newItems;
            _this.iterableProxy.ngDoCheck();
        }));
    }
    Object.defineProperty(ClrDatagridItems.prototype, "rawItems", {
        set: function (items) {
            this._rawItems = items ? items : []; // local copy for ngOnChange diffing
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridItems.prototype, "trackBy", {
        set: function (value) {
            this.iterableProxy.ngForTrackBy = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridItems.prototype.ngDoCheck = function () {
        if (!this.differ) {
            this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
        }
        if (this.differ) {
            var changes = this.differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this.items.all = this._rawItems;
            }
        }
    };
    ClrDatagridItems.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrDatagridItems;
}());

var ClrDatagridPlaceholder = /** @class */ (function () {
    function ClrDatagridPlaceholder(items) {
        this.items = items;
    }
    Object.defineProperty(ClrDatagridPlaceholder.prototype, "emptyDatagrid", {
        /**
         * Tests if the datagrid is empty, meaning it doesn't contain any items
         */
        get: function () {
            return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridPlaceholder = __decorate([
        Component({
            selector: 'clr-dg-placeholder',
            template: "\n        <div\n            class=\"datagrid-placeholder\"\n            [class.datagrid-empty]=\"emptyDatagrid\">\n                <div class=\"datagrid-placeholder-image\" *ngIf=\"emptyDatagrid\"></div>\n                <ng-content *ngIf=\"emptyDatagrid\"></ng-content>\n        </div>\n    ",
            host: { '[class.datagrid-placeholder-container]': 'true' }
        }),
        __metadata("design:paramtypes", [Items])
    ], ClrDatagridPlaceholder);
    return ClrDatagridPlaceholder;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var POPOVER_HOST_ANCHOR = new InjectionToken('POPOVER_HOST_ANCHOR');

/*
 *  Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var SignpostIdService = /** @class */ (function () {
    function SignpostIdService() {
        this._id = new Subject();
    }
    SignpostIdService.prototype.setId = function (id) {
        this._id.next(id);
    };
    Object.defineProperty(SignpostIdService.prototype, "id", {
        get: function () {
            return this._id.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    SignpostIdService = __decorate([
        Injectable()
    ], SignpostIdService);
    return SignpostIdService;
}());

var ClrSignpostTrigger = /** @class */ (function () {
    function ClrSignpostTrigger(ifOpenService, renderer, el, commonStrings, signpostIdService, platformId) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.commonStrings = commonStrings;
        this.signpostIdService = signpostIdService;
        this.platformId = platformId;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe(function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, 'active');
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, 'active');
                if (isPlatformBrowser(_this.platformId)) {
                    _this.el.nativeElement.focus();
                }
            }
            _this.ariaExpanded = isOpen;
        }), this.signpostIdService.id.subscribe(function (idChange) { return (_this.ariaControl = idChange); }));
    }
    ClrSignpostTrigger.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**********
     *
     * @description
     * click handler for the ClrSignpost trigger button used to hide/show ClrSignpostContent.
     */
    ClrSignpostTrigger.prototype.onSignpostTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
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
    return ClrSignpostTrigger;
}());

var ClrSignpost = /** @class */ (function () {
    function ClrSignpost(commonStrings) {
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
    Object.defineProperty(ClrSignpost.prototype, "customTrigger", {
        /**********
         * @property signPostTrigger
         *
         * @description
         * Uses ContentChild to check for a user supplied element with the ClrSignpostTrigger on it.
         *
         */
        set: function (trigger) {
            this.useCustomTrigger = !!trigger;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ContentChild(ClrSignpostTrigger, { static: false }),
        __metadata("design:type", ClrSignpostTrigger),
        __metadata("design:paramtypes", [ClrSignpostTrigger])
    ], ClrSignpost.prototype, "customTrigger", null);
    ClrSignpost = __decorate([
        Component({
            selector: 'clr-signpost',
            template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\" [attr.title]=\"commonStrings.keys.info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
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
    return ClrSignpost;
}());

var WrappedCell = /** @class */ (function () {
    function WrappedCell() {
        this._dynamic = false;
    }
    WrappedCell.prototype.ngAfterViewInit = function () {
        this.cellView = this.templateRef.createEmbeddedView(null);
    };
    __decorate([
        ViewChild('cellPortal', { static: false }),
        __metadata("design:type", TemplateRef)
    ], WrappedCell.prototype, "templateRef", void 0);
    WrappedCell = __decorate([
        Component({
            selector: 'dg-wrapped-cell',
            template: "        \n        <ng-template #cellPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedCell);
    return WrappedCell;
}());

var ClrDatagridCell = /** @class */ (function () {
    function ClrDatagridCell(vcr) {
        this.vcr = vcr;
    }
    ClrDatagridCell.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedCell, this.vcr);
    };
    Object.defineProperty(ClrDatagridCell.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedCell, this.vcr).cellView;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ContentChildren(ClrSignpost),
        __metadata("design:type", QueryList)
    ], ClrDatagridCell.prototype, "signpost", void 0);
    ClrDatagridCell = __decorate([
        Component({
            selector: 'clr-dg-cell',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.datagrid-cell]': 'true',
                '[class.datagrid-signpost-trigger]': 'signpost.length > 0',
                role: 'gridcell',
            }
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], ClrDatagridCell);
    return ClrDatagridCell;
}());

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
var DatagridRenderOrganizer = /** @class */ (function () {
    function DatagridRenderOrganizer() {
        this._renderStep = new Subject();
        this.alreadySized = false;
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "renderStep", {
        get: function () {
            return this._renderStep.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridRenderOrganizer.prototype.filterRenderSteps = function (step) {
        return this.renderStep.pipe(filter(function (testStep) { return step === testStep; }));
    };
    DatagridRenderOrganizer.prototype.resize = function () {
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_ON);
        if (this.alreadySized) {
            this._renderStep.next(DatagridRenderStep.CLEAR_WIDTHS);
        }
        this._renderStep.next(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS);
        this._renderStep.next(DatagridRenderStep.ALIGN_COLUMNS);
        this.alreadySized = true;
        this._renderStep.next(DatagridRenderStep.CALCULATE_MODE_OFF);
    };
    DatagridRenderOrganizer = __decorate([
        Injectable()
    ], DatagridRenderOrganizer);
    return DatagridRenderOrganizer;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DisplayModeService = /** @class */ (function () {
    function DisplayModeService(renderOrganizer) {
        var _this = this;
        this.subscriptions = [];
        this._view = new BehaviorSubject(DatagridDisplayMode.DISPLAY);
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_ON)
            .subscribe(function () { return _this._view.next(DatagridDisplayMode.CALCULATE); }));
        this.subscriptions.push(renderOrganizer
            .filterRenderSteps(DatagridRenderStep.CALCULATE_MODE_OFF)
            .subscribe(function () { return _this._view.next(DatagridDisplayMode.DISPLAY); }));
    }
    Object.defineProperty(DisplayModeService.prototype, "view", {
        get: function () {
            return this._view.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DisplayModeService.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DisplayModeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DatagridRenderOrganizer])
    ], DisplayModeService);
    return DisplayModeService;
}());

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

var nbSelection = 0;
var Selection = /** @class */ (function () {
    function Selection(_items, _filters) {
        var _this = this;
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
        this.subscriptions.push(this._filters.change.subscribe(function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        }));
        this.subscriptions.push(this._items.allChanges.subscribe(function (updatedItems) {
            switch (_this.selectionType) {
                case SelectionType.None: {
                    break;
                }
                case SelectionType.Single: {
                    var newSingle_1;
                    var trackBy_1 = _this._items.trackBy;
                    var selectionUpdated_1 = false;
                    // if the currentSingle has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.currentSingle && !_this.prevSingleSelectionRef) {
                        if (_this._items.all && _this._items.trackBy) {
                            var lookup = _this._items.all.findIndex(function (maybe) { return maybe === _this.currentSingle; });
                            _this.prevSingleSelectionRef = _this._items.trackBy(lookup, _this.currentSingle);
                        }
                    }
                    updatedItems.forEach(function (item, index) {
                        var ref = trackBy_1(index, item);
                        // If one of the updated items is the previously selectedSingle, set it as the new one
                        if (_this.prevSingleSelectionRef === ref) {
                            newSingle_1 = item;
                            selectionUpdated_1 = true;
                        }
                    });
                    // If we're using smart datagrids, we expect all items to be present in the updatedItems array.
                    // Therefore, we should delete the currentSingle if it used to be defined but doesn't exist anymore.
                    // No explicit "delete" is required, since newSingle would be undefined at this point.
                    // Marking it as selectionUpdated here will set currentSingle to undefined below in the setTimeout.
                    if (_this._items.smart && !newSingle_1) {
                        selectionUpdated_1 = true;
                    }
                    // TODO: Discussed this with Eudes and this is fine for now.
                    // But we need to figure out a different pattern for the
                    // child triggering the parent change detection problem.
                    // Using setTimeout for now to fix this.
                    setTimeout(function () {
                        if (selectionUpdated_1) {
                            _this.currentSingle = newSingle_1;
                        }
                    }, 0);
                    break;
                }
                case SelectionType.Multi: {
                    var leftOver_1 = _this.current.slice();
                    var trackBy_2 = _this._items.trackBy;
                    var selectionUpdated_2 = false;
                    // if the current has been set before data was loaded, we look up and save the ref from current data set
                    if (_this.current.length > 0 && _this.prevSelectionRefs.length !== _this.current.length) {
                        if (_this._items.all && _this._items.trackBy) {
                            _this.prevSelectionRefs = [];
                            _this.current.forEach(function (item) {
                                var lookup = _this._items.all.findIndex(function (maybe) { return maybe === item; });
                                _this.prevSelectionRefs.push(_this._items.trackBy(lookup, item));
                            });
                        }
                    }
                    // TODO: revisit this when we work on https://github.com/vmware/clarity/issues/2342
                    // currently, the selection is cleared when filter is applied, so the logic inside
                    // the if statement below results in broken behavior.
                    if (leftOver_1.length > 0) {
                        updatedItems.forEach(function (item, index) {
                            var ref = trackBy_2(index, item);
                            // Look in current selected refs array if item is selected, and update actual value
                            var selectedIndex = _this.prevSelectionRefs.indexOf(ref);
                            if (selectedIndex > -1) {
                                leftOver_1[selectedIndex] = item;
                                selectionUpdated_2 = true;
                            }
                        });
                        // Filter out any unmatched items if we're using smart datagrids where we expect all items to be
                        // present
                        if (_this._items.smart) {
                            leftOver_1 = leftOver_1.filter(function (selected) { return updatedItems.indexOf(selected) > -1; });
                            if (_this.current.length !== leftOver_1.length) {
                                selectionUpdated_2 = true;
                            }
                        }
                        // TODO: Discussed this with Eudes and this is fine for now.
                        // But we need to figure out a different pattern for the
                        // child triggering the parent change detection problem.
                        // Using setTimeout for now to fix this.
                        setTimeout(function () {
                            if (selectionUpdated_2) {
                                _this.current = leftOver_1;
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
    Selection.prototype.clearSelection = function () {
        this.current.length = 0;
        this.prevSelectionRefs = [];
        this._currentSingle = null;
        this.prevSingleSelectionRef = null;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        get: function () {
            return this._selectionType;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        get: function () {
            return this._selectionType === SelectionType.Multi || this._selectionType === SelectionType.Single;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up our subscriptions to other providers
     */
    Selection.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        get: function () {
            return this._currentSingle;
        },
        set: function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            if (this._items.all && this._items.trackBy && value) {
                var lookup = this._items.all.findIndex(function (maybe) { return maybe === value; });
                this.prevSingleSelectionRef = this._items.trackBy(lookup, value);
            }
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this.updateCurrent(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.updateCurrent = function (value, emit) {
        var _this = this;
        this._current = value;
        if (emit) {
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            // @TODO This can likely be removed!
            this.debounce = true;
            setTimeout(function () { return (_this.debounce = false); });
        }
    };
    Selection.prototype.emitChange = function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if an item is currently selected
     */
    Selection.prototype.isSelected = function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    /**
     * Selects an item
     */
    Selection.prototype.selectItem = function (item) {
        this.current.push(item);
        if (this._items.trackBy) {
            // Push selected ref onto array
            var lookup = this._items.all.findIndex(function (maybe) { return maybe === item; });
            this.prevSelectionRefs.push(this._items.trackBy(lookup, item));
        }
    };
    /**
     * Deselects an item
     */
    Selection.prototype.deselectItem = function (indexOfItem) {
        this.current.splice(indexOfItem, 1);
        if (this._items.trackBy && indexOfItem < this.prevSelectionRefs.length) {
            // Keep selected refs array in sync
            this.prevSelectionRefs.splice(indexOfItem, 1);
        }
    };
    /**
     * Selects or deselects an item
     */
    Selection.prototype.setSelected = function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                var index = this.current.indexOf(item);
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
    };
    /**
     * Checks if all currently displayed items are selected
     */
    Selection.prototype.isAllSelected = function () {
        var _this = this;
        if (this._selectionType !== SelectionType.Multi || !this._items.displayed) {
            return false;
        }
        var displayedItems = this._items.displayed;
        var nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        var temp = displayedItems.filter(function (item) { return _this.current.indexOf(item) > -1; });
        return temp.length === displayedItems.length;
    };
    /**
     * Selects or deselects all currently displayed items
     */
    Selection.prototype.toggleAll = function () {
        var _this = this;
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
             * If every currently displayed item is already selected, we clear them.
             * If at least one item isn't selected, we select every currently displayed item.
             */
        if (this.isAllSelected()) {
            this._items.displayed.forEach(function (item) {
                var currentIndex = _this.current.indexOf(item);
                if (currentIndex > -1) {
                    _this.deselectItem(currentIndex);
                }
            });
        }
        else {
            this._items.displayed.forEach(function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.selectItem(item);
                }
            });
        }
        this.emitChange();
    };
    Selection = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Items, FiltersProvider])
    ], Selection);
    return Selection;
}());

var WrappedRow = /** @class */ (function () {
    function WrappedRow() {
        this._dynamic = false;
    }
    WrappedRow.prototype.ngAfterViewInit = function () {
        // Create the cells view in memory, not the DOM.
        this.rowView = this.templateRef.createEmbeddedView(null);
    };
    __decorate([
        ViewChild('rowPortal', { static: false }),
        __metadata("design:type", TemplateRef)
    ], WrappedRow.prototype, "templateRef", void 0);
    WrappedRow = __decorate([
        Component({
            selector: 'dg-wrapped-row',
            template: "        \n        <ng-template #rowPortal>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], WrappedRow);
    return WrappedRow;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridIfExpandService = /** @class */ (function (_super) {
    __extends(DatagridIfExpandService, _super);
    function DatagridIfExpandService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._replace = new BehaviorSubject(false);
        _this._animate = new Subject();
        return _this;
    }
    Object.defineProperty(DatagridIfExpandService.prototype, "expanded", {
        // due to the es5 spec if the set is overridden on base class the getter must also be overridden
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            value = !!value;
            if (value !== this._expanded) {
                this._expanded = value;
                this._animate.next();
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatagridIfExpandService.prototype.loadingStateChange = function (state) {
        _super.prototype.loadingStateChange.call(this, state);
        if (state !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    };
    Object.defineProperty(DatagridIfExpandService.prototype, "replace", {
        get: function () {
            return this._replace.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridIfExpandService.prototype.setReplace = function (replaceValue) {
        this._replace.next(replaceValue);
    };
    Object.defineProperty(DatagridIfExpandService.prototype, "animate", {
        get: function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DatagridIfExpandService = __decorate([
        Injectable()
    ], DatagridIfExpandService);
    return DatagridIfExpandService;
}(IfExpandService));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbRow = 0;
var ClrDatagridRow = /** @class */ (function () {
    function ClrDatagridRow(selection, rowActionService, globalExpandable, expand, displayMode, vcr, renderer, el, commonStrings) {
        var _this = this;
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
        this.subscriptions.push(combineLatest(this.expand.replace, this.expand.expandChange).subscribe(function (_a) {
            var _b = __read(_a, 2), expandReplaceValue = _b[0], expandChangeValue = _b[1];
            if (expandReplaceValue && expandChangeValue) {
                // replaced and expanding
                _this.replaced = true;
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
            else {
                _this.replaced = false;
                // Handles these cases: not replaced and collapsing & replaced and
                // collapsing and not replaced and expanding.
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-row-replaced');
            }
        }));
    }
    Object.defineProperty(ClrDatagridRow.prototype, "selected", {
        /**
         * Indicates if the row is selected
         */
        get: function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        set: function (value) {
            if (this.selection.selectionType === SelectionType.None) {
                this._selected = value;
            }
            else {
                this.selection.setSelected(this.item, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.prototype.toggle = function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(ClrDatagridRow.prototype, "expanded", {
        get: function () {
            return this.expand.expanded;
        },
        set: function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRow.prototype.toggleExpand = function () {
        if (this.expand.expandable) {
            this.expandAnimation.updateStartHeight();
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    ClrDatagridRow.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.dgCells.changes.subscribe(function () {
            _this.dgCells.forEach(function (cell) {
                _this._scrollableCells.insert(cell._view);
            });
        });
    };
    ClrDatagridRow.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.displayMode.view.subscribe(function (viewChange) {
            // Listen for view changes and move cells around depending on the current displayType
            // remove cell views from display view
            for (var i = _this._scrollableCells.length; i > 0; i--) {
                _this._scrollableCells.detach();
            }
            // remove cell views from calculated view
            for (var i = _this._calculatedCells.length; i > 0; i--) {
                _this._calculatedCells.detach();
            }
            if (viewChange === DatagridDisplayMode.CALCULATE) {
                _this.displayCells = false;
                _this.dgCells.forEach(function (cell) {
                    _this._calculatedCells.insert(cell._view);
                });
            }
            else {
                _this.displayCells = true;
                _this.dgCells.forEach(function (cell) {
                    _this._scrollableCells.insert(cell._view);
                });
            }
        }), this.expand.animate.subscribe(function () {
            _this.expandAnimationTrigger = !_this.expandAnimationTrigger;
        }));
    };
    ClrDatagridRow.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagridRow.prototype.ngOnInit = function () {
        this.wrappedInjector = new HostWrapper(WrappedRow, this.vcr);
    };
    Object.defineProperty(ClrDatagridRow.prototype, "_view", {
        get: function () {
            return this.wrappedInjector.get(WrappedRow, this.vcr).rowView;
        },
        enumerable: true,
        configurable: true
    });
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
    return ClrDatagridRow;
}());

/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
var StateProvider = /** @class */ (function () {
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.pipe(map(function () { return _this.state; }));
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        /*
           * By making this a getter, we open the possibility for a setter in the future.
           * It's been requested a couple times.
           */
        get: function () {
            var e_1, _a;
            var state = {};
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
            var activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state.filters = [];
                try {
                    for (var activeFilters_1 = __values(activeFilters), activeFilters_1_1 = activeFilters_1.next(); !activeFilters_1_1.done; activeFilters_1_1 = activeFilters_1.next()) {
                        var filter = activeFilters_1_1.value;
                        if (filter.state) {
                            state.filters.push(filter.state);
                        }
                        else {
                            state.filters.push(filter);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (activeFilters_1_1 && !activeFilters_1_1.done && (_a = activeFilters_1.return)) _a.call(activeFilters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return state;
        },
        enumerable: true,
        configurable: true
    });
    StateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FiltersProvider,
            Sort,
            Page,
            StateDebouncer])
    ], StateProvider);
    return StateProvider;
}());

/**
 * @description
 * Internal datagrid service that holds a reference to the clr-dg-table element and exposes a method to get height.
 */
var TableSizeService = /** @class */ (function () {
    function TableSizeService(platformId) {
        this.platformId = platformId;
    }
    Object.defineProperty(TableSizeService.prototype, "tableRef", {
        get: function () {
            return this._tableRef;
        },
        set: function (element) {
            this._tableRef = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSizeService.prototype, "table", {
        set: function (table) {
            if (isPlatformBrowser(this.platformId) && table.nativeElement) {
                this.tableRef = table.nativeElement.querySelector('.datagrid-table');
            }
        },
        enumerable: true,
        configurable: true
    });
    // Used when resizing columns to show the column border being dragged.
    TableSizeService.prototype.getColumnDragHeight = function () {
        if (!this.tableRef) {
            return;
        }
        return this.tableRef.clientHeight + "px";
    };
    TableSizeService = __decorate([
        Injectable(),
        __param(0, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [Object])
    ], TableSizeService);
    return TableSizeService;
}());

var ColumnsService = /** @class */ (function () {
    function ColumnsService() {
        this.columns = [];
    }
    Object.defineProperty(ColumnsService.prototype, "columnStates", {
        get: function () {
            return this.columns.map(function (column) { return column.value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnsService.prototype, "hasHideableColumns", {
        get: function () {
            return this.columnStates.filter(function (state) { return state.hideable; }).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    // Helper method to emit a change to a column only when there is an actual diff to process for that column
    ColumnsService.prototype.emitStateChangeAt = function (columnIndex, diff) {
        if (!this.columns[columnIndex]) {
            return;
        }
        this.emitStateChange(this.columns[columnIndex], diff);
    };
    ColumnsService.prototype.emitStateChange = function (column, diff) {
        var current = column.value;
        column.next(__assign({}, current, diff));
    };
    ColumnsService = __decorate([
        Injectable()
    ], ColumnsService);
    return ColumnsService;
}());

var ClrDatagrid = /** @class */ (function () {
    function ClrDatagrid(organizer, items, expandableRows, selection, rowActionService, stateProvider, displayMode, renderer, el, page, commonStrings) {
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
    Object.defineProperty(ClrDatagrid.prototype, "loading", {
        /**
         * Freezes the datagrid while data is loading
         */
        get: function () {
            return this.items.loading;
        },
        set: function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    ClrDatagrid.prototype.dataChanged = function () {
        this.items.refresh();
    };
    Object.defineProperty(ClrDatagrid.prototype, "selected", {
        /**
         * Array of all selected items
         */
        set: function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.updateCurrent(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "singleSelected", {
        /**
         * Selected item in single-select mode
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "rowSelectionMode", {
        /**
         * @deprecated since 2.0, remove in 3.0
         *
         * Selection/Deselection on row click mode
         */
        set: function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagrid.prototype, "allSelected", {
        /**
         * Indicates if all currently displayed items are selected
         */
        get: function () {
            return this.selection.isAllSelected();
        },
        /**
         * Selects/deselects all currently displayed items
         * @param value
         */
        set: function (value) {
            /*
                 * This is a setter but we ignore the value.
                 * It's strange, but it lets us have an indeterminate state where only
                 * some of the items are selected.
                 */
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.items.smart) {
            this.items.all = this.rows.map(function (row) { return row.item; });
        }
        this._subscriptions.push(this.rows.changes.subscribe(function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map(function (row) { return row.item; });
            }
            _this.rows.forEach(function (row) {
                _this._displayedRows.insert(row._view);
            });
        }));
    };
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ClrDatagrid.prototype.ngAfterViewInit = function () {
        var _this = this;
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(function (state) { return _this.refresh.emit(state); }), this.selection.change.subscribe(function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit(s);
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit(s);
            }
        }), this.page.change.subscribe(function () {
            _this.datagridTable.nativeElement.focus();
        }), 
        // A subscription that listens for displayMode changes on the datagrid
        this.displayMode.view.subscribe(function (viewChange) {
            // Remove any projected columns from the projectedDisplayColumns container
            for (var i = _this._projectedDisplayColumns.length; i > 0; i--) {
                _this._projectedDisplayColumns.detach();
            }
            // Remove any projected columns from the projectedCalculationColumns container
            for (var i = _this._projectedCalculationColumns.length; i > 0; i--) {
                _this._projectedCalculationColumns.detach();
            }
            // Remove any projected rows from the calculationRows container
            for (var i = _this._calculationRows.length; i > 0; i--) {
                _this._calculationRows.detach();
            }
            // Remove any projected rows from the displayedRows container
            for (var i = _this._displayedRows.length; i > 0; i--) {
                _this._displayedRows.detach();
            }
            if (viewChange === DatagridDisplayMode.DISPLAY) {
                // Set state, style for the datagrid to DISPLAY and insert row & columns into containers
                _this.renderer.removeClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach(function (column) {
                    _this._projectedDisplayColumns.insert(column._view);
                });
                _this.rows.forEach(function (row) {
                    _this._displayedRows.insert(row._view);
                });
            }
            else {
                // Set state, style for the datagrid to CALCULATE and insert row & columns into containers
                _this.renderer.addClass(_this.el.nativeElement, 'datagrid-calculate-mode');
                _this.columns.forEach(function (column) {
                    _this._projectedCalculationColumns.insert(column._view);
                });
                _this.rows.forEach(function (row) {
                    _this._calculationRows.insert(row._view);
                });
            }
        }));
    };
    ClrDatagrid.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrDatagrid.prototype.resize = function () {
        this.organizer.resize();
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
    return ClrDatagrid;
}());

var ClrDatagridActionBar = /** @class */ (function () {
    function ClrDatagridActionBar() {
    }
    ClrDatagridActionBar = __decorate([
        Component({
            selector: 'clr-dg-action-bar',
            template: "\n        <ng-content></ng-content>\n    ",
            host: { '[class.datagrid-action-bar]': 'true' }
        })
    ], ClrDatagridActionBar);
    return ClrDatagridActionBar;
}());

var clrDgActionId = 0;
var ClrDatagridActionOverflow = /** @class */ (function () {
    function ClrDatagridActionOverflow(rowActionService, commonStrings, platformId, zone, smartToggleService, popoverId) {
        var _this = this;
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
        this.subscriptions.push(this.smartToggleService.openChange.subscribe(function (openState) {
            _this.open = openState;
            if (openState) {
                _this.focusFirstButton();
            }
        }));
        this.popoverId = 'clr-action-menu' + clrDgActionId++;
    }
    ClrDatagridActionOverflow.prototype.ngOnDestroy = function () {
        this.rowActionService.unregister();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    Object.defineProperty(ClrDatagridActionOverflow.prototype, "open", {
        get: function () {
            return this.smartToggleService.open;
        },
        set: function (open) {
            if (!!open !== this.smartToggleService.open) {
                // prevents chocolate mess
                this.smartToggleService.open = !!open;
                this.openChange.emit(!!open);
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridActionOverflow.prototype.focusFirstButton = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var firstButton = document.querySelector('button.action-item');
                    if (firstButton) {
                        firstButton.focus();
                    }
                });
            });
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
            template: "\n      <button class=\"datagrid-action-toggle\"\n              type=\"button\"\n              role=\"button\"\n              aria-haspopup=\"true\"\n              #anchor\n              [attr.aria-controls]=\"popoverId\"\n              [attr.aria-expanded]=\"open\"\n              [attr.aria-label]=\"commonStrings.keys.rowActions\"\n              clrPopoverAnchor\n              clrPopoverOpenCloseButton>\n          <clr-icon shape=\"ellipsis-vertical\" [attr.title]=\"commonStrings.keys.rowActions\"></clr-icon>\n      </button>\n\n      <div class=\"datagrid-action-overflow\"\n           role=\"menu\" \n           [id]=\"popoverId\"\n           [attr.aria-hidden]=\"!open\"\n           [attr.id]=\"popoverId\" \n           clrFocusTrap\n           *clrPopoverContent=\"open at smartPosition; outsideClickToClose: true; scrollToClose: true\">\n          <ng-content></ng-content>\n      </div>\n  "
        }),
        __param(2, Inject(PLATFORM_ID)),
        __param(5, Inject(UNIQUE_ID)),
        __metadata("design:paramtypes", [RowActionService,
            ClrCommonStringsService,
            Object,
            NgZone,
            ClrPopoverToggleService, String])
    ], ClrDatagridActionOverflow);
    return ClrDatagridActionOverflow;
}());

var MIN_COLUMN_WIDTH = 96;
// This service allows DatagridHeaderRenderer and ClrDatagridColumnSeparator
// to share column resize data with each other.
var ColumnResizerService = /** @class */ (function () {
    function ColumnResizerService(el, domAdapter, organizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.organizer = organizer;
        this._resizedBy = 0;
    }
    Object.defineProperty(ColumnResizerService.prototype, "resizedBy", {
        get: function () {
            return this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "minColumnWidth", {
        get: function () {
            return this.domAdapter.minWidth(this.el.nativeElement) || MIN_COLUMN_WIDTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnResizerService.prototype, "maxResizeRange", {
        get: function () {
            return this.widthBeforeResize - this.minColumnWidth;
        },
        enumerable: true,
        configurable: true
    });
    ColumnResizerService.prototype.startResize = function () {
        this._resizedBy = 0;
        this.isWithinMaxResizeRange = true;
        this.widthBeforeResize = this.domAdapter.clientRect(this.el.nativeElement).width;
    };
    ColumnResizerService.prototype.endResize = function () {
        this.organizer.resize();
    };
    Object.defineProperty(ColumnResizerService.prototype, "widthAfterResize", {
        get: function () {
            return this.widthBeforeResize + this._resizedBy;
        },
        enumerable: true,
        configurable: true
    });
    ColumnResizerService.prototype.calculateResize = function (event) {
        var moveX = event.dragPosition.moveX;
        // returns the resize amount within the allowed range
        if (moveX < -this.maxResizeRange) {
            this._resizedBy = -this.maxResizeRange;
            this.isWithinMaxResizeRange = false;
        }
        else {
            this._resizedBy = moveX;
            this.isWithinMaxResizeRange = true;
        }
    };
    ColumnResizerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ElementRef, DomAdapter, DatagridRenderOrganizer])
    ], ColumnResizerService);
    return ColumnResizerService;
}());

var ClrDatagridColumnSeparator = /** @class */ (function () {
    // Every column draggable separator should have its own unique ID
    // in order to not conflict with other draggables/droppables.
    function ClrDatagridColumnSeparator(columnResizerService, renderer, tableSizeService, document, columnSeparatorId) {
        this.columnResizerService = columnResizerService;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.document = document;
        this.columnSeparatorId = columnSeparatorId;
    }
    ClrDatagridColumnSeparator.prototype.showTracker = function (resizeTrackerEl) {
        this.columnResizerService.startResize();
        var tableHeight = this.tableSizeService.getColumnDragHeight();
        this.renderer.setStyle(resizeTrackerEl, 'height', tableHeight);
        this.renderer.setStyle(resizeTrackerEl, 'display', 'block');
    };
    ClrDatagridColumnSeparator.prototype.moveTracker = function (event, resizeTrackerEl) {
        this.columnResizerService.calculateResize(event);
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(" + this.columnResizerService.resizedBy + "px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
        this.redFlagTracker(resizeTrackerEl);
    };
    ClrDatagridColumnSeparator.prototype.hideTracker = function (resizeTrackerEl) {
        this.columnResizerService.endResize();
        this.renderer.setStyle(resizeTrackerEl, 'display', 'none');
        this.renderer.setStyle(resizeTrackerEl, 'transform', "translateX(0px)");
        this.renderer.setStyle(this.document.body, 'cursor', 'auto');
    };
    ClrDatagridColumnSeparator.prototype.redFlagTracker = function (resizeTrackerEl) {
        var isWithinMaxResizeRange;
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
    };
    ClrDatagridColumnSeparator = __decorate([
        Component({
            selector: 'clr-dg-column-separator',
            template: "\n    <div class=\"datagrid-column-handle\" aria-hidden=\"true\"\n      clrDraggable \n      [clrGroup]=\"columnSeparatorId\" \n      (clrDragStart)=\"showTracker(resizeTrackerEl)\" \n      (clrDragMove)=\"moveTracker($event, resizeTrackerEl)\" \n      (clrDragEnd)=\"hideTracker(resizeTrackerEl)\"></div>\n    <div class=\"datagrid-column-resize-tracker\" #resizeTrackerEl></div>\n    ",
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
    return ClrDatagridColumnSeparator;
}());

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
var ɵ1 = function (key) { return DatagridColumnChanges[key]; }, ɵ0 = function (key) { return key === parseInt(key, 10); };
var ALL_COLUMN_CHANGES = Object.keys(DatagridColumnChanges)
    .map(ɵ1)
    .filter(ɵ0); // extracts only integer keys

var ClrDatagridColumnToggleTitle = /** @class */ (function () {
    /** @deprecated since 2.0, remove in 3.0 */
    function ClrDatagridColumnToggleTitle() {
    }
    ClrDatagridColumnToggleTitle = __decorate([
        Component({
            selector: 'clr-dg-column-toggle-title',
            template: "<ng-content></ng-content>"
        })
        /** @deprecated since 2.0, remove in 3.0 */
    ], ClrDatagridColumnToggleTitle);
    return ClrDatagridColumnToggleTitle;
}());

var ClrDatagridColumnToggleButton = /** @class */ (function () {
    function ClrDatagridColumnToggleButton(columnsService) {
        this.columnsService = columnsService;
        this.allSelected = new EventEmitter();
    }
    Object.defineProperty(ClrDatagridColumnToggleButton.prototype, "clrAllSelected", {
        get: function () {
            return this.allSelected.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggleButton.prototype.hideableColumns = function () {
        return this.columnsService.columns.filter(function (column) { return column.value.hideable; });
    };
    Object.defineProperty(ClrDatagridColumnToggleButton.prototype, "allHideablesVisible", {
        get: function () {
            return this.hideableColumns().filter(function (column) { return column.value.hidden; }).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggleButton.prototype.selectAll = function () {
        var _this = this;
        this.hideableColumns().forEach(function (hideableColumn) {
            return _this.columnsService.emitStateChange(hideableColumn, {
                hidden: false,
                changes: [DatagridColumnChanges.HIDDEN],
            });
        });
        this.allSelected.next(true);
    };
    __decorate([
        Output('clrAllSelected'),
        __metadata("design:type", Observable),
        __metadata("design:paramtypes", [])
    ], ClrDatagridColumnToggleButton.prototype, "clrAllSelected", null);
    ClrDatagridColumnToggleButton = __decorate([
        Component({
            selector: 'clr-dg-column-toggle-button',
            template: "\n    <button class=\"btn btn-sm btn-link switch-button\"\n            (click)=\"selectAll()\"\n            [disabled]=\"allHideablesVisible\"\n            type=\"button\">\n      <ng-content></ng-content>\n    </button>\n  "
        })
        /** @deprecated since 2.0, remove in 3.0 */
        ,
        __metadata("design:paramtypes", [ColumnsService])
    ], ClrDatagridColumnToggleButton);
    return ClrDatagridColumnToggleButton;
}());

var ClrDatagridColumnToggle = /** @class */ (function () {
    function ClrDatagridColumnToggle(commonStrings, columnsService, columnSwitchId, platformId, zone, popoverId) {
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
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "allColumnsVisible", {
        get: function () {
            return this._allColumnsVisible;
        },
        set: function (value) {
            this._allColumnsVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hideableColumnStates", {
        get: function () {
            var hideables = this.columnsService.columns.filter(function (column) { return column.value.hideable; });
            return hideables.map(function (column) { return column.value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridColumnToggle.prototype, "hasOnlyOneVisibleColumn", {
        get: function () {
            var nbNonHideableColumns = this.columnsService.columns.length - this.hideableColumnStates.length;
            // this should only return true when there is no non-hideable columns.
            return (nbNonHideableColumns === 0 && this.hideableColumnStates.filter(function (columnState) { return !columnState.hidden; }).length === 1);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridColumnToggle.prototype.toggleColumnState = function (columnState, event) {
        var columnToToggle = this.columnsService.columns.filter(function (column) { return column.value === columnState; })[0];
        this.columnsService.emitStateChange(columnToToggle, {
            hidden: event,
            changes: [DatagridColumnChanges.HIDDEN],
        });
    };
    ClrDatagridColumnToggle.prototype.toggleSwitchPanel = function () {
        var _this = this;
        this.openState = !this.openState;
        if (this.openState && isPlatformBrowser(this.platformId) && this.menuDescriptionElement) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.menuDescriptionElement.nativeElement.focus();
                });
            });
        }
    };
    ClrDatagridColumnToggle.prototype.allColumnsSelected = function () {
        this.allSelectedElement.nativeElement.focus();
    };
    // Without tracking the checkboxes get rerendered on model update, which leads
    // to loss of focus after checkbox toggle.
    ClrDatagridColumnToggle.prototype.trackByFn = function (index) {
        return index;
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
            template: "    \n      <button\n              role=\"button\"\n              type=\"button\"\n              class=\"btn btn-sm btn-link column-toggle--action\"\n              clrPopoverAnchor\n              clrPopoverOpenCloseButton\n              [attr.aria-controls]=\"popoverId\"\n              [attr.aria-owns]=\"popoverId\">\n          <clr-icon shape=\"view-columns\" [attr.title]=\"commonStrings.keys.pickColumns\"></clr-icon>\n      </button>\n      <div class=\"column-switch\"\n           role=\"dialog\"\n           [id]=\"popoverId\"\n           clrFocusTrap\n           *clrPopoverContent=\"openState at smartPosition; outsideClickToClose: true; scrollToClose: true\">\n          <div class=\"switch-header\">\n              <div class=\"clr-sr-only\" tabindex=\"-1\" #menuDescription>{{commonStrings.keys.showColumnsMenuDescription}}</div>\n              <div class=\"clr-sr-only\" tabindex=\"-1\" #allSelected>{{commonStrings.keys.allColumnsSelected}}</div>\n              <ng-container *ngIf=\"!customToggleTitle\">{{commonStrings.keys.showColumns}}</ng-container>\n              <ng-content select=\"clr-dg-column-toggle-title\"></ng-content>\n              <button class=\"btn btn-sm btn-link toggle-switch-close-button\"\n                      clrPopoverCloseButton\n                      type=\"button\"\n                      [attr.aria-label]=\"commonStrings.keys.close\">\n                  <clr-icon shape=\"close\" \n                            [attr.title]=\"commonStrings.keys.close\"></clr-icon>\n              </button>\n          </div>\n          <ul class=\"switch-content list-unstyled\">\n              <li *ngFor=\"let columnState of hideableColumnStates;trackBy: trackByFn\">\n                  <clr-checkbox-wrapper>\n                      <input clrCheckbox type=\"checkbox\"\n                             [disabled]=\"hasOnlyOneVisibleColumn && !columnState.hidden\"\n                             [ngModel]=\"!columnState.hidden\"\n                             (ngModelChange)=\"toggleColumnState(columnState, !$event)\">\n                      <label>\n                          <ng-template [ngTemplateOutlet]=\"columnState.titleTemplateRef\"></ng-template>\n                      </label>\n                  </clr-checkbox-wrapper>\n              </li>\n          </ul>\n          <div class=\"switch-footer\">\n              <ng-content select=\"clr-dg-column-toggle-button\"></ng-content>\n              <clr-dg-column-toggle-button *ngIf=\"!customToggleButton\" (clrAllSelected)=\"allColumnsSelected()\">\n                  {{commonStrings.keys.selectAll}}\n              </clr-dg-column-toggle-button>\n          </div>\n      </div>\n  ",
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
    return ClrDatagridColumnToggle;
}());

/*
 * I don't think this deserves to be in IfExpanded itself,
 * so I'm adding a second directive on the same selector for now just for the datagrid
 */
var DatagridDetailRegisterer = /** @class */ (function () {
    function DatagridDetailRegisterer(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    DatagridDetailRegisterer.prototype.ngOnDestroy = function () {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    };
    DatagridDetailRegisterer = __decorate([
        Directive({ selector: '[clrIfExpanded]' }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [ExpandableRowsCount])
    ], DatagridDetailRegisterer);
    return DatagridDetailRegisterer;
}());

var ClrDatagridFooter = /** @class */ (function () {
    function ClrDatagridFooter(selection, columnsService) {
        this.selection = selection;
        this.columnsService = columnsService;
        /* reference to the enum so that template can access */
        this.SELECTION_TYPE = SelectionType;
    }
    Object.defineProperty(ClrDatagridFooter.prototype, "hasHideableColumns", {
        get: function () {
            return this.columnsService.hasHideableColumns;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        ContentChild(ClrDatagridColumnToggle, { static: false }),
        __metadata("design:type", ClrDatagridColumnToggle)
    ], ClrDatagridFooter.prototype, "toggle", void 0);
    ClrDatagridFooter = __decorate([
        Component({
            selector: 'clr-dg-footer',
            template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n          <div class=\"clr-form-control-disabled\">\n              <clr-checkbox-wrapper class=\"datagrid-footer-select\">\n                <input clrCheckbox type=\"checkbox\" checked=\"checked\" disabled>\n                <label>{{selection.current.length}}</label>\n            </clr-checkbox-wrapper>\n          </div>\n        </ng-container>\n        <ng-content select=\"clr-dg-column-toggle\"></ng-content>\n        <clr-dg-column-toggle *ngIf=\"hasHideableColumns && !toggle\"></clr-dg-column-toggle>\n        <div class=\"datagrid-footer-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
            host: {
                '[class.datagrid-footer]': 'true',
            }
        }),
        __metadata("design:paramtypes", [Selection, ColumnsService])
    ], ClrDatagridFooter);
    return ClrDatagridFooter;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var COLUMN_STATE = new InjectionToken('COLUMN_STATE');
function columnStateFactory() {
    return new BehaviorSubject({
        changes: [],
    });
}
var COLUMN_STATE_PROVIDER = {
    provide: COLUMN_STATE,
    useFactory: columnStateFactory,
};

var ClrDatagridHideableColumn = /** @class */ (function () {
    function ClrDatagridHideableColumn(titleTemplateRef, viewContainerRef, columnsService, columnState) {
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
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHideableColumn", {
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
        set: function (value) {
            this.clrDgHidden = value && value.hidden ? value.hidden : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridHideableColumn.prototype, "clrDgHidden", {
        set: function (hidden) {
            this._hidden = hidden ? hidden : false;
            this.columnsService.emitStateChange(this.columnState, {
                hidden: this._hidden,
                changes: [DatagridColumnChanges.HIDDEN],
            });
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridHideableColumn.prototype.ngOnInit = function () {
        var _this = this;
        this.columnsService.emitStateChange(this.columnState, {
            hideable: true,
            titleTemplateRef: this.titleTemplateRef,
            hidden: this._hidden,
            changes: [DatagridColumnChanges.HIDDEN],
        });
        this.subscriptions.push(this.columnState.subscribe(function (state) {
            if (state.changes && state.changes.indexOf(DatagridColumnChanges.HIDDEN) > -1) {
                _this.hiddenChange.emit(state.hidden); // Can emit through @Output when desugared syntax is used
            }
        }));
    };
    ClrDatagridHideableColumn.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrDatagridHideableColumn;
}());

var ClrDatagridItemsTrackBy = /** @class */ (function () {
    function ClrDatagridItemsTrackBy(_items) {
        this._items = _items;
    }
    Object.defineProperty(ClrDatagridItemsTrackBy.prototype, "trackBy", {
        set: function (value) {
            if (this._items) {
                this._items.trackBy = value;
            }
        },
        enumerable: true,
        configurable: true
    });
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
    return ClrDatagridItemsTrackBy;
}());

var ClrDatagridPageSize = /** @class */ (function () {
    function ClrDatagridPageSize(page) {
        this.page = page;
    }
    ClrDatagridPageSize.prototype.ngOnInit = function () {
        if (!this.pageSizeOptions || this.pageSizeOptions.length === 0) {
            this.pageSizeOptions = [this.page.size];
        }
    };
    __decorate([
        Input('clrPageSizeOptions'),
        __metadata("design:type", Array)
    ], ClrDatagridPageSize.prototype, "pageSizeOptions", void 0);
    ClrDatagridPageSize = __decorate([
        Component({
            selector: 'clr-dg-page-size',
            template: "\n    <ng-content></ng-content>\n    <div class=\"clr-select-wrapper\">\n      <select [class.clr-page-size-select]=\"true\" [(ngModel)]=\"page.size\">\n        <option *ngFor=\"let option of pageSizeOptions\" [ngValue]=\"option\">{{option}}</option>\n      </select>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [Page])
    ], ClrDatagridPageSize);
    return ClrDatagridPageSize;
}());

var ClrDatagridPagination = /** @class */ (function () {
    function ClrDatagridPagination(page, commonStrings) {
        this.page = page;
        this.commonStrings = commonStrings;
        this.currentChanged = new EventEmitter(false);
        this.page.activated = true;
    }
    /**********
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     */
    ClrDatagridPagination.prototype.ngOnInit = function () {
        var _this = this;
        /*
         * Default page size is 10.
         * The reason we set it here and not in the provider itself is because
         * we don't want pagination if this component isn't present in the datagrid.
         */
        if (!this.page.size) {
            this.page.size = 10;
        }
        this._pageSubscription = this.page.change.subscribe(function (current) { return _this.currentChanged.emit(current); });
    };
    ClrDatagridPagination.prototype.ngOnDestroy = function () {
        this.page.resetPageSize();
        if (this._pageSubscription) {
            this._pageSubscription.unsubscribe();
        }
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "pageSize", {
        /**
         * Page size
         */
        get: function () {
            return this.page.size;
        },
        set: function (size) {
            if (typeof size === 'number') {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "totalItems", {
        /**
         * Total items (needed to guess the last page)
         */
        get: function () {
            return this.page.totalItems;
        },
        set: function (total) {
            if (typeof total === 'number') {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastPage", {
        /**
         * Last page
         */
        get: function () {
            return this.page.last;
        },
        set: function (last) {
            if (typeof last === 'number') {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "currentPage", {
        /**
         * Current page
         */
        get: function () {
            return this.page.current;
        },
        set: function (page) {
            if (typeof page === 'number') {
                this.page.current = page;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     */
    ClrDatagridPagination.prototype.previous = function () {
        this.page.previous();
    };
    /**
     * Moves to the next page if it exists
     */
    ClrDatagridPagination.prototype.next = function () {
        this.page.next();
    };
    Object.defineProperty(ClrDatagridPagination.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0, -1 if none displayed
         */
        get: function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDatagridPagination.prototype, "middlePages", {
        /**
         * Conditionally adds page numbers before and after the current page
         */
        get: function () {
            var middlePages = [];
            if (this.page.current > 1) {
                middlePages.push(this.page.current - 1);
            }
            middlePages.push(this.page.current);
            if (this.page.current < this.page.last) {
                middlePages.push(this.page.current + 1);
            }
            return middlePages;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * We only update the pagination's current page on blur of the input field, or
     * when they press enter.
     */
    ClrDatagridPagination.prototype.updateCurrentPage = function (event) {
        var parsed = parseInt(event.target.value, 10);
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
            template: "\n    <div class=\"pagination-size\" *ngIf=\"_pageSizeComponent\">\n      <ng-content select=\"clr-dg-page-size\"></ng-content>\n    </div>\n    <div class=\"pagination-description\">\n      <ng-content></ng-content>\n    </div>\n    <div class=\"pagination-list\" *ngIf=\"page.last > 1\">\n      <button\n        type=\"button\" \n        class=\"pagination-first\" \n        [disabled]=\"page.current <= 1\" \n        (click)=\"page.current = 1\"\n        [attr.aria-label]=\"commonStrings.keys.firstPage\"\n        >\n        <clr-icon shape=\"step-forward-2 down\"></clr-icon>\n      </button>\n      <button \n        type=\"button\"\n        class=\"pagination-previous\" \n        [disabled]=\"page.current <= 1\" \n        (click)=\"page.current = page.current - 1\"\n        [attr.aria-label]=\"commonStrings.keys.previousPage\"\n        >\n        <clr-icon shape=\"angle left\"></clr-icon>\n      </button>\n      <input \n        #currentPageInput \n        type=\"text\" \n        class=\"pagination-current\" \n        [size]=\"page.last.toString().length\" \n        [value]=\"page.current\"\n        (keydown.enter)=\"updateCurrentPage($event)\" \n        (blur)=\"updateCurrentPage($event)\"\n        [attr.aria-label]=\"commonStrings.keys.currentPage\"\n        />\n        &nbsp;/&nbsp;<span [attr.aria-label]=\"commonStrings.keys.totalPages\">{{page.last}}</span>\n      <button \n        type=\"button\"\n        class=\"pagination-next\" \n        [disabled]=\"page.current >= page.last\" \n        (click)=\"page.current = page.current + 1\"\n        [attr.aria-label]=\"commonStrings.keys.nextPage\"\n        >\n        <clr-icon shape=\"angle right\"></clr-icon>\n      </button>\n      <button \n        type=\"button\" \n        class=\"pagination-last\" \n        [disabled]=\"page.current >= page.last\" \n        (click)=\"page.current = page.last\"\n        [attr.aria-label]=\"commonStrings.keys.lastPage\"\n        >\n        <clr-icon shape=\"step-forward-2 up\"></clr-icon>\n      </button>\n    </div>\n    ",
            host: { '[class.pagination]': 'true' }
        }),
        __metadata("design:paramtypes", [Page, ClrCommonStringsService])
    ], ClrDatagridPagination);
    return ClrDatagridPagination;
}());

/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
var ClrDatagridRowDetail = /** @class */ (function () {
    function ClrDatagridRowDetail(selection, rowActionService, expand, expandableRows) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.expandableRows = expandableRows;
        /* reference to the enum so that template can access it */
        this.SELECTION_TYPE = SelectionType;
        this.subscriptions = [];
        this.replacedRow = false;
    }
    Object.defineProperty(ClrDatagridRowDetail.prototype, "replace", {
        set: function (value) {
            this.expand.setReplace(!!value);
        },
        enumerable: true,
        configurable: true
    });
    ClrDatagridRowDetail.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.subscriptions.push(this.expand.replace.subscribe(function (replaceChange) {
            _this.replacedRow = replaceChange;
        }));
    };
    ClrDatagridRowDetail.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
            template: "\n        <ng-container *ngIf=\"!replacedRow\">\n            <!-- space for multiselection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n            </div>\n            <!-- space for single selection state -->\n            <div class=\"datagrid-cell datagrid-select datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n            </div>\n            <!-- space for single row action; only displayType if we have at least one actionable row in datagrid -->\n            <div class=\"datagrid-cell datagrid-row-actions datagrid-fixed-column\"\n                *ngIf=\"rowActionService.hasActionableRow\">\n            </div>\n            <!-- space for expandable caret action; only displayType if we have at least one expandable row in datagrid -->\n            <div *ngIf=\"expandableRows.hasExpandableRow\"\n                        class=\"datagrid-expandable-caret datagrid-fixed-column datagrid-cell\">\n            </div>\n        </ng-container>\n        <ng-content></ng-content>\n    ",
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
    return ClrDatagridRowDetail;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var STRICT_WIDTH_CLASS = 'datagrid-fixed-width';
var HIDDEN_COLUMN_CLASS = 'datagrid-hidden-column';

var DatagridCellRenderer = /** @class */ (function () {
    function DatagridCellRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.clearWidth(); }));
    }
    Object.defineProperty(DatagridCellRenderer.prototype, "columnState", {
        // @TODO(JEREMY) Work out how to dedupe some of this code between header and cell renderers
        set: function (columnState) {
            var _this = this;
            if (this.stateSubscription) {
                this.stateSubscription.unsubscribe();
            }
            this.runAllChanges = ALL_COLUMN_CHANGES;
            this.stateSubscription = columnState.subscribe(function (state) { return _this.stateChanges(state); });
        },
        enumerable: true,
        configurable: true
    });
    DatagridCellRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    };
    DatagridCellRenderer.prototype.stateChanges = function (state) {
        var _this = this;
        if (this.runAllChanges) {
            state.changes = this.runAllChanges;
            delete this.runAllChanges;
        }
        if (state.changes && state.changes.length) {
            state.changes.forEach(function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        _this.setHidden(state);
                        break;
                    default:
                        break;
                }
            });
        }
    };
    DatagridCellRenderer.prototype.clearWidth = function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, 'width', null);
    };
    DatagridCellRenderer.prototype.setWidth = function (state) {
        if (state.strictWidth) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', state.width + 'px');
    };
    DatagridCellRenderer.prototype.setHidden = function (state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
    };
    DatagridCellRenderer = __decorate([
        Directive({ selector: 'clr-dg-cell' }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, DatagridRenderOrganizer])
    ], DatagridCellRenderer);
    return DatagridCellRenderer;
}());

var DatagridHeaderRenderer = /** @class */ (function () {
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizerService, columnsService, columnState) {
        var _this = this;
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
        this.subscriptions.push(this.organizer.filterRenderSteps(DatagridRenderStep.CLEAR_WIDTHS).subscribe(function () { return _this.clearWidth(); }));
        this.subscriptions.push(columnState.subscribe(function (state) { return _this.stateChanges(state); }));
    }
    DatagridHeaderRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridHeaderRenderer.prototype.stateChanges = function (state) {
        var _this = this;
        if (state.changes && state.changes.length) {
            state.changes.forEach(function (change) {
                switch (change) {
                    case DatagridColumnChanges.WIDTH:
                        _this.setWidth(state);
                        break;
                    case DatagridColumnChanges.HIDDEN:
                        _this.setHidden(state);
                        break;
                    default:
                        break;
                }
            });
        }
    };
    DatagridHeaderRenderer.prototype.clearWidth = function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizerService.resizedBy) {
            this.renderer.setStyle(this.el.nativeElement, 'width', null);
        }
        if (this.autoSet) {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
    };
    DatagridHeaderRenderer.prototype.detectStrictWidth = function () {
        if (this.columnResizerService.resizedBy) {
            return this.columnResizerService.widthAfterResize;
        }
        else if (this.autoSet) {
            return 0;
        }
        else {
            return this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    DatagridHeaderRenderer.prototype.computeWidth = function (strictWidth) {
        var width = strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    DatagridHeaderRenderer.prototype.getColumnWidthState = function () {
        var strictWidth = this.detectStrictWidth();
        return {
            width: this.computeWidth(strictWidth),
            strictWidth: strictWidth,
        };
    };
    DatagridHeaderRenderer.prototype.setColumnState = function (index) {
        this.columnsService.columns[index] = this.columnState;
    };
    DatagridHeaderRenderer.prototype.setWidth = function (state) {
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
    };
    DatagridHeaderRenderer.prototype.setHidden = function (state) {
        if (state.hidden) {
            this.renderer.addClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, HIDDEN_COLUMN_CLASS);
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
    return DatagridHeaderRenderer;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NoopDomAdapter = /** @class */ (function () {
    function NoopDomAdapter() {
    }
    NoopDomAdapter.prototype.userDefinedWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.scrollBarWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.scrollWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.computedHeight = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.clientRect = function (element) {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
    };
    NoopDomAdapter.prototype.minWidth = function (element) {
        return 0;
    };
    NoopDomAdapter.prototype.focus = function (element) { };
    NoopDomAdapter = __decorate([
        Injectable()
    ], NoopDomAdapter);
    return NoopDomAdapter;
}());

var DatagridRowRenderer = /** @class */ (function () {
    function DatagridRowRenderer(columnsService) {
        this.columnsService = columnsService;
        this.subscriptions = [];
    }
    DatagridRowRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.setColumnState(); // case #3 and #4
        this.subscriptions.push(this.cells.changes.subscribe(function () {
            _this.setColumnState(); // case #2
            // Note on case #2: In the case of dynamic columns, when one column (header/cell together) gets deleted,
            // this.cells.changes emits before this.columnsService.columns gets updated in MainRenderer
            // when this.headers.changes emits as well. So that means there will be n+1 column state providers
            // when this.cells.changes emits. Hence, we should quit earlier there. But this method will be called
            // right after again when this.headers.changes emits. By then, there will be the same number of column state
            // providers as column headers.
        }));
    };
    DatagridRowRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DatagridRowRenderer.prototype.setColumnState = function () {
        var _this = this;
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
            this.cells.forEach(function (cell, index) {
                if (_this.columnsService.columns[index]) {
                    cell.columnState = _this.columnsService.columns[index];
                }
            });
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
    return DatagridRowRenderer;
}());

// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
var domAdapterFactory = function (platformId) {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
var DatagridMainRenderer = /** @class */ (function () {
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        var _this = this;
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
            .subscribe(function () { return _this.computeHeadersWidth(); }));
        this.subscriptions.push(this.page.sizeChange.subscribe(function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(function () { return (_this.shouldStabilizeColumns = true); }));
    }
    DatagridMainRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe(function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            _this.setupColumns();
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        }));
    };
    // Initialize and set Table width for horizontal scrolling here.
    DatagridMainRenderer.prototype.ngAfterViewInit = function () {
        this.tableSizeService.table = this.el;
    };
    DatagridMainRenderer.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(function () {
                _this.computeDatagridHeight();
            });
        }
    };
    DatagridMainRenderer.prototype.setupColumns = function () {
        this.headers.forEach(function (header, index) { return header.setColumnState(index); });
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(function (row) { return row.setColumnState(); });
    };
    DatagridMainRenderer.prototype.shouldComputeHeight = function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
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
    DatagridMainRenderer.prototype.computeDatagridHeight = function () {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        var value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    };
    DatagridMainRenderer.prototype.resetDatagridHeight = function () {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    };
    DatagridMainRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Makes each header compute its width.
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = function () {
        var _this = this;
        var nbColumns = this.headers.length;
        var allStrict = true;
        this.headers.forEach(function (header, index) {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            var state = __assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            _this.columnsService.emitStateChangeAt(index, state);
        });
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    DatagridMainRenderer.prototype.stabilizeColumns = function () {
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
    return DatagridMainRenderer;
}());

// https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
var ClrPopoverContent = /** @class */ (function () {
    function ClrPopoverContent(document, container, template, renderer, smartPositionService, smartEventsService, smartOpenService) {
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
    Object.defineProperty(ClrPopoverContent.prototype, "open", {
        set: function (value) {
            this.smartOpenService.open = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "contentAt", {
        set: function (position) {
            this.smartPositionService.position = position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "outsideClickClose", {
        set: function (clickToClose) {
            this.smartEventsService.outsideClickClose = !!clickToClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrPopoverContent.prototype, "scrollToClose", {
        set: function (scrollToClose) {
            this.smartEventsService.scrollToClose = !!scrollToClose;
        },
        enumerable: true,
        configurable: true
    });
    ClrPopoverContent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(function (change) {
            if (change) {
                _this.addContent();
            }
            else {
                _this.removeContent();
            }
        }));
    };
    ClrPopoverContent.prototype.ngOnDestroy = function () {
        this.removeContent();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ClrPopoverContent.prototype.removeContent = function () {
        var _this = this;
        if (!this.view) {
            return;
        }
        this.view.rootNodes.forEach(function (node) { return _this.renderer.removeChild(_this.document.body, node); });
        this.container.clear();
        delete this.view;
        this.hasPositionCoords = false;
    };
    /**
     * TODO(matt): investigate why DebugElement retains a reference to the nodes and causes a memory leak.
     * A note about the use of appendChild/removeChild
     * The DebugElement is keeping a reference to the detached node and its unclear why.
     * This does warrant further investigation. But, since it doesn't happen in production mode
     * it is a low priority issue for now.
     */
    ClrPopoverContent.prototype.addContent = function () {
        var _this = this;
        // Create the view container
        this.view = this.container.createEmbeddedView(this.template);
        this.smartEventsService.contentRef = this.view.rootNodes[0]; // So we know where/what to set close focus on
        // Position the content and add a click listener
        this.renderer.addClass(this.view.rootNodes[0], 'clr-popover-content');
        this.renderer.listen(this.view.rootNodes[0], 'click', function (event) {
            _this.smartOpenService.openEvent = event;
        });
        this.view.rootNodes.forEach(function (node) {
            _this.renderer.appendChild(_this.document.body, node);
        });
    };
    ClrPopoverContent.prototype.ngAfterContentChecked = function () {
        // In order to get accurate content height/width values, we cannot calculate alignment offsets until after the
        // projected content has stabilized.
        if (this.smartOpenService.open && this.view && !this.hasPositionCoords) {
            var positionCoords = this.smartPositionService.alignContent(this.view.rootNodes[0]);
            this.renderer.setStyle(this.view.rootNodes[0], 'top', positionCoords.yOffset + "px");
            this.renderer.setStyle(this.view.rootNodes[0], 'left', positionCoords.xOffset + "px");
            this.hasPositionCoords = true;
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
    return ClrPopoverContent;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrPopoverOpenCloseButton = /** @class */ (function () {
    function ClrPopoverOpenCloseButton(smartOpenService) {
        var _this = this;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.openCloseChange = new EventEmitter();
        this.subscriptions.push(this.smartOpenService.openChange.subscribe(function (change) {
            _this.openCloseChange.next(change);
        }));
    }
    ClrPopoverOpenCloseButton.prototype.handleClick = function (event) {
        this.smartOpenService.toggleWithEvent(event);
    };
    ClrPopoverOpenCloseButton.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrPopoverOpenCloseButton;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrPopoverCloseButton = /** @class */ (function () {
    function ClrPopoverCloseButton(elementRef, smartEventsService, smartOpenService) {
        var _this = this;
        this.elementRef = elementRef;
        this.smartEventsService = smartEventsService;
        this.smartOpenService = smartOpenService;
        this.subscriptions = [];
        this.closeChange = new EventEmitter();
        this.subscriptions.push(smartOpenService.openChange.pipe(filter(function (value) { return !value; })).subscribe(function () {
            _this.closeChange.next();
        }));
    }
    ClrPopoverCloseButton.prototype.handleClick = function (event) {
        this.smartOpenService.toggleWithEvent(event);
        this.smartEventsService.setAnchorFocus();
    };
    ClrPopoverCloseButton.prototype.ngAfterViewInit = function () {
        this.smartEventsService.closeButtonRef = this.elementRef;
        this.smartEventsService.setCloseFocus();
    };
    ClrPopoverCloseButton.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrPopoverCloseButton;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrPopoverAnchor = /** @class */ (function () {
    function ClrPopoverAnchor(smartEventService, element) {
        smartEventService.anchorButtonRef = element;
    }
    ClrPopoverAnchor = __decorate([
        Directive({
            selector: '[clrPopoverAnchor]',
            host: {
                '[class.clr-anchor]': 'true',
            },
        }),
        __metadata("design:paramtypes", [ClrPopoverEventsService, ElementRef])
    ], ClrPopoverAnchor);
    return ClrPopoverAnchor;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
var ClrPopoverModuleNext = /** @class */ (function () {
    function ClrPopoverModuleNext() {
    }
    ClrPopoverModuleNext = __decorate([
        NgModule({
            imports: [],
            declarations: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
            exports: [ClrPopoverAnchor, ClrPopoverCloseButton, ClrPopoverOpenCloseButton, ClrPopoverContent],
        })
    ], ClrPopoverModuleNext);
    return ClrPopoverModuleNext;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_DATAGRID_DIRECTIVES = [
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
var ClrDatagridModule = /** @class */ (function () {
    function ClrDatagridModule() {
    }
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
    return ClrDatagridModule;
}());

var ClrStackBlock = /** @class */ (function () {
    /*
       * This would be more efficient with @ContentChildren, with the parent ClrStackBlock
       * querying for children StackBlocks, but this feature is not available when downgrading
       * the component for Angular 1.
       */
    function ClrStackBlock(parent, uniqueId, commonStrings) {
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
    Object.defineProperty(ClrStackBlock.prototype, "getChangedValue", {
        get: function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "setChangedValue", {
        set: function (value) {
            this._changed = value;
            if (this.parent && this._fullyInitialized) {
                if (value) {
                    this.parent._changedChildren++;
                }
                else {
                    this.parent._changedChildren--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrStackBlock.prototype.ngOnInit = function () {
        // in order to access the parent ClrStackBlock's properties,
        // the child ClrStackBlock has to be fully initialized at first.
        this._fullyInitialized = true;
    };
    ClrStackBlock.prototype.addChild = function () {
        this.expandable = true;
    };
    ClrStackBlock.prototype.toggleExpand = function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    Object.defineProperty(ClrStackBlock.prototype, "caretDirection", {
        get: function () {
            return this.expanded ? 'down' : 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "caretTitle", {
        get: function () {
            return this.expanded ? this.commonStrings.keys.collapse : this.commonStrings.keys.expand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "role", {
        get: function () {
            return this.expandable ? 'button' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "tabIndex", {
        get: function () {
            return this.expandable ? '0' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "onStackLabelFocus", {
        get: function () {
            return this.expandable && !this.expanded && this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStackBlock.prototype, "ariaExpanded", {
        get: function () {
            if (!this.expandable) {
                return null;
            }
            else {
                return this.expanded ? 'true' : 'false';
            }
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <dt class=\"stack-block-label\"\n        (click)=\"toggleExpand()\"\n        (keyup.enter)=\"toggleExpand()\"\n        (keyup.space)=\"toggleExpand()\"\n        (focus)=\"focused = true\"\n        (blur)=\"focused = false\"\n        [id]=\"uniqueId\"\n        [attr.role]=\"role\"\n        [attr.tabindex]=\"tabIndex\"\n        [attr.aria-expanded]=\"ariaExpanded\">\n      <clr-icon shape=\"caret\"\n                class=\"stack-block-caret\"\n                *ngIf=\"expandable\"\n                [attr.dir]=\"caretDirection\"\n                [attr.title]=\"caretTitle\"></clr-icon>\n      <span class=\"clr-sr-only\" *ngIf=\"getChangedValue\">{{commonStrings.keys.stackViewChanged}}</span>\n      <ng-content select=\"clr-stack-label\"></ng-content>\n    </dt>\n    <dd class=\"stack-block-content\">\n      <ng-content></ng-content>\n    </dd>\n    <clr-expandable-animation [@clrExpandTrigger]=\"expanded\" class=\"stack-children\">\n      <div [style.height]=\"expanded ? 'auto' : 0\">\n        <ng-content select=\"clr-stack-block\"></ng-content>\n      </div>\n    </clr-expandable-animation>\n  ",
            // Make sure the host has the proper class for styling purposes
            host: { '[class.stack-block]': 'true' },
            providers: [UNIQUE_ID_PROVIDER],
            styles: ["\n        :host { display: block; }\n    "]
        }),
        __param(0, SkipSelf()),
        __param(0, Optional()),
        __param(1, Inject(UNIQUE_ID)),
        __metadata("design:paramtypes", [ClrStackBlock, String, ClrCommonStringsService])
    ], ClrStackBlock);
    return ClrStackBlock;
}());

var ClrStackView = /** @class */ (function () {
    function ClrStackView() {
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
    Object.defineProperty(ClrStackView.prototype, "editing", {
        get: function () {
            return this.editable && this._editMode;
        },
        set: function (value) {
            if (this.editable) {
                this._editMode = value;
                this.editingChange.emit(value);
                if (!value) {
                    this.save.emit(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output('clrStackSave'),
        __metadata("design:type", EventEmitter)
    ], ClrStackView.prototype, "save", void 0);
    ClrStackView = __decorate([
        Component({
            selector: 'clr-stack-view',
            template: "\n        <ng-content select=\"clr-stack-header\"></ng-content>\n        <dl class=\"stack-view\"><ng-content></ng-content></dl>\n    ",
            styles: ["\n        :host { display: block; }\n    "]
        })
    ], ClrStackView);
    return ClrStackView;
}());

var ClrStackHeader = /** @class */ (function () {
    function ClrStackHeader(stackView) {
        this.stackView = stackView;
    }
    ClrStackHeader = __decorate([
        Component({
            selector: 'clr-stack-header',
            template: "\n        <h4 class=\"stack-header\">\n            <span class=\"stack-title\"><ng-content></ng-content></span>\n            \n            <span class=\"stack-actions\">\n                <ng-content select=\".stack-action\"></ng-content>\n                <!-- Undocumented experimental feature: inline editing. -->\n                <button *ngIf=\"stackView.editable\" class=\"stack-action btn btn-sm btn-link\" \n                        (click)=\"stackView.editing = !stackView.editing\" type=\"button\">\n                        Edit\n                </button>\n                <!-- End of undocumented experimental feature. -->\n            </span>\n        </h4>\n    ",
            styles: ["\n        :host { display: block; }\n    "]
        }),
        __metadata("design:paramtypes", [ClrStackView])
    ], ClrStackHeader);
    return ClrStackHeader;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StackControl = /** @class */ (function () {
    function StackControl(stackView) {
        var _this = this;
        this.stackView = stackView;
        this.modelChange = new EventEmitter(false);
        // Make the ClrStackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe(function (editing) {
            // Edit mode was closed
            if (!editing) {
                _this.modelChange.emit(_this.model);
            }
        });
    }
    return StackControl;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrStackInput = /** @class */ (function (_super) {
    __extends(ClrStackInput, _super);
    function ClrStackInput(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        _this.type = 'text';
        return _this;
    }
    ClrStackInput = __decorate([
        Component({
            selector: 'clr-stack-input',
            inputs: ['model: clrModel', 'type'],
            outputs: ['modelChange: clrModelChange'],
            template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <input [type]=\"type\" *ngIf=\"stackView.editing\" [(ngModel)]=\"model\"/>\n    "
        }),
        __metadata("design:paramtypes", [ClrStackView])
    ], ClrStackInput);
    return ClrStackInput;
}(StackControl));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrStackSelect = /** @class */ (function (_super) {
    __extends(ClrStackSelect, _super);
    function ClrStackSelect(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        return _this;
    }
    ClrStackSelect = __decorate([
        Component({
            selector: 'clr-stack-select',
            inputs: ['model: clrModel'],
            outputs: ['modelChange: clrModelChange'],
            template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <div class=\"select\" *ngIf=\"stackView.editing\" >\n            <select [(ngModel)]=\"model\">\n                <ng-content></ng-content>\n            </select>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [ClrStackView])
    ], ClrStackSelect);
    return ClrStackSelect;
}(StackControl));

var ClrStackViewCustomTags = /** @class */ (function () {
    function ClrStackViewCustomTags() {
    }
    ClrStackViewCustomTags = __decorate([
        Directive({ selector: 'clr-stack-label, clr-stack-content' })
    ], ClrStackViewCustomTags);
    return ClrStackViewCustomTags;
}());

var ClrStackContentInput = /** @class */ (function () {
    function ClrStackContentInput(uniqueId) {
        this.uniqueId = uniqueId;
    }
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
    return ClrStackContentInput;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_STACK_VIEW_DIRECTIVES = [
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
var ClrStackViewModule = /** @class */ (function () {
    function ClrStackViewModule() {
    }
    ClrStackViewModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ClrIconModule, ClrExpandableAnimationModule],
            declarations: [CLR_STACK_VIEW_DIRECTIVES],
            exports: [CLR_STACK_VIEW_DIRECTIVES],
        })
    ], ClrStackViewModule);
    return ClrStackViewModule;
}());

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
var TreeNodeModel = /** @class */ (function () {
    function TreeNodeModel() {
        this.selected = new BehaviorSubject(ClrSelectedState.UNSELECTED);
        /*
         * Being able to push this down to the RecursiveTreeNodeModel would require too much work on the angular components
         * right now for them to know which kind of model they are using. So I'm lifting the public properties to this
         * abstract parent class for now and we can revisit it later, when we're not facing such a close deadline.
         */
        this.loading = false;
    }
    TreeNodeModel.prototype.destroy = function () {
        // Just to be safe
        this.selected.complete();
    };
    // Propagate by default when eager, don't propagate in the lazy-loaded tree.
    TreeNodeModel.prototype.setSelected = function (state, propagateUp, propagateDown) {
        if (state === this.selected.value) {
            return;
        }
        this.selected.next(state);
        if (propagateDown && state !== ClrSelectedState.INDETERMINATE && this.children) {
            this.children.forEach(function (child) { return child.setSelected(state, false, true); });
        }
        if (propagateUp && this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    TreeNodeModel.prototype.toggleSelection = function (propagate) {
        // Both unselected and indeterminate toggle to selected
        var newState = this.selected.value === ClrSelectedState.SELECTED ? ClrSelectedState.UNSELECTED : ClrSelectedState.SELECTED;
        // NOTE: we always propagate selection up in this method because it is only called when the user takes an action.
        // It should never be called from lifecycle hooks or app-provided inputs.
        this.setSelected(newState, true, propagate);
    };
    TreeNodeModel.prototype.computeSelectionStateFromChildren = function () {
        var e_1, _a;
        var oneSelected = false;
        var oneUnselected = false;
        try {
            // Using a good old for loop to exit as soon as we can tell, for better performance on large trees.
            for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!oneSelected) {
            return ClrSelectedState.UNSELECTED;
        }
        else if (!oneUnselected) {
            return ClrSelectedState.SELECTED;
        }
    };
    /*
     * Internal, but needs to be called by other nodes
     */
    TreeNodeModel.prototype._updateSelectionFromChildren = function () {
        var newState = this.computeSelectionStateFromChildren();
        if (newState === this.selected.value) {
            return;
        }
        this.selected.next(newState);
        if (this.parent) {
            this.parent._updateSelectionFromChildren();
        }
    };
    return TreeNodeModel;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
var DeclarativeTreeNodeModel = /** @class */ (function (_super) {
    __extends(DeclarativeTreeNodeModel, _super);
    function DeclarativeTreeNodeModel(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        if (parent) {
            parent._addChild(_this);
        }
        _this.children = [];
        return _this;
    }
    DeclarativeTreeNodeModel.prototype._addChild = function (child) {
        this.children.push(child);
    };
    DeclarativeTreeNodeModel.prototype._removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    DeclarativeTreeNodeModel.prototype.destroy = function () {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        _super.prototype.destroy.call(this);
    };
    return DeclarativeTreeNodeModel;
}(TreeNodeModel));

var TreeFeaturesService = /** @class */ (function () {
    function TreeFeaturesService() {
        this.selectable = false;
        this.eager = true;
        this.childrenFetched = new Subject();
    }
    TreeFeaturesService = __decorate([
        Injectable()
    ], TreeFeaturesService);
    return TreeFeaturesService;
}());
function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
var TREE_FEATURES_PROVIDER = {
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
var ClrTreeNode = /** @class */ (function () {
    function ClrTreeNode(nodeId, parent, featuresService, expandService, commonStrings, injector) {
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
    ClrTreeNode.prototype.isExpandable = function () {
        if (typeof this.expandable !== 'undefined') {
            return this.expandable;
        }
        return !!this.expandService.expandable || (this._model.children && this._model.children.length > 0);
    };
    Object.defineProperty(ClrTreeNode.prototype, "selected", {
        get: function () {
            return this._model.selected.value;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "treeNodeRole", {
        get: function () {
            return this._model.parent ? 'treeitem' : 'tree';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "rootAriaMultiSelectable", {
        get: function () {
            if (this._model.parent || !this.featuresService.selectable) {
                return null;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "ariaSelected", {
        get: function () {
            return this.featuresService.selectable ? this._model.selected.value === ClrSelectedState.SELECTED : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTreeNode.prototype, "expanded", {
        // I'm caving on this, for tree nodes I think we can tolerate having a two-way binding on the component
        // rather than enforce the clrIfExpanded structural directive for dynamic cases. Mostly because for the smart
        // case, you can't use a structural directive, it would need to go on an ng-container.
        get: function () {
            return this.expandService.expanded;
        },
        set: function (value) {
            this.expandService.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    ClrTreeNode.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this._model.selected.pipe(filter(function () { return !_this.skipEmitChange; })).subscribe(function (value) { return _this.selectedChange.emit(value); }));
        this.subscriptions.push(this.expandService.expandChange.subscribe(function (value) { return _this.expandedChange.emit(value); }));
    };
    ClrTreeNode.prototype.ngOnDestroy = function () {
        this._model.destroy();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrTreeNode;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTree = /** @class */ (function () {
    // This component can also be used just to declare providers once for trees with multiple root nodes.
    function ClrTree(featuresService) {
        this.featuresService = featuresService;
    }
    Object.defineProperty(ClrTree.prototype, "lazy", {
        set: function (value) {
            this.featuresService.eager = !value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input('clrLazy'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ClrTree.prototype, "lazy", null);
    ClrTree = __decorate([
        Component({
            selector: 'clr-tree',
            template: "\n    <ng-content></ng-content>\n    <clr-recursive-children *ngIf=\"featuresService.recursion\"\n                            [children]=\"featuresService.recursion.root\"></clr-recursive-children>\n  ",
            providers: [TREE_FEATURES_PROVIDER]
        }),
        __metadata("design:paramtypes", [TreeFeaturesService])
    ], ClrTree);
    return ClrTree;
}());

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
var RecursiveTreeNodeModel = /** @class */ (function (_super) {
    __extends(RecursiveTreeNodeModel, _super);
    function RecursiveTreeNodeModel(model, parent, getChildren, featuresService) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        _this.featuresService = featuresService;
        _this.childrenFetched = false;
        _this._children = [];
        _this.model = model;
        _this.parent = parent;
        return _this;
    }
    RecursiveTreeNodeModel.prototype.clearChildren = function () {
        this._children.forEach(function (child) { return child.destroy(); });
        delete this._children;
        this.childrenFetched = false;
    };
    RecursiveTreeNodeModel.prototype.fetchChildren = function () {
        var _this = this;
        if (this.childrenFetched) {
            return;
        }
        var asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            });
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
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
    };
    RecursiveTreeNodeModel.prototype.wrapChildren = function (rawModels) {
        var _this = this;
        return rawModels.map(function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren, _this.featuresService); });
    };
    Object.defineProperty(RecursiveTreeNodeModel.prototype, "children", {
        get: function () {
            this.fetchChildren();
            return this._children;
        },
        set: function (value) {
            this._children = value;
        },
        enumerable: true,
        configurable: true
    });
    RecursiveTreeNodeModel.prototype.destroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.destroy.call(this);
    };
    return RecursiveTreeNodeModel;
}(TreeNodeModel));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrRecursiveForOf = /** @class */ (function () {
    function ClrRecursiveForOf(template, featuresService, cdr) {
        this.template = template;
        this.featuresService = featuresService;
        this.cdr = cdr;
    }
    // I'm using OnChanges instead of OnInit to easily keep up to date with dynamic trees. Maybe optimizable later.
    ClrRecursiveForOf.prototype.ngOnChanges = function () {
        var _this = this;
        var wrapped;
        if (Array.isArray(this.nodes)) {
            wrapped = this.nodes.map(function (node) { return new RecursiveTreeNodeModel(node, null, _this.getChildren, _this.featuresService); });
        }
        else {
            wrapped = [new RecursiveTreeNodeModel(this.nodes, null, this.getChildren, this.featuresService)];
        }
        if (!this.childrenFetchSubscription) {
            this.childrenFetchSubscription = this.featuresService.childrenFetched.subscribe(function () {
                _this.cdr.detectChanges();
            });
        }
        this.featuresService.recursion = {
            template: this.template,
            root: wrapped,
        };
    };
    ClrRecursiveForOf.prototype.ngOnDestroy = function () {
        if (this.childrenFetchSubscription) {
            this.childrenFetchSubscription.unsubscribe();
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
    return ClrRecursiveForOf;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var RecursiveChildren = /** @class */ (function () {
    function RecursiveChildren(featuresService, expandService) {
        var _this = this;
        this.featuresService = featuresService;
        this.expandService = expandService;
        if (expandService) {
            this.subscription = this.expandService.expandChange.subscribe(function (value) {
                if (!value && _this.parent && !_this.featuresService.eager && _this.featuresService.recursion) {
                    // In the case of lazy-loading recursive trees, we clear the children on collapse.
                    // This is better in case they change between two user interaction, and that way
                    // the app itself can decide whether to cache them or not.
                    _this.parent.clearChildren();
                }
            });
        }
    }
    RecursiveChildren.prototype.shouldRender = function () {
        return (this.featuresService.recursion &&
            // In the smart case, we eagerly render all the recursive children
            // to make sure two-way bindings for selection are available.
            // They will be hidden with CSS by the parent.
            (this.featuresService.eager || !this.expandService || this.expandService.expanded));
    };
    RecursiveChildren.prototype.getContext = function (node) {
        return {
            $implicit: node.model,
            clrModel: node,
        };
    };
    RecursiveChildren.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
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
            template: "\n    <ng-container *ngIf=\"shouldRender()\">\n      <ng-container *ngFor=\"let child of parent?.children || children\">\n        <ng-container *ngTemplateOutlet=\"featuresService.recursion.template; context: getContext(child)\"></ng-container>\n      </ng-container>\n    </ng-container>\n  "
        })
        /**
         * Internal component, do not export!
         * This is part of the hack to get around https://github.com/angular/angular/issues/15998
         */
        ,
        __param(1, Optional()),
        __metadata("design:paramtypes", [TreeFeaturesService, IfExpandService])
    ], RecursiveChildren);
    return RecursiveChildren;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_TREE_VIEW_DIRECTIVES = [ClrTree, ClrTreeNode, ClrRecursiveForOf];
var ClrTreeViewModule = /** @class */ (function () {
    function ClrTreeViewModule() {
    }
    ClrTreeViewModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrLoadingModule],
            declarations: [CLR_TREE_VIEW_DIRECTIVES, RecursiveChildren],
            exports: [CLR_TREE_VIEW_DIRECTIVES],
        })
    ], ClrTreeViewModule);
    return ClrTreeViewModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDataModule = /** @class */ (function () {
    function ClrDataModule() {
    }
    ClrDataModule = __decorate([
        NgModule({ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] })
    ], ClrDataModule);
    return ClrDataModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FocusableItem = /** @class */ (function () {
    function FocusableItem() {
    }
    return FocusableItem;
}());

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
var FocusService$1 = /** @class */ (function () {
    function FocusService(renderer) {
        this.renderer = renderer;
        this._unlistenFuncs = [];
    }
    Object.defineProperty(FocusService.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    FocusService.prototype.reset = function (first) {
        this._current = first;
    };
    FocusService.prototype.listenToArrowKeys = function (el) {
        var _this = this;
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', function (event) { return !_this.move(ArrowKeyDirection.UP, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', function (event) { return !_this.move(ArrowKeyDirection.DOWN, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowleft', function (event) { return !_this.move(ArrowKeyDirection.LEFT, event); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', function (event) { return !_this.move(ArrowKeyDirection.RIGHT, event); }));
    };
    FocusService.prototype.registerContainer = function (el) {
        var _this = this;
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.space', function () { return !_this.activateCurrent(); }));
        this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.enter', function () { return !_this.activateCurrent(); }));
    };
    FocusService.prototype.moveTo = function (item) {
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    };
    FocusService.prototype.move = function (direction, event) {
        var _this = this;
        if (event === void 0) { event = undefined; }
        if (this.current) {
            // We want to prevent default behavior that results from the keydown,
            // which may undesirably move the cursor around when using a screen reader
            if (event) {
                event.preventDefault();
            }
            var next = this.current[direction];
            if (next) {
                // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
                // If performance ever matters for this, we can refactor using additional private methods.
                var nextObs = isObservable(next) ? next : of(next);
                nextObs.subscribe(function (item) {
                    _this.moveTo(item);
                    return true;
                });
            }
        }
        return false;
    };
    FocusService.prototype.activateCurrent = function () {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    };
    FocusService.prototype.detachListeners = function () {
        this._unlistenFuncs.forEach(function (unlisten) { return unlisten(); });
    };
    FocusService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Renderer2])
    ], FocusService);
    return FocusService;
}());
function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService$1(renderer);
}
var FOCUS_SERVICE_PROVIDER = {
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
    items.forEach(function (item) { return (item[direction] = parent); });
}
/**
 * Double-links a set of focusable items vertically, possibly looping
 */
function linkVertical(items, loop) {
    if (loop === void 0) { loop = true; }
    items.forEach(function (item, index) {
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
    return Observable.create(function (observer) {
        onSubscribe(observer);
        var subscription = observable.subscribe(observer);
        return function () {
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
var DropdownFocusHandler = /** @class */ (function () {
    function DropdownFocusHandler(id, renderer, parent, ifOpenService, focusService, platformId) {
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
    DropdownFocusHandler.prototype.moveToFirstItemWhenOpen = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (open && _this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout(function () {
                    _this.focusService.moveTo(_this);
                    if (_this.parent) {
                        _this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        _this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                });
            }
        });
    };
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    DropdownFocusHandler.prototype.handleRootFocus = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                _this.focusService.reset(_this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (_this.focusBackOnTrigger) {
                    _this.focus();
                }
            }
            _this.focusBackOnTrigger = open;
        });
    };
    Object.defineProperty(DropdownFocusHandler.prototype, "trigger", {
        get: function () {
            return this._trigger;
        },
        set: function (el) {
            var _this = this;
            this._trigger = el;
            this.renderer.setAttribute(el, 'id', this.id);
            if (this.parent) {
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowright', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
            }
            else {
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowup', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.arrowdown', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                this.focusService.listenToArrowKeys(el);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownFocusHandler.prototype, "container", {
        get: function () {
            return this._container;
        },
        set: function (el) {
            var _this = this;
            this._container = el;
            // whether root container or not, tab key should always toggle (i.e. close) the container
            this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.tab', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
            if (this.parent) {
                // if it's a nested container, pressing esc has the same effect as pressing left key, which closes the current
                // popup and moves up to its parent. Here, we stop propagation so that the parent container
                // doesn't receive the esc keydown
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', function (event) {
                    _this.focusService.move(ArrowKeyDirection.LEFT, event);
                    event.stopPropagation();
                }));
            }
            else {
                // The root container is the only one we register to the focus service, others do not need focus
                this.focusService.registerContainer(el);
                // The root container will simply close the container when esc key is pressed
                this._unlistenFuncs.push(this.renderer.listen(el, 'keydown.esc', function (event) { return _this.ifOpenService.toggleWithEvent(event); }));
                // When the user moves focus outside of the menu, we close the dropdown
                this._unlistenFuncs.push(this.renderer.listen(el, 'blur', function (event) {
                    // we clear out any existing focus on the items
                    _this.children.pipe(take(1)).subscribe(function (items) { return items.forEach(function (item) { return item.blur(); }); });
                    // event.relatedTarget is null in IE11. In that case we use document.activeElement which correctly points
                    // to the element we want to check. Note that other browsers might point document.activeElement to the
                    // wrong element. This is ok, because all the other browsers we support relies on event.relatedTarget.
                    var target = event.relatedTarget || document.activeElement;
                    // If the user clicks on an item which triggers the blur, we don't want to close it since it may open a submenu.
                    // In the case of needing to close it (i.e. user selected an item and the dropdown menu is set to close on
                    // selection), dropdown-item.ts handles it.
                    if (target && isPlatformBrowser(_this.platformId)) {
                        if (el.contains(target) || target === _this.trigger) {
                            return;
                        }
                    }
                    // We let the user move focus to where the want, we don't force the focus back on the trigger
                    _this.focusBackOnTrigger = false;
                    _this.ifOpenService.open = false;
                }));
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownFocusHandler.prototype.focus = function () {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.focus();
        }
    };
    DropdownFocusHandler.prototype.blur = function () {
        if (this.trigger && isPlatformBrowser(this.platformId)) {
            this.trigger.blur();
        }
    };
    DropdownFocusHandler.prototype.activate = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    };
    DropdownFocusHandler.prototype.openAndGetChildren = function () {
        var _this = this;
        return wrapObservable(this.children, function () { return (_this.ifOpenService.open = true); });
    };
    DropdownFocusHandler.prototype.closeAndGetThis = function () {
        var _this = this;
        return wrapObservable(of(this), function () { return (_this.ifOpenService.open = false); });
    };
    DropdownFocusHandler.prototype.resetChildren = function () {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
            this.up = this.openAndGetChildren().pipe(map(function (all) { return all[all.length - 1]; }));
        }
    };
    DropdownFocusHandler.prototype.addChildren = function (children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    };
    DropdownFocusHandler.prototype.ngOnDestroy = function () {
        this._unlistenFuncs.forEach(function (unlisten) { return unlisten(); });
        this.focusService.detachListeners();
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
    return DropdownFocusHandler;
}());
var DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);

var RootDropdownService = /** @class */ (function () {
    function RootDropdownService() {
        this._changes = new Subject();
    }
    Object.defineProperty(RootDropdownService.prototype, "changes", {
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RootDropdownService.prototype.closeMenus = function () {
        this._changes.next(false);
    };
    RootDropdownService = __decorate([
        Injectable()
    ], RootDropdownService);
    return RootDropdownService;
}());
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
var ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]],
};

var ClrDropdown = /** @class */ (function () {
    function ClrDropdown(parent, ifOpenService, cdr, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isMenuClosable = true;
        this.subscriptions.push(dropdownService.changes.subscribe(function (value) { return (_this.ifOpenService.open = value); }));
        this.subscriptions.push(ifOpenService.openChange.subscribe(function (value) { return _this.cdr.markForCheck(); }));
    }
    ClrDropdown.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrDropdown;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var BasicFocusableItem = /** @class */ (function () {
    function BasicFocusableItem(id, el, renderer, platformId) {
        this.id = id;
        this.el = el;
        this.renderer = renderer;
        this.platformId = platformId;
        this.disabled = false;
        renderer.setAttribute(el.nativeElement, 'id', id);
        renderer.setAttribute(el.nativeElement, 'tabindex', '-1');
    }
    BasicFocusableItem.prototype.focus = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
            this.el.nativeElement.focus();
        }
    };
    BasicFocusableItem.prototype.blur = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
            this.el.nativeElement.blur();
        }
    };
    BasicFocusableItem.prototype.activate = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.el.nativeElement.click();
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
    return BasicFocusableItem;
}());
var BASIC_FOCUSABLE_ITEM_PROVIDER = [
    UNIQUE_ID_PROVIDER,
    {
        provide: FocusableItem,
        useClass: BasicFocusableItem,
    },
];

var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
        this.setByDeprecatedDisabled = false;
    }
    Object.defineProperty(ClrDropdownItem.prototype, "disabled", {
        get: function () {
            return this.focusableItem.disabled;
        },
        set: function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrDropdownItem.prototype, "disabledDeprecated", {
        get: function () {
            return this.focusableItem.disabled;
        },
        /*
         * @deprecated since 3.0, remove in 4.0. the presence of this attribute makes it not-focusable in IE11. Use [clrDisabled] input instead.
         */
        set: function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
            this.setByDeprecatedDisabled = true;
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownItem.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', function () { return _this.onDropdownItemClick(); });
    };
    ClrDropdownItem.prototype.onDropdownItemClick = function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    ClrDropdownItem.prototype.ngOnDestroy = function () {
        this.unlisten();
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
    return ClrDropdownItem;
}());

var ClrDropdownMenu = /** @class */ (function (_super) {
    __extends(ClrDropdownMenu, _super);
    function ClrDropdownMenu(injector, parentHost, nested, focusHandler) {
        var _this = this;
        if (!parentHost) {
            throw new Error('clr-dropdown-menu should only be used inside of a clr-dropdown');
        }
        _this = _super.call(this, injector, parentHost) || this;
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            _this.anchorPoint = Point.BOTTOM_LEFT;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            _this.anchorPoint = Point.RIGHT_TOP;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        _this.popoverOptions.allowMultipleOpen = true;
        _this.popoverOptions.ignoreGlobalESCListener = true;
        _this.closeOnOutsideClick = true;
        _this.focusHandler = focusHandler;
        return _this;
    }
    Object.defineProperty(ClrDropdownMenu.prototype, "position", {
        set: function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.focusHandler.container = this.el.nativeElement;
        this.items.changes.subscribe(function () { return _this.focusHandler.addChildren(_this.items.toArray()); });
        // I saw this on GitHub as a solution to avoid code duplication because of missed QueryList changes
        this.items.notifyOnChanges();
    };
    ClrDropdownMenu.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.focusHandler.resetChildren();
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
            template: "\n        <ng-content></ng-content>\n    ",
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
    return ClrDropdownMenu;
}(AbstractPopover));

var ClrDropdownTrigger = /** @class */ (function () {
    function ClrDropdownTrigger(dropdown, ifOpenService, el, focusHandler) {
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
        focusHandler.trigger = el.nativeElement;
    }
    Object.defineProperty(ClrDropdownTrigger.prototype, "active", {
        get: function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownTrigger.prototype.onDropdownTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
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
    return ClrDropdownTrigger;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_DROPDOWN_DIRECTIVES = [ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger, ClrDropdownItem];
var ClrDropdownModule = /** @class */ (function () {
    function ClrDropdownModule() {
    }
    ClrDropdownModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrCommonPopoverModule],
            declarations: [CLR_DROPDOWN_DIRECTIVES],
            exports: [CLR_DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule],
        })
    ], ClrDropdownModule);
    return ClrDropdownModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// @TODO Make this an enum
var ALERT_TYPES = ['info', 'warning', 'danger', 'success'];

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AlertIconAndTypesService = /** @class */ (function () {
    function AlertIconAndTypesService(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        get: function () {
            return this._alertType;
        },
        set: function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        get: function () {
            if ('' === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        set: function (val) {
            if (!val) {
                this._alertIconShape = '';
            }
            else if (val !== this._alertIconShape) {
                this._alertIconShape = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconTitle", {
        get: function () {
            return this.iconInfoFromType(this._alertType).title;
        },
        enumerable: true,
        configurable: true
    });
    AlertIconAndTypesService.prototype.iconInfoFromType = function (type) {
        var returnObj = { shape: '', cssClass: '', title: '' };
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
    };
    AlertIconAndTypesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ClrCommonStringsService])
    ], AlertIconAndTypesService);
    return AlertIconAndTypesService;
}());

var MultiAlertService = /** @class */ (function () {
    function MultiAlertService() {
        this.allAlerts = new QueryList();
        this._current = 0;
        /**
         * The Observable that lets other classes subscribe to changes
         */
        this._change = new Subject();
    }
    Object.defineProperty(MultiAlertService.prototype, "changes", {
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (index) {
            if (index !== this._current) {
                this._current = index;
                this._change.next(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "activeAlerts", {
        get: function () {
            return this.allAlerts.filter(function (alert) { return !alert._closed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "currentAlert", {
        get: function () {
            return this.activeAlerts[this.current];
        },
        set: function (alert) {
            this.current = this.activeAlerts.indexOf(alert);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAlertService.prototype, "count", {
        get: function () {
            return this.activeAlerts.length;
        },
        enumerable: true,
        configurable: true
    });
    MultiAlertService.prototype.manage = function (alerts) {
        var _this = this;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.allAlerts = alerts;
        this.subscription = this.allAlerts.changes.subscribe(function () {
            if (_this.current >= _this.allAlerts.length) {
                _this.current = Math.max(0, _this.allAlerts.length - 1);
            }
        });
    };
    MultiAlertService.prototype.next = function () {
        this.current = this.current === this.activeAlerts.length - 1 ? 0 : this.current + 1;
    };
    MultiAlertService.prototype.previous = function () {
        if (this.activeAlerts.length === 0) {
            return;
        }
        this.current = this.current === 0 ? this.activeAlerts.length - 1 : this.current - 1;
    };
    MultiAlertService.prototype.close = function () {
        this.previous();
    };
    MultiAlertService.prototype.destroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    MultiAlertService = __decorate([
        Injectable()
    ], MultiAlertService);
    return MultiAlertService;
}());

var ClrAlert = /** @class */ (function () {
    function ClrAlert(iconService, cdr, multiAlertService, commonStrings) {
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
    Object.defineProperty(ClrAlert.prototype, "alertType", {
        get: function () {
            return this.iconService.alertType;
        },
        set: function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "setAriaLive", {
        /**
         * There is an order on how the attributes will take effect.
         * Assertive, Off, Polite.
         *
         * Polite is default if non is passed.
         *
         * In the case of setting all of them to true. Assertive will be used.
         *
         */
        get: function () {
            if (isBooleanAttributeSet(this.assertive)) {
                return 'assertive';
            }
            if (isBooleanAttributeSet(this.off)) {
                return 'off';
            }
            return 'polite';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertIconShape", {
        set: function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlert.prototype, "alertClass", {
        get: function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.detectChangesIfNeeded = function () {
        if (this.previouslyHidden !== this.hidden) {
            this.previouslyHidden = this.hidden;
            this.cdr.detectChanges();
        }
    };
    Object.defineProperty(ClrAlert.prototype, "isHidden", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    ClrAlert.prototype.close = function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        if (this.multiAlertService) {
            this.multiAlertService.close();
        }
        this._closedChanged.emit(true);
    };
    ClrAlert.prototype.open = function () {
        this._closed = false;
        this._closedChanged.emit(false);
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
    return ClrAlert;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAlertItem = /** @class */ (function () {
    function ClrAlertItem(iconService) {
        this.iconService = iconService;
    }
    ClrAlertItem = __decorate([
        Component({
            selector: 'clr-alert-item',
            template: "\n        <div class=\"alert-icon-wrapper\">\n            <clr-icon class=\"alert-icon\" \n              [attr.shape]=\"iconService.alertIconShape\" \n              [attr.title]=\"iconService.alertIconTitle\"></clr-icon>\n        </div>\n        <ng-content></ng-content>\n    ",
            host: { class: 'alert-item' }
        }),
        __metadata("design:paramtypes", [AlertIconAndTypesService])
    ], ClrAlertItem);
    return ClrAlertItem;
}());

var ClrAlerts = /** @class */ (function () {
    function ClrAlerts(multiAlertService) {
        this.multiAlertService = multiAlertService;
        this.currentAlertIndexChange = new EventEmitter(false);
        this.currentAlertChange = new EventEmitter(false);
    }
    Object.defineProperty(ClrAlerts.prototype, "_inputCurrentIndex", {
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: function (index) {
            if (Number.isInteger(index) && index >= 0) {
                this.multiAlertService.current = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "alerts", {
        /**
         * Ensure we are only dealing with alerts that have not been closed yet
         */
        get: function () {
            return this.allAlerts.filter(function (alert) {
                return alert.isHidden === false;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlerts.prototype, "currentAlertType", {
        get: function () {
            if (this.multiAlertService.currentAlert) {
                return this.multiAlertService.currentAlert.alertType;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    ClrAlerts.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.multiAlertService.manage(this.allAlerts);
        this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.next(index);
            _this.currentAlertChange.next(_this.multiAlertService.currentAlert);
        });
    };
    ClrAlerts.prototype.ngOnDestroy = function () {
        this.multiAlertService.destroy();
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
    return ClrAlerts;
}());

var ClrAlertsPager = /** @class */ (function () {
    function ClrAlertsPager(multiAlertService, commonStrings) {
        this.multiAlertService = multiAlertService;
        this.commonStrings = commonStrings;
        this.currentAlertChange = new EventEmitter(false);
        this.currentAlertIndexChange = new EventEmitter();
    }
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlert", {
        get: function () {
            return this.multiAlertService.currentAlert;
        },
        /**
         * Input/Output to support two way binding on current alert instance
         */
        set: function (alert) {
            if (alert) {
                this.multiAlertService.currentAlert = alert;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrAlertsPager.prototype, "currentAlertIndex", {
        get: function () {
            return this.multiAlertService.current;
        },
        /**
         * Input/Output to support two way binding on current alert index
         */
        set: function (index) {
            this.multiAlertService.current = index;
        },
        enumerable: true,
        configurable: true
    });
    ClrAlertsPager.prototype.ngOnInit = function () {
        var _this = this;
        this.multiAlertServiceChanges = this.multiAlertService.changes.subscribe(function (index) {
            _this.currentAlertIndexChange.emit(index);
            _this.currentAlertChange.emit(_this.multiAlertService.activeAlerts[index]);
        });
    };
    ClrAlertsPager.prototype.pageUp = function () {
        this.multiAlertService.next();
    };
    ClrAlertsPager.prototype.pageDown = function () {
        this.multiAlertService.previous();
    };
    ClrAlertsPager.prototype.ngOnDestroy = function () {
        this.multiAlertServiceChanges.unsubscribe();
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
    return ClrAlertsPager;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_ALERT_DIRECTIVES = [ClrAlert, ClrAlertItem, ClrAlerts, ClrAlertsPager];
var ClrAlertModule = /** @class */ (function () {
    function ClrAlertModule() {
    }
    ClrAlertModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrDropdownModule],
            declarations: [CLR_ALERT_DIRECTIVES],
            exports: [CLR_ALERT_DIRECTIVES],
        })
    ], ClrAlertModule);
    return ClrAlertModule;
}());

var ClrEmphasisModule = /** @class */ (function () {
    function ClrEmphasisModule() {
    }
    ClrEmphasisModule = __decorate([
        NgModule({ exports: [ClrAlertModule] })
    ], ClrEmphasisModule);
    return ClrEmphasisModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ResponsiveNavCodes = /** @class */ (function () {
    function ResponsiveNavCodes() {
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
    return ResponsiveNavCodes;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ResponsiveNavControlMessage = /** @class */ (function () {
    function ResponsiveNavControlMessage(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "controlCode", {
        get: function () {
            return this._controlCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavControlMessage.prototype, "navLevel", {
        get: function () {
            return this._navLevel;
        },
        enumerable: true,
        configurable: true
    });
    return ResponsiveNavControlMessage;
}());

var ResponsiveNavigationService = /** @class */ (function () {
    function ResponsiveNavigationService() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    Object.defineProperty(ResponsiveNavigationService.prototype, "registeredNavs", {
        get: function () {
            return this.registerNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveNavigationService.prototype, "navControl", {
        get: function () {
            return this.controlNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ResponsiveNavigationService.prototype.registerNav = function (navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    };
    ResponsiveNavigationService.prototype.isNavRegistered = function (navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    };
    ResponsiveNavigationService.prototype.unregisterNav = function (navLevel) {
        var index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    };
    ResponsiveNavigationService.prototype.sendControlMessage = function (controlCode, navLevel) {
        var message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.prototype.closeAllNavs = function () {
        var message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    };
    ResponsiveNavigationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
    ResponsiveNavigationService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], ResponsiveNavigationService);
    return ResponsiveNavigationService;
}());

var ClrMainContainer = /** @class */ (function () {
    function ClrMainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    ClrMainContainer.prototype.ngOnInit = function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: function (message) {
                _this.processMessage(message);
            },
        });
    };
    ClrMainContainer.prototype.processMessage = function (message) {
        var navClass = ResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
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
    };
    ClrMainContainer.prototype.controlNav = function (controlCode, navClass) {
        if (controlCode === ResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    };
    ClrMainContainer.prototype.ngOnDestroy = function () {
        try {
            this._subscription.unsubscribe();
        }
        catch (error) {
        }
    };
    ClrMainContainer = __decorate([
        Directive({ selector: 'clr-main-container', host: { '[class.main-container]': 'true' } }),
        __metadata("design:paramtypes", [ElementRef, ResponsiveNavigationService])
    ], ClrMainContainer);
    return ClrMainContainer;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
var ClrMainContainerModule = /** @class */ (function () {
    function ClrMainContainerModule() {
    }
    ClrMainContainerModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule],
            declarations: [CLR_LAYOUT_DIRECTIVES],
            exports: [CLR_LAYOUT_DIRECTIVES],
        })
    ], ClrMainContainerModule);
    return ClrMainContainerModule;
}());

var MainContainerWillyWonka = /** @class */ (function (_super) {
    __extends(MainContainerWillyWonka, _super);
    function MainContainerWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContainerWillyWonka = __decorate([
        Directive({ selector: 'clr-main-container' })
    ], MainContainerWillyWonka);
    return MainContainerWillyWonka;
}(WillyWonka));

var NavDetectionOompaLoompa = /** @class */ (function (_super) {
    __extends(NavDetectionOompaLoompa, _super);
    function NavDetectionOompaLoompa(cdr, willyWonka, responsiveNavService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-header should only be used inside of a clr-main-container');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.responsiveNavService = responsiveNavService;
        return _this;
    }
    Object.defineProperty(NavDetectionOompaLoompa.prototype, "flavor", {
        // NavDetectionOompaLoompa is the addition of the nav levels
        // Since we support 2 levels, the possibilities are 0, 1 or 3 (1 + 2)
        get: function () {
            return this.responsiveNavService.responsiveNavList.reduce(function (sum, navLevel) { return sum + navLevel; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    NavDetectionOompaLoompa = __decorate([
        Directive({ selector: 'clr-header' }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            MainContainerWillyWonka,
            ResponsiveNavigationService])
    ], NavDetectionOompaLoompa);
    return NavDetectionOompaLoompa;
}(OompaLoompa));

var ClrHeader = /** @class */ (function () {
    function ClrHeader(responsiveNavService, commonStrings) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.commonStrings = commonStrings;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this.openNavLevel = null;
        this.responsiveNavCodes = ResponsiveNavCodes;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            },
        });
    }
    // reset triggers. handles cases when an application has different nav levels on different pages.
    ClrHeader.prototype.resetNavTriggers = function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    // decides which triggers to show on the header
    ClrHeader.prototype.initializeNavTriggers = function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error('More than 2 Nav Levels detected.');
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    // closes the nav that is open
    ClrHeader.prototype.closeOpenNav = function () {
        this.responsiveNavService.closeAllNavs();
    };
    // toggles the nav that is open
    ClrHeader.prototype.toggleNav = function (navLevel) {
        this.openNavLevel = this.openNavLevel === navLevel ? null : navLevel;
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    ClrHeader.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    ClrHeader = __decorate([
        Component({
            selector: 'clr-header',
            template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_1) ? commonStrings.keys.open : commonStrings.keys.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            [attr.aria-label]=\"(openNavLevel !== responsiveNavCodes.NAV_LEVEL_2) ? commonStrings.keys.open : commonStrings.keys.close\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
            host: { '[class.header]': 'true' }
        }),
        __metadata("design:paramtypes", [ResponsiveNavigationService,
            ClrCommonStringsService])
    ], ClrHeader);
    return ClrHeader;
}());

var ClrNavLevel = /** @class */ (function () {
    function ClrNavLevel(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    ClrNavLevel.prototype.ngOnInit = function () {
        if (this.level !== ResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ResponsiveNavCodes.NAV_LEVEL_2) {
            console.error('Nav Level can only be 1 or 2');
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    };
    ClrNavLevel.prototype.addNavClass = function (level) {
        var navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    };
    Object.defineProperty(ClrNavLevel.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrNavLevel.prototype, "responsiveNavCodes", {
        // getter to access the responsive navigation codes from the template
        get: function () {
            return ResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    ClrNavLevel.prototype.open = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_OPEN, this.level);
    };
    ClrNavLevel.prototype.close = function () {
        this.responsiveNavService.sendControlMessage(ResponsiveNavCodes.NAV_CLOSE, this.level);
    };
    // TODO: Figure out whats the best way to do this. Possible methods
    // 1. HostListener (current solution)
    // 2. Directives on the .nav-link class. We discussed on moving away from class selectors but I forget the reason
    // why
    ClrNavLevel.prototype.onMouseClick = function (target) {
        var current = target; // Get the element in the DOM on which the mouse was clicked
        var navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
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
    };
    ClrNavLevel.prototype.ngOnDestroy = function () {
        this.responsiveNavService.unregisterNav(this.level);
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
    return ClrNavLevel;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_NAVIGATION_DIRECTIVES = [
    ClrHeader,
    ClrNavLevel,
    NavDetectionOompaLoompa,
    MainContainerWillyWonka,
];
var ClrNavigationModule = /** @class */ (function () {
    function ClrNavigationModule() {
    }
    ClrNavigationModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrDropdownModule],
            declarations: [CLR_NAVIGATION_DIRECTIVES],
            exports: [CLR_NAVIGATION_DIRECTIVES],
        })
    ], ClrNavigationModule);
    return ClrNavigationModule;
}());

var TemplateRefContainer = /** @class */ (function () {
    function TemplateRefContainer() {
    }
    __decorate([
        ViewChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], TemplateRefContainer.prototype, "template", void 0);
    TemplateRefContainer = __decorate([
        Component({
            template: "\n      <ng-template>\n        <ng-content></ng-content>\n      </ng-template>\n    "
        })
    ], TemplateRefContainer);
    return TemplateRefContainer;
}());

var TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

var ClrTemplateRefModule = /** @class */ (function () {
    function ClrTemplateRefModule() {
    }
    ClrTemplateRefModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [TEMPLATE_REF_DIRECTIVES],
            entryComponents: [TEMPLATE_REF_DIRECTIVES],
            exports: [TEMPLATE_REF_DIRECTIVES],
        })
    ], ClrTemplateRefModule);
    return ClrTemplateRefModule;
}());

var TabsWillyWonka = /** @class */ (function (_super) {
    __extends(TabsWillyWonka, _super);
    function TabsWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabsWillyWonka = __decorate([
        Directive({ selector: 'clr-tabs' })
    ], TabsWillyWonka);
    return TabsWillyWonka;
}(WillyWonka));

var ActiveOompaLoompa = /** @class */ (function (_super) {
    __extends(ActiveOompaLoompa, _super);
    function ActiveOompaLoompa(cdr, willyWonka, id, ifActive) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.ifActive = ifActive;
        _this.id = id;
        return _this;
    }
    Object.defineProperty(ActiveOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.ifActive.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ActiveOompaLoompa = __decorate([
        Directive({ selector: '[clrTabLink], clr-tab-content' }),
        __param(1, Optional()),
        __param(2, Inject(IF_ACTIVE_ID)),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            TabsWillyWonka, Number, IfActiveService])
    ], ActiveOompaLoompa);
    return ActiveOompaLoompa;
}(OompaLoompa));

// TODO: if we find more components that could use this, consider moving this to utils
var AriaService = /** @class */ (function () {
    function AriaService() {
    }
    AriaService = __decorate([
        Injectable()
    ], AriaService);
    return AriaService;
}());

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

var TabsService = /** @class */ (function () {
    function TabsService() {
        this._children = [];
        this.layout = TabsLayout.HORIZONTAL;
    }
    TabsService.prototype.register = function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        get: function () {
            return this.children.find(function (tab) {
                return tab.active;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        get: function () {
            if (this.layout === TabsLayout.VERTICAL) {
                return [];
            }
            else {
                return this.children.filter(function (tab) { return tab.tabLink.inOverflow === true; });
            }
        },
        enumerable: true,
        configurable: true
    });
    TabsService.prototype.unregister = function (tab) {
        var index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    TabsService = __decorate([
        Injectable()
    ], TabsService);
    return TabsService;
}());

var nbTabContentComponents = 0;
var ClrTabContent = /** @class */ (function () {
    function ClrTabContent(ifActiveService, id, ariaService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.tabsService = tabsService;
        if (!this.tabContentId) {
            this.tabContentId = 'clr-tab-content-' + nbTabContentComponents++;
        }
    }
    Object.defineProperty(ClrTabContent.prototype, "templateRef", {
        // The template must be applied on the top-down phase of view-child initialization to prevent
        // components in the content from initializing before a content container exists.
        // Some child components need their container for sizing calculations.
        /* tslint:disable:no-unused-variable */
        set: function (value) {
            this.viewRef = this.tabsService.tabContentViewContainer.createEmbeddedView(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "ariaLabelledBy", {
        /* tslint:enable:no-unused-variable */
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "tabContentId", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        set: function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabContent.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabContent.prototype.ngOnDestroy = function () {
        var index = this.tabsService.tabContentViewContainer.indexOf(this.viewRef);
        if (index > -1) {
            this.tabsService.tabContentViewContainer.remove(index);
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
            template: "\n    <ng-template #tabContentProjectedRef>\n      <section [id]=\"tabContentId\" role=\"tabpanel\" class=\"tab-content\" [class.active]=\"active\"\n               [hidden]=\"!active\"\n               [attr.aria-labelledby]=\"ariaLabelledBy\"\n               [attr.aria-expanded]=\"active\"\n               [attr.aria-hidden]=\"!active\">\n        <ng-content></ng-content>\n      </section>\n    </ng-template>\n    "
        }),
        __param(1, Inject(IF_ACTIVE_ID)),
        __metadata("design:paramtypes", [IfActiveService, Number, AriaService,
            TabsService])
    ], ClrTabContent);
    return ClrTabContent;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbTabsComponent = 0;
var TABS_ID = new InjectionToken('TABS_ID');
function tokenFactory$1() {
    return 'clr-tabs-' + nbTabsComponent++;
}
var TABS_ID_PROVIDER = {
    provide: TABS_ID,
    useFactory: tokenFactory$1,
};

var nbTabLinkComponents = 0;
var ClrTabLink = /** @class */ (function () {
    function ClrTabLink(ifActiveService, id, ariaService, el, cfr, viewContainerRef, tabsService, tabsId) {
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
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer = this.viewContainerRef.createComponent(factory, 1, undefined, [
            [this.el.nativeElement],
        ]).instance;
    }
    Object.defineProperty(ClrTabLink.prototype, "inOverflow", {
        get: function () {
            return this._inOverflow && this.tabsService.layout !== TabsLayout.VERTICAL;
        },
        set: function (inOverflow) {
            this._inOverflow = inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "addLinkClasses", {
        get: function () {
            return !this.inOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "ariaControls", {
        get: function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabLink.prototype, "tabLinkId", {
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        set: function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabLink.prototype.activate = function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(ClrTabLink.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
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
    return ClrTabLink;
}());

var ClrTab = /** @class */ (function () {
    function ClrTab(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    ClrTab.prototype.ngOnDestroy = function () {
        this.tabsService.unregister(this);
    };
    Object.defineProperty(ClrTab.prototype, "active", {
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n        <ng-content></ng-content>\n    ",
            providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
        }),
        __param(1, Inject(IF_ACTIVE_ID)),
        __metadata("design:paramtypes", [IfActiveService, Number, TabsService])
    ], ClrTab);
    return ClrTab;
}());

var ClrTabOverflowContent = /** @class */ (function (_super) {
    __extends(ClrTabOverflowContent, _super);
    function ClrTabOverflowContent(injector, parentHost) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.anchorPoint = Point.BOTTOM_RIGHT;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    ClrTabOverflowContent = __decorate([
        Component({
            selector: 'clr-tab-overflow-content',
            template: "\n        <ng-content></ng-content>\n    ",
            host: {
                '[class.dropdown-menu]': 'true',
            }
        }),
        __param(1, SkipSelf()),
        __metadata("design:paramtypes", [Injector, ElementRef])
    ], ClrTabOverflowContent);
    return ClrTabOverflowContent;
}(AbstractPopover));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrKeyFocusItem = /** @class */ (function () {
    function ClrKeyFocusItem(elementRef, platformId) {
        this.elementRef = elementRef;
        this.platformId = platformId;
        this.tabIndex = -1;
    }
    Object.defineProperty(ClrKeyFocusItem.prototype, "nativeElement", {
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    ClrKeyFocusItem.prototype.focus = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.elementRef.nativeElement.focus();
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
    return ClrKeyFocusItem;
}());

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
    var keyCodes = getKeyCodes(event);
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
    var isIEKeyboardEvent = event.code === undefined;
    return isIEKeyboardEvent ? IEKeyCodes : KeyCodes;
}

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrKeyFocus = /** @class */ (function () {
    function ClrKeyFocus() {
        this.direction = ClrFocusDirection.VERTICAL;
        this.focusOnLoad = false;
        this.focusChange = new EventEmitter();
        this._current = 0;
        this.subscriptions = [];
    }
    Object.defineProperty(ClrKeyFocus.prototype, "focusableItems", {
        get: function () {
            if (this._focusableItems) {
                return this._focusableItems;
            }
            else {
                return this.clrKeyFocusItems.toArray();
            }
        },
        set: function (elements) {
            // We accept a list of focusable elements (HTMLElements or existing Directives) or auto query for clrKeyFocusItem
            // We accept a list reference in the cases where we cannot use ContentChildren to query
            // ContentChildren can be unavailable if content is projected outside the scope of the component (see tabs).
            if (elements && elements.length) {
                this._focusableItems = elements;
                this.initializeFocus();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrKeyFocus.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    ClrKeyFocus.prototype.ngAfterContentInit = function () {
        this.subscriptions.push(this.listenForItemUpdates());
        this.initializeFocus();
    };
    ClrKeyFocus.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrKeyFocus.prototype.handleKeyboardEvent = function (event) {
        var _this = this;
        if (this.prevKeyPressed(event) && this.currentFocusIsNotFirstItem()) {
            this.keyAction(function () { return _this._current--; });
        }
        else if (this.nextKeyPressed(event) && this.currentFocusIsNotLastItem()) {
            this.keyAction(function () { return _this._current++; });
        }
        else if (event.code === KeyCodes.Home) {
            this.keyAction(function () { return (_this._current = 0); });
        }
        else if (event.code === KeyCodes.End) {
            this.keyAction(function () { return (_this._current = _this.focusableItems.length - 1); });
        }
        preventArrowKeyScroll(event);
    };
    ClrKeyFocus.prototype.setClickedItemCurrent = function (event) {
        var position;
        if (this.focusableItems[0].nativeElement) {
            position = this.focusableItems.map(function (item) { return item.nativeElement; }).indexOf(event.target);
        }
        else {
            position = this.focusableItems.indexOf(event.target);
        }
        if (position > -1) {
            this._current = position;
        }
    };
    ClrKeyFocus.prototype.resetTabFocus = function () {
        this.currentItem.tabIndex = -1;
        this._current = 0;
        this.currentItem.tabIndex = 0;
    };
    ClrKeyFocus.prototype.moveTo = function (position) {
        var _this = this;
        if (this.positionInRange(position) && position !== this._current) {
            this.keyAction(function () { return (_this._current = position); });
        }
    };
    ClrKeyFocus.prototype.positionInRange = function (position) {
        return position >= 0 && position < this.focusableItems.length;
    };
    Object.defineProperty(ClrKeyFocus.prototype, "currentItem", {
        get: function () {
            if (this._current >= this.focusableItems.length) {
                return null;
            }
            return this.focusableItems[this._current];
        },
        enumerable: true,
        configurable: true
    });
    ClrKeyFocus.prototype.currentFocusIsNotFirstItem = function () {
        return this._current - 1 >= 0;
    };
    ClrKeyFocus.prototype.currentFocusIsNotLastItem = function () {
        return this._current + 1 < this.focusableItems.length;
    };
    ClrKeyFocus.prototype.initializeFocus = function () {
        if (this.focusableItems && this.focusableItems.length) {
            this.focusableItems.forEach(function (i) { return (i.tabIndex = -1); });
            this.currentItem.tabIndex = 0;
        }
        if (this.focusOnLoad) {
            this.currentItem.focus();
            this.focusChange.next();
        }
    };
    ClrKeyFocus.prototype.listenForItemUpdates = function () {
        var _this = this;
        return this.clrKeyFocusItems.changes.subscribe(function () {
            _this.focusableItems.forEach(function (item) { return (item.tabIndex = -1); });
            _this._current = 0;
            _this.currentItem.tabIndex = 0;
        });
    };
    ClrKeyFocus.prototype.keyAction = function (action) {
        this.currentItem.tabIndex = -1;
        action.call(this);
        this.currentItem.tabIndex = 0;
        this.currentItem.focus();
        this.focusChange.next();
    };
    ClrKeyFocus.prototype.nextKeyPressed = function (event) {
        var keyCodes = getKeyCodes(event);
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
    };
    ClrKeyFocus.prototype.prevKeyPressed = function (event) {
        var keyCodes = getKeyCodes(event);
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
    return ClrKeyFocus;
}());

var ClrTabs = /** @class */ (function () {
    function ClrTabs(ifActiveService, ifOpenService, tabsService, tabsId, commonStrings, platformId) {
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
    Object.defineProperty(ClrTabs.prototype, "overflowPosition", {
        get: function () {
            return this._tabLinkDirectives.filter(function (link) { return !link.inOverflow; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabContentViewContainer", {
        /* tslint:disable:no-unused-variable */
        set: function (value) {
            this.tabsService.tabContentViewContainer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "layout", {
        get: function () {
            return this.tabsService.layout;
        },
        /* tslint:enable:no-unused-variable */
        set: function (layout) {
            if (Object.keys(TabsLayout)
                .map(function (key) {
                return TabsLayout[key];
            })
                .indexOf(layout) >= 0) {
                this.tabsService.layout = layout;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabLinkDirectives", {
        get: function () {
            return this._tabLinkDirectives;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "activeTabInOverflow", {
        get: function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTabs.prototype, "tabIds", {
        get: function () {
            return this.tabsService.children.map(function (tab) { return tab.tabLink.tabLinkId; }).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngAfterContentInit = function () {
        this.subscriptions.push(this.listenForTabLinkChanges(), this.listenForOverflowMenuFocusChanges());
        if (typeof this.ifActiveService.current === 'undefined' && this.tabLinkDirectives[0]) {
            this.tabLinkDirectives[0].activate();
        }
    };
    ClrTabs.prototype.toggleOverflow = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    ClrTabs.prototype.checkFocusVisible = function () {
        if (!this.ifOpenService.open && this.inOverflow()) {
            this.ifOpenService.open = true;
        }
        else if (this.ifOpenService.open && !this.inOverflow()) {
            this.ifOpenService.open = false;
        }
    };
    ClrTabs.prototype.inOverflow = function () {
        return (this.tabLinkElements.indexOf(document.activeElement) > -1 &&
            this.keyFocus.current >= this.overflowPosition);
    };
    Object.defineProperty(ClrTabs.prototype, "isVertical", {
        get: function () {
            return this.layout === TabsLayout.VERTICAL;
        },
        enumerable: true,
        configurable: true
    });
    ClrTabs.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    ClrTabs.prototype.listenForTabLinkChanges = function () {
        var _this = this;
        return this.tabs.changes.pipe(startWith(this.tabs.map(function (tab) { return tab.tabLink; }))).subscribe(function () {
            _this._tabLinkDirectives = _this.tabs.map(function (tab) { return tab.tabLink; });
            _this.tabLinkElements = _this._tabLinkDirectives.map(function (tab) { return tab.el.nativeElement; });
        });
    };
    ClrTabs.prototype.listenForOverflowMenuFocusChanges = function () {
        var _this = this;
        return this.ifOpenService.openChange.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function (open) {
            if (open && !_this.inOverflow()) {
                _this.focusToFirstItemInOverflow();
            }
            else if (!open && _this.nextFocusedItemIsNotInOverflow()) {
                _this.keyFocus.resetTabFocus();
            }
        });
    };
    ClrTabs.prototype.focusToFirstItemInOverflow = function () {
        this.keyFocus.moveTo(this.overflowPosition);
    };
    ClrTabs.prototype.nextFocusedItemIsNotInOverflow = function () {
        return this.tabLinkElements.find(function (e) { return e === document.activeElement; }) === undefined;
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
            template: "\n        <ul class=\"nav\" role=\"tablist\" [attr.aria-owns]=\"tabIds\" [clrKeyFocus]=\"tabLinkElements\" clrDirection=\"both\"\n            (clrFocusChange)=\"checkFocusVisible()\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"link.tabsId === tabsId && !link.inOverflow\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <ng-container [ngTemplateOutlet]=\"link.templateRefContainer.template\"></ng-container>\n                    </li>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\" role=\"presentation\">\n                    <li role=\"application\" class=\"nav-item\" (click)=\"toggleOverflow($event)\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" type=\"button\" aria-hidden=\"true\"\n                                [class.active]=\"activeTabInOverflow\" [class.open]=\"inOverflow()\" tabIndex=\"-1\">\n                            <clr-icon shape=\"ellipsis-horizontal\"\n                              [class.is-info]=\"ifOpenService.open\"\n                              [attr.title]=\"commonStrings.keys.more\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.tabsId === tabsId && link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <ng-container #tabContentViewContainer></ng-container>\n    ",
            providers: [IfActiveService, IfOpenService, TabsService, TABS_ID_PROVIDER]
        }),
        __param(3, Inject(TABS_ID)),
        __param(5, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [IfActiveService,
            IfOpenService,
            TabsService, Number, ClrCommonStringsService,
            Object])
    ], ClrTabs);
    return ClrTabs;
}());

var KEY_FOCUS_DIRECTIVES = [ClrKeyFocus, ClrKeyFocusItem];
var ClrKeyFocusModule = /** @class */ (function () {
    function ClrKeyFocusModule() {
    }
    ClrKeyFocusModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [KEY_FOCUS_DIRECTIVES],
            exports: [KEY_FOCUS_DIRECTIVES],
        })
    ], ClrKeyFocusModule);
    return ClrKeyFocusModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_TABS_DIRECTIVES = [
    ClrTabContent,
    ClrTab,
    ClrTabs,
    ClrTabOverflowContent,
    ClrTabLink,
    TabsWillyWonka,
    ActiveOompaLoompa,
];
var ClrTabsModule = /** @class */ (function () {
    function ClrTabsModule() {
    }
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
    return ClrTabsModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*  This directive is for guiding the document focus to the newly added content when its view is initialized
    so that assistive technologies can read its content. */
var ClrFocusOnViewInit = /** @class */ (function () {
    function ClrFocusOnViewInit(el, platformId, injector, renderer) {
        this.el = el;
        this.platformId = platformId;
        this.injector = injector;
        this.renderer = renderer;
        this.directFocus = true; // true if the element gets focused without need to set tabindex;
        this.document = this.injector.get(DOCUMENT);
    }
    ClrFocusOnViewInit.prototype.onFocusout = function () {
        if (!this.directFocus) {
            // manually set attributes and styles should be removed
            this.renderer.removeAttribute(this.el.nativeElement, 'tabindex');
            this.renderer.setStyle(this.el.nativeElement, 'outline', null);
        }
    };
    ClrFocusOnViewInit.prototype.ngAfterViewInit = function () {
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
    return ClrFocusOnViewInit;
}());

var FOCUS_ON_VIEW_INIT_DIRECTIVES = [ClrFocusOnViewInit];

var ClrFocusOnViewInitModule = /** @class */ (function () {
    function ClrFocusOnViewInitModule() {
    }
    ClrFocusOnViewInitModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [FOCUS_ON_VIEW_INIT_DIRECTIVES],
            exports: [FOCUS_ON_VIEW_INIT_DIRECTIVES],
        })
    ], ClrFocusOnViewInitModule);
    return ClrFocusOnViewInitModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavGroupRegistrationService = /** @class */ (function () {
    function VerticalNavGroupRegistrationService() {
        this.navGroupCount = 0;
    }
    VerticalNavGroupRegistrationService.prototype.registerNavGroup = function () {
        this.navGroupCount++;
    };
    VerticalNavGroupRegistrationService.prototype.unregisterNavGroup = function () {
        this.navGroupCount--;
    };
    VerticalNavGroupRegistrationService = __decorate([
        Injectable()
    ], VerticalNavGroupRegistrationService);
    return VerticalNavGroupRegistrationService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavIconService = /** @class */ (function () {
    function VerticalNavIconService() {
        this._icons = 0;
    }
    Object.defineProperty(VerticalNavIconService.prototype, "hasIcons", {
        get: function () {
            return this._icons > 0;
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavIconService.prototype.registerIcon = function () {
        this._icons++;
    };
    VerticalNavIconService.prototype.unregisterIcon = function () {
        this._icons--;
    };
    VerticalNavIconService = __decorate([
        Injectable()
    ], VerticalNavIconService);
    return VerticalNavIconService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavService = /** @class */ (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new Subject();
        this._collapsedChanged = new Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        get: function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        get: function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        set: function (value) {
            value = !!value;
            if (this.collapsible && this._collapsed !== value) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        get: function () {
            return this._collapsible;
        },
        set: function (value) {
            value = !!value;
            if (this._collapsible !== value) {
                if (!value && this.collapsed) {
                    this.updateCollapseBehavior(false);
                }
                this._collapsible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavService.prototype.updateCollapseBehavior = function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    VerticalNavService = __decorate([
        Injectable()
    ], VerticalNavService);
    return VerticalNavService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrVerticalNav = /** @class */ (function () {
    function ClrVerticalNav(_navService, _navIconService, _navGroupRegistrationService, commonStrings) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this.commonStrings = commonStrings;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(function (value) {
            _this._collapsedChanged.emit(value);
        });
    }
    Object.defineProperty(ClrVerticalNav.prototype, "collapsible", {
        get: function () {
            return this._navService.collapsible;
        },
        set: function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "collapsed", {
        get: function () {
            return this._navService.collapsed;
        },
        set: function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasNavGroups", {
        get: function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNav.prototype, "hasIcons", {
        get: function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNav.prototype.toggleByButton = function () {
        this.collapsed = !this.collapsed;
    };
    ClrVerticalNav.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
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
    return ClrVerticalNav;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavGroupService = /** @class */ (function () {
    function VerticalNavGroupService() {
        this._expandChange = new Subject();
    }
    Object.defineProperty(VerticalNavGroupService.prototype, "expandChange", {
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    VerticalNavGroupService.prototype.expand = function () {
        this._expandChange.next(true);
    };
    VerticalNavGroupService = __decorate([
        Injectable()
    ], VerticalNavGroupService);
    return VerticalNavGroupService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var EXPANDED_STATE = 'expanded';
var COLLAPSED_STATE = 'collapsed';
var ClrVerticalNavGroup = /** @class */ (function () {
    function ClrVerticalNavGroup(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        var _this = this;
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
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(function (value) {
            if (value && _this.expandAnimationState === COLLAPSED_STATE) {
                if (_this._navService.collapsed) {
                    _this._navService.collapsed = false;
                }
                _this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && _this.expandAnimationState === EXPANDED_STATE) {
                _this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe(function (goingToCollapse) {
            if (goingToCollapse && _this.expanded) {
                _this.wasExpanded = true;
                _this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && _this.wasExpanded) {
                _this.expandGroup();
                _this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe(function (expand) {
            if (expand && !_this.expanded) {
                _this.expandGroup();
            }
        }));
    }
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expanded", {
        get: function () {
            return this._itemExpand.expanded;
        },
        set: function (value) {
            if (this._itemExpand.expanded !== value) {
                this._itemExpand.expanded = value;
                this.expandedChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNavGroup.prototype, "userExpandedInput", {
        set: function (value) {
            value = !!value;
            if (this.expanded !== value) {
                // We have to call toggleExpand because some cases require animations to occur first
                // Directly setting the Expand service value skips the animation and can result in
                // nodes in the DOM but the nav group still being collapsed
                this.toggleExpand();
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.expandGroup = function () {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    };
    ClrVerticalNavGroup.prototype.collapseGroup = function () {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    };
    // closes a group after the collapse animation
    ClrVerticalNavGroup.prototype.expandAnimationDone = function ($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    };
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expandAnimationState", {
        get: function () {
            return this._expandAnimationState;
        },
        set: function (value) {
            if (value !== this._expandAnimationState) {
                this._expandAnimationState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.toggleExpand = function () {
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
    };
    ClrVerticalNavGroup.prototype.ngAfterContentInit = function () {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    };
    ClrVerticalNavGroup.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._navGroupRegistrationService.unregisterNavGroup();
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
                    transition(EXPANDED_STATE + " <=> " + COLLAPSED_STATE, animate('0.2s ease-in-out')),
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
    return ClrVerticalNavGroup;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrVerticalNavGroupChildren = /** @class */ (function () {
    function ClrVerticalNavGroupChildren() {
    }
    ClrVerticalNavGroupChildren = __decorate([
        Component({
            selector: 'clr-vertical-nav-group-children',
            template: "\n        <ng-content></ng-content>\n    "
        })
    ], ClrVerticalNavGroupChildren);
    return ClrVerticalNavGroupChildren;
}());

var ClrVerticalNavIcon = /** @class */ (function () {
    function ClrVerticalNavIcon(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    ClrVerticalNavIcon.prototype.ngOnDestroy = function () {
        this._verticalNavIconService.unregisterIcon();
    };
    ClrVerticalNavIcon = __decorate([
        Directive({ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } }),
        __metadata("design:paramtypes", [VerticalNavIconService])
    ], ClrVerticalNavIcon);
    return ClrVerticalNavIcon;
}());

var ClrVerticalNavLink = /** @class */ (function () {
    function ClrVerticalNavLink(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    ClrVerticalNavLink.prototype.expandParentNavGroup = function () {
        if (this._navGroupService) {
            this._navGroupService.expand();
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
            template: "\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <span class=\"nav-text\">\n            <ng-content></ng-content>    \n        </span>\n    ",
            host: { class: 'nav-link' }
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [VerticalNavGroupService])
    ], ClrVerticalNavLink);
    return ClrVerticalNavLink;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_VERTICAL_NAV_DIRECTIVES = [
    ClrVerticalNav,
    ClrVerticalNavLink,
    ClrVerticalNavGroup,
    ClrVerticalNavGroupChildren,
    ClrVerticalNavIcon,
];
var ClrVerticalNavModule = /** @class */ (function () {
    function ClrVerticalNavModule() {
    }
    ClrVerticalNavModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrConditionalModule, ClrFocusOnViewInitModule],
            declarations: [CLR_VERTICAL_NAV_DIRECTIVES],
            exports: [CLR_VERTICAL_NAV_DIRECTIVES, ClrConditionalModule, ClrIconModule, ClrFocusOnViewInitModule],
        })
    ], ClrVerticalNavModule);
    return ClrVerticalNavModule;
}());

var ClrLayoutModule = /** @class */ (function () {
    function ClrLayoutModule() {
    }
    ClrLayoutModule = __decorate([
        NgModule({ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] })
    ], ClrLayoutModule);
    return ClrLayoutModule;
}());

var ScrollingService = /** @class */ (function () {
    function ScrollingService(_document) {
        this._document = _document;
    }
    ScrollingService.prototype.stopScrolling = function () {
        this._document.body.classList.add('no-scrolling');
    };
    ScrollingService.prototype.resumeScrolling = function () {
        if (this._document.body.classList.contains('no-scrolling')) {
            this._document.body.classList.remove('no-scrolling');
        }
    };
    ScrollingService = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], ScrollingService);
    return ScrollingService;
}());

var ClrModal = /** @class */ (function () {
    function ClrModal(_scrollingService, commonStrings, platformId, modalId) {
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
    ClrModal.prototype.ngOnChanges = function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty('_open')) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    ClrModal.prototype.ngOnDestroy = function () {
        this._scrollingService.resumeScrolling();
    };
    ClrModal.prototype.open = function () {
        if (this._open) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    ClrModal.prototype.close = function () {
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
    };
    // TODO Investigate if we can decouple from animation events
    ClrModal.prototype.fadeDone = function (e) {
        if (e.toState === 'void') {
            this._openChanged.emit(false);
        }
        else if (e.toState === 'false' && isPlatformBrowser(this.platformId) && this.modalTitle) {
            this.modalTitle.nativeElement.focus();
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
            styles: ["\n        :host { display: none; }\n        :host.open { display: inline; }\n    "]
        }),
        __param(2, Inject(PLATFORM_ID)),
        __param(3, Inject(UNIQUE_ID)),
        __metadata("design:paramtypes", [ScrollingService,
            ClrCommonStringsService,
            Object, String])
    ], ClrModal);
    return ClrModal;
}());

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
var ClrModalBody = /** @class */ (function () {
    function ClrModalBody() {
        this._mouseDown = false;
    }
    ClrModalBody.prototype.focus = function (event) {
        if (this._mouseDown) {
            event.target.blur();
        }
    };
    ClrModalBody.prototype.mouseDown = function () {
        this._mouseDown = true;
    };
    ClrModalBody.prototype.mouseUp = function () {
        this._mouseDown = false;
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
    return ClrModalBody;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_MODAL_DIRECTIVES = [ClrModal, ClrModalBody];
var ClrModalModule = /** @class */ (function () {
    function ClrModalModule() {
    }
    ClrModalModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
            declarations: [CLR_MODAL_DIRECTIVES],
            exports: [CLR_MODAL_DIRECTIVES],
        })
    ], ClrModalModule);
    return ClrModalModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var SIGNPOST_POSITIONS = {
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
var POSITIONS = [
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
var ClrSignpostContent = /** @class */ (function (_super) {
    __extends(ClrSignpostContent, _super);
    function ClrSignpostContent(injector, parentHost, commonStrings, signpostContentId, signpostIdService) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.signpostContentId = signpostContentId;
        _this.signpostIdService = signpostIdService;
        if (!parentHost) {
            throw new Error('clr-signpost-content should only be used inside of a clr-signpost');
        }
        _this.commonStrings = commonStrings;
        // Defaults
        _this.position = 'right-middle';
        _this.closeOnOutsideClick = true;
        _this.signpostIdService.setId(signpostContentId);
        return _this;
    }
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    ClrSignpostContent.prototype.close = function () {
        this.ifOpenService.open = false;
    };
    Object.defineProperty(ClrSignpostContent.prototype, "position", {
        get: function () {
            return this._position;
        },
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
        set: function (position) {
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
            var setPosition = SIGNPOST_POSITIONS[this.position];
            this.anchorPoint = setPosition.anchorPoint;
            this.popoverPoint = setPosition.popoverPoint;
            this.popoverOptions.offsetY = setPosition.offsetY;
            this.popoverOptions.offsetX = setPosition.offsetX;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input('clrPosition'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ClrSignpostContent.prototype, "position", null);
    ClrSignpostContent = __decorate([
        Component({
            selector: 'clr-signpost-content',
            template: "\n      <div class=\"signpost-wrap\">\n          <div class=\"popover-pointer\"></div>\n          <div class=\"signpost-content-body\">\n              <ng-content></ng-content>\n          </div>\n          <div class=\"signpost-content-header\">\n              <button type=\"button\" [attr.aria-label]=\"commonStrings.keys.signpostClose\" class=\"signpost-action close\"\n                      (click)=\"close()\" [attr.aria-controls]=\"signpostContentId\">\n                  <clr-icon shape=\"close\" [attr.title]=\"commonStrings.keys.close\"></clr-icon>\n              </button>\n          </div>\n      </div>\n  ",
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
    return ClrSignpostContent;
}(AbstractPopover));

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_SIGNPOST_DIRECTIVES = [ClrSignpost, ClrSignpostContent, ClrSignpostTrigger];
var ClrSignpostModule = /** @class */ (function () {
    function ClrSignpostModule() {
    }
    ClrSignpostModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
            declarations: [CLR_SIGNPOST_DIRECTIVES],
            exports: [CLR_SIGNPOST_DIRECTIVES, ClrConditionalModule],
        })
    ], ClrSignpostModule);
    return ClrSignpostModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TooltipIdService = /** @class */ (function () {
    function TooltipIdService() {
        this._id = new Subject();
    }
    TooltipIdService.prototype.updateId = function (id) {
        this._id.next(id);
    };
    Object.defineProperty(TooltipIdService.prototype, "id", {
        get: function () {
            return this._id.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    TooltipIdService = __decorate([
        Injectable()
    ], TooltipIdService);
    return TooltipIdService;
}());

var ClrTooltip = /** @class */ (function () {
    function ClrTooltip() {
    }
    ClrTooltip = __decorate([
        Component({
            selector: 'clr-tooltip',
            template: "\n        <ng-content></ng-content>\n    ",
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
    return ClrTooltip;
}());

var POSITIONS$1 = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];
var SIZES = ['xs', 'sm', 'md', 'lg'];
var ClrTooltipContent = /** @class */ (function (_super) {
    __extends(ClrTooltipContent, _super);
    function ClrTooltipContent(injector, parentHost, uniqueId, tooltipIdService) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.uniqueId = uniqueId;
        _this.tooltipIdService = tooltipIdService;
        if (!parentHost) {
            throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
        }
        // Defaults
        _this.position = 'right';
        _this.size = 'sm';
        // Set the default id in case consumer does not supply a custom id.
        _this.updateId(uniqueId);
        return _this;
    }
    Object.defineProperty(ClrTooltipContent.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrTooltipContent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            value ? this.updateId(value) : this.updateId('');
        },
        enumerable: true,
        configurable: true
    });
    ClrTooltipContent.prototype.updateId = function (id) {
        this._id = id;
        this.tooltipIdService.updateId(id);
    };
    Object.defineProperty(ClrTooltipContent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
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
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n        <ng-content></ng-content>\n    ",
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
    return ClrTooltipContent;
}(AbstractPopover));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTooltipTrigger = /** @class */ (function () {
    function ClrTooltipTrigger(ifOpenService, tooltipIdService) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.tooltipIdService = tooltipIdService;
        this.subs = [];
        // The aria-described by comes from the id of content. It
        this.subs.push(this.tooltipIdService.id.subscribe(function (tooltipId) { return (_this.ariaDescribedBy = tooltipId); }));
    }
    ClrTooltipTrigger.prototype.showTooltip = function () {
        this.ifOpenService.open = true;
    };
    ClrTooltipTrigger.prototype.hideTooltip = function () {
        this.ifOpenService.open = false;
    };
    ClrTooltipTrigger.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
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
    return ClrTooltipTrigger;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_TOOLTIP_DIRECTIVES = [ClrTooltip, ClrTooltipTrigger, ClrTooltipContent];
var ClrTooltipModule = /** @class */ (function () {
    function ClrTooltipModule() {
    }
    ClrTooltipModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrCommonPopoverModule],
            declarations: [CLR_TOOLTIP_DIRECTIVES],
            exports: [CLR_TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule],
        })
    ], ClrTooltipModule);
    return ClrTooltipModule;
}());

var ClrPopoverModule = /** @class */ (function () {
    function ClrPopoverModule() {
    }
    ClrPopoverModule = __decorate([
        NgModule({ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] })
    ], ClrPopoverModule);
    return ClrPopoverModule;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ButtonHubService = /** @class */ (function () {
    function ButtonHubService() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject();
        this._nextBtnClicked = new Subject();
        this._dangerBtnClicked = new Subject();
        this._cancelBtnClicked = new Subject();
        this._finishBtnClicked = new Subject();
        this._customBtnClicked = new Subject();
    }
    Object.defineProperty(ButtonHubService.prototype, "previousBtnClicked", {
        get: function () {
            return this._previousBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "nextBtnClicked", {
        get: function () {
            return this._nextBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "dangerBtnClicked", {
        get: function () {
            return this._dangerBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "cancelBtnClicked", {
        get: function () {
            return this._cancelBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "finishBtnClicked", {
        get: function () {
            return this._finishBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "customBtnClicked", {
        get: function () {
            return this._customBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ButtonHubService.prototype.buttonClicked = function (buttonType) {
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
    };
    ButtonHubService = __decorate([
        Injectable()
    ], ButtonHubService);
    return ButtonHubService;
}());

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
    PageCollectionService = __decorate([
        Injectable()
    ], PageCollectionService);
    return PageCollectionService;
}());

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
var WizardNavigationService = /** @class */ (function () {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     * @memberof WizardNavigationService
     */
    function WizardNavigationService(pageCollection, buttonService) {
        var _this = this;
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
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(function () {
            var currentPage = _this.currentPage;
            if (_this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                _this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('next');
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('danger');
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage('finish');
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe(function (type) {
            if (!_this.wizardStopNavigation) {
                _this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(function () {
            if (_this.wizardStopNavigation) {
                return;
            }
            if (_this.currentPage.preventDefault) {
                _this.currentPage.pageOnCancel.emit(_this.currentPage);
            }
            else {
                _this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(function () {
            _this.setFirstPageCurrent();
        });
    }
    /**
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.ngOnDestroy = function () {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    };
    Object.defineProperty(WizardNavigationService.prototype, "currentPageChanged", {
        /**
         * An Observable that is predominantly used amongst the subcomponents and services
         * of the wizard. It is recommended that users listen to the ClrWizardPage.onLoad
         * (clrWizardPageOnLoad) output instead of this Observable.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
            // A BREAKING CHANGE SO AWAITING MINOR RELEASE
            return this._currentChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageTitle", {
        /**
         * @memberof WizardNavigationService
         */
        get: function () {
            // when the querylist of pages is empty. this is the first place it fails...
            if (!this.currentPage) {
                return null;
            }
            return this.currentPage.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsFirst", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the first
         * page in the Wizard.
         *
         * This is helpful for determining whether a page is navigable.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this.pageCollection.firstPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsLast", {
        /**
         * Returns a Boolean that tells you whether or not the current page is the
         * last page in the Wizard.
         *
         * This is used to determine which buttons should display in the wizard footer.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this.pageCollection.lastPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPage", {
        /**
         * Returns the ClrWizardPage object of the current page or null.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            if (!this._currentPage) {
                return null;
            }
            return this._currentPage;
        },
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
        set: function (page) {
            if (this._currentPage !== page && !this.wizardStopNavigation) {
                this._currentPage = page;
                page.onLoad.emit(page.id);
                this._currentChanged.next(page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "movedToNextPage", {
        /**
         * An observable used internally to alert the wizard that forward navigation
         * has occurred. It is recommended that you use the Wizard.onMoveNext
         * (clrWizardOnNext) output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._movedToNextPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "wizardFinished", {
        /**
         * An observable used internally to alert the wizard that the nav service
         * has approved completion of the wizard.
         *
         * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
         * output instead of this one.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._wizardFinished.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.next = function () {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage('finish');
        }
        else {
            this.checkAndCommitCurrentPage('next');
        }
    };
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.forceNext = function () {
        var currentPage = this.currentPage;
        var nextPage = this.pageCollection.getNextPage(currentPage);
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
    };
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.checkAndCommitCurrentPage = function (buttonType) {
        var currentPage = this.currentPage;
        var iAmTheLastPage;
        var isNext;
        var isDanger;
        var isDangerNext;
        var isDangerFinish;
        var isFinish;
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
    };
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
    WizardNavigationService.prototype.finish = function () {
        this.checkAndCommitCurrentPage('finish');
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToPreviousPage", {
        /**
         * Notifies the wizard when backwards navigation has occurred via the
         * previous button.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._movedToPreviousPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.previous = function () {
        var previousPage;
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
    };
    Object.defineProperty(WizardNavigationService.prototype, "notifyWizardCancel", {
        /**
         * Notifies the wizard that a user is trying to cancel it.
         *
         * @memberof WizardNavigationService
         */
        get: function () {
            return this._cancelWizard.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.cancel = function () {
        this._cancelWizard.next();
    };
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
    WizardNavigationService.prototype.goTo = function (pageToGoToOrId, lazyComplete) {
        if (lazyComplete === void 0) { lazyComplete = false; }
        var pageToGoTo;
        var currentPage;
        var myPages;
        var pagesToCheck;
        var okayToMove;
        var goingForward;
        var currentPageIndex;
        var goToPageIndex;
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
            pagesToCheck.forEach(function (page) {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach(function (page) {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    };
    /**
     * Accepts a range of ClrWizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.canGoTo = function (pagesToCheck) {
        var okayToMove = true;
        var myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        var previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach(function (page) {
            var previousPage;
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
    };
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.setLastEnabledPageCurrent = function () {
        var allPages = this.pageCollection.pagesAsArray;
        var lastCompletedPageIndex = null;
        allPages.forEach(function (page, index) {
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
    };
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.setFirstPageCurrent = function () {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    };
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * @memberof WizardNavigationService
     */
    WizardNavigationService.prototype.updateNavigation = function () {
        var toSetCurrent;
        var currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    };
    WizardNavigationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PageCollectionService, ButtonHubService])
    ], WizardNavigationService);
    return WizardNavigationService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var HeaderActionService = /** @class */ (function () {
    // this service communicates information about the presence/display of header actions
    // across the wizard
    function HeaderActionService(navService) {
        this.navService = navService;
    }
    Object.defineProperty(HeaderActionService.prototype, "wizardHasHeaderActions", {
        get: function () {
            var wizardHdrActions = this.wizardHeaderActions;
            if (!wizardHdrActions) {
                return false;
            }
            return wizardHdrActions.toArray().length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "currentPageHasHeaderActions", {
        get: function () {
            return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "showWizardHeaderActions", {
        get: function () {
            return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "displayHeaderActionsWrapper", {
        get: function () {
            return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    HeaderActionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [WizardNavigationService])
    ], HeaderActionService);
    return HeaderActionService;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var wizardHeaderActionIndex = 0;
var ClrWizardHeaderAction = /** @class */ (function () {
    function ClrWizardHeaderAction() {
        // title is explanatory text added to the header action
        this.title = '';
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    Object.defineProperty(ClrWizardHeaderAction.prototype, "id", {
        get: function () {
            return "clr-wizard-header-action-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardHeaderAction.prototype.click = function () {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
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
            template: "\n        <button \n            type=\"button\"\n            class=\"btn clr-wizard-header-action btn-link\"\n            [id]=\"id\"\n            [class.disabled]=\"disabled\"\n            (click)=\"click()\"\n            [title]=\"title\">\n            <ng-content></ng-content>\n        </button>\n    ",
            host: { class: 'clr-wizard-header-action-wrapper' }
        })
    ], ClrWizardHeaderAction);
    return ClrWizardHeaderAction;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardPageButtons = /** @class */ (function () {
    function ClrWizardPageButtons(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
    ClrWizardPageButtons = __decorate([
        Directive({ selector: '[clrPageButtons]' }),
        __metadata("design:paramtypes", [TemplateRef])
    ], ClrWizardPageButtons);
    return ClrWizardPageButtons;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardPageHeaderActions = /** @class */ (function () {
    function ClrWizardPageHeaderActions(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
    ClrWizardPageHeaderActions = __decorate([
        Directive({ selector: '[clrPageHeaderActions]' }),
        __metadata("design:paramtypes", [TemplateRef])
    ], ClrWizardPageHeaderActions);
    return ClrWizardPageHeaderActions;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardPageNavTitle = /** @class */ (function () {
    function ClrWizardPageNavTitle(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
    ClrWizardPageNavTitle = __decorate([
        Directive({ selector: '[clrPageNavTitle]' }),
        __metadata("design:paramtypes", [TemplateRef])
    ], ClrWizardPageNavTitle);
    return ClrWizardPageNavTitle;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardPageTitle = /** @class */ (function () {
    function ClrWizardPageTitle(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
    ClrWizardPageTitle = __decorate([
        Directive({ selector: '[clrPageTitle]' }),
        __metadata("design:paramtypes", [TemplateRef])
    ], ClrWizardPageTitle);
    return ClrWizardPageTitle;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
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
    return ClrWizardPage;
}());

/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
var ClrWizard = /** @class */ (function () {
    function ClrWizard(platformId, navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
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
    Object.defineProperty(ClrWizard.prototype, "forceForward", {
        get: function () {
            return this._forceForward;
        },
        /**
         * Resets page completed states when navigating backwards.
         * Set using `[clrWizardForceForwardNavigation]` input.
         */
        set: function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "clrWizardOpen", {
        /**
         * Toggles open/close of the wizard component.
         * Set using the `[clrWizardOpen]` input.
         */
        set: function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNext", {
        get: function () {
            return this._stopNext;
        },
        /**
         * Prevents ClrWizard from moving to the next page or closing itself on finishing.
         * Set using the `[clrWizardPreventDefaultNext]` input. Note that using stopNext
         * will require you to create your own calls to .next() and .finish() in your
         * host component to make the ClrWizard work as expected.
         */
        set: function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopCancel", {
        get: function () {
            return this._stopCancel;
        },
        /**
         * Prevents ClrWizard from closing when the cancel button or close "X" is clicked.
         * Set using the `[clrWizardPreventDefaultCancel]` input.
         *
         * Note that using stopCancel will require you to create your own calls to `close()` in your host compone`nt
         * to make the ClrWizard work as expected. Useful for doing checks or prompts
         * before closing a ClrWizard.
         */
        set: function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopNavigation", {
        get: function () {
            return this._stopNavigation;
        },
        /**
         * Prevents ClrWizard from performing any form of navigation away from the current
         * page. Set using the `[clrWizardPreventNavigation]` input.
         * Note that stopNavigation is meant to freeze the wizard in place, typically
         * during a long validation or background action where you want the wizard to
         * display loading content but not allow the user to execute navigation in
         * the stepnav, close X, or the  back, finish, or next buttons.
         */
        set: function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "disableStepnav", {
        get: function () {
            return this._disableStepnav;
        },
        /**
         * Prevents clicks on the links in the stepnav from working.
         * Set using `[clrWizardDisableStepnav]` input.
         * A more granular bypassing of navigation which can be useful when your
         * ClrWizard is in a state of completion and you don't want users to be
         * able to jump backwards and change things.
         */
        set: function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "stopModalAnimations", {
        get: function () {
            return this._stopModalAnimations ? 'true' : 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "currentPage", {
        get: function () {
            return this.navService.currentPage;
        },
        set: function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isLast", {
        get: function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isFirst", {
        get: function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizard.prototype, "isStatic", {
        get: function () {
            return this.elementRef.nativeElement.classList.contains('clr-wizard--inline');
        },
        enumerable: true,
        configurable: true
    });
    ClrWizard.prototype.ngAfterContentInit = function () {
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        this.initializeButtons();
    };
    ClrWizard.prototype.ngDoCheck = function () {
        this.updateNavOnPageChanges();
    };
    ClrWizard.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
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
    ClrWizard.prototype.finish = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
    /**
     * Marks the wizard as finished but does run checks and emissions.
     * Good for a last step in an alternate workflow. Does the same thing as
     * calling `ClrWizard.finish(true)` or `ClrWizard.finish()` without a parameter.
     */
    ClrWizard.prototype.forceFinish = function () {
        if (this.stopNavigation) {
            return;
        }
        this.close();
    };
    /**
     * Opens the wizard. If there is no current page defined, sets the first page in the wizard to be current.
     */
    ClrWizard.prototype.open = function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this._openChanged.emit(true);
    };
    /**
     * Closes the wizard. Call this directly instead of `cancel()` to implement alternative cancel functionality.
     */
    ClrWizard.prototype.close = function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this._openChanged.emit(false);
    };
    /**
     * Used to open and close the wizard. By default the wizard will
     * close if invoked with no parameter. If parameter is true wizard will open
     * else if false will close.
     */
    ClrWizard.prototype.toggle = function (open) {
        if (open) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * Moves the wizard to the previous page.
     */
    ClrWizard.prototype.previous = function () {
        this.navService.previous();
    };
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
    ClrWizard.prototype.next = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
    /**
     * Moves the wizard to the next page without the checks and emissions.
     * Good for a last step in an alternate workflow.
     * Alias for `ClrWizard.next(true)` or `ClrWizard.next()`
     */
    ClrWizard.prototype.forceNext = function () {
        this.navService.forceNext();
    };
    /**
     * Cancels and closes the wizard. Do not use this for an override of the cancel
     * the functionality with `[clrWizardPreventDefaultCancel]`, `[clrWizardPreventPageDefaultCancel]`,
     * or `[clrWizardPagePreventDefault]` because it will initiate the same checks
     * and event emissions that invoked your event handler. Use `ClrWizard.close()` instead.
     */
    ClrWizard.prototype.cancel = function () {
        this.navService.cancel();
    };
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality. In most cases, use `ClrWizard.cancel()` instead.
     */
    ClrWizard.prototype.modalCancel = function () {
        if (this.closable) {
            this.checkAndCancel();
        }
    };
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs `(clrWizardPageOnCancel)` and `(clrWizardOnCancel)`.
     */
    ClrWizard.prototype.checkAndCancel = function () {
        var currentPage = this.currentPage;
        var currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
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
    };
    /**
     * Navigates to a given page in the Wizard. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * The format of the expected ID parameter can be found in the return of the
     * ClrWizardPage.id getter, usually prefixed with `clr-wizard-page-` and then either a
     * numeric ID or the ID specified for the `ClrWizardPage` component’s `id` input.
     */
    ClrWizard.prototype.goTo = function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
    /**
     * Reset sets all WizardPages to incomplete and sets the first page in the `ClrWizard` to
     * be the current page, resetting the wizard navigation.
     * Use `(clrWizardOnReset)` event to reset the data or model of your wizard.
     */
    ClrWizard.prototype.reset = function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
    ClrWizard.prototype.listenForNextPageChanges = function () {
        var _this = this;
        return this.navService.movedToNextPage.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function () {
            _this.onMoveNext.emit();
            _this.wizardTitle.nativeElement.focus();
        });
    };
    ClrWizard.prototype.listenForPreviousPageChanges = function () {
        var _this = this;
        return this.navService.movedToPreviousPage.pipe(filter(function () { return isPlatformBrowser(_this.platformId); })).subscribe(function () {
            _this.onMovePrevious.emit();
            _this.wizardTitle.nativeElement.focus();
        });
    };
    ClrWizard.prototype.listenForCancelChanges = function () {
        var _this = this;
        return this.navService.notifyWizardCancel.subscribe(function () { return _this.checkAndCancel(); });
    };
    ClrWizard.prototype.listenForFinishedChanges = function () {
        var _this = this;
        return this.navService.wizardFinished.subscribe(function () { return _this.emitWizardFinished(); });
    };
    ClrWizard.prototype.listenForPageChanges = function () {
        var _this = this;
        return this.navService.currentPageChanged.subscribe(function () { return _this.currentPageChanged.emit(); });
    };
    ClrWizard.prototype.updateNavOnPageChanges = function () {
        var _this = this;
        var changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(function () { return _this.navService.updateNavigation(); });
            changes.forEachRemovedItem(function () { return _this.navService.updateNavigation(); });
        }
    };
    ClrWizard.prototype.initializeButtons = function () {
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    };
    ClrWizard.prototype.emitWizardFinished = function () {
        if (!this.stopNext) {
            this.forceFinish();
        }
        this.wizardFinished.emit();
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
    return ClrWizard;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DEFAULT_BUTTON_TYPES = {
    cancel: 'cancel',
    previous: 'previous',
    next: 'next',
    finish: 'finish',
    danger: 'danger',
};
var CUSTOM_BUTTON_TYPES = {
    cancel: 'custom-cancel',
    previous: 'custom-previous',
    next: 'custom-next',
    finish: 'custom-finish',
    danger: 'custom-danger',
};
var ClrWizardButton = /** @class */ (function () {
    function ClrWizardButton(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = '';
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    ClrWizardButton.prototype.checkDefaultAndCustomType = function (valueToCheck, typeToLookUp) {
        if (valueToCheck === void 0) { valueToCheck = ''; }
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ClrWizardButton.prototype, "isCancel", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'cancel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isNext", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'next');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrevious", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'previous');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isFinish", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'finish');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDanger", {
        get: function () {
            return this.checkDefaultAndCustomType(this.type, 'danger');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isPrimaryAction", {
        get: function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "_disabledAttribute", {
        get: function () {
            if (this.isDisabled) {
                return '';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isDisabled", {
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var disabled = true;
            var nav = this.navService;
            var page = this.navService.currentPage;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardButton.prototype, "isHidden", {
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var hidden = true;
            var nav = this.navService;
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
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardButton.prototype.click = function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
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
            template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            [attr.disabled]=\"_disabledAttribute\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
            host: { class: 'clr-wizard-btn-wrapper', '[attr.aria-hidden]': 'isHidden' },
            styles: ['[aria-hidden="true"] { display: none; }']
        }),
        __metadata("design:paramtypes", [WizardNavigationService, ButtonHubService])
    ], ClrWizardButton);
    return ClrWizardButton;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardCustomTags = /** @class */ (function () {
    function ClrWizardCustomTags() {
    }
    ClrWizardCustomTags = __decorate([
        Directive({ selector: 'clr-wizard-title, clr-wizard-pagetitle' })
    ], ClrWizardCustomTags);
    return ClrWizardCustomTags;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardStepnav = /** @class */ (function () {
    function ClrWizardStepnav(pageService) {
        this.pageService = pageService;
    }
    ClrWizardStepnav = __decorate([
        Component({
            selector: 'clr-wizard-stepnav',
            template: "\n    <div class=\"clr-wizard-stepnav-list\">\n      <div *ngFor=\"let page of pageService.pages\" clr-wizard-stepnav-item [page]=\"page\" class=\"clr-wizard-stepnav-item\"></div>\n    </div>\n  ",
            host: { class: 'clr-wizard-stepnav' }
        }),
        __metadata("design:paramtypes", [PageCollectionService])
    ], ClrWizardStepnav);
    return ClrWizardStepnav;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardStepnavItem = /** @class */ (function () {
    function ClrWizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    ClrWizardStepnavItem.prototype.pageGuard = function () {
        if (!this.page) {
            throw new Error('Wizard stepnav item is not associated with a wizard page.');
        }
    };
    Object.defineProperty(ClrWizardStepnavItem.prototype, "id", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isDisabled", {
        get: function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isCurrent", {
        get: function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "isComplete", {
        get: function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrWizardStepnavItem.prototype, "canNavigate", {
        get: function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    ClrWizardStepnavItem.prototype.click = function () {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    __decorate([
        Input('page'),
        __metadata("design:type", ClrWizardPage)
    ], ClrWizardStepnavItem.prototype, "page", void 0);
    ClrWizardStepnavItem = __decorate([
        Component({
            selector: '[clr-wizard-stepnav-item]',
            template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\" [attr.disabled]=\"isDisabled ? '' : null\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
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
    return ClrWizardStepnavItem;
}());

/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CLR_WIZARD_DIRECTIVES = [
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
var ClrWizardModule = /** @class */ (function () {
    function ClrWizardModule() {
    }
    ClrWizardModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrModalModule, ClrAlertModule],
            declarations: [CLR_WIZARD_DIRECTIVES],
            exports: [CLR_WIZARD_DIRECTIVES],
        })
    ], ClrWizardModule);
    return ClrWizardModule;
}());

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
var accordionCount = 0;
var AccordionPanelModel = /** @class */ (function () {
    function AccordionPanelModel(id, accordionId) {
        this.id = id;
        this.accordionId = accordionId;
        this.status = AccordionStatus.Inactive;
        this.index = null;
        this.disabled = false;
        this.open = false;
        this.templateId = this.id + "-" + this.accordionId;
    }
    return AccordionPanelModel;
}());
var AccordionModel = /** @class */ (function () {
    function AccordionModel() {
        this.strategy = AccordionStrategy.Default;
        this.accordionCount = accordionCount++;
        this._panels = {};
    }
    Object.defineProperty(AccordionModel.prototype, "panels", {
        get: function () {
            var _this = this;
            return Object.keys(this._panels).map(function (id) { return _this._panels[id]; });
        },
        enumerable: true,
        configurable: true
    });
    AccordionModel.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    AccordionModel.prototype.updatePanelOrder = function (ids) {
        var _this = this;
        ids.forEach(function (id, index) { return (_this._panels[id].index = index); });
        this.removeOldPanels(ids);
    };
    AccordionModel.prototype.addPanel = function (id, open) {
        if (open === void 0) { open = false; }
        this._panels[id] = new AccordionPanelModel(id, this.accordionCount);
        this._panels[id].open = open;
    };
    AccordionModel.prototype.togglePanel = function (panelId, open) {
        var panelIsOpen = this._panels[panelId].open;
        if (this.strategy === AccordionStrategy.Default) {
            this.closeAllPanels();
        }
        this._panels[panelId].open = open !== undefined ? open : !panelIsOpen;
    };
    AccordionModel.prototype.disablePanel = function (panelId, disabled) {
        this._panels[panelId].disabled = disabled;
    };
    AccordionModel.prototype.closeAllPanels = function () {
        var _this = this;
        this.panels.forEach(function (panel) { return (_this._panels[panel.id].open = false); });
    };
    AccordionModel.prototype.removeOldPanels = function (ids) {
        var _this = this;
        this.panels
            .filter(function (panel) { return ids.find(function (id) { return id === panel.id; }) === undefined; })
            .forEach(function (panel) { return delete _this._panels[panel.id]; });
    };
    return AccordionModel;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AccordionService = /** @class */ (function () {
    function AccordionService() {
        this.accordion = new AccordionModel();
        this._panelsChanges = new BehaviorSubject(this.accordion.panels);
    }
    AccordionService.prototype.getPanelChanges = function (panelId) {
        return this._panelsChanges.pipe(map(function (panels) { return panels.find(function (s) { return s.id === panelId; }); }));
    };
    AccordionService.prototype.setStrategy = function (strategy) {
        this.accordion.setStrategy(strategy);
    };
    AccordionService.prototype.addPanel = function (panelId, open) {
        if (open === void 0) { open = false; }
        this.accordion.addPanel(panelId, open);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.togglePanel = function (panelId, open) {
        this.accordion.togglePanel(panelId, open);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.disablePanel = function (panelId, disabled) {
        this.accordion.disablePanel(panelId, disabled);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.updatePanelOrder = function (ids) {
        this.accordion.updatePanelOrder(ids);
        this.emitUpdatedPanels();
    };
    AccordionService.prototype.emitUpdatedPanels = function () {
        this._panelsChanges.next(this.accordion.panels);
    };
    AccordionService = __decorate([
        Injectable()
    ], AccordionService);
    return AccordionService;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var defaultAnimationTiming = '0.2s ease-in-out';

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var panelAnimation = [
    trigger('skipInitialRender', [transition(':enter', [])]),
    trigger('toggle', [
        transition('void => *', [
            style({ display: 'block', height: 0 }),
            animate(defaultAnimationTiming, style({ height: '*' })),
        ]),
    ]),
];
var stepAnimation = [
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
var ClrAccordionDescription = /** @class */ (function () {
    function ClrAccordionDescription() {
    }
    ClrAccordionDescription = __decorate([
        Component({
            selector: 'clr-accordion-description, clr-step-description',
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion-description]': 'true' },
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ClrAccordionDescription);
    return ClrAccordionDescription;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAccordionPanel = /** @class */ (function () {
    function ClrAccordionPanel(commonStrings, accordionService, ifExpandService, id) {
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
    ClrAccordionPanel.prototype.ngOnInit = function () {
        var _this = this;
        this.panel = this.accordionService.getPanelChanges(this.id).pipe(tap(function (panel) { return _this.emitPanelChange(panel); }));
        this.accordionService.addPanel(this.id, this.panelOpen);
        this.accordionService.togglePanel(this.id, this.panelOpen);
        this.accordionService.disablePanel(this.id, this.disabled);
    };
    ClrAccordionPanel.prototype.ngOnChanges = function (changes) {
        if (this.panel && changes.panelOpen && changes.panelOpen.currentValue !== changes.panelOpen.previousValue) {
            this.accordionService.togglePanel(this.id, changes.panelOpen.currentValue);
        }
        if (this.panel && changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
            this.accordionService.disablePanel(this.id, changes.disabled.currentValue);
        }
    };
    ClrAccordionPanel.prototype.togglePanel = function () {
        this.accordionService.togglePanel(this.id);
    };
    ClrAccordionPanel.prototype.collapsePanelOnAnimationDone = function (panel) {
        if (!panel.open) {
            this.ifExpandService.expanded = false;
        }
    };
    ClrAccordionPanel.prototype.getPanelStateClasses = function (panel) {
        return "clr-accordion-panel-" + panel.status + " " + (panel.open ? 'clr-accordion-panel-open' : '');
    };
    ClrAccordionPanel.prototype.getAccordionContentId = function (id) {
        return "clr-accordion-content-" + id + "'";
    };
    ClrAccordionPanel.prototype.getAccordionHeaderId = function (id) {
        return "clr-accordion-header-" + id;
    };
    ClrAccordionPanel.prototype.emitPanelChange = function (panel) {
        this.panelOpenChange.emit(panel.open);
        if (panel.open) {
            this.ifExpandService.expanded = true;
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
    return ClrAccordionPanel;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAccordionTitle = /** @class */ (function () {
    function ClrAccordionTitle() {
    }
    ClrAccordionTitle = __decorate([
        Component({
            selector: 'clr-accordion-title, clr-step-title',
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion-title]': 'true' },
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ClrAccordionTitle);
    return ClrAccordionTitle;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAccordion = /** @class */ (function () {
    function ClrAccordion(accordionService) {
        this.accordionService = accordionService;
        this.multiPanel = false;
        this.subscriptions = [];
    }
    ClrAccordion.prototype.ngOnInit = function () {
        this.setAccordionStrategy();
    };
    ClrAccordion.prototype.ngOnChanges = function (changes) {
        if (changes.multiPanel.currentValue !== changes.multiPanel.previousValue) {
            this.setAccordionStrategy();
        }
    };
    ClrAccordion.prototype.ngAfterViewInit = function () {
        this.subscriptions.push(this.listenForDOMChanges());
    };
    ClrAccordion.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrAccordion.prototype.setAccordionStrategy = function () {
        var strategy = this.multiPanel ? AccordionStrategy.Multi : AccordionStrategy.Default;
        this.accordionService.setStrategy(strategy);
    };
    ClrAccordion.prototype.listenForDOMChanges = function () {
        var _this = this;
        return this.panels.changes
            .pipe(startWith(this.panels))
            .subscribe(function (panels) { return _this.accordionService.updatePanelOrder(panels.toArray().map(function (p) { return p.id; })); });
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
            template: "<ng-content></ng-content>",
            host: { '[class.clr-accordion]': 'true' },
            providers: [AccordionService],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [AccordionService])
    ], ClrAccordion);
    return ClrAccordion;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAccordionContent = /** @class */ (function () {
    function ClrAccordionContent() {
    }
    ClrAccordionContent = __decorate([
        Component({
            selector: 'clr-accordion-content, clr-step-content',
            template: "<ng-content></ng-content>",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ClrAccordionContent);
    return ClrAccordionContent;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AccordionWillyWonka = /** @class */ (function (_super) {
    __extends(AccordionWillyWonka, _super);
    function AccordionWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionWillyWonka = __decorate([
        Directive({ selector: 'clr-accordion' })
    ], AccordionWillyWonka);
    return AccordionWillyWonka;
}(WillyWonka));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AccordionOompaLoompa = /** @class */ (function (_super) {
    __extends(AccordionOompaLoompa, _super);
    function AccordionOompaLoompa(cdr, willyWonka, ifExpandService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-accordion-panel should only be used inside of clr-accordion');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expand = ifExpandService;
        return _this;
    }
    Object.defineProperty(AccordionOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expand.expanded;
        },
        enumerable: true,
        configurable: true
    });
    AccordionOompaLoompa = __decorate([
        Directive({ selector: 'clr-accordion-panel' }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef, AccordionWillyWonka, IfExpandService])
    ], AccordionOompaLoompa);
    return AccordionOompaLoompa;
}(OompaLoompa));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var declarations = [
    ClrAccordion,
    ClrAccordionPanel,
    ClrAccordionTitle,
    ClrAccordionDescription,
    ClrAccordionContent,
    AccordionOompaLoompa,
    AccordionWillyWonka,
];
var ClrAccordionModule = /** @class */ (function () {
    function ClrAccordionModule() {
    }
    ClrAccordionModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule],
            declarations: __spread(declarations),
            exports: __spread(declarations),
        })
    ], ClrAccordionModule);
    return ClrAccordionModule;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StepperModel = /** @class */ (function (_super) {
    __extends(StepperModel, _super);
    function StepperModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StepperModel.prototype, "allPanelsCompleted", {
        get: function () {
            return this.panels.length && this.getNumberOfIncompletePanels() === 0 && this.getNumberOfOpenPanels() === 0;
        },
        enumerable: true,
        configurable: true
    });
    StepperModel.prototype.addPanel = function (id, open) {
        if (open === void 0) { open = false; }
        _super.prototype.addPanel.call(this, id, open);
        this._panels[id].disabled = true;
    };
    StepperModel.prototype.updatePanelOrder = function (ids) {
        _super.prototype.updatePanelOrder.call(this, ids);
        this.openFirstPanel();
    };
    StepperModel.prototype.togglePanel = function (panelId) {
        if (this._panels[panelId].status === AccordionStatus.Complete) {
            this._panels[panelId].open = !this._panels[panelId].open;
        }
    };
    StepperModel.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        if (currentPanelValid) {
            this.completePanel(currentPanelId);
            this.openNextPanel(this._panels[currentPanelId].id);
        }
        else {
            this.setPanelError(currentPanelId);
        }
    };
    StepperModel.prototype.overrideInitialPanel = function (panelId) {
        var _this = this;
        this.panels.filter(function () { return _this._panels[panelId] !== undefined; }).forEach(function (panel) {
            if (panel.index < _this._panels[panelId].index) {
                _this.completePanel(panel.id);
            }
            else if (panel.id === panelId) {
                _this._panels[panel.id].open = true;
            }
            else {
                _this._panels[panel.id].open = false;
            }
        });
    };
    StepperModel.prototype.setPanelsWithErrors = function (ids) {
        var _this = this;
        ids.forEach(function (id) { return _this.setPanelError(id); });
    };
    StepperModel.prototype.resetPanels = function () {
        var _this = this;
        this.panels.forEach(function (p) { return _this.resetPanel(p.id); });
        this.openFirstPanel();
    };
    StepperModel.prototype.getNextPanel = function (currentPanelId) {
        var _this = this;
        return this.panels.find(function (s) { return s.index === _this._panels[currentPanelId].index + 1; });
    };
    StepperModel.prototype.resetAllFuturePanels = function (panelId) {
        var _this = this;
        this.panels.filter(function (panel) { return panel.index >= _this._panels[panelId].index; }).forEach(function (panel) { return _this.resetPanel(panel.id); });
    };
    StepperModel.prototype.resetPanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Inactive;
        this._panels[panelId].open = false;
        this._panels[panelId].disabled = true;
    };
    StepperModel.prototype.openFirstPanel = function () {
        var firstPanel = this.getFirstPanel();
        this._panels[firstPanel.id].open = true;
        this._panels[firstPanel.id].disabled = true;
    };
    StepperModel.prototype.completePanel = function (panelId) {
        this._panels[panelId].status = AccordionStatus.Complete;
        this._panels[panelId].disabled = false;
        this._panels[panelId].open = false;
    };
    StepperModel.prototype.openNextPanel = function (currentPanelId) {
        var nextPanel = this.getNextPanel(currentPanelId);
        if (nextPanel) {
            this.resetAllFuturePanels(nextPanel.id);
            this._panels[nextPanel.id].open = true;
            this._panels[nextPanel.id].disabled = true;
        }
    };
    StepperModel.prototype.setPanelError = function (panelId) {
        this.resetAllFuturePanels(panelId);
        this._panels[panelId].open = true;
        this._panels[panelId].status = AccordionStatus.Error;
    };
    StepperModel.prototype.getFirstPanel = function () {
        return this.panels.find(function (panel) { return panel.index === 0; });
    };
    StepperModel.prototype.getNumberOfIncompletePanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.status !== AccordionStatus.Complete ? prev + 1 : prev); }, 0);
    };
    StepperModel.prototype.getNumberOfOpenPanels = function () {
        return this.panels.reduce(function (prev, next) { return (next.open !== false ? prev + 1 : prev); }, 0);
    };
    return StepperModel;
}(AccordionModel));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StepperService = /** @class */ (function (_super) {
    __extends(StepperService, _super);
    function StepperService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelsCompleted = _this.getAllCompletedPanelChanges();
        _this.accordion = new StepperModel();
        _this._activeStepChanges = new Subject();
        _this.activeStep = _this._activeStepChanges.asObservable();
        return _this;
    }
    StepperService.prototype.resetPanels = function () {
        this.accordion.resetPanels();
        this.emitUpdatedPanels();
    };
    StepperService.prototype.setPanelsWithErrors = function (ids) {
        this.accordion.setPanelsWithErrors(ids);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.navigateToNextPanel = function (currentPanelId, currentPanelValid) {
        if (currentPanelValid === void 0) { currentPanelValid = true; }
        this.accordion.navigateToNextPanel(currentPanelId, currentPanelValid);
        this.updateNextStep(currentPanelId, currentPanelValid);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.overrideInitialPanel = function (panelId) {
        this.accordion.overrideInitialPanel(panelId);
        this.emitUpdatedPanels();
    };
    StepperService.prototype.updateNextStep = function (currentPanelId, currentPanelValid) {
        var nextPanel = this.accordion.getNextPanel(currentPanelId);
        if (currentPanelValid && nextPanel) {
            this._activeStepChanges.next(nextPanel.id);
        }
        else if (currentPanelValid) {
            this._activeStepChanges.next(currentPanelId);
        }
    };
    StepperService.prototype.getAllCompletedPanelChanges = function () {
        var _this = this;
        return this._panelsChanges.pipe(map(function () { return _this.accordion.allPanelsCompleted; }), distinctUntilChanged());
    };
    StepperService = __decorate([
        Injectable()
    ], StepperService);
    return StepperService;
}(AccordionService));

/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
function triggerAllFormControlValidation(formGroup) {
    Object.keys(formGroup.controls).forEach(function (field) {
        var control = formGroup.get(field);
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
var ClrStepperPanel = /** @class */ (function (_super) {
    __extends(ClrStepperPanel, _super);
    function ClrStepperPanel(platformId, commonStrings, formGroupName, ngModelGroup, stepperService, ifExpandService, id) {
        var _this = _super.call(this, commonStrings, stepperService, ifExpandService, id) || this;
        _this.platformId = platformId;
        _this.commonStrings = commonStrings;
        _this.formGroupName = formGroupName;
        _this.ngModelGroup = ngModelGroup;
        _this.stepperService = stepperService;
        _this.isAccordion = false;
        _this.subscriptions = [];
        return _this;
    }
    Object.defineProperty(ClrStepperPanel.prototype, "formGroup", {
        get: function () {
            return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrStepperPanel.prototype, "id", {
        get: function () {
            return this.formGroupName ? this.formGroupName.name : this.ngModelGroup.name;
        },
        set: function (_value) { } // overriding parent id required empty setter
        ,
        enumerable: true,
        configurable: true
    });
    ClrStepperPanel.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.panel = this.panel.pipe(tap(function (panel) { return _this.triggerAllFormControlValidationIfError(panel); }));
        this.stepperService.disablePanel(this.id, true);
        this.listenToFocusChanges();
    };
    ClrStepperPanel.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrStepperPanel.prototype.listenToFocusChanges = function () {
        var _this = this;
        this.subscriptions.push(this.stepperService.activeStep
            .pipe(filter(function (panelId) { return isPlatformBrowser(_this.platformId) && panelId === _this.id; }))
            .subscribe(function () { return _this.headerButton.nativeElement.focus(); }));
    };
    ClrStepperPanel.prototype.triggerAllFormControlValidationIfError = function (panel) {
        if (panel.status === AccordionStatus.Error) {
            triggerAllFormControlValidation(this.formGroup);
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
    return ClrStepperPanel;
}(ClrAccordionPanel));

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
var ClrStepButton = /** @class */ (function () {
    function ClrStepButton(clrStep, stepperService) {
        this.clrStep = clrStep;
        this.stepperService = stepperService;
        this.type = ClrStepButtonType.Next;
        this.submitButton = false;
    }
    ClrStepButton.prototype.ngOnInit = function () {
        this.submitButton = this.type === ClrStepButtonType.Submit;
    };
    ClrStepButton.prototype.navigateToNextPanel = function () {
        this.stepperService.navigateToNextPanel(this.clrStep.id, this.clrStep.formGroup.valid);
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
    return ClrStepButton;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrStepper = /** @class */ (function () {
    function ClrStepper(formGroup, ngForm, stepperService) {
        this.formGroup = formGroup;
        this.ngForm = ngForm;
        this.stepperService = stepperService;
        this.subscriptions = [];
    }
    ClrStepper.prototype.ngOnInit = function () {
        if (!this.formGroup && !this.ngForm) {
            throw new Error('To use stepper a Reactive or Template Form is required.');
        }
        this.form = this.formGroup ? this.formGroup : this.ngForm;
        this.subscriptions.push(this.listenForPanelsCompleted());
        this.subscriptions.push(this.listenForFormResetChanges());
    };
    ClrStepper.prototype.ngOnChanges = function (changes) {
        if (changes.initialPanel.currentValue !== changes.initialPanel.previousValue) {
            this.stepperService.overrideInitialPanel(this.initialPanel);
        }
    };
    ClrStepper.prototype.ngAfterViewInit = function () {
        this.subscriptions.push(this.listenForDOMChanges());
    };
    ClrStepper.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ClrStepper.prototype.listenForFormResetChanges = function () {
        var _this = this;
        return this.form.statusChanges
            .pipe(filter(function () { return _this.form.pristine; })) // https://github.com/angular/angular/issues/10887
            .subscribe(function () { return _this.stepperService.resetPanels(); });
    };
    ClrStepper.prototype.listenForPanelsCompleted = function () {
        var _this = this;
        return this.stepperService.panelsCompleted.subscribe(function (panelsCompleted) {
            if (panelsCompleted && _this.form.valid) {
                _this.form.ngSubmit.emit();
            }
            else if (!_this.form.valid && _this.form.touched) {
                _this.setPanelsWithFormErrors();
            }
        });
    };
    ClrStepper.prototype.setPanelsWithFormErrors = function () {
        var panelsWithErrors = this.panels.reduce(function (panels, p) { return (p.formGroup.invalid ? __spread(panels, [p.id]) : panels); }, []);
        this.stepperService.setPanelsWithErrors(panelsWithErrors);
    };
    ClrStepper.prototype.listenForDOMChanges = function () {
        var _this = this;
        return this.panels.changes.pipe(startWith(this.panels)).subscribe(function (panels) {
            _this.stepperService.updatePanelOrder(panels.toArray().map(function (p) { return p.id; }));
            if (_this.initialPanel) {
                _this.stepperService.overrideInitialPanel(_this.initialPanel);
            }
        });
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
            template: "<ng-content></ng-content>",
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
    return ClrStepper;
}());

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StepperWillyWonka = /** @class */ (function (_super) {
    __extends(StepperWillyWonka, _super);
    function StepperWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepperWillyWonka = __decorate([
        Directive({ selector: 'form[clrStepper]' })
    ], StepperWillyWonka);
    return StepperWillyWonka;
}(WillyWonka));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StepperOompaLoompa = /** @class */ (function (_super) {
    __extends(StepperOompaLoompa, _super);
    function StepperOompaLoompa(cdr, willyWonka, ifExpandService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-stepper-panel should only be used inside of clrStepper');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expand = ifExpandService;
        return _this;
    }
    Object.defineProperty(StepperOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expand.expanded;
        },
        enumerable: true,
        configurable: true
    });
    StepperOompaLoompa = __decorate([
        Directive({ selector: 'clr-stepper-panel, [clrStepButton]' }),
        __param(1, Optional()),
        __metadata("design:paramtypes", [ChangeDetectorRef, StepperWillyWonka, IfExpandService])
    ], StepperOompaLoompa);
    return StepperOompaLoompa;
}(OompaLoompa));

/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var declarations$1 = [ClrStepper, ClrStepButton, ClrStepperPanel, StepperOompaLoompa, StepperWillyWonka];
var ClrStepperModule = /** @class */ (function () {
    function ClrStepperModule() {
    }
    ClrStepperModule = __decorate([
        NgModule({
            imports: [CommonModule, ClrIconModule, ClrAccordionModule],
            declarations: __spread(declarations$1),
            exports: __spread(declarations$1, [ClrAccordionModule]),
        })
    ], ClrStepperModule);
    return ClrStepperModule;
}());

var ClrProgressBar = /** @class */ (function () {
    function ClrProgressBar() {
        this.externalId = '';
        // Progress
        this.max = 100;
        this.value = 0;
    }
    Object.defineProperty(ClrProgressBar.prototype, "id", {
        get: function () {
            return this._ID;
        },
        set: function (value) {
            this._ID = value;
            this.externalId = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "progressClass", {
        // Styles
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "labeledClass", {
        get: function () {
            return this._labeled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrLabeled", {
        set: function (value) {
            this._labeled = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "fadeClass", {
        get: function () {
            return this._fade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFade", {
        set: function (value) {
            this._fade = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "loopClass", {
        get: function () {
            return this._loop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrLoop", {
        set: function (value) {
            this._loop = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "successClass", {
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrSuccess", {
        set: function (value) {
            this._success = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "dangerClass", {
        get: function () {
            return this._danger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrDanger", {
        set: function (value) {
            this._danger = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "flashClass", {
        get: function () {
            return this._flash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFlash", {
        set: function (value) {
            this._flash = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "flashDangerClass", {
        get: function () {
            return this._flashDanger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "clrFlashDanger", {
        set: function (value) {
            this._flashDanger = isBooleanAttributeSet(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrProgressBar.prototype, "displayValue", {
        /**
         * Make sure that we always will have something that is readable
         * for the screen reader
         */
        get: function () {
            if (this.displayval) {
                return this.displayval;
            }
            return this.value + "%";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Display aria-live only when there is value and it's not 0 or equal to the max value
     */
    ClrProgressBar.prototype.displayAriaLive = function () {
        return (this.value !== undefined || this.value !== 0) && this.value !== this.max;
    };
    Object.defineProperty(ClrProgressBar.prototype, "ariaLive", {
        get: function () {
            if (isBooleanAttributeSet(this.assertive)) {
                return 'assertive';
            }
            if (isBooleanAttributeSet(this.off)) {
                return 'off';
            }
            return 'polite';
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n    <progress [id]=\"id\" [attr.max]=\"max\" [attr.value]=\"value\" [attr.data-displayval]=\"displayValue\"></progress>\n    <span *ngIf=\"displayAriaLive()\" [attr.aria-live]=\"ariaLive\">{{ displayValue }}</span>\n  "
        })
    ], ClrProgressBar);
    return ClrProgressBar;
}());

var CLR_PROGRESS_BAR_DIRECTIVES = [ClrProgressBar];
var ClrProgressBarModule = /** @class */ (function () {
    function ClrProgressBarModule() {
    }
    ClrProgressBarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [CLR_PROGRESS_BAR_DIRECTIVES],
            exports: [CLR_PROGRESS_BAR_DIRECTIVES],
        })
    ], ClrProgressBarModule);
    return ClrProgressBarModule;
}());

var ClarityModule = /** @class */ (function () {
    function ClarityModule() {
    }
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
    return ClarityModule;
}());

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
function fade(opacity) {
    if (opacity === void 0) { opacity = 1; }
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
    var transform = null;
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
    var transform = null;
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
