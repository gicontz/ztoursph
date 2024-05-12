import Image from "next/image";
import logo from "@assets/images/logo.png";
import Link from "next/link";
import { ArrowLongLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { MainFont } from "@app/layouts/font/font";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { TagLeftIcon } from "@chakra-ui/react";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen space-y-3">
      <div className="flex flex-col text-center justify-center space-x-3 ">
        <Image className="w-64 " src={logo} alt={"Ztours"} />
      </div>
      <p className={`text-3xl ${MainFont.className}`}>
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={router.back}
          className={`flex items-center space-x-1 border border-gray-400 rounded p-2 text-md text-gray-500 cursor-pointer hover:opacity-80 ${MainFont.className}`}
        >
            <ArrowLongLeftIcon className="w-6 h-6"/>
          <span>Go Back</span>
        </button>
        <Link
          href={"/"}
          className={`flex items-center space-x-1.5 border border-gray-400 bg-green-700 text-white rounded p-2 text-md text-scheme-green cursor-pointer hover:opacity-80  ${MainFont.className}`}
        >
          <HomeIcon className="w-6 h-6"/>
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
