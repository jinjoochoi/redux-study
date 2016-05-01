import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// last.fm 노래제목 검색 api
const API_ROOT = 'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=76b686c47907e60b569a191afeb561da&format=json'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr
function getNextPageUrl(json) {
  const currentPage = Number(json.results['opensearch:Query'].startPage);

  return API_ROOT+'&page='+(currentPage+1);

}
const trackSchema = new Schema('results',{
  idAttribute:'results'
})
const trackMatchesSchema = new Schema('trackMatches',{
  idAttribute:'trackMatches'
})
trackMatchesSchema.define({
  trackMatches: arrayOf(trackSchema)
})

// Schemas for Last.fm API responses.
export const Schemas = {
  TRACK: trackSchema,
  TRACK_MATCHES:trackSchema
}


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
  console.log("callApi!@@!");
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)

      const nextPageUrl = getNextPageUrl(json,endpoint);
      return Object.assign({},
      camelizedJson,
      {nextPageUrl}
      )
    })
}






// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

export default store => next => action => {

  const callAPI = action[CALL_API]

  console.log("action");
  console.log(action);
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, type } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    console.log(data);
    console.log(action);
    console.log(finalAction);
    console.log("*--");
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = type

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )

}
