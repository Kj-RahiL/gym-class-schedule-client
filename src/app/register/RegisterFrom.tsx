/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLogInMutation, useSignUpMutation } from "@/redux/features/Auth/authApi";
import { logOut, setLoginUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Link } from "@nextui-org/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [login] = useLogInMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const registerData = {
      name:form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      
    };
    try {
      dispatch(logOut());
      const response = await signUp(registerData).unwrap();

      toast.success(response.message, {
        duration: 4000,
        style: { color: "green" },
      });
      // navigate("/");

      // login
      const userInfo = {
        email: registerData.email,
        password: registerData.password,
      };
      const res = await login(userInfo).unwrap();
      const token = res.token
      const user = verifyToken(token)

      dispatch(setLoginUser({user, token}))
      toast.success("Logged In Successful", { duration: 4000 });
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(`Error: ${err.data.message || "Sign-up failed"}`, {
        duration: 4000,
        style: { color: "red" },
      });
      console.log({ err });
    }
  };

  return (
      <div className="backdrop-blur-md w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 md:p-8 lg:p-10 rounded border border-gray-500/30 shadow-lg mx-auto bg-gray-800">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            Register Here!
          </h1>

          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white text-sm md:text-base">
               Full Name
              </span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              className="input-field"
              required
            />
          </div>
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
              className="w-full btn"
            >
              Register
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm md:text-base">
              Already have an account !{" "}
              <Link
                href="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login Your account
              </Link>
            </p>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
