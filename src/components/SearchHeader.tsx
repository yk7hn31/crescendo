import { CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "./ui/select";

const SearchHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle>Crescendo</CardTitle>
      <CardDescription>
        <Select>
          <SelectTrigger className='w-64 mt-2'>
            <SelectValue placeholder='What do you want to search for?' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='song'>Song</SelectItem>
              <SelectItem value='album'>Album</SelectItem>
              <SelectItem value='artist'>Artist</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardDescription>
    </CardHeader>
  );
}

export default SearchHeader;