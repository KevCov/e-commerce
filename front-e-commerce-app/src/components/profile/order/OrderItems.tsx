import { Order } from "../../../types/order";

interface OrderItemsProps {
    order: Order
}

const OrderItems = ({order}: OrderItemsProps) => {
    return (
        <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Items Purchased
                      </h3>
                      <div className="space-y-4">
                        {order.products.map((item) => {
                          return (
                            <div key={item.id}>
                              <div className="flex items-center space-x-4">
                                <img
                                  src={item.urlImage}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  S/. {item.quantity * item.unitPrice}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
    );
}
 
export default OrderItems;