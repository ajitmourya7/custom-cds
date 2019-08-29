/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '../../icon/icon.module';
import { ClrMainContainer } from './main-container';
export const CLR_LAYOUT_DIRECTIVES = [ClrMainContainer];
let ClrMainContainerModule = class ClrMainContainerModule {
};
ClrMainContainerModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, ClrIconModule],
        declarations: [CLR_LAYOUT_DIRECTIVES],
        exports: [CLR_LAYOUT_DIRECTIVES],
    })
], ClrMainContainerModule);
export { ClrMainContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsibGF5b3V0L21haW4tY29udGFpbmVyL21haW4tY29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBT3JFLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0NBQUcsQ0FBQTtBQUF6QixzQkFBc0I7SUFMbEMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztRQUN0QyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztLQUNqQyxDQUFDO0dBQ1csc0JBQXNCLENBQUc7U0FBekIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xySWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2xyTWFpbkNvbnRhaW5lciB9IGZyb20gJy4vbWFpbi1jb250YWluZXInO1xuXG5leHBvcnQgY29uc3QgQ0xSX0xBWU9VVF9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtDbHJNYWluQ29udGFpbmVyXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xySWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NMUl9MQVlPVVRfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtDTFJfTEFZT1VUX0RJUkVDVElWRVNdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJNYWluQ29udGFpbmVyTW9kdWxlIHt9XG4iXX0=