/* eslint-disable react/prop-types */
const Chip = ({ text, active, onClick }) => {
  return (
    <div
      className={` flex justify-center items-center h-fit rounded-xl ${
        active ? "bg-[#4D5562]" : " bg-transparent"
      } px-3 py-1`}
      onClick={onClick}
    >
      <span
        className={`${
          active ? "text-[#CDD5E0]" : "text-[#4D5562]"
        } text-xs md:text-sm font-semibold`}
      >
        {text}
      </span>
    </div>
  );
};

export default Chip;
