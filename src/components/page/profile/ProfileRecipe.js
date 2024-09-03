import RecipeCard from "@/components/functional/RecipeCard";
import { useAuth } from "@/contexts/authContext";
import { getRecipeByUserId } from "@/services/recipeService";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ProfileRecipe = ({ id, isUsersProfile }) => {
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ["userRecipes" + id],
    queryFn: async () =>
      getRecipeByUserId(id, user?.id).then((res) => res.data),
    enabled: !!id,
  });
  return (
    <Grid container>
      {data?.map((recipe) => {
        return (
          <Grid key={recipe?.id} item xs={12} sm={6} md={4}>
            <RecipeCard {...recipe} refetch={refetch} isOwner={true} />
          </Grid>
        );
      })}
      {data?.length === 0 && (
        <Grid item xs={12} textAlign={"center"}>
          {isUsersProfile ? (
            <Box>
              <Typography>Gönderilen bir tarif bulunmamaktadır.</Typography>
              <Link href="/">
                <Button>Tarif Oluştur</Button>
              </Link>
            </Box>
          ) : (
            "Gönderdiği bir tarif bulunmamaktadır."
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default ProfileRecipe;
