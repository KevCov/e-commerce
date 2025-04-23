import { Toaster } from "react-hot-toast";
import Cook from "../components/home/Cook";
import Expert from "../components/home/Expert";
import Feature from "../components/home/Features";
import Gallery from "../components/home/Gallery";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import ScrollToTop from "../components/shared/ScrollToTop";
import Volunteer from "../components/shared/Volunteer";

const Home = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Feature />
      <Cook />
      <Expert />
      <Gallery />
      <Newsletter />
      <Volunteer />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Home;