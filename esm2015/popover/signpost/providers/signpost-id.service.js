/*
 *  Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let SignpostIdService = class SignpostIdService {
    constructor() {
        this._id = new Subject();
    }
    setId(id) {
        this._id.next(id);
    }
    get id() {
        return this._id.asObservable();
    }
};
SignpostIdService = tslib_1.__decorate([
    Injectable()
], SignpostIdService);
export { SignpostIdService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnBvc3QtaWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvc2lnbnBvc3QvcHJvdmlkZXJzL3NpZ25wb3N0LWlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRDlCO1FBRVUsUUFBRyxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO0lBU3ZELENBQUM7SUFQQyxLQUFLLENBQUMsRUFBVTtRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7QUFWWSxpQkFBaUI7SUFEN0IsVUFBVSxFQUFFO0dBQ0EsaUJBQWlCLENBVTdCO1NBVlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNpZ25wb3N0SWRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfaWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICBzZXRJZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5faWQubmV4dChpZCk7XG4gIH1cblxuICBnZXQgaWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5faWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiJdfQ==