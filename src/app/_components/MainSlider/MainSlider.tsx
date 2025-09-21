"use client";
import React, { useRef } from "react";
import Image from "next/image";

import banner1 from "./../../../../public/screens/slider/grocery-banner-2.jpeg";
import banner2 from "./../../../../public/screens/slider/grocery-banner.png";

import slide1 from "./../../../../public/screens/slider/slider-image-1.jpeg";
import slide2 from "./../../../../public/screens/slider/slider-image-2.jpeg";
import slide3 from "./../../../../public/screens/slider/slider-image-3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// Custom dots are implemented manually, no swiper pagination/scrollbar CSS needed

const MainSlider = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  return (
    <div className="mb-10 flex">
      {/* Slider section */}
      <div className="w-2/3 relative">
        {/* Navigation arrows */}
        <button
          ref={prevRef}
          aria-label="Previous"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          ref={nextRef}
          aria-label="Next"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          // Bind custom navigation elements
          onBeforeInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const s: any = swiper;
            s.params.navigation.prevEl = prevRef.current;
            s.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide2}
              alt="slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide1}
              alt="slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide3}
              alt="slide 3"
            />
          </SwiperSlide>
        </Swiper>

        {/* Two custom dots under the slider */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-3 w-3 rounded-full bg-gray-300 hover:bg-gray-500 transition"
          />
          <button
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="h-3 w-3 rounded-full bg-gray-300 hover:bg-gray-500 transition"
          />
        </div>
      </div>

      {/* Banners section */}
      <div className="w-1/3 flex flex-col">
        <Image
          className="h-[200px] object-cover"
          src={banner1}
          alt="Banner 1"
        />
        <Image
          className="h-[200px] object-cover"
          src={banner2}
          alt="Banner 2"
        />
      </div>
    </div>
  );
};

export default MainSlider;
