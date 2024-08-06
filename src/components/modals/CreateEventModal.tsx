import { UploadOutlined } from '@ant-design/icons'
import {
  Modal,
  Upload,
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  notification,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { TEvent } from 'src/apis/categories'

type TForm = {
  eventName: string
  imageUrl: RcFile
  startTime: string
  endTime: string
  reward: string
}

type TCreateEventModalProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  defaultValues?: TEvent
  refetch: () => void
}

const CreateEventModal = (props: TCreateEventModalProps) => {
  const { isOpen, setOpen, refetch, defaultValues } = props
  const [img, setImg] = useState<RcFile>()
  const [form] = Form.useForm()
  const token = Cookies.get('accessToken')

  const handleCreateEvent = async (formData: FormData) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      notification.success({
        message: 'Event Created',
        description: 'The Event has been successfully created.',
      })
    } catch (error) {
      console.error('Error creating dish:', error)
      notification.error({
        message: 'Error',
        description: 'Failed to create Event. Please try again later.',
      })
    }
  }

  const handleUpdateEvent = async (eventId: number, formData: FormData) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      notification.success({
        message: 'Event Updated',
        description: 'The Event has been successfully updated.',
      })
    } catch (error) {
      console.error('Error creating dish:', error)
      notification.error({
        message: 'Error',
        description: 'Failed to update Event. Please try again later.',
      })
    }
  }

  const onSubmit = async (values: TForm) => {
    try {
      const formData = new FormData()
      formData.append('eventName', values.eventName)
      if (img) {
        formData.append('image', img)
      }
      formData.append('startTime', dayjs(values.startTime).format('YYYY-MM-DD'))
      formData.append('endTime', dayjs(values.endTime).format('YYYY-MM-DD'))
      formData.append('reward', values.reward)

      if (defaultValues) {
        await handleUpdateEvent(defaultValues.id, formData)
      } else {
        await handleCreateEvent(formData)
      }

      refetch()
      onCloseModal()
    } catch (error) {
      console.log('Something went wrong', error)
    } finally {
      form.resetFields()
    }
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  const fetchImage = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], 'image.jpg', { type: blob.type })
    return file as RcFile
  }

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        eventName: defaultValues.eventName,
        startTime: dayjs(defaultValues.startTime),
        endTime: dayjs(defaultValues.endTime),
        reward: defaultValues.reward,
      })

      fetchImage(defaultValues.imageUrl).then((file) => {
        setImg(file)
        form.setFieldsValue({ imageUrl: file })
      })
    }
  }, [defaultValues])
  return (
    <Modal
      open={isOpen}
      onCancel={onCloseModal}
      title={defaultValues ? 'Edit Event Modal' : 'Create Event Modal'}
      footer={null}
    >
      <Form layout='vertical' form={form} onFinish={onSubmit}>
        <Form.Item
          label='Title'
          required
          name={'eventName'}
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Thumbnail'
          required
          name={'imageUrl'}
          rules={[{ required: true, message: 'Please select image' }]}
        >
          <Upload.Dragger
            fileList={img ? [img] : []}
            beforeUpload={(newFile) => {
              setImg(newFile)
              return false
            }}
            onRemove={() => {
              setImg(undefined)
            }}
          >
            <p className='ant-upload-drag-icon'>
              <UploadOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label='Start Time'
          required
          name={'startTime'}
          rules={[{ required: true, message: 'Please input start time' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Event Time'
          required
          name={'endTime'}
          rules={[{ required: true, message: 'Please input end time' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Reward'
          required
          name={'reward'}
          rules={[{ required: true, message: 'Please input reward' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={onCloseModal}>Close</Button>
            <Button htmlType='submit' type='primary'>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateEventModal

