import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import '../../css/Sheet.css'

function Sheet({
	isOpen,
	onClose,
	children,
	role = 'dialog',
	className = '',
	backdropClassName = '',
	ariaLabelledBy,
	ariaDescribedBy,
	id,
	closeOnBackdrop = true,
	closeOnEsc = true,
	showCloseButton = true,
	closeButtonLabel = 'Cerrar panel'
}) {
	const sheetRef = useRef(null)
	const lastFocusedElementRef = useRef(null)
	const portalTarget = typeof document !== 'undefined' ? document.body : null

	useEffect(() => {
		if (!isOpen || !portalTarget) {
			return undefined
		}

		lastFocusedElementRef.current =
			document.activeElement instanceof HTMLElement ? document.activeElement : null
		document.body.classList.add('no-scroll')

		const frame = window.requestAnimationFrame(() => {
			sheetRef.current?.focus({ preventScroll: true })
		})

		return () => {
			window.cancelAnimationFrame(frame)
			document.body.classList.remove('no-scroll')
			lastFocusedElementRef.current?.focus({ preventScroll: true })
		}
	}, [isOpen, portalTarget])

	useEffect(() => {
		if (!isOpen || !closeOnEsc) {
			return undefined
		}

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				event.preventDefault()
				event.stopPropagation()
				onClose?.()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, closeOnEsc, onClose])

	const handleBackdropClick = (event) => {
		if (event.target !== event.currentTarget || !closeOnBackdrop) {
			return
		}
		onClose?.()
	}

	if (!portalTarget) {
		return null
	}

	const backdropClasses = [
		'app-sheet-backdrop',
		isOpen ? 'app-sheet-backdrop-visible' : '',
		backdropClassName
	]
		.filter(Boolean)
		.join(' ')

	const sheetClasses = [
		'app-sheet',
		isOpen ? 'app-sheet-open sheet-open' : '',
		className
	]
		.filter(Boolean)
		.join(' ')

	return createPortal(
		<>
			<div className={backdropClasses} onClick={handleBackdropClick} aria-hidden="true" />
			<div
				ref={sheetRef}
				className={sheetClasses}
				role={role}
				aria-modal={role === 'dialog' ? 'true' : undefined}
				aria-labelledby={ariaLabelledBy}
				aria-describedby={ariaDescribedBy}
				aria-hidden={!isOpen}
				tabIndex={-1}
				id={id}
			>
				{showCloseButton && onClose && (
					<button
						type="button"
						className="app-sheet-close"
						onClick={onClose}
						aria-label={closeButtonLabel}
					>
						<span aria-hidden="true" />
					</button>
				)}
				{children}
			</div>
		</>,
		portalTarget
	)
}

export default Sheet
