import React, { Component, PropTypes } from 'react'

export default class TrackList extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props
    return (
      <button style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    )
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      trackMatches, renderItem,items
    } = this.props;

    const isEmpty = items.length === 0

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div style={styles.base}>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}

var styles = {
  base: {
    margin:20
  }

}

TrackList.propTypes = {
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
}

TrackList.defaultProps = {
  isFetching: true,
}
