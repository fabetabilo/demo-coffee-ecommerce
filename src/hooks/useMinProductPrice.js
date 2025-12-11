import { useCallback } from 'react'

/**
 * Hook para obtener el precio minimo (preferentemente disponible)
 * de un producto que puede tener variantes en `formats`.
 *
 * Uso:
 * const getMinProductPrice = useMinProductPrice()
 * const price = getMinProductPrice(product)
 */
export default function useMinProductPrice() {
	const getMinProductPrice = useCallback((item) => {
		if (!item) return null

		if (Array.isArray(item.formats) && item.formats.length > 0) {
			const availableFormats = item.formats.filter(
				(f) => f && typeof f.price === 'number' && f.available !== false
			)
			const source = availableFormats.length > 0 ? availableFormats : item.formats
			const prices = source
				.map((f) => f && f.price)
				.filter((p) => typeof p === 'number')
			if (prices.length > 0) {
				return Math.min(...prices)
			}
		}

		return typeof item.precio === 'number' ? item.precio : null
	}, [])

	return getMinProductPrice
}
