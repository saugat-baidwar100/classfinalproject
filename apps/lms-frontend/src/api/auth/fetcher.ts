import {
  TForgotPasswordResponseCodes,
  TLoginResponseCodes,
  TSendOtpResponseCodes,
  TVerifyEmailResponseCodes,
} from '../../../../../libs/api-contract/src/modules/auth';
import { env } from '../../app/env';
import { TSignUpResponseCodes } from '../../../../../libs/api-contract/src/modules/auth';

export type TSignUpInput = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};
export type TSignUpOutput = {
  message: string;
  code: TSignUpResponseCodes;
};

export async function signUp(input: TSignUpInput): Promise<TSignUpOutput> {
  const res = await fetch(`${env.BACKEND_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname: input.fullname,
      username: input.username,
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();

  return data;
}

export type TLoginInput = {
  email: string;
  password: string;
};
export type TLoginOutput = {
  message: string;
  code: TLoginResponseCodes;
};

export async function login(input: TLoginInput): Promise<TLoginOutput> {
  console.log('uri:', env.BACKEND_URL);

  const res = await fetch(`${env.BACKEND_URL}auth/login`, {
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
  console.log('data', data);

  return data;
}

export type TSendOtpInput = {
  email: string;
};
export type TSendOtpOutput = {
  message: string;
  code: TSendOtpResponseCodes;
};

export async function sendOtp(input: TSendOtpInput): Promise<TSendOtpOutput> {
  const res = await fetch(`${env.BACKEND_URL}/auth/send-otp`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
    }),
  });

  const data = await res.json();

  return data;
}

export type TVerifyEmailInput = {
  email: string;
  otp: string;
};
export type TVerifyEmailOutput = {
  message: string;
  code: TVerifyEmailResponseCodes;
};

export async function verifyEmail(
  input: TVerifyEmailInput
): Promise<TVerifyEmailOutput> {
  const res = await fetch(`${env.BACKEND_URL}/auth/verify-email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      otp: input.otp,
    }),
  });

  const data = await res.json();

  return data;
}

export type TForgotPasswordInput = {
  email: string;
  otp: string;
  newPassword: string;
};
export type TForgotPasswordOutput = {
  message: string;
  code: TForgotPasswordResponseCodes;
};

export async function forgotPassword(
  input: TForgotPasswordInput
): Promise<TForgotPasswordOutput> {
  const res = await fetch(`${env.BACKEND_URL}/auth/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      otp: input.otp,
      newPassword: input.newPassword,
    }),
  });

  const data = await res.json();

  return data;
}
