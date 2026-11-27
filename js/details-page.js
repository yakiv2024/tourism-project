// точка входу сторінки деталей
import { destinations } from './data.js';
import { requireElement } from './dom.js';
import { renderDetails } from './details.js';
 
const SITE_NAME = 'Світ Подорожей';
 
const root = requireElement('#details-root');
const template = requireElement('#details-template');
const crumb = requireElement('.breadcrumbs__item[aria-current="page"]');
const toc = requireElement('.toc');
const review = requireElement('#review');
 
// id з адреси може бути будь-яким, тому шукаємо його в даних
const id = new URLSearchParams(window.location.search).get('id');
const item = destinations.find((destination) => destination.id === id) ?? null;
 
renderDetails(root, item, template);
 
if (item) {
    document.title = `${item.title} – ${SITE_NAME}`;
    crumb.textContent = item.title;
} else {
    document.title = `Позицію не знайдено – ${SITE_NAME}`;
    crumb.textContent = 'Позицію не знайдено';
    toc.hidden = true;
    review.hidden = true;
}
 