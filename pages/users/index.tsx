import {
	Button,
	Table,
	TableProps,
	Tag,
	Spin,
	notification,
	message,
	Space,
} from "antd";
import { Typography } from "antd";
import {
	changeUserRole,
	changeUserStatus,
	getAllUserData,
	User,
} from "src/apis/users";
import { useEffect, useState } from "react";
import TableCustom from "components/TableCustom";
import UserRoleSwitch from "@components/customSwitch/userRoleSwitch";
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
	const makeUser = async (userId: number) => {
		try {
			await changeUserRole(userId, "user");
			message.success("Given user role as user");
			await fetchAllUser();
		} catch (error) {
			message.error("Failed to update user role");
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
			width: 50,
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "username",
			key: "username",
			//render: (text) => <a>{text}</a>,
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: (role, record) => {
				return (
					<>
						{/* {role === "admin" ? (
              <Tag color="purple">Admin</Tag>
            ) : role === "user" ? (
              <Tag color="blue">User</Tag>
            ) : (
              <Tag color="gray"></Tag>
            )} */}

						{role != "admin" && role != "user" && (
							<>
								<Tag color="gray">unknown</Tag>
								<Button onClick={() => makeUser(parseInt(record.id))}>
									Make User
								</Button>
							</>
						)}
						{role == "admin" ? (
							<UserRoleSwitch user={record} refreshData={() => {}} />
						) : null}
						{role == "user" ? (
							<UserRoleSwitch user={record} refreshData={() => {}} />
						) : null}
					</>
				);
			},
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (status) => (
				<>
					{status === "good" && <Tag color="green">Good</Tag>}
					{status === "banned" && <Tag color="red">Banned</Tag>}
					{status === null && <Tag color="gray"></Tag>}
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
