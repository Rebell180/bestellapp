import { Database } from "./database.js";
import { TemplateManager } from "./templateManager.js";
import { Meal } from "./meal.js";
import { CartManager } from "./cartmanager.js";
import { Helper } from "./helper.js";


/**
 * 
 */
export class MenuManager {

    // #region attributes
    static menuItems = [];
    // #endregion attributes


    // #region methods
    static renderMenu() {
        MenuManager.menuItems = Database.getMenuData();

        const menuContainerRef = document.getElementById('menu-items-container');
        menuContainerRef.innerHTML = "";

        for(let i = 0; i < MenuManager.menuItems.length; i++) {
            const menuItem = MenuManager.menuItems[i];
            menuContainerRef.innerHTML+= TemplateManager.getMenuItemTemplate(menuItem);
        }

        this.addMenuEventListener();
    }
    // #endregion methods


    /**
     * 
     */
    static addMenuEventListener() {
        
        for(let i = 0; i < MenuManager.menuItems.length; i++) {
            const menuItem = MenuManager.menuItems[i];
            const menuItemBtnRef = document.getElementById(menuItem.mealId + '-add-btn');

            menuItemBtnRef.addEventListener('click', () => MenuManager.addToCart(menuItem));
        }
    }


    /**
     * Adds a meal to cart.
     * 
     * @param {Meal} menuItem the meal to add. 
     */
    static addToCart(menuItem) {
        if(menuItem.isInCart){
            // menuItem.cartCount = menuItem.cartCount + 1;
            // menuItem.inCartTotal = Helper.formatAmount(menuItem.cartCount * menuItem.price);
            CartManager.addExistingMenuItemInCart(menuItem);
        }
        else {
            menuItem.isInCart = true;
            menuItem.cartCount = 1;
            menuItem.inCartTotal = menuItem.formattedPrice;
            CartManager.addMenuItemToCart(menuItem);
            Database.saveMenuToLS(MenuManager.menuItems);
        }
    }

}