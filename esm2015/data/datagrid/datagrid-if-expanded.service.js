/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrLoadingState } from '../../utils/loading/loading';
let DatagridIfExpandService = class DatagridIfExpandService extends IfExpandService {
    constructor() {
        super(...arguments);
        this._replace = new BehaviorSubject(false);
        this._animate = new Subject();
    }
    // due to the es5 spec if the set is overridden on base class the getter must also be overridden
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    loadingStateChange(state) {
        super.loadingStateChange(state);
        if (state !== ClrLoadingState.LOADING) {
            this._animate.next();
        }
    }
    get replace() {
        return this._replace.asObservable();
    }
    setReplace(replaceValue) {
        this._replace.next(replaceValue);
    }
    get animate() {
        return this._animate.asObservable();
    }
};
DatagridIfExpandService = tslib_1.__decorate([
    Injectable()
], DatagridIfExpandService);
export { DatagridIfExpandService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvZGF0YWdyaWQtaWYtZXhwYW5kZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGVBQWU7SUFENUQ7O1FBdUJVLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFTaEUsYUFBUSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO0lBSTlELENBQUM7SUFsQ0MsZ0dBQWdHO0lBQ2hHLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBc0I7UUFDdkMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxLQUFLLGVBQWUsQ0FBQyxPQUFPLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFHRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxZQUFxQjtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRixDQUFBO0FBbkNZLHVCQUF1QjtJQURuQyxVQUFVLEVBQUU7R0FDQSx1QkFBdUIsQ0FtQ25DO1NBbkNZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xyTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbG9hZGluZy9sb2FkaW5nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFncmlkSWZFeHBhbmRTZXJ2aWNlIGV4dGVuZHMgSWZFeHBhbmRTZXJ2aWNlIHtcbiAgLy8gZHVlIHRvIHRoZSBlczUgc3BlYyBpZiB0aGUgc2V0IGlzIG92ZXJyaWRkZW4gb24gYmFzZSBjbGFzcyB0aGUgZ2V0dGVyIG11c3QgYWxzbyBiZSBvdmVycmlkZGVuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9leHBhbmRlZCkge1xuICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2FuaW1hdGUubmV4dCgpO1xuICAgICAgdGhpcy5fZXhwYW5kQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGxvYWRpbmdTdGF0ZUNoYW5nZShzdGF0ZTogQ2xyTG9hZGluZ1N0YXRlKSB7XG4gICAgc3VwZXIubG9hZGluZ1N0YXRlQ2hhbmdlKHN0YXRlKTtcbiAgICBpZiAoc3RhdGUgIT09IENsckxvYWRpbmdTdGF0ZS5MT0FESU5HKSB7XG4gICAgICB0aGlzLl9hbmltYXRlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXBsYWNlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgZ2V0IHJlcGxhY2UoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcGxhY2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRSZXBsYWNlKHJlcGxhY2VWYWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlcGxhY2UubmV4dChyZXBsYWNlVmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIGdldCBhbmltYXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=