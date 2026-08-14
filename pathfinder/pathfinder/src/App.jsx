import { Card } from "@chakra-ui/react";
import React from "react";
import Nav from "./components/Nav";
import GridMesh from "./components/GridMesh";
import { Provider } from "react-redux";
import store from "./redux/store";
import Description from "./components/Description";

const App = () => {
  return (
    <Provider store={store}>
      <Card
        h={"100vh"}
        w={"100%"}
        borderRadius={0}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
            color: "purple",
          },
        }}
      >
        <Nav />
        <Description />
        <GridMesh />
      </Card>
    </Provider>
  );
};

export default App;
