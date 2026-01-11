import Link from "next/link";
import { navItems } from "../side-nav/components/navList";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { Drawer, DrawerContent } from "../ui/modals/Drawer";
import { cn } from "@/lib/class-name";

const MobileSideNav = ({
  isOpen,
  setIsOpen,
  setShowLogoutModal,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setShowLogoutModal: (val: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        side="right"
        className="rounded-t-none"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div
          className="py-5 h-full flex flex-col"
          style={{
            backgroundColor: "var(--background-50)",
            color: "var(--text-700)",
          }}
        >
          <Link href="/dashboard" className="flex items-center px-4 pt-1 pb-5">
            <span className="text-lg font-semibold">Mini SaaS</span>
          </Link>

          <nav className="flex-1 mt-4 space-y-1">
            {navItems()
              .filter((item) => item.canView)
              .map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 font-bold px-4 py-2 rounded-md transition-colors
                  ${isActive && "text-primary"}
                `}
                  >
                    <Icon
                      size={20}
                      className={cn(isActive && "text-primary")}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
          </nav>

          <div className="mb-">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutModal(true);
              }}
              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-red-600 transition-colors w-full cursor-pointer"
            >
              <MdLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSideNav;
