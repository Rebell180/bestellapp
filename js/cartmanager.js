import { Database } from "./database.js";
import { Helper } from "./helper.js";
import { Meal } from "./meal.js";
import { MenuManager } from "./menumanager.js";
import { TemplateManager } from "./templateManager.js";

/**
 * 
 */
export class CartManager {


    // #region attributes

    static cartItems = [];
    static subtotal;
    static deliveryCost = 4.99;
    static total;

    // #endregion attributes


    // #region methods

    /**
     * Renders all cart items.
     */
    static renderCartItems() {

        const cartContainerRef = document.getElementById('cart-selection-container');
        cartContainerRef.innerHTML = "";
        CartManager.cartItems = Database.getCartData();

        for(let i = 0; i < CartManager.cartItems.length; i++) {
            const curItem = CartManager.cartItems[i];

            cartContainerRef.innerHTML += TemplateManager.getCartItemTemplate(curItem);   
        }

        CartManager.updateSummary();
        CartManager.addAllCartItemEventListener();
    }

    /**
     * Renders one cart item.
     */
    static renderCartItem(cartItem) {

        const cartContainerRef = document.getElementById('cart-selection-container');
        CartManager.cartItems = Database.getCartData();

        for(let i = 0; i < CartManager.cartItems.length; i++) {
            const curItem = CartManager.cartItems[i];

            if(curItem.cartId == cartItem.cartId){
                cartContainerRef.innerHTML += TemplateManager.getCartItemTemplate(curItem);   
                CartManager.updateSummary();
                CartManager.addCartItemEventListener(curItem);
            }
        }
    }

    /**
     * Adds event listener to every cart item.
     */
    static addCartItemEventListener(cartItem) {
            // add button
            document.getElementById(cartItem.cartId + '-add-btn').addEventListener(
                'click', () => CartManager.addExistingMenuItemInCart(cartItem)
            );

            // sub button
            document.getElementById(cartItem.cartId + '-sub-btn').addEventListener(
                'click', () => CartManager.subtractMenuItemInCart(cartItem)
            );

            // del button
            document.getElementById(cartItem.cartId + '-del-btn').addEventListener(
                'click', () => CartManager.deleteMenuItemInCart(cartItem)
            );

        
    }

    /**
     * Adds event listener for all cart items.
     */
    static addAllCartItemEventListener() {
        for(let i = 0; i < CartManager.cartItems.length; i++) {
            CartManager.addCartItemEventListener(CartManager.cartItems[i]);
        }
    }

    /**
     * Adds event listener to cart buttons
     */
    static addCartEventListener() {

    }

    /**
     * Updates the current summary. 
     */
    static updateSummary() {
        CartManager.subtotal = "";
        CartManager.total = "";

        let tempSubTotal = 0;
        for(let i = 0; i < CartManager.cartItems.length; i++) {
            tempSubTotal = tempSubTotal + (CartManager.cartItems[i].price * CartManager.cartItems[i].cartCount);
        }
        
        CartManager.subtotal = Helper.formatAmount(tempSubTotal);
        CartManager.total = Helper.formatAmount(tempSubTotal + CartManager.deliveryCost)

        document.getElementById('cart-sub-total').innerHTML = CartManager.subtotal;
        document.getElementById('cart-total').innerHTML = CartManager.total;

    }

    /**
     * Adds a new menu item to cart.
     * 
     * @param {Meal} menuItem 
     */
    static addMenuItemToCart(menuItem) {
        CartManager.cartItems.push(menuItem);
        menuItem.cartIndex = CartManager.cartItems.length - 1;
        Database.saveCartToLS(CartManager.cartItems);
        CartManager.renderCartItem(menuItem);
    }

    /**
     * Increases the count of a menu item in cart.
     * 
     * @param {Meal} menuItem 
     */
    static addExistingMenuItemInCart(menuItem) {

        menuItem.cartCount++;
        menuItem.inCartTotal = Helper.formatAmount(menuItem.cartCount * menuItem.price);

        const curItem = CartManager.cartItems[menuItem.cartIndex];

        curItem.cartCount = menuItem.cartCount;
        curItem.inCartTotal = menuItem.inCartTotal;

        document.getElementById(curItem.cartId + "-count").innerHTML = curItem.cartCount;
        document.getElementById(curItem.cartId + "-total").innerHTML = curItem.inCartTotal;

        Database.saveCartToLS(CartManager.cartItems);
        CartManager.updateSummary();
    }

    /**
     * Deletes on item from cart.
     */
    static deleteMenuItemInCart(cartItem) {
        const meal = MenuManager.menuItems[cartItem.mealIndex];
        meal.isInCart = false;
        meal.mealCount = 0;
        CartManager.cartItems.splice(cartItem.cartIndex, 1);
        Database.saveMenuToLS(MenuManager.menuItems);
        Database.saveCartToLS(CartManager.cartItems);
        this.renderCartItems();
    }

    /**
     * subtract one count of a cart item. 
     */
    static subtractMenuItemInCart(cartItem) {
        cartItem.cartCount--;
        cartItem.inCartTotal = Helper.formatAmount(cartItem.cartCount * cartItem.price);

        if(cartItem.cartCount == 0) {
            CartManager.deleteMenuItemInCart(cartItem);
        }
        else {

            
            const curItem = CartManager.cartItems[cartItem.cartIndex];
            
            curItem.cartCount = cartItem.cartCount;
            curItem.inCartTotal = cartItem.inCartTotal;
            
            document.getElementById(curItem.cartId + "-count").innerHTML = curItem.cartCount;
            document.getElementById(curItem.cartId + "-total").innerHTML = curItem.inCartTotal;
            
            Database.saveCartToLS(CartManager.cartItems);
            CartManager.updateSummary();
        }

    }
    // #endregion methods




}