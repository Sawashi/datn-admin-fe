import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { Cuisine, editCuisine } from "src/apis/cuisines";

interface EditCuisineModalProps {
  visible: boolean;
  onCancel: () => void;
  cuisine: Cuisine | null;
  onRefresh: () => void;
}

const EditCuisineModal: React.FC<EditCuisineModalProps> = ({
  visible,
  onCancel,
  cuisine,
  onRefresh,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const gatheredValue = { ...cuisine, ...values };

      delete gatheredValue.dishes;

      await editCuisine(gatheredValue);
      notification.success({
        message: "Cuisine Edited",
        description: "The cuisine has been successfully edited.",
      });
      setLoading(false);
      onRefresh();
      onCancel();
    } catch (error) {
      console.error("Error editing cuisine:", error);
      notification.error({
        message: "Failed to edit cuisine",
        description: "Please check the form and try again.",
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Cuisine"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} initialValues={cuisine || {}}>
        <Form.Item
          name="name"
          label="Cuisine Name"
          rules={[{ required: true, message: "Please enter cuisine name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="imgUrl" label="Image URL">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCuisineModal;
