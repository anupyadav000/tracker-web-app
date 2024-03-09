import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function AddCategory({
  setIsAdded,
  createItemCategory,
  updateItemCategory,
  deleteItemCategory,
  formData,
}) {
  // State to store form data
  const [formValues, setFormValues] = useState({});

  // Function to handle input change
  const handleChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send formValues to API
      await createItemCategory(formValues);
      setIsAdded(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderFormField = (fieldName, fieldType) => {
    // Render regular Input field for other field types
    return (
      <Input
        key={fieldName}
        placeholder={fieldName}
        type={fieldType}
        required={true}
        onChange={(e) => handleChange(fieldName, e.target.value)}
      />
    );
  };

  const renderFormFields = () => {
    return Object.entries(formData).map(([type, field]) => (
      <FormControl key={type}>
        <FormLabel>{type.charAt(0).toUpperCase() + type.slice(1)}</FormLabel>
        <React.Fragment>{renderFormField(type, field)}</React.Fragment>
      </FormControl>
    ));
  };

  return (
    <Box width={"100%"} marginLeft={"5%"} marginTop={"5%"} textAlign={"center"}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {renderFormFields()}
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default AddCategory;
