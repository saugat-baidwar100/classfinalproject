export interface Course {
    id: string
    title: string
    author: string
    rating: number
    totalRatings: number
    originalPrice: number 
    currentPrice: number | "Free"
    imageUrl: string
  }  