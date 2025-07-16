/**
 * The template manager contains all static methods to return various html templates.
 */
export class TemplateManager {

    // #region attributes
    // #endregion attributes


    // #region methods

    /**
     * 
     */
    static getMenuItemTemplate() {
        return /*html*/`
            <div id="menu-item-container" class="menu-item-container">
                <img src="./assets/img/header-imgs/burger.png" alt="">
                <div id="menu-item-info">
                    <div id="menu-item-head">
                        <h2>Gericht 1</h3>
                        <button type="button">
                            <img src="./assets/icons/plus-button.png" alt="">
                        </button>
                    </div>
                    <p>Zutaten</p>
                    <p><strong>Preis</strong></p>
                </div>
            </div>
        `
    }

    /**
     * 
     */
    static getCartItemTemplate() {
        return /*html*/`
            <div id="cart-entry0" class="cart-entry">
                <h3>Gericht 1</h3>

                <div >
                    <button id="">
                        <img src="./assets/icons/minus-button.png" alt="">
                    </button>
                    <span>1</span>
                    <button id="">
                        <img src="./assets/icons/plus-button.png" alt="">
                    </button>
                    <span>15,49 €</span>
                    <button id="">
                        <img src="./assets/icons/delete-button.png" alt="">
                    </button>
                </div>
            </div>   
        `
    }   

// #endregion methods

}