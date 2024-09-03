//react
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
//thirdParty
import { Grid, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
//context
import { useAuth } from "@/contexts/authContext";
//services
import { getLatestRecipes, getRecipeCount } from "@/services/recipeService";
//components
import RecipeCard from "@/components/functional/RecipeCard";
import PaginationCustom from "@/components/page/PaginationCustom";
import PageCustom from "@/components/page/PageCustom";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";

const NewRecipes = () => {
  //context
  const { user } = useAuth();
  const router = useRouter();

  //state
  const [page, setPage] = useState(
    router.query?.recordid?.at(0) ? router.query?.recordid?.at(0) - 1 : 0
  );

  //react-query
  const { data } = useQuery({
    queryKey: ["latestRecipes" + page],
    queryFn: async () =>
      getLatestRecipes(user?.id, page).then((res) => res.data),
  });

  const { data: count } = useQuery({
    queryKey: ["latestRecipeCount"],
    queryFn: async () => getRecipeCount().then((res) => res.data),
  });

  //useEffect
  useEffect(() => {
    router.push(`${page + 1}`);
  }, [page]);

  return (
    <div>
      <Head>
        <title>Yeni Tarifler - Yemeğiniz</title>
      </Head>
      <PaginationCustom count={count} page={page} setPage={setPage}>
        <PageCustom>
          <Grid container my={4}>
            <Grid item xs={12}>
              <Typography
                className="text-secondary"
                variant="h6"
                fontWeight={"bold"}
                my={2}
                ml={2}
              >
                Yeni Tarifler
              </Typography>
            </Grid>
            {data?.map((recipe) => {
              return (
                <Grid item xs={12} sm={4}>
                  <RecipeCard key={recipe?.id} {...recipe} />
                </Grid>
              );
            })}
          </Grid>
        </PageCustom>
      </PaginationCustom>
    </div>
  );
};
export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["latestRecipes" + context.params?.recordid?.at(0)],
    queryFn: async () =>
      getLatestRecipes(
        null,
        context.params?.recordid?.at(0) ?? null,
        null,
        context
      ).then((res) => res.data),
  });
  await queryClient.prefetchQuery({
    queryKey: ["latestRecipeCount"],
    queryFn: async () => getRecipeCount(context).then((res) => res.data),
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
NewRecipes.acl = {
  action: actions.read,
  subject: pages.newRecipes,
};
export default NewRecipes;
