// import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { TextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
// import { Select } from '@skillprompt-lms/libs/ui-components/components/my-select';
// import { Button } from '@skillprompt-lms/libs/ui-components/components/button';
// import { Checkbox } from '@nextui-org/react';

// export function CreateNewCourse() {
//   const courseSchema = z.object({
//     title: z.string().min(1, 'Title is required'),
//     description: z.string().min(10, 'Description is required 10 characters.'),
//     category: z.string().min(1, 'Category is required'),
//     type: z.string().min(1, 'Type is required'),
//     price: z
//       .number({ invalid_type_error: 'Price must be a number' })
//       .positive('Price must be greater than 0'),
//     thumbnail: z
//       .any()
//       .refine(
//         (file) =>
//           file?.[0] instanceof File && file?.[0]?.size <= 5 * 1024 * 1024,
//         { message: 'Please select a valid file under 5MB' }
//       ),
//   });

//   type CourseFormData = z.infer<typeof courseSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//     setValue,
//   } = useForm<CourseFormData>({
//     resolver: zodResolver(courseSchema),
//     mode: 'all',
//   });

//   const onSubmit: SubmitHandler<CourseFormData> = (data) => {
//     console.log('Form Data:', data);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md pt-4">
//         <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center ">
//           Create a new course
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             {/* Title */}

//             <Input
//               label={<p className="text-green-500">Name</p>}
//               placeholder="Enter your name"
//               errorMessage={errors.title?.message}
//               isInvalid={!!errors.title?.message}
//               {...register('title')}
//             />
//           </div>
//           {/* Description */}
//           <div>
//             <TextArea
//               label={<p className="text-green-500">Description</p>}
//               type="text"
//               placeholder="Enter Description"
//               rows={4}
//               errorMessage={errors.description?.message}
//               isInvalid={!!errors.description?.message}
//               {...register('description')}
//             />
//           </div>
//           {/* Category */}
//           <div>
//             <Select
//               label={<p className="text-green-500">Category</p>}
//               placeholder="select category"
//               {...register('category')}
//               options={[
//                 { key: '1', label: 'Select Category' },
//                 { key: '2', label: 'Front-end Developtment' },
//                 { key: '3', label: 'Back-end Development' },
//                 { key: '4', label: 'Fullstack Development' },
//               ]}
//               isInvalid={!!errors.category?.message}
//               errorMessage={errors.category?.message}
//             />
//           </div>
//           {/* Type */}
//           <div>
//             <Select
//               label={<p className="text-green-500">Type</p>}
//               placeholder="Select type"
//               options={[
//                 { key: '1', label: 'Select type' },
//                 { key: '2', label: 'Free' },
//                 { key: '3', label: 'Paid' },
//               ]}
//               {...register('type')}
//               isInvalid={!!errors.type?.message}
//               errorMessage={errors.type?.message}
//             />
//           </div>

//           {/*  */}
//           <div>
//             <Input
//               errorMessage={errors.price?.message}
//               type="number"
//               label={<p className="text-green-500">Price</p>}
//               placeholder="Enter price"
//               {...register('price', { valueAsNumber: true })}
//               isInvalid={!!errors.price?.message}
//             />
//           </div>
//           <div>
//             <Input
//               type="file"
//               label={<p className="text-green-500">Thumbnail</p>}
//               placeholder="Upload Thumbnail"
//               {...register('thumbnail')}
//               errorMessage={errors.thumbnail?.message as string}
//               isInvalid={!!errors.thumbnail?.message}
//             />
//           </div>
//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <Button
//               type="submit"
//               key="save"
//               name="Save"
//               className=" bg-customGreen py-2 px-4 text-white rounded-md hover:bg-green-800"
//             />

//             <Button
//               type="submit"
//               key="Cancel"
//               name="Cancel"
//               className=" bg-customRed py-2 px-4 text-white rounded-md hover:bg-red-800"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
import { Select } from '@skillprompt-lms/libs/ui-components/components/my-select';
import { Button } from '@skillprompt-lms/libs/ui-components/components/button';
import { Checkbox } from '@nextui-org/react';

export function CreateNewCourse() {
  const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description is required 10 characters.'),
    category: z.string().min(1, 'Category is required'),
    type: z.string().min(1, 'Type is required'),
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .positive('Price must be greater than 0'),
    thumbnail: z
      .any()
      .refine(
        (file) =>
          file?.[0] instanceof File && file?.[0]?.size <= 5 * 1024 * 1024,
        { message: 'Please select a valid file under 5MB' }
      ),
  });

  type CourseFormData = z.infer<typeof courseSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<CourseFormData> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          Create a new course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Input
              label={<p className="text-green-500">Name</p>}
              placeholder="Enter your name"
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title?.message}
              {...register('title')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <TextArea
              label={<p className="text-green-500">Description</p>}
              type="text"
              placeholder="Enter Description"
              rows={4}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description?.message}
              {...register('description')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label={<p className="text-green-500">Category</p>}
              placeholder="Select category"
              {...register('category')}
              options={[
                { key: '1', label: 'Select Category' },
                { key: '2', label: 'Front-end Development' },
                { key: '3', label: 'Back-end Development' },
                { key: '4', label: 'Fullstack Development' },
              ]}
              isInvalid={!!errors.category?.message}
              errorMessage={errors.category?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label={<p className="text-green-500">Type</p>}
              placeholder="Select type"
              options={[
                { key: '1', label: 'Select type' },
                { key: '2', label: 'Free' },
                { key: '3', label: 'Paid' },
              ]}
              {...register('type')}
              isInvalid={!!errors.type?.message}
              errorMessage={errors.type?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              errorMessage={errors.price?.message}
              type="number"
              label={<p className="text-green-500">Price</p>}
              placeholder="Enter price"
              {...register('price', { valueAsNumber: true })}
              isInvalid={!!errors.price?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="file"
              label={<p className="text-green-500">Thumbnail</p>}
              placeholder="Upload Thumbnail"
              {...register('thumbnail')}
              errorMessage={errors.thumbnail?.message as string}
              isInvalid={!!errors.thumbnail?.message}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              key="save"
              name="Save"
              className="bg-green-600 py-2 px-4 text-white rounded-md hover:bg-green-700"
            />
            <Button
              type="button"
              key="cancel"
              name="Cancel"
              className="bg-red-600 py-2 px-4 text-white rounded-md hover:bg-red-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
