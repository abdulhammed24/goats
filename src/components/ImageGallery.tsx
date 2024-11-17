"use client";

import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Images, X } from "lucide-react";
import { NextArrow, PrevArrow } from "./SliderBtn";
import useBodyScrollLock from "@/hook/useBodyScrollLock";
import { shimmer, toBase64 } from "@/utils/imageUtils";

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

export function ImageGallery({ images, title = "" }: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useBodyScrollLock(isModalOpen);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    initialSlide: currentSlide,
    customPaging: (i: number) => (
      <div className="relative h-[60px] w-[100px]">
        <Image
          src={images[i]}
          alt={title}
          fill
          className="rounded-sm object-cover"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    ),
    dotsClass: "slick-thumbs",
  };

  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <>
      <div className="relative">
        {/* mobile */}
        <div className="block lg:hidden">
          <div
            className="relative w-full cursor-pointer pt-[50%]"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={images[0]}
              alt={title}
              fill
              className="rounded-lg object-cover object-top"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2">
              <Images size={20} color="#fff" />
              <span className="text-sm font-medium text-white">
                {images.length} photos
              </span>
            </button>
          </div>
        </div>

        {/* desktop */}
        <div className="hidden h-[400px] grid-cols-[2fr_1fr_1fr] gap-2 lg:grid">
          {/* left */}
          <div
            className="relative cursor-pointer pt-[50%]"
            onClick={() => {
              setCurrentSlide(0);
              setIsModalOpen(true);
            }}
          >
            <Image
              src={displayImages[0]}
              alt={title}
              fill
              className="rounded-lg object-cover object-top"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* middle */}
          <div className="grid grid-rows-2 gap-2">
            {displayImages.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="relative cursor-pointer pt-[50%]"
                onClick={() => {
                  setCurrentSlide(index + 1);
                  setIsModalOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="rounded-lg object-cover object-top"
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* right */}
          <div className="relative grid">
            <div
              className="relative cursor-pointer pt-[50%]"
              onClick={() => {
                setCurrentSlide(3);
                setIsModalOpen(true);
              }}
            >
              <Image
                src={displayImages[3]}
                alt={title}
                fill
                className="rounded-lg object-cover object-top"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {remainingCount > 0 && (
              <button
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2"
                onClick={() => {
                  setCurrentSlide(0);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <Images size={20} />
                  <span className="text-sm font-medium text-black">
                    View all ({images.length}+)
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen justify-center overflow-y-auto bg-black bg-opacity-90 text-center">
          <div className="relative h-full w-full">
            <div className="relative flex justify-between border-b border-b-gray-400 bg-black px-6 py-5">
              <div className="flex flex-col items-start justify-center gap-1">
                {title && (
                  <h2 className="block text-base font-semibold text-white">
                    {title}
                  </h2>
                )}
              </div>

              <button
                className="flex h-6 items-center justify-center"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} color="#fff" />
              </button>
            </div>
            <div className="relative mx-auto max-w-[1440px] px-6 py-12">
              <Slider {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index} className="outline-none">
                    <div className="relative pt-[100%] sm:pt-[60%] lg:pt-[35%]">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="mx-auto !w-auto object-cover object-top"
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
