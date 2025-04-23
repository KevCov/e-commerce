import { PaymentMethod } from "../../types/order";

interface PaymentProps {
  addPayment: (method: string) => void;
}

const Payment = ( {addPayment}: PaymentProps ) => {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <legend className="text-[19px] tracking-[0.100em] uppercase font-semibold select-none mb-5">
        Método de pago
      </legend>
      {Object.values(PaymentMethod).map((method) => (
              <label
              key={method}
              className="font-medium h-14 relative text-gray-600 hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-[#800020] has-[:checked]:bg-[#800020]/15 has-[:checked]:ring-[#800020]/40 has-[:checked]:ring-1 select-none"
            >
              {method}
              <input
                type="radio"
                name="status"
                onClick={() => addPayment(method)}
                className="peer/html w-4 h-4 absolute accent-current right-3"
                id={method}
              />
            </label>
      ))}
    </div>
  );
};

export default Payment;
