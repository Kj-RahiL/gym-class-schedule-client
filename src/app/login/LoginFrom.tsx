/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLogInMutation } from "@/redux/features/Auth/authApi";
import { setLoginUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Link } from "@nextui-org/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isError, isLoading }] = useLogInMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const userInfo = {
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const res = await login(userInfo).unwrap();
      console.log(res);
      const token = res.token;
      const user = verifyToken(token);
      console.log(user);

      dispatch(setLoginUser({ user, token }));
      toast.success("Logged In Successful", { duration: 4000 });
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "login failed");
    }
  };

  const handleCredentialFill = (role: "trainer" | "admin") => {
    const emailInput = document.querySelector<HTMLInputElement>(
      "input[name='email']"
    );
    const passwordInput = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    );
    if (role === "trainer") {
      if (emailInput) emailInput.value = "abcd@gmail.com";
      if (passwordInput) passwordInput.value = "123456";
    } else if (role === "admin") {
      if (emailInput) emailInput.value = "rahiilarham@gmail.com";
      if (passwordInput) passwordInput.value = "123456";
    }
  };

  return (
    <div className="backdrop-blur-md w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 md:p-8 lg:p-10 rounded border border-gray-500/30 shadow-lg mx-auto ">
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          Login Now!
        </h1>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => handleCredentialFill("trainer")}
            className="border border-[#13ffaa] text-[#13ffaa] px-4 py-2 rounded font-medium hover:bg-[#01482d] hover:text-white hover:border-0 "
          >
            Trainer Credential
          </button>
          <button
            type="button"
            onClick={() => handleCredentialFill("admin")}
            className="border border-[#13ffaa] text-[#13ffaa] px-4 py-2 rounded font-medium hover:bg-[#01482d] hover:text-white hover:border-none"
          >
            Admin Credential
          </button>
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
          <button type="submit" className="btn w-full">
            {isLoading ? "Logging in..." : "Login"}
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
