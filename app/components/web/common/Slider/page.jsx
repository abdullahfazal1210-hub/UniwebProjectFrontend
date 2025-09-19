import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// components
import ProductCard from "../Product/page.jsx";
import ReviewCard from "../Review/page.jsx";
import BlogCard from "../Blog/page.jsx";

export default function Slider({ type, data }) {
  return (
    <Swiper
      slidesPerView={3}
      centeredSlides={false}
      grabCursor={true}
      pagination={{ clickable: true }}
      navigation={true} 
      loop={true}
      spaceBetween={20}
      className="w-full"
      modules={[Navigation, Pagination]}
    >
      {data?.map((item, idx) => (
        <SwiperSlide key={idx}>
          {type === "property" && (
            <ProductCard
              {...item}
            />
          )}
          {type === "review" && (
            <ReviewCard
              {...item}
            />
          )}
          {type === "blog" && (
            <BlogCard
              {...item}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}