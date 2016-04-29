import * as ActionTypes from '../actions/actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'



function searchLyrics(state={},action){
  console.log("re:searchLyrics");
  console.log(action); 

  switch (action.type) {
  case ActionTypes.LYRIC_SUCCESS:
    return action.response.results.trackmatches
  default:
    return state
  }
}

const rootReducer = combineReducers({
  searchLyrics,
  routing
})

export default rootReducer
