import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { Button, Image, Table, TableProps, Typography } from "antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
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
import { useRouter } from "next/router";
import Link from "next/link";
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
          <Button type="primary">Approve</Button>{" "}
          <Button type="primary" danger>
            Ignore
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
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "Post B",
    tags: "02/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Post C",
    tags: "03/01/2024",
    ingredents: "A, B, C",
    image:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];
export default function RecipesList() {
  return (
    <>
      <Title level={2}>Manage posts</Title>
      <Title level={4}>Pending recipes</Title>
      <Table columns={columnsNew} dataSource={data} />
      <Title level={4}>List of recipes</Title>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Button type="primary" style={{ margin: "8px 0" }}>
          Create new post
        </Button>
      </div>
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
        destination: `${redirectTo}?to=${encodeURIComponent("/recipes")}`,
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
