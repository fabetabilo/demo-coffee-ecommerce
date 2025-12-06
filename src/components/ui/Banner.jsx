	import React from 'react'
	import '../../css/Banner.css'
	import arrowRight from '../../assets/icon/arrow-right-line.svg'

/**
* Banner reutilizable con overlay. Por defecto, alinea el contenido cta al centro.
* Props:
* - src: string (ruta a video o imagen)
* - type: 'video' | 'image' (por defecto: 'image')
* - alt: string (para image)
* - poster: string (poster opcional para video)
* - className: string (clases extra). "left-side" alinea contenido del cta a la izquierda del banner, "section" para banner mas compacto
* - sectionTitle: string opcional (titulo de seccion grande esquina inferior izquierda), para no colocar nada usar un string vacio " " puede funcionar mejor
* - description: string opcional para la descripcion de alguna seccion, para no colocar descripcion, solo no incluirlo
* - ctaText: string opcional (mensaje centrado)
* - ctaTitle: string opcional (titulo encima del CTA centrado)
* - ctaGraphicSrc: string opcional (ruta a GIF o imagen sobre ctaTitle)
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
	sectionTitle,
	description,
	ctaText,
	ctaTitle,
	ctaGraphicSrc,
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
					{(sectionTitle || ctaText || ctaButtonText || ctaTitle) && (
						<div className="banner-overlay">
							{(ctaTitle || ctaText || ctaButtonText || ctaGraphicSrc) && (
								<div className="banner-cta"> 
									{ctaGraphicSrc && (
										<img className="banner-cta-graphic" src={ctaGraphicSrc} alt="" aria-hidden="true" />
									)}
									{ctaTitle && (
									  <div className="banner-cta-title">{ctaTitle}</div>
									)}
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
							{(sectionTitle || description) && (
								<div className="banner-title">
									{sectionTitle && <div className="banner-title-text">{sectionTitle}</div>}
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
