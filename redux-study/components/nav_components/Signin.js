import React, {Component} from 'react'
import SkyLight from 'react-skylight'

class Login extends Component{
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this)

  }
  handleLoginClick(){
    this.refs.loginDialog.show();
  }
  render(){
    var loginDialog = {
      color:'#000000',
      width: '20%',
      height: '400px',
      marginTop: '-300px',
      marginLeft: '-10%'
   };




    return(
      <div>
      <h5 onClick={this.handleLoginClick}>LOGIN</h5>

      <SkyLight dialogStyles={loginDialog} hideOnOverlayClicked ref="loginDialog" >
      <ul style={styles.ul}>
      <li><h3 style={styles.title}>SIGN IN</h3></li>
      <li><input style={styles.input} type="text" ref="input"/></li>
      <li><input style={styles.input} type="text" ref="input"/></li>
      <li><button style={styles.button}>Sign in</button></li>
      </ul>

      <ul style={styles.ul_login}>
      <h5 style={styles.li_login}> Facebook </h5>
      <h5 style={styles.li_login}> Google </h5>
      <h5 style={styles.li_login}> Wechat </h5>
      </ul>

      </SkyLight>
      </div>
    )
  }
}
var styles = {
  title:{
    textAlign: 'right',
    marginTop: '50px',
    marginRight: '164px',
    size:'30pt'
  },
  ul: {
    listStyleType:'none'
  },
  ul_login:{
    listStyleType:'none',
    marginTop:110,
    marginLeft:10

  },
  input:{

    marginLeft:-10,
    marginTop:10,
    width:'90%',
    height:20,
    backgroundColor:'#A4A4A4'
  },
  button:{
    marginLeft:-10,
    marginTop:20,
    width:'90%'
  },
  li_login:{
    float : 'left',
    marginLeft : 10
  }

}



export default Login;
