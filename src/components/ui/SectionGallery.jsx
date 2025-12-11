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
	const isCoffeeItem = (item) => String(item?.subcategoria || item?.categoria || '').toLowerCase() === 'cafes'

	return (
		<div className={containerClassName}>
			{galleryItems.map((item) => {
				const key = item.id ?? item.nombre
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
						image={item.imagen}
						title={item.nombre}
						category={item.subcategoria || item.categoria}
						origin={item.origen}
						brand={item.marca}
						price={getMinProductPrice(item)}
						onClick={handleCardClick ? () => handleCardClick(item) : undefined}
						onAddToCart={handleAddToCart ? () => handleAddToCart(item) : undefined}
					/>
				)
			})}
		</div>
	)
}
