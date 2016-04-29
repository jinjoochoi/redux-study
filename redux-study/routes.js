import React from 'react'
import { Route } from 'react-router'
import App from './container/App'
import SearchResultPage from './container/SearchResultPage'

export default (
  <Route path="/" component={App}>
    <Route path="/search/:text"
           component={SearchResultPage} />
  </Route>
)
