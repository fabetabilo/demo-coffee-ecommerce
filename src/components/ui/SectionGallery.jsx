import React from 'react'
import ProductCardBase from './ProductCardBase'
import ProductCardCoffee from './ProductCardCoffee'
import useMinProductPrice from '../../hooks/useMinProductPrice'
import '../../css/SectionGallery.css'

export default function SectionGallery({ items = [], className = '', onCardClick, onAddToCart }) {
	
    const galleryItems = Array.isArray(items) ? items : []

	if (galleryItems.length === 0) {
		return null
	}

	const handleCardClick = typeof onCardClick === 'function' ? onCardClick : null
	const handleAddToCart = typeof onAddToCart === 'function' ? onAddToCart : null

	const containerClassName = ['section-gallery', className].filter(Boolean).join(' ')
	const getMinProductPrice = useMinProductPrice()
	const isCoffeeItem = (item) => String(item?.subcategory || item?.category || '').toLowerCase() === 'cafes'

	return (
		<div className={containerClassName}>
			{galleryItems.map((item) => {
				const key = item.id ?? item.name
				if (isCoffeeItem(item)) {
					return (
						<ProductCardCoffee
							key={key}
							product={item}
							onCardClick={handleCardClick ? (product, options) => handleCardClick(product, options) : undefined}
							onAddToCart={handleAddToCart ? () => handleAddToCart(item) : undefined}
						/>
					)
				}

				return (
					<ProductCardBase
						key={key}
						images={Array.isArray(item.productImages) ? item.productImages : []}
						title={item.name}
						category={item.subcategory || item.category}
						origin={item.origin}
						brand={item.brand}
						price={getMinProductPrice(item)}
						onClick={handleCardClick ? () => handleCardClick(item) : undefined}
						onAddToCart={handleAddToCart ? () => handleAddToCart(item) : undefined}
					/>
				)
			})}
		</div>
	)
}
