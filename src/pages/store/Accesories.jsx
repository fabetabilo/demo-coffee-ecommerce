import React, { useCallback } from 'react'
import Banner from '../../components/ui/Banner'
import SectionGallery from '../../components/ui/SectionGallery'
import { demoproducts } from '../../data/demo/demo-products'
import accesoriesHero from '../../assets/img/sections/accesorios.jpg'
import '../../css/page.css'
import { useNavigate } from 'react-router-dom'

function Accesories() {
    // tipos que consideramos "accesorio"
    const accessoryTypes = ['metodos', 'filtros', 'molinos', 'balanzas', 'teteras', 'accesorios']

    const accessoryProducts = demoproducts.filter((prod) => {
        // categoria, o subcategoria
        if (prod.categoria === 'accesorios') return true
        return accessoryTypes.includes(String(prod.subcategoria || '').toLowerCase())
    })

    const navigate = useNavigate()

    const handleCardClick = useCallback((product) => {
        if (!product) return
        const params = new URLSearchParams()
        if (product.id) params.set('id', product.id)
        const query = params.toString()
        navigate(`/tienda/producto${query ? `?${query}` : ''}`, { state: { product } })
    }, [navigate])

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
                    <SectionGallery items={accessoryProducts} onCardClick={handleCardClick} />
                </section>
            </div>
        </main>
    )
}

export default Accesories
