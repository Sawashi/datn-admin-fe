import { Button, Table, TableProps, Tag, Spin, notification } from "antd";
import { Typography } from "antd";
import { changeUserStatus, getAllUserData, User } from "src/apis/users";
import { useEffect, useState } from "react";
import TableCustom from "components/TableCustom";
const { Title } = Typography;

export default function UserList() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllUser = async () => {
    try {
      setLoading(true); // Start loading
      const rawData = await getAllUserData();
      setData(rawData);
    } catch (error) {
      console.error("Something went wrong when getting user data");
      notification.error({
        message: "Something went wrong when getting user data",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleBan = async (userId: number, status: boolean) => {
    try {
      await changeUserStatus(userId, status);
      notification.success({
        message: status ? "Unbanned user" : "Banned user",
      });
      fetchAllUser(); // Re-fetch data after status change
    } catch (error) {
      console.error("Something went wrong, try again");
      notification.error({
        message: "Something went wrong, try again",
      });
    }
  };

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
          {status === "good" && <Tag color="green">Good</Tag>}
          {status === "banned" && <Tag color="red">Banned</Tag>}
          {status === null && <Tag color="gray">Unknown</Tag>}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "role",
      key: "role",
      render: (role, record) => {
        const isAdmin = role === "admin";
        return isAdmin ? null : (
          <>
            {record.status === "good" || record.status === null ? (
              <Button
                type="primary"
                danger
                onClick={() => handleBan(Number(record.id), false)}
              >
                Ban
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => handleBan(Number(record.id), true)}
              >
                Unban
              </Button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Title level={2}>Manage user</Title>
      {loading ? (
        <Spin size="large" />
      ) : data.length > 0 ? (
        <TableCustom
          columns={columns || []}
          data={data}
          hasEdit
          hasDelete
          onSelectedRow={() => {}}
          onEdit={(value) => {}}
        />
      ) : (
        <Table columns={columns || []} />
      )}
    </>
  );
}
