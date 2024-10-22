import { useState, useEffect, useCallback } from "react";

import useErrorHandler from "./useErrorHandler";
import { search } from "@/lib/music";

import { FetchError, ItemDetails, SearchEntity } from "@/definitions/types";

function useSearch(searchTerm: string, entityType: SearchEntity) {
  const [debouncedSTerm, setDebouncedSTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<ItemDetails[]>([]);
  const errHandler = useErrorHandler();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm]);

  const fetchData = useCallback(async () => {
    try {
      if (!debouncedSTerm) {
        setResults([]);
        return;
      }
      const result = await search[entityType](debouncedSTerm);
      setResults(result);
    } catch (e) {
      errHandler(e as FetchError);
    }
  }, [debouncedSTerm, entityType, errHandler]);

  // term change / entity change handler
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return results;
}

export default useSearch;