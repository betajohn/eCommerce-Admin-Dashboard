'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { isValidIdString } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function IDNotFound({
  isValid,
  query,
}: {
  isValid: boolean;
  query: string;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isValidIdString(ref.current?.value)) {
      e.currentTarget.submit();
    } else {
      toast({
        variant: 'destructive',
        title: 'ERROR: Invalid Product _id.',
        description: 'Product _id must be a 24 char long hexadecimal string.',
      });
    }
  }

  return (
    <Card className=" flex flex-col gap-4 items-center px-2 py-6 sm:px-6 sm:py-10">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-6 w-6 mt-1" />
        <AlertTitle>Error!</AlertTitle>
        {query === '' ? (
          <AlertDescription>Missing product _id</AlertDescription>
        ) : !isValid ? (
          <AlertDescription>Invalid product _id</AlertDescription>
        ) : (
          <AlertDescription>Product _id not found</AlertDescription>
        )}
      </Alert>
      <form className="flex w-full items-center" onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Product _id"
          name="_id"
          ref={ref}
          className="grow"
        />
        <Button type="submit" className="px-8">
          Search
        </Button>
      </form>
      <Alert>
        <RocketIcon className="h-6 w-6" />
        <AlertTitle>Important!</AlertTitle>
        <AlertDescription>
          Product _id must be a 24 char long hexadecimal string
        </AlertDescription>
      </Alert>
    </Card>
  );
}
