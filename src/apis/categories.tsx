import fetchWrapper from './fetchWrapper'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export interface Category {
  id: number
  name: string
  imgUrl: string
}

export interface TFeedback {
  id: number
  content: string
  type: string
  user: {
    id: number
    email: string
    username: string
    imgUrl: string
  }
}

export type TDish = {
  id: number
  dishName: string
}
export interface TEvent {
  id: number
  eventName: string
  reward: string
  startTime: string
  endTime: string
  dishes: TDish[]
}

export async function createCategory(categoryData: Category): Promise<void> {
  try {
    const response = await fetchWrapper(`${apiUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
      throw new Error('Failed to create category')
    }
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export async function getAllCategoryData(): Promise<Category[]> {
  try {
    const response = await fetchWrapper(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

export async function deleteCategory(categoryId: number): Promise<void> {
  try {
    const response = await fetchWrapper(`${apiUrl}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete category')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}
export async function editCategory(categoryData: Category): Promise<void> {
  try {
    const response = await fetchWrapper(
      `${apiUrl}/categories/${categoryData.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to edit category')
    }
  } catch (error) {
    console.error('Error editing category:', error)
    throw error
  }
}

export async function getAllFeedback(): Promise<TFeedback[]> {
  try {
    const response = await fetchWrapper(`${apiUrl}/feedback-apps`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

export async function getAllEvent(): Promise<TEvent[]> {
  try {
    const response = await fetchWrapper(`${apiUrl}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error getting data:', error)
    throw error
  }
}

export async function deleteFeedback(feedbackId: number): Promise<void> {
  try {
    const response = await fetchWrapper(
      `${apiUrl}/feedback-apps/${feedbackId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete category')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}

