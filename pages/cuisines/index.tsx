import {
  Button,
  Card,
  Image,
  Typography,
  Col,
  Row,
  Spin,
  notification,
} from "antd";
import TableCustom from "components/TableCustom";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import CuisineCreateModel from "@components/modals/cuisineCreateModal";
import { Cuisine, deleteCuisine, getAllCuisineData } from "src/apis/cuisines";
import { Dish } from "src/apis/dishes";
import EditCuisineModal from "@components/modals/cuisineEditModal";
import DishCreateModel from "@components/modals/dishCreateModal";

const { Title } = Typography;
export default function CuisineList() {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCreateDishVisible, setModalCreateDishVisible] = useState(false);
  const [data, setData] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAllCuisines = async () => {
      try {
        const rawData = await getAllCuisineData();
        setData(rawData);
      } catch (error) {
        console.log("Something went wrong when get user data");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchAllCuisines();
  }, []);
  const fetchAllCuisines = async () => {
    try {
      const rawData = await getAllCuisineData();
      setData(rawData);
    } catch (error) {
      console.log("Something went wrong when get user data");
    } finally {
      setLoading(false); // Set loading to false when data fetching is done
    }
  };
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const handleModalEditOpen = (cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    setModalEditVisible(true);
  };
  const handleModalCreateDishOpen = (cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    setModalCreateDishVisible(true);
  };
  const handleModalCreateDishCancel = () => {
    setModalCreateDishVisible(false);
  };

  const handleModalEditCancel = () => {
    setModalEditVisible(false);
  };
  const handleDeleteCuisine = async (cuisineId: number) => {
    try {
      await deleteCuisine(cuisineId);
      notification.success({
        message: "Cuisine Deleted",
        description: "The cuisine has been successfully deleted.",
      });
      fetchAllCuisines();
    } catch (error) {
      console.error("Error deleting cuisine:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete cuisine. Please try again later.",
      });
    }
  };
  const columns: ColumnsType<Dish> = [
    {
      title: "Image",
      key: "imageUrl",
      dataIndex: "imageUrl",
      render: (imgUrl) => <Image src={imgUrl} width={100} />,
    },
    {
      title: "Name",
      dataIndex: "dishName",
      key: "dishName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
  ];
  return (
    <>
      <Title level={2}>Manage Cuisines</Title>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Button
          type="primary"
          style={{ margin: "8px 0" }}
          onClick={() => {
            handleModalOpen();
          }}
        >
          Create a new cuisine
        </Button>
      </div>
      {loading ? ( // Render spinner while loading
        <Spin size="large" />
      ) : data.length > 0 ? (
        //data.map for empty array
        data.map((cuisine) => {
          return (
            <Card
              style={{
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ marginBottom: "16px", textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={() => handleModalEditOpen(cuisine)}
                >
                  Edit
                </Button>
                <text> </text>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeleteCuisine(cuisine.id)}
                >
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
                    <Image src={cuisine.imgUrl} width={400} />
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
                      <Title level={1}>{cuisine.name}</Title>
                    </Card>
                  </div>
                </Col>
              </Row>
              <Title level={3}>Dishes</Title>
              <div style={{ marginBottom: "16px", textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ margin: "8px 0" }}
                  onClick={() => {
                    handleModalCreateDishOpen(cuisine);
                  }}
                >
                  Create new dish
                </Button>
              </div>
              <TableCustom
                columns={columns}
                data={cuisine.dishes}
                hasEdit
                hasDelete
                onSelectedRow={() => {}}
                onEdit={(value) => {}}
              />
            </Card>
          );
        })
      ) : (
        <Title>Nothing to show</Title> // Fix: Add default value for columns
      )}

      <CuisineCreateModel
        visible={modalVisible}
        onCancel={handleModalCancel}
        onCreated={fetchAllCuisines}
      />
      <DishCreateModel
        visible={modalCreateDishVisible}
        onCancel={handleModalCreateDishCancel}
        cuisine={selectedCuisine}
        onCreated={fetchAllCuisines}
      />
      <EditCuisineModal
        visible={modalEditVisible}
        onCancel={handleModalEditCancel}
        cuisine={selectedCuisine}
        onRefresh={fetchAllCuisines}
      />
    </>
  );
}
