import React from 'react'
import '../../css/ProductCardBase.css'
import cart_icon from '../../assets/icon/shopping-bag-4-line.svg'
import arrowRight from '../../assets/icon/arrow-right-s-line.svg'
import ProductImageCarousel from './ProductImageCarousel'
import formatCurrency from '../../utils/formatCurrency'

/**
 * ProductCardBase
 * Props:
 * - images: arreglo de imagenes del producto, por ProductImageCarousel
 * - title: nombre del producto
 * - category: categoria a la que pertenece el producto
 * - origin: pais origen del cafe
 * - brand: marca del producto
 * - price: numero (CLP)
 * - metaLabel: string (origen si es cafe, o marca si no)
 * - onClick: handler opcional
 * - onAddToCard: handler opcional al hacer click en el boton agregar a carrito
 * - clickableArea: 'card' | 'media' (por defecto 'card')
 */
export default function ProductCardBase({ 
	images,
	title, 
	category,
	origin,
	brand,
	price, 
	onClick,
	onAddToCart,
	extraContent,
	topContent,
	clickableArea = 'card'
}) {
	// normaliza la categoria y revisa si es cafe
	const isCafe = String(category || '').toLowerCase() === 'cafes'
	const displayTitle = isCafe ? `Café ${title}` : title
	const metaLabel = isCafe ? (origin || '') : (brand || '')
	const numericPrice = typeof price === 'number' ? price : null
	let formattedPrice = ''
	if (numericPrice !== null) {
		formattedPrice = formatCurrency(numericPrice)
	}

	// en mobile evitamos el carrusel en cards para simplificar la interaccion y evita errores de usuario
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
	const hasCarouselImages = Array.isArray(images) && images.length > 1
	const fallbackImage = Array.isArray(images) && images.length > 0 ? images[0] : null

	return (
		<article
			className="pcb-card"
			onClick={clickableArea === 'card' ? onClick : undefined}
			role={onClick && clickableArea === 'card' ? 'button' : undefined}
		>
			<div
				className="pcb-media"
				onClick={clickableArea === 'media' ? onClick : undefined}
			>
				{hasCarouselImages && !isMobile ? (
					<ProductImageCarousel images={images} alt={title} />
				) : (
					fallbackImage && <img src={fallbackImage} alt={title} />
				)}
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
				{topContent && <div className="pcb-top-extra">{topContent}</div>}
				{metaLabel && <div className="pcb-meta">{metaLabel}</div>}
				<h3 className="pcb-title">{displayTitle}</h3>
				<div className="pcb-bottom">
					{formattedPrice && (
						<span className="pcb-price">
							{isCafe ? (
								<>
									<span className="pcb-price-prefix">A partir de</span>
									<span className="pcb-price-value">{formattedPrice}</span>
								</>
							) : (
								<span className="pcb-price-value">{formattedPrice}</span>
							)}
						</span>
					)}
				</div>
				{extraContent && <div className="pcb-extra">{extraContent}</div>}
				{onClick && (
					<button
						type="button"
						className="pcb-nav-btn"
						aria-label="Ver detalle del producto"
						onClick={(e) => {
							e.stopPropagation()
							if (typeof onClick === 'function') onClick()
						}}
					>
						<img
							src={arrowRight}
							alt=""
							aria-hidden="true"
							className="pcb-nav-icon"
						/>
					</button>
				)}
			</div>
		</article>
	)
}
