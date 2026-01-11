"use client";

import Link from "next/link";
import Typography from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{
        backgroundColor: "var(--background-900)",
        color: "var(--text-900)",
      }}
    >
      <Typography
        variant="displayHeadingSuperBold"
        className="text-[120px] text-primary mb-4"
      >
        404
      </Typography>

      <Typography variant="heading3Bold" className="mb-2 text-center">
        Page Not Found
      </Typography>

      <Typography
        variant="mediumText"
        className="mb-6 text-center"
        style={{ color: "var(--text-700)" }}
      >
        Sorry, the page you are looking for does not exist.
      </Typography>

      <Link href="/dashboard">
        <Button
          className="px-6 py-3"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--text-900)",
          }}
        >
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
