import React, { useEffect, useState } from "react";
import {
	Modal,
	Upload,
	Button,
	Input,
	notification,
	Image,
	Select,
	Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Cuisine } from "src/apis/cuisines";
import { Label } from "recharts";

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

interface IngredientWithMass {
	ingredientName: string;
	mass: string;
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
	const [ingredientMasses, setIngredientMasses] = useState<
		IngredientWithMass[]
	>([]);
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
				console.log(JSON.stringify(response.data));
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
		if (img !== null) {
			const formData = new FormData();
			formData.append("image", img);
			formData.append("cookingTime", cookingTime);
			formData.append("dishName", dishName);
			formData.append("servings", servings.toString()); // Convert servings to string
			formData.append("calories", calories.toString()); // Convert calories to string
			formData.append("author", author);
			formData.append("directions", directions);
			//formData.append("ingredients", JSON.stringify(ingredientMasses));
			for (let i = 0; i < ingredientMasses.length; i++) {
				formData.append(
					"ingredients[" + i + "][ingredientName]",
					JSON.stringify(ingredientMasses[i].ingredientName)
				);
				formData.append(
					"ingredients[" + i + "][mass]",
					JSON.stringify(ingredientMasses[i].mass)
				);
			}
			if (cuisine !== null) {
				formData.append("cuisines", cuisine.id.toString());
			} else {
				formData.append("cuisines", "0");
			}
			handleCreateDish(formData);
		}
	};

	const handleRemove = () => {
		setImg(null);
	};

	const handleAddIngredient = () => {
		setIngredientMasses([
			...ingredientMasses,
			{ ingredientName: "", mass: "" },
		]);
	};

	const handleIngredientChange = (
		index: number,
		field: string,
		value: string
	) => {
		const newIngredientMasses = [...ingredientMasses];
		if (field === "ingredientName") {
			newIngredientMasses[index].ingredientName = value;
		} else {
			newIngredientMasses[index].mass = value;
		}
		setIngredientMasses(newIngredientMasses);
	};

	const handleRemoveIngredient = (index: number) => {
		const newIngredientMasses = [...ingredientMasses];
		newIngredientMasses.splice(index, 1);
		setIngredientMasses(newIngredientMasses);
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
				addonBefore={<div>Dish name</div>}
				value={dishName}
				onChange={(e) => setDishName(e.target.value)}
				style={{ marginBottom: "10px" }}
			/>
			<Input
				placeholder="Cooking Time"
				addonBefore={<div>Cooking time</div>}
				value={cookingTime}
				onChange={(e) => setCookingTime(e.target.value)}
				style={{ marginBottom: "10px" }}
			/>
			<Input
				placeholder="Servings"
				addonBefore={<div>Servings</div>}
				value={servings}
				onChange={(e) => setServings(Number(e.target.value))}
				style={{ marginBottom: "10px" }}
				type="number"
			/>
			<Input
				placeholder="Calories"
				addonBefore={<div>Calories</div>}
				value={calories}
				onChange={(e) => setCalories(Number(e.target.value))}
				style={{ marginBottom: "10px" }}
				type="number"
			/>
			<Input
				placeholder="Author"
				addonBefore={<div>Author</div>}
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

			<Form>
				{ingredientMasses.map((item, index) => (
					<div key={index} style={{ marginBottom: "10px" }}>
						<Select
							placeholder="Select Ingredient"
							value={item.ingredientName}
							onChange={(value) =>
								handleIngredientChange(index, "ingredientName", value)
							}
							style={{ width: "60%", marginRight: "10px" }}
						>
							{ingredients.map((ingredient) => (
								<Select.Option
									key={ingredient.id}
									value={ingredient.ingredientName}
								>
									{ingredient.ingredientName}
								</Select.Option>
							))}
						</Select>
						<Input
							placeholder="Mass"
							value={item.mass}
							onChange={(e) =>
								handleIngredientChange(index, "mass", e.target.value)
							}
							style={{ width: "30%", marginRight: "10px" }}
						/>
						<Button onClick={() => handleRemoveIngredient(index)} danger>
							Remove
						</Button>
					</div>
				))}
				<Button onClick={handleAddIngredient} type="dashed">
					Add Ingredient
				</Button>
			</Form>

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
