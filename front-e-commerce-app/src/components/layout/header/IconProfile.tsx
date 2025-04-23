import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

const IconProfile = () => {
  const {user} = useUser();
  
  return (
    <div className="group relative">
      <Link to={"/profile"} className="cursor-pointer">
        <img src="/images/iconProfile.png" alt="profile" />
      </Link>
      <span className="absolute -top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
        {user.firstName === undefined ? user.firstName : user.firstName.split(" ")[0]}
      </span>
    </div>
  );
};

export default IconProfile;
