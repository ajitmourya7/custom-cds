import { ChangeDetectorRef } from '@angular/core';
import { OompaLoompa } from '../../utils/chocolate/oompa-loompa';
import { AccordionWillyWonka } from './accordion-willy-wonka';
import { IfExpandService } from '../../utils/conditional/if-expanded.service';
export declare class AccordionOompaLoompa extends OompaLoompa {
    private expand;
    constructor(cdr: ChangeDetectorRef, willyWonka: AccordionWillyWonka, ifExpandService: IfExpandService);
    readonly flavor: boolean;
}
