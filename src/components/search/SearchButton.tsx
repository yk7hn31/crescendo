import { Button } from '@/components/ui/button';
import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button variant='outline' onClick={onClick}>
      <Search className='mr-2 h-4 w-4' />
      Search
    </Button>
  );
}

export default SearchButton;