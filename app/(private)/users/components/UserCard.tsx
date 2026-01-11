import { UsersParams } from "@/app/types/users";
import ActionsMenu from "@/components/ui/ActionsMenu";
import { Button } from "@/components/ui/Button";
import LineThrough from "@/components/ui/LineThrough";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import Typography from "@/components/ui/Typography";
import { defaultImages } from "@/lib/constant";
import { motion } from "framer-motion";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";

export const UserCard = ({
  user,
  onClick,
  handleAction,
}: {
  user: UsersParams;
  onClick: () => void;
  handleAction: (action: string) => void;
}) => {
  const profileImageSrc = user?.profile_picture || defaultImages.avatar;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex flex-col justify-between gap-5 p-5 border border-mid-grey rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="space-y-3">
        <div className="absolute right-4 top-3 flex justify-end">
          <ActionsMenu
            items={[
              {
                icon: <HiOutlineEye />,
                title: "View",
                action: "view",
              },
              {
                icon: <HiOutlineTrash />,
                title: "Delete",
                action: "delete",
                danger: true,
              },
            ]}
            onSelect={(action) => {
              handleAction(action);
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <motion.img
            src={profileImageSrc}
            alt={`${user?.first_name}'s profile`}
            className="w-26.75 h-26.75 rounded-full border border-gray-200 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <div>
            <Typography variant="mediumText">
              {user?.first_name} {user?.last_name}
            </Typography>
          </div>
        </div>

        <LineThrough className="w-2/3 mx-auto opacity-60" />

        <div className="flex justify-center">
          <Typography
            as="a"
            href={`mailto:${user.email}`}
            variant="xSmallText"
            className="text-primary underline cursor-pointer truncate"
          >
            {user.email}
          </Typography>
        </div>
      </div>

      <Button
        className="w-full bg-background-50 text-text-700 hover:bg-primary hover:text-white border transition-all"
        onClick={onClick}
      >
        Manage {user?.first_name}
      </Button>
    </motion.div>
  );
};

export const UserCardLoader = () => {
  return (
    <div
      className="flex flex-col justify-between gap-5 p-5 border border-mid-grey rounded-2xl shadow-sm"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="space-y-5">
        <div>
          <div className="flex justify-end">
            <SkeletonLoader className="w-6 h-6 rounded" />
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <SkeletonLoader className="w-26.75 h-26.75 rounded-full" />

            <div className="space-y-2 w-full max-w-30">
              <SkeletonLoader className="h-4 rounded" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <SkeletonLoader className="w-2/3 h-0.5 rounded" />
        </div>

        <div className="w-full flex justify-center">
          <SkeletonLoader className="w-24 h-3 rounded" />
        </div>
      </div>

      <SkeletonLoader className="w-full h-10 rounded-lg" />
    </div>
  );
};
