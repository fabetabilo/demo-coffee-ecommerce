import React, { useMemo, useRef, useEffect, useState } from 'react'
import '../../css/ProductCarousel.css'
import ProductCardBase from './ProductCardBase'

export default function ProductCarousel({ items = [] }) {
    
	const trackRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const [progress, setProgress] = useState(0) // desktop: barra de progreso horizontal

	// mobile: hasta 2, desktop: hasta 5
	const viewportConfig = useMemo(() => {
		if (typeof window !== 'undefined' && window.innerWidth >= 767) {
			return { perView: Math.min(2, 5), gap: 16 }
		}
		return { perView: 2, gap: 12 }
	}, [])

	// solo en mobile, actualiza el index
	useEffect(() => {
		const el = trackRef.current
		if (!el) return
		const onScroll = () => {
			const { scrollLeft, clientWidth, scrollWidth } = el
			// mobile index
			const slideWidth = clientWidth / viewportConfig.perView
			const idx = Math.round(scrollLeft / slideWidth)
			setActiveIndex(idx)
			
			const max = Math.max(1, scrollWidth - clientWidth)
			const pct = Math.min(1, Math.max(0, scrollLeft / max))
			setProgress(pct)
		}
		el.addEventListener('scroll', onScroll, { passive: true })
		// inicializa 1 vez
		onScroll()
		return () => el.removeEventListener('scroll', onScroll)
	}, [viewportConfig.perView])

	// dots para mobile
	const dots = useMemo(() => {
		const total = items.length
		const perView = viewportConfig.perView
		return Math.max(1, total - perView + 1)
	}, [items.length, viewportConfig.perView])

	return (
		<div className="pcarousel">
			<div className="pcarousel-track" ref={trackRef}>
				{items.map((p) => (
					<div className="pcarousel-slide" key={p.id}>
						<ProductCardBase
							image={p.imagen}
							title={p.nombre}
							category={p.categoria}
							price={p.precio}
							origin={p.origen}
							brand={p.marca}
						/>
					</div>
				))}
			</div>
			<div className="pcarousel-dots">
				{Array.from({ length: dots }).map((_, i) => (
					<button
						key={i}
						className={`pcarousel-dot ${i === activeIndex ? 'active' : ''}`}
						aria-label={`Ir a posición ${i + 1}`}
						onClick={() => {
							const el = trackRef.current
							if (!el) return
							const slideWidth = el.clientWidth / viewportConfig.perView
							el.scrollTo({ left: i * slideWidth, behavior: 'smooth' })
						}}
					/>
				))}
			</div>
		</div>
	)
}
