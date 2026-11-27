import {
    buildDetailsUrl,
    formatAvailability,
    formatCategory,
    formatDate,
    formatMonth,
    formatPrice,
} from './format.js';
 
// Створює елемент картки з об'єкта даних за шаблоном.
// Дані виводяться лише через textContent, атрибути й властивості, рядок ніколи не розбирається як розмітка.
// Функція нікуди не вставляє картку: це вирішує код, що її викликав.
export function createCard(item, template) {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector('.card');
    const descriptionId = `description-${item.id}`;
 
    card.dataset.id = item.id;
    card.dataset.inStock = String(item.inStock);
    card.dataset.category = item.category;
 
    const link = card.querySelector('.card__title-link');
    link.textContent = item.title;
    link.href = buildDetailsUrl(item.id, document.baseURI);
 
    const image = card.querySelector('.card__image');
    image.src = item.imageSmall;
    image.srcset = `${item.imageSmall} 320w, ${item.image} 800w`;
    image.sizes = '(max-width: 600px) 320px, 800px';
    image.alt = item.imageAlt;
 
    const description = card.querySelector('.card__description');
    description.id = descriptionId;
    description.textContent = item.description;
 
    card.querySelector('.card__region').textContent = formatCategory(item.category);
    card.querySelector('.card__season').textContent = formatMonth(item.bestMonth);
    card.querySelector('.card__status').textContent = formatAvailability(item.inStock);
 
    const price = card.querySelector('.card__price');
    price.value = String(item.price);
    price.textContent = formatPrice(item.price);
 
    const date = card.querySelector('.card__date time');
    date.dateTime = item.addedAt;
    date.textContent = formatDate(item.addedAt);
 
    const toggle = card.querySelector('[data-action="toggle-description"]');
    toggle.setAttribute('aria-controls', descriptionId);
 
    return fragment.firstElementChild;
}
 