import { useRef } from "react";

interface FilterProps {
  filterByPrice: (minPrice: number, maxPrice: number) => void,
  filterByCountry: (country: string) => void
}

const Filter = ({ filterByPrice, filterByCountry }: FilterProps) => {

  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  const handlePriceFilter = () => {
    unCheckInputs();
    const minPriceValue = parseFloat(minPriceInputRef.current?.value || "0");
    const maxPriceValue = parseFloat(maxPriceInputRef.current?.value || "0");
    filterByPrice(minPriceValue, maxPriceValue);
  };

  const handlePriceReset = () => {
    clearValueInputs();
    filterByPrice(0, 0);
  };

  const handleCountryFilter = (event: React.MouseEvent<HTMLInputElement>) => {
    clearValueInputs();
    filterByCountry(event.target.value);
  };

  const handleCountryReset = () => {
    unCheckInputs();
    filterByCountry("");
  };

  const clearValueInputs = () => {
    if (minPriceInputRef.current) {
      minPriceInputRef.current.value = "";
    }

    if (maxPriceInputRef.current) {
      maxPriceInputRef.current.value = "";
    }
  };

  const unCheckInputs = () => {
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="pais"]');
    radioButtons.forEach(radio => {
      radio.checked = false;
    });
  };

  return (
    <div className="space-y-4 w-full ml-16 mt-12">
      <details open className="group relative overflow-hidden rounded border border-gray-300 shadow-sm">
        <summary className="flex items-center justify-between gap-2 p-3 text-gray-700 transition-colors hover:text-gray-900 [&::-webkit-details-marker]:hidden">
          <span className="text-sm m-auto font-medium">País de origen</span>

          <span className="transition-transform group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="divide-y divide-gray-300 border-t border-gray-300 bg-white">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-700"> Seleccione un país </span>

            <button
              type="button"
              className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
              onClick={handleCountryReset}
            >
              Reset
            </button>
          </div>

          <fieldset className="p-3">
            <legend className="sr-only">Checkboxes</legend>

            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="argentina"
                className="inline-flex items-center gap-3"
              >
                <input
                  type="radio"
                  className="size-5 rounded border-gray-300 shadow-sm"
                  name="pais"
                  value={"argentina"}
                  id="argentina"
                  onClick={handleCountryFilter}
                />

                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  Argentina{" "}
                </span>
              </label>

              <label
                htmlFor="chile"
                className="inline-flex items-center gap-3"
              >
                <input
                  type="radio"
                  className="size-5 rounded border-gray-300 shadow-sm"
                  name="pais"
                  value={"chile"}
                  id="chile"
                  onClick={handleCountryFilter}
                />

                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  Chile{" "}
                </span>
              </label>
            </div>
          </fieldset>
        </div>
      </details>

      <details open className="group relative overflow-hidden rounded border border-gray-300 shadow-sm">
        <summary className="flex items-center justify-between gap-2 p-3 text-gray-700 transition-colors hover:text-gray-900 [&::-webkit-details-marker]:hidden">
          <span className="text-sm m-auto font-medium">Rango de precio </span>

          <span className="transition-transform group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="divide-y divide-gray-300 border-t border-gray-300 bg-white">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-700"> Ingrese Min y Max </span>

            <button
              type="button"
              onClick={handlePriceFilter}
              className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={handlePriceReset}
              className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3 p-3">
            <label htmlFor="minPrice">
              <span className="text-sm text-gray-700"> Min </span>

              <input
                type="number"
                name="minPrice"
                id="minPrice"
                ref={minPriceInputRef}
                className="mt-0.5 w-full rounded pl-2 border-gray-300 shadow-sm sm:text-sm"
              />
            </label>

            <label htmlFor="maxPrice">
              <span className="text-sm text-gray-700"> Max </span>

              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                ref={maxPriceInputRef}
                className="mt-0.5 w-full pl-2 rounded border-gray-300 shadow-sm sm:text-sm"
              />
            </label>
          </div>
        </div>
      </details>
    </div>
  );
};

export default Filter;