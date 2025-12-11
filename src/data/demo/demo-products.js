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

// productos de demo
export const demoproducts = [
    {
        id: 1,
        nombre: "Pink Bourbon",
        precio: 11990,
        imagen: pink,
        productImages: [pink, pinkcolombia],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Colombia",
        proceso: "Lavado",
        roastLevel: 3,
        descriptors: ["Frutilla", "Caramelo", "Vainilla"],
        description: "Un lote vibrante de Pink Bourbon con acidez brillante y dulzor jugoso que recuerda a frutas rojas recién cortadas."
    },
    {
        id: 3,
        nombre: "Geisha Reserva",
        precio: 14990,
        imagen: geisha,
        productImages: [geisha, pink],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Panama",
        proceso: "Lavado",
        roastLevel: 2,
        descriptors: ["Jazmín", "Miel", "Mandarina"],
        description: "Geisha cultivado en altura con fragancia floral, cuerpo sedoso y una taza compleja que evoluciona a medida que enfría."
    },
    {
        id: 4,
        nombre: "Birbirsa",
        precio: 15990,
        imagen: birbirsa,
        productImages: [birbirsa, etbirbirsa],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Etiopia",
        proceso: "Natural",
        roastLevel: 4,
        descriptors: ["Frutos rojos", "Cacao", "Lavanda"],
        description: "Café natural etiopía con textura aterciopelada y notas de frutos rojos maduros que se mezclan con cacao y flores."
    },
    {
        id: 5,
        nombre: "Bourbon",
        precio: 12990,
        imagen: bourbon,
        productImages: [bourbon, nowhitebg],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Colombia",
        proceso: "Honey",
        roastLevel: 3,
        descriptors: ["Panela", "Cacao", "Durazno"],
        description: "Proceso honey que resalta la dulzura de panela, con un final de cacao y fruta de hueso madura."
    },
    {
        id: 6,
        nombre: "V60 Rosada",
        precio: 9990,
        imagen: v60pink,
        productImages: [v60pink],
        categoria: "accesorios",
        subcategoria: "metodos",
        marca: "Hario",
        description: "Cono V60 con acabado rosado que aporta estabilidad termica y consistencia en vertidos controlados."
    },
    {
        id: 7,
        nombre: "Chemex 6 tazas",
        precio: 39990,
        imagen: chemex,
        productImages: [chemex, v60pink],
        categoria: "accesorios",
        subcategoria: "metodos",
        marca: "Chemex",
        description: "Metodo iconico de vidrio con mango de madera ideal para preparar hasta seis tazas limpias y brillantes."
    },
    {
        id: 8,
        nombre: "Filtros Origami S",
        precio: 6990,
        imagen: filter1,
        productImages: [filter1],
        categoria: "accesorios",
        subcategoria: "filtros",
        marca: "Origami",
        description: "Paquete de filtros Origami tamano S hechos de papel grueso para un flujo estable y aclarado rapido."
    },
    {
        id: 9,
        nombre: "Molino 1ZPresso X-Ultra",
        precio: 144990,
        imagen: xultra,
        productImages: [xultra],
        categoria: "accesorios",
        subcategoria: "molinos",
        marca: "1Zpresso",
        description: "Molino manual premium con ajuste externo numerado y fresa de acero para moliendas precisas."
    },
    {
        id: 10,
        nombre: "Balanza Timemore Mini",
        precio: 59990,
        imagen: timemoremini,
        productImages: [timemoremini],
        categoria: "accesorios",
        subcategoria: "balanzas",
        marca: "Timemore",
        description: "Balanza compacta con cronometro integrado y superficie antideslizante para barras minimalistas."
    },
    {
        id: 11,
        nombre: "Tetera Hario Buono 1L",
        precio: 39990,
        imagen: buono,
        productImages: [buono],
        categoria: "accesorios",
        subcategoria: "teteras",
        marca: "Hario",
        description: "Gooseneck clasica de acero inoxidable con control total del caudal para preparaciones por vertido."
    },
    {
        id: 12,
        nombre: "Etiopía Birbirsa",
        precio: 16990,
        imagen: etbirbirsa,
        productImages: [etbirbirsa, birbirsa],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Etiopía",
        proceso: "Natural",
        roastLevel: 4,
        descriptors: ["Mora", "Chocolate", "Flor de azahar"],
        description: "Un perfil jugoso con acidez tipo mora y residual floral limpio."
    },
    {
        id: 13,
        nombre: "Colombia",
        precio: 11990,
        imagen: nowhitebg,
        productImages: [nowhitebg, bourbon],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Colombia",
        proceso: "Thermal Shock",
        roastLevel: 5,
        descriptors: ["Chocolate amargo", "Cítricos", "Especias"],
        description: "Perfil intenso con cuerpo cremoso y un final especiado que persiste."
    },
    {
        id: 14,
        nombre: "Pink Bourbon",
        precio: 15990,
        imagen: pinkcolombia,
        productImages: [pinkcolombia, pink],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Colombia",
        proceso: "Lavado",
        roastLevel: 3,
        descriptors: ["Frutos rojos", "Miel", "Cítricos"],
        description: "Versión más intensa del Pink Bourbon con notas dulces de miel y acidez cítrica brillante."
    },
    {
        id: 15,
        nombre: "Anaeróbico Especial",
        precio: 17990,
        imagen: especial,
        productImages: [especial, geisha, xultra],
        categoria: "cafes",
        subcategoria: "cafes",
        origen: "Costa Rica",
        proceso: "Anaerobico",
        roastLevel: 2,
        descriptors: ["Maracuyá", "Caña de azúcar", "Flores"],
        description: "Proceso anaeróbico controlado que entrega una taza tropical, efervescente y extremadamente limpia."
    },
    {
        id: 16,
        nombre: "Filtros Timemore B75",
        precio: 9990,
        imagen: filter2,
        productImages: [filter2],
        categoria: "accesorios",
        subcategoria: "filtros",
        marca: "Timemore",
        description: "Filtros de papel para Timemore B75 con madera importada de Japón. Sin aditivos ni olores para una delicada taza. \nContiene 50 filtros."
    },

]