"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartModal from "../CartModal";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const router = useRouter();
  // const pathName = usePathname();

  // const wixClient = useWixClient();
  // const isLoggedIn = wixClient.auth.loggedIn();

  // TEMPORARY
  // const isLoggedIn = false;

  const handleProfile = () => {
    // if (!isLoggedIn) {
    //   router.push("/login");
    // } else {
    //   setIsProfileOpen((prev) => !prev);
    // }

    setIsProfileOpen((prev) => !prev);
  };

  // AUTH WITH WIX-MANAGED AUTH

  // const wixClient = useWixClient();

  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );

  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  // const handleLogout = async () => {
  //   setIsLoading(true);
  //   Cookies.remove("refreshToken");
  //   const { logoutUrl } = await wixClient.auth.logout(window.location.href);
  //   setIsLoading(false);
  //   setIsProfileOpen(false);
  //   router.push(logoutUrl);
  // };


  // const { cart, counter, getCart } = useCartStore();

  // useEffect(() => {
  //   getCart(wixClient);
  // }, [wixClient, getCart]);

  return (
    <>
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={18}
        height={18}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer">
            {/* {isLoading ? "Logging out" : "Logout"} */}
            Logout
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={18}
        height={18}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={18} height={18} />
        <div className="absolute -top-2 -right-3 w-4 h-4 bg-primary rounded-full text-black text-xs flex items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
    </>
  );
};

export default NavIcons;
