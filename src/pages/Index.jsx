import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, IconButton, List, ListItem, ListIcon, useToast } from "@chakra-ui/react";
import { FaFileUpload, FaTrash, FaFileAlt } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const toast = useToast();

  const handleUpload = () => {
    if (fileName.trim() === "") {
      toast({
        title: "Error",
        description: "File name cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFiles([...files, fileName]);
    setFileName("");
    toast({
      title: "Success",
      description: "File uploaded successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    toast({
      title: "Deleted",
      description: "File deleted successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Medical File Manager</Text>
        <HStack width="100%">
          <Input placeholder="Enter file name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <IconButton aria-label="Upload file" icon={<FaFileUpload />} onClick={handleUpload} />
        </HStack>
        <Box width="100%">
          <List spacing={3}>
            {files.map((file, index) => (
              <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
                <HStack>
                  <ListIcon as={FaFileAlt} color="green.500" />
                  <Text>{file}</Text>
                </HStack>
                <IconButton aria-label="Delete file" icon={<FaTrash />} onClick={() => handleDelete(index)} />
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
