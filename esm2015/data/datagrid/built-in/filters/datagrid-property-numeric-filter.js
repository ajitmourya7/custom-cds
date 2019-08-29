import { NestedProperty } from '../nested-property';
export class DatagridPropertyNumericFilter {
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    accepts(item, low, high) {
        const propValue = this.nestedProp.getPropValue(item);
        if (low !== null && propValue < low) {
            return false;
        }
        if (high !== null && propValue > high) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE1BQU0sT0FBTyw2QkFBNkI7SUFHeEMsWUFBbUIsSUFBWSxFQUFTLFFBQVEsS0FBSztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBTyxFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ25DLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksU0FBUyxHQUFHLElBQUksRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBDbHJEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL251bWVyaWMtZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOZXN0ZWRQcm9wZXJ0eSB9IGZyb20gJy4uL25lc3RlZC1wcm9wZXJ0eSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcjxUID0gYW55PiBpbXBsZW1lbnRzIENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZTxUPiB7XG4gIHByaXZhdGUgbmVzdGVkUHJvcDogTmVzdGVkUHJvcGVydHk8VD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHByb3A6IHN0cmluZywgcHVibGljIGV4YWN0ID0gZmFsc2UpIHtcbiAgICB0aGlzLm5lc3RlZFByb3AgPSBuZXcgTmVzdGVkUHJvcGVydHkocHJvcCk7XG4gIH1cblxuICBhY2NlcHRzKGl0ZW06IFQsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcm9wVmFsdWUgPSB0aGlzLm5lc3RlZFByb3AuZ2V0UHJvcFZhbHVlKGl0ZW0pO1xuICAgIGlmIChsb3cgIT09IG51bGwgJiYgcHJvcFZhbHVlIDwgbG93KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoaWdoICE9PSBudWxsICYmIHByb3BWYWx1ZSA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==