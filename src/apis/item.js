import axios from "axios";
import { webAppBaseUrl } from "../constants/constants";

// Create an item
const createItem = async (data, type, headers) => {
  try {
    const response = await axios.post(`${webAppBaseUrl}/${type}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error.response.data.message;
  }
};

// Read all items
const getAllItems = async (type, headers) => {
  try {
    const response = await axios.get(`${webAppBaseUrl}/${type}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error.response.data.message;
  }
};

// Update an item
const updateItem = async (itemId, data, type, headers) => {
  try {
    const response = await axios.patch(
      `${webAppBaseUrl}/${type}/${itemId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error.response.data.message;
  }
};

// Delete an item
const deleteItem = async (itemId, type, headers) => {
  try {
    const response = await axios.delete(`${webAppBaseUrl}/${type}/${itemId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error.response.data.message;
  }
};

// Create an item category
const createItemCategory = async (data, type, headers) => {
  try {
    const response = await axios.post(
      `${webAppBaseUrl}/${type}/category`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item category:", error);
    throw error.response.data.message;
  }
};

// Read all item categories
const getAllItemsCategory = async (type, headers) => {
  try {
    const response = await axios.get(`${webAppBaseUrl}/${type}/category`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching item categories:", error);
    throw error.response.data.message;
  }
};

// Update an item category
const updateItemCategory = async (itemId, data, type, headers) => {
  try {
    const response = await axios.patch(
      `${webAppBaseUrl}/${type}/category/${itemId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item category:", error);
    throw error.response.data.message;
  }
};

// Delete an item category
const deleteItemCategory = async (itemId, type, headers) => {
  try {
    const response = await axios.delete(
      `${webAppBaseUrl}/${type}/category/${itemId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting item category:", error);
    throw error.response.data.message;
  }
};

export {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
  createItemCategory,
  getAllItemsCategory,
  updateItemCategory,
  deleteItemCategory,
};
