import React, { useMemo } from 'react'
import '../../css/ProductImageCarousel.css'
import arrowLeft from '../../assets/icon/arrow-left-s-line.svg'
import arrowRight from '../../assets/icon/arrow-right-s-line.svg'
import useCarouselSlide from '../../hooks/useCarouselSlide'

const sanitizeImages = (images) => {
	if (!Array.isArray(images)) return []
	return images
		.map((item) => {
			if (!item) return null
			if (typeof item === 'string') {
				return { src: item }
			}
			if (typeof item === 'object' && item.src) {
				return { src: item.src, alt: item.alt || '' }
			}
			return null
		})
		.filter(Boolean)
}

export default function ProductImageCarousel({ images = [], alt = 'imagenes de producto' }) {
	const slides = useMemo(() => {
		const normalized = sanitizeImages(images)
		return normalized.length > 0 ? normalized : []
	}, [images])

	const { trackRef, activeIndex, dots, scrollToIndex, goNext, goPrev } = useCarouselSlide({
		itemCount: slides.length,
		perView: 1
	})

	if (slides.length === 0) return null
	// para definir cuando NO es single image
	const isSingle = slides.length === 1

	return (
		<div className="pimg-carousel">
			{!isSingle && (
				<button type="button" className="pimg-nav pimg-nav--prev" aria-label="Imagen anterior" onClick={goPrev}>
					<img src={arrowLeft} alt="" aria-hidden="true" />
				</button>
			)}
			<div className="pimg-track" ref={trackRef}>
				{slides.map((slide, idx) => (
					<div className="pimg-slide" key={`${slide.src}-${idx}`}>
						<img src={slide.src} alt={slide.alt || alt} loading={idx === 0 ? 'eager' : 'lazy'} />
					</div>
				))}
			</div>
			{!isSingle && (
				<button type="button" className="pimg-nav pimg-nav--next" aria-label="Imagen siguiente" onClick={goNext}>
					<img src={arrowRight} alt="" aria-hidden="true" />
				</button>
			)}
			{!isSingle && (
				<div
					className="pimg-dots"
					role="tablist"
					aria-label="Imagenes del producto"
					onClick={(e) => e.stopPropagation()}
				>
					{Array.from({ length: dots }).map((_, idx) => (
						<button
							type="button"
							key={`dot-${idx}`}
							className={`pimg-dot ${idx === activeIndex ? 'active' : ''}`}
							aria-label={`Ver imagen ${idx + 1}`}
							aria-selected={idx === activeIndex}
							// evita clicks de error, por fuera de los dots
							onClick={(e) => {
								e.stopPropagation()
								scrollToIndex(idx)
							}}
						/>
					))}
				</div>
			)}
		</div>
	)
}
