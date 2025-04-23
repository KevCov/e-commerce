"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExpertData } from "../../utils/data";

const Expert = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#800020]/40">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="text-center">
          <p className="text-[#800020] text-lg font-normal mb-3 tracking-[0.515em] uppercase">
            Especialistas en vinos
          </p>
          {/* <h2 className="text-3xl lg:text-5xl font-semibold text-black">
                        Nuestro equipo de expertos
                    </h2> */}
        </div>
        <Slider {...settings}>
          {ExpertData.map((items, i) => (
            <div
              key={i}
              className="flex items-center justify-center m-3 py-4 my-2"
            >
              <div className="w-64 rounded-2xl py-6 text-center bg-white">
                <img
                  src={items.imgSrc}
                  className="mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-xl"
                ></img>
                <h2 className="mt-4 text-xl font-bold text-[#c03557]">
                  {items.name}
                </h2>
                <p className="mb-4 text-black font-semibold text-sm">
                  {items.profession}
                </p>
                <div className="flex items-center justify-center">
                  <a
                    href="#"
                    className="font-semibold hover:underline text-gray-600 hover:text-[#800020] "
                  >
                    Linkedin
                  </a>
                </div>
              </div>
            </div>

            // <div key={i}>
            //     <div className='m-3 py-6 my-2 text-center'>
            //         <div className="relative">
            //             <img src={items.imgSrc} alt="gaby" width={362} height={262} className="inline-block m-auto" />
            //         </div>
            //         <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
            //         <h4 className='text-lg font-normal text-lightblack pt-4 pb-2 opacity-50'>{items.profession}</h4>
            //     </div>
            // </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Expert;
