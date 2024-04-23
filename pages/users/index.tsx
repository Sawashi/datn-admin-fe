import { Button, Table, TableProps, Tag, Spin } from "antd";
import { Typography } from "antd";
import { getAllUserData, User } from "src/apis/users";
import { useEffect, useState } from "react";
import TableCustom from "components/TableCustom";
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
      const isAdmin = role === "admin"; // Replace with your actual admin check logic
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
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const rawData = await getAllUserData();
        setData(rawData); // Fix: Pass an array of users to setData
      } catch (error) {
        console.log("Something went wrong when get user data");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchAllUser();
  }, []);

  return (
    <>
      <Title level={2}>Manage user</Title>
      {loading ? ( // Render spinner while loading
        <Spin size="large" />
      ) : data.length > 0 ? (
        <TableCustom
          columns={columns || []} // Fix: Add default value for columns
          data={data}
          hasEdit
          hasDelete
          onSelectedRow={() => {}}
          onEdit={(value) => {}}
        />
      ) : (
        <Table columns={columns || []} /> // Fix: Add default value for columns
      )}
    </>
  );
}
