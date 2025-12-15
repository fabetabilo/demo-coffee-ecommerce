import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useTotalPrice from '../../hooks/useTotalPrice'
import ProductImageCarousel from '../../components/ui/ProductImageCarousel'
import useRouteProduct from '../../hooks/useRouteProduct'
import useGalleryImages from '../../hooks/useGalleryImages'
import '../../css/ProductAccesory.css'

const isAccessory = (product) => String(product?.category || '').toLowerCase() === 'accesorios'

function ProductAccesory() {
	const [quantity, setQuantity] = useState(1)

	const { product } = useRouteProduct('accesorios')
	const galleryImages = useGalleryImages(product)

	const { formattedUnit: unitPriceLabel, formattedTotal: totalPriceLabel } = useTotalPrice({
		unitPrice: product?.price ?? 0,
		quantity
	})

	const handleQuantityChange = (delta) => {
		setQuantity((prev) => Math.max(1, prev + delta))
	}

	if (!product || !isAccessory(product)) {
		return (
			<main className="product-page">
				<section className="product-empty">
					<p className="product-empty-title">Producto no disponible</p>
					<p className="product-empty-text">Revisa otros accesorios en nuestra tienda.</p>
					<Link className="product-back-link" to="/tienda/accesorios">Volver a accesorios</Link>
				</section>
			</main>
		)
	}

	const metaBrand = product.brand ? product.brand.toUpperCase() : ''
	const metaCategory = product.subcategory ? product.subcategory.toUpperCase() : ''

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
							{metaBrand && <span className="product-meta-pill">{metaBrand}</span>}
							{metaCategory && <span className="product-meta-pill">{metaCategory}</span>}
						</div>
						<h1 id="product-title" className="product-title">
							{product.name}
						</h1>
						<p className="product-price">{unitPriceLabel}</p>

                        <hr className="product-divider" />

						{product.description && (
							<p className="product-description">{product.description}</p>
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

export default ProductAccesory
