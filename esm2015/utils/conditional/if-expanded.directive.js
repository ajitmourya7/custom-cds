import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef, } from '@angular/core';
import { IfExpandService } from './if-expanded.service';
let ClrIfExpanded = class ClrIfExpanded {
    constructor(template, container, el, renderer, expand) {
        this.template = template;
        this.container = container;
        this.el = el;
        this.renderer = renderer;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(() => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        }));
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        if (typeof value === 'boolean') {
            this.expand.expanded = value;
            this._expanded = value;
        }
    }
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.template) {
            if (this.expand.expanded) {
                // Should we pass a context? I don't see anything useful to pass right now,
                // but we can come back to it in the future as a solution for additional features.
                this.container.createEmbeddedView(this.template);
            }
            else {
                // TODO: Move when we move the animation logic to Datagrid Row Expand
                // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
                // process for very little gain. Once Angular animations are dynamic enough, we should be able to
                // get the optimal behavior.
                this.container.clear();
            }
        }
        else {
            try {
                // If we don't have a template ref, we fallback to a crude display: none for now.
                if (this.expand.expanded) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', null);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
            }
            catch (e) {
                // We catch the case where clrIfExpanded was put on a non-DOM element, and we just do nothing
            }
        }
    }
    ngOnInit() {
        this.updateView();
    }
    ngOnDestroy() {
        this.expand.expandable--;
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
};
tslib_1.__decorate([
    Input('clrIfExpanded'),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ClrIfExpanded.prototype, "expanded", null);
tslib_1.__decorate([
    Output('clrIfExpandedChange'),
    tslib_1.__metadata("design:type", EventEmitter)
], ClrIfExpanded.prototype, "expandedChange", void 0);
ClrIfExpanded = tslib_1.__decorate([
    Directive({ selector: '[clrIfExpanded]' }),
    tslib_1.__param(0, Optional()),
    tslib_1.__metadata("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        ElementRef,
        Renderer2,
        IfExpandService])
], ClrIfExpanded);
export { ClrIfExpanded };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtZXhwYW5kZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsidXRpbHMvY29uZGl0aW9uYWwvaWYtZXhwYW5kZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd4RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBaUJ4QixZQUNzQixRQUEwQixFQUN0QyxTQUEyQixFQUMzQixFQUFjLEVBQ2QsUUFBbUIsRUFDbkIsTUFBdUI7UUFKWCxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUN0QyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQXJCekIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWNKLG1CQUFjLEdBQTBCLElBQUksWUFBWSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBa0J2Rzs7V0FFRztRQUNLLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQVoxQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQTVCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUdELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQXlCTyxVQUFVO1FBQ2hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZELE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN4QiwyRUFBMkU7Z0JBQzNFLGtGQUFrRjtnQkFDbEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wscUVBQXFFO2dCQUNyRSxrR0FBa0c7Z0JBQ2xHLGlHQUFpRztnQkFDakcsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1NBQ0Y7YUFBTTtZQUNMLElBQUk7Z0JBQ0YsaUZBQWlGO2dCQUNqRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDbEU7YUFDRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLDZGQUE2RjthQUM5RjtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBaUIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGLENBQUE7QUFwRUM7SUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDOzs7NkNBTXRCO0FBRThCO0lBQTlCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztzQ0FBaUIsWUFBWTtxREFBNEM7QUFmNUYsYUFBYTtJQUR6QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQW1CdEMsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBQW1CLFdBQVc7UUFDdEIsZ0JBQWdCO1FBQ3ZCLFVBQVU7UUFDSixTQUFTO1FBQ1gsZUFBZTtHQXRCdEIsYUFBYSxDQTRFekI7U0E1RVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElmRXhwYW5kU2VydmljZSB9IGZyb20gJy4vaWYtZXhwYW5kZWQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjbHJJZkV4cGFuZGVkXScgfSlcbmV4cG9ydCBjbGFzcyBDbHJJZkV4cGFuZGVkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9leHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoJ2NscklmRXhwYW5kZWQnKVxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kLmV4cGFuZGVkID0gdmFsdWU7XG4gICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ2NscklmRXhwYW5kZWRDaGFuZ2UnKSBleHBhbmRlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPih0cnVlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZXhwYW5kOiBJZkV4cGFuZFNlcnZpY2VcbiAgKSB7XG4gICAgZXhwYW5kLmV4cGFuZGFibGUrKztcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICBleHBhbmQuZXhwYW5kQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmQuZXhwYW5kZWQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlcyBhbmQgcXVlcmllcyBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgdXBkYXRlVmlldygpIHtcbiAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQgJiYgdGhpcy5jb250YWluZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRlbXBsYXRlKSB7XG4gICAgICBpZiAodGhpcy5leHBhbmQuZXhwYW5kZWQpIHtcbiAgICAgICAgLy8gU2hvdWxkIHdlIHBhc3MgYSBjb250ZXh0PyBJIGRvbid0IHNlZSBhbnl0aGluZyB1c2VmdWwgdG8gcGFzcyByaWdodCBub3csXG4gICAgICAgIC8vIGJ1dCB3ZSBjYW4gY29tZSBiYWNrIHRvIGl0IGluIHRoZSBmdXR1cmUgYXMgYSBzb2x1dGlvbiBmb3IgYWRkaXRpb25hbCBmZWF0dXJlcy5cbiAgICAgICAgdGhpcy5jb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogTW92ZSB3aGVuIHdlIG1vdmUgdGhlIGFuaW1hdGlvbiBsb2dpYyB0byBEYXRhZ3JpZCBSb3cgRXhwYW5kXG4gICAgICAgIC8vIFdlIGNsZWFyIGJlZm9yZSB0aGUgYW5pbWF0aW9uIGlzIG92ZXIuIE5vdCBpZGVhbCwgYnV0IGRvaW5nIGJldHRlciB3b3VsZCBpbnZvbHZlIGEgbXVjaCBoZWF2aWVyXG4gICAgICAgIC8vIHByb2Nlc3MgZm9yIHZlcnkgbGl0dGxlIGdhaW4uIE9uY2UgQW5ndWxhciBhbmltYXRpb25zIGFyZSBkeW5hbWljIGVub3VnaCwgd2Ugc2hvdWxkIGJlIGFibGUgdG9cbiAgICAgICAgLy8gZ2V0IHRoZSBvcHRpbWFsIGJlaGF2aW9yLlxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGVhcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgdGVtcGxhdGUgcmVmLCB3ZSBmYWxsYmFjayB0byBhIGNydWRlIGRpc3BsYXk6IG5vbmUgZm9yIG5vdy5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kLmV4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgbnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBXZSBjYXRjaCB0aGUgY2FzZSB3aGVyZSBjbHJJZkV4cGFuZGVkIHdhcyBwdXQgb24gYSBub24tRE9NIGVsZW1lbnQsIGFuZCB3ZSBqdXN0IGRvIG5vdGhpbmdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXhwYW5kLmV4cGFuZGFibGUtLTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gIH1cbn1cbiJdfQ==