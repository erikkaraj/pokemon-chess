import { FC } from 'react'
import { BOARD_FILES, BOARD_RANKS } from '../game/board'
import { BoardState } from '../game/board'
import { Square } from '../types/chess'
import { teamTheme } from '../data/pokemon'

interface BoardProps {
  board: BoardState
  selectedSquare: Square | null
  legalMoves: Square[]
  onSquareClick: (square: Square) => void
}

const Board: FC<BoardProps> = ({ board, selectedSquare, legalMoves, onSquareClick }) => {
  return (
    <div className="board">
      {BOARD_RANKS.map((rank) => (
        <div key={rank} className="board-row">
          {BOARD_FILES.map((file, columnIndex) => {
            const square = `${file}${rank}` as Square
            const piece = board[square]
            const isDark = (rank + columnIndex) % 2 === 0
            const isSelected = selectedSquare === square
            const isLegal = legalMoves.includes(square)
            return (
              <button
                key={square}
                className={`square ${isDark ? 'square-dark' : 'square-light'} ${
                  isSelected ? 'square-selected' : ''
                } ${isLegal ? 'square-legal' : ''}`}
                onClick={() => onSquareClick(square)}
                title={piece ? `${piece.name} — ${piece.pokemon.species}` : square}
              >
                {piece ? (
                  <div className="piece" style={{ borderColor: teamTheme[piece.element].color }}>
                    {piece.pokemon.image ? (
                      <img
                        src={piece.pokemon.image}
                        alt={piece.name}
                        className={`piece-image ${piece.type === 'pawn' ? 'piece-image--pawn' : ''}`}
                      />
                    ) : (
                      <span className="piece-icon">{piece.pokemon.icon}</span>
                    )}
                  </div>
                ) : (
                  <span className="square-label">{square}</span>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Board
