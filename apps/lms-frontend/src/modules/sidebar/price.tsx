import { Checkbox, CheckboxGroup } from '@nextui-org/react';
const priceCounts = {
  Paid: 2,
  Free: 10,
};
interface PriceProps {
  handleChange: (value: string[]) => void;
  isSelectedCheckbox: string[];
}
export const Price = ({ handleChange, isSelectedCheckbox }: PriceProps) => {
  return (
    <>
      <h1 className="text-[14px] sm:text-[18px] md:text-[18px] lg:text-medium-size xl:text-medium-size font-semibold font-poppins mb-5 mt-8">
        Price
      </h1>
      <div className="flex flex-col w-full">
        <CheckboxGroup onChange={handleChange} value={isSelectedCheckbox}>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Paid">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">Paid</span>
            </Checkbox>
            <p>{priceCounts['Paid'] || 0}</p>
          </div>
          <div className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg flex font-poppins justify-between">
            <Checkbox value="Free">
              <span className="text-xs sm:text-base md:text-base lg:text-lg xl:text-lg line-clamp-1">Free</span>
            </Checkbox>
            <p>{priceCounts['Free'] || 0}</p>
          </div>
        </CheckboxGroup>
      </div>
    </>
  );
};
