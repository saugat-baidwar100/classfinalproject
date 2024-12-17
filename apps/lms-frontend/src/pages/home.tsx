import { Input } from '@skillprompt-lms/libs/ui-components/components/input';
import { Button } from '@skillprompt-lms/libs/ui-components/components/button';

export const Home = () => {
  return (
    <>
      This is home page
      {/* <Input label="Email" /> */}
      <Input label="Email" />
      <Button name="Submit" key={''} />
    </>
  );
};
