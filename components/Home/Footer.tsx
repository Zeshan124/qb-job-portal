import React from "react";
import { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

interface Props {
  bgColor: string;
  Icon: IconType;
}

const Footer = () => {
  const aboutItems = ["Home", "Contact"];
  const quickLinkItems = [
    "Privacy Policy",
  ];

  return (
    <div className="pt-20 pb-12 bg-black">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-8 border-b-2 border-white border-opacity-10">
        <div>
        <img
    src="/images/footer-logo.png"  // Replace with the path to your logo
    alt="QB Logo"
    className="w-40 h-35 mb-2"  // Adjust size and margin as needed
  />
          <p className="text-sm text-white text-opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed velit
            tempore obcaecati excepturi, voluptatem, odio deserunt.
          </p>
          <div className="mt-6 flex items-center space-x-3">
            <SocialIcon bgColor={"blue"} Icon={FaFacebook} />
            <SocialIcon bgColor={"sky"} Icon={FaTwitter} />
            <SocialIcon bgColor={"red"} Icon={FaYoutube} />
            <SocialIcon bgColor={"pink"} Icon={FaInstagram} />
          </div>
        </div>
        <FooterSection title={"QuickLinks"} data={aboutItems} />
        <FooterSection title={"Terms & Updates"} data={quickLinkItems} />
        <FooterSection
          title={"Get in Touch"}
          data={[
            "021-111-11-55-66",
            "support@qistbazaar.pk",
            "Head Office Jami Commercial, DHA Phase 7",
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

const SocialIcon = ({ bgColor, Icon }: Props) => (
  <div
    className={`w-10 h-10 bg-${bgColor}-600 rounded-full flex items-center justify-center flex-col`}
  >
    <Icon className="text-white" />
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
