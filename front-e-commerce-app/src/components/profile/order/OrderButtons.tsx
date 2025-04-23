const OrderButtons = () => {
    return(
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                    <div className="flex justify-end space-x-4">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                        View Invoice
                      </button>
                      <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-black hover:bg-blue-700">
                        Reorder
                      </button>
                    </div>
                  </div>
    );
}

export default OrderButtons;