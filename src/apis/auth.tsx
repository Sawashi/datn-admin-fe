import fetchWrapper from "./fetchWrapper";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export interface UserAuth {
  id: string;
  accessToken: string;
}

export async function login(
  username: string,
  password: string
): Promise<UserAuth> {
  try {
    const response = await fetchWrapper(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
export async function signup(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetchWrapper(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to signup");
    }

    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
