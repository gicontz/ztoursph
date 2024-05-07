import Layout from "@components/pages/layout";
import PageTitle from "@components/pages/page-title";
import BannerImage from "@assets/images/sunsets.jpg";
import { Breadcrumb, Breakpoint, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppRoutes } from "@constants/nav";
import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "@app/services/booking";
import { toCurrency } from "@app/utils/helpers/strings";
import Loading from "@components/commons/loading";
import { format } from "date-fns";

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
  const router = useRouter();
  const userEmail: string =
    typeof window !== "undefined" ? localStorage.getItem("email") ?? "" : "";

  const { data: records, isLoading } = useQuery({
    queryKey: ["bookings", userEmail],
    queryFn: () => getUserBookings(userEmail),
  });

  const bookings = records?.data?.map((record) => ({
    id: record.id,
    referenceId: record.reference_id,
    date: record.created_date,
    paymentStatus: record.paymentStatus,
    totalAmt: record.total_amt,
  }));

  const columns = [
    {
      title: "Reference ID",
      dataIndex: "referenceId",
      key: "referenceId",
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: "Booking Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{format(new Date(text), "dd MMM yyyy")}</span>,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      key: "totalAmt",
      responsive: ["md"] as Breakpoint[],
      render: (text) => <span>{toCurrency(text)}</span>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => {
        return text === "Paid" ? (
          <span className="py-1 px-2 bg-green-200 border border-green-600 text-green-600">
            {text}
          </span>
        ) : (
          <span className="py-1 px-2 border border-yellow-600 bg-yellow-200 text-yellow-600">
            {text}
          </span>
        );
      },
    },
  ];

  const handleRowClick = (id) => () => {
    router.replace(`${AppRoutes.BOOKING_CONFIRMATION}?id=${id}`);
  };

  return (
    <Layout>
      <PageTitle title="My Bookings" bgImage={BannerImage} />
      <div className="p-8 w-full max-w-[1400px] mx-auto">
        <Breadcrumb items={breadCrumbItems} />
        <div className="mt-8 relative">
          <p className="max-w-[800px] text-center mx-auto mb-12 text-sm lg:text-base">
            <strong>Disclaimer: </strong>{" "}
            <span>
              We save your data on your device, please do not clear your browser
              data if you wish to retrieve your historical bookings. Otherwise,
              we can retrieve it once you re-book with us
            </span>
          </p>
          <Table
            dataSource={bookings}
            columns={columns as any}
            onRow={(record) => ({
              accessKey: record.referenceId,
              onClick: handleRowClick(record.id),
            })}
          />
          <div className="flex justify-center absolute w-full -mt-32">
            {isLoading && <Loading />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
