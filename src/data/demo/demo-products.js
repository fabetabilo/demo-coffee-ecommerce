import pink from './img/pink-bourbon.png'
import geisha from './img/geisha.png'
import birbirsa from './img/birbirsa.png'
import bourbon from './img/bourbon.png'
import v60pink from './img/v60.png'
import chemex from './img/chemex.png'
import filter1 from './img/filter1.png'
import xultra from './img/1zpresso-x-ultra-g.jpg'
import timemoremini from './img/timemoremini.png'
import buono from './img/buono.jpg'
import etbirbirsa from './img/etiopia-birbirsa.png'
import especial from './img/especial.png'
import pinkcolombia from './img/pink.png'
import nowhitebg from './img/nowhite.png'
import filter2 from './img/b75filters.png'
import v60pink2 from './img/v60-2.png'
import v60pink3 from './img/v60-3.png'
import buono2 from './img/buono-2.png'
import chemex2 from './img/chemex-2.png'
import aero from './img/aero.png'
import aero2 from './img/aero-2.png'
import aero3 from './img/aero-3.png'
import xultra2 from './img/1zpresso-x-ultra-g-2.png'

// productos de demo
export const demoproducts = [
    {
        id: 1,
        name: "Pink Bourbon",
        price: 11990,
        image: pink,
        productImages: [pink, pinkcolombia],
        category: "cafes",
        subcategory: "cafes",
        origin: "Colombia",
        process: "Lavado",
        roastLevel: 3,
        descriptors: ["Frutilla", "Caramelo", "Vainilla"],
        description: "Un lote vibrante de Pink Bourbon con acidez brillante y dulzor jugoso que recuerda a frutas rojas recién cortadas.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 11990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 39990,
                available: false
            }
        ]
    },
    {
        id: 3,
        name: "Geisha Reserva",
        price: 14990,
        image: geisha,
        productImages: [geisha, pink],
        category: "cafes",
        subcategory: "cafes",
        origin: "Panama",
        process: "Lavado",
        roastLevel: 2,
        descriptors: ["Jazmín", "Miel", "Mandarina"],
        description: "Geisha cultivado en altura con fragancia floral, cuerpo sedoso y una taza compleja que evoluciona a medida que enfría.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 14990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 49990,
                available: true
            }
        ]
    },
    {
        id: 4,
        name: "Birbirsa",
        price: 15990,
        image: birbirsa,
        productImages: [birbirsa, etbirbirsa],
        category: "cafes",
        subcategory: "cafes",
        origin: "Etiopia",
        process: "Natural",
        roastLevel: 4,
        descriptors: ["Frutos rojos", "Cacao", "Lavanda"],
        description: "Café natural etiopía con textura aterciopelada y notas de frutos rojos maduros que se mezclan con cacao y flores.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 15990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 52990,
                available: false
            }
        ]
    },
    {
        id: 5,
        name: "Bourbon",
        price: 12990,
        image: bourbon,
        productImages: [bourbon, nowhitebg],
        category: "cafes",
        subcategory: "cafes",
        origin: "Colombia",
        process: "Honey",
        roastLevel: 3,
        descriptors: ["Panela", "Cacao", "Durazno"],
        description: "Proceso honey que resalta la dulzura de panela, con un final de cacao y fruta de hueso madura.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 12990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 42990,
                available: true
            }
        ]
    },
    {
        id: 6,
        name: "V60 Rosada",
        price: 9990,
        image: v60pink,
        productImages: [v60pink, v60pink2, v60pink3],
        category: "accesorios",
        subcategory: "metodos",
        brand: "Hario",
        description: "Cono V60 con acabado rosado que aporta estabilidad termica y consistencia en vertidos controlados."
    },
    {
        id: 7,
        name: "Chemex 6 tazas",
        price: 39990,
        image: chemex,
        productImages: [chemex, chemex2],
        category: "accesorios",
        subcategory: "metodos",
        brand: "Chemex",
        description: "Metodo iconico de vidrio con mango de madera ideal para preparar hasta seis tazas limpias y brillantes."
    },
    {
        id: 8,
        name: "Filtros Origami S",
        price: 6990,
        image: filter1,
        productImages: [filter1],
        category: "accesorios",
        subcategory: "filtros",
        brand: "Origami",
        description: "Paquete de filtros Origami tamano S hechos de papel grueso para un flujo estable y aclarado rapido."
    },
    {
        id: 9,
        name: "Molino 1ZPresso X-Ultra",
        price: 144990,
        image: xultra,
        productImages: [xultra, xultra2],
        category: "accesorios",
        subcategory: "molinos",
        brand: "1Zpresso",
        description: "Molino manual premium con ajuste externo numerado y fresa de acero para moliendas precisas."
    },
    {
        id: 10,
        name: "Balanza Timemore Mini",
        price: 59990,
        image: timemoremini,
        productImages: [timemoremini],
        category: "accesorios",
        subcategory: "balanzas",
        brand: "Timemore",
        description: "Balanza compacta con cronometro integrado y superficie antideslizante para barras minimalistas."
    },
    {
        id: 11,
        name: "Tetera Hario Buono 1L",
        price: 39990,
        image: buono,
        productImages: [buono, buono2],
        category: "accesorios",
        subcategory: "teteras",
        brand: "Hario",
        description: "Gooseneck clasica de acero inoxidable con control total del caudal para preparaciones por vertido."
    },
    {
        id: 12,
        name: "Etiopía Birbirsa",
        price: 16990,
        image: etbirbirsa,
        productImages: [etbirbirsa, birbirsa],
        category: "cafes",
        subcategory: "cafes",
        origin: "Etiopía",
        process: "Natural",
        roastLevel: 4,
        descriptors: ["Mora", "Chocolate", "Flor de azahar"],
        description: "Un perfil jugoso con acidez tipo mora y residual floral limpio.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 16990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 54990,
                available: false
            }
        ]
    },
    {
        id: 13,
        name: "Colombia",
        price: 11990,
        image: nowhitebg,
        productImages: [nowhitebg, bourbon],
        category: "cafes",
        subcategory: "cafes",
        origin: "Colombia",
        process: "Thermal Shock",
        roastLevel: 5,
        descriptors: ["Chocolate amargo", "Cítricos", "Especias"],
        description: "Perfil intenso con cuerpo cremoso y un final especiado que persiste.",
        formats: [
            {
                id: '120g',
                label: '120G',
                grams: 120,
                price: 11990,
                available: true
            }
        ]
    },
    {
        id: 14,
        name: "Pink Bourbon",
        price: 15990,
        image: pinkcolombia,
        productImages: [pinkcolombia, pink],
        category: "cafes",
        subcategory: "cafes",
        origin: "Colombia",
        process: "Lavado",
        roastLevel: 3,
        descriptors: ["Frutos rojos", "Miel", "Cítricos"],
        description: "Versión más intensa del Pink Bourbon con notas dulces de miel y acidez cítrica brillante.",
        formats: [
            {
                id: '250g',
                label: '250G',
                grams: 250,
                price: 15990,
                available: true
            },
            {
                id: '1kg',
                label: '1KG',
                grams: 1000,
                price: 49990,
                available: true
            }
        ]
    },
    {
        id: 15,
        name: "Anaeróbico Especial",
        price: 17990,
        image: especial,
        productImages: [especial, geisha, xultra],
        category: "cafes",
        subcategory: "cafes",
        origin: "Costa Rica",
        process: "Anaerobico",
        roastLevel: 2,
        descriptors: ["Maracuyá", "Caña de azúcar", "Flores"],
        description: "Proceso anaeróbico controlado que entrega una taza tropical, efervescente y extremadamente limpia.",
        formats: [
            {
                id: '120g',
                label: '120G',
                grams: 120,
                price: 17990,
                available: true
            }
        ]
    },
    {
        id: 16,
        name: "Filtros Timemore B75",
        price: 9990,
        image: filter2,
        productImages: [filter2],
        category: "accesorios",
        subcategory: "filtros",
        brand: "Timemore",
        description: "Filtros de papel para Timemore B75 con madera importada de Japón. Sin aditivos ni olores para una delicada taza. \nContiene 50 filtros."
    },
    {
        id: 17,
        name: "Aeropress GO",
        price: 45990,
        image: aero,
        productImages: [aero, aero2, aero3],
        category: "accesorios",
        subcategory: "metodos",
        brand: "Aeropress",
        description: "Metodo iconico de vidrio con mango de madera ideal para preparar hasta seis tazas limpias y brillantes."
    },

]