import { CheckBoxInput } from "../../components/checkbox";

export const Instructor = () => {
  return (
    <>
      <h1>Instructor</h1>
      <div className="flex flex-col">
      <CheckBoxInput title="Kenny White" />
      <CheckBoxInput title="John Doe" />
     </div>
    </>
  );
};
