"use client";

import { Notification } from "@/app/types/notification";
import { motion } from "framer-motion";
import { MdCheckCircle, MdWarning, MdInfo } from "react-icons/md";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

const iconMap = {
  info: MdInfo,
  success: MdCheckCircle,
  warning: MdWarning,
};

const colorMap = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

export const NotificationCard = ({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) => {
  const Icon = iconMap[notification.type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      onClick={onClick}
      className={`cursor-pointer flex flex-col gap-4 p-5 border rounded-2xl shadow-sm hover:shadow-md transition
        ${notification.read ? "border-gray-200" : "border-primary"}
      `}
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Icon className={`w-6 h-6 mt-0.5 ${colorMap[notification.type]}`} />
          <div>
            <h3 className="font-medium ">{notification.title}</h3>
            <p className="text-sm">{notification.message}</p>
          </div>
        </div>

        {!notification.read && (
          <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2" />
        )}
      </div>

      <div className="text-xs text-gray-400 text-right">
        {notification.time}
      </div>
    </motion.div>
  );
};

export const NotificationCardLoader = () => {
  return (
    <div
      className="flex flex-col gap-4 p-5 border border-gray-200 rounded-2xl shadow-sm"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="flex gap-3">
        <SkeletonLoader className="w-6 h-6 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader className="h-4 w-1/2 rounded" />
          <SkeletonLoader className="h-3 w-full rounded" />
        </div>
      </div>

      <div className="flex justify-end">
        <SkeletonLoader className="h-3 w-20 rounded" />
      </div>
    </div>
  );
};
