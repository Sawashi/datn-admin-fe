import { UploadOutlined } from '@ant-design/icons'
import { Modal, Upload, Form, Input, DatePicker, Button } from 'antd'
import { RcFile } from 'antd/es/upload'
import React, { useState } from 'react'

type TCreateEventModalProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const CreateEventModal = (props: TCreateEventModalProps) => {
  const { isOpen, setOpen } = props
  const [img, setImg] = useState<RcFile>()
  const [form] = Form.useForm()

  const onSubmit = (values: any) => {
    console.log('values', values)
  }
  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setOpen(false)
      }}
      title={'Create Event Modal'}
      footer={null}
    >
      <Form layout='vertical' form={form} onFinish={onSubmit}>
        <Form.Item
          label='Title'
          required
          name={'eventName'}
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Thumbnail'
          required
          name={'imageUrl'}
          rules={[{ required: true, message: 'Please select image!' }]}
        >
          <Upload.Dragger
            fileList={[]}
            beforeUpload={(newFile) => {
              setImg(newFile)
              return false
            }}
            style={{
              marginBottom: 16,
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
          rules={[{ required: true, message: 'Please input start time!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Event Time'
          required
          name={'endTime'}
          rules={[{ required: true, message: 'Please input end time!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label='Reward'
          required
          name={'reward'}
          rules={[{ required: true, message: 'Please input reward!' }]}
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
            <Button onClick={() => setOpen(false)}>Close</Button>
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

