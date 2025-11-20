import { useMemo, useState } from 'react'
import {
  BoardState,
  createEmptyBoard,
  createInitialBoard,
  coordsToSquare,
  squareToCoords,
} from './board'
import { getLegalMoves, hasAnyLegalMoves, isElementInCheck } from './moves'
import { Element, MoveRecord, Piece, PieceType, Side, Square } from '../types/chess'
import { availableTeams, getPieceTemplate } from '../data/pokemon'

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
  pendingPromotion: PromotionContext | null
  promotePawn: (type: PieceType) => void
  handleSquareClick: (square: Square) => void
}

interface PromotionContext {
  square: Square
  element: Element
  side: Side
  opponent: Element
  enPassantTarget: Square | null
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
  const [enPassantTarget, setEnPassantTarget] = useState<Square | null>(null)
  const [pendingPromotion, setPendingPromotion] = useState<PromotionContext | null>(null)

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
     setEnPassantTarget(null)
     setPendingPromotion(null)
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
    setEnPassantTarget(null)
    setPendingPromotion(null)
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
    setEnPassantTarget(null)
    setPendingPromotion(null)
  }

  const clearSelection = () => {
    setSelectedSquare(null)
    setLegalMoves([])
  }

  const finalizeMove = (
    nextBoard: BoardState,
    movingPiece: Piece,
    opponent: Element,
    nextTarget: Square | null,
  ) => {
    setEnPassantTarget(nextTarget)
    const opponentHasMoves = hasAnyLegalMoves(nextBoard, opponent, nextTarget)
    const opponentInCheck = isElementInCheck(nextBoard, opponent)

    if (!opponentHasMoves && opponentInCheck) {
      setWinner(movingPiece.element)
      clearSelection()
      return
    }

    setActiveIndex((current) => (current + 1) % turnOrder.length)
    clearSelection()
  }

  const movePiece = (from: Square, to: Square) => {
    if (!gameReady || !turnOrder.length || winner || pendingPromotion) return

    const piece = board[from]
    if (!piece) return

    const fromCoords = squareToCoords(from)
    const toCoords = squareToCoords(to)

    let captured = board[to] ?? undefined
    const updatedPiece: Piece = { ...piece, hasMoved: true }

    const nextBoard: BoardState = { ...board }
    nextBoard[from] = null

    if (
      piece.type === 'pawn' &&
      enPassantTarget &&
      to === enPassantTarget &&
      !captured &&
      fromCoords.fileIndex !== toCoords.fileIndex
    ) {
      const captureSquare = coordsToSquare(
        toCoords.fileIndex,
        toCoords.rankIndex - (piece.side === 'south' ? 1 : -1),
      )
      if (captureSquare) {
        captured = board[captureSquare] ?? undefined
        nextBoard[captureSquare] = null
      }
    }

    nextBoard[to] = updatedPiece

    if (piece.type === 'king') {
      const { fileIndex: fromFile, rankIndex } = fromCoords
      const { fileIndex: toFile } = toCoords
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

    let nextEnPassantTarget: Square | null = null
    if (
      piece.type === 'pawn' &&
      Math.abs(toCoords.rankIndex - fromCoords.rankIndex) === 2 &&
      fromCoords.fileIndex === toCoords.fileIndex
    ) {
      nextEnPassantTarget = coordsToSquare(
        fromCoords.fileIndex,
        fromCoords.rankIndex + (piece.side === 'south' ? 1 : -1),
      )
    }

    setBoard(nextBoard)
    setMoveHistory((current) => [...current, { from, to, piece: updatedPiece, captured }])

    const capturedKing = captured?.type === 'king'
    if (capturedKing) {
      setWinner(piece.element)
      clearSelection()
      setEnPassantTarget(null)
      return
    }

    const opponent = turnOrder[(activeIndex + 1) % turnOrder.length]
    const promotionRank = piece.side === 'south' ? 7 : 0
    const shouldPromote = piece.type === 'pawn' && toCoords.rankIndex === promotionRank

    if (shouldPromote) {
      setPendingPromotion({
        square: to,
        element: piece.element,
        side: piece.side,
        opponent,
        enPassantTarget: nextEnPassantTarget,
      })
      setEnPassantTarget(nextEnPassantTarget)
      clearSelection()
      return
    }

    finalizeMove(nextBoard, updatedPiece, opponent, nextEnPassantTarget)
  }

  const handleSquareClick = (square: Square) => {
    if (!gameReady || winner || pendingPromotion) return

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
    const moves = getLegalMoves({ board, piece, from: square, enPassantTarget })
    setLegalMoves(moves)
  }

  const promotePawn = (type: PieceType) => {
    if (!pendingPromotion) return
    if (type === 'pawn' || type === 'king') return

    const template = getPieceTemplate(pendingPromotion.element, type)
    const promotedPiece: Piece = {
      id: `${pendingPromotion.element}-${type}-${Date.now()}`,
      element: pendingPromotion.element,
      type,
      name: template.name,
      pokemon: template.pokemon,
      side: pendingPromotion.side,
      hasMoved: true,
    }

    setBoard((current) => {
      const updatedBoard: BoardState = { ...current }
      updatedBoard[pendingPromotion.square] = promotedPiece
      finalizeMove(
        updatedBoard,
        promotedPiece,
        pendingPromotion.opponent,
        pendingPromotion.enPassantTarget,
      )
      return updatedBoard
    })

    setMoveHistory((current) => {
      if (!current.length) return current
      const updated = [...current]
      const lastIndex = updated.length - 1
      updated[lastIndex] = {
        ...updated[lastIndex],
        piece: { ...updated[lastIndex].piece, ...promotedPiece },
      }
      return updated
    })

    setPendingPromotion(null)
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
    pendingPromotion,
    promotePawn,
    handleSquareClick,
  }
}

function pickRandomOpponent(selected: Element): Element {
  const pool = availableTeams.filter((team) => team !== selected)
  const index = Math.floor(Math.random() * pool.length)
  return pool[index] ?? selected
}
