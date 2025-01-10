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
export interface AllCourse {
    id: string
    title: string
    instructor: string
    category:string
    type:string
    lastUpdated:string
    totalLecture:number
    totalStudents:number
    originalPrice: string 
    currentPrice: string | "Free"
    thumbnail?: string;
  }  