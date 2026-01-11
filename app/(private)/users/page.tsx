"use client";

import { Button } from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { useEffect, useState } from "react";
import DeleteUserModal from "./components/DeleteUserModal";
import { UsersParams } from "@/app/types/users";
import { UserCard, UserCardLoader } from "./components/UserCard";
import EmptyState from "@/components/ui/EmptyState";
import { mockUsers } from "@/lib/mock-data";

export const fetchUsers = (): Promise<UsersParams[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1200);
  });
};

const Users = () => {
  const [users, setUsers] = useState<UsersParams[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UsersParams | null>(null);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

  const handleAction = (action: string, item: UsersParams) => {
    setSelectedUser(item);

    if (action === "delete") {
      setOpenDeleteUserModal(true);
    }
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));

    setOpenDeleteUserModal(false);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 0);

    fetchUsers()
      .then((data) => setUsers(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="largeTextBold">Users</Typography>
        <Button onClick={() => {}}>Add New User</Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <UserCardLoader key={index} />
          ))}
        </div>
      ) : users.length ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">
          {users.map((item) => (
            <UserCard
              key={item.id}
              user={item}
              handleAction={(action) => handleAction(action, item)}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Users Added Yet"
          description="Add your first User to easily manage ownership, permissions, and access settings."
          buttonText="Add User"
          onButtonClick={() => {}}
        />
      )}

      <DeleteUserModal
        user={selectedUser!}
        openDeleteUserModal={openDeleteUserModal}
        setOpenDeleteUserModal={setOpenDeleteUserModal}
        handleDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Users;
