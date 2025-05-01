import { useState } from "react";
import {
  departments,
  districts,
  provinces,
} from "../../../utils/dataNewShipping";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/user";
import toast from "react-hot-toast";

const EditUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, accessToken, setUserEdited } = useUser();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editInfoCustomer: User = {
      phoneNumber: formData.get("phoneNumber") as string,
      address: {
        department: formData.get("department") as string,
        province: formData.get("province") as string,
        district: formData.get("district") as string,
        street: formData.get("street") as string,
        houseNumber: formData.get("houseNumber")
          ? parseInt(formData.get("houseNumber") as string, 10)
          : undefined,
        zipCode: formData.get("zipCode")
          ? parseInt(formData.get("zipCode") as string, 10)
          : undefined,
      },
    };

    editCustomer(editInfoCustomer)
  };

  const editCustomer = async (info: User) => {
    try {
        const response = await fetch(
          `http://localhost:8333/api/v1/customers/edit-info/${user.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken.access_token}`,
            },
            body: JSON.stringify(info),
          }
        );
    
        if (!response.ok) {
          throw new Error("Error al editar el cliente");
        }
        
        setUserEdited(info);
    } catch (error) {
        console.log(error);
    } finally {
        closeModal();
        toast.success("¡Información Actualizada!");
    }
    
  }

  return (
    <>
      <button
        className=" cursor-pointer absolute top-0 right-0 mt-4 mr-4"
        onClick={openModal}
      >
        <img src="/images/iconEditar.png" />
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden={!isOpen}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black/50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg w-full text-center font-semibold text-gray-900 ">
                  Editar Información
                </h3>
                <button
                  type="button"
                  className="text-black bg-transparent hover:bg-gray-200 hover:text-[#800020] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Departamento
                    </label>
                    <select
                      name="department"
                      id="department"
                      defaultValue={user.address?.department}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    >
                      <option>Seleccionar departamento</option>
                      {departments.map((department) => (
                        <option key={department.value} value={department.value}>
                          {department.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="province"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Provincia
                    </label>
                    <select
                      name="province"
                      id="province"
                      defaultValue={user.address?.province}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    >
                      <option>Seleccionar provincia</option>
                      {provinces.map((province) => (
                        <option key={province.value} value={province.value}>
                          {province.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Distrito
                    </label>
                    <select
                      name="district"
                      id="district"
                      defaultValue={user.address?.district}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    >
                      <option>Seleccionar distrito</option>
                      {districts.map((district) => (
                        <option key={district.value} value={district.value}>
                          {district.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="street"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Calle (Jr - Av - Pasaje)
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      defaultValue={user.address?.street}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="houseNumber"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Número
                    </label>
                    <input
                      type="number"
                      name="houseNumber"
                      id="houseNumber"
                      defaultValue={user.address?.houseNumber}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />{" "}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="zipCode"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Código Postal
                    </label>
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      defaultValue={user.address?.zipCode}
                      max="99999"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Número Celular
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      defaultValue={user.phoneNumber}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />{" "}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white hover:text-[#800020] inline-flex items-center bg-[#800020] hover:bg-[#800020]/40 cursor-pointer font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center"
                >
                  Editar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;
