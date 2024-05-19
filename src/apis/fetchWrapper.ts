// fetchWrapper.ts

type Headers = {
  "Content-Type": string;
  Authorization?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const headers: Headers = {
    ...(options.headers as Headers),
  };
  headers[
    "Authorization"
  ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzE2MTA4NzU0LCJleHAiOjE3MTYxMTIzNTR9.RFnZhtvO9jsI-chW5of2dPG0mg0cPAS2EXAb1CUee10`;
  if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
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
