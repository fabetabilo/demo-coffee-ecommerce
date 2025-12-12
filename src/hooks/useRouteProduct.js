import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { demoproducts } from '../data/demo/demo-products'

// Hook para resolver un producto en base a la ruta (query ?id=) y al state de react-router
// Opcionalmente puedes pasar expectedCategory ("cafes", "accesorios", etc.) para filtrar por categoría.
export default function useRouteProduct(expectedCategory) {
	const [searchParams] = useSearchParams()
	const location = useLocation()
	const stateProduct = location.state?.product

	const productId = useMemo(() => {
		const idFromQuery = Number(searchParams.get('id'))
		if (!Number.isNaN(idFromQuery) && idFromQuery > 0) return idFromQuery
		return stateProduct?.id ?? null
	}, [searchParams, stateProduct?.id])

	const product = useMemo(() => {
		if (!productId && stateProduct) return stateProduct
		if (stateProduct && stateProduct.id === productId) return stateProduct

		const found = demoproducts.find((item) => item.id === productId)
		if (!found) return null

		if (!expectedCategory) return found

		const category = String(found.category || '').trim().toLowerCase()
		return category === String(expectedCategory || '').trim().toLowerCase() ? found : null
	}, [productId, stateProduct, expectedCategory])

	return product
}

