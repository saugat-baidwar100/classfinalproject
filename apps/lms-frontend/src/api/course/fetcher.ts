import { TcourseSchema } from '../../../../../libs/api-contract/src/modules/courses';
import { env } from "../../app/env";

export type TCourseFormInput = {
    title: string;
    description: string;
    category: string;
    level: string;
    price: number;
    thumbnail: string;
  };
  export type TCourseFormOutput = {
    message: string;
   code:TcourseSchema
    };
  
  
  
  export async function createCourse(input: TCourseFormInput): Promise<TCourseFormOutput> {
    const res = await fetch(`${env.BACKEND_URL}/course/addCourse`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        category: input.category,
        level: input.level,
        price: input.price,
        thumbnail: input.thumbnail,
      }),
    });
  
    const data = await res.json();
    console.log("data",data);
    
  
    return data;
  }
  