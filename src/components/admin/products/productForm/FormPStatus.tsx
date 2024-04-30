import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function FormPStatus({ form, product }) {
  return (
    <FormField
      control={form.control}
      name="status"
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
