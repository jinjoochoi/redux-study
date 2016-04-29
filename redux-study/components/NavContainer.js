import React, { Component, PropTypes } from 'react'

import Radium from 'radium'
import Explore from './nav_components/Explore'
import Signin from './nav_components/Signin'
import QA from './nav_components/QA'

class NavContainer extends Component{
  render(){
    const { value } = this.props

    return(
      <div>
      <nav>
        <ul style={styles.base}>
        <li style={styles.text}><h5 onClick={this.props.onClick}>Singki</h5></li>
        <li style={styles.li}><Explore value={value}
                 onChange={this.props.onChange}/></li>
        <li style={styles.text}><Signin/></li>
        <li style={styles.text}><QA/></li>
        </ul>
        </nav>
      </div>
    )
  }
}

var styles = {
  base: {
    height:80,
    backgroundColor: '#111111',
    listStyleType:'none'
  },
  li: {
    color:'#ffffff',
    float: 'left',
    padding: 25
  },
  text:{
    padding: 5,
    color:'#ffffff',
    float: 'left'
  }

}
export default NavContainer;

NavContainer.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}
