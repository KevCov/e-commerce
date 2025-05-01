import { Order } from "../../../types/order";

interface OrderInfoProps {
  order: Order;
}

const OrderInfo = ({order}: OrderInfoProps) => {

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-bold text-gray-900">
            Order #{order.id}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Entregado</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{order.orderDate}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">S/. {order.totalAmount}</p>
        <p className="text-sm text-gray-500">{order.products.length} items</p>
      </div>
    </div>
  );
};

export default OrderInfo;
