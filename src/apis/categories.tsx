const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  name: string;
  imgUrl: string;
}

export async function createCategory(categoryData: Category): Promise<void> {
  console.log(categoryData);
  try {
    const response = await fetch(`${apiUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function getAllCategoryData(): Promise<Category[]> {
  try {
    const response = await fetch(`${apiUrl}/categories`, {
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
