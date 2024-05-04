import Image from "next/image";
import logo from "@assets/images/logo.png";
import Link from "next/link";
import { MainFont } from "@app/layouts/font/font";
import styled from "@emotion/styled";
import { FullWidth } from "@components/commons/common";
import BannerImage from "@assets/images/banner.jpg";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen space-y-3">
      <div className="flex items-center justify-center space-x-3 ">
        <Image className="w-64 " src={logo} alt={"Ztours"} />
        <p className={`text-6xl ${MainFont.className}`}>404</p>
      </div>
      <p className={`text-3xl ${MainFont.className}`}>
        This Page Doesn&apos;t Exist
      </p>
      <div className="flex space-x-2">
        <Link
          href={"/"}
          className={`text-md text-scheme-green hover:underline ${MainFont.className}`}>
          Go Home
        </Link>
        <Link
          onClick={() => history.back()}
          className={`text-md text-scheme-green cursor-pointer hover:underline ${MainFont.className}`}
          href={""}>
          Go Back
        </Link>
      </div>
    </div>
  );
}
