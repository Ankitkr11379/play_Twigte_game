function traverse(
  startNode,
  endNode,
  walls,
  weights,
  visited,
  visitedMap,
  graph
) {
  if (startNode[0] === endNode[0] && startNode[1] === endNode[1]) {
    visited.add([startNode[0], startNode[1]]);
    visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);
    return true;
  }
  const queue = new Map();
  queue.set(`${startNode[0]},${startNode[1]}`, [startNode[0], startNode[1]]);

  while (queue.size > 0) {
    let minNode = null;
    let minDistance = Infinity;
    for (let node of queue.values()) {
      let [row, col] = node;
      if (graph[row][col].h + graph[row][col].distance < minDistance) {
        minDistance = graph[row][col].h + graph[row][col].distance;
        minNode = [row, col];
      }
    }

    let rowVal = minNode[0];
    let colVal = minNode[1];
    for (let node of queue.values()) {
      let [row, col] = node;
      if (graph[row][col].h + graph[row][col].distance === minDistance) {
        if (startNode[0] > endNode[0]) {
          if (row < rowVal) {
            rowVal = row;
            minNode = [row, col];
          }
        } else {
          if (row > rowVal) {
            rowVal = row;
            minNode = [row, col];
          }
        }
      }
    }

    const currentNode = minNode;
    visited.add([currentNode[0], currentNode[1]]);
    visitedMap.set(`${currentNode[0]}, ${currentNode[1]}`, true);
    queue.delete(`${currentNode[0]},${currentNode[1]}`);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 && j !== 0) {
          continue;
        }
        const newRow = currentNode[0] + i;
        const newCol = currentNode[1] + j;
        if (
          newRow < 0 ||
          newRow >= 20 ||
          newCol < 0 ||
          newCol >= 50 ||
          walls.has(`${newRow}-${newCol}`)
        ) {
          continue;
        }
        const weight = weights.has(`${newRow}-${newCol}`) ? 10 : 1;
        if (
          graph[newRow][newCol].distance >
          graph[currentNode[0]][currentNode[1]].distance + weight
        ) {
          graph[newRow][newCol].distance =
            graph[currentNode[0]][currentNode[1]].distance + weight;
          graph[newRow][newCol].parent = [currentNode[0], currentNode[1]];
          queue.set(`${newRow},${newCol}`, [newRow, newCol]);
          //   console.log("queue", queue);
        }
      }
    }

    if (currentNode[0] === endNode[0] && currentNode[1] === endNode[1]) {
      return true;
    }
  }

  if (visitedMap.has(`${endNode[0]}, ${endNode[1]}`)) {
    return true;
  }
  return false;
}

function AStar(startNode, endNode, walls, weights) {
  const graph = [];
  for (let i = 0; i < 20; i++) {
    const col = [];
    for (let j = 0; j < 50; j++) {
      col.push({
        row: i,
        col: j,
        parent: null,
        distance: Infinity,
        h: Math.abs(i - endNode[0]) + Math.abs(j - endNode[1]),
      });
    }
    graph.push(col);
  }

  const visited = new Set();
  visited.add([startNode[0], startNode[1]]);
  const visitedMap = new Map();
  visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);

  graph[startNode[0]][startNode[1]].distance = 0;

  const flag = traverse(
    startNode,
    endNode,
    walls,
    weights,
    visited,
    visitedMap,
    graph
  );

  if (flag) {
    const path = [];
    let [row, col] = [endNode[0], endNode[1]];
    while (row !== startNode[0] || col !== startNode[1]) {
      path.push([row, col]);
      [row, col] = graph[row][col].parent;
    }
    path.push([startNode[0], startNode[1]]);
    return { path: path.reverse(), visited: Array.from(visited) };
  }

  return { path: [], visited: Array.from(visited) };
}

export default AStar;
