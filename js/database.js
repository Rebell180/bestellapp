/**
 * A Database class to manage the communication to the local storage
 */
export class Database {

    // #region attributes
    // #endregion attributes


    // #region methods

    static saveCartToLS(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));

    }



    // #endregion methods
}