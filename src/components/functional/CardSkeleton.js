import { Grid, Skeleton } from "@mui/material";

const RecipeCardSkeleton = () => (
  <Grid item xs={4}>
    <Skeleton variant="rectangular" height={200} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </Grid>
);

const CardSkeleton = () => (
  <Grid container spacing={2}>
    {[...Array(3)].map((_, index) => (
      <RecipeCardSkeleton key={index} />
    ))}
    <Grid item xs={12} alignItems={"center"} textAlign={"center"}>
      <Skeleton variant="rectangular" width={200} height={40} />
    </Grid>
  </Grid>
);

export default CardSkeleton;
