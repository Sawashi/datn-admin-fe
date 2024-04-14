import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Button, Card, Image, Typography, Col, Row } from "antd";
import TableCustom from "components/TableCustom";
import { ColumnsType } from "antd/es/table";

const { Title } = Typography;

export interface DataType {
  id: string;
  imgUrl: string;
  cuisineName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

async function getData() {
  try {
    const res = await fetch(`https://datn-admin-be.onrender.com/cuisines`);
    return res.json();
  } catch (e) {
    console.log(e);
    return {};
  }
}
export default function CuisineList({ data }: { data: any }) {
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
        <Title level={3}>Recipes</Title>
        <TableCustom
          columns={columns}
          data={data}
          hasEdit
          hasDelete
          onSelectedRow={() => {}}
          onEdit={(value) => {}}
        />
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const data = await getData();

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/cuisines")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
