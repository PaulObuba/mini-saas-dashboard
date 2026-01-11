"use client";

import useAuth from "@/app/hooks/use-auth";
import { Button } from "@/components/ui/Button";
import CustomDialog, { DialogFooter } from "@/components/ui/modals/Dialog";
import { useRouter } from "next/navigation";

const ShowLogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
}: {
  showLogoutModal: boolean;
  setShowLogoutModal: (val: boolean) => void;
}) => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.clear();

    router.replace("/auth/login");

    setShowLogoutModal(false);
  };
  
  return (
    <CustomDialog
      title={"Log out"}
      description="Are you sure you want to log out? You will need to log in again to continue."
      openModal={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowLogoutModal(false)}
          aria-label="Cancel logout"
        >
          Cancel
        </Button>

        <Button
          className="bg-danger text-white w-full"
          onClick={handleLogout}
          aria-label="Confirm logout"
        >
          Log out
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default ShowLogoutModal;
