import AWS from "aws-sdk";
import { useState } from "react";

export const useS3Uploader = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const uploadToS3 = async (file: File) => {
    const s3 = new AWS.S3({
      accessKeyId: "yourAccessKeyId",
      secretAccessKey: "yourSecretAccessKey",
      region: "us-east-1",
    });

    const generateUniqueFileName = (file: File) => {
      const timestamp = new Date().getTime();
      const extension = file.name.split(".").pop();
      return `${timestamp}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;
    };

    const isImage = (file: File) => {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      return validImageTypes.includes(file.type);
    };

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!isImage(file)) {
      setError("Selected file is not an image.");
      return;
    }

    const uniqueFileName = generateUniqueFileName(file);

    const params = {
      Bucket: "datn-data",
      Key: uniqueFileName,
      Body: file,
      ACL: "public-read",
    };

    try {
      const data = await new Promise<AWS.S3.ManagedUpload.SendData>(
        (resolve, reject) => {
          s3.upload(
            params,
            (err: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
              if (err) reject(err);
              else resolve(data);
            }
          );
        }
      );

      console.log("Upload successful", data);
      setImageUrl(data.Location);
      console.log("Image URL: ", data.Location);
    } catch (err) {
      console.error(err);
      setError("Error uploading file.");
    }
  };

  return { uploadToS3, imageUrl, error };
};
