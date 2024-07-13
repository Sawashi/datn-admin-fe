import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, message, Card } from "antd";
import { getTaboos, createTaboo, deleteTaboo, Taboo } from "src/apis/taboos";

interface TabooManagerProps {
	refreshData: () => void;
}

const TabooManager: React.FC<TabooManagerProps> = ({ refreshData }) => {
	const [taboos, setTaboos] = useState<Taboo[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [form] = Form.useForm();

	useEffect(() => {
		fetchTaboos();
	}, []);

	const fetchTaboos = async () => {
		try {
			const data = await getTaboos();
			setTaboos(data);
		} catch (error) {
			message.error("Failed to load taboos");
		} finally {
			setLoading(false);
		}
	};

	const handleAddTaboo = async (values: { word: string }) => {
		try {
			const newTaboo = await createTaboo(values.word);
			setTaboos([...taboos, newTaboo]);
			setIsModalVisible(false);
			form.resetFields();
			message.success("Taboo added successfully");
			refreshData();
		} catch (error) {
			message.error("Failed to add taboo");
		}
	};

	const handleDeleteTaboo = async (id: number) => {
		try {
			await deleteTaboo(id);
			setTaboos(taboos.filter((taboo) => taboo.id !== id));
			message.success("Taboo deleted successfully");
			refreshData();
		} catch (error) {
			message.error("Failed to delete taboo");
		}
	};

	const filteredTaboos = taboos.filter((taboo) =>
		taboo.word.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const columns = [
		{
			title: "Word",
			dataIndex: "word",
			key: "word",
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: Taboo) => (
				<Button danger onClick={() => handleDeleteTaboo(record.id)}>
					Delete
				</Button>
			),
		},
	];

	return (
		<Card>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "20px",
				}}
			>
				<Input
					placeholder="Search Taboo"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ width: "200px" }}
				/>
				<Button type="primary" onClick={() => setIsModalVisible(true)}>
					Add Taboo
				</Button>
			</div>
			<Table
				columns={columns}
				dataSource={filteredTaboos}
				rowKey="id"
				loading={loading}
				style={{ marginTop: 16 }}
			/>
			<Modal
				title="Add New Taboo"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Form form={form} onFinish={handleAddTaboo}>
					<Form.Item
						name="word"
						rules={[
							{ required: true, message: "Please input the taboo word!" },
						]}
					>
						<Input placeholder="Taboo Word" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Add
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default TabooManager;
