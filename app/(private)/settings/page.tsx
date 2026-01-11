"use client";

import {
  MdDarkMode,
  MdLightMode,
  MdNotifications,
  MdLogout,
} from "react-icons/md";
import { Section } from "./components/Section";
import { ThemeButton } from "./components/ThemeButton";
import Typography from "@/components/ui/Typography";
import ShowLogoutModal from "@/components/side-nav/components/ShowLogoutModal";
import { useMemo, useState } from "react";
import { useTheme } from "@/app/context/theme-context";
import { FieldLabelText } from "@/components/ui/FormHelper";
import { Button } from "@/components/ui/Button";
import UpdateProfileModal from "../profile/components/UpdateProfileModal";
import useAuth from "@/app/hooks/use-auth";
import { defaultImages, formatDate } from "@/lib/constant";
import Link from "next/link";
import Image from "next/image";

const Settings = () => {
  const { authUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const contactInformation = useMemo(
    () => [
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
    [authUser]
  );

  return (
    <div className="space-y-4">
      <Typography variant="largeTextBold">Settings</Typography>

      <div className="grid md:grid-cols-3 items-center gap-5">
        {/* Appearance */}
        <Section
          icon={theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
          title="Appearance"
          description="Customize how the app looks"
        >
          <div className="flex gap-4">
            <ThemeButton
              active={theme === "light"}
              label="Light"
              onClick={() => setTheme("light")}
            />
            <ThemeButton
              active={theme === "dark"}
              label="Dark"
              onClick={() => setTheme("dark")}
            />
          </div>
        </Section>

        {/* Notifications */}
        <Section
          icon={<MdNotifications />}
          title="Notifications"
          description="Control how you receive updates"
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm">Receive email notifications</span>
          </label>
        </Section>

        {/* Danger */}
        <Section
          icon={<MdLogout />}
          title="Danger Zone"
          description="Irreversible actions"
        >
          <button
            className="bg-danger hover:bg-danger-hover text-white px-4 py-2 rounded-md"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        </Section>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div
          className="md:flex-[30%] flex flex-col justify-center items-center gap-5 rounded-xl border border-mid-grey p-3"
          style={{
            backgroundColor: "var(--background-50)",
            color: "var(--text-700)",
          }}
        >
          <Image
            src={defaultImages?.avatar}
            alt={authUser?.user?.name || "Avatar"}
            width={80}
            height={80}
            className="w-25 h-25 rounded-full object-cover border border-mid-grey mt-3"
          />

          <div className="text-center">
            <Typography variant={"mediumTextBold"}>
              {authUser?.user?.name}
            </Typography>
            <Link
              href="#"
              className="text-xs text-primary underline cursor-pointer"
            >
              {authUser?.user?.email}
            </Link>
          </div>

          <div
            className="space-y-1 text-center p-2 bg-[#F5F5F5] rounded-lg w-full"
            style={{
              backgroundColor: "var(--background-900)",
              color: "var(--text-50)",
            }}
          >
            <Typography variant={"xSmallText"} className="text-charcoal-gray">
              Date Added
            </Typography>
            <Typography variant={"smallText"} className="font-medium">
              {authUser?.user?.created_at
                ? formatDate(authUser?.user?.created_at)
                : "--"}
            </Typography>
          </div>
        </div>

        <div
          className="md:flex-[70%] p-4 rounded-2xl border border-mid-grey space-y-2"
          style={{
            backgroundColor: "var(--background-50)",
            color: "var(--text-700)",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
            <Typography variant={"mediumTextBold"}>
              Contact Person Information
            </Typography>

            <Button
              className="w-full md:w-auto"
              onClick={() => setShowUpdateProfileModal(true)}
            >
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {contactInformation.map((item) => (
              <div key={item.label} className="space-y-1">
                <FieldLabelText view label={item.label} />

                {item?.label === "Email" ? (
                  <Typography
                    as="a"
                    variant="smallText"
                    href={`mailto:${item?.value}`}
                    className="text-primary font-medium underline truncate"
                  >
                    {item?.value}
                  </Typography>
                ) : (
                  <Typography
                    variant="smallText"
                    className="font-medium truncate"
                  >
                    {item?.value}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {authUser?.user && (
        <UpdateProfileModal
          details={authUser?.user}
          showUpdateProfileModal={showUpdateProfileModal}
          setShowUpdateProfileModal={setShowUpdateProfileModal}
        />
      )}

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default Settings;
