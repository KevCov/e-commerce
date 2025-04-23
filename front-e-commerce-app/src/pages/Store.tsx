import { useEffect, useState } from "react";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import ScrollToTop from "../components/shared/ScrollToTop";
import Filter from "../components/store/Filter";
import Products from "../components/store/Products";
import { Product } from "../types/product";
import { useUser } from "../contexts/UserContext";

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const { accessToken } = useUser();

  const filterProductsByPrice = (minPrice: number, maxPrice: number) => {
    if (minPrice === 0 && maxPrice === 0) {
      setProductsToShow([...products]);
    } else {
      let filteredProducts = [...products].filter((p) => {
        return p.unitPrice >= minPrice && p.unitPrice <= maxPrice;
      });

      setProductsToShow(filteredProducts);
    }
  };

  const filterProductsByCountry = (country: string) => {
    if (country == "") {
      setProductsToShow([...products]);
    } else {
      let filteredProducts = [...products].filter((p) => {
        return p.countryOrigin.toLowerCase() == country.toLowerCase();
      });

      setProductsToShow(filteredProducts);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8333/api/v1/products",{
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const resultado: Product[] = await response.json();

        setProducts(resultado);
        setProductsToShow(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <section className="grid grid-cols-[20%_1fr] mt-20 w-full">
        <div className="sticky top-20 space-y-4 w-full z-10 h-fit">
          {" "}
          {/* Añade h-fit o min-h-screen */}
          <Filter
            filterByPrice={filterProductsByPrice}
            filterByCountry={filterProductsByCountry}
          />
        </div>
        <Products list={productsToShow} />
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Store;
