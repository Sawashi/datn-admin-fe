import { Dish } from "./dishes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Cuisine {
  id: number;
  cuisineName: string;
  description: string;
  imgUrl: string;
  dishes: Dish[];
}

export async function createCuisine(cuisineData: Cuisine): Promise<void> {
  console.log(cuisineData);
  try {
    const response = await fetch(`${apiUrl}/cuisines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuisineData),
    });

    if (!response.ok) {
      throw new Error("Failed to create cuisine");
    }
  } catch (error) {
    console.error("Error creating cuisine:", error);
    throw error;
  }
}

export async function getAllCuisineData(): Promise<Cuisine[]> {
  try {
    const response = await fetch(`${apiUrl}/cuisines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}
export async function deleteCuisine(cuisineId: number): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/cuisines/${cuisineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete cuisine");
    }
  } catch (error) {
    console.error("Error deleting cuisine:", error);
    throw error;
  }
}
