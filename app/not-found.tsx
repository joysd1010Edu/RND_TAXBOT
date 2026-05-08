"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useEffect } from "react";
import { useErrorPage } from "@/components/Providers/ErrorPageProvider";

//========== 404 Not Found Page ===========
const NotFound = () => {
  const { setIsErrorPage } = useErrorPage();

  useEffect(() => {
    setIsErrorPage(true);
    return () => setIsErrorPage(false);
  }, [setIsErrorPage]);

  return (
    <div className="min-h-screen bg-linear-to-br  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/*========= Left Content =========*/}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Oops....
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700">
              Page not found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
              This Page doesn&apos;t exist or was removed!
              <br />
              We suggest you back to home.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <MdArrowBack size={20} />
              <span>Back to home</span>
            </Link>
          </div>

          {/*========= Right Illustration =========*/}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-lg">
              <img src="/404.png" alt="404 Error" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
