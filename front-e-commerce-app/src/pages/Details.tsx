import { Toaster } from "react-hot-toast";
import ProductDetail from "../components/ details/ProductDetail";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import ScrollToTop from "../components/shared/ScrollToTop";
import { useParams } from "react-router-dom";

const Details = () => {
const { id } = useParams(); 
  return (
    <div>
      <Header />
      <ProductDetail idProduct={id || "default-id"} />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Details;
