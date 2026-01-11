import React from "react";

export const MetricsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode; // Accept a React Node
}) => {
  return (
    <div
      className="space-y p-3 rounded-2xl border"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="flex justify-between items-center gap-5">
        <p className="text- font-medium">{title}</p>
        <div className="inline-block rounded-lg p-1.5">{icon}</div>
      </div>

      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};

// Loader stays the same
export const MetricsCardLoader = () => {
  return (
    <div
      className="space-y-3 p-3 rounded-2xl border border-mid-grey animate-pulse"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="flex justify-between items-center gap-5">
        <div className="h-5 w-24 bg-gray-300 rounded-md" />
        <div className="h-7 w-7 bg-gray-300 rounded-lg" />
      </div>

      <div className="h-5 w-32 bg-gray-300 rounded-md" />
    </div>
  );
};
