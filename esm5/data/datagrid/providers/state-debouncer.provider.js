/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/*
 * This provider implements some form of synchronous debouncing through a lock pattern
 * to avoid emitting multiple state changes for a single user action.
 */
var StateDebouncer = /** @class */ (function () {
    function StateDebouncer() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
           * This is the lock, to only emit once all the changes have finished processing
           */
        this.nbChanges = 0;
    }
    Object.defineProperty(StateDebouncer.prototype, "change", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    StateDebouncer.prototype.changeStart = function () {
        this.nbChanges++;
    };
    StateDebouncer.prototype.changeDone = function () {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    };
    StateDebouncer = tslib_1.__decorate([
        Injectable()
    ], StateDebouncer);
    return StateDebouncer;
}());
export { StateDebouncer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9COzs7R0FHRztBQUVIO0lBREE7UUFFRTs7V0FFRztRQUNLLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBTXRDOzthQUVLO1FBQ0csY0FBUyxHQUFHLENBQUMsQ0FBQztJQVd4QixDQUFDO0lBbEJDLHNCQUFXLGtDQUFNO1FBRGpCLHFGQUFxRjthQUNyRjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQU9NLG9DQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSxtQ0FBVSxHQUFqQjtRQUNFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQXZCVSxjQUFjO1FBRDFCLFVBQVUsRUFBRTtPQUNBLGNBQWMsQ0F3QjFCO0lBQUQscUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qXG4gKiBUaGlzIHByb3ZpZGVyIGltcGxlbWVudHMgc29tZSBmb3JtIG9mIHN5bmNocm9ub3VzIGRlYm91bmNpbmcgdGhyb3VnaCBhIGxvY2sgcGF0dGVyblxuICogdG8gYXZvaWQgZW1pdHRpbmcgbXVsdGlwbGUgc3RhdGUgY2hhbmdlcyBmb3IgYSBzaW5nbGUgdXNlciBhY3Rpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZURlYm91bmNlciB7XG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSB0aGF0IGxldHMgb3RoZXIgY2xhc3NlcyBzdWJzY3JpYmUgdG8gZ2xvYmFsIHN0YXRlIGNoYW5nZXNcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogVGhpcyBpcyB0aGUgbG9jaywgdG8gb25seSBlbWl0IG9uY2UgYWxsIHRoZSBjaGFuZ2VzIGhhdmUgZmluaXNoZWQgcHJvY2Vzc2luZ1xuICAgICAqL1xuICBwcml2YXRlIG5iQ2hhbmdlcyA9IDA7XG5cbiAgcHVibGljIGNoYW5nZVN0YXJ0KCkge1xuICAgIHRoaXMubmJDaGFuZ2VzKys7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlRG9uZSgpIHtcbiAgICBpZiAoLS10aGlzLm5iQ2hhbmdlcyA9PT0gMCkge1xuICAgICAgdGhpcy5fY2hhbmdlLm5leHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==