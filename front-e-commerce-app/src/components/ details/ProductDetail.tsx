import { useEffect, useState } from "react";
import { Product } from "../../types/product";
interface ProductDetailProps {
  idProduct: string;
}

const ProductDetail = ({ idProduct }: ProductDetailProps) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [product, setProduct] = useState({} as Product);

  useEffect(() => {
    const fetchProduct = async () => {
      fetch(`http://localhost:8333/api/v1/products/${idProduct}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
            setProduct(data);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    fetchProduct();
  }, [idProduct]);

  return (
    <section className="mt-28 md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-2/6 lg:w-2/5 w-80 h-full">
        <img className="w-full h-full" alt="img" src={product.urlImage} />
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
              text-[#800020]
							font-semibold
							lg:leading-6
							leading-7
							mt-2
						"
          >
            {product.name}
          </h1>
        </div>
        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            {product.description}
          </p>
          <p className="text-base leading-4 mt-7 text-gray-600">
            <strong className="text-[#800020] mr-5">País de origen:</strong> {product.countryOrigin}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            <strong className="text-[#800020] mr-5">Unidad de medida:</strong> {product.uom}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            <strong className="text-[#800020] mr-5">Stock disponible:</strong> {product.stock}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            <strong className="text-[#800020] mr-5">Categoria:</strong> {product.category ? `${product.category.name}` : "No disponible"}
          </p>
          <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
            <strong className="text-[#800020] mr-5">Viñedo:</strong> {product.brand ? `${product.brand.name}` : "No disponible"}
          </p>
        </div>
        <div>
          <div className="border-t border-b py-4 mt-7 border-gray-200">
            <div
              onClick={() => setShow(!show)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-base leading-4 text-[#800020]">
                Shipping and returns
              </p>
              <button
                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                aria-label="show or hide"
              >
                <svg
                  className={"transform " + (show ? "rotate-180" : "rotate-0")}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                (show ? "block" : "hidden")
              }
              id="sect"
            >
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are nonrefundable
            </div>
          </div>
        </div>
        <div>
          <div className="border-b py-4 border-gray-200">
            <div
              onClick={() => setShow2(!show2)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="text-base leading-4 text-[#800020]">Contact us</p>
              <button
                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                aria-label="show or hide"
              >
                <svg
                  className={"transform " + (show2 ? "rotate-180" : "rotate-0")}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                (show2 ? "block" : "hidden")
              }
              id="sect"
            >
              If you have any questions on how to return your item to us,
              contact us.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
