/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { TreeNodeModel } from './tree-node.model';
/*
 * A declarative model is built by traversing the Angular component tree.
 * Declarative = Tree node components dictate the model
 */
var DeclarativeTreeNodeModel = /** @class */ (function (_super) {
    tslib_1.__extends(DeclarativeTreeNodeModel, _super);
    function DeclarativeTreeNodeModel(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        if (parent) {
            parent._addChild(_this);
        }
        _this.children = [];
        return _this;
    }
    DeclarativeTreeNodeModel.prototype._addChild = function (child) {
        this.children.push(child);
    };
    DeclarativeTreeNodeModel.prototype._removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    DeclarativeTreeNodeModel.prototype.destroy = function () {
        if (this.parent) {
            this.parent._removeChild(this);
        }
        _super.prototype.destroy.call(this);
    };
    return DeclarativeTreeNodeModel;
}(TreeNodeModel));
export { DeclarativeTreeNodeModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjbGFyYXRpdmUtdHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS90cmVlLXZpZXcvbW9kZWxzL2RlY2xhcmF0aXZlLXRyZWUtbm9kZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRDs7O0dBR0c7QUFDSDtJQUFpRCxvREFBZ0I7SUFDL0Qsa0NBQVksTUFBMEM7UUFBdEQsWUFDRSxpQkFBTyxTQU1SO1FBTEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0lBQ3JCLENBQUM7SUFNRCw0Q0FBUyxHQUFULFVBQVUsS0FBa0M7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELCtDQUFZLEdBQVosVUFBYSxLQUFrQztRQUM3QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCwwQ0FBTyxHQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7UUFDRCxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQUFDLEFBL0JELENBQWlELGFBQWEsR0ErQjdEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBUcmVlTm9kZU1vZGVsIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuXG4vKlxuICogQSBkZWNsYXJhdGl2ZSBtb2RlbCBpcyBidWlsdCBieSB0cmF2ZXJzaW5nIHRoZSBBbmd1bGFyIGNvbXBvbmVudCB0cmVlLlxuICogRGVjbGFyYXRpdmUgPSBUcmVlIG5vZGUgY29tcG9uZW50cyBkaWN0YXRlIHRoZSBtb2RlbFxuICovXG5leHBvcnQgY2xhc3MgRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsPFQ+IGV4dGVuZHMgVHJlZU5vZGVNb2RlbDxUPiB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Ll9hZGRDaGlsZCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGUgZm9yIGEgbW9yZSBwcmVjaXNlIHR5cGVcbiAgcGFyZW50OiBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4gfCBudWxsO1xuICBjaGlsZHJlbjogRGVjbGFyYXRpdmVUcmVlTm9kZU1vZGVsPFQ+W107XG5cbiAgX2FkZENoaWxkKGNoaWxkOiBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4pIHtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgX3JlbW92ZUNoaWxkKGNoaWxkOiBEZWNsYXJhdGl2ZVRyZWVOb2RlTW9kZWw8VD4pIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQuX3JlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH1cbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==