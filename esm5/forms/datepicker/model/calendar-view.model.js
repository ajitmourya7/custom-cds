/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { NO_OF_DAYS_IN_A_WEEK, NO_OF_ROWS_IN_CALENDAR_VIEW, TOTAL_DAYS_IN_DAYS_VIEW } from '../utils/constants';
import { getDay } from '../utils/date-utils';
import { DayViewModel } from './day-view.model';
import { DayModel } from './day.model';
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
        var combinationArr = tslib_1.__spread(prev, curr, next);
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
export { CalendarViewModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvbW9kZWwvY2FsZW5kYXItdmlldy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSwyQkFBMkIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QztJQUNFLDJCQUNTLFFBQXVCLEVBQ3RCLFdBQXFCLEVBQ3JCLFlBQXNCLEVBQ3RCLEtBQWUsRUFDaEIsY0FBc0I7UUFKdEIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBS3ZCLHNCQUFpQixHQUFtQixFQUFFLENBQUM7UUFIN0MsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQVNELHNCQUFJLDJDQUFZO1FBSGhCOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7T0FLRztJQUNLLGtEQUFzQixHQUE5QjtRQUNFLGdEQUFnRDtRQUNoRCxJQUFNLGlCQUFpQixHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZFLElBQU0saUJBQWlCLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFbkUsNENB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cmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgTk9fT0ZfREFZU19JTl9BX1dFRUssIE5PX09GX1JPV1NfSU5fQ0FMRU5EQVJfVklFVywgVE9UQUxfREFZU19JTl9EQVlTX1ZJRVcgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RGF5IH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS11dGlscyc7XG5cbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IERheVZpZXdNb2RlbCB9IGZyb20gJy4vZGF5LXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgRGF5TW9kZWwgfSBmcm9tICcuL2RheS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclZpZXdNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjYWxlbmRhcjogQ2FsZW5kYXJNb2RlbCxcbiAgICBwcml2YXRlIHNlbGVjdGVkRGF5OiBEYXlNb2RlbCxcbiAgICBwcml2YXRlIGZvY3VzYWJsZURheTogRGF5TW9kZWwsXG4gICAgcHJpdmF0ZSB0b2RheTogRGF5TW9kZWwsXG4gICAgcHVibGljIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ2FsZW5kYXJWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIGN1cnJNb250aERheVZpZXdzOiBEYXlWaWV3TW9kZWxbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2NhbGVuZGFyVmlldzogRGF5Vmlld01vZGVsW11bXTtcblxuICAvKipcbiAgICogRGF5Vmlld01vZGVsIG1hdHJpeC4gU2l6ZSA2eDdcbiAgICovXG4gIGdldCBjYWxlbmRhclZpZXcoKTogRGF5Vmlld01vZGVsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSA2eDcgbWF0cml4IG9mIERheVZpZXdNb2RlbCBiYXNlZCBvbiB0aGUgQ2FsZW5kYXIuXG4gICAqIFRoZSA2eDcgbWF0cml4IGlzIHN0cnVjdHVyZWQgYWNjb3JkaW5nIHRvIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAqIDYgcm93cyB0byBhY2NvbW1vZGF0ZSBtb250aHMgd2hpY2ggbWlnaHQgaGF2ZSBkYXRlcyBzcGFubmluZyBvdmVyIDYgd2Vla3MuXG4gICAqIDcgY29sdW1ucyBiZWNhdXNlIHRoZXJlIGFyZSA3IGRheXMgaW4gYSB3ZWVrIDpQIDpEXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVDYWxlbmRhclZpZXcoKTogdm9pZCB7XG4gICAgLy8gR2VuZXJhdGUgcHJldiBhbmQgbmV4dCBtb250aCBjYWxlbmRhciBtb2RlbHMuXG4gICAgY29uc3QgcHJldk1vbnRoQ2FsZW5kYXI6IENhbGVuZGFyTW9kZWwgPSB0aGlzLmNhbGVuZGFyLnByZXZpb3VzTW9udGgoKTtcbiAgICBjb25zdCBuZXh0TW9udGhDYWxlbmRhcjogQ2FsZW5kYXJNb2RlbCA9IHRoaXMuY2FsZW5kYXIubmV4dE1vbnRoKCk7XG5cbiAgICAvLyBHZXQgbm8gb2YgZGF5cyBmcm9tIHByZXYgYW5kIG5leHQgbW9udGhzLlxuICAgIGNvbnN0IGRheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3OiBudW1iZXIgPSB0aGlzLm51bURheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3KFxuICAgICAgdGhpcy5jYWxlbmRhci55ZWFyLFxuICAgICAgdGhpcy5jYWxlbmRhci5tb250aFxuICAgICk7XG4gICAgY29uc3QgZGF5c0Zyb21OZXh0TW9udGhJbkNhbFZpZXc6IG51bWJlciA9XG4gICAgICBUT1RBTF9EQVlTX0lOX0RBWVNfVklFVyAtICh0aGlzLmNhbGVuZGFyLmRheXMubGVuZ3RoICsgZGF5c0Zyb21QcmV2TW9udGhJbkNhbFZpZXcpO1xuXG4gICAgLy8gR2VuZXJhdGUgcHJldiwgY3VyciBhbmQgbmV4dCBkYXkgdmlldyBtb2RlbHNcbiAgICBsZXQgcHJldk1vbnRoRGF5Vmlld3M6IERheVZpZXdNb2RlbFtdID0gW107XG4gICAgbGV0IG5leHRNb250aERheVZpZXdzOiBEYXlWaWV3TW9kZWxbXSA9IFtdO1xuXG4gICAgaWYgKGRheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3ID4gMCkge1xuICAgICAgcHJldk1vbnRoRGF5Vmlld3MgPSB0aGlzLmdlbmVyYXRlRGF5Vmlld01vZGVscyhcbiAgICAgICAgcHJldk1vbnRoQ2FsZW5kYXIuZGF5cy5zbGljZSgtMSAqIGRheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3KSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyTW9udGhEYXlWaWV3cyA9IHRoaXMuZ2VuZXJhdGVEYXlWaWV3TW9kZWxzKHRoaXMuY2FsZW5kYXIuZGF5cywgZmFsc2UsIHRydWUpO1xuXG4gICAgaWYgKGRheXNGcm9tTmV4dE1vbnRoSW5DYWxWaWV3ID4gMCkge1xuICAgICAgbmV4dE1vbnRoRGF5Vmlld3MgPSB0aGlzLmdlbmVyYXRlRGF5Vmlld01vZGVscyhcbiAgICAgICAgbmV4dE1vbnRoQ2FsZW5kYXIuZGF5cy5zbGljZSgwLCBkYXlzRnJvbU5leHRNb250aEluQ2FsVmlldyksXG4gICAgICAgIHRydWUsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIGNhbGVuZGFyIHZpZXcgYW5kIGluaXRpYWxpemUgZmxhZ3NcbiAgICB0aGlzLl9jYWxlbmRhclZpZXcgPSB0aGlzLmdlbmVyYXRlQ2FsZW5kYXJWaWV3KHByZXZNb250aERheVZpZXdzLCB0aGlzLmN1cnJNb250aERheVZpZXdzLCBuZXh0TW9udGhEYXlWaWV3cyk7XG4gICAgdGhpcy5pbml0aWFsaXplU2VsZWN0ZWREYXkoKTtcbiAgICB0aGlzLmluaXRpYWxpemVGb2N1c2FibGVEYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBEYXlWaWV3TW9kZWwgYXJyYXkgYmFzZWQgb24gdGhlIERheU1vZGVsIHBhc3NlZFxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZURheVZpZXdNb2RlbHMoZGF5czogRGF5TW9kZWxbXSwgaXNEaXNhYmxlZDogYm9vbGVhbiwgaXNDdXJyZW50Q2FsZW5kYXI6IGJvb2xlYW4pOiBEYXlWaWV3TW9kZWxbXSB7XG4gICAgY29uc3QgZGF5Vmlld3M6IERheVZpZXdNb2RlbFtdID0gZGF5cy5tYXAoZGF5ID0+IHtcbiAgICAgIHJldHVybiBuZXcgRGF5Vmlld01vZGVsKGRheSwgZmFsc2UsIGlzRGlzYWJsZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgaWYgKGlzQ3VycmVudENhbGVuZGFyICYmIHRoaXMuY2FsZW5kYXIuaXNEYXlJbkNhbGVuZGFyKHRoaXMudG9kYXkpKSB7XG4gICAgICBkYXlWaWV3c1t0aGlzLnRvZGF5LmRhdGUgLSAxXS5pc1RvZGF5c0RhdGUgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZGF5Vmlld3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSBjdXJyZW50IG1vbnRoIHRvIGZpZ3VyZSBvdXQgaG93IG1hbnkgZGF0ZXMgb2YgcHJldmlvdXMgbW9udGhcbiAgICogYXJlIG5lZWRlZCB0byBjb21wbGV0ZSB0aGUgQ2FsZW5kYXIgVmlldyBiYXNlZCBvbiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgKiBlZzogQXNzdW1pbmcgbG9jYWxlIGVuLVVTLCB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIGlzIFN1bmRheSxcbiAgICogaWYgZmlyc3QgZGF5IG9mIHRoZSBjdXJyZW50IG1vbnRoIGxhbmRzIG9uIFdlZG5lc2RheSwgdGhlblxuICAgKiAodGhpcy5nZXREYXkgZnVuY3Rpb24gd291bGQgcmV0dXJuIDMgc2luY2VcbiAgICogZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIGlzIDApLCB3ZSBuZWVkIHRoZSAzIGRheXMgZnJvbSB0aGUgcHJldmlvdXMgbW9udGguXG4gICAqL1xuICBwcml2YXRlIG51bURheXNGcm9tUHJldk1vbnRoSW5DYWxWaWV3KGN1cnJlbnRZZWFyOiBudW1iZXIsIGN1cnJlbnRNb250aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBmaXJzdERheU9mQ3Vyck1vbnRoOiBudW1iZXIgPSBnZXREYXkoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XG5cbiAgICBpZiAoZmlyc3REYXlPZkN1cnJNb250aCA+PSB0aGlzLmZpcnN0RGF5T2ZXZWVrKSB7XG4gICAgICByZXR1cm4gZmlyc3REYXlPZkN1cnJNb250aCAtIHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOT19PRl9EQVlTX0lOX0FfV0VFSyArIGZpcnN0RGF5T2ZDdXJyTW9udGggLSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIERheSBwYXNzZWQgaXMgaW4gdGhlIENhbGVuZGFyVmlldy5cbiAgICovXG4gIHByaXZhdGUgaXNEYXlJbkNhbGVuZGFyVmlldyhkYXk6IERheU1vZGVsKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmNhbGVuZGFyLmlzRGF5SW5DYWxlbmRhcihkYXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzaW5nIHRoZSBEYXlWaWV3TW9kZWxzIGZyb20gdGhlIHByZXZpb3VzLCBjdXJyZW50IGFuZCBuZXh0IG1vbnRoLCB0aGlzIGZ1bmN0aW9uXG4gICAqIGdlbmVyYXRlcyB0aGUgQ2FsZW5kYXJWaWV3LlxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNhbGVuZGFyVmlldyhwcmV2OiBEYXlWaWV3TW9kZWxbXSwgY3VycjogRGF5Vmlld01vZGVsW10sIG5leHQ6IERheVZpZXdNb2RlbFtdKTogRGF5Vmlld01vZGVsW11bXSB7XG4gICAgY29uc3QgY29tYmluYXRpb25BcnI6IERheVZpZXdNb2RlbFtdID0gWy4uLnByZXYsIC4uLmN1cnIsIC4uLm5leHRdO1xuXG4gICAgY29uc3QgY2FsZW5kYXJWaWV3OiBEYXlWaWV3TW9kZWxbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19PRl9ST1dTX0lOX0NBTEVOREFSX1ZJRVc7IGkrKykge1xuICAgICAgY2FsZW5kYXJWaWV3W2ldID0gY29tYmluYXRpb25BcnIuc2xpY2UoaSAqIE5PX09GX0RBWVNfSU5fQV9XRUVLLCAoaSArIDEpICogTk9fT0ZfREFZU19JTl9BX1dFRUspO1xuICAgIH1cbiAgICByZXR1cm4gY2FsZW5kYXJWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHNlbGVjdGVkIGRheSBpZiB0aGUgZGF5IGlzIGluIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNlbGVjdGVkRGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuaXNEYXlJbkNhbGVuZGFyVmlldyh0aGlzLnNlbGVjdGVkRGF5KSkge1xuICAgICAgdGhpcy5jdXJyTW9udGhEYXlWaWV3c1t0aGlzLnNlbGVjdGVkRGF5LmRhdGUgLSAxXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGZvY3VzYWJsZSBkYXkgaWYgdGhlIGRheSBpcyBpbiB0aGUgY2FsZW5kYXIuIElmIGZvY3VzYWJsZSBkYXkgaXMgbm90IHNldCwgdGhlblxuICAgKiB3ZSBjaGVjayBmb3IgdGhlIHNlbGVjdGVkIGRheS4gSWYgc2VsZWN0ZWQgZGF5IGlzIG5vdCBzZXQgdGhlbiBjaGVjayBpZiB0b2RheSBpcyBpbiB0aGUgY3VycmVudFxuICAgKiBjYWxlbmRhci4gSWYgbm90IHRoZW4ganVzdCBzZXQgdGhlIDE1dGggb2YgdGhlIGN1cnJlbnQgY2FsZW5kYXIgbW9udGguXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVGb2N1c2FibGVEYXkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9jdXNhYmxlRGF5ICYmIHRoaXMuaXNEYXlJbkNhbGVuZGFyVmlldyh0aGlzLmZvY3VzYWJsZURheSkpIHtcbiAgICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyh0aGlzLmZvY3VzYWJsZURheSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkRGF5ICYmIHRoaXMuaXNEYXlJbkNhbGVuZGFyVmlldyh0aGlzLnNlbGVjdGVkRGF5KSkge1xuICAgICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKHRoaXMuc2VsZWN0ZWREYXksIHRydWUpO1xuICAgICAgdGhpcy5mb2N1c2FibGVEYXkgPSB0aGlzLnNlbGVjdGVkRGF5LmNsb25lKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRGF5SW5DYWxlbmRhclZpZXcodGhpcy50b2RheSkpIHtcbiAgICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyh0aGlzLnRvZGF5LCB0cnVlKTtcbiAgICAgIHRoaXMuZm9jdXNhYmxlRGF5ID0gdGhpcy50b2RheS5jbG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvY3VzYWJsZURheSA9IG5ldyBEYXlNb2RlbCh0aGlzLmNhbGVuZGFyLnllYXIsIHRoaXMuY2FsZW5kYXIubW9udGgsIDE1KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNhYmxlRmxhZyh0aGlzLmZvY3VzYWJsZURheSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGb2N1c2FibGVGbGFnKGRheTogRGF5TW9kZWwsIGZsYWc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZGF5KSB7XG4gICAgICB0aGlzLmN1cnJNb250aERheVZpZXdzW2RheS5kYXRlIC0gMV0uaXNGb2N1c2FibGUgPSBmbGFnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIHVwZGF0ZUZvY3VzYWJsZURheShkYXk6IERheU1vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKHRoaXMuZm9jdXNhYmxlRGF5LCBmYWxzZSk7XG4gICAgdGhpcy5zZXRGb2N1c2FibGVGbGFnKGRheSwgdHJ1ZSk7XG4gICAgdGhpcy5mb2N1c2FibGVEYXkgPSBkYXk7XG4gIH1cbn1cbiJdfQ==