/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// TODO: I'd like this to be a CheckedState enum for the checkboxes in the future.
export var ClrSelectedState;
(function (ClrSelectedState) {
    // WARNING! Unselected has the value 0,
    // so it's actually the only one that will evaluate to false if cast to a boolean.
    // Don't mess with the order!
    ClrSelectedState[ClrSelectedState["UNSELECTED"] = 0] = "UNSELECTED";
    ClrSelectedState[ClrSelectedState["SELECTED"] = 1] = "SELECTED";
    ClrSelectedState[ClrSelectedState["INDETERMINATE"] = 2] = "INDETERMINATE";
})(ClrSelectedState || (ClrSelectedState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWQtc3RhdGUuZW51bS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9zZWxlY3RlZC1zdGF0ZS5lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxrRkFBa0Y7QUFDbEYsTUFBTSxDQUFOLElBQVksZ0JBT1g7QUFQRCxXQUFZLGdCQUFnQjtJQUMxQix1Q0FBdUM7SUFDdkMsa0ZBQWtGO0lBQ2xGLDZCQUE2QjtJQUM3QixtRUFBYyxDQUFBO0lBQ2QsK0RBQVEsQ0FBQTtJQUNSLHlFQUFhLENBQUE7QUFDZixDQUFDLEVBUFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQU8zQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuLy8gVE9ETzogSSdkIGxpa2UgdGhpcyB0byBiZSBhIENoZWNrZWRTdGF0ZSBlbnVtIGZvciB0aGUgY2hlY2tib3hlcyBpbiB0aGUgZnV0dXJlLlxuZXhwb3J0IGVudW0gQ2xyU2VsZWN0ZWRTdGF0ZSB7XG4gIC8vIFdBUk5JTkchIFVuc2VsZWN0ZWQgaGFzIHRoZSB2YWx1ZSAwLFxuICAvLyBzbyBpdCdzIGFjdHVhbGx5IHRoZSBvbmx5IG9uZSB0aGF0IHdpbGwgZXZhbHVhdGUgdG8gZmFsc2UgaWYgY2FzdCB0byBhIGJvb2xlYW4uXG4gIC8vIERvbid0IG1lc3Mgd2l0aCB0aGUgb3JkZXIhXG4gIFVOU0VMRUNURUQgPSAwLFxuICBTRUxFQ1RFRCxcbiAgSU5ERVRFUk1JTkFURSxcbn1cbiJdfQ==