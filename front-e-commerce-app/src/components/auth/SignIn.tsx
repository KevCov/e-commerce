import { Link} from "react-router-dom";
import { useRef } from "react";
import Logo from "../layout/header/Logo";
import { useUser } from "../../contexts/UserContext";
import Loader from "../common/Loader";

const Signin = () => {
  
  const user = useUser();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.logearse({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <>
      <div className="text-center mx-auto inline-block">
        <Logo />
      </div>
      <span className="z-1 font-serif font-semibold text-[#800020] italic uppercase relative my-5 block text-center before:content-[''] before:absolute before:h-px before:w-40% before:bg-dark_border before:bg-opacity-60 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-40% after:bg-dark_border after:bg-opacity-60 after:top-3 after:right-0">
        Bienvenido <br /> ingresa tus datos:
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-[#363636] focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            className="w-full rounded-md border border-black border-opacity-60 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-[#363636] focus:border-[#800020] focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-9">
        {user.loading ? <Loader /> :
          <button
            type="submit"
            className="bg-[#800020] w-full py-3 rounded-lg text-18 font-semibold text-white hover:text-[#800020] hover:bg-[#800020]/40"
          >
            Sign In
          </button> }
        </div>
      </form>

      <Link
        to="/forgot"
        className="mb-2 inline-block text-base text-dark hover:text-[#800020] text-black"
      >
        Forgot Password?
      </Link>
      <p className="text-body-secondary text-black text-base">
        Not a member yet ?{" "}
        <Link to="/" className="text-[#800020] hover:underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default Signin;
