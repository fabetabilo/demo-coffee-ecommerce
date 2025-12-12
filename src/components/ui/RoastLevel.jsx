import React from 'react'
import '../../css/RoastLevel.css'

/**
 * Componente reutilizable para mostrar nivel de tueste
 * Props:
 * - level: numero actual de tueste
 * - max: numero maximo de la escala (por default: 7)
 * - className: clases extra para variantes de estilo (por ejemplo, en cards)
 */
export default function RoastLevel({ level = 0, max = 7, className = '' }) {
	const safeMax = Number.isFinite(max) && max > 0 ? max : 7
	const safeLevel = Math.max(0, Math.min(safeMax, Number(level) || 0))

	if (!safeLevel || safeLevel <= 0) return null

	return (
		<div
			className={`roast-level ${className}`.trim()}
			aria-label={`Nivel de tueste ${safeLevel} de ${safeMax}`}
		>
			<span className="roast-label">Tueste</span>
			<div className="roast-scale" role="img">
				{Array.from({ length: safeMax }).map((_, index) => {
					const active = index < safeLevel
					return <span key={`roast-${index}`} className={`roast-dot ${active ? 'active' : ''}`} />
				})}
			</div>
		</div>
	)
}

