import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import AddCategory from "./AddCategory";

function AddItem({
  formData,
  addItem,
  setIsAdded,
  activeTab,
  createItemCategory,
  updateItemCategory,
  deleteItemCategory,
}) {
  // State to store form data
  const [formValues, setFormValues] = useState({});
  const [createCategory, setCreateCategory] = useState(false);

  // Function to handle input change
  const handleChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send formValues to API
      await addItem(formValues);
      setIsAdded(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderFormField = (fieldName, fieldType) => {
    if (fieldName === "category") {
      // Render Select input if fieldName is 'category'
      return (
        <Select
          key={fieldName}
          placeholder={`Select ${fieldName}`}
          required={true}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          {fieldType.map((value) => (
            <option key={value._id} value={value._id}>
              {value.name}
            </option>
          ))}
        </Select>
      );
    } else {
      if (fieldName === "isExpense") {
        return (
          <Select
            key={fieldName}
            placeholder={`Select Expense Type`}
            required={true}
            onChange={(e) => handleChange("isExpense", e.target.value)}
          >
            {fieldType.map((expenseValue) => (
              <option key={expenseValue.value} value={expenseValue.value}>
                {expenseValue.type}
              </option>
            ))}
          </Select>
        );
      } else {
        // Render regular Input field for other field types
        return (
          <Input
            key={fieldName}
            placeholder={fieldName}
            type={fieldType}
            required={true}
            width={"100%"}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );
      }
    }
  };

  const renderFormFields = () => {
    return Object.entries(formData).map(([type, field]) => (
      <FormControl key={type} width={"100%"}>
        <FormLabel width={"100%"}>
          {" "}
          {type === "isExpense"
            ? "Expense Type"
            : type.charAt(0).toUpperCase() + type.slice(1)}
        </FormLabel>
        <React.Fragment>{renderFormField(type, field)}</React.Fragment>
      </FormControl>
    ));
  };

  const categoryFormData = {
    name: "text",
  };

  return (
    <Box
      width={"100%"}
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {createCategory ? (
        <AddCategory
          createItemCategory={createItemCategory}
          updateItemCategory={updateItemCategory}
          deleteItemCategory={deleteItemCategory}
          formData={categoryFormData}
          setIsAdded={setIsAdded}
        ></AddCategory>
      ) : (
        <form onSubmit={handleSubmit} width={"100%"}>
          <Stack spacing={4} width={"100%"}>
            {renderFormFields()}
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      )}
      {createCategory ? (
        <Button
          marginTop={"50px"}
          onClick={() => setCreateCategory(false)}
          marginBottom={"50px"}
          bgColor={activeTab === "intro" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
        >
          + Create New {activeTab}
        </Button>
      ) : (
        <Button
          marginTop={"50px"}
          onClick={() => setCreateCategory(true)}
          marginBottom={"50px"}
          bgColor={activeTab === "intro" ? "#1BD760" : "#B89CE2"}
          _hover={{ bgColor: "#1BD760" }}
        >
          + Create {activeTab} Category
        </Button>
      )}
    </Box>
  );
}

export default AddItem;
