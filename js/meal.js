import { Helper } from "./helper.js";

/**
 * A Single Meal add to cart or presenting in menu.
 */
export class Meal {

// #region attributes

static mealCount = 0;

mealId;
cartId;
mealIndex;

name;
descr;
price;
imgSrc;
imgAlt;
category;

formattedPrice;

isInCart = false;
cartCount = 0;
inCartTotal = 0;
formattedPriceTotal;

// #endregion attributes

constructor({pName, pDescr, pPrice, pImgSrc, pImgAlt, pCategory}={}) {

    this.mealId = 'menu-' + Meal.mealCount;
    this.cartId = 'cart-' + Meal.mealCount;
    this.mealIndex = Meal.mealCount;
    
    this.name = pName;
    this.descr = pDescr;
    this.price = pPrice;
    this.category = pCategory;
    this.imgSrc = pImgSrc;
    this.imgAlt = pImgAlt;
    this.formattedPrice = Helper.formatAmount(this.price);

    Meal.mealCount++;
}

// #region methods
// #endregion methods









}