import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  me,
  refreshToken,
  sendOtp,
  signUp,
  TForgotPasswordInput,
  TForgotPasswordOutput,
  TLoginInput,
  TLoginOutput,
  TMeOutput,
  TRefreshTokenOutput,
  TSendOtpInput,
  TSendOtpOutput,
  TSignUpInput,
  TSignUpOutput,
  TVerifyEmailInput,
  TVerifyEmailOutput,
  verifyEmail,
} from './fetcher';
import { useRef } from 'react';
import { toastError } from '../../toaster';


export function useLoginMutation() {
  return useMutation<TLoginOutput, Error, TLoginInput>({
    mutationFn: login,
  });
}

export function useSignUpMutation() {
  return useMutation<TSignUpOutput, Error, TSignUpInput>({
    mutationFn: signUp,
  });
}


export function useSendOtpMutation(){
  return useMutation<TSendOtpOutput,Error,TSendOtpInput>({
    mutationFn:sendOtp
  })
}

export function useVerifyEmailMutation() {
  return useMutation<TVerifyEmailOutput, Error, TVerifyEmailInput>({
    mutationFn: verifyEmail,
  });
}

export function useForgotPasswordMutation() {
  return useMutation<TForgotPasswordOutput, Error, TForgotPasswordInput>({
    mutationFn: forgotPassword,
  });
}
// for refreshing token api

export function useRefreshTokenMutation() {
  return useMutation<TRefreshTokenOutput, Error, object>({
    mutationFn: refreshToken,
  });
}

export function useMeQuery() {
  const retryRef = useRef(0);
  const refreshToken = useRefreshTokenMutation();

  return useQuery<TMeOutput, Error>({
    queryKey: ['me', retryRef.current],
    queryFn: me,
    retry: false,
    onSuccess: async (data: TMeOutput) => {
      if (data.code === 'INVALID_TOKEN' || data.code === 'MISSING_TOKEN') {
        await refreshToken.mutateAsync(
          {},
          {
            onSuccess: (res) => {
              if (res.code !== 'REFRESH_SUCCESS') {
                toastError(
                  res.message ?? 'Refreshing token failed! You will be logged out!'
                );
                return;
              }
              retryRef.current += 1;
            },
          }
        );
      }
    },
  } as UseQueryOptions<TMeOutput, Error>);
}
