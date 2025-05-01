const OrderButtons = () => {
  return (
    <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-[#800020] rounded-md text-sm font-medium text-white hover:bg-[#800020]/40 hover:text-[#800020] cursor-pointer">
          Ver Comprobante
        </button>
      </div>
    </div>
  );
};

export default OrderButtons;
