import { Swiper, SwiperSlide } from "swiper/react";
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
      loop={true}
      spaceBetween={20}
      className="w-[90vw]"
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
          {type === "form" && (<div className="w-full h-full">{item}</div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}