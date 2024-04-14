import React, { useState } from "react";
import { Modal, Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useS3Uploader } from "src/apis/image";

interface UploadModalProps {
  visible: boolean;
  onCancel: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ visible, onCancel }) => {
  const [file, setFile] = useState<any>(null);
  const { uploadToS3, imageUrl, error } = useS3Uploader();

  const handleUpload = () => {
    // Handle uploading logic here, you can access the file using file
    console.log("Uploading file:", file);
    const result = uploadToS3(file);
    console.log("Result: " + result);
    // Clear file after uploading
    setFile(null);
    onCancel();
  };

  const handleRemove = () => {
    // Clear the selected file
    setFile(null);
  };

  return (
    <Modal
      visible={visible}
      title="Upload Image"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>,
      ]}
    >
      {file ? (
        <div>
          <Image
            src={URL.createObjectURL(file)}
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
            setFile(newFile);
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

export default UploadModal;
