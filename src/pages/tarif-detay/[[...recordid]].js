//react
import { useRouter } from "next/router";
//thirdParty
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
//context
import { useAuth } from "@/contexts/authContext";
//services
import {
  getLatestRecipes,
  getRecipeById,
  getRecipesByCategoryAndPage,
} from "@/services/recipeService";
//enums
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import { Servings } from "@/helpers/enums";
//components
import CommentsSection from "@/components/functional/Comment";
import NutritionFacts from "@/components/functional/NutritionFacts";
import SideRecipeCard from "@/components/functional/SideRecipeCard";
import Head from "next/head";
import Link from "next/link";

const RecipeDetail = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["recipeDetails" + router.query?.recordid?.at(0)],
    queryFn: async () =>
      getRecipeById(user?.id, router.query?.recordid?.at(0)).then(
        (res) => res.data
      ),
    enabled: !!router.query?.recordid?.at(0),
  });

  const { data: categoryRecipes } = useQuery({
    queryKey: ["recipesByCategory"],
    queryFn: async () =>
      getRecipesByCategoryAndPage(user?.id, data?.category?.name, 0, 2).then(
        (res) => res.data
      ),
    enabled: !!data?.category?.name,
  });

  const { data: latestRecipe } = useQuery({
    queryKey: ["latestRecipes"],
    queryFn: async () =>
      getLatestRecipes(user?.id, 0, 2).then((res) => res.data),
  });

  return (
    <Box>
      <Head>
        <title>
          {router.query?.recordid?.at(1)?.replace("-", " ")} - Yemeğiniz
        </title>
      </Head>
      <Container maxWidth="lg" className="bg-background p-6">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Box className="col-span-2">
            <Card className="shadow-sm bg-secondary-background p-4">
              <CardHeader
                className="p-0"
                style={{ overflow: "visible", marginBottom: "-40px" }}
                title={
                  <Box className="flex flex-col">
                    <Typography
                      variant="h4"
                      className="text-foreground mb-4 font-bold"
                    >
                      {data?.title}
                    </Typography>
                    <CardMedia
                      component="img"
                      alt="resim"
                      className="object-cover"
                      image={
                        process.env.NEXT_PUBLIC_BASEIMAGEURL + data?.imageUrl
                      }
                      style={{ height: "400px" }}
                    />
                    <Box className="flex flex-row w-full justify-around px-16 py-8 gap-4 items-center opacity-60">
                      <div className="flex items-center flex-col justify-center gap-2">
                        <AccessTimeIcon sx={{ fontSize: 22 }} />
                        <Typography variant="h6" className="mb-2">
                          {data?.preparationTime}dk
                        </Typography>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="block h-12"
                      />
                      <div className="flex items-center flex-col justify-center gap-2">
                        <RestaurantIcon sx={{ fontSize: 22 }} />
                        <Typography variant="h6" className="mb-2">
                          {data?.cookingTime}dk
                        </Typography>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        className="block h-12"
                      />
                      <div className="flex items-center flex-col justify-center gap-2">
                        <RestaurantMenuIcon sx={{ fontSize: 22 }} />
                        <Typography variant="h6" className="mb-2">
                          {
                            Servings.find((x) => x.value === data?.servings)
                              ?.label
                          }
                          kişi
                        </Typography>
                      </div>
                    </Box>
                  </Box>
                }
              />
              <CardContent className="p-6 border-x-2">
                <Box className="flex flex-row-reverse justify-between mb-6">
                  <Box className="gap-2 flex flex-col">
                    <Box className="gap-2 flex items-center">
                      <Avatar
                        alt={data?.user?.userName}
                        src={
                          process.env.NEXT_PUBLIC_BASEIMAGEURL +
                          data?.user?.profilePicture
                        }
                      />
                      <Typography
                        variant="body1"
                        className="text-secondary text-center"
                      >
                        <Link href={"/profil/" + data?.user?.userName}>
                          {data?.user.userName}
                        </Link>
                      </Typography>
                    </Box>
                    <Box className="gap-2 flex items-center">
                      <CalendarMonthIcon
                        sx={{ fontSize: 30 }}
                        className="text-foreground"
                      />
                      <Typography
                        variant="body1"
                        className="text-secondary text-center"
                      >
                        {new Date(data?.createDate)?.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" className="text-foreground mb-4">
                  {data?.description}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-secondary mb-4 font-bold"
                >
                  Malzemeler
                </Typography>
                <List>
                  {data?.ingredients?.split("\n")?.map((item) => {
                    return (
                      <ListItemText className="text-foreground">
                        {item}
                      </ListItemText>
                    );
                  })}
                </List>

                <Divider className="my-6" />

                <Typography
                  variant="h5"
                  className="text-secondary mb-4 font-bold"
                >
                  Tarif
                </Typography>
                <List>
                  {data?.instructions?.split("\n")?.map((item) => {
                    return (
                      <ListItemText className="text-foreground">
                        {item}
                      </ListItemText>
                    );
                  })}
                </List>
                <Grid container spacing={1}>
                  {data?.recipeTutorialPictures?.map((item) => {
                    return (
                      <Grid item xs={12} md={6}>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASEIMAGEURL +
                            item?.imageUrl
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <Divider className="my-8 border-4 border-primary" />
                <CommentsSection id={data?.id} />
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card className="shadow-sm mb-3 bg-secondary-background">
              <NutritionFacts />
            </Card>
            <Card className="shadow-sm mb-3 bg-secondary-background">
              <CardContent className="p-3">
                <Typography
                  variant="h6"
                  className="text-secondary mb-4 font-bold"
                >
                  İlgili Tarifler
                </Typography>
                {categoryRecipes?.map((item) => (
                  <SideRecipeCard {...item} />
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-sm mb-3 bg-secondary-background">
              <CardContent className="p-3">
                <Typography
                  variant="h6"
                  className="text-secondary mb-4 font-bold"
                >
                  En Son Tarifler
                </Typography>
                {latestRecipe?.map((item) => (
                  <SideRecipeCard {...item} />
                ))}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
RecipeDetail.acl = {
  action: actions.read,
  subject: pages.recipeDetail,
};
export default RecipeDetail;
