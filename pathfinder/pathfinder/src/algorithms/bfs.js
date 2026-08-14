function bfs(startNode, endNode, walls) {
  const graph = [];
  for (let i = 0; i < 20; i++) {
    const col = [];
    for (let j = 0; j < 50; j++) {
      col.push({ row: i, col: j, parent: null });
    }
    graph.push(col);
  }

  const queue = [startNode];

  const visited = new Set();
  visited.add([startNode[0], startNode[1]]);

  const visitedMap = new Map();
  visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    // console.log("queue is", queue);
    // console.log("currentNode", currentNode);

    // console.log(currentNode);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 && j !== 0) {
          continue;
        }
        const newRow = currentNode[0] + i;
        const newCol = currentNode[1] + j;

        // console.log(newRow, newCol);

        if (
          newRow < 0 ||
          newRow >= 20 ||
          newCol < 0 ||
          newCol >= 50 ||
          walls.has(`${newRow}-${newCol}`)
        ) {
          continue;
        }
        // if (graph[newRow][newCol].parent !== null) {
        //   continue;
        // }
        if (visitedMap.has(`${newRow}, ${newCol}`)) {
          //   console.log(newRow, newCol, "visited");
          continue;
        }
        queue.push([newRow, newCol]);
        visited.add([newRow, newCol]);
        visitedMap.set(`${newRow}, ${newCol}`, true);
        graph[newRow][newCol].parent = [currentNode[0], currentNode[1]];
        if (newRow === endNode[0] && newCol === endNode[1]) {
          const path = [[newRow, newCol]];
          let parent = graph[newRow][newCol].parent;
          while (parent !== null) {
            path.push([parent[0], parent[1]]);
            parent = graph[parent[0]][parent[1]].parent;
          }
          path.reverse();

          const ans = { path: path, visited: visited };

          return ans;
        }
      }
    }
  }
  return { path: [], visited: visited };
}

export default bfs;
