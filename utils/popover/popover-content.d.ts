import { OnDestroy, Renderer2, TemplateRef, ViewContainerRef, AfterContentChecked } from '@angular/core';
import { ClrPopoverToggleService } from './providers/popover-toggle.service';
import { ClrPopoverEventsService } from './providers/popover-events.service';
import { ClrPopoverPositionService } from './providers/popover-position.service';
import { ClrPopoverPosition } from './interfaces/popover-position.interface';
/** @dynamic */
export declare class ClrPopoverContent implements AfterContentChecked, OnDestroy {
    private document;
    private container;
    private template;
    private renderer;
    private smartPositionService;
    private smartEventsService;
    private smartOpenService;
    private view;
    private subscriptions;
    open: boolean;
    contentAt: ClrPopoverPosition;
    outsideClickClose: any;
    scrollToClose: any;
    constructor(document: HTMLDocument, container: ViewContainerRef, template: TemplateRef<any>, renderer: Renderer2, smartPositionService: ClrPopoverPositionService, smartEventsService: ClrPopoverEventsService, smartOpenService: ClrPopoverToggleService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private removeContent;
    /**
     * TODO(matt): investigate why DebugElement retains a reference to the nodes and causes a memory leak.
     * A note about the use of appendChild/removeChild
     * The DebugElement is keeping a reference to the detached node and its unclear why.
     * This does warrant further investigation. But, since it doesn't happen in production mode
     * it is a low priority issue for now.
     */
    private addContent;
    private hasPositionCoords;
    ngAfterContentChecked(): void;
}
