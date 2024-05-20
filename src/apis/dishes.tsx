const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Dish {
  id: number;
  author: string;
  dishName: string;
  imageUrl: string;
  updatedAt: string;
  cuisine: number;
  cuisineId: number;
}

export async function createDish(data: Partial<Dish>) {
  const response = await fetch(`${apiUrl}/dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
