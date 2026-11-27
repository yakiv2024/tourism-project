// Чисті функції форматування: отримують значення через параметри,
// повертають рядок і не звертаються до DOM
 
const LOCALE = 'uk-UA';
 
const priceFormat = new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
});
 
const dateFormat = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'long', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', timeZone: 'UTC' });
const temperatureFormat = new Intl.NumberFormat(LOCALE, { style: 'unit', unit: 'celsius' });
const precipitationFormat = new Intl.NumberFormat(LOCALE, { style: 'unit', unit: 'millimeter' });
const pluralRules = new Intl.PluralRules(LOCALE);
 
const CATEGORY_LABELS = {
    europe: 'Європа',
    asia: 'Азія',
    'north-america': 'Північна Америка',
};
 
export const DESTINATION_FORMS = {
    one: 'напрямок',
    few: 'напрямки',
    many: 'напрямків',
    other: 'напрямку',
};
 
export function formatPrice(value) {
    return priceFormat.format(value);
}
 
export function formatDate(isoDate) {
    return dateFormat.format(new Date(isoDate));
}
 
export function formatMonth(month) {
    const name = monthFormat.format(new Date(Date.UTC(2026, month - 1, 1)));
    return name.charAt(0).toUpperCase() + name.slice(1);
}
 
export function formatTemperature(value) {
    return temperatureFormat.format(value);
}
 
export function formatPrecipitation(value) {
    return precipitationFormat.format(value);
}
 
export function formatCategory(category) {
    return CATEGORY_LABELS[category] ?? category;
}
 
export function formatAvailability(inStock) {
    return inStock ? 'Відкрито для туристів' : 'Тимчасово недоступно';
}
 
export function pluralize(count, forms) {
    return forms[pluralRules.select(count)];
}
 
export function formatFavoritesCount(count) {
    return `У вибраному ${count} ${pluralize(count, DESTINATION_FORMS)}`;
}
 
// Адреса сторінки деталей: значення кодує searchParams, а не склеювання рядків
export function buildDetailsUrl(id, baseHref) {
    const url = new URL('details.html', baseHref);
    url.searchParams.set('id', id);
    return url.href;
}
 