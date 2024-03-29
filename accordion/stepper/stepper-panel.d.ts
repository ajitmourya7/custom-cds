import { OnInit, ElementRef } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { StepperService } from './providers/stepper.service';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
import { ClrAccordionPanel } from '../accordion-panel';
export declare class ClrStepperPanel extends ClrAccordionPanel implements OnInit {
    private platformId;
    commonStrings: ClrCommonStringsService;
    private formGroupName;
    private ngModelGroup;
    private stepperService;
    isAccordion: boolean;
    headerButton: ElementRef;
    private subscriptions;
    readonly formGroup: import("@angular/forms").FormGroup;
    id: string;
    constructor(platformId: Object, commonStrings: ClrCommonStringsService, formGroupName: FormGroupName, ngModelGroup: NgModelGroup, stepperService: StepperService, ifExpandService: IfExpandService, id: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private listenToFocusChanges;
    private triggerAllFormControlValidationIfError;
}
