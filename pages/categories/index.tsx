import { Button, Image, Spin, Table, Typography, notification } from 'antd'
import { useEffect, useState } from 'react'
import {
  Category,
  deleteCategory,
  getAllCategoryData,
} from 'src/apis/categories'
import CategoryCreateModel from '@components/modals/categoryCreateModal'
import CategoryEditModel from '@components/modals/categoryEditModal' // Import the edit modal

const { Title } = Typography

export default function CategorieList() {
  const [data, setData] = useState<Category[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false) // State for edit modal
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  ) // State to store selected category for editing
  const [loading, setLoading] = useState<boolean>(true)

  const fetchAllCategories = async () => {
    try {
      const rawData = await getAllCategoryData()
      setData(rawData)
    } catch (error) {
      console.log('Something went wrong when fetching category data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  const handleModalOpen = () => {
    setModalVisible(true)
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  }

  const handleEditModalOpen = (category: Category) => {
    setSelectedCategory(category)
    setEditModalVisible(true)
  }

  const handleEditModalCancel = () => {
    setSelectedCategory(null)
    setEditModalVisible(false)
  }

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId)
      notification.success({
        message: 'Category Deleted',
        description: 'The category has been successfully deleted.',
      })
      fetchAllCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      notification.error({
        message: 'Error',
        description: 'Failed to delete category. Please try again later.',
      })
    }
  }

  const columnsNew = [
    {
      title: 'Image',
      key: 'imgUrl',
      dataIndex: 'imgUrl',
      render: (image: string) => <Image src={image} width={100} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Category) => {
        return (
          <>
            <Button type='primary' onClick={() => handleEditModalOpen(record)}>
              Edit
            </Button>{' '}
            <Button
              type='primary'
              danger
              onClick={() => {
                handleDeleteCategory(record.id)
              }}
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
      <Title level={2}>Manage Categories</Title>
      <div style={{ marginBottom: '16px', textAlign: 'right' }}>
        <Button
          type='primary'
          style={{ margin: '8px 0' }}
          onClick={handleModalOpen}
        >
          Create a new category
        </Button>
      </div>
      {loading ? (
        <Spin size='large' />
      ) : (
        <Table columns={columnsNew} dataSource={data} bordered={true} />
      )}
      <CategoryCreateModel
        visible={modalVisible}
        onCancel={handleModalCancel}
        fetchData={fetchAllCategories}
      />
      <CategoryEditModel
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        category={selectedCategory}
        onRefresh={fetchAllCategories}
      />
    </>
  )
}

