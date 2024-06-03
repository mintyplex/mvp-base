// hooks/usePostData.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PostDataOptions {
  url: string;
  formData?: any;
  headers?: Record<string, string>;
}

const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const postData = async <T>({
    url,
    formData,
    headers,
  }: PostDataOptions): Promise<T | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.postForm(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      });

      if (response.status != 200) {
        throw new Error("Network response was not ok");
      }

      const data = await response.data;
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
