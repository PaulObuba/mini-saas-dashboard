"use client";

import { useEffect, useState } from "react";
import {
  NotificationCard,
  NotificationCardLoader,
} from "./components/NotificationCard";
import { mockNotifications } from "@/lib/mock-data";
import { Notification } from "@/app/types/notification";
import Typography from "@/components/ui/Typography";
import EmptyState from "@/components/ui/EmptyState";

export const fetchNotification = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 1200);
  });
};

const NotificationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 0);

    fetchNotification()
      .then((data) => setNotifications(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography variant="largeTextBold">Notifications</Typography>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <NotificationCardLoader key={index} />
          ))}
        </div>
      ) : notifications.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notifications.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
              onClick={() => markAsRead(item.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Notifications"
          description="You have no notifications yet."
          buttonText="Add User"
          onButtonClick={() => {}}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
