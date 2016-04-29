import { CALL_API, Schemas } from '../api/LastFmApi'

export const LYRIC_REQUEST = 'LYRIC_REQUEST'
export const LYRIC_SUCCESS = 'LYRIC_SUCCESS'
export const LYRIC_FAILURE = 'LYRIC_FAILURE'


export function fetchLyrics(text){
   console.log("fetchLyrics");
  return{
    [CALL_API]:{
    type:[LYRIC_REQUEST,LYRIC_SUCCESS,LYRIC_FAILURE],
    endpoint: `&track=${text}`,
    schema: Schemas.TRACK_MATCHES
    }
  }
}

export function loadLyrics(text){
  return (dispatch,getState) => {
    dispatch(fetchLyrics(text))
  }
}
