export declare class DayModel {
    readonly year: number;
    readonly month: number;
    readonly date: number;
    constructor(year: number, month: number, date: number);
    /**
     * Checks if the passed CalendarDate is equal to itself.
     */
    isEqual(day: DayModel): boolean;
    toDate(): Date;
    /**
     * Returns a new DayModel which is incremented based on the value passed.
     */
    incrementBy(value: number): DayModel;
    /**
     * Clones the current day model.
     */
    clone(): DayModel;
    toDateString(): string;
}
