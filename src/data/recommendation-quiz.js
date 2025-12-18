import espressoIcon from '../assets/icon/espresso.svg'
import frenchPressIcon from '../assets/icon/frenchpress.svg'
import mokaPotIcon from '../assets/icon/mokapot.svg'
import pourOverIcon from '../assets/icon/pourover.svg'
import dripMachineIcon from '../assets/icon/dripmachine.svg'
import aeropressIcon from '../assets/icon/aeropress.svg'
import chocolateFlavorIcon from '../assets/icon/chocolate.svg' // arreglar svg
import fruityFlavorIcon from '../assets/icon/fruity.svg'
import coffeeFlavorIcon from '../assets/icon/coffee.svg'    // arreglar svg
import surpriseFlavorIcon from '../assets/icon/surprise.svg'    // arreglar svg
// import floralIcon from '' // falta svg

/**
 * Información de QUIZ
 * value: son los ENUMS que recibe la API para procesar, no deben cambiar
 */
export const quizQuestions = [
    {
        id: "brewingMethod",
        title: "¿Cómo haces tu café?",
        options: [
            { value: "ESPRESSO", label: "Espresso", icon: espressoIcon },
            { value: "FRENCH_PRESS", label: "Prensa francesa", icon: frenchPressIcon },
            { value: "MOKA_POT", label: "Moka italiana", icon: mokaPotIcon },
            { value: "POUR_OVER", label: "Filtrado", icon: pourOverIcon },
            { value: "DRIP_MACHINE", label: "Cafetera americana", icon: dripMachineIcon },
            { value: "AEROPRESS", label: "Aeropress", icon: aeropressIcon }
        ]
    },
    {
        id: "milkPreference",
        title: "¿Cómo lo tomas?",
        options: [
            { value: "YES", label: "Con leche (o alternativa)" },
            { value: "SOMETIMES", label: "A veces con leche (o alternativa)" },
            { value: "NO", label: "Negro" }
        ]
    },
    {
        id: "flavorPreference",
        title: "¿Qué clase de sabores prefieres?",
        options: [
            { value: "CHOCOLATE", label: "Pistas de Chocolate, caramelo, almendras", icon: chocolateFlavorIcon },
            { value: "FLORAL_DELICATE", label: "Floral y delicado", icon: fruityFlavorIcon },
            { value: "FRUITY", label: "Frutal, Cítrico, y divertido", icon: fruityFlavorIcon },
            { value: "COFFEE", label: "Solo café", icon: coffeeFlavorIcon },
            { value: "SURPRISE", label: "¡Sorpréndeme!", icon: surpriseFlavorIcon }
        ]
    },
    {
        id: "roastPreference",
        title: "Finalmente, ¿qué tueste prefieres?",
        options: [
            { value: "LIGHT", label: "Ligero" },
            { value: "MEDIUM", label: "Medio" },
            { value: "DARK", label: "Alto" }
        ]
    }
]

export const createInitialAnswers = () =>
    quizQuestions.reduce((acc, q) => {
        acc[q.id] = null
        return acc
    }, {})