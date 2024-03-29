/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { animate, style, transition } from '@angular/animations';
import { defaultAnimationTiming } from './../constants';
export function slide(direction) {
    let transform = null;
    if (direction === 'up') {
        transform = 'translate(0, 25%)';
    }
    else if (direction === 'down') {
        transform = 'translate(0, -25%)';
    }
    else if (direction === 'left') {
        transform = 'translate(25%, 0)';
    }
    else if (direction === 'right') {
        transform = 'translate(-25%, 0)';
    }
    else {
        throw new Error('Unknown direction ' + direction + ' for slide animation.');
    }
    return [
        transition('void => *', [style({ transform: transform }), animate(defaultAnimationTiming)]),
        transition('* => void', [animate(defaultAnimationTiming, style({ transform: transform }))]),
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9hbmltYXRpb25zL3NsaWRlL3NsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFxQixLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsTUFBTSxVQUFVLEtBQUssQ0FBQyxTQUFpQjtJQUNyQyxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUM7SUFDN0IsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1FBQ3RCLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztLQUNqQztTQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtRQUMvQixTQUFTLEdBQUcsb0JBQW9CLENBQUM7S0FDbEM7U0FBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7UUFDL0IsU0FBUyxHQUFHLG1CQUFtQixDQUFDO0tBQ2pDO1NBQU0sSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO1FBQ2hDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztLQUNsQztTQUFNO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsdUJBQXVCLENBQUMsQ0FBQztLQUM3RTtJQUNELE9BQU87UUFDTCxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUMzRixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbk1ldGFkYXRhLCBzdHlsZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBkZWZhdWx0QW5pbWF0aW9uVGltaW5nIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2xpZGUoZGlyZWN0aW9uOiBzdHJpbmcpOiBBbmltYXRpb25NZXRhZGF0YVtdIHtcbiAgbGV0IHRyYW5zZm9ybTogc3RyaW5nID0gbnVsbDtcbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwgMjUlKSc7XG4gIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcbiAgICB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsIC0yNSUpJztcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMjUlLCAwKSc7XG4gIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgtMjUlLCAwKSc7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRpcmVjdGlvbiAnICsgZGlyZWN0aW9uICsgJyBmb3Igc2xpZGUgYW5pbWF0aW9uLicpO1xuICB9XG4gIHJldHVybiBbXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW3N0eWxlKHsgdHJhbnNmb3JtOiB0cmFuc2Zvcm0gfSksIGFuaW1hdGUoZGVmYXVsdEFuaW1hdGlvblRpbWluZyldKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbYW5pbWF0ZShkZWZhdWx0QW5pbWF0aW9uVGltaW5nLCBzdHlsZSh7IHRyYW5zZm9ybTogdHJhbnNmb3JtIH0pKV0pLFxuICBdO1xufVxuIl19