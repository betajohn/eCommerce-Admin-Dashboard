'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ZodFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  age: z.coerce.number().gt(12, {
    message: 'You need to be at least 13 years old to use this website',
  }),
  email: z.string().email({ message: 'Invalid email' }),
});

type FormData = z.infer<typeof ZodFormSchema>;

export default function Page() {
  const { register, control, getValues, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(ZodFormSchema),
  });

  function onSubmit(data: FormData) {
    console.log(control.getFieldState('name'));
  }

  function justSee() {
    console.log(control.getFieldState('name'));
    console.log(control.getFieldState('age'));
    console.log(control.getFieldState('email'));
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label htmlFor="n1">Name</Label>
          <Input id="n1" {...register('name')} />
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
