import { Poppins, Source_Serif_4 } from "next/font/google";

export const MainFont = Poppins({
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const secondaryFont = Source_Serif_4({
  weight: "700",
  subsets: ["latin"],
});

export const primaryColor = "#23432c";
