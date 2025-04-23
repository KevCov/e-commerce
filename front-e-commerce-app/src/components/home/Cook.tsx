const Cook = () => {
  return (
    <section className="relative" id="cook-section">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="absolute right-2 bottom-[-14%] hidden lg:block">
          <img
            src={"/images/cook/lateral.webp"}
            alt="burger-image"
            width={463}
            height={622}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
          <div className="col-span-6 flex justify-start">
            <img
              src="/images/cook/degustacion.webp"
              alt="nothing"
              width={580}
              height={400}
              className="rounded-xl"
            />
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <p className="text-[#800020] text-lg font-normal mb-3 tracking-[0.515em] uppercase text-start">
              degusta con nosotros
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black text-start">
              Cata guiada por nuestros especialistas.
            </h2>
            <p className="text-black/50 md:text-lg font-normal mb-10 text-start mt-6">
              Sumérgete en una experiencia sensorial única con nuestras catas
              guiadas, diseñadas para llevarte de la mano a través de los
              exquisitos matices de nuestra selección especial de vinos del mundo.
              Nuestros especialistas, apasionados conocedores del mundo
              vinícola, te guiarán en un viaje de descubrimiento, desvelando los
              secretos de cada cepa, su historia y las técnicas de maridaje que
              realzan su sabor. Degusta con nosotros y transforma cada copa en
              una celebración del arte y la tradición del vino.{" "}
            </p>
            <button className="text-xl font-medium rounded-full text-white py-5 px-6 bg-[#800020] lg:px-10 lg:py-3 mr-6 w-fit cursor-pointer hover:bg-[#800020]/40 hover:text-[#800020]">
              Saber más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cook;
