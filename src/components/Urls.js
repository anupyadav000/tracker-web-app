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

function Urls() {
  const [urls, setUrls] = useState([]);
  const [urlCategories, setUrlCategories] = useState([]);

  const urlType = "url";

  useEffect(() => {
    const token = getCookieToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // Fetch all items when the component mounts
    getAllItems(urlType, headers)
      .then((data) => setUrls(data))
      .catch((error) => console.error("Error fetching urls :" + error));
    getAllItemsCategory(urlType)
      .then((data) => setUrlCategories(data))
      .catch((error) =>
        console.error("Error fetching expenses categories :" + error)
      );
  }, []);

  const handleCreateUrl = async (newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createdUrl = await createItem(newData, urlType, headers);
      setUrls([...urls, createdUrl]);
    } catch (error) {
      alert("Error creating url :" + error);
    }
  };

  const handleUpdateUrl = async (itemId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const updatedUrl = await updateItem(itemId, newData, urlType, headers);
      const updatedUrls = urls.map((item) =>
        item._id === updatedUrl._id ? updatedUrl : item
      );
      setUrls(updatedUrls);
    } catch (error) {
      alert("Error updating urls :" + error);
    }
  };

  const handleDeleteUrl = async (itemId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItem(itemId, urlType, headers);
      const updatedUrls = urls.filter((item) => item._id !== itemId);
      setUrls(updatedUrls);
    } catch (error) {
      alert("Error deleting url :" + error);
    }
  };

  const handleCreateUrlCategory = async (newUrlData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await createItemCategory(newUrlData, urlType, headers);
      setUrlCategories([...urlCategories, newUrlData]);
    } catch (error) {
      alert("Error creating url category :" + error);
    }
  };

  const handleUpdateUrlCategory = async (itemCategoryId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await updateItemCategory(itemCategoryId, newData, urlType, headers);
      const updatedUrlCategories = urlCategories.map((item) =>
        item._id === itemCategoryId ? newData : item
      );
      setUrlCategories(updatedUrlCategories);
    } catch (error) {
      alert("Error updating url categories :" + error);
    }
  };

  const handleDeleteUrlCategory = async (itemId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItemCategory(itemId, urlType, headers);
      const updatedUrlCategories = urlCategories.filter(
        (item) => item._id !== itemId
      );
      setUrlCategories(updatedUrlCategories);
    } catch (error) {
      alert("Error deleting url categories :" + error);
    }
  };

  const formData = {
    title: "text",
    url: "text",
    category: urlCategories,
  };

  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      padding={"50px 50px"}
      maxH={{ lg: "100vh" }}
    >
      <Navbar activeTab={"url"}></Navbar>
      <List
        addItem={handleCreateUrl}
        updateItem={handleUpdateUrl}
        deleteItem={handleDeleteUrl}
        listItems={urls}
        formData={formData}
        activeTab={urlType}
        listCategories={urlCategories}
        createItemCategory={handleCreateUrlCategory}
        updateItemCategory={handleUpdateUrlCategory}
        deleteItemCategory={handleDeleteUrlCategory}
      ></List>
    </Box>
  );
}

export default Urls;
