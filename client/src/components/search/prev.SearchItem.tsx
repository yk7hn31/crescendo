import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SearchItemProps {
  title: string;
  description: string;
  type: 'song' | 'album' | 'artist'
}

const style = {
  // song: 'flex flex-col-reverse',
  song: '',
  album: '',
  artist: ''
}

const exampleUrl = 'https://cdna.artstation.com/p/assets/images/images/010/722/852/medium/oksana-radionova-nomnom24.jpg?1525885436';

const SearchItem: React.FC<SearchItemProps>
 = ({ title, description, type }) => {
  return (
    <Card className={`w-56 ${style[type]}`}>
      <div className='w-full p-6 pb-0'>
        <img src={exampleUrl} alt={title} className='w-full rounded' />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='mt-[-0.5rem]'>
        <Button variant='secondary' className='w-full text-gray-600'>
          <Plus className='mr-2 w-4 h-4' />
          Add to Collection
        </Button>
      </CardContent>
    </Card>
  );
}

const SearchItemSkeleton: React.FC = () => {
  return (
    <div className='w-56 p-6 space-y-6'>
      <Skeleton className='w-full aspect-square rounded' />
      <div className='space-y-2'>
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </div>
  );
}

export { SearchItem, SearchItemSkeleton };