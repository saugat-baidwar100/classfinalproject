import { Divider } from '@nextui-org/react';
import { CourseCategory } from './category';
import { Instructor } from './instructor';
import { Price } from './price';

export const Sidebar = () => {
  return (
    <div>
      <CourseCategory />
      <Divider className="my-4 w-[270px]" />
      <Instructor />
      <Divider className="my-4 w-[270px]" />
      <Price />
    </div>
  );
};
