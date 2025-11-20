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

//fire team sprites
const charizardSprite = new URL('../assets/pokemon/Charizard.png', import.meta.url).href
const delphoxSprite = new URL('../assets/pokemon/Delphox.png', import.meta.url).href
const blazikenSprite = new URL('../assets/pokemon/Blaziken.png', import.meta.url).href
const infernapeSprite = new URL('../assets/pokemon/Infernape.png', import.meta.url).href
const emboarSprite = new URL('../assets/pokemon/Emboar.png', import.meta.url).href
const growlitheSprite = new URL('../assets/pokemon/Growlithe.png', import.meta.url).href
//water team sprites
const blastoiseSprite = new URL('../assets/pokemon/Blastoise.png', import.meta.url).href
const primarinaSprite = new URL('../assets/pokemon/Primarina.png', import.meta.url).href
const greninjaSprite = new URL('../assets/pokemon/Greninja.png', import.meta.url).href
const feraligatrSprite = new URL('../assets/pokemon/Feraligatr.png', import.meta.url).href
const empoleonSprite = new URL('../assets/pokemon/Empoleon.png', import.meta.url).href
const marillSprite = new URL('../assets/pokemon/Marill.png', import.meta.url).href
//grass team sprites
const venusaurSprite = new URL('../assets/pokemon/Venusaur.png', import.meta.url).href
const meganiumSprite = new URL('../assets/pokemon/Meganium.png', import.meta.url).href
const cacturneSprite = new URL('../assets/pokemon/Cacturne.png', import.meta.url).href
const sceptileSprite = new URL('../assets/pokemon/Sceptile.png', import.meta.url).href
const gogoatSprite = new URL('../assets/pokemon/Gogoat.png', import.meta.url).href
const shroomishSprite = new URL('../assets/pokemon/Shroomish.png', import.meta.url).href
//electric team sprites
const electivireSprite = new URL('../assets/pokemon/Electivire.png', import.meta.url).href
const zeraoraSprite = new URL('../assets/pokemon/Zeraora.png', import.meta.url).href
const eelektrossSprite = new URL('../assets/pokemon/Eelektross.png', import.meta.url).href
const jolteonSprite = new URL('../assets/pokemon/Jolteon.png', import.meta.url).href
const ampharosSprite = new URL('../assets/pokemon/Ampharos.png', import.meta.url).href
const pichuSprite = new URL('../assets/pokemon/Pichu.png', import.meta.url).href

//ice team sprites
const bearticSprite = new URL('../assets/pokemon/Beartic.png', import.meta.url).href
const regiceSprite = new URL('../assets/pokemon/Regice.png', import.meta.url).href
const glalieSprite = new URL('../assets/pokemon/Glalie.png', import.meta.url).href
const glastrierSprite = new URL('../assets/pokemon/Glastrier.png', import.meta.url).href
const avaluggSprite = new URL('../assets/pokemon/Avalugg.png', import.meta.url).href
const vanilliteSprite = new URL('../assets/pokemon/Vanillite.png', import.meta.url).href
//rock team sprites
const TyranitarSprite = new URL('../assets/pokemon/Tyranitar.png', import.meta.url).href
const RegirockSprite = new URL('../assets/pokemon/Regirock.png', import.meta.url).href
const sudowoodoSprite = new URL('../assets/pokemon/Sudowoodo.png', import.meta.url).href
const lycanrocSprite = new URL('../assets/pokemon/Lycanroc.png', import.meta.url).href
const gigalithSprite = new URL('../assets/pokemon/Gigalith.png', import.meta.url).href
const geodudeSprite = new URL('../assets/pokemon/Geodude.png', import.meta.url).href
//ground team sprites
const rhyperiorSprite = new URL('../assets/pokemon/Rhyperior.png', import.meta.url).href
const excadrillSprite = new URL('../assets/pokemon/Excadrill.png', import.meta.url).href
const SandslashSprite = new URL('../assets/pokemon/Sandslash.png', import.meta.url).href
const mudsdaleSprite = new URL('../assets/pokemon/Mudsdale.png', import.meta.url).href
const HippowdonSprite = new URL('../assets/pokemon/Hippowdon.png', import.meta.url).href
const CuboneSprite = new URL('../assets/pokemon/Cubone.png', import.meta.url).href
//flying team sprites
const CorviknightSprite = new URL('../assets/pokemon/Corviknight.png', import.meta.url).href
const BombirdierSprite = new URL('../assets/pokemon/Bombirdier.png', import.meta.url).href
const NoctowlSprite = new URL('../assets/pokemon/Noctowl.png', import.meta.url).href
const FarfetchSprite = new URL('../assets/pokemon/Farfetch.png', import.meta.url).href
const BraviarySprite = new URL('../assets/pokemon/Braviary.png', import.meta.url).href
const pidgeSprite = new URL('../assets/pokemon/Pidgey.png', import.meta.url).href
//psychic team sprites
const alakazamSprite = new URL('../assets/pokemon/Alakazam.png', import.meta.url).href
const GothitelleSprite = new URL('../assets/pokemon/Gothitelle.png', import.meta.url).href
const MewtwoSprite = new URL('../assets/pokemon/Mewtwo.png', import.meta.url).href
const GrumpigSprite = new URL('../assets/pokemon/Grumpig.png', import.meta.url).href
const BeheeyemSprite = new URL('../assets/pokemon/Beheeyem.png', import.meta.url).href
const SolosisSprite = new URL('../assets/pokemon/Solosis.png', import.meta.url).href
//ghost team sprites
const DusknoirSprite = new URL('../assets/pokemon/Dusknoir.png', import.meta.url).href
const DrifblimSprite = new URL('../assets/pokemon/Drifblim.png', import.meta.url).href
const mismagiusSprite = new URL('../assets/pokemon/Mismagius.png', import.meta.url).href
const SpectrierSprite = new URL('../assets/pokemon/Spectrier.png', import.meta.url).href
const CofagrigusSprite = new URL('../assets/pokemon/Cofagrigus.png', import.meta.url).href
const gastlySprite = new URL('../assets/pokemon/Gastly.png', import.meta.url).href
//dark team sprites
const darkraiSprite = new URL('../assets/pokemon/Darkrai.png', import.meta.url).href
const zoroarkSprite = new URL('../assets/pokemon/Zoroark.png', import.meta.url).href
const weavileSprite = new URL('../assets/pokemon/Weavile.png', import.meta.url).href
const absolSprite = new URL('../assets/pokemon/Absol.png', import.meta.url).href
const houndoomSprite = new URL('../assets/pokemon/Houndoom.png', import.meta.url).href
const purrloinSprite = new URL('../assets/pokemon/Purrloin.png', import.meta.url).href

//steel team sprites
const aggronSprite = new URL('../assets/pokemon/Aggron.png', import.meta.url).href
const registeelSprite = new URL('../assets/pokemon/Registeel.png', import.meta.url).href
const bisharpSprite = new URL('../assets/pokemon/Bisharp.png', import.meta.url).href
const metagrossSprite = new URL('../assets/pokemon/Metagross.png', import.meta.url).href
const steelixSprite = new URL('../assets/pokemon/Steelix.png', import.meta.url).href
const bronzorSprite = new URL('../assets/pokemon/Bronzor.png', import.meta.url).href

//dragon team sprites
const garchompSprite = new URL('../assets/pokemon/Garchomp.png', import.meta.url).href
const goodraSprite = new URL('../assets/pokemon/Goodra.png', import.meta.url).href
const haxorusSprite = new URL('../assets/pokemon/Haxorus.png', import.meta.url).href
const kommooSprite = new URL('../assets/pokemon/Kommo-o.png', import.meta.url).href
const druddigonSprite = new URL('../assets/pokemon/Druddigon.png', import.meta.url).href
const bagonSprite = new URL('../assets/pokemon/Bagon.png', import.meta.url).href

//fairy team sprites
const mimeSprite = new URL('../assets/pokemon/Mr-Mime.png', import.meta.url).href
const gardevoirSprite = new URL('../assets/pokemon/Gardevoir.png', import.meta.url).href
const clefableSprite = new URL('../assets/pokemon/Clefable.png', import.meta.url).href
const sylveonSprite = new URL('../assets/pokemon/Sylveon.png', import.meta.url).href
const wigglytuffSprite = new URL('../assets/pokemon/Wigglytuff.png', import.meta.url).href
const swirlixSprite = new URL('../assets/pokemon/Swirlix.png', import.meta.url).href
//bug team sprites
const golisopodSprite = new URL('../assets/pokemon/Golisopod.png', import.meta.url).href
const vespiquenSprite = new URL('../assets/pokemon/Vespiquen.png', import.meta.url).href
const scizorSprite = new URL('../assets/pokemon/Scizor.png', import.meta.url).href
const ariadosSprite = new URL('../assets/pokemon/Ariados.png', import.meta.url).href
const durantSprite = new URL('../assets/pokemon/Durant.png', import.meta.url).href
const joltikSprite = new URL('../assets/pokemon/Joltik.png', import.meta.url).href
//fighting team sprites
const annihilapeSprite = new URL('../assets/pokemon/Annihilape.png', import.meta.url).href
const mienshaoSprite = new URL('../assets/pokemon/Mienshao.png', import.meta.url).href
const sawkSprite = new URL('../assets/pokemon/Sawk.png', import.meta.url).href
const lucarioSprite = new URL('../assets/pokemon/Lucario.png', import.meta.url).href
const conkeldurrSprite = new URL('../assets/pokemon/Conkeldurr.png', import.meta.url).href
const machopSprite = new URL('../assets/pokemon/Machop.png', import.meta.url).href

//poison team sprites
const nidokingSprite = new URL('../assets/pokemon/Nidoking.png', import.meta.url).href
const nidoqueenSprite = new URL('../assets/pokemon/Nidoqueen.png', import.meta.url).href
const drapionSprite = new URL('../assets/pokemon/Drapion.png', import.meta.url).href
const toxicroakSprite = new URL('../assets/pokemon/Toxicroak.png', import.meta.url).href
const garbodorSprite = new URL('../assets/pokemon/Garbodor.png', import.meta.url).href
const grimerSprite = new URL('../assets/pokemon/Grimer.png', import.meta.url).href
//normal team sprites
const slakingSprite = new URL('../assets/pokemon/Slaking.png', import.meta.url).href
const lopunnySprite = new URL('../assets/pokemon/Lopunny.png', import.meta.url).href
const ursaringSprite = new URL('../assets/pokemon/Ursaring.png', import.meta.url).href
const delcattySprite = new URL('../assets/pokemon/Delcatty.png', import.meta.url).href
const snorlaxSprite = new URL('../assets/pokemon/Snorlax.png', import.meta.url).href
const eeveeSprite = new URL('../assets/pokemon/Eevee.png', import.meta.url).href

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
    king: { image: charizardSprite, species: 'Charizard' },
    queen: { image: delphoxSprite, species: 'Delphox' },
    bishop: { image: blazikenSprite, species: 'Blaziken' },
    knight: { image: infernapeSprite, species: 'Infernape' },
    rook: { image: emboarSprite, species: 'Emboar' },
    pawn: { image: growlitheSprite, species: 'Growlithe' },
  },
  water: {
    king: { image: blastoiseSprite, species: 'Blastoise' },
    queen: { image: primarinaSprite, species: 'Primarina' },
    bishop: { image: greninjaSprite, species: 'Greninja' },
    knight: { image: feraligatrSprite, species: 'Feraligatr' },
    rook: { image: empoleonSprite, species: 'Empoleon' },
    pawn: { image: marillSprite, species: 'Marill' },
  },
  grass: {
    king: { image: venusaurSprite, species: 'Venusaur' },
    queen: { image: meganiumSprite, species: 'Meganium' },
    bishop: { image: sceptileSprite, species: 'Sceptile' },
    knight: { image: gogoatSprite, species: 'Gogoat' },
    rook: { image: cacturneSprite, species: 'Cacturne' },
    pawn: { image: shroomishSprite, species: 'Shroomish' },
  },
  electric: {
    king: { image: electivireSprite, species: 'Electivire' },
    queen: { image: zeraoraSprite, species: 'Zeraora' },
    bishop: { image: eelektrossSprite, species: 'Eelektross' },
    knight: { image: jolteonSprite, species: 'Jolteon' },
    rook: { image: ampharosSprite, species: 'Ampharos' },
    pawn: { image: pichuSprite, species: 'Pichu' },
  },
  ice: {
    king: { image: bearticSprite, species: 'Beartic' },
    queen: { image: regiceSprite, species: 'Regice' },
    bishop: { image: glalieSprite, species: 'Glalie' },
    knight: { image: glastrierSprite, species: 'Glastrier' },
    rook: { image: avaluggSprite, species: 'Avalugg' },
    pawn: { image: vanilliteSprite, species: 'Vanillite' },
  },
  rock: {
    king: { image: TyranitarSprite, species: 'Tyranitar' },
    queen: { image: RegirockSprite, species: 'Regirock' },
    bishop: { image: sudowoodoSprite, species: 'Sudowoodo' },
    knight: { image: lycanrocSprite, species: 'Lycanroc' },
    rook: { image: gigalithSprite, species: 'Gigalith' },
    pawn: { image: geodudeSprite, species: 'Geodude' },
  },
  ground: {
    king: { image: rhyperiorSprite, species: 'Rhyperior' },
    queen: { image: excadrillSprite, species: 'Excadrill' },
    bishop: { image: SandslashSprite, species: 'Sandslash' },
    knight: { image: mudsdaleSprite, species: 'Mudsdale' },
    rook: { image: HippowdonSprite, species: 'Hippowdon' },
    pawn: { image: CuboneSprite, species: 'Cubone' },
  },
  flying: {
    king: { image: CorviknightSprite, species: 'Corviknight' },
    queen: { image: BombirdierSprite, species: 'Bombirdier' },
    bishop: { image: NoctowlSprite, species: 'Noctowl' },
    knight: { image: FarfetchSprite, species: 'Farfetch' },
    rook: { image: BraviarySprite, species: 'Braviary' },
    pawn: { image: pidgeSprite, species: 'Pidgey' },
  },
  psychic: {
    bishop: { image: alakazamSprite, species: 'Alakazam' },
    queen: { image: GothitelleSprite, species: 'Gothitelle' },
    king: { image: MewtwoSprite, species: 'Mewtwo' },
    knight: { image: GrumpigSprite, species: 'Grumpig' },
    rook: { image: BeheeyemSprite, species: 'Beheeyem' },
    pawn: { image: SolosisSprite, species: 'Solosis' },
  },
  ghost: {
    king: { image: DusknoirSprite, species: 'Dusknoir' },
    bishop: { image: DrifblimSprite, species: 'Drifblim' },
    queen: { image: mismagiusSprite, species: 'Mismagius' },
    knight: { image: SpectrierSprite, species: 'Spectrier' },
    rook: { image: CofagrigusSprite, species: 'Cofagrigus' },
    pawn: { image: gastlySprite, species: 'Gastly' },
  },
  dark: {
    king: { image: darkraiSprite, species: 'Darkrai' },
    queen: { image: zoroarkSprite, species: 'Zoroark' },
    bishop: { image: weavileSprite, species: 'Weavile' },
    knight: { image: absolSprite, species: 'Absol' },
    rook: { image: houndoomSprite, species: 'Houndoom' },
    pawn: { image: purrloinSprite, species: 'Purrloin' },
  },
  steel: {
    king: { image: aggronSprite, species: 'Aggron' },
    queen: { image: registeelSprite, species: 'Registeel' },
    bishop: { image: bisharpSprite, species: 'Bisharp' },
    knight: { image: metagrossSprite, species: 'Metagross' },
    rook: { image: steelixSprite, species: 'Steelix' },
    pawn: { image: bronzorSprite, species: 'Bronzor' },
  },
  dragon: {
    king: { image: garchompSprite, species: 'Garchomp' },
    queen: { image: goodraSprite, species: 'Goodra' },
    bishop: { image: haxorusSprite, species: 'Haxorus' },
    knight: { image: kommooSprite, species: 'Kommo-o' },
    rook: { image: druddigonSprite, species: 'Druddigon' },
    pawn: { image: bagonSprite, species: 'Bagon' },
  },
  fairy: {
    king: { image: mimeSprite, species: 'Mime' },
    queen: { image: gardevoirSprite, species: 'Gardevoir' },
    bishop: { image: clefableSprite, species: 'Clefable' },
    knight: { image: sylveonSprite, species: 'Sylveon' },
    rook: { image: wigglytuffSprite, species: 'Wigglytuff' },
    pawn: { image: swirlixSprite, species: 'Swirlix' },
  },
  bug: {
    king: { image: golisopodSprite, species: 'Golisopod' },
    queen: { image: vespiquenSprite, species: 'Vespiquen' },
    bishop: { image: scizorSprite, species: 'Scizor' },
    knight: { image: ariadosSprite, species: 'Ariados' },
    rook: { image: durantSprite, species: 'Durant' },
    pawn: { image: joltikSprite, species: 'Joltik' },
  },
  fighting: {
    king: { image: annihilapeSprite, species: 'Annihilape' },
    queen: { image: mienshaoSprite, species: 'Mienshao' },
    bishop: { image: sawkSprite, species: 'Sawk' },
    knight: { image: lucarioSprite, species: 'Lucario' },
    rook: { image: conkeldurrSprite, species: 'Conkeldurr' },
    pawn: { image: machopSprite, species: 'Machop' },
  },
  poison: {
    king: { image: nidokingSprite, species: 'Nidoking' },
    queen: { image: nidoqueenSprite, species: 'Nidoqueen' },
    bishop: { image: drapionSprite, species: 'Drapion' },
    knight: { image: toxicroakSprite, species: 'Toxicroak' },
    rook: { image: garbodorSprite, species: 'Garbodor' },
    pawn: { image: grimerSprite, species: 'Grimer' },
  },
  normal: {
    king: { image: slakingSprite, species: 'Slaking' },
    queen: { image: lopunnySprite, species: 'Lopunny' },
    bishop: { image: ursaringSprite, species: 'Ursaring' },
    knight: { image: delcattySprite, species: 'Delcatty' },
    rook: { image: snorlaxSprite, species: 'Snorlax' },
    pawn: { image: eeveeSprite, species: 'Eevee' },
  },
}

export const teamTheme: Record<Element, { label: string; color: string; pawnIcon: string }> = {
  fire: { label: 'Fire', color: '#f97316', pawnIcon: growlitheSprite },
  water: { label: 'Water', color: '#38bdf8', pawnIcon: marillSprite },
  grass: { label: 'Grass', color: '#4ade80', pawnIcon: shroomishSprite },
  electric: { label: 'Electric', color: '#fde047', pawnIcon: pichuSprite },
  ice: { label: 'Ice', color: '#7dd3fc', pawnIcon: vanilliteSprite },
  rock: { label: 'Rock', color: '#fbbf24', pawnIcon: geodudeSprite },
  ground: { label: 'Ground', color: '#fbb888', pawnIcon: CuboneSprite },
  flying: { label: 'Flying', color: '#bae6fd', pawnIcon: pidgeSprite },
  psychic: { label: 'Psychic', color: '#EF4179', pawnIcon: SolosisSprite },
  ghost: { label: 'Ghost', color: '#c084fc', pawnIcon: gastlySprite },
  dark: { label: 'Dark', color: '#475569', pawnIcon: purrloinSprite },
  steel: { label: 'Steel', color: '#94a3b8', pawnIcon: bronzorSprite },
  dragon: { label: 'Dragon', color: '#5060E1', pawnIcon: bagonSprite },
  fairy: { label: 'Fairy', color: '#f9a8d4', pawnIcon: swirlixSprite },
  bug: { label: 'Bug', color: '#bef264', pawnIcon: joltikSprite },
  fighting: { label: 'Fighting', color: '#ef4444', pawnIcon: machopSprite },
  poison: { label: 'Poison', color: '#a855f7', pawnIcon: grimerSprite },
  normal: { label: 'Normal', color: '#e2e8f0', pawnIcon: eeveeSprite },
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

function createPokemonMetadata(
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
