import { Link } from "react-router-dom";
import Logo from "../layout/header/Logo";
import { useRef, useState } from "react";
import Signin from "./SignIn";
import { FaXmark } from "react-icons/fa6";
import { newUser } from "../../types/user";
import { useUser } from "../../contexts/UserContext";
import Loader from "../common/Loader";

const SignUp = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const signInRef = useRef<HTMLDivElement>(null);
  const [newUser, setNewUser] = useState<newUser>({} as newUser);
  const [principalForm, setPrincipalForm] = useState(true);
  const user = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userlogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }
    setNewUser({
      firstName: formData.get("firstname") as string,
      lastName: formData.get("lastname") as string,
      dni: formData.get("dni") as string,
      phoneNumber: formData.get("phone") as string,
      userLogin: userlogin,
    });
    e.currentTarget.reset();
    setPrincipalForm(!principalForm);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const address = {
      department: formData.get("department") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      street: formData.get("street") as string,
      houseNumber: Number(formData.get("houseNumber")),
      zipCode: Number(formData.get("zipCode")),
    };
    user.createUser({ ...newUser, address });
  };

  return (
    <>
      <div className="text-center mx-auto inline-block">
        <Logo />
      </div>

      <span className="z-1 font-serif font-semibold text-[#800020] italic uppercase relative my-5 block text-center before:content-[''] before:absolute before:h-px before:w-40% before:bg-dark_border before:bg-opacity-60 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-40% after:bg-dark_border after:bg-opacity-60 after:top-3 after:right-0">
        Bienvenido <br /> ingresa tus datos:
      </span>
      {principalForm ?
      <form onSubmit={handleSubmit} >
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Nombres"
            name="firstname"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Apellidos"
            name="lastname"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Documento de identidad"
            name="dni"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Número celular"
            name="phone"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-9">
          {/*Aqui va el condicional para el Loader*/}
          <button
            type="submit"
            className="flex w-full items-center cursor-pointer text-18 font-semibold justify-center rounded-md bg-[#800020] hover:bg-[#800020]/40 px-5 py-3 text-white transition duration-300 ease-in-out hover:text-[#800020]"
          >
            Siguiente
          </button>
        </div>
      </form>
      :
      <form onSubmit={handleSignUp} >
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Departamento"
            name="department"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Provincia"
            name="province"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Distrito"
            name="district"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Calle (Jr, Av, Pasaje)"
            name="street"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Número de casa"
            name="houseNumber"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Código postal"
            name="zipCode"
            required
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-2 text-base text-dark outline-none transition placeholder:text-black focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-9">
        {user.loading ? <Loader /> :
          <button
            type="submit"
            className="flex w-full items-center cursor-pointer text-18 font-semibold justify-center rounded-md bg-[#800020] hover:bg-[#800020]/40 px-5 py-3 text-white transition duration-300 ease-in-out hover:text-[#800020]"
          >
            Sing Up
          </button>}
        </div>
      </form>}

      <p className="text-body-secondary mb-4 text-black text-base">
        By creating an account you are agree with our{" "}
        <a href="/#" className="text-[#800020] hover:underline">
          Privacy
        </a>{" "}
        and{" "}
        <a href="/#" className="text-[#800020] hover:underline">
          Policy
        </a>
      </p>

      <p className="text-body-secondary text-black text-base">
        Already have an account ?{" "}
        <Link
          to="#"
          className="text-[#800020] hover:underline"
          onClick={() => {
            setIsSignInOpen(true);
          }}
        >
          Sign In
        </Link>
        {isSignInOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div
              ref={signInRef}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white bg-opacity backdrop-blur-md"
            >
              <button
                onClick={() => setIsSignInOpen(false)}
                className="absolute top-0 right-0 mr-8 mt-8"
                aria-label="Close Sign In Modal"
              >
                <FaXmark className="text-black hover:text-[#800020] text-24 inline-block me-2" />
              </button>
              <Signin />
            </div>
          </div>
        )}
      </p>
    </>
  );
};

export default SignUp;
