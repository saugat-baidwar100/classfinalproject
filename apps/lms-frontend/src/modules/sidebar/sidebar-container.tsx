import { Divider } from '@nextui-org/react';
import { CourseCategory } from './category';
import { Instructor } from './instructor';
import { Price } from './price';
interface CourseCategoryProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}
export const Sidebar = ({handleChange, isSelectedCheckbox}:CourseCategoryProps) => {
 

  return (
    <div>
      <CourseCategory handleChange={handleChange} isSelectedCheckbox={isSelectedCheckbox}/>
       <Divider className="my-4 w-[270px]"/>
      <Instructor handleChange={handleChange} isSelectedCheckbox={isSelectedCheckbox}/>
      <Divider className="my-4 w-[270px]" />
      <Price handleChange={handleChange} isSelectedCheckbox={isSelectedCheckbox}/>
    </div>
  );
};
