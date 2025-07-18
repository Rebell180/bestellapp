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
    // #endregion attributes


    // #region methods

    /**
     * Renders the full menu with all items.
     */
    static renderMenu() {
        Database.getMealsFromLS();

        for(let i = 0; i < Database.meals.length; i++) {
            const newMeal = Database.meals[i];
            if (i == 0){
                MenuManager.resetCategories();
            }
            const categoryContainerRef = MenuManager.getCategoryContainer(newMeal.category);
            categoryContainerRef.appendChild(MenuManager.createHtmlElement(newMeal));
        }

        this.addMenuEventListener();
    }
    
    /**
     * Clear the html content for all categories.
     */
    static resetCategories() {
        document.getElementById('category-content-burger').innerHTML = "";
        document.getElementById('category-content-fingerfood').innerHTML = "";
        document.getElementById('category-content-drinks').innerHTML = "";
    }

    /**
     * Checks the category of a menu item to render and return the right html category reference.
     * 
     * @param {string} category 
     * @returns a document reference of the right category container.
     */
    static getCategoryContainer(category) {
        switch (category) {
            case 'burger':
                return document.getElementById('category-content-burger');
            case 'fingerfood':
                return document.getElementById('category-content-fingerfood');
            case 'drinks':
                return document.getElementById('category-content-drinks');
        }
    }

    /**
     * Create and define a html element for representing a meal in menu.
     * 
     * @param {Meal} meal 
     * @returns an html element to append.
     */
    static createHtmlElement(meal) {
        const menuItem = document.createElement("div");
        menuItem.id = meal.cartId;
        menuItem.classList.add("cart-entry");
        menuItem.innerHTML = TemplateManager.getMenuItemTemplate(meal);
        return menuItem;
    }

    /**
     * Adds the event listener for menu items.
     */
    static addMenuEventListener() {      
        for(let i = 0; i < Database.meals.length; i++) {
            const menuItem = Database.meals[i];
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
            menuItem.cartCount++;
            Database.saveMealsToLS();
            CartManager.renderCart();
        }
        else {
            menuItem.isInCart = true;
            menuItem.cartCount = 1;
            menuItem.inCartTotal = menuItem.formattedPrice;
            CartManager.addMenuItemToCart(menuItem);
        }
    }

    // #endregion methods

}