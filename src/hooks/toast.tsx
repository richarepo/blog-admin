import { useToast } from "@chakra-ui/react";

export const CustomToast = () => {
  const toast = useToast();
  const successToast = (message: string) => {
    toast({
      title: `${message}`,
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  };

  return { successToast };
};
