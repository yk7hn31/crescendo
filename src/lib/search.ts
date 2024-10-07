import type { SongInfo, AlbumInfo } from '@/types/types';
import type { RawSongInfo, RawAlbumInfo } from '@/types/types';
import type { SongSearchOptions, AlbumSearchOptions } from '@/types/types'

type RawInfo = {
  results: RawSongInfo[] | RawAlbumInfo[]
};

async function getSearchResult(term: string, type: 'song' | 'album'): Promise<RawSongInfo[] | RawAlbumInfo[]> {
  const searchURI: string = encodeURI(`https://itunes.apple.com/search?media=music&attribute=${type}Term&term=${term}&entity=${type}&limit=10`);
  const searchResult: RawSongInfo[] | RawAlbumInfo[] = (await (await fetch(searchURI)).json() as RawInfo).results;

  if (!searchResult[0]) throw new Error(`no result for: ${term}`);

  return searchResult;
}

async function searchSong(term: string, { artist, album, artworkSize = 60 }: SongSearchOptions = {}): Promise<SongInfo[]> {
  let searchResult: RawSongInfo[] = await getSearchResult(term, 'song') as RawSongInfo[];

  if (album) searchResult = searchResult.filter(({ collectionName }) => collectionName.toLowerCase().includes(album.toLowerCase()));
  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map((data: RawSongInfo): SongInfo => ({
    type: 'song',
    title: data.trackName,
    artist: data.artistName,
    album: data.collectionName,
    genre: data.primaryGenreName,
    trackNumber: data.trackNumber,
    trackLength: data.trackTimeMillis,
    trackId: data.trackId,
    available: data.isStreamable,
    explicit: !data.trackExplicitness.includes('not'),
    artwork: data.artworkUrl100.replace(/100x100/, `${artworkSize}x${artworkSize}`)
  }));
}

async function searchAlbum(term: string, { artist, artworkSize = 60 }: AlbumSearchOptions = {}): Promise<AlbumInfo[]> {
  let searchResult: RawAlbumInfo[] = await getSearchResult(term, 'album') as RawAlbumInfo[];

  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map((data: RawAlbumInfo): AlbumInfo => ({
    type: 'album',
    title: data.collectionName,
    artist: data.artistName,
    trackCount: data.trackCount,
    genre: data.primaryGenreName,
    releaseDate: new Date(data.releaseDate),
    explicit: !data.trackExplicitness.includes('not'),
    artwork: data.artworkUrl100.replace(/100x100/, `${artworkSize}x${artworkSize}`),
    collectionId: data.collectionId
  }));
}

export { searchSong, searchAlbum };