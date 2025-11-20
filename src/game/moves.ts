import { BoardState, coordsToSquare, squareToCoords } from './board'
import { Element, Piece, PieceType, Square } from '../types/chess'

interface MoveGeneratorArgs {
  board: BoardState
  from: Square
  piece: Piece
  enPassantTarget?: Square | null
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

const pawnMoves: MoveGenerator = ({ board, from, piece, enPassantTarget }) => {
  const moves: Square[] = []
  const { fileIndex, rankIndex } = squareToCoords(from)
  const direction = piece.side === 'south' ? 1 : -1
  const startRank = piece.side === 'south' ? 1 : 6

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

  if (enPassantTarget) {
    captureVectors.forEach(([fileStep, rankStep]) => {
      const target = coordsToSquare(fileIndex + fileStep, rankIndex + rankStep)
      if (target === enPassantTarget && !board[target]) {
        moves.push(target)
      }
    })
  }

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
  let legalMoves = getPseudoLegalMoves(args).filter(
    (targetSquare) =>
      !wouldExposeKing(
        args.board,
        args.from,
        targetSquare,
        args.piece,
        args.enPassantTarget ?? null,
      ),
  )

  if (args.piece.type === 'king') {
    legalMoves = [...legalMoves, ...getCastleMoves(args.board, args.from, args.piece)]
  }

  return legalMoves
}

function wouldExposeKing(
  board: BoardState,
  from: Square,
  to: Square,
  movingPiece: Piece,
  enPassantTarget: Square | null,
) {
  const nextBoard: BoardState = { ...board }
  const updatedPiece: Piece = { ...movingPiece, hasMoved: true }
  nextBoard[from] = null
  nextBoard[to] = updatedPiece

  if (
    movingPiece.type === 'pawn' &&
    enPassantTarget &&
    to === enPassantTarget &&
    !board[to] &&
    squareToCoords(from).fileIndex !== squareToCoords(to).fileIndex
  ) {
    const { fileIndex, rankIndex } = squareToCoords(to)
    const captureSquare = coordsToSquare(
      fileIndex,
      rankIndex - (movingPiece.side === 'south' ? 1 : -1),
    )
    if (captureSquare) {
      nextBoard[captureSquare] = null
    }
  }

  const kingSquare =
    movingPiece.type === 'king' ? to : findKingSquare(nextBoard, movingPiece.element)
  if (!kingSquare) return false

  const opponent = getOpponentElement(nextBoard, movingPiece.element)
  return isSquareUnderAttack(nextBoard, kingSquare, opponent)
}

function findKingSquare(board: BoardState, element: Element): Square | null {
  return (
    (Object.entries(board).find(
      ([, piece]) => piece && piece.element === element && piece.type === 'king',
    )?.[0] as Square | undefined) ?? null
  )
}

function getOpponentElement(board: BoardState, element: Element): Element {
  for (const piece of Object.values(board)) {
    if (piece && piece.element !== element) {
      return piece.element
    }
  }
  return element
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

function getCastleMoves(board: BoardState, from: Square, king: Piece) {
  const moves: Square[] = []
  if (king.hasMoved) return moves

  const opponent = getOpponentElement(board, king.element)
  if (isSquareUnderAttack(board, from, opponent)) return moves

  ;[-1, 1].forEach((direction) => {
    const rookSquare = findCastleRook(board, from, king, direction)
    if (!rookSquare) return

    const { fileIndex, rankIndex } = squareToCoords(from)
    const firstStep = coordsToSquare(fileIndex + direction, rankIndex)
    const secondStep = coordsToSquare(fileIndex + direction * 2, rankIndex)
    if (!firstStep || !secondStep) return
    if (board[firstStep] || board[secondStep]) return

    if (
      isSquareUnderAttack(board, firstStep, opponent) ||
      isSquareUnderAttack(board, secondStep, opponent)
    ) {
      return
    }

    moves.push(secondStep)
  })

  return moves
}

function findCastleRook(board: BoardState, from: Square, king: Piece, direction: number) {
  const { fileIndex, rankIndex } = squareToCoords(from)
  let currentFile = fileIndex + direction
  while (true) {
    const square = coordsToSquare(currentFile, rankIndex)
    if (!square) break
    const occupant = board[square]
    if (occupant) {
      if (
        occupant.type === 'rook' &&
        occupant.element === king.element &&
        occupant.side === king.side &&
        !occupant.hasMoved
      ) {
        return square
      }
      break
    }
    currentFile += direction
  }
  return null
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
  const direction = piece.side === 'south' ? 1 : -1
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
  const opponent = getOpponentElement(board, element)
  return isSquareUnderAttack(board, kingSquare, opponent)
}

export function hasAnyLegalMoves(
  board: BoardState,
  element: Element,
  enPassantTarget: Square | null,
): boolean {
  for (const [square, piece] of Object.entries(board) as [Square, Piece | null][]) {
    if (!piece || piece.element !== element) continue
    const moves = getLegalMoves({ board, piece, from: square, enPassantTarget })
    if (moves.length) {
      return true
    }
  }
  return false
}
