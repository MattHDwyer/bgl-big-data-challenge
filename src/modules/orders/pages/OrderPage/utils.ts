import { SubmitHandler } from 'react-hook-form';
import { CustomerOrderInput } from '../../types';

export const onSubmit: SubmitHandler<CustomerOrderInput[]> = (
  input: CustomerOrderInput[],
) => {
  console.log(input);
};
