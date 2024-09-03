//react
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//thirdParty
import { Grid, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
//context
import { useAuth } from "@/contexts/authContext";
//services
import {
  getRecipeCountByCategoryAndPage,
  getRecipesByCategoryAndPage,
} from "@/services/recipeService";
//helpers
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
//components
import RecipeCard from "@/components/functional/RecipeCard";
import PageCustom from "@/components/page/PageCustom";
import PaginationCustom from "@/components/page/PaginationCustom";
import Head from "next/head";

const Category = () => {
  //context
  const { user } = useAuth();
  const router = useRouter();

  //state
  const [page, setPage] = useState(
    router.query?.recordid[1] ? router.query?.recordid[1] - 1 : 0
  );

  //react-query
  const { data, refetch } = useQuery({
    queryKey: ["recipesByCategory" + page],
    queryFn: async () =>
      getRecipesByCategoryAndPage(
        user?.id,
        router.query?.recordid?.at(0)?.replace("-", " "),
        page
      ).then((res) => res.data),
  });
  const { data: count } = useQuery({
    queryKey: ["recipesByCategoryCount"],
    queryFn: async () =>
      getRecipeCountByCategoryAndPage(
        router.query?.recordid?.at(0)?.replace("-", " ")
      ).then((res) => res.data),
  });

  //useEffect
  useEffect(() => {
    router.push(router.query?.recordid?.at(0) + `/${page + 1}`);
  }, [page]);

  return (
    <div>
      <Head>
        <title>
          {router.query?.recordid?.at(0)?.replace("-", " ")} - Yemeğiniz
        </title>
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
                {router.query?.recordid?.at(0)?.replace("-", " ")}
              </Typography>
            </Grid>
            {data?.map((recipe) => {
              return (
                <Grid item xs={12} sm={4}>
                  <RecipeCard key={recipe?.id} {...recipe} refetch={refetch} />
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
    queryKey: ["recipesByCategory"],
    queryFn: async () =>
      getRecipesByCategoryAndPage(
        null,
        context.params?.recordid?.at(0)?.replace("-", " ") ?? null,
        0
      ).then((res) => res.data),
  });
  await queryClient.prefetchQuery({
    queryKey: ["recipesByCategoryCount"],
    queryFn: async () =>
      getRecipeCountByCategoryAndPage(
        context.params?.recordid?.at(0)?.replace("-", " ") ?? null
      ).then((res) => res.data),
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
Category.acl = {
  action: actions.read,
  subject: pages.category,
};
export default Category;
