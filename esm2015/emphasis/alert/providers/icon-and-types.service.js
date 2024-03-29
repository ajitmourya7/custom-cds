/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ALERT_TYPES } from '../utils/alert-types';
import { ClrCommonStringsService } from '../../../utils/i18n/common-strings.service';
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
AlertIconAndTypesService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ClrCommonStringsService])
], AlertIconAndTypesService);
export { AlertIconAndTypesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1hbmQtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHckYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFDbkMsWUFBb0IsYUFBc0M7UUFBdEMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRWxELHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBSmlDLENBQUM7SUFNOUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLGNBQWMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjthQUFNLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUVNLGdCQUFnQixDQUFDLElBQVk7UUFDbEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXpELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxTQUFTO2dCQUNaLFNBQVMsQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNyQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDbEQsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxTQUFTLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO2dCQUN2QyxTQUFTLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ2pELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osU0FBUyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7Z0JBQ2pDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNyQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDbEQsTUFBTTtZQUNSO2dCQUNFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2dCQUN4QyxTQUFTLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztnQkFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQy9DLE1BQU07U0FDVDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBOURZLHdCQUF3QjtJQURwQyxVQUFVLEVBQUU7NkNBRXdCLHVCQUF1QjtHQUQvQyx3QkFBd0IsQ0E4RHBDO1NBOURZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbGVydEluZm9PYmplY3QgfSBmcm9tICcuLi91dGlscy9hbGVydC1pbmZvLW9iamVjdCc7XG5pbXBvcnQgeyBBTEVSVF9UWVBFUyB9IGZyb20gJy4uL3V0aWxzL2FsZXJ0LXR5cGVzJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UpIHt9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0SWNvblNoYXBlID0gJ2luZm8tY2lyY2xlJztcbiAgcHJpdmF0ZSBfYWxlcnRJY29uU2hhcGUgPSAnJztcbiAgcHJpdmF0ZSBfYWxlcnRUeXBlID0gJ2luZm8nO1xuXG4gIGdldCBhbGVydFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYWxlcnRUeXBlO1xuICB9XG4gIHNldCBhbGVydFR5cGUodmFsOiBzdHJpbmcpIHtcbiAgICBpZiAoQUxFUlRfVFlQRVMuaW5kZXhPZih2YWwpID4gLTEpIHtcbiAgICAgIHRoaXMuX2FsZXJ0VHlwZSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBnZXQgYWxlcnRJY29uU2hhcGUoKTogc3RyaW5nIHtcbiAgICBpZiAoJycgPT09IHRoaXMuX2FsZXJ0SWNvblNoYXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pY29uSW5mb0Zyb21UeXBlKHRoaXMuX2FsZXJ0VHlwZSkuc2hhcGU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hbGVydEljb25TaGFwZTtcbiAgfVxuICBzZXQgYWxlcnRJY29uU2hhcGUodmFsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXZhbCkge1xuICAgICAgdGhpcy5fYWxlcnRJY29uU2hhcGUgPSAnJztcbiAgICB9IGVsc2UgaWYgKHZhbCAhPT0gdGhpcy5fYWxlcnRJY29uU2hhcGUpIHtcbiAgICAgIHRoaXMuX2FsZXJ0SWNvblNoYXBlID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbGVydEljb25UaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmljb25JbmZvRnJvbVR5cGUodGhpcy5fYWxlcnRUeXBlKS50aXRsZTtcbiAgfVxuXG4gIHB1YmxpYyBpY29uSW5mb0Zyb21UeXBlKHR5cGU6IHN0cmluZyk6IEFsZXJ0SW5mb09iamVjdCB7XG4gICAgY29uc3QgcmV0dXJuT2JqID0geyBzaGFwZTogJycsIGNzc0NsYXNzOiAnJywgdGl0bGU6ICcnIH07XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnZXhjbGFtYXRpb24tdHJpYW5nbGUnO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtd2FybmluZyc7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLndhcm5pbmc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gJ2V4Y2xhbWF0aW9uLWNpcmNsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1kYW5nZXInO1xuICAgICAgICByZXR1cm5PYmoudGl0bGUgPSB0aGlzLmNvbW1vblN0cmluZ3Mua2V5cy5kYW5nZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybk9iai5zaGFwZSA9ICdjaGVjay1jaXJjbGUnO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtc3VjY2Vzcyc7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLnN1Y2Nlc3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gdGhpcy5kZWZhdWx0SWNvblNoYXBlO1xuICAgICAgICByZXR1cm5PYmouY3NzQ2xhc3MgPSAnYWxlcnQtaW5mbyc7XG4gICAgICAgIHJldHVybk9iai50aXRsZSA9IHRoaXMuY29tbW9uU3RyaW5ncy5rZXlzLmluZm87XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5PYmo7XG4gIH1cbn1cbiJdfQ==