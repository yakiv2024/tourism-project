// Пошук обов'язкового елемента: якщо його немає, помилка видна одразу в консолі,
// а не перетворюється на «мовчазну» порожню сторінку.
export function requireElement(selector, root = document) {
    const element = root.querySelector(selector);
    if (element === null) {
        throw new Error(`Не знайдено обов'язковий елемент: ${selector}`);
    }
    return element;
}
 