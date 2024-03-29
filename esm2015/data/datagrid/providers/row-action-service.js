/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
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
RowActionService = tslib_1.__decorate([
    Injectable()
], RowActionService);
export { RowActionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWFjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvcm93LWFjdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUQ3QjtRQUVVLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO0lBZ0I5QixDQUFDO0lBZFEsUUFBUTtRQUNiLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFBO0FBakJZLGdCQUFnQjtJQUQ1QixVQUFVLEVBQUU7R0FDQSxnQkFBZ0IsQ0FpQjVCO1NBakJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm93QWN0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgYWN0aW9uYWJsZUNvdW50ID0gMDtcblxuICBwdWJsaWMgcmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5hY3Rpb25hYmxlQ291bnQrKztcbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYWN0aW9uYWJsZUNvdW50LS07XG4gIH1cblxuICAvKipcbiAgICogZmFsc2UgbWVhbnMgbm8gcm93cyB3aXRoIGFjdGlvblxuICAgKi9cbiAgcHVibGljIGdldCBoYXNBY3Rpb25hYmxlUm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbmFibGVDb3VudCA+IDA7XG4gIH1cbn1cbiJdfQ==