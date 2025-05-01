import { User } from "../../../types/user";
import EditUserModal from "./EditUserModal";

interface UserProfileProps {
  userInfo: User,
  totalOrders: number
}

const UserProfile = ( {userInfo, totalOrders}: UserProfileProps ) => {
  return (
    <section className="py-6 mt-28 max-w-7xl m-auto">
      <h2 className="text-xl px-4 mb-6 tracking-[0.120em] uppercase font-semibold text-gray-900">
          Información de la cuenta
        </h2>
      <div className="container mx-auto px-4">
        <div className="relative p-8 border border-gray-200 rounded-2xl">
          
          <EditUserModal />
          <div className="flex mb-6 items-center">
            <img
              className="object-cover mr-4 rounded-2xl w-16 h-16"
              src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
              alt=""
            />
            <div>
              <div className="flex items-center mb-1">
                <h6 className="text-blue-900 font-semibold mr-2">
                  {userInfo.firstName} {userInfo.lastName}
                </h6>
              </div>
              <span className="px-3 py-1 bg-[#800020]/40 rounded-md text-[#800020] text-xs font-bold uppercase">
                {totalOrders} ordenes
              </span>
            </div>
          </div>
          <div className="flex mb-4 items-center justify-between">
            <div className="flex items-center">
              <img src="/images/faviconHash.png" className="mr-3" />
              <p className="text-gray-600 text-sm">Documento de Identidad</p>
            </div>
            <p className="text-gray-600 text-sm">{userInfo.dni}</p>
          </div>
          <div className="flex mb-4 items-center justify-between">
            <div className="flex items-center">
              <svg
                className="mr-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
                <path
                  d="M9.06046 9.06069L9.81633 6.17676L6.93914 6.93932L6.34814 9.65163L9.06046 9.06069Z"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p className="text-gray-600 text-sm">Location</p>
            </div>
            <p className="text-gray-600 text-sm"> {userInfo.address ? `${userInfo.address.department}, ${userInfo.address.province}, ${userInfo.address.district} ` : 'Dirección no disponible'}</p>
          </div>
          <div className="flex mb-4 items-center justify-between">
            <div className="flex items-center">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.5 5H2.5C2.22386 5 2 5.22386 2 5.5V13.5C2 13.7761 2.22386 14 2.5 14H13.5C13.7761 14 14 13.7761 14 13.5V5.5C14 5.22386 13.7761 5 13.5 5Z"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 4V3C11 2.73478 10.8736 2.48043 10.6485 2.29289C10.4235 2.10536 10.1183 2 9.8 2H6.2C5.88174 2 5.57652 2.10536 5.35147 2.29289C5.12643 2.48043 5 2.73478 5 3V4"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 8H14"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p className="text-gray-600 text-sm">Dirección</p>
            </div>
            <p className="text-gray-600 text-sm">{userInfo.address ? `${userInfo.address.street} ${userInfo.address.houseNumber}` : 'Dirección no disponible'}</p>
          </div>
          <div className="flex mb-4 items-center justify-between">
            <div className="flex items-center">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2 3H14V12.4444C14 12.5918 13.9473 12.7331 13.8536 12.8373C13.7598 12.9415 13.6326 13 13.5 13H2.5C2.36739 13 2.24021 12.9415 2.14645 12.8373C2.05268 12.7331 2 12.5918 2 12.4444V3Z"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14 3L8 8L2 3"
                  stroke="#7A899B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p className="text-gray-600 text-sm">Correo Electronico</p>
            </div>
            <p className="text-gray-600 text-sm">{userInfo.email}</p>
          </div>
          <div className="flex mb-4 items-center justify-between">
            <div className="flex items-center">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="14"
                height="14"
              >
                <path 
                stroke="#7A899B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
              </svg>

              <p className="text-gray-600 text-sm">Número Celular</p>
            </div>
            <p className="text-gray-600 text-sm">+51 {userInfo.phoneNumber}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
