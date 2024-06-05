import React, { useEffect, useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Input,
  notification,
  Image,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Cuisine } from "src/apis/cuisines";

interface DishCreateModelProps {
  visible: boolean;
  onCancel: () => void;
  onCreated: () => void;
  cuisine: Cuisine | null;
}
interface Ingredient {
  id: number;
  ingredientName: string;
}

const DishCreateModel: React.FC<DishCreateModelProps> = ({
  visible,
  onCancel,
  onCreated,
  cuisine,
}) => {
  const [img, setImg] = useState<File | null>(null);
  const [cookingTime, setCookingTime] = useState<string>("");
  const [dishName, setDishName] = useState<string>("");
  const [servings, setServings] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [directions, setDirections] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const token = Cookies.get("accessToken");
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/ingredient`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);
  const handleCreateDish = async (formData: FormData) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dish`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Dish created successfully");
      notification.success({
        message: "Dish Created",
        description: "The dish has been successfully created.",
      });
      onCreated(); // Refresh the list of dishs
      onCancel(); // Close the modal upon successful creation
    } catch (error) {
      console.error("Error creating dish:", error);
      notification.error({
        message: "Error",
        description: "Failed to create dish. Please try again later.",
      });
    }
  };

  const handleUploadImg = () => {
    // "cookingTime": "string",
    // "dishName": "string",
    // "servings": 0,
    // "calories": 0,
    // "author": "string",
    // "directions": "string",
    // "ingredients": "string",
    // "cuisines": 0
    if (img !== null) {
      const formData = new FormData();

      formData.append("image", img);
      formData.append("cookingTime", cookingTime);
      formData.append("dishName", dishName);
      formData.append("servings", servings.toString()); // Convert servings to string
      formData.append("calories", calories.toString()); // Convert calories to string
      formData.append("author", author);
      formData.append("directions", directions);
      formData.append("ingredients", JSON.stringify(selectedIngredients));
      console.log("Ingredients", JSON.stringify(selectedIngredients));
      if (cuisine !== null) {
        formData.append("cuisines", cuisine.id.toString());
      } else {
        formData.append("cuisines", "0");
      }
      handleCreateDish(formData);
    }
  };

  const handleRemove = () => {
    // Clear the selected file
    setImg(null);
  };

  return (
    <Modal
      visible={visible}
      title="Create Dish"
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
        placeholder="Dish Name"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Cooking Time"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(Number(e.target.value))}
        style={{ marginBottom: "10px" }}
        type="number"
      />
      <Input
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
        style={{ marginBottom: "10px" }}
        type="number"
      />
      <Input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.TextArea
        placeholder="Directions"
        value={directions}
        onChange={(e) => setDirections(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Select
        mode="multiple"
        placeholder="Select Ingredients"
        value={selectedIngredients}
        onChange={(value) => setSelectedIngredients(value)}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        {ingredients.map((ingredient) => (
          <Select.Option key={ingredient.id} value={ingredient.id}>
            {ingredient.ingredientName}
          </Select.Option>
        ))}
      </Select>

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

export default DishCreateModel;
