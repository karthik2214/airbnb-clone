import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Image from "next/image";
import Map from "../components/Map";

export const getServerSideProps = async () => {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
};

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { l, sD, eD, nOG } = router.query;

  const sDate = new Date(sD).toDateString();
  const eDate = new Date(eD).toDateString();
  const range = `from ${sDate} to ${eDate}`;

  return (
    <div>
      <Header placeholder={`${l} | ${range} | ${nOG} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays {range} for {nOG} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {l}</h1>

          <div className="hidden lg:inline-flex mb-5 select-none space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancelation Flexibility</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults?.map((item) => (
              <Card key={item.img} {...item} />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
