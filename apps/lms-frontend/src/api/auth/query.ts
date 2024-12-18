import { useMutation } from "@tanstack/react-query";
import { login, TLoginInput, TLoginOutput } from "./fetcher";


export function useLoginMutation() {
    return useMutation<TLoginOutput, Error, TLoginInput>({
      mutationFn: login,
    });
  }