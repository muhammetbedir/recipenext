import PageCustom from "@/components/page/PageCustom";
import PaginationCustom from "@/components/page/PaginationCustom";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import { getCategories } from "@/services/categoryService";
import { Box, Grid, Typography } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const index = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories().then((res) => res.data),
  });
  return (
    <div>
      <Head>
        <title>Yeni Tarifler - Yemeğiniz</title>
      </Head>
      <PageCustom>
        <Grid container my={4} gap={2}>
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
          {data?.map((item) => {
            return (
              <Link
                href={"/kategori/" + item?.name?.replace(" ", "-")}
                key={item.id}
              >
                <Box
                  style={{
                    backgroundImage: `url(${
                      process.env.NEXT_PUBLIC_BASEIMAGEURL +
                      item.imageUrl.replace("\\", "/")
                    })`,
                  }}
                  className="group relative w-80 bg-cover justify-center h-60 text-center items-center content-center flex text-white cursor-pointer rounded-md"
                >
                  <Box className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></Box>
                  <Typography
                    fontSize={20}
                    variant="body1"
                    className="transition-transform duration-300 group-hover:text-2xl"
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Link>
            );
          })}
        </Grid>
      </PageCustom>
    </div>
  );
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories().then((res) => res.data),
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

index.acl = {
  action: actions.read,
  subject: pages.recipes,
};

export default index;
