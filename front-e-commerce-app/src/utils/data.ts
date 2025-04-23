export const FeaturesData: {
  imgSrc: string;
  heading: string;
  subheading: string;
}[] = [
    {
      imgSrc: '/images/features/featureOne.webp',
      heading: "Selección Curada",
      subheading: "Vinos elegidos por expertos, de las regiones vinicolas mas prestigiosas del mundo.",
    },
    {
      imgSrc: '/images/features/featureTwo.webp',
      heading: "Fichas Técnicas",
      subheading: "Fichas de cata detalladas, con información sobre maridaje, añadas y productores.",
    },
    {
      imgSrc: '/images/features/featureThree.webp',
      heading: "Envío Especializado",
      subheading: "Envio especializado, con control de temperatura, para garantizar la calidad de sus vinos.",
    },
    {
      imgSrc: '/images/features/featureFour.png',
      heading: "Eventos y Catas",
      subheading: "Invitaciones exclusivas a eventos y catas de vino.",
    }

  ]

export const ExpertData: {
  profession: string;
  name: string;
  imgSrc: string;
}[] = [
  {
    profession: 'Sommelier Principal',
    name: 'Giovanni Rossi',
    imgSrc: '/images/expert/sommelierTwo.webp', // Reemplaza con la imagen real
  },
  {
    profession: 'Sommelier Junior',
    name: 'Alessia Bianchi',
    imgSrc: '/images/expert/sommelierOne.webp', // Reemplaza con la imagen real
  },
  {
    profession: 'Experto en Vinos Regionales',
    name: 'Marco Ferrari',
    imgSrc: '/images/expert/sommelierTwo.webp', // Reemplaza con la imagen real
  },
  {
    profession: 'Especialista en Maridaje',
    name: 'Sofia Russo',
    imgSrc: '/images/expert/sommelierOne.webp', // Reemplaza con la imagen real
  },
  {
    profession: 'Enólogo Principal',
    name: 'Luca Esposito',
    imgSrc: '/images/expert/sommelierTwo.webp', // Reemplaza con la imagen real
  },
  {
    profession: 'Catador de Vinos',
    name: 'Chiara Romano',
    imgSrc: '/images/expert/sommelierOne.webp', // Reemplaza con la imagen real
  },
]

// data.tsx
export const galleryImages = [
  { src: '/images/gallery/chardonnay.webp', name: 'Pasqua Chardonnay blanc Di Puglia 2021 750ml', price: 389 },
  { src: '/images/gallery/gravas.webp', name: 'Gravas del Maipo Cabernet Sauvignon 2020 750ml', price: 299 },
  { src: '/images/gallery/brico.webp', name: 'Braida Barbera dAsti Bricco dellUccellone 2021 750ml', price: 453 },
  { src: '/images/gallery/donperignon.webp', name: 'Champagne DOM PERIGNON Vintage Botella 750ml', price: 1227 },
];
