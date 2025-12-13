/* 
* - formatCurrency(valor, opciones): formatea como moneda ('' si no numérico).
* - getCurrencyFormatter(opciones): devuelve Intl.NumberFormat cacheado.
    Opciones: { locale, currency, minimumFractionDigits, maximumFractionDigits }
    Defaults: locale='es-CL', currency='CLP', sin decimales.
    Ejemplo: getCurrencyFormatter({ locale:'es-ES', currency:'EUR' }).format(12.5)
*/
const formatterCache = new Map()

const defaultOptions = {
	locale: 'es-CL',
	currency: 'CLP',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
}

function getFormatter(options = {}) {
	const merged = { ...defaultOptions, ...options }
	const { locale, currency, minimumFractionDigits, maximumFractionDigits } = merged
	const cacheKey = `${locale}-${currency}-${minimumFractionDigits}-${maximumFractionDigits}`

	if (!formatterCache.has(cacheKey)) {
		formatterCache.set(
			cacheKey,
			new Intl.NumberFormat(locale, {
				style: 'currency',
				currency,
				minimumFractionDigits,
				maximumFractionDigits
			})
		)
	}

	return formatterCache.get(cacheKey)
}

export function formatCurrency(value, options) {
	const numericValue = Number(value)
	if (Number.isNaN(numericValue)) return ''

	const formatter = getFormatter(options)
	return formatter.format(numericValue)
}

export function getCurrencyFormatter(options) {
	return getFormatter(options)
}

export default formatCurrency
