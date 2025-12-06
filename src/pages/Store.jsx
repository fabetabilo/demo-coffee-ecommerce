import React from 'react'
import Banner from '../components/ui/Banner'
import StoreGallery from '../components/ui/StoreGallery'
import '../css/page.css'
import STORE_SECTIONS from '../data/store-sections'

function Store() {
    return (
        <main>
            <Banner
                type="video"
                src="/vid/bean2.mp4"
                className="section"
                sectionTitle="TIENDA"
                description="Explora nuestra tienda y encuentra tu nuevo favorito."
                darkOverlay
            />
            <div className="main-container">
                <section className="page-section">
                    <h2 className="page-heading">Productos</h2>
                    <div className="page-heading-grip" />
                    <StoreGallery sections={STORE_SECTIONS} />
                </section>
            </div>
        </main>
    )
}

export default Store