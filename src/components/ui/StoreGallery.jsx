import React from 'react'
import StoreGalleryCard from './StoreGalleryCard'
import '../../css/StoreGallery.css'

function StoreGallery({ sections = [], className = '' }) {
	if (!sections.length) {
		return null
	}

	return (
		<section className={`store-gallery ${className}`.trim()}>
			<div className="store-gallery-grid">
				{sections.map((section) => (
					<StoreGalleryCard
						key={section.id || section.to || section.title}
						title={section.title}
						image={section.image}
						to={section.to}
						darkOverlay={Boolean(section.darkOverlay)}
					/>
				))}
			</div>
		</section>
	)
}

export default StoreGallery
