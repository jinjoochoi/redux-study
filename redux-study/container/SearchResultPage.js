import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadLyrics, loadMoreLyrics} from '../actions/actions'
import Track from '../components/Track'
import TrackList from '../components/TrackList'
import uniqueId from 'lodash/uniqueId'



function loadData(props) {
  const { text } = props
  props.loadLyrics(text)
}

class SearchResultPage extends Component{
  constructor(props) {
    super(props)
    this.renderTrack = this.renderTrack.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)


  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      loadData(nextProps)
    }
  }
  renderTrack(track) {
    var pageCount = this.props.pageCount
    var key = uniqueId(pageCount.toString());
    console.log(key);
      return (
        <Track track = {track}
                key = {key}
        />
      )
  }
  handleLoadMoreClick() {
  this.props.loadMoreLyrics(this.props.text, true)
  }

  render(){
    const { trackMatches ,trackPagination} = this.props

    return(
      <div>
      <TrackList renderItem={this.renderTrack}
              items={trackMatches}
              onLoadMoreClick={this.handleLoadMoreClick}
              {...trackPagination} />

      </div>
    )

  }


}


SearchResultPage.PropTypes = {
  text : PropTypes.string.isRequired,
  trackMatches : PropTypes.array.isRequired,
  loadLyrics : PropTypes.func.isRequired,
  loadMoreLyrics : PropTypes.func.isRequired,
  trackPagination : PropTypes.object,
  pageCount : PropTypes.number

}

function mapStateToProps(state, ownProps) {
  const { text } = ownProps.params

  const {
    pagination: { lyrics }
  } = state
  console.log(state);
  console.log(ownProps);

  const trackPagination = lyrics[text] || { trackMatches: [] }
  const trackMatches = trackPagination.trackMatches;
  const pageCount = trackPagination.pageCount;

  return {
    text : text,
    trackMatches,
    trackPagination,
    pageCount
  }

}
export default connect(mapStateToProps, {
  loadLyrics,
  loadMoreLyrics

})(SearchResultPage)
