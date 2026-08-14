import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Description = () => {
  const { algorithm } = useSelector((state) => state.algo);

  const algoInfo = [
    "Dijkstra's Algorithm is a weighted algorithm that finds the shortest path between nodes in a graph",
    "A* Algorithm is a weighted algorithm that finds the shortest path between nodes in a graph with the help of a heuristic function",
    "Breadth First Search is an unweighted algorithm that finds the shortest path between nodes in a graph",
    "Depth First Search is an unweighted algorithm that finds the path between nodes in a graph but not necessarily the shortest path",
    "Welcome to Pathfinder! Choose an algorithm and visualize the pathfinding process!",
  ];

  const [txt, setTxt] = useState(algoInfo[4]);

  useEffect(() => {
    if (algorithm === null) {
      setTxt(algoInfo[4]);
    } else if (algorithm === "Dijkstra") {
      setTxt(algoInfo[0]);
    } else if (algorithm === "AStar") {
      setTxt(algoInfo[1]);
    } else if (algorithm === "BFS") {
      setTxt(algoInfo[2]);
    } else if (algorithm === "DFS") {
      setTxt(algoInfo[3]);
    }
  }, [algorithm]);

  const heading = algorithm === null ? "Welcome!" : algorithm;
  return (
    <Card
      borderRadius={0}
      bgGradient={"linear(to-b, purple.300, purple.200, purple.300)"}
      color={"gray.800"}
    >
      <CardHeader fontWeight={"bold"} fontSize={"larger"} p={0} ml={4} mb={3}>
        {heading}
      </CardHeader>
      <CardBody p={0} ml={4}>
        {txt}
      </CardBody>
    </Card>
  );
};

export default Description;
