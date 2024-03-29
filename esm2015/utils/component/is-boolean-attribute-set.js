/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
export function isBooleanAttributeSet(value) {
    // for null just return false no need to check anything
    if (value === null) {
        return false;
    }
    if (typeof value === 'string') {
        // Empty string is valid, 'true' as string is also valid
        return value.length >= 0;
    }
    // Boolean value will be read as it is, everything else is false
    return typeof value === 'boolean' ? value : false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYm9vbGVhbi1hdHRyaWJ1dGUtc2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29tcG9uZW50L2lzLWJvb2xlYW4tYXR0cmlidXRlLXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQXVCO0lBQzNELHVEQUF1RDtJQUN2RCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLHdEQUF3RDtRQUN4RCxPQUFPLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsZ0VBQWdFO0lBQ2hFLE9BQU8sT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuQXR0cmlidXRlU2V0KHZhbHVlOiBzdHJpbmcgfCBib29sZWFuKTogYm9vbGVhbiB7XG4gIC8vIGZvciBudWxsIGp1c3QgcmV0dXJuIGZhbHNlIG5vIG5lZWQgdG8gY2hlY2sgYW55dGhpbmdcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIGlzIHZhbGlkLCAndHJ1ZScgYXMgc3RyaW5nIGlzIGFsc28gdmFsaWRcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID49IDA7XG4gIH1cbiAgLy8gQm9vbGVhbiB2YWx1ZSB3aWxsIGJlIHJlYWQgYXMgaXQgaXMsIGV2ZXJ5dGhpbmcgZWxzZSBpcyBmYWxzZVxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB2YWx1ZSA6IGZhbHNlO1xufVxuIl19