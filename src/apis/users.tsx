export interface User {
  // Define the structure of your data here
  username: string;
  id: string;
  status: string;
  role: string;
}
export async function getAllUserData(): Promise<User[]> {
  try {
    const response = await fetch("https://datn-admin-be.onrender.com/users", {
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
    console.error("Error geting data:", error);
    throw error;
  }
}
