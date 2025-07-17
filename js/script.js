/**
Klassen: 

- category
- meal
- Cart ??

- TemplateManager
- CartManager ???

Templates:

mealTemplate
cartTemplate

*/

import { CartManager } from './cartmanager.js';
import { MenuManager } from './menumanager.js';

function init() {
    MenuManager.renderMenu();
    CartManager.renderCartItems();
}

init();