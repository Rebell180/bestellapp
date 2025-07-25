import { CartManager } from "./cartmanager.js";
import { Meal } from "./meal.js";

/**
 * A Database class to manage the communication to the local storage
 */
export class Database {

    // #region attributes

    static meals = [];

    // #endregion attributes

    // #region methods

    /**
     * Create and sets initial menu data
     */
    static setInitialMenuData() {
        Database.meals = [
            // #region burger
            new Meal({
                pName: "Stamm Hamburger",
                pDescr: "240g Beef patty",
                pPrice: 7.50,
                pImgSrc: "./assets/img/meals/hamburger.jpg",
                pImgAlt: "shows a hamburger on a tree trunk",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Cheeseburger",
                pDescr: "240g Beef patty mit cheddar",
                pPrice: 8.50,
                pImgSrc: "./assets/img/meals/cheese-burger.jpg",
                pImgAlt: "shows a big cheeseburger with pickled cucubvers, cheese, tomatoes beef ans lettuce",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Double Cheeseburger",
                pDescr: "2 x 165g Beef patty",
                pPrice: 9.90,
                pImgSrc: "./assets/img/meals/double-cheese-burger.jpg",
                pImgAlt: "shows a cheeseburger with double bread and double beef",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Double Beef Cheeseburger",
                pDescr: "2 x 240g Beef patty",
                pPrice: 11.90,
                pImgSrc: "./assets/img/meals/double-beef-cheese-burger.png",
                pImgAlt: "shows a cheeseburger with double beef and double cheese",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Black Beef Burger",
                pDescr: "240g Beef patty, Onionrings, Bacon",
                pPrice: 13.90,
                pImgSrc: "./assets/img/meals/black-beef-burger.jpg",
                pImgAlt: "shows a burger with black bread, bacon, beef, cheese an two onion rings above",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Quattro Boon",
                pDescr: "4 x 240g Beef patty",
                pPrice: 18.90,
                pImgSrc: "./assets/img/meals/quattro-beef-boon-burger.jpg",
                pImgAlt: "shows a big burger with 4 piles of beef with cheese and lettuce with double bread",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Veggie Cheeseburger",
                pDescr: "240g plant based patty",
                pPrice: 9.90,
                pImgSrc: "./assets/img/meals/veggie-cheese-burger.jpg",
                pImgAlt: "shows a burger with lettuce and a veggie patty with cheese",
                pCategory: "burger",
            }),
            new Meal({
                pName: "Stamm Veggie Proteinburger",
                pDescr: "240g plant based patty",
                pPrice: 10.90,
                pImgSrc: "./assets/img/meals/veggie-protein-cheese-burger.jpg",
                pImgAlt: "shows a burger with lettuce and a veggie patty with cheese",
                pCategory: "burger",
            }),
            // #endregion burger           
            // #region fingerfood
            new Meal({
                pName: "Pommes Frites",
                pDescr: "mit Ketchup und Mayo",
                pPrice: 5.90,
                pImgSrc: "./assets/img/meals/pommes.jpg",
                pImgAlt: "A portion of crispy fried fries on a plate",
                pCategory: "fingerfood",
            }),
            new Meal({
                pName: "Nuggets",
                pDescr: "6 Stück mit Ketchup und Süß-Sauer",
                pPrice: 6.50,
                pImgSrc: "./assets/img/meals/nuggets.jpg",
                pImgAlt: "A portion of crispy fried nuggets on a plate",
                pCategory: "fingerfood",
            }),
            new Meal({
                pName: "Nuggets",
                pDescr: "12 Stück mit Ketchup und Süß-Sauer",
                pPrice: 9.50,
                pImgSrc: "./assets/img/meals/nuggets.jpg",
                pImgAlt: "A portion of crispy fried nuggets on a plate",
                pCategory: "fingerfood",
            }),
            // #endregion fingerfood
            // #region drinks
            new Meal({
                pName: "Coca Cola",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "./assets/img/meals/drinks.jpg",
                pImgAlt: "Shows a glass of water, three ice cubes and yellow background lighting",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Fanta",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "./assets/img/meals/drinks.jpg",
                pImgAlt: "Shows a glass of water, three ice cubes and yellow background lighting",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Sprite",
                pDescr: "0,3 l",
                pPrice: 2.90,
                pImgSrc: "./assets/img/meals/drinks.jpg",
                pImgAlt: "Shows a glass of water, three ice cubes and yellow background lighting",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Red Bull",
                pDescr: "0,2 l",
                pPrice: 3.60,
                pImgSrc: "./assets/img/meals/drinks.jpg",
                pImgAlt: "Shows a glass of water, three ice cubes and yellow background lighting",
                pCategory: "drinks",
            }),
            new Meal({
                pName: "Water",
                pDescr: "0,5 l",
                pPrice: 2.50,
                pImgSrc: "./assets/img/meals/drinks.jpg",
                pImgAlt: "Shows a glass of water, three ice cubes and yellow background lighting",
                pCategory: "drinks",
            }),
            // #endregion drinks
        ]
    }

    /**
     * Save current status of meals to local storage.
     */
    static saveMealsToLS() {
        localStorage.setItem('meals', JSON.stringify(Database.meals));
    }

    /**
     * Get cart data from local storage. 
     * Save current cart data if the local storage is empty. 
     * 
     * @returns an array of cart items (Meal)
     */
    static getMealsFromLS() {
        Database.meals = JSON.parse(localStorage.getItem('meals'));

        if(Database.meals == null) {
            Database.setInitialMenuData();
            Database.saveMealsToLS();
            Database.meals = JSON.parse(localStorage.getItem('meals')); 
        }
    }

    // #endregion methods
}