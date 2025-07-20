import { CartManager } from './cartmanager.js';
import { MenuManager } from './menumanager.js';


/**
 * Initialize and renders all flexible elements
 */
function init() {
    MenuManager.render();
    CartManager.render();
}

init();