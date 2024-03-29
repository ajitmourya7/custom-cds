import { DateNavigationService } from './providers/date-navigation.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare class ClrDaypicker {
    private _viewManagerService;
    private _dateNavigationService;
    private _localeHelperService;
    commonStrings: ClrCommonStringsService;
    constructor(_viewManagerService: ViewManagerService, _dateNavigationService: DateNavigationService, _localeHelperService: LocaleHelperService, commonStrings: ClrCommonStringsService);
    readonly monthAttrString: string;
    readonly yearAttrString: string;
    readonly ariaLiveMonth: string;
    readonly updateAriaLiveYear: string;
    /**
     * Calls the ViewManagerService to change to the monthpicker view.
     */
    changeToMonthView(): void;
    /**
     * Calls the ViewManagerService to change to the yearpicker view.
     */
    changeToYearView(): void;
    /**
     * Returns the month value of the calendar in the TranslationWidth.Abbreviated format.
     */
    readonly calendarMonth: string;
    /**
     * Returns the year value of the calendar.
     */
    readonly calendarYear: number;
    /**
     * Calls the DateNavigationService to move to the next month.
     */
    nextMonth(): void;
    /**
     * Calls the DateNavigationService to move to the previous month.
     */
    previousMonth(): void;
    /**
     * Calls the DateNavigationService to move to the current month.
     */
    currentMonth(): void;
}
