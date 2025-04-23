import { FaArrowRight } from "react-icons/fa6";

const Newsletter = () => {
    return (
        <section className='relative'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md ">
                <div className="bg-[#800020] rounded-[30px_400px_30px_30px] grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
                    <div className="col-span-7">
                        <div className="m-10 lg:ml-32 lg:mt-20 lg:mb-20">
                            <p className="text-lg font-normal text-white mb-3 ls-51"> NEWSLETTER </p>
                            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8">
                                Subscribe our <br /> newsletter.
                            </h2>

                            <div>
                                <div className="relative text-white focus-within:text-white flex flex-row-reverse shadow-fi rounded-full">
                                    <input type="Email address" name="q" className="py-6 sm:py-8 text-[18px] w-full h-4 text-black border-2 border-amber-950 rounded-full pl-4 focus:outline-none focus:text-black" placeholder="@ enter your email-address" autoComplete="off" />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <button type="submit" className="p-2 bg-gray-900 hover:scale-110 duration-300 rounded-full">
                                            <FaArrowRight
                                                width="32"
                                                height="32"
                                                className="text-white "
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 relative hidden md:block">
                        <div>
                            <img src={'/images/newsletter/soup.svg'} alt="soup-image" width={626} height={602} className='-mt-24' />
                        </div>
                        <div className="absolute top-[78%]">
                            <img src={'/images/newsletter/onion.svg'} alt="onion-image" width={300} height={122} />
                        </div>
                        <div className="absolute top-[30%] right-[-23%] hidden lg:block">
                            <img src={'/images/newsletter/lec.svg'} alt="lettuce-image" width={300} height={122} />
                        </div>
                        <div className="absolute bottom-[10%] left-[0%]">
                            <img src={'/images/newsletter/yellow.svg'} alt="yellow-image" width={59} height={59} />
                        </div>
                        <div className="absolute bottom-[20%] right-[20%]">
                            <img src={'/images/newsletter/blue.svg'} alt="blue-image" width={25} height={25} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Newsletter;