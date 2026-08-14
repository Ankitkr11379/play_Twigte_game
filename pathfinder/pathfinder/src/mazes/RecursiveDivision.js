function chooseOrientation(width, height) {
  if (width < height) {
    return "horizontal";
  } else if (height < width) {
    return "vertical";
  } else {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }
}

function recursiveDivision(
  startNode,
  endNode,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  walls,
  rowMap,
  colMap
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
    return;
  }

  const orientation = chooseOrientation(
    colEnd - colStart + 1,
    rowEnd - rowStart + 1
  );

  if (orientation === "horizontal") {
    let row = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;
    if (rowMap) {
      while (row === rowMap) {
        row = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;
      }
    }
    let col = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;
    for (let i = colStart; i <= colEnd; i++) {
      if (i !== col) {
        if (
          (i === startNode[1] && row === startNode[0]) ||
          (i === endNode[1] && row === endNode[0])
        ) {
          continue;
        }
        walls.set(`${row}-${i}`, { row: row, col: i });
      }
    }
    recursiveDivision(
      startNode,
      endNode,
      rowStart,
      row - 2,
      colStart,
      colEnd,
      walls,
      null,
      col
    );
    recursiveDivision(
      startNode,
      endNode,
      row + 2,
      rowEnd,
      colStart,
      colEnd,
      walls,
      null,
      col
    );
  } else {
    let row = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;
    let col = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;

    if (colMap) {
      // console.log("function is called");
      while (col === colMap) {
        col = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;
      }
    }
    // console.log("function is called");
    for (let i = rowStart; i <= rowEnd; i++) {
      if (i !== row) {
        if (
          (col === startNode[1] && i === startNode[0]) ||
          (col === endNode[1] && i === endNode[0])
        ) {
          continue;
        }
        walls.set(`${i}-${col}`, { row: i, col: col });
      }
    }

    recursiveDivision(
      startNode,
      endNode,
      rowStart,
      rowEnd,
      colStart,
      col - 2,
      walls,
      row,
      null
    );
    recursiveDivision(
      startNode,
      endNode,
      rowStart,
      rowEnd,
      col + 2,
      colEnd,
      walls,
      row,
      null
    );
  }

  return;
}

export default recursiveDivision;
