import React, { useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { demoproducts } from '../../data/demo/demo-products'
import '../../css/ProductCoffee.css'

const clpFormatter = new Intl.NumberFormat('es-CL', {
	style: 'currency',
	currency: 'CLP',
	maximumFractionDigits: 0
})

const formatCLP = (value) => {
	if (typeof value !== 'number') return ''
	return clpFormatter.format(value)
}

const weightOptions = [
	{ id: '250g', label: '250G' },
	{ id: '1kg', label: '1KG' }
]

const grindOptions = [
	{ id: 'grano', label: 'Grano' },
	{ id: 'molido', label: 'Molido' }
]

function isCoffee(product) {
	return String(product?.categoria || '').toLowerCase() === 'cafes'
}

function ProductCoffee() {
	const [searchParams] = useSearchParams()
	const location = useLocation()
	const stateProduct = location.state?.product
	const [selectedWeight, setSelectedWeight] = useState(weightOptions[0].id)
	const [selectedGrind, setSelectedGrind] = useState(grindOptions[0].id)
	const [quantity, setQuantity] = useState(1)

	const productId = useMemo(() => {
		const idFromQuery = Number(searchParams.get('id'))
		if (!Number.isNaN(idFromQuery) && idFromQuery > 0) return idFromQuery
		return stateProduct?.id ?? null
	}, [searchParams, stateProduct?.id])

	const product = useMemo(() => {
		if (!productId && stateProduct) return stateProduct
		if (stateProduct && stateProduct.id === productId) return stateProduct
		return demoproducts.find((item) => item.id === productId)
	}, [productId, stateProduct])

	const handleQuantityChange = (delta) => {
		setQuantity((prev) => Math.max(1, prev + delta))
	}

	if (!product) {
		return (
			<main className="product-page">
				<section className="product-empty">
					<p className="product-empty-title">Producto no disponible</p>
					<p className="product-empty-text">Revisa otros productos en nuestra tienda.</p>
					<Link className="product-back-link" to="/tienda">Volver a la tienda</Link>
				</section>
			</main>
		)
	}

	const coffeeProduct = isCoffee(product)
	const descriptorList = Array.isArray(product.descriptors) ? product.descriptors : []
	const roastLevel = coffeeProduct ? Number(product.roastLevel || 0) : 0
	const priceLabel = formatCLP(product.precio)

	return (
		<main>
			<div className="nav-bg"></div>
			<div className="main-product-container">
				<div className="product-layout">
					<section className="product-hero" aria-labelledby="product-title">
						<div className="product-hero-frame">
							<img src={product.imagen} alt="prod" loading="lazy" />
						</div>
					</section>
					<section className="product-detail" aria-live="polite">
						<div className="product-meta">
							{coffeeProduct && product.origen && (
								<span className="product-meta-pill">{product.origen}</span>
							)}
							{coffeeProduct && product.proceso && (
								<span className="product-meta-pill">{product.proceso}</span>
							)}
						</div>
						<h1 id="product-title" className="product-title">
							{product.nombre}
						</h1>
						<p className="product-price">{priceLabel}</p>

						{coffeeProduct && roastLevel > 0 && (
							<div className="product-roast">
								<div className="product-roast-head">
									<span className="product-roast-label">Tueste</span>
									<span className="product-roast-value">{roastLevel}/7</span>
								</div>
								<div className="product-roast-scale" role="img" aria-label={`Nivel de tueste ${roastLevel} de 7`}>
									{Array.from({ length: 7 }).map((_, index) => {
										const active = index < roastLevel
										return <span key={`roast-${index}`} className={`roast-dot ${active ? 'active' : ''}`} />
									})}
								</div>
							</div>
						)}

						<hr className="product-divider" />

						{descriptorList.length > 0 && (
							<p className="product-descriptors">
								{descriptorList.map((descriptor, index) => {
									const text = String(descriptor || '').trim()
									if (!text) return null
									return (
										<span key={`${descriptor}-${index}`}>
											{text.toUpperCase()}
											{index < descriptorList.length - 1 ? ', ' : ''}
										</span>
									)
								})}
							</p>
						)}

						{product.description && (
							<p className="product-description">{product.description}</p>
						)}

						<div className="product-option-group">
							<p className="product-option-label">Formato</p>
							<div className="product-option-buttons">
								{weightOptions.map((option) => {
									const isSelected = option.id === selectedWeight
									return (
										<button
											type="button"
											key={option.id}
											className={`option-btn ${isSelected ? 'selected' : ''}`}
											onClick={() => setSelectedWeight(option.id)}
											aria-pressed={isSelected}
										>
											{option.label}
										</button>
									)
								})}
							</div>
						</div>

						<div className="product-option-group">
							<p className="product-option-label">Molienda</p>
							<div className="product-option-buttons">
								{grindOptions.map((option) => {
									const isSelected = option.id === selectedGrind
									return (
										<button
											type="button"
											key={option.id}
											className={`option-btn ${isSelected ? 'selected' : ''}`}
											onClick={() => setSelectedGrind(option.id)}
											aria-pressed={isSelected}
										>
											{option.label}
										</button>
									)
								})}
							</div>
						</div>

						<div className="product-option-group">
							<p className="product-option-label">Cantidad</p>
							<div className="product-quantity">
								<button
									type="button"
									className="qty-btn"
									onClick={() => handleQuantityChange(-1)}
									aria-label="Disminuir cantidad"
									disabled={quantity === 1}
								>
									-
								</button>
								<span className="qty-value" aria-live="polite">{quantity}</span>
								<button
									type="button"
									className="qty-btn"
									onClick={() => handleQuantityChange(1)}
									aria-label="Aumentar cantidad"
								>
									+
								</button>
							</div>
						</div>

						<div className="product-actions">
							<button type="button" className="primary-cta">
								Agregar al carrito {priceLabel ? `- ${priceLabel}` : ''}
							</button>
							<button type="button" className="secondary-cta">Comprar ahora</button>
						</div>
					</section>
				</div>
			</div>
			<div>
				<h2>detalles</h2>
			</div>
		</main>
	)
}

export default ProductCoffee

