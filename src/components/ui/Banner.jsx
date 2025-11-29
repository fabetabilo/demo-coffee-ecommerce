	import React from 'react'
	import '../../css/Banner.css'
	import arrowRight from '../../assets/icon/arrow-right-line.svg'

/**
* Banner reutilizable con overlay
* Props:
* - src: string (ruta a video o imagen)
* - type: 'video' | 'image' (por defecto: 'image')
* - alt: string (para image)
* - poster: string (poster opcional para video)
* - className: string (clases extra)
* - title: string opcional (titulo grande esquina inferior izquierda), para no colocar nada usar un string vacio " " puede funcionar mejor
* - description: string opcional para la descripcion de alguna seccion, para no colocar descripcion, solo no incluirlo
* - ctaText: string opcional (mensaje centrado)
* - ctaButtonText: string opcional (texto del boton)
* - onCtaClick: function opcional (callback del boton)
* - darkOverlay: boolean (oscurecer media bajo overlay)
*/
function Banner({
	src,
	type = 'image',
	alt = '',
	poster,
	className = '',
	title,
	description,
	ctaText,
	ctaButtonText,
	onCtaClick,
	darkOverlay = false,
}) {
	return (
		<section className={`banner ${className}`}>
			<div className={`banner-media ${darkOverlay ? 'banner-media-dark' : ''}`}>
				{type === 'video' ? (
					<video
						className="banner-el"
						src={src}
						poster={poster}
						autoPlay
						muted
						loop
						playsInline
					/>
					) : (
					<img className="banner-el" src={src} alt={alt} />
					)}
					{/* Overlay contenido */}
					{(title || ctaText || ctaButtonText) && (
						<div className="banner-overlay">
							{(ctaText || ctaButtonText) && (
								<div className="banner-cta"> 
									{ctaText && 
									<div className="banner-cta-text">
										{ctaText}
									</div>}
									{ctaButtonText && (
									<button className="banner-btn" type="button" onClick={onCtaClick}>
										<span className="banner-btn-text">{ctaButtonText}</span>
										<img className="banner-btn-icon" src={arrowRight} alt="" aria-hidden="true" />
									</button>
									)}
								</div>
							)}
							{(title || description) && (
								<div className="banner-title">
									{title && <div className="banner-title-text">{title}</div>}
									{description && <div className="banner-description">{description}</div>}
								</div>
							)}
						</div>
					)}
			</div>
		</section>
	)
}

export default Banner
