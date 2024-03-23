import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { Button, Space, Table, TableProps, Tag } from "antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Typography } from "antd";
import { getAllUserData, User } from "src/apis/users";
import { useEffect, useState } from "react";
const { Title } = Typography;

const columns: TableProps<User>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <>
        {status === "good" ? (
          <Tag color="green">Good</Tag>
        ) : (
          <Tag color="red">Banned</Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "role", // Change to "role" to check admin status
    key: "role",
    render: (role, record) => {
      const isAdmin = role.toLowerCase() === "admin"; // Replace with your actual admin check logic
      return (
        <>
          {isAdmin ? null : record.status === "good" ? (
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

export default function UserList() {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const rawData = await getAllUserData();
        console.log("Raw data: ", rawData); // Fix: Log the raw data to see the structure
        setData(rawData); // Fix: Pass an array of users to setData
      } catch (error) {
        console.log("Something went wrong when get user data");
      }
    };
    fetchAllUser();
  }, []);
  return (
    <>
      <Title level={2}>Manage user</Title>
      {data.length > 0 ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <Table columns={columns} />
      )}
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
