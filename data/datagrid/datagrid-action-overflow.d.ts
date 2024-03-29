import { EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { RowActionService } from './providers/row-action-service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { ClrPopoverPosition } from '../../utils/popover/interfaces/popover-position.interface';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
export declare class ClrDatagridActionOverflow implements OnDestroy {
    private rowActionService;
    commonStrings: ClrCommonStringsService;
    private platformId;
    private zone;
    private smartToggleService;
    popoverId: string;
    private subscriptions;
    smartPosition: ClrPopoverPosition;
    constructor(rowActionService: RowActionService, commonStrings: ClrCommonStringsService, platformId: Object, zone: NgZone, smartToggleService: ClrPopoverToggleService, popoverId: string);
    ngOnDestroy(): void;
    open: boolean;
    private focusFirstButton;
    openChange: EventEmitter<boolean>;
}
