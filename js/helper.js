/**
 * This class supports with static methods all over the code.
 */
export class Helper {

    // #region attributes

    // #endregion attributes

    // #region methods

    /**
     * Formats a number to a german amount as string.
     * 
     * @param {number} numberToFormat 
     * @returns a formatted german amount as string.
     */
    static formatAmount(numberToFormat) {
        let fPrice = numberToFormat.toFixed(2);
        fPrice = fPrice.replace('.', ',');
        return fPrice + " €";
    }

    // #endregion methods
}