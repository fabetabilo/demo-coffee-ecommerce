import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/QuizResult.css'
import ProductImageCarousel from '../components/ui/ProductImageCarousel'
import RoastLevel from '../components/ui/RoastLevel'
import ProductCardCoffee from '../components/ui/ProductCardCoffee'
import Button from '../components/ui/Button'
import useGalleryImages from '../hooks/useGalleryImages'
import useMinProductPrice from '../hooks/useMinProductPrice'
import { getProductDetailPath } from '../hooks/useProductDetailNavigation'
import formatCurrency from '../utils/formatCurrency'

const buildDescriptorText = (product) => {
	if (!product) return ''
	const descriptors = Array.isArray(product.descriptors) ? product.descriptors : []
	return descriptors
		.map((descriptor) => String(descriptor || '').trim())
		.filter(Boolean)
		.map((descriptor) => descriptor.toUpperCase())
		.join(', ')
}

const buildDetailPath = (product) => {
	if (!product) return null
	const basePath = getProductDetailPath(product)
	const params = new URLSearchParams()
	if (product.id) params.set('id', product.id)
	const queryString = params.toString()
	return `${basePath}${queryString ? `?${queryString}` : ''}`
}

function QuizResult() {

	const navigate = useNavigate()
	const location = useLocation()
	const productsFromState = location.state?.products
	const products = Array.isArray(productsFromState) ? productsFromState : []
	const mainProduct = products.length > 0 ? products[0] : null
	const galleryImages = useGalleryImages(mainProduct)
	const getMinProductPrice = useMinProductPrice()
	const descriptorText = useMemo(() => buildDescriptorText(mainProduct), [mainProduct])
	const roastLevel = Number(mainProduct?.roastLevel || 0)
	const additionalProducts = products.length > 1 ? products.slice(1, 3) : []

	const priceLabel = useMemo(() => {
		if (!mainProduct) return ''
		const minPrice = getMinProductPrice(mainProduct)
		if (minPrice == null) return ''
		return formatCurrency(minPrice)
	}, [getMinProductPrice, mainProduct])

	const detailPath = useMemo(() => buildDetailPath(mainProduct), [mainProduct])

	const handleViewAll = () => {
		navigate('/tienda/cafe')
	}

	const handlePrimaryCta = () => {
		if (detailPath) {
			navigate(detailPath, { state: { product: mainProduct } })
		}
	}

	// !!!!temporal
	if (!mainProduct) {
		return (
			<section className="quiz-result quiz-result-empty">
				<div className="quiz-result-empty-card">
					<p className="quiz-result-empty-title">Aún no tenemos una recomendación lista.</p>
					<p className="quiz-result-empty-text">Responde el quiz para descubrir tu próximo café favorito.</p>
				</div>
			</section>
		)
	}

	const metaPills = [mainProduct.origin, mainProduct.process].filter(Boolean)

	return (
		<section className="quiz-result" aria-live="polite">
			<div className="nav-bg"></div>
			<div className="quiz-result-head">
				<h2 className="quiz-result-title">Encontramos un Café <br />que creemos que te encantará</h2>
				<p className="quiz-result-subtitle">...es excepcional, tal como <strong>tú</strong>.</p>
				<p className="quiz-result-banner">Usa el código <span>FAVORITO10</span> en tu primera compra para obtener un 10% de descuento.
				</p>
			</div>
			<div className="quiz-result-product main-product-container">
				<div className="product-layout">
					<section className="product-hero" aria-labelledby="quiz-result-product-title">
						<div className="product-hero-frame">
							<ProductImageCarousel images={galleryImages} alt={mainProduct.name || 'Café recomendado'} />
						</div>
					</section>
					<section className="product-detail" aria-live="polite">
						{metaPills.length > 0 && (
							<div className="product-meta">
								{metaPills.map((pill) => (
									<span key={pill} className="product-meta-pill">{pill}</span>
								))}
							</div>
						)}
						<h3 id="quiz-result-product-title" className="product-title">
							{mainProduct.name}
						</h3>
						{priceLabel && <p className="product-price">Desde {priceLabel}</p>}
						{roastLevel > 0 && <RoastLevel level={roastLevel} max={7} />}
						<hr className="product-divider" />
						{descriptorText && <p className="product-descriptors"><strong>{descriptorText}</strong></p>}
						{mainProduct.description && (
							<p className="product-description">{mainProduct.description}</p>
						)}
						<div className="product-important">
							<p className="product-important-title">Notas:</p>
							<ul className="product-important-list">
								<li>Los formatos de 1kg están disponibles sólo en grano entero.</li>
								<li>Los formatos de 250g están disponibles en diferentes formatos de molido.</li>
								<li>Los formatos de 120g y microlotes están disponibles sólo en grano entero.</li>
							</ul>
						</div>
						<div className="quiz-result-cta-wrapper">
							{detailPath && (
								<button type="button" className="primary-cta quiz-result-cta" onClick={handlePrimaryCta}>
									Comprar opciones
								</button>
							)}
						</div>
					</section>
				</div>
			</div>
			<section className="quiz-result-suggestions" aria-label="Explora más cafés">
				<div className="quiz-result-suggestions-head">
					<h3>O quizás prefieras uno de estos</h3>
				</div>
				{additionalProducts.length > 0 && (
					<div className="quiz-result-cards">
						{additionalProducts.map((product) => (
							<div className="quiz-result-card" key={product.id || product.name}>
								<ProductCardCoffee product={product} showAddToCart={false}/>
							</div>
						))}
					</div>
				)}
				<div className="quiz-result-view-all-wrapper">
					<Button label="Ver todos los cafés" onClick={handleViewAll} className="button-solid quiz-start-button quiz-result-view-all"/>
				</div>
			</section>
		</section>
	)
}

export default QuizResult
