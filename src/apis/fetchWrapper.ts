// fetchWrapper.ts
import Cookies from "js-cookie";
type Headers = {
  "Content-Type": string;
  Authorization?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const token = Cookies.get("accessToken"); // Assuming token is stored in localStorage
  const headers: Headers = {
    ...(options.headers as Headers),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export default fetchWrapper;
