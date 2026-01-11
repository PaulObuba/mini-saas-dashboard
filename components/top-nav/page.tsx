"use client";

import useAuth from "@/app/hooks/use-auth";
import { getInitials } from "@/lib/get-initials";
import { BiSearch } from "react-icons/bi";
import { MdNotifications, MdDarkMode, MdLightMode } from "react-icons/md";
import MobileSideNav from "../mobile-side-nav/page";
import { useState } from "react";
import ShowLogoutModal from "../side-nav/components/ShowLogoutModal";
import Link from "next/link";
import { useTheme } from "@/app/context/theme-context";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

const TopNav = () => {
  const { authUser } = useAuth();
  const { theme, setTheme } = useTheme();

  console.log("authUser", useAuth());

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className="w-full flex justify-between items-center p-3 rounded-xl border border-gray-200 mt-4"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="flex-1 max-w-xl flex items-center gap-2">
        <BiSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-xs"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <Link
          href="/notifications"
          className="p-2 rounded-full hover:bg-gray-100 transition hidden md:inline-flex"
        >
          <MdNotifications className="w-5 h-5 text-gray-600" />
        </Link>

        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 rounded-full hover:bg-background-50 dark:hover:bg-background-100 transition inline-flex"
        >
          {theme === "light" ? (
            <MdDarkMode className="w-5 h-5 text-primary" />
          ) : (
            <MdLightMode className="w-5 h-5 text-primary" />
          )}
        </button>

        <Link
          href="/profile"
          className="outline-none border-none bg-transparent w-fit shrink-0 block"
        >
          {authUser?.user?.profilePicture && (
            <Image
              src={authUser.user.profilePicture}
              alt={authUser.user.first_name || "Profile Picture"}
              width={36}
              height={36}
              className="rounded-full object-cover object-center"
            />
          )}

          {!authUser?.user?.profilePicture && (
            <div className="text-sm rounded-full bg-primary text-white  uppercase font-bold size-8 shrink-0 flex items-center justify-center cursor-pointer">
              {getInitials(
                authUser?.user?.first_name || "",
                authUser?.user?.last_name || ""
              )}
            </div>
          )}
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <HiOutlineMenuAlt3
            size={25}
            style={{
              color: "var(--text-700)",
            }}
          />
        </button>
      </div>

      <MobileSideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setShowLogoutModal={setShowLogoutModal}
      />

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default TopNav;
