import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../types/product";
import toast from "react-hot-toast";
import {
  Order,
  PaymentMethod,
  PurchaseProducts,
  Shipping,
} from "../types/order";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface CartContextProps {
  children: ReactNode;
}

const CartContext = createContext({
  cartProducts: [] as Product[],
  addToCart: (_product: Product) => {},
  removeFromCart: (_productId: string) => {},
  addQuantity: (_p: Product) => {},
  decreaseQuantity: (_p: Product) => {},
  generateOrder: (_paymentMethod: string, _shipping: Shipping) => {},
});

const CartContextProvider = ({ children }: CartContextProps) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    if (cart) {
      setCartProducts(JSON.parse(cart));
    }
  }, []);

  const generateOrder = async (paymentMethod: string, shipping: Shipping) => {
    if (!auth.isAuthenticated) {
      toast.error("¡Debe iniciar sesion para continuar su compra!")
    } else if (cartProducts.length === 0) {
      toast.error("¡El carrito esta vacio!");
    } else if (!paymentMethod || !shipping || Object.keys(shipping).length === 0) {
      toast.error("¡Seleccione un metodo de pago y envío!");
    } else {
      const total = cartProducts
        .map((p) => p.unitPrice * p.quantity)
        .reduce((acumulador, valorActual) => {
          return acumulador + valorActual;
        }, 0);

      const purchaseProducts = cartProducts.map((p) => {
        return { id: p.id, quantity: p.quantity } as PurchaseProducts;
      });

      const order: Order = {
        totalAmount: total,
        paymentMethod: paymentMethod as PaymentMethod,
        cardLast4: "1234",
        shipping: shipping,
        customerId: user.user.id,
        products: purchaseProducts,
      };

      try {
        const responde = await fetch(
          "http://localhost:8333/api/v1/orders/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${user.accessToken.access_token}`
            },
            body: JSON.stringify(order),
          }
        );

        if (!responde.ok) {
          throw new Error(await responde.json());
        }

        toast.success("Se genero la orden con exito");
      } catch (error) {
        console.log(error);
      } finally {
        setCartProducts([]);
        window.localStorage.removeItem("cart");
        navigate("/");
      }
    }
  };

  const addQuantity = (p: Product) => {
    const copyProducts = [...cartProducts].map((product) => {
      if (product.id === p.id) {
        if (p.quantity >= product.stock) {
          toast.error("No hay suficiente stock");
          return product;
        }
        product.quantity++;
      }
      return product;
    });

    setCartProducts(copyProducts);

    window.localStorage.setItem("cart", JSON.stringify(copyProducts));
  };

  const decreaseQuantity = (p: Product) => {
    const copyProducts = [...cartProducts].map((product) => {
      if (product.id === p.id) {
        product.quantity--;
      }
      return product;
    });

    setCartProducts(copyProducts);

    window.localStorage.setItem("cart", JSON.stringify(copyProducts));
  };

  const addToCart = (product: Product) => {
    const productExists = cartProducts.some((item) => item.id === product.id);

    if (productExists) {
      toast.error("El producto ya existe en el carrito");
    } else {
      product.quantity = 1;
      setCartProducts([...cartProducts, product]);
      window.localStorage.setItem(
        "cart",
        JSON.stringify([...cartProducts, product])
      );
      toast.success("Se agrego con exito");
    }
  };

  const removeFromCart = (productId: string) => {
    setCartProducts(cartProducts.filter((product) => product.id !== productId));
    window.localStorage.setItem(
      "cart",
      JSON.stringify(cartProducts.filter((product) => product.id !== productId))
    );
    toast.success("Se elimino el producto del carrito");
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        addQuantity,
        decreaseQuantity,
        generateOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
export const useCart = () => useContext(CartContext);
