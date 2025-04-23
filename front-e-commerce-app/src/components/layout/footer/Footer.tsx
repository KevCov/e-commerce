import { FC } from "react";
import { Link } from "react-router-dom";
import { headerData } from "../../../utils/menuData";

import Logo from "../header/Logo";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:gap-20 md:gap-6 sm:gap-12 gap-6  pb-16">
          <div className="col-span-2">
            <Logo />
            <p className="text-xs font-medium text-[#363636] mt-5 mb-16 max-w-70%">
              Open an account in minutes, get full financial
              control for much longer.
            </p>
            <div className="flex gap-6 items-center">
              <Link to="#" className="group bg-white hover:bg-[#8c3588] rounded-full shadow-xl p-3">
                <FaFacebookF
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
              <Link to="#" className="group bg-white hover:bg-[#8c3588] rounded-full shadow-xl p-3">
                <FaInstagram
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
              <Link to="#" className="group bg-white hover:bg-[#8c3588] rounded-full shadow-xl p-3">
                <FaXTwitter
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
            </div>
          </div>
          <div className="">
            <h4 className="text-black mb-9 font-semibold text-xl">Company</h4>
            <ul>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  About
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Careers
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Mobile
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Blog
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  How we work?
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-black mb-9 font-semibold text-xl">Information</h4>
            <ul>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Help/FAQ
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Press
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Affiliates
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Hotel owners
                </Link>
              </li>
              <li className="pb-5">
                <Link
                  to="#"
                  className="text-black/70 hover:text-[#8c3588] text-base"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-black mb-9 font-semibold text-xl">More</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    to={item.href}
                    className="text-black/70 hover:text-[#8c3588] text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#363636]/15  py-10 flex justify-between items-center">
          <p className="text-sm text-black/70">
            @2025 - ELIXIR. Distributed By KevinCordova and Developed by KevinCordova
          </p>

          <div className="">
            <Link to="#" className="text-sm text-black/70 px-5 border-r border-[#363636]/15 hover:text-[#8c3588]">Privacy policy</Link>
            <Link to="#" className="text-sm text-black/70 px-5 hover:text-[#8c3588]">Terms & conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
