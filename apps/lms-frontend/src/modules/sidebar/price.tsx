import { CheckBoxInput } from '../../components/checkbox';

export const Price = () => {
  return (
    <>
      <h1 className="">Price</h1>
      <div className="flex flex-col">
        <CheckBoxInput title="All" />
        <CheckBoxInput title="Free" />
        <CheckBoxInput title="Paid" />
      </div>
    </>
  );
};
