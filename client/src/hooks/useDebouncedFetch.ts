import { useState, useEffect } from "react";

import { search } from "@/lib/music";

import { ItemDetails, SearchEntity } from "@/definitions/types";

function useDebouncedFetch(searchTerm: string, entityType: SearchEntity) {
  const [debouncedSTerm, setDebouncedSTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<ItemDetails[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSTerm(searchTerm), 300);
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm]);

  // term change / entity change handler
  useEffect(() => {
    (async () => {
      if (debouncedSTerm) {
        setResults(await search[entityType](debouncedSTerm));
      } else {
        setResults([]);
      }
    })();
  }, [debouncedSTerm, entityType]);

  return results;
}

export default useDebouncedFetch;