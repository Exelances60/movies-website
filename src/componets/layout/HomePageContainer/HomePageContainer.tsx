import { Box } from "@mui/material";
import SearchHeader from "./SearchHeader";
import CardContainer from "./CardContainer/CardContainer";

const HomePageContainer = () => {
  return (
    <>
      <Box className="w-full h-full p-5">
        <SearchHeader></SearchHeader>
        <CardContainer></CardContainer>
      </Box>
    </>
  );
};

export default HomePageContainer;
