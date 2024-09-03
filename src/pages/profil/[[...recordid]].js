import ProfilePhotoUploader from "@/components/functional/ProfilePhotoUploader";
import TabsCustom from "@/components/functional/TabsCustom";
import BookedRecipes from "@/components/page/profile/BookedRecipes";
import ProfileEditModal from "@/components/page/profile/ProfileEditModal";
import ProfileRecipe from "@/components/page/profile/ProfileRecipe";
import UsersComments from "@/components/page/profile/UsersComments";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import { useAuth } from "@/contexts/authContext";
import { GetCookie } from "@/helpers/cookieHelper";
import { Toast } from "@/helpers/responseHandler";
import { follow, unFollow } from "@/services/followService";
import { getUserByUserName } from "@/services/userService";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const USER_DENEME = {
  username: "YemekSever123",
  profilePicture: "/path/to/profile-picture.jpg", // Profil resminin yolu
  followers: 150,
  following: 100,
  sharedRecipes: ["Zeytinyağlı Yaprak Sarma", "İçli Köfte", "Mantı"],
  draftRecipes: [
    "Karnıyarık Taslağı",
    "Kısır Taslağı",
    "Mercimek Köftesi Taslağı",
  ],
  savedRecipes: ["Karnıyarık", "Kısır", "Mercimek Köftesi"],
  comments: [
    "Harika bir tarif, çok beğendim!",
    "Teşekkürler, tarif çok lezzetliydi.",
    "Bunu deneyeceğim, çok güzel görünüyor!",
  ],
};

const Profile = () => {
  //context
  const { user } = useAuth();
  const router = useRouter();
  //state
  const [isUsersProfile, setIsUsersProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(true);

  //React Query
  const { data, refetch } = useQuery({
    queryKey: ["profile", router.query?.recordid?.at(0)],
    queryFn: async () => {
      const res = await getUserByUserName(
        router.query?.recordid?.at(0),
        user?.id,
        null,
        notification
      );
      return res.data;
    },
    enabled: !!router.query?.recordid?.at(0),
    retryDelay: (attemptIndex) => {
      if (attemptIndex === 1) setNotification(false);
      return 10000;
    },
    retry: 2,
  });

  const followMutation = useMutation({
    mutationFn: () => {
      debugger;
      if (!currentUser?.id) {
        Toast.warnToast("Takip etmek için lütfen giriş yapın.");
        return;
      }
      return follow({
        followerId: user?.id,
        followedId: data?.id,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: () => {
      return unFollow({
        followerId: user?.id,
        followedId: data?.id,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  //functions

  //useEffect
  useEffect(() => {
    setIsUsersProfile(user?.userName === router.query?.recordid?.at(0));
  }, [router]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <Box>
      <Head>
        <title>{data?.userName} - Yemeğiniz</title>
      </Head>
      <Box className="p-4 max-w-4xl mx-auto bg-secondary-background shadow rounded">
        {/* Kullanıcı Bilgileri */}
        <Box className="flex items-center mb-6">
          {isUsersProfile ? (
            <ProfilePhotoUploader
              key={data?.id}
              imageUrl={data?.profilePicture}
              userName={data?.userName}
            />
          ) : (
            <Avatar
              src={process.env.NEXT_PUBLIC_BASEIMAGEURL + data?.profilePicture}
              alt={data?.userName}
              sx={{ width: 100, height: 100, marginRight: 4 }}
            />
          )}
          <Box>
            <Typography variant="h4" className="text-primary">
              {data?.userName}
            </Typography>
            <Box className="flex space-x-4 items-center">
              <Typography variant="body1" className="text-gray">
                {data?.followerCount} Takipçi
              </Typography>
              <Typography variant="body1" className="text-gray">
                {data?.followedCount} Takip Edilen
              </Typography>
              {!isUsersProfile && !data?.isFollowing && !!data && (
                <Button
                  className=" bg-secondary text-white hover:bg-secondary-dark"
                  onClick={followMutation.mutate}
                >
                  Takip Et
                </Button>
              )}
              {!isUsersProfile && data?.isFollowing && (
                <Button
                  className="bg-secondary text-white hover:bg-secondary-dark"
                  onClick={unFollowMutation.mutate}
                >
                  Takip Ediyorsun
                </Button>
              )}
            </Box>
            {isUsersProfile && (
              <Button
                className="bg-secondary text-white hover:bg-secondary-dark mt-4"
                variant="outlined"
                color="primary"
                onClick={() => setShowModal(true)}
              >
                Profili Düzenle
              </Button>
            )}
          </Box>
        </Box>

        <Divider className="mb-4" />

        {/* Sekmeler */}
        <TabsCustom>
          <Tab
            label={
              isUsersProfile ? "Gönderdiğim Tarifler" : "Gönderdiği Tarifler"
            }
          >
            <ProfileRecipe id={data?.id} isUsersProfile={isUsersProfile} />
          </Tab>
          {isUsersProfile && (
            <Tab label="Taslak Tarifler">
              <Box>
                <List>
                  {USER_DENEME.draftRecipes.map((recipe, index) => (
                    <ListItem key={index} className="flex items-center mb-2">
                      <AccessTimeIcon
                        sx={{ fontSize: 20, color: "#974e44", marginRight: 2 }}
                      />
                      <ListItemText primary={recipe} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Tab>
          )}
          <Tab label="Tarif Defteri">
            <BookedRecipes id={data?.id} isUsersProfile={isUsersProfile} />
          </Tab>
          {isUsersProfile && (
            <Tab label="Yapılan Yorumlar">
              <UsersComments />
            </Tab>
          )}
        </TabsCustom>
        <ProfileEditModal
          setShowModal={setShowModal}
          showModal={showModal}
          refetch={refetch}
          data={data}
        />
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const user = GetCookie(process.env.NEXT_PUBLIC_AUTH, context);
  await queryClient.prefetchQuery({
    queryKey: ["profile" + context.params?.recordid?.at(0)],
    queryFn: async () =>
      getUserByUserName(
        context.params?.recordid?.at(0),
        user?.id,
        context
      ).then((res) => {
        return res.data;
      }),
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

Profile.acl = {
  action: actions.read,
  subject: pages.profile,
};
export default Profile;
