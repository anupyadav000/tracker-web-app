import {
  Box,
  Button,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Add from "./Add";
import EditItem from "./EditItem";

function List({
  activeTab,
  listItems,
  addItem,
  updateItem,
  deleteItem,
  formData,
  createItemCategory,
  updateItemCategory,
  deleteItemCategory,
  listCategories,
}) {
  const [listItemsData, setListItemsData] = useState(listItems);
  // Extract headers from the first object in data array
  var headers = listItemsData.length > 0 ? Object.keys(listItemsData[0]) : [];
  const [searchTerm, setSearchTerm] = useState("");

  // Get current date
  const currentDate = new Date(Date.now());
  // Extract year, month, and day components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  headers = headers.filter((header) => {
    return !["userId", "_id", "updatedAt", "__v", "isExpense"].includes(header);
  });

  const handleSetSearchTerm = (term) => {
    setSearchTerm(term);
    const filteredListData = listItems.filter((item) => {
      const categoryData = listCategories.filter((category) => {
        return category._id === item.categoryId;
      });
      const categoryName = categoryData[0]?.name;

      return categoryName?.toLowerCase().indexOf(term?.toLowerCase()) !== -1;
    });
    setListItemsData(filteredListData);
  };

  const [editItemIndex, setEditItemIndex] = useState(-1);

  useEffect(() => {
    handleSetSearchTerm(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItems]);

  const getItemDataValue = (item, header) => {
    if (header === "createdAt") {
      const date = new Date(item[header]);

      // Get day, month, and year from the date object
      const day = date.getDate().toString().padStart(2, "0"); // Pad with leading zero if needed
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
      const year = date.getFullYear();

      // Format the date as DD-MM-YYYY
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    } else {
      if (header === "categoryId") {
        const categoryData = listCategories.filter((category) => {
          return category._id === item[header];
        });
        return categoryData[0]?.name || "";
      } else {
        return item[header];
      }
    }
  };

  const getNetBalance = () => {
    var sumAmount = 0;
    listItemsData.forEach((element) => {
      var sign = element.isExpense === true ? -1 : +1;
      sumAmount += element.amount * sign;
    });
    return sumAmount;
  };

  const handleSearchByDate = () => {
    const filteredListData = listItems.filter((item) => {
      const itemCreatedTime = item?.createdAt;
      const itemCreatedTimestamp = Date.parse(itemCreatedTime);
      const startDateTimestamp = Date.parse(startDate);
      const endDateTimestamp = Date.parse(endDate);
      return (
        itemCreatedTimestamp >= startDateTimestamp &&
        itemCreatedTimestamp <= endDateTimestamp
      );
    });
    setListItemsData(filteredListData);
  };

  return (
    <Box
      width={"100%"}
      margin={{ lg: "2% 2%" }}
      maxH={"100vh"}
      overflowY={"scroll"}
      padding={{ lg: "3% 3%" }}
      marginTop={{ base: "50px", md: "0px" }}
    >
      <Add
        addItem={addItem}
        activeTab={activeTab}
        formData={formData}
        createItemCategory={createItemCategory}
        updateItemCategory={updateItemCategory}
        deleteItemCategory={deleteItemCategory}
      ></Add>
      <Box
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        maxW={"70%"}
        marginTop={"100px"}
      >
        <FormLabel minW={"50%"}>Search By Category</FormLabel>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSetSearchTerm(e.target.value)}
        ></Input>
      </Box>
      <Box
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        maxW={"90%"}
        marginTop={"20px"}
      >
        <FormLabel minW={"39%"}>
          Search By Date Range (Start Date-End Date)
        </FormLabel>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></Input>
        <Input
          type="date"
          value={endDate}
          marginLeft={{ lg: "30px" }}
          marginTop={{ base: "30px", md: "0px" }}
          onChange={(e) => setEndDate(e.target.value)}
        ></Input>
        <Button
          onClick={handleSearchByDate}
          minW={"10%"}
          marginLeft={{ lg: "20px" }}
          marginTop={{ base: "30px", md: "0px" }}
        >
          Search
        </Button>
      </Box>
      {activeTab === "expense" && (
        <Box
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          maxW={"70%"}
          marginTop={"20px"}
          fontSize={"larger"}
          fontWeight={"extrabold"}
        >
          <FormLabel minW={"50%"}>Net Balance</FormLabel>
          <h1>{getNetBalance()}</h1>
        </Box>
      )}
      <Box marginTop={"100px"} maxW={"100%"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index} fontWeight={"extrabold"} textColor={"white"}>
                  {header === "categoryId" ? "category" : header}
                </Th>
              ))}
              {headers.length > 0 && (
                <Th fontWeight={"extrabold"} textColor={"white"}>
                  Actions
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {listItemsData.map((item, indexx) => (
              <Tr
                key={indexx}
                bgColor={
                  activeTab === "expense"
                    ? item.isExpense & (activeTab === "expense")
                      ? "red.500"
                      : "green"
                    : "#222222"
                }
              >
                {headers.map((header, index) => (
                  <Td key={index}>{getItemDataValue(item, header)}</Td>
                ))}
                {headers.length > 0 && (
                  <Td minW={"20%"} display={"flex"} flexDirection={"row"}>
                    {editItemIndex === indexx && (
                      <Box
                        position={"absolute"}
                        left={"50%"}
                        top={"10%"}
                        bgColor={"#2F2F2F"}
                        padding={"100px"}
                        zIndex={"3"}
                        opacity={"4"}
                        borderRadius={"50px"}
                      >
                        <EditItem
                          formData={formData}
                          updateItem={updateItem}
                          formDataValues={item}
                          setEditItemIndex={setEditItemIndex}
                        ></EditItem>
                      </Box>
                    )}
                    <Button onClick={() => deleteItem(item._id)}>Delete</Button>
                    <Button
                      marginLeft={"10px"}
                      onClick={() => setEditItemIndex(indexx)}
                    >
                      Update
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default List;
