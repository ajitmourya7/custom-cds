/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Directive, Optional } from '@angular/core';
import { OompaLoompa } from '../../utils/chocolate/oompa-loompa';
import { AccordionWillyWonka } from './accordion-willy-wonka';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
var AccordionOompaLoompa = /** @class */ (function (_super) {
    tslib_1.__extends(AccordionOompaLoompa, _super);
    function AccordionOompaLoompa(cdr, willyWonka, ifExpandService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error('clr-accordion-panel should only be used inside of clr-accordion');
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expand = ifExpandService;
        return _this;
    }
    Object.defineProperty(AccordionOompaLoompa.prototype, "flavor", {
        get: function () {
            return this.expand.expanded;
        },
        enumerable: true,
        configurable: true
    });
    AccordionOompaLoompa = tslib_1.__decorate([
        Directive({ selector: 'clr-accordion-panel' }),
        tslib_1.__param(1, Optional()),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, AccordionWillyWonka, IfExpandService])
    ], AccordionOompaLoompa);
    return AccordionOompaLoompa;
}(OompaLoompa));
export { AccordionOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLW9vbXBhLWxvb21wYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImFjY29yZGlvbi9jaG9jb2xhdGUvYWNjb3JkaW9uLW9vbXBhLWxvb21wYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFHOUU7SUFBMEMsZ0RBQVc7SUFHbkQsOEJBQVksR0FBc0IsRUFBYyxVQUErQixFQUFFLGVBQWdDO1FBQWpILGlCQU1DO1FBTEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztTQUNwRjtRQUNELFFBQUEsa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFDO1FBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDOztJQUNoQyxDQUFDO0lBRUQsc0JBQUksd0NBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFiVSxvQkFBb0I7UUFEaEMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLENBQUM7UUFJUixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtpREFBOUIsaUJBQWlCLEVBQTBCLG1CQUFtQixFQUFtQixlQUFlO09BSHRHLG9CQUFvQixDQWNoQztJQUFELDJCQUFDO0NBQUEsQUFkRCxDQUEwQyxXQUFXLEdBY3BEO1NBZFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPb21wYUxvb21wYSB9IGZyb20gJy4uLy4uL3V0aWxzL2Nob2NvbGF0ZS9vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgQWNjb3JkaW9uV2lsbHlXb25rYSB9IGZyb20gJy4vYWNjb3JkaW9uLXdpbGx5LXdvbmthJztcbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLWV4cGFuZGVkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdjbHItYWNjb3JkaW9uLXBhbmVsJyB9KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbk9vbXBhTG9vbXBhIGV4dGVuZHMgT29tcGFMb29tcGEge1xuICBwcml2YXRlIGV4cGFuZDogSWZFeHBhbmRTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBPcHRpb25hbCgpIHdpbGx5V29ua2E6IEFjY29yZGlvbldpbGx5V29ua2EsIGlmRXhwYW5kU2VydmljZTogSWZFeHBhbmRTZXJ2aWNlKSB7XG4gICAgaWYgKCF3aWxseVdvbmthKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsci1hY2NvcmRpb24tcGFuZWwgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnNpZGUgb2YgY2xyLWFjY29yZGlvbicpO1xuICAgIH1cbiAgICBzdXBlcihjZHIsIHdpbGx5V29ua2EpO1xuICAgIHRoaXMuZXhwYW5kID0gaWZFeHBhbmRTZXJ2aWNlO1xuICB9XG5cbiAgZ2V0IGZsYXZvcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmQuZXhwYW5kZWQ7XG4gIH1cbn1cbiJdfQ==