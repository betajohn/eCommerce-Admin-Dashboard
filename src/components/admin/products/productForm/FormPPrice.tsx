import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function FormPPrice({ form, product }) {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-1">
            <FormLabel>Price USD</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder={product?.price ?? 0.01}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
