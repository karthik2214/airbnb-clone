import { useTheme } from "next-themes";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

const Header = ({ placeholder }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const renderThemeChanger = () => {
    // if (!mounted) return null;

    const currTheme = theme === "system" ? systemTheme : theme;

    if (currTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        l: searchInput,
        sD: startDate.toISOString(),
        eD: endDate.toISOString(),
        nOG: noOfGuests,
      },
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 grid grid-cols-3 bg-white dark:bg-[#121212] shadow-md p-5 md:px-10">
        {/* left side  */}
        <div
          onClick={() => router.push("/")}
          className="relative flex items-center h-10 cursor-pointer my-auto"
        >
          <Image
            src="https://links.papareact.com/qd3"
            layout="fill"
            alt="logo"
            objectFit="contain"
            objectPosition="left"
          />
        </div>

        {/* middle side */}
        <div className="flex items-center sm:border-2 md:border-2 rounded-full py-2 md:shadow-sm hover:shadow-lg">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            placeholder={placeholder || "Start your search"}
            type="text"
          />
          <SearchIcon className="hidden md:inline-flex h-8 mr-5 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
        </div>

        {/* <div className="flex items-center md:shadow-sm">
          {renderThemeChanger()}
        </div> */}

        {/* right side */}
        <div className="flex items-center justify-end text-gray-500 space-x-4">
          <p className="hidden md:inline">Become a host</p>
          <GlobeAltIcon className="h-6 cursor-pointer" />

          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            {renderThemeChanger()}
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>

        {searchInput && (
          <div className="flex flex-col col-span-3 mx-auto mt-5">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>

              <UsersIcon className="h-5" />
              <input
                type="number"
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div className="flex">
              <div className="flex-grow"></div>
              <button className=" flex-grow text-gray-500" onClick={resetInput}>
                Cancel
              </button>
              <div className="mr-[13rem]" onClick={resetInput}>
                <button
                  onClick={resetInput}
                  onClick={search}
                  className="ml-14 text-red-400"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
