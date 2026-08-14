import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../assets/image.png";
import React, { useState } from "react";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisitedNodes,
  setPath,
  setEditWall,
  setEditWeight,
  eraseWall,
  eraseWeight,
  setEraseWall,
  addWall,
  setEraseWeight,
  addWeight,
} from "../redux/Slices/cellSlice";
import { setAlgorithm } from "../redux/Slices/algoSlice";
import Dijkstra from "../algorithms/Dijkstra";
import AStar from "../algorithms/AStar";
import recursiveDivision from "../mazes/RecursiveDivision";
import WeightedMaze from "../mazes/WeightedMaze";
import weightImg from "../../public/weight.svg";

const Nav = () => {
  const dispatch = useDispatch();
  const { visitedNodes, start, end, walls, weights } = useSelector(
    (state) => state.cell
  );
  const { algorithm } = useSelector((state) => state.algo);

  const [sliderVal, setSliderVal] = useState(0.3);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleVisualize = () => {
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(false));
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
    // console.log(walls);
    const wallNode = new Set();
    const weightNode = new Set();
    for (let wall of walls) {
      wallNode.add(`${wall.row}-${wall.col}`);
    }

    for (let weight of weights) {
      weightNode.add(`${weight.row}-${weight.col}`);
    }
    // console.log("weights", weightNode);
    const result =
      algorithm === "DFS"
        ? dfs(start, end, wallNode)
        : algorithm === "BFS"
        ? bfs(start, end, wallNode)
        : algorithm === "Dijkstra"
        ? Dijkstra(start, end, wallNode, weightNode)
        : algorithm === "AStar"
        ? AStar(start, end, wallNode, weightNode)
        : { visited: [], path: [] };
    // console.log("visited", result.visited);
    dispatch(setVisitedNodes(result.visited));
    dispatch(setPath(result.path));
    // console.log(result.path);
  };

  const clearWalls = () => {
    for (let wall of walls) {
      const element = document.getElementById(`${wall.row}-${wall.col}`);
      element.style.backgroundColor = "white";
      element.style.animation = "none";
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(false));
    dispatch(eraseWall());
  };

  const clearWeights = () => {
    for (let weight of weights) {
      const element = document.getElementById(`${weight.row}-${weight.col}`);
      element.style.backgroundColor = "white";
      element.style.backgroundImage = "none";
      element.style.animation = "none";
    }

    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWeight(false));
    dispatch(eraseWeight());
  };

  const eraseWalls = () => {
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWall(true));
  };

  const eraseWeights = () => {
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(setEraseWeight(true));
  };

  const clearBoard = () => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        if (
          (i === start[0] && j === start[1]) ||
          (i === end[0] && j === end[1])
        ) {
          const element = document.getElementById(`${i}-${j}`);
          element.style.backgroundColor = "white";
          element.style.animation = "none";
          continue;
        }
        const element = document.getElementById(`${i}-${j}`);
        element.style.backgroundColor = "white";
        element.style.backgroundImage = "none";
        element.style.animation = "none";
      }
    }
    dispatch(setEditWall(false));
    dispatch(setEditWeight(false));
    dispatch(eraseWall());
    dispatch(eraseWeight());
    dispatch(setEraseWall(false));
    dispatch(setVisitedNodes([]));
    dispatch(setPath([]));
  };

  const createMaze = () => {
    clearBoard();
    const wallNodes = new Map();
    const rowMap = new Map();
    const colMap = new Map();
    recursiveDivision(start, end, 0, 19, 0, 49, wallNodes, null, null);
    const result = new Set();
    for (let wall of wallNodes.values()) {
      result.add(`${wall.row}-${wall.col}`);
    }

    // console.log(walls);
    let index = 1;
    for (let node of wallNodes.values()) {
      dispatch(addWall({ row: node.row, col: node.col }));
      setTimeout(() => {
        const element = document.getElementById(`${node.row}-${node.col}`);
        element.style.backgroundColor = "#2e325b";
        element.style.animation = "animateWall 1s linear";
      }, 10 * index++);
    }
  };

  // const getImageUrl = (imageName) => {
  //   return `&`;
  // };

  const createWeightedMaze = () => {
    clearBoard();
    const weightNodes = new Map();
    WeightedMaze(weightNodes, start, end, sliderVal);
    // const imageUrl = getImageUrl("weight.svg");

    for (let weight of weightNodes.values()) {
      const element = document.getElementById(`${weight.row}-${weight.col}`);
      // element.style.backgroundImage = `url(${weightImg})`;
      // console.log("image", imageUrl);
      element.style.animation = "animateWeight 0.5s linear";
      dispatch(addWeight({ row: weight.row, col: weight.col }));
    }
  };
  return (
    <VStack w={"100%"} bg={"gray.800"} pl={2}>
      <HStack w={"100%"} ml={0} mt={2}>
        <Image
          src={logo}
          height={"50px"}
          w={"50px"}
          ml={0}
          borderRadius={"full"}
        />
        <Text
          w={"100%"}
          fontSize={"xx-large"}
          fontWeight={"extrabold"}
          as={"b"}
          bgGradient="linear(to-b, purple.100, purple.600)"
          bgClip={"text"}
          mt={1}
          mb={2}
        >
          Pathfinder
        </Text>
      </HStack>
      <HStack w={"100%"} mb={4} pl={4}>
        {/* Algorithms */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Algorithms
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("Dijkstra"));
              }}
            >
              Dijkstra's Algorithm
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("AStar"));
              }}
            >
              A* Algorithm
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("BFS"));
              }}
            >
              Breadth First Search
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={() => {
                dispatch(setAlgorithm("DFS"));
              }}
            >
              Depth First Search
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Mazes & Patterns */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Mazes & Patterns
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={createMaze}
            >
              Recursive Division
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.700" }}
              onClick={createWeightedMaze}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <VStack mb={4} mt={2} gap={3} p={0}>
                <Text ml={2}>Weighted Maze</Text>
                <Slider
                  defaultValue={0.3}
                  min={0.1}
                  max={0.8}
                  step={0.01}
                  onChange={(val) => {
                    setSliderVal(val);
                  }}
                >
                  <SliderTrack bg={"purple.300"}>
                    <SliderFilledTrack bg={"purple.500"} />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg={"purple.500"}
                    color={"white"}
                    label={`Density: ${sliderVal * 100}%`}
                    placement={"top"}
                    isOpen={showTooltip}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Text fontSize={"smaller"}>(Set Density of Weights)</Text>
              </VStack>
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Walls & Weights */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"inherit"}
            _hover={{ bg: "purple.600" }}
            _active={{ bg: "purple.600" }}
            color={"gray.300"}
          >
            Walls & Weights
          </MenuButton>
          <MenuList color={"gray.300"} bg={"gray.600"} border={0}>
            <Tooltip
              hasArrow
              placement="auto"
              label={
                "Select to add walls. Multiple walls will be created when the mouse is down and it is present over any cell."
              }
            >
              <MenuItem
                bg={"gray.600"}
                _hover={{ bg: "gray.800" }}
                onClick={() => {
                  dispatch(setEditWall(true));
                  dispatch(setEditWeight(false));
                }}
              >
                Add Walls
              </MenuItem>
            </Tooltip>
            <Tooltip
              hasArrow
              placement="auto"
              label={
                "Select to add weights. Multiple weights will be created when the mouse is down and it is present over any cell."
              }
            >
              <MenuItem
                bg={"gray.600"}
                _hover={{ bg: "gray.800" }}
                onClick={() => {
                  dispatch(setEditWeight(true));
                  dispatch(setEditWall(false));
                }}
              >
                Add Weights
              </MenuItem>
            </Tooltip>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.800" }}
              onClick={clearWalls}
            >
              Clear Walls
            </MenuItem>
            <MenuItem
              bg={"gray.600"}
              _hover={{ bg: "gray.800" }}
              onClick={clearWeights}
            >
              Clear Weights
            </MenuItem>
            <Tooltip
              hasArrow
              placement="auto"
              label={"Click on a wall to erase it."}
            >
              <MenuItem
                bg={"gray.600"}
                _hover={{ bg: "gray.800" }}
                onClick={eraseWalls}
              >
                Erase Walls
              </MenuItem>
            </Tooltip>
            <Tooltip
              hasArrow
              placement="auto"
              label={"Click on a weight to erase it."}
            >
              <MenuItem
                bg={"gray.600"}
                _hover={{ bg: "gray.800" }}
                onClick={eraseWeights}
              >
                Erase Weights
              </MenuItem>
            </Tooltip>
          </MenuList>
        </Menu>
        <Button
          bg={"purple.300"}
          _hover={{ bg: "purple.500", color: "gray.300" }}
          onClick={handleVisualize}
        >
          Visualize
        </Button>
        <Button
          bg={"inherit"}
          _hover={{ color: "purple.500", bg: "inherit" }}
          color={"gray.300"}
          onClick={clearBoard}
        >
          Clear Board
        </Button>
      </HStack>
    </VStack>
  );
};

export default Nav;
