import { Link } from "react-router-dom";

const Volunteer = () => {
    return (
        <section className="py-28 bg-volunteer-bg bg-no-repeat bg-cover">
            <div className="container mx-auto lg:max-w-screen-xl px-4">
                <div className="text-center">
                    <h2 className="text-lg font-normal text-[#800020] mb-6 tracking-[0.515em] uppercase">
                        Conviertete en voluntario
                    </h2>
                    <h2 className="text-3xl font-semibold text-black lg:max-w-60% mx-auto mb-6">
                        Tu pasión por el vino se convierte en esperanza para los perros rescatados. Juntos, podemos marcar la diferencia
                    </h2>
                    <div className="flex justify-center ">
                        <Link to="#" className="text-white font-semibold bg-[#800020] rounded-2xl hover:bg-[#800020]/40 px-7 py-4 hover:text-[#800020]">
                            Dona Ahora
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Volunteer;