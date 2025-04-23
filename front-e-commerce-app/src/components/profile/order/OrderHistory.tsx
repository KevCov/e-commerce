import { useState } from "react";
import OrderButtons from "./OrderButtons";
import OrderItems from "./OrderItems";
import ShippingPaymentDetails from "./ShippingPaymentDetails";
import { Order } from "../../../types/order";
import OrderInfo from "./OrderInfo";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ( {orders}: OrderHistoryProps ) => {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const handleOrderClick = (orderId: string) => {
    setExpandedOrders({
      ...expandedOrders,
      [orderId]: !expandedOrders[orderId],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl" x-data="order">
      <div className="mb-8">
        <h2 className="text-xl tracking-[0.120em] uppercase font-semibold text-gray-900">
          Historial de ordenes
        </h2>
        <p className="text-gray-600 mt-2">
          Ver sus compras recientes y el estado de sus pedidos
        </p>
      </div>
      {orders.length === 0 ?
      <div className="text-[18px] text-gray-500 font-semibold italic mt-5 text-center" >No cuenta con ordenes para visualizar</div>
      :
      <div className="space-y-6">
        {orders.map((order: Order) => {
          return (
            <div key={order.id}>
              <div
                onClick={() => order.id && handleOrderClick(order.id)}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <OrderInfo order={order} />
                </div>

                {order.id && expandedOrders[order.id] && (
                  <div className="border-t border-gray-100">
                    <div className="p-6 space-y-6">
                      <OrderItems order={order} />
                      <ShippingPaymentDetails order={order} />
                    </div>
                    <OrderButtons />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

export default OrderHistory;
