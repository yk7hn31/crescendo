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

interface FormatterOptions {
  displayTrackNo?: boolean;
  displayDuration?: boolean;
}

interface SearchItemDetails {
  type: string;
  title: string;
  description: string;
  coverImg?: string;
  trackNumber?: number;
  duration?: number;
};

interface PanelItemDetails {
  title?: string;
  type?: 'Song' | 'Album' | 'Artist';
  extra?: (string | number)[];
  coverImg?: string;
};

async function lookup(id: string, limit?: number) {
  const searchURI = `http://localhost:8080/lookup?id=${id}`;
  const response = await fetch(searchURI);
  const lookupData = await response.json();

  if (!lookupData.resultCount) throw new Error(`no result for: ${id}`);
  return limit ? lookupData.results.slice(0, limit - 1) : lookupData.results;
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

function formatSearchItems(item: ItemDetails, options?: FormatterOptions) {
  let itemKey: string = '';
  const itemInfo: SearchItemDetails = {
    type: item.wrapperType, title: '', description: ''
  };

  if (item.wrapperType === 'track' || item.wrapperType === 'collection') {
    if (options?.displayTrackNo && item.wrapperType === 'track') itemInfo.trackNumber = item.trackNumber;
    else itemInfo.coverImg = item.artworkUrl100;

    itemInfo.description = item.artistName;

    if (item.wrapperType === 'track') {
      if (options?.displayDuration) itemInfo.duration = item.trackTimeMillis;
      itemKey = 't' + item.trackId;
      itemInfo.title = item.trackName;
    } else if (item.wrapperType === 'collection') {
      itemKey = 'c' + item.collectionId;
      itemInfo.title = item.collectionName;
    }
  } else if (item.wrapperType === 'artist') {
    itemKey = 'a' + item.artistId;
    itemInfo.title = item.artistName;
    itemInfo.description = item.primaryGenreName.charAt(0).toUpperCase() + item.primaryGenreName.slice(1);
  }

  return { itemKey, itemInfo };
}

function formatPanelItemInfo(content: ItemDetails[]) {
  const panelItemInfo: PanelItemDetails = {};

  if (content.length) {
    if (content[0]?.wrapperType === 'artist') {
      panelItemInfo.title = content[0].artistName;
      panelItemInfo.type = 'Artist';
    } else {
      panelItemInfo.coverImg = content[0].artworkUrl100;
      if (content[0]?.wrapperType === 'collection') {
        const year = new Date(content[0].releaseDate).getFullYear();
        panelItemInfo.title = content[0].collectionName;
        panelItemInfo.type = 'Album';
        panelItemInfo.extra = [content[0].artistName, year];
      } else if (content[0]?.wrapperType === 'track') {
        panelItemInfo.title = content[0].trackName;
        panelItemInfo.type = 'Song';
        panelItemInfo.extra = [content[0].artistName, content[0].collectionName];
      }
    }
    return panelItemInfo;
  } else {
    return;
  }
};

const search = {
  all: searchAll,
  song: searchSong,
  album: searchAlbum,
  artist: searchArtist
};

export { search, lookup, formatSearchItems, formatPanelItemInfo };