import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { commonStringsDefault } from './common-strings.default';
import * as i0 from "@angular/core";
let ClrCommonStringsService = class ClrCommonStringsService {
    constructor() {
        this._strings = commonStringsDefault;
    }
    /**
     * Allows you to pass in new overrides for localization
     */
    localize(overrides) {
        this._strings = Object.assign({}, this._strings, overrides);
    }
    /**
     * Access to all of the keys as strings
     */
    get keys() {
        return this._strings;
    }
    /**
     * Parse a string with a set of tokens to replace
     */
    parse(source, tokens = {}) {
        const names = Object.keys(tokens);
        let output = source;
        if (names.length) {
            names.forEach(name => {
                output = output.replace(`{${name}}`, tokens[name]);
            });
        }
        return output;
    }
};
ClrCommonStringsService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ClrCommonStringsService_Factory() { return new ClrCommonStringsService(); }, token: ClrCommonStringsService, providedIn: "root" });
ClrCommonStringsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], ClrCommonStringsService);
export { ClrCommonStringsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBS2hFLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBSHBDO1FBSVUsYUFBUSxHQUFHLG9CQUFvQixDQUFDO0tBNkJ6QztJQTNCQzs7T0FFRztJQUNILFFBQVEsQ0FBQyxTQUEyQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxxQkFBUSxJQUFJLENBQUMsUUFBUSxFQUFLLFNBQVMsQ0FBRSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBYyxFQUFFLFNBQW9DLEVBQUU7UUFDMUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBOztBQTlCWSx1QkFBdUI7SUFIbkMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLHVCQUF1QixDQThCbkM7U0E5QlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgY29tbW9uU3RyaW5nc0RlZmF1bHQgfSBmcm9tICcuL2NvbW1vbi1zdHJpbmdzLmRlZmF1bHQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2Uge1xuICBwcml2YXRlIF9zdHJpbmdzID0gY29tbW9uU3RyaW5nc0RlZmF1bHQ7XG5cbiAgLyoqXG4gICAqIEFsbG93cyB5b3UgdG8gcGFzcyBpbiBuZXcgb3ZlcnJpZGVzIGZvciBsb2NhbGl6YXRpb25cbiAgICovXG4gIGxvY2FsaXplKG92ZXJyaWRlczogQ2xyQ29tbW9uU3RyaW5ncykge1xuICAgIHRoaXMuX3N0cmluZ3MgPSB7IC4uLnRoaXMuX3N0cmluZ3MsIC4uLm92ZXJyaWRlcyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VzcyB0byBhbGwgb2YgdGhlIGtleXMgYXMgc3RyaW5nc1xuICAgKi9cbiAgZ2V0IGtleXMoKTogUmVhZG9ubHk8Q2xyQ29tbW9uU3RyaW5ncz4ge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGEgc3RyaW5nIHdpdGggYSBzZXQgb2YgdG9rZW5zIHRvIHJlcGxhY2VcbiAgICovXG4gIHBhcnNlKHNvdXJjZTogc3RyaW5nLCB0b2tlbnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSkge1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXModG9rZW5zKTtcbiAgICBsZXQgb3V0cHV0ID0gc291cmNlO1xuICAgIGlmIChuYW1lcy5sZW5ndGgpIHtcbiAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKGB7JHtuYW1lfX1gLCB0b2tlbnNbbmFtZV0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbn1cbiJdfQ==