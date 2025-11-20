import { Element } from '../types/chess'
import { teamTheme } from '../data/pokemon'

interface TeamSelectorProps {
  onSelect: (team: Element) => void
}

const TeamSelector = ({ onSelect }: TeamSelectorProps) => {
  return (
    <div className="team-selector">
      <header className="team-selector__header">
        <p className="eyebrow">Choose Your Element</p>
        <h2>Select a squad to defend the lower ranks.</h2>
        <p className="banner-copy">Your rival will be chosen from the remaining types at random.</p>
      </header>
      <div className="team-grid">
        {(Object.keys(teamTheme) as Element[]).map((team) => (
          <button
            key={team}
            className="team-card"
            style={{ borderColor: teamTheme[team].color }}
            onClick={() => onSelect(team)}
          >
            <span className="team-card__icon">
              <img src={teamTheme[team].pawnIcon} alt={`${teamTheme[team].label} pawn`} />
            </span>
            <span className="team-card__label">{teamTheme[team].label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TeamSelector
