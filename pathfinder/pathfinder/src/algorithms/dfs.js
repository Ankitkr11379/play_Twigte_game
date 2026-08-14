function traverseDFS(startNode, endNode, walls, visited, visitedMap, graph) {
  visited.add([startNode[0], startNode[1]]);
  visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);
  if (startNode[0] === endNode[0] && startNode[1] === endNode[1]) {
    return true;
  }

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 && j !== 0) {
        continue;
      }
      const newRow = startNode[0] + i;
      const newCol = startNode[1] + j;

      if (
        newRow < 0 ||
        newRow >= 20 ||
        newCol < 0 ||
        newCol >= 50 ||
        walls.has(`${newRow}-${newCol}`)
      ) {
        continue;
      }
      if (visitedMap.has(`${newRow}, ${newCol}`)) {
        continue;
      }
      graph[newRow][newCol].parent = [startNode[0], startNode[1]];
      const flag = traverseDFS(
        [newRow, newCol],
        endNode,
        walls,
        visited,
        visitedMap,
        graph
      );
      if (flag) {
        return true;
      }
    }
  }
  if (visitedMap.has(`${endNode[0]}, ${endNode[1]}`)) {
    return true;
  }
  return false;
}

function dfs(startNode, endNode, walls) {
  const graph = [];
  for (let i = 0; i < 20; i++) {
    const col = [];
    for (let j = 0; j < 50; j++) {
      col.push({ row: i, col: j, parent: null });
    }
    graph.push(col);
  }

  const visited = new Set();
  visited.add([startNode[0], startNode[1]]);
  const visitedMap = new Map();
  visitedMap.set(`${startNode[0]}, ${startNode[1]}`, true);

  if (traverseDFS(startNode, endNode, walls, visited, visitedMap, graph)) {
    const path = [[endNode[0], endNode[1]]];
    let parent = graph[endNode[0]][endNode[1]].parent;
    while (parent !== null) {
      path.push([parent[0], parent[1]]);
      parent = graph[parent[0]][parent[1]].parent;
    }
    return { visited: Array.from(visited), path: path.reverse() };
  }

  return { visited: Array.from(visited), path: [] };
}

export default dfs;
