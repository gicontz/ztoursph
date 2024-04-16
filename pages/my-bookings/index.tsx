import Layout from "@components/pages/layout";
import PageTitle from "@components/pages/page-title";
import BannerImage from "@assets/images/sunsets.jpg";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const breadCrumbItems = [
  {
    title: (
      <Link href="/">
        <HomeOutlined />
      </Link>
    ),
  },
  {
    title: "My Bookings",
  },
];

const MyBookings = () => {
  return (
    <Layout>
      <PageTitle title="My Bookings" bgImage={BannerImage} />
      <div className="p-8 w-full max-w-[1400px] mx-auto">
        <Breadcrumb items={breadCrumbItems} />
      </div>
    </Layout>
  );
};

export default MyBookings;
