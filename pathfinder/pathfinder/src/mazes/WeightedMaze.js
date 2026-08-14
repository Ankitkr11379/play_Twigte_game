function WeightedMaze(weights, startNode, endNode, density = 0.5) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      if (
        (i === startNode[0] && j === startNode[1]) ||
        (i === endNode[0] && j === endNode[1])
      ) {
        continue;
      }
      if (Math.random() < density) {
        weights.set(`${i}-${j}`, { row: i, col: j });
      }
    }
  }
}

export default WeightedMaze;
