import { CheckBoxInput } from '../../components/checkbox';

export const CourseCategory = () => {
  return (
    <>
      <h1>Course Category</h1>
      <div className="flex flex-col">
        <CheckBoxInput title="Frontend Development" />
        <CheckBoxInput title="Backend Development" />
        <CheckBoxInput title="Fullstack Development" />
        <CheckBoxInput title="App Development" />
        <CheckBoxInput title="UI/UX Design" />
        <CheckBoxInput title="Quality Assurance" />
      </div>
    </>
  );
};
