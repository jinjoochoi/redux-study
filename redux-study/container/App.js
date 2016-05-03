import React, { Component, PropTypes } from 'react'
import NavContainer from '../components/NavContainer'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


class App extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.goHomePage = this.goHomePage.bind(this)
  }

  handleChange(nextValue) {
    browserHistory.push(`/search/${nextValue}`)
  }
  goHomePage(){
    browserHistory.push(`/`)

  }
  render(){
    const { children, inputValue } = this.props

    return(
    <div>
    <NavContainer value={inputValue}
                 onChange={this.handleChange}
                 onClick={this.goHomePage}/>
    {children}
    </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(8)
  }
}


export default connect(mapStateToProps)(App);
