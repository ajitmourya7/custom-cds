/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BIG_ENDIAN, DEFAULT_LOCALE_FORMAT, DELIMITER_REGEX, LITTLE_ENDIAN, LITTLE_ENDIAN_REGEX, MIDDLE_ENDIAN, MIDDLE_ENDIAN_REGEX, RTL_REGEX, USER_INPUT_REGEX, } from '../utils/constants';
import { getNumberOfDaysInTheMonth, parseToFourDigitYear } from '../utils/date-utils';
import { LocaleHelperService } from './locale-helper.service';
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
        var _a = tslib_1.__read(dateParts, 3), firstPart = _a[0], secondPart = _a[1], thirdPart = _a[2];
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
    DateIOService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [LocaleHelperService])
    ], DateIOService);
    return DateIOService;
}());
export { DateIOService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZm9ybXMvZGF0ZXBpY2tlci9wcm92aWRlcnMvZGF0ZS1pby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsVUFBVSxFQUNWLHFCQUFxQixFQUNyQixlQUFlLEVBRWYsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCxnQkFBZ0IsR0FDakIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc5RDtJQUtFLHVCQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUp0RCx5QkFBb0IsR0FBVyxxQkFBcUIsQ0FBQztRQUNwRCx3QkFBbUIsR0FBMkIsYUFBYSxDQUFDO1FBQzVELGVBQVUsR0FBcUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFHaEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RSxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU8scURBQTZCLEdBQXJDO1FBQ0UsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckUsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQztTQUMxQzthQUFNLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUM7U0FDMUM7YUFBTTtZQUNMLDhDQUE4QztZQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHlDQUFpQixHQUF6QjtRQUNFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLCtDQUErQztZQUMvQyxtRUFBbUU7WUFDbkUsSUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUUsSUFBTSxVQUFVLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVqRSxpRUFBaUU7WUFDakUsNkVBQTZFO1lBQzdFLHdCQUF3QjtZQUN4QixpRUFBaUU7WUFDakUsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyx5REFBeUQsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN0RjtTQUNGO0lBQ0gsQ0FBQztJQUVELG1EQUEyQixHQUEzQixVQUE0QixJQUFVO1FBQ3BDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxJQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsSUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFNLE9BQU8sR0FBVyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDdEUsSUFBTSxRQUFRLEdBQVcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQzFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLGFBQWEsRUFBRTtnQkFDOUMsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDMUY7aUJBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssYUFBYSxFQUFFO2dCQUNyRCxPQUFPLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMxRjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUMxRjtTQUNGO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsc0JBQUksMENBQWU7YUFBbkI7WUFDRSxJQUFNLE1BQU0sR0FBNkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUN6RSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNLLG9DQUFZLEdBQXBCLFVBQXFCLEtBQWE7UUFDaEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxtQ0FBVyxHQUFuQixVQUFvQixJQUFZLEVBQUUsS0FBYSxFQUFFLElBQVk7UUFDM0QsT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssMENBQWtCLEdBQTFCLFVBQTJCLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUNsRSwrRUFBK0U7UUFDL0Usd0NBQXdDO1FBQ3hDLHdEQUF3RDtRQUN4RCw4RkFBOEY7UUFDOUY7Ozs7Y0FJTTtRQUVOLGtEQUFrRDtRQUNsRCxJQUFNLENBQUMsR0FBVyxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDakQsSUFBTSxDQUFDLEdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQU0sTUFBTSxHQUFXLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkQsQ0FBQztJQUVELGtEQUEwQixHQUExQixVQUEyQixJQUFZO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBTSxTQUFTLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNLLElBQUEsaUNBQThDLEVBQTdDLGlCQUFTLEVBQUUsa0JBQVUsRUFBRSxpQkFBc0IsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxhQUFhLEVBQUU7WUFDOUMsMkNBQTJDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDbEU7YUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxhQUFhLEVBQUU7WUFDckQsMkNBQTJDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLDJDQUEyQztZQUMzQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQWpJVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFNK0IsbUJBQW1CO09BTGxELGFBQWEsQ0FrSXpCO0lBQUQsb0JBQUM7Q0FBQSxBQWxJRCxJQWtJQztTQWxJWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEJJR19FTkRJQU4sXG4gIERFRkFVTFRfTE9DQUxFX0ZPUk1BVCxcbiAgREVMSU1JVEVSX1JFR0VYLFxuICBJbnB1dERhdGVEaXNwbGF5Rm9ybWF0LFxuICBMSVRUTEVfRU5ESUFOLFxuICBMSVRUTEVfRU5ESUFOX1JFR0VYLFxuICBNSURETEVfRU5ESUFOLFxuICBNSURETEVfRU5ESUFOX1JFR0VYLFxuICBSVExfUkVHRVgsXG4gIFVTRVJfSU5QVVRfUkVHRVgsXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXROdW1iZXJPZkRheXNJblRoZU1vbnRoLCBwYXJzZVRvRm91ckRpZ2l0WWVhciB9IGZyb20gJy4uL3V0aWxzL2RhdGUtdXRpbHMnO1xuXG5pbXBvcnQgeyBMb2NhbGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUtaGVscGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZUlPU2VydmljZSB7XG4gIHB1YmxpYyBjbGRyTG9jYWxlRGF0ZUZvcm1hdDogc3RyaW5nID0gREVGQVVMVF9MT0NBTEVfRk9STUFUO1xuICBwcml2YXRlIGxvY2FsZURpc3BsYXlGb3JtYXQ6IElucHV0RGF0ZURpc3BsYXlGb3JtYXQgPSBMSVRUTEVfRU5ESUFOO1xuICBwcml2YXRlIGRlbGltaXRlcnM6IFtzdHJpbmcsIHN0cmluZ10gPSBbJy8nLCAnLyddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvY2FsZUhlbHBlclNlcnZpY2U6IExvY2FsZUhlbHBlclNlcnZpY2UpIHtcbiAgICB0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0ID0gdGhpcy5fbG9jYWxlSGVscGVyU2VydmljZS5sb2NhbGVEYXRlRm9ybWF0O1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxvY2FsZURpc3BsYXlGb3JtYXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxvY2FsZURpc3BsYXlGb3JtYXQoKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybWF0OiBzdHJpbmcgPSB0aGlzLmNsZHJMb2NhbGVEYXRlRm9ybWF0LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgaWYgKExJVFRMRV9FTkRJQU5fUkVHRVgudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPSBMSVRUTEVfRU5ESUFOO1xuICAgIH0gZWxzZSBpZiAoTUlERExFX0VORElBTl9SRUdFWC50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRoaXMubG9jYWxlRGlzcGxheUZvcm1hdCA9IE1JRERMRV9FTkRJQU47XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZSBpcyBzZXQgdG8gQklHLUVORElBTiBGT1JNQVRcbiAgICAgIHRoaXMubG9jYWxlRGlzcGxheUZvcm1hdCA9IEJJR19FTkRJQU47XG4gICAgfVxuICAgIHRoaXMuZXh0cmFjdERlbGltaXRlcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdERlbGltaXRlcnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xkckxvY2FsZURhdGVGb3JtYXQpIHtcbiAgICAgIC8vIFNhbml0aXplIERhdGUgRm9ybWF0LiBSZW1vdmUgUlRMIGNoYXJhY3RlcnMuXG4gICAgICAvLyBGSVhNRTogV2hlbiB3ZSBzdXBwb3J0IFJUTCwgcmVtb3ZlIHRoaXMgYW5kIGhhbmRsZSBpdCBjb3JyZWN0bHkuXG4gICAgICBjb25zdCBsb2NhbGVGb3JtYXQ6IHN0cmluZyA9IHRoaXMuY2xkckxvY2FsZURhdGVGb3JtYXQucmVwbGFjZShSVExfUkVHRVgsICcnKTtcbiAgICAgIGNvbnN0IGRlbGltaXRlcnM6IHN0cmluZ1tdID0gbG9jYWxlRm9ybWF0LnNwbGl0KERFTElNSVRFUl9SRUdFWCk7XG5cbiAgICAgIC8vIE5PVEU6IFRoZSBzcGxpdCBmcm9tIHRoZSBDTERSIGRhdGUgZm9ybWF0IHNob3VsZCBhbHdheXMgcmVzdWx0XG4gICAgICAvLyBpbiBhbiBhcmFyeSB3aXRoIDQgZWxlbWVudHMuIFRoZSAxc3QgYW5kIHRoZSAybmQgdmFsdWVzIGFyZSB0aGUgZGVsaW1pdGVyc1xuICAgICAgLy8gd2Ugd2lsbCB1c2UgaW4gb3JkZXIuXG4gICAgICAvLyBFZzogXCJkZC9NTS95XCIuc3BsaXQoL2QrfG0rfHkrL2kpIHJlc3VsdHMgaW4gW1wiXCIsIFwiL1wiLCBcIi9cIiwgXCJcIl1cbiAgICAgIGlmIChkZWxpbWl0ZXJzICYmIGRlbGltaXRlcnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHRoaXMuZGVsaW1pdGVycyA9IFtkZWxpbWl0ZXJzWzFdLCBkZWxpbWl0ZXJzWzJdXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgZGF0ZSBmb3JtYXQgcmVjZWl2ZWQuIERlbGltaXRlcnMgZXh0cmFjdGVkOiAnLCBkZWxpbWl0ZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b0xvY2FsZURpc3BsYXlGb3JtYXRTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0ZU5vOiBudW1iZXIgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgIGNvbnN0IG1vbnRoTm86IG51bWJlciA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICBjb25zdCBkYXRlU3RyOiBzdHJpbmcgPSBkYXRlTm8gPiA5ID8gZGF0ZU5vLnRvU3RyaW5nKCkgOiAnMCcgKyBkYXRlTm87XG4gICAgICBjb25zdCBtb250aFN0cjogc3RyaW5nID0gbW9udGhObyA+IDkgPyBtb250aE5vLnRvU3RyaW5nKCkgOiAnMCcgKyBtb250aE5vO1xuICAgICAgaWYgKHRoaXMubG9jYWxlRGlzcGxheUZvcm1hdCA9PT0gTElUVExFX0VORElBTikge1xuICAgICAgICByZXR1cm4gZGF0ZVN0ciArIHRoaXMuZGVsaW1pdGVyc1swXSArIG1vbnRoU3RyICsgdGhpcy5kZWxpbWl0ZXJzWzFdICsgZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPT09IE1JRERMRV9FTkRJQU4pIHtcbiAgICAgICAgcmV0dXJuIG1vbnRoU3RyICsgdGhpcy5kZWxpbWl0ZXJzWzBdICsgZGF0ZVN0ciArIHRoaXMuZGVsaW1pdGVyc1sxXSArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkgKyB0aGlzLmRlbGltaXRlcnNbMF0gKyBtb250aFN0ciArIHRoaXMuZGVsaW1pdGVyc1sxXSArIGRhdGVTdHI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGdldCBwbGFjZWhvbGRlclRleHQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBmb3JtYXQ6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSA9IHRoaXMubG9jYWxlRGlzcGxheUZvcm1hdC5mb3JtYXQ7XG4gICAgcmV0dXJuIGZvcm1hdFswXSArIHRoaXMuZGVsaW1pdGVyc1swXSArIGZvcm1hdFsxXSArIHRoaXMuZGVsaW1pdGVyc1sxXSArIGZvcm1hdFsyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIG1vbnRoIGVudGVyZWQgYnkgdGhlIHVzZXIgaXMgdmFsaWQgb3Igbm90LlxuICAgKiBOb3RlOiBNb250aCBpcyAwIGJhc2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1ZhbGlkTW9udGgobW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtb250aCA+IC0xICYmIG1vbnRoIDwgMTI7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkYXRlIGlzIHZhbGlkIGRlcGVuZGluZyBvbiB0aGUgeWVhciBhbmQgbW9udGggcHJvdmlkZWQuXG4gICAqL1xuICBwcml2YXRlIGlzVmFsaWREYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGUgPiAwICYmIGRhdGUgPD0gZ2V0TnVtYmVyT2ZEYXlzSW5UaGVNb250aCh5ZWFyLCBtb250aCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSBwYXJhbWV0ZXJzIHByb3ZpZGVkIGFuZCByZXR1cm5zIHRoZSBkYXRlLlxuICAgKiBJZiB0aGUgcGFyYW1ldGVycyBhcmUgbm90XG4gICAqIHZhbGlkIHRoZW4gcmV0dXJuIG51bGwuXG4gICAqIE5PVEU6IChNb250aCBoZXJlIGlzIDEgYmFzZWQgc2luY2UgdGhlIHVzZXIgaGFzIHByb3ZpZGVkIHRoYXQgYXMgYW4gaW5wdXQpXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlQW5kR2V0RGF0ZSh5ZWFyOiBzdHJpbmcsIG1vbnRoOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IERhdGUge1xuICAgIC8vIEkgZG9uJ3Qga25vdyB3aGF0cyB3cm9uZyB3aXRoIHRoZSBUUyBjb21waWxlci4gSXQgdGhyb3dzIGFuIGVycm9yIGlmIEkgd3JpdGVcbiAgICAvLyB0aGUgYmVsb3cgaWYgc3RhdGVtZW50LiBUaGUgZXJyb3IgaXM6XG4gICAgLy8gT3BlcmF0b3IgJyE9PScgY2Fubm90IGJlIGFwcGxpZWQgdG8gdHlwZXMgJzInIGFuZCAnNCdcbiAgICAvLyBNb3JlIGluZm8gaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMjc5NCNpc3N1ZWNvbW1lbnQtMjcwMzQyOTM2XG4gICAgLypcbiAgICAgICAgaWYgKHllYXIubGVuZ3RoICE9PSAyIHx8IHllYXIubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAqL1xuXG4gICAgLy8gSW5zdGVhZCBJIGhhdmUgdG8gd3JpdGUgdGhlIGxvZ2ljIGxpa2UgdGhpcyB4LShcbiAgICBjb25zdCB5OiBudW1iZXIgPSAreWVhcjtcbiAgICBjb25zdCBtOiBudW1iZXIgPSArbW9udGggLSAxOyAvLyBtb250aCBpcyAwIGJhc2VkXG4gICAgY29uc3QgZDogbnVtYmVyID0gK2RhdGU7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWRNb250aChtKSB8fCAhdGhpcy5pc1ZhbGlkRGF0ZSh5LCBtLCBkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VUb0ZvdXJEaWdpdFllYXIoeSk7XG4gICAgcmV0dXJuIHJlc3VsdCAhPT0gLTEgPyBuZXcgRGF0ZShyZXN1bHQsIG0sIGQpIDogbnVsbDtcbiAgfVxuXG4gIGdldERhdGVWYWx1ZUZyb21EYXRlU3RyaW5nKGRhdGU6IHN0cmluZyk6IERhdGUge1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGRhdGVQYXJ0czogc3RyaW5nW10gPSBkYXRlLm1hdGNoKFVTRVJfSU5QVVRfUkVHRVgpO1xuICAgIGlmICghZGF0ZVBhcnRzIHx8IGRhdGVQYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBbZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0LCB0aGlyZFBhcnRdID0gZGF0ZVBhcnRzO1xuICAgIGlmICh0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPT09IExJVFRMRV9FTkRJQU4pIHtcbiAgICAgIC8vIHNlY29uZFBhcnQgaXMgbW9udGggJiYgZmlyc3RQYXJ0IGlzIGRhdGVcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQW5kR2V0RGF0ZSh0aGlyZFBhcnQsIHNlY29uZFBhcnQsIGZpcnN0UGFydCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsZURpc3BsYXlGb3JtYXQgPT09IE1JRERMRV9FTkRJQU4pIHtcbiAgICAgIC8vIGZpcnN0UGFydCBpcyBtb250aCAmJiBzZWNvbmRQYXJ0IGlzIGRhdGVcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQW5kR2V0RGF0ZSh0aGlyZFBhcnQsIGZpcnN0UGFydCwgc2Vjb25kUGFydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlY29uZFBhcnQgaXMgbW9udGggJiYgdGhpcmRQYXJ0IGlzIGRhdGVcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQW5kR2V0RGF0ZShmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHRoaXJkUGFydCk7XG4gICAgfVxuICB9XG59XG4iXX0=