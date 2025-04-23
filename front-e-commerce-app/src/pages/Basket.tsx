import { useEffect, useState } from "react";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import ScrollToTop from "../components/shared/ScrollToTop";
import ShoppingCart from "../components/shopping/ShoppingCart";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/product";
import { Toaster } from "react-hot-toast";
import { Shipping } from "../types/order";
import { useUser } from "../contexts/UserContext";

const Basket = () => {
  const { cartProducts } = useCart();
  const { user, accessToken } = useUser();
  const [overStock, setOverStock] = useState<Product[]>([]);
  const [shippings, setShippings] = useState<Shipping[]>([]);

  useEffect(() => {
    const fetchOverStock = async () => {
      try {
        const response = await fetch(
          "http://localhost:8333/api/v1/products/over-stock",{
            headers: {
              "Authorization":`Bearer ${accessToken.access_token}`
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const resultado: Product[] = await response.json();
        setOverStock(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOverStock();
  }, []);

  useEffect(() => {
    const fetchShippings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8333/api/v1/orders/shipping/" + user.id,{
            headers: {
              "Authorization":`Bearer ${accessToken.access_token}`
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const resultado: Shipping[] = await response.json();
        
        setShippings(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      fetchShippings();
    }
  }, [user?.id]);

  const addNewShippingCreated = (newShipping: Shipping) => {
    setShippings([...shippings, newShipping])
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ShoppingCart
        list={cartProducts}
        overstock={overStock}
        shipping={shippings}
        functions={addNewShippingCreated}
      />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Basket;
