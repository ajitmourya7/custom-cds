/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarModel } from '../model/calendar.model';
import { DayModel } from '../model/day.model';
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
DateNavigationService = tslib_1.__decorate([
    Injectable()
], DateNavigationService);
export { DateNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFQbEM7Ozs7O09BS0c7SUFDSDtRQWdCRTs7V0FFRztRQUNLLG9CQUFlLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQWtCbkMsdUJBQWtCLEdBQXNCLElBQUksT0FBTyxFQUFZLENBQUM7UUF3RWhFLDZCQUF3QixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzlELDJCQUFzQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzVELHNCQUFpQixHQUFzQixJQUFJLE9BQU8sRUFBWSxDQUFDO0lBUXpFLENBQUM7SUFuSUMsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVELHFEQUFxRDtJQUM3QyxvQkFBb0IsQ0FBQyxLQUFvQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7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LFVBQVUsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNGO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFJRDs7T0FFRztJQUNILElBQUksdUJBQXVCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFJRDs7T0FFRztJQUNILElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFJRDs7T0FFRztJQUNILElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFBO0FBdElZLHFCQUFxQjtJQURqQyxVQUFVLEVBQUU7R0FDQSxxQkFBcUIsQ0FzSWpDO1NBdElZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2RlbCB9IGZyb20gJy4uL21vZGVsL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IERheU1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvZGF5Lm1vZGVsJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaXMgcmVzcG9uc2libGUgZm9yOlxuICogMS4gSW5pdGlhbGl6aW5nIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIuXG4gKiAyLiBNb3ZpbmcgdGhlIGNhbGVuZGFyIHRvIHRoZSBuZXh0LCBwcmV2aW91cyBvciBjdXJyZW50IG1vbnRoc1xuICogMy4gTWFuYWdpbmcgdGhlIGZvY3VzZWQgYW5kIHNlbGVjdGVkIGRheSBtb2RlbHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIF9kaXNwbGF5ZWRDYWxlbmRhcjogQ2FsZW5kYXJNb2RlbDtcblxuICBnZXQgZGlzcGxheWVkQ2FsZW5kYXIoKTogQ2FsZW5kYXJNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyO1xuICB9XG5cbiAgLy8gbm90IGEgc2V0dGVyIGJlY2F1c2UgaSB3YW50IHRoaXMgdG8gcmVtYWluIHByaXZhdGVcbiAgcHJpdmF0ZSBzZXREaXNwbGF5ZWRDYWxlbmRhcih2YWx1ZTogQ2FsZW5kYXJNb2RlbCkge1xuICAgIGlmICghdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIuaXNFcXVhbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyID0gdmFsdWU7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhcmlhYmxlIHRvIHN0b3JlIHRvZGF5J3MgZGF0ZS5cbiAgICovXG4gIHByaXZhdGUgX3RvZGF5c0Z1bGxEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdG9kYXk6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVRvZGF5c0RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9kYXlzRnVsbERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuX3RvZGF5ID0gbmV3IERheU1vZGVsKFxuICAgICAgdGhpcy5fdG9kYXlzRnVsbERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlLmdldE1vbnRoKCksXG4gICAgICB0aGlzLl90b2RheXNGdWxsRGF0ZS5nZXREYXRlKClcbiAgICApO1xuICB9XG5cbiAgZ2V0IHRvZGF5KCk6IERheU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fdG9kYXk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWREYXk6IERheU1vZGVsO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkRGF5Q2hhbmdlOiBTdWJqZWN0PERheU1vZGVsPiA9IG5ldyBTdWJqZWN0PERheU1vZGVsPigpO1xuXG4gIGdldCBzZWxlY3RlZERheUNoYW5nZSgpOiBPYnNlcnZhYmxlPERheU1vZGVsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF5Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoYXQgdGhlIHNlbGVjdGVkIGRheSBoYXMgY2hhbmdlZCBzbyB0aGF0IHRoZSBkYXRlIGNhbiBiZSBlbWl0dGVkIHRvIHRoZSB1c2VyLlxuICAgKiBOb3RlOiBPbmx5IHRvIGJlIGNhbGxlZCBmcm9tIGRheS50c1xuICAgKi9cbiAgbm90aWZ5U2VsZWN0ZWREYXlDaGFuZ2VkKGRheU1vZGVsOiBEYXlNb2RlbCkge1xuICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBkYXlNb2RlbDtcbiAgICB0aGlzLl9zZWxlY3RlZERheUNoYW5nZS5uZXh0KGRheU1vZGVsKTtcbiAgfVxuXG4gIHB1YmxpYyBmb2N1c2VkRGF5OiBEYXlNb2RlbDtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNhbGVuZGFyIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBkYXkuXG4gICAqL1xuICBpbml0aWFsaXplQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkRGF5ID0gbnVsbDsgLy8gQ2FuIGJlIHJlbW92ZWQgbGF0ZXIgb24gdGhlIHN0b3JlIGZvY3VzXG4gICAgdGhpcy5pbml0aWFsaXplVG9kYXlzRGF0ZSgpO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRGF5KSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IG5ldyBDYWxlbmRhck1vZGVsKHRoaXMuc2VsZWN0ZWREYXkueWVhciwgdGhpcy5zZWxlY3RlZERheS5tb250aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyID0gbmV3IENhbGVuZGFyTW9kZWwodGhpcy50b2RheS55ZWFyLCB0aGlzLnRvZGF5Lm1vbnRoKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci55ZWFyLCBtb250aCkpO1xuICB9XG5cbiAgY2hhbmdlWWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKG5ldyBDYWxlbmRhck1vZGVsKHllYXIsIHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLm1vbnRoKSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIGRpc3BsYXllZCBjYWxlbmRhciB0byB0aGUgbmV4dCBtb250aC5cbiAgICovXG4gIG1vdmVUb05leHRNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKHRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLm5leHRNb250aCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIHRvIHRoZSBwcmV2aW91cyBtb250aC5cbiAgICovXG4gIG1vdmVUb1ByZXZpb3VzTW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcih0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5wcmV2aW91c01vbnRoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgdG8gdGhlIGN1cnJlbnQgbW9udGggYW5kIHllYXIuXG4gICAqL1xuICBtb3ZlVG9DdXJyZW50TW9udGgoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc3BsYXllZENhbGVuZGFyLmlzRGF5SW5DYWxlbmRhcih0aGlzLnRvZGF5KSkge1xuICAgICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnRvZGF5LnllYXIsIHRoaXMudG9kYXkubW9udGgpKTtcbiAgICB9XG4gICAgdGhpcy5fZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLm5leHQoKTtcbiAgfVxuXG4gIGluY3JlbWVudEZvY3VzRGF5KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzZWREYXkgPSB0aGlzLmZvY3VzZWREYXkuaW5jcmVtZW50QnkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5pc0RheUluQ2FsZW5kYXIodGhpcy5mb2N1c2VkRGF5KSkge1xuICAgICAgdGhpcy5fZm9jdXNlZERheUNoYW5nZS5uZXh0KHRoaXMuZm9jdXNlZERheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIobmV3IENhbGVuZGFyTW9kZWwodGhpcy5mb2N1c2VkRGF5LnllYXIsIHRoaXMuZm9jdXNlZERheS5tb250aCkpO1xuICAgIH1cbiAgICB0aGlzLl9mb2N1c09uQ2FsZW5kYXJDaGFuZ2UubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzcGxheWVkQ2FsZW5kYXJDaGFuZ2U6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIG9ic2VydmFibGUgbGV0cyB0aGUgc3Vic2NyaWJlciBrbm93IHRoYXQgdGhlIGRpc3BsYXllZCBjYWxlbmRhciBoYXMgY2hhbmdlZC5cbiAgICovXG4gIGdldCBkaXNwbGF5ZWRDYWxlbmRhckNoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXJDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9mb2N1c09uQ2FsZW5kYXJDaGFuZ2U6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIG9ic2VydmFibGUgbGV0cyB0aGUgc3Vic2NyaWJlciBrbm93IHRoYXQgdGhlIGZvY3VzIHNob3VsZCBiZSBhcHBsaWVkIG9uIHRoZSBjYWxlbmRhci5cbiAgICovXG4gIGdldCBmb2N1c09uQ2FsZW5kYXJDaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzT25DYWxlbmRhckNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzZWREYXlDaGFuZ2U6IFN1YmplY3Q8RGF5TW9kZWw+ID0gbmV3IFN1YmplY3Q8RGF5TW9kZWw+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSBsZXRzIHRoZSBzdWJzY3JpYmVyIGtub3cgdGhhdCB0aGUgZm9jdXNlZCBkYXkgaW4gdGhlIGRpc3BsYXllZCBjYWxlbmRhciBoYXMgY2hhbmdlZC5cbiAgICovXG4gIGdldCBmb2N1c2VkRGF5Q2hhbmdlKCk6IE9ic2VydmFibGU8RGF5TW9kZWw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZERheUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19