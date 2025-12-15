import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Banner from '../../components/ui/Banner'
import SectionGallery from '../../components/ui/SectionGallery'
import accesoriesHero from '../../assets/img/sections/accesorios.jpg'
import '../../css/page.css'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'
import ProductService from '../../services/product.service'

function Accesories() {

    const [accessoryProducts, setAccessoryProducts] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchAccessories = async () => {
            try {
                const accessories = await ProductService.getAllAccessories()
                if (!isMounted) return
                setAccessoryProducts(Array.isArray(accessories) ? accessories : [])
            } catch (err) {
                if (!isMounted) return
                console.error('Error loading accessories', err)
                setAccessoryProducts([])
            }
        }

        fetchAccessories()

        return () => {
            isMounted = false
        }
    }, [])

    const accessories = useMemo(() => (
        Array.isArray(accessoryProducts) ? accessoryProducts : []
    ), [accessoryProducts])

    const { goToProductDetail } = useProductDetailNavigation()

    const handleCardClick = useCallback((product) => {
        if (!product) return
        goToProductDetail(product)
    }, [goToProductDetail])

    return (
        <main>
            <Banner
                type="image"
                src={accesoriesHero}
                alt="accesorios"
                className="section"
                sectionTitle="ACCESORIOS"
                description="Métodos, filtros, molinos y más para preparar tu mejor taza."
                darkOverlay
            />
            <div className="main-container">
                <section className="page-section">
                    {accessories.length > 0 && (
                        <SectionGallery items={accessories} onCardClick={handleCardClick} />
                    )}
                    {accessoryProducts != null && accessories.length === 0 && (
                        <p className="page-helper-text">No hay productos disponibles.</p>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Accesories
