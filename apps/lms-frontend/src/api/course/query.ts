import { useMutation } from "@tanstack/react-query";
import { createCourse, TCourseFormInput, TCourseFormOutput } from "./fetcher";


export function useLoginMutation() {
    return useMutation<TCourseFormOutput, Error, TCourseFormInput>({
      mutationFn: createCourse,
    });
  }