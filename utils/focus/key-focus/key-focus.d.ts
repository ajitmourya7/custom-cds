import { ClrFocusDirection } from './enums/focus-direction.enum';
import { FocusableItem } from './interfaces';
export declare class ClrKeyFocus {
    direction: ClrFocusDirection;
    focusOnLoad: boolean;
    private focusChange;
    private clrKeyFocusItems;
    private _focusableItems;
    focusableItems: Array<FocusableItem>;
    private _current;
    readonly current: number;
    private subscriptions;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    handleKeyboardEvent(event: KeyboardEvent): void;
    setClickedItemCurrent(event: any): void;
    resetTabFocus(): void;
    moveTo(position: number): void;
    private positionInRange;
    private readonly currentItem;
    private currentFocusIsNotFirstItem;
    private currentFocusIsNotLastItem;
    private initializeFocus;
    private listenForItemUpdates;
    private keyAction;
    private nextKeyPressed;
    private prevKeyPressed;
}
