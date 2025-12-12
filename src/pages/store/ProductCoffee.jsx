import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useTotalPrice from '../../hooks/useTotalPrice'
import ProductImageCarousel from '../../components/ui/ProductImageCarousel'
import RoastLevel from '../../components/ui/RoastLevel'
import useRouteProduct from '../../hooks/useRouteProduct'
import useGalleryImages from '../../hooks/useGalleryImages'
import '../../css/ProductCoffee.css'

const grindOptions = [
	{ id: 'grano', label: 'Grano' },
	{ id: 'molido', label: 'Molido' }
]

function isCoffee(product) {
	return String(product?.category || '').toLowerCase() === 'cafes'
}

function ProductCoffee() {
	const location = useLocation()
	const selectedFormatFromState = location.state?.selectedFormatId ?? null
	const [selectedWeightId, setSelectedWeightId] = useState(selectedFormatFromState)
	const [selectedGrind, setSelectedGrind] = useState(grindOptions[0].id)
	const [quantity, setQuantity] = useState(1)

	// para la eleccion de formato
	useEffect(() => {
		setSelectedWeightId(selectedFormatFromState)
	}, [selectedFormatFromState])

	const product = useRouteProduct('cafes')

	// formatos de peso derivados desde el producto
	const weightOptions = useMemo(() => {
		if (!product) return []
		if (Array.isArray(product.formats) && product.formats.length > 0) {
			return product.formats
		}
		// fallback para productos sin formats/formatos definidos
		return [
			{
				id: 'default',
				label: '250G',
				grams: 250,
				price: product.price,
				available: true
			}
		]
	}, [product])

	// formato actualmente seleccionado (o primero disponible)
	const currentWeight = useMemo(() => {
		if (!weightOptions.length) return null
		if (!selectedWeightId) {
			return weightOptions.find((w) => w.available !== false) || weightOptions[0]
		}
		return weightOptions.find((w) => w.id === selectedWeightId) || weightOptions[0]
	}, [weightOptions, selectedWeightId])

	const { formattedUnit: unitPriceLabel, formattedTotal: totalPriceLabel } = useTotalPrice({
		unitPrice: currentWeight?.price ?? product?.price ?? 0,
		quantity
	})

	const galleryImages = useGalleryImages(product)

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
	const priceLabel = unitPriceLabel

	return (
		<main>
			<div className="nav-bg"></div>
			<div className="main-product-container">
				<div className="product-layout">
					<section className="product-hero" aria-labelledby="product-title">
						<div className="product-hero-frame">
							<ProductImageCarousel images={galleryImages} alt={product.name} />
						</div>
					</section>
					<section className="product-detail" aria-live="polite">
						<div className="product-meta">
							{coffeeProduct && product.origin && (
								<span className="product-meta-pill">{product.origin}</span>
							)}
							{coffeeProduct && product.process && (
								<span className="product-meta-pill">{product.process}</span>
							)}
						</div>
						<h1 id="product-title" className="product-title">
							{product.name}
						</h1>
						<p className="product-price">{priceLabel}</p>

						{coffeeProduct && roastLevel > 0 && (
							<RoastLevel level={roastLevel} max={7} />
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
									const isSelected = currentWeight ? option.id === currentWeight.id : false
									const isAvailable = option.available !== false
									return (
										<button
											type="button"
											key={option.id}
											className={`option-btn ${isSelected ? 'selected' : ''} ${!isAvailable ? 'option-unavailable' : ''}`.trim()}
											onClick={() => {
												if (!isAvailable) return
												setSelectedWeightId(option.id)
											}}
											aria-pressed={isSelected}
											disabled={!isAvailable}
										>
											{option.label}
											{!isAvailable && <span className="option-unavailable-text"></span>}
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
								Agregar al carrito {totalPriceLabel ? `- ${totalPriceLabel}` : ''}
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

