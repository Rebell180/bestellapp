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


constructor(pName, pDescr, pPrice, pCategory) {

    this.name = pName;
    this.descr = pDescr;
    this.price = pPrice;
    this.category = pCategory;

    this.formattedPrice = this.formatPrice();
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


// #endregion methods









}