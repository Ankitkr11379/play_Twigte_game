import { useState } from 'react'
import Board from './boardmap'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('lobby') // 'lobby', 'twigte', 'pathfinder'

  const handleExitGame = () => {
    setActivePage('lobby')
  }

  return (
    <>
      {activePage === 'lobby' && (
        <div className="arcade-container">
          <header className="arcade-header">
            <h1 className="arcade-title">Arcade Hub</h1>
            <p className="arcade-subtitle">Select a game to start playing</p>
          </header>

          <main className="arcade-cards-grid">
            {/* Game 1: Twigte */}
            <div className="arcade-card twigte-theme">
              <div className="arcade-card-content">
                <span className="arcade-card-icon" role="img" aria-label="board-game">⚔️</span>
                <h2 className="arcade-card-title">Twigte Board Game</h2>
                <p className="arcade-card-desc">
                  A strategy board game of alignment and token capture. Form three-in-a-row (mills) 
                  to capture opponent tokens, block their movements, and achieve victory!
                </p>
              </div>
              <button 
                className="arcade-card-btn" 
                onClick={() => setActivePage('twigte')}
              >
                Play Twigte
              </button>
            </div>

            {/* Game 2: Pathfinder */}
            <div className="arcade-card pathfinder-theme">
              <div className="arcade-card-content">
                <span className="arcade-card-icon" role="img" aria-label="map-path">🧭</span>
                <h2 className="arcade-card-title">Pathfinder Visualizer</h2>
                <p className="arcade-card-desc">
                  An interactive visualization tool for pathfinding algorithms. 
                  Draw walls and weights on a grid to see Dijkstra's, A*, BFS, and DFS 
                  algorithms search for the shortest path.
                </p>
              </div>
              <button 
                className="arcade-card-btn" 
                onClick={() => setActivePage('pathfinder')}
              >
                Launch Pathfinder
              </button>
            </div>
          </main>
        </div>
      )}

      {activePage !== 'lobby' && (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
          {/* Floating Exit Button Overlay */}
          <div className="portal-exit-overlay">
            <button className="portal-exit-btn" onClick={handleExitGame}>
              <span>🚪</span> Exit to Lobby
            </button>
          </div>

          {/* Active Game Rendering */}
          {activePage === 'twigte' ? (
            <div className="Boardmap" style={{ width: '100%', height: '100%' }}>
              <Board />
            </div>
          ) : (
            <div className="game-iframe-container">
              <iframe 
                src="http://localhost:5174" 
                className="game-iframe" 
                title="Pathfinder Visualizer"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
