import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addRecipeToBook,
  deleteRecipeFromBook,
} from "@/services/bookedService";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/authContext";

const RecipeCard = ({
  title,
  category,
  imageUrl,
  id,
  isBooked,
  bookedCount,
  preparationTime,
  cookingTime,
  servings,
  commentCount,
  visibleId,
  bookId,
  refetch,
  isOwner,
}) => {
  //context
  const { user } = useAuth();
  //state
  const [booked, setBooked] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  //react-query

  const addMutation = useMutation({
    mutationFn: () => {
      return addRecipeToBook({
        recipeId: id,
        userId: user?.id,
      });
    },
    onSuccess: (response) => {
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteRecipeFromBook(bookId);
    },
    onSuccess: (response) => {
      refetch();
    },
  });

  //useEffect
  useEffect(() => {
    setBooked(isBooked);
  }, [isBooked]);

  useEffect(() => {
    setIsUserLogin(!!user);
  }, [user]);

  return (
    <Card className="pb-3 h-[380px] m-2 rounded-md shadow-md  hover:bg-transparent hover:shadow-lg relative bg-secondary-background">
      {isUserLogin ? (
        booked ? (
          <IconButton
            className="absolute right-3 bg-background top-3 p-1 bg-opacity-85 rounded-sm hover:bg-background hover:bg-opacity-100"
            onClick={() => deleteMutation.mutate()}
          >
            <BookmarkIcon sx={{ fontSize: 28 }} className="text-primary" />
          </IconButton>
        ) : (
          <IconButton
            className="absolute right-3 bg-background top-3 p-1 bg-opacity-85 rounded-sm hover:bg-background hover:bg-opacity-100"
            onClick={() => addMutation.mutate()}
          >
            <BookmarkBorderIcon
              sx={{ fontSize: 28 }}
              className="text-primary"
            />
          </IconButton>
        )
      ) : (
        <Link href="/giris-yap">
          <IconButton className="absolute right-3 bg-background top-3 p-1 bg-opacity-85 rounded-sm hover:bg-background hover:bg-opacity-100">
            <BookmarkBorderIcon
              sx={{ fontSize: 28 }}
              className="text-primary"
            />
          </IconButton>
        </Link>
      )}
      <Link href={"/tarif-detay/" + visibleId + "/" + title?.replace(" ", "-")}>
        <CardHeader
          className="p-0"
          style={{ overflow: "visible" }}
          title={
            <CardMedia
              component="img"
              className="object-cover h-60"
              image={process.env.NEXT_PUBLIC_BASEIMAGEURL + imageUrl}
            />
          }
        />
        <CardContent className="pb-0 pt-2 px-4 flex-col items-start">
          <Typography variant="h6" className="font-bold">
            {title}
          </Typography>
          <Box className="flex gap-1 mt-3">
            {/* {category?.slice(0, 4).map((item, index) => (
              <Chip
                key={index}
                label={item}
                className="bg-secondary text-secondary-foreground"
              />
            ))} */}
            {category?.name && (
              <Chip
                label={category?.name}
                className="bg-secondary text-secondary-foreground"
              />
            )}
          </Box>
        </CardContent>
        <Box className="absolute bottom-0 w-full">
          <Divider className="mt-3" />
          <CardActions className="ml-4 flex justify-between">
            <Box className="flex gap-2">
              <Typography
                variant="body1"
                className="opacity-60 flex items-center"
              >
                {bookedCount}
                <BookmarkIcon sx={{ fontSize: 18 }} />
              </Typography>
              <Typography
                variant="body1"
                className="opacity-60 flex items-center"
              >
                {commentCount}
                <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
              </Typography>
            </Box>
            {isOwner && (
              <Link
                className="text-primary hover:text-focus"
                href={"/tarif-olustur/" + visibleId}
              >
                Düzenle
              </Link>
            )}
          </CardActions>
        </Box>
      </Link>
    </Card>
  );
};

export default RecipeCard;
