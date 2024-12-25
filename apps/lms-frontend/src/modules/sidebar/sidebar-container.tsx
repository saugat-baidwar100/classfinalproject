import { Divider } from '@nextui-org/react';
import { CourseCategory } from './category';
import { Instructor } from './instructor';
import { Price } from './price';

export const Sidebar = () => {
  return (
    <div>
      <CourseCategory />
      <Divider className="my-3 w-44" />
      <Instructor />
      <Divider className="my-3 w-44" />
      <Price />
    </div>
  );
};
