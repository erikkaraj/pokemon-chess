import { fireTeam, waterTeam, cloneConfig } from '../data/pokemon'
import { BoardFile, BoardRank, Piece, PieceType, Square } from '../types/chess'

export const BOARD_FILES: BoardFile[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const BOARD_RANKS: BoardRank[] = [8, 7, 6, 5, 4, 3, 2, 1]

export type BoardState = Record<Square, Piece | null>

type PiecePool = Record<PieceType, Piece[]>

const BACK_RANK_ORDER: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']

function createPiecePool(configs: typeof fireTeam | typeof waterTeam): PiecePool {
  const pool: PiecePool = {
    king: [],
    queen: [],
    rook: [],
    bishop: [],
    knight: [],
    pawn: [],
  }

  configs.forEach((config, index) => {
    const piece = cloneConfig(config, index)
    pool[piece.type].push({ ...piece })
  })

  return pool
}

function takePiece(pool: PiecePool, type: PieceType) {
  const bucket = pool[type]
  if (!bucket.length) {
    throw new Error(`Ran out of ${type} pieces while setting up the board`)
  }
  return bucket.shift()!
}

function createEmptyBoard(): BoardState {
  const board = {} as BoardState
  BOARD_FILES.forEach((file) => {
    BOARD_RANKS.forEach((rank) => {
      const square = `${file}${rank}` as Square
      board[square] = null
    })
  })
  return board
}

export function createInitialBoard(): BoardState {
  const board = createEmptyBoard()

  const firePool = createPiecePool(fireTeam)
  const waterPool = createPiecePool(waterTeam)

  BOARD_FILES.forEach((file) => {
    board[`${file}2` as Square] = takePiece(firePool, 'pawn')
    board[`${file}7` as Square] = takePiece(waterPool, 'pawn')
  })

  BOARD_FILES.forEach((file, index) => {
    const fireSquare = `${file}1` as Square
    const waterSquare = `${file}8` as Square
    const type = BACK_RANK_ORDER[index]
    board[fireSquare] = takePiece(firePool, type)
    board[waterSquare] = takePiece(waterPool, type)
  })

  return board
}

export function cloneBoard(board: BoardState): BoardState {
  const nextBoard = {} as BoardState
  Object.entries(board).forEach(([square, piece]) => {
    nextBoard[square as Square] = piece ? { ...piece } : null
  })
  return nextBoard
}

export function squareToCoords(square: Square): { fileIndex: number; rankIndex: number } {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rank = Number(square[1]) - 1
  return { fileIndex: file, rankIndex: rank }
}

export function coordsToSquare(fileIndex: number, rankIndex: number): Square | null {
  if (fileIndex < 0 || fileIndex >= BOARD_FILES.length) return null
  if (rankIndex < 0 || rankIndex >= BOARD_RANKS.length) return null
  const file = BOARD_FILES[fileIndex]
  const rank = (rankIndex + 1) as BoardRank
  return `${file}${rank}` as Square
}
