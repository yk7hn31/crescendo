import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useSearchState } from "@/hooks/useSearch";
import { searchAll, formatSearchItems } from "@/lib/search";

import { itemListVariants } from "@/definitions/variants";
import type { ItemDetails } from "@/definitions/types";

import { SearchItem, SearchItemSkeleton } from './SearchItem';

interface SearchItemListProps {
  isMobile: boolean;
}

const SearchItemList: React.FC<SearchItemListProps> = ({ isMobile }) => {
  const { isFormActive, searchTerm } = useSearchState();
  const [debouncedSTerm, setDebouncedSTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<ItemDetails[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSTerm(searchTerm), 300);
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      if (debouncedSTerm) {
        setResults(await searchAll(debouncedSTerm));
      } else {
        setResults([]);
      }
    })();
  }, [debouncedSTerm]);

  return (
    <motion.div
      className={`${isMobile ? 'w-full' : 'w-7/12'} space-y-[-1px]`}
      variants={itemListVariants}
      initial='hidden'
      animate={isFormActive ? 'visible' : 'hidden'}
      exit='hidden'
    >
      {results.length ? results.map((result: ItemDetails) => {
        const { itemKey, itemInfo } = formatSearchItems(result); 

        return (
          <SearchItem key={itemKey} {...itemInfo} />
        );
      }) : <><SearchItemSkeleton /><SearchItemSkeleton /><SearchItemSkeleton /></>}
    </motion.div>
  );
}

export default SearchItemList;