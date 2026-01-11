export type Notification = {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  time: string;
};