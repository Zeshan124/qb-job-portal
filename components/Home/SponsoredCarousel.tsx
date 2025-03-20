import React from "react";

// Define the sponsor type
interface Sponsor {
  id: number;
  name: string;
}

// Sample sponsor data (no logos needed since we're using text)
const sponsors: Sponsor[] = [
  { id: 1, name: "Qist Bazaar" },
  { id: 2, name: " is Pakistan’s" },
  { id: 3, name: "leading" },
  { id: 4, name: "buy now" },
  { id: 5, name: "pay later" },
  { id: 6, name: "(BNPL)" },
  { id: 7, name: "platform" },
  { id: 8, name: "uniquely" },
  { id: 9, name: "serving" },
  { id: 10, name: "the underserved" },
  { id: 11, name: "population" },
  { id: 12, name: "-" },
];

const SponsoredMarquee: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#1A2A44] to-[#6a7383] py-8 px-6 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        {/* <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#A855F7] mb-8">
          Our Trusted Sponsors
        </h2> */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Marquee Container */}
          <div className="marquee-wrapper">
            <div className="marquee">
              {sponsors.concat(sponsors).map((sponsor, index) => (
                <span
                  key={`${sponsor.id}-${index}`}
                  className="text-gray-200 text-lg font-medium mx-6 tracking-wide uppercase hover:text-indigo-500 transition-colors duration-300"
                >
                  {sponsor.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Optional Call-to-Action
        <div className="text-center mt-8">
          <a
            href="#sponsor-info"
            className="inline-block bg-gradient-to-r from-[#22D3EE] to-[#A855F7] text-white font-semibold py-3 px-6 rounded-full hover:from-[#A855F7] hover:to-[#22D3EE] transition-all duration-300"
          >
            Become a Sponsor
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default SponsoredMarquee;
