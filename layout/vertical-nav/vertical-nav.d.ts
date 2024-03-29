import { OnDestroy } from '@angular/core';
import { VerticalNavGroupRegistrationService } from './providers/vertical-nav-group-registration.service';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
import { VerticalNavService } from './providers/vertical-nav.service';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
export declare class ClrVerticalNav implements OnDestroy {
    private _navService;
    private _navIconService;
    private _navGroupRegistrationService;
    commonStrings: ClrCommonStringsService;
    collapsible: boolean;
    collapsed: boolean;
    private _collapsedChanged;
    readonly hasNavGroups: boolean;
    readonly hasIcons: boolean;
    private _sub;
    constructor(_navService: VerticalNavService, _navIconService: VerticalNavIconService, _navGroupRegistrationService: VerticalNavGroupRegistrationService, commonStrings: ClrCommonStringsService);
    toggleByButton(): void;
    ngOnDestroy(): void;
}
