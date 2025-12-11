import React, { useMemo } from 'react'
import '../../css/ProductCarousel.css'
import ProductCardBase from './ProductCardBase'
import arrowLeft from '../../assets/icon/arrow-left-s-line.svg'
import arrowRight from '../../assets/icon/arrow-right-s-line.svg'
import useCarouselSlide from '../../hooks/useCarouselSlide'

export default function ProductCarousel({ items = [] }) {
	// mobile: hasta 2, desktop: hasta 5
	const viewportConfig = useMemo(() => {
		if (typeof window !== 'undefined' && window.innerWidth >= 767) {
			return { perView: 4, gap: 16 }
		}
		return { perView: 2, gap: 12 }
	}, [])

	const { trackRef, activeIndex, dots, scrollToIndex, goNext, goPrev } = useCarouselSlide({
		itemCount: items.length,
		perView: viewportConfig.perView
	})

	return (
		<div className="pcarousel">
			<div className="pcarousel-inner">
				<button
					className="pcarousel-nav pcarousel-nav--prev"
					aria-label="Anterior"
					onClick={goPrev}
				>
					<img src={arrowLeft} alt="" aria-hidden="true" />
				</button>

				<div className="pcarousel-track" ref={trackRef}>
					{items.map((p) => (
						<div className="pcarousel-slide" key={p.id}>
							<ProductCardBase
								image={p.imagen}
								title={p.nombre}
								category={p.subcategoria || p.categoria}	// !!!! TEMPORAAL
								price={p.precio}
								origin={p.origen}
								brand={p.marca}
							/>
						</div>
					))}
				</div>

				<button
					className="pcarousel-nav pcarousel-nav--next"
					aria-label="Siguiente"
					onClick={goNext}
				>
					<img src={arrowRight} alt="" aria-hidden="true" />
				</button>
			</div>

			<div className="pcarousel-dots">
				{Array.from({ length: dots }).map((_, i) => (
					<button
						key={i}
						className={`pcarousel-dot ${i === activeIndex ? 'active' : ''}`}
						aria-label={`Ir a posición ${i + 1}`}
						onClick={() => scrollToIndex(i)}
					/>
				))}
			</div>
		</div>
	)
}
