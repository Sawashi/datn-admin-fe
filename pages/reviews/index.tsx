import {
  Button,
  Spin,
  Table,
  TableProps,
  Typography,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { Review, deleteReview, getAllReviewData } from "src/apis/reviews";
const { Title } = Typography;

export default function reviewList() {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAllCReviews = async () => {
      try {
        const rawData = await getAllReviewData();
        console.log("rawData: ", rawData);
        setData(rawData);
      } catch (error) {
        console.log("Something went wrong when get review data");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchAllCReviews();
  }, []);
  const fetchAllCReviews = async () => {
    try {
      const rawData = await getAllReviewData();
      setData(rawData);
    } catch (error) {
      console.log("Something went wrong when get review data");
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };
  //handle delete review
  const handleDeleteCuisine = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      notification.success({
        message: "Review Deleted",
        description: "The review has been successfully deleted.",
      });
      fetchAllCReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete review. Please try again later.",
      });
    }
  };
  const columns: TableProps<Review>["columns"] = [
    {
      title: "Dish name",
      key: "dish",
      render: (record) => <a>{record.dish.dishName}</a>,
    },
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
      render: (record) => {
        return (
          <>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteCuisine(record.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

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
