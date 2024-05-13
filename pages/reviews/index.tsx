import { Button, Spin, Table, TableProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { Review, getAllReviewData } from "src/apis/reviews";
const { Title } = Typography;

const columns: TableProps<Review>["columns"] = [
  {
    title: "Author",
    dataIndex: "user",
    key: "user",
    render: (user) => <a>{user.username}</a>,
  },

  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Updated at",
    key: "updatedAt",
    dataIndex: "updatedAt",
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

export default function reviewList() {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAllCuisines = async () => {
      try {
        const rawData = await getAllReviewData();
        setData(rawData);
        console.log(rawData);
      } catch (error) {
        console.log("Something went wrong when get user data");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchAllCuisines();
  }, []);
  return (
    <>
      <Title level={2}>Manage reviews</Title>

      {loading ? ( // Render spinner while loading
        <Spin size="large" />
      ) : data.length > 0 ? (
        <Table columns={columns} dataSource={data} />
      ) : (
        <Title>Nothing to show</Title> // Fix: Add default value for columns
      )}
    </>
  );
}
