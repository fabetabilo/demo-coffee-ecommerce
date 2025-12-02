import React from 'react'
import Banner from '../components/ui/Banner'

function Home() {
	return (
		<main>
			<Banner 
				type="video"
				src="/vid/bean1.mp4" 
				ctaText="Sorpréndete con nuestros diferentes orígenes. Sólo hasta acabar stock. Este es un call-to-action."
				ctaButtonText="VER MÁS"  
				onCtaClick={() => console.log('se hizo click')}
				title=" "
				darkOverlay
			/>
		</main>
	)
}

export default Home
