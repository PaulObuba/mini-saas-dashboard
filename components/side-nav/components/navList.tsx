import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdNotifications,
  MdMessage,
} from "react-icons/md";

import type { IconType } from "react-icons";

export type NavItem = {
  title: string;
  path: string;
  icon: IconType;
  canView: boolean;
};

export const navItems = (): NavItem[] => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
    canView: true,
  },
  {
    title: "Users",
    path: "/users",
    icon: MdPeople,
    canView: true,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: MdNotifications,
    canView: true,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: MdMessage,
    canView: true,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: MdSettings,
    canView: true,
  },
];
