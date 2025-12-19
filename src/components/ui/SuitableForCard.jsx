import React, { useMemo } from 'react'
import '../../css/SuitableForCard.css'

import AeropressIcon from '../../assets/icon/aeropress.svg'
import DripMachineIcon from '../../assets/icon/dripmachine.svg'
import EspressoIcon from '../../assets/icon/espresso.svg'
import FrenchPressIcon from '../../assets/icon/frenchpress.svg'
import MokaPotIcon from '../../assets/icon/mokapot.svg'
import PourOverIcon from '../../assets/icon/pourover.svg'

// de la mano con quizQuestions, pero podria ser diferente en el futuro
const methodDictionary = {
	POUR_OVER: { label: "Pour Over", icon: PourOverIcon },
	AEROPRESS: { label: "Aeropress", icon: AeropressIcon },
	FRENCH_PRESS: { label: "Prensa Francesa", icon: FrenchPressIcon },
	DRIP_MACHINE: { label: "Americana", icon: DripMachineIcon },
	ESPRESSO: { label: "Espresso", icon: EspressoIcon },
	MOKA_POT: { label: "Moka Italiana", icon: MokaPotIcon },
}

function SuitableForCard({ methods = [] }) {
	const methodItems = useMemo(() => (
		Array.isArray(methods) ? methods
                .map((key) => methodDictionary[key])
				.filter(Boolean)
			: []
	), [methods])

	if (!methodItems.length) {
		return null
	}

	return (
		<div className="product-suitable-card" aria-label="Recomendado para">
			<p className="product-suitable-card-head-label">Recomendado para</p>
			<div className="product-suitable-card-items">
				{methodItems.map(({ label, icon }) => (
					<div className="product-suitable-card-item" key={label}>
						<img src={icon} alt={label} className="product-suitable-card-icon" loading="lazy" />
						<p className="product-suitable-card-label">{label}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default SuitableForCard
