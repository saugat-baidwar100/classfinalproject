import { useMutation } from '@tanstack/react-query';
import {
  forgotPassword,
  login,
  sendOtp,
  signUp,
  TForgotPasswordInput,
  TForgotPasswordOutput,
  TLoginInput,
  TLoginOutput,
  TSendOtpInput,
  TSendOtpOutput,
  TSignUpInput,
  TSignUpOutput,
  TVerifyEmailInput,
  TVerifyEmailOutput,
  verifyEmail,
} from './fetcher';

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