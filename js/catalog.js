import { createCard } from './card.js';
 
// Порожній стан – окремий елемент списку без класу catalog__item,
// щоб на нього не поширювалася підсітка картки
export function createEmptyState(message) {
    const item = document.createElement('li');
    item.className = 'catalog__empty';
    item.textContent = message;
    return item;
}
 
// Замінює вміст списку одним викликом replaceChildren і повертає кількість карток
export function renderCatalog(list, items, template) {
    if (items.length === 0) {
        list.replaceChildren(createEmptyState('Нічого не знайдено. Спробуйте змінити умови пошуку.'));
        return 0;
    }
    const cards = items.map((item) => createCard(item, template));
    list.replaceChildren(...cards);
    return cards.length;
}
 