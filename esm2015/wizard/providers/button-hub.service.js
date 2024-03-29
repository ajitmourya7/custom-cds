/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
ButtonHubService = tslib_1.__decorate([
    Injectable()
], ButtonHubService);
export { ButtonHubService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWh1Yi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFEN0I7UUFFUyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU3Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3pDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUtyQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3ZDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFLdkMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUt2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBb0JqRCxDQUFDO0lBNUNDLElBQVcsa0JBQWtCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFHRCxJQUFXLGNBQWM7UUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFHRCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBR0QsSUFBVyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUdELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFHRCxJQUFXLGdCQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCO1FBQ3JDLElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakM7YUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM3QjthQUFNLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7Q0FDRixDQUFBO0FBaERZLGdCQUFnQjtJQUQ1QixVQUFVLEVBQUU7R0FDQSxnQkFBZ0IsQ0FnRDVCO1NBaERZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnV0dG9uSHViU2VydmljZSB7XG4gIHB1YmxpYyBidXR0b25zUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9wcmV2aW91c0J0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgcHJldmlvdXNCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRCdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IG5leHRCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGFuZ2VyQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBkYW5nZXJCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhbmdlckJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jYW5jZWxCdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IGNhbmNlbEJ0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FuY2VsQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmlzaEJ0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgZmluaXNoQnRuQ2xpY2tlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9maW5pc2hCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VzdG9tQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBjdXN0b21CdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgYnV0dG9uQ2xpY2tlZChidXR0b25UeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoJ3ByZXZpb3VzJyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fcHJldmlvdXNCdG5DbGlja2VkLm5leHQoKTtcbiAgICB9IGVsc2UgaWYgKCduZXh0JyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fbmV4dEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2ZpbmlzaCcgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2ZpbmlzaEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2RhbmdlcicgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2RhbmdlckJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ2NhbmNlbCcgPT09IGJ1dHRvblR5cGUpIHtcbiAgICAgIHRoaXMuX2NhbmNlbEJ0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jdXN0b21CdG5DbGlja2VkLm5leHQoYnV0dG9uVHlwZSk7XG4gICAgfVxuICB9XG59XG4iXX0=