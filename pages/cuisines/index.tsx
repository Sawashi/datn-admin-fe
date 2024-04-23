import { Button, Card, Image, Typography, Col, Row, Spin } from "antd";
import TableCustom from "components/TableCustom";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import CuisineCreateModel from "@components/modals/cuisineCreateModal";
import { Cuisine, getAllCuisineData } from "src/apis/cuisines";

const { Title } = Typography;

export interface DataType {
  id: string;
  imgUrl: string;
  cuisineName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CuisineList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAllCuisines = async () => {
      try {
        const rawData = await getAllCuisineData();
        setData(rawData); // Fix: Pass an array of users to setData
      } catch (error) {
        console.log("Something went wrong when get user data");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };
    fetchAllCuisines();
  }, []);
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      key: "imgUrl",
      dataIndex: "imgUrl",
      render: (imgUrl) => <Image src={imgUrl} width={100} />,
    },
    {
      title: "Name",
      dataIndex: "cuisineName",
      key: "cuisineName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
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
                      <Title level={1}>{cuisine.cuisineName}</Title>
                    </Card>
                  </div>
                </Col>
              </Row>
              <Title level={3}>Recipes</Title>
              <TableCustom
                columns={columns}
                data={[]}
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

      <CuisineCreateModel visible={modalVisible} onCancel={handleModalCancel} />
    </>
  );
}
