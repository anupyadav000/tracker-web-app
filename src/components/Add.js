import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import AddItem from "./AddItem";

function Add({
  formData,
  activeTab,
  addItem,
  createItemCategory,
  updateItemCategory,
  deleteItemCategory,
}) {
  const [isAdded, setIsAdded] = useState(true);
  return (
    <Box width={"100%"}>
      {isAdded ? (
        <Box
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box fontSize={"6xl"}>
            <h1>{activeTab || "Intro"}</h1>
          </Box>
          <Box>
            <Button
              onClick={() => setIsAdded(false)}
              bgColor={activeTab === "intro" ? "#1BD760" : "#B89CE2"}
              _hover={{ bgColor: "#1BD760" }}
              fontSize={"3xl"}
              padding={"30px 60px"}
            >
              + Add New
            </Button>
          </Box>
        </Box>
      ) : (
        <Box width={"100%"}>
          <AddItem
            activeTab={activeTab}
            formData={formData}
            setIsAdded={setIsAdded}
            addItem={addItem}
            createItemCategory={createItemCategory}
            updateItemCategory={updateItemCategory}
            deleteItemCategory={deleteItemCategory}
          ></AddItem>
        </Box>
      )}
    </Box>
  );
}

export default Add;
