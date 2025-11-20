import { FC } from 'react'
import { Element, PieceType } from '../types/chess'
import { teamTheme } from '../data/pokemon'

interface PromotionModalProps {
  element: Element
  onSelect: (type: PieceType) => void
}

const promotionOptions: PieceType[] = ['queen', 'rook', 'bishop', 'knight']

const PromotionModal: FC<PromotionModalProps> = ({ element, onSelect }) => {
  const theme = teamTheme[element]

  return (
    <div className="victory-overlay">
      <div className="promotion-card">
        <p className="eyebrow">Choose Evolution</p>
        <h2 style={{ color: theme.color }}>{theme.label} pawn reached the summit!</h2>
        <p className="victory-copy">Promote this pawn into a new champion to continue the duel.</p>
        <div className="promotion-options">
          {promotionOptions.map((option) => (
            <button key={option} className="promotion-option" onClick={() => onSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromotionModal
