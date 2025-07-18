import { Meal } from "./meal.js";

/**
 * The template manager contains all static methods to return various html templates.
 */
export class TemplateManager {

    // #region attributes
    // #endregion attributes


    // #region methods

    /**
     * Creates a html element to render a single menu item. 
     * 
     * @param {Meal} menuItem the menu item to render. 
     * @returns a html string 
     */
    static getMenuItemTemplate(menuItem) {
        return /*html*/`
            <div id="${menuItem.mealId}-container" class="menu-item-container">
                <img src="${menuItem.imgSrc}" alt="">
                <div class="menu-item-info">
                    <div class="menu-item-head">
                        <h2>${menuItem.name}</h3>
                        <button type="button" id="${menuItem.mealId}-add-btn">
                            <img src="./assets/icons/plus-button.png" alt="">
                        </button>
                    </div>
                    <p>${menuItem.descr}</p>
                    <p><strong>${menuItem.formattedPrice}</strong></p>
                </div>
            </div>
        `
    }

    /**
     * Creates a html element to render a single cart item. 
     * 
     * @param {Meal} cartItem the cart item to render. 
     * @returns a html string 
     */
    static getCartItemTemplate(cartItem) {
        return /*html*/`
            <!-- <div id="${cartItem.cartId}" class="cart-entry"> -->
                <p>${cartItem.name}</p>

                <div >
                    <button id="${cartItem.cartId}-sub-btn">
                        <img src="./assets/icons/minus-button.png" alt="">
                    </button>
                    <span id="${cartItem.cartId}-count">${cartItem.cartCount}</span>
                    <button id="${cartItem.cartId}-add-btn">
                        <img src="./assets/icons/plus-button.png" alt="">
                    </button>
                    <span id="${cartItem.cartId}-total">${cartItem.inCartTotal}</span>
                    <button id="${cartItem.cartId}-del-btn">
                        <img src="./assets/icons/delete-button.png" alt="">
                    </button>
                </div>
            <!-- </div>    -->
        `
    }   

// #endregion methods

}