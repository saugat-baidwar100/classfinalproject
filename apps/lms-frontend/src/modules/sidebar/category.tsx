import { CheckBoxInput } from '../../components/checkbox';

export const CourseCategory = () => {
  return (
    <>
      <h1 className="text-medium-size font-semibold font-poppins mb-5">
        Course Category
      </h1>
      <div className="flex flex-col w-[270px]">
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Frontend Development" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Backend Development" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Fullstack Development" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="App Development" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="UI/UX Design" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Quality Assurance" />
          <p>12</p>
        </div>
      </div>
    </>
  );
};
