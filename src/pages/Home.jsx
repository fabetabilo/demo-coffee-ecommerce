import React from 'react'
import bongoCat from '../assets/img/gif_o.gif'
import Banner from '../components/ui/Banner'
import ProductCarousel from '../components/ui/ProductCarousel'
import { demoproducts } from '../data/demo/demo-products'
import '../css/page.css'

function Home() {
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
					<ProductCarousel items={demoproducts} />
				</section>
			</div>

		</main>
	)
}

export default Home
