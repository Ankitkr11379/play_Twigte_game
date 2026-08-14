function Dijkstra(startNode, endNode, walls, weights) {
  const graph = [];
  for (let i = 0; i < 20; i++) {
    const col = [];
    for (let j = 0; j < 50; j++) {
      col.push({ row: i, col: j, parent: null, distance: Infinity });
    }
    graph.push(col);
  }

  const visited = new Set();
  visited.add([startNode[0], startNode[1]]);
  const visitedMap = new Map();
  visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);

  const queue = new Map();
  queue.set(`${startNode[0]},${startNode[1]}`, [startNode[0], startNode[1]]);
  graph[startNode[0]][startNode[1]].distance = 0;

  while (queue.size > 0) {
    let minDistance = Infinity;
    let minNode = null;
    for (let node of queue.values()) {
      let [row, col] = node;
      if (graph[row][col].distance < minDistance) {
        minDistance = graph[row][col].distance;
        minNode = [row, col];
      }
    }
    const currentNode = minNode;
    queue.delete(`${currentNode[0]},${currentNode[1]}`);
    // console.log("queue", queue);
    // console.log("currentNode", currentNode);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if ((i !== 0 && j !== 0) || (i === 0 && j === 0)) {
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
          visited.add([newRow, newCol]);
          visitedMap.set(`${newRow}, ${newCol}`, true);
        }

        if (newRow === endNode[0] && newCol === endNode[1]) {
          const path = [[newRow, newCol]];
          let parent = graph[newRow][newCol].parent;
          while (parent !== null) {
            path.push([parent[0], parent[1]]);
            parent = graph[parent[0]][parent[1]].parent;
          }
          return { visited: Array.from(visited), path: path.reverse() };
        }
      }
    }
  }
  return { visited: Array.from(visited), path: [] };
}

export default Dijkstra;
