import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/kohi_bl.png'
import search_icon from '../../assets/icon/search-2-line.svg'
import cart_icon from '../../assets/icon/shopping-bag-4-line.svg'
import menu_icon from '../../assets/icon/menu-3-fill.svg'
import close_icon from '../../assets/icon/close-fill.svg'

function Navbar() {
	const [open, setOpen] = useState(false)

	// items de navegacion
	const navLinks = [
		{ label: 'Subscripción', to: '/' },
		{ label: 'Café', to: '/' },
		{ label: 'Métodos', to: '/' },
		{ label: 'Accesorios', to: '/' },
	]

	// previene el scroll vertical para cuando el sheet este abierto
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	const closeOnBackdrop = () => setOpen(false)

	return (
		<>
			<nav className="nav-mobile">
				<div className="nav-left">
					<Link to="/" className="nav-logo">
						<img src={logo} alt="Kohi" />
					</Link>
				</div>

				{/* items desktop/tablet navbar */}
				<ul className="nav-items">
					{navLinks.map(({ label, to }) => (
						<li key={label}><Link to={to}>{label}</Link></li>
					))}
				</ul>
				<div className="nav-right">
					<button className="icon-btn" aria-label="Buscar">
						<img src={search_icon} alt="Buscar" />
					</button>
					<button className="icon-btn" aria-label="Carrito">
						<img src={cart_icon} alt="Carrito" />
					</button>
					<button
						className="icon-btn hamburger-btn"
						aria-label="Menú"
						onClick={() => setOpen(true)}
					>
						<img src={menu_icon} alt="Menú" />
					</button>
				</div>
			</nav>

			<div
				className={`sheet-backdrop ${open ? 'show' : ''}`}
				onClick={closeOnBackdrop}
			/>

			{/* sheet inferior de menu */}
			<div className={`sheet ${open ? 'sheet-open' : ''}`} role="dialog" aria-modal="true">
				<div className="sheet-grip" />
				<ul className="sheet-menu">
					{navLinks.map(({ label, to }) => (
						<li key={label}>
							<Link to={to} onClick={() => setOpen(false)}>{label}</Link>
						</li>
					))}
				</ul>
				<button className="sheet-close" onClick={() => setOpen(false)}>
					<span>Cerrar</span>
					<img src={close_icon} alt="Cerrar" />
				</button>
			</div>
		</>
	)
}

export default Navbar
