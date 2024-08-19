import { useState, useEffect } from "react";

interface Search {
  endpoint: string;
}

interface SearchResult {
  data?: string | object;
  name?: string;
  [key: string]: any;
}

interface UseSearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}
function useSearch(): UseSearchState {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}product/`);
        const data = await response.json();
        setSearchResults(data.data);
      } catch (error) {
        setError(error as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, searchResults, isLoading, error };
}

export default useSearch;
