import React, { Component, PropTypes } from 'react'

export default class Track extends Component {
  render(){
    const {track} = this.props;

    let element = (
      <div>
        <img src= {track.image[1]['#text']}/>
        <h4>{track.name} - {track.artist}</h4>
        <hr/>

      </div>
    )

    return (
      <div>
      <li>
      {element}
      </li>
      </div>
    )
  }
}
Track.propTypes = {
  track : PropTypes.object.isRequired
}
