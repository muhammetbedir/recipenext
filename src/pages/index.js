//react
//thirdParty
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
//context
import { useAuth } from "@/contexts/authContext";
//services
import {
  getLatestRecipes,
  getPopularRecipes,
  getWeeklyPopularRecipes,
} from "@/services/recipeService";
import { getCategories } from "@/services/categoryService";
//components
import CategorySlider from "@/components/page/CategorySlider";
import HomeRecipes from "@/components/page/HomeRecipes";
import WeeklyHighlights from "@/components/page/WeeklyHighlights";
import { GetCookie } from "@/helpers/cookieHelper";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import Head from "next/head";

const Home = (data) => {
  //context
  const { user } = useAuth();

  //react-query
  const {
    data: latestRecipe,
    isLoading: latestRecipeLoading,
    refetch: refetchLatest,
  } = useQuery({
    queryKey: ["latestRecipes"],
    queryFn: async () =>
      getLatestRecipes(user?.id, 0, 10).then((res) => res.data),
  });
  const { data: popularRecipeData, refetch: refetchPolular } = useQuery({
    queryKey: ["popularRecipes"],
    queryFn: async () =>
      getWeeklyPopularRecipes(user?.id, 0, 10).then((res) => res.data),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories().then((res) => res.data),
  });

  return (
    <div>
      <Head>
        <title>Yemeğiniz - En Mükemmel Yemek Tarifleri</title>
      </Head>
      <div className="flex justify-center">
        <div className="w-8/12 ">
          <WeeklyHighlights data={popularRecipeData} refetch={refetchPolular} />
          <HomeRecipes
            data={latestRecipe}
            refetch={refetchLatest}
            title={"En Yeni Tarifler"}
            link={"/yeni-tarifler"}
            loading={latestRecipeLoading}
            buttonTitle={"Tarifleri Gör"}
          />
          <CategorySlider data={categories} />
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const user = GetCookie(process.env.NEXT_PUBLIC_AUTH, context);
  await queryClient.prefetchQuery({
    queryKey: ["latestRecipes"],
    queryFn: async () =>
      getLatestRecipes(user?.id, 0, 10).then((res) => res.data),
  });
  await queryClient.prefetchQuery({
    queryKey: ["popularRecipes"],
    queryFn: async () =>
      getWeeklyPopularRecipes(user?.id, 0, 10).then((res) => res.data),
  });
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories().then((res) => res.data),
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
Home.acl = {
  action: actions.read,
  subject: pages.homePage,
};
export default Home;
