import { CartItem } from "./cartItem";
import { Meal } from "./meal";

/**
 * 
 */
export class Cart {

// #region attributes

static cartitems = [];

subtotal;
deliveryPrice = 4.99; 
total;



// #endregion attributes


constructor() {


}

// #region methods

/**
 * Formatting the price to german default format.
 * 
 * @returns the formatted price as string.
 */
formatPrice() {

    let fPrice = this.price.toFixed(2);
    fPrice = fPrice.replace('.', ',');
    return fPrice + " €";

}

/**
 * 
 * @param {CartItem} meal 
 */
addItem(meal) {

    Cart.cartitems.push(new CartItem({
        pName: meal.mealName,
        pPrice: meal.mealPrice
    }))

    
    // new CartItem(meal);
    // Cart.cartitems.push(cartItem);
    // TODO update summary
    // TODO redner Cart
}

updateMeal(id) {

}

deleteCartItem(id) {

}



// #endregion methods



}