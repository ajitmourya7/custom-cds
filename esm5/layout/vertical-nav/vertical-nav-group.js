/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavGroupService } from './providers/vertical-nav-group.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
var EXPANDED_STATE = 'expanded';
var COLLAPSED_STATE = 'collapsed';
var ClrVerticalNavGroup = /** @class */ (function () {
    function ClrVerticalNavGroup(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService, commonStrings) {
        var _this = this;
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.commonStrings = commonStrings;
        this.wasExpanded = false;
        this.expandedChange = new EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(function (value) {
            if (value && _this.expandAnimationState === COLLAPSED_STATE) {
                if (_this._navService.collapsed) {
                    _this._navService.collapsed = false;
                }
                _this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && _this.expandAnimationState === EXPANDED_STATE) {
                _this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe(function (goingToCollapse) {
            if (goingToCollapse && _this.expanded) {
                _this.wasExpanded = true;
                _this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && _this.wasExpanded) {
                _this.expandGroup();
                _this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe(function (expand) {
            if (expand && !_this.expanded) {
                _this.expandGroup();
            }
        }));
    }
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expanded", {
        get: function () {
            return this._itemExpand.expanded;
        },
        set: function (value) {
            if (this._itemExpand.expanded !== value) {
                this._itemExpand.expanded = value;
                this.expandedChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrVerticalNavGroup.prototype, "userExpandedInput", {
        set: function (value) {
            value = !!value;
            if (this.expanded !== value) {
                // We have to call toggleExpand because some cases require animations to occur first
                // Directly setting the Expand service value skips the animation and can result in
                // nodes in the DOM but the nav group still being collapsed
                this.toggleExpand();
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.expandGroup = function () {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    };
    ClrVerticalNavGroup.prototype.collapseGroup = function () {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    };
    // closes a group after the collapse animation
    ClrVerticalNavGroup.prototype.expandAnimationDone = function ($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    };
    Object.defineProperty(ClrVerticalNavGroup.prototype, "expandAnimationState", {
        get: function () {
            return this._expandAnimationState;
        },
        set: function (value) {
            if (value !== this._expandAnimationState) {
                this._expandAnimationState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ClrVerticalNavGroup.prototype.toggleExpand = function () {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            // If nav is collasped, first open the nav
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            // then expand the nav group
            this.expandGroup();
        }
    };
    ClrVerticalNavGroup.prototype.ngAfterContentInit = function () {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    };
    ClrVerticalNavGroup.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._navGroupRegistrationService.unregisterNavGroup();
    };
    tslib_1.__decorate([
        HostBinding('class.is-expanded'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrVerticalNavGroup.prototype, "expanded", null);
    tslib_1.__decorate([
        Input('clrVerticalNavGroupExpanded'),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ClrVerticalNavGroup.prototype, "userExpandedInput", null);
    tslib_1.__decorate([
        Output('clrVerticalNavGroupExpandedChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ClrVerticalNavGroup.prototype, "expandedChange", void 0);
    ClrVerticalNavGroup = tslib_1.__decorate([
        Component({
            selector: 'clr-vertical-nav-group',
            template: "<!--\n  ~ Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.\n  ~ This software is released under MIT license.\n  ~ The full license information can be found in LICENSE in the root directory of this project.\n  -->\n\n<div class=\"nav-group-content\">\n    <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n    <button\n        class=\"nav-group-trigger\"\n        type=\"button\"\n        (click)=\"toggleExpand()\">\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <div class=\"nav-group-text\">\n            <ng-content></ng-content>\n        </div>\n        <clr-icon shape=\"caret\"\n                  class=\"nav-group-trigger-icon\"\n                  [attr.dir]=\"(this.expanded) ? 'down' : 'right'\"\n                  [attr.title]=\"(this.expanded) ? commonStrings.keys.collapse : commonStrings.keys.expand\">\n        </clr-icon>\n    </button>\n</div>\n<!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n<div class=\"nav-group-children\"\n     [@clrExpand]=\"expandAnimationState\"\n     (@clrExpand.done)=\"expandAnimationDone($event)\">\n    <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n</div>\n",
            providers: [IfExpandService, VerticalNavGroupService],
            animations: [
                trigger('clrExpand', [
                    state(EXPANDED_STATE, style({ height: '*' })),
                    state(COLLAPSED_STATE, style({ height: 0, 'overflow-y': 'hidden', visibility: 'hidden' })),
                    transition(EXPANDED_STATE + " <=> " + COLLAPSED_STATE, animate('0.2s ease-in-out')),
                ]),
            ],
            host: { class: 'nav-group' }
        }),
        tslib_1.__metadata("design:paramtypes", [IfExpandService,
            VerticalNavGroupRegistrationService,
            VerticalNavGroupService,
            VerticalNavService,
            ClrCommonStringsService])
    ], ClrVerticalNavGroup);
    return ClrVerticalNavGroup;
}());
export { ClrVerticalNavGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L3ZlcnRpY2FsLW5hdi92ZXJ0aWNhbC1uYXYtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQW9CLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWxGLElBQU0sY0FBYyxHQUFXLFVBQVUsQ0FBQztBQUMxQyxJQUFNLGVBQWUsR0FBVyxXQUFXLENBQUM7QUFlNUM7SUFDRSw2QkFDVSxXQUE0QixFQUM1Qiw0QkFBaUUsRUFDakUsZ0JBQXlDLEVBQ3pDLFdBQStCLEVBQ2hDLGFBQXNDO1FBTC9DLGlCQWtEQztRQWpEUyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFxQztRQUNqRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXlCO1FBQ3pDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUErQ3ZDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBeUJRLG1CQUFjLEdBQTBC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dCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25FdmVudCwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkdyb3VwUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1ncm91cC1yZWdpc3RyYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbE5hdkdyb3VwU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi1ncm91cC5zZXJ2aWNlJztcbmltcG9ydCB7IFZlcnRpY2FsTmF2U2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL3ZlcnRpY2FsLW5hdi5zZXJ2aWNlJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvaTE4bi9jb21tb24tc3RyaW5ncy5zZXJ2aWNlJztcblxuY29uc3QgRVhQQU5ERURfU1RBVEU6IHN0cmluZyA9ICdleHBhbmRlZCc7XG5jb25zdCBDT0xMQVBTRURfU1RBVEU6IHN0cmluZyA9ICdjb2xsYXBzZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbHItdmVydGljYWwtbmF2LWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZlcnRpY2FsLW5hdi1ncm91cC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbSWZFeHBhbmRTZXJ2aWNlLCBWZXJ0aWNhbE5hdkdyb3VwU2VydmljZV0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdjbHJFeHBhbmQnLCBbXG4gICAgICBzdGF0ZShFWFBBTkRFRF9TVEFURSwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICBzdGF0ZShDT0xMQVBTRURfU1RBVEUsIHN0eWxlKHsgaGVpZ2h0OiAwLCAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nLCB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKGAke0VYUEFOREVEX1NUQVRFfSA8PT4gJHtDT0xMQVBTRURfU1RBVEV9YCwgYW5pbWF0ZSgnMC4ycyBlYXNlLWluLW91dCcpKSxcbiAgICBdKSxcbiAgXSxcbiAgaG9zdDogeyBjbGFzczogJ25hdi1ncm91cCcgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyVmVydGljYWxOYXZHcm91cCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2l0ZW1FeHBhbmQ6IElmRXhwYW5kU2VydmljZSxcbiAgICBwcml2YXRlIF9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2U6IFZlcnRpY2FsTmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgX25hdkdyb3VwU2VydmljZTogVmVydGljYWxOYXZHcm91cFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfbmF2U2VydmljZTogVmVydGljYWxOYXZTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9uYXZHcm91cFJlZ2lzdHJhdGlvblNlcnZpY2UucmVnaXN0ZXJOYXZHcm91cCgpO1xuXG4gICAgLy8gRklYTUU6IFRoaXMgc3Vic2NyaXB0aW9uIGhhbmRsZXMgYSBjb3JuZXIgY2FzZVxuICAgIC8vIFZlcnRpY2FsIE5hdiBjb2xsYXBzZSByZXF1aXJlcyB0aGUgYW5pbWF0aW9uIHRvIHJ1biBmaXJzdCBhbmQgdGhlblxuICAgIC8vIHJlbW92ZSB0aGUgbm9kZXMgZnJvbSB0aGUgRE9NLiBJZiB0aGUgdXNlciBkaXJlY3RseSBzZXRzIHRoZSBpbnB1dFxuICAgIC8vIG9uIHRoZSBjbHJJZkV4cGFuZGVkIGRpcmVjdGl2ZSwgd2UgaGF2ZSBubyBjaGFuY2UgdG8gcnVuIHRoZSBhbmltYXRpb25cbiAgICAvLyBhbmQgd2FpdCBmb3IgaXQgdG8gY29tcGxldGUuIFRoaXMgc3Vic2NyaXB0aW9uIG1ha2VzIHN1cmUgdGhhdCB0aGVcbiAgICAvLyBhbmltYXRpb24gc3RhdGVzIGFyZSBjb3JyZWN0IGZvciB0aGF0IGVkZ2UgY2FzZS5cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9pdGVtRXhwYW5kLmV4cGFuZENoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICBpZiAodmFsdWUgJiYgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9PT0gQ09MTEFQU0VEX1NUQVRFKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXZTZXJ2aWNlLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gRVhQQU5ERURfU1RBVEU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlICYmIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPT09IEVYUEFOREVEX1NUQVRFKSB7XG4gICAgICAgICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IENPTExBUFNFRF9TVEFURTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gMS4gSWYgdGhlIG5hdiBpcyBjb2xsYXBzaW5nLCBjbG9zZSB0aGUgb3BlbiBuYXYgZ3JvdXAgKyBzYXZlIGl0cyBzdGF0ZVxuICAgIC8vIDIuIElmIHRoZSBuYXYgaXMgZXhwYW5kaW5nLCBleHBhbmQgdGhlIG5hdiBncm91cCBpZiB0aGUgcHJldmlvdXMgc3RhdGUgd2FzIGV4cGFuZGVkXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5fbmF2U2VydmljZS5hbmltYXRlT25Db2xsYXBzZWQuc3Vic2NyaWJlKChnb2luZ1RvQ29sbGFwc2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGdvaW5nVG9Db2xsYXBzZSAmJiB0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy53YXNFeHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IENPTExBUFNFRF9TVEFURTtcbiAgICAgICAgfSBlbHNlIGlmICghZ29pbmdUb0NvbGxhcHNlICYmIHRoaXMud2FzRXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLmV4cGFuZEdyb3VwKCk7XG4gICAgICAgICAgdGhpcy53YXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBJZiBhIGxpbmsgaXMgY2xpY2tlZCwgZXhwYW5kIHRoZSBuYXYgZ3JvdXBcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9uYXZHcm91cFNlcnZpY2UuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSgoZXhwYW5kOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChleHBhbmQgJiYgIXRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICB0aGlzLmV4cGFuZEdyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgd2FzRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlzLWV4cGFuZGVkJylcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pdGVtRXhwYW5kLmV4cGFuZGVkO1xuICB9XG5cbiAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1FeHBhbmQuZXhwYW5kZWQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9pdGVtRXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY2xyVmVydGljYWxOYXZHcm91cEV4cGFuZGVkJylcbiAgc2V0IHVzZXJFeHBhbmRlZElucHV0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgIGlmICh0aGlzLmV4cGFuZGVkICE9PSB2YWx1ZSkge1xuICAgICAgLy8gV2UgaGF2ZSB0byBjYWxsIHRvZ2dsZUV4cGFuZCBiZWNhdXNlIHNvbWUgY2FzZXMgcmVxdWlyZSBhbmltYXRpb25zIHRvIG9jY3VyIGZpcnN0XG4gICAgICAvLyBEaXJlY3RseSBzZXR0aW5nIHRoZSBFeHBhbmQgc2VydmljZSB2YWx1ZSBza2lwcyB0aGUgYW5pbWF0aW9uIGFuZCBjYW4gcmVzdWx0IGluXG4gICAgICAvLyBub2RlcyBpbiB0aGUgRE9NIGJ1dCB0aGUgbmF2IGdyb3VwIHN0aWxsIGJlaW5nIGNvbGxhcHNlZFxuICAgICAgdGhpcy50b2dnbGVFeHBhbmQoKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJWZXJ0aWNhbE5hdkdyb3VwRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgX2V4cGFuZEFuaW1hdGlvblN0YXRlOiBzdHJpbmcgPSBDT0xMQVBTRURfU1RBVEU7XG5cbiAgZXhwYW5kR3JvdXAoKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgLy8gRXhwYW5kZWQgYW5pbWF0aW9uIG9jY3VycyBhZnRlciBFeHBhbmQuZXhwYW5kIGlzIHNldCB0byB0cnVlXG4gICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IEVYUEFOREVEX1NUQVRFO1xuICB9XG5cbiAgY29sbGFwc2VHcm91cCgpOiB2b2lkIHtcbiAgICAvLyBJZiBhIFZlcnRpY2FsIE5hdiBHcm91cCB0b2dnbGUgYnV0dG9uIGlzIGNsaWNrZWQgd2hpbGUgdGhlIFZlcnRpY2FsIE5hdiBpcyBpbiBDb2xsYXBzZWQgc3RhdGUsXG4gICAgLy8gdGhlIFZlcnRpY2FsIE5hdiBzaG91bGQgYmUgZXhwYW5kZWQgZmlyc3QuXG4gICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IENPTExBUFNFRF9TVEFURTtcbiAgfVxuXG4gIC8vIGNsb3NlcyBhIGdyb3VwIGFmdGVyIHRoZSBjb2xsYXBzZSBhbmltYXRpb25cbiAgZXhwYW5kQW5pbWF0aW9uRG9uZSgkZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgaWYgKCRldmVudC50b1N0YXRlID09PSBDT0xMQVBTRURfU1RBVEUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXQgZXhwYW5kQW5pbWF0aW9uU3RhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kQW5pbWF0aW9uU3RhdGU7XG4gIH1cblxuICBzZXQgZXhwYW5kQW5pbWF0aW9uU3RhdGUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZXhwYW5kQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuX2V4cGFuZEFuaW1hdGlvblN0YXRlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRXhwYW5kKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmNvbGxhcHNlR3JvdXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgbmF2IGlzIGNvbGxhc3BlZCwgZmlyc3Qgb3BlbiB0aGUgbmF2XG4gICAgICBpZiAodGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5fbmF2U2VydmljZS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoZW4gZXhwYW5kIHRoZSBuYXYgZ3JvdXBcbiAgICAgIHRoaXMuZXhwYW5kR3JvdXAoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gVGhpcyBtYWtlcyBzdXJlIHRoYXQgaWYgc29tZW9uZSBtYXJrcyBhIG5hdiBncm91cCBleHBhbmRlZCBpbiBhIGNvbGxhcHNlZCBuYXZcbiAgICAvLyB0aGUgZXhwYW5kZWQgcHJvcGVydHkgaXMgc3dpdGNoZWQgYmFjayB0byBjb2xsYXBzZWQgc3RhdGUuXG4gICAgaWYgKHRoaXMuX25hdlNlcnZpY2UuY29sbGFwc2VkICYmIHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMud2FzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgdGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9IENPTExBUFNFRF9TVEFURTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5fbmF2R3JvdXBSZWdpc3RyYXRpb25TZXJ2aWNlLnVucmVnaXN0ZXJOYXZHcm91cCgpO1xuICB9XG59XG4iXX0=