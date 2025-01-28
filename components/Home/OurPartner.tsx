"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

// Partner logos (replace with your own URLs)
const partners = [
  { id: 1, name: "Partner 1", logo: "/images/Bank_Alfalah_logo.png" },
  { id: 2, name: "Partner 2", logo: "/images/Bank_Alfalah_logo.png" },
  { id: 3, name: "Partner 3", logo: "/images/Bank_Alfalah_logo.png" },
  { id: 4, name: "Partner 4", logo: "/images/Bank_Alfalah_logo.png" },
  { id: 5, name: "Partner 5", logo: "/images/Bank_Alfalah_logo.png" },
  { id: 6, name: "Partner 6", logo: "/images/Bank_Alfalah_logo.png" },
];

const OurPartner = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#8570C5] mb-4">
            Our Partners
          </h1>
          <p className="text-lg text-gray-600">
            Collaborating with leading companies to bring you the best
            opportunities.
          </p>
        </header>

        {/* Slider Section */}
        <section>
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="partner-slider"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex justify-center items-center h-40 bg-transparent shadow-lg rounded-lg p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export default OurPartner;
