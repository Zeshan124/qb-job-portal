import React from "react";

const Footer = () => {
  return (
    <div className="pt-20 pb-12 bg-[#ffff] border-t-2 border-t-black border-opacity-10 border-b-2">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-8 border-b-2 border-black border-opacity-10">
        <div className="text-grey text-opacity-50 ">
          <h1 className="text-[22px] text-grey font-semibold mb-6">
            Contact Us
          </h1>
          <ul className="space-y-2">
            <li className="hover:text-indigo-800">
              <a href="tel:021-111-11-55-66" className="footer-link">
                📞 021-111-11-55-66
              </a>
            </li>

            <li className="hover:text-indigo-800">
              <a href="mailto:support@qistbazaar.pk" className="footer-link">
                ✉️ support@qistbazaar.pk
              </a>
            </li>

            <li className="hover:text-indigo-800">
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

        <div>
          <h1 className="text-[22px] text-grey font-semibold mb-6">About</h1>
          <ul className="space-y-2 text-grey text-opacity-50  ">
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/about-us"
                target="_blank"
                className="footer-link"
              >
                About Us
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a href="https://qistbazaar.pk/page/faqs" className="footer-link">
                FAQs
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/contact-us"
                className="footer-link"
              >
                Contact
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/visit-us"
                className="footer-link"
              >
                Visit Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-[22px] text-grey font-semibold mb-6">
            Information
          </h1>
          <ul className="space-y-2 text-grey text-opacity-50">
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/account/login"
                className="footer-link"
              >
                Account
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/verification-process"
                className="footer-link"
              >
                Verification Process
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/delivery-policy"
                className="footer-link"
              >
                Delivery Policy
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/musawamah-agreement"
                className="footer-link"
              >
                Musawamah Agreement
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-[22px] text-grey font-semibold mb-6">
            Quick Links
          </h1>
          <ul className="space-y-2 text-grey text-opacity-50">
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/terms-conditions"
                className="footer-link"
              >
                Terms & Conditions
              </a>
            </li>
            <li className="hover:text-indigo-800]">
              <a
                href="https://qistbazaar.pk/page/refund-return-policy"
                className="footer-link"
              >
                Refund & Return Policy
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/privacy-policy"
                className="footer-link"
              >
                Privacy Policy
              </a>
            </li>
            <li className="hover:text-indigo-800">
              <a
                href="https://qistbazaar.pk/page/press"
                className="footer-link"
              >
                Press & Blog
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-grey text-opacity-70 p-2">
          Copyright © 2025{" "}
          <a
            href="https://qistbazaar.pk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-indigo-800"
          >
            Qist Bazaar
          </a>{" "}
          Private Limited. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

// const SocialIcon = ({ src, alt }: { src: string; alt: string }) => (
//   <div className="w-10 h-10 rounded-full flex items-center justify-center">
//     <img src={src} alt={alt} className="w-7 h-7" />
//   </div>
// );

// const footerLinkStyle =
//   "text-base w-fit text-white text-opacity-50 hover:text-[#8570C5] cursor-pointer";
export default Footer;
