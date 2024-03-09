import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import List from "./List";
import Navbar from "./Navbar";
import {
  createItem,
  createItemCategory,
  deleteItem,
  deleteItemCategory,
  getAllItems,
  getAllItemsCategory,
  updateItem,
  updateItemCategory,
} from "../apis/item";
import { getCookieToken } from "../utils/utils";

function ToDos() {
  const [toDos, setToDos] = useState([]);
  const [toDoCategories, setToDoCategories] = useState([]);
  const toDoType = "to_do";

  useEffect(() => {
    const token = getCookieToken();
    const headers = {
      Authorisation: `bearer ${token}`,
    };
    // Fetch all items when the component mounts
    getAllItems(toDoType, headers)
      .then((data) => setToDos(data))
      .catch((error) => console.error("Error fetching toDos :" + error));
    getAllItemsCategory(toDoType, headers)
      .then((data) => setToDoCategories(data))
      .catch((error) =>
        console.error("Error fetching expenses categories :" + error)
      );
  }, []);

  const handleCreateToDo = async (newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createdToDo = await createItem(newData, toDoType, headers);
      setToDos([...toDos, createdToDo]);
    } catch (error) {
      alert("Error creating toDo :" + error);
    }
  };

  const handleUpdateToDo = async (itemId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const updatedToDo = await updateItem(itemId, newData, toDoType, headers);
      const updatedToDos = toDos.map((item) =>
        item._id === updatedToDo._id ? updatedToDo : item
      );
      setToDos(updatedToDos);
    } catch (error) {
      alert("Error updating toDos :" + error);
    }
  };

  const handleDeleteToDo = async (itemId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItem(itemId, toDoType, headers);
      const updatedToDos = toDos.filter((item) => item._id !== itemId);
      setToDos(updatedToDos);
    } catch (error) {
      alert("Error deleting toDo :" + error);
    }
  };

  const handleCreateToDoCategory = async (newToDoCategory) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await createItemCategory(newToDoCategory, toDoType, headers);
      setToDoCategories([...toDoCategories, newToDoCategory]);
    } catch (error) {
      alert("Error creating toDo Category :" + error);
    }
  };

  const handleUpdateToDoCategory = async (itemCategoryId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await updateItemCategory(itemCategoryId, newData, toDoType, headers);
      const updatedToDosCategories = toDos.map((item) =>
        item._id === itemCategoryId ? newData : item
      );
      setToDoCategories(updatedToDosCategories);
    } catch (error) {
      alert("Error updating toDo Category :" + error);
    }
  };

  const handleDeleteToDoCategory = async (itemId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItemCategory(itemId, toDoType, headers);
      const updatedToDosCategories = toDoCategories.filter(
        (item) => item._id !== itemId
      );
      setToDoCategories(updatedToDosCategories);
    } catch (error) {
      alert("Error deleting toDo Category :" + error);
    }
  };

  const formData = {
    title: "text",
    description: "text",
    category: toDoCategories,
  };

  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      padding={"50px 50px"}
      maxH={{ lg: "100vh" }}
    >
      <Navbar activeTab={"to-do"}></Navbar>
      <List
        addItem={handleCreateToDo}
        updateItem={handleUpdateToDo}
        deleteItem={handleDeleteToDo}
        listItems={toDos}
        formData={formData}
        activeTab={toDoType}
        listCategories={toDoCategories}
        createItemCategory={handleCreateToDoCategory}
        updateItemCategory={handleUpdateToDoCategory}
        deleteItemCategory={handleDeleteToDoCategory}
      ></List>
    </Box>
  );
}

export default ToDos;
