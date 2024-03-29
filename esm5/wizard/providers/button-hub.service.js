/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    ButtonHubService = tslib_1.__decorate([
        Injectable()
    ], ButtonHubService);
    return ButtonHubService;
}());
export { ButtonHubService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWh1Yi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsid2l6YXJkL3Byb3ZpZGVycy9idXR0b24taHViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0I7SUFEQTtRQUVTLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTdCLHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFLekMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3JDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFLdkMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUt2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBS3ZDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFvQmpELENBQUM7SUE1Q0Msc0JBQVcsZ0RBQWtCO2FBQTdCO1lBQ0UsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyw0Q0FBYzthQUF6QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDhDQUFnQjthQUEzQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsOENBQWdCO2FBQTNCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyw4Q0FBZ0I7YUFBM0I7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDhDQUFnQjthQUEzQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRU0sd0NBQWEsR0FBcEIsVUFBcUIsVUFBa0I7UUFDckMsSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQzthQUFNLElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdCO2FBQU0sSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjthQUFNLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQS9DVSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBZ0Q1QjtJQUFELHVCQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoRFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCdXR0b25IdWJTZXJ2aWNlIHtcbiAgcHVibGljIGJ1dHRvbnNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3ByZXZpb3VzQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBwcmV2aW91c0J0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dEJ0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgbmV4dEJ0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dEJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9kYW5nZXJCdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IGRhbmdlckJ0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZGFuZ2VyQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbmNlbEJ0bkNsaWNrZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHB1YmxpYyBnZXQgY2FuY2VsQnRuQ2xpY2tlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5jZWxCdG5DbGlja2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluaXNoQnRuQ2xpY2tlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHVibGljIGdldCBmaW5pc2hCdG5DbGlja2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmlzaEJ0bkNsaWNrZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXN0b21CdG5DbGlja2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwdWJsaWMgZ2V0IGN1c3RvbUJ0bkNsaWNrZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tQnRuQ2xpY2tlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBidXR0b25DbGlja2VkKGJ1dHRvblR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICgncHJldmlvdXMnID09PSBidXR0b25UeXBlKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c0J0bkNsaWNrZWQubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoJ25leHQnID09PSBidXR0b25UeXBlKSB7XG4gICAgICB0aGlzLl9uZXh0QnRuQ2xpY2tlZC5uZXh0KCk7XG4gICAgfSBlbHNlIGlmICgnZmluaXNoJyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fZmluaXNoQnRuQ2xpY2tlZC5uZXh0KCk7XG4gICAgfSBlbHNlIGlmICgnZGFuZ2VyJyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fZGFuZ2VyQnRuQ2xpY2tlZC5uZXh0KCk7XG4gICAgfSBlbHNlIGlmICgnY2FuY2VsJyA9PT0gYnV0dG9uVHlwZSkge1xuICAgICAgdGhpcy5fY2FuY2VsQnRuQ2xpY2tlZC5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2N1c3RvbUJ0bkNsaWNrZWQubmV4dChidXR0b25UeXBlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==