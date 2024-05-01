// hooks/usePostData.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostDataOptions {
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const postData = async <T>({
    url,
    body,
    headers,
  }: PostDataOptions): Promise<T | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLoading(false);

      return data;
    } catch (error) {
      setError("An error occurred while posting data");
      setLoading(false);
      console.error("Error posting data:", error);
      return undefined;
    }
  };

  return { postData, loading, error };
};

export default usePostData;
