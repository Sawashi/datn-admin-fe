import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import {
  Button,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
const { Title } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
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
          <Button type="primary">View</Button>{" "}
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
    address: "Post A",
    tags: "01/01/2024",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "Post B",
    tags: "02/01/2024",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Post C",
    tags: "03/01/2024",
  },
];
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "User",
    children: <Table columns={columns} dataSource={data} />,
  },
  {
    key: "2",
    label: "Admin",
    children: (
      <>
        <>
          <div style={{ marginBottom: "16px", textAlign: "right" }}>
            <Button type="primary" style={{ margin: "8px 0" }}>
              Create new post
            </Button>
          </div>
          <Table columns={columns} dataSource={data} />
        </>
      </>
    ),
  },
];
export default function PostList() {
  return (
    <>
      <Title level={2}>Manage posts</Title>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/posts")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
