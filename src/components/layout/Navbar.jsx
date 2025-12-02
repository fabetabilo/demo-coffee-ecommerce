import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoBlack from '../../assets/img/kohi_bl.png'
import logoWhite from '../../assets/img/kohi_wt.png'
import search_icon from '../../assets/icon/search-2-line.svg'
import cart_icon from '../../assets/icon/shopping-bag-4-line.svg'
import menu_icon from '../../assets/icon/menu-3-fill.svg'
import close_icon from '../../assets/icon/close-fill.svg'

function Navbar() {
	// sheetType: null | 'menu' | 'search'
	const [sheetType, setSheetType] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	// estado: en el tope superior para navbar transparente
	const [atTop, setAtTop] = useState(true)
	const [isDesktop, setIsDesktop] = useState(
		typeof window !== 'undefined' ? window.innerWidth >= 767 : false
	)

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

	// detecta el scroll para alternar navbar transparente/solida (mobile y desktop)
	useEffect(() => {
		const onScroll = () => {
			if (typeof window === 'undefined') return
			const top = window.scrollY <= 2
			setAtTop(top)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	// detectar cambios de tamano para saber si es desktop o mobile
	useEffect(() => {
		const onResize = () => {
			if (typeof window === 'undefined') return
			setIsDesktop(window.innerWidth >= 767)
		}
		onResize()
		window.addEventListener('resize', onResize, { passive: true })
		return () => window.removeEventListener('resize', onResize)
	}, [])

	// auto-focus en desktop cuando se abre el panel de busqueda
	useEffect(() => {
		if (sheetType === 'search' && typeof window !== 'undefined' && window.innerWidth >= 767) {
			// esperar al siguiente frame para asegurar que el input exista y este visible
			const id = window.requestAnimationFrame(() => {
				const input = document.querySelector('.search-desktop .search-input')
				if (input && typeof input.focus === 'function') {
					input.focus()
				}
			})
			return () => window.cancelAnimationFrame(id)
		}
	}, [sheetType])

	// cierre generico que decide si usar animacion (desktop search) o cierre inmediato (mobile / otros sheets)
	const closeOnBackdrop = () => {
		if (sheetType === 'search' && typeof window !== 'undefined' && window.innerWidth >= 767) {
			// desktop: animar
			closeSearchWithAnimation()
		} else {
			// mobile o cualquier otro sheet
			setSheetType(null)
		}
	}

	// cierre con animacion para desktop (solo panel de busqueda en >=767px)
	const closeSearchWithAnimation = () => {
		// si no esta abierto el search, salir
		if (sheetType !== 'search') {
			setSheetType(null)
			return
		}
		// en mobile no animamos, cierre directo
		if (typeof window !== 'undefined' && window.innerWidth < 767) {
			setSheetType(null)
			return
		}
		const el = document.querySelector('.search-desktop')
		if (!el) {
			setSheetType(null)
			return
		}
		el.classList.add('closing')
		const onEnd = (evt) => {
			if (evt.propertyName !== 'transform') return
			el.classList.remove('closing')
			setSheetType(null)
			el.removeEventListener('transitionend', onEnd)
		}
		el.addEventListener('transitionend', onEnd)
	}

	return (
		<>
			<nav className={`nav-mobile ${sheetType === 'search' ? 'nav-no-shadow' : ''} ${atTop && (!isDesktop || sheetType !== 'search') ? 'nav-transparent' : ''}`}>
				{(() => {
					// mismo criterio para mantener sincronizado el intercambio de logo
					return null
				})()}
				<div className="nav-left">
					{(() => {
						const isTransparent = atTop && (!isDesktop || sheetType !== 'search')
						return (
							<Link to="/" className="nav-logo">
								<img
									className={`logo logo-black ${isTransparent ? 'hide' : 'show'}`}
									src={logoBlack}
									alt="Kohi"
								/>
								<img
									className={`logo logo-white ${isTransparent ? 'show' : 'hide'}`}
									src={logoWhite}
									alt="Kohi"
								/>
							</Link>
						)
					})()}
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
				<button className="sheet-close" onClick={closeOnBackdrop}>
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
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
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
				<button className="sheet-close" onClick={closeOnBackdrop}>
					<span>Cerrar</span>
					<img src={close_icon} alt="Cerrar" />
				</button>
			</div>

			{/* desktop sheet search panel */}
			<div className={`search-desktop-backdrop ${sheetType === 'search' ? 'show' : ''}`} onClick={closeOnBackdrop} />
			<div className={`search-desktop ${sheetType === 'search' ? 'open' : ''}`} aria-hidden={sheetType !== 'search'}>
				<div className="search-desktop-inner">
					<div className="search-desktop-content">
						<div className="search-desktop-left">
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
						</div>
						<div className="search-desktop-right">
							<h2 className="psm-heading">Buscar</h2>
							<div className="search-input-wrapper">
								<input
									className="search-input"
									placeholder="buscar en nuestra tienda"
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
