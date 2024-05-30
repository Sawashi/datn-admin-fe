// services/taboos.ts
import fetchWrapper from "./fetchWrapper";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export interface Taboo {
  id: number;
  word: string;
}
export async function getTaboos(): Promise<Taboo[]> {
  try {
    const response = await fetchWrapper(`${apiUrl}/taboos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting taboos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function createTaboo(word: string): Promise<Taboo> {
  try {
    const response = await fetchWrapper(`${apiUrl}/taboos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    });

    if (!response.ok) {
      throw new Error("Error when creating taboo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function deleteTaboo(id: number): Promise<void> {
  try {
    const response = await fetchWrapper(`${apiUrl}/taboos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error when deleting taboo");
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function checkTaboo(
  word: string,
  tabooList: Taboo[]
): Promise<boolean> {
  const tabooWords = tabooList.map((taboo) => taboo.word);
  return tabooWords.includes(word);
}
