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
  const res = await fetch(`${env.VITE_BACKEND_URL}auth/login/`, {
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
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
