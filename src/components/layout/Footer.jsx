import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo_wt from '../../assets/img/kohi_wt.png'
import arrowRight from '../../assets/icon/arrow-right-line.svg'
import arrowDown from '../../assets/icon/arrow-down-s-line.svg'

function Footer() {
    const [open, setOpen] = useState({
        store: false,
        productos: false,
        informacion: false,
    })

    const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
        <>
        <footer className="footer footer-mobile">
            <div className="footer-section-news">
                <div className="news-inner">
                    <h3 className="news-title">Brew news</h3>
                    <form className="news-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="news-input-row">
                            <div className={`news-input-wrap`}>
                                <input
                                    id="news-email"
                                    type="email"
                                    className="news-input"
                                    placeholder=" "
                                    aria-label="Email"
                                    onChange={() => {}}
                                />
                                <label htmlFor="news-email" className="news-label">TU EMAIL</label>
                                <span className="news-underline" />
                            </div>
                            <button className="news-submit" type="submit" aria-label="Subscribe">
                                <img src={arrowRight} alt="" aria-hidden="true" />
                            </button>
                        </div>
                        <p className="news-caption">Únete a nuestra revista, y recibe 10% de descuento en tu primera compra.</p>
                    </form>
                </div>
                <Link to="/" className="footer-logo">
                    <img src={logo_wt} alt="Kohi" />
                </Link>
                
            </div>

            <div className="footer-inner">
                <div className="footer-section">
                    <button className="footer-section-header" type="button" onClick={() => toggle('store')}>
                        <span>TIENDA</span>
                        <span className={`footer-chevron ${open.store ? 'open' : ''}`} aria-hidden>
                            <img src={arrowDown} alt="" aria-hidden="true" />
                        </span>
                    </button>
                    <div className={`footer-collapse ${open.store ? 'open' : ''}`}>
                        <ul className="footer-links">
                            <li><a href="#">Tiendas</a></li>
                            <li><a href="#">Venta mayorista</a></li>
                            <li><a href="#">Sobre nosotros</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-section">
                    <button className="footer-section-header" type="button" onClick={() => toggle('productos')}>
                        <span>PRODUCTOS</span>
                        <span className={`footer-chevron ${open.productos ? 'open' : ''}`} aria-hidden>
                            <img src={arrowDown} alt="" aria-hidden="true" />
                        </span>
                    </button>
                    <div className={`footer-collapse ${open.productos ? 'open' : ''}`}>
                        <ul className="footer-links">
                            <li><a href="#">Subscripción</a></li>
                            <li><a href="#">Café</a></li>
                            <li><a href="#">Accesorios</a></li>
                            <li><a href="#">Ofertas</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-section">
                    <button className="footer-section-header" type="button" onClick={() => toggle('informacion')}>
                        <span>INFORMACIÓN</span>
                        <span className={`footer-chevron ${open.informacion ? 'open' : ''}`} aria-hidden>
                            <img src={arrowDown} alt="" aria-hidden="true" />
                        </span>
                    </button>
                    <div className={`footer-collapse ${open.informacion ? 'open' : ''}`}>
                        <ul className="footer-links">
                            <li><a href="#">Seguimiento de pedido</a></li>
                            <li><a href="#">Tiempos de despacho</a></li>
                            <li><a href="#">Términos y condiciones</a></li>
                            <li><a href="#">Políticas de privacidad</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-claim">WE CARE ABOUT COFFEE</div>
            </div>   
        </footer>
        <div className="footer-copy">© 2025 Demo. By FT</div>
        </>
    )
}

export default Footer
