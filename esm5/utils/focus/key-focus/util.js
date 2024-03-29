/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
import { KeyCodes, IEKeyCodes } from './../key-codes.enum';
export function preventArrowKeyScroll(event) {
    var keyCodes = getKeyCodes(event);
    if (event.key === keyCodes.ArrowUp ||
        event.key === keyCodes.ArrowDown ||
        event.key === keyCodes.ArrowLeft ||
        event.key === keyCodes.ArrowRight) {
        // prevent element container scroll
        // MDN references this is really the only way to prevent native browser interactions
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
        event.preventDefault();
    }
}
export function getKeyCodes(event) {
    // IE does not properly follow the spec for `event.key` so we need to return a different enum for the key events
    // We use `event.key` for optimal browser support, to detect IE/Edge check if `event.code` is undefined
    var isIEKeyboardEvent = event.code === undefined;
    return isIEKeyboardEvent ? IEKeyCodes : KeyCodes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2tleS1mb2N1cy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7QUFFRixPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTNELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFvQjtJQUN4RCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEMsSUFDRSxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxPQUFPO1FBQzlCLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLFNBQVM7UUFDaEMsS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsU0FBUztRQUNoQyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxVQUFVLEVBQ2pDO1FBQ0EsbUNBQW1DO1FBQ25DLG9GQUFvRjtRQUNwRixtR0FBbUc7UUFDbkcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBb0I7SUFDOUMsZ0hBQWdIO0lBQ2hILHVHQUF1RztJQUN2RyxJQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQ25ELE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuKi9cblxuaW1wb3J0IHsgS2V5Q29kZXMsIElFS2V5Q29kZXMgfSBmcm9tICcuLy4uL2tleS1jb2Rlcy5lbnVtJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnRBcnJvd0tleVNjcm9sbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICBjb25zdCBrZXlDb2RlcyA9IGdldEtleUNvZGVzKGV2ZW50KTtcblxuICBpZiAoXG4gICAgZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd1VwIHx8XG4gICAgZXZlbnQua2V5ID09PSBrZXlDb2Rlcy5BcnJvd0Rvd24gfHxcbiAgICBldmVudC5rZXkgPT09IGtleUNvZGVzLkFycm93TGVmdCB8fFxuICAgIGV2ZW50LmtleSA9PT0ga2V5Q29kZXMuQXJyb3dSaWdodFxuICApIHtcbiAgICAvLyBwcmV2ZW50IGVsZW1lbnQgY29udGFpbmVyIHNjcm9sbFxuICAgIC8vIE1ETiByZWZlcmVuY2VzIHRoaXMgaXMgcmVhbGx5IHRoZSBvbmx5IHdheSB0byBwcmV2ZW50IG5hdGl2ZSBicm93c2VyIGludGVyYWN0aW9uc1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FjY2Vzc2liaWxpdHkvS2V5Ym9hcmQtbmF2aWdhYmxlX0phdmFTY3JpcHRfd2lkZ2V0c1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEtleUNvZGVzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gIC8vIElFIGRvZXMgbm90IHByb3Blcmx5IGZvbGxvdyB0aGUgc3BlYyBmb3IgYGV2ZW50LmtleWAgc28gd2UgbmVlZCB0byByZXR1cm4gYSBkaWZmZXJlbnQgZW51bSBmb3IgdGhlIGtleSBldmVudHNcbiAgLy8gV2UgdXNlIGBldmVudC5rZXlgIGZvciBvcHRpbWFsIGJyb3dzZXIgc3VwcG9ydCwgdG8gZGV0ZWN0IElFL0VkZ2UgY2hlY2sgaWYgYGV2ZW50LmNvZGVgIGlzIHVuZGVmaW5lZFxuICBjb25zdCBpc0lFS2V5Ym9hcmRFdmVudCA9IGV2ZW50LmNvZGUgPT09IHVuZGVmaW5lZDtcbiAgcmV0dXJuIGlzSUVLZXlib2FyZEV2ZW50ID8gSUVLZXlDb2RlcyA6IEtleUNvZGVzO1xufVxuIl19