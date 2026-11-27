// Точка входу сторінки каталогу: лише знаходить елементи
// й викликає функції інших модулів.
import { destinations } from './data.js';
import { requireElement } from './dom.js';
import { renderCatalog } from './catalog.js';
 
const list = requireElement('.catalog__list');
const template = requireElement('#card-template');
 
renderCatalog(list, destinations, template);
 