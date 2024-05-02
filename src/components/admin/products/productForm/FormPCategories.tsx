import { ProductFormType } from '@/lib/typescriptUtils';
import { ShortedCategoriesType } from '@/database/models/StoreConfig';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FormPPCategories({
  form,
  categories,
}: {
  form: ProductFormType;
  categories: ShortedCategoriesType;
}) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col gap-1">
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.name}
              >
                <FormControl>
                  <SelectTrigger className="w-[160px] sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((c) => {
                    return (
                      <SelectItem value={c.name} key={c.name}>
                        {c.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
