import { useEffect, useState } from "react";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import ScrollToTop from "../components/shared/ScrollToTop";
import Filter from "../components/store/Filter";
import Products from "../components/store/Products";
import { Product } from "../types/product";
import PaginationButtons from "../components/store/PaginationButtons";

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [page, setPage] = useState(0);

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

  const changePage = (newPage: number) => {
    setPage(newPage);
  }

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
        const response = await fetch("http://localhost:8333/api/v1/products?page=" + page + "&size=6",{
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const resultado = await response.json();
        console.log(resultado)
        setProducts(resultado.content);
        setProductsToShow(resultado.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

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
      <PaginationButtons changepage={changePage} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Store;
