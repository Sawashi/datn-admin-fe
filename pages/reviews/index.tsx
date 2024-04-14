import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Button, Table, TableProps, Typography } from "antd";
const { Title } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
  content: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Author",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Date",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        <text>{tags}</text>
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "address", // Change to "address" to check admin status
    key: "address",
    render: () => {
      return (
        <>
          <Button type="primary" danger>
            Delete
          </Button>
        </>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "Dish A",
    tags: "01/01/2024",
    content: "This is a review",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "Dish B",
    tags: "02/01/2024",
    content: "This is a review",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Dish C",
    tags: "03/01/2024",
    content: "This is a review",
  },
];
export default function reviewList() {
  return (
    <>
      <Title level={2}>Manage reviews</Title>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/reviews")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
