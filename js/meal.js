import { Helper } from "./helper";

/**
 * A Single Meal to add to a cart or present it in a menu.
 */
export class Meal {

// #region attributes

name;
descr;
price;
category;

formattedPrice;


// #endregion attributes


constructor({pName, pDescr, pPrice, pCategory = 'burger'}={}) {

    this.name = pName;
    this.descr = pDescr;
    this.price = pPrice;
    this.category = pCategory;

    this.formattedPrice = Helper.formatAmount(this.price);
}

// #region methods

// #endregion methods









}