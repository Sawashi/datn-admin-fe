import fetchWrapper from "./fetchWrapper";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface User {
	username: string;
	id: string;
	status: string;
	role: string;
}

export async function getAllUserData(): Promise<User[]> {
	try {
		const response = await fetchWrapper(`${apiUrl}/users`, {
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

export async function changeUserStatus(
	userId: number,
	status: boolean
): Promise<User[]> {
	const statusString = status ? "good" : "banned";

	try {
		const response = await fetchWrapper(`${apiUrl}/users/${userId}/status`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status: statusString }),
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

export async function changeUserRole(
	userId: number,
	role: string
): Promise<User[]> {
	try {
		const response = await fetchWrapper(`${apiUrl}/users/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ role }),
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
//get user by id
export async function getUserById(userId: number): Promise<User> {
	try {
		const response = await fetchWrapper(`${apiUrl}/users/${userId}`, {
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
