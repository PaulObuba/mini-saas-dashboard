import { UsersParams } from "@/app/types/users";
import { Button } from "@/components/ui/Button";
import CustomDialog, { DialogFooter } from "@/components/ui/modals/Dialog";

const DeleteUserModal = ({
  user,
  openDeleteUserModal,
  setOpenDeleteUserModal,
  handleDelete,
}: {
  user: UsersParams;
  openDeleteUserModal: boolean;
  setOpenDeleteUserModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete User"}
      description={`Are you sure you want to delete ${user?.first_name} ${user?.last_name} as your user`}
      openModal={openDeleteUserModal}
      onClose={() => setOpenDeleteUserModal(false)}
      className="w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteUserModal(false)}
        >
          Cancel
        </Button>
        <Button className="bg-danger text-white w-full" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteUserModal;
