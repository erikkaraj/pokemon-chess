export type Element = 'fire' | 'water'

export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'

export type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Square = `${BoardFile}${BoardRank}`

export interface PokemonMetadata {
  readonly species: string
  readonly icon: string
  readonly image?: string
}

export interface Piece {
  readonly id: string
  readonly name: string
  readonly type: PieceType
  readonly element: Element
  readonly pokemon: PokemonMetadata
  hasMoved: boolean
}

export interface MoveRecord {
  readonly from: Square
  readonly to: Square
  readonly piece: Piece
  readonly captured?: Piece
}
