import Image from "next/image";

const Smallcard = ({ img, location, distance }) => {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-200 hover:scale-[1.02] transition duration-150 ease-out">
      {/* left side */}
      <div className="relative h-16 w-16">
        <Image className="rounded-lg" src={img} layout="fill" />
      </div>
      {/* right side */}
      <div className="">
        <h2>{location}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
};

export default Smallcard;