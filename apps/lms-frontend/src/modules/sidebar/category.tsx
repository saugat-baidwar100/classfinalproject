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
      <h1 className=" text-[14px] sm:text-[18px] md:text-[18px] lg:text-medium-size xl:text-medium-size font-semibold font-poppins mb-5">
        Category
      </h1>
      <div className="flex flex-col w-full">
        <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Frontend">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">Frontend Development</span>
            </Checkbox>
            <p>{categoryCounts['Frontend'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Backend">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">Backend Development</span>
            </Checkbox>
            <p>{categoryCounts['Backend'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Fullstack">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">
                Fullstack Development
              </span>
            </Checkbox>
            <p>{categoryCounts['Fullstack'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="App">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">App Development</span>
            </Checkbox>
            <p>{categoryCounts['App'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="UI/UX Design">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1 ">UI/UX Design</span>
            </Checkbox>
            <p>{categoryCounts['Ui'] || 0}</p>
          </div>
        </CheckboxGroup>
      </div>
    </>
  );
};
