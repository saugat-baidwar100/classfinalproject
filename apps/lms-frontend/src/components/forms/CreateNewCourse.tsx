import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
import { Select } from '@skillprompt-lms/libs/ui-components/components/my-select';
import { Button } from '@skillprompt-lms/libs/ui-components/components/button';
import { useState } from 'react';
import { courseApi } from '../../api/course';

export function CreateNewCourse() {
  // State to handle the selected course type (free or paid)
  const [selectedType, setSelectedType] = useState('');

  //adding new course
  const { mutate:createMutation } = courseApi.createCourse.useMutation();

  // Course validation schema using Zod
  const courseSchema = z
    .object({
      title: z.string().min(1, 'Title is required'),
      description: z
        .string()
        .min(10, 'Description is required (at least 10 characters)'),
      category: z.string().min(1, 'Category is required'),
      type: z.string().refine((type) => type !== '', {
        message: 'Please select a valid type',
      }), // Ensures a valid type is selected
      price: z
        .number({ invalid_type_error: 'Price must be a number' })
        .positive('Price must be greater than 0')
        .optional(), // Price is optional initially
      thumbnail: z
        .any()
        .refine(
          (file) =>
            file?.[0] instanceof File && file?.[0]?.size <= 5 * 1024 * 1024,
          { message: 'Please select a valid file under 5MB' }
        ),
    })
    .refine(
      (data) => {
        // Ensures price is required when the type is "Paid"
        if (
          data.type === 'paid' &&
          (data.price === undefined || data.price === null)
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'Price is required when Type is Paid',
        path: ['price'], // Attach error to the `price` field
      }
    );

  // Type for form data based on Zod schema
  type CourseFormData = z.infer<typeof courseSchema>;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Get setValue from react-hook-form
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'all',
  });

  // Form submit handler
  const onSubmit: SubmitHandler<CourseFormData> = (data) => {
    console.log('Form Data:', data);
    createMutation(
      {
        body: {
          description: data.description,
          type: data.type,
          title: data.title,
          category: data.category,
          price: data.price?.toString() || '',
          thumbnail: data.thumbnail?.toString(),
          created_at: '1/8/2025',
          updated_at: '1/8/2025',
          completed: true,
          instructor: 'john doe',
          level: 'Intermediate',
        },
      },
      {
        onSuccess: (data) => {
          console.log('courses added successfully:', data);
          alert('courses added successfully');
        },
        onError: (error) => {
          console.error('Error adding courses:', error);
          alert('Failed to add course');
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          Create a new course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Title */}
          <div className="flex flex-col gap-2">
            <Input
              label={<p className="text-green-500">Name</p>}
              placeholder="Enter your course name"
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title?.message}
              {...register('title')}
            />
          </div>

          {/* Course Description */}
          <div className="flex flex-col gap-2">
            <TextArea
              label={<p className="text-green-500">Description</p>}
              placeholder="Enter course description"
              rows={4}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description?.message}
              {...register('description')}
            />
          </div>

          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <Select
              label={<p className="text-green-500">Category</p>}
              placeholder="Select category"
              {...register('category')}
              options={[
                { key: '', label: 'Select Category' },
                { key: 'frontend', label: 'Front-end Development' },
                { key: 'backend', label: 'Back-end Development' },
                { key: 'fullstack', label: 'Fullstack Development' },
              ]}
              isInvalid={!!errors.category?.message}
              errorMessage={errors.category?.message}
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* Course Type (Free or Paid) */}
            <Select
              label={<p className="text-green-500">Type</p>}
              placeholder="Select type"
              {...register('type')}
              isInvalid={!!errors.type?.message}
              errorMessage={errors.type?.message}
              options={[
                { key: '', label: 'Select type' },
                { key: 'free', label: 'Free' },
                { key: 'paid', label: 'Paid' },
              ]}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedType(value); // Update local state
                setValue('type', value); // Update form value directly
              }}
            />

            {/* Price Field (Visible only if the course type is "Paid") */}
            {selectedType === 'paid' && (
              <div className="flex flex-col gap-2">
                <Input
                  errorMessage={errors.price?.message}
                  type="number"
                  label={<p className="text-green-500">Price</p>}
                  placeholder="Enter course price"
                  {...register('price', { valueAsNumber: true })}
                  isInvalid={!!errors.price?.message}
                />
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-2">
            <Input
              type="file"
              accept='image'
              label={<p className="text-green-500">Thumbnail</p>}
              placeholder="Upload course thumbnail"
              {...register('thumbnail')}
              errorMessage={errors.thumbnail?.message as string}
              isInvalid={!!errors.thumbnail?.message}
            />
          </div>

          {/* Form Action Buttons */}
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
