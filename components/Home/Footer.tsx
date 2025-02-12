import React from "react";

const Footer = () => {
  return (
    <div className="pt-20 pb-12 bg-black">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-8 border-b-2 border-white border-opacity-10">
        {/* Logo & Description Section */}
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
            <a
              href="https://www.facebook.com/qistbazaar.pk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/facebook.svg" alt="Facebook" />
            </a>

            <a
              href="https://twitter.com/QistBazaar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/twitter.svg" alt="Twitter" />
            </a>

            <a
              href="https://www.youtube.com/@QistBazaar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/youtube.svg" alt="YouTube" />
            </a>

            <a
              href="https://www.instagram.com/qistbazaar.pk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/instagram.svg" alt="Instagram" />
            </a>

            <a
              href="https://www.linkedin.com/company/qist-bazaar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/linkedin.svg" alt="LinkedIn" />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=923000340428"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/whatsapp.svg" alt="WhatsApp" />
            </a>

            <a
              href="https://www.tiktok.com/@qistbazaarofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/images/tiktok.svg" alt="TikTok" />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h1 className="text-[22px] text-white font-semibold mb-6">About</h1>
          <ul className="space-y-2 text-white text-opacity-50  ">
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/about-us"
                target="_blank"
                className="footer-link"
              >
                About Us
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a href="https://qistbazaar.pk/page/faqs" className="footer-link">
                FAQs
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/contact-us"
                className="footer-link"
              >
                Contact
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/visit-us"
                className="footer-link"
              >
                Visit Us
              </a>
            </li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h1 className="text-[22px] text-white font-semibold mb-6">
            Information
          </h1>
          <ul className="space-y-2 text-white text-opacity-50">
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/account/login"
                className="footer-link"
              >
                Account
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/verification-process"
                className="footer-link"
              >
                Verification Process
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/delivery-policy"
                className="footer-link"
              >
                Delivery Policy
              </a>
            </li>
            <li className="hover:text-[#8570C5]">
              <a
                href="https://qistbazaar.pk/page/musawamah-agreement"
                className="footer-link"
              >
                Musawamah Agreement
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-white text-opacity-50">
          <h1 className="text-[22px] text-white font-semibold mb-6">
            Contact Us
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-[#8570C5]">
              <a href="tel:021-111-11-55-66" className="footer-link">
                📞 021-111-11-55-66
              </a>
            </li>

            <li className="hover:text-[#8570C5]">
              <a href="mailto:support@qistbazaar.pk" className="footer-link">
                ✉️ support@qistbazaar.pk
              </a>
            </li>

            <li className="hover:text-[#8570C5]">
              <a
                href="https://www.google.com/maps?q=Karachi,+Pakistan"
                target="_blank"
                className="footer-link"
              >
                📍 Karachi, Pakistan
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
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

// Social Icon Component
const SocialIcon = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-10 h-10 rounded-full flex items-center justify-center">
    <img src={src} alt={alt} className="w-7 h-7" />
  </div>
);

// Common footer link styles
const footerLinkStyle =
  "text-base w-fit text-white text-opacity-50 hover:text-[#8570C5] cursor-pointer";
export default Footer;
