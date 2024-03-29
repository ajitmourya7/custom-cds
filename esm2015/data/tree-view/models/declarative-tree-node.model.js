/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { TreeNodeModel } from './tree-node.model';
/*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
export class DeclarativeTreeNodeModel extends TreeNodeModel {
    constructor(parent) {
        super();
        this.parent = parent;
        if (parent) {
            parent._addChild(this);
        }
        this.children = [];
    }
    _addChild(child) {
        this.children.push(child);
    }
    _removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    destroy() {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        super.destroy();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjbGFyYXRpdmUtdHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvbW9kZWxzL2RlY2xhcmF0aXZlLXRyZWUtbm9kZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxEOzs7R0FHRztBQUNILE1BQU0sT0FBTyx3QkFBNEIsU0FBUSxhQUFnQjtJQUMvRCxZQUFZLE1BQTBDO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQU1ELFNBQVMsQ0FBQyxLQUFrQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWtDO1FBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5cbi8qXG4gKiBBIGRlY2xhcmF0aXZlIG1vZGVsIGlzIGJ1aWx0IGJ5IHRyYXZlcnNpbmcgdGhlIEFuZ3VsYXIgY29tcG9uZW50IHRyZWUuXG4gKiBEZWNsYXJhdGl2ZSA9IFRyZWUgbm9kZSBjb21wb25lbnRzIGRpY3RhdGUgdGhlIG1vZGVsXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4gZXh0ZW5kcyBUcmVlTm9kZU1vZGVsPFQ+IHtcbiAgY29uc3RydWN0b3IocGFyZW50OiBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuX2FkZENoaWxkKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gIH1cblxuICAvLyBPdmVycmlkZSBmb3IgYSBtb3JlIHByZWNpc2UgdHlwZVxuICBwYXJlbnQ6IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGw7XG4gIGNoaWxkcmVuOiBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD5bXTtcblxuICBfYWRkQ2hpbGQoY2hpbGQ6IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbDxUPikge1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gIH1cblxuICBfcmVtb3ZlQ2hpbGQoY2hpbGQ6IERlY2xhcmF0aXZlVHJlZU5vZGVNb2RlbDxUPikge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5fcmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19