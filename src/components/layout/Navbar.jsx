import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/kohi_bl.png'
import search_icon from '../../assets/icon/search-2-line.svg'
import cart_icon from '../../assets/icon/shopping-bag-4-line.svg'
import menu_icon from '../../assets/icon/menu-3-fill.svg'
import close_icon from '../../assets/icon/close-fill.svg'

function Navbar() {
	// sheetType: null | 'menu' | 'search'
	const [sheetType, setSheetType] = useState(null)

	// items de navegacion (desktop)
	const navLinks = [
		{ label: 'Subscripción', to: '/' },
		{ label: 'Café', to: '/' },
		{ label: 'Métodos', to: '/' },
		{ label: 'Accesorios', to: '/' },
	]

	// contenido del sheet de búsqueda
	const searchCafeLinks = [
		{ label: 'Café en grano', to: '/cafe' },
		{ label: 'Packs+', to: '/packs' },
		{ label: 'Subscripción', to: '/subscripcion' },
	]
	const searchAccesoriosLinks = [
		{ label: 'Métodos', to: '/metodos' },
		{ label: 'Filtros', to: '/filtros' },
		{ label: 'Molinos', to: '/molinos' },
	]

	// previene el scroll vertical para cuando cualquier sheet este abierto
	useEffect(() => {
		if (sheetType) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [sheetType])

	const closeOnBackdrop = () => setSheetType(null)

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
					<button
						className="icon-btn"
						aria-label="Buscar"
						onClick={() => setSheetType('search')}
					>
						<img src={search_icon} alt="Buscar" />
					</button>
					<button className="icon-btn" aria-label="Carrito">
						<img src={cart_icon} alt="Carrito" />
					</button>
					<button
						className="icon-btn hamburger-btn"
						aria-label="Menú"
						onClick={() => setSheetType('menu')}
					>
						<img src={menu_icon} alt="Menú" />
					</button>
				</div>
			</nav>

			<div
				className={`sheet-backdrop ${sheetType ? 'show' : ''}`}
				onClick={closeOnBackdrop}
			/>

			{/* sheet inferior de navbar menu hamburguesa */}
			<div
				className={`sheet ${sheetType === 'menu' ? 'sheet-open' : ''}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="menuSheetTitle"
			>
				<div className="sheet-grip" />
				<ul className="sheet-menu">
					{navLinks.map(({ label, to }) => (
						<li key={label}>
							<Link to={to} onClick={() => setSheetType(null)}>{label}</Link>
						</li>
					))}
				</ul>
				<button className="sheet-close" onClick={() => setSheetType(null)}>
					<span>Cerrar</span>
					<img src={close_icon} alt="Cerrar" />
				</button>
			</div>

			{/* sheet inferior de búsqueda */}
			<div
				className={`sheet search-sheet ${sheetType === 'search' ? 'sheet-open' : ''}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="searchSheetTitle"
			>
				<div className="sheet-grip" />
				<div className="search-header">
					<h2 id="searchSheetTitle" className="search-title">Buscar</h2>
					<div className="search-input-wrapper">
						<input
							className="search-input"
							placeholder="buscar en nuestra tienda"
							type="text"
							aria-label="Ingresar término de búsqueda"
						/>
					</div>
				</div>
				<div className="search-section">
					<div className="search-section-heading">Café</div>
					<ul className="search-links">
						{searchCafeLinks.map(({ label, to }) => (
							<li key={label}>
								<Link to={to} onClick={() => setSheetType(null)}>{label}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="search-section">
					<div className="search-section-heading">Accesorios</div>
					<ul className="search-links">
						{searchAccesoriosLinks.map(({ label, to }) => (
							<li key={label}>
								<Link to={to} onClick={() => setSheetType(null)}>{label}</Link>
							</li>
						))}
					</ul>
				</div>
				<button className="sheet-close" onClick={() => setSheetType(null)}>
					<span>Cerrar</span>
					<img src={close_icon} alt="Cerrar" />
				</button>
			</div>
		</>
	)
}

export default Navbar
