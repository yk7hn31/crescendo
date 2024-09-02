import { CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import React from "react";

import { searchSong, searchAlbum } from "@/lib/search";

const SearchBody: React.FC = (): React.ReactElement => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    await searchSong('');
    await searchAlbum('');
    console.log(formData.query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
      <div>
        <Label htmlFor='query'>Search Query</Label>
        <Input placeholder='Search...' name='query' id='query' />
      </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='reset'>Reset</Button>
        <Button>Search</Button>
      </CardFooter>
    </form>
  );
}

export default SearchBody;