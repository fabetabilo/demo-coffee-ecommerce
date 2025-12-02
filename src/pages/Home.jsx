import React from 'react'
import bongoCat from '../assets/img/gif_o.gif'
import Banner from '../components/ui/Banner'

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
		</main>
	)
}

export default Home
