import { Element, PieceType, PokemonMetadata } from '../types/chess'

export interface PokemonPieceConfig {
  readonly element: Element
  readonly type: PieceType
  readonly name: string
  readonly pokemon: PokemonMetadata
}

const PIECE_TEMPLATE: Array<{ type: PieceType; count: number }> = [
  { type: 'king', count: 1 },
  { type: 'queen', count: 1 },
  { type: 'rook', count: 2 },
  { type: 'bishop', count: 2 },
  { type: 'knight', count: 2 },
  { type: 'pawn', count: 8 },
]

const sprite = (fileName: string) =>
  new URL(`../assets/pokemon/${fileName}.png`, import.meta.url).href

const spriteManifest: Partial<
  Record<
    Element,
    Partial<
      Record<
        PieceType,
        {
          image: string
          species: string
        }
      >
    >
  >
> = {
  fire: {
    king: { image: sprite('Charizard'), species: 'Charizard' },
    queen: { image: sprite('Delphox'), species: 'Delphox' },
    bishop: { image: sprite('Blaziken'), species: 'Blaziken' },
    knight: { image: sprite('Infernape'), species: 'Infernape' },
    rook: { image: sprite('Emboar'), species: 'Emboar' },
    pawn: { image: sprite('Growlithe'), species: 'Growlithe' },
  },
  water: {
    king: { image: sprite('Blastoise'), species: 'Blastoise' },
    queen: { image: sprite('Primarina'), species: 'Primarina' },
    bishop: { image: sprite('Greninja'), species: 'Greninja' },
    knight: { image: sprite('Feraligatr'), species: 'Feraligatr' },
    rook: { image: sprite('Empoleon'), species: 'Empoleon' },
    pawn: { image: sprite('Marill'), species: 'Marill' },
  },
  grass: {
    king: { image: sprite('Venusaur'), species: 'Venusaur' },
    queen: { image: sprite('Meganium'), species: 'Meganium' },
    bishop: { image: sprite('Sceptile'), species: 'Sceptile' },
    knight: { image: sprite('Gogoat'), species: 'Gogoat' },
    rook: { image: sprite('Cacturne'), species: 'Cacturne' },
    pawn: { image: sprite('Shroomish'), species: 'Shroomish' },
  },
  electric: {
    king: { image: sprite('Electivire'), species: 'Electivire' },
    queen: { image: sprite('Zeraora'), species: 'Zeraora' },
    bishop: { image: sprite('Eelektross'), species: 'Eelektross' },
    knight: { image: sprite('Jolteon'), species: 'Jolteon' },
    rook: { image: sprite('Ampharos'), species: 'Ampharos' },
    pawn: { image: sprite('Pichu'), species: 'Pichu' },
  },
  ice: {
    king: { image: sprite('Beartic'), species: 'Beartic' },
    queen: { image: sprite('Regice'), species: 'Regice' },
    bishop: { image: sprite('Glalie'), species: 'Glalie' },
    knight: { image: sprite('Glastrier'), species: 'Glastrier' },
    rook: { image: sprite('Avalugg'), species: 'Avalugg' },
    pawn: { image: sprite('Vanillite'), species: 'Vanillite' },
  },
  rock: {
    king: { image: sprite('Tyranitar'), species: 'Tyranitar' },
    queen: { image: sprite('Regirock'), species: 'Regirock' },
    bishop: { image: sprite('Sudowoodo'), species: 'Sudowoodo' },
    knight: { image: sprite('Lycanroc'), species: 'Lycanroc' },
    rook: { image: sprite('Gigalith'), species: 'Gigalith' },
    pawn: { image: sprite('Geodude'), species: 'Geodude' },
  },
  ground: {
    king: { image: sprite('Rhyperior'), species: 'Rhyperior' },
    queen: { image: sprite('Excadrill'), species: 'Excadrill' },
    bishop: { image: sprite('Sandslash'), species: 'Sandslash' },
    knight: { image: sprite('Mudsdale'), species: 'Mudsdale' },
    rook: { image: sprite('Hippowdon'), species: 'Hippowdon' },
    pawn: { image: sprite('Cubone'), species: 'Cubone' },
  },
  flying: {
    king: { image: sprite('Corviknight'), species: 'Corviknight' },
    queen: { image: sprite('Bombirdier'), species: 'Bombirdier' },
    bishop: { image: sprite('Noctowl'), species: 'Noctowl' },
    knight: { image: sprite('Farfetch'), species: 'Farfetch' },
    rook: { image: sprite('Braviary'), species: 'Braviary' },
    pawn: { image: sprite('Pidgey'), species: 'Pidgey' },
  },
  psychic: {
    bishop: { image: sprite('Alakazam'), species: 'Alakazam' },
    queen: { image: sprite('Gothitelle'), species: 'Gothitelle' },
    king: { image: sprite('Mewtwo'), species: 'Mewtwo' },
    knight: { image: sprite('Grumpig'), species: 'Grumpig' },
    rook: { image: sprite('Beheeyem'), species: 'Beheeyem' },
    pawn: { image: sprite('Solosis'), species: 'Solosis' },
  },
  ghost: {
    king: { image: sprite('Dusknoir'), species: 'Dusknoir' },
    bishop: { image: sprite('Drifblim'), species: 'Drifblim' },
    queen: { image: sprite('Mismagius'), species: 'Mismagius' },
    knight: { image: sprite('Spectrier'), species: 'Spectrier' },
    rook: { image: sprite('Cofagrigus'), species: 'Cofagrigus' },
    pawn: { image: sprite('Gastly'), species: 'Gastly' },
  },
  dark: {
    king: { image: sprite('Darkrai'), species: 'Darkrai' },
    queen: { image: sprite('Zoroark'), species: 'Zoroark' },
    bishop: { image: sprite('Weavile'), species: 'Weavile' },
    knight: { image: sprite('Absol'), species: 'Absol' },
    rook: { image: sprite('Houndoom'), species: 'Houndoom' },
    pawn: { image: sprite('Purrloin'), species: 'Purrloin' },
  },
  steel: {
    king: { image: sprite('Aggron'), species: 'Aggron' },
    queen: { image: sprite('Registeel'), species: 'Registeel' },
    bishop: { image: sprite('Bisharp'), species: 'Bisharp' },
    knight: { image: sprite('Metagross'), species: 'Metagross' },
    rook: { image: sprite('Steelix'), species: 'Steelix' },
    pawn: { image: sprite('Bronzor'), species: 'Bronzor' },
  },
  dragon: {
    king: { image: sprite('Garchomp'), species: 'Garchomp' },
    queen: { image: sprite('Goodra'), species: 'Goodra' },
    bishop: { image: sprite('Haxorus'), species: 'Haxorus' },
    knight: { image: sprite('Kommo'), species: 'Kommo-o' },
    rook: { image: sprite('Druddigon'), species: 'Druddigon' },
    pawn: { image: sprite('Bagon'), species: 'Bagon' },
  },
  fairy: {
    king: { image: sprite('Mime'), species: 'Mime' },
    queen: { image: sprite('Gardevoir'), species: 'Gardevoir' },
    bishop: { image: sprite('Clefable'), species: 'Clefable' },
    knight: { image: sprite('Sylveon'), species: 'Sylveon' },
    rook: { image: sprite('Wigglytuff'), species: 'Wigglytuff' },
    pawn: { image: sprite('Swirlix'), species: 'Swirlix' },
  },
  bug: {
    king: { image: sprite('Golisopod'), species: 'Golisopod' },
    queen: { image: sprite('Vespiquen'), species: 'Vespiquen' },
    bishop: { image: sprite('Scizor'), species: 'Scizor' },
    knight: { image: sprite('Ariados'), species: 'Ariados' },
    rook: { image: sprite('Durant'), species: 'Durant' },
    pawn: { image: sprite('Joltik'), species: 'Joltik' },
  },
  fighting: {
    king: { image: sprite('Annihilape'), species: 'Annihilape' },
    queen: { image: sprite('Mienshao'), species: 'Mienshao' },
    bishop: { image: sprite('Sawk'), species: 'Sawk' },
    knight: { image: sprite('Lucario'), species: 'Lucario' },
    rook: { image: sprite('Conkeldurr'), species: 'Conkeldurr' },
    pawn: { image: sprite('Machop'), species: 'Machop' },
  },
  poison: {
    king: { image: sprite('Nidoking'), species: 'Nidoking' },
    queen: { image: sprite('Nidoqueen'), species: 'Nidoqueen' },
    bishop: { image: sprite('Drapion'), species: 'Drapion' },
    knight: { image: sprite('Toxicroak'), species: 'Toxicroak' },
    rook: { image: sprite('Garbodor'), species: 'Garbodor' },
    pawn: { image: sprite('Grimer'), species: 'Grimer' },
  },
  normal: {
    king: { image: sprite('Slaking'), species: 'Slaking' },
    queen: { image: sprite('Lopunny'), species: 'Lopunny' },
    bishop: { image: sprite('Ursaring'), species: 'Ursaring' },
    knight: { image: sprite('Delcatty'), species: 'Delcatty' },
    rook: { image: sprite('Snorlax'), species: 'Snorlax' },
    pawn: { image: sprite('Eevee'), species: 'Eevee' },
  },
}

export const teamTheme: Record<Element, { label: string; color: string; pawnIcon: string }> = {
  fire: { label: 'Fire', color: '#f97316', pawnIcon: sprite('Growlithe') },
  water: { label: 'Water', color: '#38bdf8', pawnIcon: sprite('Marill') },
  grass: { label: 'Grass', color: '#4ade80', pawnIcon: sprite('Shroomish') },
  electric: { label: 'Electric', color: '#fde047', pawnIcon: sprite('Pichu') },
  ice: { label: 'Ice', color: '#7dd3fc', pawnIcon: sprite('Vanillite') },
  rock: { label: 'Rock', color: '#fbbf24', pawnIcon: sprite('Geodude') },
  ground: { label: 'Ground', color: '#fbb888', pawnIcon: sprite('Cubone') },
  flying: { label: 'Flying', color: '#bae6fd', pawnIcon: sprite('Pidgey') },
  psychic: { label: 'Psychic', color: '#EF4179', pawnIcon: sprite('Solosis') },
  ghost: { label: 'Ghost', color: '#c084fc', pawnIcon: sprite('Gastly') },
  dark: { label: 'Dark', color: '#475569', pawnIcon: sprite('Purrloin') },
  steel: { label: 'Steel', color: '#94a3b8', pawnIcon: sprite('Bronzor') },
  dragon: { label: 'Dragon', color: '#5060E1', pawnIcon: sprite('Bagon') },
  fairy: { label: 'Fairy', color: '#f9a8d4', pawnIcon: sprite('Swirlix') },
  bug: { label: 'Bug', color: '#bef264', pawnIcon: sprite('Joltik') },
  fighting: { label: 'Fighting', color: '#ef4444', pawnIcon: sprite('Machop') },
  poison: { label: 'Poison', color: '#a855f7', pawnIcon: sprite('Grimer') },
  normal: { label: 'Normal', color: '#e2e8f0', pawnIcon: sprite('Eevee') },
}

export const availableTeams = Object.keys(teamTheme) as Element[]

export function buildTeamRoster(element: Element): PokemonPieceConfig[] {
  const prefix = element.charAt(0)

  return PIECE_TEMPLATE.flatMap(({ type, count }) => {
    const multiple = count > 1
    return Array.from({ length: count }, (_, index) => {
      const suffix = multiple ? `-${index + 1}` : ''
      const name = `${prefix}-${type}${suffix}`
      return {
        element,
        type,
        name,
        pokemon: createPokemonMetadata(element, type, name, index),
      }
    })
  })
}

export function getPieceTemplate(element: Element, type: PieceType): PokemonPieceConfig {
  const roster = buildTeamRoster(element)
  const match = roster.find((config) => config.type === type)
  if (match) {
    return match
  }
  const fallbackName = `${element}-${type}`
  return {
    element,
    type,
    name: fallbackName,
    pokemon: createPokemonMetadata(element, type, fallbackName, 0),
  }
}

export function createPokemonMetadata(
  element: Element,
  type: PieceType,
  fallbackName: string,
  index: number,
): PokemonMetadata {
  const meta = teamTheme[element]
  const sprite = spriteManifest[element]?.[type]

  if (sprite) {
    return {
      species: sprite.species,
      icon: `${meta.label[0]}${index + 1}`,
      image: sprite.image,
    }
  }

  return {
    species: fallbackName,
    icon: `${meta.label[0]}${index + 1}`,
    image: type === 'pawn' ? meta.pawnIcon : undefined,
  }
}

export function cloneConfig(config: PokemonPieceConfig, index: number) {
  return {
    id: `${config.element}-${config.type}-${index}`,
    element: config.element,
    type: config.type,
    name: config.name,
    pokemon: config.pokemon,
    side: 'south',
    hasMoved: false,
  } as const
}
