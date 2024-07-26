"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between ">
      <div className="flex gap-2 flex-wrap">
        <select
          name="sort"
          id=""
          className="py-2 px-3 rounded-2xl text-xs md:w-auto w-24 font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min"
          className="text-xs rounded-2xl pl-2 md:w-24 w-16 h-8 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max"
          className="text-xs rounded-2xl h-8 pl-2 md:w-24 w-16 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
      </div>
      <div className="flex">
          <Link href={`/wrapup`} className="bg-primary text-black text-sm py-2 px-4 rounded-2xl cursor-pointer"
          >Reset</Link>
      </div>
    </div>
  );
};

export default Filter;
