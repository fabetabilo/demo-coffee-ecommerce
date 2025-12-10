import { useMemo } from 'react'

const defaultFormatter = new Intl.NumberFormat('es-CL', {
	style: 'currency',
	currency: 'CLP',
	maximumFractionDigits: 0
})

// evita cantidades invalidas o menores a 1
const clampQuantity = (value) => {
	const parsed = Number(value)
	if (Number.isNaN(parsed) || parsed <= 0) return 1
	return Math.floor(parsed)
}

// para calcular totales reutilizables en diferentes paginas
export default function useTotalPrice({
	unitPrice = 0,
	quantity = 1,
	discounts = [], //  descuentos
	taxRate = 0,  // iva, etc
	currencyFormatter = defaultFormatter
} = {}) {
	return useMemo(() => {
		const basePrice = Number(unitPrice) || 0
		const qty = clampQuantity(quantity)
		let subtotal = basePrice * qty

        // descuentos
		for (const discount of discounts || []) {
			if (!discount) continue
			const discountValue = Number(discount.value) || 0

			if (discount.type === 'percentage') {
				subtotal -= subtotal * (discountValue / 100)
			} else if (discount.type === 'fixed') {
				subtotal -= discountValue
			}
		}

		if (subtotal < 0) subtotal = 0

		const taxAmount = taxRate ? subtotal * Number(taxRate) : 0
		const total = subtotal + taxAmount
		const formatter = typeof currencyFormatter?.format === 'function' ? currencyFormatter : null

		const formatValue = (value) => {
			if (!formatter) return value
			return formatter.format(Math.round(value))
		}

		return {
			quantity: qty,
			unitPrice: basePrice,
			subtotal,
			tax: taxAmount,
			total,
			formattedUnit: formatValue(basePrice),
			formattedSubtotal: formatValue(subtotal),
			formattedTax: formatValue(taxAmount),
			formattedTotal: formatValue(total)
		}
	}, [unitPrice, quantity, discounts, taxRate, currencyFormatter])
}
