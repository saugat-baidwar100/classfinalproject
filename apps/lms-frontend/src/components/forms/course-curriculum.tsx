import { Button } from '@skillprompt-lms/libs/ui-components/components/button';
import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { TextArea } from '@skillprompt-lms/libs/ui-components/components/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import ContentSelector from './content';

export function CourseCurriculum() {
  const navigate = useNavigate();

  const courseSchema = z.object({
    chapter1: z.string().min(1, 'Chapter Name is required'),
    topic1: z.string().min(1, 'Topic is required'),
    description: z
      .string()
      .min(10, 'Description is required (at least 10 characters)'),
  });

  type CourseFormData = z.infer<typeof courseSchema>;

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'all',
  });

  const [activeSection, setActiveSection] = useState<
    null | 'lecture' | 'quiz' | 'assignment'
  >(null);

  // Function to handle section changes
  const handleSectionChange = (section: 'lecture' | 'quiz' | 'assignment') => {
    setActiveSection(section);
  };

  const handleCancel = () => {
    setActiveSection(null); // Reset to show buttons again
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions((prevState) => !prevState);
  };

  const [curriculumItems, setCurriculumItems] = useState<string[]>([]);

  // Function to handle adding new curriculum items
  const addCurriculumItem = () => {
    setCurriculumItems((prevItems) => [
      ...prevItems,
      `Curriculum Item ${prevItems.length + 1}`,
    ]);
  };

  // Form submit handler
  const onSubmit: SubmitHandler<CourseFormData> = (data) => {
    console.log('Form Data:', data);
    console.log('Curriculum Items:', curriculumItems);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">
          Create Course Curriculum
        </h2>
        <div className="flex justify-evenly gap-4">
          <Button
            type="button"
            name="Add Course"
            className="bg-white py-2 px-4 text-custom-dark-teal border border-custom-teal rounded-md hover:bg-custom-dark-teal hover:text-white"
            onClick={() => navigate('/create-course')}
          />
          <Button
            type="button"
            name="Course Curriculum"
            className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-10">
          {/* Course Title */}
          <div className="flex flex-col gap-2">
            <Input
              label={<p className="text-custom-teal">Chapter 1</p>}
              placeholder="Enter Chapter Name"
              errorMessage={errors.chapter1?.message}
              isInvalid={!!errors.chapter1?.message}
              {...register('chapter1')}
            />
            <Input
              label={<p className="text-custom-teal">Topic 1</p>}
              placeholder=""
              errorMessage={errors.chapter1?.message}
              isInvalid={!!errors.chapter1?.message}
              {...register('topic1')}
              endContent={
                <Button
                  type="button"
                  name="Add Content"
                  icon={
                    <IoMdAdd className="text-custom-dark-teal group-hover:text-white" />
                  }
                  className="bg-white border text-custom-dark-teal border-custom-teal h-7 w-40 py-2 px-4 hover:text-white rounded-md hover:bg-custom-dark-teal"
                  onClick={handleButtonClick}
                />
              }
            />
            {showOptions && <ContentSelector />}
          </div>

          {/* Curriculum Item Button */}
          <div className="flex">
            <Button
              type="button"
              name="Add Curriculum Item"
              icon={
                <IoMdAdd className="text-custom-dark-teal group-hover:text-white" />
              }
              className="bg-white border text-custom-dark-teal border-custom-teal py-2 px-4 hover:text-white rounded-md hover:bg-custom-dark-teal"
              onClick={addCurriculumItem}
            />
          </div>

          {/* Dynamic Curriculum Items */}
          <div className="mt-1 space-y-1">
            {curriculumItems.map((item, index) => (
              <div className="flex items-center justify-start gap-4 mb-3 ml-3">
                {!activeSection && (
                  <div className="flex justify-evenly gap-3">
                    <Button
                      type="button"
                      name="Lecture"
                      className="bg-white py-2 px-4 text-custom-dark-teal border border-custom-teal rounded-md hover:bg-custom-dark-teal hover:text-white"
                      onClick={() => handleSectionChange('lecture')}
                    />
                    <Button
                      type="button"
                      name="Quiz"
                      className="bg-white py-2 px-4 text-custom-dark-teal border border-custom-teal rounded-md hover:bg-custom-dark-teal hover:text-white"
                      onClick={() => handleSectionChange('quiz')}
                    />
                    <Button
                      type="button"
                      name="Assignment"
                      className="bg-white py-2 px-4 text-custom-dark-teal border border-custom-teal rounded-md hover:bg-custom-dark-teal hover:text-white"
                      onClick={() => handleSectionChange('assignment')}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        className="text-red-500 text-sm hover:underline bg-gray-50"
                        name="Remove"
                        onClick={() =>
                          setCurriculumItems((prevItems) =>
                            prevItems.filter((_, i) => i !== index)
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Lecture */}
          <div className="mt-1 space-y-1">
            {activeSection === 'lecture' && (
              <div className="mt-6">
                <Input
                  label={<p className="text-custom-teal">New Lecture</p>}
                  placeholder="Enter Lecture Title"
                />
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    type="button"
                    name="Cancel"
                    className="bg-white border text-custom-dark-teal border-custom-teal py-2 px-4 hover:text-white rounded-md hover:bg-custom-dark-teal"
                    onClick={handleCancel}
                  />
                  <Button
                    type="submit"
                    name="Add Lecture"
                    className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Quiz */}
          <div className="mt-1 space-y-1">
            {activeSection === 'quiz' && (
              <div className="mt-6">
                <Input
                  label={<p className="text-custom-teal">New Quiz</p>}
                  placeholder="Enter Quiz Title"
                />
                <TextArea
                  label={<p className="text-custom-teal">Description</p>}
                  placeholder="Enter Quiz Description"
                  rows={4}
                  errorMessage={errors.description?.message}
                />
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    type="button"
                    name="Cancel"
                    className="bg-white border text-custom-dark-teal border-custom-teal py-2 px-4 hover:text-white rounded-md hover:bg-custom-dark-teal"
                    onClick={handleCancel}
                  />
                  <Button
                    type="submit"
                    name="Add Quiz"
                    className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Assignment */}
          <div className="mt-1 space-y-1">
            {activeSection === 'assignment' && (
              <div className="mt-6">
                <Input
                  label={<p className="text-custom-teal">New Assignment</p>}
                  placeholder="Enter Assignment Title"
                />
                <TextArea
                  label={<p className="text-custom-teal">Description</p>}
                  placeholder="Enter Assignment Description"
                  rows={4}
                  errorMessage={errors.description?.message}
                />
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    type="button"
                    name="Cancel"
                    className="bg-white border text-custom-dark-teal border-custom-teal py-2 px-4 hover:text-white rounded-md hover:bg-custom-dark-teal"
                    onClick={handleCancel}
                  />
                  <Button
                    type="submit"
                    name="Add Assignment"
                    className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              name="Publish"
              className="bg-custom-teal py-2 px-4 text-white rounded-md hover:bg-custom-dark-teal"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
