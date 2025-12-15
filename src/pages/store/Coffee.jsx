import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Banner from '../../components/ui/Banner'
import SectionGallery from '../../components/ui/SectionGallery'
import coffeeHero from '../../assets/img/sections/cafes.jpg'
import '../../css/page.css'
import useProductDetailNavigation from '../../hooks/useProductDetailNavigation'
import ProductService from '../../services/product.service'

function Coffee() {
    // IMPORTANTE: filtra cafés (en tiempo real) en cliente dado que no tendrá más de 50 cafés disponibles
    const [coffeeProducts, setCoffeeProducts] = useState(null)
    const [packProducts, setPackProducts] = useState(null) // <- NUEVO
    const { goToProductDetail } = useProductDetailNavigation()
    const [processFilter, setProcessFilter] = useState('all')
    const filters = useMemo(() => ([
        { id: 'all', label: 'Todos' },
        { id: 'lavado', label: 'Lavados' },
        { id: 'natural', label: 'Naturales' },
        { id: 'honey', label: 'Honey' },
        { id: 'otros', label: 'Otros' }
    ]), [])

    useEffect(() => {
        let isMounted = true

        const fetchCoffees = async () => {
            try {
                const coffees = await ProductService.getAllCoffees()
                if (!isMounted) return
                setCoffeeProducts(Array.isArray(coffees) ? coffees : [])
            } catch (err) {
                if (!isMounted) return
                console.error('Error loading coffees', err)
                setCoffeeProducts([])
            }
        }

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

        fetchCoffees()
        fetchPacks()

        return () => {
            isMounted = false
        }
    }, [])

    const filteredProducts = useMemo(() => {
        const list = Array.isArray(coffeeProducts) ? coffeeProducts : []
        if (processFilter === 'all') return list
        const normalized = processFilter.toLowerCase()
        const known = new Set(['lavado', 'natural', 'honey'])
        return list.filter((product) => {
            const process = String(product.process || '').toLowerCase()
            if (!process) return normalized === 'otros'
            if (normalized === 'otros') {
                return !known.has(process)
            }
            return process === normalized
        })
    }, [coffeeProducts, processFilter])

    const packs = useMemo(
        () => (Array.isArray(packProducts) ? packProducts : []),
        [packProducts]
    )

    // cafés filtrados + packs en la MISMA galería
    const galleryItems = useMemo(
        () => [...filteredProducts, ...packs],
        [filteredProducts, packs]
    )

    const hasSourceProducts = Array.isArray(coffeeProducts) && coffeeProducts.length > 0

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
                    {galleryItems.length > 0 && (
                        <SectionGallery items={galleryItems} onCardClick={handleCardClick} />
                    )}
                    {hasSourceProducts && filteredProducts.length === 0 && (
                        <p className="page-helper-text">No encontramos cafés con este filtro.</p>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Coffee