import MainPageHeader from "@components/tour-header/main-page";
import TestImageA from "@assets/images/tour_a.jpg";
import TestImageB from "@assets/images/tour_b.jpg";
import TestImageC from "@assets/images/tour_c.jpg";

export default function Tours() {
  const dummyData = [
    {
      src: TestImageA,
      alt: "ImageTest",
    },
    {
      src: TestImageB,
      alt: "ImageTest",
    },
    {
      src: TestImageC,
      alt: "ImageTest",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: TestImageB,
      alt: "ImageTest",
    },
    {
      src: TestImageC,
      alt: "ImageTest",
    },
  ];

  const Inclusion = [
    "Labore et dolore",
    "Sed do eiusmod tempor ",
    "Ullamco laboris",
  ];

  const data = {
    title: "El Nido Tour A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    inclusion: Inclusion,
    price: 1000,
    images: dummyData,
  };
  return <MainPageHeader data={data} />;
}
