"use client";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className=" min-h-screen">
      <div className=" text-center text-gray-400 flex justify-center items-center">
        <div className="max-w-md">
          <p className="mb-5 font-semibold text-2xl">Page Not Found</p>
          <Link href="/" className="flex justify-center items-center">
            <button className="px-3 py-2 rounded-sm text-white hover:text-black bg-[#d52424] flex items-center text-center">
              <ArrowLeftFromLine />
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
