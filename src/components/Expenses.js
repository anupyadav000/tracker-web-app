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

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const expenseType = "expense";

  useEffect(() => {
    const token = getCookieToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // Fetch all items when the component mounts
    getAllItems(expenseType, headers)
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses :" + error));
    getAllItemsCategory(expenseType, headers)
      .then((data) => setExpenseCategories(data))
      .catch((error) =>
        console.error("Error fetching expenses categories :" + error)
      );
  }, []);

  const handleCreateExpense = async (newExpense) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createdExpense = await createItem(newExpense, expenseType, headers);
      setExpenses([...expenses, createdExpense]);
    } catch (error) {
      alert("Error creating expense :" + error);
    }
  };

  const handleUpdateExpense = async (itemId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const updatedExpense = await updateItem(
        itemId,
        newData,
        expenseType,
        headers
      );
      const updatedExpenses = expenses.map((item) =>
        item._id === updatedExpense._id ? updatedExpense : item
      );
      setExpenses(updatedExpenses);
    } catch (error) {
      alert("Error updating expenses :" + error);
    }
  };

  const handleDeleteExpense = async (itemId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItem(itemId, expenseType, headers);
      const updatedExpenses = expenses.filter((item) => item._id !== itemId);
      setExpenses(updatedExpenses);
    } catch (error) {
      alert("Error deleting expense :" + error);
    }
  };

  const handleCreateExpenseCategory = async (newExpenseCategory) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await createItemCategory(newExpenseCategory, expenseType, headers);
      setExpenseCategories([...expenseCategories, newExpenseCategory]);
    } catch (error) {
      alert("Error creating expense category :" + error);
    }
  };

  const handleUpdateExpenseCategory = async (itemCategoryId, newData) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await updateItemCategory(itemCategoryId, newData, expenseType, headers);
      const updatedExpenseCategories = expenseCategories.map((item) =>
        item._id === itemCategoryId ? newData : item
      );
      setExpenseCategories(updatedExpenseCategories);
    } catch (error) {
      alert("Error updating expense categories :" + error);
    }
  };

  const handleDeleteExpenseCategory = async (itemCategoryId) => {
    try {
      const token = getCookieToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await deleteItemCategory(itemCategoryId, expenseType, headers);
      const updatedExpenseCategories = expenses.filter(
        (item) => item._id !== itemCategoryId
      );
      setExpenseCategories(updatedExpenseCategories);
    } catch (error) {
      alert("Error deleting expense category :" + error);
    }
  };

  const formData = {
    title: "text",
    description: "text",
    amount: "number",
    category: expenseCategories,
    isExpense: [
      {
        value: true,
        type: "Cash Out",
      },
      {
        value: false,
        type: "Cash In",
      },
    ],
  };

  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      padding={"50px 50px"}
      justifyContent={"space-between"}
      maxH={{ lg: "100vh" }}
    >
      <Navbar activeTab={expenseType}></Navbar>
      <List
        addItem={handleCreateExpense}
        updateItem={handleUpdateExpense}
        deleteItem={handleDeleteExpense}
        listItems={expenses}
        activeTab={expenseType}
        formData={formData}
        listCategories={expenseCategories}
        createItemCategory={handleCreateExpenseCategory}
        updateItemCategory={handleUpdateExpenseCategory}
        deleteItemCategory={handleDeleteExpenseCategory}
      ></List>
    </Box>
  );
}

export default Expenses;
