import { Button, Image, Table, TableProps, Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
  ingredents: string;
  image: string;
}

const columns: TableProps<DataType>["columns"] = [
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
    title: "Title",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Ingredents",
    dataIndex: "ingredents",
    key: "Ingredents",
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
          <Link href="/reviews">
            <Button type="primary">View</Button>{" "}
          </Link>

          <Button type="primary" danger>
            Delete
          </Button>
        </>
      );
    },
  },
];

export default function RecipesList() {
  return (
    <>
      <Title level={2}>List of recipes</Title>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Button type="primary" style={{ margin: "8px 0" }}>
          Create recipes
        </Button>
      </div>
      <Table columns={[]} dataSource={[]} />
    </>
  );
}
