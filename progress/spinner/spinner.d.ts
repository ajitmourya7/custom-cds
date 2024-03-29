export declare class ClrSpinner {
    /**
     * Default class for all spinners. This class is always true
     */
    readonly spinnerClass: boolean;
    private _inline;
    readonly inlineClass: boolean;
    clrInline: boolean | string;
    private _inverse;
    readonly inverseClass: boolean;
    clrInverse: boolean | string;
    /**
     * By default all spinners are Large. (spinner-lg)
     * To change the size you need to use set clrSmall or clrMedium to TRUE/
     */
    /**
     * Small
     */
    private _small;
    readonly smallClass: boolean;
    clrSmall: boolean | string;
    /**
     * When clrSmall & clrMedium are set both to true.
     * The CSS with high priority will be small - so medium size will be ignored.
     *
     * For this reason if clrSmall is set we won't add clrMedium class.
     *
     * NOTE: This is dictated by the CSS rules.
     * DON'T USE clrSmall & clrMedium to toggle classes. This could change without notice.
     *
     * Also there is no logical need to have both of them set to TRUE or FALSE.
     */
    private _medium;
    readonly mediumClass: boolean;
    clrMedium: boolean | string;
    /**
     * By default aria-live will be set to `polite` .
     * To change is it you need to set clrAssertive or clrOff to TRUE
     *
     * There is priority:
     *   Default: polite
     *   Asertive
     *   Off
     *
     * In case when for some reason you have clrAssertive=TRUE and clrOff=TRUE,
     * we gonna set `assertive` as value of aria-live.
     *
     */
    assertive: boolean;
    off: boolean;
    readonly setAriaLive: "assertive" | "off" | "polite";
}
