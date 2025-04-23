import { useUser } from "../../../contexts/UserContext";

const IconLogout = () => {
  const user = useUser();

  return (
    <div className="group relative">
      <button onClick={() => user.logOut()} className="cursor-pointer">
        <img src="/images/iconLogout.png" alt="logout" />
      </button>
      <span className="absolute -top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
        LOGOUT
      </span>
    </div>
  );
};

export default IconLogout;
