'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ViewLogger() {
  const pathname = usePathname();

  useEffect(() => {
    let data = { pathname: pathname, timestamp: new Date() };
    let url = '/api/log-views';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type
        // You may need to include additional headers depending on your API requirements
        // 'Authorization': 'Bearer <your_token>',
      },
      body: JSON.stringify(data), // Convert data to JSON string
    }).catch((error) => {
      console.error('Error:', error);
      // Handle errors
    });
  }, [pathname]);

  return <></>;
}
