import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { commonStringsDefault } from './common-strings.default';
import * as i0 from "@angular/core";
var ClrCommonStringsService = /** @class */ (function () {
    function ClrCommonStringsService() {
        this._strings = commonStringsDefault;
    }
    /**
     * Allows you to pass in new overrides for localization
     */
    ClrCommonStringsService.prototype.localize = function (overrides) {
        this._strings = tslib_1.__assign({}, this._strings, overrides);
    };
    Object.defineProperty(ClrCommonStringsService.prototype, "keys", {
        /**
         * Access to all of the keys as strings
         */
        get: function () {
            return this._strings;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Parse a string with a set of tokens to replace
     */
    ClrCommonStringsService.prototype.parse = function (source, tokens) {
        if (tokens === void 0) { tokens = {}; }
        var names = Object.keys(tokens);
        var output = source;
        if (names.length) {
            names.forEach(function (name) {
                output = output.replace("{" + name + "}", tokens[name]);
            });
        }
        return output;
    };
    ClrCommonStringsService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ClrCommonStringsService_Factory() { return new ClrCommonStringsService(); }, token: ClrCommonStringsService, providedIn: "root" });
    ClrCommonStringsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        })
    ], ClrCommonStringsService);
    return ClrCommonStringsService;
}());
export { ClrCommonStringsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBS2hFO0lBSEE7UUFJVSxhQUFRLEdBQUcsb0JBQW9CLENBQUM7S0E2QnpDO0lBM0JDOztPQUVHO0lBQ0gsMENBQVEsR0FBUixVQUFTLFNBQTJCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLHdCQUFRLElBQUksQ0FBQyxRQUFRLEVBQUssU0FBUyxDQUFFLENBQUM7SUFDckQsQ0FBQztJQUtELHNCQUFJLHlDQUFJO1FBSFI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0gsdUNBQUssR0FBTCxVQUFNLE1BQWMsRUFBRSxNQUFzQztRQUF0Qyx1QkFBQSxFQUFBLFdBQXNDO1FBQzFELElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBSSxJQUFJLE1BQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7SUE3QlUsdUJBQXVCO1FBSG5DLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyx1QkFBdUIsQ0E4Qm5DO2tDQTNDRDtDQTJDQyxBQTlCRCxJQThCQztTQTlCWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBjb21tb25TdHJpbmdzRGVmYXVsdCB9IGZyb20gJy4vY29tbW9uLXN0cmluZ3MuZGVmYXVsdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJDb21tb25TdHJpbmdzU2VydmljZSB7XG4gIHByaXZhdGUgX3N0cmluZ3MgPSBjb21tb25TdHJpbmdzRGVmYXVsdDtcblxuICAvKipcbiAgICogQWxsb3dzIHlvdSB0byBwYXNzIGluIG5ldyBvdmVycmlkZXMgZm9yIGxvY2FsaXphdGlvblxuICAgKi9cbiAgbG9jYWxpemUob3ZlcnJpZGVzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgdGhpcy5fc3RyaW5ncyA9IHsgLi4udGhpcy5fc3RyaW5ncywgLi4ub3ZlcnJpZGVzIH07XG4gIH1cblxuICAvKipcbiAgICogQWNjZXNzIHRvIGFsbCBvZiB0aGUga2V5cyBhcyBzdHJpbmdzXG4gICAqL1xuICBnZXQga2V5cygpOiBSZWFkb25seTxDbHJDb21tb25TdHJpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ3M7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgYSBzdHJpbmcgd2l0aCBhIHNldCBvZiB0b2tlbnMgdG8gcmVwbGFjZVxuICAgKi9cbiAgcGFyc2Uoc291cmNlOiBzdHJpbmcsIHRva2VuczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9KSB7XG4gICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyh0b2tlbnMpO1xuICAgIGxldCBvdXRwdXQgPSBzb3VyY2U7XG4gICAgaWYgKG5hbWVzLmxlbmd0aCkge1xuICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoYHske25hbWV9fWAsIHRva2Vuc1tuYW1lXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuIl19