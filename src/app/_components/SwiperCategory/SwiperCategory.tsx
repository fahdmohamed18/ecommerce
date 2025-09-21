"use client"
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// Pagination CSS not needed for custom dots
import Image from 'next/image'
import { Category } from '@/types/category.type'

const SwiperCategory = ({ categories }: {categories: Category[]}) => {

    /*
    static => Image webp

    api => img
    */
  // refs for custom nav and pagination containers
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const swiperRef = useRef<any>(null)

  return (
    <div className="relative w-full">
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
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={5}
        loop={true}
        // Attach custom elements just before init so refs are set
        onBeforeInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const s: any = swiper
          s.params.navigation.prevEl = prevRef.current
          s.params.navigation.nextEl = nextRef.current
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categories.map((category: Category, idx: number) => (
          <SwiperSlide key={idx}>
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="h-[200px] object-cover w-full"
            />
            <p className="text-center my-3">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Two custom dots under images to go left/right */}
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
  )
}

export default SwiperCategory