import * as ActionTypes from '../actions/actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import paginate from './paginate'




const pagination = combineReducers({
  lyrics: paginate({
    mapActionToKey: action => action.text,
    types: [
      ActionTypes.LYRIC_REQUEST,
      ActionTypes.LYRIC_SUCCESS,
      ActionTypes.LYRIC_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  pagination,
  routing
})

export default rootReducer
