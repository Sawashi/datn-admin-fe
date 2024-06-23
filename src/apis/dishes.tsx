import fetchWrapper from "./fetchWrapper";

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
	const response = await fetchWrapper(`${apiUrl}/dishes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
}
//delete dish
export async function deleteDish(dishId: number) {
	const response = await fetchWrapper(`${apiUrl}/dish/${dishId}`, {
		method: "DELETE",
	});
	return response.json();
}
