import { Element, PieceType, PokemonMetadata } from '../types/chess'

interface PokemonPieceConfig {
  readonly element: Element
  readonly type: PieceType
  readonly name: string
  readonly pokemon: PokemonMetadata
}

export const fireTeam: PokemonPieceConfig[] = [
  { element: 'fire', type: 'king', name: 'Charizard', pokemon: { species: 'Charizard', icon: 'CH' } },
  { element: 'fire', type: 'queen', name: 'Delphox', pokemon: { species: 'Delphox', icon: 'DX' } },
  { element: 'fire', type: 'bishop', name: 'Blaziken', pokemon: { species: 'Blaziken', icon: 'BZ' } },
  { element: 'fire', type: 'bishop', name: 'Blaziken', pokemon: { species: 'Blaziken', icon: 'BZ' } },
  { element: 'fire', type: 'knight', name: 'Infernape', pokemon: { species: 'Infernape', icon: 'IN' } },
  { element: 'fire', type: 'knight', name: 'Infernape', pokemon: { species: 'Infernape', icon: 'IN' } },
  { element: 'fire', type: 'rook', name: 'Emboar', pokemon: { species: 'Emboar', icon: 'EM' } },
  { element: 'fire', type: 'rook', name: 'Emboar', pokemon: { species: 'Emboar', icon: 'EM' } },
  ...Array.from({ length: 8 }, (_, index) => ({
    element: 'fire' as const,
    type: 'pawn' as const,
    name: `Growlithe ${index + 1}`,
    pokemon: { species: 'Growlithe', icon: 'GR' },
  })),
]

export const waterTeam: PokemonPieceConfig[] = [
  { element: 'water', type: 'king', name: 'Blastoise', pokemon: { species: 'Blastoise', icon: 'BS' } },
  { element: 'water', type: 'queen', name: 'Primarina', pokemon: { species: 'Primarina', icon: 'PR' } },
  { element: 'water', type: 'bishop', name: 'Greninja', pokemon: { species: 'Greninja', icon: 'GN' } },
  { element: 'water', type: 'bishop', name: 'Greninja', pokemon: { species: 'Greninja', icon: 'GN' } },
  { element: 'water', type: 'knight', name: 'Feraligatr', pokemon: { species: 'Feraligatr', icon: 'FG' } },
  { element: 'water', type: 'knight', name: 'Feraligatr', pokemon: { species: 'Feraligatr', icon: 'FG' } },
  { element: 'water', type: 'rook', name: 'Empoleon', pokemon: { species: 'Empoleon', icon: 'EP' } },
  { element: 'water', type: 'rook', name: 'Empoleon', pokemon: { species: 'Empoleon', icon: 'EP' } },
  ...Array.from({ length: 8 }, (_, index) => ({
    element: 'water' as const,
    type: 'pawn' as const,
    name: `Marill ${index + 1}`,
    pokemon: { species: 'Marill', icon: 'MR' },
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
