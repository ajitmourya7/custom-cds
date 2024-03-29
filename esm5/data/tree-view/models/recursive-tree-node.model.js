/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isObservable } from 'rxjs';
import { TreeNodeModel } from './tree-node.model';
import { isPromise } from './async-array';
/*
 * A recursive model is built received from the app and traversed to create the corresponding components.
 * Recursive = Model dictates the tree node components
 */
var RecursiveTreeNodeModel = /** @class */ (function (_super) {
    tslib_1.__extends(RecursiveTreeNodeModel, _super);
    function RecursiveTreeNodeModel(model, parent, getChildren, featuresService) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        _this.featuresService = featuresService;
        _this.childrenFetched = false;
        _this._children = [];
        _this.model = model;
        _this.parent = parent;
        return _this;
    }
    RecursiveTreeNodeModel.prototype.clearChildren = function () {
        this._children.forEach(function (child) { return child.destroy(); });
        delete this._children;
        this.childrenFetched = false;
    };
    RecursiveTreeNodeModel.prototype.fetchChildren = function () {
        var _this = this;
        if (this.childrenFetched) {
            return;
        }
        var asyncChildren = this.getChildren(this.model);
        if (isPromise(asyncChildren)) {
            this.loading = true;
            asyncChildren.then(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            });
        }
        else if (isObservable(asyncChildren)) {
            this.loading = true;
            this.subscription = asyncChildren.subscribe(function (raw) {
                _this._children = _this.wrapChildren(raw);
                _this.loading = false;
            });
        }
        else if (asyncChildren) {
            // Synchronous case
            this._children = this.wrapChildren(asyncChildren);
        }
        else {
            this._children = [];
        }
        this.childrenFetched = true;
        if (this.featuresService) {
            this.featuresService.childrenFetched.next();
        }
    };
    RecursiveTreeNodeModel.prototype.wrapChildren = function (rawModels) {
        var _this = this;
        return rawModels.map(function (m) { return new RecursiveTreeNodeModel(m, _this, _this.getChildren, _this.featuresService); });
    };
    Object.defineProperty(RecursiveTreeNodeModel.prototype, "children", {
        get: function () {
            this.fetchChildren();
            return this._children;
        },
        set: function (value) {
            this._children = value;
        },
        enumerable: true,
        configurable: true
    });
    RecursiveTreeNodeModel.prototype.destroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.destroy.call(this);
    };
    return RecursiveTreeNodeModel;
}(TreeNodeModel));
export { RecursiveTreeNodeModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzaXZlLXRyZWUtbm9kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvdHJlZS12aWV3L21vZGVscy9yZWN1cnNpdmUtdHJlZS1ub2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEQ7OztHQUdHO0FBQ0g7SUFBK0Msa0RBQWdCO0lBQzdELGdDQUNFLEtBQVEsRUFDUixNQUF3QyxFQUNoQyxXQUFtRCxFQUNuRCxlQUFtRDtRQUo3RCxZQU1FLGlCQUFPLFNBR1I7UUFOUyxpQkFBVyxHQUFYLFdBQVcsQ0FBd0M7UUFDbkQscUJBQWUsR0FBZixlQUFlLENBQW9DO1FBU3JELHFCQUFlLEdBQUcsS0FBSyxDQUFDO1FBMEN4QixlQUFTLEdBQWdDLEVBQUUsQ0FBQztRQWhEbEQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7SUFNRCw4Q0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRCw4Q0FBYSxHQUFiO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFFRCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQkFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDN0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxhQUFhLEVBQUU7WUFDeEIsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRU8sNkNBQVksR0FBcEIsVUFBcUIsU0FBYztRQUFuQyxpQkFFQztRQURDLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsRUFBM0UsQ0FBMkUsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFHRCxzQkFBSSw0Q0FBUTthQUFaO1lBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO2FBQ0QsVUFBYSxLQUFrQztZQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQU9ELHdDQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUNELGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUF6RUQsQ0FBK0MsYUFBYSxHQXlFM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFRyZWVOb2RlTW9kZWwgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBBc3luY0FycmF5LCBpc1Byb21pc2UgfSBmcm9tICcuL2FzeW5jLWFycmF5JztcbmltcG9ydCB7IFRyZWVGZWF0dXJlc1NlcnZpY2UgfSBmcm9tICcuLi90cmVlLWZlYXR1cmVzLnNlcnZpY2UnO1xuXG4vKlxuICogQSByZWN1cnNpdmUgbW9kZWwgaXMgYnVpbHQgcmVjZWl2ZWQgZnJvbSB0aGUgYXBwIGFuZCB0cmF2ZXJzZWQgdG8gY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNvbXBvbmVudHMuXG4gKiBSZWN1cnNpdmUgPSBNb2RlbCBkaWN0YXRlcyB0aGUgdHJlZSBub2RlIGNvbXBvbmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD4gZXh0ZW5kcyBUcmVlTm9kZU1vZGVsPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgbW9kZWw6IFQsXG4gICAgcGFyZW50OiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+IHwgbnVsbCxcbiAgICBwcml2YXRlIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gQXN5bmNBcnJheTxUPiB8IHVuZGVmaW5lZCxcbiAgICBwcml2YXRlIGZlYXR1cmVzU2VydmljZTogVHJlZUZlYXR1cmVzU2VydmljZTxUPiB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIHBhcmVudDogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPiB8IG51bGw7XG5cbiAgcHJpdmF0ZSBjaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcblxuICBjbGVhckNoaWxkcmVuKCkge1xuICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKTtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRyZW47XG4gICAgdGhpcy5jaGlsZHJlbkZldGNoZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZldGNoQ2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5GZXRjaGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXN5bmNDaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4odGhpcy5tb2RlbCk7XG4gICAgaWYgKGlzUHJvbWlzZShhc3luY0NoaWxkcmVuKSkge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGFzeW5jQ2hpbGRyZW4udGhlbihyYXcgPT4ge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IHRoaXMud3JhcENoaWxkcmVuKHJhdyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoYXN5bmNDaGlsZHJlbikpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IGFzeW5jQ2hpbGRyZW4uc3Vic2NyaWJlKHJhdyA9PiB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4ocmF3KTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jQ2hpbGRyZW4pIHtcbiAgICAgIC8vIFN5bmNocm9ub3VzIGNhc2VcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gdGhpcy53cmFwQ2hpbGRyZW4oYXN5bmNDaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW5GZXRjaGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5mZWF0dXJlc1NlcnZpY2UpIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNTZXJ2aWNlLmNoaWxkcmVuRmV0Y2hlZC5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3cmFwQ2hpbGRyZW4ocmF3TW9kZWxzOiBUW10pIHtcbiAgICByZXR1cm4gcmF3TW9kZWxzLm1hcChtID0+IG5ldyBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsKG0sIHRoaXMsIHRoaXMuZ2V0Q2hpbGRyZW4sIHRoaXMuZmVhdHVyZXNTZXJ2aWNlKSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGlsZHJlbjogUmVjdXJzaXZlVHJlZU5vZGVNb2RlbDxUPltdID0gW107XG4gIGdldCBjaGlsZHJlbigpOiBSZWN1cnNpdmVUcmVlTm9kZU1vZGVsPFQ+W10ge1xuICAgIHRoaXMuZmV0Y2hDaGlsZHJlbigpO1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuICBzZXQgY2hpbGRyZW4odmFsdWU6IFJlY3Vyc2l2ZVRyZWVOb2RlTW9kZWw8VD5bXSkge1xuICAgIHRoaXMuX2NoaWxkcmVuID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==