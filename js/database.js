import { CartManager } from "./cartmanager.js";
import { Meal } from "./meal.js";

/**
 * A Database class to manage the communication to the local storage
 */
export class Database {

    // #region attributes
    // #endregion attributes


    // #region methods

    /**
     * Create and return initial menu data
     * 
     * @returns initial menu data as menu array
     */
    static getInitialMenuData() {
        const menuItems = [
            // #region drinks
            new Meal({
                pName: "Coca Cola",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "../assets/img/meals/drinks.jpg",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Fanta",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "../assets/img/meals/drinks.jpg",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Sprite",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "../assets/img/meals/drinks.jpg",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Red Bull",
                pDescr: "0,2 l",
                pPrice: 3.60,
                pImgSrc: "../assets/img/meals/drinks.jpg",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Water",
                pDescr: "0,5 l",
                pPrice: 2.50,
                pImgSrc: "../assets/img/meals/drinks.jpg",
                pCategory: "drinks",
            }),
            // #endregion drinks
            // #region fingerfood
            new Meal({
                pName: "Pommes Frites",
                pDescr: "mit Ketchup und Mayo",
                pPrice: 5.90,
                pImgSrc: "../assets/img/meals/pommes.jpg",
                pCategory: "fingerfood",
            }),
            new Meal({
                pName: "Nuggets",
                pDescr: "6 Stück mit Ketchup und Süß-Sauer",
                pPrice: 6.50,
                pImgSrc: "../assets/img/meals/nuggets.jpg",
                pCategory: "fingerfood",
            }),
            new Meal({
                pName: "Nuggets",
                pDescr: "12 Stück mit Ketchup und Süß-Sauer",
                pPrice: 9.50,
                pImgSrc: "../assets/img/meals/nuggets.jpg",
                pCategory: "fingerfood",
            }),
            // #endregion fingerfood
            // #region burger
            new Meal({
                pName: "Stamm Hamburger",
                pDescr: "240g Beef patty",
                pPrice: 7.50,
                pImgSrc: "../assets/img/meals/hamburger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Cheeseburger",
                pDescr: "240g Beef patty mit cheddar",
                pPrice: 8.50,
                pImgSrc: "../assets/img/meals/cheese-burger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Double Cheeseburger",
                pDescr: "2 x 165g Beef patty",
                pPrice: 9.90,
                pImgSrc: "../assets/img/meals/double-cheese-burger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Double Beef Cheeseburger",
                pDescr: "2 x 240g Beef patty",
                pPrice: 11.90,
                pImgSrc: "../assets/img/meals/double-beef-cheese-burger.png",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Black Beef Burger",
                pDescr: "240g Beef patty, Onionrings, Bacon",
                pPrice: 13.90,
                pImgSrc: "../assets/img/meals/black-beef-burger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Quattro Boon",
                pDescr: "4 x 240g Beef patty",
                pPrice: 18.90,
                pImgSrc: "../assets/img/meals/quattro-beef-boon-burger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Veggie Cheeseburger",
                pDescr: "240g plant based patty",
                pPrice: 9.90,
                pImgSrc: "../assets/img/meals/veggie-cheese-burger.jpg",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Veggie Proteinburger",
                pDescr: "240g plant based patty",
                pPrice: 10.90,
                pImgSrc: "../assets/img/meals/veggie-protein-cheese-burger.jpg",
                pCategory: "burger",
            }),
            // #endregion burger
        ]

        return menuItems;
    }

    /**
     * Save all cart items to local storage. 
     * 
     * @param {Meal[]} cartItems an array of meals 
     */
    static saveCartToLS(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    /**
     * Get cart data from local storage. 
     * Save current cart data if the local storage is empty. 
     * 
     * @returns an array of cart items (Meal)
     */
    static getCartData() {
        let tempCart = [];
        tempCart = JSON.parse(localStorage.getItem('cart'));

        if(tempCart == null) {
            this.saveCartToLS(CartManager.cartItems);
            tempCart = JSON.parse(localStorage.getItem('cart')); 
        }

        return tempCart;
    }

    /**
     * Save the updated or initial data for menu.
     * 
     * @param {Meal} menuItems as an array
     */
    static saveMenuToLS(menuItems = []) {
        if(menuItems.length > 0){
            localStorage.setItem('menu', JSON.stringify(menuItems));
        }
        else {
            localStorage.setItem('menu', JSON.stringify(this.getInitialMenuData()));
        }
    }

    /**
     * Get menu data from local storage. 
     * Save initial menu data if the local storage is empty. 
     * 
     * @returns an array of menu items (Meal)
     */
    static getMenuData() {
        let tempMenu = [];
        tempMenu = JSON.parse(localStorage.getItem('menu'));

        if(tempMenu == null) {
            this.saveMenuToLS(this.getInitialMenuData());
            tempMenu = JSON.parse(localStorage.getItem('menu')); 
        }

        return tempMenu;
    }

    // #endregion methods
}