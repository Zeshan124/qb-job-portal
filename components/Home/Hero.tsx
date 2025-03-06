import LottieAnimation from "./LottieAnimation";

export default function Hero() {
  return (
    <div className="relative pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="object-cover w-full h-full filter blur-sm opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/hr-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-60 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="relative z-10 w-full min-h-[70vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[2rem] items-center">
          <div>
            <h1 className="text-[30px] sm:text-[35px] lg:text-[40px] xl:text-[50px] text-black leading-normal lg:leading-relaxed font-extrabold main-heading">
              <span className="text-[#eb1a21a4]">Qist Bazaar</span> HR Portal
            </h1>
            <p className="text-cyan-950 text-[18px] md:text-[20px] mt-[1rem] leading-relaxed">
              Qist Bazaar is a prominent e-commerce platform based in Pakistan
              that offers a Buy Now, Pay Later (BNPL) service. It was
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
