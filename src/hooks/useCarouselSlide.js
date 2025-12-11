import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/** Hook generico para manejar el slide de carruseles horizontales
 - itemCount: numero total de items
 - perView: cuantos items se muestran a la vez
// Devuelve:
- trackRef: ref para el contenedor con scroll horizontal
- activeIndex: indice de la posicion actual (0..dots - 1)
- dots: cantidad de posiciones posibles (para los indicadores)
- scrollToIndex: funcion para ir a una posicion especifica
- goNext / goPrev: helpers para ir al siguiente / anterior
*/
export default function useCarouselSlide({ itemCount = 0, perView = 1 } = {}) {
	const trackRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const [progress, setProgress] = useState(0)

	const safePerView = Math.max(1, Number(perView) || 1)
	const totalItems = Math.max(0, Number(itemCount) || 0)

	// cantidad de posiciones que puede tomar el carrusel
	const dots = useMemo(() => {
		if (totalItems === 0) return 0
		return Math.max(1, totalItems - safePerView + 1)
	}, [totalItems, safePerView])

	// sincroniza el indice activo y el progreso cuando se hace scroll
	useEffect(() => {
		const el = trackRef.current
		if (!el) return undefined

		const onScroll = () => {
			const { scrollLeft, clientWidth, scrollWidth } = el
			if (!clientWidth) return

			const slideWidth = clientWidth / safePerView
			const idx = slideWidth > 0 ? Math.round(scrollLeft / slideWidth) : 0
			setActiveIndex((prev) => {
				const maxIndex = Math.max(0, dots - 1)
				const next = Math.max(0, Math.min(idx, maxIndex))
				return prev === next ? prev : next
			})

			const maxScroll = Math.max(1, scrollWidth - clientWidth)
			const pct = Math.min(1, Math.max(0, scrollLeft / maxScroll))
			setProgress(pct)
		}

		el.addEventListener('scroll', onScroll, { passive: true })
		// inicializa una vez
		onScroll()

		return () => el.removeEventListener('scroll', onScroll)
	}, [safePerView, dots])

	const scrollToIndex = useCallback(
		(index) => {
			const el = trackRef.current
			if (!el || dots === 0) return
			const clamped = Math.max(0, Math.min(index, dots - 1))
			const slideWidth = el.clientWidth / safePerView
			el.scrollTo({ left: clamped * slideWidth, behavior: 'smooth' })
		},
		[dots, safePerView]
	)

	const goNext = useCallback(() => {
		if (dots === 0) return
		const next = (activeIndex + 1) % dots
		scrollToIndex(next)
	}, [activeIndex, dots, scrollToIndex])

	const goPrev = useCallback(() => {
		if (dots === 0) return
		const prev = (activeIndex - 1 + dots) % dots
		scrollToIndex(prev)
	}, [activeIndex, dots, scrollToIndex])

	return {
		trackRef,
		activeIndex,
		progress,
		dots,
		scrollToIndex,
		goNext,
		goPrev
	}
}

