/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { StepperWillyWonka } from './stepper-willy-wonka';
import { IfExpandService } from '../../../utils/conditional/if-expanded.service';
let StepperOompaLoompa = class StepperOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, ifExpandService) {
        if (!willyWonka) {
            throw new Error('clr-stepper-panel should only be used inside of clrStepper');
        }
        super(cdr, willyWonka);
        this.expand = ifExpandService;
    }
    get flavor() {
        return this.expand.expanded;
    }
};
StepperOompaLoompa = tslib_1.__decorate([
    Directive({ selector: 'clr-stepper-panel, [clrStepButton]' }),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, StepperWillyWonka, IfExpandService])
], StepperOompaLoompa);
export { StepperOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1vb21wYS1sb29tcGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJhY2NvcmRpb24vc3RlcHBlci9jaG9jb2xhdGUvc3RlcHBlci1vb21wYS1sb29tcGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBR2pGLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsV0FBVztJQUdqRCxZQUFZLEdBQXNCLEVBQWMsVUFBNkIsRUFBRSxlQUFnQztRQUM3RyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQy9FO1FBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQWRZLGtCQUFrQjtJQUQ5QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUUsQ0FBQztJQUl2QixtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FBOUIsaUJBQWlCLEVBQTBCLGlCQUFpQixFQUFtQixlQUFlO0dBSHBHLGtCQUFrQixDQWM5QjtTQWRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT29tcGFMb29tcGEgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jaG9jb2xhdGUvb29tcGEtbG9vbXBhJztcbmltcG9ydCB7IFN0ZXBwZXJXaWxseVdvbmthIH0gZnJvbSAnLi9zdGVwcGVyLXdpbGx5LXdvbmthJztcbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItc3RlcHBlci1wYW5lbCwgW2NsclN0ZXBCdXR0b25dJyB9KVxuZXhwb3J0IGNsYXNzIFN0ZXBwZXJPb21wYUxvb21wYSBleHRlbmRzIE9vbXBhTG9vbXBhIHtcbiAgcHJpdmF0ZSBleHBhbmQ6IElmRXhwYW5kU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSB3aWxseVdvbmthOiBTdGVwcGVyV2lsbHlXb25rYSwgaWZFeHBhbmRTZXJ2aWNlOiBJZkV4cGFuZFNlcnZpY2UpIHtcbiAgICBpZiAoIXdpbGx5V29ua2EpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyLXN0ZXBwZXItcGFuZWwgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgY2xyU3RlcHBlcicpO1xuICAgIH1cbiAgICBzdXBlcihjZHIsIHdpbGx5V29ua2EpO1xuICAgIHRoaXMuZXhwYW5kID0gaWZFeHBhbmRTZXJ2aWNlO1xuICB9XG5cbiAgZ2V0IGZsYXZvcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmQuZXhwYW5kZWQ7XG4gIH1cbn1cbiJdfQ==