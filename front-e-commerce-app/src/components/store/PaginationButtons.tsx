interface PaginationButtonsProps {
  changepage: (newPage: number) => void;
}

const PaginationButtons = ({ changepage }: PaginationButtonsProps) => {
  const numberPages = 4;

  return (
    <section className="h-[30px] flex justify-center items-center">
      {Array.from({ length: numberPages }, (_, index) => (
        <button
          key={index}
          onClick={() => {
            changepage(index);
          }}
          className="bg-[#800020] text-white font-bold py-2 px-4 rounded m-2"
        >
          {index + 1}
        </button>
      ))}
    </section>
  );
};

export default PaginationButtons;
