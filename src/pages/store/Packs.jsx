import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Banner from '../../components/ui/Banner'
import SectionGallery from '../../components/ui/SectionGallery'
import packsHero from '../../assets/img/sections/packs.jpg'
import '../../css/page.css'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'
import ProductService from '../../services/product.service'

function Packs() {
	const [packProducts, setPackProducts] = useState(null)
	const { goToProductDetail } = useProductDetailNavigation()

	useEffect(() => {
		let isMounted = true

		const fetchPacks = async () => {
			try {
				const packs = await ProductService.getAllPacks()
				if (!isMounted) return
				setPackProducts(Array.isArray(packs) ? packs : [])
			} catch (err) {
				if (!isMounted) return
				console.error('Error loading packs', err)
				setPackProducts([])
			}
		}

		fetchPacks()

		return () => {
			isMounted = false
		}
	}, [])

	const packs = useMemo(() => (
		Array.isArray(packProducts) ? packProducts : []
	), [packProducts])

	const handleCardClick = useCallback((product) => {
		if (!product) return
		goToProductDetail(product)
	}, [goToProductDetail])

	return (
		<main>
			<Banner
				type="image"
				src={packsHero}
				alt="packs"
				className="section"
				sectionTitle="PACKS"
				description="Combos y selecciones especiales para tu barra de café."
				darkOverlay
			/>
			<div className="main-container">
				<section className="page-section">
					{packs.length > 0 && (
						<SectionGallery items={packs} onCardClick={handleCardClick} />
					)}
					{packProducts != null && packs.length === 0 && (
						<p className="page-helper-text">No hay packs disponibles.</p>
					)}
				</section>
			</div>
		</main>
	)
}

export default Packs
