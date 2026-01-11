"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { USER_KEY } from "@/lib/auth";
import AuthenticationContext from "@/app/context/authentication-context";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import TextInput from "@/components/ui/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "@/components/ui/Typography";

const Login = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthenticationContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  type CreateSchemaType = yup.InferType<typeof schema>;

  const onSubmit = (data: CreateSchemaType) => {
    const user = {
      name: "Paul Obuba",
      first_name: "Paul",
      last_name: "Obuba",
      email: data.email,
      gender: "",
      country: "",
      title: "",
      dateOfBirth: "",
      phone: "",
      country_code: "",
      state: "",
      address: "",
      profilePicture: "",
      created_at: new Date().toISOString(),
    };

    const token = "123456789";
    const authData = { user, token };

    localStorage.setItem(USER_KEY, JSON.stringify(authData));
    setAuthUser(authData);
    router.push("/dashboard");
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
        <div className="text-center mb-8 space-y-2">
          <Typography
            variant="capitalizedTextSemibold"
            className="inline-block px-4 py-1 rounded-full border"
            style={{
              borderColor: "var(--background-50)",
              color: "var(--text-700)",
            }}
          >
            Log in
          </Typography>

          <Typography variant="heading4Bold">Welcome back 👋</Typography>

          <Typography variant="smallText" style={{ color: "var(--text-700)" }}>
            Login to continue to your dashboard
          </Typography>
        </div>

        {/* Form */}
        <form noValidate className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            required
          />

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              <span style={{ color: "var(--text-700)" }}>Remember me</span>
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full text-white">Sign in</Button>

          <Typography
            variant="smallText"
            className="text-center"
            style={{ color: "var(--text-700)" }}
          >
            Don’t have an account?{" "}
            <Link
              href="#"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
