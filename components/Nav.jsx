"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true)
    return (
        <nav className="menu">
            <Link className="gap-2" href="/">
                <Image src="/assets/images/logo-light.svg" width={30} height={30} />
            </Link>

            {/* Desktop nav */}
            <div className="sm:flex hidden">
              {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                  <Link href={"/create"} className="light_btn">
                    Create Post
                  </Link>
                </div>
              ) : (
                <>
                
                </>
              )}
            </div>
        </nav>
    );
};

export default Nav;
