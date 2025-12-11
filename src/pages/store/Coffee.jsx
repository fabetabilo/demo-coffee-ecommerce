import React, { useCallback, useMemo, useState } from 'react'
import Banner from '../../components/ui/Banner'
import SectionGallery from '../../components/ui/SectionGallery'
import { demoproducts } from '../../data/demo/demo-products'
import coffeeHero from '../../assets/img/sections/cafes.jpg'
import '../../css/page.css'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'

function Coffee() {
    // !!! TEMPORAL, luego el backend se encarga de GET coffees y filtrar !!!!
    const coffeeProducts = demoproducts.filter((product) => product.category === 'cafes')
    const { goToProductDetail } = useProductDetailNavigation()
    const [processFilter, setProcessFilter] = useState('all')
    const filters = useMemo(() => ([
        { id: 'all', label: 'Todos' },
        { id: 'lavado', label: 'Lavados' },
        { id: 'natural', label: 'Naturales' },
        { id: 'honey', label: 'Honey' },
        { id: 'otros', label: 'Otros' }
    ]), [])

    const filteredProducts = useMemo(() => {
        if (processFilter === 'all') return coffeeProducts
        const normalized = processFilter.toLowerCase()
        const known = new Set(['lavado', 'natural', 'honey'])
        return coffeeProducts.filter((product) => {
            const process = String(product.process || '').toLowerCase()
            if (!process) return normalized === 'otros'
            if (normalized === 'otros') {
                return !known.has(process)
            }
            return process === normalized
        })
    }, [coffeeProducts, processFilter])

    const handleCardClick = useCallback((product) => {
        if (!product) return
        goToProductDetail(product)
    }, [goToProductDetail])

    return (
        <main>
            <Banner
                type="image"
                src={coffeeHero}
                alt="cafes-origenes"
                className="section"
                sectionTitle="CAFÉ"
                description="Lotes frescos, perfiles únicos y tostados diseñados para tu barra en casa."
                darkOverlay
            />
            <div className="main-container">
                <section className="page-section">
                    <div
                        className="coffee-filter"
                        role="tablist"
                        aria-label="Filtrar cafés por proceso"
                        aria-orientation="horizontal"
                    >
                        {filters.map((filter) => {
                            const isActive = processFilter === filter.id
                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    className={`coffee-filter-item ${isActive ? 'active' : ''}`.trim()}
                                    onClick={() => setProcessFilter(filter.id)}
                                    aria-selected={isActive}
                                    tabIndex={isActive ? 0 : -1}
                                    role="tab"
                                >
                                    {filter.label}
                                </button>
                            )
                        })}
                    </div>
                    <SectionGallery items={filteredProducts} onCardClick={handleCardClick} />
                </section>
            </div>
        </main>
    )
}

export default Coffee