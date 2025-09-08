"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, selectAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    dispatch(login(data))
      .unwrap()
      .then(() => router.push("/"))
      .catch(() => {});
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 underline">
          Register
        </a>
      </p>
    </div>
  );
}
