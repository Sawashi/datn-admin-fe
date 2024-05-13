import { Dish } from "./dishes";
import { User } from "./users";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export interface Review {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  dish: Dish;
}
export async function getAllReviewData(): Promise<Review[]> {
  try {
    const response = await fetch(`${apiUrl}/reviews`, {
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
