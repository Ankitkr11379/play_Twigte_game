# Implementation Plan - Arcade Hub (Zero-Interference Merge)

This plan outlines the design for merging the **Twigte Strategy Game** and the **Pathfinder Visualizer** into a single cohesive platform without modifying or interfering with the codebases of either game.

## User Review Required

> [!IMPORTANT]
> - **Zero Code Interference**: To avoid compilation and runtime dependency errors (React 18 vs React 19, Chakra UI v2 vs v3), both games will run as separate, isolated projects.
> - **Iframe Integration**: We will build a unified Arcade Lobby portal in the root `App.jsx`. Selecting a game will load it in a full-screen, high-performance `iframe`.
> - **Unified Launch Script**: We will add a script to run both development servers concurrently on different ports:
>   - **Twigte**: Port `5173`
>   - **Pathfinder**: Port `5174`

---

## Open Questions

- *Do you want us to add a nice "Back to Lobby" floating button overlay inside the Pathfinder iframe view, or should we just show a permanent navbar header in the main lobby portal to switch games?* (We recommend a floating glassmorphic header in the portal that stays on top of the iframe, so the user can easily go back to the lobby or switch games.)

---

## Proposed Changes

### 1. Root Portal & Game Lobby

#### [MODIFY] [App.jsx](file:///c:/Users/kumar/Desktop/nodejs/twigte_game/src/App.jsx)
- Update `App.jsx` to render the Arcade Lobby Dashboard:
  - Add state `activePage` (`"lobby"`, `"twigte"`, `"pathfinder"`).
  - Lobby UI: A premium, dark-mode dashboard with:
    - Glowing cards for both games (Twigte and Pathfinder).
    - Modern typography, gradients, hover scale effects, and descriptions.
  - When Twigte is selected, render `<Board />` locally (native integration).
  - When Pathfinder is selected, render a full-screen `iframe` pointing to `http://localhost:5174`.
  - Add a floating portal header (e.g. `← Exit Game`) that overlay-positions on top of the iframe or board, letting players exit back to the lobby.

### 2. Multi-Project Server Orchestration

#### [MODIFY] [package.json](file:///c:/Users/kumar/Desktop/nodejs/twigte_game/package.json)
- Add a new script to run both dev servers:
  - `"dev:all": "concurrently \"npm run dev\" \"npm run dev --prefix pathfinder/pathfinder -- --port 5174\""`
- Add `concurrently` to `devDependencies` to support parallel execution of both projects with colored logs.

---

## Verification Plan

### Automated Verification
1. Run `npm install concurrently --save-dev` to install the tool.
2. Run `npm run dev:all` to verify both servers boot on their respective ports (`5173` and `5174`) without errors.

### Manual Verification
1. Open `http://localhost:5173` in a web browser.
2. Verify the Arcade Lobby home page loads with custom animations.
3. Click "Play Twigte": verify it loads the native board and play a few turns. Click "Exit to Lobby".
4. Click "Launch Pathfinder": verify it loads the Pathfinder visualizer in the iframe on port `5174`. Draw walls, run visualizations, and verify it works perfectly. Click "Exit to Lobby".
