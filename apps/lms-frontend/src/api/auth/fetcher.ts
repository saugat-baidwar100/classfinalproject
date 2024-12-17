import { TLoginResponseCodes } from '../../../../../libs/api-contract/src/auth';
import { env } from '../../app/env';

export type TLoginInput = {
  email: string;
  password: string;
};
export type TLoginOutput = {
  message: string;
  code: TLoginResponseCodes;
};

export async function login(input: TLoginInput): Promise<TLoginOutput> {
  console.log("uri:",env.BACKEND_URL);

  const res = await fetch(`${env.BACKEND_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();
  console.log("data", data);
  
 

  return data;
}
