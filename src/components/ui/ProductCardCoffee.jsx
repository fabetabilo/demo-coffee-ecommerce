import React, { useMemo } from 'react'
import ProductCardBase from './ProductCardBase'
import useMinProductPrice from '../../hooks/useMinProductPrice'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'
import '../../css/ProductCardCoffee.css'

const isAvailableFormat = (format) => format && format.available !== false

export default function ProductCardCoffee({ product, onCardClick, onAddToCart }) {
	const getMinProductPrice = useMinProductPrice()
	const { goToProductDetail } = useProductDetailNavigation()

	const formats = useMemo(() => {
		if (!product) return []
		if (Array.isArray(product?.formats)) {
			return product.formats.filter(Boolean)
		}
		return []
	}, [product])

	const price = getMinProductPrice(product)

	const navigateToDetail = (formatId = null) => {
		if (!product) return
		if (typeof onCardClick === 'function') {
			onCardClick(product, { formatId })
			return
		}
		goToProductDetail(product, { formatId })
	}

	const handleCardClick = () => navigateToDetail()

	const handleAddToCart = () => {
		if (typeof onAddToCart === 'function') {
			onAddToCart(product)
			return
		}
		navigateToDetail()
	}

	const formatPills = formats.length > 0 && (
		<div className="pcc-format-pills">
			{formats.map((format, index) => {
				if (!format) return null
				const available = isAvailableFormat(format)
				const label = String(format.label || (format.grams ? `${format.grams}G` : 'Formato')).toUpperCase()
				return (
					<button
						type="button"
						key={format.id || `${label}-${index}`}
						className={`pcc-pill ${!available ? 'pcc-pill--disabled' : ''}`.trim()}
						onClick={(event) => {
							event.stopPropagation()
							if (!available) return
							navigateToDetail(format.id)
						}}
						disabled={!available}
					>
						{label}
					</button>
				)
			})}
		</div>
	)

	return (
		<ProductCardBase
			image={product?.image}
			title={product?.name}
			category={product?.subcategory || product?.category}
			origin={product?.origin}
			brand={product?.brand}
			price={price}
			onClick={handleCardClick}
			onAddToCart={handleAddToCart}
			extraContent={formatPills}
		/>
	)
}
