import React, { useEffect, useState } from 'react'
import bongoCat from '../assets/img/gif_o.gif'
import Banner from '../components/ui/Banner'
import ProductCarousel from '../components/ui/ProductCarousel'
import RecommendationQuiz from '../components/ui/RecommendationQuiz'
import ProductService from '../services/product.service'
import '../css/page.css'

function Home() {

	// !!! TEMPORAL: el manejo de productos destacados se hara mas adelante.
	const [featuredProducts, setFeaturedProducts] = useState(null)

	useEffect(() => {
		let isMounted = true
		const fetchFeaturedProducts = async () => {
			try {
				const [coffees, accessories] = await Promise.all([
					ProductService.getAllCoffees(),
					ProductService.getAllAccessories()
				])
				if (!isMounted) return
				const combined = [...(coffees ?? []), ...(accessories ?? [])]
				setFeaturedProducts(combined.slice(0, 12)) 
			} catch (err) {
				if (!isMounted) return
				console.error('Error loading featured products', err)
				setFeaturedProducts([])
			}
		}

		fetchFeaturedProducts()

		return () => {
			isMounted = false
		}
	}, [])

	const hasFeaturedProducts = Array.isArray(featuredProducts) && featuredProducts.length > 0
	const showEmptyState = Array.isArray(featuredProducts) && !hasFeaturedProducts

	return (
		<main>
			<Banner 
				type="video"
				src="/vid/bean1.mp4" 
				ctaGraphicSrc={bongoCat}
				ctaText="Siempre hay alguien obsesionado con el Café. Esos somos nosotros. Estamos para ayudarte a transformar tu café y tu casa en la cafetería que soñaste."
				ctaButtonText="VER MÁS"  
				onCtaClick={() => console.log('se hizo click')}
				sectionTitle=" "
				darkOverlay
			/>
			<div className="main-container">
				<section className="page-section">
					<h2 className="page-heading">Productos destacados</h2>
					<div className="page-heading-grip" />
					{hasFeaturedProducts && (
						<ProductCarousel items={featuredProducts} />
					)}
					{showEmptyState && (
						<p className="page-helper-text">No hay productos para mostrar.</p>
					)}
				</section>
			</div>
				<RecommendationQuiz />
		</main>
	)
}

export default Home
