import React from "react";
import { Button } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Image from "next/image";

const JobPortalBanner: React.FC = () => {
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-between text-white px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-20 
                bg-cover bg-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[500px] overflow-hidden rounded-lg sm:rounded-xl shadow-lg"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url('/images/bg-app.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

      {/* Left Side: Mobile Image with Enhanced Styling */}
      <div className="w-36 sm:w-48 md:w-60 lg:w-80 relative z-10 mb-8 md:mb-0">
        <div className="absolute -bottom-6 w-full h-12 bg-black opacity-20 blur-lg rounded-full"></div>
        <Image
          src="/images/mobile-pic.png"
          alt="Mobile App"
          width={300}
          height={600}
          className="object-contain w-full mobile-pic drop-shadow-2xl transform transition-transform hover:scale-105 duration-500"
        />
      </div>

      {/* Right Side: Text and Buttons with Enhanced Styling */}
      <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left gap-4 sm:gap-6 z-10">
        <div className="space-y-1 sm:space-y-2">
          <span className="inline-block text-xs sm:text-sm md:text-base uppercase tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-bold">
            Mobile Experience
          </span>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Download{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Qist Bazaar
            </span>{" "}
            App Now!
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg max-w-md text-gray-300">
          Fast, Simple & Delightful. All it takes is 30 seconds to Download and
          start exploring new opportunities.
        </p>

        <div className="flex xs:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 mt-2">
          {/* Commented out App Store button preserved from original code */}
          {/* <Button
            className="bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg"
            type="primary"
            icon={<AppleOutlined />}
            size="large"
          >
            APP STORE
          </Button> */}

          <a
            href="https://play.google.com/store/apps/details?id=com.tech.qistbazar&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full xs:w-auto"
          >
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none shadow-lg h-10 sm:h-12 px-4 sm:px-6 flex items-center justify-center w-full transition-all duration-300 group-hover:shadow-xl"
              type="primary"
              icon={<AndroidOutlined className="text-base sm:text-lg" />}
              size="large"
            >
              <span className="ml-2 font-medium text-sm sm:text-base">
                DOWNLOAD NOW
              </span>
            </Button>
          </a>

          <Button
            className="border border-gray-300 text-white hover:border-white hover:text-white bg-transparent h-10 sm:h-12 px-4 sm:px-6 flex items-center justify-center w-full xs:w-auto transition-all duration-300 hover:bg-white/10"
            type="default"
            size="large"
          >
            <span className="font-medium text-sm sm:text-base">LEARN MORE</span>
          </Button>
        </div>

        {/* Added Download Stats for social proof */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-8 gap-y-2 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></div>
            <span>4.8+ Star Rating</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 mr-1.5 sm:mr-2"></div>
            <span>50k+ Downloads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortalBanner;
