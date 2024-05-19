import { Modal, Form, Input, Button, notification } from "antd";
import { Category } from "src/apis/categories";
import { FormInstance } from "antd/lib/form";
import { editCategory } from "src/apis/categories";
import { useState } from "react";
import { on } from "events";

interface Props {
  visible: boolean;
  onCancel: () => void;
  category: Category | null;
  onRefresh: () => void;
}

const CategoryEditModel: React.FC<Props> = ({
  visible,
  onCancel,
  category,
  onRefresh,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const updatedValues = await form.validateFields();
      const updatedCategory: Category = {
        ...(category as Category),
        ...updatedValues,
      };
      await editCategory(updatedCategory); // Call the API directly
      onRefresh(); // Refresh the list of categories
      //noti
      notification.success({
        message: "Category Edited",
        description: "The category has been successfully edited.",
      });
      onCancel();
    } catch (error) {
      console.error("Validation error:", error);
      notification.error({
        message: "Failed to edit category",
        description: "Please check the form and try again.",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Edit Category"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" initialValues={category || {}}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imgUrl"
          label="Image URL"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEditModel;
