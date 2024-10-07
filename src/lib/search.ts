import type { SongInfo, AlbumInfo, ArtistInfo, SearchType } from '@/types/types';
import type { RawSongInfo, RawAlbumInfo, RawArtistInfo, RawInfoArr } from '@/types/types';
import type { SongSearchOptions, AlbumSearchOptions } from '@/types/types'

type RawInfoUType = RawSongInfo | RawAlbumInfo | RawArtistInfo;
type ResultUType = SongInfo | AlbumInfo | ArtistInfo;

function formatRawInfo(rawData: RawInfoUType): ResultUType {
  if (rawData.wrapperType === 'track') {
    return {
      type: 'song',
      title: rawData.trackName,
      artist: rawData.artistName,
      album: rawData.collectionName,
      genre: rawData.primaryGenreName,
      trackNumber: rawData.trackNumber,
      trackLength: rawData.trackTimeMillis,
      trackId: rawData.trackId,
      available: rawData.isStreamable,
      explicit: !rawData.trackExplicitness.includes('not'),
      artwork: rawData.artworkUrl100
    };
  } else if (rawData.wrapperType === 'collection') {
    return {
      type: 'album',
      title: rawData.collectionName,
      artist: rawData.artistName,
      trackCount: rawData.trackCount,
      genre: rawData.primaryGenreName,
      releaseDate: new Date(rawData.releaseDate),
      explicit: !rawData.collectionExplicitness.includes('not'),
      artwork: rawData.artworkUrl100,
      collectionId: rawData.collectionId
    };
  } else { // (rawData.wrapperType === 'artist')
    return {
      type: 'artist',
      name: rawData.artistName,
      genre: rawData.primaryGenreName,
      amLink: rawData.artistLinkUrl,
      artistId: rawData.artistId
    };
  }
}

async function getSearchResult(term: string, type: SearchType): Promise<RawInfoArr> {
  const entity = type === 'all' ? '' : (type === 'artist' ? '&entity=musicArtist' : `&entity=${type}`);
  const searchURI: string = encodeURI(`https://itunes.apple.com/search?media=music&term=${term}&limit=10${entity}`);
  const response = await fetch(searchURI);
  const searchData = (await response.json()).results;
  
  if (!searchData[0]) throw new Error(`no result for: ${term}`);
  return searchData;
}

async function searchSong(term: string, { artist, album }: SongSearchOptions = {}): Promise<SongInfo[]> {
  let searchResult: RawSongInfo[] = await getSearchResult(term, 'song') as RawSongInfo[];

  if (album) searchResult = searchResult.filter(({ collectionName }) => collectionName.toLowerCase().includes(album.toLowerCase()));
  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map(formatRawInfo) as SongInfo[];
}

async function searchAlbum(term: string, { artist }: AlbumSearchOptions = {}): Promise<AlbumInfo[]> {
  let searchResult: RawAlbumInfo[] = await getSearchResult(term, 'album') as RawAlbumInfo[];

  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map(formatRawInfo) as AlbumInfo[];
}

async function searchArtist(term: string): Promise<ArtistInfo[]> {
  const searchResult: RawArtistInfo[] = await getSearchResult(term, 'artist') as RawArtistInfo[];

  return searchResult.map(formatRawInfo) as ArtistInfo[];
}

async function searchAll(term: string): Promise<ResultUType[]> {
  const searchResult: RawInfoUType[] = await getSearchResult(term, 'all');

  return searchResult.map(formatRawInfo);
}

export { searchSong, searchAlbum, searchArtist, searchAll }