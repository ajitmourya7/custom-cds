import { EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { ClrDatagridFilterInterface } from './interfaces/filter.interface';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from './providers/filters';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { ClrPopoverPosition } from '../../utils/popover/interfaces/popover-position.interface';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
export declare class ClrDatagridFilter<T = any> extends DatagridFilterRegistrar<T, ClrDatagridFilterInterface<T>> implements CustomFilter, OnDestroy {
    commonStrings: ClrCommonStringsService;
    private smartToggleService;
    private platformId;
    popoverId: string;
    private subs;
    constructor(_filters: FiltersProvider<T>, commonStrings: ClrCommonStringsService, smartToggleService: ClrPopoverToggleService, platformId: Object, popoverId: string);
    anchor: ElementRef;
    smartPosition: ClrPopoverPosition;
    open: boolean;
    openChange: EventEmitter<boolean>;
    customFilter: ClrDatagridFilterInterface<T> | RegisteredFilter<T, ClrDatagridFilterInterface<T>>;
    /**
     * Indicates if the filter is currently active
     */
    readonly active: boolean;
    ngOnDestroy(): void;
}
