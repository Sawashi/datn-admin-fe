import React, { useState } from "react";
import { Modal, Upload, Button, Input, notification, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

interface CuisineCreateModelProps {
  visible: boolean;
  onCancel: () => void;
}

const CuisineCreateModel: React.FC<CuisineCreateModelProps> = ({
  visible,
  onCancel,
}) => {
  const [img, setImg] = useState<File | null>(null);
  const [cuisineName, setCuisineName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateCuisine = async (formData: FormData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cuisines`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cuisine created successfully");
      notification.success({
        message: "Cuisine Created",
        description: "The cuisine has been successfully created.",
      });
      onCancel(); // Close the modal upon successful creation
    } catch (error) {
      console.error("Error creating cuisine:", error);
      notification.error({
        message: "Error",
        description: "Failed to create cuisine. Please try again later.",
      });
    }
  };

  const handleUploadImg = () => {
    if (img !== null) {
      const formData = new FormData();
      formData.append("cuisineName", cuisineName);
      formData.append("description", description);
      formData.append("image", img);

      handleCreateCuisine(formData);
    }
  };

  const handleRemove = () => {
    // Clear the selected file
    setImg(null);
  };

  return (
    <Modal
      visible={visible}
      title="Create Cuisine"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUploadImg}
          disabled={!img}
        >
          Upload
        </Button>,
      ]}
    >
      <Input
        placeholder="Cuisine Name"
        value={cuisineName}
        onChange={(e) => setCuisineName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      {img ? (
        <div>
          <Image
            src={URL.createObjectURL(img)}
            alt="Uploaded Image"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
          <Button onClick={handleRemove} style={{ marginTop: "10px" }}>
            Remove
          </Button>
        </div>
      ) : (
        <Upload.Dragger
          fileList={[]}
          beforeUpload={(newFile) => {
            // Allow only one file to be uploaded
            setImg(newFile);
            return false;
          }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Upload.Dragger>
      )}
    </Modal>
  );
};

export default CuisineCreateModel;
