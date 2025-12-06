import React from 'react'
import { Link } from 'react-router-dom'
import arrowRight from '../../assets/icon/arrow-right-s-line.svg'
import '../../css/StoreGallery.css'

function StoreGalleryCard({
	title,
	image,
	to = '#',
	darkOverlay = false,
}) {
	return (
		<Link to={to} className="store-card">
			<img className="store-card-img" src={image} alt={title} loading="lazy" />
			{darkOverlay && <span className="store-card-darklayer" aria-hidden="true" />}
			<span className="store-card-gradient" aria-hidden="true" />
			<div className="store-card-footer">
				<span className="store-card-divider" aria-hidden="true" />
				<div className="store-card-bottom">
					<span className="store-card-title">{title}</span>
					<span className="store-card-cta" aria-hidden="true">
						<img className="store-card-cta-icon" src={arrowRight} alt="" />
					</span>
				</div>
			</div>
		</Link>
	)
}

export default StoreGalleryCard
