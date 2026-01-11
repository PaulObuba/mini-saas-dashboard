"use client";

import useAuth from "@/app/hooks/use-auth";
import { Button } from "@/components/ui/Button";
import LineThrough from "@/components/ui/LineThrough";
import { defaultImages, formatDate } from "@/lib/constant";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import UpdateProfileModal from "./components/UpdateProfileModal";
import Typography from "@/components/ui/Typography";

const Profile = () => {
  const { authUser } = useAuth();

  const user = {
    name: `${authUser?.user?.first_name} ${authUser?.user?.last_name}`,
    email: authUser?.user?.email,
    location: authUser?.user?.country ?? "",
    verified: true,
    photo: "",
    personalInfo: [
      {
        label: "First Name",
        value: authUser?.user?.first_name,
      },
      {
        label: "Last Name",
        value: authUser?.user?.last_name,
      },
      {
        label: "Email",
        value: authUser?.user?.email,
      },
      {
        label: "Phone Number",
        value: authUser?.user?.phone || "--",
      },
      {
        label: "Date of Birth",
        value: formatDate(authUser?.user?.dateOfBirth || "") || "--",
      },
      {
        label: "Gender",
        value: authUser?.user?.gender || "--",
      },
      {
        label: "Country",
        value: authUser?.user?.country || "--",
      },
      {
        label: "State",
        value: authUser?.user?.state || "--",
      },
    ],
  };

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  return (
    <div
      className="space-y-4"
      style={{
        color: "var(--text-700)",
      }}
    >
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div
        className="rounded-2xl p-6 flex items-center gap-6 border border-gray-200 shadow-sm"
        style={{
          backgroundColor: "var(--background-50)",
          color: "var(--text-700)",
        }}
      >
        <Image
          src={user.photo || defaultImages?.avatar}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full object-cover border"
        />

        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-semibold">{user.name}</h2>

          <a
            href={`mailto:${user.email}`}
            className="text-sm text-primary font-medium underline hover:opacity-80 mt-1"
          >
            {user.email}
          </a>

          <span className="text-sm text-gray-400 mt-2">{user.location}</span>
        </div>

        {user.verified && (
          <FaCheckCircle className="text-green-500 w-6 h-6" title="Verified" />
        )}
      </div>

      <div
        className="rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm"
        style={{
          backgroundColor: "var(--background-50)",
          color: "var(--text-700)",
        }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold">Personal Information</h3>

          <Button onClick={() => setShowUpdateProfileModal(true)}>Edit</Button>
        </div>

        <LineThrough />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {user?.personalInfo?.map((item, index) => (
            <div key={index} className="space-y-1">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {item?.label}
              </span>

              {item?.label === "Email" ? (
                <div>
                  <Typography className="text-sm font-medium text-primary underline hover:opacity-80 truncate">
                    {item?.value}
                  </Typography>
                </div>
              ) : (
                <p className="text-sm font-medium  truncate">{item?.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {authUser?.user && (
        <UpdateProfileModal
          details={authUser?.user}
          showUpdateProfileModal={showUpdateProfileModal}
          setShowUpdateProfileModal={setShowUpdateProfileModal}
        />
      )}
    </div>
  );
};

export default Profile;
