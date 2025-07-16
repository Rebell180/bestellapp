import { Helper } from "./helper";

/**
 * 
 */
export class CartItem {

    // #region attributes
    static cartItemCount = 0;

    cartItemId;
    mealCountId;
    mealTotalId;

    mealName;
    mealPrice;
    mealCount = 1;
    formattedMealPrice;

    // #endregion attributes

    constructor({pName, pPrice}={}) {
        this.mealName = pName;
        this.mealPrice = pPrice;
        
        this.formattedMealPrice = Helper.formatAmount(this.mealPrice);
        
        this.cartItemId = 'cartitem_' + CartItem.cartItemCount;
        this.mealCountId = 'cartitem_count_' + CartItem.cartItemCount;
        this.mealTotalId = 'cartitem_total_' + CartItem.cartItemCount;
        CartItem.cartItemCount++;
    }


    // #region methods

    addOneMore() {
        this.mealAmount++;
        // TODO render this cart item
    }

    takeAwayOne() {
        this.mealCount--;
        if(this.mealCount == 0){
            this.deleteCartItem();
        }
        this.updateCartItem
        // TODO render  this cart item
    }

    updateCartItem() {
        document.getElementById(this.mealCountId).innerHTML = this.mealCount;
        document.getElementById(this.mealTotalId).innerHTML = this.formattedMealPrice;
    }

    deleteCartItem() {

    }

    // #endregion methods



}