import { useMemo, useState } from 'react'
import { BoardState, createInitialBoard } from './board'
import { getLegalMoves, hasAnyLegalMoves, isElementInCheck } from './moves'
import { Element, MoveRecord, Piece, Square } from '../types/chess'

const TURN_ORDER: Element[] = ['fire', 'water']

export interface GameState {
  board: BoardState
  activeElement: Element
  selectedSquare: Square | null
  legalMoves: Square[]
  moveHistory: MoveRecord[]
  capturedPieces: Record<Element, Piece[]>
  winner: Element | null
  reset: () => void
  handleSquareClick: (square: Square) => void
}

export function useGameState(): GameState {
  const [board, setBoard] = useState<BoardState>(() => createInitialBoard())
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [legalMoves, setLegalMoves] = useState<Square[]>([])
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([])
  const [winner, setWinner] = useState<Element | null>(null)

  const activeElement = TURN_ORDER[activeIndex]!

  const capturedPieces = useMemo(() => {
    const captured: Record<Element, Piece[]> = {
      fire: [],
      water: [],
    }
    moveHistory.forEach((move) => {
      if (move.captured) {
        captured[move.captured.element].push(move.captured)
      }
    })
    return captured
  }, [moveHistory])

  const reset = () => {
    setBoard(createInitialBoard())
    setActiveIndex(0)
    setSelectedSquare(null)
    setLegalMoves([])
    setMoveHistory([])
    setWinner(null)
  }

  const clearSelection = () => {
    setSelectedSquare(null)
    setLegalMoves([])
  }

  const movePiece = (from: Square, to: Square) => {
    const piece = board[from]
    if (!piece || winner) return

    const captured = board[to] ?? undefined
    const updatedPiece: Piece = { ...piece, hasMoved: true }

    const nextBoard: BoardState = { ...board }
    nextBoard[from] = null
    nextBoard[to] = updatedPiece

    setBoard(nextBoard)
    setMoveHistory((current) => [...current, { from, to, piece: updatedPiece, captured }])

    const capturedKing = captured?.type === 'king'
    if (capturedKing) {
      setWinner(piece.element)
      clearSelection()
      return
    }

    const opponent = piece.element === 'fire' ? 'water' : 'fire'
    const opponentHasMoves = hasAnyLegalMoves(nextBoard, opponent)
    const opponentInCheck = isElementInCheck(nextBoard, opponent)

    if (!opponentHasMoves && opponentInCheck) {
      setWinner(piece.element)
      clearSelection()
      return
    }

    setActiveIndex((current) => (current + 1) % TURN_ORDER.length)
    clearSelection()
  }

  const handleSquareClick = (square: Square) => {
    if (winner) return

    const piece = board[square]

    if (selectedSquare && legalMoves.includes(square)) {
      movePiece(selectedSquare, square)
      return
    }

    if (!piece) {
      clearSelection()
      return
    }

    if (piece.element !== activeElement) {
      if (selectedSquare && legalMoves.includes(square)) {
        movePiece(selectedSquare, square)
      }
      return
    }

    setSelectedSquare(square)
    const moves = getLegalMoves({ board, piece, from: square })
    setLegalMoves(moves)
  }

  return {
    board,
    activeElement,
    selectedSquare,
    legalMoves,
    moveHistory,
    capturedPieces,
    winner,
    reset,
    handleSquareClick,
  }
}
