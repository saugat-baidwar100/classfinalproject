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
      <h1 className="text-medium-size font-semibold font-poppins mb-5">
        Instructor
      </h1>
      <div className="flex flex-col w-[270px]">
      
      <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="Kenny White">
            Kenny White
            </Checkbox>
            <p>{instructorCounts['Kenny'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="John Doe">John Doe</Checkbox>
            <p>{instructorCounts['John'] || 0}</p>
          </div>
          
        </CheckboxGroup>
      </div>
    </>
  );
};
