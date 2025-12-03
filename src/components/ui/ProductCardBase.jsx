import React from 'react'
import '../../css/ProductCardBase.css'

function formatCLP(value) {
	if (typeof value !== 'number') return value
	return `$${value.toLocaleString('es-CL')}`
}

/**
 * ProductCardBase
 * Props:
 * - image: src de la imagen del producto
 * - title: nombre del producto
 * - price: numero (CLP)
 * - metaLabel: string (origen si es cafe, o marca si no)
 * - onClick: handler opcional
 */
export default function ProductCardBase({ 
	image, 
	title, 
	price, 
	metaLabel, 
	onClick 
}) {
	return (
		<article className="pcb-card" onClick={onClick} role={onClick ? 'button' : undefined}>
			<div className="pcb-media">
				{image && <img src={image} alt={title} />}
			</div>
			<div className="pcb-body">
				{metaLabel && <div className="pcb-meta">{metaLabel}</div>}
				<h3 className="pcb-title">Café {title}</h3>
				<div className="pcb-bottom">
					<span className="pcb-price">{formatCLP(price)}</span>
				</div>
			</div>
		</article>
	)
}
