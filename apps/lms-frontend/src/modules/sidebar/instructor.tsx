import { CheckBoxInput } from '../../components/checkbox';

export const Instructor = () => {
  return (
    <>
      <h1 className="text-medium-size font-semibold font-poppins mb-5">
        Instructor
      </h1>
      <div className="flex flex-col w-[270px]">
      
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="Kenny White" />
          <p>12</p>
        </div>
        <div className="text-lg flex font-poppins justify-between">
          <CheckBoxInput title="John Doe" />
          <p>12</p>
        </div>
      </div>
    </>
  );
};
