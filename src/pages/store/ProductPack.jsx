import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useTotalPrice from '../../hooks/useTotalPrice'
import ProductImageCarousel from '../../components/ui/ProductImageCarousel'
import useRouteProduct from '../../hooks/useRouteProduct'
import useGalleryImages from '../../hooks/useGalleryImages'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'
import '../../css/ProductPack.css'

const isPack = (product) => String(product?.category || '').toLowerCase() === 'packs'

function ProductPack() {
	const [quantity, setQuantity] = useState(1)

	const { product } = useRouteProduct('packs')
	const galleryImages = useGalleryImages(product)
	const { goToProductDetail } = useProductDetailNavigation()

	const { formattedUnit: unitPriceLabel, formattedTotal: totalPriceLabel } = useTotalPrice({
		unitPrice: product?.price ?? 0,
		quantity
	})

	const handleQuantityChange = (delta) => {
		setQuantity((prev) => Math.max(1, prev + delta))
	}

	const items = useMemo(
		() => (Array.isArray(product?.items) ? product.items : []),
		[product]
	)

	const handleItemClick = (originalCoffeeId) => {
		if (!originalCoffeeId) return
		goToProductDetail({ id: originalCoffeeId, category: 'cafes' }, { attachProductState: false })
	}

	if (!product || !isPack(product)) {
		return (
			<main className="product-page">
				<section className="product-empty">
					<p className="product-empty-title">Pack no disponible</p>
					<p className="product-empty-text">Revisa otros packs en nuestra tienda.</p>
					<Link className="product-back-link" to="/tienda/packs">Volver a packs</Link>
				</section>
			</main>
		)
	}

	const metaLabel = product.subtitle ? String(product.subtitle).toUpperCase() : ''

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
							{metaLabel && <span className="product-meta-pill">{metaLabel}</span>}
						</div>
						<h1 id="product-title" className="product-title">
							{product.name}
						</h1>
						<p className="product-price">{unitPriceLabel}</p>

						<hr className="product-divider" />

						{product.description && (
							<p className="product-description">{product.description}</p>
						)}

						{product.packDescription && (
							<p className="product-description">{product.packDescription}</p>
						)}

						{product.additionalDescription && (
							<p className="product-description">{product.additionalDescription}</p>
						)}

						{items.length > 0 && (
							<div className="product-pack-items">
								<p className="product-option-label">Contenido</p>
								<ul className="product-pack-items-list">
									{items.map((item, index) => {
										const hasCoffeeLink = Boolean(item.originalCoffeeId)
										return (
											<li key={index} className="product-pack-item">
												{item.label && (
													<span className="product-pack-item-label">{item.label}</span>
												)}
												{hasCoffeeLink ? (
													<button
														type="button"
														className="product-pack-item-link"
														onClick={() => handleItemClick(item.originalCoffeeId)}
													>
														{item.name}
													</button>
												) : (
													<span className="product-pack-item-name">{item.name}</span>
												)}
												{item.process && (
													<span className="product-pack-item-process"> — {item.process}</span>
												)}
											</li>
										)
									})}
								</ul>
							</div>
						)}

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
		</main>
	)
}

export default ProductPack
