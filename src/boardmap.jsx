import React, { useState, useEffect } from "react";
import Red from "./red";
import Blue from "./blue";
import "./boardstyle.css";
import TokenRemovalModal from "./components/ui/TokenRemovalModal";

const Board = () => {
  let [state, setstate] = useState(Array(81).fill(null));
  let [isTurn, setisTurn] = useState(true);
  let [countO, setcountO] = useState(9);
  let [countX, setcountX] = useState(9);
  // let [stateA, setstateA] = useState(Array(81).fill(null));
  // let [stateB, setstateB] = useState(Array(81).fill(null));
  // let [stateC, setstateC] = useState(Array(81).fill(null));
  let [curX, setcurX] = useState(0);
  let [curO, setcurO] = useState(0);
  let [isWinner, setIsWinner] = useState(false);
  let [usedCombinations, setUsedCombinations] = useState([]);
  let [highlightedIndices, setHighlightedIndices] = useState([]);
  let tempIndices = new Array();
  let [removalModalOpen, setRemovalModalOpen] = useState(false);
  let [removalTokens, setRemovalTokens] = useState([]); // indices of tokens to pick from
  let [removalMax, setRemovalMax] = useState(0);
  let [removalSymbol, setRemovalSymbol] = useState(null);
  let [pendingCombinations, setPendingCombinations] = useState([]);
  let [pendingWinnerSymbol, setPendingWinnerSymbol] = useState(null);

  let newMove = [
    [4, 10, 36],
    [null],
    [null],
    [null],
    [0, 8, 13],
    [null],
    [null],
    [null],
    [4, 16, 44],
    [null],
    [0, 13, 20, 37],
    [null],
    [null],
    [4, 10, 16, 22],
    [null],
    [null],
    [8, 13, 24, 43],
    [null],
    [null],
    [null],
    [10, 22, 38],
    [null],
    [13, 20, 24],
    [null],
    [16, 22, 42],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [0, 37, 72],
    [10, 36, 38, 64],
    [20, 37, 56],
    [null],
    [null],
    [null],
    [24, 43, 60],
    [16, 42, 44, 70],
    [8, 43, 80],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [],
    [38, 58, 64],
    [null],
    [56, 60, 67],
    [null],
    [42, 58, 70],
    [null],
    [null],
    [null],
    [37, 56, 67, 72],
    [null],
    [null],
    [58, 64, 70, 76],
    [null],
    [null],
    [43, 67, 80, 60],
    [null],
    [36, 64, 76],
    [null],
    [null],
    [null],
    [67, 72, 80],
    [null],
    [null],
    [null],
    [44, 70, 76],
  ];
  console.log("state", state);

  let handleClick = (index) => {
    if (curX >= 9 && isTurn) {
      alert("you have used all your tokens , now you can only move them : ");
      index = prompt("enter the token no. which you want to move :");
      index = parseInt(index, 10);
      let cnt = 0;
      if (index >= 0 && index < 81) {
        for (let i = 0; i < newMove[index].length; i++) {
          if (state[newMove[index][i]] === null) {
            cnt = 1;
          }
        }
      }
      while (
        isNaN(index) ||
        index < 0 ||
        index >= 81 ||
        cnt === 0 ||    //i think ===1
        state[index] === null ||
        state[index] === "O"
      ) {
        let temp = prompt("enter valid index which you want to move :");
        temp = parseInt(temp, 10);
        index = temp;

        if (index >= 0 && index < 81) {
          for (let i = 0; i < newMove[index].length; i++) {
            if (state[newMove[index][i]] === null) {
              cnt = 1;
            }
          }
        }
      }

      let val = prompt("enter the index you want to move from current index :");
      val = parseInt(val, 10);
      let check = newMove[index];
      if (
        !isNaN(val) &&
        val >= 0 &&
        val < 81 &&
        state[val] === null &&
        newMove[index].includes(val) //“Is val directly connected / adjacent to index ?”
      ) {
        let tempstate = [...state];
        tempstate[val] = isTurn ? "X" : "O";
        let dt = isTurn ? "X" : "O";
        tempstate[index] = null;
        setisTurn(!isTurn);
        setstate(tempstate);
        checkWinner();
        return dt;
      } else {
        while (
          isNaN(val) ||
          val < 0 ||
          val >= 81 ||
          state[val] === "X" ||
          state[val] === "O" ||
          !newMove[index].includes(val)
        ) {
          let tem = prompt("enter valid new index : ");
          tem = parseInt(tem, 10);
          val = tem;
        }
        let tempstate = [...state];
        tempstate[val] = "X";
        tempstate[index] = null;
        let dt = isTurn ? "X" : "O";
        setstate(tempstate);
        setisTurn(!isTurn);
        checkWinner();
        return dt;
      }
    } else if (curO >= 9 && !isTurn) {
      alert("you have used all your tokens , now you can only move them : ");
      index = prompt("enter the token no. which you want to move :");
      index = parseInt(index, 10);

      let cnt = 0;
      if (index >= 0 && index < 81) {
        for (let i = 0; i < newMove[index].length; i++) {
          if (state[newMove[index][i]] === null) {
            cnt = 1;
          }
        }
      }
      while (
        isNaN(index) ||
        index < 0 ||
        index >= 81 ||
        cnt === 0 ||
        state[index] === null ||
        state[index] === "X"
      ) {
        let temp = prompt("enter valid index which you want to move :");
        temp = parseInt(temp, 10);
        index = temp;
        if (index >= 0 && index < 81) {
          for (let i = 0; i < newMove[index].length; i++) {
            if (state[newMove[index][i]] === null) {
              cnt = 1;
            }
          }
        }
      }

      let val = prompt("enter the index you want to move from current index :");
      val = parseInt(val, 10);
      if (
        !isNaN(val) &&
        val >= 0 &&
        val < 81 &&
        state[val] === null &&
        newMove[index].includes(val)
      ) {
        let tempstate = [...state];
        tempstate[val] = isTurn ? "X" : "O";
        let dt = isTurn ? "X" : "O";
        tempstate[index] = null;
        setisTurn(!isTurn);
        setstate(tempstate);
        checkWinner();
        return dt;
      } else {
        while (
          isNaN(val) ||
          val < 0 ||
          val >= 81 ||
          state[val] === "X" ||
          state[val] === "O" ||
          !newMove[index].includes(val)
        ) {
          let tem = prompt("enter valid new index : ");
          tem = parseInt(tem, 10);
          val = tem;
        }
        let tempstate = [...state];
        tempstate[val] = "O";
        tempstate[index] = null;
        let dt = isTurn ? "X" : "O";
        setstate(tempstate);
        setisTurn(!isTurn);
        checkWinner();
        return dt;
      }
    }
    //if both about cases are fails then this sure run , bz no return statement work before
    if (state[index] != null) return;

    console.log("clicked on ", index);
    //alert(`click on index : ${index}`);
    let copyState = [...state];
    copyState[index] = isTurn ? "X" : "O";
    let dt = isTurn ? "X" : "O";
    let curTurn = isTurn;
    if (curTurn) setcurX(curX + 1);
    else if (!curTurn) setcurO(curO + 1);
    setisTurn(!isTurn);
    setstate(copyState);
    return dt;
  };

  let updateUsedCombinations = (combination) => {
    setUsedCombinations((prev) => [...prev, combination]);
  };

  let highlightCombination = (combination) => {
    setHighlightedIndices((prev) => [...prev, ...combination]);
  };

  let logic = [
    [0, 4, 8],
    [10, 13, 16],
    [20, 22, 24],
    [36, 37, 38],
    [42, 43, 44],
    [56, 58, 60],
    [64, 67, 70],
    [72, 76, 80],
    [0, 36, 72],
    [10, 37, 64],
    [20, 38, 56],
    [4, 13, 22],
    [58, 67, 76],
    [24, 42, 60],
    [16, 43, 70],
    [8, 44, 80],
    [0, 10, 20],
    [60, 70, 80],
    [8, 16, 24],
    [56, 64, 72],
  ];

  let checkWinner = () => {
    let newCombinations = [];
    for (let ind of logic) {
      let [a, b, c] = ind;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        const newArray = [a, b, c];
        const exists = usedCombinations.some(
          (arr) =>
            arr.length === newArray.length &&
            arr.every((val, idx) => val === newArray[idx])
        );
        if (!exists) {
          newCombinations.push(newArray);
        }
      }
    }

    if (newCombinations.length > 0) {
      setUsedCombinations(prev => [...prev, ...newCombinations]);
      const winnerSymbol = state[newCombinations[0][0]];
      setPendingCombinations(newCombinations);
      setPendingWinnerSymbol(winnerSymbol);
      // Find all valid tokens to remove
      let validTokens = [];
      if (winnerSymbol === "X") {
        validTokens = state.map((v, i) => v === "O" ? i : null).filter(i => i !== null);
        setRemovalMax(Math.min(validTokens.length, newCombinations.length, countO));
      } else if (winnerSymbol === "O") {
        validTokens = state.map((v, i) => v === "X" ? i : null).filter(i => i !== null);
        setRemovalMax(Math.min(validTokens.length, newCombinations.length, countX));
      }
      setRemovalTokens(validTokens);
      setRemovalSymbol(winnerSymbol);
      setRemovalModalOpen(true);
    }
  };

  const handleRemovalConfirm = (selected) => {
    let newState = [...state];
    selected.forEach(idx => { newState[idx] = null; });
    setstate(newState);
    if (removalSymbol === "X") {
      setcountO(countO - selected.length);
    } else if (removalSymbol === "O") {
      setcountX(countX - selected.length);
    }
    setRemovalModalOpen(false);
    setRemovalTokens([]);
    setRemovalMax(0);
    setRemovalSymbol(null);
    setPendingCombinations([]);
    setPendingWinnerSymbol(null);
  };

  const handleRemovalCancel = () => {
    setRemovalModalOpen(false);
    setRemovalTokens([]);
    setRemovalMax(0);
    setRemovalSymbol(null);
    setPendingCombinations([]);
    setPendingWinnerSymbol(null);
  };

  
  

  if (usedCombinations.length > 0) {
    for (let cap of usedCombinations) {
      console.log("data", cap);
    }
  }




  useEffect(() => {
    checkWinner();
    // eslint-disable-next-line
  }, [state,usedCombinations]);



  return (
    <div className="game-container" style={{ transition: 'margin 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {isWinner ? (
        <div className="winner-screen">
          <div className="winner-content">
            <h1 className="game-title">TWIGTE</h1>
            <h2 className="winner-text">🎉 {winner} won the game! 🎊</h2>
          </div>
        </div>
      ) : (
        <div className="game-layout">
          <div className="game-header">
            <h1 className="game-title">TWIGTE</h1>
            <div className="turn-indicator">
              <span className={`turn-text ${isTurn ? 'active' : ''}`}>Player X's Turn</span>
              <span className={`turn-text ${!isTurn ? 'active' : ''}`}>Player O's Turn</span>
            </div>
          </div>

          <div className="game-main">
            <div className="board-container">
              <div className="game-board">
                <div className="board-row">
                  <Red
                    index="0"
                    value={state[0]}
                    onClick={() => handleClick(0)}
                    highlighted={highlightedIndices.includes(0)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Blue />
                  <Red
                    index="4"
                    value={state[4]}
                    onClick={() => handleClick(4)}
                    highlighted={highlightedIndices.includes(4)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Blue />
                  <Red
                    index="8"
                    value={state[8]}
                    onClick={() => handleClick(8)}
                    highlighted={highlightedIndices.includes(8)}
                  />
                </div>

                <div className="board-row">
                  <Blue clr="" />
                  <Red
                    index="10"
                    value={state[10]}
                    onClick={() => handleClick(10)}
                    highlighted={highlightedIndices.includes(10)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="13"
                    value={state[13]}
                    onClick={() => handleClick(13)}
                    highlighted={highlightedIndices.includes(13)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="16"
                    value={state[16]}
                    onClick={() => handleClick(16)}
                    highlighted={highlightedIndices.includes(16)}
                  />
                  <Blue clr="" />
                </div>

                <div className="board-row">
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="20"
                    value={state[20]}
                    onClick={() => handleClick(20)}
                    highlighted={highlightedIndices.includes(20)}
                  />
                  <Blue clr="" />
                  <Red
                    index="22"
                    value={state[22]}
                    onClick={() => handleClick(22)}
                    highlighted={highlightedIndices.includes(22)}
                  />
                  <Blue clr="" />
                  <Red
                    index="24"
                    value={state[24]}
                    onClick={() => handleClick(24)}
                    highlighted={highlightedIndices.includes(24)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                </div>



                <div className="board-row">
                  <Red
                    index="36"
                    value={state[36]}
                    onClick={() => handleClick(36)}
                    highlighted={highlightedIndices.includes(36)}
                  />
                  <Red
                    index="37"
                    value={state[37]}
                    onClick={() => handleClick(37)}
                    highlighted={highlightedIndices.includes(37)}
                  />
                  <Red
                    index="38"
                    value={state[38]}
                    onClick={() => handleClick(38)}
                    highlighted={highlightedIndices.includes(38)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="42"
                    value={state[42]}
                    onClick={() => handleClick(42)}
                    highlighted={highlightedIndices.includes(42)}
                  />
                  <Red
                    index="43"
                    value={state[43]}
                    onClick={() => handleClick(43)}
                    highlighted={highlightedIndices.includes(43)}
                  />
                  <Red
                    index="44"
                    value={state[44]}
                    onClick={() => handleClick(44)}
                    highlighted={highlightedIndices.includes(44)}
                  />
                </div>



                <div className="board-row">
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="56"
                    value={state[56]}
                    onClick={() => handleClick(56)}
                    highlighted={highlightedIndices.includes(56)}
                  />
                  <Blue clr="" />
                  <Red
                    index="58"
                    value={state[58]}
                    onClick={() => handleClick(58)}
                    highlighted={highlightedIndices.includes(58)}
                  />
                  <Blue clr="" />
                  <Red
                    index="60"
                    value={state[60]}
                    onClick={() => handleClick(60)}
                    highlighted={highlightedIndices.includes(60)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                </div>

                <div className="board-row">
                  <Blue clr="" />
                  <Red
                    index="64"
                    value={state[64]}
                    onClick={() => handleClick(64)}
                    highlighted={highlightedIndices.includes(64)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="67"
                    value={state[67]}
                    onClick={() => handleClick(67)}
                    highlighted={highlightedIndices.includes(67)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="70"
                    value={state[70]}
                    onClick={() => handleClick(70)}
                    highlighted={highlightedIndices.includes(70)}
                  />
                  <Blue clr="" />
                </div>

                <div className="board-row">
                  <Red
                    index="72"
                    value={state[72]}
                    onClick={() => handleClick(72)}
                    highlighted={highlightedIndices.includes(72)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="76"
                    value={state[76]}
                    onClick={() => handleClick(76)}
                    highlighted={highlightedIndices.includes(76)}
                  />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Blue clr="" />
                  <Red
                    index="80"
                    value={state[80]}
                    onClick={() => handleClick(80)}
                    highlighted={highlightedIndices.includes(80)}
                  />
                </div>
              </div>
            </div>

            <div className="player-stats">
              <div className="player-card player-o">
                <div className="player-header">
                  <h3>Player O</h3>
                </div>
                <div className="player-info">
                  <div className="stat-row">
                    <span className="stat-label">Tokens Used:</span>
                    <span className="stat-value">{curO}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Tokens Left:</span>
                    <span className="stat-value">{9 - curO}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Points:</span>
                    <span className="stat-value">{9 - countX}</span>
                  </div>
                </div>
                {removalModalOpen && removalSymbol === 'O' && (
                  <TokenRemovalModal
                    open={removalModalOpen}
                    tokens={removalTokens}
                    maxSelect={removalMax}
                    onConfirm={handleRemovalConfirm}
                    onCancel={handleRemovalCancel}
                    inCard={true}
                  />
                )}
              </div>

              <div className="player-card player-x">
                <div className="player-header">
                  <h3>Player X</h3>
                </div>
                <div className="player-info">
                  <div className="stat-row">
                    <span className="stat-label">Tokens Used:</span>
                    <span className="stat-value">{curX}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Tokens Left:</span>
                    <span className="stat-value">{9 - curX}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Points:</span>
                    <span className="stat-value">{9 - countO}</span>
                  </div>
                </div>
                {removalModalOpen && removalSymbol === 'X' && (
                  <TokenRemovalModal
                    open={removalModalOpen}
                    tokens={removalTokens}
                    maxSelect={removalMax}
                    onConfirm={handleRemovalConfirm}
                    onCancel={handleRemovalCancel}
                    inCard={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
