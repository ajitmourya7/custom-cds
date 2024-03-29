import { ElementRef } from '@angular/core';
import { DomAdapter } from '../../dom-adapter/dom-adapter';
export declare class ClrExpandableAnimation {
    private element;
    private domAdapter;
    clrExpandTrigger: any;
    startHeight: number;
    constructor(element: ElementRef, domAdapter: DomAdapter);
    readonly expandAnimation: {
        value: any;
        params: {
            startHeight: number;
        };
    };
    animationDone(): void;
    updateStartHeight(): void;
}
