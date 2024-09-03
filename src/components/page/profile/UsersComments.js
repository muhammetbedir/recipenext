import { Comment } from "@/components/functional/Comment";
import { useAuth } from "@/contexts/authContext";
import { getRecipeCommentByUserId } from "@/services/commentService";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const UsersComments = () => {
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ["userRecipes" + user?.id],
    queryFn: async () =>
      getRecipeCommentByUserId(user?.id).then((res) => res.data),
    enabled: !!user?.id,
  });

  return (
    <Grid container>
      {data?.map((comment) => {
        var recipe = comment?.recipe;
        return (
          <Grid key={comment?.id} item xs={12}>
            <Link
              href={
                "/tarif-detay/" +
                recipe?.visibleId +
                "/" +
                recipe?.title?.replace(" ", "-")
              }
            >
              <Typography className="pb-3 pl-3  font-bold">
                {recipe?.title}
              </Typography>
            </Link>
            <Comment
              {...comment}
              date={comment?.createDate}
              text={comment?.content}
              user={comment?.user}
              id={comment?.id}
              recipeId={comment?.recipe?.id}
              key={comment}
              refetch={refetch}
            />
          </Grid>
        );
      })}
      {data?.length === 0 && (
        <Grid item xs={12} textAlign={"center"}>
          <Box>
            <Typography>
              Henüz tarifleriniz için yapılan bir yorum bulunmamaktadır.
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default UsersComments;
