"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signup, selectAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    dispatch(signup(data))
      .unwrap()
      .then(() => router.push("/"))
      .catch(() => {});
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
      </p>
    </div>
  );
}
