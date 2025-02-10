import React from "react";

interface SocialIconProps {
  src: string;
  alt: string;
}

const Footer = () => {
  const aboutItems = ["About us", "Faqs", "Contact", "Visit Us"];
  const quickLinkItems = [
    "Account",
    "Verification Process",
    "Delivery Policy",
    "Musawamah Agreement",
  ];

  return (
    <div className="pt-20 pb-12 bg-black">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-8 border-b-2 border-white border-opacity-10">
        <div>
          <img
            src="/images/footer-logo.png"
            alt="QB Logo"
            className="w-40 h-35 mb-2"
          />
          <p className="text-sm text-white text-opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed velit
            tempore obcaecati excepturi, voluptatem, odio deserunt.
          </p>
          <div className="mt-6 flex items-center space-x-3">
            <SocialIcon src="/images/facebook.svg" alt="Facebook" />
            <SocialIcon src="/images/twitter.svg" alt="Twitter" />
            <SocialIcon src="/images/youtube.svg" alt="YouTube" />
            <SocialIcon src="/images/instagram.svg" alt="Instagram" />
            <SocialIcon src="/images/linkedin.svg" alt="linkedin" />
            <SocialIcon src="/images/whatsapp.svg" alt="whatsapp" />
            <SocialIcon src="/images/tiktok.svg" alt="tiktok" />
          </div>
        </div>
        <FooterSection title={"About"} data={aboutItems} />
        <FooterSection title={"Information"} data={quickLinkItems} />
        <FooterSection
          title={"Contact us"}
          data={[
            "021-111-11-55-66",
            "support@qistbazaar.pk",
            "Karachi,Pakistan",
          ]}
        />
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-white text-opacity-70 p-2">
          Copyright © 2025{" "}
          <a
            href="https://qistbazaar.pk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[#8570C5]"
          >
            Qist Bazaar
          </a>{" "}
          Private Limited. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

const SocialIcon = ({ src, alt }: SocialIconProps) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center`}>
    <img src={src} alt={alt} className="w-7 h-7" />{" "}
  </div>
);

interface SectionProps {
  data: String[];
  title: String;
}

const FooterSection = ({ data, title }: SectionProps) => (
  <div>
    <h1 className="text-[22px] w-fit text-white font-semibold mb-6">{title}</h1>
    {data?.map((item, index) => {
      // Check if the item is an email address
      if (item.includes("@")) {
        return (
          <a
            key={index}
            href={`mailto:${item}`}
            className="text-base w-fit text-white text-opacity-50 hover:text-[#8570C5] cursor-pointer"
          >
            {item}
          </a>
        );
      }
      // For phone numbers or addresses
      return (
        <p
          key={index}
          className="text-base w-fit text-white text-opacity-50 hover:text-[#8570C5] cursor-pointer"
        >
          {item}
        </p>
      );
    })}
  </div>
);

export default Footer;
