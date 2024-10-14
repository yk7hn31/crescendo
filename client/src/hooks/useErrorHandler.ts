import { useToast } from "./useToast";

function useErrorHandler() {
  const title = 'Uh oh! Something went wrong.';
  const { toast } = useToast();
  return (err: Error) => {
    switch (err.message[0]) {
      case '0': // NOTE: network error (fetch)
        toast({
          title,
          description: 'There was an error with either your network connection, or the API server.'
        }); break;
      case '1': // NOTE: JSON parsing error
        toast({
          title,
          description: 'There was a problem with the API server.'
        }); break;
      case '2': // NOTE: no result
        toast({
          title,
          description: 'No result for the search query.'
        }); break;
    }
  }
}

export default useErrorHandler;