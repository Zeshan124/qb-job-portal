import { Carousel, CarouselProps } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are included
import Image from "next/image";

// Define the sponsor type
interface Sponsor {
  id: number;
  name: string;
  logo: string; // Path relative to /public (e.g., "/sponsor1.png")
}

// Sample sponsor data (update with your actual image filenames in /public)
const sponsors: Sponsor[] = [
  { id: 1, name: "Sponsor 1", logo: "/images/logo1.png" },
  { id: 2, name: "Sponsor 2", logo: "/images/icon2.png" },
  { id: 3, name: "Sponsor 3", logo: "/images/icon3.png" },
  { id: 4, name: "Sponsor 4", logo: "/images/icon4.png" },
  { id: 5, name: "Sponsor 5", logo: "/images/icon1.png" },
  { id: 6, name: "Sponsor 6", logo: "/images/icon2.png" },
  { id: 7, name: "Sponsor 7", logo: "/images/icon3.png" },
  { id: 8, name: "Sponsor 8", logo: "/images/icon4.png" },
  { id: 9, name: "Sponsor 9", logo: "/images/icon4.png" },
  { id: 10, name: "Sponsor 10", logo: "/images/icon2.png" },
];

const SponsoredCarousel: React.FC = () => {
  // Settings for the carousel with TypeScript typing
  const settings: CarouselProps = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 sponsors at a time (adjust to 3 if needed)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="h-[40vh] w-full max-w-8xl mx-auto py-14">
      <h2 className="text-2xl font-bold text-center mb-6">Our Sponsors</h2>
      <Carousel {...settings} className="sponsor-carousel">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="p-4">
            <div className="flex flex-col items-center justify-center h-full">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={150}
                height={150}
                className="object-contain"
              />
              <p className="mt-2 text-center text-gray-700">{sponsor.name}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SponsoredCarousel;
