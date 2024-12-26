import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
import { MySelect } from '@skillprompt-lms/libs/ui-components/components/my-select';
import { error } from 'console';

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
  console.log('error', error);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md pt-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center ">
          Create a new course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* Title */}
            <Input
              label={<p className="text-green-500">Name</p>}
              placeholder="enter your name"
              {...register('title')}
              errorMessage={errors.title?.message}
            />
          </div>

          {/* Description */}
          <div>
            <TextArea
              label={<p className="text-green-500">Category</p>}
              type="text"
              placeholder="Enter Description"
              {...register('description')}
              rows={4}
            />
          </div>

          {/* Category */}
          <div>
            <MySelect
              disableSelectorIconRotation
              label={<p className="text-green-500">Category</p>}
              placeholder="select category"
              {...register('category')}
              errorMessage={errors.category?.message}
              options={[
                { key: '1', label: 'Select Category' },
                { key: '2', label: 'Front-end Developtment' },
                { key: '3', label: 'Back-end Development' },
                { key: '4', label: 'Fullstack Development' },
              ]}
            />
          </div>

          {/* Type */}
          <div>
            <MySelect
              label={<p className="text-green-500">Type</p>}
              placeholder="Select type"
              options={[
                { key: '1', label: 'Select type' },
                { key: '2', label: 'Free' },
                { key: '3', label: 'Paid' },
              ]}
              {...register('title')}
              errorMessage={errors.title?.message}
            />
          </div>

          {/*  */}
          <div>
            <Input
              type="number"
              label={<p className="text-green-500">Price</p>}
              placeholder="Enter price"
              {...register('price', { valueAsNumber: true })}
            />
          </div>

          <div>
            <Input
              type="file"
              label="Thumbnail"
              placeholder="Upload Thu"
              {...register('thumbnail')}
              errorMessage={errors.thumbnail?.message?.toString()}
            />
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
