import React from "react";
import { Rate, Avatar, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface Feedback {
  id: string;
  name: string;
  title: string;
  rating: number;
  feedback: string;
  image?: string;
}

interface FeedbackCardProps extends Feedback {}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  name,
  title,
  rating,
  feedback,
  image,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1A2A44] to-[#112241] p-6 rounded-2xl text-white flex flex-col items-center mx-4 shadow-xl transform transition-all duration-300 hover:scale-105 border border-[#2A3F6D]">
      <Avatar
        size={72}
        icon={<UserOutlined />}
        src={image}
        className="mb-4 border-4 border-indigo-500 rounded-full bg-gray-700"
      />
      <Rate
        disabled
        defaultValue={rating}
        className="mb-4 !text-yellow-400 [&>li]:mx-1"
      />
      <blockquote className="text-center text-sm italic text-gray-200 mb-4 max-w-xs leading-relaxed">
        {feedback}
      </blockquote>
      <div className="text-center">
        <h4 className="font-semibold text-indigo-500 text-lg">{name}</h4>
        <p className="text-gray-400 text-xs tracking-wide uppercase">{title}</p>
      </div>
    </div>
  );
};

const FeedbackSection: React.FC = () => {
  const feedbackData: Feedback[] = [
    // {
    //   id: "1",
    //   name: "Sardar Kawish Zaman",
    //   title: "TECH LEAD",
    //   rating: 5,
    //   feedback:
    //     "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
    //   image: "/images/kawish.JPG",
    // },
    {
      id: "2",
      name: "Haris Ahmed",
      title: "FRONTEND DEVELOPER",
      rating: 5,
      feedback:
        "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
      image: "/images/haris.JPG",
    },
    {
      id: "3",
      name: "Bisham Khan",
      title: "MOBILE DEVELOPER",
      rating: 5,
      feedback:
        "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
      image: "/images/bisham.JPG",
    },
    {
      id: "4",
      name: "Aman Ullah",
      title: "BACKEND DEVELOPER",
      rating: 5,
      feedback:
        "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
      image: "/images/aman.JPG",
    },
    {
      id: "5",
      name: "Bilal Ahmed",
      title: "FULL STACK DEVELOPER",
      rating: 5,
      feedback:
        "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
      image: "/images/bilal.JPG",
    },
    {
      id: "6",
      name: "Muhammad Zeeshan",
      title: "WEB DEVELOPER",
      rating: 6,
      feedback:
        "Exceptional service that exceeded my expectations. The attention to detail and commitment to excellence is truly remarkable.",
      image: "/images/zeeshan.JPG",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#1A2A44] to-[#0F1C34] py-16 px-6 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-indigo-500 to-purple-300 text-transparent bg-clip-text">
            What Our Job holders Say
          </h2>
          <p className="text-gray-300 mt-2 text-lg max-w-2xl mx-auto">
            Discover why our job holders trust us to deliver exceptional results
            and help transform their vision into success.
          </p>
        </div>
        <Carousel
          autoplay
          autoplaySpeed={2000}
          dots={{ className: "custom-dots slick-dots--light" }}
          slidesToShow={3}
          slidesToScroll={1}
          className="feedback-carousel"
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="px-3">
              <FeedbackCard {...feedback} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default FeedbackSection;
