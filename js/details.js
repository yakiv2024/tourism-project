import {
    formatAvailability,
    formatCategory,
    formatDate,
    formatMonth,
    formatPrecipitation,
    formatPrice,
    formatTemperature,
} from './format.js';
 
function createSpecRow(term, value) {
    const row = document.createElement('div');
    row.className = 'specs__row';
    const dt = document.createElement('dt');
    dt.className = 'specs__term';
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.className = 'specs__value';
    dd.append(value);
    row.append(dt, dd);
    return row;
}
 
function createValue(tagName, text, attributes) {
    const element = document.createElement(tagName);
    element.textContent = text;
    Object.assign(element, attributes);
    return element;
}
 
// рядок таблиці клімату, місяць у <th scope="row">
function createClimateRow(entry) {
    const row = document.createElement('tr');
    const month = document.createElement('th');
    month.scope = 'row';
    month.textContent = entry.month;
    const temperature = document.createElement('td');
    temperature.className = 'data-table__number';
    temperature.textContent = formatTemperature(entry.temperature);
    const precipitation = document.createElement('td');
    precipitation.className = 'data-table__number';
    precipitation.textContent = formatPrecipitation(entry.precipitation);
    row.append(month, temperature, precipitation);
    return row;
}
 
// заповнює шаблон сторінки деталей
export function createDetails(item, template) {
    const fragment = template.content.cloneNode(true);
    const article = fragment.querySelector('.destination');
    article.dataset.id = item.id;
    article.dataset.inStock = String(item.inStock);
 
    article.querySelector('.destination__title').textContent = item.title;
 
    const image = article.querySelector('.destination__image');
    image.src = item.image;
    image.alt = item.imageAlt;
    article.querySelector('.destination__caption').textContent = item.imageAlt;
 
    article.querySelector('.specs').append(
        createSpecRow('Регіон', formatCategory(item.category)),
        createSpecRow('Денний бюджет', createValue('data', formatPrice(item.price), {
            className: 'specs__price',
            value: String(item.price),
        })),
        createSpecRow('Найкращий сезон', formatMonth(item.bestMonth)),
        createSpecRow('Статус', formatAvailability(item.inStock)),
        createSpecRow('Код напрямку', item.itemCode),
        createSpecRow('Додано до каталогу', createValue('time', formatDate(item.addedAt), {
            dateTime: item.addedAt,
        })),
    );
 
    article.querySelector('.destination__description').textContent = item.description;
    article.querySelector('.data-table caption').textContent = `Клімат за сезонами: ${item.title}`;
    article.querySelector('.data-table tbody').append(...item.climate.map(createClimateRow));
 
    return fragment.firstElementChild;
}
 
// якщо напрямок не знайдено
export function createNotFound() {
    const section = document.createElement('section');
    section.className = 'not-found';
    const title = document.createElement('h1');
    title.textContent = 'Позицію не знайдено';
    const text = document.createElement('p');
    text.textContent = 'Такого напрямку немає в каталозі. Перевірте адресу або поверніться до каталогу.';
    const back = document.createElement('p');
    const link = document.createElement('a');
    link.href = 'index.html';
    link.className = 'button button--secondary';
    link.textContent = 'Повернутися до каталогу';
    back.append(link);
    section.append(title, text, back);
    return section;
}
 
export function renderDetails(root, item, template) {
    root.replaceChildren(item ? createDetails(item, template) : createNotFound());
}
 