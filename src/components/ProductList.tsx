import { getProducts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

const  ProductList = async ({featured = false, searchParams}: {featured?: boolean, searchParams?: any}) => {
  const PRODUCT_PER_PAGE = 8;
  let products = [];
  let totalPages = 0;
  const page = parseInt(searchParams?.page) || 1;
  const min = searchParams?.min || 0;
  const max = searchParams?.max || Infinity;
  const sort = searchParams?.sort || "";

  if (featured) {
    const allProducts = await getProducts();
    const featuredProduct = allProducts.filter((product: any) => product.featured);
    products = featuredProduct.slice(0, 4);
  } else {
    products = await getProducts();
    totalPages = Math.ceil(products.length / PRODUCT_PER_PAGE);

    switch (sort) {
      case "asc price":
        products.sort((a: any, b: any) => a.products[0].price - b.products[0].price);
        break;
      case "desc price":
        products.sort((a: any, b: any) => b.products[0].price - a.products[0].price);
        break;
      case "asc lastUpdated":
        products.sort((a: any, b: any) => new Date(a.arrivedAt).getTime() - new Date(b.arrivedAt).getTime());
        break;
      case "desc lastUpdated":
        products.sort((a: any, b: any) => new Date(b.arrivedAt).getTime() - new Date(a.arrivedAt).getTime());
        break;
      default:
        break;
    }
    products = products
    .filter((product: any) => product.products[0].price >= min && product.products[0].price <= max)
    .slice((page - 1) * PRODUCT_PER_PAGE, page * PRODUCT_PER_PAGE);
  }

  


  
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 flex-wrap cursor-pointer">
      {products.map((product: any) => (
        <Link
          href={"/wrapup/" + product._id.toString()}
          className="w-full px-10 md:px-0 flex flex-col gap-4 sm:w-[45%] lg:w-[22%] cursor-pointer"
          key={product.id}
        >
          <div className="relative w-full aspect-square ">
            <Image
              src={product.images[0] || "/image-placeholder.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            
              <Image
                src={product.images[1] || "/image-placeholder.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">₦ {product.products[0].price || 0}</span>
          </div>
         
            <div
              className="text-sm text-gray-500"
            >
              {product.shortDescription?.length > 70 ? `${product.shortDescription?.slice(0, 70)} ...` : product.shortDescription}
            </div>
        
          <button className="rounded-2xl ring-1 ring-black text-black w-max py-2 px-4 text-xs hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        </Link>
      ))}
      { !featured ? (
          <Pagination
            currentPage={page}
            hasPrev={(page > 1)}
            hasNext={(page < totalPages)}
          />
        ) : null}
    </div>
  );
};

export default ProductList;

