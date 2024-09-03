//react
import Link from "next/link";
import { useEffect, useState } from "react";
//thirdParty
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
//context
//services
import {
  addComment,
  addSubComment,
  deleteCommentById,
  deleteSubCommentById,
  getRecipeCommentCount,
  getRecipeCommentsByPage,
  likeComment,
  removeLikeFromComment,
} from "@/services/commentService";
//helpers
import { dateFormatWithHours } from "@/constants/common";
import { useAuth } from "@/contexts/authContext";
//components
import PaginationCustom from "../page/PaginationCustom";
import { Toast } from "@/helpers/responseHandler";

export const Comment = ({
  user,
  text,
  date,
  subComments,
  recipeId,
  id,
  refetch,
  isLiked,
  likeCount,
}) => {
  //context
  const context = useAuth();

  //states
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //useForm
  const { control, handleSubmit, reset } = useForm();

  //react query
  const mutation = useMutation({
    mutationFn: (data) => {
      return addSubComment({
        recipeId: recipeId,
        userId: context?.user?.id,
        content: data.replyText,
        parentComentId: id,
      });
    },
    onSuccess: () => {
      reset();
      setShowReplyInput(false);
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      setShowDeleteModal(false);
      return deleteCommentById(id);
    },
    onSuccess: () => {
      Toast.successToast("Yorum silindi.");
      refetch();
    },
  });

  const likeMutation = useMutation({
    mutationFn: () => {
      if (context?.user?.id)
        return likeComment({ commentId: id, userId: context?.user?.id });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => {
      return removeLikeFromComment({
        commentId: id,
        userId: context?.user?.id,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  //custom functions

  return (
    <Box className="flex flex-col mb-4">
      <Box className="flex mb-4">
        <Avatar
          alt={user?.userName}
          src={process.env.NEXT_PUBLIC_BASEIMAGEURL + user?.profilePicture}
          className="mr-4"
        />
        <Box className="flex-1">
          <Box className="flex justify-between items-center">
            <Link href={"/profil/" + user?.userName}>
              <Typography variant="body1" className="text-foreground font-bold">
                {user?.userName}
              </Typography>
            </Link>
            <Typography variant="body2" className="text-secondary">
              {moment(date).format(dateFormatWithHours)}
            </Typography>
          </Box>
          <Typography variant="body2" className="text-foreground mb-2">
            {text}
          </Typography>
          <Box className="flex space-x-4">
            <Button
              variant="text"
              size="small"
              className="text-primary"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <ModeCommentIcon className="mr-2 text-lg" />
              Yanıtla
            </Button>
            <Box className="text-primary flex justify-center items-center">
              {isLiked ? (
                <ThumbUpIcon
                  className="mr-2 text-lg cursor-pointer"
                  onClick={removeLikeMutation.mutate}
                />
              ) : (
                <ThumbUpOutlinedIcon
                  className="mr-2 text-lg cursor-pointer"
                  onClick={likeMutation.mutate}
                />
              )}
              <Typography className="text-black opacity-70 text-sm cursor-default">
                {likeCount}
              </Typography>
            </Box>
            {user?.id === context.user?.id && (
              <Button
                variant="text"
                size="small"
                className="text-red-600"
                onClick={() => setShowDeleteModal(true)}
              >
                Sil
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {showReplyInput && (
        <form
          onSubmit={handleSubmit(mutation.mutate)}
          className="flex flex-col mb-4"
        >
          <Controller
            name="replyText"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Yanıtınız"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                className="mb-2"
              />
            )}
          />
          <Box className="flex space-x-2">
            <Button
              type="submit"
              variant="contained"
              className=" bg-buttonBg hover:bg-buttonHoverBg"
            >
              Gönder
            </Button>
            <Button
              variant="text"
              color="secondary"
              // className="mt-4 bg-buttonBg hover:bg-buttonHoverBg"
              onClick={() => {
                setShowReplyInput(false);
                reset();
              }}
            >
              İptal
            </Button>
          </Box>
        </form>
      )}
      <Divider className="mb-6" />
      {subComments?.map((comment) => {
        return (
          <SubComment
            key={comment.id}
            id={comment.id}
            user={comment.user}
            text={comment.content}
            date={comment.createDate}
            refetch={refetch}
            likeCount={comment.likeCount}
            isLiked={comment.isLiked}
          />
        );
      })}

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        closeAfterTransition
        className="h-full flex"
      >
        <Fade in={showDeleteModal}>
          <Box className="flex flex-col p-4 bg-white rounded shadow-lg w-80 mx-auto my-auto">
            <Typography variant="body1" className="mb-4">
              Silmek istediğinize emin misiniz?
            </Typography>
            <Box className="flex justify-end space-x-4">
              <Button
                className="text-black"
                onClick={() => setShowDeleteModal(false)}
              >
                İptal
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="text-white bg-red-600 hover:bg-red-900"
                onClick={deleteMutation.mutate}
              >
                Sil
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const SubComment = ({ user, text, date, id, refetch, isLiked, likeCount }) => {
  //context
  const context = useAuth();

  //states
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //react query
  const deleteMutation = useMutation({
    mutationFn: () => {
      setShowDeleteModal(false);
      return deleteSubCommentById(id);
    },
    onSuccess: () => {
      Toast.successToast("Yorum silindi.");
      refetch();
    },
  });

  const likeMutation = useMutation({
    mutationFn: () => {
      if (context?.user?.id)
        return likeComment({ subCommentId: id, userId: context?.user?.id });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => {
      return removeLikeFromComment({
        subCommentId: id,
        userId: context?.user?.id,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Box className="flex mb-4 ml-14">
      <Avatar
        alt={user.userName}
        src={process.env.NEXT_PUBLIC_BASEIMAGEURL + user?.profilePicture}
        className="mr-4"
      />
      <Box className="flex-1">
        <Box className="flex justify-between items-center">
          <Link href={"/profil/" + user?.userName}>
            <Typography variant="body1" className="text-foreground font-bold">
              {user.userName}
            </Typography>
          </Link>
          <Typography variant="body2" className="text-secondary">
            {moment(date).format(dateFormatWithHours)}
          </Typography>
        </Box>
        <Typography variant="body2" className="text-foreground mb-2">
          {text}
        </Typography>
        <Box className="flex">
          <Box className="text-primary flex justify-center items-center">
            {isLiked ? (
              <ThumbUpIcon
                className="mr-2 text-lg cursor-pointer"
                onClick={removeLikeMutation.mutate}
              />
            ) : (
              <ThumbUpOutlinedIcon
                className="mr-2 text-lg cursor-pointer"
                onClick={likeMutation.mutate}
              />
            )}
            <Typography className="text-black opacity-70 text-sm cursor-default">
              {likeCount}
            </Typography>
          </Box>
          {user?.id === context.user?.id && (
            <Button
              variant="text"
              size="small"
              className="text-red-600 ml-1"
              onClick={() => setShowDeleteModal(true)}
            >
              Sil
            </Button>
          )}
        </Box>
      </Box>
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        closeAfterTransition
        className="h-full flex"
      >
        <Fade in={showDeleteModal}>
          <Box className="flex flex-col p-4 bg-white rounded shadow-lg w-80 mx-auto my-auto">
            <Typography variant="body1" className="mb-4">
              Silmek istediğinize emin misiniz?
            </Typography>
            <Box className="flex justify-end space-x-4">
              <Button
                className="text-black"
                onClick={() => setShowDeleteModal(false)}
              >
                İptal
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="text-white bg-red-600 p-1 hover:bg-red-900"
                onClick={deleteMutation.mutate}
              >
                Sil
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const CommentsSection = ({ id }) => {
  //context
  const { user } = useAuth();
  //state
  const [content, setContent] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [page, setPage] = useState(0);

  //react-query

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments" + id + "-" + page],
    queryFn: async () =>
      getRecipeCommentsByPage(id, user?.id, page).then((res) => res.data),
  });
  const { data: commentCount, refetch: refetchCount } = useQuery({
    queryKey: ["commentCount" + id],
    queryFn: async () => getRecipeCommentCount(id).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return addComment({
        recipeId: id,
        userId: user?.id,
        content: content,
      });
    },
    onSuccess: () => {
      setContent("");
      refetch();
      refetchCount();
    },
  });

  //useEffect
  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  return (
    <Card className="shadow-none mb-6 bg-secondary-background">
      <CardContent className="p-0">
        <Typography variant="h5" className="text-secondary mb-4 font-bold">
          Yorumlar
        </Typography>
        {commentCount > 0 ? (
          <PaginationCustom count={commentCount} page={page} setPage={setPage}>
            <Box width="100%">
              {comments?.map((comment, index) => (
                <Comment
                  isLiked={comment?.isLiked}
                  key={comment?.id}
                  user={comment.user}
                  text={comment.content}
                  date={comment.createDate}
                  id={comment.id}
                  recipeId={id}
                  subComments={comment.subComents}
                  refetch={refetch}
                  likeCount={comment.likeCount}
                />
              ))}
            </Box>
          </PaginationCustom>
        ) : (
          <Box className="flex items-center justify-center">
            İlk yorumu sen yaz.
          </Box>
        )}
        <Divider className="my-4" />
        <Box>
          <Typography variant="h6" className="text-secondary mb-4 font-bold">
            Tarifi beğen ve fikirlerin yaz
          </Typography>
          <Box className="mb-4">{/* Rating component burada yer alacak */}</Box>
          <Box className="flex flex-col ">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Yorumunuzu giriniz..."
              className="w-full p-2 border rounded-md bg-secondary-background"
              rows="4"
            />
            <Button
              disabled={!isLogin || !content}
              variant="contained"
              className="mt-4 bg-buttonBg hover:bg-buttonHoverBg"
              onClick={() => {
                mutation.mutate();
              }}
            >
              {isLogin ? "Paylaş" : "Lütfen Giriş Yapınız"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
