import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../types/product";
import { Toaster } from "react-hot-toast";

interface ProductsProps {
  list: Product[],
}

const Products = ({ list }: ProductsProps) => {
  const shoppingCart = useCart();

  return (
    <>
      {list.length === 0 ? (
        <p className="text-center mt-5 text-gray-600 italic text-[18px]" >No hay productos disponibles</p>
      ) : (
        <section className=" w-[80%] m-auto grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          {list.map((p: Product) => (
            <div
              key={p.id}
              className="space-y-6 w-[80%] overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm "
            >
              <a href="#" className="overflow-hidden rounded">
                <img
                  className="mx-auto h-44 w-44 rounded-2xl"
                  src={p.urlImage}
                  alt="imac image"
                />
              </a>
              <div className="mt-6">
                <Link
                  to={`/details/${p.id}`} 
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline hover:text-[#800020] "
                >
                  {p.name}
                </Link>
                <p className="mt-2 text-base font-normal text-gray-500  ">
                  {p.description}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight text-red-600 ">
                  S/.{p.unitPrice}
                </p>
                <p className="text-sm text-gray-500 italic mt-1">
                  (stock: {p.stock} und)
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    shoppingCart.addToCart(p);
                  }}
                  className="inline-flex w-full items-center justify-center rounded-lg hover:text-[#800020] bg-[#800020] px-5 py-2.5 text-sm font-medium  text-white hover:bg-[#800020]/40 focus:outline-none cursor-pointer focus:ring-4 focus:ring-[#93c5fd]"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                    />
                  </svg>
                  Add to cart
                </button>
                <Toaster />
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Products;
