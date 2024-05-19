import React, { useEffect, useState } from "react";
import { Modal, Upload, Button, Input, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { firebaseConfig, imageDb } from "src/apis/Config";
import { Image } from "antd";
import { Category, createCategory } from "src/apis/categories";

interface CategoryCreateModelProps {
  visible: boolean;
  onCancel: () => void;
  fetchData: () => void;
}

const CategoryCreateModel: React.FC<CategoryCreateModelProps> = ({
  visible,
  onCancel,
  fetchData,
}) => {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleCreateCategory = async (imgUrlLoad: string[]) => {
    const categoryData: Category = {
      name: categoryName,
      imgUrl: imgUrlLoad[0],
      id: 0,
    };

    try {
      await createCategory(categoryData);
      console.log("Category created successfully");
      notification.success({
        message: "Category Created",
        description: "The category has been successfully created.",
      });
      await fetchData();
      onCancel(); // Close the modal upon successful creation
    } catch (error) {
      console.error("Error creating category:", error);
      notification.error({
        message: "Error",
        description: "Failed to create category. Please try again later.",
      });
    }
  };

  const handleUploadImg = () => {
    if (img !== null) {
      notification.info({
        message: "Creating category",
        description: "Please wait while category is being created.",
      });
      const imgRef: StorageReference = ref(imageDb, `files/${uuidv4()}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl([url]);
          handleCreateCategory([url]);
        });
      });
    } else {
      notification.error({
        message: "Error",
        description: "Please select an image to create a category.",
      });
    }
  };

  const handleRemove = () => {
    // Clear the selected file
    setImg(null);
    setImgUrl([]);
  };

  return (
    <Modal
      visible={visible} // Changed from open to visible
      title="Create Category"
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
          Create
        </Button>,
      ]}
    >
      <Input
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
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

export default CategoryCreateModel;
