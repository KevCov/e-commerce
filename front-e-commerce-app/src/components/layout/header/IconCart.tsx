import { useNavigate } from "react-router-dom";

const IconCart = () => {
  const navegate = useNavigate();

  return (
    <div className="group relative">
      <button onClick={() => navegate("/basket")} className="cursor-pointer">
        <img src="/images/iconCart.png" alt="cart" />
      </button>
      <span className="absolute -top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
        CART
      </span>
    </div>
  );
};

export default IconCart;
