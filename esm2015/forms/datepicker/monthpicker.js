import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, HostListener } from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '../../utils/key-codes/key-codes';
import { DateNavigationService } from './providers/date-navigation.service';
import { DatepickerFocusService } from './providers/datepicker-focus.service';
import { LocaleHelperService } from './providers/locale-helper.service';
import { ViewManagerService } from './providers/view-manager.service';
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
tslib_1.__decorate([
    HostListener('keydown', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClrMonthpicker.prototype, "onKeyDown", null);
ClrMonthpicker = tslib_1.__decorate([
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
    tslib_1.__metadata("design:paramtypes", [ViewManagerService,
        LocaleHelperService,
        DateNavigationService,
        DatepickerFocusService,
        ElementRef])
], ClrMonthpicker);
export { ClrMonthpicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGhwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL21vbnRocGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFtQnRFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFDVSxtQkFBdUMsRUFDdkMsb0JBQXlDLEVBQ3pDLHNCQUE2QyxFQUM3Qyx1QkFBK0MsRUFDL0MsTUFBa0I7UUFKbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDcEQsQ0FBQztJQU9EOzs7T0FHRztJQUNILElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksa0JBQWtCO1FBQ3BC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UmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5LWNvZGVzL2tleS1jb2Rlcyc7XG5cbmltcG9ydCB7IERhdGVOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2RhdGUtbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVwaWNrZXJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy9kYXRlcGlja2VyLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxlSGVscGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2xvY2FsZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3TWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92aWV3LW1hbmFnZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1tb250aHBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCJjYWxlbmRhci1idG4gbW9udGhcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoTmFtZXM7IGxldCBtb250aEluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vbnRoKG1vbnRoSW5kZXgpXCJcbiAgICAgICAgICAgIFtjbGFzcy5pcy1zZWxlY3RlZF09XCJtb250aEluZGV4ID09PSBjYWxlbmRhck1vbnRoSW5kZXhcIlxuICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZ2V0VGFiSW5kZXgobW9udGhJbmRleClcIj5cbiAgICAgICAgICAgIHt7bW9udGh9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tb250aHBpY2tlcl0nOiAndHJ1ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsck1vbnRocGlja2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3ZpZXdNYW5hZ2VyU2VydmljZTogVmlld01hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2xvY2FsZUhlbHBlclNlcnZpY2U6IExvY2FsZUhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZU5hdmlnYXRpb25TZXJ2aWNlOiBEYXRlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckZvY3VzU2VydmljZTogRGF0ZXBpY2tlckZvY3VzU2VydmljZSxcbiAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA9IHRoaXMuY2FsZW5kYXJNb250aEluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGZvY3VzZWQgbW9udGguXG4gICAqL1xuICBwcml2YXRlIF9mb2N1c2VkTW9udGhJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtb250aHMgYXJyYXkgd2hpY2ggaXMgdXNlZCB0byByZW5kZXJlZCB0aGUgbW9udGhwaWNrZXIgdmlldy5cbiAgICogTW9udGhzIGFyZSBpbiB0aGUgVHJhbnNsYXRpb25XaWR0aC5XaWRlIGZvcm1hdC5cbiAgICovXG4gIGdldCBtb250aE5hbWVzKCk6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZUhlbHBlclNlcnZpY2UubG9jYWxlTW9udGhzV2lkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtb250aCB2YWx1ZSBvZiB0aGUgQ2FsZW5kYXIuXG4gICAqL1xuICBnZXQgY2FsZW5kYXJNb250aEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5ZWRDYWxlbmRhci5tb250aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHRvIHVwZGF0ZSB0aGUgbW9udGggdmFsdWUgb2YgdGhlIGNhbGVuZGFyLlxuICAgKiBBbHNvIGNoYW5nZXMgdGhlIHZpZXcgdG8gdGhlIGRheXBpY2tlci5cbiAgICovXG4gIGNoYW5nZU1vbnRoKG1vbnRoSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2RhdGVOYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VNb250aChtb250aEluZGV4KTtcbiAgICB0aGlzLl92aWV3TWFuYWdlclNlcnZpY2UuY2hhbmdlVG9EYXlWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIG1vbnRoIHBhc3NlZCB0byB0aGUgZm9jdXNlZCBtb250aCBhbmQgcmV0dXJucyB0aGUgdGFiIGluZGV4LlxuICAgKi9cbiAgZ2V0VGFiSW5kZXgobW9udGhJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbW9udGhJbmRleCA9PT0gdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPyAwIDogLTE7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgS2V5Ym9hcmQgYXJyb3cgbmF2aWdhdGlvbiBmb3IgdGhlIG1vbnRocGlja2VyLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIE5PVEU6IERpZG4ndCBtb3ZlIHRoaXMgdG8gdGhlIGRhdGUgbmF2aWdhdGlvbiBzZXJ2aWNlIGJlY2F1c2VcbiAgICAvLyB0aGUgbG9naWMgaXMgZmFpcmx5IHNpbXBsZSBhbmQgaXQgZGlkbid0IG1ha2Ugc2Vuc2UgZm9yIG1lXG4gICAgLy8gdG8gY3JlYXRlIGV4dHJhIG9ic2VydmFibGVzIGp1c3QgdG8gbW92ZSB0aGlzIGxvZ2ljIHRvIHRoZSBzZXJ2aWNlLlxuICAgIGlmIChldmVudCkge1xuICAgICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gZXZlbnQua2V5Q29kZTtcbiAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVyAmJiB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA+IDApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXgtLTtcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XICYmIHRoaXMuX2ZvY3VzZWRNb250aEluZGV4IDwgMTEpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXgrKztcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckZvY3VzU2VydmljZS5mb2N1c0NlbGwodGhpcy5fZWxSZWYpO1xuICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA8IDYpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPSB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCArIDY7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyAmJiB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCA+IDUpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZE1vbnRoSW5kZXggPSB0aGlzLl9mb2N1c2VkTW9udGhJbmRleCAtIDY7XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgY3VycmVudCBjYWxlbmRhciBtb250aCB3aGVuIHRoZSBWaWV3IGlzIGluaXRpYWxpemVkLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXJGb2N1c1NlcnZpY2UuZm9jdXNDZWxsKHRoaXMuX2VsUmVmKTtcbiAgfVxufVxuIl19