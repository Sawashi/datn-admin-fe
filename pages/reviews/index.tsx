import TabooManager from '@components/modals/tabooManager'
import {
  Button,
  Spin,
  Table,
  TableProps,
  Typography,
  message,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import { Review, deleteReview, getAllReviewData } from 'src/apis/reviews'
import { Taboo, getTaboos } from 'src/apis/taboos'
const { Title } = Typography

export default function reviewList() {
  const [data, setData] = useState<Review[]>([])
  const [showTabooManager, setShowTabooManager] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [tabooList, setTabooList] = useState<Taboo[]>([])
  const fetchTaboos = async () => {
    try {
      const data = await getTaboos()
      console.log(data)
      setTabooList(data)
    } catch (error) {
      message.error('Failed to load taboos')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchAllCReviews = async () => {
      try {
        const rawData = await getAllReviewData()
        console.log('rawData: ', rawData)
        setData(rawData)
        await fetchTaboos()
      } catch (error) {
        console.log('Something went wrong when get review data')
      } finally {
        setLoading(false) // Set loading to false when data fetching is done
      }
    }
    fetchAllCReviews()
  }, [])
  const fetchAllCReviews = async () => {
    try {
      const rawData = await getAllReviewData()
      setData(rawData)
      await fetchTaboos()
    } catch (error) {
      console.log('Something went wrong when get review data')
    } finally {
      setLoading(false) // Set loading to false when data fetching is done
    }
  }
  //handle delete review
  const handleDeleteCuisine = async (reviewId: number) => {
    try {
      await deleteReview(reviewId)
      notification.success({
        message: 'Review Deleted',
        description: 'The review has been successfully deleted.',
      })
      fetchAllCReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      notification.error({
        message: 'Error',
        description: 'Failed to delete review. Please try again later.',
      })
    }
  }
  const columns: TableProps<Review>['columns'] = [
    {
      title: 'Dish name',
      key: 'dish',
      render: (record) => <a>{record.dish.dishName}</a>,
    },
    {
      title: 'Author',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <a>{user.username}</a>,
    },

    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Total Report',
      dataIndex: 'reportReviews',
      key: 'reportReviews',
      align: 'right',
      render: (reportReviews) => <span>{reportReviews?.length}</span>,
    },

    {
      title: 'Updated at',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Include bad words',
      key: 'badWords',
      render: (record) => {
        const content = record.content.toLowerCase()
        for (const taboo of tabooList) {
          if (content.includes(taboo.word.toLowerCase())) {
            return <span style={{ color: 'red' }}>Bad</span>
          }
        }
        return <span style={{ color: 'green' }}>Good</span>
      },
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <>
            <Button
              type='primary'
              danger
              onClick={() => handleDeleteCuisine(record.id)}
            >
              Delete
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Title level={2}>Manage Reviews</Title>
      <div>
        <Button
          type='primary'
          onClick={() => setShowTabooManager(!showTabooManager)}
        >
          {showTabooManager ? 'Hide Taboo Manager' : 'Show Taboo Manager'}
        </Button>
        {showTabooManager && <TabooManager refreshData={fetchAllCReviews} />}
      </div>
      {loading ? ( // Render spinner while loading
        <Spin size='large' />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </>
  )
}

