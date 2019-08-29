import { AfterViewInit, ElementRef, Injector, Renderer2 } from '@angular/core';
export declare class ClrFocusOnViewInit implements AfterViewInit {
    private el;
    private platformId;
    private injector;
    private renderer;
    constructor(el: ElementRef, platformId: Object, injector: Injector, renderer: Renderer2);
    private document;
    private directFocus;
    onFocusout(): void;
    ngAfterViewInit(): void;
}
