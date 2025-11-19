import Board from './components/Board'
import GameSidebar from './components/GameSidebar'
import { useGameState } from './game/useGameState'
import VictoryModal from './components/VictoryModal'
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
    reset,
    handleSquareClick,
  } = useGameState()

  return (
    <div className="app">
      <header className="banner">
        <div>
          <p className="eyebrow">Legendary Showdown</p>
          <h1>Fire vs Water Pokémon Chess</h1>
        </div>
        <p className="banner-copy">
          Classic chess rules with a starter rivalry twist. Command Charizard&apos;s fire squad
          against Blastoise&apos;s tide and claim the board.
        </p>
      </header>

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
          onReset={reset}
        />
      </main>

      {winner && <VictoryModal winner={winner} onReset={reset} />}
    </div>
  )
}

export default App
