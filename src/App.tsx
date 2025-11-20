import Board from './components/Board'
import GameSidebar from './components/GameSidebar'
import TeamSelector from './components/TeamSelector'
import PromotionModal from './components/PromotionModal'
import { useGameState } from './game/useGameState'
import VictoryModal from './components/VictoryModal'
import { teamTheme } from './data/pokemon'
import './App.css'

function App() {
  const {
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
  } = useGameState()

  const title =
    gameReady && playerTeam && opponentTeam
      ? `${teamTheme[playerTeam].label} vs ${teamTheme[opponentTeam].label}`
      : 'Elemental Pokémon Chess'

  const subtitle =
    gameReady && playerTeam && opponentTeam
      ? `Command your ${teamTheme[playerTeam].label} team and overcome a ${teamTheme[opponentTeam].label} rival squad.`
      : 'Pick your elemental squad. The rival will be chosen at random from the remaining types.'

  return (
    <div className="app">
      <header className="banner">
        <div>
          <p className="eyebrow">Legendary Showdown</p>
          <h1>{title}</h1>
        </div>
        <p className="banner-copy">{subtitle}</p>
      </header>

      {gameReady ? (
        <main className="game-layout">
          <Board
            board={board}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            onSquareClick={handleSquareClick}
          />
          <GameSidebar
            activeElement={activeElement}
            capturedPieces={capturedPieces}
            moveHistory={moveHistory}
            winner={winner}
            playerTeam={playerTeam}
            opponentTeam={opponentTeam}
            onReset={reset}
            onChangeTeams={changeTeams}
          />
        </main>
      ) : (
        <TeamSelector onSelect={selectTeam} />
      )}

      {pendingPromotion && (
        <PromotionModal element={pendingPromotion.element} onSelect={promotePawn} />
      )}

      {winner && <VictoryModal winner={winner} onReset={reset} onChangeTeams={changeTeams} />}
    </div>
  )
}

export default App
