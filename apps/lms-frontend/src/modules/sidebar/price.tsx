import { Checkbox, CheckboxGroup } from '@nextui-org/react';
const priceCounts = {
  paid: 2,
  free: 10,
  
};
interface PriceProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}
export const Price = ({
  handleChange,
  isSelectedCheckbox,
}: PriceProps) => {
  return (
    <>
      <h1 className="text-medium-size font-semibold font-poppins mb-5">Price</h1>
      <div className="flex flex-col w-[270px]">
      
      <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="paid">
            Paid
            </Checkbox>
            <p>{priceCounts['paid'] || 0}</p>
          </div>
          <div className="text-lg flex font-poppins justify-between">
            <Checkbox value="free">Free</Checkbox>
            <p>{priceCounts['free'] || 0}</p>
          </div>
          
        </CheckboxGroup>
      </div>
    </>
  );
};
