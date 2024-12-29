import { CheckBoxInput } from '../../components/checkbox';

export const Price = () => {
  return (
    <>
      <h1 className="text-medium-size font-semibold font-poppins mb-5">Price</h1>
      <div className="flex flex-col w-[270px]">
      
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="All" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Paid" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Free" />
          <p>12</p>
        </div>
      </div>
    </>
  );
};
