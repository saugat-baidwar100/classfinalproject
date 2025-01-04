import { Checkbox, CheckboxGroup } from '@nextui-org/react';


const categoryCounts = {
  Frontend: 2,
  Backend: 2,
  Fullstack: 3,
  App: 3,
  Ui: 2,
};

interface CourseCategoryProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}

export const CourseCategory = ({
  handleChange,
  isSelectedCheckbox,
}: CourseCategoryProps) => {
  return (
    <>
      <h1 className="text-medium-size font-semibold font-poppins mb-5">
        Course Category
      </h1>
      <div className="flex flex-col w-[270px]">
        <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="Frontend Development">
              Frontend Development
            </Checkbox>
            <p>{categoryCounts['Frontend'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="Backend Development">Backend Development</Checkbox>
            <p>{categoryCounts['Backend'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="Fullstack Development">
              Fullstack Development
            </Checkbox>
            <p>{categoryCounts['Fullstack'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="App Development">App Development</Checkbox>
            <p>{categoryCounts['App'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="UI/UX Design">UI/UX Design</Checkbox>
            <p>{categoryCounts['Ui'] || 0}</p>
          </div>
        </CheckboxGroup>
      </div>
    </>
  );
};
