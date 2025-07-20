/**
 * This class supports with static methods all over the code.
 */
export class Helper {

    // #region attributes

    // #endregion attributes

    // #region methods

    /**
     * Formats number to german amount as string.
     * 
     * @param {number} numberToFormat number to format.
     * @returns formatted german amount as string.
     */
    static formatAmount(numberToFormat) {
        let fPrice = numberToFormat.toFixed(2);
        fPrice = fPrice.replace('.', ',');
        return fPrice + " €";
    }

    // #endregion methods
}