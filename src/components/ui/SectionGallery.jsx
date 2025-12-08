import React from 'react'
import ProductCardBase from './ProductCardBase'
import '../../css/SectionGallery.css'

export default function SectionGallery({ items = [], className = '', onCardClick, onAddToCart }) {
	
    const galleryItems = Array.isArray(items) ? items : []

	if (galleryItems.length === 0) {
		return null
	}

	const handleCardClick = typeof onCardClick === 'function' ? onCardClick : null
	const handleAddToCart = typeof onAddToCart === 'function' ? onAddToCart : null

	const containerClassName = ['section-gallery', className].filter(Boolean).join(' ')

	return (
		<div className={containerClassName}>
			{galleryItems.map((item) => (
				<ProductCardBase
					key={item.id ?? item.nombre}
					image={item.imagen}
					title={item.nombre}
					category={item.subcategoria || item.categoria}
					origin={item.origen}
					brand={item.marca}
					price={item.precio}
					onClick={handleCardClick ? () => handleCardClick(item) : undefined}
					onAddToCart={handleAddToCart ? () => handleAddToCart(item) : undefined}
				/>
			))}
		</div>
	)
}
