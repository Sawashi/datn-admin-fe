import { ExclamationCircleOutlined, EyeFilled } from '@ant-design/icons'
import CreateEventModal from '@components/modals/CreateEventModal'
import {
  Button,
  Image,
  Spin,
  Table,
  Typography,
  notification,
  Modal,
  Tooltip,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { DeleteEvent, TDish, TEvent, getAllEvent } from 'src/apis/categories'

const { Title } = Typography

export default function EventList() {
  const [data, setData] = useState<TEvent[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<TEvent>()
  const [modal, contextHolder] = Modal.useModal()

  const fetchAllFeedbacks = async () => {
    try {
      const rawData = await getAllEvent()
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

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await DeleteEvent(eventId)

      notification.success({
        message: 'Event deleted',
        description: 'The Event has been successfully deleted.',
      })
      await fetchAllFeedbacks()
    } catch (error) {
      notification.error({
        message: 'Failed',
        description: 'The Event delete failed.',
      })
      console.log('Something went wrong', error)
    }
  }

  const confirm = (record: TEvent) => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want delete this event?',
      okText: 'OK',
      cancelText: 'Cancel',
      onCancel: () => {
        return
      },
      onOk: () => {
        handleDeleteEvent(record.id)
      },
    })
  }

  const columnsNew = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Thumnail',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (imageUrl: string) => {
        return (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: 'blue',
              }}
            >
              <Image
                src={imageUrl}
                width={200}
                height={60}
                style={{
                  objectFit: 'cover',
                }}
                fallback={
                  'data:image/png;base64,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'
                }
                preview={{
                  mask: <EyeFilled />,
                }}
              />
            </div>
          </>
        )
      },
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      width: '10%',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 120,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 120,
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      key: 'reward',
      width: 120,
      ellipsis: true,
      return: (reward: string) => {
        return (
          <Tooltip title={reward} placement='top'>
            <div>{reward}</div>
          </Tooltip>
        )
      },
    },
    {
      title: 'Dishes',
      dataIndex: 'dishes',
      key: 'dishes',
      width: '20%',
      render: (dishes: TDish[]) => {
        return (
          <div>
            {dishes.map((item, index) => (
              <div style={{}}>
                {`${index + 1}. ${item.dishName} by `}
                <span
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {item.author}
                </span>
              </div>
            ))}
          </div>
        )
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'reward',
      key: 'reward',
      width: 200,
      render: (_reward: string, record: TEvent) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Button
              type='primary'
              danger
              onClick={() => {
                confirm(record)
              }}
            >
              Delete
            </Button>
            <Button
              type='primary'
              onClick={() => {
                setOpenEditModal(true)
                setCurrentEvent(record)
              }}
            >
              Edit
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Title level={2}>Manage Events</Title>
      <div
        style={{
          marginBottom: '16px',
          textAlign: 'right',
        }}
      >
        <Button
          onClick={() => {
            setOpenCreateModal(true)
          }}
          type='primary'
          style={{ margin: '8px 0' }}
        >
          Create event
        </Button>
      </div>
      {loading ? (
        <Spin size='large' />
      ) : (
        <Table
          columns={columnsNew as ColumnsType<TEvent>}
          dataSource={data}
          bordered={true}
          scroll={{ x: 768 }}
        />
      )}

      <CreateEventModal
        isOpen={openCreateModal}
        setOpen={setOpenCreateModal}
        refetch={fetchAllFeedbacks}
      />

      <CreateEventModal
        isOpen={openEditModal}
        setOpen={setOpenEditModal}
        refetch={fetchAllFeedbacks}
        defaultValues={currentEvent}
      />

      {contextHolder}
    </>
  )
}

