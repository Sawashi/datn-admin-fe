import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { Button, Space, Table, TableProps, Tag } from "antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Typography } from "antd";
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
    title: "ID",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Role",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags === "good" ? (
          <Tag color="green">Good</Tag>
        ) : (
          <Tag color="red">Banned</Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "address", // Change to "address" to check admin status
    key: "address",
    render: (address, record) => {
      const isAdmin = address.toLowerCase() === "admin"; // Replace with your actual admin check logic
      return (
        <>
          {isAdmin ? null : record.tags === "good" ? (
            <Button type="primary" danger>
              Ban
            </Button>
          ) : (
            <Button type="primary">Unban</Button>
          )}
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
    address: "Admin",
    tags: "good",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "User",
    tags: "banned",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "User",
    tags: "good",
  },
];
export default function UserList() {
  return (
    <>
      <Title level={2}>Manage user</Title>
      <Table columns={columns} dataSource={data} />
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
        destination: `${redirectTo}?to=${encodeURIComponent("/users")}`,
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
