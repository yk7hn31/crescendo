import type { SearchType, SongDetails, AlbumDetails } from '@/types/types';

interface SongSearchOptions {
  artist?: string;
  album?: string;
  artworkSize?: number;
}

interface AlbumSearchOptions {
  artist?: string;
  artworkSize?: number;
}

async function getSearchResult(term: string, type: SearchType) {
  const searchURI: string = `http://localhost:8080/search?term=${encodeURIComponent(term)}&entity=${type}`;
  const response = await fetch(searchURI, { redirect: 'manual' });
  const searchData = await response.json();
  
  if (!searchData.resultCount) throw new Error(`no result for: ${term}`);
  return searchData.results;
}

async function searchSong(term: string, { artist, album }: SongSearchOptions = {}) {
  let searchResult: SongDetails[] = await getSearchResult(term, 'song');

  if (album) {
    searchResult = searchResult.filter(({ collectionName }) => 
      collectionName.toLowerCase().includes(album.toLowerCase())
    );
  }
  if (artist) {
    searchResult = searchResult.filter(({ artistName }) => 
      artistName.toLowerCase().includes(artist.toLowerCase())
    );
  }

  return searchResult;
}

async function searchAlbum(term: string, { artist }: AlbumSearchOptions = {}) {
  let searchResult: AlbumDetails[] = await getSearchResult(term, 'album');

  if (artist) {
    searchResult = searchResult.filter(({ artistName }) =>
      artistName.toLowerCase().includes(artist.toLowerCase())
    );
  }

  return searchResult;
}

async function searchArtist(term: string) {
  return await getSearchResult(term, 'artist');
}

async function searchAll(term: string) {
  return await getSearchResult(term, 'all');
}

export { searchSong, searchAlbum, searchArtist, searchAll }