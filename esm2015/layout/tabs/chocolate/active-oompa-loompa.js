import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectorRef, Directive, Inject, Optional } from '@angular/core';
import { OompaLoompa } from '../../../utils/chocolate/oompa-loompa';
import { IF_ACTIVE_ID, IfActiveService } from '../../../utils/conditional/if-active.service';
import { TabsWillyWonka } from './tabs-willy-wonka';
let ActiveOompaLoompa = class ActiveOompaLoompa extends OompaLoompa {
    constructor(cdr, willyWonka, id, ifActive) {
        if (!willyWonka) {
            throw new Error('clrTabLink and clr-tab-content should only be used inside of a clr-tabs');
        }
        super(cdr, willyWonka);
        this.ifActive = ifActive;
        this.id = id;
    }
    get flavor() {
        return this.ifActive.current === this.id;
    }
};
ActiveOompaLoompa = tslib_1.__decorate([
    Directive({ selector: '[clrTabLink], clr-tab-content' }),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(2, Inject(IF_ACTIVE_ID)),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
        TabsWillyWonka, Number, IfActiveService])
], ActiveOompaLoompa);
export { ActiveOompaLoompa };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLW9vbXBhLWxvb21wYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImxheW91dC90YWJzL2Nob2NvbGF0ZS9hY3RpdmUtb29tcGEtbG9vbXBhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRTdGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLFdBQVc7SUFJaEQsWUFDRSxHQUFzQixFQUNWLFVBQTBCLEVBQ2hCLEVBQVUsRUFDaEMsUUFBeUI7UUFFekIsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztTQUM1RjtRQUNELEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFBO0FBckJZLGlCQUFpQjtJQUQ3QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsK0JBQStCLEVBQUUsQ0FBQztJQU9wRCxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTs2Q0FGaEIsaUJBQWlCO1FBQ0UsY0FBYyxVQUU1QixlQUFlO0dBUmhCLGlCQUFpQixDQXFCN0I7U0FyQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPb21wYUxvb21wYSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2Nob2NvbGF0ZS9vb21wYS1sb29tcGEnO1xuaW1wb3J0IHsgSUZfQUNUSVZFX0lELCBJZkFjdGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9jb25kaXRpb25hbC9pZi1hY3RpdmUuc2VydmljZSc7XG5cbmltcG9ydCB7IFRhYnNXaWxseVdvbmthIH0gZnJvbSAnLi90YWJzLXdpbGx5LXdvbmthJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclRhYkxpbmtdLCBjbHItdGFiLWNvbnRlbnQnIH0pXG5leHBvcnQgY2xhc3MgQWN0aXZlT29tcGFMb29tcGEgZXh0ZW5kcyBPb21wYUxvb21wYSB7XG4gIHByaXZhdGUgaWZBY3RpdmU6IElmQWN0aXZlU2VydmljZTtcbiAgcHJpdmF0ZSBpZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgd2lsbHlXb25rYTogVGFic1dpbGx5V29ua2EsXG4gICAgQEluamVjdChJRl9BQ1RJVkVfSUQpIGlkOiBudW1iZXIsXG4gICAgaWZBY3RpdmU6IElmQWN0aXZlU2VydmljZVxuICApIHtcbiAgICBpZiAoIXdpbGx5V29ua2EpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xyVGFiTGluayBhbmQgY2xyLXRhYi1jb250ZW50IHNob3VsZCBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIGEgY2xyLXRhYnMnKTtcbiAgICB9XG4gICAgc3VwZXIoY2RyLCB3aWxseVdvbmthKTtcbiAgICB0aGlzLmlmQWN0aXZlID0gaWZBY3RpdmU7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgZ2V0IGZsYXZvcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZkFjdGl2ZS5jdXJyZW50ID09PSB0aGlzLmlkO1xuICB9XG59XG4iXX0=