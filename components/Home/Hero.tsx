import LottieAnimation from "./LottieAnimation";

export default function Hero() {
  return (
    <div className="relative pt-16 md:pt-20 pb-8 md:pb-12">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="object-cover w-full h-full filter blur-sm opacity-80"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content above the video */}
      <div className="relative z-10 w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[2rem] items-center">
          <div>
            <h1 className="text-[28px] sm:text-[35px] lg:text-[40px] xl:text-[50px] text-[#ffffff] leading-normal lg:leading-relaxed font-extrabold main-heading">
              <span className="text-[#ffffff]">Qist Bazaar</span> HR Portal
            </h1>
            <p className="text-[#ffffff] text-[16px] md:text-[18px] mt-[1rem] leading-relaxed">
              Qist Bazaar is a prominent e-commerce platform based in Pakistan
              that offers a "Buy Now, Pay Later" (BNPL) service. It was
              established in 2021 with the aim of improving the standard of
              living for the average Pakistani by making a variety of products
              more accessible through affordable monthly installments.
            </p>
          </div>
          {/* <div className="lg:block">
            <LottieAnimation />
          </div> */}
        </div>
      </div>
    </div>
  );
}
