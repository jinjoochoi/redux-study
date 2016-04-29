import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadLyrics,fetchLyrics } from '../actions/actions'
import Track from '../components/Track'


function loadData(props) {
  console.log("loadData");
  const { text } = props
  props.loadLyrics(text)
}
class SearchResultPage extends Component{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      loadData(nextProps)
    }
  }

  render(){
    const { trackMatches } = this.props
    return(
      <div>
      <ul style={styles.base}>
      {trackMatches.map(track =>
          <Track track={track}/>
        )}
      </ul>
      </div>
    )

  }


}
var styles = {
  base: {
    height:70,
    listStyleType:'none'
  }
}

SearchResultPage.PropTypes = {
  trackMatches : PropTypes.array.isRequired

}

function mapStateToProps(state, ownProps) {
  const { text } = ownProps.params
  console.log(state);
  console.log(ownProps);
  console.log("**mapStateToProps");
  const trackMatches = state.searchLyrics.track

  return {
    text : text,
    trackMatches
  }

}
export default connect(mapStateToProps, {
  loadLyrics
})(SearchResultPage)
