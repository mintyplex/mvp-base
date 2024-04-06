// hooks/usePostData.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostDataOptions {
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const postData = async <T>({ url, body, headers }: PostDataOptions): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIsLoading(false);

       // If the POST request was successful, redirect to the /profile-update page
       if (response.ok) {
        router.push('/profile-update');
      }

      return data;
    } catch (error) {
      setError('An error occurred while posting data');
      setIsLoading(false);
      console.error('Error posting data:', error);
      return undefined;
    }
  };

  return { postData, isLoading, error };
};

export default usePostData;