import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section id="home-section" className='bg-[url(/images/hero/banner.webp)] bg-cover bg-no-repeat bg-center mt-28 h-[850px]'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
                <div className='grid grid-cols-1 lg:grid-cols-12 items-center'>
                    <div className='col-span-6'>
                        <h1 className="lg:text-[55px] font-semibold mb-5 text-white tracking-[0.120em] uppercase md:4px lg:text-start text-center">
                            Descubre la esencia del buen vino
                        </h1>
                        <p className='text-white lg:text-lg font-normal mb-10 lg:text-start text-center'>Bienvenido a <b>ELIXIR</b>. Seleccionamos los mejores vinos del mundo para que disfrutes cada momento especial.</p>
                        <div className='md:flex align-middle justify-center lg:justify-start'>
                            <Link to='/store' className='text-xl w-full md:w-auto font-medium rounded-full text-white py-4 px-6 bg-[#800020] lg:px-10 mr-6 hover:bg-amber-50 hover:text-[#800020] cursor-pointer'>Explora nuestra colección</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;