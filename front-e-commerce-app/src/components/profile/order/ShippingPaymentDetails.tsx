import { Order } from "../../../types/order";

interface ShippingPaymentDetailsProps {
    order: Order
}

const ShippingPaymentDetails = ({order}: ShippingPaymentDetailsProps) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">
                            Dirección de envío
                          </p>
                          <p>Perú, {order.shipping.department}</p>
                          <p>{order.shipping.province}, {order.shipping.district} - {order.shipping.zipCode}</p>
                          <p>{order.shipping.street} {order.shipping.houseNumber}</p>
                          
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">
                            Método de pago
                          </p>
                          <p>{order.paymentMethod}</p>
                          <p>Card: ​**** ​**** ​****{order.cardLast4}</p>
                        </div>
                      </div>
                    </div>
    );
}
 
export default ShippingPaymentDetails;