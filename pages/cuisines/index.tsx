import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import {
  Button,
  Card,
  Image,
  Layout,
  Table,
  TableProps,
  Typography,
  Flex,
  Col,
  Row,
} from "antd";

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
    title: "Author",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
    address: "Method A",
    tags: "01/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "Method B",
    tags: "02/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Method C",
    tags: "03/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];
export default function CuisineList() {
  return (
    <>
      <Title level={2}>Manage Cuisines</Title>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Button type="primary" style={{ margin: "8px 0" }}>
          Create a new cuisine
        </Button>
      </div>
      <Card>
        <div style={{ marginBottom: "16px", textAlign: "right" }}>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            {/* Content for the first half */}
            <div
              style={{
                height: "100%",
                textAlign: "center",
              }}
            >
              <Image
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                width={400}
              />
            </div>
          </Col>
          <Col span={12}>
            {/* Content for the second half */}
            <div
              style={{
                height: "100%",
                background: "#f0f0f0",
                textAlign: "center",
              }}
            >
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "none", // Remove the box shadow
                }}
                bordered={false}
              >
                <Title level={1}>Vietnam</Title>
              </Card>
            </div>
          </Col>
        </Row>
        <Title level={3}>Cooking methods</Title>
        <Table columns={columnsNew} dataSource={data} bordered={true} />
      </Card>
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
        destination: `${redirectTo}?to=${encodeURIComponent("/cuisines")}`,
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
