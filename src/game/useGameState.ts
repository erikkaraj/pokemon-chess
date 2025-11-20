import { useMemo, useState } from 'react'
import {
  BoardState,
  createEmptyBoard,
  createInitialBoard,
  coordsToSquare,
  squareToCoords,
} from './board'
import { getLegalMoves, hasAnyLegalMoves, isElementInCheck } from './moves'
import { Element, MoveRecord, Piece, Square } from '../types/chess'
import { availableTeams } from '../data/pokemon'

export interface GameState {
  board: BoardState
  activeElement: Element | null
  selectedSquare: Square | null
  legalMoves: Square[]
  moveHistory: MoveRecord[]
  capturedPieces: Partial<Record<Element, Piece[]>>
  winner: Element | null
  playerTeam: Element | null
  opponentTeam: Element | null
  gameReady: boolean
  selectTeam: (team: Element) => void
  changeTeams: () => void
  reset: () => void
  handleSquareClick: (square: Square) => void
}

export function useGameState(): GameState {
  const [board, setBoard] = useState<BoardState>(() => createEmptyBoard())
  const [turnOrder, setTurnOrder] = useState<Element[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [legalMoves, setLegalMoves] = useState<Square[]>([])
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([])
  const [winner, setWinner] = useState<Element | null>(null)
  const [playerTeam, setPlayerTeam] = useState<Element | null>(null)
  const [opponentTeam, setOpponentTeam] = useState<Element | null>(null)

  const gameReady = Boolean(playerTeam && opponentTeam)
  const activeElement = turnOrder[activeIndex] ?? null

  const capturedPieces = useMemo(() => {
    const captured: Partial<Record<Element, Piece[]>> = {}
    if (playerTeam) captured[playerTeam] = []
    if (opponentTeam) captured[opponentTeam] = []

    moveHistory.forEach((move) => {
      if (move.captured) {
        if (!captured[move.captured.element]) {
          captured[move.captured.element] = []
        }
        captured[move.captured.element]!.push(move.captured)
      }
    })
    return captured
  }, [moveHistory, playerTeam, opponentTeam])

  const selectTeam = (team: Element) => {
    const opponent = pickRandomOpponent(team)
    const startingBoard = createInitialBoard(team, opponent)
    setPlayerTeam(team)
    setOpponentTeam(opponent)
    setTurnOrder([team, opponent])
    setActiveIndex(0)
    setBoard(startingBoard)
    setSelectedSquare(null)
    setLegalMoves([])
    setMoveHistory([])
    setWinner(null)
  }

  const changeTeams = () => {
    setPlayerTeam(null)
    setOpponentTeam(null)
    setTurnOrder([])
    setActiveIndex(0)
    setBoard(createEmptyBoard())
    setSelectedSquare(null)
    setLegalMoves([])
    setMoveHistory([])
    setWinner(null)
  }

  const reset = () => {
    if (!playerTeam || !opponentTeam) {
      changeTeams()
      return
    }
    setBoard(createInitialBoard(playerTeam, opponentTeam))
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
    if (!gameReady || !turnOrder.length || winner) return

    const piece = board[from]
    if (!piece) return

    const captured = board[to] ?? undefined
    const updatedPiece: Piece = { ...piece, hasMoved: true }

    const nextBoard: BoardState = { ...board }
    nextBoard[from] = null
    nextBoard[to] = updatedPiece

    if (piece.type === 'king') {
      const { fileIndex: fromFile, rankIndex } = squareToCoords(from)
      const { fileIndex: toFile } = squareToCoords(to)
      if (Math.abs(toFile - fromFile) === 2) {
        const rookFromFile = toFile > fromFile ? toFile + 1 : toFile - 2
        const rookToFile = toFile > fromFile ? toFile - 1 : toFile + 1
        const rookFromSquare = coordsToSquare(rookFromFile, rankIndex)
        const rookToSquare = coordsToSquare(rookToFile, rankIndex)
        if (rookFromSquare && rookToSquare) {
          const rook = nextBoard[rookFromSquare]
          if (rook && rook.type === 'rook') {
            nextBoard[rookFromSquare] = null
            nextBoard[rookToSquare] = { ...rook, hasMoved: true }
          }
        }
      }
    }

    setBoard(nextBoard)
    setMoveHistory((current) => [...current, { from, to, piece: updatedPiece, captured }])

    const capturedKing = captured?.type === 'king'
    if (capturedKing) {
      setWinner(piece.element)
      clearSelection()
      return
    }

    const opponent = turnOrder[(activeIndex + 1) % turnOrder.length]
    const opponentHasMoves = hasAnyLegalMoves(nextBoard, opponent)
    const opponentInCheck = isElementInCheck(nextBoard, opponent)

    if (!opponentHasMoves && opponentInCheck) {
      setWinner(piece.element)
      clearSelection()
      return
    }

    setActiveIndex((current) => (current + 1) % turnOrder.length)
    clearSelection()
  }

  const handleSquareClick = (square: Square) => {
    if (!gameReady || winner) return

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
    playerTeam,
    opponentTeam,
    gameReady,
    selectTeam,
    changeTeams,
    reset,
    handleSquareClick,
  }
}

function pickRandomOpponent(selected: Element): Element {
  const pool = availableTeams.filter((team) => team !== selected)
  const index = Math.floor(Math.random() * pool.length)
  return pool[index] ?? selected
}
