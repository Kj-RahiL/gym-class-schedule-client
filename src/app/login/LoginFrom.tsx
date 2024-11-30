/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Link } from "@nextui-org/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const userInfo = {
      email: form.email.value,
      password: form.password.value,
    };
  };

  return (
      <div className="backdrop-blur-md w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 md:p-8 lg:p-10 rounded border border-gray-500/30 shadow-lg mx-auto ">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            Login Now!
          </h1>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-sm md:text-base">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-sm md:text-base">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full"
            >
              Login
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm md:text-base">
              New here?{" "}
              <Link
                href="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
