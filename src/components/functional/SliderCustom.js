import React from "react";
import Slider from "react-slick/lib/slider";

const SliderCustom = ({
  children,
  arrows,
  dots,
  infinite,
  speed,
  slidesToShow,
  slidesToScroll,
  initialSlide,
  className,
}) => {
  var settings = {
    arrows: arrows ?? true,
    dots: dots ?? false,
    infinite: infinite ?? false,
    speed: speed ?? 500,
    slidesToShow: slidesToShow ?? 3,
    slidesToScroll: slidesToScroll ?? 1,
    initialSlide: initialSlide ?? 0,
    className: className ?? "mb-10",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderCustom;
