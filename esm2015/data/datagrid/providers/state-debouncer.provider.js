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
let StateDebouncer = class StateDebouncer {
    /*
     * This provider implements some form of synchronous debouncing through a lock pattern
     * to avoid emitting multiple state changes for a single user action.
     */
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject();
        /*
           * This is the lock, to only emit once all the changes have finished processing
           */
        this.nbChanges = 0;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    get change() {
        return this._change.asObservable();
    }
    changeStart() {
        this.nbChanges++;
    }
    changeDone() {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    }
};
StateDebouncer = tslib_1.__decorate([
    Injectable()
], StateDebouncer);
export { StateDebouncer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9wcm92aWRlcnMvc3RhdGUtZGVib3VuY2VyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9COzs7R0FHRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFMM0I7OztPQUdHO0lBQ0g7UUFFRTs7V0FFRztRQUNLLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBTXRDOzthQUVLO1FBQ0csY0FBUyxHQUFHLENBQUMsQ0FBQztJQVd4QixDQUFDO0lBbkJDLHFGQUFxRjtJQUNyRixJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQU9NLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXhCWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0F3QjFCO1NBeEJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLypcbiAqIFRoaXMgcHJvdmlkZXIgaW1wbGVtZW50cyBzb21lIGZvcm0gb2Ygc3luY2hyb25vdXMgZGVib3VuY2luZyB0aHJvdWdoIGEgbG9jayBwYXR0ZXJuXG4gKiB0byBhdm9pZCBlbWl0dGluZyBtdWx0aXBsZSBzdGF0ZSBjaGFuZ2VzIGZvciBhIHNpbmdsZSB1c2VyIGFjdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlRGVib3VuY2VyIHtcbiAgLyoqXG4gICAqIFRoZSBPYnNlcnZhYmxlIHRoYXQgbGV0cyBvdGhlciBjbGFzc2VzIHN1YnNjcmliZSB0byBnbG9iYWwgc3RhdGUgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLypcbiAgICAgKiBUaGlzIGlzIHRoZSBsb2NrLCB0byBvbmx5IGVtaXQgb25jZSBhbGwgdGhlIGNoYW5nZXMgaGF2ZSBmaW5pc2hlZCBwcm9jZXNzaW5nXG4gICAgICovXG4gIHByaXZhdGUgbmJDaGFuZ2VzID0gMDtcblxuICBwdWJsaWMgY2hhbmdlU3RhcnQoKSB7XG4gICAgdGhpcy5uYkNoYW5nZXMrKztcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VEb25lKCkge1xuICAgIGlmICgtLXRoaXMubmJDaGFuZ2VzID09PSAwKSB7XG4gICAgICB0aGlzLl9jaGFuZ2UubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIl19