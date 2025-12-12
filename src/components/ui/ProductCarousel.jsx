import React, { useMemo } from 'react'
import '../../css/ProductCarousel.css'
import ProductCardBase from './ProductCardBase'
import ProductCardCoffee from './ProductCardCoffee'
import arrowLeft from '../../assets/icon/arrow-left-s-line.svg'
import arrowRight from '../../assets/icon/arrow-right-s-line.svg'
import useCarouselSlide from '../../hooks/useCarouselSlide'
import useMinProductPrice from '../../hooks/useMinProductPrice'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'

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

	const getMinProductPrice = useMinProductPrice()
	const isCoffeeItem = (item) => String(item?.subcategory || item?.category || '').toLowerCase() === 'cafes'
	const { goToProductDetail } = useProductDetailNavigation()

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
							{isCoffeeItem(p) ? (
								<ProductCardCoffee product={p} />
							) : (
								<ProductCardBase
									image={p.image}
									images={Array.isArray(p.productImages) ? p.productImages : (p.image ? [p.image] : [])}
									title={p.name}
									category={p.subcategory || p.category}
									price={getMinProductPrice(p)}
									origin={p.origin}
									brand={p.brand}
									onClick={() => goToProductDetail(p)}
									clickableArea="media"
								/>
							)}
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
