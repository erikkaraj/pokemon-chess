import { BoardState, coordsToSquare, squareToCoords } from './board'
import { Element, Piece, PieceType, Square } from '../types/chess'

interface MoveGeneratorArgs {
  board: BoardState
  from: Square
  piece: Piece
}

type MoveGenerator = (args: MoveGeneratorArgs) => Square[]

const directionalVectors: Record<PieceType, Array<[number, number]>> = {
  king: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  queen: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  rook: [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ],
  bishop: [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ],
  knight: [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ],
  pawn: [],
}

const slideTypes: PieceType[] = ['queen', 'rook', 'bishop']

const slideMoves: MoveGenerator = ({ board, from, piece }) => {
  const moves: Square[] = []
  const vectors = directionalVectors[piece.type]
  const { fileIndex, rankIndex } = squareToCoords(from)

  vectors.forEach(([fileStep, rankStep]) => {
    let nextFile = fileIndex + fileStep
    let nextRank = rankIndex + rankStep
    while (true) {
      const nextSquare = coordsToSquare(nextFile, nextRank)
      if (!nextSquare) break
      const occupant = board[nextSquare]
      if (!occupant) {
        moves.push(nextSquare)
      } else {
        if (occupant.element !== piece.element) {
          moves.push(nextSquare)
        }
        break
      }
      nextFile += fileStep
      nextRank += rankStep
    }
  })

  return moves
}

const singleStepMoves: MoveGenerator = ({ board, from, piece }) => {
  const moves: Square[] = []
  const vectors = directionalVectors[piece.type]
  const { fileIndex, rankIndex } = squareToCoords(from)

  vectors.forEach(([fileStep, rankStep]) => {
    const nextSquare = coordsToSquare(fileIndex + fileStep, rankIndex + rankStep)
    if (!nextSquare) return
    const occupant = board[nextSquare]
    if (!occupant || occupant.element !== piece.element) {
      moves.push(nextSquare)
    }
  })

  return moves
}

const pawnMoves: MoveGenerator = ({ board, from, piece }) => {
  const moves: Square[] = []
  const { fileIndex, rankIndex } = squareToCoords(from)
  const direction = piece.element === 'fire' ? 1 : -1
  const startRank = piece.element === 'fire' ? 1 : 6

  const oneStep = coordsToSquare(fileIndex, rankIndex + direction)
  if (oneStep && !board[oneStep]) {
    moves.push(oneStep)
    const twoStep = coordsToSquare(fileIndex, rankIndex + direction * 2)
    if (rankIndex === startRank && twoStep && !board[twoStep]) {
      moves.push(twoStep)
    }
  }

  const captureVectors: Array<[number, number]> = [
    [-1, direction],
    [1, direction],
  ]
  captureVectors.forEach(([fileStep, rankStep]) => {
    const target = coordsToSquare(fileIndex + fileStep, rankIndex + rankStep)
    if (!target) return
    const occupant = board[target]
    if (occupant && occupant.element !== piece.element) {
      moves.push(target)
    }
  })

  return moves
}

const generators: Record<PieceType, MoveGenerator> = {
  king: singleStepMoves,
  queen: slideMoves,
  rook: slideMoves,
  bishop: slideMoves,
  knight: singleStepMoves,
  pawn: pawnMoves,
}

export function getPseudoLegalMoves(args: MoveGeneratorArgs) {
  const { piece } = args
  if (slideTypes.includes(piece.type)) {
    return slideMoves(args)
  }
  return generators[piece.type](args)
}

export function getLegalMoves(args: MoveGeneratorArgs & { board: BoardState }) {
  const pseudoMoves = getPseudoLegalMoves(args)
  return pseudoMoves.filter(
    (targetSquare) => !wouldExposeKing(args.board, args.from, targetSquare, args.piece),
  )
}

function wouldExposeKing(board: BoardState, from: Square, to: Square, movingPiece: Piece) {
  const nextBoard: BoardState = { ...board }
  const updatedPiece: Piece = { ...movingPiece, hasMoved: true }
  nextBoard[from] = null
  nextBoard[to] = updatedPiece

  const kingSquare =
    movingPiece.type === 'king' ? to : findKingSquare(nextBoard, movingPiece.element)
  if (!kingSquare) return false

  const opponent = getOpponentElement(movingPiece.element)
  return isSquareUnderAttack(nextBoard, kingSquare, opponent)
}

function findKingSquare(board: BoardState, element: Element): Square | null {
  return (
    (Object.entries(board).find(
      ([, piece]) => piece && piece.element === element && piece.type === 'king',
    )?.[0] as Square | undefined) ?? null
  )
}

function getOpponentElement(element: Element): Element {
  return element === 'fire' ? 'water' : 'fire'
}

function isSquareUnderAttack(board: BoardState, targetSquare: Square, attackerElement: Element) {
  for (const [square, piece] of Object.entries(board) as [Square, Piece | null][]) {
    if (!piece || piece.element !== attackerElement) continue
    const attacks = getAttackSquares(board, square, piece)
    if (attacks.includes(targetSquare)) {
      return true
    }
  }
  return false
}

function getAttackSquares(board: BoardState, from: Square, piece: Piece): Square[] {
  if (piece.type === 'pawn') {
    return pawnAttackSquares(from, piece)
  }

  if (piece.type === 'knight') {
    return pieceVectorsToSquares(from, directionalVectors.knight)
  }

  if (piece.type === 'king') {
    return pieceVectorsToSquares(from, directionalVectors.king)
  }

  return slideMoves({ board, from, piece })
}

function pawnAttackSquares(from: Square, piece: Piece): Square[] {
  const attacks: Square[] = []
  const { fileIndex, rankIndex } = squareToCoords(from)
  const direction = piece.element === 'fire' ? 1 : -1
  ;[
    [-1, direction],
    [1, direction],
  ].forEach(([fileStep, rankStep]) => {
    const target = coordsToSquare(fileIndex + fileStep, rankIndex + rankStep)
    if (target) {
      attacks.push(target)
    }
  })
  return attacks
}

function pieceVectorsToSquares(from: Square, vectors: Array<[number, number]>) {
  const moves: Square[] = []
  const { fileIndex, rankIndex } = squareToCoords(from)
  vectors.forEach(([fileStep, rankStep]) => {
    const nextSquare = coordsToSquare(fileIndex + fileStep, rankIndex + rankStep)
    if (nextSquare) {
      moves.push(nextSquare)
    }
  })
  return moves
}

export function isElementInCheck(board: BoardState, element: Element): boolean {
  const kingSquare = findKingSquare(board, element)
  if (!kingSquare) return false
  const opponent = getOpponentElement(element)
  return isSquareUnderAttack(board, kingSquare, opponent)
}

export function hasAnyLegalMoves(board: BoardState, element: Element): boolean {
  for (const [square, piece] of Object.entries(board) as [Square, Piece | null][]) {
    if (!piece || piece.element !== element) continue
    const moves = getLegalMoves({ board, piece, from: square })
    if (moves.length) {
      return true
    }
  }
  return false
}
