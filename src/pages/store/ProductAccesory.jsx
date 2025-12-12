import React, { useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { demoproducts } from '../../data/demo/demo-products'
import useTotalPrice from '../../hooks/useTotalPrice'
import ProductImageCarousel from '../../components/ui/ProductImageCarousel'
import '../../css/ProductAccesory.css'

const isAccessory = (product) => String(product?.category || '').toLowerCase() === 'accesorios'

function ProductAccesory() {
	const [searchParams] = useSearchParams()
	const location = useLocation()
	const stateProduct = location.state?.product
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

	const galleryImages = useMemo(() => {
		if (!product) return []
		const fromProduct = Array.isArray(product.productImages) ? product.productImages.filter(Boolean) : []
		if (fromProduct.length > 0) return fromProduct
		const legacy = Array.isArray(product.galleryImages) ? product.galleryImages.filter(Boolean) : []
		if (legacy.length > 0) return legacy
		return product.image ? [product.image] : []
	}, [product])

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
