import { Button, Image, Spin, Table, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import CuisineCreateModel from "@components/modals/cuisineCreateModal";
import {
  Category,
  deleteCategory,
  getAllCategoryData,
} from "src/apis/categories";
import CategoryCreateModel from "@components/modals/categoryCreateModal";

const { Title } = Typography;

export default function categorieList() {
  const [data, setData] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchAllCategories = async () => {
    try {
      const rawData = await getAllCategoryData();
      setData(rawData); // Fix: Pass an array of users to setData
    } catch (error) {
      console.log("Something went wrong when get user data");
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      notification.success({
        message: "Category Deleted",
        description: "The category has been successfully deleted.",
      });
      fetchAllCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete category. Please try again later.",
      });
    }
  };
  const columnsNew = [
    {
      title: "Image",
      key: "imgUrl",
      dataIndex: "imgUrl",
      render: (image: string) => <Image src={image} width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Category) => {
        return (
          <>
            <Button type="primary">View</Button>{" "}
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteCategory(record.id);
              }}
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
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columnsNew} dataSource={data} bordered={true} />
      )}
      <CategoryCreateModel
        visible={modalVisible}
        onCancel={handleModalCancel}
        fetchData={fetchAllCategories}
      />
    </>
  );
}
