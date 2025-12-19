import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useTotalPrice from '../../hooks/useTotalPrice'
import ProductImageCarousel from '../../components/ui/ProductImageCarousel'
import RoastLevel from '../../components/ui/RoastLevel'
import SuitableForCard from '../../components/ui/SuitableForCard'
import useRouteProduct from '../../hooks/useRouteProduct'
import useGalleryImages from '../../hooks/useGalleryImages'
import '../../css/ProductCoffee.css'

const grindOptions = [
	{ id: 'grano', label: 'Grano' },
	{ id: 'molido', label: 'Molido' }
]

function ProductCoffee() {

	const location = useLocation()
	const preselectedFormatId = location.state?.selectedFormatId ?? null
	const [selectedFormatId, setSelectedFormatId] = useState(preselectedFormatId)
	const [selectedGrind, setSelectedGrind] = useState(grindOptions[0].id)
	const [quantity, setQuantity] = useState(1)

	const { product } = useRouteProduct('cafes')

	const formats = useMemo(() => (
		Array.isArray(product?.formats) ? product.formats : []
	), [product])

	// revisa el formato 
	const currentFormat = useMemo(() => {
		if (!formats.length) return null
		const match = selectedFormatId 
            ? formats.find(f => f.id === selectedFormatId && f.available !== false) : null
        // Retornamos match O el primero disponible O el primero de la lista
        return match ?? formats.find(f => f.available !== false) ?? formats[0]
    }, [formats, selectedFormatId])

	// actualiza el currentFormat si difiere del formato visual
	useEffect(() => {
        if (currentFormat && currentFormat.id !== selectedFormatId) {
            setSelectedFormatId(currentFormat.id)
        }
    }, [currentFormat, selectedFormatId])

	const { formattedUnit: unitPriceLabel, formattedTotal: totalPriceLabel } = useTotalPrice({
		unitPrice: currentFormat?.price ?? product?.price ?? 0,
		quantity
	})

	const galleryImages = useGalleryImages(product)
	// maneja internamente el caso sin product
	const descriptorText = useMemo(() => {
		const descriptors = Array.isArray(product?.descriptors) ? product.descriptors : []
		return descriptors
			.map((descriptor) => String(descriptor || '').trim())
			.filter(Boolean)
			.map((descriptor) => descriptor.toUpperCase())
			.join(', ')
	}, [product])

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

	const roastLevel = Number(product.roastLevel || 0)

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
							{product.origin && (
								<span className="product-meta-pill">{product.origin}</span>
							)}
							{product.process && (
								<span className="product-meta-pill">{product.process}</span>
							)}
						</div>
						<h1 id="product-title" className="product-title">
							{product.name}
						</h1>
						<p className="product-price">{unitPriceLabel}</p>

						{roastLevel > 0 && (
							<RoastLevel level={roastLevel} max={7} />
						)}

						<hr className="product-divider" />

						{descriptorText && (
							<p className="product-descriptors">{descriptorText}</p>
						)}

						{product.description && (
							<p className="product-description">{product.description}</p>
						)}

						<SuitableForCard methods={product.suitableMethods} />

						<div className="product-option-group">
							<p className="product-option-label">Formato</p>
							<div className="product-option-buttons">
								{formats.map((option) => {
									const isAvailable = option.available !== false
									const isSelected = currentFormat ? option.id === currentFormat.id : false
									const className = ['option-btn', isSelected && 'selected', !isAvailable && 'option-unavailable']
										.filter(Boolean)
										.join(' ')
									return (
										<button
											type="button"
											key={option.id}
											className={className}
											onClick={() => {
												if (!isAvailable) return
												setSelectedFormatId(option.id)
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

