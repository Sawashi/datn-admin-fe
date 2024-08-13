import { Button, Modal, Spin, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { TDish, TReport, TUser, getAllReport } from 'src/apis/categories'

const { Title } = Typography

export default function ReportDishList() {
  const [data, setData] = useState<TReport[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [modal, contextHolder] = Modal.useModal()

  const fetchAllFeedbacks = async () => {
    try {
      const rawData = await getAllReport()
      setData(rawData)
    } catch (error) {
      console.log('Something went wrong when fetching category data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllFeedbacks()
  }, [])

  const columnsNew = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Content',
      key: 'content',
      dataIndex: 'content',
      width: '20%',
    },

    {
      title: 'Dish name',
      key: 'dish',
      dataIndex: 'dish',
      width: '30%',
      render: (_dish: TDish, record: TReport) => {
        return <div>{record.dish.dishName}</div>
      },
    },
    {
      title: 'Report by',
      key: 'user',
      dataIndex: 'user',
      width: '30%',
      render: (user: TUser, record: TReport) => {
        return <div>{record.user.username}</div>
      },
    },
  ]

  return (
    <>
      <Title level={2}>Manage Report Dish</Title>
      <div
        style={{
          marginBottom: '16px',
          textAlign: 'right',
        }}
      ></div>
      {loading ? (
        <Spin size='large' />
      ) : (
        <Table
          columns={columnsNew as ColumnsType<TReport>}
          dataSource={data}
          bordered={true}
          scroll={{ x: 768 }}
        />
      )}

      {contextHolder}
    </>
  )
}

