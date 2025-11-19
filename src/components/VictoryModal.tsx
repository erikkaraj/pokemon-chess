import { FC } from 'react'
import { Element } from '../types/chess'
import { teamTheme } from '../data/pokemon'

interface VictoryModalProps {
  winner: Element
  onReset: () => void
}

const VictoryModal: FC<VictoryModalProps> = ({ winner, onReset }) => {
  const theme = teamTheme[winner]
  return (
    <div className="victory-overlay">
      <div className="victory-card">
        <p className="eyebrow">Checkmate</p>
        <h2 style={{ color: theme.color }}>{theme.label} Squad Triumphs!</h2>
        <p className="victory-copy">
          The {theme.label.toLowerCase()} commander has captured the opposing king. Ready for a
          rematch?
        </p>
        <button className="reset-button" onClick={onReset}>
          Start New Duel
        </button>
      </div>
    </div>
  )
}

export default VictoryModal
