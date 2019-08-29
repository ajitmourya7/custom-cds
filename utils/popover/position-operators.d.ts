import { ClrPopoverPosition } from './interfaces/popover-position.interface';
import { ClrPopoverContentOffset } from './interfaces/popover-content-offset.interface';
import { ClrViewportViolation } from './enums/viewport-violation.enum';
export declare type ClrTransform = (position: ClrPopoverPosition, back?: boolean) => ClrPopoverPosition;
export declare const flipSides: ClrTransform;
export declare const flipAxis: ClrTransform;
export declare const nudgeContent: ClrTransform;
export declare function flipSidesAndNudgeContent(flip: ClrTransform, nudge: ClrTransform, nudgeBack?: boolean): ClrTransform;
export declare function align(position: ClrPopoverPosition, anchor: ClientRect, content: ClientRect): ClrPopoverContentOffset;
export declare function testVisibility(offset: ClrPopoverContentOffset, content: ClientRect): ClrViewportViolation[];