import { Element, PieceType, PokemonMetadata } from '../types/chess'

interface PokemonPieceConfig {
  readonly element: Element
  readonly type: PieceType
  readonly name: string
  readonly pokemon: PokemonMetadata
}
const charizardSprite = new URL('../assets/pokemon/Charizard.png', import.meta.url).href
const blastoiseSprite = new URL('../assets/pokemon/Blastoise.png', import.meta.url).href
const primarinaSprite = new URL('../assets/pokemon/Primarina.png', import.meta.url).href
const delphoxSprite = new URL('../assets/pokemon/Delphox.png', import.meta.url).href
const greninjaSprite = new URL('../assets/pokemon/Greninja.png', import.meta.url).href
const blazikenSprite = new URL('../assets/pokemon/Blaziken.png', import.meta.url).href
const infernapeSprite = new URL('../assets/pokemon/Infernape.png', import.meta.url).href
const feraligatrSprite = new URL('../assets/pokemon/Feraligatr.png', import.meta.url).href
const emboarSprite = new URL('../assets/pokemon/Emboar.png', import.meta.url).href
const empoleonSprite = new URL('../assets/pokemon/Empoleon.png', import.meta.url).href
const growlitheSprite = new URL('../assets/pokemon/Growlithe.png', import.meta.url).href
const marillSprite = new URL('../assets/pokemon/Marill.png', import.meta.url).href

export const fireTeam: PokemonPieceConfig[] = [
  {
    element: 'fire',
    type: 'king',
    name: 'Charizard',
    pokemon: { species: 'Charizard', icon: 'CH', image: charizardSprite },
  },
  {
    element: 'fire',
    type: 'queen',
    name: 'Delphox',
    pokemon: { species: 'Delphox', icon: 'DX', image: delphoxSprite },
  },
  {
    element: 'fire',
    type: 'bishop',
    name: 'Blaziken',
    pokemon: { species: 'Blaziken', icon: 'BZ', image: blazikenSprite },
  },
  {
    element: 'fire',
    type: 'bishop',
    name: 'Blaziken',
    pokemon: { species: 'Blaziken', icon: 'BZ', image: blazikenSprite },
  },
  {
    element: 'fire',
    type: 'knight',
    name: 'Infernape',
    pokemon: { species: 'Infernape', icon: 'IN', image: infernapeSprite },
  },
  {
    element: 'fire',
    type: 'knight',
    name: 'Infernape',
    pokemon: { species: 'Infernape', icon: 'IN', image: infernapeSprite },
  },
  {
    element: 'fire',
    type: 'rook',
    name: 'Emboar',
    pokemon: { species: 'Emboar', icon: 'EM', image: emboarSprite },
  },
  {
    element: 'fire',
    type: 'rook',
    name: 'Emboar',
    pokemon: { species: 'Emboar', icon: 'EM', image: emboarSprite },
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    element: 'fire' as const,
    type: 'pawn' as const,
    name: `Growlithe ${index + 1}`,
    pokemon: { species: 'Growlithe', icon: 'GR', image: growlitheSprite },
  })),
]

export const waterTeam: PokemonPieceConfig[] = [
  {
    element: 'water',
    type: 'king',
    name: 'Blastoise',
    pokemon: { species: 'Blastoise', icon: 'BS', image: blastoiseSprite },
  },
  {
    element: 'water',
    type: 'queen',
    name: 'Primarina',
    pokemon: { species: 'Primarina', icon: 'PR', image: primarinaSprite },
  },
  {
    element: 'water',
    type: 'bishop',
    name: 'Greninja',
    pokemon: { species: 'Greninja', icon: 'GN', image: greninjaSprite },
  },
  {
    element: 'water',
    type: 'bishop',
    name: 'Greninja',
    pokemon: { species: 'Greninja', icon: 'GN', image: greninjaSprite },
  },
  {
    element: 'water',
    type: 'knight',
    name: 'Feraligatr',
    pokemon: { species: 'Feraligatr', icon: 'FG', image: feraligatrSprite },
  },
  {
    element: 'water',
    type: 'knight',
    name: 'Feraligatr',
    pokemon: { species: 'Feraligatr', icon: 'FG', image: feraligatrSprite },
  },
  {
    element: 'water',
    type: 'rook',
    name: 'Empoleon',
    pokemon: { species: 'Empoleon', icon: 'EP', image: empoleonSprite },
  },
  {
    element: 'water',
    type: 'rook',
    name: 'Empoleon',
    pokemon: { species: 'Empoleon', icon: 'EP', image: empoleonSprite },
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    element: 'water' as const,
    type: 'pawn' as const,
    name: `Marill ${index + 1}`,
    pokemon: { species: 'Marill', icon: 'MR', image: marillSprite },
  })),
]

export const teamTheme: Record<Element, { label: string; color: string }> = {
  fire: { label: 'Fire', color: '#f97316' },
  water: { label: 'Water', color: '#38bdf8' },
}

export function cloneConfig(config: PokemonPieceConfig, index: number) {
  return {
    id: `${config.element}-${config.type}-${index}`,
    element: config.element,
    type: config.type,
    name: config.name,
    pokemon: config.pokemon,
    hasMoved: false,
  } as const
}
