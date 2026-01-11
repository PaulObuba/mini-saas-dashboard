"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Typography from "@/components/ui/Typography";

const ForgotPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type FormType = yup.InferType<typeof schema>;

  const onSubmit = async (data: FormType) => {
    console.log("Password reset requested for:", data.email);

    // mock success
    alert("Password reset link sent to your email");
    router.push("/auth/login");
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--background-900)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border shadow-lg p-8"
        style={{
          backgroundColor: "var(--background-100)",
          color: "var(--text-900)",
          borderColor: "var(--background-50)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <Typography
            variant="capitalizedTextSemibold"
            className="inline-block px-4 py-1 rounded-full border"
            style={{
              borderColor: "var(--background-50)",
              color: "var(--text-700)",
            }}
          >
            Reset password
          </Typography>

          <Typography variant="heading4Bold">Forgot your password?</Typography>

          <Typography variant="smallText" style={{ color: "var(--text-700)" }}>
            Enter your email and we’ll send you a reset link
          </Typography>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          <Button className="w-full text-white" disabled={isSubmitting}>
            Send reset link
          </Button>

          <Typography
            variant="smallText"
            className="text-center"
            style={{ color: "var(--text-700)" }}
          >
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Back to login
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});
