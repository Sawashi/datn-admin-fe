const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Dish {
  author: string;
  dishName: string;
  imageUrl: string;
  updatedAt: string;
}
