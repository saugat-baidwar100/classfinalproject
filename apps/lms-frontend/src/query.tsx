import {
  QueryClient,
  QueryClientProvider as QueryClientProviderRc,
} from '@tanstack/react-query';
import { courseApi, testimonialApi } from './api/course';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient();

// const apis = [courseApi, testimonialApi];

// function ApiProvider({ children }: { children: React.ReactNode }) {
//   console.log('running...');
//   const apis = {
//     value: {
//       name: courseApi,
//       children: {
//         value: {
//           name: (
//             <testimonialApi.ReactQueryProvider>
//               {children}
//             </testimonialApi.ReactQueryProvider>
//           ),
//           children: null,
//         },
//       },
//     },
//   };

//   function nodeMaker(
//     apiValue: { value: { name: any; children: any } },
//     children: any
//   ) {
//     // const hasChildren = apiValue.value.children;
//     const value = apiValue['value'];

//     console.log('value', value.children);
//     return value.children ? (
//       <value.name.ReactQueryProvider>
//         {nodeMaker(value.children, children)}
//       </value.name.ReactQueryProvider>
//     ) : null;
//   }

//   return (
//     <div>
//       hello
//       {nodeMaker(apis, children)}
//     </div>
//   );
// }

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProviderRc client={queryClient}>
      <courseApi.ReactQueryProvider>
        <testimonialApi.ReactQueryProvider>
          {children}
        </testimonialApi.ReactQueryProvider>
      </courseApi.ReactQueryProvider>
      {/* <ApiProvider>{children}</ApiProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderRc>
  );
}
