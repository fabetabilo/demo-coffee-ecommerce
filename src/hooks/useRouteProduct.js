import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ProductService from '../services/product.service'

const normalizeCategory = (value) => String(value || '').trim().toLowerCase()

// Hook para resolver un producto en base a la ruta (query ?id=) y al state de react-router
// Opcionalmente puedes pasar expectedCategory ("cafes", "accesorios", etc.) para filtrar por categoría.
export default function useRouteProduct(expectedCategory) {
	const [searchParams] = useSearchParams()
	const location = useLocation()
	const stateProduct = location.state?.product
	const normalizedExpectedCategory = normalizeCategory(expectedCategory)

	const [product, setProduct] = useState(stateProduct ?? null)
	const [isLoading, setIsLoading] = useState(!stateProduct)
	const [error, setError] = useState(null)

	const productId = useMemo(() => {
		const idFromQuery = Number(searchParams.get('id'))
		if (!Number.isNaN(idFromQuery) && idFromQuery > 0) return idFromQuery
		return stateProduct?.id ?? null
	}, [searchParams, stateProduct?.id])

	useEffect(() => {
		let isMounted = true

		const matchesExpected = (candidate) => {
			if (!normalizedExpectedCategory) return true
			return normalizeCategory(candidate?.category) === normalizedExpectedCategory
		}

		const resolveFromState = () => {
			if (!stateProduct) return false
			if (!matchesExpected(stateProduct)) return false
			setProduct(stateProduct)
			setError(null)
			setIsLoading(false)
			return true
		}

		if (!productId) {
			const resolved = resolveFromState()
			if (!resolved) {
				setProduct(null)
				if (stateProduct) {
					setError(new Error('El producto no coincide con la categoría solicitada.'))
				}
				setIsLoading(false)
			}
			return () => {
				isMounted = false
			}
		}

		if (stateProduct && stateProduct.id === productId) {
			const handled = resolveFromState()
			if (handled) {
				return () => {
					isMounted = false
				}
			}
		}

		const fetchProduct = async () => {
			setIsLoading(true)
			try {
				const fetchedProduct = await ProductService.getProductById(productId)
				if (!isMounted) return
				if (!fetchedProduct) {
					setProduct(null)
					setError(new Error('Producto no encontrado.'))
					return
				}
				if (!matchesExpected(fetchedProduct)) {
					setProduct(null)
					setError(new Error('El producto no coincide con la categoría solicitada.'))
					return
				}
				setProduct(fetchedProduct)
				setError(null)
			} catch (err) {
				if (!isMounted) return
				console.error('Error loading product', err)
				setProduct(null)
				setError(err)
			} finally {
				if (isMounted) {
					setIsLoading(false)
				}
			}
		}
		fetchProduct()


		return () => {
			isMounted = false
		}
	}, [productId, stateProduct, normalizedExpectedCategory]
)

	return { product, isLoading, error }
}

