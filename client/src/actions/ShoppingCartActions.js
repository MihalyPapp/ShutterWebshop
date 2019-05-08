import ShoppingCartConstants from '../constants/ShoppingCartConstants';
import ShutterWebshopDispatcher from '../dispatcher/ShutterWebshopDispatcher';

class ShoppingCartActions {
    addToShoppingCart(cartItem) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShoppingCartConstants.ADD_TO_SHOPPING_CART,
            payload: cartItem
        });
    }
    removeFromShoppingCart(cartItem) {
        ShutterWebshopDispatcher.handleViewAction({
            actionType: ShoppingCartConstants.REMOVE_FROM_SHOPPING_CART,
            payload: cartItem
        })
    }
}

export default new ShoppingCartActions();