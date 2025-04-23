import { Toaster } from "react-hot-toast";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import OrderHistory from "../components/profile/order/OrderHistory";
import ScrollToTop from "../components/shared/ScrollToTop";
import UserProfile from "../components/profile/user/UserProfile";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { Order } from "../types/order";

const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userInfo = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8333/api/v1/orders/by-user/" + userInfo.user.id,{
            headers: {
              "Authorization":`Bearer ${userInfo.accessToken.access_token}`
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const resultado: Order[] = await response.json();

        setOrders(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    if (userInfo?.user?.id) {
      fetchData();
    }
  }, [userInfo?.user?.id]);

  return (
    <div>
      <Header />
      <UserProfile userInfo={userInfo.user} totalOrders={orders.length} />
      <OrderHistory orders={orders} />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Profile;
