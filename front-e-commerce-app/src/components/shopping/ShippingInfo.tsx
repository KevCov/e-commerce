import { Shipping } from "../../types/order";
import AddShippingModal from "./AddShippingModal";

interface ShippingInfoProps {
  data: Shipping[];
  addShipping: (shipping: Shipping) => void;
  addNewShipping: (newShipping: Shipping) => void;
}

const ShippingInfo = ({
  data,
  addShipping,
  addNewShipping,
}: ShippingInfoProps) => {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex justify-between items-start">
        <legend className="font-semibold mb-5 select-none text-xl tracking-[0.100em] uppercase">
          Enviar a
        </legend>
        <AddShippingModal addNewShipping={addNewShipping} />
      </div>
      {data.length === 0 ? (
        <p className="text-sm font-semibold text-center text-gray-500 italic">
          No tiene envios guardados
        </p>
      ) : (
        data.map((shipping) => (
          <label
            key={shipping.id}
            className="text-sm font-semibold text-gray-600 h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-[#800020] has-[:checked]:bg-[#800020]/15 has-[:checked]:ring-[#800020]/40 has-[:checked]:ring-1 select-none"
          >
            {shipping.province}, {shipping.district} - {shipping.street}{" "}
            {shipping.houseNumber}
            <input
              type="radio"
              onClick={() => addShipping(shipping)}
              className="w-4 h-4 absolute accent-current right-3"
              id={shipping.id}
            />
          </label>
        ))
      )}
    </div>
  );
};

export default ShippingInfo;
