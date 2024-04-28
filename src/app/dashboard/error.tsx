'use client'; // Error components must be Client Components
import CloudError from '@/../public/images/cloudError.svg';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <main className="h-full rounded-lg flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Server Error</CardTitle>
          <CardDescription>
            {"Couldn't connect to the database"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CloudError className="w-full" />

          <Button
            className="w-full"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
