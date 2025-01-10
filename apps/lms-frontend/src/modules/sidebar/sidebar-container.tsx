// import { Checkbox } from '@nextui-org/react';

import { CourseCategory } from './category';
import { Instructor } from './instructor';
import { Price } from './price';

interface CourseCategoryProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}
export const Sidebar = ({
  handleChange,
  isSelectedCheckbox,
}: CourseCategoryProps) => {
  return (
    <div>
      <CourseCategory
        handleChange={handleChange}
        isSelectedCheckbox={isSelectedCheckbox}
      />
      <Instructor
        handleChange={handleChange}
        isSelectedCheckbox={isSelectedCheckbox}
      />
      <Price
        handleChange={handleChange}
        isSelectedCheckbox={isSelectedCheckbox}
      />
    </div>
  );
};
