import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const PRODUCT_ROUTE_MAP = {
	cafe: '/tienda/producto/cafe',
	cafes: '/tienda/producto/cafe',
	coffee: '/tienda/producto/cafe',
	accesorio: '/tienda/producto/accesorio',
	accesorios: '/tienda/producto/accesorio',
	accessory: '/tienda/producto/accesorio',
	accessories: '/tienda/producto/accesorio',
	suscripcion: '/tienda/producto/subscripcion',
	suscripciones: '/tienda/producto/subscripcion',
	subscription: '/tienda/producto/subscripcion',
	subscriptions: '/tienda/producto/subscripcion'
}

const DEFAULT_ROUTE = '/tienda/producto/cafe'

const normalize = (value) => String(value || '').trim().toLowerCase()



// para manejar la navegacion de productos a detalle de producto
export const getProductDetailPath = (product) => {
	if (!product) return DEFAULT_ROUTE
	const candidates = [
		product.detalleTipo,
		product.tipoDetalle,
		product.tipo,
		product.category,
		product.subcategory
	]

	for (const candidate of candidates) {
		const normalized = normalize(candidate)
		if (!normalized) continue
		const match = PRODUCT_ROUTE_MAP[normalized]
		if (match) return match
	}

	return DEFAULT_ROUTE
}

export default function useProductDetailNavigation() {
	const navigate = useNavigate()

	const goToProductDetail = useCallback((product, options = {}) => {
		if (!product) return
		const path = getProductDetailPath(product)
		const params = new URLSearchParams()
		if (product.id) params.set('id', product.id)
		const queryString = params.toString()
		const state = {
			product,
			selectedFormatId: options.formatId ?? null
		}
		navigate(`${path}${queryString ? `?${queryString}` : ''}`, { state })
	}, [navigate])

	return { goToProductDetail }
}
