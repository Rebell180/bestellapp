import { CartManager } from './cartmanager.js';
import { MenuManager } from './menumanager.js';

function init() {
    MenuManager.renderMenu();
    CartManager.renderCart();
}

init();