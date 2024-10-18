import type { SearchEntity, ItemDetails, FetchError } from '@/definitions/types';
import { convertType } from './utils';

async function lookup(id: string, limit?: number) {
  const searchURI = `http://localhost:8080/lookup?id=${id}`;
  const response = await fetch(searchURI);
  if (!response.ok) throw { code: 'network' } as FetchError;
  let lookupData;

  try {
    lookupData = await response.json();
  } catch {
    throw { code: 'json' } as FetchError;
  }
  if (!lookupData.resultCount) {
    throw { code: 'no-result' } as FetchError;
  }

  const results = lookupData.results.map(structSearchItems);
  return limit ? results.slice(0, limit - 1) : results;
}

async function getSearchResult(term: string, type: SearchEntity) {
  const searchURI = `http://localhost:8080/search?term=${encodeURIComponent(term)}&entity=${type}`;
  const response = await fetch(searchURI);
  if (!response.ok) throw { code: 'network' } as FetchError;
  let searchData;

  try {
    searchData = await response.json();
  } catch {
    throw { code: 'json' } as FetchError;
  }
  if (!searchData.resultCount) {
    throw { code: 'no-result' } as FetchError;
  }

  return searchData.results.map(structSearchItems);
}

async function searchSong(term: string, filter?: { artist?: string, album?: string }) {
  let searchResult: ItemDetails[] = await getSearchResult(term, 'song');

  if (filter?.album) {
    searchResult = searchResult.filter(({ data }) => 
      data?.album?.toLowerCase().includes(filter.album!.toLowerCase())
    );
  }
  if (filter?.artist) {
    searchResult = searchResult.filter(({ data }) => 
      data?.artist?.toLowerCase().includes(filter.artist!.toLowerCase())
    );
  }

  return searchResult;
}

async function searchAlbum(term: string, filter?: { artist?: string }) {
  let searchResult: ItemDetails[] = await getSearchResult(term, 'album');

  if (filter?.artist) {
    searchResult = searchResult.filter(({ data }) =>
      data?.artist?.toLowerCase().includes(filter.artist!.toLowerCase())
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

// @ts-expect-error passthrough for API's return value
function structSearchItems(item): ItemDetails {
  const result: ItemDetails = {
    title: '', type: convertType(item.wrapperType),
    genre: item.primaryGenreName, id: item.wrapperType[0]
  };

  if (item.wrapperType === 'track' || item.wrapperType === 'collection') {
    result.data = {};
    result.data.artist = item.artistName;
    result.data.coverImg = item.artworkUrl100;
    if (item.wrapperType === 'track') {
      const minutes = Math.floor(item.trackTimeMillis / 60000);
      const seconds = Math.floor((item.trackTimeMillis % 60000) / 1000);
      result.data.duration = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
      result.title = item.trackName;
      result.id += item.trackId;
      result.data.album = item.collectionName;
      result.data.trackNumber = item.trackNumber;
    } else if (item.wrapperType === 'collection') {
      result.title = item.collectionName;
      result.id += item.collectionId;
      result.data.releaseYear = new Date(item.releaseDate).getFullYear();
    }
  } else if (item.wrapperType === 'artist') {
    result.title = item.artistName;
    result.id += item.artistId;
  }

  return result;
}

const search = {
  all: searchAll,
  song: searchSong,
  album: searchAlbum,
  artist: searchArtist
};

export { search, lookup, structSearchItems };