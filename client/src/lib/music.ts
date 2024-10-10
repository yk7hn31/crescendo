import type { SearchEntity, SongDetails, AlbumDetails, ItemDetails } from '@/definitions/types';

interface SongSearchOptions {
  artist?: string;
  album?: string;
  artworkSize?: number;
}

interface AlbumSearchOptions {
  artist?: string;
  artworkSize?: number;
}

async function lookup(id: string) {
  const searchURI = `http://localhost:8080/lookup?id=${id}`;
  const response = await fetch(searchURI);
  const lookupData = await response.json();

  if (!lookupData.resultCount) throw new Error(`no result for: ${id}`);
  return lookupData.results;
}

async function getSearchResult(term: string, type: SearchEntity) {
  const searchURI = `http://localhost:8080/search?term=${encodeURIComponent(term)}&entity=${type}`;
  const response = await fetch(searchURI);
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

function formatSearchItems(item: ItemDetails) {
  let itemKey: string = '';
  const itemInfo = { type: item.wrapperType, title: '', description: '', extra: '', coverImg: '' };

  if (item.wrapperType === 'track' || item.wrapperType === 'collection') {
    itemInfo.coverImg = item.artworkUrl100;
    itemInfo.description = item.artistName;
    if (item.wrapperType === 'track') {
      const minutes = Math.floor(item.trackTimeMillis / 60000);
      const seconds = Math.floor((item.trackTimeMillis % 60000) / 1000);
      itemKey = 't' + item.trackId;
      itemInfo.title = item.trackName
      itemInfo.extra = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    } else if (item.wrapperType === 'collection') {
      itemKey = 'c' + item.collectionId;
      itemInfo.title = item.collectionName;
      itemInfo.extra = `${item.trackCount} tracks`;
    }
  } else if (item.wrapperType === 'artist') {
    itemInfo.title = item.artistName;
    itemKey = 'a' + item.artistId;
    itemInfo.description = item.primaryGenreName.charAt(0).toUpperCase() + item.primaryGenreName.slice(1);
    itemInfo.extra = '>'; // TODO: temp
  }

  return { itemKey, itemInfo };
}

const search = {
  all: searchAll,
  song: searchSong,
  album: searchAlbum,
  artist: searchArtist
};

export { search, lookup, formatSearchItems };