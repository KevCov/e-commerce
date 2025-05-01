import { Product } from "../../types/product";
import Payment from "./Payment";
import { useState } from "react";
import { Shipping } from "../../types/order";
import ShippingInfo from "./ShippingInfo";
import { useCart } from "../../contexts/CartContext";
import OrderSummary from "./OrderSummary";
import Recomended from "./Recommended";
import { Link } from "react-router-dom";

interface ShoppingCartProps {
  list: Product[];
  overstock: Product[];
  shipping: Shipping[];
  functions: (newShipping: Shipping) => void
}

const ShoppingCart = ({ list, overstock, shipping, functions }: ShoppingCartProps) => {
  const shoppingCart = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingInfo, setShippingInfo] = useState<Shipping>({} as Shipping);

  const addPaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  const addShippingInfo = (shipping: Shipping) => {
    setShippingInfo(shipping);
  };

  return (
    <section className="bg-gray-50 antialiased md:py-16 mt-28">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl tracking-[0.120em] uppercase font-semibold text-gray-900">
          Carrito de compras
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {list.length === 0 ? (
              <p className="text-center text-gray-600 italic text-[18px]">
                No hay productos en el carrito, revisa nuestra <Link to="/store" className="font-bold underline" >colección</Link>
              </p>
            ) : (
              list.map((p: Product) => {
                return (
                  <div key={p.id} className="space-y-6 mb-3 ">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20"
                            src={p.urlImage}
                            alt="imac image"
                          />
                        </a>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            {p.quantity > 1 && (
                              <button
                                type="button"
                                id="decrement-button"
                                onClick={() => shoppingCart.decreaseQuantity(p)}
                                data-input-counter-decrement="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900  "
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                            )}

                            <input
                              type="text"
                              name="cantidad"
                              data-input-counter
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0  "
                              placeholder=""
                              value={p.quantity}
                              readOnly
                              required
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() => shoppingCart.addQuantity(p)}
                              data-input-counter-increment="counter-input"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900  "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900  ">
                              S/. {p.unitPrice}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-xl font-medium text-gray-900 hover:underline  "
                          >
                            {p.name}
                          </a>
                          <p className="text-[13px] text-gray-600 mb-3">
                            {p.description}
                          </p>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => shoppingCart.removeFromCart(p.id)}
                              className="inline-flex items-center text-sm font-medium text-[#800020] hover:underline"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
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
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            <Recomended overstock={overstock} />
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <OrderSummary
              paymentMethod={paymentMethod}
              shippingInfo={shippingInfo}
            />
            <Payment addPayment={addPaymentMethod} />
            <ShippingInfo data={shipping} addShipping={addShippingInfo} addNewShipping={functions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
