
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Image from "next/image";
import { Suspense } from "react";

const WrapUpPage = async ({searchParams}: {searchParams?: any}) => {
  // const products = await createProduct();

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      
      <div className="hidden  px-4 sm:flex justify-between h-[70vh]">
        <div className="w-2/3 flex flex-col items-center justify-center gap-10">
          <h1 className="text-[9rem] font-semibold font-Great_Vibes leading-[55px] text-gray-700">
            Wrap Up
            <br />
            <span className="font-normal font-Tangerine text-5xl">Experience style and innovation.</span>
            {/* <br /> Selected Products */}
          </h1>
         
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <div className="md:hidden flex h-[50vh] justify-center items-center">
          <h1 className="text-6xl font-semibold font-Great_Vibes leading-[25px] text-gray-700">
            Wrap Up
            <br />
            <span className="font-normal font-Tangerine text-3xl">Experience style and innovation.</span>
            {/* <br /> Selected Products */}
          </h1>
      </div>

      {/* FILTER */}
      <Suspense fallback={<Skeleton/>}>
        <Filter />
      </Suspense>
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">Products For You!</h1>
      <Suspense fallback={<Skeleton/>}>
        <ProductList searchParams={searchParams}/>
      </Suspense>
    </div>
  );
};

export default WrapUpPage;
