import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2, ViewContainerRef } from '@angular/core';
import { ClrDatagridColumn } from './datagrid-column';
import { ClrDatagridItems } from './datagrid-items';
import { ClrDatagridPlaceholder } from './datagrid-placeholder';
import { ClrDatagridRow } from './datagrid-row';
import { ClrDatagridStateInterface } from './interfaces/state.interface';
import { DisplayModeService } from './providers/display-mode.service';
import { ExpandableRowsCount } from './providers/global-expandable-rows';
import { Items } from './providers/items';
import { Page } from './providers/page';
import { RowActionService } from './providers/row-action-service';
import { Selection } from './providers/selection';
import { StateProvider } from './providers/state.provider';
import { DatagridRenderOrganizer } from './render/render-organizer';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SelectionType } from './enums/selection-type';
export declare class ClrDatagrid<T = any> implements AfterContentInit, AfterViewInit, OnDestroy {
    private organizer;
    items: Items<T>;
    expandableRows: ExpandableRowsCount;
    selection: Selection<T>;
    rowActionService: RowActionService;
    private stateProvider;
    private displayMode;
    private renderer;
    private el;
    private page;
    commonStrings: ClrCommonStringsService;
    constructor(organizer: DatagridRenderOrganizer, items: Items<T>, expandableRows: ExpandableRowsCount, selection: Selection<T>, rowActionService: RowActionService, stateProvider: StateProvider<T>, displayMode: DisplayModeService, renderer: Renderer2, el: ElementRef, page: Page, commonStrings: ClrCommonStringsService);
    SELECTION_TYPE: typeof SelectionType;
    /**
     * Freezes the datagrid while data is loading
     */
    loading: boolean;
    /**
     * Output emitted whenever the data needs to be refreshed, based on user action or external ones
     */
    refresh: EventEmitter<ClrDatagridStateInterface<T>>;
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged(): void;
    /**
     * We grab the smart iterator from projected content
     */
    iterator: ClrDatagridItems<T>;
    /**
     * Array of all selected items
     */
    selected: T[];
    selectedChanged: EventEmitter<T[]>;
    /**
     * Selected item in single-select mode
     */
    singleSelected: T;
    singleSelectedChanged: EventEmitter<T>;
    clrDgSingleSelectionAriaLabel: string;
    clrDgSingleActionableAriaLabel: string;
    clrDetailExpandableAriaLabel: string;
    /**
     * @deprecated since 2.0, remove in 3.0
     *
     * Selection/Deselection on row click mode
     */
    rowSelectionMode: boolean;
    /**
     * Indicates if all currently displayed items are selected
     */
    /**
    * Selects/deselects all currently displayed items
    * @param value
    */
    allSelected: boolean;
    /**
     * Custom placeholder detection
     */
    placeholder: ClrDatagridPlaceholder<T>;
    /**
     * Hideable Column data source / detection.
     */
    columns: QueryList<ClrDatagridColumn<T>>;
    /**
     * When the datagrid is user-managed without the smart iterator, we get the items displayed
     * by querying the projected content. This is needed to keep track of the models currently
     * displayed, typically for selection.
     */
    rows: QueryList<ClrDatagridRow<T>>;
    scrollableColumns: ViewContainerRef;
    datagridTable: ElementRef;
    ngAfterContentInit(): void;
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit(): void;
    /**
     * Subscriptions to all the services and queries changes
     */
    private _subscriptions;
    ngOnDestroy(): void;
    resize(): void;
    _projectedDisplayColumns: ViewContainerRef;
    _projectedCalculationColumns: ViewContainerRef;
    _displayedRows: ViewContainerRef;
    _calculationRows: ViewContainerRef;
}
