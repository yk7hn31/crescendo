import { useState, useEffect } from "react";

import useErrorHandler from "./useErrorHandler";
import { search } from "@/lib/music";

import { ItemDetails, SearchEntity } from "@/definitions/types";

function useDebouncedFetch(searchTerm: string, entityType: SearchEntity) {
  const [debouncedSTerm, setDebouncedSTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<ItemDetails[]>([]);
  const errHandler = useErrorHandler();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSTerm(searchTerm), 300);
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm]);

  // term change / entity change handler
  useEffect(() => {
    if (debouncedSTerm) {
      search[entityType](debouncedSTerm)
      .then(setResults)
      .catch(errHandler);
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSTerm, entityType]);

  return results;
}

export default useDebouncedFetch;