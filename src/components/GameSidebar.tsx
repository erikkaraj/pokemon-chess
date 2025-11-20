import { FC } from 'react'
import { Element, MoveRecord, Piece } from '../types/chess'
import { teamTheme } from '../data/pokemon'

interface GameSidebarProps {
  activeElement: Element | null
  capturedPieces: Partial<Record<Element, Piece[]>>
  moveHistory: MoveRecord[]
  winner: Element | null
  playerTeam: Element | null
  opponentTeam: Element | null
  onReset: () => void
  onChangeTeams: () => void
}

const GameSidebar: FC<GameSidebarProps> = ({
  activeElement,
  capturedPieces,
  moveHistory,
  winner,
  playerTeam,
  opponentTeam,
  onReset,
  onChangeTeams,
}) => {
  const focusTeam = winner ?? activeElement ?? playerTeam ?? opponentTeam
  const theme = focusTeam ? teamTheme[focusTeam] : { color: '#475569', label: 'Awaiting Teams', icon: '?' }
  const matchup = [playerTeam, opponentTeam].filter(Boolean) as Element[]

  return (
    <aside className="sidebar">
      {winner ? (
        <div className="turn-banner" style={{ borderColor: theme.color }}>
          <p>Victory</p>
          <strong style={{ color: theme.color }}>{theme.label} squad claims the board!</strong>
        </div>
      ) : activeElement ? (
        <div className="turn-banner" style={{ borderColor: theme.color }}>
          <p>Turn</p>
          <strong style={{ color: theme.color }}>{teamTheme[activeElement].label} Squad</strong>
        </div>
      ) : (
        <div className="turn-banner" style={{ borderColor: theme.color }}>
          <p>Setup</p>
          <strong style={{ color: theme.color }}>Choose teams to begin</strong>
        </div>
      )}

      <section>
        <header className="section-header">Captured</header>
        <div className="captured-grid">
          {matchup.length ? (
            matchup.map((element) => (
              <div key={element}>
                <p className="section-subtitle" style={{ color: teamTheme[element].color }}>
                  {teamTheme[element].label}
                </p>
                <div className="captured-list">
                  {capturedPieces[element]?.length ? (
                    capturedPieces[element]!.map((piece) => (
                      <span key={piece.id} className="captured-piece">
                        {piece.pokemon.icon}
                      </span>
                    ))
                  ) : (
                    <span className="captured-empty">none</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="captured-empty">No teams selected</p>
          )}
        </div>
      </section>

      <section>
        <header className="section-header">Moves</header>
        <ol className="move-list">
          {moveHistory.length ? (
            moveHistory
              .slice()
              .reverse()
              .map((move, index) => (
                <li key={`${move.from}-${move.to}-${index}`}>
                  <span style={{ color: teamTheme[move.piece.element].color }}>
                    {move.piece.pokemon.icon}
                  </span>
                  {` ${move.from} → ${move.to}`}
                  {move.captured ? ` × ${move.captured.name}` : ''}
                </li>
              ))
          ) : (
            <li className="captured-empty">No moves yet</li>
          )}
        </ol>
      </section>

      <div className="sidebar-actions">
        <button className="reset-button" onClick={onReset} disabled={!matchup.length}>
          Restart Battle
        </button>
        <button className="secondary-button" onClick={onChangeTeams}>
          Change Teams
        </button>
      </div>
    </aside>
  )
}

export default GameSidebar
