import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
  });

  type CourseFormData = z.infer<typeof courseSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = (data: CourseFormData) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  // Define Zod schema for validation

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create a new course
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-customGreen  text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              {...register('title')}
              className={`w-full px-4 py-2 border ${
                errors.title ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-customGreen text-sm mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Description"
              {...register('description')}
              className={`w-full px-4 py-2 border ${
                errors.description ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-customGreen text-sm mb-2">
              Category
            </label>
            <select
              {...register('category')}
              className={`w-full px-4 py-2 border  text-customGray ${
                errors.category ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" className=" text-customGray">
                Select Category
              </option>
              <option value="development">Front-end Development</option>
              <option value="design">Back-end Development</option>
              <option value="marketing">Fullstack Development</option>
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
              className={`w-full px-4 py-2 border text-customGray ${
                errors.type ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Type</option>
              <option value="online">Paid</option>
              <option value="offline">free</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-customGreen text-sm mb-2">Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              {...register('price', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border ${
                errors.price ? 'border-red-500' : 'border-customGray'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className=" bg-customGreen  py-2 px-4 text-white rounded-md hover:bg-green-800"
            >
              Save
            </button>
            <button
              type="submit"
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
