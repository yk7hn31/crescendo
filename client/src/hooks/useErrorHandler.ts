import { useCallback } from "react";
import { useToast } from "./useToast";

import type { FetchError } from "@/definitions/types";

function useErrorHandler() {
  const { toast } = useToast();

  const errorHandler = useCallback((err: FetchError) => {
    const title = 'Uh oh! Something went wrong';
    let description: string;

    switch (err.code) {
      case 'network': // NOTE: network error (fetch)  
        description = 'There was an error with either your network connection, or the API server.';
        break;
      case 'json': // NOTE: JSON parsing error
        description = 'There was a problem with the API server.';
        break;
      case 'no-result': // NOTE: no result
        description = 'No result for the search query.';
        break;
      default:
        description = 'Unknown error occured.';
    }

    toast({ title, description, variant: 'destructive' });
  }, [toast]);

  return errorHandler;
}

export default useErrorHandler;