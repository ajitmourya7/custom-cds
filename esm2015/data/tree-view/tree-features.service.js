import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
let TreeFeaturesService = class TreeFeaturesService {
    constructor() {
        this.selectable = false;
        this.eager = true;
        this.childrenFetched = new Subject();
    }
};
TreeFeaturesService = tslib_1.__decorate([
    Injectable()
], TreeFeaturesService);
export { TreeFeaturesService };
export function treeFeaturesFactory(existing) {
    return existing || new TreeFeaturesService();
}
export const TREE_FEATURES_PROVIDER = {
    provide: TreeFeaturesService,
    useFactory: treeFeaturesFactory,
    /*
     * The Optional + SkipSelf pattern ensures that in case of nested components, only the root one will
     * instantiate a new service and all its children will reuse the root's instance.
     * If there are several roots (in this case, several independent trees on a page), each root will instantiate
     * its own service so they won't interfere with one another.
     *
     * TL;DR - Optional + SkipSelf = 1 instance of TreeFeaturesService per tree.
     */
    deps: [[new Optional(), new SkipSelf(), TreeFeaturesService]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1mZWF0dXJlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvdHJlZS1mZWF0dXJlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBRzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFEaEM7UUFFRSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQUssR0FBRyxJQUFJLENBQUM7UUFLYixvQkFBZSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FBQSxDQUFBO0FBUlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQVEvQjtTQVJZLG1CQUFtQjtBQVVoQyxNQUFNLFVBQVUsbUJBQW1CLENBQUksUUFBZ0M7SUFDckUsT0FBTyxRQUFRLElBQUksSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0FBQy9DLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRztJQUNwQyxPQUFPLEVBQUUsbUJBQW1CO0lBQzVCLFVBQVUsRUFBRSxtQkFBbUI7SUFDL0I7Ozs7Ozs7T0FPRztJQUNILElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Q0FDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IENsclJlY3Vyc2l2ZUZvck9mQ29udGV4dCB9IGZyb20gJy4vcmVjdXJzaXZlLWZvci1vZic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlRmVhdHVyZXNTZXJ2aWNlPFQ+IHtcbiAgc2VsZWN0YWJsZSA9IGZhbHNlO1xuICBlYWdlciA9IHRydWU7XG4gIHJlY3Vyc2lvbjoge1xuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxDbHJSZWN1cnNpdmVGb3JPZkNvbnRleHQ8VD4+O1xuICAgIHJvb3Q6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXTtcbiAgfTtcbiAgY2hpbGRyZW5GZXRjaGVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyZWVGZWF0dXJlc0ZhY3Rvcnk8VD4oZXhpc3Rpbmc6IFRyZWVGZWF0dXJlc1NlcnZpY2U8VD4pIHtcbiAgcmV0dXJuIGV4aXN0aW5nIHx8IG5ldyBUcmVlRmVhdHVyZXNTZXJ2aWNlKCk7XG59XG5cbmV4cG9ydCBjb25zdCBUUkVFX0ZFQVRVUkVTX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBUcmVlRmVhdHVyZXNTZXJ2aWNlLFxuICB1c2VGYWN0b3J5OiB0cmVlRmVhdHVyZXNGYWN0b3J5LFxuICAvKlxuICAgKiBUaGUgT3B0aW9uYWwgKyBTa2lwU2VsZiBwYXR0ZXJuIGVuc3VyZXMgdGhhdCBpbiBjYXNlIG9mIG5lc3RlZCBjb21wb25lbnRzLCBvbmx5IHRoZSByb290IG9uZSB3aWxsXG4gICAqIGluc3RhbnRpYXRlIGEgbmV3IHNlcnZpY2UgYW5kIGFsbCBpdHMgY2hpbGRyZW4gd2lsbCByZXVzZSB0aGUgcm9vdCdzIGluc3RhbmNlLlxuICAgKiBJZiB0aGVyZSBhcmUgc2V2ZXJhbCByb290cyAoaW4gdGhpcyBjYXNlLCBzZXZlcmFsIGluZGVwZW5kZW50IHRyZWVzIG9uIGEgcGFnZSksIGVhY2ggcm9vdCB3aWxsIGluc3RhbnRpYXRlXG4gICAqIGl0cyBvd24gc2VydmljZSBzbyB0aGV5IHdvbid0IGludGVyZmVyZSB3aXRoIG9uZSBhbm90aGVyLlxuICAgKlxuICAgKiBUTDtEUiAtIE9wdGlvbmFsICsgU2tpcFNlbGYgPSAxIGluc3RhbmNlIG9mIFRyZWVGZWF0dXJlc1NlcnZpY2UgcGVyIHRyZWUuXG4gICAqL1xuICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgVHJlZUZlYXR1cmVzU2VydmljZV1dLFxufTtcbiJdfQ==