import { useState } from "react";
import { HeaderItem } from "../../../types/menu";
import { Link, useLocation } from "react-router-dom";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        id="links-menu"
        to={item.href}
        className={`text-xl flex tracking-[0.140em] uppercase font-medium duration-300  ${path === item.href ? "text-[#800020] " : " text-gray-800 hover:text-[#800020]"
          }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <div
          className={`absolute py-2 left-0 mt-0.5 w-60 bg-white shadow-lg rounded-lg `}
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.href}
              className={`block px-4 py-2   ${path === subItem.href
                ? "bg-[#800020] text-white"
                : "text-black hover:bg-[#800020]"
                }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
