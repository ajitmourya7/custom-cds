import { EventEmitter, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { ClrDatagridComparatorInterface } from './interfaces/comparator.interface';
import { FiltersProvider } from './providers/filters';
import { Sort } from './providers/sort';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { ClrDatagridFilterInterface } from './interfaces/filter.interface';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare class ClrDatagridColumn<T = any> extends DatagridFilterRegistrar<T, ClrDatagridFilterInterface<T>> implements OnDestroy, OnInit {
    private _sort;
    private vcr;
    commonStrings: ClrCommonStringsService;
    constructor(_sort: Sort<T>, filters: FiltersProvider<T>, vcr: ViewContainerRef, commonStrings: ClrCommonStringsService);
    /**
     * Subscription to the sort service changes
     */
    private _sortSubscription;
    ngOnDestroy(): void;
    private _field;
    field: string;
    /**
     * ClrDatagridComparatorInterface to use when sorting the column
     */
    private _sortBy;
    sortBy: ClrDatagridComparatorInterface<T> | string;
    colType: 'string' | 'number';
    /**
     * Indicates if the column is sortable
     */
    readonly sortable: boolean;
    /**
     * Indicates if the column is currently sorted
     *
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    private _sorted;
    /**
    * @deprecated This will be removed soon, in favor of the sortOrder mechanism
    */
    sorted: boolean;
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     */
    sortedChange: EventEmitter<boolean>;
    /**
     * Indicates how the column is currently sorted
     */
    private _sortOrder;
    sortOrder: ClrDatagridSortOrder;
    readonly ariaSort: "none" | "ascending" | "descending";
    sortOrderChange: EventEmitter<ClrDatagridSortOrder>;
    /**
     * Sorts the datagrid based on this column
     */
    sort(reverse?: boolean): void;
    sortIcon: any;
    /**
     * A custom filter for this column that can be provided in the projected content
     */
    customFilter: boolean;
    projectedFilter: any;
    filterValue: string | [number, number];
    updateFilterValue: string | [number, number];
    filterValueChange: EventEmitter<{}>;
    private wrappedInjector;
    ngOnInit(): void;
    readonly _view: any;
}
