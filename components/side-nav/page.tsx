"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { navItems } from "./components/navList";
import { MdLogout } from "react-icons/md";
import ShowLogoutModal from "./components/ShowLogoutModal";
import { cn } from "@/lib/class-name";
import Typography from "../ui/Typography";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

const Sidenav = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col gap- h-screen transition-all duration-300
      ${collapsed ? "w-16" : "w-60"}`}
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-7 px-4">
        {!collapsed && <span className="text-lg font-semibold">Mini SaaS</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
    p-2 rounded-md text-sm cursor-pointer
    transition-colors
    hover:bg-background-100
  "
          style={{ color: "var(--text-700)" }}
        >
          {collapsed ? <HiOutlineArrowSmRight /> : <HiOutlineArrowSmLeft />}
        </button>
      </div>

      {/* Navigation */}
      <ul className="flex-1 flex flex-col py-4 space-y-1">
        {navItems()
          .filter((item) => item.canView)
          .map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "group flex items-center gap-2 px-4 py-3 transition-all duration-300 ease-out transform",
                    isActive && "bg-primary font-semibold shadow-sm"
                  )}
                >
                  <div
                    className={cn(
                      "transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5",
                      isActive && "translate-x-2"
                    )}
                  >
                    <Icon size={20} className={cn(isActive && "text-white")} />
                  </div>

                  {!collapsed && (
                    <Typography
                      variant="xSmallText"
                      className={cn(
                        "group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive &&
                          "text-white translate-x-2 group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </Typography>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>

      <div className="mb-">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-red-600 transition-colors w-full cursor-pointer"
        >
          <MdLogout size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </aside>
  );
};

export default Sidenav;
