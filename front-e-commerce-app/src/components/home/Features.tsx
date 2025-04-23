import { FeaturesData } from "../../utils/data";

const Feature = () => {
    return (
        <section>
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md' id="about-section">
                <div className='text-center mb-14' >
                    <p className='text-[#800020] text-lg font-normal mb-3 tracking-[0.515em] uppercase'>Caracteristicas</p>
                    <h2 className='text-3xl lg:text-5xl font-semibold text-blacklg:max-w-60% mx-auto'>Vinos del  mundo únicos, con beneficios exclusivos.</h2>
                </div>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32'>
                    {FeaturesData.map((items, i) => (
                        <div className='p-8 relative rounded-3xl bg-gradient-to-b from-black/5 to-white' key={i}>
                            <div className='work-img-bg rounded-full flex justify-center '>
                                <img src={items.imgSrc} alt={items.imgSrc} width={100} height={100} />
                            </div>
                            <h3 className='text-2xl text-black font-semibold text-center mt-8'>{items.heading}</h3>
                            <p className='text-lg font-normal text-black/50 text-center mt-2'>{items.subheading}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feature;