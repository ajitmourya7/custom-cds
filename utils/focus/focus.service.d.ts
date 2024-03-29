import { Optional, Renderer2 } from '@angular/core';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
import { FocusableItem } from './focusable-item/focusable-item';
export declare class FocusService {
    private renderer;
    constructor(renderer: Renderer2);
    private _unlistenFuncs;
    private _current;
    readonly current: FocusableItem;
    reset(first: FocusableItem): void;
    listenToArrowKeys(el: HTMLElement): void;
    registerContainer(el: HTMLElement): void;
    moveTo(item: FocusableItem): void;
    move(direction: ArrowKeyDirection, event?: any): boolean;
    activateCurrent(): boolean;
    detachListeners(): void;
}
export declare function clrFocusServiceFactory(existing: FocusService, renderer: Renderer2): FocusService;
export declare const FOCUS_SERVICE_PROVIDER: {
    provide: typeof FocusService;
    useFactory: typeof clrFocusServiceFactory;
    deps: (Optional[] | typeof Renderer2)[];
};
