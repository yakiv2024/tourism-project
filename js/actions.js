import { formatFavoritesCount } from './format.js';
 
function toggleFavorite(button) {
    const pressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!pressed));
}
 
function toggleDescription(button, card) {
    const description = card.querySelector(`#${button.getAttribute('aria-controls')}`);
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Показати опис' : 'Сховати опис';
    description.hidden = expanded;
}
 
export function countFavorites(list) {
    return list.querySelectorAll('[data-action="favorite"][aria-pressed="true"]').length;
}
 
export function updateFavoritesCounter(list, counter) {
    counter.textContent = formatFavoritesCount(countFavorites(list));
}
 
// Повертає один делегований обробник для списку каталогу
export function createCatalogClickHandler(counter) {
    return function handleCatalogClick(event) {
        const list = event.currentTarget;
        const button = event.target.closest('[data-action]');
        if (button === null || !list.contains(button)) {
            return;
        }
        const card = button.closest('.card');
        if (button.dataset.action === 'favorite') {
            toggleFavorite(button);
            updateFavoritesCounter(list, counter);
        } else if (button.dataset.action === 'toggle-description') {
            toggleDescription(button, card);
        }
    };
}
 