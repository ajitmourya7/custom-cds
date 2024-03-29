/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Links a set of focusable items to a parent along one direction
 */
export function linkParent(items, parent, direction) {
    items.forEach(function (item) { return (item[direction] = parent); });
}
/**
 * Double-links a set of focusable items vertically, possibly looping
 */
export function linkVertical(items, loop) {
    if (loop === void 0) { loop = true; }
    items.forEach(function (item, index) {
        if (index > 0) {
            item.up = items[index - 1];
        }
        if (index < items.length - 1) {
            item.down = items[index + 1];
        }
    });
    if (loop && items.length > 1) {
        items[0].up = items[items.length - 1];
        items[items.length - 1].down = items[0];
    }
}
// Right now I only need the two linkers above, but we can easily add more linkers. A couple examples:
// export function linkHorizontal(items: FocusableItem[], loop = true);
// export function linkTable(items: FocusableItem[][]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2xpbmtlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQU1IOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FDeEIsS0FBc0IsRUFDdEIsTUFBaUQsRUFDakQsU0FBNEI7SUFFNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFzQixFQUFFLElBQVc7SUFBWCxxQkFBQSxFQUFBLFdBQVc7SUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1FBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDNUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0FBQ0gsQ0FBQztBQUVELHNHQUFzRztBQUN0Ryx1RUFBdUU7QUFDdkUsdURBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcnJvd0tleURpcmVjdGlvbiB9IGZyb20gJy4uL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbSc7XG5cbi8qKlxuICogTGlua3MgYSBzZXQgb2YgZm9jdXNhYmxlIGl0ZW1zIHRvIGEgcGFyZW50IGFsb25nIG9uZSBkaXJlY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmtQYXJlbnQoXG4gIGl0ZW1zOiBGb2N1c2FibGVJdGVtW10sXG4gIHBhcmVudDogRm9jdXNhYmxlSXRlbSB8IE9ic2VydmFibGU8Rm9jdXNhYmxlSXRlbT4sXG4gIGRpcmVjdGlvbjogQXJyb3dLZXlEaXJlY3Rpb25cbikge1xuICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW1bZGlyZWN0aW9uXSA9IHBhcmVudCkpO1xufVxuXG4vKipcbiAqIERvdWJsZS1saW5rcyBhIHNldCBvZiBmb2N1c2FibGUgaXRlbXMgdmVydGljYWxseSwgcG9zc2libHkgbG9vcGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGlua1ZlcnRpY2FsKGl0ZW1zOiBGb2N1c2FibGVJdGVtW10sIGxvb3AgPSB0cnVlKSB7XG4gIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgaXRlbS51cCA9IGl0ZW1zW2luZGV4IC0gMV07XG4gICAgfVxuICAgIGlmIChpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgIGl0ZW0uZG93biA9IGl0ZW1zW2luZGV4ICsgMV07XG4gICAgfVxuICB9KTtcbiAgaWYgKGxvb3AgJiYgaXRlbXMubGVuZ3RoID4gMSkge1xuICAgIGl0ZW1zWzBdLnVwID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV0uZG93biA9IGl0ZW1zWzBdO1xuICB9XG59XG5cbi8vIFJpZ2h0IG5vdyBJIG9ubHkgbmVlZCB0aGUgdHdvIGxpbmtlcnMgYWJvdmUsIGJ1dCB3ZSBjYW4gZWFzaWx5IGFkZCBtb3JlIGxpbmtlcnMuIEEgY291cGxlIGV4YW1wbGVzOlxuLy8gZXhwb3J0IGZ1bmN0aW9uIGxpbmtIb3Jpem9udGFsKGl0ZW1zOiBGb2N1c2FibGVJdGVtW10sIGxvb3AgPSB0cnVlKTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBsaW5rVGFibGUoaXRlbXM6IEZvY3VzYWJsZUl0ZW1bXVtdKTtcbiJdfQ==