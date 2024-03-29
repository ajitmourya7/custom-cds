import { Observable } from 'rxjs';
import { ClrDatagridFilterInterface } from '../../interfaces/filter.interface';
import { ClrDatagridNumericFilterInterface } from '../../interfaces/numeric-filter.interface';
export declare class DatagridNumericFilterImpl<T = any> implements ClrDatagridFilterInterface<T> {
    filterFn: ClrDatagridNumericFilterInterface<T>;
    constructor(filterFn: ClrDatagridNumericFilterInterface<T>);
    /**
     * The Observable required as part of the Filter interface
     */
    private _changes;
    readonly changes: Observable<[number, number]>;
    /**
     * Internal values and accessor
     */
    private _low;
    private _high;
    /**
     * Common setters for the input values, including individual limits and
     * both at the same time.  Value is singular to make the interface similar
     * to the built-in string filter.
     */
    value: [number, number];
    low: number;
    high: number;
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     */
    isActive(): boolean;
    /**
     * Tests if an item matches a search text
     */
    accepts(item: T): boolean;
    readonly state: this | {
        property: string;
        low: number;
        high: number;
    };
    equals(other: ClrDatagridFilterInterface<T, any>): boolean;
}
