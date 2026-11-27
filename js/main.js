// Точка входу сторінки каталогу: лише знаходить елементи,
// реєструє обробник і викликає функції інших модулів
import { destinations } from './data.js';
import { requireElement } from './dom.js';
import { renderCatalog } from './catalog.js';
import { createCatalogClickHandler, updateFavoritesCounter } from './actions.js';
 
const list = requireElement('.catalog__list');
const template = requireElement('#card-template');
const counter = requireElement('#favorites-counter');
 
renderCatalog(list, destinations, template);
updateFavoritesCounter(list, counter);
list.addEventListener('click', createCatalogClickHandler(counter));
 
 