import RecipeCard from "@/components/functional/RecipeCard";
import { useAuth } from "@/contexts/authContext";
import { getBookedRecipeByUserId } from "@/services/recipeService";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const BookedRecipes = ({ id, isUsersProfile }) => {
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ["userBookedRecipes" + id],
    queryFn: async () =>
      getBookedRecipeByUserId(id, user?.id).then((res) => res.data),
    enabled: !!id,
  });
  return (
    <Grid container>
      {data?.map((recipe) => {
        return (
          <Grid key={recipe?.id} item xs={12} sm={6} md={4}>
            <RecipeCard {...recipe} refetch={refetch} />
          </Grid>
        );
      })}
      {data?.length === 0 && (
        <Grid item xs={12} textAlign={"center"}>
          {isUsersProfile
            ? "Defterde tarif bulunmamaktadır. Yemekleri deftere ekleyerek bu alanda görünmesini sağlayabilirsiniz."
            : "Defterde tarif bulunmamaktadır."}
        </Grid>
      )}
    </Grid>
  );
};

export default BookedRecipes;
