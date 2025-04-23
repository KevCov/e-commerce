import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Shipping } from "../../types/order";

interface OrderSummaryProps {
    paymentMethod: string;
    shippingInfo: Shipping
}

const OrderSummary = ( {paymentMethod, shippingInfo}:OrderSummaryProps ) => {

  const shoppingCart = useCart();

  const totalAmount = shoppingCart.cartProducts.map((p) => p.unitPrice*p.quantity ).reduce((acumulador, valorActual) => {
    return acumulador + valorActual;
  }, 0);

  const tax = totalAmount * 0.18;
  const subTotalAmount = totalAmount - tax;

  const handleCreateOrder = () => {
    shoppingCart.generateOrder(paymentMethod, shippingInfo)
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
      <h2 className="text-xl tracking-[0.100em] uppercase font-semibold text-gray-900 mb-8 ">
        Resumen de la orden
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500  ">Sub Total</dt>
            <dd className="text-base font-medium text-gray-900  ">
              S/. {subTotalAmount.toFixed(2)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500  ">IGV (18%)</dt>
            <dd className="text-base font-medium text-gray-900  ">
              S/. {tax.toFixed(2)}
            </dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900  ">Total</dt>
          <dd className="text-base font-bold text-gray-900  ">
            S/. {totalAmount}
          </dd>
        </dl>
      </div>

      <a
        href="#"
        onClick={handleCreateOrder}
        className="flex w-full items-center justify-center rounded-lg bg-[#800020] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#800020]/40 hover:text-[#800020] focus:outline-none focus:ring-4 focus:ring-[#93c5fd]"
      >
        Ir a pagar
      </a>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500  "> o </span>
        <Link
          to="/store"
          title=""
          className="inline-flex items-center gap-2 text-sm font-medium text-[#800020] underline hover:no-underline"
        >
          Continua comprando
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
