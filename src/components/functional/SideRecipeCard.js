//react
//thirdParty
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
//context
//services
//components

const MAX_DESCRIPTION_LENGTH = 25;
const SideRecipeCard = (data) => {
  return (
    <Box>
      <Card className="flex mb-4 shadow-none bg-secondary-background cursor-pointer hover:shadow-md">
        <CardMedia
          component="img"
          alt="related recipe"
          image={process.env.NEXT_PUBLIC_BASEIMAGEURL + data?.imageUrl}
          className="object-cover h-[120px] w-1/3"
        />
        <CardContent className="flex flex-col justify-center p-4 w-2/3">
          <Typography
            variant="body1"
            className="text-foreground font-bold mb-2"
          >
            {data?.title}
          </Typography>
          <Typography variant="body2" className="text-secondary">
            {data?.description?.length > MAX_DESCRIPTION_LENGTH
              ? data?.description?.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
              : data?.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SideRecipeCard;
