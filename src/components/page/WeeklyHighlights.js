import { Box, Typography } from "@mui/material";
import RecipeCard from "../functional/RecipeCard";
import SliderCustom from "../functional/SliderCustom";

const WeeklyHighlights = ({ data, refetch }) => {
  return (
    <Box>
      <Typography
        className="text-secondary"
        variant="h6"
        fontWeight={"bold"}
        my={2}
        ml={2}
      >
        Haftalık Trend Tarifler
      </Typography>
      <SliderCustom>
        {data?.map((item, index) => {
          return <RecipeCard refetch={refetch} key={item?.id} {...item} />;
        })}
      </SliderCustom>
    </Box>
  );
};

export default WeeklyHighlights;
