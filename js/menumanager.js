import { Database } from "./database.js";
import { TemplateManager } from "./templateManager.js";
import { Meal } from "./meal.js";
import { CartManager } from "./cartmanager.js";
import { Helper } from "./helper.js";

/**
 * The menu manager handles all interactions with the menu including add to cart.
 */
export class MenuManager {

    // #region attributes
    // #endregion attributes

    // #region methods

    /**
     * Renders the full menu with all items.
     */
    static render() {
        Database.getMealsFromLS();
        MenuManager.renderMenu();
        
        this.addMenuEventListener();

        document.getElementById('cart-btn-container').classList.add('d-none');
    }

    /**
     * Renders html elements of menu.
     */
    static renderMenu() {
        for(let i = 0; i < Database.meals.length; i++) {
            const newMeal = Database.meals[i];
            if (i == 0){
                MenuManager.resetCategories();
            }
            const categoryContainerRef = MenuManager.getCategoryContainer(newMeal.category);
            categoryContainerRef.appendChild(MenuManager.createMenuElement(newMeal));
        }
    }
    
    /**
     * Clear html content of all categories.
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
     * Create and define html element for representing meal in menu.
     * 
     * @param {Meal} meal 
     * @returns an html element to append.
     */
    static createMenuElement(meal) {
        const menuItem = document.createElement("div");
        menuItem.id = meal.mealId;
        menuItem.classList.add("menu-item-container");
        menuItem.innerHTML = TemplateManager.getMenuItemTemplate(meal);
        return menuItem;
    }

    /**
     * Adds event listener for menu items.
     */
    static addMenuEventListener() {      
        for(let i = 0; i < Database.meals.length; i++) {
            const menuItem = Database.meals[i];
            const menuItemBtnRef = document.getElementById(menuItem.mealId + '-add-btn');

            menuItemBtnRef.addEventListener('click', () => MenuManager.addToCart(menuItem));
        }

        document.getElementById('menu-cart-toggle-btn').addEventListener(
            'click', () => CartManager.toggleCart());
    }

    /**
     * Adds meal to cart.
     * 
     * @param {Meal} menuItem the meal to add. 
     */
    static addToCart(menuItem) {

        const curItem = Database.meals[menuItem.mealIndex];
        if(curItem.isInCart){
            curItem.cartCount++;
        }
        else {
            curItem.isInCart = true;
            curItem.cartCount = 1;
        }
        curItem.inCartTotal = curItem.cartCount * curItem.price;
        curItem.formattedPriceTotal = Helper.formatAmount(curItem.inCartTotal); 
        const a = Database.meals;
        Database.saveMealsToLS();
        CartManager.render();
    }

    // #endregion methods

}