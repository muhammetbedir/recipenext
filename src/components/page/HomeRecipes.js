import { useAuth } from "@/contexts/authContext";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import RecipeCard from "../functional/RecipeCard";
import CardSkeleton from "../functional/CardSkeleton";

const HomeRecipes = ({ data, link, title, loading, buttonTitle, refetch }) => {
  if (loading) {
    return <CardSkeleton />;
  }
  return (
    <Grid container my={4}>
      <Grid item xs={12}>
        <Typography
          className="text-secondary"
          variant="h6"
          fontWeight={"bold"}
          my={2}
          ml={2}
        >
          {title}
        </Typography>
      </Grid>
      {data?.map((recipe) => {
        return (
          <Grid key={recipe?.id} item xs={12} sm={4}>
            <RecipeCard {...recipe} refetch={refetch} />
          </Grid>
        );
      })}
      <Grid item xs={12} alignItems={"center"} textAlign={"center"} my={2}>
        <Link href={link}>
          <Button className="bg-secondary opacity-80 text-white hover:bg-secondary hover:opacity-100">
            {buttonTitle}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default HomeRecipes;
