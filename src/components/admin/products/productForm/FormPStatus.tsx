import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProductFormType } from '@/lib/typescriptUtils';

export default function FormPStatus({ form }: { form: ProductFormType }) {
  return (
    <FormField
      control={form.control}
      name="active"
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-2 items-center mb-2 pr-4 text-xs sm:text-sm font-semibold">
            <Label htmlFor="s1">Inactive</Label>
            <FormControl>
              <Switch
                id="s1"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <Label htmlFor="s1">Active</Label>
          </div>
        </FormItem>
      )}
    />
  );
}
