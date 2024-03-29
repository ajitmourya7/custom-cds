import { OnDestroy, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { DynamicWrapper } from '../../utils/host-wrapping/dynamic-wrapper';
import { IfErrorService } from '../common/if-error/if-error.service';
import { ControlClassService } from '../common/providers/control-class.service';
import { FocusService } from '../common/providers/focus.service';
import { LayoutService } from '../common/providers/layout.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { ClrLabel } from '../common/label';
import { DateFormControlService } from './providers/date-form-control.service';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerEnabledService } from './providers/datepicker-enabled.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare class ClrDateContainer implements DynamicWrapper, OnDestroy {
    private _ifOpenService;
    private _dateNavigationService;
    private _datepickerEnabledService;
    private dateFormControlService;
    commonStrings: ClrCommonStringsService;
    private ifErrorService;
    private focusService;
    private controlClassService;
    private layoutService;
    private ngControlService;
    _dynamic: boolean;
    invalid: boolean;
    focus: boolean;
    control: NgControl;
    label: ClrLabel;
    private toggleButton;
    actionButton: ElementRef;
    private subscriptions;
    constructor(_ifOpenService: IfOpenService, _dateNavigationService: DateNavigationService, _datepickerEnabledService: DatepickerEnabledService, dateFormControlService: DateFormControlService, commonStrings: ClrCommonStringsService, ifErrorService: IfErrorService, focusService: FocusService, controlClassService: ControlClassService, layoutService: LayoutService, ngControlService: NgControlService);
    close(): void;
    ngOnInit(): void;
    /**
     * Returns the classes to apply to the control
     */
    controlClass(): string;
    /**
     * Determines if the control needs to add grid classes
     */
    addGrid(): boolean;
    /**
     * Returns if the Datepicker is enabled or not. If disabled, hides the datepicker trigger.
     */
    readonly isEnabled: boolean;
    /**
     * Processes the user input and Initializes the Calendar everytime the datepicker popover is open.
     */
    private initializeCalendar;
    /**
     * Toggles the Datepicker Popover.
     */
    toggleDatepicker(event: MouseEvent): void;
    /**
     * Unsubscribe from subscriptions.
     */
    ngOnDestroy(): void;
}
