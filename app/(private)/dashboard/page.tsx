"use client";

import { MetricsCard, MetricsCardLoader } from "@/components/ui/MetricsCard";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { useEffect, useState } from "react";
import { MdBusiness, MdHealthAndSafety, MdPeople } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DashboardMetrics = {
  total_subscriptions: number;
  total_patients: number;
  total_healthcare_providers: number;
};

export default function Dashboard() {
  const [dashboardMetrics, setDashboardMetrics] =
    useState<DashboardMetrics | null>(null);
  const [chartData, setChartData] = useState<
    { month: string; users: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const ALL_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const normalizedChartData = ALL_MONTHS.map((month) => {
    const found = chartData.find((item) => item.month === month);
    return {
      month,
      users: found?.users ?? 0,
    };
  });

  const metrics = [
    {
      title: "Active Subscriptions",
      icon: (
        <MdHealthAndSafety
          className="text-[#14DBA3] bg-[#DCFFDD] p-1.5 rounded-lg"
          size={30}
        />
      ),
      count: dashboardMetrics?.total_subscriptions?.toLocaleString() || "0",
    },
    {
      title: "Registered Patients",
      icon: (
        <MdPeople
          className="text-[#14DBA3] bg-[#DCFFDD] p-1.5 rounded-lg"
          size={30}
        />
      ),
      count: dashboardMetrics?.total_patients?.toLocaleString() || "0",
    },
    {
      title: "Healthcare Providers",
      icon: (
        <MdBusiness
          className="text-[#14DBA3] bg-[#DCFFDD] p-1.5 rounded-lg"
          size={30}
        />
      ),
      count:
        dashboardMetrics?.total_healthcare_providers?.toLocaleString() || "0",
    },
  ];

  // Mock API call
  useEffect(() => {
    const fetchData = () => {
      const stats = {
        total_subscriptions: 1240,
        total_patients: 540,
        total_healthcare_providers: 12,
      };
      setDashboardMetrics(stats);

      const chart = [
        { month: "Jan", users: 800 },
        { month: "Feb", users: 900 },
        { month: "Mar", users: 1000 },
        { month: "Apr", users: 1100 },
        { month: "May", users: 1200 },
        { month: "Jun", users: 1240 },
        { month: "Jul", users: 1300 },
        { month: "Aug", users: 1380 },
        { month: "Sep", users: 1450 },
        { month: "Oct", users: 1520 },
        { month: "Nov", users: 1600 },
        { month: "Dec", users: 1700 },
      ];

      setChartData(chart);

      setIsLoading(false);
    };

    setTimeout(fetchData, 500);
  }, []);

  return (
    <div className="space-y-8">
      {/* Metrics cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <MetricsCardLoader key={index} />
            ))
          : metrics?.map((item, index) => (
              <MetricsCard
                key={index}
                title={item?.title}
                icon={item?.icon}
                value={item?.count}
              />
            ))}
      </div>

      {/* Chart */}
      <div
        className="p-6 rounded-2xl shadow"
        style={{
          backgroundColor: "var(--background-50)",
          color: "var(--text-700)",
        }}
      >
        <h2 className="text-sm font-medium mb-4">User Growth</h2>
        {isLoading ? (
          <SkeletonLoader className="h-72 w-full rounded-xl animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={normalizedChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
