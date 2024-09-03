import React from "react";
import SliderCustom from "../functional/SliderCustom";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const CategorySlider = ({ data }) => {
  return (
    <Box>
      <Typography
        className="text-secondary"
        variant="h6"
        fontWeight={"bold"}
        my={2}
        ml={2}
      >
        Kategoriler
      </Typography>
      <SliderCustom>
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
                className="group relative w-80 bg-cover justify-center h-40 text-center items-center content-center flex text-white cursor-pointer rounded-md"
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
      </SliderCustom>
    </Box>
  );
};

export default CategorySlider;
