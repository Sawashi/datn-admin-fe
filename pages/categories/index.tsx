import { Button, Image, Layout, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import UploadModal from "@components/modals/imageUploader";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
  ingredents: string;
  image: string;
}
const columnsNew: TableProps<DataType>["columns"] = [
  {
    title: "Image",
    key: "image",
    dataIndex: "image",
    render: (image) => <Image src={image} width={100} />,
  },
  {
    title: "Name",
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
    address: "Category A",
    tags: "01/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "Category B",
    tags: "02/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Category C",
    tags: "03/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];
export default function categorieList() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Title level={2}>Manage categories</Title>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Button
          type="primary"
          style={{ margin: "8px 0" }}
          onClick={handleModalOpen}
        >
          Create a new categorie
        </Button>
      </div>
      <Table columns={columnsNew} dataSource={data} bordered={true} />
      <UploadModal visible={modalVisible} onCancel={handleModalCancel} />
    </>
  );
}
