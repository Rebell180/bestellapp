import { Helper } from "./helper.js";

/**
 * A Single Meal to add to a cart or present it in a menu.
 */
export class Meal {

// #region attributes
static mealCount = 0;

mealId;
cartId;
cartIndex;
mealIndex;

name;
descr;
price;
imgSrc;
category;

formattedPrice;

isInCart = false;
cartCount = 0;
inCartTotal = 0;

// #endregion attributes


constructor({pName, pDescr, pPrice, pImgSrc, pCategory = 'burger'}={}) {

    this.mealId = 'menu-' + Meal.mealCount;
    this.cartId = 'cart-' + Meal.mealCount;
    this.mealIndex = Meal.mealCount;
    
    this.name = pName;
    this.descr = pDescr;
    this.price = pPrice;
    this.category = pCategory;
    this.imgSrc = pImgSrc;
    this.formattedPrice = Helper.formatAmount(this.price);

    Meal.mealCount++;
}

// #region methods

getInCartTotal() {
    return this.cartCount * this.price;
}


// #endregion methods









}