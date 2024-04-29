'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
  name: string;
  age: string;
  email: string;
}

const ZodFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  age: z.coerce.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number',
  }),
  email: z.string().email({ message: 'Invalid email' }),
});

export default function Page() {
  const { register, control, getValues, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(ZodFormSchema),
  });

  function onSubmit(data: FormData) {
    console.log(control.getFieldState('name'));
  }

  function justSee() {
    console.log(control.getFieldState('name'));
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label htmlFor="n1">Name</Label>
          <Input
            id="n1"
            {...register('name', { required: 'Name is required' })}
          />
          <Label htmlFor="a1">Age</Label>
          <Input id="a1" type="number" {...register('age')} />
          <Label htmlFor="e1">email</Label>
          <Input id="e1" type="email" {...register('email')} />
          <Button type="submit">Click</Button>
          <DevTool control={control} />
        </form>
      </div>
      <Button onClick={justSee}>Not part of Form</Button>
    </main>
  );
}
