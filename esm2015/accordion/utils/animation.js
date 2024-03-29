/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { defaultAnimationTiming } from '../../utils/animations/constants';
export const panelAnimation = [
    trigger('skipInitialRender', [transition(':enter', [])]),
    trigger('toggle', [
        transition('void => *', [
            style({ display: 'block', height: 0 }),
            animate(defaultAnimationTiming, style({ height: '*' })),
        ]),
    ]),
];
export const stepAnimation = [
    trigger('skipInitialRender', [transition(':enter', [])]),
    trigger('toggle', [
        transition('void => *', [
            style({ display: 'block', height: 0 }),
            animate(defaultAnimationTiming, style({ height: '*' })),
        ]),
        transition('* => void', [
            style({ display: 'block' }),
            animate(defaultAnimationTiming, style({ height: 0, display: 'none' })),
        ]),
    ]),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiYWNjb3JkaW9uL3V0aWxzL2FuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTFFLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QixPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNoQixVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN4RCxDQUFDO0tBQ0gsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDM0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDaEIsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDeEQsQ0FBQztRQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFLENBQUM7S0FDSCxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgZGVmYXVsdEFuaW1hdGlvblRpbWluZyB9IGZyb20gJy4uLy4uL3V0aWxzL2FuaW1hdGlvbnMvY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHBhbmVsQW5pbWF0aW9uID0gW1xuICB0cmlnZ2VyKCdza2lwSW5pdGlhbFJlbmRlcicsIFt0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXSldKSxcbiAgdHJpZ2dlcigndG9nZ2xlJywgW1xuICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcbiAgICAgIHN0eWxlKHsgZGlzcGxheTogJ2Jsb2NrJywgaGVpZ2h0OiAwIH0pLFxuICAgICAgYW5pbWF0ZShkZWZhdWx0QW5pbWF0aW9uVGltaW5nLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICBdKSxcbiAgXSksXG5dO1xuXG5leHBvcnQgY29uc3Qgc3RlcEFuaW1hdGlvbiA9IFtcbiAgdHJpZ2dlcignc2tpcEluaXRpYWxSZW5kZXInLCBbdHJhbnNpdGlvbignOmVudGVyJywgW10pXSksXG4gIHRyaWdnZXIoJ3RvZ2dsZScsIFtcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICBzdHlsZSh7IGRpc3BsYXk6ICdibG9jaycsIGhlaWdodDogMCB9KSxcbiAgICAgIGFuaW1hdGUoZGVmYXVsdEFuaW1hdGlvblRpbWluZywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgXSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pLFxuICAgICAgYW5pbWF0ZShkZWZhdWx0QW5pbWF0aW9uVGltaW5nLCBzdHlsZSh7IGhlaWdodDogMCwgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICBdKSxcbiAgXSksXG5dO1xuIl19