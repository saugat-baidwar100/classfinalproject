import {
  Input,
  MyInput,
} from '@skillprompt-lms/libs/ui-components/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MyTextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
import { MySelect } from '@skillprompt-lms/libs/ui-components/components/my-select';

export const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' },
];

export function CreateNewCourse() {
  const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    type: z.string().min(1, 'Type is required'),
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .positive('Price must be greater than 0'),
    thumbnail: z
      .any()
      .refine((file) => file?.[0] instanceof File, {
        message: 'Please select a valid file',
      })
      .refine(
        (file) => {
          const selectedFile = file?.[0];
          return selectedFile ? selectedFile.size <= 5 * 1024 * 1024 : true; // Max 5MB
        },
        {
          message: 'File size must be less than 5MB',
        }
      )
      .refine(
        (file) => {
          const selectedFile = file?.[0];
          return selectedFile
            ? ['image/jpeg', 'image/png'].includes(selectedFile.type)
            : true;
        },
        {
          message: 'Only JPG and PNG images are allowed',
        }
      )
      .optional(), // File is optional
  });

  type CourseFormData = z.infer<typeof courseSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit: SubmitHandler<CourseFormData> = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md pt-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center ">
          Create a new course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <MySelect
              placeholder="select animal"
              label={<p className="text-red-400">Animal</p>}
              options={animals}
            />
          </div>
          <div>
            <MySelect
              placeholder="select courses"
              label={<p className="text-red-400">Courses</p>}
              options={[
                { key: '1', label: 'Node' },
                { key: '2', label: 'React' },
              ]}
            />
          </div>
          <div>
            <Input
              label={<p className="text-red-500">Name</p>}
              placeholder="enter your name"
              {...register('title')}
              errorMessage={errors.title?.message}
            />
          </div>
          {/* Title */}
          <div>
            <label className="block text-customGreen text-sm mb-2">Title</label>
            <MyInput
              label="Title"
              labelPlacement="outside-left"
              placeholder="Enter Title"
              radius="md"
              type="text"
              {...register('title')}
              errorMessage={errors.title?.message}
            />
            {/* {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )} */}
          </div>

          {/* Description */}
          <div>
            <label className="block text-customGreen text-sm mb-2">
              Description
            </label>
            <MyTextArea
              type="text"
              placeholder="Enter Description"
              {...register('description')}
              rows={4}
              error={!!errors.description}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-green-500 text-sm mb-2">
              Category
            </label>
            <select
              {...register('category')}
              className={`w-full px-4 py-2 border text-black ${
                errors.type ? 'border-red-500' : 'border-gray-500'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" className="text-gray-500">
                Select Category
              </option>
              <option className="text-black" value="frontend">
                Front-end Development
              </option>
              <option className="text-black" value="backend">
                Back-end Development
              </option>
              <option className="text-black" value="fullstack">
                Fullstack Development
              </option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-customGreen  text-sm mb-2">Type</label>
            <select
              {...register('type')}
              className={`w-full px-4 py-2 border text-black ${
                errors.type ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option className=" text-customGray" value="">
                Select Type
              </option>
              <option className=" text-black" value="online">
                Paid
              </option>
              <option className=" text-black" value="offline">
                Free
              </option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-customGreen  text-sm mb-2">
              Price
            </label>
            <MyInput
              radius="md"
              type="number"
              placeholder="Enter Price"
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-customGreen text-sm mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              {...register('thumbnail')}
              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail?.message?.toString()}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className=" bg-customGreen  py-2 px-4 text-white rounded-md hover:bg-green-800"
            >
              Save
            </button>
            <button
              type="button"
              className=" bg-customRed py-2 px-4 text-white rounded-md hover:bg-red-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
