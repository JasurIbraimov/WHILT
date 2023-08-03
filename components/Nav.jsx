"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(true);
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProviders(providers);
        };
        fetchProviders();
    }, []);

    return (
        <nav className="menu">
            <Link className="gap-2" href="/">
                <Image
                    alt="WHILT Logo"
                    src="/assets/images/logo-light.svg"
                    width={30}
                    height={30}
                />
            </Link>

            {/* Desktop nav */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create"} className="btn">
                            Create Post
                        </Link>
                        <button className="btn_reversed">Sign out</button>
                        <Link href={"/profile"} className="rounded-full">
                            <Image
                                alt="User Profile"
                                width={30}
                                height={30}
                                src={"/assets/images/logo.svg"}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile nav */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <button
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        >
                            <Image
                                alt="User Profile"
                                width={30}
                                height={30}
                                src={"/assets/images/logo.svg"}
                            />
                        </button>
                        {toggleDropdown && (
                            <div className="mobile-menu">
                                <Link
                                    href={"/profile"}
                                    className="btn"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create"}
                                    className="btn mt-2"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Post
                                </Link>
                                <button
                                    className="btn_reversed mt-2"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
