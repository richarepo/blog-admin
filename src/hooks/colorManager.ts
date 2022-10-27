import { useColorModeValue } from "@chakra-ui/react";

const color = {
  WHITE : "#fff",
  GRAY_100 : "gray.100",
  GRAY_200 : "gray.200",
  GRAY_700 : "gray.700",
  BLACK : "#000000",
  DARK_GRAY : "gray.900",
};

const useColorManager = () => {
  const WHITE_DGRAY = useColorModeValue(color.WHITE, color.DARK_GRAY)
  const GRAY_DGRAY = useColorModeValue(color.GRAY_100, color.DARK_GRAY)
  const GRAY200_GRAY700 = useColorModeValue(color.GRAY_200, color.GRAY_700)
  return { WHITE_DGRAY ,GRAY_DGRAY ,GRAY200_GRAY700 };
};

export default useColorManager;