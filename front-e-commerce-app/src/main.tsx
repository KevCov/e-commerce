import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import UserContextProvider from "./contexts/UserContext.tsx";
import CartContextProvider from "./contexts/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
