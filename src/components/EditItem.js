import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function EditItem({ formData, updateItem, formDataValues, setEditItemIndex }) {
  // State to store form data
  const [formValues, setFormValues] = useState(formDataValues);

  // Function to handle input change
  const handleChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send formValues to API
      await updateItem(formValues._id, formValues);
      setEditItemIndex(-1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to handle form close
  const handleCloseSubmit = async (event) => {
    event.preventDefault();
    setEditItemIndex(-1);
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
        const inputValue =
          formValues !== undefined ? formValues[fieldName] : "";
        return (
          <Select
            key={fieldName}
            placeholder={`Select Expense Type`}
            required={true}
            value={inputValue}
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
        const inputValue =
          formValues !== undefined ? formValues[fieldName] : "";
        return (
          <Input
            key={fieldName}
            placeholder={fieldName}
            type={fieldType}
            required={true}
            width={"100%"}
            value={inputValue}
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
          {"New"}{" "}
          {type === "isExpense"
            ? "Expense Type"
            : type.charAt(0).toUpperCase() + type.slice(1)}
        </FormLabel>
        <React.Fragment>{renderFormField(type, field)}</React.Fragment>
      </FormControl>
    ));
  };

  return (
    <Box
      width={"100%"}
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <form onSubmit={handleSubmit} width={"100%"}>
        <Stack spacing={4} width={"100%"}>
          {renderFormFields()}
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
      <Button onClick={handleCloseSubmit} marginTop={"40px"}>
        Close
      </Button>
    </Box>
  );
}

export default EditItem;
