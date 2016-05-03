import React, { Component, PropTypes } from 'react'
import {fetchUser} from '../../actions/actions'
import { browserHistory } from 'react-router'

class Explore extends Component{
  constructor(props) {
      super(props)
      this.handleGoClick = this.handleGoClick.bind(this)
      this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleGoClick() {
    this.props.onChange(this.getInputValue())
  }

  handleKeyUp(e) {
  if (e.keyCode === 13) {
    this.handleGoClick()
    }
  }
  getInputValue() {
    return this.refs.input.value
  }
  setInputValue(val) {
    this.refs.input.value = val
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  render(){
    return(
      <div>
      <input  type="text"
              ref="input"
              onKeyUp={this.handleKeyUp}
              defaultValue={this.props.value}/>

      <button onClick={this.handleGoClick} >Search</button>

      </div>
    )
  }
}

export default Explore;
Explore.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
