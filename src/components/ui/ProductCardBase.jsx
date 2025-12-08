import React from 'react'
import '../../css/ProductCardBase.css'
import cart_icon from '../../assets/icon/shopping-bag-4-line.svg'

function formatCLP(value) {
	if (typeof value !== 'number') return value
	return `$${value.toLocaleString('es-CL')}`
}

/**
 * ProductCardBase
 * Props:
 * - image: src de la imagen del producto
 * - title: nombre del producto
 * - category: categoria a la que pertenece el producto
 * - origin: pais origen del cafe
 * - brand: marca del producto
 * - price: numero (CLP)
 * - metaLabel: string (origen si es cafe, o marca si no)
 * - onClick: handler opcional
 * - onAddToCard: handler opcional al hacer click en el boton agregar a carrito
 */
export default function ProductCardBase({ 
	image, 
	title, 
	category,
	origin,
	brand,
	price, 
	onClick,
	onAddToCart
}) {
	// normaliza la categoria y revisa si es cafe
	const isCafe = String(category || '').toLowerCase() === 'cafes'
	const displayTitle = isCafe ? `Café ${title}` : title
	const metaLabel = isCafe ? (origin || '') : (brand || '')

	return (
		<article className="pcb-card" onClick={onClick} role={onClick ? 'button' : undefined}>
			<div className="pcb-media">
				{image && <img src={image} alt={title} />}
				{/* btn agregar al carrito mobile*/}
				<button
					className="pcb-add-btn"
					aria-label="Agregar al carrito"
					onClick={(e) => {
						e.stopPropagation()
						if (typeof onAddToCart === 'function') onAddToCart()
						e.currentTarget.blur()
					}}
				>
					<img
						src={cart_icon}
						alt=""
						aria-hidden="true"
					/>
				</button>

				{/* btn agregar al carrito desktop */}
				<button
					className="pcb-add-btn--desktop"
					onClick={(e) => {
						e.stopPropagation()
						if (typeof onAddToCart === 'function') onAddToCart()
						e.currentTarget.blur()
					}}>
					Agregar al carrito
				</button>
			</div>
			<div className="pcb-body">
				{metaLabel && <div className="pcb-meta">{metaLabel}</div>}
				<h3 className="pcb-title">{displayTitle}</h3>
				<div className="pcb-bottom">
					<span className="pcb-price">{formatCLP(price)}</span>
				</div>
			</div>
		</article>
	)
}
