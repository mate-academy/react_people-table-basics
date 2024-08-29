import { useState } from 'react';

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async <T>(url: string): Promise<T> => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetch(url);

      const data = await response.json();

      return data;
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    fetchData,
    isError,
  };
};
