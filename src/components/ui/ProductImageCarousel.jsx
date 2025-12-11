import React, { useEffect, useMemo, useRef, useState } from 'react'
import '../../css/ProductImageCarousel.css'

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

	const trackRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return undefined

		const handleScroll = () => {
			const { scrollLeft, clientWidth } = track
			if (!clientWidth) return
			const idx = Math.round(scrollLeft / clientWidth)
			setActiveIndex((prev) => {
				const next = Math.max(0, Math.min(slides.length - 1, idx))
				return prev === next ? prev : next
			})
		}

		track.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => track.removeEventListener('scroll', handleScroll)
	}, [slides.length])

	const scrollToIndex = (index) => {
		const track = trackRef.current
		if (!track) return
		const clamped = Math.max(0, Math.min(slides.length - 1, index))
		track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
	}

	if (slides.length === 0) return null

	return (
		<div className="pimg-carousel">
			<div className="pimg-track" ref={trackRef}>
				{slides.map((slide, idx) => (
					<div className="pimg-slide" key={`${slide.src}-${idx}`}>
						<img src={slide.src} alt={slide.alt || alt} loading={idx === 0 ? 'eager' : 'lazy'} />
					</div>
				))}
			</div>
			<div className="pimg-dots" role="tablist" aria-label="Imagenes del producto">
				{slides.map((_, idx) => (
					<button
						type="button"
						key={`dot-${idx}`}
						className={`pimg-dot ${idx === activeIndex ? 'active' : ''}`}
						aria-label={`Ver imagen ${idx + 1}`}
						aria-selected={idx === activeIndex}
						onClick={() => scrollToIndex(idx)}
					/>
				))}
			</div>
		</div>
	)
}
