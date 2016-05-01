import { CALL_API} from '../api/LastFmApi'

export const LYRIC_REQUEST = 'LYRIC_REQUEST'
export const LYRIC_SUCCESS = 'LYRIC_SUCCESS'
export const LYRIC_FAILURE = 'LYRIC_FAILURE'


export function fetchLyrics(text){
  return{
    text,
    [CALL_API]:{
    type:[LYRIC_REQUEST,LYRIC_SUCCESS,LYRIC_FAILURE],
    endpoint: `&track=${text}`
    }
  }
}
function fetchMoreLyrics(text, nextPageUrl) {
  console.log("fetchMoreLyrics");

  return {
    text,
    [CALL_API]: {
      types: [ LYRIC_REQUEST, LYRIC_SUCCESS, LYRIC_FAILURE ],
      endpoint: nextPageUrl+`&track=${text}`
    }
  }
}
export function loadMoreLyrics(text, nextPage) {
  console.log("loadMoreLyrics");
  return (dispatch, getState) => {
    const {
      nextPageUrl = `&track=${text}`,
      pageCount = 0
    } = getState().pagination.lyrics[text] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchMoreLyrics(text, nextPageUrl))
  }
}

export function loadLyrics(text){
  return (dispatch,getState) => {
    dispatch(fetchLyrics(text))
  }
}
