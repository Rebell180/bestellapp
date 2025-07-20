import { Database } from "./database.js";
import { Helper } from "./helper.js";
import { Meal } from "./meal.js";
import { TemplateManager } from "./templateManager.js";

/**
 * Handles rendering an interaction with the cart
 */
export class CartManager {

    // #region attributes

    static cartItems = [];
    static subtotal;
    static deliveryCost = 4.99;
    static total;

    static hasEventListener = false;

    // #endregion attributes

    // #region methods

    /**
     * Renders the cart with all entries.
     */
    static renderCart() {
        Database.getMealsFromLS();

        const cartContainerRef = document.getElementById('cart-selection-container');
        cartContainerRef.innerHTML = "";

        for(let i = 0; i < Database.meals.length; i++) {
            const curMeal = Database.meals[i];

            if(curMeal.isInCart) {
                cartContainerRef.appendChild(CartManager.createCartElement(curMeal));   
            }
        }
        
        CartManager.addCartEventlistener();
        CartManager.updateSummary();
        
        document.getElementById('cart-toggle-btn').classList.add('d-none');
    }

    /**
     * Creates and returns a cart item as html element.
     * 
     * @param {Meal} meal 
     * @returns a html node element to append containing a cart item
     */
    static createCartElement(meal) {
        const cartItem = document.createElement("div");
        cartItem.id = meal.cartId;
        cartItem.classList.add("cart-entry");
        cartItem.innerHTML = TemplateManager.getCartItemTemplate(meal);
        return cartItem;
    }

    /**
     * Adds all event listender for cart.
     */
    static addCartEventlistener() {
        for(let i = 0; i < Database.meals.length; i++) {

            if(Database.meals[i].isInCart) {
                const meal = Database.meals[i];

                document.getElementById(meal.cartId + '-add-btn').addEventListener(
                    'click', () => CartManager.addExistingMealInCart(meal));
                document.getElementById(meal.cartId + '-sub-btn').addEventListener(
                    'click', () => CartManager.subtractMealInCart(meal));
                document.getElementById(meal.cartId + '-del-btn').addEventListener(
                    'click', () => CartManager.deleteMealFromCart(meal));
            }
        }
        
        if(!CartManager.hasEventListener) {

            document.getElementById('cart-toggle-btn').addEventListener(
                'click', () => CartManager.toggleCart());
            document.getElementById('cart-checkout-btn').addEventListener(
                'click', () => CartManager.checkout());
            document.getElementById('cart-new-cart-btn').addEventListener(
                'click', () => CartManager.checkout());    
            
                CartManager.hasEventListener = true;
        }
    }

    /**
     * Updates the current summary. 
     */
    static updateSummary() {
        CartManager.subtotal = "";
        CartManager.total = "";

        let tempSubTotal = 0;
        for(let i = 0; i < Database.meals.length; i++) {
            const cartItem = Database.meals[i];
            tempSubTotal = tempSubTotal + (cartItem.price * cartItem.cartCount);
        }
        
        CartManager.subtotal = Helper.formatAmount(tempSubTotal);
        CartManager.total = Helper.formatAmount(tempSubTotal + CartManager.deliveryCost)

        document.getElementById('cart-sub-total').innerHTML = CartManager.subtotal;
        document.getElementById('cart-total').innerHTML = CartManager.total;

    }

    /**
     * Increases the count of a menu item in cart.
     * 
     * @param {Meal} menuItem 
     */
    static addExistingMealInCart(meal) {
        const cartItem = Database.meals[meal.mealIndex];

        cartItem.cartCount++;
        cartItem.inCartTotal = Helper.formatAmount(cartItem.cartCount * cartItem.price);

        document.getElementById(cartItem.cartId + "-count").innerHTML = cartItem.cartCount;
        document.getElementById(cartItem.cartId + "-total").innerHTML = cartItem.inCartTotal;

        Database.saveMealsToLS();
        CartManager.updateSummary();
    }

    /**
     * Deletes on item from cart.
     */
    static deleteMealFromCart(meal) {
        const curMeal = Database.meals[meal.mealIndex];
        curMeal.isInCart = false;
        curMeal.cartCount = 0;
        Database.saveMealsToLS();
        CartManager.renderCart();
    }

    /**
     * subtract one count of a cart item. 
     */
    static subtractMealInCart(meal) {
        const curMeal = Database.meals[meal.mealIndex];
        curMeal.cartCount--;
        curMeal.inCartTotal = Helper.formatAmount(curMeal.cartCount * curMeal.price);

        if(curMeal.cartCount == 0) {
            CartManager.deleteMealFromCart(curMeal);
        }
        else {
            document.getElementById(curMeal.cartId + "-count").innerHTML = curMeal.cartCount;
            document.getElementById(curMeal.cartId + "-total").innerHTML = curMeal.inCartTotal;
            Database.saveMealsToLS();
            CartManager.updateSummary();
        }
    }

    /**
     * Toggle the visibility of the cart.
     */
    static toggleCart() {
        const cartContainerRef = document.getElementById('aside-cart-container');
        cartContainerRef.classList.toggle('d-none');

        const menuCartBtnContainerRef = document.getElementById('cart-btn-container');
        const cartBtnRef = document.getElementById('cart-toggle-btn');
        if(cartContainerRef.classList.contains('d-none')) {
            cartBtnRef.classList.add('d-none');
            menuCartBtnContainerRef.classList.remove('d-none');
        }
        else {
            cartBtnRef.classList.remove('d-none');
            menuCartBtnContainerRef.classList.add('d-none');
        }
    }

    /**
     * Finish the order or starts a new one.
     */
    static checkout() {


        const checkoutContentRef = document.getElementById('checkout-content');
        const cartContentRef = document.getElementById('cart-content');
        
        if(cartContentRef.classList.contains('d-none')) {
            cartContentRef.classList.remove('d-none');
            checkoutContentRef.classList.add('d-none')
        }
        else if (checkoutContentRef.classList.contains('d-none')){
            cartContentRef.classList.add('d-none');
            checkoutContentRef.classList.remove('d-none');

            CartManager.clearCart();
        }
        
        
        
        CartManager.renderCart();
    }

    /**
     * Removes all items from cart.
     */
    static clearCart() {
        if(Database.meals.length != 0){

            for(let i = 0; i < Database.meals.length; i++) {
                const meal = Database.meals[i];
                
                meal.cartCount = 0;
                meal.isInCart = false;
                meal.inCartTotal = 0;
                meal.formattedPriceTotal = "";
                
            }
        }
        Database.saveMealsToLS();
    }
    // #endregion methods
}