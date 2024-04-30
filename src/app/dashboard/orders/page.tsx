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
  images: z.string().min(1, { message: "imageURL can't be empty" }).array(),
});

type FormData = z.infer<typeof ZodFormSchema>;

export default function Page() {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState,
    setValue,
    getFieldState,
  } = useForm<FormData>({
    resolver: zodResolver(ZodFormSchema),
    defaultValues: {
      name: '',
      age: -1,
      images: [],
      email: '',
    },
  });
  const { errors, dirtyFields, touchedFields } = formState;

  function onSubmit(data: FormData) {
    console.log(control.getFieldState('name'));
  }

  function justSee() {
    console.log(dirtyFields);
    console.log(touchedFields);
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Label htmlFor="n1">Name</Label>
          <Input id="n1" {...register('name')} />
          <p>{errors?.name?.message}</p>
          <Label htmlFor="a1">Age</Label>
          <Input id="a1" type="number" {...register('age')} />
          <p>{errors?.age?.message}</p>
          <Label htmlFor="e1">email</Label>
          <Input id="e1" type="email" {...register('email')} />
          <p>{errors?.email?.message}</p>

          <Label htmlFor="i1">Image 1</Label>
          <Input id="i1" {...register('images.0')} />
          <p>{errors?.images?.[0]?.message}</p>

          <Label htmlFor="i2">Image 2</Label>
          <Input id="i2" {...register('images.1')} />
          <p>{errors?.images?.[1]?.message}</p>

          <Button type="submit">Click</Button>
          <DevTool control={control} />
        </form>
      </div>
      <Button onClick={justSee}>Not part of Form</Button>
    </main>
  );
}
