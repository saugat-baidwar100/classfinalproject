import { Checkbox, CheckboxGroup } from '@nextui-org/react';
const instructorCounts = {
  Kenny: 6,
  John: 6,
};
interface InstructorProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}
export const Instructor = ({
  handleChange,
  isSelectedCheckbox,
}: InstructorProps) => {
  return (
    <>
      <h1 className="text-[14px] sm:text-[18px] md:text-[18px] lg:text-medium-size xl:text-medium-size font-semibold font-poppins mb-5 mt-8">
        Instructor
      </h1>
      <div className="flex flex-col w-full">
        <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Kenny White">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">Kenny White</span>
            </Checkbox>
            <p>{instructorCounts['Kenny'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="John Doe">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">John Doe</span>
            </Checkbox>
            <p>{instructorCounts['John'] || 0}</p>
          </div>
        </CheckboxGroup>
      </div>
    </>
  );
};
