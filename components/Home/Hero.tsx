import LottieAnimation from "./LottieAnimation";

export default function Hero() {
  return (
    <div className="pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[2rem] items-center">
          <div>
            <h1 className="text-[28px] sm:text-[35px] lg:text-[40px] xl:text-[50px] text-[#05264e] leading-normal lg:leading-relaxed font-extrabold main-heading">
              <span className="text-[#8570C5]">Qist Bazaar</span> HR Portal
            </h1>
            <p className="text-[#4f5e6f] text-[16px] md:text-[18px] mt-[1rem] leading-relaxed">
              Qist Bazaar is a prominent e-commerce platform based in Pakistan
              that offers a "Buy Now, Pay Later" (BNPL) service. It was
              established in 2021 with the aim of improving the standard of
              living for the average Pakistani by making a variety of products
              more accessible through affordable monthly installments.
            </p>
          </div>
          <div className="lg:block">
            <LottieAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}
