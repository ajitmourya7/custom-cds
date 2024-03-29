import { ElementRef, Injector } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { ClrCommonStringsService } from '../../utils/i18n/common-strings.service';
import { SignpostIdService } from './providers/signpost-id.service';
export declare class ClrSignpostContent extends AbstractPopover {
    signpostContentId: string;
    private signpostIdService;
    constructor(injector: Injector, parentHost: ElementRef, commonStrings: ClrCommonStringsService, signpostContentId: string, signpostIdService: SignpostIdService);
    commonStrings: ClrCommonStringsService;
    /**********
     *
     * @description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     */
    close(): void;
    private _position;
    /*********
    *
    * @description
    * A setter for the position of the ClrSignpostContent popover. This is a combination of the following:
    * - anchorPoint - where on the trigger to anchor the ClrSignpostContent
    * - popoverPoint - where on the ClrSignpostContent container to align with the anchorPoint
    * - offsetY - where on the Y axis to align the ClrSignpostContent so it meets specs
    * - offsetX - where on the X axis to align the ClrSignpostContent so it meets specs
    * There are 12 possible positions to place a ClrSignpostContent container:
    * - top-left
    * - top-middle
    * - top-right
    * - right-top
    * - right-middle
    * - right-bottom
    * - bottom-right
    * - bottom-middle
    * - bottom-left
    * - left-bottom
    * - left-middle
    * - left-top
    *
    * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
    * meaning the top of the trigger icon (above the icon that hides/shows) the ClrSignpostContent. And, SIDE_POSITION
    * is 'left' meaning two things: 1) the ClrSignpostContent container extends to the left and 2) the 'arrow/pointer'
    * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
    *
    * @param newPosition
    */
    position: string;
}
