import { useState } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface PostDataOptions<T> {
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

const usePostData = <T>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async <T>({
    url,
    data,
    headers,
  }: PostDataOptions<T>): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const config: AxiosRequestConfig = {
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        data,
      };

      const response: AxiosResponse<T> = await axios(config);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError("An error occurred while posting data");
      setIsLoading(false);
      console.error("Error posting data:", error);
      return undefined;
    }
  };

  return { postData, isLoading, error };
};

export default usePostData;
