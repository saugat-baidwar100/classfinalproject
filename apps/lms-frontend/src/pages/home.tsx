import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { Button } from '@skillprompt-lms/libs/ui-components/components/button';
import { DatePicker } from '@skillprompt-lms/libs/ui-components/components/datePicker';

export const Home = () => {
  return (
    <>
      This is home page
      {/* <Input label="Email" /> */}
      <Input label="Email" type='email' />
      <Input label="Email" type='email' />

      {/* <DatePicker label="DatePicker" isRequired /> */}
      {/* <Button name="Ok" key={""} /> */}
    </>
  );
};
